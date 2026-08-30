#!/usr/bin/env node
/**
 * Generate the V1.1 logo family from the locked Cruise Stroke.
 * Keep MARK_D in sync with src/lib/cruise/mark.ts
 */
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const MARK =
  "M4.8 36.5 C7.4 21.5 11.6 12.8 18.6 12.8 C25.4 12.8 28.4 22.8 31.4 31.8 C34.6 20.6 38.4 6.6 45.6 6.6 C54.6 6.6 57.4 23.5 59.8 55.4";
const FOUNDER =
  "M6.5 34.5 C9.2 21.5 13 14 19.8 14 C26 14 28.6 22.2 31.5 30.2 C34.6 20.8 38.2 9.2 44.8 9.2 C52.6 9.2 55.4 22 57.4 47.5";
const TINY =
  "M6.2 34 C9.4 22 13.4 15.2 20.2 15.2 C26.2 15.2 28.8 22.4 31.6 29.2 C34.6 21.8 38.6 13.2 44.8 13.2 C52.4 13.2 55.2 24 57.6 49";

const Y = "#F5C400";
const M = "#0B0B0B";
const B = "#F3EFE4";

const stroke = (d, color, w = 9) =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

const svg = (vb, title, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-labelledby="t">
  <title id="t">${title}</title>
  ${inner}
</svg>
`;

const files = {
  "mark.svg": svg("0 0 64 64", "BIG CRUISE signature", stroke(MARK, Y)),
  "mark-on-black.svg": svg(
    "0 0 64 64",
    "BIG CRUISE signature on midnight",
    `<rect width="64" height="64" fill="${M}"/>${stroke(MARK, Y)}`,
  ),
  "mark-on-yellow.svg": svg(
    "0 0 64 64",
    "BIG CRUISE signature on danfo",
    `<rect width="64" height="64" fill="${Y}"/>${stroke(MARK, M)}`,
  ),
  "mark-on-bone.svg": svg(
    "0 0 64 64",
    "BIG CRUISE signature on bone — light",
    `<rect width="64" height="64" fill="${B}"/>${stroke(MARK, M)}`,
  ),
  "mark-one-color-black.svg": svg("0 0 64 64", "BIG CRUISE signature one-color black", stroke(MARK, M)),
  "mark-one-color-yellow.svg": svg("0 0 64 64", "BIG CRUISE signature one-color yellow", stroke(MARK, Y)),
  "mark-tiny.svg": svg("0 0 64 64", "BIG CRUISE signature tiny optical", stroke(TINY, Y, 11)),
  "mark-embroidery.svg": svg("0 0 64 64", "BIG CRUISE signature embroidery-safe", stroke(MARK, Y, 11.5)),
  "midnight-mark.svg": svg(
    "0 0 64 64",
    "BIG CRUISE community signature — midnight mark",
    `<circle cx="32" cy="32" r="32" fill="${M}"/><g transform="translate(32 33) scale(0.7) translate(-32 -32)">${stroke(MARK, Y)}</g>`,
  ),
  "x-avatar.svg": svg(
    "0 0 64 64",
    "BIG CRUISE X avatar",
    `<circle cx="32" cy="32" r="32" fill="${M}"/><g transform="translate(32 33) scale(0.7) translate(-32 -32)">${stroke(MARK, Y)}</g>`,
  ),
  "live-mark.svg": svg(
    "0 0 64 64",
    "BIG CRUISE live mark",
    `<circle cx="32" cy="32" r="29" fill="none" stroke="${Y}" stroke-width="4" stroke-dasharray="155 27" stroke-dashoffset="12" stroke-linecap="butt"/><g transform="translate(32 33) scale(0.58) translate(-32 -32)">${stroke(MARK, Y)}</g>`,
  ),
  "app-icon.svg": svg(
    "0 0 64 64",
    "BIG CRUISE app icon",
    `<rect width="64" height="64" rx="14" fill="${M}"/><g transform="translate(32 33) scale(0.62) translate(-32 -32)">${stroke(MARK, Y)}</g>`,
  ),
  "favicon.svg": svg(
    "0 0 32 32",
    "BIG CRUISE favicon",
    `<rect width="32" height="32" rx="16" fill="${M}"/><g fill="none" stroke="${Y}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(16 16.45) scale(0.34) translate(-32 -32)">${stroke(TINY, Y, 11)}</g>`,
  ),
  "lockup-horizontal.svg": svg(
    "0 0 1080 160",
    "BIG CRUISE horizontal lockup",
    `<circle cx="80" cy="80" r="72" fill="${M}"/><g transform="translate(80 82) scale(1.55) translate(-32 -32)">${stroke(MARK, Y)}</g><text x="180" y="100" font-family="Arial Narrow, Helvetica Neue, Arial, sans-serif" font-size="72" font-weight="800" letter-spacing="5" fill="${B}">BIG CRUISE</text><g transform="translate(820 28) scale(1.55)">${stroke(MARK, Y)}</g>`,
  ),
  "lockup-horizontal-light.svg": svg(
    "0 0 1080 160",
    "BIG CRUISE horizontal lockup light",
    `<rect width="1080" height="160" fill="${B}"/><circle cx="80" cy="80" r="72" fill="${M}"/><g transform="translate(80 82) scale(1.55) translate(-32 -32)">${stroke(MARK, Y)}</g><text x="180" y="100" font-family="Arial Narrow, Helvetica Neue, Arial, sans-serif" font-size="72" font-weight="800" letter-spacing="5" fill="${M}">BIG CRUISE</text><g transform="translate(820 28) scale(1.55)">${stroke(MARK, M)}</g>`,
  ),
  "lockup-stacked.svg": svg(
    "0 0 640 420",
    "BIG CRUISE stacked lockup",
    `<circle cx="320" cy="140" r="110" fill="${M}"/><g transform="translate(320 144) scale(2.4) translate(-32 -32)">${stroke(MARK, Y)}</g><text x="320" y="340" text-anchor="middle" font-family="Arial Narrow, Helvetica Neue, Arial, sans-serif" font-size="64" font-weight="800" letter-spacing="5" fill="${B}">BIG CRUISE</text><g transform="translate(520 292) scale(1.15)">${stroke(MARK, Y)}</g>`,
  ),
  "wordmark.svg": svg(
    "0 0 920 120",
    "BIG CRUISE wordmark",
    `<text x="0" y="88" font-family="Arial Narrow, Helvetica Neue, Arial, sans-serif" font-size="92" font-weight="800" letter-spacing="6" fill="${B}">BIG CRUISE</text><g transform="translate(790 18) scale(1.35)">${stroke(MARK, Y)}</g>`,
  ),
  "wordmark-on-yellow.svg": svg(
    "0 0 920 120",
    "BIG CRUISE wordmark on danfo",
    `<rect width="920" height="120" fill="${Y}"/><text x="16" y="88" font-family="Arial Narrow, Helvetica Neue, Arial, sans-serif" font-size="92" font-weight="800" letter-spacing="6" fill="${M}">BIG CRUISE</text><g transform="translate(790 18) scale(1.35)">${stroke(MARK, M)}</g>`,
  ),
  "founder-fx.svg": svg(
    "0 0 280 160",
    "FX founder identity",
    `<text x="8" y="118" font-family="Arial Narrow, Helvetica Neue, Arial, sans-serif" font-size="110" font-weight="800" letter-spacing="4" fill="${B}">FX</text><g transform="translate(168 28) scale(1.55)">${stroke(FOUNDER, Y)}</g>`,
  ),
  "founder-fx-on-black.svg": svg(
    "0 0 280 160",
    "FX founder identity on midnight",
    `<rect width="280" height="160" fill="${M}"/><text x="8" y="118" font-family="Arial Narrow, Helvetica Neue, Arial, sans-serif" font-size="110" font-weight="800" letter-spacing="4" fill="${B}">FX</text><g transform="translate(168 28) scale(1.55)">${stroke(FOUNDER, Y)}</g>`,
  ),
};

const dir = "/workspace/public/brand/logos";
const share = "/workspace/public/share/logos";
await mkdir(dir, { recursive: true });
await mkdir(share, { recursive: true });

for (const [name, content] of Object.entries(files)) {
  const target = path.join(dir, name);
  await writeFile(target, content);
  await copyFile(target, path.join(share, name));
  console.log("svg", name);
}

await writeFile("/workspace/public/favicon.svg", files["favicon.svg"]);

await writeFile(
  path.join(dir, "README.txt"),
  `BIG CRUISE Brand Identity V1.1 — Logo assets
Master: custom Cruise Stroke inspired by 〽️. Not the Unicode emoji.

SVG path (viewBox 0 0 64 64, stroke-width 9, round caps/joins):
${MARK}

Founder (compact drop):
${FOUNDER}

Tiny optical (stroke 11):
${TINY}

Colors:
Midnight Black #0B0B0B  RGB 11,11,11  CMYK 0,0,0,96  Pantone Black 6 C
Danfo Yellow   #F5C400  RGB 245,196,0  CMYK 0,20,100,4  Pantone 7408 C
Bone           #F3EFE4

A Master  — BIG CRUISE + signature (wordmark / lockups)
B Community — midnight mark / app icon / X avatar
C Founder — FX + compact signature

Typography: Barlow Condensed ExtraBold (display), IBM Plex Sans (body), IBM Plex Mono (stamps).
`,
);
await copyFile(path.join(dir, "README.txt"), path.join(share, "README.txt"));
console.log("done", Object.keys(files).length, "files");
