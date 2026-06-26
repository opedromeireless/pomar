import Link from "next/link";
import { ArrowRight, Leaf, MapPin, ShoppingBasket } from "lucide-react";

import { categories, producers, products } from "@/data/mock-data";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { ProducerCard } from "@/components/producer/producer-card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2] text-zinc-900">
      <Header />

      <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-lime-50 via-[#f7f6f2] to-[#f7f6f2]">
        <Container className="grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-800">
              <Leaf className="h-4 w-4" />
              Marketplace local para produtores e consumidores
            </div>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              Compre de produtores locais com mais confiança, proximidade e
              frescor.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
              O Pomar conecta famílias, sítios e pequenos produtores a
              consumidores que querem comprar verduras, frutas, flores e
              produtos frescos da região.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#produtos"
                className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Explorar produtos
              </a>

              <Link
                href="/painel/login"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
              >
                Sou produtor
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-zinc-900">
                  {products.length}+
                </p>
                <p className="text-sm text-zinc-600">produtos cadastrados</p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-zinc-900">
                  {producers.length}+
                </p>
                <p className="text-sm text-zinc-600">produtores locais</p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-zinc-900">
                  {categories.length}
                </p>
                <p className="text-sm text-zinc-600">categorias iniciais</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="grid w-full max-w-2xl grid-cols-2 gap-4">
              <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <ShoppingBasket className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">
                  Compra simples
                </h3>
                <p className="mt-2 text-sm text-zinc-600">
                  Navegue pelos produtos, monte seu carrinho e finalize o pedido
                  de forma prática.
                </p>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">
                  Foco local
                </h3>
                <p className="mt-2 text-sm text-zinc-600">
                  Valorize produtores da sua região e fortaleça a economia
                  local.
                </p>
              </div>

              <div className="col-span-2 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <p className="mb-3 text-sm font-medium uppercase tracking-wide text-green-700">
                  Visão do projeto
                </p>
                <h3 className="text-2xl font-bold text-zinc-900">
                  Um marketplace hiperlocal pensado para escalar.
                </h3>
                <p className="mt-3 max-w-2xl text-zinc-600">
                  O portfólio do Pomar foi desenhado para demonstrar arquitetura
                  de produto, modelagem de domínio, catálogo, carrinho,
                  checkout, painel do produtor e integração com backend moderno.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-16">
        <h2 className="mb-6 text-3xl font-bold">Categorias</h2>

        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className="rounded-full border px-6 py-3 transition hover:bg-green-600 hover:text-white"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section id="produtos" className="py-16">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
                Catálogo inicial
              </p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-900">
                Produtos em destaque
              </h2>
            </div>

            <a
              href="#produtores"
              className="hidden items-center gap-2 text-sm font-semibold text-green-700 md:inline-flex"
            >
              Ver produtores
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <section
        id="produtores"
        className="border-y border-zinc-200 bg-white py-16"
      >
        <Container>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
              Rede local
            </p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-900">
              Produtores participantes
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-600">
              Cada produtor terá seu próprio perfil, catálogo, pedidos e área de
              gestão.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {producers.map((producer) => (
              <ProducerCard key={producer.id} producer={producer} />
            ))}
          </div>
        </Container>
      </section>

      <section id="como-funciona" className="py-16">
        <Container>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
              Fluxo do produto
            </p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-900">
              Como o Pomar vai funcionar
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-green-700">01</p>
              <h3 className="text-xl font-semibold text-zinc-900">
                Descoberta
              </h3>
              <p className="mt-2 text-zinc-600">
                O cliente encontra produtores locais, explora categorias e
                navega pelos produtos.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-green-700">02</p>
              <h3 className="text-xl font-semibold text-zinc-900">Pedido</h3>
              <p className="mt-2 text-zinc-600">
                O usuário adiciona itens ao carrinho, informa os dados e
                finaliza o pedido.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-green-700">03</p>
              <h3 className="text-xl font-semibold text-zinc-900">Gestão</h3>
              <p className="mt-2 text-zinc-600">
                O produtor acompanha pedidos, organiza catálogo e gerencia
                disponibilidade.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
