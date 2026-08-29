import { create } from "zustand";
import type { GameSlug } from "@/lib/games/catalog";

const NAME_KEY = "bch-player-name";
const ID_KEY = "bch-identity";

export type CommunityStatus = "member" | "host" | "og";

export type BadgeId =
  | "member"
  | "sat-down"
  | "first-win"
  | "host"
  | "week-rider"
  | "playlist"
  | "chaos";

export type Badge = {
  id: BadgeId;
  name: string;
  hint: string;
  earnedAt?: string;
};

export type GameStat = {
  played: number;
  won: number;
  lastPlayed?: string;
};

export type PointAction =
  | "play"
  | "win"
  | "daily"
  | "host"
  | "community"
  | "event"
  | "challenge"
  | "achievement";

/** Architecture table. Amounts are placeholders for a later live ledger. */
export const POINT_TABLE: Record<PointAction, { amount: number; label: string }> = {
  play: { amount: 5, label: "Play a game" },
  win: { amount: 25, label: "Win a game" },
  daily: { amount: 10, label: "Daily activity" },
  host: { amount: 15, label: "Host a room" },
  community: { amount: 8, label: "Community activity" },
  event: { amount: 20, label: "Event / Space" },
  challenge: { amount: 30, label: "Complete a challenge" },
  achievement: { amount: 50, label: "Unlock an achievement" },
};

export const BADGE_CATALOG: Badge[] = [
  { id: "member", name: "Member", hint: "You are in the room." },
  { id: "sat-down", name: "Sat down", hint: "Enter any game room." },
  { id: "first-win", name: "First blood", hint: "Win a match." },
  { id: "host", name: "Host", hint: "Open a cruise room." },
  { id: "week-rider", name: "Week rider", hint: "Play four different games." },
  { id: "playlist", name: "Playlist", hint: "Open Karaoke or Kahoot." },
  { id: "chaos", name: "Chaos", hint: "Sit down for Ludo or Truth." },
];

export type Toast = {
  id: string;
  title: string;
  body?: string;
};

type IdentitySnap = {
  name: string;
  cruiseId: string;
  joinedAt: string;
  points: number;
  badges: BadgeId[];
  stats: Partial<Record<GameSlug, GameStat>>;
  recent: GameSlug[];
  dailyAt?: string;
};

type PlayerState = {
  name: string;
  muted: boolean;
  cruiseId: string;
  joinedAt: string;
  points: number;
  badges: BadgeId[];
  stats: Partial<Record<GameSlug, GameStat>>;
  recent: GameSlug[];
  dailyAt?: string;
  ready: boolean;
  toasts: Toast[];
  hydrate: () => void;
  setName: (name: string) => void;
  toggleMute: () => void;
  recordPlay: (slug: GameSlug, hosted?: boolean) => void;
  recordWin: (slug: GameSlug) => void;
  award: (action: PointAction, note?: string) => void;
  dismissToast: (id: string) => void;
};

function mintId(): string {
  const chars = "BCDFGHJKLMNPQRSTVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `BCH-${out}`;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function readName(): string {
  if (typeof window === "undefined") return "Cruise";
  return localStorage.getItem(NAME_KEY)?.trim() || "Cruise";
}

function emptySnap(): IdentitySnap {
  return {
    name: "Cruise",
    cruiseId: "BCH-······",
    joinedAt: "",
    points: 0,
    badges: ["member"],
    stats: {},
    recent: [],
  };
}

function readSnap(): IdentitySnap {
  const fallback: IdentitySnap = {
    ...emptySnap(),
    name: readName(),
    cruiseId: mintId(),
    joinedAt: new Date().toISOString(),
  };
  if (typeof window === "undefined") return emptySnap();
  try {
    const raw = localStorage.getItem(ID_KEY);
    if (!raw) {
      localStorage.setItem(ID_KEY, JSON.stringify(fallback));
      return fallback;
    }
    const parsed = JSON.parse(raw) as IdentitySnap;
    return {
      ...fallback,
      ...parsed,
      name: parsed.name || readName(),
      badges: parsed.badges?.length ? parsed.badges : ["member"],
    };
  } catch {
    return fallback;
  }
}

function persist(s: PlayerState) {
  if (typeof window === "undefined") return;
  const snap: IdentitySnap = {
    name: s.name,
    cruiseId: s.cruiseId,
    joinedAt: s.joinedAt,
    points: s.points,
    badges: s.badges,
    stats: s.stats,
    recent: s.recent,
    dailyAt: s.dailyAt,
  };
  localStorage.setItem(ID_KEY, JSON.stringify(snap));
  localStorage.setItem(NAME_KEY, s.name);
}

