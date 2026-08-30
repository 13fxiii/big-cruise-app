"use client";

import { Chapter, Panel, Prose } from "@/components/brand/Chapter";
import {
  EmbroideryMark,
  FounderLockup,
  HorizontalLockup,
  LiveMark,
  MidnightMark,
  Spark,
  StackedLockup,
  TinyMark,
  Wordmark,
} from "@/components/brand/marks";
import { MARK_CONSTRUCTION, MARK_D, MARK_V1 } from "@/lib/cruise/mark";
import { tokens } from "@/lib/cruise/tokens";
import { cn } from "@/lib/utils";

export function SignatureSystem() {
  return (
    <>
      <Chapter id="signature" n="42" kicker="V1.1" title="A signature, not an emoji.">
        <Prose>
          <p>
            V1.0 was right to lock 〽️ as the idea. V1.1 stops shipping the Unicode glyph as the master file. The room
            still recognises the two peaks and the drop. The geometry is now ours.
          </p>
          <p>
            Peak 1 is lower — Cruise, the entry. The valley is a wide basin — Connect, the room. Peak 2 is taller —
            Create. The drop commits and does not bounce — Support, Grow. One open stroke. Round caps. No object
            hiding inside it.
          </p>
        </Prose>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Panel className="flex min-h-72 flex-col items-center justify-center bg-midnight">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-concrete">V1.0 · traced Unicode</p>
            <svg viewBox="0 0 64 64" className="size-40 text-concrete" aria-hidden>
              <path d={MARK_V1} fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Panel>
          <Panel className="flex min-h-72 flex-col items-center justify-center bg-midnight">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-danfo">V1.1 · Cruise Stroke</p>
            <Spark className="size-40 text-danfo" />
          </Panel>
        </div>

        <Panel className="mt-4 overflow-hidden p-0">
          <div className="bg-asphalt p-6 md:p-8">
            <svg viewBox="-2 -2 68 68" className="mx-auto w-full max-w-md text-danfo" aria-label="Signature construction">
              <title>Signature construction</title>
              {[8, 16, 24, 32, 40, 48, 56].map((n) => (
                <g key={n} opacity="0.2">
                  <line x1={n} y1="0" x2={n} y2="64" stroke="currentColor" strokeWidth="0.2" />
                  <line x1="0" y1={n} x2="64" y2={n} stroke="currentColor" strokeWidth="0.2" />
                </g>
              ))}
              <path d={MARK_D} fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
              {Object.values(MARK_CONSTRUCTION).map((pt) => (
                <circle key={pt.label} cx={pt.x} cy={pt.y} r="1.6" fill="#F3EFE4" />
              ))}
            </svg>
            <ol className="mt-6 grid grid-cols-5 gap-2 text-center">
              {Object.values(MARK_CONSTRUCTION).map((pt) => (
                <li key={pt.label}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-danfo">{pt.label}</p>
                </li>
              ))}
            </ol>
          </div>
        </Panel>
      </Chapter>

      <Chapter id="levels" n="43" title="Community. House. Founder.">
        <Prose>
          <p>
            Three marks. Same blood. Different jobs. BIG CRUISE is the house. The midnight field is how the community
            shows up at 16px. FX is the host — related, never identical, never the avatar.
          </p>
        </Prose>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Panel className="flex flex-col items-center text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-danfo">A · Master</p>
            <Wordmark className="mt-6 text-3xl text-bone" />
            <p className="mt-4 text-sm text-concrete">Website, app header, merch, campaigns, events, partnerships.</p>
          </Panel>
          <Panel className="flex flex-col items-center text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-danfo">B · Community</p>
            <MidnightMark className="mt-6 size-24 text-danfo" />
            <p className="mt-4 text-sm text-concrete">X avatar, app icon, favicon, cap, sticker, badge, game UI.</p>
          </Panel>
          <Panel className="flex flex-col items-center text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-danfo">C · Founder</p>
            <FounderLockup className="mt-8 text-5xl text-bone" />
            <p className="mt-4 text-sm text-concrete">FX @13fxiii. Compact drop. Never used as the community mark.</p>
          </Panel>
        </div>
      </Chapter>

      <Chapter id="lockups" n="44" title="One family. Every surface.">
        <Prose>
          <p>
            Horizontal, stacked, symbol, wordmark. Light, dark, one-color black, one-color yellow. Embroidery-safe and
            tiny-size optical cuts. If it does not look like the same house at 16px and on a hoodie, it is not in the
            system.
          </p>
        </Prose>

        <div className="mt-10 grid gap-4">
          <Panel className="flex min-h-36 items-center justify-center bg-midnight">
            <HorizontalLockup />
          </Panel>
          <div className="grid gap-4 md:grid-cols-2">
            <Panel className="flex min-h-56 flex-col items-center justify-center">
              <StackedLockup />
            </Panel>
            <Panel className="flex min-h-56 items-center justify-center bg-danfo">
              <Wordmark className="text-4xl text-midnight" sparkClassName="text-midnight" />
            </Panel>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Dark", bg: "bg-midnight", fg: "text-danfo", El: Spark },
              { label: "Light", bg: "bg-bone", fg: "text-midnight", El: Spark },
              { label: "Yellow", bg: "bg-danfo", fg: "text-midnight", El: Spark },
              { label: "One-color black", bg: "bg-bone", fg: "text-midnight", El: Spark },
            ].map((item) => (
              <Panel key={item.label} className={cn("flex min-h-36 flex-col items-center justify-center", item.bg)}>
                <item.El className={cn("size-16", item.fg)} />
                <p className={cn("mt-3 font-mono text-[10px] uppercase tracking-[0.16em]", item.fg)}>{item.label}</p>
              </Panel>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Panel className="flex min-h-32 flex-col items-center justify-center">
              <TinyMark className="size-6 text-danfo" />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">Tiny 16px</p>
            </Panel>
            <Panel className="flex min-h-32 flex-col items-center justify-center">
              <EmbroideryMark className="size-16 text-danfo" />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">Embroidery</p>
            </Panel>
            <Panel className="flex min-h-32 flex-col items-center justify-center">
              <LiveMark className="size-16 text-danfo" />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">Live ring</p>
            </Panel>
          </div>
        </div>
      </Chapter>

      <Chapter id="tokens" n="45" title="Variables, not vibes.">
        <Prose>
          <p>
            Every surface in the house reads from the same tokens. Hex does not get reinvented in a game HUD. Spacing
            is 4-based. Motion is short. Focus is Danfo on midnight. Concrete is never body copy.
          </p>
        </Prose>
        <div className="mt-10 overflow-x-auto rounded-[20px] bg-asphalt shadow-[var(--shadow-border)]">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-lane font-display text-xs uppercase tracking-[0.14em] text-concrete">
                <th className="px-4 py-3">Token</th>
                <th className="px-4 py-3">Value</th>
                <th className="px-4 py-3">Use</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[12px] text-bone/85">
              {Object.entries(tokens.color).map(([k, v]) => (
                <tr key={k} className="border-b border-lane/70">
                  <td className="px-4 py-2.5 text-danfo">color.{k}</td>
                  <td className="px-4 py-2.5">{v}</td>
                  <td className="px-4 py-2.5 font-sans text-concrete">
                    {k === "midnight" ? tokens.ratio.midnight : k === "danfo" ? tokens.ratio.danfo : "support"}
                  </td>
                </tr>
              ))}
              <tr className="border-b border-lane/70">
                <td className="px-4 py-2.5 text-danfo">type.display</td>
                <td className="px-4 py-2.5">Barlow Condensed 800</td>
                <td className="px-4 py-2.5 font-sans text-concrete">Shout</td>
              </tr>
              <tr className="border-b border-lane/70">
                <td className="px-4 py-2.5 text-danfo">type.sans</td>
                <td className="px-4 py-2.5">IBM Plex Sans 400/500</td>
                <td className="px-4 py-2.5 font-sans text-concrete">Talk</td>
              </tr>
              <tr className="border-b border-lane/70">
                <td className="px-4 py-2.5 text-danfo">motion.fast</td>
                <td className="px-4 py-2.5">{tokens.motion.fast} {tokens.motion.ease}</td>
                <td className="px-4 py-2.5 font-sans text-concrete">UI</td>
              </tr>
              <tr className="border-b border-lane/70">
                <td className="px-4 py-2.5 text-danfo">tap</td>
                <td className="px-4 py-2.5">{tokens.tap}px</td>
                <td className="px-4 py-2.5 font-sans text-concrete">Minimum target</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-danfo">slash</td>
                <td className="px-4 py-2.5">{tokens.slash}°</td>
                <td className="px-4 py-2.5 font-sans text-concrete">Lane geometry</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Chapter>

      <Chapter id="audit" n="46" title="Keep. Remove. Refine. Add.">
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel>
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo">Keep</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-bone/80">
              <li>BIG CRUISE〽️ as the name. Tagline. Philosophy. 18+ voice.</li>
              <li>Lagos Danfo Midnight + Yellow. Barlow Condensed. IBM Plex.</li>
              <li>〽️ as cultural recognition — the room already types it.</li>
              <li>7 Days as programming, never as the master palette.</li>
              <li>House metaphor. Game Room as the floor. ID as identity.</li>
            </ul>
          </Panel>
          <Panel>
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo">Remove</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-bone/80">
              <li>Unicode U+303D as the production master file.</li>
              <li>Rainbow 7-day bar on the brand cover.</li>
              <li>Giant ghost marks, dual orbs, motion paths on every screen.</li>
              <li>Gold, neon, chrome, glow. Emoji-sticker wallpaper.</li>
              <li>Pretending founder FX is the community avatar.</li>
            </ul>
          </Panel>
          <Panel>
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo">Refine</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-bone/80">
              <li>Signature proportions: lopsided peaks, wider valley, committed drop.</li>
              <li>Environment opacity. Night should breathe.</li>
              <li>Yellow at 15–25% — signals, not wallpaper.</li>
              <li>AppSystem ratio language aligned with the master (was 10–15%).</li>
            </ul>
          </Panel>
          <Panel>
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo">Add</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-bone/80">
              <li>Three brand levels: master / community / founder.</li>
              <li>Optical tiny + embroidery cuts.</li>
              <li>Typed design tokens. Contrast pairs. Component states.</li>
              <li>Light, one-color, and founder lockup files.</li>
            </ul>
          </Panel>
        </div>
      </Chapter>
    </>
  );
}
