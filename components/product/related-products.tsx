import { getProducts } from "@/lib/data/produtos";
import { ProductCard } from "./product-card";

type RelatedProductsProps = {
  categoryId: string;
  currentProductId: string;
};

export async function RelatedProducts({
  categoryId,
  currentProductId,
}: RelatedProductsProps) {
  const allProducts = await getProducts();
  const related = allProducts
    .filter((p) => p.categoryId === categoryId && p.id !== currentProductId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-24 border-t border-line pt-12">
      <p className="font-mono text-xs uppercase tracking-widest text-forest">
        Você também pode gostar
      </p>
      <h2 className="mt-2 font-display text-3xl font-medium text-ink">
        Produtos relacionados
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {related.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
