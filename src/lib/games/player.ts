import { create } from "zustand";
import type { GameSlug } from "@/lib/games/catalog";
import {
  applyAward,
  applyName,
  applyProfile,
  applySitDown,
  applyWin,
  emptyDocument,
  loadDocument,
  saveDocument,
  type BadgeId,
  type BadgeRecord,
  type IdentityDocument,
  type IdentityEvent,
  type LedgerEntry,
  type MatchRecord,
  type PointAction,
} from "@/lib/cruise/persist";

export {
  BADGE_CATALOG,
  PERSISTENCE,
  POINT_TABLE,
  initials,
  playerLevel,
  type Badge,
  type BadgeId,
  type BadgeRecord,
  type CommunityStatus,
  type GameStat,
  type LedgerEntry,
  type MatchRecord,
  type PersistenceKind,
  type PointAction,
} from "@/lib/cruise/persist";

export type Toast = {
  id: string;
  title: string;
  body?: string;
};

type PlayerState = {
  name: string;
  handle?: string;
  line?: string;
  photo?: string;
  muted: boolean;
  cruiseId: string;
  joinedAt: string;
  points: number;
  badges: BadgeId[];
  badgeRecords: BadgeRecord[];
  stats: IdentityDocument["stats"];
  recent: GameSlug[];
  ledger: LedgerEntry[];
  matches: MatchRecord[];
  dailyAt?: string;
  ready: boolean;
  toasts: Toast[];
  notices: Toast[];
  hydrate: () => void;
  setName: (name: string) => void;
  setProfile: (patch: { name?: string; handle?: string; line?: string; photo?: string | null }) => void;
  toggleMute: () => void;
  recordPlay: (slug: GameSlug, hosted?: boolean) => void;
  recordWin: (slug: GameSlug) => void;
  award: (action: PointAction, note?: string) => void;
  dismissToast: (id: string) => void;
  notify: (title: string, body?: string) => void;
};

function toast(title: string, body?: string): Toast {
  return { id: `t${Date.now()}${Math.random().toString(16).slice(2, 6)}`, title, body };
}

function eventsToToasts(events: IdentityEvent[]): Toast[] {
  return events.map((e) =>
    e.type === "points" ? toast(`+${e.amount} BCH`, e.note) : toast(e.name, "Unlocked"),
  );
}

function fromDoc(doc: IdentityDocument): Pick<
  PlayerState,
  | "name"
  | "handle"
  | "line"
  | "photo"
  | "cruiseId"
  | "joinedAt"
  | "points"
  | "badges"
  | "badgeRecords"
  | "stats"
  | "recent"
  | "ledger"
  | "matches"
  | "dailyAt"
> {
  return {
    name: doc.identity.name,
    handle: doc.identity.handle,
    line: doc.identity.line,
    photo: doc.identity.photo,
    cruiseId: doc.identity.cruiseId,
    joinedAt: doc.identity.joinedAt,
    points: doc.points,
    badges: doc.badges.map((b) => b.id),
    badgeRecords: doc.badges,
    stats: doc.stats,
    recent: doc.recent,
    ledger: doc.ledger,
    matches: doc.matches,
    dailyAt: doc.dailyAt,
  };
}

function currentDoc(s: PlayerState): IdentityDocument {
  return s.ready ? toDoc(s) : loadDocument();
}

function toDoc(s: PlayerState): IdentityDocument {
  return {
    v: 1,
    kind: "local-prototype",
    identity: {
      cruiseId: s.cruiseId,
      name: s.name,
      joinedAt: s.joinedAt || new Date().toISOString(),
      status: s.badges.includes("host") ? "host" : "member",
      handle: s.handle,
      line: s.line,
      photo: s.photo,
    },
    points: s.points,
    ledger: s.ledger,
    badges: s.badgeRecords.length ? s.badgeRecords : s.badges.map((id) => ({ id, earnedAt: s.joinedAt })),
    stats: s.stats,
    recent: s.recent,
    matches: s.matches,
    dailyAt: s.dailyAt,
  };
}

const blank = emptyDocument();

export const usePlayer = create<PlayerState>((set, get) => ({
  ...fromDoc(blank),
  muted: false,
  ready: false,
  toasts: [],
  notices: [],
  hydrate: () => {
    if (get().ready) return;
    set({ ...fromDoc(loadDocument()), ready: true });
  },
  setName: (name) => {
    const s = get();
    const doc = applyName(currentDoc(s), name);
    saveDocument(doc);
    set({ ...fromDoc(doc), ready: true });
  },
  setProfile: (patch) => {
    const s = get();
    const doc = applyProfile(currentDoc(s), patch);
    saveDocument(doc);
    set({ ...fromDoc(doc), ready: true });
  },
  toggleMute: () => set((s) => ({ muted: !s.muted })),
  award: (action, note) => {
    const s = get();
    const { doc, events } = applyAward(currentDoc(s), action, note);
    saveDocument(doc);
    set({ ...fromDoc(doc), ready: true, toasts: [...eventsToToasts(events), ...s.toasts].slice(0, 3) });
  },
  recordPlay: (slug, hosted) => {
    const s = get();
    const { doc, events } = applySitDown(currentDoc(s), slug, hosted);
    saveDocument(doc);
    set({ ...fromDoc(doc), ready: true, toasts: [...eventsToToasts(events), ...s.toasts].slice(0, 3) });
  },
  recordWin: (slug) => {
    const s = get();
    const { doc, events } = applyWin(currentDoc(s), slug);
    saveDocument(doc);
    set({ ...fromDoc(doc), ready: true, toasts: [...eventsToToasts(events), ...s.toasts].slice(0, 3) });
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  notify: (title, body) =>
    set((s) => {
      const note = toast(title, body);
      return {
        toasts: [note, ...s.toasts].slice(0, 3),
        notices: [note, ...s.notices].slice(0, 40),
      };
    }),
}));

export function playIf(muted: boolean, fn: () => void) {
  if (!muted) fn();
}
