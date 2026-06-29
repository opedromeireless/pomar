"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/format/currency";
import { useCart } from "@/store/cart";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);
  return (
    <Link
      href={`/produto/${product.slug}`}
      className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={400}
        className="aspect-[4/3] w-full object-cover"
      />

      <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        {product.categoryId === "1"
          ? "Verduras"
          : product.categoryId === "2"
            ? "Frutas"
            : "Flores"}
      </span>

      <div className="space-y-3 p-5">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-zinc-900">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-sm text-zinc-600">
            {product.description}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xl font-bold text-green-700">
              {formatCurrency(product.price)}
            </p>
            <p className="text-xs text-zinc-500">Estoque: {product.stock}</p>
            <p className="text-sm text-zinc-500">por {product.unit}</p>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="mt-4 w-full rounded-2xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
          >
            🛒 Adicionar
          </button>

          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            Detalhes →
          </span>
        </div>
      </div>
    </Link>
  );
}
