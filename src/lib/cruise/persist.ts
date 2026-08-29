import type { GameSlug } from "@/lib/games/catalog";

/**
 * BIG CRUISE identity — local prototype that can move to a server
 * without rewriting Game Room or the ten game systems.
 *
 * Games talk to `usePlayer` (recordPlay / recordWin / award).
 * That store writes an IdentityDocument through this adapter.
 *
 * Current adapter: localStorage, kind `local-prototype`.
 * Future adapter: same document shape, persisted per signed-in Cruise ID.
 *
 * Future server entities (do not implement while auth is off):
 *   cruise_identities  — cruise_id, display_name, status, joined_at
 *   cruise_profiles    — avatar, bio, community status
 *   cruise_ledger      — action, amount, note, game, at
 *   cruise_badges      — badge_id, earned_at
 *   cruise_game_stats  — game, played, won, last_played
 *   cruise_matches     — game, result, hosted, at
 *   cruise_rooms       — public/private, host, seats, spectators
 *   cruise_challenges  — week rider, host, first blood
 *   cruise_rewards     — catalog; still no shop
 *
 * Clearing this browser wipes the prototype record. That is expected.
 * Do not present local points as a permanent account.
 */

export const SCHEMA_VERSION = 1 as const;

export const PERSISTENCE = {
  kind: "local-prototype" as const,
  label: "Prototype · this device",
  note: "Lives in this browser. Clearing storage clears the record. This is not an account.",
  storageKey: "bch-identity",
  nameKey: "bch-player-name",
};

export type PersistenceKind = typeof PERSISTENCE.kind;
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
};

export type BadgeRecord = {
  id: BadgeId;
  earnedAt: string;
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

export type LedgerEntry = {
  id: string;
  action: PointAction;
  amount: number;
  note: string;
  at: string;
  game?: GameSlug;
};

export type MatchRecord = {
  id: string;
  game: GameSlug;
  result: "sit" | "win";
  hosted: boolean;
  at: string;
};

export type IdentityCore = {
  cruiseId: string;
  name: string;
  joinedAt: string;
  status: CommunityStatus;
};

export type IdentityDocument = {
  v: typeof SCHEMA_VERSION;
  kind: PersistenceKind;
  identity: IdentityCore;
  points: number;
  ledger: LedgerEntry[];
  badges: BadgeRecord[];
  stats: Partial<Record<GameSlug, GameStat>>;
  recent: GameSlug[];
  matches: MatchRecord[];
  dailyAt?: string;
};

export type IdentityEvent =
  | { type: "points"; action: PointAction; amount: number; note: string }
  | { type: "badge"; id: BadgeId; name: string };

/** Amounts are placeholders for a later live ledger. */
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
  { id: "member", name: "Member", hint: "You are in the house." },
  { id: "sat-down", name: "Sat down", hint: "Enter any game room." },
  { id: "first-win", name: "First blood", hint: "Win a match." },
  { id: "host", name: "Host", hint: "Open a cruise room." },
  { id: "week-rider", name: "Week rider", hint: "Play four different games." },
  { id: "playlist", name: "Playlist", hint: "Open Karaoke or Kahoot." },
  { id: "chaos", name: "Chaos", hint: "Sit down for Ludo or Truth." },
];

export const PLACEHOLDER_ID = "BCH-······";

export function mintCruiseId(random = Math.random): string {
  const chars = "BCDFGHJKLMNPQRSTVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(random() * chars.length)];
  return `BCH-${out}`;
}

export function playerLevel(points: number) {
  return Math.min(99, 1 + Math.floor(points / 100));
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase() || "BC";
}

export function communityStatus(badges: BadgeId[]): CommunityStatus {
  if (badges.includes("host")) return "host";
  return "member";
}

export function emptyDocument(): IdentityDocument {
  return {
    v: SCHEMA_VERSION,
    kind: PERSISTENCE.kind,
    identity: {
      cruiseId: PLACEHOLDER_ID,
      name: "Cruise",
      joinedAt: "",
      status: "member",
    },
    points: 0,
    ledger: [],
    badges: [{ id: "member", earnedAt: "" }],
    stats: {},
    recent: [],
    matches: [],
  };
}

function uid(now: Date, random = Math.random) {
  return `${now.getTime().toString(36)}${random().toString(16).slice(2, 8)}`;
}

