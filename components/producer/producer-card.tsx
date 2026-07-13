import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Producer } from "@/types/producer";

export function ProducerCard({ producer }: { producer: Producer }) {
  return (
    <Link
      href={`/produtor/${producer.slug}`}
      className="group rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-forest hover:shadow-[0_18px_40px_-24px_rgba(31,77,55,0.3)]"
    >
      <span className="stamp flex h-14 w-14 rotate-3 items-center justify-center bg-paper font-display text-xl italic text-forest transition group-hover:rotate-0">
        {producer.name.charAt(0)}
      </span>

      <h3 className="mt-4 font-display text-lg font-medium text-ink">
        {producer.name}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink/65">
        {producer.description}
      </p>

      <p className="mt-4 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink/50">
        <MapPin className="h-3.5 w-3.5 text-forest" />
        {producer.neighborhood} · {producer.city}
      </p>
    </Link>
  );
}
