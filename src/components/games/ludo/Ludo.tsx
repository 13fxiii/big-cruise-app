"use client";

import { GameShell } from "@/components/games/Shell";
import { SitDown, type SitDownStart } from "@/components/games/SitDown";
import { Button } from "@/components/ui/button";
import { BOT_NAMES, fisherYates, getGame } from "@/lib/games/catalog";
import { sfx } from "@/lib/games/audio";
import { playIf, usePlayer } from "@/lib/games/player";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

const game = getGame("ludo")!;

const TRACK: [number, number][] = [
  [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
  [6, 5], [6, 4], [6, 3], [6, 2], [6, 1], [6, 0],
  [7, 0],
  [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
  [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6],
  [14, 7],
  [14, 8], [13, 8], [12, 8], [11, 8], [10, 8], [9, 8],
  [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [8, 14],
  [7, 14],
  [6, 14], [6, 13], [6, 12], [6, 11], [6, 10], [6, 9],
  [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
  [0, 7],
  [0, 6],
];

const HOME: [number, number][][] = [
  [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]],
  [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]],
  [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7]],
  [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9], [7, 8]],
];

const YARD: [number, number][][] = [
  [[2, 2], [3, 2], [2, 3], [3, 3]],
  [[11, 2], [12, 2], [11, 3], [12, 3]],
  [[11, 11], [12, 11], [11, 12], [12, 12]],
  [[2, 11], [3, 11], [2, 12], [3, 12]],
];

const START = [0, 13, 26, 39];
const SAFE = new Set([0, 8, 13, 21, 26, 34, 39, 47]);
const COLORS = ["#2F6B3A", "#F5C400", "#1B4F8A", "#9B1228"];

type Token = { progress: number }; // -1 yard, 0-50 track, 51-56 home, 57 done
type Player = { name: string; bot: boolean; tokens: Token[] };

type State = {
  players: Player[];
  turn: number;
  dice: number | null;
  extra: boolean;
  hops: boolean;
  winner: number | null;
};

function make(seats: number, human: string): State {
  const names = [human, ...fisherYates(BOT_NAMES)].slice(0, seats);
  // Map seats onto 4 corners: 2p = opposite, 3p = skip one, 4p all
  const slots = seats === 2 ? [0, 2] : seats === 3 ? [0, 1, 2] : [0, 1, 2, 3];
  const all: Player[] = [0, 1, 2, 3].map((i) => {
    const idx = slots.indexOf(i);
    if (idx < 0) return { name: "", bot: true, tokens: [] };
    return { name: names[idx], bot: idx !== 0, tokens: Array.from({ length: 4 }, () => ({ progress: -1 })) };
  });
  return { players: all, turn: slots[0], dice: null, extra: false, hops: false, winner: null };
}

function posOf(player: number, progress: number): [number, number] | null {
  if (progress < 0) return null;
  if (progress >= 57) return [7, 7];
  if (progress >= 51) return HOME[player][progress - 51];
  const track = (START[player] + progress) % 52;
  return TRACK[track];
}

function legalMoves(s: State): number[] {
  const p = s.players[s.turn];
  const d = s.dice;
  if (d == null || !p.tokens.length) return [];
  const out: number[] = [];
  p.tokens.forEach((t, i) => {
    if (t.progress < 0) {
      if (d === 6) out.push(i);
      return;
    }
    if (t.progress >= 57) return;
    const next = t.progress + d;
    if (next > 57) return;
    out.push(i);
  });
  return out;
}

function applyMove(s: State, tokenIndex: number): State {
  const next: State = {
    ...s,
    players: s.players.map((p) => ({ ...p, tokens: p.tokens.map((t) => ({ ...t })) })),
  };
  const p = next.players[next.turn];
  const t = p.tokens[tokenIndex];
  const d = next.dice!;
  if (t.progress < 0) t.progress = 0;
  else t.progress += d;
  if (t.progress === 57 && p.tokens.every((x) => x.progress >= 57)) {
    next.winner = next.turn;
    return next;
  }
  if (t.progress <= 50) {
    const cell = (START[next.turn] + t.progress) % 52;
    if (!SAFE.has(cell)) {
      next.players.forEach((op, oi) => {
        if (oi === next.turn || !op.tokens.length) return;
        op.tokens.forEach((ot) => {
          if (ot.progress < 0 || ot.progress > 50) return;
          const oc = (START[oi] + ot.progress) % 52;
          if (oc === cell) ot.progress = -1;
        });
      });
    }
  }
  next.hops = true;
  next.extra = d === 6;
  next.dice = null;
  if (!next.extra && next.winner == null) {
    let t2 = (next.turn + 1) % 4;
    for (let k = 0; k < 4 && !next.players[t2].tokens.length; k++) t2 = (t2 + 1) % 4;
    next.turn = t2;
  }
  return next;
}