function todayKey(now: Date) {
  return now.toISOString().slice(0, 10);
}

function badgeIds(doc: IdentityDocument): BadgeId[] {
  return doc.badges.map((b) => b.id);
}

function earnBadge(doc: IdentityDocument, id: BadgeId, at: string, events: IdentityEvent[]): IdentityDocument {
  if (badgeIds(doc).includes(id)) return doc;
  const spec = BADGE_CATALOG.find((b) => b.id === id);
  events.push({ type: "badge", id, name: spec?.name || id });
  const amount = POINT_TABLE.achievement.amount;
  const entry: LedgerEntry = {
    id: uid(new Date(at)),
    action: "achievement",
    amount,
    note: spec?.name || "Badge",
    at,
  };
  return {
    ...doc,
    points: doc.points + amount,
    badges: [...doc.badges, { id, earnedAt: at }],
    ledger: [entry, ...doc.ledger].slice(0, 100),
    identity: { ...doc.identity, status: communityStatus([...badgeIds(doc), id]) },
  };
}

function credit(
  doc: IdentityDocument,
  action: PointAction,
  note: string,
  at: string,
  events: IdentityEvent[],
  game?: GameSlug,
): IdentityDocument {
  const spec = POINT_TABLE[action];
  events.push({ type: "points", action, amount: spec.amount, note });
  const entry: LedgerEntry = {
    id: uid(new Date(at)),
    action,
    amount: spec.amount,
    note,
    at,
    game,
  };
  return {
    ...doc,
    points: doc.points + spec.amount,
    ledger: [entry, ...doc.ledger].slice(0, 100),
  };
}

export function applyName(doc: IdentityDocument, name: string): IdentityDocument {
  const next = name.trim().slice(0, 18) || "Cruise";
  return { ...doc, identity: { ...doc.identity, name: next } };
}

export function applyAward(
  doc: IdentityDocument,
  action: PointAction,
  note?: string,
  now = new Date(),
): { doc: IdentityDocument; events: IdentityEvent[] } {
  const events: IdentityEvent[] = [];
  const next = credit(doc, action, note || POINT_TABLE[action].label, now.toISOString(), events);
  return { doc: next, events };
}

export function applySitDown(
  doc: IdentityDocument,
  slug: GameSlug,
  hosted = false,
  now = new Date(),
): { doc: IdentityDocument; events: IdentityEvent[] } {
  const at = now.toISOString();
  const events: IdentityEvent[] = [];
  const prev = doc.stats[slug] || { played: 0, won: 0 };
  let next: IdentityDocument = {
    ...doc,
    stats: {
      ...doc.stats,
      [slug]: { ...prev, played: prev.played + 1, lastPlayed: at },
    },
    recent: [slug, ...doc.recent.filter((g) => g !== slug)].slice(0, 8),
    matches: (
      [{ id: uid(now), game: slug, result: "sit" as const, hosted, at }, ...doc.matches] as MatchRecord[]
    ).slice(0, 40),
  };

  const day = todayKey(now);
  if (next.dailyAt !== day) {
    next = credit(next, "daily", "Daily in the house", at, events, slug);
    next = { ...next, dailyAt: day };
  }
  if (hosted) next = credit(next, "host", "Hosted a room", at, events, slug);
  next = credit(next, "play", "Sat down", at, events, slug);

  next = earnBadge(next, "sat-down", at, events);
  if (hosted) next = earnBadge(next, "host", at, events);
  if (slug === "karaoke" || slug === "kahoot") next = earnBadge(next, "playlist", at, events);
  if (slug === "ludo" || slug === "truth") next = earnBadge(next, "chaos", at, events);
  if (Object.keys(next.stats).length >= 4) next = earnBadge(next, "week-rider", at, events);

  return { doc: next, events };
}

export function applyWin(
  doc: IdentityDocument,
  slug: GameSlug,
  now = new Date(),
): { doc: IdentityDocument; events: IdentityEvent[] } {
  const at = now.toISOString();
  const events: IdentityEvent[] = [];
  const prev = doc.stats[slug] || { played: 0, won: 0 };
  let next: IdentityDocument = {
    ...doc,
    stats: { ...doc.stats, [slug]: { ...prev, won: prev.won + 1 } },
    matches: (
      [{ id: uid(now), game: slug, result: "win" as const, hosted: false, at }, ...doc.matches] as MatchRecord[]
    ).slice(0, 40),
  };
  next = credit(next, "win", "Win", at, events, slug);
  next = earnBadge(next, "first-win", at, events);
  return { doc: next, events };
}

