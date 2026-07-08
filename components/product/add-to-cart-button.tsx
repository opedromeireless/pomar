"use client";

import { useCart } from "@/store/cart";
import type { Product } from "@/lib/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product)}
      className="mt-8 w-full rounded-xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
    >
      Adicionar ao carrinho
    </button>
  );
}
