import type { ReactNode } from "react";
import { Chapter, Panel, Prose } from "@/components/brand/Chapter";
import { MidnightMark, Spark, Wordmark, MARK_D } from "@/components/brand/marks";

function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-[280px] rounded-[36px] border border-lane bg-asphalt p-3 shadow-[var(--shadow-border)]">
      <div className="overflow-hidden rounded-[28px] bg-midnight">{children}</div>
    </div>
  );
}

export function Applications() {
  return (
    <>
      <Chapter id="social" n="16" kicker="Applications" title="The timeline is the flagship store.">
        <Prose>
          <p>
            X is home. Instagram and TikTok are the trailer. WhatsApp is the back room. Every surface uses midnight as
            the field, yellow as the hit, Bone for type. No gold gradients. No laughing-emoji badges.
          </p>
        </Prose>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <Panel className="flex flex-col items-center gap-4">
            <p className="self-start font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">
              X avatar + header
            </p>
            <div className="w-full overflow-hidden rounded-[16px] bg-midnight">
              <div className="relative h-28 lane-pattern">
                <Wordmark className="absolute bottom-8 left-4 text-2xl text-bone" compact />
              </div>
              <div className="-mt-8 ml-4 size-16 overflow-hidden rounded-full ring-4 ring-midnight">
                <MidnightMark className="size-16 text-danfo" />
              </div>
              <div className="px-4 pb-4 pt-2">
                <Wordmark className="text-xl text-bone" compact />
                <p className="mt-1 text-xs text-concrete">@BCHub_ · Where the cruise lives.</p>
              </div>
            </div>
          </Panel>

          <Panel>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">Quote post</p>
            <div className="mt-4 border border-danfo bg-midnight p-5">
              <p className="font-display text-3xl font-extrabold uppercase leading-tight text-bone">
                Roast you today. Stand for you tomorrow.
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-[0.18em] text-danfo">Big Cruise</span>
                <Spark className="size-5 text-danfo" />
              </div>
            </div>
          </Panel>

          <Panel>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">Birthday</p>
            <div className="relative mt-4 min-h-48 overflow-hidden bg-midnight p-5">
              <img src="/brand/birthday.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-40" />
              <div className="relative">
                <p className="font-mono text-sm font-medium tracking-wider text-danfo">Happy birthday</p>
                <p className="mt-2 font-display text-4xl font-extrabold uppercase text-bone">From the cruise.</p>
                <Spark className="mt-4 size-8 text-danfo" />
              </div>
            </div>
          </Panel>

          <Panel>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">Music / now playing</p>
            <div className="mt-4 flex items-center gap-4 bg-midnight p-4">
              <img src="/brand/headphones.jpg" alt="Headphones at night" className="size-20 object-cover" />
              <div>
                <p className="font-display text-xs uppercase tracking-[0.16em] text-danfo">Now playing</p>
                <p className="mt-1 font-display text-2xl font-extrabold uppercase text-bone">Cruise mix</p>
                <p className="text-sm text-concrete">Live from the Space</p>
              </div>
            </div>
          </Panel>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Instagram", "Grid is midnight. Cover images crop to the Spark or a night portrait. Stories use the danfo frame."],
            ["TikTok", "Cover: Spark centred, wordmark under. No gold 3D. Captions stay Bone."],
            ["WhatsApp", "Status: yellow slash, short line, dark field. Community materials match the quote-post frame."],
          ].map(([t, d]) => (
            <Panel key={t}>
              <p className="font-display text-xl font-bold uppercase text-bone">{t}</p>
              <p className="mt-2 text-sm text-concrete">{d}</p>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="merch" n="17" title="The 〽️ should carry a blank tee.">
        <Prose>
          <p>
            Do not over-design the clothes. Black heavyweight blanks. Yellow 〽️ at the chest or on the back, large.
            One-color screen print, DTF, embroidery, woven labels — the geometry holds. If the merch needs a yacht, a
            gold foil, or a laughing face, the identity has already failed. Full production system: chapters 56–71 and
            the live lookbook at /merch.
          </p>
        </Prose>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden rounded-[20px]">
            <img src="/brand/tee-walk.jpg" alt="Oversized black tee in Lagos at night" className="absolute inset-0 size-full object-cover" />
            <p className="absolute bottom-4 left-4 font-display text-sm uppercase tracking-[0.16em] text-bone">
              Oversized tee — lifestyle
            </p>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[20px]">
            <img src="/brand/hoodie.jpg" alt="Black heavyweight hoodie" className="absolute inset-0 size-full object-cover" />
            <p className="absolute bottom-4 left-4 font-display text-sm uppercase tracking-[0.16em] text-bone">Hoodie — fabric</p>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-[20px]">
            <img src="/brand/cap.jpg" alt="Black dad cap" className="absolute inset-0 size-full object-cover" />
            <p className="absolute bottom-4 left-4 font-display text-sm uppercase tracking-[0.16em] text-bone">Cap</p>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-[20px]">
            <img src="/brand/tote.jpg" alt="Black tote bag on a night street" className="absolute inset-0 size-full object-cover" />
            <p className="absolute bottom-4 left-4 font-display text-sm uppercase tracking-[0.16em] text-bone">Tote</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Panel className="flex min-h-64 flex-col items-center justify-center gap-6 bg-midnight">
            <svg viewBox="0 0 160 180" className="h-44 w-auto text-lane">
              <path fill="currentColor" d="M32 44 L12 56 L20 84 L36 76 V168 H124 V76 L140 84 L148 56 L128 44 L118 28 H42 Z" />
              <g className="text-danfo" transform="translate(80 92) scale(0.85) translate(-32 -32)">
                <path
                  d={MARK_D}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <p className="font-display text-sm uppercase tracking-[0.16em] text-concrete">Chest 〽️</p>
          </Panel>
          <Panel className="flex min-h-64 flex-col items-center justify-center gap-6 bg-midnight">
            <svg viewBox="0 0 160 180" className="h-44 w-auto text-lane">
              <path fill="currentColor" d="M28 52 L16 40 L22 22 H42 L50 36 H110 L118 22 H138 L144 40 L132 52 V168 H28 Z" />
              <g className="text-danfo" transform="translate(80 88) scale(0.7) translate(-32 -32)">
                <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="155 27" />
                <g transform="translate(32 33) scale(0.58) translate(-32 -32)">
                  <path
                    d={MARK_D}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </svg>
            <p className="font-display text-sm uppercase tracking-[0.16em] text-concrete">Hoodie live mark</p>
          </Panel>
          <Panel className="flex min-h-64 flex-col items-center justify-center gap-6 bg-danfo">
            <svg viewBox="0 0 160 100" className="h-28 w-auto text-midnight">
              <ellipse cx="80" cy="62" rx="54" ry="28" fill="currentColor" />
              <path d="M36 58 C36 28 124 28 124 58 L118 50 C118 30 42 30 42 50 Z" fill="currentColor" />
              <g className="text-danfo" transform="translate(80 58) scale(0.5) translate(-32 -32)">
                <path
                  d={MARK_D}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <p className="font-display text-sm uppercase tracking-[0.16em] text-midnight">Cap 〽️</p>
          </Panel>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Long sleeve — 〽️ at cuff, wordmark on back",
            "Shorts / joggers — small 〽️ at hem",
            "Stickers — Midnight Mark, die-cut circle",
            "Packaging — black mailer, yellow slash, no gold",
          ].map((t) => (
            <Panel key={t}>
              <p className="text-sm leading-relaxed text-bone/85">{t}</p>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="digital" n="18" title="The mark has to survive 16 pixels.">
        <Prose>
          <p>
            The digital ecosystem — site, app, dashboard, IDs, badges, games, music, events — inherits the same night.
            Midnight screens, Bone type, Danfo for the one action that matters. The app icon is the Midnight Mark. If it
            does not read on a home screen, we failed the logo.
          </p>
        </Prose>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          <Phone>
            <div className="flex h-[520px] flex-col bg-midnight p-5">
              <div className="flex items-center justify-between">
                <Wordmark className="text-lg text-bone" compact />
                <span className="font-mono text-xs font-medium tracking-wider text-danfo">Live</span>
              </div>
              <div className="mt-8 flex flex-1 flex-col items-center justify-center">
                <MidnightMark className="size-20 text-danfo" />
                <p className="mt-6 font-display text-3xl font-extrabold uppercase text-bone">Cruise ID</p>
                <p className="mt-2 text-sm text-concrete">Member · #FXIII</p>
              </div>
              <button
                type="button"
                className="min-h-11 w-full bg-danfo font-display text-sm font-bold uppercase tracking-[0.16em] text-midnight"
              >
                Enter the room
              </button>
            </div>
          </Phone>
          <div className="grid gap-4">
            {[
              ["App icon", "Midnight Mark. Squircle crop provided by the OS — do not draw a second rounded square."],
              ["Dashboard", "Asphalt panels, Bone labels, Danfo for live / online / rewarded."],
              ["Notifications", "Spark as the unread pip. Copy stays human: 'Your people are in the Space.'"],
              ["Badges / rewards", "Metal is banned. Yellow spark on black is the only medal."],
              ["Games + music", "Same type, same night. The spark can be a cursor, a hit-marker, a now-playing pip."],
              ["Events", "Ticket graphic uses Danfo numbers and the live ring. No clip-art confetti."],
            ].map(([t, d]) => (
              <Panel key={t}>
                <p className="font-display text-lg font-bold uppercase text-danfo">{t}</p>
                <p className="mt-1 text-sm text-concrete">{d}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Chapter>
    </>
  );
}
