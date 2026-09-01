"use client";

import { GameShell } from "@/components/games/Shell";
import { SitDown, type SitDownStart } from "@/components/games/SitDown";
import { Button } from "@/components/ui/button";
import { fisherYates, getGame } from "@/lib/games/catalog";
import { sfx } from "@/lib/games/audio";
import { playIf, usePlayer } from "@/lib/games/player";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const game = getGame("codenames")!;

const WORDS = [
  "JOLLOF", "DANFO", "LAGOS", "WIZKID", "BURNA", "ASHA", "GELE", "SUYA", "OKADA", "NAIJA",
  "CRUISE", "SPACES", "TIMELINE", "BANTER", "GIST", "FAM", "MOTION", "FAITH", "YARD", "NIGHT",
  "PALM", "RIVER", "GOLD", "CROWN", "DRUM", "MASK", "FIRE", "MOON", "WAVE", "STONE",
  "PILOT", "SERVER", "ORANGE", "PYTHON", "NET", "HOOK", "SPIKE", "GLASS", "PAPER", "TRAIN",
  "MARKET", "BRIDGE", "ANGEL", "DEVIL", "KING", "QUEEN", "NURSE", "DOCTOR", "LAWYER", "TEACHER",
  "SHIP", "PLANE", "BOOT", "SHOE", "HAT", "RING", "SWORD", "SHIELD", "BOOK", "SONG",
  "DANCE", "PARTY", "CLUB", "BEACH", "DESERT", "FOREST", "MOUNTAIN", "CITY", "VILLAGE", "COMPOUND",
  "PEPPER", "RICE", "BEANS", "EGUSI", "POUNDO", "AMALA", "EBA", "FISH", "GOAT", "CHICKEN",
];

type Kind = "a" | "b" | "n" | "x";
type Tile = { word: string; kind: Kind; up: boolean };

function deal(): { tiles: Tile[]; start: "a" | "b" } {
  const words = fisherYates(WORDS).slice(0, 25);
  const start: "a" | "b" = Math.random() < 0.5 ? "a" : "b";
  const kinds: Kind[] = [
    ...Array(start === "a" ? 9 : 8).fill("a"),
    ...Array(start === "b" ? 9 : 8).fill("b"),
    ...Array(7).fill("n"),
    "x",
  ];
  const mixed = fisherYates(kinds);
  return {
    start,
    tiles: words.map((word, i) => ({ word, kind: mixed[i], up: false })),
  };
}

export function Codenames() {
  const muted = usePlayer((s) => s.muted);
  const [sit, setSit] = useState<SitDownStart | null>(null);
  const [{ tiles, start }, setBoard] = useState(deal);
  const [turn, setTurn] = useState<"a" | "b">(start);
  const [key, setKey] = useState(false);
  const [clue, setClue] = useState("");
  const [left, setLeft] = useState(1);
  const [over, setOver] = useState<string | null>(null);

  const remain = useMemo(
    () => ({
      a: tiles.filter((t) => t.kind === "a" && !t.up).length,
      b: tiles.filter((t) => t.kind === "b" && !t.up).length,
    }),
    [tiles],
  );

  if (!sit) {
    return (
      <GameShell game={game}>
        <SitDown game={game} defaultSeats={4} minSeats={2} maxSeats={12} onStart={setSit} />
      </GameShell>
    );
  }

  const flip = (i: number) => {
    if (over || tiles[i].up || left <= 0) return;
    const next = tiles.map((t, k) => (k === i ? { ...t, up: true } : t));
    const hit = next[i];
    playIf(muted, hit.kind === turn ? sfx.correct : hit.kind === "x" ? sfx.lose : sfx.wrong);
    setTilesSafe(next);
    if (hit.kind === "x") {
      setOver(turn === "a" ? "Burgundy walks into the assassin. Blue takes it." : "Blue walks into the assassin. Burgundy takes it.");
      return;
    }
    if (next.filter((t) => t.kind === "a" && !t.up).length === 0) {
      setOver("Burgundy reads the room.");
      playIf(muted, sfx.win);
      return;
    }
    if (next.filter((t) => t.kind === "b" && !t.up).length === 0) {
      setOver("Blue reads the room.");
      playIf(muted, sfx.win);
      return;
    }
    if (hit.kind !== turn) {
      setLeft(0);
      setTurn(turn === "a" ? "b" : "a");
    } else {
      const n = left - 1;
      setLeft(n);
      if (n <= 0) setTurn(turn === "a" ? "b" : "a");
    }
  };

  const setTilesSafe = (next: Tile[]) => setBoard((b) => ({ ...b, tiles: next }));

  const fill = (k: Kind) =>
    k === "a" ? "bg-dom text-bone" : k === "b" ? "bg-[#1B4F8A] text-bone" : k === "x" ? "bg-midnight text-danfo" : "bg-echo text-midnight";

  return (
    <GameShell
      game={game}
      status={
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
          {over ?? `${turn === "a" ? "Burgundy" : "Blue"} · ${remain.a}–${remain.b}`}
        </p>
      }
    >
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-5 px-4 py-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-2xl font-bold uppercase text-dom">Burgundy {remain.a}</span>
          <span className="text-concrete">/</span>
          <span className="font-display text-2xl font-bold uppercase text-[#7aa2d6]">Blue {remain.b}</span>
          <label className="ml-auto flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-concrete">
            <input type="checkbox" checked={key} onChange={(e) => setKey(e.target.checked)} />
            Spymaster key
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            value={clue}
            onChange={(e) => setClue(e.target.value.toUpperCase())}
            placeholder="CLUE"
            className="h-11 flex-1 border border-lane bg-asphalt px-3 font-display text-xl font-bold uppercase tracking-[0.12em] outline-none focus:border-danfo"
          />
          <input
            type="number"
            min={1}
            max={9}
            value={Math.max(1, left)}
            onChange={(e) => setLeft(Number(e.target.value) || 1)}
            className="h-11 w-16 border border-lane bg-asphalt px-2 font-display text-xl font-bold outline-none focus:border-danfo"
          />
          <Button
            variant="line"
            onClick={() => {
              setTurn(turn === "a" ? "b" : "a");
              setLeft(1);
              setClue("");
            }}
          >
            Pass
          </Button>
        </div>

        <div className="grid grid-cols-5 gap-1.5 md:gap-2">
          {tiles.map((t, i) => (
            <button
              key={t.word}
              type="button"
              onClick={() => flip(i)}
              className={cn(
                "flex min-h-16 items-center justify-center border px-1 font-display text-[11px] font-bold uppercase tracking-wide md:min-h-24 md:text-lg",
                t.up || key ? fill(t.kind) : "border-lane bg-asphalt text-bone hover:border-danfo",
                t.up && "border-transparent",
                !t.up && key && "border-2",
              )}
            >
              {t.word}
            </button>
          ))}
        </div>

        {over ? (
          <div className="text-center">
            <p className="font-display text-3xl font-bold uppercase">{over}</p>
            <Button
              className="mt-3"
              onClick={() => {
                const b = deal();
                setBoard(b);
                setTurn(b.start);
                setOver(null);
                setLeft(1);
                setClue("");
              }}
            >
              New grid
            </Button>
          </div>
        ) : null}
      </div>
    </GameShell>
  );
}
