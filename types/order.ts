export type OrderStatus = "pending" | "confirmed" | "delivered";

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerWhatsapp: string;
  customerNotes?: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  createdAt: string;
};
