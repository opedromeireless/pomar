import Link from "next/link";
import { Sprout } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <main className="bg-paper">
      <Header />
      <Container className="flex flex-col items-center justify-center py-32 text-center">
        <span className="stamp flex h-16 w-16 items-center justify-center text-forest">
          <Sprout className="h-7 w-7" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-medium text-ink">
          Não encontramos essa página
        </h1>
        <p className="mt-2 max-w-sm text-ink/65">
          O produto ou produtor que você procura pode ter sido removido ou o
          link está incorreto.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center rounded-full bg-forest px-7 py-3 text-sm font-semibold text-paper transition hover:bg-forest-light"
        >
          Voltar para a home
        </Link>
      </Container>
      <Footer />
    </main>
  );
}
