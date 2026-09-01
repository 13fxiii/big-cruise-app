"use client";

import { cn } from "@/lib/utils";

/** Kahoot-shaped pads, BIG CRUISE palette. Not the Kahoot marks. */
export const CRUISE_PADS = [
  { bg: "#7A1F33", shape: "tri" as const, label: "A" },
  { bg: "#1B4F8A", shape: "dia" as const, label: "B" },
  { bg: "#C9A000", shape: "cir" as const, label: "C" },
  { bg: "#2F6B3A", shape: "sq" as const, label: "D" },
];

export function PadGlyph({ shape, className }: { shape: "tri" | "dia" | "cir" | "sq"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-8 shrink-0", className)} aria-hidden>
      {shape === "tri" ? <polygon points="12,3 21,20 3,20" fill="#F3EFE4" /> : null}
      {shape === "dia" ? <polygon points="12,2 22,12 12,22 2,12" fill="#F3EFE4" /> : null}
      {shape === "cir" ? <circle cx="12" cy="12" r="8" fill="#0B0B0B" /> : null}
      {shape === "sq" ? <rect x="5" y="5" width="14" height="14" fill="#F3EFE4" /> : null}
    </svg>
  );
}
