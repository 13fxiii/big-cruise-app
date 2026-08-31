"use client";

import { cn } from "@/lib/utils";
import { MARK_D, MARK_FOUNDER, MARK_STROKE, MARK_STROKE_EMBROIDERY, MARK_STROKE_TINY, MARK_TINY } from "@/lib/cruise/mark";
import { useId } from "react";

export { MARK_D, MARK_FOUNDER, MARK_TINY };

type MarkProps = {
  className?: string;
  title?: string;
};

type StrokeVariant = "master" | "founder" | "tiny" | "embroidery";

const STROKES: Record<StrokeVariant, { d: string; width: number }> = {
  master: { d: MARK_D, width: MARK_STROKE },
  founder: { d: MARK_FOUNDER, width: MARK_STROKE },
  tiny: { d: MARK_TINY, width: MARK_STROKE_TINY },
  embroidery: { d: MARK_D, width: MARK_STROKE_EMBROIDERY },
};

/**
 * Custom BIG CRUISE signature stroke. Inspired by 〽️, not the emoji.
 * One-color so it prints, sews, and recolors.
 */
export function MarkStroke({
  width,
  transform,
  variant = "master",
}: {
  width?: number;
  transform?: string;
  variant?: StrokeVariant;
}) {
  const spec = STROKES[variant];
  return (
    <path
      d={spec.d}
      fill="none"
      stroke="currentColor"
      strokeWidth={width ?? spec.width}
      strokeLinecap="round"
      strokeLinejoin="round"
      transform={transform}
    />
  );
}

export function Spark({ className, title = "BIG CRUISE signature" }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={cn("overflow-visible", className)} role="img" aria-label={title}>
      <title>{title}</title>
      <MarkStroke />
    </svg>
  );
}

export function TinyMark({ className, title = "BIG CRUISE signature — tiny" }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={cn("overflow-visible", className)} role="img" aria-label={title}>
      <title>{title}</title>
      <MarkStroke variant="tiny" />
    </svg>
  );
}

export function EmbroideryMark({ className, title = "BIG CRUISE signature — embroidery" }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={cn("overflow-visible", className)} role="img" aria-label={title}>
      <title>{title}</title>
      <MarkStroke variant="embroidery" />
    </svg>
  );
}

/** B — Community signature. Standalone mark in a midnight field. */
export function MidnightMark({ className, title = "BIG CRUISE community signature" }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <circle cx="32" cy="32" r="32" className="fill-midnight" />
      <g transform="translate(32 33) scale(0.7) translate(-32 -32)">
        <MarkStroke />
      </g>
    </svg>
  );
}

export function AppIconMark({ className, title = "BIG CRUISE app icon" }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <rect width="64" height="64" rx="14" className="fill-midnight" />
      <g transform="translate(32 33) scale(0.62) translate(-32 -32)">
        <MarkStroke />
      </g>
    </svg>
  );
}

export function LiveMark({ className, title = "BIG CRUISE live mark" }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <circle
        cx="32"
        cy="32"
        r="29"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="155 27"
        strokeDashoffset="12"
        strokeLinecap="butt"
        className="live-ring"
      />
      <g transform="translate(32 33) scale(0.58) translate(-32 -32)">
        <MarkStroke />
      </g>
    </svg>
  );
}

export function MarkLoop({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="The Cruise Loop">
      <path
        d="M32 8 A28 28 0 0 1 56 50 A28 28 0 0 1 8 50 A28 28 0 0 1 32 8 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.6"
        strokeLinejoin="round"
      />
      <g transform="translate(32 34) scale(0.38) translate(-32 -32)">
        <MarkStroke />
      </g>
    </svg>
  );
}

export function MarkMonogram({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="The BC Monogram">
      <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M18 12 V52" />
        <path d="M18 12 H32" />
        <path d="M18 52 H32" />
        <path d="M32 12 C 50 12 56 20 56 26 C 56 31 52 34 42 34" />
        <path d="M32 52 C 52 52 58 42 58 36 C 58 32 54 30 44 30" />
      </g>
      <g transform="translate(28 33) scale(0.22) translate(-32 -32)">
        <MarkStroke />
      </g>
    </svg>
  );
}

export function MarkConnected({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="The Connected Mark">
      <g fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round">
        <path d="M20 18 H44 A10 10 0 0 1 54 28 V36 A10 10 0 0 1 44 46 H20 A10 10 0 0 1 10 36 V28 A10 10 0 0 1 20 18 Z" />
        <path d="M24 22 V42 A6 6 0 0 0 30 48 H34" />
      </g>
      <circle cx="20" cy="18" r="3.2" fill="currentColor" />
      <circle cx="44" cy="18" r="3.2" fill="currentColor" />
      <circle cx="54" cy="32" r="3.2" fill="currentColor" />
      <circle cx="44" cy="46" r="3.2" fill="currentColor" />
      <circle cx="20" cy="46" r="3.2" fill="currentColor" />
      <g transform="translate(32 32) scale(0.34) translate(-32 -32)">
        <MarkStroke />
      </g>
    </svg>
  );
}

export function MarkMotion({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="The Motion Mark">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        transform="skewX(-14) translate(6 0)"
      >
        <path d="M42 14 C 22 14 14 24 14 32 C 14 40 22 50 42 50" />
        <path d="M46 20 C 28 20 22 26 22 32 C 22 38 28 44 46 44" />
        <path d="M50 26 C 34 26 30 28 30 32 C 30 36 34 38 50 38" />
      </g>
      <g transform="translate(48 16) scale(0.22) translate(-32 -32)">
        <MarkStroke />
      </g>
    </svg>
  );
}

