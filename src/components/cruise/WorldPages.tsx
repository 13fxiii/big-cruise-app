"use client";

import { Spark } from "@/components/brand/marks";
import { CruisePage } from "@/components/cruise/CruiseShell";
import {
  CruiseBadge,
  CruiseButton,
  CruiseCard,
  CruiseLocalStamp,
  CruisePlayerCard,
} from "@/components/cruise/CruiseUI";
import { FAM, HOUSE_RECORDS } from "@/lib/cruise/rooms";
import { days } from "@/lib/days";
import { GAMES } from "@/lib/games/catalog";
import { BADGE_CATALOG, PERSISTENCE, POINT_TABLE, playerLevel, usePlayer } from "@/lib/games/player";
import { Link } from "@tanstack/react-router";
import { Volume2, VolumeX } from "lucide-react";

export function CommunityPage() {
  const name = usePlayer((s) => s.name);
  const cruiseId = usePlayer((s) => s.cruiseId);

  return (
    <CruisePage
      kicker="Community"
      title="These are my people."
      lede="Same identity across games, Spaces, merch, and the timeline. Roast with love. Stand for each other tomorrow."
    >
      <CruiseCard className="mb-6 flex items-center justify-between gap-4">
        <div>
          <CruiseLocalStamp />
          <p className="mt-2 font-display text-3xl font-bold uppercase leading-none">{name}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-danfo">{cruiseId}</p>
        </div>
        <Link
          to="/id"
          className="shrink-0 font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo"
        >
          Open ID
        </Link>
      </CruiseCard>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {FAM.map((p) => (
          <CruiseCard key={p.name}>
            <CruiseBadge tone={p.real ? "danfo" : p.status === "og" ? "danfo" : "bone"}>
              {p.real ? "founder" : "house voice"}
            </CruiseBadge>
            <p className="mt-4 font-display text-3xl font-bold uppercase leading-none">{p.name}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">{p.handle}</p>
            <p className="mt-3 text-sm leading-relaxed text-bone/75">{p.line}</p>
          </CruiseCard>
        ))}
      </div>
      <p className="mt-8 max-w-xl text-sm text-concrete">
        FX is real. The rest are how the house sounds until a live member graph ships. No fake follower counts.
      </p>
    </CruisePage>
  );
}

export function SpacesPage() {
  return (
    <CruisePage
      kicker="Spaces"
      title="Live from the cruise."
      lede="The room is the product. When a Space is on, this is where the house gathers — same night, same mark, same people."
    >
      <div className="relative min-h-[320px] overflow-hidden rounded-[24px]">
        <img src="/brand/space-room.jpg" alt="Night room ready for a Space" className="absolute inset-0 size-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
        <div className="relative flex min-h-[320px] flex-col justify-end p-6 md:p-8">
          <CruiseBadge tone="mute">Not live yet</CruiseBadge>
          <p className="mt-4 font-display text-4xl font-bold uppercase leading-none md:text-5xl">Sunday energy. Any night.</p>
          <p className="mt-3 max-w-md text-sm text-bone/80">
            Tickets and the live ring already exist in the brand. This floor is the seat for them — nothing is faking a broadcast.
          </p>
        </div>
      </div>

      <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-concrete">The week in the house</p>
      <h2 className="mt-2 font-display text-3xl font-bold uppercase">Seven days. One gathering.</h2>
      <ul className="mt-6 divide-y divide-lane border-y border-lane">
        {days.map((d) => (
          <li key={d.id} className="flex items-baseline justify-between gap-4 py-4">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">{d.weekday}</p>
              <p className="mt-1 font-display text-2xl font-bold uppercase leading-none">{d.subBrand}</p>
              <p className="mt-2 max-w-lg text-sm text-bone/70">{d.line}</p>
            </div>
            <span className="hidden h-0.5 w-8 shrink-0 origin-left -rotate-[8deg] sm:block" style={{ background: d.accent }} />
          </li>
        ))}
      </ul>
    </CruisePage>
  );
}

