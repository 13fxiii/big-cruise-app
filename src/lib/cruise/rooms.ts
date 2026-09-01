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
  sample: true;
};

/**
 * Sample occupancy for the floor. Not live players.
 * Public / private / invite / spectate / history stay modeled
 * so matchmaking can land without a lobby redesign.
 */
export const SAMPLE_ROOMS: CruiseRoom[] = [
  { code: "TND2", game: "uno", host: "Tunde", filled: 7, seats: 12, kind: "public", spectators: 1, status: "live", sample: true },
  { code: "CHI7", game: "ludo", host: "Chioma", filled: 2, seats: 4, kind: "public", spectators: 0, status: "open", sample: true },
  { code: "EMK4", game: "werewolf", host: "Emeka", filled: 11, seats: 16, kind: "private", spectators: 2, status: "live", sample: true },
  { code: "AMK1", game: "karaoke", host: "Amaka", filled: 6, seats: 12, kind: "public", spectators: 3, status: "open", sample: true },
  { code: "SEY9", game: "codenames", host: "Seyi", filled: 8, seats: 12, kind: "public", spectators: 0, status: "open", sample: true },
  { code: "KEM3", game: "kahoot", host: "Kemi", filled: 9, seats: 16, kind: "public", spectators: 1, status: "live", sample: true },
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
  { id: "tourney", label: "Community tournaments", note: "Week-themed brackets. Not live yet." },
  { id: "spectate", label: "Spectating", note: "Spectator count is on the room object." },
  { id: "history", label: "Match history", note: "Sits and wins already write to this device." },
];

export const FAM = [
  { name: "FX", handle: "@13fxiii", status: "og" as const, line: "Founder. The house exists because he stayed.", real: true },
  { name: "Tunde", handle: "house voice", status: "host" as const, line: "UNO table is rarely empty.", real: false },
  { name: "Chioma", handle: "house voice", status: "host" as const, line: "Ludo. Six dey come.", real: false },
  { name: "Amaka", handle: "house voice", status: "member" as const, line: "Open verse on Friday.", real: false },
  { name: "Emeka", handle: "house voice", status: "host" as const, line: "Night takes a name.", real: false },
  { name: "Kemi", handle: "house voice", status: "member" as const, line: "Speed is a personality.", real: false },
  { name: "Seyi", handle: "house voice", status: "member" as const, line: "Read the room. Move the board.", real: false },
  { name: "Zainab", handle: "house voice", status: "member" as const, line: "Quiet power.", real: false },
];

export const HOUSE_RECORDS = [
  { title: "Where the Cruise Lives", line: "Midnight on the timeline.", bpm: 98 },
  { title: "Sunday Chaos", line: "Ludo on the floor, UNO in the chat.", bpm: 110 },
  { title: "Live from the Room", line: "Say your name like family.", bpm: 88 },
];
