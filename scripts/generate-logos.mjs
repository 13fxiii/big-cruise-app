#!/usr/bin/env node
/**
 * Generate the V1.1 logo family from the locked Cruise Stroke.
 * Keep MARK_D in sync with src/lib/cruise/mark.ts
 */
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const MARK =
  "M5.4 40 C8.4 24.8 13.4 16.8 20.4 16.8 C27.2 16.8 29.4 28.2 32.4 36.2 C35.6 25.4 39.4 6.6 46.8 6.6 C55.4 6.6 57.4 28.8 58.8 57.4";
const FOUNDER =
  "M7.2 33.8 C10.2 22 14.4 15.4 20.8 15.4 C26.8 15.4 29 23.6 31.8 31 C34.8 21.6 38.6 10.2 45.2 10.2 C52.8 10.2 55 24.4 56.8 47";
const TINY =
  "M7 33 C10.4 22.4 14.6 16.8 21 16.8 C26.8 16.8 29 24.4 31.8 30.6 C34.8 23 38.8 14.4 45.2 14.4 C52.6 14.4 55 26.4 57.2 48.2";

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
    "0 0 820 160",
    "BIG CRUISE horizontal lockup",
    `<circle cx="80" cy="80" r="72" fill="${M}"/><g transform="translate(80 82) scale(1.55) translate(-32 -32)">${stroke(MARK, Y)}</g><text x="180" y="100" font-family="Arial Narrow, Helvetica Neue, Arial, sans-serif" font-size="72" font-weight="800" letter-spacing="5" fill="${B}">BIG CRUISE</text>`,
  ),
  "lockup-horizontal-light.svg": svg(
    "0 0 820 160",
    "BIG CRUISE horizontal lockup light",
    `<rect width="820" height="160" fill="${B}"/><circle cx="80" cy="80" r="72" fill="${M}"/><g transform="translate(80 82) scale(1.55) translate(-32 -32)">${stroke(MARK, Y)}</g><text x="180" y="100" font-family="Arial Narrow, Helvetica Neue, Arial, sans-serif" font-size="72" font-weight="800" letter-spacing="5" fill="${M}">BIG CRUISE</text>`,
  ),
  "lockup-stacked.svg": svg(
    "0 0 640 400",
    "BIG CRUISE stacked lockup",
    `<circle cx="320" cy="140" r="110" fill="${M}"/><g transform="translate(320 144) scale(2.4) translate(-32 -32)">${stroke(MARK, Y)}</g><text x="320" y="340" text-anchor="middle" font-family="Arial Narrow, Helvetica Neue, Arial, sans-serif" font-size="64" font-weight="800" letter-spacing="5" fill="${B}">BIG CRUISE</text>`,
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

const readme = `BIG CRUISE Brand Identity V1.1 — Logo assets
Canonical folder. Do not keep a second drawing of the same mark.

Master: custom Cruise Stroke. NOT Unicode U+303D.

SVG path (viewBox 0 0 64 64, stroke 9, round caps/joins, fill none, upright, 1:1):
${MARK}

Founder (compact drop):
${FOUNDER}

Tiny optical (stroke 11):
${TINY}

Embroidery uses master path at stroke 11.5.
Clear space X = 20/64 of the mark box (Peak 1 height, apex to valley).

A Master  — wordmark.svg / lockup-horizontal.svg / lockup-stacked.svg
B Community — midnight-mark.svg = x-avatar.svg / app-icon.svg / favicon.svg
C Founder — founder-fx.svg  (never the community avatar)

One-color: mark-one-color-black.svg, mark-one-color-yellow.svg
Grounds: mark-on-black.svg, mark-on-yellow.svg, mark-on-bone.svg
PNG is a raster snapshot of the matching SVG.

Colors:
Midnight Black #0B0B0B  RGB 11,11,11  CMYK 0,0,0,96  Pantone Black 6 C  · 75–85%
Danfo Yellow   #F5C400  RGB 245,196,0  CMYK 0,20,100,4  Pantone 7408 C   · 15–25%
Bone           #F3EFE4

Minimum: signature 16px / 8mm · midnight 24px / 12mm · embroidery 12mm · app icon 48px

Typography: Barlow Condensed ExtraBold (display), IBM Plex Sans (body), IBM Plex Mono (stamps).
`;

await writeFile(path.join(dir, "README.txt"), readme);
await copyFile(path.join(dir, "README.txt"), path.join(share, "README.txt"));
console.log("done", Object.keys(files).length, "files");
