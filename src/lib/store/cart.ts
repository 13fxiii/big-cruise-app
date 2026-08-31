"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  variantId: string;
  productId: string;
  slug: string;
  name: string;
  sku: string;
  size: string;
  color: string;
  image: string | null;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQty: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, quantity = 1) => {
        const qty = Math.max(1, Math.min(20, Math.floor(quantity)));
        const existing = get().items.find((i) => i.variantId === item.variantId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.variantId === item.variantId ? { ...i, quantity: Math.min(20, i.quantity + qty) } : i,
            ),
          });
          return;
        }
        set({ items: [...get().items, { ...item, quantity: qty }] });
      },
      setQty: (variantId, quantity) => {
        const qty = Math.floor(quantity);
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.variantId !== variantId) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.variantId === variantId ? { ...i, quantity: Math.min(20, qty) } : i,
          ),
        });
      },
      remove: (variantId) => set({ items: get().items.filter((i) => i.variantId !== variantId) }),
      clear: () => set({ items: [] }),
    }),
    { name: "bc-merch-cart" },
  ),
);
