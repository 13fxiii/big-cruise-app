"use client";

import { MARK_D, Wordmark } from "@/components/brand/marks";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const BOOT_KEY = "bch-booted";

/**
 * Lightweight branded load. Mark draws, wordmark, tagline.
 * 1.2s default. Skip on tap. Never forced on every screen.
 */
export function CruiseLoader({
  force = false,
  duration = 1200,
  onDone,
}: {
  force?: boolean;
  duration?: number;
  onDone?: () => void;
}) {
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!force && sessionStorage.getItem(BOOT_KEY)) {
      onDone?.();
      return;
    }
    setShow(true);
    const t = window.setTimeout(() => finish(), reduced ? 180 : duration);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [force, duration]);

  function finish() {
    if (typeof window !== "undefined") sessionStorage.setItem(BOOT_KEY, "1");
    setExiting(true);
    window.setTimeout(() => {
      setShow(false);
      onDone?.();
    }, 240);
  }

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={finish}
      className={cn(
        "fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 bg-midnight text-danfo",
        exiting && "cruise-loader-exit",
      )}
      aria-label="Enter the cruise"
    >
      <svg viewBox="0 0 64 64" className="size-20" aria-hidden>
        <path
          className="mark-draw"
          d={MARK_D}
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Wordmark className="text-3xl text-bone md:text-4xl" />
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-concrete">Where the cruise lives.</p>
    </button>
  );
}
