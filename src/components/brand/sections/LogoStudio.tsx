"use client";

import { Chapter, Panel, Prose } from "@/components/brand/Chapter";
import {
  HorizontalLockup,
  LiveMark,
  MidnightMark,
  Spark,
  StackedLockup,
  Wordmark,
  concepts,
} from "@/components/brand/marks";
import { axes, avg, scores } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { useState } from "react";

const grounds = [
  { id: "midnight", bg: "bg-midnight", fg: "text-danfo", label: "Midnight" },
  { id: "danfo", bg: "bg-danfo", fg: "text-midnight", label: "Danfo" },
  { id: "bone", bg: "bg-bone", fg: "text-midnight", label: "Bone" },
] as const;

export function LogoStudio() {
  const [ground, setGround] = useState<(typeof grounds)[number]["id"]>("midnight");
  const g = grounds.find((x) => x.id === ground) ?? grounds[0];

  return (
    <>
      <Chapter id="concepts" n="07" kicker="Mark" title="Eight directions. One 〽️.">
        <Prose>
          <p>
            No yacht. No boat. No anchor. No danfo as a logo. The brief was to design the <em className="not-italic text-danfo">idea</em> of
            cruising — motion, belonging, conversation, midnight — and to treat 〽️ as identity, not decoration.
          </p>
          <p>
            Each mark is a real vector. Switch the ground. Look at the silhouette. If it dies at the size of an X avatar,
            it is not a candidate.
          </p>
        </Prose>

        <div className="mt-8 flex flex-wrap gap-2">
          {grounds.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setGround(item.id)}
              className={cn(
                "min-h-11 px-4 font-display text-sm font-bold uppercase tracking-[0.16em] transition-colors",
                ground === item.id ? "bg-danfo text-midnight" : "bg-asphalt text-bone hover:text-danfo",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {concepts.map((c) => (
            <Panel key={c.id} className="p-0 overflow-hidden rounded-[20px]">
              <div className={cn("flex min-h-56 items-center justify-center", g.bg)}>
                <c.Mark className={cn("size-28 sm:size-32", g.fg)} />
              </div>
              <div className="p-5">
                <p className="font-mono text-sm font-medium tracking-wider text-danfo">{c.id}</p>
                <h3 className="mt-1 font-display text-2xl font-extrabold uppercase tracking-[0.04em] text-bone">
                  {c.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-concrete">{c.idea}</p>
              </div>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="evaluation" n="08" title="The 〽️ already belonged to the room.">
        <Prose>
          <p>
            Scores are out of 10. Nothing is a 10 across the board — that would be a lie. The question is which mark can
            carry merch, an app icon, an X avatar, and a midnight Space without looking like another streetwear drop.
          </p>
        </Prose>

        <div className="mt-8 overflow-x-auto rounded-[20px] bg-asphalt shadow-[var(--shadow-border)]">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-lane font-display text-xs uppercase tracking-[0.14em] text-concrete">
                <th className="px-4 py-3 font-semibold">Concept</th>
                {axes.map((a) => (
                  <th key={a.key} className="px-2 py-3 font-semibold">
                    {a.label}
                  </th>
                ))}
                <th className="px-4 py-3 font-semibold">Avg</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((row) => {
                const a = avg(row);
                const top = row.id === "08";
                return (
                  <tr key={row.id} className={cn("border-b border-lane/70", top && "bg-danfo/10")}>
                    <td className="px-4 py-3 font-display font-bold uppercase text-bone">
                      {row.id} {row.name}
                    </td>
                    {axes.map((ax) => (
                      <td key={ax.key} className="px-2 py-3 tabular-nums text-bone/80">
                        {row[ax.key as keyof typeof row] as number}
                      </td>
                    ))}
                    <td className={cn("px-4 py-3 font-display text-lg font-bold tabular-nums", top ? "text-danfo" : "text-bone")}>
                      {a.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Panel>
            <p className="font-mono text-sm font-medium tracking-wider text-danfo">Top 03</p>
            <h3 className="mt-1 font-display text-2xl font-extrabold uppercase text-bone">Digital Street</h3>
            <p className="mt-2 text-sm text-concrete">
              Best app icon. Vinyl-cut construction is the most Lagos-native drawing method in the set. Weaker on
              embroidery and long-run merch because of the squircle frame.
            </p>
          </Panel>
          <Panel>
            <p className="font-mono text-sm font-medium tracking-wider text-danfo">Top 02</p>
            <h3 className="mt-1 font-display text-2xl font-extrabold uppercase text-bone">Negative Cut</h3>
            <p className="mt-2 text-sm text-concrete">
              The hidden C is clever and ownable. Strong at badge size. Slightly colder than the community actually is.
            </p>
          </Panel>
          <Panel className="bg-danfo">
            <p className="font-mono text-sm font-medium tracking-wider text-midnight">Top 01 — Master</p>
            <h3 className="mt-1 font-display text-2xl font-extrabold uppercase text-midnight">The Signature</h3>
            <p className="mt-2 text-sm text-midnight/75">
              Members already write 〽️. V1.1 is that mark drawn as a custom one-color stroke — lopsided peaks, a room in
              the valley, a committed drop — so it can live on a tee, an avatar, and a 16px favicon without shipping the
              emoji.
            </p>
          </Panel>
        </div>
      </Chapter>

      <Chapter id="logo" n="09" title="The signature. The midnight. The live.">
        <Prose>
          <p>
            V1.0 locked the idea: 〽️ is the DNA. V1.1 draws it as a custom stroke. Three expressions follow. The
            signature is the period after BIG CRUISE. The Midnight Mark is the community avatar. The Live Mark is a Space
            that is on. Full lockup family lives in V1.1.
          </p>
        </Prose>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { t: "Signature", d: "Symbol-only. Chest embroidery. The period at the end of BIG CRUISE.", El: Spark },
            { t: "Midnight", d: "Filled circle. X avatar. App icon. Favicon. Stickers.", El: MidnightMark },
            { t: "Live", d: "Open ring. The Space is on. Headers, hoodies, motion.", El: LiveMark },
          ].map((item) => (
            <Panel key={item.t} className="flex flex-col items-center text-center">
              <item.El className="size-28 text-danfo" />
              <p className="mt-4 font-display text-2xl font-extrabold uppercase text-bone">{item.t}</p>
              <p className="mt-2 text-sm text-concrete">{item.d}</p>
            </Panel>
          ))}
        </div>

        <div className="mt-8 grid gap-4">
          <Panel className="flex min-h-40 items-center justify-center bg-midnight">
            <HorizontalLockup />
          </Panel>
          <div className="grid gap-4 md:grid-cols-2">
            <Panel className="flex min-h-56 items-center justify-center">
              <StackedLockup />
            </Panel>
            <Panel className="flex min-h-56 items-center justify-center bg-danfo">
              <Wordmark className="text-4xl text-midnight" sparkClassName="text-midnight" />
            </Panel>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Panel className="flex min-h-32 items-center justify-center">
              <p className="font-display text-xs uppercase tracking-[0.16em] text-concrete">Small</p>
              <Spark className="ml-4 size-6 text-danfo" />
            </Panel>
            <Panel className="flex min-h-32 items-center justify-center bg-bone">
              <MidnightMark className="size-12 text-midnight" />
            </Panel>
            <Panel className="flex min-h-32 items-center justify-center">
              <Wordmark className="text-2xl text-bone" compact />
            </Panel>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Panel>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">Clear space</p>
            <p className="mt-2 text-sm leading-relaxed text-concrete">
              Keep a quiet zone around the mark equal to the height of one peak. Do not crowd it with the old laugh
              badges, waveforms, or chat bubbles.
            </p>
          </Panel>
          <Panel>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">Minimum size</p>
            <p className="mt-2 text-sm leading-relaxed text-concrete">
              〽️: 16px digital / 8mm print. Midnight Mark: 24px digital. Below that, use the 〽️ alone. One-color
              always works — the geometry was built for screen print and embroidery.
            </p>
          </Panel>
        </div>
      </Chapter>
    </>
  );
}
