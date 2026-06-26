"use client";

import { useCart } from "@/store/cart";
import { formatCurrency } from "@/lib/format/currency";

export default function CarrinhoPage() {
  const { items, removeItem, clearCart } = useCart();

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-[#f7f6f2] p-8">
      <h1 className="mb-6 text-3xl font-bold">Seu carrinho</h1>

      {items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between rounded-2xl border bg-white p-4"
              >
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity}x {formatCurrency(item.product.price)}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-red-600"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-xl font-bold">Total: {formatCurrency(total)}</p>

            <button
              onClick={clearCart}
              className="rounded-xl bg-black px-4 py-2 text-white"
            >
              Limpar carrinho
            </button>
          </div>
        </>
      )}
    </div>
  );
}
