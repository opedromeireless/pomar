import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";

import { getProducerBySlug } from "@/lib/data/produtores";
import { getProductsByProducer } from "@/lib/data/produtos";
import { ProductCard } from "@/components/product/product-card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";

type ProducerPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProducerPage({ params }: ProducerPageProps) {
  const { slug } = await params;

  const producer = await getProducerBySlug(slug);
  if (!producer) notFound();

  const producerProducts = await getProductsByProducer(producer.id);

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

        <div className="mt-8 flex flex-col items-start gap-6 border-b border-line pb-10 sm:flex-row sm:items-center">
          <span className="stamp flex h-20 w-20 rotate-3 items-center justify-center bg-white font-display text-3xl italic text-forest">
            {producer.name.charAt(0)}
          </span>

          <div>
            <h1 className="font-display text-4xl font-medium text-ink">
              {producer.name}
            </h1>
            <p className="mt-2 max-w-xl text-ink/65">{producer.description}</p>
            <p className="mt-3 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-forest">
              <MapPin className="h-3.5 w-3.5" />
              {producer.neighborhood} · {producer.city}
            </p>
          </div>
        </div>

        <h2 className="mt-10 mb-6 font-display text-2xl font-medium text-ink">
          Produtos de {producer.name}
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {producerProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {producerProducts.length === 0 && (
          <p className="text-ink/60">
            Esse produtor ainda não tem produtos cadastrados.
          </p>
        )}
      </Container>

      <Footer />
    </main>
  );
}
