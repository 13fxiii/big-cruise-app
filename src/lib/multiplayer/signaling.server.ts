/**
 * WebRTC signaling. Prefers the app database (Neon / PGLite). If SQL is
 * unavailable, falls back to a process-local memory relay.
 */
import { z } from "zod";
import type { PeerRow, RtcPollResponse, SignalRow } from "./p2p";

const ID = z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/);
const signalSchema = z.object({
  op: z.literal("signal"),
  room: ID,
  from: ID,
  to: ID,
  kind: z.enum(["offer", "answer", "ice"]),
  payload: z.unknown().refine((v) => v !== undefined && JSON.stringify(v).length <= 32_768, {
    message: "payload too large",
  }),
});
const leaveSchema = z.object({ op: z.literal("leave"), room: ID, peer: ID });
const postSchema = z.discriminatedUnion("op", [signalSchema, leaveSchema]);

const PEER_TTL_SECONDS = 30;
const SIGNAL_TTL_SECONDS = 60;

type MemPeer = { id: string; name: string; last: number };
type MemSig = {
  id: number;
  room: string;
  to: string;
  from: string;
  kind: SignalRow["kind"];
  payload: unknown;
  at: number;
};

const mem = globalThis as typeof globalThis & {
  __rtcMemPeers__?: Map<string, MemPeer>;
  __rtcMemSigs__?: MemSig[];
  __rtcMemId__?: number;
  __rtcSchemaPromise__?: Promise<void>;
};

