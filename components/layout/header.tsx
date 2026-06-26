import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { Container } from "./container";
import { Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-600 text-white shadow-sm">
            <ShoppingBasket className="h-5 w-5" />
          </div>
          <form
            action="/busca"
            className="hidden flex-1 justify-center lg:flex"
          >
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

              <input
                type="text"
                name="q"
                placeholder="Pesquisar produtos..."
                className="w-full rounded-xl border py-2 pl-10 pr-4"
              />
            </div>
          </form>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold text-zinc-900">Pomar</span>
            <span className="text-xs text-zinc-500">
              Do produtor para a sua mesa
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#produtos"
            className="text-sm font-medium text-zinc-700 transition hover:text-green-700"
          >
            Produtos
          </a>
          <a
            href="#produtores"
            className="text-sm font-medium text-zinc-700 transition hover:text-green-700"
          >
            Produtores
          </a>
          <a
            href="#como-funciona"
            className="text-sm font-medium text-zinc-700 transition hover:text-green-700"
          >
            Como funciona
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/painel/login"
            className="hidden rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 md:inline-flex"
          >
            Área do produtor
          </Link>

          <Link
            href="/carrinho"
            className="inline-flex rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Carrinho
          </Link>
        </div>
      </Container>
    </header>
  );
}
