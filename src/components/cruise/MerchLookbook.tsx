"use client";

import { TeeMock } from "@/components/brand/garments";
import { EmbroideryMark, Wordmark } from "@/components/brand/marks";
import { CruisePage } from "@/components/cruise/CruiseShell";
import { CruiseBadge, CruiseCard } from "@/components/cruise/CruiseUI";
import { SizeHold } from "@/components/cruise/SizeHold";
import { brand } from "@/lib/brand";
import {
  dayMerch,
  firstDrop,
  flagship,
  merch,
  naira,
  recommendation,
  sizes,
  teeConcepts,
} from "@/lib/cruise/merch";
import type { HoldCount } from "@/lib/cruise/holds";
import { days, type DayId } from "@/lib/days";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

const hero = teeConcepts.find((c) => c.id === "minimal")!;

function mergeHold(rows: HoldCount[], row: HoldCount): HoldCount[] {
  const i = rows.findIndex((r) => r.sku === row.sku && r.size === row.size);
  if (i === -1) return [...rows, row];
  const next = [...rows];
  next[i] = row;
  return next;
}

export function MerchLookbook({ initialHolds = [] }: { initialHolds?: HoldCount[] }) {
  const [side, setSide] = useState<"front" | "back">("front");
  const [active, setActive] = useState(hero.id);
  const [holds, setHolds] = useState<HoldCount[]>(initialHolds);
  const concept = teeConcepts.find((c) => c.id === active) ?? hero;

  function onHeld(row: HoldCount) {
    setHolds((prev) => mergeHold(prev, row));
  }

  return (
    <CruisePage
      kicker="7 Days of Cruise · Merch"
      title="The week, on a midnight tee."
      lede="Your illustrations. Barlow Condensed. Same 240 GSM blank. Chest spark in the day's accent. Neck still says BIG CRUISE. Hold a size — no login, no name."
    >
      <div className="mb-8 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-danfo">
        <a href={brand.urls.product} target="_blank" rel="noreferrer" className="hover:text-bone">
          {brand.urls.product.replace("https://", "")}
        </a>
        <a href={`${brand.urls.product}/merch`} target="_blank" rel="noreferrer" className="hover:text-bone">
          {brand.urls.product.replace("https://", "")}/merch
        </a>
        <a href={brand.urls.brandBook} target="_blank" rel="noreferrer" className="hover:text-bone">
          {brand.urls.brandBook.replace("https://", "")}
        </a>
      </div>

      <WeekDays holds={holds} onHeld={onHeld} />

      <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.22em] text-concrete">Drop 00 · House</p>
      <h2 className="mt-2 font-display text-3xl font-bold uppercase">Two house tees. One cap.</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {firstDrop.skus.map((s) => {
          const c = teeConcepts.find((t) => t.id === s.concept) ?? hero;
          return (
            <CruiseCard key={s.sku} className="flex flex-col">
              <div className="mx-auto w-40 py-4">
                {s.sku.includes("CAP") ? (
                  <div className="relative mx-auto aspect-square overflow-hidden rounded-[16px]">
                    <img src="/brand/merch/cap-blank.jpg" alt="Midnight dad cap" className="size-full object-cover" />
                    <EmbroideryMark className="absolute left-1/2 top-[38%] size-10 -translate-x-1/2 text-danfo" />
                  </div>
                ) : (
                  <TeeMock concept={c} side={s.concept === "statement" ? "back" : "front"} />
                )}
              </div>
              <CruiseBadge tone="mute">{s.sku}</CruiseBadge>
              <p className="mt-3 font-display text-2xl font-bold uppercase leading-none">{s.name}</p>
              <p className="mt-2 text-sm text-bone/70">{s.print}</p>
              <p className="mt-4 font-display text-xl font-bold text-danfo">{naira.format(s.retail)}</p>
              <SizeHold sku={s.sku} holds={holds} onHeld={onHeld} />
            </CruiseCard>
          );
        })}
      </div>

      <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.22em] text-concrete">The eight</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-3xl font-bold uppercase">House graphics. One mark.</h2>
        <div className="flex rounded-full border border-lane p-1">
          {(["front", "back"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSide(s)}
              className={`min-h-11 rounded-full px-4 font-display text-sm font-bold uppercase tracking-[0.14em] ${
                side === s ? "bg-danfo text-midnight" : "text-bone/70"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {teeConcepts.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.id)}
            className={`min-h-11 shrink-0 rounded-full px-4 font-display text-sm font-bold uppercase tracking-[0.12em] ${
              active === c.id ? "bg-bone text-midnight" : "bg-asphalt text-bone/70"
            }`}
          >
            {c.n} {c.name}
          </button>
        ))}
      </div>
      <div className="mt-6 grid items-center gap-8 md:grid-cols-2">
        <div className="rounded-[24px] bg-asphalt p-6 md:p-10">
          <TeeMock concept={concept} side={side} className="mx-auto max-w-xs" />
        </div>
        <div>
          <CruiseBadge tone={concept.tier === "core" ? "danfo" : "mute"}>{concept.tier}</CruiseBadge>
          <p className="mt-4 font-display text-4xl font-extrabold uppercase leading-none">{concept.name}</p>
          <p className="mt-4 text-base leading-relaxed text-bone/80">{concept.philosophy}</p>
        </div>
      </div>

      <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.22em] text-concrete">Sizing · unisex oversized</p>
      <div className="mt-4 overflow-x-auto rounded-[20px] bg-asphalt">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="font-display text-xs uppercase tracking-[0.14em] text-concrete">
              <th className="px-4 py-3">Size</th>
              <th>Chest</th>
              <th>Shoulder</th>
              <th>Length</th>
              <th>Sleeve</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((row) => (
              <tr key={row.size} className="border-t border-lane">
                <td className="px-4 py-2 font-display font-bold">{row.size}</td>
                <td>{row.chest} cm</td>
                <td>{row.shoulder} cm</td>
                <td>{row.length} cm</td>
                <td>{row.sleeve} cm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-16 rounded-[24px] bg-asphalt p-6 md:p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-danfo">House first</p>
        <p className="mt-3 font-display text-3xl font-extrabold uppercase leading-none md:text-4xl">
          {recommendation.design}
        </p>
        <p className="mt-4 max-w-xl text-sm text-bone/75">{flagship.fibre} · {flagship.gsm} GSM. Week tees are the same blank, full-colour back.</p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Link
          to="/brand"
          hash="capsules"
          className="inline-flex min-h-11 items-center font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo"
        >
          7 Days in the brand book
        </Link>
        <Wordmark className="text-xl text-bone" compact />
      </div>
      <p className="mt-10 max-w-xl text-sm text-concrete">
        {merch.wearer} · {merch.watcher} · {merch.insider}
      </p>
    </CruisePage>
  );
}

function WeekDays({
  holds,
  onHeld,
}: {
  holds: HoldCount[];
  onHeld: (row: HoldCount) => void;
}) {
  const [id, setId] = useState<DayId>("mon");
  const d = days.find((x) => x.id === id) ?? days[0]!;
  const piece = dayMerch.find((m) => m.id === id) ?? dayMerch[0]!;

  return (
    <section>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {days.map((day) => (
          <button
            key={day.id}
            type="button"
            onClick={() => setId(day.id)}
            className={`min-h-11 shrink-0 rounded-full px-4 font-display text-sm font-bold uppercase tracking-[0.12em] ${
              id === day.id ? "bg-bone text-midnight" : "bg-asphalt text-bone/70"
            }`}
          >
            {day.weekday.slice(0, 3)}
          </button>
        ))}
      </div>

      <div className="mt-6 grid items-center gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[24px] bg-midnight">
          <img src={piece.tee} alt={`${d.subBrand} on a midnight oversized tee`} className="aspect-[3/4] w-full object-cover" />
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: d.accent }}>
            {d.n} · {d.weekday} · {piece.sku}
          </p>
          <p className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.86] md:text-6xl" style={{ color: d.accent }}>
            {d.subBrand}
          </p>
          <p className="mt-4 font-display text-2xl font-semibold uppercase tracking-[0.08em] text-bone">{d.line}</p>
          <p className="mt-4 text-sm text-bone/70">{piece.method}</p>
          <p className="mt-6 font-display text-2xl font-bold text-danfo">{naira.format(piece.retail)}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">240 GSM · DTF back · chest spark</p>
          <SizeHold sku={piece.sku} holds={holds} onHeld={onHeld} />
          <div className="mt-8 overflow-hidden rounded-[16px]">
            <img src={piece.print} alt={`${d.subBrand} print file`} className="aspect-[4/5] w-full max-w-xs object-cover" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 md:grid-cols-7">
        {dayMerch.map((m) => {
          const day = days.find((x) => x.id === m.id)!;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setId(m.id)}
              className={`overflow-hidden rounded-[16px] text-left ${id === m.id ? "shadow-[var(--shadow-border-hover)]" : ""}`}
            >
              <img src={m.tee} alt={day.subBrand} className="aspect-[3/4] w-full object-cover" />
              <p className="mt-2 font-display text-[11px] font-bold uppercase tracking-[0.1em] text-bone/80">{day.weekday.slice(0, 3)}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
