import { Chapter, Panel, Prose } from "@/components/brand/Chapter";
import { Spark } from "@/components/brand/marks";
import { taglines, voiceDo, voiceDont } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function Voice() {
  return (
    <>
      <Chapter id="voice" n="19" kicker="Voice" title="A smart friend. Not a press office.">
        <Prose>
          <p>
            BIG CRUISE talks like the room already talks: Nigerian English, Pidgin when it lands, humour, warmth,
            confidence. The founder’s register is the north star — bless up, fam, my guy — without turning every caption
            into a slang pile-up.
          </p>
        </Prose>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Panel>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">Do</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-bone/85">
              {voiceDo.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">Don't</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-concrete">
              {voiceDont.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Panel>
        </div>
        <div className="mt-6 grid gap-3">
          {[
            ["Announcement", "The Space is on. Come cruise."],
            ["Birthday", "It's their day. Make noise for them."],
            ["Jobs", "Opportunity in the room. Share it like you mean it."],
            ["Roast", "We go talk. You know we still dey your side."],
          ].map(([t, d]) => (
            <Panel key={t} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
              <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-danfo sm:w-36">{t}</p>
              <p className="text-bone">{d}</p>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="taglines" n="20" title="Keep the working line.">
        <Prose>
          <p>
            “Where the cruise lives.” already does the job. It is a place, it is alive, it does not over-explain. The
            rest of the list is for campaigns, merch backs, and Spaces — not a replacement.
          </p>
        </Prose>
        <div className="mt-8 grid gap-3">
          {taglines.map((t) => (
            <Panel
              key={t.line}
              className={cn("flex flex-col gap-2 md:flex-row md:items-center md:justify-between", t.keep && "bg-danfo")}
            >
              <p
                className={cn(
                  "font-display text-2xl font-extrabold uppercase leading-tight",
                  t.keep ? "text-midnight" : "text-bone",
                )}
              >
                {t.line}
              </p>
              <p className={cn("max-w-md text-sm", t.keep ? "text-midnight/70" : "text-concrete")}>{t.note}</p>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="rules" n="21" title="Protect the night.">
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-4 font-display text-2xl font-extrabold uppercase text-danfo">Do</p>
            <div className="grid gap-3">
              {[
                "Midnight dominant. Yellow 15–25%.",
                "〽️ upright. Don't italicize it into a lightning bolt.",
                "One-color prints. Outlined wordmark for merch.",
                "Clear space of one chevron.",
                "Barlow Condensed for shouts. IBM Plex for talk.",
                "Photograph real nights, real people.",
              ].map((t) => (
                <Panel key={t}>
                  <p className="text-sm text-bone">{t}</p>
                </Panel>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 font-display text-2xl font-extrabold uppercase text-concrete">Don't</p>
            <div className="grid gap-3">
              {[
                "Gold, neon, chrome, rainbow, luxury foil.",
                "Yachts, boats, anchors, literal danfo logos.",
                "Smileys, chat bubbles, waveforms, clip-art.",
                "The former name on any public lockup.",
                "Stretch, outline-glow, drop-shadow the 〽️.",
                "Children's colours, cartoon 3D, stock Africa.",
              ].map((t) => (
                <div key={t} className="rounded-[20px] bg-asphalt p-5 opacity-55 shadow-[var(--shadow-border)]">
                  <p className="text-sm text-bone line-through">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-lane py-16 text-center">
          <Spark className="size-14 text-danfo" />
          <p className="font-display text-4xl font-extrabold uppercase text-bone md:text-6xl">Where the cruise lives.</p>
          <p className="font-display text-sm uppercase tracking-[0.22em] text-concrete">
            Master identity locked. Seven rooms follow.
          </p>
        </div>
      </Chapter>
    </>
  );
}
