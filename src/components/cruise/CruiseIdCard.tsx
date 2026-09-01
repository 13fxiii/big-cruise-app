"use client";

import { LiveMark, Spark, Wordmark } from "@/components/brand/marks";
import { CruisePattern } from "@/components/cruise/CruiseBackground";
import { CruiseBadge } from "@/components/cruise/CruiseUI";
import {
  CARD_PILLARS,
  FOUNDER_CARD,
  cardAchievements,
  cardStats,
  formatHandle,
  isFounder,
  memberRank,
} from "@/lib/cruise/id-card";
import { CruiseQr } from "@/lib/cruise/qr";
import { memberHref, prettyId } from "@/lib/cruise/share-card";
import { initials, playerLevel, usePlayer } from "@/lib/games/player";
import { type ReactNode, useMemo, useState } from "react";

export function CruiseIdCard() {
  const name = usePlayer((s) => s.name);
  const handle = usePlayer((s) => s.handle);
  const line = usePlayer((s) => s.line);
  const photo = usePlayer((s) => s.photo);
  const cruiseId = usePlayer((s) => s.cruiseId);
  const points = usePlayer((s) => s.points);
  const badges = usePlayer((s) => s.badges);
  const stats = usePlayer((s) => s.stats);
  const joinedAt = usePlayer((s) => s.joinedAt);

  const founder = isFounder(name, handle);
  const displayName = founder ? FOUNDER_CARD.name : name;
  const displayHandle = founder ? FOUNDER_CARD.handle : formatHandle(handle);
  const displayLine = (line && line.trim()) || (founder ? FOUNDER_CARD.line : "You are in the room.");
  const sits = Object.values(stats).reduce((n, s) => n + (s?.played || 0), 0);
  const wins = Object.values(stats).reduce((n, s) => n + (s?.won || 0), 0);
  const rank = memberRank({ founder, badges, points, sits });
  const figures = cardStats({ founder, points, joinedAt, stats, badges });
  const achievements = cardAchievements({ founder, badges });
  const href = useMemo(
    () =>
      memberHref({
        code: cruiseId,
        name: displayName,
        handle: displayHandle,
        rank,
        points,
        level: playerLevel(points),
        sits,
        wins,
      }),
    [cruiseId, displayName, displayHandle, rank, points, sits, wins],
  );
  const [back, setBack] = useState(false);

  return (
    <div className="grid w-full max-w-3xl gap-4">
      <button type="button" className="id-flip text-left" onClick={() => setBack((v) => !v)}>
        <div className={back ? "id-flip-inner is-back" : "id-flip-inner"}>
          <div className="id-face">
            <IdShell>
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-danfo/90">{FOUNDER_CARD.kicker}</p>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/70">Official member</span>
              </div>
              <LiveMark className="pointer-events-none absolute -right-6 top-8 size-48 text-danfo opacity-20 md:size-64" />
              <div className="relative mt-6 flex gap-4 sm:gap-5">
                <IdPortrait name={displayName} photo={photo} verified={founder} />
                <div className="min-w-0 pt-1">
                  <p className="flex items-center gap-1 font-display text-4xl font-extrabold uppercase leading-none tracking-tight md:text-5xl">
                    {displayName}
                    <Spark className="h-[0.72em] w-[0.86em] text-danfo" />
                  </p>
                  {displayHandle ? (
                    <p className="mt-2 font-mono text-xs tracking-[0.12em] text-concrete">{displayHandle}</p>
                  ) : null}
                  <p className="mt-2 font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo">{rank}</p>
                  <p className="mt-3 max-w-sm text-sm italic text-bone/75">“{displayLine}”</p>
                </div>
              </div>
              <div className="relative mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-[12px] bg-lane sm:grid-cols-4">
                {figures.map((s) => (
                  <div key={s.label} className="bg-curb px-3 py-3">
                    <p className="font-display text-xl font-bold uppercase leading-none text-danfo md:text-2xl">{s.value}</p>
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="relative mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">BCH achievements</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {achievements.map((a) => (
                      <CruiseBadge key={a} tone="bone">
                        {a}
                      </CruiseBadge>
                    ))}
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Member ID</p>
                  <p className="mt-1 font-mono text-sm tracking-[0.22em] text-danfo md:text-base">{prettyId(cruiseId)}</p>
                </div>
              </div>
            </IdShell>
          </div>
          <div className="id-face id-face-back">
            <IdShell>
              <Wordmark className="text-2xl text-bone md:text-3xl" />
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-danfo">The biggest vibe community</p>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/80 md:text-base">
                Entertainment. Banter. Memes. Music. Games. Culture. One cruise.
              </p>
              <div className="mt-6 flex flex-col-reverse items-stretch gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="grid grid-cols-2 gap-3">
                    {CARD_PILLARS.map((p) => (
                      <p key={p.label} className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.12em]">
                        <Spark className="size-4 text-danfo" />
                        {p.label}
                      </p>
                    ))}
                  </div>
                  <p className="mt-8 font-display text-3xl font-bold uppercase leading-[0.9] text-danfo md:text-4xl">
                    Biggest vibes.
                    <br />
                    Loudest community.
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Connect / Vibe / Cruise</p>
                </div>
                <div className="w-full max-w-[168px] shrink-0 sm:w-[168px]">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">Scan to view profile</p>
                  <CruiseQr value={href} />
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-danfo">{prettyId(cruiseId)}</p>
                </div>
              </div>
            </IdShell>
          </div>
        </div>
      </button>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">Tap to flip</p>
    </div>
  );
}

function IdShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-danfo/40 bg-midnight p-5 shadow-[0_0_0_1px_rgba(245,196,0,0.12)] md:p-7">
      <CruisePattern className="opacity-[0.08]" />
      <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-danfo/10 blur-[80px]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function IdPortrait({
  name,
  photo,
  verified,
}: {
  name: string;
  photo?: string;
  verified: boolean;
}) {
  return (
    <span className="relative size-[4.75rem] shrink-0 sm:size-24">
      <span className="flex size-full items-center justify-center overflow-hidden rounded-full bg-curb ring-2 ring-danfo">
        {photo ? (
          <img src={photo} alt="" className="size-full object-cover" />
        ) : (
          <span className="font-display text-2xl font-bold uppercase text-danfo sm:text-3xl">{initials(name)}</span>
        )}
      </span>
      {verified ? (
        <span className="absolute -bottom-0.5 -right-0.5 flex size-7 items-center justify-center rounded-full bg-danfo text-midnight ring-2 ring-midnight">
          <Spark className="size-4" />
        </span>
      ) : null}
    </span>
  );
}
