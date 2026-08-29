"use client";

import { Spark } from "@/components/brand/marks";
import { encode } from "uqr";

export function CruiseQr({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const qr = encode(value, { ecc: "H", border: 1 });
  const n = qr.size;
  const cells: string[] = [];
  const quiet = 0.32;
  const lo = (1 - quiet) / 2;
  const hi = lo + quiet;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!qr.data[y][x]) continue;
      const px = x / n;
      const py = y / n;
      if (px > lo && px < hi && py > lo && py < hi) continue;
      cells.push(`M${x} ${y}h1v1h-1z`);
    }
  }
  return (
    <div className={className}>
      <div className="relative aspect-square w-full rounded-[12px] bg-bone p-2">
        <svg viewBox={`0 0 ${n} ${n}`} className="size-full text-midnight" shapeRendering="crispEdges" aria-label="QR code">
          <path d={cells.join("")} fill="currentColor" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-[22%] items-center justify-center rounded-[6px] bg-bone text-danfo">
            <Spark className="size-[85%]" />
          </span>
        </div>
      </div>
    </div>
  );
}
