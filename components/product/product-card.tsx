"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye, Leaf } from "lucide-react";

import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/format/currency";
import { useCart } from "@/store/cart";
import { categories } from "@/lib/data/categorias";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);

  const category = categories.find((c) => c.id === product.categoryId);
  const outOfStock = product.stock <= 0;
  const lowStock = !outOfStock && product.stock <= 5;

  return (
    <div
      className="animate-fade-up group overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-forest hover:shadow-[0_18px_40px_-24px_rgba(31,77,55,0.35)]"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <Link href={`/produto/${product.slug}`} className="relative block">
        <div className="relative overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={450}
            sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
            className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>

        {category && (
          <span className="stamp absolute -left-2 -top-2 -rotate-6 bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-forest shadow-sm">
            {category.name}
          </span>
        )}
      </Link>

      <div className="flex min-h-[260px] flex-col p-5">
        <div className="mb-1 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink/50">
          <Leaf className="h-3.5 w-3.5 text-forest" />
          {product.producerName}
        </div>

        <Link href={`/produto/${product.slug}`}>
          <h3 className="font-display text-xl font-medium text-ink transition group-hover:text-forest">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/65">
          {product.description}
        </p>

        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="font-mono text-2xl font-medium text-forest">
            {formatCurrency(product.price)}
          </span>
          <span className="text-xs text-ink/50">/ {product.unit}</span>
        </div>

        <div className="mt-3">
          {outOfStock ? (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink/40">
              <span className="h-1.5 w-1.5 rounded-full bg-ink/30" />
              Esgotado
            </span>
          ) : lowStock ? (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-mustard-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-mustard" />
              Últimas {product.stock} unidades
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-forest">
              <span className="h-1.5 w-1.5 rounded-full bg-forest" />
              Em estoque
            </span>
          )}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
          <button
            onClick={() => addItem(product)}
            disabled={outOfStock}
            className="flex items-center justify-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-forest-light disabled:cursor-not-allowed disabled:bg-ink/20"
          >
            <ShoppingCart className="h-4 w-4" />
            Adicionar
          </button>

          <Link
            href={`/produto/${product.slug}`}
            className="flex items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink/80 transition hover:border-forest hover:text-forest"
          >
            <Eye className="h-4 w-4" />
            Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