export function MusicPage() {
  return (
    <CruisePage
      kicker="Music"
      title="Play your vibe."
      lede="Afrobeats energy, the Space mix, Karaoke records. Friday without leaving the house palette."
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,18rem)_1fr]">
        <CruiseCard className="overflow-hidden p-0 md:p-0">
          <img src="/brand/headphones.jpg" alt="Headphones at night" className="h-48 w-full object-cover lg:h-full" />
        </CruiseCard>
        <div className="grid gap-3">
          {HOUSE_RECORDS.map((track) => (
            <CruiseCard key={track.title} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">{track.bpm} BPM</p>
                <p className="mt-1 font-display text-2xl font-bold uppercase leading-none">{track.title}</p>
                <p className="mt-2 text-sm text-bone/70">{track.line}</p>
              </div>
              <Link
                to="/play/$slug"
                params={{ slug: "karaoke" }}
                className="shrink-0 font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo"
              >
                Karaoke
              </Link>
            </CruiseCard>
          ))}
        </div>
      </div>
      <p className="mt-6 max-w-xl text-sm text-concrete">
        These are house records inside Karaoke — not a streaming app. Sit down and ride the line.
      </p>
    </CruisePage>
  );
}

export function IdPage() {
  const stats = usePlayer((s) => s.stats);
  const badges = usePlayer((s) => s.badges);
  const points = usePlayer((s) => s.points);
  const cruiseId = usePlayer((s) => s.cruiseId);
  const ledger = usePlayer((s) => s.ledger);
  const matches = usePlayer((s) => s.matches);

  return (
    <CruisePage
      kicker="BIG CRUISE ID"
      title="One person. Every room."
      lede="Username, avatar, Cruise ID, level, BCH points, badges, game stats. You do not become someone else when you open Ludo."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <div className="grid gap-4">
          <CruisePlayerCard />
          <CruiseCard>
            <CruiseLocalStamp />
            <p className="mt-2 font-mono text-lg tracking-[0.18em] text-danfo">{cruiseId}</p>
            <p className="mt-2 text-sm leading-relaxed text-concrete">{PERSISTENCE.note}</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">
              Level {playerLevel(points)} · {points} BCH
            </p>
          </CruiseCard>
        </div>
        <div className="grid gap-4">
          <CruiseCard>
            <p className="font-display text-xl font-bold uppercase">Game stats</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {GAMES.map((g) => {
                const s = stats[g.slug];
                return (
                  <li key={g.slug} className="flex items-center justify-between border-b border-lane py-2 text-sm">
                    <span className="font-display uppercase tracking-[0.08em]">{g.name}</span>
                    <span className="font-mono text-xs text-concrete">
                      {s?.played ?? 0} sits · {s?.won ?? 0} wins
                    </span>
                  </li>
                );
              })}
            </ul>
          </CruiseCard>
          <CruiseCard>
            <p className="font-display text-xl font-bold uppercase">Badges</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {BADGE_CATALOG.map((b) => {
                const on = badges.includes(b.id);
                return (
                  <li key={b.id} className={on ? "text-bone" : "text-concrete"}>
                    <span className="font-display uppercase tracking-[0.1em]">{b.name}</span>
                    <span className="mt-0.5 block text-xs">{on ? "Unlocked" : b.hint}</span>
                  </li>
                );
              })}
            </ul>
          </CruiseCard>
          <CruiseCard>
            <p className="font-display text-xl font-bold uppercase">Motion on this device</p>
            {matches.length === 0 && ledger.length === 0 ? (
              <p className="mt-3 text-sm text-concrete">No motion yet. Sit down in Game Room and it writes here.</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {matches.slice(0, 6).map((m) => {
                  const game = GAMES.find((g) => g.slug === m.game);
                  return (
                    <li key={m.id} className="flex items-center justify-between border-b border-lane py-2 text-sm">
                      <span className="font-display uppercase tracking-[0.08em]">
                        {game?.name} · {m.result === "win" ? "Win" : "Sat down"}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">
                        {new Date(m.at).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </CruiseCard>
        </div>
      </div>
    </CruisePage>
  );
}

export function RewardsPage() {
  const points = usePlayer((s) => s.points);
  const ledger = usePlayer((s) => s.ledger);
  return (
    <CruisePage
      kicker="BCH points"
      title="Points you earn. Nothing you buy."
      lede="Playing, winning, hosting, showing up mint points. No shop. No spend. The numbers below are a local prototype until a live ledger ships."
    >
      <CruiseCard className="mb-6">
        <CruiseLocalStamp />
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Balance on this device</p>
        <p className="font-display text-6xl font-bold text-danfo">{points}</p>
        <p className="mt-2 max-w-lg text-sm text-concrete">{PERSISTENCE.note}</p>
      </CruiseCard>
      {ledger.length ? (
        <CruiseCard className="mb-6">
          <p className="font-display text-xl font-bold uppercase">Recent ledger</p>
          <ul className="mt-4 space-y-2">
            {ledger.slice(0, 8).map((e) => (
              <li key={e.id} className="flex items-center justify-between border-b border-lane py-2 text-sm">
                <span>{e.note}</span>
                <span className="font-mono text-danfo">+{e.amount}</span>
              </li>
            ))}
          </ul>
        </CruiseCard>
      ) : null}
      <div className="grid gap-3 md:grid-cols-2">
        {Object.entries(POINT_TABLE).map(([k, v]) => (
          <CruiseCard key={k}>
            <p className="font-display text-2xl font-bold uppercase">{v.label}</p>
            <p className="mt-1 font-mono text-sm tracking-widest text-danfo">+{v.amount}</p>
          </CruiseCard>
        ))}
      </div>
    </CruisePage>
  );
}

export function NotificationsPage() {
  return (
    <CruisePage
      kicker="Notifications"
      title="When the room moves, it lands here."
      lede="Spaces, jobs, birthdays, invites. Copy stays human. The mark is the unread pip — never a gold bell."
    >
      <CruiseCard className="flex flex-col items-start gap-4 py-10">
        <Spark className="size-8 text-danfo/70" />
        <p className="font-display text-4xl font-bold uppercase leading-none">The room is quiet.</p>
        <p className="max-w-md text-sm leading-relaxed text-bone/75">
          That is allowed. Invites, Space calls, and table pings will sit here. Nothing on this floor is pretending to be a live alert.
        </p>
      </CruiseCard>
    </CruisePage>
  );
}

export function MerchPage() {
  return (
    <CruisePage
      kicker="Merch"
      title="The mark should carry a blank tee."
      lede="Black heavyweight. Danfo yellow 〽️. No gold foil. No yacht. Capsules live in the brand book. This is not a shop."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["/brand/tee-walk.jpg", "Oversized tee", "Chest mark. Nothing else."],
          ["/brand/hoodie.jpg", "Hoodie", "Heavyweight. Midnight only."],
          ["/brand/cap.jpg", "Cap", "Low profile. One 〽️."],
          ["/brand/tote.jpg", "Tote", "Bone canvas. Black stroke."],
        ].map(([src, label, line]) => (
          <div key={label} className="relative min-h-[280px] overflow-hidden rounded-[20px]">
            <img src={src} alt={label} className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight via-midnight/70 to-transparent p-5">
              <p className="font-display text-xl font-bold uppercase tracking-[0.08em]">{label}</p>
              <p className="mt-1 text-sm text-bone/75">{line}</p>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/brand"
        className="mt-8 inline-flex min-h-11 items-center font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo"
      >
        Open the merch system
      </Link>
    </CruisePage>
  );
}

export function SettingsPage() {
  const name = usePlayer((s) => s.name);
  const setName = usePlayer((s) => s.setName);
  const muted = usePlayer((s) => s.muted);
  const toggleMute = usePlayer((s) => s.toggleMute);
  const cruiseId = usePlayer((s) => s.cruiseId);

  return (
    <CruisePage
      kicker="Settings"
      title="The room, on your terms."
      lede="Name, sound, identity. No account wall. Auth stays off until the product actually needs it."
    >
      <div className="grid max-w-xl gap-6">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Display name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 h-12 w-full border border-lane bg-asphalt px-4 font-display text-2xl font-bold uppercase tracking-[0.08em] text-bone outline-none focus:border-danfo"
            maxLength={18}
          />
        </label>
        <CruiseCard>
          <CruiseLocalStamp />
          <p className="mt-2 font-mono text-xl tracking-[0.2em] text-danfo">{cruiseId}</p>
          <p className="mt-3 text-sm leading-relaxed text-concrete">{PERSISTENCE.note}</p>
        </CruiseCard>
        <CruiseButton variant="line" onClick={toggleMute} className="justify-start">
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          {muted ? "Sound off" : "Sound on"}
        </CruiseButton>
      </div>
    </CruisePage>
  );
}
