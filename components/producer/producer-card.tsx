import Link from "next/link";
import type { Producer } from "@/types/producer";

type ProducerCardProps = {
  producer: Producer;
};

export function ProducerCard({ producer }: ProducerCardProps) {
  return (
    <Link
      href={`/produtor/${producer.slug}`}
      className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-lg font-bold text-green-700">
        {producer.name.charAt(0)}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-zinc-900">{producer.name}</h3>
        <p className="line-clamp-2 text-sm text-zinc-600">
          {producer.description}
        </p>
        <p className="text-sm text-zinc-500">
          {producer.neighborhood} • {producer.city}
        </p>
      </div>
    </Link>
  );
}
