"use client";

import { registerCruisePwa } from "@/lib/pwa/notify";
import { usePlayer } from "@/lib/games/player";
import { useEffect } from "react";

export function PwaBoot() {
  const notify = usePlayer((s) => s.notify);
  useEffect(() => {
    void registerCruisePwa();
    const onNote = (e: Event) => {
      const d = (e as CustomEvent).detail as { title: string; body?: string };
      if (d?.title) notify(d.title, d.body);
    };
    window.addEventListener("cruise-note", onNote);
    return () => window.removeEventListener("cruise-note", onNote);
  }, [notify]);
  return null;
}
