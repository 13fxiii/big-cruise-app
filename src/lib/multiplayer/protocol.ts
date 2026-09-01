/**
 * Game-room wire format on top of P2P data channels.
 *
 * Checkpoint 1 (this file): snapshot + action.
 * Unreliable `state` channel = live snapshots (FEN, strokes, scores).
 * Reliable channel = commits (a move, a vote) that must land.
 *
 * Host is the SitDown host (joining === false). Guests apply snapshots.
 * Next checkpoint: lockstep ticks + checksums once 8+ peers strain full-mesh.
 */
export type GameSlugWire =
  | "chess"
  | "uno"
  | "draw"
  | "ludo"
  | "kahoot"
  | "werewolf"
  | "truth"
  | "word-guess"
  | "codenames"
  | "karaoke";

export type RoomHello = { t: "hello"; name: string; joining: boolean };
export type RoomSnapshot = { t: "snap"; game: GameSlugWire; seq: number; payload: unknown };
export type RoomAction = { t: "act"; game: GameSlugWire; kind: string; payload: unknown };

export type RoomPacket = RoomHello | RoomSnapshot | RoomAction;

export function isRoomPacket(data: unknown): data is RoomPacket {
  if (!data || typeof data !== "object") return false;
  const t = (data as { t?: string }).t;
  return t === "hello" || t === "snap" || t === "act";
}
