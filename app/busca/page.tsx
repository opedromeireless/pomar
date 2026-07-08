import { getProducts } from "@/lib/data/produtos";
import { ProductCard } from "@/components/product/product-card";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;

  const allProducts = await getProducts();
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">Resultado da busca</h1>

      <p className="mb-8 text-gray-600">
        Pesquisando por: <strong>{q}</strong>
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && <p>Nenhum produto encontrado.</p>}
    </main>
  );
}
