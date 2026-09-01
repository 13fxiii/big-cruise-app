import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { playerLevel } from "@/lib/cruise/persist";
import type { SharedMember } from "@/lib/cruise/share-card";

function cleanCode(raw: unknown) {
  if (typeof raw !== "string") return "";
  return raw.replace(/\s/g, "").toUpperCase().slice(0, 20);
}

function validCode(code: string) {
  return /^BCH-[A-Z0-9-]{4,16}$/.test(code);
}

function parseMember(data: unknown): SharedMember {
  if (!data || typeof data !== "object") throw new Error("Bad member");
  const o = data as Record<string, unknown>;
  const code = cleanCode(o.code);
  if (!validCode(code)) throw new Error("Bad ID");
  const points = Math.max(0, Number(o.points) || 0);
  const sits = Math.max(0, Number(o.sits) || 0);
  const wins = Math.max(0, Number(o.wins) || 0);
  const rank =
    typeof o.rank === "string" && o.rank.trim()
      ? o.rank.slice(0, 18)
      : points >= 400 || wins >= 10
        ? "Ace"
        : sits >= 8
          ? "Rider"
          : "Big Cruiser";
  return {
    code,
    name: String(o.name || "Cruiser").slice(0, 18),
    handle: String(o.handle || "").replace(/^@/, "").slice(0, 24),
    rank,
    points,
    level: Math.max(1, Number(o.level) || playerLevel(points)),
    sits,
    wins,
  };
}

export async function upsertMemberRow(data: SharedMember) {
  const sql = await getSql();
  await sql`
    insert into cruise_members (code, name, handle, rank, points, level, sits, wins, updated_at)
    values (
      ${data.code}, ${data.name}, ${data.handle}, ${data.rank},
      ${data.points}, ${data.level}, ${data.sits}, ${data.wins}, now()
    )
    on conflict (code) do update set
      name = excluded.name,
      handle = excluded.handle,
      rank = excluded.rank,
      points = excluded.points,
      level = excluded.level,
      sits = excluded.sits,
      wins = excluded.wins,
      updated_at = now()
  `;
  return data;
}

export async function selectMemberRow(code: string) {
  const sql = await getSql();
  const rows = await sql<SharedMember>`
    select code, name, handle, rank, points, level, sits, wins
    from cruise_members
    where code = ${code}
    limit 1
  `;
  return rows[0] ?? null;
}

export const publishMember = createServerFn({ method: "POST" })
  .validator(parseMember)
  .handler(async ({ data }) => upsertMemberRow(data));

export const readMember = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    const code = cleanCode(
      data && typeof data === "object" && "code" in data ? (data as { code: unknown }).code : data,
    );
    if (!validCode(code)) throw new Error("Bad ID");
    return { code };
  })
  .handler(async ({ data }) => {
    try {
      return await selectMemberRow(data.code);
    } catch (err) {
      console.error("[members] read", err);
      return null;
    }
  });

export const addCrewLink = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (!data || typeof data !== "object") throw new Error("Bad crew");
    const owner = cleanCode((data as { owner?: unknown }).owner);
    const member = cleanCode((data as { member?: unknown }).member);
    if (!validCode(owner) || !validCode(member) || owner === member) throw new Error("Bad crew");
    return { owner, member };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      insert into cruise_crew (owner, member)
      values (${data.owner}, ${data.member})
      on conflict do nothing
    `;
    return { ok: true };
  });
