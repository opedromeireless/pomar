export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  categoryId: string;
  producerId: string;
  imageUrl: string;
  isAvailable: boolean;
};

export type Producer = {
  id: string;
  slug: string;
  name: string;
  city: string;
  neighborhood?: string;
  description: string;
  whatsapp?: string;
};
