/**
 * BIG CRUISE signature geometry — Brand Lock-in V1.1
 *
 * Not the Unicode emoji. A custom one-color stroke inspired by 〽️
 * (U+303D Part Alternation Mark) so the room still recognises it,
 * while the proportions belong to this house.
 *
 * Construction (viewBox 0 0 64 64):
 *   Entry    — motion already happening.
 *   Peak 1   — Cruise. Lower. The way in.
 *   Valley   — Connect. A wide basin. The room.
 *   Peak 2   — Create. Taller. The climb.
 *   Drop     — Support / Grow. Committed descent, no bounce.
 *
 * One open stroke. Round caps. No yacht, bus, anchor, or bubble.
 * NEVER recreate this path from the Unicode glyph. This file is the master.
 */

export const MARK_VIEWBOX = "0 0 64 64";
export const MARK_STROKE = 9;
export const MARK_STROKE_TINY = 11;
export const MARK_STROKE_EMBROIDERY = 11.5;

/** Production master. Peak 2 is ~1.53× Peak 1. Valley is a room, not a V. */
export const MARK_D =
  "M5.4 40 C8.4 24.8 13.4 16.8 20.4 16.8 C27.2 16.8 29.4 28.2 32.4 36.2 C35.6 25.4 39.4 6.6 46.8 6.6 C55.4 6.6 57.4 28.8 58.8 57.4";

/** Compact drop so the mark sits after FX as a signature, not a logo. */
export const MARK_FOUNDER =
  "M7.2 33.8 C10.2 22 14.4 15.4 20.8 15.4 C26.8 15.4 29 23.6 31.8 31 C34.8 21.6 38.6 10.2 45.2 10.2 C52.8 10.2 55 24.4 56.8 47";

/** Optical tiny: higher valley, shorter drop, thicker stroke. 16px digital / 8mm print. */
export const MARK_TINY =
  "M7 33 C10.4 22.4 14.6 16.8 21 16.8 C26.8 16.8 29 24.4 31.8 30.6 C34.8 23 38.8 14.4 45.2 14.4 C52.6 14.4 55 26.4 57.2 48.2";

/** V1.0 traced Unicode — archive only. Do not ship as current identity. */
export const MARK_V1 =
  "M6 36 C9 22 12 8 21 8 C27.5 8 30 20 32 28 C34 20 36.5 8 43 8 C52 8 56 24 60 54";

export const MARK_CONSTRUCTION = {
  start: { x: 5.4, y: 40, label: "Entry" },
  peak1: { x: 20.4, y: 16.8, label: "Cruise" },
  valley: { x: 32.4, y: 36.2, label: "Connect" },
  peak2: { x: 46.8, y: 6.6, label: "Create" },
  end: { x: 58.8, y: 57.4, label: "Grow" },
} as const;

/** Peak 1 rise (apex → valley). The clear-space unit X. */
export const MARK_PEAK1_RISE = 19.4;
/** Peak 2 rise (apex → valley). */
export const MARK_PEAK2_RISE = 29.6;
/** Peak 2 / Peak 1. */
export const MARK_PEAK_RATIO = 1.53;
/** Distance Peak 1 x → Peak 2 x. The room. */
export const MARK_VALLEY_WIDTH = 26.4;
/** Rounded Peak 1 rise. Clear space on every side of the artwork box. */
export const MARK_CLEAR_X = 20;

export const MARK_SPEC = {
  version: "1.1",
  viewBox: MARK_VIEWBOX,
  canvas: 64,
  path: MARK_D,
  founderPath: MARK_FOUNDER,
  tinyPath: MARK_TINY,
  stroke: MARK_STROKE,
  strokeTiny: MARK_STROKE_TINY,
  strokeEmbroidery: MARK_STROKE_EMBROIDERY,
  cap: "round" as const,
  join: "round" as const,
  fill: "none" as const,
  orientation: "upright" as const,
  aspect: "1:1" as const,
  peak1Rise: MARK_PEAK1_RISE,
  peak2Rise: MARK_PEAK2_RISE,
  peakRatio: MARK_PEAK_RATIO,
  valleyWidth: MARK_VALLEY_WIDTH,
  clearX: MARK_CLEAR_X,
  min: {
    signaturePx: 16,
    midnightPx: 24,
    faviconPx: 16,
    appIconPx: 48,
    xAvatarPx: 48,
    mobilePx: 24,
    websitePx: 40,
    printSignatureMm: 8,
    printMidnightMm: 12,
    embroideryMm: 12,
    screenMm: 10,
    dtfMm: 10,
    heatMm: 12,
    wovenMm: 8,
    pvcMm: 12,
    chestMm: 12,
    capMm: 40,
    signageMm: 40,
  },
} as const;

export const MARK_CLEAR_SPACE = "X = height of Peak 1 (Cruise), apex to valley = 19.4 units, production X = 20/64 of the mark box.";
export const MARK_MIN_DIGITAL = "16px signature (tiny cut) / 24px midnight mark";
export const MARK_MIN_PRINT = "8mm signature / 12mm midnight mark / 12mm embroidery";

export const MARK_FILES = {
  master: "/brand/logos/mark.svg",
  community: "/brand/logos/midnight-mark.svg",
  founder: "/brand/logos/founder-fx.svg",
  wordmark: "/brand/logos/wordmark.svg",
  horizontal: "/brand/logos/lockup-horizontal.svg",
  stacked: "/brand/logos/lockup-stacked.svg",
  appIcon: "/brand/logos/app-icon.svg",
  favicon: "/brand/logos/favicon.svg",
  avatar: "/brand/logos/x-avatar.svg",
  tiny: "/brand/logos/mark-tiny.svg",
  embroidery: "/brand/logos/mark-embroidery.svg",
  oneColorBlack: "/brand/logos/mark-one-color-black.svg",
  oneColorYellow: "/brand/logos/mark-one-color-yellow.svg",
} as const;
