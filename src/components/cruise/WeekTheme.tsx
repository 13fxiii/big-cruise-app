"use client";

import { WEEK_VARS, weekDay } from "@/lib/cruise/week";
import { useEffect } from "react";

export function WeekTheme() {
  useEffect(() => {
    const day = weekDay();
    const vars = WEEK_VARS[day.id];
    const root = document.documentElement;
    root.dataset.week = day.id;
    root.style.setProperty("--week-accent", vars.accent);
    root.style.setProperty("--week-accent-2", vars.accent2);
    root.style.setProperty("--week-paper", day.paper);
    root.style.setProperty("--week-ink", day.ink);
  }, []);
  return null;
}
