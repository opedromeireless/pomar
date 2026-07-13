import Link from "next/link";
import { Sprout } from "lucide-react";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="mt-24 bg-forest text-paper">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="stamp flex h-10 w-10 items-center justify-center text-paper">
              <Sprout className="h-4 w-4" />
            </span>
            <span className="font-display text-xl italic">Pomar</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/70">
            Marketplace hiperlocal que conecta produtores familiares de Ivoti
            diretamente aos moradores da região.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-mustard">
            Navegação
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-paper/80">
            <Link href="/#produtos" className="w-fit hover:text-mustard">
              Produtos
            </Link>
            <Link href="/#produtores" className="w-fit hover:text-mustard">
              Produtores
            </Link>
            <Link href="/painel/login" className="w-fit hover:text-mustard">
              Sou produtor
            </Link>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-mustard">
            Origem
          </p>
          <p className="mt-4 text-sm leading-relaxed text-paper/80">
            Feito em Ivoti, Rio Grande do Sul.
            <br />
            Projeto piloto de comércio local digital.
          </p>
        </div>
      </Container>

      <div className="border-t border-paper/10 py-5">
        <Container className="text-center font-mono text-[11px] uppercase tracking-widest text-paper/50">
          Pomar · do produtor para a sua mesa
        </Container>
      </div>
    </footer>
  );
}
