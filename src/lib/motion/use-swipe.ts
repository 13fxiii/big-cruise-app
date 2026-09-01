"use client";

import { useEffect, useRef } from "react";

export function useSwipe(onSwipe: (dir: "left" | "right") => void, enabled = true) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const handler = useRef(onSwipe);
  handler.current = onSwipe;

  useEffect(() => {
    if (!enabled) return;
    const down = (e: PointerEvent) => {
      start.current = { x: e.clientX, y: e.clientY };
    };
    const up = (e: PointerEvent) => {
      const s = start.current;
      start.current = null;
      if (!s) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
      handler.current(dx < 0 ? "left" : "right");
    };
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);
}
