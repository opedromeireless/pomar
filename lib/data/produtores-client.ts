"use client";

import { createClient } from "@/lib/supabase/client";
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

export async function getProducersClient(): Promise<Producer[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("produtores").select("*");

  if (error) throw error;
  return (data ?? []).map(mapProducer);
}
