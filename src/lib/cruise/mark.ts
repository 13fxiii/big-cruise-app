/**
 * BIG CRUISE signature geometry — Brand Lock-in V1.1
 *
 * Not the Unicode emoji. A custom one-color stroke inspired by 〽️
 * (U+303D Part Alternation Mark) so the room still recognises it,
 * while the proportions belong to this house.
 *
 * Construction (viewBox 0 0 64 64):
 *   Peak 1  — Cruise. Lower. The entry.
 *   Valley  — Connect. A wide basin, the room.
 *   Peak 2  — Create. Taller. The climb.
 *   Drop    — Support / Grow. Committed descent, no bounce.
 *
 * One open stroke. Round caps. No yacht, bus, anchor, or bubble.
 */

export const MARK_VIEWBOX = "0 0 64 64";
export const MARK_STROKE = 9;
export const MARK_STROKE_TINY = 11;
export const MARK_STROKE_EMBROIDERY = 11.5;

/** Production master. Peak 2 is ~1.33× Peak 1. Valley is a room, not a V. */
export const MARK_D =
  "M4.8 36.5 C7.4 21.5 11.6 12.8 18.6 12.8 C25.4 12.8 28.4 22.8 31.4 31.8 C34.6 20.6 38.4 6.6 45.6 6.6 C54.6 6.6 57.4 23.5 59.8 55.4";

/** Compact drop so the mark sits after FX as a signature, not a logo. */
export const MARK_FOUNDER =
  "M6.5 34.5 C9.2 21.5 13 14 19.8 14 C26 14 28.6 22.2 31.5 30.2 C34.6 20.8 38.2 9.2 44.8 9.2 C52.6 9.2 55.4 22 57.4 47.5";

/** Optical tiny: higher valley, shorter drop, thicker stroke. 16px digital / 8mm print. */
export const MARK_TINY =
  "M6.2 34 C9.4 22 13.4 15.2 20.2 15.2 C26.2 15.2 28.8 22.4 31.6 29.2 C34.6 21.8 38.6 13.2 44.8 13.2 C52.4 13.2 55.2 24 57.6 49";

/** V1.0 traced path — archive only. Do not ship as current identity. */
export const MARK_V1 =
  "M6 36 C9 22 12 8 21 8 C27.5 8 30 20 32 28 C34 20 36.5 8 43 8 C52 8 56 24 60 54";

export const MARK_CONSTRUCTION = {
  start: { x: 4.8, y: 36.5, label: "Entry" },
  peak1: { x: 18.6, y: 12.8, label: "Cruise" },
  valley: { x: 31.4, y: 31.8, label: "Connect" },
  peak2: { x: 45.6, y: 6.6, label: "Create" },
  end: { x: 59.8, y: 55.4, label: "Grow" },
} as const;

export const MARK_CLEAR_SPACE = "Height of Peak 1 (the quieter climb).";
export const MARK_MIN_DIGITAL = "16px signature / 24px midnight mark";
export const MARK_MIN_PRINT = "8mm signature / 12mm midnight mark";
