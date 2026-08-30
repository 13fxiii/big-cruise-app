/* 7 Days merch catalog. Official V1.1 lock-in. */
const DAYS = [
  ["MON","mon","Monday","Dominion State","DOMINION_STATE","#7A1F33","#C48A5A","POWER IS QUIET.","Tonal black. Burgundy weight bars. Chest mark only.",7,"preorder","Quiet authority on cloth. Three weight bars. No crown."],
  ["TUE","tue","Tuesday","Too Lit To Stress","TOO_LIT_TO_STRESS","#FF2B6B","#FFF200","NO FILTER ENERGY.","Hot pink slash at -8. Club hit yellow is not house yellow.",10,"coming","Nightlife editorial. Double slash. Adult, not graphic."],
  ["WED","wed","Wednesday","Divine Energy","DIVINE_ENERGY","#C45A72","#E6C8B4","SHE MOVES DIFFERENT.","One motion arc. Nude and rose. Danfo at 5%.",6,"coming","Purpose without a halo. One arc. She already knows."],
  ["THU","thu","Thursday","Back When It Was Real","BACK_WHEN_IT_WAS_REAL","#C4A574","#F2E6D0","ECHO ERA.","Halftone + date stamp. Sepia on echo black.",5,"coming","Naija nostalgia without a cassette cliche dump."],
  ["FRI","fri","Friday","Play Your Vibe","PLAY_YOUR_VIBE","#6A2C91","#3DFFF2","FRESH HEAT.","Seven equalizer bars. Purple and cyan on night.",8,"coming","Friday without leaving the house. Seven bars only."],
  ["SAT","sat","Saturday","Read Between The Lines","READ_BETWEEN_THE_LINES","#9B1228","#9A7B12","FEEL DON'T SEND.","Redaction bars. Atmosphere, not pornography.",11,"coming","Adult only. Redact the sentence. Keep the feeling."],
  ["SUN","sun","Sunday","Chaos Culture","CHAOS_CULTURE","#C8F542","#FF4D1A","NO RULES.","Offset stamp. Two plates that do not register.",12,"coming","Maximum chaos. Roast protocol. Still family."],
] as const;

export const merchCatalog = {
  brand: "BIG CRUISE",
  system: "7 Days of Cruise",
  version: "1.1",
  tagline: "Where the cruise lives.",
  hierarchy: ["BIG CRUISE", "7 Days of Cruise", "Daily Subtheme", "Merch Design"],
  masterPalette: { midnight: "#0B0B0B", danfo: "#F5C400", bone: "#F3EFE4", asphalt: "#161616", concrete: "#8A8A8A" },
  rule: "Day accent never replaces Midnight + Danfo on the house lockup.",
  collections: DAYS.map(([code, id, day, name, file, accent, accent2, line, hero, spice, status]) => ({
    id, day, code, subtheme: name, slug: name.toLowerCase().replace(/ /g, "-"),
    accent, accent2, line, hero, spice, status,
    available: ["tee", "hoodie", "cap", "longsleeve", "shorts", "joggers", "tote"],
    heroArtwork: `/merch/7-days/${id}/BIGCRUISE_7DOC_${code}_${file}_MASTER.svg`,
  })),
  products: DAYS.flatMap(([code, id, day, name, file, accent, _a2, _l, _h, _s, status, description]) =>
    (["tee", "hoodie", "cap"] as const).map((kind) => {
      const base = `/merch/7-days/${id}/BIGCRUISE_7DOC_${code}_${file}`;
      return {
        sku: `BC-7D-${code}-${kind.toUpperCase()}-BLK`,
        name: `${name} ${kind === "tee" ? "Heavyweight Tee" : kind === "hoodie" ? "Hoodie" : "Cap"}`,
        collection: "7 Days of Cruise",
        day, dayId: id, subtheme: name, productType: kind,
        color: "Lagos Danfo Midnight Black", colorHex: "#0B0B0B", accentHex: accent,
        sizes: kind === "cap" ? ["OS"] : ["S", "M", "L", "XL", "XXL"],
        price: kind === "tee" ? 28000 : kind === "hoodie" ? 45000 : 18000,
        currency: "NGN", description,
        mainImage: `${base}_${kind.toUpperCase()}.svg`,
        frontImage: `${base}_${kind.toUpperCase()}.svg`,
        backImage: `${base}_PRINT.svg`,
        detailImage: `${base}_SMALL.svg`,
        availableQuantity: 0,
        preorder: status === "preorder",
        productionStatus: status,
        print: { front: "small community mark + day motif", back: "subtheme artwork", maxLocations: 2 },
      };
    }),
  ),
} as const;

export type MerchProduct = (typeof merchCatalog.products)[number];
export type MerchCollection = (typeof merchCatalog.collections)[number];
