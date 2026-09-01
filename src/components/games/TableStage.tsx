"use client";

import { cn } from "@/lib/utils";
import { type ReactNode, useCallback, useRef, useState } from "react";

/** Pointer-tilt 3D table. Week theme only tints house chrome, not the game. */
export function TableStage({
  children,
  className,
  felt = "var(--color-asphalt)",
}: {
  children: ReactNode;
  className?: string;
  felt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 12, y: 0 });

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: 10 + py * -8, y: px * 10 });
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setTilt({ x: 12, y: 0 })}
      className={cn("table-stage", className)}
    >
      <div
        className="table-stage-inner felt-table"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          background: felt,
        }}
      >
        {children}
      </div>
    </div>
  );
}
