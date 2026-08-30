import { chromium } from "playwright";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dir = "/workspace/public/brand/logos";
await mkdir(dir, { recursive: true });

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ deviceScaleFactor: 3 });

const svgs = (await readdir(dir)).filter((f) => f.endsWith(".svg"));

for (const file of svgs) {
  const svg = await readFile(path.join(dir, file), "utf8");
  const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const vw = vb ? Number(vb[1]) : 64;
  const vh = vb ? Number(vb[2]) : 64;
  const scale = vw >= 900 ? 1 : vw >= 600 ? 1.5 : 8;
  const w = Math.round(vw * scale);
  const h = Math.round(vh * scale);
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(
    `<!doctype html><html><body style="margin:0;background:transparent">${svg.replace("<svg", `<svg width="${w}" height="${h}"`)}</body></html>`,
    { waitUntil: "load" },
  );
  const png = file.replace(".svg", ".png");
  await page.screenshot({
    path: path.join(dir, png),
    omitBackground: file === "mark.svg" || file.startsWith("mark-one-color") || file === "mark-tiny.svg" || file === "mark-embroidery.svg",
    clip: { x: 0, y: 0, width: w, height: h },
  });
  console.log("png", png, w, h);
}

await browser.close();

const pdfHtml = await readFile("/workspace/public/share/index.html", "utf8").catch(() => null);
if (pdfHtml) {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await b.newPage();
  await p.setContent(pdfHtml, { waitUntil: "networkidle" });
  await p.pdf({
    path: "/workspace/public/brand/logos/BIG-CRUISE-Brand-Identity-V1.pdf",
    format: "A4",
    printBackground: true,
    margin: { top: "12mm", bottom: "12mm", left: "10mm", right: "10mm" },
  });
  await b.close();
  console.log("pdf written");
}

await writeFile("/workspace/public/brand/logos/README.txt", `BIG CRUISE Brand Identity V1.1 — Logo assets
Master mark: custom Cruise Stroke inspired by 〽️. Not the Unicode emoji.

SVG path (viewBox 0 0 64 64, stroke-width 9, round caps/joins):
M4.8 36.5 C7.4 21.5 11.6 12.8 18.6 12.8 C25.4 12.8 28.4 22.8 31.4 31.8 C34.6 20.6 38.4 6.6 45.6 6.6 C54.6 6.6 57.4 23.5 59.8 55.4

A Master — wordmark + signature
B Community — midnight mark / app icon / X avatar
C Founder — FX + compact signature

Colors:
Midnight Black #0B0B0B  RGB 11,11,11  CMYK 0,0,0,96  Pantone Black 6 C
Danfo Yellow   #F5C400  RGB 245,196,0  CMYK 0,20,100,4  Pantone 7408 C

Typography: Barlow Condensed ExtraBold (display), IBM Plex Sans (body), IBM Plex Mono (stamps).
`);
console.log("done");
