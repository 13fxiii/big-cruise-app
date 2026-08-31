export type ProductStatus = "lookbook" | "draft" | "active" | "archived";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded" | "expired";
export type FulfillmentStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type StoreImage = {
  id: string;
  url: string;
  alt: string;
  kind: "main" | "front" | "back" | "detail" | "lifestyle";
};

export type StoreVariant = {
  id: string;
  sku: string;
  size: string;
  color: string;
  colorHex: string;
  priceKobo: number;
  stockQty: number;
  availableQty: number;
  status: ProductStatus;
};

export type StoreProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  collectionId: string | null;
  collectionName: string | null;
  currency: string;
  priceKobo: number;
  status: ProductStatus;
  featured: boolean;
  purchasable: boolean;
  care: string;
  sizeGuide: string;
  images: StoreImage[];
  variants: StoreVariant[];
};

export type StoreCollection = {
  id: string;
  slug: string;
  name: string;
  dayId: string | null;
  tagline: string;
  status: string;
};

export type ShippingRate = {
  id: string;
  name: string;
  zone: string;
  amountKobo: number;
  estimatedDays: string;
  active: boolean;
};

export type QuotedLine = {
  variantId: string;
  productId: string;
  slug: string;
  name: string;
  sku: string;
  size: string;
  color: string;
  image: string | null;
  quantity: number;
  unitKobo: number;
  lineKobo: number;
  availableQty: number;
  purchasable: boolean;
};

export type CartQuote = {
  ok: boolean;
  reason?: string;
  lines: QuotedLine[];
  subtotalKobo: number;
  shippingKobo: number;
  totalKobo: number;
  currency: string;
  shipping?: ShippingRate | null;
};

export type PaymentConfig = {
  provider: "paystack";
  configured: boolean;
  live: boolean;
  message: string;
};

export type OrderSummary = {
  id: string;
  publicRef: string;
  email: string;
  name: string;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  subtotalKobo: number;
  shippingKobo: number;
  totalKobo: number;
  currency: string;
  createdAt: string;
  paidAt: string | null;
  items: Array<{
    name: string;
    sku: string;
    size: string;
    color: string;
    quantity: number;
    unitKobo: number;
    lineKobo: number;
  }>;
};

export type StorefrontPayload = {
  dbReady: boolean;
  collections: StoreCollection[];
  lookbook: StoreProduct[];
  shop: StoreProduct[];
  shippingRates: ShippingRate[];
  payment: PaymentConfig;
  settings: Record<string, string>;
  todayDayId: string;
};
