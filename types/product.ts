export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  isAvailable: boolean;
  imageUrl: string;
  categoryId: string;
  producerId: string;
};
