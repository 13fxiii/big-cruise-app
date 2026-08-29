"use client";

import { LiveMark, Spark, Wordmark } from "@/components/brand/marks";
import { CruiseBackground, type CruiseDensity } from "@/components/cruise/CruiseBackground";
import { CruiseLoader } from "@/components/cruise/CruiseLoader";
import { CruiseAvatar, CruiseModal, CruiseToastRack } from "@/components/cruise/CruiseUI";
import { usePlayer } from "@/lib/games/player";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Disc3, Gamepad2, IdCard, MoreHorizontal, Radio, Users } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

const PRIMARY = [
  { to: "/", label: "Game Room", icon: Gamepad2 },
  { to: "/community", label: "Community", icon: Users },
  { to: "/spaces", label: "Spaces", icon: Radio },
  { to: "/id", label: "ID", icon: IdCard },
] as const;

const MORE = [
  { to: "/music", label: "Music", icon: Disc3 },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/rewards", label: "Rewards" },
  { to: "/merch", label: "Merch" },
  { to: "/settings", label: "Settings" },
  { to: "/brand", label: "Brand book" },
] as const;

function useHydratePlayer() {
  const hydrate = usePlayer((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
}

export function CruiseHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const name = usePlayer((s) => s.name);
  const [more, setMore] = useState(false);

  return (
    <>
      <header className="relative z-20 flex items-center gap-4 border-b border-lane/80 bg-midnight/70 px-4 py-3 backdrop-blur-md md:px-8">
        <Link to="/" className="flex min-h-11 items-center gap-3" aria-label="Game Room">
          <LiveMark className="size-10 text-danfo" />
          <Wordmark className="hidden text-xl text-bone sm:inline" compact />
        </Link>
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {PRIMARY.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "inline-flex min-h-11 items-center px-3 font-display text-sm font-bold uppercase tracking-[0.16em] transition-colors duration-150",
                  active ? "text-danfo" : "text-bone/70 hover:text-bone",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setMore(true)}
            className="inline-flex min-h-11 items-center px-3 font-display text-sm font-bold uppercase tracking-[0.16em] text-bone/70 hover:text-bone"
          >
            More
          </button>
          <Link to="/id" className="ml-2">
            <CruiseAvatar name={name} size="sm" />
            <span className="sr-only">Cruise ID</span>
          </Link>
        </nav>
        <Link to="/id" className="ml-auto md:hidden">
          <CruiseAvatar name={name} size="sm" />
          <span className="sr-only">Cruise ID</span>
        </Link>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-lane bg-midnight/92 backdrop-blur-md md:hidden safe-bottom">
        {PRIMARY.map((item) => {
          const Icon = item.icon;
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 font-mono text-[9px] uppercase tracking-[0.16em]",
                active ? "text-danfo" : "text-concrete",
              )}
            >
              <Icon className="size-5" strokeWidth={1.6} />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setMore(true)}
          className="flex min-h-14 flex-1 flex-col items-center justify-center gap-1 font-mono text-[9px] uppercase tracking-[0.16em] text-concrete"
        >
          <MoreHorizontal className="size-5" strokeWidth={1.6} />
          More
        </button>
      </nav>

      <CruiseModal open={more} onClose={() => setMore(false)} title="More of the house">
        <div className="grid gap-1">
          {MORE.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMore(false)}
              className="flex min-h-12 items-center justify-between border-b border-lane font-display text-lg font-bold uppercase tracking-[0.1em] text-bone hover:text-danfo"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </CruiseModal>
    </>
  );
}

function HouseFloor() {
  return (
    <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 px-5 py-8 md:px-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Where the cruise lives · 2026</p>
      <Spark className="size-6 text-danfo" />
      <Link
        to="/brand"
        className="font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo hover:text-bone"
      >
        Official brand identity
      </Link>
    </footer>
  );
}

export function CruiseShell({
  children,
  density = "default",
  accent,
  boot = false,
}: {
  children: ReactNode;
  density?: CruiseDensity;
  accent?: string;
  boot?: boolean;
}) {
  useHydratePlayer();
  return (
    <div className="relative min-h-dvh bg-midnight text-bone">
      <CruiseBackground density={density} accent={accent} position="fixed" />
      {boot ? <CruiseLoader /> : null}
      <div className="relative z-10 flex min-h-dvh flex-col pb-16 md:pb-0">
        <CruiseHeader />
        <div className="flex-1">{children}</div>
        <HouseFloor />
      </div>
      <CruiseToastRack />
    </div>
  );
}

export function CruisePage({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <CruiseShell>
      <div className="px-5 py-8 md:px-10 md:py-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-danfo">{kicker}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-[0.88] tracking-tight md:text-6xl">
          {title}
        </h1>
        {lede ? <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/80 md:text-lg">{lede}</p> : null}
        <div className="mt-10">{children}</div>
      </div>
    </CruiseShell>
  );
}

export function CruiseGameRoom({
  children,
  accent,
}: {
  children: ReactNode;
  accent?: string;
}) {
  useHydratePlayer();
  return (
    <div className="relative min-h-dvh bg-midnight text-bone">
      <CruiseBackground density="game" accent={accent} position="fixed" />
      <div className="relative z-10 flex min-h-dvh flex-col">{children}</div>
      <CruiseToastRack />
    </div>
  );
}
