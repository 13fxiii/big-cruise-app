"use client";

import { MARK_D, Spark } from "@/components/brand/marks";
import { cn } from "@/lib/utils";
import { useId } from "react";

export type CruiseDensity = "cover" | "default" | "quiet" | "game";

/**
 * House night. V1.1 restraint: grain, a quiet tiled signature,
 * one ghost mark on cover only. Felt, not announced.
 */
export function CruisePattern({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const pid = `cruise-tile-${id}`;
  return (
    <svg className={cn("absolute inset-0 size-full text-danfo", className)} aria-hidden>
      <defs>
        <pattern id={pid} width="280" height="240" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
          <g transform="translate(108 78) scale(0.58)" opacity="0.4">
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
      ? "opacity-[0.04]"
      : density === "game"
        ? "opacity-[0.016]"
        : density === "quiet"
          ? "opacity-[0.018]"
          : "opacity-[0.026]";

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
      {density !== "quiet" ? <CruisePattern className={patternOp} /> : null}
      <div className="absolute inset-0 grain" />
      {density === "cover" ? (
        <Spark className="absolute -right-[10%] top-[8%] size-[min(36vw,360px)] text-danfo/[0.035]" />
      ) : null}
      {accent ? (
        <div
          className="absolute -left-[10%] bottom-[-18%] size-[24vw] rounded-full blur-[140px] opacity-25"
          style={{ background: accent }}
        />
      ) : null}
    </div>
  );
}
