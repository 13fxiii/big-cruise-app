"use client";

import { Spark } from "@/components/brand/marks";
import { PERSISTENCE, initials, playerLevel, usePlayer } from "@/lib/games/player";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useEffect } from "react";

export function CruiseButton({
  className,
  variant = "solid",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost" | "line";
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 px-5 font-display text-lg font-bold uppercase tracking-[0.14em] transition-[transform,background-color,color,border-color] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-50",
        variant === "solid" && "bg-danfo text-midnight hover:bg-bone",
        variant === "ghost" && "bg-transparent text-bone hover:text-danfo",
        variant === "line" && "border border-lane text-bone hover:border-danfo hover:text-danfo",
        className,
      )}
      {...props}
    />
  );
}

export function CruiseCard({
  className,
  children,
  interactive = false,
}: {
  className?: string;
  children: ReactNode;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[20px] bg-asphalt p-5 shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] md:p-6",
        interactive && "hover:-translate-y-0.5 hover:shadow-[var(--shadow-border-hover)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CruiseBadge({
  children,
  tone = "danfo",
  className,
}: {
  children: ReactNode;
  tone?: "danfo" | "bone" | "mute";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center px-2.5 font-mono text-[10px] uppercase tracking-[0.18em]",
        tone === "danfo" && "bg-danfo text-midnight",
        tone === "bone" && "border border-lane text-bone",
        tone === "mute" && "text-concrete",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function CruiseLocalStamp({ className }: { className?: string }) {
  return (
    <p className={cn("font-mono text-[10px] uppercase tracking-[0.2em] text-concrete", className)}>
      {PERSISTENCE.label}
    </p>
  );
}

export function CruiseAvatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-curb font-display font-bold uppercase text-danfo ring-1 ring-danfo/40",
        size === "sm" && "size-8 text-xs",
        size === "md" && "size-11 text-sm",
        size === "lg" && "size-16 text-xl",
        className,
      )}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

export function CruiseModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal aria-label={title}>
      <button type="button" className="absolute inset-0 bg-midnight/80" onClick={onClose} aria-label="Close" />
      <div className="relative z-10 w-full max-w-lg rounded-t-[24px] bg-asphalt p-6 shadow-[var(--shadow-border)] sm:rounded-[24px]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="font-display text-2xl font-bold uppercase tracking-[0.08em]">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center border border-lane text-bone hover:border-danfo hover:text-danfo"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function CruiseToastRack() {
  const toasts = usePlayer((s) => s.toasts);
  const dismiss = usePlayer((s) => s.dismissToast);
  if (!toasts.length) return null;
  return (
    <div className="pointer-events-none fixed bottom-20 right-4 z-50 flex w-[min(100%-2rem,20rem)] flex-col gap-2 md:bottom-6">
      {toasts.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => dismiss(t.id)}
          className="pointer-events-auto toast-in flex items-start gap-3 border border-danfo/40 bg-asphalt px-4 py-3 text-left shadow-[var(--shadow-border)]"
        >
          <Spark className="mt-0.5 size-5 shrink-0 text-danfo" />
          <span>
            <span className="block font-display text-sm font-bold uppercase tracking-[0.12em] text-danfo">{t.title}</span>
            {t.body ? <span className="mt-0.5 block text-xs text-bone/75">{t.body}</span> : null}
          </span>
        </button>
      ))}
    </div>
  );
}

export function CruiseNotification({
  title,
  body,
  time,
}: {
  title: string;
  body: string;
  time: string;
}) {
  return (
    <div className="flex gap-3 border-b border-lane px-1 py-4">
      <Spark className="mt-1 size-5 shrink-0 text-danfo" />
      <div className="min-w-0 flex-1">
        <p className="font-display text-lg font-bold uppercase leading-tight">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-bone/75">{body}</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">{time}</p>
      </div>
    </div>
  );
}

export function CruisePlayerCard({ compact = false }: { compact?: boolean }) {
  const name = usePlayer((s) => s.name);
  const cruiseId = usePlayer((s) => s.cruiseId);
  const points = usePlayer((s) => s.points);
  const badges = usePlayer((s) => s.badges);
  const joinedAt = usePlayer((s) => s.joinedAt);
  const level = playerLevel(points);
  const joined = joinedAt
    ? new Date(joinedAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })
    : "—";

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <CruiseAvatar name={name} size="sm" />
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold uppercase tracking-[0.1em]">{name}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">
            {cruiseId} · Lv {level} · {points} BCH
          </p>
        </div>
      </div>
    );
  }

  return (
    <CruiseCard className="relative overflow-hidden">
      <Spark className="pointer-events-none absolute -right-6 -top-8 size-36 text-danfo/10" />
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-danfo">Cruise ID</p>
      <div className="mt-4 flex items-center gap-4">
        <CruiseAvatar name={name} size="lg" />
        <div>
          <p className="font-display text-3xl font-bold uppercase leading-none tracking-tight">{name}</p>
          <p className="mt-2 font-mono text-xs tracking-[0.2em] text-danfo">{cruiseId}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-lane pt-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">Level</p>
          <p className="font-display text-2xl font-bold">{level}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">BCH</p>
          <p className="font-display text-2xl font-bold text-danfo">{points}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">Joined</p>
          <p className="font-display text-2xl font-bold">{joined}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {badges.map((id) => (
          <CruiseBadge key={id} tone="bone">
            {id.replace("-", " ")}
          </CruiseBadge>
        ))}
      </div>
      <CruiseLocalStamp className="mt-5" />
    </CruiseCard>
  );
}
