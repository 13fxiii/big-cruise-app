import { brand } from "@/lib/brand";
import type { BadgeId, GameStat } from "@/lib/cruise/persist";
import { BADGE_CATALOG, playerLevel } from "@/lib/cruise/persist";
import type { GameSlug } from "@/lib/games/catalog";

/** Official founder card copy — from FX's membership design, in house voice. */
export const FOUNDER_CARD = {
  name: brand.founder,
  handle: brand.founderHandle,
  rank: "OG",
  line: "Just here for the vibes.",
  since: "2024",
  kicker: "More banter. More vibes. One cruise.",
  stats: [
    { value: "3.1K+", label: "Community" },
    { value: "15K+", label: "X followers" },
    { value: "Top 1%", label: "Engagement" },
    { value: "OG", label: "Since 2024" },
  ],
  achievements: ["OG Cruiser", "Top Engager", "Spaces Regular", "Community MVP"],
};

export function isFounder(name: string, handle?: string) {
  const n = name.trim().replace(/〽️/g, "").toLowerCase();
  const h = (handle || "").replace(/^@/, "").toLowerCase();
  return n === "fx" || h === "13fxiii";
}

export function formatHandle(handle?: string) {
  const h = (handle || "").replace(/^@/, "").trim();
  return h ? `@${h}` : "";
}

export function memberRank(opts: { founder: boolean; badges: BadgeId[] }) {
  if (opts.founder) return "OG";
  if (opts.badges.includes("host")) return "Host";
  return "Big Cruiser";
}

export function cardStats(opts: {
  founder: boolean;
  points: number;
  joinedAt: string;
  stats: Partial<Record<GameSlug, GameStat>>;
  badges: BadgeId[];
}) {
  if (opts.founder) return FOUNDER_CARD.stats;
  const sits = Object.values(opts.stats).reduce((n, s) => n + (s?.played || 0), 0);
  const wins = Object.values(opts.stats).reduce((n, s) => n + (s?.won || 0), 0);
  const joined = opts.joinedAt
    ? new Date(opts.joinedAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })
    : "—";
  return [
    { value: String(playerLevel(opts.points)), label: "Level" },
    { value: String(opts.points), label: "BCH" },
    { value: `${sits}/${wins}`, label: "Sits / wins" },
    { value: joined, label: "Joined" },
  ];
}

export function cardAchievements(opts: { founder: boolean; badges: BadgeId[] }) {
  if (opts.founder) return FOUNDER_CARD.achievements;
  return BADGE_CATALOG.filter((b) => opts.badges.includes(b.id)).map((b) => b.name);
}

export const CARD_PILLARS = [
  { label: "Real people" },
  { label: "Real rooms" },
  { label: "Real music" },
  { label: "Real culture" },
] as const;
