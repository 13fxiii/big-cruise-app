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
  const name = usePlayer((s) => s.name);
  const setName = usePlayer((s) => s.setName);
  const muted = usePlayer((s) => s.muted);
  const recordPlay = usePlayer((s) => s.recordPlay);
  const [mode, setMode] = useState<GameMode>(game.modes[0]);
  const [seats, setSeats] = useState(defaultSeats);
  const [join, setJoin] = useState("");
  const [hostCode] = useState(() => roomCode());

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-8 px-5 py-10">
      <div>
        <AccentBar color={game.accent} />
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-concrete">
          Sit down · {game.players}
        </p>
        <h1 className="mt-2 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight md:text-6xl">
          {game.name}
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-bone/80">{game.blurb}</p>
        <p className="mt-2 font-display text-lg uppercase tracking-[0.12em] text-danfo">{game.line}</p>
      </div>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Your name in the room</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 h-12 w-full border border-lane bg-asphalt px-4 font-display text-2xl font-bold uppercase tracking-[0.08em] text-bone outline-none focus:border-danfo"
          maxLength={18}
        />
      </label>

      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">How we play</p>
        <div className="flex flex-wrap gap-2">
          {game.modes.includes("bots") ? (
            <ModeChip active={mode === "bots"} onClick={() => setMode("bots")}>
              Vs bots
            </ModeChip>
          ) : null}
          {game.modes.includes("pass") ? (
            <ModeChip active={mode === "pass"} onClick={() => setMode("pass")}>
              Pass the phone
            </ModeChip>
          ) : null}
          {game.modes.includes("online") ? (
            <ModeChip active={mode === "online"} onClick={() => setMode("online")}>
              Cruise room
            </ModeChip>
          ) : null}
        </div>
      </div>

      {mode !== "online" && maxSeats > minSeats ? (
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Seats</p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: maxSeats - minSeats + 1 }, (_, i) => minSeats + i).map((n) => (
              <ModeChip key={n} active={seats === n} onClick={() => setSeats(n)}>
                {n}
              </ModeChip>
            ))}
          </div>
        </div>
      ) : null}

      {mode === "online" ? (
        <div className="space-y-4 border border-lane bg-asphalt p-5">
          <div className="flex items-center gap-3">
            <Spark className="size-8 text-danfo" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Host code</p>
              <p className="font-display text-4xl font-bold tracking-[0.2em] text-danfo">{hostCode}</p>
            </div>
          </div>
          <p className="text-sm text-concrete">Share that code. Fam join from the same game page.</p>
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">Or join a room</span>
            <input
              value={join}
              onChange={(e) => setJoin(e.target.value.toUpperCase().slice(0, 4))}
              placeholder="CODE"
              className="mt-2 h-12 w-full border border-lane bg-midnight px-4 font-display text-2xl font-bold tracking-[0.28em] text-danfo outline-none focus:border-danfo"
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
        Enter the cruise
      </CruiseButton>
    </div>
  );
}
