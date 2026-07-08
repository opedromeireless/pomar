import type { Product } from "@/types/product";
import type { Producer } from "@/types/producer";
import { formatCurrency } from "@/lib/format/currency";

type CartItemForMessage = {
  product: Product;
  quantity: number;
};

export function buildWhatsappOrderUrl(
  producer: Producer,
  items: CartItemForMessage[],
) {
  const lines = items.map(
    (item) =>
      `• ${item.quantity}x ${item.product.name} (${formatCurrency(
        item.product.price,
      )}) - ${item.product.unit}`,
  );

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const message = [
    `Olá, ${producer.name}! Gostaria de fazer um pedido pelo Pomar:`,
    "",
    ...lines,
    "",
    `Total: ${formatCurrency(subtotal)}`,
    "",
    "Pode confirmar a disponibilidade e me passar a chave Pix?",
  ].join("\n");

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${producer.whatsapp}?text=${encodedMessage}`;
}
