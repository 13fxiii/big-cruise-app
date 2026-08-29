import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { chromium } from "playwright";

const ROOT = "/workspace/.grok";
const CHROME =
  "/opt/pw-browsers/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell";
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
};

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const file = resolve(join(ROOT, urlPath === "/" ? "index.html" : urlPath));
  if (!file.startsWith(ROOT) || !existsSync(file)) {
    res.writeHead(404);
    res.end("not found");
    return;
  }
  res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});

await new Promise((r) => server.listen(0, "127.0.0.1", r));
const { port } = server.address();
const origin = `http://127.0.0.1:${port}`;

const browser = await chromium.launch({
  executablePath: CHROME,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
  headless: true,
});

async function shoot(pagePath, width, height, outPng) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });
  await page.goto(`${origin}${pagePath}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((img) =>
        img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }),
      ),
    );
  });
  await page.waitForTimeout(120);
  const card = page.locator(".card");
  await card.screenshot({ path: outPng, type: "png" });
  await page.close();
}

await shoot("/og-card-games.html", 1200, 630, join(ROOT, "og-card-raw.png"));
await shoot("/x-banner-games.html", 1200, 264, join(ROOT, "x-banner-raw.png"));

await browser.close();
server.close();
console.log("rendered", join(ROOT, "og-card-raw.png"), join(ROOT, "x-banner-raw.png"));
