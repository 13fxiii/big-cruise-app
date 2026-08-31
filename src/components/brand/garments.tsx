"use client";

import { Spark, TinyMark, Wordmark } from "@/components/brand/marks";
import { cn } from "@/lib/utils";
import { MARK_D } from "@/lib/cruise/mark";
import type { TeeConcept, TeeGraphic } from "@/lib/cruise/merch";
import type { ReactNode } from "react";

/** Oversized drop-shoulder tee. Midnight body. Graphics via children or a concept. */
export function OversizedTee({
  className,
  side = "front",
  field = "midnight",
  children,
}: {
  className?: string;
  side?: "front" | "back";
  field?: "midnight" | "danfo" | "bone";
  children?: ReactNode;
}) {
  const fill = field === "danfo" ? "fill-danfo" : field === "bone" ? "fill-bone" : "fill-asphalt";
  const rib = field === "midnight" ? "fill-curb" : "fill-midnight/20";
  return (
    <svg viewBox="0 0 200 248" className={cn("overflow-visible", className)} role="img" aria-hidden>
      <path
        className={fill}
        d="M42 58 L8 70 L20 112 L46 100 V228 C46 232 50 234 54 234 H146 C150 234 154 232 154 228 V100 L180 112 L192 70 L158 58 L148 40 C148 30 128 26 100 26 C72 26 52 30 52 40 Z"
      />
      {side === "front" ? (
        <>
          <path className={rib} d="M78 40 C78 52 122 52 122 40 C118 34 82 34 78 40 Z" />
          <path className={fill} d="M86 38 C86 48 114 48 114 38 C110 34 90 34 86 38 Z" />
        </>
      ) : (
        <path className={rib} d="M74 38 H126 V48 C126 56 74 56 74 48 Z" />
      )}
      <g>{children}</g>
    </svg>
  );
}

export function HoodieBody({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <svg viewBox="0 0 200 248" className={className} role="img" aria-hidden>
      <path
        className="fill-asphalt"
        d="M40 70 L14 56 L22 34 H48 L58 52 H142 L152 34 H178 L186 56 L160 70 V226 C160 230 156 234 152 234 H48 C44 234 40 230 40 226 Z"
      />
      <path className="fill-curb" d="M62 34 C62 16 138 16 138 34 L128 52 H72 Z" />
      <path className="fill-lane" d="M84 128 H116 V186 H84 Z" opacity="0.6" />
      <g>{children}</g>
    </svg>
  );
}

export function CapBody({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <svg viewBox="0 0 180 110" className={className} role="img" aria-hidden>
      <ellipse cx="90" cy="72" rx="62" ry="30" className="fill-asphalt" />
      <path className="fill-asphalt" d="M40 68 C40 30 140 30 140 68 L132 58 C132 36 48 36 48 58 Z" />
      <g>{children}</g>
    </svg>
  );
}

export function ToteBody({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <svg viewBox="0 0 160 180" className={className} role="img" aria-hidden>
      <path className="fill-bone" d="M28 48 H132 V168 H28 Z" />
      <path className="stroke-midnight fill-none" strokeWidth="6" d="M52 48 C52 20 108 20 108 48" />
      <g>{children}</g>
    </svg>
  );
}

