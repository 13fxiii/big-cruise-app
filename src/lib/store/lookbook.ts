import { todayDayId } from "./money";
import type { PaymentConfig, StorefrontPayload, StoreProduct } from "./types";

function sizes(prefix: string, skuBase: string): StoreProduct["variants"] {
  return ["S", "M", "L", "XL", "XXL"].map((size) => ({
    id: `${prefix}-${size.toLowerCase()}`,
    sku: `${skuBase}-${size}`,
    size,
    color: "Midnight Black",
    colorHex: "#0B0B0B",
    priceKobo: 0,
    stockQty: 0,
    availableQty: 0,
    status: "lookbook",
  }));
}

const HOUSE: StoreProduct[] = [
  {
    id: "prod-house-tee",
    slug: "dominion-state-tee",
    name: "BIG CRUISE Dominion State Tee",
    description: "Heavyweight black tee photographed on the street. Lookbook only.",
    category: "tee",
    collectionId: "col-house",
    collectionName: "House",
    currency: "NGN",
    priceKobo: 0,
    status: "lookbook",
    featured: true,
    purchasable: false,
    care: "Cold wash inside out. Hang dry.",
    sizeGuide: "Unisex heavyweight. S–XXL.",
    images: [{ id: "img-tee-main", url: "/brand/tee-walk.jpg", alt: "BIG CRUISE tee on the street", kind: "lifestyle" }],
    variants: sizes("var-tee", "BC-HOUSE-TEE-BLK"),
  },
  {
    id: "prod-house-hoodie",
    slug: "house-hoodie",
    name: "BIG CRUISE House Hoodie",
    description: "Midnight heavyweight hoodie. Archive photograph. Not for sale yet.",
    category: "hoodie",
    collectionId: "col-house",
    collectionName: "House",
    currency: "NGN",
    priceKobo: 0,
    status: "lookbook",
    featured: true,
    purchasable: false,
    care: "Cold wash inside out. Hang dry.",
    sizeGuide: "Unisex. S–XXL.",
    images: [{ id: "img-hoodie-main", url: "/brand/hoodie.jpg", alt: "BIG CRUISE hoodie", kind: "main" }],
    variants: sizes("var-hood", "BC-HOUSE-HOOD-BLK"),
  },
  {
    id: "prod-house-cap",
    slug: "house-cap",
    name: "BIG CRUISE House Cap",
    description: "Low profile cap. Archive photograph. Not for sale yet.",
    category: "cap",
    collectionId: "col-house",
    collectionName: "House",
    currency: "NGN",
    priceKobo: 0,
    status: "lookbook",
    featured: false,
    purchasable: false,
    care: "Spot clean.",
    sizeGuide: "One size.",
    images: [{ id: "img-cap-main", url: "/brand/cap.jpg", alt: "BIG CRUISE cap", kind: "main" }],
    variants: [
      {
        id: "var-cap-os",
        sku: "BC-HOUSE-CAP-BLK-OS",
        size: "OS",
        color: "Midnight Black",
        colorHex: "#0B0B0B",
        priceKobo: 0,
        stockQty: 0,
        availableQty: 0,
        status: "lookbook",
      },
    ],
  },
  {
    id: "prod-house-tote",
    slug: "house-tote",
    name: "BIG CRUISE House Tote",
    description: "Bone canvas tote. Archive photograph. Not for sale yet.",
    category: "tote",
    collectionId: "col-house",
    collectionName: "House",
    currency: "NGN",
    priceKobo: 0,
    status: "lookbook",
    featured: false,
    purchasable: false,
    care: "Spot clean.",
    sizeGuide: "One size.",
    images: [{ id: "img-tote-main", url: "/brand/tote.jpg", alt: "BIG CRUISE tote", kind: "main" }],
    variants: [
      {
        id: "var-tote-os",
        sku: "BC-HOUSE-TOTE-BONE-OS",
        size: "OS",
        color: "Bone",
        colorHex: "#F3EFE4",
        priceKobo: 0,
        stockQty: 0,
        availableQty: 0,
        status: "lookbook",
      },
    ],
  },
];

export const FALLBACK_PAYMENT: PaymentConfig = {
  provider: "paystack",
  configured: false,
  live: false,
  message: "PAYMENT: NOT LIVE — CREDENTIALS REQUIRED",
};

export function lookbookFallback(payment: PaymentConfig = FALLBACK_PAYMENT): StorefrontPayload {
  return {
    dbReady: false,
    collections: [
      { id: "col-house", slug: "house", name: "House", dayId: null, tagline: "Midnight blanks. Official Cruise Stroke.", status: "lookbook" },
      { id: "col-dominion", slug: "dominion-state", name: "Dominion State", dayId: "mon", tagline: "Power is quiet. Monday weight.", status: "lookbook" },
    ],
    lookbook: HOUSE,
    shop: [],
    shippingRates: [
      { id: "ship-pickup-lagos", name: "Arrange Lagos pickup", zone: "Lagos pickup", amountKobo: 0, estimatedDays: "Coordinated after payment", active: true },
    ],
    payment,
    settings: {
      currency: "NGN",
      returns: "Unworn items with tags can be arranged for return within 7 days of delivery.",
      shipping_note: "Nigeria first. Lagos pickup can be arranged.",
    },
    todayDayId: todayDayId(),
  };
}

export function fallbackProductBySlug(slug: string): StoreProduct | undefined {
  return HOUSE.find((p) => p.slug === slug);
}
