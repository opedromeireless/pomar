"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye, Leaf } from "lucide-react";

import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/format/currency";
import { useCart } from "@/store/cart";
import { categories, producers } from "@/data/mock-data";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);

  const category = categories.find(
    (category) => category.id === product.categoryId,
  );

  const producer = producers.find(
    (producer) => producer.id === product.producerId,
  );

  const lowStock = product.stock <= 5;

  return (
    <div className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:shadow-xl">
      <Link href={`/produto/${product.slug}`}>
        <div className="relative overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={450}
            sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
            className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-green-700 shadow">
            {category?.name}
          </span>
        </div>
      </Link>

      <div className="flex min-h-[280px] flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
          <Leaf className="h-4 w-4 text-green-600" />

          <span>{producer?.name}</span>
        </div>

        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-xl font-bold text-zinc-900 transition group-hover:text-green-700">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600">
          {product.description}
        </p>

        <div className="mt-4">
          <p className="text-2xl font-bold text-green-700">
            {formatCurrency(product.price)}
          </p>

          <p className="text-sm text-zinc-500">por {product.unit}</p>
        </div>

        <div className="mt-4">
          {lowStock ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              Últimas {product.stock} unidades
            </span>
          ) : (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Em estoque
            </span>
          )}
        </div>

        <div className="mt-auto pt-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => addItem(product)}
              className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              <ShoppingCart className="h-4 w-4" />
              Adicionar
            </button>

            <Link
              href={`/produto/${product.slug}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-3 font-semibold text-zinc-700 transition hover:border-green-600 hover:text-green-700"
            >
              <Eye className="h-4 w-4" />
              Detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
