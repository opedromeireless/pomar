import { createClient } from "@/lib/supabase/server";
import { categories } from "@/lib/data/categorias";
import type { Product } from "@/lib/types";

function mapProduct(row: any): Product {
  const category = categories.find((c) => c.dbValue === row.categoria);

  return {
    id: row.id,
    slug: row.slug,
    name: row.nome,
    description: row.descricao ?? "",
    price: Number(row.preco),
    unit: row.unidade,
    stock: row.estoque,
    categoryId: category?.id ?? "",
    producerId: row.produtor_id,
    imageUrl: row.imagem_url ?? "/products/placeholder.jpg",
    isAvailable: row.estoque > 0,
  };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapProduct(data) : null;
}

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("categoria", category.dbValue);

  if (error) throw error;
  return (data ?? []).map(mapProduct);
}

export async function getProductsByProducer(
  producerId: string,
): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("produtor_id", producerId);

  if (error) throw error;
  return (data ?? []).map(mapProduct);
}
