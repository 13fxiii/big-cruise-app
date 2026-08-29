"use client";

import { GameShell } from "@/components/games/Shell";
import { SitDown, type SitDownStart } from "@/components/games/SitDown";
import { Button } from "@/components/ui/button";
import { fisherYates, getGame } from "@/lib/games/catalog";
import { sfx } from "@/lib/games/audio";
import { playIf, usePlayer } from "@/lib/games/player";
import { useP2PRoom } from "@/lib/multiplayer";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

const game = getGame("draw")!;

const PROMPTS = [
  "danfo", "jollof", "suya", "okada", "gele", "afrobeat concert", "group chat",
  "spaces mic", "lagos rain", "pepper soup", "generator", "palm wine", "birthday shoutout",
  "the 〽️", "night market", "barber fade", "ankara", "football watch party", "owambe",
  "third mainland", "ashewo pepper", "small chops", "agbada", "street photographer",
];

const PALETTE = ["#F5C400", "#F3EFE4", "#9B1228", "#C45A72", "#6A2C91", "#C8F542", "#1B4F8A", "#0B0B0B"];

type Stroke = { color: string; size: number; points: { x: number; y: number }[] };

function OnlineDraw({ room, name, joining }: { room: string; name: string; joining: boolean }) {
  const p2p = useP2PRoom({ room: `bchdraw${room}`.slice(0, 64), name });
  return (
    <LocalDraw
      online
      isHost={!joining}
      peers={p2p.peers.map((p) => p.name)}
      joined={p2p.joined}
      broadcast={p2p.broadcast}
      send={p2p.send}
      onMessage={p2p.onMessage}
    />
  );
}

function LocalDraw({
  online,
  isHost = true,
  peers = [],
  joined,
  broadcast,
  send,
  onMessage,
}: {
  online?: boolean;
  isHost?: boolean;
  peers?: string[];
  joined?: boolean;
  broadcast?: (d: unknown) => void;
  send?: (d: unknown, id?: string) => void;
  onMessage?: (fn: (from: string, data: unknown, ch: "state" | "reliable") => void) => () => void;
}) {
  const muted = usePlayer((s) => s.muted);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const current = useRef<Stroke | null>(null);
  const [color, setColor] = useState(PALETTE[0]);
  const [size, setSize] = useState(6);
  const [word, setWord] = useState(() => fisherYates(PROMPTS)[0]);
  const [guess, setGuess] = useState("");
  const [hidden, setHidden] = useState(true);
  const [hits, setHits] = useState<string[]>([]);
  const drawing = isHost || !online;

  const paint = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#161616";
    ctx.fillRect(0, 0, c.width, c.height);
    for (const s of strokes.current) {
      if (s.points.length < 1) continue;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (const p of s.points) ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const resize = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.floor(r.width * dpr);
      c.height = Math.floor(r.height * dpr);
      c.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [paint]);

  useEffect(() => {
    if (!onMessage) return;
    return onMessage((_from, data) => {
      const msg = data as { t: string; strokes?: Stroke[]; word?: string; guess?: string; name?: string };
      if (msg.t === "strokes" && msg.strokes) {
        strokes.current = msg.strokes;
        paint();
      }
      if (msg.t === "word" && msg.word) setWord(msg.word);
      if (msg.t === "hit" && msg.name) setHits((h) => [...h, msg.name!]);
    });
  }, [onMessage, paint]);

  const pt = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const down = (e: React.PointerEvent) => {
    if (!drawing) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    current.current = { color, size, points: [pt(e)] };
    playIf(muted, sfx.draw);
  };
  const move = (e: React.PointerEvent) => {
    if (!current.current) return;
    current.current.points.push(pt(e));
    strokes.current = [...strokes.current.filter((s) => s !== current.current), current.current];
    paint();
    broadcast?.({ t: "strokes", strokes: strokes.current });
  };
  const up = () => {
    current.current = null;
  };

  const clear = () => {
    strokes.current = [];
    paint();
    broadcast?.({ t: "strokes", strokes: [] });
  };

  const nextWord = () => {
    const w = fisherYates(PROMPTS)[0];
    setWord(w);
    setHidden(true);
    setHits([]);
    clear();
    send?.({ t: "word", word: w });
  };

  const submit = () => {
    const g = guess.trim().toLowerCase();
    if (!g) return;
    if (g === word.toLowerCase()) {
      playIf(muted, sfx.win);
      setHits((h) => [...h, "You"]);
      send?.({ t: "hit", name: "You" });
    } else playIf(muted, sfx.wrong);
    setGuess("");
  };

  return (
    <div className="flex flex-1 flex-col gap-3 px-3 py-3 md:px-6">
      {online ? (
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
          {joined ? "Live" : "Connecting"} · {peers.length} fam in the room
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        {drawing ? (
          <>
            <Button variant="line" onClick={() => setHidden((h) => !h)}>
              {hidden ? "Show word" : word}
            </Button>
            <Button variant="ghost" onClick={nextWord}>
              New word
            </Button>
            <Button variant="ghost" onClick={clear}>
              Wipe
            </Button>
          </>
        ) : (
          <p className="font-display text-lg uppercase text-concrete">Someone is drawing. Guess.</p>
        )}
        <div className="ml-auto flex gap-1">
          {PALETTE.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={cn("size-8 border", color === c ? "border-danfo" : "border-lane")}
              style={{ background: c }}
            />
          ))}
        </div>
        <input
          type="range"
          min={2}
          max={18}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-24"
        />
      </div>
      <canvas
        ref={canvasRef}
        className="min-h-[48vh] w-full flex-1 touch-none border border-lane bg-asphalt"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      />
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Guess the drawing"
          className="h-12 flex-1 border border-lane bg-asphalt px-4 font-display text-xl font-bold uppercase outline-none focus:border-danfo"
        />
        <Button type="submit">Send</Button>
      </form>
      {hits.length ? (
        <p className="font-mono text-[11px] uppercase tracking-widest text-danfo">{hits.join(" · ")} got it</p>
      ) : null}
    </div>
  );
}

export function DrawItOut() {
  const name = usePlayer((s) => s.name);
  const [sit, setSit] = useState<SitDownStart | null>(null);

  if (!sit) {
    return (
      <GameShell game={game}>
        <SitDown game={game} defaultSeats={2} minSeats={2} maxSeats={8} onStart={setSit} />
      </GameShell>
    );
  }

  return (
    <GameShell game={game}>
      {sit.mode === "online" ? (
        <OnlineDraw key={sit.room} room={sit.room} name={name} joining={sit.joining} />
      ) : (
        <LocalDraw />
      )}
    </GameShell>
  );
}
