"use client";

import { MARK_D } from "@/components/brand/marks";
import type { Day, DayId } from "@/lib/days";
import { cn } from "@/lib/utils";

export function Motif({ id, className }: { id: DayId; className?: string }) {
  const cls = cn("overflow-visible", className);
  if (id === "mon") {
    return (
      <svg viewBox="0 0 64 64" className={cls} aria-hidden>
        <rect x="12" y="14" width="8" height="40" rx="1" fill="currentColor" />
        <rect x="28" y="22" width="8" height="32" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="44" y="30" width="8" height="24" rx="1" fill="currentColor" opacity="0.4" />
      </svg>
    );
  }
  if (id === "tue") {
    return (
      <svg viewBox="0 0 64 64" className={cls} aria-hidden>
        <rect x="-8" y="22" width="80" height="8" fill="currentColor" transform="rotate(-8 32 32)" />
        <rect x="-8" y="36" width="80" height="4" fill="currentColor" opacity="0.55" transform="rotate(-8 32 32)" />
      </svg>
    );
  }
  if (id === "wed") {
    return (
      <svg viewBox="0 0 64 64" className={cls} aria-hidden>
        <path d="M8 48 C18 18 46 14 56 40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "thu") {
    return (
      <svg viewBox="0 0 64 64" className={cls} aria-hidden>
        {Array.from({ length: 16 }, (_, i) => {
          const x = 10 + (i % 4) * 12;
          const y = 10 + Math.floor(i / 4) * 12;
          const r = 2.2 + (i % 3);
          return <circle key={i} cx={x} cy={y} r={r} fill="currentColor" opacity={0.35 + (i % 4) * 0.15} />;
        })}
      </svg>
    );
  }
  if (id === "fri") {
    const h = [18, 32, 24, 40, 22, 36, 16];
    return (
      <svg viewBox="0 0 64 64" className={cls} aria-hidden>
        {h.map((hh, i) => (
          <rect key={i} x={8 + i * 8} y={52 - hh} width="5" height={hh} rx="1" fill="currentColor" opacity={0.45 + (i % 3) * 0.2} />
        ))}
      </svg>
    );
  }
  if (id === "sat") {
    return (
      <svg viewBox="0 0 64 64" className={cls} aria-hidden>
        <rect x="6" y="16" width="52" height="8" fill="currentColor" />
        <rect x="6" y="28" width="34" height="8" fill="currentColor" opacity="0.7" />
        <rect x="6" y="40" width="44" height="8" fill="currentColor" opacity="0.4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className={cls} aria-hidden>
      <rect x="10" y="14" width="36" height="28" fill="currentColor" />
      <rect x="18" y="22" width="36" height="28" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

export function BrandMarkMini({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d={MARK_D} fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Tee({
  body = "#161616",
  children,
  className,
}: {
  body?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 160 180" className={className} role="img">
      <path fill={body} d="M32 44 L12 56 L20 84 L36 76 V168 H124 V76 L140 84 L148 56 L128 44 L118 28 H42 Z" />
      <g transform="translate(80 96)">{children}</g>
    </svg>
  );
}

export function Hoodie({
  body = "#111",
  children,
  className,
}: {
  body?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 160 180" className={className} role="img">
      <path fill={body} d="M28 52 L16 40 L22 22 H42 L50 36 H110 L118 22 H138 L144 40 L132 52 V168 H28 Z" />
      <g transform="translate(80 92)">{children}</g>
    </svg>
  );
}

export function Cap({
  body = "#111",
  mark = "#F5C400",
  className,
}: {
  body?: string;
  mark?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 160 100" className={className} role="img">
      <ellipse cx="80" cy="62" rx="54" ry="28" fill={body} />
      <path d="M36 58 C36 28 124 28 124 58 L118 50 C118 30 42 30 42 50 Z" fill={body} />
      <g transform="translate(80 52) scale(0.42) translate(-32 -32)" stroke={mark} fill="none">
        <path d={MARK_D} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function Poster({
  day,
  format,
  kicker,
  title,
  sub,
  variant = "announce",
}: {
  day: Day;
  format: "16:9" | "1:1" | "4:5" | "9:16";
  kicker?: string;
  title: string;
  sub?: string;
  variant?: "announce" | "space" | "chat" | "recap";
}) {
  const ratio =
    format === "16:9" ? "aspect-video" : format === "1:1" ? "aspect-square" : format === "4:5" ? "aspect-[4/5]" : "aspect-[9/16]";
  return (
    <div
      className={cn("relative overflow-hidden", ratio)}
      style={{ background: day.paper, color: day.ink }}
    >
      <div className="absolute inset-0 opacity-80" style={{ color: day.accent }}>
        <Motif id={day.id} className="size-full" />
      </div>
      {variant === "space" ? (
        <div className="absolute right-3 top-3 size-10" style={{ color: day.accent2 }}>
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="155 27" />
          </svg>
        </div>
      ) : null}
      <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em]" style={{ color: day.accent2 }}>
          {kicker ?? day.subBrand}
        </p>
        <div>
          <p className="font-display text-2xl font-extrabold uppercase leading-[0.9] sm:text-3xl">{title}</p>
          {sub ? <p className="mt-2 text-xs leading-relaxed opacity-80">{sub}</p> : null}
          <div className="mt-3 flex items-center justify-between">
            <span className="font-display text-[10px] uppercase tracking-[0.16em]" style={{ color: day.accent2 }}>
              {day.line}
            </span>
            <div className="size-6" style={{ color: day.accent2 }}>
              <BrandMarkMini className="size-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Icon({ id, className }: { id: string; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {id === "music" && (
        <>
          <rect x="4" y="12" width="3" height="8" {...common} />
          <rect x="10" y="8" width="3" height="12" {...common} />
          <rect x="16" y="5" width="3" height="15" {...common} />
        </>
      )}
      {id === "games" && <rect x="5" y="5" width="14" height="14" rx="2" {...common} />}
      {id === "spaces" && <circle cx="12" cy="12" r="8" strokeDasharray="36 8" {...common} />}
      {id === "jobs" && <rect x="4" y="8" width="16" height="11" rx="1" {...common} />}
      {id === "culture" && <path d="M5 16 C6 10 8 6 11 6 C13 6 14 10 15 13 C16 10 17 6 19 6 C21 6 22 12 23 18" {...common} />}
      {id === "community" && (
        <>
          <circle cx="8" cy="10" r="2.2" {...common} />
          <circle cx="16" cy="10" r="2.2" {...common} />
          <circle cx="12" cy="16" r="2.2" {...common} />
        </>
      )}
      {id === "dating" && <path d="M6 14 C6 8 18 8 18 14" {...common} />}
      {id === "messages" && (
        <>
          <path d="M5 8 H19" {...common} />
          <path d="M5 12 H14" {...common} />
          <path d="M5 16 H17" {...common} />
        </>
      )}
      {id === "challenges" && <rect x="6" y="6" width="12" height="12" transform="rotate(8 12 12)" {...common} />}
      {id === "events" && <rect x="5" y="7" width="14" height="12" rx="1" {...common} />}
      {id === "merch" && <path d="M8 8 L4 10 L6 16 L8 14 V20 H16 V14 L18 16 L20 10 L16 8 L14 5 H10 Z" {...common} />}
    </svg>
  );
}
