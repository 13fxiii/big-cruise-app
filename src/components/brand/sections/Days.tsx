"use client";

import { Chapter, Panel, Prose } from "@/components/brand/Chapter";
import { Motif, Poster } from "@/components/brand/day-marks";
import { Spark } from "@/components/brand/marks";
import { days, type Day } from "@/lib/days";
import { cn } from "@/lib/utils";

function WeekStrip({ active }: { active?: string }) {
  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((d) => (
        <a
          key={d.id}
          href={`#day-${d.id}`}
          className={cn(
            "flex min-h-16 flex-col items-center justify-center gap-1 px-1 py-3 text-center",
            active === d.id ? "opacity-100" : "opacity-90 hover:opacity-100",
          )}
          style={{ background: d.accent, color: d.id === "thu" || d.id === "sun" ? "#0B0B0B" : "#F3EFE4" }}
        >
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.14em]">{d.weekday.slice(0, 3)}</span>
          <span className="hidden font-display text-[10px] font-bold uppercase leading-none sm:block">{d.subBrand.split(" ")[0]}</span>
        </a>
      ))}
    </div>
  );
}

function DayChapter({ day, n }: { day: Day; n: string }) {
  return (
    <Chapter id={`day-${day.id}`} n={n} kicker={day.weekday} title={day.subBrand}>
      <p className="mb-8 font-display text-2xl font-semibold uppercase tracking-[0.08em]" style={{ color: day.accent }}>
        {day.line}
      </p>
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[320px] overflow-hidden rounded-[20px] bg-asphalt">
          <img src={day.photo} alt={day.photoAlt} className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: day.accent2 }}>
              Spice {day.spice}/12 · {day.spiceNote}
            </p>
            <p className="mt-1 font-display text-3xl font-extrabold uppercase text-bone">{day.subBrand}</p>
          </div>
        </div>
        <div className="grid gap-3">
          <Panel>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">Mood</p>
            <p className="mt-2 text-sm text-bone/80">{day.mood.join(" · ")}</p>
          </Panel>
          <Panel>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">Programs</p>
            <p className="mt-2 text-sm text-bone/80">{day.programs.join(" · ")}</p>
          </Panel>
          <Panel>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">Voice</p>
            <p className="mt-2 text-sm text-bone/80">{day.voice}</p>
          </Panel>
          <Panel className="flex items-center gap-4">
            <div className="size-16" style={{ color: day.accent }}>
              <Motif id={day.id} className="size-16" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: day.accent }}>
                Motif
              </p>
              <p className="mt-1 text-sm text-concrete">{day.motif}</p>
            </div>
          </Panel>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {day.palette.map((c) => (
          <div key={c.hex} className="overflow-hidden rounded-[14px] bg-asphalt">
            <div className="h-16" style={{ background: c.hex }} />
            <div className="p-3">
              <p className="font-display text-sm font-bold uppercase">{c.name}</p>
              <p className="font-mono text-[11px] text-danfo">{c.hex}</p>
              <p className="mt-1 text-[11px] text-concrete">{c.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {day.subthemes.map((s) => (
          <Panel key={s.n} className="relative overflow-hidden">
            <div className="absolute right-3 top-3 size-10 opacity-40" style={{ color: day.accent }}>
              <Motif id={day.id} className="size-10" />
            </div>
            <p className="font-mono text-[11px] tracking-wider" style={{ color: day.accent2 }}>
              {s.n}
            </p>
            <h3 className="mt-1 font-display text-2xl font-extrabold uppercase leading-none text-bone">{s.name}</h3>
            <p className="mt-2 text-sm font-medium" style={{ color: day.accent }}>
              {s.concept}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-bone/80">{s.description}</p>
            <dl className="mt-4 grid gap-2 text-xs text-concrete">
              <div>
                <dt className="font-display uppercase tracking-[0.14em] text-danfo">Mood</dt>
                <dd>{s.mood}</dd>
              </div>
              <div>
                <dt className="font-display uppercase tracking-[0.14em] text-danfo">Palette</dt>
                <dd>{s.palette}</dd>
              </div>
              <div>
                <dt className="font-display uppercase tracking-[0.14em] text-danfo">Merch</dt>
                <dd>{s.merch}</dd>
              </div>
              <div>
                <dt className="font-display uppercase tracking-[0.14em] text-danfo">Social</dt>
                <dd>{s.social}</dd>
              </div>
              <div>
                <dt className="font-display uppercase tracking-[0.14em] text-danfo">Activity</dt>
                <dd>{s.activity}</dd>
              </div>
            </dl>
          </Panel>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Poster day={day} format="4:5" kicker={day.weekday} title={day.subBrand} sub={day.line} />
        <Poster day={day} format="1:1" variant="space" kicker="Space tonight" title="Pull up." sub={day.merchHero} />
      </div>
    </Chapter>
  );
}

export function Days() {
  const nums = ["23", "24", "25", "26", "27", "28", "29"];
  return (
    <>
      <Chapter id="architecture" n="22" kicker="7 Days of Cruise" title="One house. Seven rooms.">
        <Prose>
          <p>
            The master identity does not change. Midnight still owns the night. Danfo Yellow still hits 15–25%. The 〽️ is
            still the mark the room already types. Seven days are seven moods inside that house — not seven new brands.
          </p>
          <p>
            Day palettes are allowed to be loud. They never replace Lagos Danfo Midnight + Lagos Danfo Yellow as the
            lockup colours. Electric Yellow on Tuesday is a club hit, not a new house yellow. Gold stays banned.
          </p>
          <p>
            Weekday slogans (the old MCM / WCW labels) are programming, not artwork. Merch speaks in sub-brands, motifs,
            numbers, and 〽️.
          </p>
        </Prose>
        <div className="mt-8">
          <WeekStrip />
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {days.map((d) => (
            <a key={d.id} href={`#day-${d.id}`} className="block">
              <Panel className="flex items-center gap-4 transition-colors hover:bg-curb">
                <div className="size-12 shrink-0" style={{ color: d.accent }}>
                  <Motif id={d.id} className="size-12" />
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-concrete">
                    {d.n} · {d.weekday}
                  </p>
                  <p className="font-display text-xl font-extrabold uppercase text-bone">{d.subBrand}</p>
                  <p className="text-sm" style={{ color: d.accent }}>
                    {d.line}
                  </p>
                </div>
              </Panel>
            </a>
          ))}
        </div>
      </Chapter>

      {days.map((d, i) => (
        <DayChapter key={d.id} day={d} n={nums[i]} />
      ))}

      <Chapter id="forty-nine" n="30" title="Forty-nine rooms. One family.">
        <Prose>
          <p>
            Seven days × seven sub-themes. Each one has a different job: a merch print, a social post, a Space, a game.
            If two cards feel like a rename, the system failed. They should not.
          </p>
        </Prose>
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {days.flatMap((d) =>
            d.subthemes.map((s) => (
              <div key={s.n} className="rounded-[16px] bg-asphalt p-4 shadow-[var(--shadow-border)]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[11px]" style={{ color: d.accent2 }}>
                    {s.n}
                  </span>
                  <span className="size-5" style={{ color: d.accent }}>
                    <Motif id={d.id} className="size-5" />
                  </span>
                </div>
                <p className="font-display text-lg font-extrabold uppercase leading-none text-bone">{s.name}</p>
                <p className="mt-2 text-xs text-concrete">{s.concept}</p>
              </div>
            )),
          )}
        </div>
        <div className="mt-10 flex items-center justify-center gap-3 text-danfo">
          <Spark className="size-8" />
          <p className="font-display text-sm uppercase tracking-[0.2em]">The house mark still sits on every day</p>
        </div>
      </Chapter>
    </>
  );
}
