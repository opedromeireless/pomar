import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Package } from "lucide-react";

import { getProductBySlug } from "@/lib/data/produtos";
import { getProducerById } from "@/lib/data/produtores";
import { categories } from "@/lib/data/categorias";
import { formatCurrency } from "@/lib/format/currency";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { RelatedProducts } from "@/components/product/related-products";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const producer = await getProducerById(product.producerId);
  const category = categories.find((c) => c.id === product.categoryId);

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

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={700}
              height={700}
              className="aspect-square w-full rounded-2xl object-cover shadow-[0_24px_60px_-30px_rgba(22,36,28,0.4)]"
            />
            {category && (
              <span className="stamp absolute -left-3 -top-3 -rotate-6 bg-paper px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-forest">
                {category.name}
              </span>
            )}
          </div>

          <div>
            <h1 className="font-display text-4xl font-medium text-ink sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 font-mono text-3xl font-medium text-forest">
              {formatCurrency(product.price)}
              <span className="ml-2 text-base font-normal text-ink/50">
                / {product.unit}
              </span>
            </p>

            <p className="mt-6 leading-relaxed text-ink/70">
              {product.description}
            </p>

            <div className="mt-8 space-y-4 rounded-2xl border border-line bg-white p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink/60">
                  <Package className="h-4 w-4" />
                  Estoque disponível
                </span>
                <span className="font-mono font-medium text-ink">
                  {product.stock} {product.unit}(s)
                </span>
              </div>

              <div className="ledger-line" />

              <div className="flex items-center justify-between text-sm">
                <span className="text-ink/60">Produtor</span>
                <Link
                  href={`/produtor/${producer?.slug}`}
                  className="font-medium text-forest hover:underline"
                >
                  {producer?.name}
                </Link>
              </div>

              <div className="ledger-line" />

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink/60">
                  <MapPin className="h-4 w-4" />
                  Localização
                </span>
                <span className="text-ink">
                  {producer?.neighborhood} · {producer?.city}
                </span>
              </div>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>

        <RelatedProducts
          categoryId={product.categoryId}
          currentProductId={product.id}
        />
      </Container>

      <Footer />
    </main>
  );
}
