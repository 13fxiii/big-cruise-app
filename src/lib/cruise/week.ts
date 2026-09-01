import { days, type Day, type DayId } from "@/lib/days";

const ORDER: DayId[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export function weekDayId(at = new Date()): DayId {
  const lagos = new Date(at.toLocaleString("en-US", { timeZone: "Africa/Lagos" }));
  return ORDER[lagos.getDay()] ?? "tue";
}

export function weekDay(at = new Date()): Day {
  const id = weekDayId(at);
  return days.find((d) => d.id === id) ?? days[1];
}

export const WEEK_VARS: Record<DayId, { accent: string; accent2: string }> = {
  mon: { accent: "#7A1F33", accent2: "#C48A5A" },
  tue: { accent: "#FF2B6B", accent2: "#FFF200" },
  wed: { accent: "#C45A72", accent2: "#E6C8B4" },
  thu: { accent: "#C4A574", accent2: "#F2E6D0" },
  fri: { accent: "#6A2C91", accent2: "#3DFFF2" },
  sat: { accent: "#9B1228", accent2: "#9A7B12" },
  sun: { accent: "#C8F542", accent2: "#FF4D1A" },
};

export const WEEK_TUNE: Record<DayId, number> = {
  mon: 0.88,
  tue: 1.12,
  wed: 1.02,
  thu: 0.94,
  fri: 1.18,
  sat: 0.9,
  sun: 1.22,
};
