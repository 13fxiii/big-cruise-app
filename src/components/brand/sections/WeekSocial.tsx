import { Chapter, Panel, Prose } from "@/components/brand/Chapter";
import { Icon, Motif, Poster } from "@/components/brand/day-marks";
import { LiveMark } from "@/components/brand/marks";
import { chatCards, dayById, days, iconSet, socialTemplates } from "@/lib/days";

export function WeekSocial() {
  return (
    <>
      <Chapter id="social-week" n="32" kicker="Social" title="Fourteen templates. Seven skins.">
        <Prose>
          <p>
            Same jobs every day: announce, countdown, reveal, activity, reminder, Space, game, music, challenge, winner,
            birthday, vendor, recap, week recap. The layout system is shared. The colour, motif, and voice change with
            the room.
          </p>
          <p>Formats: X landscape 16:9, square 1:1, vertical 4:5, story 9:16, chat 1:1. Type must read at phone scale.</p>
        </Prose>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {socialTemplates.map((t) => (
            <Panel key={t.id} className="flex gap-4">
              <span className="font-mono text-xs text-danfo">{t.id}</span>
              <div>
                <p className="font-display text-lg font-bold uppercase text-bone">{t.name}</p>
                <p className="text-sm text-concrete">{t.use}</p>
              </div>
            </Panel>
          ))}
        </div>

        <div className="mt-10 grid gap-6">
          {days.map((d) => (
            <div key={d.id}>
              <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: d.accent }}>
                {d.weekday} · {d.subBrand}
              </p>
              <div className="grid gap-3 md:grid-cols-4">
                <Poster day={d} format="16:9" kicker="Announcement" title={d.subBrand} sub="The room is open." />
                <Poster day={d} format="1:1" variant="space" kicker="Space" title="Live from the cruise." />
                <Poster day={d} format="4:5" kicker="Challenge" title={d.subthemes[0].name} sub={d.subthemes[0].social} />
                <Poster day={d} format="9:16" kicker="Story" title="Pull up." sub={d.line} />
              </div>
            </div>
          ))}
        </div>
      </Chapter>

      <Chapter id="chat" n="33" title="The group chat is a billboard.">
        <Prose>
          <p>
            Square, shareable, midnight. These are not event posters. They are the stickers the room already wants to
            throw. Recolor the motif to the day; keep the line.
          </p>
        </Prose>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {chatCards.map((c) => {
            const d = dayById(c.day);
            return (
              <div key={c.id} className="relative aspect-square overflow-hidden rounded-[16px] bg-midnight p-4" style={{ color: d.ink }}>
                <div className="absolute inset-0 opacity-50" style={{ color: d.accent }}>
                  <Motif id={d.id} className="size-full" />
                </div>
                <div className="relative flex h-full flex-col justify-between">
                  <div className="size-7" style={{ color: d.accent2 }}>
                    <LiveMark className="size-7" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-extrabold uppercase leading-[0.9] text-bone">{c.line}</p>
                    <p className="mt-2 text-xs text-bone/70">{c.sub}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10">
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">Icon family</p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-11">
            {iconSet.map((ic) => (
              <Panel key={ic.id} className="flex flex-col items-center gap-2 py-6">
                <Icon id={ic.id} className="size-8 text-danfo" />
                <p className="font-display text-[11px] uppercase tracking-[0.12em] text-concrete">{ic.label}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Chapter>
    </>
  );
}
