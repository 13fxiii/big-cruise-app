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
  const isWide = file.includes("wordmark") || file.includes("horizontal");
  const isStacked = file.includes("stacked");
  const w = isStacked ? 640 : isWide ? 1080 : 512;
  const h = isStacked ? 420 : isWide ? 160 : 512;
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(
    `<!doctype html><html><body style="margin:0;background:transparent">${svg.replace("<svg", `<svg width="${w}" height="${h}"`)}</body></html>`,
    { waitUntil: "load" },
  );
  const png = file.replace(".svg", ".png");
  await page.screenshot({
    path: path.join(dir, png),
    omitBackground: file === "mark.svg",
    clip: { x: 0, y: 0, width: w, height: h },
  });
  console.log("png", png);
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

await writeFile("/workspace/public/brand/logos/README.txt", `BIG CRUISE Brand Identity V1.0 — Logo assets
Master mark: the 〽️ (Unicode U+303D Part Alternation Mark), drawn as a one-color lopsided-M stroke.

SVG path (viewBox 0 0 64 64, stroke-width 9, round caps/joins):
M6 36 C9 22 12 8 21 8 C27.5 8 30 20 32 28 C34 20 36.5 8 43 8 C52 8 56 24 60 54

Colors:
Midnight Black #0B0B0B  RGB 11,11,11  CMYK 0,0,0,96  Pantone Black 6 C
Danfo Yellow   #F5C400  RGB 245,196,0  CMYK 0,20,100,4  Pantone 7408 C

Typography: Barlow Condensed ExtraBold (display), IBM Plex Sans (body), IBM Plex Mono (stamps).
`);
console.log("done");
