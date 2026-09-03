import { useEffect, useRef, useState } from "react";

// A ESPINHA da travessia — direção "A DISTÂNCIA", referência Grigoletto #26 (Ferrari).
//
// A nav do site antigo era de PÁGINAS (Home · Empresa · Serviços · Notícias · Contato).
// Isso é índice de site institucional: não conta nada, e some quando o visitante rola.
// No Ferrari a nav é de CAPÍTULOS DE CONTEÚDO (Performance · Technology · Interior ·
// Experience) — ela já narra o que vem antes de você rolar, e vira mapa da travessia.
//
// Aqui os quatro capítulos SÃO a história do Fábio, na ordem em que ela convence:
// quem é → o que carrega → até onde vai → por que se chama assim.
//
// O rótulo do capítulo ativo é escrito por IntersectionObserver, e aqui ele SERVE:
// diferente do leque da SoftHam (onde o elemento vive dentro de palco preso e o
// observer disparava cedo demais), estas seções estão em fluxo normal de documento.
export const CAPITULOS = [
  { id: "cap-casa", num: "01", rotulo: "A casa" },
  { id: "cap-marcas", num: "02", rotulo: "As marcas" },
  { id: "cap-estrada", num: "03", rotulo: "A estrada" },
  { id: "cap-nome", num: "04", rotulo: "O nome" },
] as const;

export function NavCapitulos() {
  const [ativo, setAtivo] = useState<string>(CAPITULOS[0].id);
  const marcado = useRef<string>(CAPITULOS[0].id);

  useEffect(() => {
    const alvos = CAPITULOS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!alvos.length) return;

    const io = new IntersectionObserver(
      (entradas) => {
        // a seção que ocupa a faixa central da tela é a que manda
        for (const e of entradas) {
          if (e.isIntersecting && e.target.id !== marcado.current) {
            marcado.current = e.target.id;
            setAtivo(e.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    alvos.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="cap-nav" aria-label="Capítulos">
      <ul>
        {CAPITULOS.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              className={ativo === c.id ? "is-aqui" : undefined}
              aria-current={ativo === c.id ? "true" : undefined}
            >
              <b>{c.num}</b>
              <span>{c.rotulo}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface CapituloProps {
  id: string;
  children: React.ReactNode;
  /** classe extra da seção, para o gesto próprio de cada capítulo */
  className?: string;
}

/**
 * Um capítulo da travessia.
 *
 * `--cap-entra` vai de 0 a 1 conforme a seção sobe pela tela, e é a partir DELA que cada
 * capítulo compõe o seu próprio gesto no CSS. Mesmo padrão do Movimento 2 da SoftHam: o
 * JS escreve só o número, o CSS decide o que fazer com ele — assim cada capítulo pode ter
 * um gesto DIFERENTE sem que este componente saiba de nenhum deles.
 */
export function Capitulo({ id, children, className }: CapituloProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--cap-entra", "1");
      return;
    }

    let pedido = 0;
    const medir = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 quando o topo encosta no rodapé da tela; 1 quando sobe 62% da viewport.
        // A faixa de 62% é a mesma do Movimento 2 da SoftHam — larga o bastante para
        // duas seções dividirem a tela por um instante, que é o que evita corte seco.
        const t = (vh - r.top) / (vh * 0.62);
        el.style.setProperty("--cap-entra", String(Math.min(1, Math.max(0, t))));
      });
    };
    medir();
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    <section id={id} ref={ref} className={className ? `cap ${className}` : "cap"}>
      {children}
    </section>
  );
}