function toast(title: string, body?: string): Toast {
  return { id: `t${Date.now()}${Math.random().toString(16).slice(2, 6)}`, title, body };
}

const blank = emptySnap();

export const usePlayer = create<PlayerState>((set, get) => ({
  name: blank.name,
  muted: false,
  cruiseId: blank.cruiseId,
  joinedAt: blank.joinedAt,
  points: 0,
  badges: ["member"],
  stats: {},
  recent: [],
  dailyAt: undefined,
  ready: false,
  toasts: [],
  hydrate: () => {
    if (get().ready) return;
    const snap = readSnap();
    set({ ...snap, ready: true });
  },
  setName: (name) => {
    const next = name.trim().slice(0, 18) || "Cruise";
    set((s) => {
      persist({ ...s, name: next });
      return { name: next };
    });
  },
  toggleMute: () => set((s) => ({ muted: !s.muted })),
  award: (action, note) => {
    const spec = POINT_TABLE[action];
    set((s) => {
      const points = s.points + spec.amount;
      const n = {
        ...s,
        points,
        toasts: [toast(`+${spec.amount} BCH`, note || spec.label), ...s.toasts].slice(0, 3),
      };
      persist(n);
      return { points: n.points, toasts: n.toasts };
    });
  },
  recordPlay: (slug, hosted) => {
    const s = get();
    const day = todayKey();
    const prev = s.stats[slug] || { played: 0, won: 0 };
    const stats = {
      ...s.stats,
      [slug]: { ...prev, played: prev.played + 1, lastPlayed: new Date().toISOString() },
    };
    const recent = [slug, ...s.recent.filter((g) => g !== slug)].slice(0, 8);
    let badges = s.badges;
    const earned: BadgeId[] = [];
    if (!badges.includes("sat-down")) earned.push("sat-down");
    if (hosted && !badges.includes("host")) earned.push("host");
    if ((slug === "karaoke" || slug === "kahoot") && !badges.includes("playlist")) earned.push("playlist");
    if ((slug === "ludo" || slug === "truth") && !badges.includes("chaos")) earned.push("chaos");
    if (Object.keys(stats).length >= 4 && !badges.includes("week-rider")) earned.push("week-rider");
    badges = [...badges, ...earned];

    let points = s.points + POINT_TABLE.play.amount;
    const toasts = [toast(`+${POINT_TABLE.play.amount} BCH`, "Sat down")];
    if (hosted) {
      points += POINT_TABLE.host.amount;
      toasts.unshift(toast(`+${POINT_TABLE.host.amount} BCH`, "Hosted a room"));
    }
    let dailyAt = s.dailyAt;
    if (s.dailyAt !== day) {
      points += POINT_TABLE.daily.amount;
      dailyAt = day;
      toasts.unshift(toast(`+${POINT_TABLE.daily.amount} BCH`, "Daily in the room"));
    }
    for (const id of earned) {
      points += POINT_TABLE.achievement.amount;
      const b = BADGE_CATALOG.find((x) => x.id === id);
      toasts.unshift(toast(b?.name || "Badge", "Unlocked"));
    }

    const next: PlayerState = {
      ...s,
      stats,
      recent,
      badges,
      points,
      dailyAt,
      toasts: [...toasts, ...s.toasts].slice(0, 3),
    };
    persist(next);
    set({
      stats,
      recent,
      badges,
      points,
      dailyAt,
      toasts: next.toasts,
    });
  },
  recordWin: (slug) => {
    const s = get();
    const prev = s.stats[slug] || { played: 0, won: 0 };
    const stats = { ...s.stats, [slug]: { ...prev, won: prev.won + 1 } };
    let badges = s.badges;
    let points = s.points + POINT_TABLE.win.amount;
    const toasts = [toast(`+${POINT_TABLE.win.amount} BCH`, "Win")];
    if (!badges.includes("first-win")) {
      badges = [...badges, "first-win"];
      points += POINT_TABLE.achievement.amount;
      toasts.unshift(toast("First blood", "Unlocked"));
    }
    const next = { ...s, stats, badges, points, toasts: [...toasts, ...s.toasts].slice(0, 3) };
    persist(next);
    set({ stats, badges, points, toasts: next.toasts });
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export function playIf(muted: boolean, fn: () => void) {
  if (!muted) fn();
}

export function playerLevel(points: number) {
  return Math.min(99, 1 + Math.floor(points / 100));
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase() || "BC";
}
