"use client";

import { Spark } from "@/components/brand/marks";
import { CruiseButton } from "@/components/cruise/CruiseUI";
import { type GameMeta, type GameMode, roomCode } from "@/lib/games/catalog";
import { sfx } from "@/lib/games/audio";
import { playIf, usePlayer } from "@/lib/games/player";
import { AccentBar, ModeChip } from "./Shell";
import { useState } from "react";

export type SitDownStart = {
  mode: GameMode;
  room: string;
  seats: number;
  joining: boolean;
};

function seatRange(label: string, fallbackMin: number, fallbackMax: number) {
  const match = label.match(/(\d+)\s*[\u2013-]\s*(\d+)/);
  if (!match) return { min: fallbackMin, max: fallbackMax };
  return { min: Number(match[1]), max: Number(match[2]) };
}

export function SitDown({
  game,
  defaultSeats,
  minSeats = 1,
  maxSeats = 4,
  onStart,
}: {
  game: GameMeta;
  defaultSeats: number;
  minSeats?: number;
  maxSeats?: number;
  onStart: (opts: SitDownStart) => void;
}) {
  const { min, max } = seatRange(game.players, minSeats, maxSeats);
  const name = usePlayer((s) => s.name);
  const setName = usePlayer((s) => s.setName);
  const muted = usePlayer((s) => s.muted);
  const recordPlay = usePlayer((s) => s.recordPlay);
  const cruiseId = usePlayer((s) => s.cruiseId);
  const [mode, setMode] = useState<GameMode>(() =>
    game.modes.includes("online") ? "online" : game.modes[0],
  );
  const [seats, setSeats] = useState(() => Math.min(max, Math.max(min, defaultSeats)));
  const [join, setJoin] = useState("");
  const [hostCode] = useState(() => roomCode());

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-5 px-4 py-5 sm:gap-8 sm:px-5 sm:py-10">
      <div>
        <AccentBar color={game.accent} />
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-concrete">
          {game.players}
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-[0.9] tracking-tight">
          {game.name}
        </h1>
      </div>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 min-h-12 w-full border border-lane bg-asphalt px-4 font-display text-2xl font-bold uppercase tracking-[0.08em] text-bone outline-none focus:border-danfo"
          maxLength={18}
        />
        <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">{cruiseId}</span>
      </label>

      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Mode</p>
        <div className="flex flex-wrap gap-2">
          {game.modes.includes("online") ? (
            <ModeChip active={mode === "online"} onClick={() => setMode("online")}>
              Online
            </ModeChip>
          ) : null}
          {game.modes.includes("bots") ? (
            <ModeChip active={mode === "bots"} onClick={() => setMode("bots")}>
              Bots
            </ModeChip>
          ) : null}
          {game.modes.includes("pass") ? (
            <ModeChip active={mode === "pass"} onClick={() => setMode("pass")}>
              Pass phone
            </ModeChip>
          ) : null}
        </div>
      </div>

      {mode !== "online" && max > min ? (
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">
            Seats · {seats}
          </p>
          {max - min > 8 ? (
            <input
              type="range"
              min={min}
              max={max}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full accent-danfo"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => (
                <ModeChip key={n} active={seats === n} onClick={() => setSeats(n)}>
                  {n}
                </ModeChip>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {mode === "online" ? (
        <div className="space-y-4 border border-lane bg-asphalt p-5">
          <div className="flex items-center gap-3">
            <Spark className="size-8 text-danfo" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Code</p>
              <p className="font-display text-4xl font-bold tracking-[0.2em] text-danfo">{hostCode}</p>
            </div>
          </div>
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Join</span>
            <input
              value={join}
              onChange={(e) => setJoin(e.target.value.toUpperCase().slice(0, 4))}
              placeholder="CODE"
              className="mt-2 min-h-12 w-full border border-lane bg-midnight px-4 font-display text-2xl font-bold tracking-[0.28em] text-danfo outline-none focus:border-danfo"
            />
          </label>
        </div>
      ) : null}

      <CruiseButton
        onClick={() => {
          playIf(muted, sfx.play);
          const joining = mode === "online" && join.length === 4;
          recordPlay(game.slug, mode === "online" && !joining);
          onStart({
            mode,
            room: joining ? join : hostCode,
            seats,
            joining,
          });
        }}
      >
        Sit down
      </CruiseButton>
    </div>
  );
}

export function WaitRoom({ code }: { code: string }) {
  return (
    <p className="px-6 py-20 text-center font-display text-4xl font-bold tracking-[0.24em] text-danfo">{code}</p>
  );
}