export function MarkSeal({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="The Community Seal">
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="32" cy="32" r="23" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 - 8) * (Math.PI / 180);
        const x1 = 32 + Math.cos(a) * 25.2;
        const y1 = 32 + Math.sin(a) * 25.2;
        const x2 = 32 + Math.cos(a) * 28.6;
        const y2 = 32 + Math.sin(a) * 28.6;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="square"
          />
        );
      })}
      <g transform="translate(32 33) scale(0.42) translate(-32 -32)">
        <MarkStroke />
      </g>
    </svg>
  );
}

export function MarkNegative({ className }: MarkProps) {
  const maskId = useId();
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="The Negative-Space Mark">
      <defs>
        <mask id={maskId}>
          <circle cx="32" cy="32" r="30" fill="white" />
          <path fill="black" d="M40 17 A15 15 0 1 0 40 47 A10 10 0 0 1 40 17 Z" />
          <g transform="translate(22 33) scale(0.3) translate(-32 -32)">
            <path
              d={MARK_D}
              fill="none"
              stroke="black"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </mask>
      </defs>
      <circle cx="32" cy="32" r="30" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  );
}

export function MarkDigital({ className }: MarkProps) {
  const maskId = useId();
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="The Digital Street Mark">
      <defs>
        <mask id={maskId}>
          <rect width="64" height="64" fill="black" />
          <path
            fill="white"
            d="M18 4 H46 C 54 4 60 10 60 18 V46 C 60 54 54 60 46 60 H18 C 10 60 4 54 4 46 V18 C 4 10 10 4 18 4 Z"
          />
          <g transform="translate(32 33) scale(0.52) translate(-32 -32)">
            <path
              d={MARK_D}
              fill="none"
              stroke="black"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </mask>
      </defs>
      <rect width="64" height="64" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  );
}

export function MarkSignature({ className }: MarkProps) {
  return <Spark className={className} title="BIG CRUISE signature" />;
}

export const concepts = [
  {
    id: "01",
    name: "The Cruise Loop",
    idea: "A continuous route that always returns to the people. Three lobes for Cruise, Connect, Create. Signature in the centre.",
    Mark: MarkLoop,
  },
  {
    id: "02",
    name: "The BC Monogram",
    idea: "B and C share a spine. The signature replaces the middle bar. A clothing-label mark.",
    Mark: MarkMonogram,
  },
  {
    id: "03",
    name: "The Connected Mark",
    idea: "A chain-link room. Nodes for members, the signature in the centre for the live conversation.",
    Mark: MarkConnected,
  },
  {
    id: "04",
    name: "The Motion Mark",
    idea: "An italic C built from three speed lanes. The signature is the terminal.",
    Mark: MarkMotion,
  },
  {
    id: "05",
    name: "The Community Seal",
    idea: "A streetwear patch. Eight ticks for the clock of a midnight Space. Signature at the core.",
    Mark: MarkSeal,
  },
  {
    id: "06",
    name: "The Negative Cut",
    idea: "A C carved out of midnight. The signature sits in the remaining mass — hidden until you look.",
    Mark: MarkNegative,
  },
  {
    id: "07",
    name: "The Digital Street Mark",
    idea: "Vinyl-cut signature on a squircle. Danfo sticker construction, built for an app icon.",
    Mark: MarkDigital,
  },
  {
    id: "08",
    name: "The Signature",
    idea: "Custom stroke inspired by 〽️. Two peaks, a room in the valley, a committed drop. Ownable, wearable, digital-native.",
    Mark: MarkSignature,
    featured: true,
  },
] as const;

/** A — Master wordmark. BIG CRUISE + signature. */
export function Wordmark({
  className,
  sparkClassName,
  compact = false,
  spark = true,
}: {
  className?: string;
  sparkClassName?: string;
  compact?: boolean;
  spark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-[0.08em] font-display font-extrabold uppercase leading-none tracking-[0.06em]", className)}>
      <span>Big Cruise</span>
      {spark ? (
        <Spark
          className={cn(compact ? "h-[0.78em] w-[0.92em]" : "h-[0.88em] w-[1.05em] text-danfo", sparkClassName)}
        />
      ) : null}
    </span>
  );
}

/** C — Founder identity. Related to the house, never the community avatar. */
export function FounderLockup({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-[0.05em] font-display font-extrabold uppercase leading-none tracking-[0.08em]", className)}>
      <span>FX</span>
      <svg
        viewBox="0 0 64 64"
        className={cn("h-[0.82em] w-[0.92em] overflow-visible text-danfo", markClassName)}
        role="img"
        aria-label="FX signature"
      >
        <title>FX signature</title>
        <MarkStroke variant="founder" />
      </svg>
    </span>
  );
}

/** Master horizontal: community mark + name. The circle carries the signature — do not double it. */
export function HorizontalLockup({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <MidnightMark className="size-14 text-danfo" />
      <Wordmark className="text-4xl text-bone sm:text-5xl" spark={false} />
    </div>
  );
}

export function StackedLockup({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <MidnightMark className="size-20 text-danfo" />
      <Wordmark className="text-4xl text-bone" spark={false} />
    </div>
  );
}
