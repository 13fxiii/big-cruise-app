"use client";

import { Chapter, Panel, Prose } from "@/components/brand/Chapter";
import { LiveMark, MidnightMark, Spark } from "@/components/brand/marks";
import { colors } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

function Swatch({
  name,
  hex,
  rgb,
  cmyk,
  pantone,
  role,
  usage,
  note,
  token,
}: (typeof colors)[number]) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="overflow-hidden rounded-[20px] shadow-[var(--shadow-border)]">
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(hex);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        className={cn(
          "flex min-h-36 w-full flex-col items-start justify-between p-5 text-left",
          token === "midnight" && "bg-midnight text-bone",
          token === "danfo" && "bg-danfo text-midnight",
          token === "bone" && "bg-bone text-midnight",
          token === "asphalt" && "bg-asphalt text-bone",
          token === "concrete" && "bg-concrete text-midnight",
        )}
      >
        <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] opacity-70">{role}</span>
        <span className="flex items-center gap-2 font-display text-3xl font-extrabold tracking-[0.04em]">
          {hex}
          {copied ? <Check className="size-5" /> : <Copy className="size-5 opacity-70" />}
        </span>
      </button>
      <div className="bg-asphalt p-5">
        <p className="font-display text-xl font-bold uppercase text-bone">{name}</p>
        <p className="mt-1 text-sm text-concrete">{usage}</p>
        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-bone/80">
          <div>
            <dt className="text-concrete">RGB</dt>
            <dd className="tabular-nums">{rgb}</dd>
          </div>
          <div>
            <dt className="text-concrete">CMYK</dt>
            <dd className="tabular-nums">{cmyk}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-concrete">Pantone (approx.)</dt>
            <dd>{pantone}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-concrete">{note}</p>
      </div>
    </div>
  );
}

