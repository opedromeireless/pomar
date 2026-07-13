import { createClient } from "@/lib/supabase/server";
import type { Producer } from "@/types/producer";

function mapProducer(row: any): Producer {
  return {
    id: row.id,
    slug: row.slug,
    name: row.nome,
    city: row.cidade,
    neighborhood: row.bairro,
    description: row.descricao ?? "",
    whatsapp: row.whatsapp,
  };
}

export async function getProducers(): Promise<Producer[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("produtores").select("*");

  if (error) throw error;
  return (data ?? []).map(mapProducer);
}

export async function getProducerBySlug(
  slug: string,
): Promise<Producer | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("produtores")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapProducer(data) : null;
}

export async function getProducerById(id: string): Promise<Producer | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("produtores")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapProducer(data) : null;
}
