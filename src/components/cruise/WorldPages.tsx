"use client";

import { CruisePage } from "@/components/cruise/CruiseShell";
import {
  CruiseBadge,
  CruiseButton,
  CruiseCard,
  CruiseNotification,
  CruisePlayerCard,
} from "@/components/cruise/CruiseUI";
import { FAM } from "@/lib/cruise/rooms";
import { GAMES } from "@/lib/games/catalog";
import { BADGE_CATALOG, POINT_TABLE, playerLevel, usePlayer } from "@/lib/games/player";
import { Link } from "@tanstack/react-router";
import { Volume2, VolumeX } from "lucide-react";

export function CommunityPage() {
  return (
    <CruisePage
      kicker="Community"
      title="These are my people."
      lede="The same identity across games, Spaces, merch, and the timeline. Roast with love. Stand for each other tomorrow."
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {FAM.map((p) => (
          <CruiseCard key={p.name} interactive>
            <CruiseBadge tone={p.status === "og" ? "danfo" : "bone"}>{p.status}</CruiseBadge>
            <p className="mt-4 font-display text-3xl font-bold uppercase leading-none">{p.name}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">{p.handle}</p>
            <p className="mt-3 text-sm leading-relaxed text-bone/75">{p.line}</p>
          </CruiseCard>
        ))}
      </div>
      <p className="mt-8 max-w-xl text-sm text-concrete">
        Live member graph, vendor shoutouts, and birthday walls connect here later. The cards already use Cruise ID
        language so that work does not need a new visual system.
      </p>
    </CruisePage>
  );
}

export function SpacesPage() {
  return (
    <CruisePage
      kicker="Spaces / events"
      title="Live from the cruise."
      lede="The room is the product. When a Space is on, this is where the house gathers — same night, same mark, same people."
    >
      <div className="relative min-h-[320px] overflow-hidden rounded-[24px]">
        <img src="/brand/space-room.jpg" alt="Night room ready for a Space" className="absolute inset-0 size-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
        <div className="relative flex min-h-[320px] flex-col justify-end p-6 md:p-8">
          <CruiseBadge>Coming live</CruiseBadge>
          <p className="mt-4 font-display text-4xl font-bold uppercase leading-none md:text-5xl">Sunday energy. Any night.</p>
          <p className="mt-3 max-w-md text-sm text-bone/80">
            Tickets, countdowns, and the live ring already exist in the brand system. This page is the product seat for
            them.
          </p>
        </div>
      </div>
    </CruisePage>
  );
}

export function MusicPage() {
  return (
    <CruisePage
      kicker="Music"
      title="Play your vibe."
      lede="Afrobeats, the Space mix, Karaoke records. Friday energy without leaving the house palette."
    >
      <CruiseCard className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <img src="/brand/headphones.jpg" alt="Headphones at night" className="h-36 w-full object-cover sm:h-40 sm:w-40" />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-danfo">Now playing</p>
          <p className="mt-2 font-display text-4xl font-bold uppercase">Cruise mix</p>
          <p className="mt-2 text-sm text-concrete">Live from the Space · Playlist day accent stays inside the game, not the house.</p>
          <Link
            to="/play/$slug"
            params={{ slug: "karaoke" }}
            className="mt-5 inline-flex min-h-11 items-center font-display text-sm font-bold uppercase tracking-[0.16em] text-danfo"
          >
            Open Karaoke
          </Link>
        </div>
      </CruiseCard>
    </CruisePage>
  );
}

export function IdPage() {
  const stats = usePlayer((s) => s.stats);
  const badges = usePlayer((s) => s.badges);
  const points = usePlayer((s) => s.points);
  const cruiseId = usePlayer((s) => s.cruiseId);

  return (
    <CruisePage
      kicker="BIG CRUISE ID"
      title="One person. Every room."
      lede="Username, avatar, Cruise ID, level, BCH points, badges, game stats. You do not become someone else when you open Ludo."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <CruisePlayerCard />
        <div className="grid gap-4">
          <CruiseCard>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">This device</p>
            <p className="mt-2 font-mono text-lg tracking-[0.18em] text-danfo">{cruiseId}</p>
            <p className="mt-1 text-sm text-concrete">
              Level {playerLevel(points)} · {points} BCH. Auth is off. The ID lives locally until accounts ship.
            </p>
          </CruiseCard>
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
        </div>
      </div>
    </CruisePage>
  );
}

export function RewardsPage() {
  const points = usePlayer((s) => s.points);
  return (
    <CruisePage
      kicker="BCH points"
      title="The ledger is ready. The shop is not."
      lede="Playing, winning, hosting, showing up — those actions already mint points on this device. No fake store. No spend. Architecture only."
    >
      <CruiseCard className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Balance</p>
        <p className="font-display text-6xl font-bold text-danfo">{points}</p>
        <p className="mt-2 text-sm text-concrete">BCH · local until a live ledger ships</p>
      </CruiseCard>
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
      <CruiseCard className="p-0 md:p-0">
        <div className="px-5">
          <CruiseNotification
            title="Your people are in the Space."
            body="Architecture preview. Live pushes connect later. Same voice as the timeline."
            time="Sample"
          />
          <CruiseNotification
            title="Tunde opened UNO."
            body="Active rooms in Game Room already deep-link here."
            time="Sample"
          />
        </div>
        <p className="px-5 py-5 text-sm text-concrete">Empty state when quiet: The room is quiet. That is allowed.</p>
      </CruiseCard>
    </CruisePage>
  );
}

export function MerchPage() {
  return (
    <CruisePage
      kicker="Merch"
      title="The mark should carry a blank tee."
      lede="Black heavyweight. Danfo yellow 〽️. No gold foil. No yacht. Capsules live in the brand book."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["/brand/tee-walk.jpg", "Oversized tee"],
          ["/brand/hoodie.jpg", "Hoodie"],
          ["/brand/cap.jpg", "Cap"],
          ["/brand/tote.jpg", "Tote"],
        ].map(([src, label]) => (
          <div key={label} className="relative min-h-[280px] overflow-hidden rounded-[20px]">
            <img src={src} alt={label} className="absolute inset-0 size-full object-cover" />
            <p className="absolute bottom-4 left-4 font-display text-sm uppercase tracking-[0.16em]">{label}</p>
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
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">Cruise ID</p>
          <p className="mt-2 font-mono text-xl tracking-[0.2em] text-danfo">{cruiseId}</p>
        </CruiseCard>
        <CruiseButton variant="line" onClick={toggleMute} className="justify-start">
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          {muted ? "Sound off" : "Sound on"}
        </CruiseButton>
        <p className="text-sm text-concrete">
          Clearing this browser clears the local ID. A signed-in Cruise ID is a later chapter, not a fake login.
        </p>
      </div>
    </CruisePage>
  );
}
