import { create } from "zustand";
import type { Product } from "@/types/product";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  decreaseItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],

  addItem: (product) => {
    const items = get().items;
    const existing = items.find((item) => item.product.id === product.id);

    if (existing) {
      set({
        items: items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
      return;
    }

    set({ items: [...items, { product, quantity: 1 }] });
  },

  decreaseItem: (productId) => {
    const items = get().items;
    const existing = items.find((item) => item.product.id === productId);

    if (!existing) return;

    if (existing.quantity <= 1) {
      set({ items: items.filter((item) => item.product.id !== productId) });
      return;
    }

    set({
      items: items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    });
  },

  removeItem: (productId) => {
    set({
      items: get().items.filter((item) => item.product.id !== productId),
    });
  },

  clearCart: () => set({ items: [] }),
}));
