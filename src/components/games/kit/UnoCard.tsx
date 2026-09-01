"use client";

import { Spark } from "@/components/brand/marks";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type UnoColor = "r" | "y" | "g" | "b";
export type UnoCardData =
  | { id: string; k: "n"; c: UnoColor; n: number }
  | { id: string; k: "skip" | "rev" | "d2"; c: UnoColor }
  | { id: string; k: "wild" | "d4" };

export const UNO_COL: Record<UnoColor, string> = {
  r: "#7A1F33",
  y: "#C9A000",
  g: "#2F6B3A",
  b: "#1B4F8A",
};
const INK: Record<UnoColor, string> = { r: "#F3EFE4", y: "#0B0B0B", g: "#F3EFE4", b: "#F3EFE4" };

export function unoLabel(card: UnoCardData) {
  if (card.k === "n") return String(card.n);
  if (card.k === "skip") return "Ø";
  if (card.k === "rev") return "⇄";
  if (card.k === "d2") return "+2";
  if (card.k === "wild") return "W";
  return "+4";
}

function Oval({ children, ink }: { children: ReactNode; ink: string }) {
  return (
    <div
      className="flex flex-1 items-center justify-center self-stretch rounded-[46%] border border-black/20 bg-[#F3EFE4]"
      style={{ color: ink }}
    >
      {children}
    </div>
  );
}

export function UnoFace({ card, small }: { card: UnoCardData; small?: boolean }) {
  const colored = "c" in card;
  const bg = colored ? UNO_COL[card.c] : "#0B0B0B";
  const ink = colored ? INK[card.c] : "#C9A000";
  const mark = unoLabel(card);

  return (
    <div
      className={cn(
        "card-3d relative flex flex-col overflow-hidden rounded-[12%] border-[3px] border-bone/25 p-[6%]",
        small ? "h-16 w-11" : "h-40 w-[6.6rem] md:h-44 md:w-[7.3rem]",
      )}
      style={{ background: bg, color: ink }}
    >
      <span className={cn("font-display font-extrabold leading-none", small ? "text-[10px]" : "text-lg")}>{mark}</span>
      <Oval ink={colored ? bg : "#0B0B0B"}>
        {card.k === "wild" || card.k === "d4" ? (
          <div className={cn("grid grid-cols-2 overflow-hidden rounded-[46%]", small ? "h-7 w-7" : "h-16 w-16")}>
            <i style={{ background: UNO_COL.r }} />
            <i style={{ background: UNO_COL.y }} />
            <i style={{ background: UNO_COL.g }} />
            <i style={{ background: UNO_COL.b }} />
          </div>
        ) : (
          <span className={cn("font-display font-extrabold leading-none", small ? "text-base" : "text-5xl")}>{mark}</span>
        )}
      </Oval>
      <span className={cn("self-end font-display font-extrabold leading-none rotate-180", small ? "text-[10px]" : "text-lg")}>
        {mark}
      </span>
    </div>
  );
}

export function UnoBack({ small }: { small?: boolean }) {
  return (
    <div
      className={cn(
        "card-3d relative flex items-center justify-center overflow-hidden rounded-[12%] border-[3px] border-[#C9A000] bg-[#050505]",
        small ? "h-16 w-11" : "h-40 w-[6.6rem] md:h-44 md:w-[7.3rem]",
      )}
    >
      <div className="absolute inset-[8%] rounded-[10%] border border-[#C9A000]/50" />
      <div className="flex flex-col items-center gap-1 text-[#C9A000]">
        <Spark className={small ? "size-5" : "size-10"} />
        {small ? null : (
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em]">Cruise</span>
        )}
      </div>
    </div>
  );
}
