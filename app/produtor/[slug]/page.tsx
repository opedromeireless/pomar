import Link from "next/link";
import { notFound } from "next/navigation";

import { getProducerBySlug } from "@/lib/data/produtores";
import { getProductsByProducer } from "@/lib/data/produtos";
import { ProductCard } from "@/components/product/product-card";

type ProducerPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProducerPage({ params }: ProducerPageProps) {
  const { slug } = await params;

  const producer = await getProducerBySlug(slug);

  if (!producer) {
    notFound();
  }

  const producerProducts = await getProductsByProducer(producer.id);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link href="/" className="mb-8 inline-block font-semibold text-green-700">
        ← Voltar
      </Link>

      <div className="rounded-3xl border bg-white p-8">
        <div className="mb-8 flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-4xl font-bold text-green-700">
            {producer.name.charAt(0)}
          </div>

          <div>
            <h1 className="text-4xl font-bold">{producer.name}</h1>
            <p className="mt-2 text-gray-600">{producer.description}</p>
            <p className="mt-3">📍 {producer.city}</p>
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold">Produtos</h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {producerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