function memory() {
  mem.__rtcMemPeers__ ??= new Map();
  mem.__rtcMemSigs__ ??= [];
  mem.__rtcMemId__ ??= 1;
  return {
    peers: mem.__rtcMemPeers__,
    sigs: mem.__rtcMemSigs__,
    nextId: () => mem.__rtcMemId__!++,
  };
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

type QuerySql = {
  query<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<T[]>;
};

async function trySql(): Promise<QuerySql | null> {
  try {
    const mod = await import("@/lib/db");
    return await mod.getSql();
  } catch {
    return null;
  }
}

function ensureSchema(sql: QuerySql): Promise<void> {
  mem.__rtcSchemaPromise__ ??= (async () => {
    await sql.query(
      `CREATE TABLE IF NOT EXISTS webrtc_peers (
         room TEXT NOT NULL,
         peer_id TEXT NOT NULL,
         name TEXT NOT NULL DEFAULT '',
         last_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
         PRIMARY KEY (room, peer_id)
       )`,
    );
    await sql.query(
      `CREATE TABLE IF NOT EXISTS webrtc_signals (
         id BIGSERIAL PRIMARY KEY,
         room TEXT NOT NULL,
         to_peer TEXT NOT NULL,
         from_peer TEXT NOT NULL,
         kind TEXT NOT NULL,
         payload JSONB NOT NULL,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now()
       )`,
    );
    await sql.query(
      `CREATE INDEX IF NOT EXISTS webrtc_signals_inbox
         ON webrtc_signals (room, to_peer, id)`,
    );
  })().catch((err) => {
    mem.__rtcSchemaPromise__ = undefined;
    throw err;
  });
  return mem.__rtcSchemaPromise__;
}

function peerKey(room: string, peer: string) {
  return `${room}::${peer}`;
}

function memPrune() {
  const { peers } = memory();
  const now = Date.now();
  for (const [k, p] of peers) {
    if (now - p.last > PEER_TTL_SECONDS * 1000) peers.delete(k);
  }
  mem.__rtcMemSigs__ = memory().sigs.filter((s) => now - s.at < SIGNAL_TTL_SECONDS * 1000);
}

function memoryGet(room: string, peer: string, name: string, since: number): RtcPollResponse {
  memPrune();
  const { peers, sigs } = memory();
  peers.set(peerKey(room, peer), { id: peer, name, last: Date.now() });
  const roster: PeerRow[] = [];
  for (const [k, p] of peers) {
    if (k.startsWith(`${room}::`)) roster.push({ id: p.id, name: p.name });
  }
  const inbox: SignalRow[] = sigs
    .filter((s) => s.room === room && s.to === peer && s.id > since)
    .map((s) => ({ id: s.id, from: s.from, kind: s.kind, payload: s.payload }));
  return { peers: roster.slice(0, 32), signals: inbox.slice(0, 200) };
}

function memoryPost(msg: z.infer<typeof postSchema>) {
  memPrune();
  const { peers, sigs, nextId } = memory();
  if (msg.op === "signal") {
    sigs.push({
      id: nextId(),
      room: msg.room,
      to: msg.to,
      from: msg.from,
      kind: msg.kind,
      payload: msg.payload,
      at: Date.now(),
    });
  } else {
    peers.delete(peerKey(msg.room, msg.peer));
  }
}

async function handleGet(url: URL): Promise<Response> {
  const parsed = z
    .object({
      room: ID,
      peer: ID,
      name: z.string().max(64).default(""),
      since: z.coerce.number().int().min(0).default(0),
    })
    .safeParse({
      room: url.searchParams.get("room"),
      peer: url.searchParams.get("peer"),
      name: url.searchParams.get("name") ?? "",
      since: url.searchParams.get("since") ?? 0,
    });
  if (!parsed.success) return json({ error: "invalid query" }, 400);
  const { room, peer, name, since } = parsed.data;

  const sql = await trySql();
  if (!sql) return json(memoryGet(room, peer, name, since));

  await ensureSchema(sql);
  if (since === 0 || Math.random() < 0.02) {
    await Promise.all([
      sql.query(`DELETE FROM webrtc_signals WHERE created_at < now() - make_interval(secs => $1)`, [
        SIGNAL_TTL_SECONDS,
      ]),
      sql.query(`DELETE FROM webrtc_peers WHERE last_seen < now() - make_interval(secs => $1)`, [
        PEER_TTL_SECONDS,
      ]),
    ]);
  }
  await sql.query(
    `INSERT INTO webrtc_peers (room, peer_id, name, last_seen)
     VALUES ($1, $2, $3, now())
     ON CONFLICT (room, peer_id)
     DO UPDATE SET last_seen = now(), name = EXCLUDED.name`,
    [room, peer, name],
  );
  const rows = await sql.query<{
    id: number;
    from_peer: string;
    kind: SignalRow["kind"];
    payload: unknown;
  }>(
    `SELECT id, from_peer, kind, payload FROM webrtc_signals
     WHERE room = $1 AND to_peer = $2 AND id > $3
     ORDER BY id LIMIT 200`,
    [room, peer, since],
  );
  const roster = await sql.query<{ peer_id: string; name: string }>(
    `SELECT peer_id, name FROM webrtc_peers
     WHERE room = $1 AND last_seen > now() - make_interval(secs => $2)
     ORDER BY peer_id LIMIT 32`,
    [room, PEER_TTL_SECONDS],
  );
  const body: RtcPollResponse = {
    peers: roster.map((r) => ({ id: r.peer_id, name: r.name })),
    signals: rows.map((r) => ({
      id: r.id,
      from: r.from_peer,
      kind: r.kind,
      payload: r.payload,
    })),
  };
  return json(body);
}

async function handlePost(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid JSON" }, 400);
  }
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) return json({ error: "invalid request" }, 400);
  const msg = parsed.data;
  const sql = await trySql();
  if (!sql) {
    memoryPost(msg);
    return json({ ok: true });
  }
  await ensureSchema(sql);
  if (msg.op === "signal") {
    await sql.query(
      `INSERT INTO webrtc_signals (room, to_peer, from_peer, kind, payload)
       VALUES ($1, $2, $3, $4, $5)`,
      [msg.room, msg.to, msg.from, msg.kind, JSON.stringify(msg.payload)],
    );
  } else {
    await sql.query(`DELETE FROM webrtc_peers WHERE room = $1 AND peer_id = $2`, [msg.room, msg.peer]);
  }
  return json({ ok: true });
}

export async function handleSignaling(request: Request): Promise<Response> {
  try {
    if (request.method === "GET") return await handleGet(new URL(request.url));
    if (request.method === "POST") return await handlePost(request);
    return json({ error: "method not allowed" }, 405);
  } catch (error) {
    console.error("[rtc] signaling error:", error);
    return json({ error: "signaling failed" }, 500);
  }
}
