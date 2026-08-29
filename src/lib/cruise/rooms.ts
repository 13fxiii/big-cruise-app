import { GAMES, type GameSlug } from "@/lib/games/catalog";

export type RoomKind = "public" | "private";
export type RoomStatus = "open" | "live" | "ended";

export type CruiseRoom = {
  code: string;
  game: GameSlug;
  host: string;
  filled: number;
  seats: number;
  kind: RoomKind;
  spectators: number;
  status: RoomStatus;
};

/**
 * Architecture for rooms that can be wired to live matchmaking later:
 * public / private / invite / spectate / history.
 * Sample rooms keep the lobby inhabited without a fake economy.
 */
export const SAMPLE_ROOMS: CruiseRoom[] = [
  { code: "TND2", game: "uno", host: "Tunde", filled: 3, seats: 4, kind: "public", spectators: 1, status: "live" },
  { code: "CHI7", game: "ludo", host: "Chioma", filled: 2, seats: 4, kind: "public", spectators: 0, status: "open" },
  { code: "EMK4", game: "werewolf", host: "Emeka", filled: 6, seats: 8, kind: "private", spectators: 2, status: "live" },
  { code: "AMK1", game: "karaoke", host: "Amaka", filled: 4, seats: 8, kind: "public", spectators: 3, status: "open" },
  { code: "SEY9", game: "codenames", host: "Seyi", filled: 4, seats: 6, kind: "public", spectators: 0, status: "open" },
  { code: "KEM3", game: "kahoot", host: "Kemi", filled: 5, seats: 8, kind: "public", spectators: 1, status: "live" },
];

export function roomHref(room: CruiseRoom) {
  return `/play/${room.game}`;
}

export function roomMeta(slug: GameSlug) {
  return GAMES.find((g) => g.slug === slug);
}

export const COMING = [
  { id: "invite", label: "Invite friends", note: "Share a 4-letter code. Already works in cruise-room mode." },
  { id: "private", label: "Private rooms", note: "Kind is modeled. Gate lands with live matchmaking." },
  { id: "tourney", label: "Community tournaments", note: "Week-themed brackets. Architecture only." },
  { id: "spectate", label: "Spectating", note: "Spectator count is on the room object." },
  { id: "history", label: "Match history", note: "Per-game stats already persist on this device." },
];

export const FAM = [
  { name: "FX", handle: "@13fxiii", status: "og" as const, line: "Founder. The room exists because he stayed." },
  { name: "Tunde", handle: "in the cruise", status: "host" as const, line: "UNO table is rarely empty." },
  { name: "Chioma", handle: "in the cruise", status: "host" as const, line: "Ludo. Six dey come." },
  { name: "Amaka", handle: "in the cruise", status: "member" as const, line: "Open verse on Friday." },
  { name: "Emeka", handle: "in the cruise", status: "host" as const, line: "Night takes a name." },
  { name: "Kemi", handle: "in the cruise", status: "member" as const, line: "Speed is a personality." },
  { name: "Seyi", handle: "in the cruise", status: "member" as const, line: "Read the room. Move the board." },
  { name: "Zainab", handle: "in the cruise", status: "member" as const, line: "Quiet power." },
];
