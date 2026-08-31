"use client";

import { Chapter, Panel, Prose } from "@/components/brand/Chapter";
import {
  AppIconMark,
  EmbroideryMark,
  FounderLockup,
  MidnightMark,
  Spark,
  TinyMark,
  Wordmark,
} from "@/components/brand/marks";
import { brand } from "@/lib/brand";
import {
  MARK_CLEAR_X,
  MARK_CONSTRUCTION,
  MARK_D,
  MARK_FILES,
  MARK_PEAK1_RISE,
  MARK_PEAK2_RISE,
  MARK_PEAK_RATIO,
  MARK_SPEC,
  MARK_VALLEY_WIDTH,
} from "@/lib/cruise/mark";
import { tokens } from "@/lib/cruise/tokens";
import { cn } from "@/lib/utils";

const QA_SIZES = [
  { n: 16, className: "size-4" },
  { n: 24, className: "size-6" },
  { n: 32, className: "size-8" },
  { n: 48, className: "size-12" },
  { n: 64, className: "size-16" },
  { n: 128, className: "size-32" },
] as const;

function Verdict({ ok, children }: { ok: boolean; children: string }) {
  return (
    <p
      className={cn(
        "mt-3 font-mono text-[10px] uppercase tracking-[0.16em]",
        ok ? "text-danfo" : "text-concrete",
      )}
    >
      {ok ? "Correct" : "Never"} · {children}
    </p>
  );
}

