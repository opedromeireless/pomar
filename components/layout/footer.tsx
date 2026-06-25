import { Container } from "./container";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200 bg-white">
      <Container className="flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-zinc-900">Pomar</p>
          <p className="text-sm text-zinc-600">
            Marketplace hiperlocal para aproximar produtores e consumidores.
          </p>
        </div>

        <div className="text-sm text-zinc-500">
          <p>
            Projeto de portfólio desenvolvido com Next.js, Tailwind e Supabase.
          </p>
        </div>
      </Container>
    </footer>
  );
}
