"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";

import { useCart } from "@/store/cart";
import { formatCurrency } from "@/lib/format/currency";
import { buildWhatsappOrderUrl } from "@/lib/whatsapp";
import { getProducersClient } from "@/lib/data/produtores-client";
import type { Producer } from "@/lib/types";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";

export default function CarrinhoPage() {
  const { items, addItem, decreaseItem, removeItem, clearCart } = useCart();
  const [producers, setProducers] = useState<Producer[]>([]);

  useEffect(() => {
    getProducersClient()
      .then(setProducers)
      .catch((err) => console.error("Erro ao carregar produtores:", err));
  }, []);

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const groupedByProducer = items.reduce<Record<string, typeof items>>(
    (groups, item) => {
      const producerId = item.product.producerId;
      if (!groups[producerId]) {
        groups[producerId] = [];
      }
      groups[producerId].push(item);
      return groups;
    },
    {},
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f7f6f2]">
        <Header />
        <Container className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <ShoppingBasket className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900">
            Seu carrinho está vazio
          </h1>
          <p className="mt-2 max-w-sm text-zinc-600">
            Explore o catálogo e adicione produtos frescos direto dos produtores
            de Ivoti.
          </p>
          <Link
            href="/#produtos"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Ver produtos
          </Link>
        </Container>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f6f2]">
      <Header />

      <Container className="py-10">
        <h1 className="text-3xl font-bold text-zinc-900">Seu carrinho</h1>
        <p className="mt-2 text-zinc-600">
          {items.length} {items.length === 1 ? "produto" : "produtos"} de{" "}
          {Object.keys(groupedByProducer).length}{" "}
          {Object.keys(groupedByProducer).length === 1
            ? "produtor"
            : "produtores"}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {Object.entries(groupedByProducer).map(([producerId, group]) => {
              const producer = producers.find((p) => p.id === producerId);
              if (!producer) return null;

              return (
                <div
                  key={producerId}
                  className="overflow-hidden rounded-3xl border border-zinc-200 bg-white"
                >
                  <div className="border-b border-zinc-100 bg-zinc-50 px-5 py-3">
                    <p className="text-sm font-semibold text-zinc-700">
                      {producer.name}
                    </p>
                  </div>

                  <div className="divide-y divide-zinc-100">
                    {group.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-4 px-5 py-4"
                      >
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-100">
                          <Image
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-zinc-900">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-zinc-500">
                            {formatCurrency(item.product.price)} /{" "}
                            {item.product.unit}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 rounded-full border border-zinc-200 p-1">
                          <button
                            onClick={() => decreaseItem(item.product.id)}
                            aria-label={`Diminuir quantidade de ${item.product.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-zinc-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addItem(item.product)}
                            aria-label={`Aumentar quantidade de ${item.product.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <p className="w-20 text-right font-semibold text-zinc-900">
                          {formatCurrency(item.product.price * item.quantity)}
                        </p>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          aria-label={`Remover ${item.product.name}`}
                          className="text-zinc-400 transition hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            <button
              onClick={clearCart}
              className="text-sm font-medium text-zinc-500 underline-offset-4 transition hover:text-red-600 hover:underline"
            >
              Limpar carrinho
            </button>
          </div>

          <aside className="h-fit space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-zinc-900">
              Resumo do pedido
            </h2>

            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 text-sm text-zinc-600">
              <span>Total</span>
              <span className="text-xl font-bold text-zinc-900">
                {formatCurrency(total)}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-zinc-600">
              Cada produtor recebe e organiza seu próprio pedido. Ao confirmar,
              você abre uma conversa de WhatsApp para cada produtor, já com os
              itens preenchidos.
            </p>

            <div className="space-y-3 pt-2">
              {Object.entries(groupedByProducer).map(([producerId, group]) => {
                const producer = producers.find((p) => p.id === producerId);
                if (!producer) return null;

                const subtotal = group.reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  0,
                );

                return (
                  <a
                    key={producerId}
                    href={buildWhatsappOrderUrl(producer, group)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    <span>Pedir para {producer.name}</span>
                    <span className="text-green-100">
                      {formatCurrency(subtotal)}
                    </span>
                  </a>
                );
              })}
            </div>
          </aside>
        </div>
      </Container>

      <Footer />
    </main>
  );
}