function Graphic({ g, ink = "danfo" }: { g: TeeGraphic; ink?: "danfo" | "midnight" | "bone" | "dom" }) {
  const color =
    ink === "midnight"
      ? "text-midnight"
      : ink === "bone"
        ? "text-bone"
        : ink === "dom"
          ? "text-dom"
          : "text-danfo";

  if (g.kind === "none") return null;

  if (g.kind === "spark") {
    const box =
      g.loc === "left-chest"
        ? "left-[31%] top-[42%] w-[11%]"
        : g.loc === "sleeve"
          ? "left-[5%] top-[44%] w-[8%]"
          : "left-1/2 top-[40%] w-[36%] -translate-x-1/2";
    return <Spark className={cn("absolute", box, color)} />;
  }

  if (g.kind === "wordmark") {
    return (
      <div className="absolute left-1/2 top-[36%] w-[70%] -translate-x-1/2 text-center">
        <Wordmark className={cn("text-[9px] sm:text-xs", color === "text-danfo" ? "text-bone" : color)} sparkClassName={color} />
      </div>
    );
  }

  if (g.kind === "handle") {
    return (
      <div className="absolute left-[28%] top-[42%] flex items-center gap-1">
        <Spark className={cn("size-4", color)} />
        <span className="font-mono text-[6px] uppercase tracking-[0.12em] text-bone sm:text-[8px]">{g.handle}</span>
      </div>
    );
  }

  if (g.kind === "stack") {
    return (
      <div className="absolute inset-x-[22%] top-[32%] flex flex-col items-center gap-0.5">
        <Spark className={cn("mb-1 size-5", color)} />
        {g.lines.map((line) => (
          <span
            key={line}
            className="font-display text-[8px] font-extrabold uppercase leading-none tracking-[0.16em] text-bone sm:text-[10px]"
          >
            {line}
          </span>
        ))}
      </div>
    );
  }

  const hem = g.loc === "hem";
  return (
    <div
      className={cn(
        "absolute inset-x-[18%] flex flex-col items-center",
        hem ? "bottom-[14%]" : "top-[34%]",
        g.slash ? "-rotate-[8deg]" : "",
      )}
    >
      {g.lines.map((line) => (
        <span
          key={line}
          className="font-display text-[10px] font-extrabold uppercase leading-[0.84] tracking-[0.04em] text-bone sm:text-xs"
        >
          {line}
        </span>
      ))}
    </div>
  );
}

export function TeeMock({
  concept,
  side,
  field = "midnight",
  className,
  ink,
}: {
  concept: TeeConcept;
  side: "front" | "back";
  field?: "midnight" | "danfo" | "bone";
  className?: string;
  ink?: "danfo" | "midnight" | "bone" | "dom";
}) {
  const g = side === "front" ? concept.front : concept.back;
  const sleeve = side === "front" ? concept.sleeve : { kind: "none" as const };
  const onDanfo = field === "danfo";
  const markInk = ink ?? (onDanfo ? "midnight" : "danfo");
  return (
    <div className={cn("relative", onDanfo ? "text-midnight" : "text-danfo", className)}>
      <OversizedTee side={side} field={field} className="w-full" />
      <Graphic g={g} ink={markInk} />
      {sleeve.kind !== "none" ? <Graphic g={sleeve} ink={markInk} /> : null}
    </div>
  );
}

export function LabelCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex aspect-[2/1] w-40 flex-col items-center justify-center rounded-sm bg-midnight text-bone shadow-[var(--shadow-border)]", className)}>
      <Wordmark className="text-sm text-bone" sparkClassName="text-danfo" compact />
      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-concrete">Est. 2026 · NG</p>
    </div>
  );
}

export function HangTagCard({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-28 bg-bone p-3 text-midnight shadow-[var(--shadow-border)]", className)}>
      <div className="mx-auto mb-3 size-3 rounded-full bg-midnight/20" />
      <Wordmark className="text-sm" sparkClassName="text-midnight" compact />
      <p className="mt-2 font-display text-[10px] font-bold uppercase tracking-[0.14em]">Where the cruise lives.</p>
      <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.16em] text-midnight/50">BC-HW-01 · L</p>
    </div>
  );
}

export function NeckTape({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 bg-midnight px-3 py-2", className)}>
      <TinyMark className="size-4 text-danfo" />
      <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-bone">Big Cruise</span>
    </div>
  );
}

/** Embroidery-ready spark for cap / chest close-ups. */
export function EmbroiderySpark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("overflow-visible text-danfo", className)} aria-hidden>
      <path d={MARK_D} fill="none" stroke="currentColor" strokeWidth="11.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Oversized tee with a 7 Days illustration as the back print. */
export function DayTee({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <OversizedTee side="back" className="w-full" />
      <div className="absolute left-[23%] top-[20%] h-[62%] w-[54%] overflow-hidden bg-midnight">
        <img src={src} alt="" className="size-full object-cover object-top" />
      </div>
    </div>
  );
}
