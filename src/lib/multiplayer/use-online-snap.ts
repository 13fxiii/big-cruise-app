"use client";

import { useEffect, useRef } from "react";
import type { SitDownStart } from "@/components/games/SitDown";
import type { GameSlugWire } from "./protocol";
import { useGameRoom } from "./use-game-room";

export function useOnlineSnap<T>(opts: {
  game: GameSlugWire;
  sit: SitDownStart | null;
  name: string;
  apply: (snap: T) => void;
  snapshot: () => T | null;
}) {
  const online = opts.sit?.mode === "online";
  const joining = Boolean(opts.sit?.joining);
  const apply = useRef(opts.apply);
  const snapshot = useRef(opts.snapshot);
  apply.current = opts.apply;
  snapshot.current = opts.snapshot;

  const net = useGameRoom({
    game: opts.game,
    room: opts.sit?.room,
    name: opts.name,
    joining,
    enabled: online,
    onSnap: (payload) => apply.current(payload as T),
  });

  useEffect(() => {
    if (!online || joining) return;
    const snap = snapshot.current();
    if (snap != null) net.pushSnap(snap);
  }, [online, joining, net.peers.length]);

  const publish = (payload: T) => {
    if (online) net.pushSnap(payload);
  };

  return { online, joining, net, publish, host: !joining };
}
