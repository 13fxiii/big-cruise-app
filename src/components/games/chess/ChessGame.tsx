"use client";

import { GameShell } from "@/components/games/Shell";
import { SitDown, type SitDownStart } from "@/components/games/SitDown";
import { Button } from "@/components/ui/button";
import { getGame } from "@/lib/games/catalog";
import { sfx } from "@/lib/games/audio";
import { playIf, usePlayer } from "@/lib/games/player";
import { cn } from "@/lib/utils";
import { Chess, type Square } from "chess.js";
import { useEffect, useMemo, useRef, useState } from "react";

const game = getGame("chess")!;
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

const GLYPH: Record<string, string> = {
  wp: "♙",
  wn: "♘",
  wb: "♗",
  wr: "♖",
  wq: "♕",
  wk: "♔",
  bp: "♟",
  bn: "♞",
  bb: "♝",
  br: "♜",
  bq: "♛",
  bk: "♚",
};

function material(fen: string) {
  const board = fen.split(" ")[0];
  const val: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
  let s = 0;
  for (const ch of board) {
    if (val[ch.toLowerCase()] == null) continue;
    s += ch === ch.toLowerCase() ? -val[ch] : val[ch.toLowerCase()];
  }
  return s;
}

function botMove(fen: string): string | null {
  const c = new Chess(fen);
  const moves = c.moves({ verbose: true });
  if (!moves.length) return null;
  let best = moves[0];
  let bestScore = -Infinity;
  for (const m of moves) {
    c.move(m);
    let score = -material(c.fen());
    const replies = c.moves({ verbose: true }).slice(0, 12);
    let worst = Infinity;
    if (!replies.length) worst = c.isCheckmate() ? -200 : 0;
    for (const r of replies) {
      c.move(r);
      worst = Math.min(worst, -material(c.fen()));
      c.undo();
    }
    score += worst * 0.35;
    if (m.captured) score += 0.4;
    c.undo();
    score += Math.random() * 0.15;
    if (score > bestScore) {
      bestScore = score;
      best = m;
    }
  }
  return best.san;
}

export function ChessGame() {
  const human = usePlayer((s) => s.name);
  const muted = usePlayer((s) => s.muted);
  const [sit, setSit] = useState<SitDownStart | null>(null);
  const [fen, setFen] = useState(() => new Chess().fen());
  const [sel, setSel] = useState<Square | null>(null);
  const [last, setLast] = useState<string | null>(null);
  const chess = useMemo(() => new Chess(fen), [fen]);
  const thinking = useRef(false);

  const vsBot = sit?.mode === "bots";
  const humanWhite = true;
  const myTurn = vsBot ? chess.turn() === "w" : true;

  const legal = useMemo(() => {
    if (!sel) return new Set<string>();
    return new Set(chess.moves({ square: sel, verbose: true }).map((m) => m.to));
  }, [chess, sel]);

  const status = chess.isCheckmate()
    ? chess.turn() === "b"
      ? `${human} mates`
      : vsBot
        ? "The bot mates"
        : "Black mates"
    : chess.isDraw()
      ? "Draw"
      : chess.isCheck()
        ? "Check"
        : `${chess.turn() === "w" ? human : vsBot ? "Bot" : "Black"} to move`;

  useEffect(() => {
    if (!vsBot || chess.turn() !== "b" || chess.isGameOver() || thinking.current) return;
    thinking.current = true;
    const t = window.setTimeout(() => {
      const san = botMove(chess.fen());
      if (san) {
        const c = new Chess(chess.fen());
        const mv = c.move(san);
        if (mv) {
          playIf(muted, sfx.tap);
          setLast(mv.to);
          setFen(c.fen());
        }
      }
      thinking.current = false;
    }, 420);
    return () => window.clearTimeout(t);
  }, [vsBot, chess, muted]);

  useEffect(() => {
    if (chess.isCheckmate()) playIf(muted, chess.turn() === "b" ? sfx.win : sfx.lose);
  }, [chess, muted]);

  if (!sit) {
    return (
      <GameShell game={game}>
        <SitDown game={game} defaultSeats={2} minSeats={2} maxSeats={2} onStart={setSit} />
      </GameShell>
    );
  }

  const board = chess.board();

  return (
    <GameShell game={game} status={<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">{status}</p>}>
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 px-4 py-6">
        <p className="font-display text-xl uppercase tracking-[0.12em] text-concrete">
          {vsBot ? "Bot · black" : "Black"}
        </p>
        <div className="grid w-full max-w-[min(100%,560px)] grid-cols-8 overflow-hidden border border-lane shadow-[0_20px_60px_rgb(0_0_0/0.5)]">
          {board.map((row, r) =>
            row.map((piece, f) => {
              const square = `${FILES[f]}${8 - r}` as Square;
              const dark = (r + f) % 2 === 1;
              const selected = sel === square;
              const target = legal.has(square);
              const was = last === square;
              return (
                <button
                  key={square}
                  type="button"
                  onClick={() => {
                    if (!myTurn || chess.isGameOver()) return;
                    if (sel && legal.has(square)) {
                      const c = new Chess(fen);
                      const mv = c.move({ from: sel, to: square, promotion: "q" });
                      if (mv) {
                        playIf(muted, mv.captured ? sfx.capture : sfx.tap);
                        setFen(c.fen());
                        setLast(square);
                        setSel(null);
                      }
                      return;
                    }
                    const p = chess.get(square);
                    if (p && ((humanWhite && p.color === "w") || (!vsBot && p.color === chess.turn()))) {
                      setSel(square);
                    } else setSel(null);
                  }}
                  className={cn(
                    "relative aspect-square text-[clamp(1.4rem,6vw,2.4rem)] leading-none",
                    dark ? "bg-dom" : "bg-bone",
                    selected && "ring-2 ring-inset ring-danfo",
                    was && "bg-danfo/40",
                  )}
                >
                  {piece ? (
                    <span className={piece.color === "w" ? "text-midnight" : "text-[#1a0a0c]"}>
                      {GLYPH[`${piece.color}${piece.type}`]}
                    </span>
                  ) : null}
                  {target ? (
                    <span className="absolute inset-0 m-auto size-3 rounded-full bg-danfo/80" />
                  ) : null}
                </button>
              );
            }),
          )}
        </div>
        <p className="font-display text-xl uppercase tracking-[0.12em] text-danfo">{human} · white</p>
        {chess.isGameOver() ? (
          <Button onClick={() => { setFen(new Chess().fen()); setSel(null); setLast(null); }}>New game</Button>
        ) : null}
      </div>
    </GameShell>
  );
}
