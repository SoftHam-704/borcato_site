import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import logo from "@/assets/hm-borcato-logo.png";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img
              src={logo}
              alt="H.M. Borçato"
              className="h-12 w-auto rounded-sm bg-ink-foreground p-1.5"
            />
            <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-ink-soft">
              Representação comercial e marketing de autopeças para todo o estado de Minas Gerais.
            </p>
          </div>
          <div>
            <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">Navegação</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/empresa", label: "Empresa" },
                { to: "/servicos", label: "Serviços" },
                { to: "/noticias", label: "Notícias" },
                { to: "/contato", label: "Contato" },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-ink-foreground/80 transition-colors hover:text-primary-glow">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">Contato</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="mailto:contato@hmborcato.com.br" className="inline-flex items-center gap-2 text-ink-foreground/80 transition-colors hover:text-primary-glow">
                  <Mail className="size-4" aria-hidden /> contato@hmborcato.com.br
                </a>
              </li>
              <li>
                <a href="tel:+553131461975" className="inline-flex items-center gap-2 text-ink-foreground/80 transition-colors hover:text-primary-glow">
                  <Phone className="size-4" aria-hidden /> (31) 3146-1975
                </a>
              </li>
              <li>
                <a href="tel:+5531996568022" className="inline-flex items-center gap-2 text-ink-foreground/80 transition-colors hover:text-primary-glow">
                  <Phone className="size-4" aria-hidden /> (31) 99656-8022
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-ink-foreground/10 pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © H.M. Borçato Representação Comercial e Marketing — 2026. Todos os direitos reservados.</p>
          <p>Belo Horizonte · Minas Gerais · Brasil</p>
        </div>
      </div>
    </footer>
  );
}