export function VisualSystem() {
  return (
    <>
      <Chapter id="color" n="10" kicker="System" title="Danfo black. Danfo yellow. Stop.">
        <Prose>
          <p>
            The palette is not a moodboard. It is a Lagos fact: midnight bodywork, yellow cut. Black holds 75–85% of
            every layout. Yellow is the 〽️, the button, the stitch — never the field unless you are reversing for a
            poster or a tee back.
          </p>
          <p>
            Gold is a different colour. Neon is a different colour. If it glows, it is wrong. Values below are proposed
            production specifications, not a government standard.
          </p>
        </Prose>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {colors.map((c) => (
            <Swatch key={c.hex} {...c} />
          ))}
        </div>
      </Chapter>

      <Chapter id="type" n="11" title="Condensed for the shout. Human for the talk.">
        <Prose>
          <p>
            Two families, plus a mono stamp for codes. All three are SIL Open Font License. Free for digital, merch, and
            commercial use. If you redistribute the font files, keep the OFL notice. For print and embroidery, convert the
            lockup to outlines.
          </p>
        </Prose>
        <div className="mt-10 space-y-4">
          <Panel>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">
              Display — Barlow Condensed ExtraBold
            </p>
            <p className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-[0.04em] text-bone md:text-7xl">
              Big Cruise
            </p>
            <p className="mt-4 text-sm text-concrete">
              Headlines, campaigns, merch, the wordmark. Condensed enough to feel like a night flyer, heavy enough to
              sew. License: SIL OFL via Google Fonts.
            </p>
          </Panel>
          <Panel>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">
              Body — IBM Plex Sans
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-bone">
              Regular 400 for reading. Medium 500 for UI. The voice of captions, bios, and the app. Mature, digital,
              not a startup round.
            </p>
            <p className="mt-3 text-sm text-concrete">License: SIL OFL. Designed by IBM. Use it for anything in the system that has to be read.</p>
          </Panel>
          <Panel>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">
              Stamp — IBM Plex Mono
            </p>
            <p className="mt-4 font-mono text-3xl font-medium tracking-[0.08em] text-danfo md:text-5xl">V1.1 / 2026</p>
            <p className="mt-4 text-sm text-concrete">
              Chapter numbers, version stamps, ticket codes, live labels. Same IBM family as the body — so the system stays
              one voice. Never the wordmark.
            </p>
          </Panel>
        </div>
      </Chapter>

      <Chapter id="graphics" n="12" title="Lanes, slashes, live rings.">
        <Prose>
          <p>
            The graphic language is Lagos street graphics translated, not copied. Parallel lanes like body stripes. An
            eight-degree slash like the spark. A broken ring like a Space that is live. Repeating sparks used sparingly,
            the way stickers actually get used — not as wallpaper.
          </p>
        </Prose>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Panel className="min-h-40 lane-pattern">
            <p className="font-display text-xl font-bold uppercase text-bone">Lane field</p>
            <p className="mt-2 text-sm text-concrete">−8° yellow rules on midnight. Posters, headers, merch backs.</p>
          </Panel>
          <Panel className="flex min-h-40 flex-col justify-center">
            <span className="slash-rule mb-4" />
            <p className="font-display text-xl font-bold uppercase text-bone">The slash</p>
            <p className="mt-2 text-sm text-concrete">Section breaks, quote marks, motion cues. Always −8°.</p>
          </Panel>
          <Panel className="flex min-h-40 items-center justify-center">
            <LiveMark className="size-24 text-danfo" />
          </Panel>
          <Panel className="flex min-h-40 items-center justify-center gap-3">
            <Spark className="size-8 text-danfo" />
            <Spark className="size-8 text-danfo/50" />
            <Spark className="size-8 text-danfo/25" />
          </Panel>
        </div>
        <div className="mt-4 overflow-hidden rounded-[20px] border border-danfo bg-midnight p-6">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-danfo">Danfo frame</p>
          <p className="mt-3 font-display text-3xl font-extrabold uppercase text-bone">A 2px yellow inset. Like a window at night.</p>
        </div>
      </Chapter>

      <Chapter id="photography" n="13" title="Real people. Real night. No stock.">
        <Prose>
          <p>
            Photograph the community the way the community actually looks: night, available light, phones out, black
            clothes, yellow spill from shops. Candid over posed. Mature over cute. Nigerian over “African.”
          </p>
        </Prose>
        <div className="mt-10 grid gap-3 md:grid-cols-6">
          <img src="/brand/street-night.jpg" alt="Lagos street at night, wet asphalt and yellow shop lights" className="aspect-video w-full object-cover md:col-span-6 outline outline-1 -outline-offset-1 outline-bone/10" />
          <img src="/brand/friends-couch.jpg" alt="Friends laughing on a couch at night" className="aspect-[4/3] w-full object-cover md:col-span-3 outline outline-1 -outline-offset-1 outline-bone/10" />
          <img src="/brand/space-room.jpg" alt="A late-night group gathered around a laptop" className="aspect-[4/3] w-full object-cover md:col-span-3 outline outline-1 -outline-offset-1 outline-bone/10" />
          <img src="/brand/portrait-man.jpg" alt="Night portrait of a man in a black t-shirt" className="aspect-[3/4] w-full object-cover md:col-span-2 outline outline-1 -outline-offset-1 outline-bone/10" />
          <img src="/brand/portrait-woman.jpg" alt="Night portrait of a woman in a black hoodie" className="aspect-[3/4] w-full object-cover md:col-span-2 outline outline-1 -outline-offset-1 outline-bone/10" />
          <img src="/brand/birthday.jpg" alt="Birthday candles lighting faces in a dark room" className="aspect-[3/4] w-full object-cover md:col-span-2 outline outline-1 -outline-offset-1 outline-bone/10" />
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Portraits", "Off-camera. Night rim. No beauty-campaign grin."],
            ["Community", "Bodies packed, phones in, laugh in progress."],
            ["Events / Spaces", "Faces lit by screens. One yellow practical."],
            ["Merch", "Black fabric, yellow as a stitch or a spark. Never a gold foil dump."],
          ].map(([t, d]) => (
            <Panel key={t}>
              <p className="font-display text-lg font-bold uppercase text-bone">{t}</p>
              <p className="mt-2 text-sm text-concrete">{d}</p>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="icons" n="14" title="Geometry, not clip-art.">
        <Prose>
          <p>
            Icons are two-stroke, square caps, the same −8° lean as the spark when they imply motion. No smileys, no chat
            bubbles, no location pins, no game-controller silhouettes. If it could live in a default emoji keyboard, it
            does not live here.
          </p>
        </Prose>
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {[
            <Spark key="s" className="size-8 text-danfo" />,
            <MidnightMark key="m" className="size-8 text-danfo" />,
            <LiveMark key="l" className="size-8 text-danfo" />,
          ].concat(
            [
              <svg key="lane" viewBox="0 0 32 32" className="size-8 text-danfo"><path d="M6 10 L26 6 M6 16 L26 12 M6 22 L26 18" fill="none" stroke="currentColor" strokeWidth="2.4"/></svg>,
              <svg key="slash" viewBox="0 0 32 32" className="size-8 text-danfo"><path d="M10 24 L22 8" stroke="currentColor" strokeWidth="3"/></svg>,
              <svg key="node" viewBox="0 0 32 32" className="size-8 text-danfo"><circle cx="8" cy="16" r="3" fill="currentColor"/><circle cx="24" cy="16" r="3" fill="currentColor"/><path d="M11 16 H21" stroke="currentColor" strokeWidth="2"/></svg>,
            ],
          ).map((el, i) => (
            <Panel key={i} className="flex min-h-24 items-center justify-center">
              {el}
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="motion" n="15" title="The ring turns. The 〽️ arrives last.">
        <Prose>
          <p>
            Motion is the live ring rotating slowly, the slash entering at −8°, yellow appearing after black. Durations
            stay short. No bounce. No neon flicker. If someone has reduced motion on, the mark simply sits.
          </p>
        </Prose>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Enter", "400–500ms. Rise 12px, blur 4px, ease-out."],
            ["Live ring", "18s linear loop. Only the ring, never the spark."],
            ["Press", "Scale 0.96. 150ms. Buttons and chips only."],
          ].map(([t, d]) => (
            <Panel key={t}>
              <p className="font-display text-xl font-bold uppercase text-danfo">{t}</p>
              <p className="mt-2 text-sm text-concrete">{d}</p>
            </Panel>
          ))}
        </div>
      </Chapter>
    </>
  );
}
