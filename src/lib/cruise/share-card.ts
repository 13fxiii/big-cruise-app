import { playerLevel } from "@/lib/cruise/persist";

export type SharedMember = {
  code: string;
  name: string;
  handle: string;
  rank: string;
  points: number;
  level: number;
  sits: number;
  wins: number;
};

export function prettyId(code: string) {
  const raw = code.replace(/^BCH-?/i, "").replace(/[^A-Z0-9]/gi, "").toUpperCase();
  if (raw.length >= 8) return `BCH-${raw.slice(0, 4)}-${raw.slice(4, 8)}`;
  if (raw.length === 6) return `BCH-${raw.slice(0, 3)}-${raw.slice(3)}`;
  return code;
}

export function memberHref(member: SharedMember, origin?: string) {
  const base =
    origin ||
    (typeof window !== "undefined" ? window.location.origin : "https://big-cruise-app.vercel.app");
  const q = new URLSearchParams({
    c: member.code,
    n: member.name.slice(0, 18),
    h: member.handle.replace(/^@/, "").slice(0, 24),
    r: member.rank.slice(0, 18),
    p: String(member.points),
    l: String(member.level || playerLevel(member.points)),
    s: String(member.sits),
    w: String(member.wins),
  });
  return `${base}/id?${q.toString()}`;
}

export function parseMember(search: string): SharedMember | null {
  const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const code = q.get("c") || "";
  if (!code) return null;
  const points = Number(q.get("p") || 0);
  return {
    code,
    name: q.get("n") || "Cruiser",
    handle: q.get("h") || "",
    rank: q.get("r") || "Big Cruiser",
    points,
    level: Number(q.get("l") || playerLevel(points)),
    sits: Number(q.get("s") || 0),
    wins: Number(q.get("w") || 0),
  };
}

const CREW_KEY = "bch-crew";

export function loadCrew(): SharedMember[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CREW_KEY);
    return raw ? (JSON.parse(raw) as SharedMember[]) : [];
  } catch {
    return [];
  }
}

export function saveCrewMember(member: SharedMember) {
  const next = [member, ...loadCrew().filter((m) => m.code !== member.code)].slice(0, 40);
  localStorage.setItem(CREW_KEY, JSON.stringify(next));
  return next;
}
