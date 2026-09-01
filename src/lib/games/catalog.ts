export type GameSlug =
  | "codenames"
  | "word-guess"
  | "draw"
  | "uno"
  | "ludo"
  | "werewolf"
  | "chess"
  | "karaoke"
  | "truth"
  | "kahoot";

export type GameMode = "bots" | "pass" | "online";

export type GameMeta = {
  slug: GameSlug;
  name: string;
  line: string;
  blurb: string;
  players: string;
  day: string;
  accent: string;
  accent2: string;
  token: string;
  feel: string;
  modes: GameMode[];
};

export const GAMES: GameMeta[] = [
  {
    slug: "codenames",
    name: "Codenames",
    line: "Read the room. Move the board.",
    blurb: "Two crews. One grid. Clues that slap if you know your people.",
    players: "2–12",
    day: "Dominion",
    accent: "#7A1F33",
    accent2: "#C48A5A",
    token: "dom",
    feel: "Deduction",
    modes: ["bots", "pass", "online"],
  },
  {
    slug: "word-guess",
    name: "Word Guess",
    line: "The word is in the cruise.",
    blurb: "Hang the letters, not the vibe. Pidgin, Lagos, Afrobeats, fam.",
    players: "1–12",
    day: "Echo",
    accent: "#C4A574",
    accent2: "#F2E6D0",
    token: "echo",
    feel: "Letters",
    modes: ["bots", "pass"],
  },
  {
    slug: "draw",
    name: "Draw It Out",
    line: "If you can gist it, you can draw it.",
    blurb: "One canvas. One secret. The room guesses like they are in the group chat.",
    players: "2–12",
    day: "Divine",
    accent: "#C45A72",
    accent2: "#E6C8B4",
    token: "divine",
    feel: "Canvas",
    modes: ["pass", "online"],
  },
  {
    slug: "uno",
    name: "UNO",
    line: "No mercy. Say it.",
    blurb: "Brainplay energy. Fan the hand, slap +2, shout UNO like you mean it.",
    players: "2–12",
    day: "Too Lit",
    accent: "#FF2B6B",
    accent2: "#FFF200",
    token: "lit",
    feel: "Cards",
    modes: ["bots", "pass", "online"],
  },
  {
    slug: "ludo",
    name: "Ludo",
    line: "Six dey come.",
    blurb: "Ludo Club motion. Dice bounce, tokens hop, somebody is going back to yard.",
    players: "2–4",
    day: "Chaos",
    accent: "#C8F542",
    accent2: "#FF4D1A",
    token: "chaos",
    feel: "Board",
    modes: ["bots", "pass", "online"],
  },
  {
    slug: "werewolf",
    name: "Werewolf",
    line: "Night takes a name.",
    blurb: "Faces. Votes. Lies told with love. The cruise does social deduction.",
    players: "6–16",
    day: "Lines",
    accent: "#9B1228",
    accent2: "#9A7B12",
    token: "line",
    feel: "Night",
    modes: ["bots", "pass"],
  },
  {
    slug: "chess",
    name: "Chess",
    line: "Quiet power.",
    blurb: "Midnight board. Danfo highlights. Play a bot or sit across from fam.",
    players: "1–2",
    day: "Dominion",
    accent: "#7A1F33",
    accent2: "#C48A5A",
    token: "dom",
    feel: "Board",
    modes: ["bots", "pass", "online"],
  },
  {
    slug: "karaoke",
    name: "Karaoke",
    line: "Live from the cruise.",
    blurb: "Original cruise records. Tap the line, ride the mic, collect the room.",
    players: "1–12",
    day: "Playlist",
    accent: "#6A2C91",
    accent2: "#3DFFF2",
    token: "play",
    feel: "Stage",
    modes: ["pass"],
  },
  {
    slug: "truth",
    name: "Truth or Dare",
    line: "Ask like family.",
    blurb: "Roast, confess, move. Adult room, never cheap. The wheel decides.",
    players: "2–12",
    day: "Too Lit",
    accent: "#FF2B6B",
    accent2: "#FFF200",
    token: "lit",
    feel: "Party",
    modes: ["pass"],
  },
  {
    slug: "kahoot",
    name: "Kahoot",
    line: "Speed is a personality.",
    blurb: "BCH culture, Afrobeats, Lagos streets. Four pads. One clock. Podium.",
    players: "1–16",
    day: "Playlist",
    accent: "#6A2C91",
    accent2: "#3DFFF2",
    token: "play",
    feel: "Quiz",
    modes: ["bots", "pass", "online"],
  },
];

export function getGame(slug: string | undefined): GameMeta | undefined {
  return GAMES.find((g) => g.slug === slug);
}

export const BOT_NAMES = [
  "Tunde",
  "Chioma",
  "Emeka",
  "Zainab",
  "Kemi",
  "Seyi",
  "Amaka",
  "Fola",
  "Ife",
  "Chidi",
  "Bisi",
  "Yemi",
];

export function roomCode(): string {
  const chars = "BCDFGHJKLMNPQRSTVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 4; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export function fisherYates<T>(input: T[]): T[] {
  const a = [...input];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
