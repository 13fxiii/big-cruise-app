import { Chapter, Panel, Prose } from "@/components/brand/Chapter";
import { personality, values } from "@/lib/brand";

export function Foundation() {
  return (
    <>
      <Chapter id="essence" n="01" kicker="Foundation" title="These are my people.">
        <Prose>
          <p>
            BIG CRUISE is not a platform, a media company, or a Discord with a logo. It is a room. The room is the
            people. The people are in motion.
          </p>
          <p>
            It is a Nigerian-leaning X community that grew the way real families grow — late Spaces, music arguments,
            jobs dropped in the chat, birthday shoutouts, roasts that would end lesser friendships, and the quiet check-in
            the next morning.
          </p>
          <p>
            The feeling the identity has to carry is simple: <em className="text-danfo not-italic">these are my people.</em>{" "}
            Not an audience. A crew you can insult today and stand for tomorrow.
          </p>
        </Prose>
        <div className="mt-10 grid gap-3 sm:grid-cols-5">
          {["Cruise", "Connect", "Create", "Support", "Grow"].map((w) => (
            <Panel key={w} className="flex min-h-24 items-end">
              <p className="font-display text-2xl font-extrabold uppercase tracking-[0.08em] text-danfo">{w}</p>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="story" n="02" title="From the timeline to a family.">
        <Prose>
          <p>
            The community began as CRUISE CONNECT HUB. That name did the first job: it told people what happened in the
            room. The room outgrew the label. BIG CRUISE is the adult name — shorter, heavier, already how people talk
            about it.
          </p>
          <p>
            The former name stays in the archive. It does not appear on merch, avatars, headers, or any public lockup.
            History is allowed. Nostalgia as branding is not.
          </p>
          <p>
            FX — @13fxiii — holds the centre the way a good host does: music, games, Spaces, jobs, culture. The community
            account @BCHub_ is the house number. The tag #FXIII is family shorthand, not a replacement for the brand
            name.
          </p>
          <p>
            What happened in between is the story worth designing for: strangers became regulars, regulars became
            friends, and the timeline started showing up in real life. That is rare. The identity should protect that
            rarity, not decorate it.
          </p>
        </Prose>
      </Chapter>

      <Chapter id="positioning" n="03" title="A community that became a brand.">
        <div className="grid gap-6 lg:grid-cols-2">
          <Prose>
            <p>
              Most internet communities either stay messy on purpose or fake a company. BIG CRUISE sits in the third
              place: organic culture, production-grade identity.
            </p>
            <p>
              We are not a yacht club. We are not a bus company. We are not a gold cartoon. Cruising here means being in
              the conversation — music on, people present, nobody performing a brand.
            </p>
          </Prose>
          <Panel>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-danfo">Position</p>
            <p className="mt-3 font-display text-3xl font-extrabold uppercase leading-tight text-bone">
              The internet family for people who cruise in public.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-concrete">
              Lagos after dark. A Space at midnight. Friends laughing in a group chat. The timeline becoming a family.
            </p>
          </Panel>
        </div>
      </Chapter>

      <Chapter id="audience" n="04" title="18+. Street-smart. Online for real.">
        <Prose>
          <p>
            The room is adult. Not because it is explicit — because it is unfiltered. Dating talk, money talk, faith,
            work, jokes that would not survive a brand-safety filter. The identity has to feel grown: confident, social,
            slightly rebellious, never childish, never corporate.
          </p>
        </Prose>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Age", "18+ Nigerians and the diaspora who live on X."],
            ["Culture", "Afrobeats, football, films, games, memes, hustle, faith."],
            ["Mode", "Spaces, DMs, timelines, then real-life hangouts."],
            ["Work", "Creators, vendors, job-seekers, people building in public."],
            ["Temper", "Banter first. Loyalty always."],
            ["Need", "A room that still feels like people, not a product."],
          ].map(([t, d]) => (
            <Panel key={t}>
              <p className="font-display text-xl font-bold uppercase tracking-[0.08em] text-danfo">{t}</p>
              <p className="mt-2 text-sm leading-relaxed text-bone/80">{d}</p>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="personality" n="05" title="Roast you today. Stand for you tomorrow.">
        <div className="grid gap-4 md:grid-cols-2">
          {personality.map((p) => (
            <Panel key={p.t}>
              <p className="font-display text-2xl font-extrabold uppercase tracking-[0.06em] text-bone">{p.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-concrete">{p.d}</p>
            </Panel>
          ))}
        </div>
      </Chapter>

      <Chapter id="values" n="06" title="No shortcuts. Stay in motion.">
        <Prose className="mb-10">
          <p>The operating system is two stacked lines. The first is how we treat each other. The second is how we move.</p>
        </Prose>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Panel key={v.t} className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}>
              <p className="font-mono text-sm font-medium tracking-wider text-danfo">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-display text-2xl font-extrabold uppercase text-bone">{v.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-concrete">{v.d}</p>
            </Panel>
          ))}
          <Panel className="bg-danfo md:col-span-2 lg:col-span-3">
            <p className="font-display text-3xl font-extrabold uppercase leading-tight text-midnight md:text-4xl">
              Faith. Ideas. Lessons. Consistency. Motion.
            </p>
            <p className="mt-3 text-sm font-medium text-midnight/70">The second line. Wear it on a neck label.</p>
          </Panel>
        </div>
      </Chapter>
    </>
  );
}
