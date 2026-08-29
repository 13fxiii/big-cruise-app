"use client";

import { CruiseShell } from "@/components/cruise/CruiseShell";
import { CruiseBadge, CruiseCard, CruisePlayerCard } from "@/components/cruise/CruiseUI";
import { SAMPLE_ROOMS, roomMeta } from "@/lib/cruise/rooms";
import { GAMES, type GameSlug } from "@/lib/games/catalog";
import { sfx } from "@/lib/games/audio";
import { playIf, usePlayer } from "@/lib/games/player";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Castle,
  Dices,
  Flame,
  LayoutGrid,
  Layers,
  Mic,
  Moon,
  PenLine,
  Type,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  codenames: LayoutGrid,
  "word-guess": Type,
  draw: PenLine,
  uno: Layers,
  ludo: Dices,
  werewolf: Moon,
  chess: Castle,
  karaoke: Mic,
  truth: Flame,
  kahoot: Zap,
};

export function Arcade() {
  const muted = usePlayer((s) => s.muted);
  const recent = usePlayer((s) => s.recent);
  const stats = usePlayer((s) => s.stats);
  const badges = usePlayer((s) => s.badges);
  const recentGames = recent.map((slug) => GAMES.find((g) => g.slug === slug)).filter(Boolean);

  return (
    <CruiseShell>
      <section className="relative overflow-hidden px-5 pb-6 pt-5 md:px-10 md:pt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-danfo">Game Room</p>
        <h1 className="mt-2 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.86] tracking-tight md:text-7xl">
          One community.
          <br />
          Many rooms.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-bone/80">
          Ten worlds under the same night. Bots, pass-the-phone, or a live cruise room. The identity you sit down with
          is the identity you keep.
        </p>
        <div className="mt-5 max-w-md">
          <CruisePlayerCard compact />
        </div>
      </section>

      <section className="px-5 pb-8 md:px-10">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-concrete">House tables</p>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight">How the floor will look</h2>
          </div>
          <CruiseBadge tone="mute">Sample occupancy</CruiseBadge>
        </div>
        <p className="mb-4 max-w-xl text-sm text-concrete">
          Sitting down opens that world. These seats are how a live floor will look — not people online right now.
        </p>
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
          {SAMPLE_ROOMS.map((room) => {
            const meta = roomMeta(room.game);
            return (
              <Link
                key={room.code}
                to="/play/$slug"
                params={{ slug: room.game }}
                onClick={() => playIf(muted, sfx.tap)}
                className="min-w-[220px] shrink-0"
              >
                <CruiseCard interactive className="h-full">
                  <div className="flex items-center justify-between gap-2">
                    <CruiseBadge tone={room.status === "live" ? "danfo" : "bone"}>{room.status}</CruiseBadge>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-concrete">{room.kind}</span>
                  </div>
                  <p className="mt-4 font-display text-2xl font-bold uppercase leading-none" style={{ color: meta?.accent }}>
                    {meta?.name}
                  </p>
                  <p className="mt-3 text-sm text-bone/75">
                    {room.host} · {room.filled}/{room.seats}
                    {room.spectators ? ` · ${room.spectators} watching` : ""}
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-danfo">{room.code}</p>
                </CruiseCard>
              </Link>
            );
          })}
        </div>
      </section>

      {recentGames.length ? (
        <section className="px-5 pb-8 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-concrete">Recently played</p>
          <h2 className="mb-4 font-display text-3xl font-bold uppercase tracking-tight">Sit back down</h2>
          <div className="flex flex-wrap gap-2">
            {recentGames.map((g) =>
              g ? (
                <Link
                  key={g.slug}
                  to="/play/$slug"
                  params={{ slug: g.slug }}
                  className="inline-flex min-h-11 items-center border border-lane px-4 font-display text-sm font-bold uppercase tracking-[0.14em] hover:border-danfo"
                  style={{ color: g.accent }}
                >
                  {g.name}
                  <span className="ml-2 font-mono text-[10px] text-concrete">
                    {stats[g.slug as GameSlug]?.played ?? 0} sits
                  </span>
                </Link>
              ) : null,
            )}
          </div>
        </section>
      ) : null}

      <section>
        <div className="px-5 pb-4 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-concrete">Available games</p>
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight">Pick a world</h2>
        </div>
        <div className="grid gap-px bg-lane md:grid-cols-2 xl:grid-cols-5">
          {GAMES.map((g, i) => {
            const Icon = ICONS[g.slug];
            return (
              <Link
                key={g.slug}
                to="/play/$slug"
                params={{ slug: g.slug }}
                onClick={() => playIf(muted, sfx.tap)}
                className={cn(
                  "group relative flex min-h-[280px] flex-col justify-between overflow-hidden bg-midnight p-6 transition-[background-color,transform] duration-200 hover:bg-asphalt md:min-h-[320px]",
                  i === 0 && "xl:col-span-2 xl:min-h-[360px]",
                )}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-10 size-40 opacity-20 transition-opacity duration-200 group-hover:opacity-40"
                  style={{ color: g.accent }}
                >
                  {Icon ? <Icon className="size-full" strokeWidth={1} /> : null}
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-concrete">
                    {String(i + 1).padStart(2, "0")} · {g.day}
                  </span>
                  <h2
                    className="mt-4 font-display text-4xl font-bold uppercase leading-none tracking-tight md:text-5xl"
                    style={{ color: g.accent }}
                  >
                    {g.name}
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone/75">{g.blurb}</p>
                </div>
                <div className="mt-6 flex items-end justify-between gap-3">
                  <p className="font-display text-lg uppercase tracking-[0.1em] text-bone">{g.line}</p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
                    {g.players} · {g.feel}
                  </span>
                </div>
                <span
                  className="pointer-events-none absolute bottom-0 left-0 h-1 w-12 origin-left -rotate-[8deg] transition-[width] duration-200 group-hover:w-24"
                  style={{ background: g.accent }}
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 px-5 py-10 md:grid-cols-2 md:px-10">
        <CruiseCard>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-danfo">Challenges</p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase">This week in the house</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-bone/80">
            <li>Sit down in four different games — Week rider.</li>
            <li>Host a cruise room — the Host badge.</li>
            <li>Win once — First blood.</li>
          </ul>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">
            Badges on this device · {badges.length} unlocked
          </p>
        </CruiseCard>
        <CruiseCard>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-danfo">Coming to the house</p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase">Same floor. More rooms.</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-bone/80">
            <li>Private rooms and invites.</li>
            <li>Community tournaments.</li>
            <li>Spectating and match history across devices.</li>
          </ul>
          <Link
            to="/rewards"
            className="mt-6 inline-flex min-h-11 items-center font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo hover:text-bone"
          >
            How BCH points work
          </Link>
        </CruiseCard>
      </section>
    </CruiseShell>
  );
}
