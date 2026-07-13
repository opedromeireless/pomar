import { Search } from "lucide-react";
import { getProducts } from "@/lib/data/produtos";
import { ProductCard } from "@/components/product/product-card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;

  const allProducts = await getProducts();
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <main className="bg-paper">
      <Header />

      <Container className="py-12">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-forest">
          <Search className="h-3.5 w-3.5" />
          Resultado da busca
        </p>
        <h1 className="mt-2 font-display text-4xl font-medium text-ink">
          {q ? `“${q}”` : "Todos os produtos"}
        </h1>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-ink/60">
            Nenhum produto encontrado para essa busca.
          </p>
        )}
      </Container>

      <Footer />
    </main>
  );
}
