import { Chapter, Panel, Prose } from "@/components/brand/Chapter";
import { BrandMarkMini, Cap, Motif } from "@/components/brand/day-marks";
import { DayTee } from "@/components/brand/garments";
import { Spark } from "@/components/brand/marks";
import { dayMerch } from "@/lib/cruise/merch";
import { days, merchBanned, merchSkus, production } from "@/lib/days";

export function Capsules() {
  return (
    <>
      <Chapter id="capsules" n="31" kicker="7 Days of Cruise" title="A streetwear capsule. Not promo shirts.">
        <Prose>
          <p>
            Master merch stays Midnight + Danfo 〽️. Day capsules borrow the house blank. The back is the day's
            illustration plus Barlow Condensed — sub-brand name, not a weekday slogan. Chest is a day-accent spark.
            Neck label is always BIG CRUISE.
          </p>
          <p>{days[0] && "If a design needs a yacht, gold foil, or the words MEN CRUSH MONDAY, it is not this brand."}</p>
        </Prose>

        <div className="mt-8 overflow-x-auto rounded-[16px] bg-asphalt p-4">
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.16em] text-danfo">Do not print</p>
          <div className="flex flex-wrap gap-2">
            {merchBanned.map((t) => (
              <span key={t} className="bg-midnight px-3 py-2 font-display text-xs uppercase tracking-[0.08em] text-concrete line-through">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {merchSkus.map((s) => (
            <Panel key={s.sku}>
              <p className="font-display text-lg font-bold uppercase text-bone">{s.sku}</p>
              <p className="mt-2 text-sm text-concrete">{s.spec}</p>
            </Panel>
          ))}
        </div>

        <div className="mt-10 grid gap-8">
          {days.map((d) => {
            const piece = dayMerch.find((m) => m.id === d.id);
            return (
              <div key={d.id} className="rounded-[20px] bg-asphalt p-5 md:p-6">
                <div className="mb-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-concrete">
                      {d.n} · {d.weekday}
                    </p>
                    <h3 className="font-display text-3xl font-extrabold uppercase" style={{ color: d.accent }}>
                      {d.subBrand}
                    </h3>
                    <p className="text-sm text-bone/75">{d.line}</p>
                    <p className="mt-2 text-sm text-concrete">{d.merchHero}</p>
                  </div>
                  <div className="size-10" style={{ color: d.accent }}>
                    <Motif id={d.id} className="size-10" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="overflow-hidden rounded-[16px] bg-midnight">
                    <img
                      src={piece?.print ?? d.photo}
                      alt={`${d.subBrand} merch back`}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-center rounded-[16px] bg-midnight p-4">
                    <DayTee src={piece?.print ?? d.photo} className="w-40" />
                    <p className="mt-2 font-display text-xs uppercase tracking-[0.14em] text-concrete">Back print</p>
                  </div>
                  <div className="flex flex-col items-center rounded-[16px] p-4" style={{ background: d.accent }}>
                    <div className="relative">
                      <Cap className="h-24 w-auto" body="#0B0B0B" mark={d.accent2} />
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-midnight">
                      <Spark className="size-6" />
                      <p className="font-display text-xs uppercase tracking-[0.14em]">Chest spark · cap</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Panel className="flex min-h-40 flex-col justify-between bg-midnight">
            <BrandMarkMini className="size-10 text-danfo" />
            <p className="font-display text-sm uppercase tracking-[0.14em] text-bone">Woven label — Bone on black. House name lives inside the garment, not as a chest slogan.</p>
          </Panel>
          <Panel className="flex min-h-40 flex-col justify-between bg-danfo text-midnight">
            <span className="slash-rule bg-midnight" />
            <p className="font-display text-sm uppercase tracking-[0.14em]">Mailer — black bag, one yellow slash. Day capsules get a coloured slash, never gold tissue.</p>
          </Panel>
          <Panel className="flex min-h-40 flex-col justify-between bg-midnight">
            <div className="flex gap-2">
              {days.slice(0, 4).map((d) => (
                <span key={d.id} className="size-8 rounded-full" style={{ background: d.accent }} />
              ))}
            </div>
            <p className="font-display text-sm uppercase tracking-[0.14em] text-bone">Sticker pack — die-cut midnight mark + day motif. True transparent PNG, no checkerboard.</p>
          </Panel>
        </div>
      </Chapter>

      <Chapter id="production" n="34" title="Print like you mean it.">
        <Prose>
          <p>
            SVG is the master for marks, motifs, type lockups. Photography is documentary raster. Prepress converts to
            TIFF CMYK at 300 DPI. Do not ship a screenshot of this website to a printer.
          </p>
        </Prose>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {[
            ["Resolution", `${production.dpi} DPI. Chest ~280–300mm.`],
            ["Colour", production.color],
            ["Masters", production.masters],
            ["Safe area", production.safe],
            ["Transparency", production.transparent],
            ["Type", production.type],
          ].map(([t, d]) => (
            <Panel key={t}>
              <p className="font-display text-lg font-bold uppercase text-danfo">{t}</p>
              <p className="mt-1 text-sm text-bone/80">{d}</p>
            </Panel>
          ))}
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="font-display uppercase tracking-[0.14em] text-danfo">
              <tr>
                <th className="py-2">Ink</th>
                <th>CMYK</th>
              </tr>
            </thead>
            <tbody className="font-mono text-bone/80">
              {Object.entries(production.cmyk).map(([k, v]) => (
                <tr key={k} className="border-t border-lane">
                  <td className="py-2 capitalize">{k}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Chapter>
    </>
  );
}
