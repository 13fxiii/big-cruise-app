"use client";

import { useEffect, useRef, useState } from "react";
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
  const [ready, setReady] = useState(!joining);
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
    onSnap: (payload) => {
      apply.current(payload as T);
      setReady(true);
    },
  });

  useEffect(() => {
    if (!online || joining) return;
    const snap = snapshot.current();
    if (snap != null) net.pushSnap(snap);
  }, [online, joining, net.peers.length]);

  const publish = (payload: T) => {
    if (!online) return;
    if (joining && !ready) return;
    net.pushSnap(payload);
  };

  return { online, joining, net, publish, host: !joining, ready: !online || ready };
}

export function useTableSync<T>(opts: {
  game: GameSlugWire;
  sit: SitDownStart | null;
  name: string;
  value: T;
  apply: (snap: T) => void;
}) {
  const live = useOnlineSnap({
    game: opts.game,
    sit: opts.sit,
    name: opts.name,
    apply: opts.apply,
    snapshot: () => opts.value,
  });
  const prev = useRef<string>("");
  useEffect(() => {
    if (!live.online || !live.ready) return;
    const key = JSON.stringify(opts.value);
    if (key === prev.current) return;
    prev.current = key;
    live.publish(opts.value);
  }, [live.online, live.ready, opts.value]);
  return live;
}