type LooseSnap = {
  v?: number;
  kind?: string;
  name?: string;
  cruiseId?: string;
  joinedAt?: string;
  points?: number;
  badges?: unknown;
  stats?: IdentityDocument["stats"];
  recent?: GameSlug[];
  dailyAt?: string;
  ledger?: LedgerEntry[];
  matches?: MatchRecord[];
  identity?: Partial<IdentityCore>;
};

export function normalizeDocument(raw: unknown, now = new Date()): IdentityDocument {
  const blank = emptyDocument();
  if (!raw || typeof raw !== "object") return blank;
  const parsed = raw as LooseSnap;
  const identityIn = parsed.identity || {};
  const name = (identityIn.name || parsed.name || "Cruise").trim().slice(0, 18) || "Cruise";
  const cruiseId =
    identityIn.cruiseId && identityIn.cruiseId !== PLACEHOLDER_ID
      ? identityIn.cruiseId
      : parsed.cruiseId && parsed.cruiseId !== PLACEHOLDER_ID
        ? parsed.cruiseId
        : mintCruiseId();
  const joinedAt = identityIn.joinedAt || parsed.joinedAt || now.toISOString();

  let badges: BadgeRecord[] = [];
  if (Array.isArray(parsed.badges) && parsed.badges.length) {
    badges = parsed.badges.map((b) => {
      if (typeof b === "string") return { id: b as BadgeId, earnedAt: joinedAt };
      const rec = b as BadgeRecord;
      return { id: rec.id, earnedAt: rec.earnedAt || joinedAt };
    });
  }
  if (!badges.some((b) => b.id === "member")) {
    badges = [{ id: "member", earnedAt: joinedAt }, ...badges];
  }

  const ids = badges.map((b) => b.id);
  return {
    v: SCHEMA_VERSION,
    kind: PERSISTENCE.kind,
    identity: {
      cruiseId,
      name,
      joinedAt,
      status: communityStatus(ids),
    },
    points: typeof parsed.points === "number" ? parsed.points : 0,
    ledger: Array.isArray(parsed.ledger) ? parsed.ledger.slice(0, 100) : [],
    badges,
    stats: parsed.stats || {},
    recent: Array.isArray(parsed.recent) ? parsed.recent.slice(0, 8) : [],
    matches: Array.isArray(parsed.matches) ? parsed.matches.slice(0, 40) : [],
    dailyAt: parsed.dailyAt,
  };
}

export type StorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

function browserStorage(): StorageLike | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function loadDocument(storage: StorageLike | null = browserStorage(), now = new Date()): IdentityDocument {
  const blank = emptyDocument();
  if (!storage) return blank;
  try {
    const raw = storage.getItem(PERSISTENCE.storageKey);
    if (!raw) {
      const minted: IdentityDocument = {
        ...blank,
        identity: {
          cruiseId: mintCruiseId(),
          name: storage.getItem(PERSISTENCE.nameKey)?.trim() || "Cruise",
          joinedAt: now.toISOString(),
          status: "member",
        },
        badges: [{ id: "member", earnedAt: now.toISOString() }],
      };
      saveDocument(minted, storage);
      return minted;
    }
    const doc = normalizeDocument(JSON.parse(raw), now);
    const nameFromKey = storage.getItem(PERSISTENCE.nameKey)?.trim();
    if (nameFromKey && nameFromKey !== doc.identity.name) {
      doc.identity.name = nameFromKey;
    }
    saveDocument(doc, storage);
    return doc;
  } catch {
    return blank;
  }
}

export function saveDocument(doc: IdentityDocument, storage: StorageLike | null = browserStorage()) {
  if (!storage) return;
  const stamped: IdentityDocument = {
    ...doc,
    v: SCHEMA_VERSION,
    kind: PERSISTENCE.kind,
  };
  storage.setItem(PERSISTENCE.storageKey, JSON.stringify(stamped));
  storage.setItem(PERSISTENCE.nameKey, stamped.identity.name);
}
