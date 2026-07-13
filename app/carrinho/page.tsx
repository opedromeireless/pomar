"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";

import { useCart } from "@/store/cart";
import { formatCurrency } from "@/lib/format/currency";
import { buildWhatsappOrderUrl } from "@/lib/whatsapp";
import { getProducersClient } from "@/lib/data/produtores-client";
import type { Producer } from "@/types/producer";
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
      if (!groups[producerId]) groups[producerId] = [];
      groups[producerId].push(item);
      return groups;
    },
    {},
  );

  if (items.length === 0) {
    return (
      <main className="bg-paper">
        <Header />
        <Container className="flex flex-col items-center justify-center py-28 text-center">
          <span className="stamp flex h-16 w-16 items-center justify-center text-forest">
            <ShoppingBasket className="h-7 w-7" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-medium text-ink">
            Seu carrinho está vazio
          </h1>
          <p className="mt-2 max-w-sm text-ink/65">
            Explore o catálogo e adicione produtos frescos direto dos produtores
            de Ivoti.
          </p>
          <Link
            href="/#produtos"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-forest px-7 py-3 text-sm font-semibold text-paper transition hover:bg-forest-light"
          >
            Ver produtos
          </Link>
        </Container>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-paper">
      <Header />

      <Container className="py-12">
        <p className="font-mono text-xs uppercase tracking-widest text-forest">
          Sua sacola
        </p>
        <h1 className="mt-2 font-display text-4xl font-medium text-ink">
          Seu carrinho
        </h1>
        <p className="mt-2 text-ink/60">
          {items.length} {items.length === 1 ? "produto" : "produtos"} de{" "}
          {Object.keys(groupedByProducer).length}{" "}
          {Object.keys(groupedByProducer).length === 1
            ? "produtor"
            : "produtores"}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            {Object.entries(groupedByProducer).map(([producerId, group]) => {
              const producer = producers.find((p) => p.id === producerId);
              if (!producer) return null;

              return (
                <div
                  key={producerId}
                  className="overflow-hidden rounded-2xl border border-line bg-white"
                >
                  <div className="border-b border-line bg-paper/60 px-5 py-3">
                    <p className="font-display text-base font-medium text-ink">
                      {producer.name}
                    </p>
                  </div>

                  <div className="divide-y divide-line">
                    {group.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-4 px-5 py-4"
                      >
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-paper">
                          <Image
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-ink">
                            {item.product.name}
                          </p>
                          <p className="font-mono text-xs text-ink/50">
                            {formatCurrency(item.product.price)} /{" "}
                            {item.product.unit}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 rounded-full border border-line p-1">
                          <button
                            onClick={() => decreaseItem(item.product.id)}
                            aria-label={`Diminuir quantidade de ${item.product.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-ink/60 transition hover:bg-paper"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center font-mono text-sm font-medium text-ink">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addItem(item.product)}
                            aria-label={`Aumentar quantidade de ${item.product.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-ink/60 transition hover:bg-paper"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <p className="w-20 text-right font-mono font-medium text-ink">
                          {formatCurrency(item.product.price * item.quantity)}
                        </p>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          aria-label={`Remover ${item.product.name}`}
                          className="text-ink/30 transition hover:text-rose"
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
              className="text-sm font-medium text-ink/50 underline-offset-4 transition hover:text-rose hover:underline"
            >
              Limpar carrinho
            </button>
          </div>

          <aside className="h-fit space-y-5 rounded-2xl border border-line bg-white p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-lg font-medium text-ink">
              Resumo do pedido
            </h2>

            <div className="ledger-line" />

            <div className="flex items-center justify-between text-sm text-ink/60">
              <span>Total</span>
              <span className="font-mono text-2xl font-medium text-forest">
                {formatCurrency(total)}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-ink/60">
              Cada produtor recebe e organiza seu próprio pedido. Ao confirmar,
              você abre uma conversa de WhatsApp para cada produtor, já com os
              itens preenchidos.
            </p>

            <div className="space-y-3 pt-1">
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
                    className="flex items-center justify-between rounded-full bg-forest px-5 py-3 text-sm font-semibold text-paper transition hover:bg-forest-light"
                  >
                    <span>Pedir para {producer.name}</span>
                    <span className="font-mono text-paper/80">
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
