import { encode } from "uqr";
import { X_COMMUNITY } from "@/lib/cruise/id-card";
import { prettyId } from "@/lib/cruise/share-card";

const MIDNIGHT = "#0B0B0B";
const ASPHALT = "#161616";
const DANFO = "#F5C400";
const BONE = "#F3EFE4";
const CONCRETE = "#8A8A8A";

export type CardExport = {
  name: string;
  handle: string;
  line: string;
  rank: string;
  code: string;
  href: string;
  photo?: string;
  figures: { value: string; label: string }[];
  achievements: string[];
  pillars: readonly { label: string }[];
};

const W = 1080;
const H = 1350;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

function loadPhoto(src?: string) {
  if (!src) return Promise.resolve<HTMLImageElement | null>(null);
  return new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function paintBase(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = MIDNIGHT;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(245,196,0,0.45)";
  ctx.lineWidth = 6;
  roundRect(ctx, 28, 28, W - 56, H - 56, 48);
  ctx.stroke();
  const glow = ctx.createRadialGradient(W - 80, 80, 20, W - 80, 80, 420);
  glow.addColorStop(0, "rgba(245,196,0,0.16)");
  glow.addColorStop(1, "rgba(245,196,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
}

function drawQr(ctx: CanvasRenderingContext2D, value: string, x: number, y: number, size: number) {
  const qr = encode(value, { ecc: "H", border: 2 });
  const n = qr.size;
  const cell = size / n;
  ctx.fillStyle = BONE;
  roundRect(ctx, x - 16, y - 16, size + 32, size + 32, 18);
  ctx.fill();
  ctx.fillStyle = MIDNIGHT;
  const quiet = 0.16;
  const lo = (1 - quiet) / 2;
  const hi = lo + quiet;
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (!qr.data[row][col]) continue;
      const px = col / n;
      const py = row / n;
      if (px > lo && px < hi && py > lo && py < hi) continue;
      ctx.fillRect(x + col * cell, y + row * cell, cell + 0.4, cell + 0.4);
    }
  }
  const mark = size * 0.14;
  ctx.fillStyle = BONE;
  ctx.fillRect(x + (size - mark) / 2, y + (size - mark) / 2, mark, mark);
  ctx.fillStyle = DANFO;
  ctx.font = `700 ${mark * 0.7}px "Barlow Condensed", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("B", x + size / 2, y + size / 2 + 2);
}

async function canvasToBlob(canvas: HTMLCanvasElement) {
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Could not make the card image.");
  return blob;
}

async function handOff(blob: Blob, filename: string) {
  const file = new File([blob], filename, { type: "image/png" });
  const nav = navigator as Navigator & {
    canShare?: (data: ShareData) => boolean;
    share?: (data: ShareData) => Promise<void>;
  };
  if (nav.share && nav.canShare?.({ files: [file] })) {
    try {
      await nav.share({ files: [file], title: "BIG CRUISE ID", text: prettyId(filename) });
      return;
    } catch {
      /* fall through to download */
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function renderCardFace(side: "front" | "back", card: CardExport) {
  await document.fonts.ready.catch(() => undefined);
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No canvas");
  paintBase(ctx);
  ctx.textBaseline = "top";

  if (side === "front") {
    ctx.fillStyle = DANFO;
    ctx.font = '500 22px "IBM Plex Mono", monospace';
    ctx.textAlign = "left";
    ctx.fillText("MORE BANTER. MORE VIBES. ONE CRUISE.", 80, 80);
    ctx.fillStyle = "rgba(243,239,228,0.7)";
    ctx.textAlign = "right";
    ctx.fillText("OFFICIAL MEMBER", W - 80, 80);

    const photo = await loadPhoto(card.photo);
    ctx.save();
    ctx.beginPath();
    ctx.arc(170, 280, 78, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    if (photo) ctx.drawImage(photo, 92, 202, 156, 156);
    else {
      ctx.fillStyle = ASPHALT;
      ctx.fillRect(92, 202, 156, 156);
      ctx.fillStyle = DANFO;
      ctx.font = '800 52px "Barlow Condensed", sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(card.name.slice(0, 2).toUpperCase(), 170, 280);
    }
    ctx.restore();
    ctx.strokeStyle = DANFO;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(170, 280, 80, 0, Math.PI * 2);
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = BONE;
    ctx.font = '800 92px "Barlow Condensed", sans-serif';
    ctx.fillText(card.name.toUpperCase().slice(0, 16), 280, 214);
    if (card.handle) {
      ctx.fillStyle = CONCRETE;
      ctx.font = '500 24px "IBM Plex Mono", monospace';
      ctx.fillText(card.handle, 280, 318);
    }
    ctx.fillStyle = DANFO;
    ctx.font = '700 28px "Barlow Condensed", sans-serif';
    ctx.fillText(card.rank.toUpperCase(), 280, 360);
    ctx.fillStyle = "rgba(243,239,228,0.75)";
    ctx.font = 'italic 26px "IBM Plex Sans", sans-serif';
    ctx.fillText(`\u201c${card.line}\u201d`.slice(0, 48), 80, 430);

    const cols = Math.min(4, card.figures.length || 1);
    const gap = 8;
    const boxW = (W - 160 - gap * (cols - 1)) / cols;
    card.figures.slice(0, 4).forEach((fig, i) => {
      const x = 80 + i * (boxW + gap);
      ctx.fillStyle = ASPHALT;
      roundRect(ctx, x, 510, boxW, 150, 12);
      ctx.fill();
      ctx.fillStyle = DANFO;
      ctx.font = '800 44px "Barlow Condensed", sans-serif';
      ctx.textAlign = "left";
      ctx.fillText(fig.value.slice(0, 10), x + 18, 538);
      ctx.fillStyle = CONCRETE;
      ctx.font = '500 18px "IBM Plex Mono", monospace';
      ctx.fillText(fig.label.toUpperCase(), x + 18, 604);
    });

    ctx.fillStyle = CONCRETE;
    ctx.font = '500 18px "IBM Plex Mono", monospace';
    ctx.fillText("BCH ACHIEVEMENTS", 80, 710);
    let chipX = 80;
    let chipY = 748;
    card.achievements.slice(0, 6).forEach((a) => {
      ctx.font = '600 22px "Barlow Condensed", sans-serif';
      const tw = ctx.measureText(a.toUpperCase()).width + 36;
      if (chipX + tw > W - 80) {
        chipX = 80;
        chipY += 56;
      }
      ctx.strokeStyle = "rgba(243,239,228,0.35)";
      ctx.lineWidth = 2;
      roundRect(ctx, chipX, chipY, tw, 42, 20);
      ctx.stroke();
      ctx.fillStyle = BONE;
      ctx.fillText(a.toUpperCase(), chipX + 18, chipY + 10);
      chipX += tw + 12;
    });

    ctx.fillStyle = CONCRETE;
    ctx.font = '500 18px "IBM Plex Mono", monospace';
    ctx.fillText("MEMBER ID", 80, 1180);
    ctx.fillStyle = DANFO;
    ctx.font = '600 36px "IBM Plex Mono", monospace';
    ctx.fillText(prettyId(card.code), 80, 1214);
    ctx.fillStyle = CONCRETE;
    ctx.font = '500 18px "IBM Plex Mono", monospace';
    ctx.textAlign = "right";
    ctx.fillText("BIG CRUISE", W - 80, 1220);
  } else {
    ctx.fillStyle = BONE;
    ctx.font = '800 64px "Barlow Condensed", sans-serif';
    ctx.textAlign = "left";
    ctx.fillText("BIG CRUISE", 80, 90);
    ctx.fillStyle = DANFO;
    ctx.font = '500 22px "IBM Plex Mono", monospace';
    ctx.fillText("THE BIGGEST VIBE COMMUNITY", 80, 170);
    ctx.fillStyle = "rgba(243,239,228,0.82)";
    ctx.font = '400 28px "IBM Plex Sans", sans-serif';
    wrapText(ctx, "Entertainment. Banter. Memes. Music. Games. Culture. One cruise.", 80, 230, W - 160, 40);

    card.pillars.forEach((p, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      ctx.fillStyle = DANFO;
      ctx.font = '800 28px "Barlow Condensed", sans-serif';
      ctx.fillText("\u2726  " + p.label.toUpperCase(), 80 + col * 460, 400 + row * 70);
    });

    ctx.fillStyle = DANFO;
    ctx.font = '800 72px "Barlow Condensed", sans-serif';
    ctx.fillText("BIGGEST VIBES.", 80, 600);
    ctx.fillText("LOUDEST COMMUNITY.", 80, 680);
    ctx.fillStyle = CONCRETE;
    ctx.font = '500 20px "IBM Plex Mono", monospace';
    ctx.fillText("CONNECT / VIBE / CRUISE", 80, 780);

    drawQr(ctx, card.href, W - 360, 900, 240);
    ctx.fillStyle = DANFO;
    ctx.font = '600 22px "IBM Plex Mono", monospace';
    ctx.textAlign = "right";
    ctx.fillText(prettyId(card.code), W - 120, 1160);
    ctx.fillStyle = CONCRETE;
    ctx.font = '500 16px "IBM Plex Mono", monospace';
    ctx.fillText(X_COMMUNITY.replace("https://", ""), W - 120, 1200);
  }

  return canvasToBlob(canvas);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  max: number,
  lineH: number,
) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > max) {
      ctx.fillText(line, x, yy);
      line = word;
      yy += lineH;
    } else line = test;
  }
  if (line) ctx.fillText(line, x, yy);
}

export async function saveCardImages(card: CardExport, side: "front" | "back" | "both" = "both") {
  const slug = prettyId(card.code).replace(/\s/g, "");
  if (side === "front" || side === "both") {
    const front = await renderCardFace("front", card);
    await handOff(front, `${slug}-front.png`);
  }
  if (side === "back" || side === "both") {
    const back = await renderCardFace("back", card);
    await handOff(back, `${slug}-back.png`);
  }
}
