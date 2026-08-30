"use client";

import { MARK_D, Spark } from "@/components/brand/marks";
import { cn } from "@/lib/utils";
import { useId } from "react";

export type CruiseDensity = "cover" | "default" | "quiet" | "game";

/**
 * House night. V1.1 restraint: one tiled signature, grain, a single orb.
 * The mark is felt, not announced. No emoji, no wordmark wallpaper.
 */
export function CruisePattern({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const pid = `cruise-tile-${id}`;
  return (
    <svg className={cn("absolute inset-0 size-full text-danfo", className)} aria-hidden>
      <defs>
        <pattern id={pid} width="280" height="240" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
          <path d="M0 118 H280" fill="none" stroke="currentColor" strokeWidth="0.55" opacity="0.22" />
          <g transform="translate(108 78) scale(0.58)" opacity="0.42">
            <path
              d={MARK_D}
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}

export function CruiseMotionPaths({ className }: { className?: string }) {
  return (
    <svg className={cn("absolute inset-0 size-full text-danfo", className)} aria-hidden preserveAspectRatio="none">
      <path
        className="cruise-path"
        d="M-40 28 C 18 8, 42 48, 70 32 S 110 8, 140 36 S 190 60, 240 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.35"
        strokeDasharray="5 16"
        vectorEffect="non-scaling-stroke"
        opacity="0.4"
        transform="scale(8.4 12)"
      />
    </svg>
  );
}

export function CruiseBackground({
  density = "default",
  accent,
  photo = false,
  position = "absolute",
  className,
}: {
  density?: CruiseDensity;
  accent?: string;
  photo?: boolean;
  position?: "absolute" | "fixed";
  className?: string;
}) {
  const patternOp =
    density === "cover"
      ? "opacity-[0.05]"
      : density === "game"
        ? "opacity-[0.022]"
        : density === "quiet"
          ? "opacity-[0.028]"
          : "opacity-[0.038]";
  const laneOp =
    density === "cover" ? "opacity-40" : density === "game" ? "opacity-[0.12]" : density === "quiet" ? "opacity-[0.16]" : "opacity-[0.22]";
  const sparkOp = density === "game" || density === "quiet" ? "text-danfo/[0.018]" : "text-danfo/[0.04]";
  const showMotion = density === "cover";
  const showSpark = density === "cover" || density === "default";

  return (
    <div
      className={cn(
        "pointer-events-none inset-0 overflow-hidden",
        position === "fixed" ? "fixed z-0" : "absolute",
        className,
      )}
      aria-hidden
    >
      {photo ? (
        <>
          <img
            src="/brand/street-night.jpg"
            alt=""
            className="absolute inset-0 size-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-midnight/50 to-midnight/92" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/55 via-transparent to-midnight/40" />
        </>
      ) : null}
      <CruisePattern className={patternOp} />
      <div className={cn("absolute inset-0 lane-pattern", laneOp)} />
      <div className="absolute inset-0 grain" />
      {showMotion ? <CruiseMotionPaths className="opacity-30" /> : null}
      {showSpark ? (
        <Spark className={cn("absolute -right-[8%] top-[10%] size-[min(42vw,420px)]", sparkOp)} />
      ) : null}
      <div
        className={cn(
          "absolute left-[18%] top-[-22%] rounded-full blur-[140px]",
          density === "game" ? "size-[28vw] bg-danfo/4" : "size-[36vw] bg-danfo/7",
        )}
      />
      {accent ? (
        <div
          className="absolute -left-[8%] bottom-[-12%] size-[28vw] rounded-full blur-[130px] opacity-35"
          style={{ background: accent }}
        />
      ) : null}
    </div>
  );
}
