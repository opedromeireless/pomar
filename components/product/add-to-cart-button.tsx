"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/cart";
import type { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const outOfStock = product.stock <= 0;

  return (
    <button
      onClick={() => addItem(product)}
      disabled={outOfStock}
      className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-forest py-4 text-lg font-semibold text-paper transition hover:bg-forest-light disabled:cursor-not-allowed disabled:bg-ink/20"
    >
      <ShoppingCart className="h-5 w-5" />
      {outOfStock ? "Produto esgotado" : "Adicionar ao carrinho"}
    </button>
  );
}
