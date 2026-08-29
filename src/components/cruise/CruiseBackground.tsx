"use client";

import { MARK_D, Spark } from "@/components/brand/marks";
import { cn } from "@/lib/utils";
import { useId } from "react";

export type CruiseDensity = "cover" | "default" | "quiet" | "game";

/**
 * Global visual environment. Midnight field, restrained Danfo energy,
 * a tiled vector 〽️ (never the emoji), lane geometry, grain, motion paths.
 * Content sits above this. Do not shout the wordmark on top of it.
 */
export function CruisePattern({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const pid = `cruise-tile-${id}`;
  return (
    <svg className={cn("absolute inset-0 size-full text-danfo", className)} aria-hidden>
      <defs>
        <pattern id={pid} width="240" height="210" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
          <path d="M0 104 H240" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.28" />
          <path d="M48 0 V210" fill="none" stroke="currentColor" strokeWidth="0.45" opacity="0.16" />
          <path d="M24 28 L78 92" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <circle cx="24" cy="28" r="1.7" fill="currentColor" opacity="0.35" />
          <circle cx="196" cy="168" r="1.7" fill="currentColor" opacity="0.28" />
          <g transform="translate(86 62) scale(0.72)" opacity="0.55">
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
        opacity="0.55"
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
    density === "cover" ? "opacity-[0.07]" : density === "game" ? "opacity-[0.035]" : density === "quiet" ? "opacity-[0.045]" : "opacity-[0.055]";
  const laneOp =
    density === "cover" ? "opacity-70" : density === "game" ? "opacity-[0.22]" : density === "quiet" ? "opacity-[0.32]" : "opacity-40";
  const sparkOp = density === "game" ? "text-danfo/[0.03]" : density === "quiet" ? "text-danfo/[0.045]" : "text-danfo/[0.07]";

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
      <CruiseMotionPaths className="opacity-40" />
      <Spark className={cn("absolute -right-[14%] top-[6%] size-[min(78vw,820px)]", sparkOp)} />
      <div
        className={cn(
          "absolute left-[16%] top-[-18%] rounded-full blur-[120px]",
          density === "game" ? "size-[36vw] bg-danfo/6" : "size-[48vw] bg-danfo/10",
        )}
      />
      <div
        className={cn(
          "absolute bottom-[-22%] right-[8%] rounded-full blur-[110px]",
          density === "game" ? "size-[30vw] bg-danfo/5" : "size-[42vw] bg-danfo/8",
        )}
      />
      {accent ? (
        <div
          className="absolute -left-[8%] bottom-[-10%] size-[38vw] rounded-full blur-[120px] opacity-50"
          style={{ background: accent }}
        />
      ) : null}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-danfo/8 to-transparent" />
    </div>
  );
}
