import Link from "next/link";
import { notFound } from "next/navigation";

import { getCategoryBySlug } from "@/lib/data/categorias";
import { getProductsByCategory } from "@/lib/data/produtos";
import { ProductCard } from "@/components/product/product-card";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = await getProductsByCategory(slug);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link href="/" className="mb-8 inline-block font-semibold text-green-700">
        ← Voltar
      </Link>

      <h1 className="text-4xl font-bold">{category.name}</h1>

      <p className="mt-2 mb-8 text-gray-600">
        Produtos da categoria {category.name}
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {categoryProducts.length === 0 && (
        <p className="text-gray-600">Nenhum produto nessa categoria ainda.</p>
      )}
    </main>
  );
}
