import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

import { categories } from "@/lib/data/categorias";
import { getProducts } from "@/lib/data/produtos";
import { getProducers } from "@/lib/data/produtores";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { ProducerCard } from "@/components/producer/producer-card";

export default async function HomePage() {
  const products = await getProducts();
  const producers = await getProducers();

  const stats = [
    { value: `${products.length}+`, label: "produtos cadastrados" },
    { value: `${producers.length}+`, label: "produtores locais" },
    { value: `${categories.length}`, label: "categorias iniciais" },
  ];

  return (
    <main className="bg-paper">
      <Header />

      <section className="bg-forest text-paper">
        <Container className="py-20 lg:py-28">
          <span
            className="stamp animate-fade-up inline-flex items-center gap-2 bg-forest px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-mustard"
            style={{ animationDelay: "0ms" }}
          >
            <Leaf className="h-3.5 w-3.5" />
            Feira virtual de Ivoti
          </span>

          <h1
            className="animate-fade-up mt-7 max-w-3xl font-display text-4xl font-medium leading-[1.1] sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "90ms" }}
          >
            Compre direto de quem{" "}
            <span className="italic text-mustard">planta, colhe e cultiva</span>{" "}
            em Ivoti.
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-paper/75"
            style={{ animationDelay: "180ms" }}
          >
            O Pomar conecta famílias, sítios e pequenos produtores a
            consumidores que querem comprar verduras, frutas, flores e produtos
            frescos da região — com mais confiança, proximidade e frescor.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "270ms" }}
          >
            <Link
              href="#produtos"
              className="inline-flex items-center justify-center rounded-full bg-mustard px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-mustard-dark"
            >
              Explorar produtos
            </Link>

            <Link
              href="/painel/login"
              className="inline-flex items-center justify-center rounded-full border border-paper/30 px-7 py-3.5 text-sm font-semibold text-paper transition hover:border-paper hover:bg-paper/10"
            >
              Sou produtor
            </Link>
          </div>

          <div
            className="animate-fade-up mt-16 grid gap-6 border-t border-paper/15 pt-8 sm:grid-cols-3"
            style={{ animationDelay: "360ms" }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-3xl font-medium text-mustard">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-paper/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-forest">
            Categorias
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categoria/${category.slug}`}
                className="stamp px-6 py-2.5 text-sm font-medium text-ink/80 transition hover:bg-forest hover:text-paper"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="produtos" className="py-8">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-4 border-b border-line pb-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-forest">
                Catálogo inicial
              </p>
              <h2 className="mt-2 font-display text-3xl font-medium text-ink">
                Produtos em destaque
              </h2>
            </div>

            <Link
              href="#produtores"
              className="hidden items-center gap-2 text-sm font-semibold text-forest transition hover:gap-3 md:inline-flex"
            >
              Ver produtores
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <section id="produtores" className="mt-8 bg-white py-16">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-forest">
            Rede local
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium text-ink">
            Produtores participantes
          </h2>
          <p className="mt-3 max-w-2xl text-ink/65">
            Cada produtor tem seu próprio perfil, catálogo, pedidos e área de
            gestão.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {producers.map((producer) => (
              <ProducerCard key={producer.id} producer={producer} />
            ))}
          </div>
        </Container>
      </section>

      <section id="como-funciona" className="py-20">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-forest">
            Fluxo do produto
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium text-ink">
            Como o Pomar funciona
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
            {[
              {
                n: "01",
                title: "Descoberta",
                text: "O cliente encontra produtores locais, explora categorias e navega pelos produtos.",
              },
              {
                n: "02",
                title: "Pedido",
                text: "O usuário adiciona itens ao carrinho e finaliza o pedido direto pelo WhatsApp do produtor.",
              },
              {
                n: "03",
                title: "Gestão",
                text: "O produtor acompanha pedidos, organiza o catálogo e gerencia a disponibilidade.",
              },
            ].map((step) => (
              <div key={step.n} className="relative pl-2">
                <p className="font-display text-4xl italic text-mustard">
                  {step.n}
                </p>
                <h3 className="mt-3 font-display text-xl font-medium text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
