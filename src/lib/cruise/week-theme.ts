import { dayById, type Day, type DayId } from "@/lib/days";

const WEEK_ORDER: DayId[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export function todayDay(now = new Date()): Day {
  return dayById(WEEK_ORDER[now.getDay()] ?? "mon");
}

export type WeekSkin = {
  day: Day;
  accent: string;
  accent2: string;
  photo: string;
  line: string;
  name: string;
};

export function weekSkin(now = new Date()): WeekSkin {
  const day = todayDay(now);
  return {
    day,
    accent: day.accent,
    accent2: day.accent2,
    photo: day.photo,
    line: day.line,
    name: day.subBrand,
  };
}

export function applyWeekSkin(skin: WeekSkin, root: HTMLElement = document.documentElement) {
  root.style.setProperty("--week-accent", skin.accent);
  root.style.setProperty("--week-accent-2", skin.accent2);
  root.style.setProperty("--week-photo", `url("${skin.photo}")`);
  root.dataset.day = skin.day.id;
}
