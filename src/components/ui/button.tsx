"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost" | "line";
};

export function Button({ className, variant = "solid", type = "button", ...props }: Props) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 px-5 font-display text-lg font-bold uppercase tracking-[0.14em] transition-[transform,background-color,color,border-color] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-50",
        variant === "solid" && "bg-danfo text-midnight hover:bg-bone",
        variant === "ghost" && "bg-transparent text-bone hover:text-danfo",
        variant === "line" && "border border-lane text-bone hover:border-danfo hover:text-danfo",
        className,
      )}
      {...props}
    />
  );
}
