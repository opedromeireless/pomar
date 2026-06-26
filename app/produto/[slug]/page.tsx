import { notFound } from "next/navigation";
import { products, producers } from "@/data/mock-data";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const producer = producers.find((item) => item.id === product?.producerId);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square rounded-3xl bg-green-100" />

        <div>
          <h1 className="text-5xl font-bold">{product.name}</h1>

          <p className="mt-4 text-3xl font-bold text-green-700">
            R$ {product.price.toFixed(2)}
          </p>

          <p className="mt-6 text-gray-600">{product.description}</p>

          <div className="mt-8 space-y-2 rounded-2xl border p-5">
            <p>
              <strong>Unidade:</strong> {product.unit}
            </p>

            <p>
              <strong>Estoque:</strong> {product.stock}
            </p>

            <p>
              <strong>Produtor:</strong> {producer?.name}
            </p>

            <p>
              <strong>Cidade:</strong> {producer?.city}
            </p>
          </div>

          <button className="mt-8 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700">
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </main>
  );
}
