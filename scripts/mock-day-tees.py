#!/usr/bin/env python3
"""Print each 7 Days back onto the hanging midnight tee."""
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageEnhance

ROOT = Path("/workspace/public/brand/merch")
TEE = Image.open(ROOT / "tee-blank.jpg").convert("RGBA")
DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
OUT = ROOT / "days"

# Destination corners on the hanging tee: TL, TR, BR, BL (below collar, inside seams).
DST = [(330, 430), (870, 418), (900, 1205), (300, 1218)]


def coeffs(src, dst):
    matrix = []
    for (x, y), (u, v) in zip(src, dst):
        matrix.append([x, y, 1, 0, 0, 0, -u * x, -u * y])
        matrix.append([0, 0, 0, x, y, 1, -v * x, -v * y])
    a = np.array(matrix, dtype=float)
    b = np.array(dst, dtype=float).reshape(8)
    return np.linalg.lstsq(a, b, rcond=None)[0]


def place(print_img: Image.Image, tee: Image.Image) -> Image.Image:
    art = print_img.convert("RGBA")
    art = ImageEnhance.Brightness(art).enhance(0.9)
    sw, sh = art.size
    c = coeffs([(0, 0), (sw, 0), (sw, sh), (0, sh)], DST)
    warped = art.transform(tee.size, Image.Transform.PERSPECTIVE, c, resample=Image.Resampling.BICUBIC)
    mask = Image.new("L", (sw, sh), 255).transform(
        tee.size, Image.Transform.PERSPECTIVE, c, resample=Image.Resampling.BICUBIC
    )
    mask = mask.filter(ImageFilter.GaussianBlur(2.4))
    base = tee.copy()
    base.paste(warped, (0, 0), mask)
    return base.convert("RGB")


for day in DAYS:
    src = Image.open(OUT / f"{day}-back.jpg")
    mock = place(src, TEE)
    dest = OUT / f"{day}-tee.jpg"
    mock.save(dest, "JPEG", quality=91, optimize=True)
    print("tee", dest.name, mock.size)

w, h = 380, 510
sheet = Image.new("RGB", (24 + w * 7, 24 + h), (11, 11, 11))
for i, day in enumerate(DAYS):
    im = Image.open(OUT / f"{day}-tee.jpg")
    im.thumbnail((w - 8, h - 8))
    x = 12 + i * w + (w - im.size[0]) // 2
    y = 12 + (h - im.size[1]) // 2
    sheet.paste(im, (x, y))
sheet.save(OUT / "week-tees.jpg", "JPEG", quality=90, optimize=True)
print("sheet", sheet.size)