export function Ludo() {
  const human = usePlayer((s) => s.name);
  const muted = usePlayer((s) => s.muted);
  const [sit, setSit] = useState<SitDownStart | null>(null);
  const [state, setState] = useState<State | null>(null);
  const [rolling, setRolling] = useState(false);
  const busy = useRef(false);

  const start = (opts: SitDownStart) => {
    setSit(opts);
    setState(make(opts.seats, human));
  };

  const roll = useCallback(() => {
    if (!state || rolling || state.dice != null || state.winner != null) return;
    setRolling(true);
    playIf(muted, sfx.dice);
    window.setTimeout(() => {
      const n = 1 + Math.floor(Math.random() * 6);
      setState({ ...state, dice: n, hops: false });
      setRolling(false);
    }, 650);
  }, [state, rolling, muted]);

  const moves = state ? legalMoves(state) : [];

  useEffect(() => {
    if (!state || state.winner != null) return;
    const p = state.players[state.turn];
    if (!p.bot || !p.tokens.length) return;
    if (state.dice == null && !rolling && !busy.current) {
      busy.current = true;
      const t = window.setTimeout(() => {
        busy.current = false;
        roll();
      }, 500);
      return () => {
        window.clearTimeout(t);
        busy.current = false;
      };
    }
    if (state.dice != null && !rolling) {
      const t = window.setTimeout(() => {
        if (!moves.length) {
          let t2 = (state.turn + 1) % 4;
          for (let k = 0; k < 4 && !state.players[t2].tokens.length; k++) t2 = (t2 + 1) % 4;
          setState({ ...state, dice: null, extra: false, turn: state.dice === 6 ? state.turn : t2 });
          return;
        }
        // Prefer capture, then leave yard, then furthest
        let pick = moves[0];
        let best = -1;
        for (const i of moves) {
          const prog = state.players[state.turn].tokens[i].progress;
          const nextP = prog < 0 ? 0 : prog + state.dice!;
          let score = nextP;
          if (prog < 0) score += 20;
          if (nextP <= 50) {
            const cell = (START[state.turn] + nextP) % 52;
            state.players.forEach((op, oi) => {
              if (oi === state.turn) return;
              if (op.tokens.some((ot) => ot.progress >= 0 && ot.progress <= 50 && (START[oi] + ot.progress) % 52 === cell))
                score += 40;
            });
          }
          if (score > best) {
            best = score;
            pick = i;
          }
        }
        playIf(muted, sfx.hop);
        setState(applyMove(state, pick));
      }, 500);
      return () => window.clearTimeout(t);
    }
  }, [state, rolling, moves, roll, muted]);

  useEffect(() => {
    if (state?.winner != null) {
      const humanIdx = state.players.findIndex((p) => !p.bot && p.tokens.length);
      playIf(muted, state.winner === humanIdx ? sfx.win : sfx.lose);
    }
  }, [state?.winner, muted, state]);

  if (!sit || !state) {
    return (
      <GameShell game={game}>
        <SitDown game={game} defaultSeats={4} minSeats={2} maxSeats={4} onStart={start} />
      </GameShell>
    );
  }

  const humanTurn = state.players[state.turn] && !state.players[state.turn].bot;

  return (
    <GameShell
      game={game}
      status={
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
          {state.winner != null
            ? `${state.players[state.winner].name} home`
            : `${state.players[state.turn].name}${state.dice ? ` · ${state.dice}` : ""}`}
        </p>
      }
    >
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center gap-5 px-3 py-5">
        <div className="grid w-full grid-cols-4 gap-2">
          {state.players.map((p, i) =>
            p.tokens.length ? (
              <div
                key={i}
                className={cn("border px-2 py-2", i === state.turn ? "border-danfo" : "border-lane")}
                style={{ borderTopColor: COLORS[i], borderTopWidth: 3 }}
              >
                <p className="truncate font-display text-sm font-bold uppercase">{p.name}</p>
                <p className="font-mono text-[10px] text-concrete">
                  {p.tokens.filter((t) => t.progress >= 57).length}/4 home
                </p>
              </div>
            ) : (
              <div key={i} />
            ),
          )}
        </div>

        <svg viewBox="0 0 15 15" className="w-full max-w-[520px] drop-shadow-[0_20px_40px_rgb(0_0_0/0.5)]">
          <rect width="15" height="15" fill="#0B0B0B" />
          <rect x="0" y="0" width="6" height="6" fill="#1a2e1c" />
          <rect x="9" y="0" width="6" height="6" fill="#3a2e00" />
          <rect x="9" y="9" width="6" height="6" fill="#1a2a44" />
          <rect x="0" y="9" width="6" height="6" fill="#3a0c14" />
          {TRACK.map(([x, y], i) => (
            <rect
              key={i}
              x={x + 0.08}
              y={y + 0.08}
              width={0.84}
              height={0.84}
              fill={SAFE.has(i) ? "#F5C400" : "#F3EFE4"}
              opacity={SAFE.has(i) ? 1 : 0.92}
            />
          ))}
          {HOME.map((col, pi) =>
            col.map(([x, y], i) => (
              <rect key={`${pi}-${i}`} x={x + 0.08} y={y + 0.08} width={0.84} height={0.84} fill={COLORS[pi]} />
            )),
          )}
          <polygon points="6,6 9,6 7.5,7.5" fill={COLORS[1]} />
          <polygon points="9,6 9,9 7.5,7.5" fill={COLORS[2]} />
          <polygon points="6,9 9,9 7.5,7.5" fill={COLORS[3]} />
          <polygon points="6,6 6,9 7.5,7.5" fill={COLORS[0]} />
          {state.players.map((p, pi) =>
            p.tokens.map((t, ti) => {
              const pos = t.progress < 0 ? YARD[pi][ti] : posOf(pi, t.progress);
              if (!pos) return null;
              const movable = humanTurn && state.dice != null && moves.includes(ti) && state.turn === pi;
              return (
                <circle
                  key={`${pi}-${ti}`}
                  cx={pos[0] + 0.5 + (ti % 2) * 0.08}
                  cy={pos[1] + 0.5}
                  r={0.32}
                  fill={COLORS[pi]}
                  stroke="#0B0B0B"
                  strokeWidth={0.06}
                  className={cn(state.hops && state.turn === pi ? "hop" : "", movable ? "cursor-pointer" : "")}
                  onClick={() => {
                    if (!movable) return;
                    playIf(muted, sfx.hop);
                    setState(applyMove(state, ti));
                  }}
                />
              );
            }),
          )}
        </svg>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={roll}
            disabled={!humanTurn || state.dice != null || rolling || state.winner != null}
            className={cn(
              "flex size-16 items-center justify-center border-2 border-danfo bg-midnight font-display text-4xl font-bold text-danfo disabled:opacity-40",
              rolling && "toss",
            )}
          >
            {rolling ? "?" : (state.dice ?? "•")}
          </button>
          {humanTurn && state.dice != null && !moves.length ? (
            <Button
              variant="line"
              onClick={() => {
                let t2 = (state.turn + 1) % 4;
                for (let k = 0; k < 4 && !state.players[t2].tokens.length; k++) t2 = (t2 + 1) % 4;
                setState({ ...state, dice: null, turn: state.dice === 6 ? state.turn : t2 });
              }}
            >
              Pass
            </Button>
          ) : null}
        </div>

        {state.winner != null ? (
          <div className="text-center">
            <p className="font-display text-4xl font-bold uppercase">{state.players[state.winner].name} is home</p>
            <Button className="mt-3" onClick={() => setState(make(sit.seats, human))}>
              Again
            </Button>
          </div>
        ) : null}
      </div>
    </GameShell>
  );
}