export function Protection() {
  const xPad = `${(MARK_CLEAR_X / MARK_SPEC.canvas) * 100}%`;

  return (
    <>
      <Chapter id="spec" n="47" kicker="Protect" title="The file is the mark.">
        <Prose>
          <p>
            V1.1 is approved. This chapter does not redesign it. It locks the Cruise Stroke so nobody traces 〽️ from a
            font, eyeballs a peak, or ships a cousin.
          </p>
          <p>
            The SVG path in <span className="font-mono text-danfo">src/lib/cruise/mark.ts</span> is the only master.
            Raster PNG is a snapshot of that file. Unicode U+303D is recognition, never production.
          </p>
        </Prose>

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <Panel className="flex min-h-72 flex-col items-center justify-center bg-midnight">
            <Spark className="size-44 text-danfo" />
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">
              Master · viewBox {MARK_SPEC.viewBox}
            </p>
          </Panel>
          <Panel className="overflow-x-auto">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-[12px] text-bone/85">
              {[
                ["ViewBox", MARK_SPEC.viewBox],
                ["Canvas", `${MARK_SPEC.canvas} × ${MARK_SPEC.canvas}`],
                ["Aspect", MARK_SPEC.aspect],
                ["Orientation", MARK_SPEC.orientation],
                ["Fill", MARK_SPEC.fill],
                ["Stroke", `${MARK_SPEC.stroke} / 64`],
                ["Caps / joins", `${MARK_SPEC.cap} / ${MARK_SPEC.join}`],
                ["Peak 1 rise", `${MARK_PEAK1_RISE} units`],
                ["Peak 2 rise", `${MARK_PEAK2_RISE} units`],
                ["Peak 2 ÷ Peak 1", `${MARK_PEAK_RATIO}×`],
                ["Valley width", `${MARK_VALLEY_WIDTH} units`],
                ["Clear space X", `${MARK_CLEAR_X} / ${MARK_SPEC.canvas}`],
              ].map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-concrete">{k}</dt>
                  <dd className="text-danfo">{v}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </div>

        <Panel className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-danfo">SVG path · production master</p>
          <p className="mt-3 font-mono text-[12px] leading-relaxed text-bone/80">{MARK_D}</p>
        </Panel>
        <ol className="mt-4 grid grid-cols-5 gap-2 text-center">
          {Object.values(MARK_CONSTRUCTION).map((pt) => (
            <li key={pt.label} className="rounded-[16px] bg-asphalt px-2 py-3 shadow-[var(--shadow-border)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-danfo">{pt.label}</p>
              <p className="mt-1 font-mono text-[11px] text-concrete">
                {pt.x}, {pt.y}
              </p>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter id="when" n="48" title="Three marks. Three jobs.">
        <Prose>
          <p>
            BIG CRUISE is the community. FX is the founder. Same blood. Different jobs. The founder mark must never
            replace the community mark.
          </p>
        </Prose>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Panel className="flex flex-col items-center text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-danfo">A · Master</p>
            <Wordmark className="mt-6 text-2xl text-bone sm:text-3xl" />
            <p className="mt-4 text-sm text-concrete">
              BIG CRUISE + signature. Website, app name, merch with type, campaigns, events, partnerships.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/70">File · wordmark.svg</p>
          </Panel>
          <Panel className="flex flex-col items-center text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-danfo">B · Community</p>
            <MidnightMark className="mt-6 size-24 text-danfo" />
            <p className="mt-4 text-sm text-concrete">
              Standalone Cruise Stroke in a midnight field. X avatar, app icon, favicon, cap, sticker, badge, game UI.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/70">
              File · midnight-mark.svg
            </p>
          </Panel>
          <Panel className="flex flex-col items-center text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-danfo">C · Founder</p>
            <FounderLockup className="mt-8 text-5xl text-bone" />
            <p className="mt-4 text-sm text-concrete">
              FX + compact drop. @13fxiii only. Related. Never the community avatar, never the app icon.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/70">File · founder-fx.svg</p>
          </Panel>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Panel>
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo">Allowed</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-bone/80">
              <li>A in the header as the name. B as the icon beside it — not a second spark on the word.</li>
              <li>B alone at 16–48px. Tiny optical cut under 24px for the stroke itself.</li>
              <li>C on FX’s own posts, a founder page, a host slate. Signed, not branded as the house.</li>
            </ul>
          </Panel>
          <Panel>
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo">Forbidden</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-bone/80">
              <li>C as the X community avatar, app icon, or favicon.</li>
              <li>A + B with the signature drawn twice.</li>
              <li>Redrawing any level from the colour emoji.</li>
            </ul>
          </Panel>
        </div>
      </Chapter>

      <Chapter id="clear" n="49" title="X is Peak 1.">
        <Prose>
          <p>
            Clear space X equals the height of Peak 1 — Cruise — measured from apex ({MARK_CONSTRUCTION.peak1.y}) to
            valley ({MARK_CONSTRUCTION.valley.y}). That is {MARK_PEAK1_RISE} units. Production X is {MARK_CLEAR_X} of{" "}
            {MARK_SPEC.canvas}, kept on every side of the artwork box.
          </p>
          <p>Do not crowd the stroke with type, badges, stickers, or the live ring overlapping the path.</p>
        </Prose>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Panel className="bg-midnight">
            <div
              className="relative mx-auto aspect-square w-full max-w-56 border border-dashed border-danfo/70"
              style={{ padding: xPad }}
            >
              <Spark className="size-full text-danfo" />
            </div>
            <Verdict ok>X on all four sides. The dashed box is the quiet zone.</Verdict>
          </Panel>
          <Panel className="bg-midnight">
            <div className="relative mx-auto flex aspect-square w-full max-w-56 items-center justify-center overflow-hidden">
              <Spark className="size-full text-danfo" />
              <span className="absolute inset-x-1 bottom-1 bg-danfo px-2 py-1 font-display text-xs font-bold uppercase tracking-[0.12em] text-midnight">
                Tonight
              </span>
              <span className="absolute right-0 top-0 size-10 bg-danfo" />
            </div>
            <Verdict ok={false}>Type and a block inside X. The mark cannot breathe.</Verdict>
          </Panel>
        </div>
      </Chapter>

      <Chapter id="minsize" n="50" title="Below this, it dies.">
        <Prose>
          <p>
            Use the tiny optical cut at 16px. Use the embroidery cut when a needle is involved. Do not scale the master
            stroke below the floor and hope.
          </p>
        </Prose>
        <div className="mt-10 overflow-x-auto rounded-[20px] bg-asphalt shadow-[var(--shadow-border)]">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-lane font-display text-xs uppercase tracking-[0.14em] text-concrete">
                <th className="px-4 py-3">Surface</th>
                <th className="px-4 py-3">Minimum</th>
                <th className="px-4 py-3">File</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[12px] text-bone/85">
              {[
                ["Favicon", `${MARK_SPEC.min.faviconPx}px`, "favicon.svg · tiny cut"],
                ["Signature in UI", `${MARK_SPEC.min.signaturePx}px`, "mark-tiny.svg"],
                ["Midnight mark / mobile", `${MARK_SPEC.min.midnightPx}px`, "midnight-mark.svg"],
                ["Website header", `${MARK_SPEC.min.websitePx}px`, "live-mark / midnight-mark"],
                ["App icon", `${MARK_SPEC.min.appIconPx}px`, "app-icon.svg"],
                ["X avatar", `${MARK_SPEC.min.xAvatarPx}px display`, "x-avatar.svg = midnight-mark"],
                ["Screen print", `${MARK_SPEC.min.screenMm}mm`, "mark.svg one-color"],
                ["DTF / heat", `${MARK_SPEC.min.dtfMm}mm / ${MARK_SPEC.min.heatMm}mm`, "one-color, no hairline"],
                ["Embroidery", `${MARK_SPEC.min.embroideryMm}mm`, "mark-embroidery.svg"],
                ["Woven label", `${MARK_SPEC.min.wovenMm}mm`, "embroidery cut"],
                ["Cap front", `${MARK_SPEC.min.capMm}mm`, "B · midnight mark"],
                ["Signage", `${MARK_SPEC.min.signageMm}mm`, "A or B, scale only"],
              ].map(([a, b, c]) => (
                <tr key={a} className="border-b border-lane/70">
                  <td className="px-4 py-2.5">{a}</td>
                  <td className="px-4 py-2.5 text-danfo">{b}</td>
                  <td className="px-4 py-2.5 font-sans text-concrete">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap items-end gap-6 rounded-[20px] bg-midnight px-6 py-8">
          <div className="flex flex-col items-center gap-2">
            <TinyMark className="size-4 text-danfo" />
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">16px tiny</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spark className="size-6 text-danfo" />
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">24px master</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <EmbroideryMark className="size-12 text-danfo" />
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">Embroidery</p>
          </div>
        </div>
      </Chapter>

      <Chapter id="onecolor" n="51" title="It has to survive without yellow.">
        <Prose>
          <p>
            The Cruise Stroke is one open path. Recolor with currentColor. Silhouette must read in 100% midnight, 100%
            Danfo Yellow, or bone reversed on dark. If it needs a gradient to be the mark, it is not the mark.
          </p>
        </Prose>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Panel className="flex min-h-40 flex-col items-center justify-center bg-bone">
            <Spark className="size-20 text-midnight" />
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-midnight">100% black</p>
          </Panel>
          <Panel className="flex min-h-40 flex-col items-center justify-center bg-midnight">
            <Spark className="size-20 text-danfo" />
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-danfo">100% yellow</p>
          </Panel>
          <Panel className="flex min-h-40 flex-col items-center justify-center bg-midnight">
            <Spark className="size-20 text-bone" />
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-bone">Bone reverse</p>
          </Panel>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Panel className="flex min-h-32 items-center justify-center bg-danfo">
            <Spark className="size-16 text-midnight" />
          </Panel>
          <Panel className="flex min-h-32 items-center justify-center bg-bone">
            <MidnightMark className="size-16 text-danfo" />
          </Panel>
          <Panel className="flex min-h-32 items-center justify-center bg-danfo">
            <Wordmark className="text-2xl text-midnight" sparkClassName="text-midnight" />
          </Panel>
        </div>
      </Chapter>

      <Chapter id="make" n="52" title="What the factory gets.">
        <Prose>
          <p>
            Streetwear, not promo. If a detail will vanish under a needle or a 45-mesh screen, it is not in the file.
            House merch stays Midnight + Danfo. Day merch may use a day accent on B — never a new drawing of the stroke.
          </p>
        </Prose>
        <div className="mt-10 overflow-x-auto rounded-[20px] bg-asphalt shadow-[var(--shadow-border)]">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-lane font-display text-xs uppercase tracking-[0.14em] text-concrete">
                <th className="px-4 py-3">Make</th>
                <th className="px-4 py-3">Version</th>
                <th className="px-4 py-3">Note</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-bone/85">
              {[
                ["Embroidery", "mark-embroidery.svg", `${MARK_SPEC.min.embroideryMm}mm min. Stroke 11.5. One color.`],
                ["Screen print", "mark.svg one-color", `${MARK_SPEC.min.screenMm}mm. Spot Danfo or black. No halftone on the stroke.`],
                ["DTF", "mark.svg / midnight-mark.svg", `${MARK_SPEC.min.dtfMm}mm. True transparent PNG from the SVG.`],
                ["Heat transfer", "one-color", `${MARK_SPEC.min.heatMm}mm. No live ring.`],
                ["Woven label", "embroidery cut or wordmark", "Convert type to outlines. B at small, A at large."],
                ["Rubber / PVC", "midnight-mark.svg", `${MARK_SPEC.min.pvcMm}mm. Filled circle. No inner hairlines.`],
                ["Small chest", "B or embroidery stroke", `${MARK_SPEC.min.chestMm}mm. Not the founder mark.`],
                ["Cap", "B community", `${MARK_SPEC.min.capMm}mm front. One color on black.`],
                ["Hoodie", "B chest / A back", "Heavyweight black. Danfo stitch or print."],
                ["Heavyweight tee", "B chest or A back", "No weekday programming titles as art."],
                ["Packaging", "A horizontal lockup", "Midnight field. No rainbow week strip."],
              ].map(([a, b, c]) => (
                <tr key={a} className="border-b border-lane/70">
                  <td className="px-4 py-2.5 font-display font-bold uppercase tracking-[0.06em]">{a}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-danfo">{b}</td>
                  <td className="px-4 py-2.5 text-concrete">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Chapter>

      <Chapter id="misuse" n="53" title="Never do this.">
        <Prose>
          <p>
            The Cruise Stroke is not clay. Scale it uniformly. Recolor it with the house tokens. Do not decorate it.
          </p>
        </Prose>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Stretched", className: "scale-x-150 text-danfo" },
            { label: "Squashed", className: "scale-y-50 text-danfo" },
            { label: "Rotated", className: "rotate-[22deg] text-danfo" },
          ].map((item) => (
            <Panel key={item.label} className="flex min-h-36 flex-col items-center justify-center bg-midnight">
              <Spark className={cn("size-16", item.className)} />
              <Verdict ok={false}>{item.label}</Verdict>
            </Panel>
          ))}
          <Panel className="flex min-h-36 flex-col items-center justify-center bg-midnight">
            <span className="text-[#c9a227]">
              <Spark className="size-16" />
            </span>
            <Verdict ok={false}>Gold. Danfo is not gold.</Verdict>
          </Panel>
          <Panel className="flex min-h-36 flex-col items-center justify-center bg-midnight">
            <span className="text-[#fff200]" style={{ filter: "drop-shadow(0 0 10px #fff200)" }}>
              <Spark className="size-16" />
            </span>
            <Verdict ok={false}>Neon + glow.</Verdict>
          </Panel>
          <Panel className="flex min-h-36 flex-col items-center justify-center bg-midnight">
            <span className="text-danfo" style={{ filter: "drop-shadow(4px 6px 0 rgb(0 0 0 / 0.65))" }}>
              <Spark className="size-16" />
            </span>
            <Verdict ok={false}>Drop shadow on the mark.</Verdict>
          </Panel>
          <Panel className="flex min-h-36 flex-col items-center justify-center bg-midnight">
            <span
              className="flex size-20 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg,#f5c400,#ff4d1a,#ff2b6b)" }}
            >
              <Spark className="size-12 text-midnight" />
            </span>
            <Verdict ok={false}>Gradient container.</Verdict>
          </Panel>
          <Panel className="flex min-h-36 flex-col items-center justify-center bg-midnight">
            <span className="flex size-20 items-center justify-center rounded-full border-4 border-danfo p-1">
              <Spark className="size-10 text-danfo" />
            </span>
            <Verdict ok={false}>Extra ring the system did not issue.</Verdict>
          </Panel>
          <Panel className="flex min-h-36 flex-col items-center justify-center bg-midnight">
            <span className="font-display text-6xl leading-none text-danfo" aria-hidden>
              〽️
            </span>
            <Verdict ok={false}>Unicode emoji as the file.</Verdict>
          </Panel>
          <Panel className="flex min-h-36 flex-col items-center justify-center bg-midnight">
            <div className="flex items-center gap-2">
              <MidnightMark className="size-12 text-danfo" />
              <Wordmark className="text-xl text-bone" />
            </div>
            <Verdict ok={false}>A + B with the spark twice.</Verdict>
          </Panel>
          <Panel className="flex min-h-36 flex-col items-center justify-center bg-midnight">
            <FounderLockup className="text-4xl text-bone" />
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">as the X avatar</p>
            <Verdict ok={false}>Founder as community.</Verdict>
          </Panel>
          <Panel className="relative flex min-h-36 items-center justify-center overflow-hidden bg-midnight">
            <Spark className="absolute -left-4 size-24 text-danfo/40" />
            <Spark className="absolute right-0 top-2 size-20 text-danfo/30" />
            <Spark className="size-16 text-danfo" />
            <Verdict ok={false}>Giant marks as wallpaper.</Verdict>
          </Panel>
        </div>
      </Chapter>

      <Chapter id="source" n="54" title="One folder. One drawing.">
        <Prose>
          <p>
            Canonical files live in the logos folder. PNG is a raster of the SVG at that name. Do not keep a second
            “tighter” mark on a desktop. Do not duplicate hex in a game HUD — import tokens.
          </p>
          <p>
            Public no-login:{" "}
            <a className="text-danfo underline" href={brand.urls.public} target="_blank" rel="noreferrer">
              {brand.urls.public.replace("https://", "")}
            </a>
            . Brand book:{" "}
            <a className="text-danfo underline" href={brand.urls.brandBook} target="_blank" rel="noreferrer">
              {brand.urls.brandBook.replace("https://", "")}
            </a>
            .
          </p>
        </Prose>
        <div className="mt-10 overflow-x-auto rounded-[20px] bg-asphalt shadow-[var(--shadow-border)]">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-lane font-display text-xs uppercase tracking-[0.14em] text-concrete">
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Canonical SVG</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[12px] text-bone/85">
              {Object.entries({
                "A · Wordmark": MARK_FILES.wordmark,
                "A · Horizontal": MARK_FILES.horizontal,
                "A · Stacked": MARK_FILES.stacked,
                "B · Community": MARK_FILES.community,
                "B · X avatar": MARK_FILES.avatar,
                "B · App icon": MARK_FILES.appIcon,
                "B · Favicon": MARK_FILES.favicon,
                "C · Founder": MARK_FILES.founder,
                "Symbol master": MARK_FILES.master,
                "Tiny optical": MARK_FILES.tiny,
                Embroidery: MARK_FILES.embroidery,
                "One-color black": MARK_FILES.oneColorBlack,
                "One-color yellow": MARK_FILES.oneColorYellow,
              }).map(([k, v]) => (
                <tr key={k} className="border-b border-lane/70">
                  <td className="px-4 py-2.5 text-danfo">{k}</td>
                  <td className="px-4 py-2.5">
                    <a href={v} className="hover:text-danfo">
                      {v}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-concrete">
          x-avatar.svg is midnight-mark.svg. Do not draw a third community badge. Tokens:{" "}
          <span className="font-mono text-danfo">src/lib/cruise/tokens.ts</span> and{" "}
          <span className="font-mono text-danfo">@theme</span> in styles. Logo sizes: favicon {tokens.logo.favicon}px,
          header {tokens.logo.header}px, app icon {tokens.logo.appIcon}px.
        </p>
      </Chapter>

      <Chapter id="qa" n="55" title="Same stroke. Every size.">
        <Prose>
          <p>
            Scale the file. Do not redraw. If Peak 2 disappears or the valley becomes a V, you are below the floor —
            switch to the tiny cut, or stop.
          </p>
        </Prose>
        <div className="mt-10 rounded-[20px] bg-midnight px-5 py-8 shadow-[var(--shadow-border)]">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-danfo">Digital · midnight</p>
          <div className="flex flex-wrap items-end gap-6">
            {QA_SIZES.map((item) => (
              <div key={item.n} className="flex flex-col items-center gap-2">
                {item.n <= 16 ? (
                  <TinyMark className={cn("text-danfo", item.className)} />
                ) : (
                  <Spark className={cn("text-danfo", item.className)} />
                )}
                <p className="font-mono text-[10px] text-concrete">{item.n}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Panel className="flex min-h-64 flex-col items-center justify-center bg-midnight">
            <Spark className="size-[200px] max-w-full text-danfo sm:size-[280px]" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">400 family · scale only</p>
          </Panel>
          <Panel className="flex min-h-64 flex-col items-center justify-center bg-danfo">
            <Spark className="size-[200px] max-w-full text-midnight sm:size-[280px]" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-midnight">Yellow ground</p>
          </Panel>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Panel className="flex min-h-32 flex-col items-center justify-center bg-bone">
            <Spark className="size-16 text-midnight" />
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-midnight">Bone</p>
          </Panel>
          <Panel className="flex min-h-32 flex-col items-center justify-center">
            <EmbroideryMark className="size-16 text-danfo" />
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">Embroidery</p>
          </Panel>
          <Panel className="flex min-h-32 flex-col items-center justify-center">
            <AppIconMark className="size-16 text-danfo" />
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">App icon</p>
          </Panel>
          <Panel className="flex min-h-32 flex-col items-center justify-center">
            <TinyMark className="size-4 text-danfo" />
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">16px</p>
          </Panel>
        </div>
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <Spark className="size-12 text-danfo" />
          <p className="font-display text-3xl font-extrabold uppercase text-bone md:text-5xl">Where the cruise lives.</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-concrete">
            BIG CRUISE · Brand Lock-in V1.1 · Protected
          </p>
          <a
            href={brand.urls.public}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-danfo hover:text-bone"
          >
            {brand.urls.public.replace("https://", "")}
          </a>
        </div>
      </Chapter>
    </>
  );
}
