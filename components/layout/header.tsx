"use client";

import { useState } from "react";
import Link from "next/link";
import { Sprout, Search, Menu, X, ShoppingBasket } from "lucide-react";
import { Container } from "./container";

const NAV_LINKS = [
  { href: "#produtos", label: "Produtos" },
  { href: "#produtores", label: "Produtores" },
  { href: "#como-funciona", label: "Como funciona" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="stamp flex h-11 w-11 items-center justify-center text-forest">
            <Sprout className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-medium italic text-forest">
              Pomar
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
              Feira de Ivoti
            </span>
          </span>
        </Link>

        <form action="/busca" className="hidden max-w-sm flex-1 lg:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              type="text"
              name="q"
              placeholder="Pesquisar produtos..."
              className="w-full rounded-full border border-line bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink/40 outline-none transition focus:border-forest"
            />
          </div>
        </form>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-ink/80 transition hover:text-forest"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-mustard transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/painel/login"
            className="rounded-full border border-line px-4 py-2.5 text-sm font-medium text-ink/80 transition hover:border-forest hover:text-forest"
          >
            Área do produtor
          </Link>
          <Link
            href="/carrinho"
            className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-forest-light"
          >
            <ShoppingBasket className="h-4 w-4" />
            Carrinho
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
          aria-label="Abrir menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {menuOpen && (
        <div className="border-t border-line bg-paper px-4 py-5 md:hidden">
          <form action="/busca" className="mb-5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
              <input
                type="text"
                name="q"
                placeholder="Pesquisar produtos..."
                className="w-full rounded-full border border-line bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-forest"
              />
            </div>
          </form>

          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-white"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/painel/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-white"
            >
              Área do produtor
            </Link>
            <Link
              href="/carrinho"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-forest px-4 py-3 text-sm font-semibold text-paper"
            >
              <ShoppingBasket className="h-4 w-4" />
              Ver carrinho
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
