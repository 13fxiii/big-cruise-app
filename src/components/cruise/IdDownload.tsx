"use client";

import {
  CARD_PILLARS,
  FOUNDER_CARD,
  cardAchievements,
  cardId,
  cardStats,
  formatHandle,
  isFounder,
  memberRank,
} from "@/lib/cruise/id-card";
import { saveCardImages } from "@/lib/cruise/export-card";
import { memberHref } from "@/lib/cruise/share-card";
import { playerLevel, usePlayer } from "@/lib/games/player";
import { useState } from "react";

export function IdDownload() {
  const name = usePlayer((s) => s.name);
  const handle = usePlayer((s) => s.handle);
  const line = usePlayer((s) => s.line);
  const photo = usePlayer((s) => s.photo);
  const cruiseId = usePlayer((s) => s.cruiseId);
  const points = usePlayer((s) => s.points);
  const badges = usePlayer((s) => s.badges);
  const stats = usePlayer((s) => s.stats);
  const joinedAt = usePlayer((s) => s.joinedAt);
  const [saving, setSaving] = useState<"front" | "back" | "both" | null>(null);

  const founder = isFounder(name, handle);
  const officialId = cardId(cruiseId, name, handle);
  const displayName = founder ? FOUNDER_CARD.name : name;
  const displayHandle = founder ? FOUNDER_CARD.handle : formatHandle(handle);
  const displayLine = (line && line.trim()) || (founder ? FOUNDER_CARD.line : "You are in the room.");
  const sits = Object.values(stats).reduce((n, s) => n + (s?.played || 0), 0);
  const wins = Object.values(stats).reduce((n, s) => n + (s?.won || 0), 0);
  const rank = memberRank({ founder, badges, points, sits });

  async function save(side: "front" | "back" | "both") {
    setSaving(side);
    try {
      await saveCardImages(
        {
          name: displayName,
          handle: displayHandle,
          line: displayLine,
          rank,
          code: officialId,
          href: memberHref({
            code: officialId,
            name: displayName,
            handle: displayHandle,
            rank,
            points,
            level: playerLevel(points),
            sits,
            wins,
          }),
          photo,
          figures: cardStats({ founder, points, joinedAt, stats, badges }),
          achievements: cardAchievements({ founder, badges }),
          pillars: CARD_PILLARS,
        },
        side,
      );
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      <Btn label={saving === "front" ? "\u2026" : "Front"} onClick={() => void save("front")} />
      <Btn label={saving === "back" ? "\u2026" : "Back"} onClick={() => void save("back")} />
      <Btn label={saving === "both" ? "\u2026" : "Both"} onClick={() => void save("both")} />
    </div>
  );
}

function Btn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 border border-lane font-display text-sm font-bold uppercase tracking-[0.14em] text-bone hover:border-danfo hover:text-danfo"
    >
      {label}
    </button>
  );
}
