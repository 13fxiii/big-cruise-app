"use client";

import { ping } from "@/lib/pwa/notify";
import { useEffect, useRef } from "react";
import { isRoomPacket, type GameSlugWire, type RoomPacket } from "./protocol";
import { useP2PRoom, type P2PRoomHandle } from "./use-p2p-room";

export type GameRoomHandle = P2PRoomHandle & {
  host: boolean;
  pushSnap: (payload: unknown) => void;
  pushAct: (kind: string, payload: unknown) => void;
};

export function useGameRoom(opts: {
  game: GameSlugWire;
  room?: string;
  name?: string;
  joining?: boolean;
  enabled?: boolean;
  onSnap?: (payload: unknown, from: string) => void;
  onAct?: (kind: string, payload: unknown, from: string) => void;
}): GameRoomHandle {
  const enabled = Boolean(opts.enabled && opts.room);
  const handle = useP2PRoom({
    room: enabled ? `bch${opts.game}${opts.room}` : undefined,
    name: opts.name,
    enabled,
  });
  const seq = useRef(0);
  const onSnap = useRef(opts.onSnap);
  const onAct = useRef(opts.onAct);
  onSnap.current = opts.onSnap;
  onAct.current = opts.onAct;

  const peerCount = useRef(0);
  useEffect(() => {
    if (!enabled) return;
    if (handle.peers.length > peerCount.current) {
      const last = handle.peers[handle.peers.length - 1];
      ping("Seat taken", last?.name ?? "Someone sat down", "/play");
    }
    peerCount.current = handle.peers.length;
  }, [enabled, handle.peers.length]);

  useEffect(() => {
    if (!enabled) return;
    return handle.onMessage((from, data) => {
      if (!isRoomPacket(data)) return;
      if (data.t === "snap" && data.game === opts.game) onSnap.current?.(data.payload, from);
      if (data.t === "act" && data.game === opts.game) onAct.current?.(data.kind, data.payload, from);
    });
  }, [enabled, handle, opts.game]);

  const host = !opts.joining;

  const pushSnap = (payload: unknown) => {
    if (!enabled) return;
    seq.current += 1;
    const pkt: RoomPacket = { t: "snap", game: opts.game, seq: seq.current, payload };
    handle.broadcast(pkt);
    handle.send(pkt);
  };

  const pushAct = (kind: string, payload: unknown) => {
    if (!enabled) return;
    const pkt: RoomPacket = { t: "act", game: opts.game, kind, payload };
    handle.send(pkt);
    handle.broadcast(pkt);
  };

  return { ...handle, host, pushSnap, pushAct };
}
