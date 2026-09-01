"use client";

import { publishMember } from "@/lib/cruise/members";
import { memberRank } from "@/lib/cruise/id-card";
import { playerLevel, usePlayer } from "@/lib/games/player";
import { useEffect } from "react";

export function MemberBeacon() {
  const name = usePlayer((s) => s.name);
  const handle = usePlayer((s) => s.handle);
  const cruiseId = usePlayer((s) => s.cruiseId);
  const points = usePlayer((s) => s.points);
  const badges = usePlayer((s) => s.badges);
  const stats = usePlayer((s) => s.stats);

  useEffect(() => {
    if (!cruiseId || cruiseId.includes("·")) return;
    const sits = Object.values(stats).reduce((n, s) => n + (s?.played || 0), 0);
    const wins = Object.values(stats).reduce((n, s) => n + (s?.won || 0), 0);
    void publishMember({
      data: {
        code: cruiseId,
        name,
        handle: handle || "",
        rank: memberRank({ founder: false, badges, points, sits }),
        points,
        level: playerLevel(points),
        sits,
        wins,
      },
    }).catch(() => undefined);
  }, [cruiseId, name, handle, points, badges, stats]);

  return null;
}
