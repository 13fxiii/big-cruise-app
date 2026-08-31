/**
 * 7 Days merch backs — artwork + house type only.
 * Barlow Condensed ExtraBold / IBM Plex Mono. Type sits in a bar, never on faces.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { writeFileSync } from "node:fs";
import path from "node:path";

const MARK =
  "M5.4 40 C8.4 24.8 13.4 16.8 20.4 16.8 C27.2 16.8 29.4 28.2 32.4 36.2 C35.6 25.4 39.4 6.6 46.8 6.6 C55.4 6.6 57.4 28.8 58.8 57.4";

const days = [
  { id: "mon", n: "01", weekday: "Monday", name: "Dominion\nState", line: "Power is quiet. Power is earned.", accent: "#C48A5A", dock: "bottom", pos: "center 42%" },
  { id: "tue", n: "02", weekday: "Tuesday", name: "Too Lit\nTo Stress", line: "No filter energy. Unapologetic.", accent: "#FF2B6B", dock: "bottom", pos: "center 32%" },
  { id: "wed", n: "03", weekday: "Wednesday", name: "Divine Energy", line: "She moves different.", accent: "#C45A72", dock: "bottom", pos: "center 18%" },
  { id: "thu", n: "04", weekday: "Thursday", name: "Back When\nIt Was Real", line: "Echo era. Rooted in reality.", accent: "#C4A574", dock: "top", pos: "center 55%" },
  { id: "fri", n: "05", weekday: "Friday", name: "Play Your Vibe", line: "Fresh heat. The sound of the culture.", accent: "#3DFFF2", dock: "top", pos: "center 28%" },
  { id: "sat", n: "06", weekday: "Saturday", name: "Read Between\nThe Lines", line: "Unsent thoughts. Feel don't send.", accent: "#E8A0A8", dock: "center", pos: "center" },
  { id: "sun", n: "07", weekday: "Sunday", name: "Chaos Culture", line: "No rules. No limits. Just chaos.", accent: "#C8F542", dock: "bottom", pos: "center 45%" },
];

const spark = (color, size = 40) => `
<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
  <path d="${MARK}" fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const nameHtml = (name, accent) =>
  name
    .split("\n")
    .map((row) => `<span style="color:${accent}">${row}</span>`)
    .join("<br>");

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;800&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet"/>
<style>
  html,body{margin:0;background:#0B0B0B}
  .board{width:1200px;height:1500px;position:relative;overflow:hidden;background:#0B0B0B;color:#F3EFE4;
    font-family:"Barlow Condensed","Arial Narrow",sans-serif}
  .art{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .meta{position:absolute;left:44px;right:44px;top:36px;z-index:4;display:flex;align-items:center;justify-content:space-between}
  .meta span{font-family:"IBM Plex Mono",monospace;font-size:16px;letter-spacing:.32em;text-transform:uppercase;font-weight:500}
  .bar{position:absolute;left:0;right:0;z-index:3;padding:36px 44px 40px}
  .bar.bottom{bottom:0;background:linear-gradient(to top, #0B0B0B 0%, rgba(11,11,11,.92) 62%, transparent 100%)}
  .bar.top{top:84px;background:linear-gradient(to bottom, rgba(11,11,11,.55) 0%, transparent 100%);padding-top:8px}
  .bar.center{top:42%;transform:translateY(-50%);text-align:center;background:transparent}
  .name{font-weight:800;text-transform:uppercase;letter-spacing:.03em;line-height:.88;margin:0;font-size:64px}
  .bar.center .name{font-size:72px}
  .line{margin:12px 0 0;font-weight:600;text-transform:uppercase;letter-spacing:.18em;font-size:22px;color:#F3EFE4}
  .house{margin-top:18px;display:flex;align-items:center;gap:10px;font-weight:800;text-transform:uppercase;letter-spacing:.14em;font-size:22px}
  .bar.center .house{justify-content:center}
  .tag{font-family:"IBM Plex Mono",monospace;font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#8A8A8A;margin:8px 0 0}
</style>
</head>
<body>
${days
  .map(
    (d) => `
<section class="board" id="${d.id}">
  <img class="art" src="file:///workspace/public/brand/merch/days/src-${d.id}.jpg" style="object-position:${d.pos}" alt=""/>
  <div class="meta">
    <span style="color:${d.accent}">${d.n} · ${d.weekday}</span>
    ${spark(d.accent, 38)}
  </div>
  <div class="bar ${d.dock}">
    <p class="name">${nameHtml(d.name, d.accent)}</p>
    <p class="line">${d.line}</p>
    <div class="house"><span>Big Cruise</span>${spark("#F5C400", 30)}</div>
    <p class="tag">Where the cruise lives.</p>
  </div>
</section>`,
  )
  .join("")}
</body></html>`;

const outDir = "/workspace/public/brand/merch/days";
const htmlPath = "/workspace/tmp/day-merch.html";
await mkdir(outDir, { recursive: true });
await mkdir("/workspace/tmp", { recursive: true });
writeFileSync(htmlPath, html);

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ deviceScaleFactor: 2 });
await page.setViewportSize({ width: 1200, height: 1500 });
await page.goto("file://" + htmlPath, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);

for (const d of days) {
  const el = page.locator(`#${d.id}`);
  await el.scrollIntoViewIfNeeded();
  await el.screenshot({ path: path.join(outDir, `${d.id}-back.jpg`), type: "jpeg", quality: 92 });
  console.log("wrote", d.id);
}
await browser.close();
console.log("done");
