"use client";

import { GameShell } from "@/components/games/Shell";
import { SitDown, type SitDownStart } from "@/components/games/SitDown";
import { Button } from "@/components/ui/button";
import { getGame } from "@/lib/games/catalog";
import { sfx, unlockAudio } from "@/lib/games/audio";
import { playIf, usePlayer } from "@/lib/games/player";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const game = getGame("karaoke")!;

type Line = { t: number; text: string };

const SONGS: { title: string; artist: string; bpm: number; lines: Line[] }[] = [
  {
    title: "Where the Cruise Lives",
    artist: "BIG CRUISE",
    bpm: 98,
    lines: [
      { t: 0, text: "Midnight on the timeline" },
      { t: 3.2, text: "Danfo yellow, no gold" },
      { t: 6.4, text: "We no dey perform the love" },
      { t: 9.6, text: "We just show up like we said" },
      { t: 12.8, text: "Spaces on, the room is warm" },
      { t: 16.0, text: "Somebody birthday, somebody job" },
      { t: 19.2, text: "Roast me but keep me close" },
      { t: 22.4, text: "These are my people, this is the cruise" },
      { t: 25.6, text: "Where the cruise lives" },
      { t: 28.8, text: "Where the cruise lives" },
      { t: 32.0, text: "No shortcuts, just motion" },
      { t: 35.2, text: "Faith in the ones who stayed" },
    ],
  },
  {
    title: "Sunday Chaos",
    artist: "BIG CRUISE",
    bpm: 110,
    lines: [
      { t: 0, text: "Generator talk, jollof in the group" },
      { t: 2.8, text: "Somebody started a poll at 2am" },
      { t: 5.6, text: "Ludo on the floor, UNO in the chat" },
      { t: 8.4, text: "We dey play like the week never come" },
      { t: 11.2, text: "Acid green, orange heat" },
      { t: 14.0, text: "Chaos is a love language" },
      { t: 16.8, text: "Pass the aux, pass the dare" },
      { t: 19.6, text: "If you leave, we go drag you back" },
      { t: 22.4, text: "Sunday no be rest" },
      { t: 25.2, text: "Sunday na the cruise" },
    ],
  },
  {
    title: "Live from the Room",
    artist: "BIG CRUISE",
    bpm: 88,
    lines: [
      { t: 0, text: "Mic is open, don’t freeze" },
      { t: 3.4, text: "Say your name like family" },
      { t: 6.8, text: "Lagos in the headphone" },
      { t: 10.2, text: "London in the delay" },
      { t: 13.6, text: "We connect the diaspora" },
      { t: 17.0, text: "One joke, two continents" },
      { t: 20.4, text: "If you mute, we still hear you" },
      { t: 23.8, text: "Live from the cruise" },
    ],
  },
];

export function Karaoke() {
  const muted = usePlayer((s) => s.muted);
  const [sit, setSit] = useState<SitDownStart | null>(null);
  const [song, setSong] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [level, setLevel] = useState(0);
  const raf = useRef(0);
  const startAt = useRef(0);
  const lastHit = useRef(-1);
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const track = SONGS[song];
  const lineIdx = track.lines.reduce((acc, l, i) => (t >= l.t ? i : acc), 0);
  const line = track.lines[lineIdx];
  const next = track.lines[lineIdx + 1];
  const done = t > (track.lines.at(-1)?.t ?? 0) + 4;

  useEffect(() => {
    if (!playing) return;
    const loop = (now: number) => {
      if (!startAt.current) startAt.current = now;
      setT((now - startAt.current) / 1000);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    unlockAudio();
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new AC();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") void ctx.resume();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.value = 110;
    g.gain.value = muted ? 0 : 0.03;
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    oscRef.current = osc;
    const beat = 60 / track.bpm;
    const id = window.setInterval(() => {
      osc.frequency.setValueAtTime(110 + Math.random() * 40, ctx.currentTime);
    }, beat * 1000);
    return () => {
      window.clearInterval(id);
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        /* already stopped */
      }
    };
  }, [playing, track.bpm, muted]);

  useEffect(() => {
    if (!playing || typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) return;
    let stream: MediaStream | null = null;
    let analyser: AnalyserNode | null = null;
    let id = 0;
    navigator.mediaDevices.getUserMedia({ audio: true }).then((s) => {
      stream = s;
      const ctx = ctxRef.current;
      if (!ctx) return;
      const src = ctx.createMediaStreamSource(s);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      src.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser!.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length / 255;
        setLevel(avg);
        id = requestAnimationFrame(tick);
      };
      tick();
    }).catch(() => undefined);
    return () => {
      cancelAnimationFrame(id);
      stream?.getTracks().forEach((tr) => tr.stop());
    };
  }, [playing]);

  const tap = () => {
    if (!playing || done) return;
    const target = line.t;
    const err = Math.abs(t - target);
    lastHit.current = lineIdx;
    if (err < 0.7) {
      const pts = Math.round((1 - err / 0.7) * 100);
      setScore((s) => s + pts);
      setHits((h) => h + 1);
      playIf(muted, sfx.correct);
    } else playIf(muted, sfx.wrong);
  };

  if (!sit) {
    return (
      <GameShell game={game}>
        <SitDown game={game} defaultSeats={1} minSeats={1} maxSeats={8} onStart={setSit} />
      </GameShell>
    );
  }

  return (
    <GameShell
      game={game}
      status={
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
          {score} pts · {hits} hits
        </p>
      }
    >
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center gap-6 px-4 py-8">
        <div className="flex flex-wrap justify-center gap-2">
          {SONGS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => {
                setSong(i);
                setPlaying(false);
                setT(0);
                setScore(0);
                setHits(0);
                startAt.current = 0;
              }}
              className={cn(
                "min-h-11 border px-3 font-display text-sm font-bold uppercase tracking-[0.12em]",
                song === i ? "border-danfo bg-danfo text-midnight" : "border-lane",
              )}
            >
              {s.title}
            </button>
          ))}
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-play-cyan">{track.artist}</p>
        <h2 className="text-center font-display text-5xl font-bold uppercase leading-none">{track.title}</h2>

        <div className="h-1 w-full max-w-sm bg-lane">
          <div className="h-full bg-play-cyan" style={{ width: `${Math.min(100, level * 100)}%` }} />
        </div>

        <p className="min-h-16 text-center font-display text-3xl font-bold uppercase leading-tight text-bone md:text-4xl">
          {playing ? line?.text : "Tap enter, then tap each line as it lands."}
        </p>
        <p className="min-h-10 text-center font-display text-xl uppercase text-concrete">{next?.text}</p>

        {done ? (
          <div className="text-center">
            <p className="font-display text-4xl font-bold uppercase">{score} on the board</p>
            <Button
              className="mt-3"
              onClick={() => {
                setPlaying(false);
                setT(0);
                setScore(0);
                setHits(0);
                startAt.current = 0;
              }}
            >
              Replay
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              if (!playing) {
                unlockAudio();
                playIf(muted, sfx.mic);
                startAt.current = 0;
                setPlaying(true);
              } else tap();
            }}
          >
            {playing ? "Hit" : "Enter the stage"}
          </Button>
        )}
      </div>
    </GameShell>
  );
}
