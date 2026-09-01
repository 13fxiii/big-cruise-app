"use client";

import { cn } from "@/lib/utils";
import { type CSSProperties, type ReactNode, useCallback, useRef, useState } from "react";

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

  const stageStyle: CSSProperties = {
    perspective: "1400px",
    perspectiveOrigin: "50% 20%",
    padding: "1.25rem 0.75rem 2.5rem",
  };

  const innerStyle: CSSProperties = {
    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    transformStyle: "preserve-3d",
    background: felt,
    backfaceVisibility: "hidden",
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setTilt({ x: 12, y: 0 })}
      className={cn("table-stage", className)}
      style={stageStyle}
    >
      <div className="table-stage-inner felt-table" style={innerStyle}>
        {children}
      </div>
    </div>
  );
}
