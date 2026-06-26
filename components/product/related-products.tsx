import { products } from "@/data/mock-data";
import { ProductCard } from "./product-card";

type Props = {
  categoryId: string;
  currentProductId: string;
};

export function RelatedProducts({ categoryId, currentProductId }: Props) {
  const related = products
    .filter((p) => p.categoryId === categoryId && p.id !== currentProductId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="mb-6 text-3xl font-bold">Produtos relacionados</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
