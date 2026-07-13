import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getCategoryBySlug } from "@/lib/data/categorias";
import { getProductsByCategory } from "@/lib/data/produtos";
import { ProductCard } from "@/components/product/product-card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = await getProductsByCategory(slug);

  return (
    <main className="bg-paper">
      <Header />

      <Container className="py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-forest"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-forest">
          Categoria
        </p>
        <h1 className="mt-2 font-display text-4xl font-medium text-ink">
          {category.name}
        </h1>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categoryProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {categoryProducts.length === 0 && (
          <p className="text-ink/60">Nenhum produto nessa categoria ainda.</p>
        )}
      </Container>

      <Footer />
    </main>
  );
}
