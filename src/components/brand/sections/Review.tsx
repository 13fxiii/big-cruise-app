import { Chapter, Prose } from "@/components/brand/Chapter";
import { Spark } from "@/components/brand/marks";
import { days } from "@/lib/days";

export function Review() {
  return (
    <>
      <Chapter id="review" n="35" kicker="Review" title="EXTERNAL AI REVIEW — BRAND DESIGN DESCRIPTION">
        <Prose>
          <p>
            This page is the source of truth for BIG CRUISE Brand Lock-in V1.1. Decisions are
            written here, not hidden in JavaScript. Public no-login identity:{" "}
            <a className="text-danfo underline" href="https://big-cruise-brand.vercel.app" target="_blank" rel="noreferrer">
              big-cruise-brand.vercel.app
            </a>
            . Product + brand book:{" "}
            <a className="text-danfo underline" href="https://big-cruise-app.vercel.app/brand" target="_blank" rel="noreferrer">
              big-cruise-app.vercel.app/brand
            </a>
            . Spec:{" "}
            <a className="text-danfo underline" href="/brand/BRAND.md">
              /brand/BRAND.md
            </a>
            .
          </p>
          <p>
            What it is: a Nigerian-leaning X/Twitter community that became a brand. Cruising, banter, loyalty, music,
            Spaces, jobs, birthdays, adult conversation. Not a startup, yacht club, bus company, tourism board, or
            generic African lifestyle label. Founder FX @13fxiii. Community @BCHub_. Tag #FXIII. Former name Cruise
            Connect Hub is retired and must never appear on a lockup, merch print, or filename as current identity.
          </p>
          <p>
            Logo geometry: custom BIG CRUISE signature inspired by 〽️ (U+303D), not the emoji. One open stroke. Peak 1
            lower (Cruise), wide valley (Connect), Peak 2 taller (Create), committed drop (Grow). SVG viewBox 0 0 64 64.
            Path d="M5.4 40 C8.4 24.8 13.4 16.8 20.4 16.8 C27.2 16.8 29.4 28.2 32.4 36.2 C35.6 25.4 39.4 6.6 46.8 6.6 C55.4 6.6 57.4 28.8 58.8 57.4".
            Stroke width 9, round caps and joins, upright, currentColor. Typically Danfo Yellow #F5C400 on Midnight
            #0B0B0B. Master lockup: wordmark + signature. Community: Midnight mark. Founder: FX + compact signature.
            Never ship the colour emoji as the official file.
          </p>
          <p>
            Master colours: Lagos Danfo Midnight Black #0B0B0B (75–85%), Lagos Danfo Yellow #F5C400 (15–25%), Bone
            #F3EFE4, Asphalt #161616, Concrete #8A8A8A. Danfo is the Lagos bus colour, not a bus logo. Do not rename
            yellow as gold, neon, or chrome.
          </p>
          <p>
            Type: Barlow Condensed ExtraBold (display), IBM Plex Sans (body), IBM Plex Mono (stamps). SIL OFL. The Google
            Font named Danfo is rejected as a display face.
          </p>
          <p>
            Graphic language: −8° lane slashes, live ring, night photography, one-colour 〽️. Motion: the ring turns, the
            mark arrives last. Photography: real Nigerian nights, friendship, streetwear, adult nightlife. No stock
            safari, no masks, no Ankara dumps.
          </p>
          <p>
            Intentionally rejected: yacht/boat/anchor concepts; literal danfo bus as the logo; stacked-chevron “spark”
            reconstruction; gold; neon; chrome; glow; generic African tourism; children’s palettes; smileys and chat
            bubbles as the system; former names on current branding.
          </p>
          <p>
            7 Days of Cruise is a weekly ecosystem inside the house, not a rebrand. Each day has a sub-brand, a line, a
            palette, a motif, seven sub-themes (49 total), merch, social templates, and chat cards. Master lockups stay
            black + Danfo Yellow. Day palettes never replace the house.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            {days.map((d) => (
              <li key={d.id}>
                <b>
                  {d.weekday} — {d.subBrand}.
                </b>{" "}
                “{d.line}” Spice {d.spice}/12. Accents {d.accent} / {d.accent2}. Motif: {d.motif} Sub-themes:{" "}
                {d.subthemes.map((s) => s.name).join("; ")}.
              </li>
            ))}
          </ul>
          <p>
            Merch: streetwear system V1.0, not promo. Flagship 240 GSM oversized midnight tee. Drop 00 is two graphics + a
            cap after a washed sample. Print sub-brands, motifs, numbers, 〽️. Do not print weekday programming
            titles or the former name as artwork. Social: fourteen template jobs, four formats (16:9, 1:1, 4:5, 9:16),
            recolored per day. Chat: square stickers (Tonight's Cruise, Pull Up, We Outside, Space Starting Soon, Game
            Night, Drop Your Take, Who's Active?, Anonymous Drop, Music Bag, Today's Challenge).
          </p>
          <p>
            18+: attitude, crop, type, nightlife. Suggestive editorial, not graphic sexual imagery. Saturday and Sunday
            run hottest; they still use atmosphere, redaction, and humour rather than pornography.
          </p>
          <p>Kept tagline: Where the cruise lives. Philosophy: Cruise. Connect. Create. Support. Grow.</p>
          <p>
            App environment (V1.1): CruiseBackground is the global night — midnight 75–85%, Danfo 15–25%, a quiet tiled
            Cruise Stroke (never emoji stickers), grain. No lane wallpaper, no dual orbs, no motion paths on product
            screens. Densities: cover, default, quiet, game (secondary 7 Days wash). Chrome: CruiseButton, Card, Modal,
            Badge, Avatar, Header, GameRoom, PlayerCard, Notification, Loader (~1.2s skippable boot), Toast. Game Room is
            the lobby. BIG CRUISE ID is local (BCH-XXXXXX, level, points, badges, stats). Auth remains off. One
            community, many game worlds — not ten unrelated mini-games with a logo on top.
          </p>
        </Prose>
      </Chapter>

      <Chapter id="assets" n="36" title="Public files.">
        <Prose>
          <p>SVG is the master. PNG is a raster snapshot. No login. Brand.md is the written spec.</p>
        </Prose>
        <div className="mt-8 grid gap-2">
          {[
            ["/brand/logos/mark.svg", "SVG — Cruise Stroke (transparent)"],
            ["/brand/logos/mark.png", "PNG — Cruise Stroke (transparent)"],
            ["/brand/logos/live-mark.svg", "SVG — live mark"],
            ["/brand/logos/midnight-mark.svg", "SVG — community / X avatar"],
            ["/brand/logos/wordmark.svg", "SVG — wordmark + signature"],
            ["/brand/logos/lockup-horizontal.svg", "SVG — horizontal lockup"],
            ["/brand/logos/lockup-stacked.svg", "SVG — stacked lockup"],
            ["/brand/logos/app-icon.svg", "SVG — app icon"],
            ["/brand/logos/favicon.svg", "SVG — favicon"],
            ["/brand/logos/founder-fx.svg", "SVG — FX founder identity"],
            ["/brand/logos/mark-embroidery.svg", "SVG — embroidery-safe"],
            ["/brand/logos/mark-tiny.svg", "SVG — tiny optical"],
            ["/brand/BRAND.md", "MD — full written specification"],
            ["https://big-cruise-brand.vercel.app", "Public HTTPS — no login"],
            ["https://big-cruise-app.vercel.app/brand", "Brand book in the product"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="block rounded-[16px] bg-asphalt px-5 py-4 font-mono text-sm text-bone hover:text-danfo"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <Spark className="size-14 text-danfo" />
          <p className="font-display text-4xl font-extrabold uppercase text-bone md:text-6xl">Where the cruise lives.</p>
          <p className="font-display text-sm uppercase tracking-[0.22em] text-concrete">
            BIG CRUISE · Brand Lock-in + 7 Days of Cruise · V1.1
          </p>
        </div>
      </Chapter>
    </>
  );
}
