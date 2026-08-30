import { Chapter, Panel, Prose } from "@/components/brand/Chapter";
import { Spark, Wordmark } from "@/components/brand/marks";
import { CruiseBackground, CruisePattern } from "@/components/cruise/CruiseBackground";
import { CruiseAvatar, CruiseBadge, CruiseButton, CruiseCard } from "@/components/cruise/CruiseUI";
import { POINT_TABLE } from "@/lib/games/player";
import { Link } from "@tanstack/react-router";

export function AppSystem() {
  return (
    <>
      <Chapter id="environment" n="37" kicker="Product" title="The app lives inside the night.">
        <Prose>
          <p>
            BIG CRUISE is not a logo stamped on generic screens. The product is a room: midnight field, restrained Danfo
            yellow, a quiet tiled signature, grain. Users should feel the house without reading the name on every surface.
          </p>
          <p>
            Foundation: Lagos Danfo Midnight Black 75–85%. Lagos Danfo Yellow 15–25%. Bone for type. No neon. No gold.
            No emoji-sticker wallpaper. The signature in the environment is the official stroke, tiled at very low opacity
            and rotated −8°, never U+303D as decoration.
          </p>
          <p>
            CruiseBackground is the single environment. Densities: cover (brand photography), default (product), quiet
            (reading), game (gameplay + a secondary day-accent wash). Change the background once; every screen follows.
          </p>
        </Prose>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="relative min-h-[280px] overflow-hidden rounded-[20px] bg-midnight">
            <CruiseBackground density="default" position="absolute" />
            <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-end p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-danfo">Density · default</p>
              <p className="mt-2 font-display text-3xl font-bold uppercase">Product night</p>
            </div>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-[20px] bg-midnight">
            <CruiseBackground density="game" accent="#FF2B6B" position="absolute" />
            <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-end p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-danfo">Density · game</p>
              <p className="mt-2 font-display text-3xl font-bold uppercase">UNO wash</p>
            </div>
          </div>
        </div>
        <div className="relative mt-4 h-36 overflow-hidden rounded-[20px] bg-midnight text-danfo">
          <CruisePattern className="opacity-40" />
          <p className="relative z-10 p-5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone">
            Pattern language — one signature per tile. Not stickers.
          </p>
        </div>
      </Chapter>

      <Chapter id="components" n="38" title="One language. Many screens.">
        <Prose>
          <p>
            Reusable chrome: CruiseBackground, CruisePattern, CruiseButton, CruiseCard, CruiseModal, CruiseBadge,
            CruiseAvatar, CruiseHeader, CruiseGameRoom, CruisePlayerCard, CruiseNotification, CruiseLoader, CruiseToast.
            If the night shifts, we retint the system — we do not restyle fifty pages.
          </p>
          <p>
            Do not over-brand. The wordmark appears once in the header. Game worlds keep a secondary accent so play stays
            distinct. Usability beats decoration. Motion is short, interruptible, and reduced-motion safe.
          </p>
        </Prose>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Panel className="flex flex-col gap-4">
            <p className="font-display text-sm uppercase tracking-[0.16em] text-danfo">Buttons / badge / avatar</p>
            <div className="flex flex-wrap items-center gap-3">
              <CruiseButton>Enter the cruise</CruiseButton>
              <CruiseButton variant="line">Line</CruiseButton>
              <CruiseBadge>Live</CruiseBadge>
              <CruiseAvatar name="FX" />
            </div>
          </Panel>
          <CruiseCard>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-danfo">Loader</p>
            <p className="mt-2 font-display text-2xl font-bold uppercase">Mark draws. Wordmark. Tagline.</p>
            <p className="mt-2 text-sm text-concrete">~1.2s, skippable, once per session. Never on every screen.</p>
          </CruiseCard>
        </div>
      </Chapter>

      <Chapter id="gameroom" n="39" title="One community. Many game worlds.">
        <Prose>
          <p>
            Game Room is the central lobby: available games, active rooms, recently played, challenges, identity chip.
            Architected for private rooms, invites, tournaments, spectating, and match history without a redesign.
          </p>
          <p>
            Every game inherits the house: navigation feel, CruiseBackground (game density), type, buttons, player
            identity, Cruise ID, badges, toasts, sound/motion. Each title may wash a 7 Days accent into the corner so
            UNO is not Ludo, but both are still BIG CRUISE.
          </p>
          <p>
            Games must move — hover, tap, turn indicators, win states — without becoming dashboards. Gameplay stays
            clean. The brand is the room around the play, not a watermark on the cards.
          </p>
        </Prose>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo"
          >
            Open Game Room
          </Link>
        </div>
      </Chapter>

      <Chapter id="cruise-id" n="40" title="The same person in every room.">
        <Prose>
          <p>
            BIG CRUISE ID travels with the player: username, avatar initials, BCH-XXXXXX, level, points, badges, per-game
            stats, join date, community status. Auth is off. The current record is a local prototype on this device.
          </p>
          <p>
            Games write through one identity document (ledger, badges, stats, matches). A later server adapter can load
            the same shape without rebuilding Game Room or the ten worlds. Clearing the browser clears the prototype —
            it is not an account, and the product does not pretend otherwise.
          </p>
        </Prose>
        <div className="mt-8 max-w-md rounded-[20px] bg-asphalt p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-danfo">Cruise ID</p>
          <div className="mt-4 flex items-center gap-4">
            <CruiseAvatar name="FX" size="lg" />
            <div>
              <Wordmark className="text-2xl text-bone" compact />
              <p className="mt-2 font-mono text-xs tracking-[0.2em] text-danfo">BCH-XXXXXX</p>
            </div>
          </div>
        </div>
      </Chapter>

      <Chapter id="points" n="41" title="Points without a fake shop.">
        <Prose>
          <p>
            BCH points are a ledger, not a shop. Earning actions are modeled: play, win, daily, host, community, event,
            challenge, achievement. Today they persist as prototype state on this device. There is no spend, no gold, no
            loot box. A live ledger is a later chapter — same actions, different adapter.
          </p>
        </Prose>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(POINT_TABLE).map(([k, v]) => (
            <Panel key={k}>
              <p className="font-display text-lg font-bold uppercase">{v.label}</p>
              <p className="mt-1 font-mono text-sm text-danfo">+{v.amount}</p>
            </Panel>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <Spark className="size-12 text-danfo" />
          <p className="font-display text-3xl font-extrabold uppercase text-bone md:text-5xl">You entered the cruise.</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-concrete">
            App design system · V1.x · same house as the brand book
          </p>
        </div>
      </Chapter>
    </>
  );
}
