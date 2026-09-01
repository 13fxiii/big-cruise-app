import { brand } from "@/lib/brand";
import type { BadgeId, GameStat } from "@/lib/cruise/persist";
import { BADGE_CATALOG, playerLevel } from "@/lib/cruise/persist";
import type { GameSlug } from "@/lib/games/catalog";

export const FOUNDER_CARD = {
  name: brand.founder,
  handle: brand.founderHandle,
  rank: "Big Cruiser",
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

export const X_COMMUNITY = "https://x.com/i/communities/1897164314764579242";

export const HOUSE_ID = "BCH-13FXIII";

export const HOUSE_HANDLES = ["13fxiii", "bchub_"];

export function isFounder(name: string, handle?: string) {
  const n = name.trim().replace(/⚡️/g, "").replace(/⚡/g, "").toLowerCase();
  const h = (handle || "").replace(/^@/, "").toLowerCase();
  return n === "fx" || n === "fx m" || h === "13fxiii";
}

export function isHouseCrew(name: string, handle?: string) {
  if (isFounder(name, handle)) return true;
  const h = (handle || "").replace(/^@/, "").toLowerCase();
  if (HOUSE_HANDLES.includes(h)) return true;
  if (typeof window !== "undefined" && localStorage.getItem("bch-house") === "1") return true;
  return false;
}

export function cardId(personal: string, name: string, handle?: string) {
  return isHouseCrew(name, handle) ? HOUSE_ID : personal;
}

export function formatHandle(handle?: string) {
  const h = (handle || "").replace(/^@/, "").trim();
  return h ? `@${h}` : "";
}

export function memberRank(opts: { founder: boolean; badges: BadgeId[]; points?: number; sits?: number }) {
  if (opts.founder) return "Big Cruiser";
  if (opts.badges.includes("host")) return "Host";
  if ((opts.points || 0) >= 400) return "Ace";
  if ((opts.sits || 0) >= 8) return "Rider";
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
  { label: "Real vibes" },
  { label: "Real people" },
  { label: "Real fun" },
  { label: "Real culture" },
] as const;
