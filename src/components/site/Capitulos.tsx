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
// A passagem 02 -> 03 é a exceção ao fluxo normal: o capítulo 03 começa 60vh antes
// para cobrir o palco das peças. Por isso a navegação não pode olhar apenas a caixa
// da seção. Ela troca de capítulo quando a entrega visual realmente muda de dono.
const ENTREGA_COMECA_ESTRADA = 0.38;
const ENTREGA_ESTRADA_DOMINANTE = 0.64;
export const CAPITULOS = [
  { id: "cap-casa", destino: "cap-casa", num: "01", rotulo: "A casa" },
  { id: "cap-marcas", destino: "marcas-inicio", num: "02", rotulo: "As marcas" },
  { id: "cap-estrada", destino: "cap-estrada", num: "03", rotulo: "A estrada" },
  { id: "cap-nome", destino: "cap-nome", num: "04", rotulo: "O nome" },
] as const;

export function NavCapitulos() {
  const [ativo, setAtivo] = useState<string>(CAPITULOS[0].id);
  const marcado = useRef<string>(CAPITULOS[0].id);

  useEffect(() => {
    const casa = document.getElementById("cap-casa");
    const marcas = document.getElementById("cap-marcas");
    const nome = document.getElementById("cap-nome");
    if (!casa || !marcas || !nome) return;

    let pedido = 0;
    const marcar = (id: string) => {
      if (id === marcado.current) return;
      marcado.current = id;
      setAtivo(id);
    };
    const medir = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        const linhaDeTroca = window.innerHeight * 0.55;
        const entrega = parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--entrega"),
        ) || 0;

        // O Nome volta ao critério geométrico porque já não divide palco com
        // outro capítulo. Estrada usa o relógio da entrega: sua margem negativa
        // cruza o centro cedo demais, enquanto a quinta peça ainda manda no quadro.
        if (nome.getBoundingClientRect().top <= linhaDeTroca) {
          marcar("cap-nome");
        } else if (entrega >= ENTREGA_ESTRADA_DOMINANTE) {
          marcar("cap-estrada");
        } else if (marcas.getBoundingClientRect().top <= linhaDeTroca) {
          marcar("cap-marcas");
        } else {
          marcar("cap-casa");
        }
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
    <nav className="cap-nav" aria-label="Capítulos">
      <ul>
        {CAPITULOS.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.destino}`}
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
        // Entradas editoriais usam a caixa de cada bloco. O relógio do capítulo
        // continua governando a passagem entre cenas; ele não pode antecipar o
        // texto que ainda está abaixo da dobra, sobretudo no celular.
        el.querySelectorAll<HTMLElement>("[data-revela]").forEach((bloco) => {
          const caixa = bloco.getBoundingClientRect();
          const local = (vh - caixa.top) / (vh * 0.32);
          bloco.style.setProperty("--revela", String(Math.min(1, Math.max(0, local))));
        });
        // 0 quando o topo encosta no rodapé da tela; 1 quando sobe 62% da viewport.
        // A faixa de 62% é a mesma do Movimento 2 da SoftHam — larga o bastante para
        // duas seções dividirem a tela por um instante, que é o que evita corte seco.
        // MEDIDO no fim da página: o capítulo 04 fica com topo=216 numa viewport
        // de 900, e esta fórmula dá 1.225 — ela chega a 1 sozinha, inclusive no
        // último capítulo. Tentei "consertar" isso com uma janela de fim de página
        // e foi o conserto que quebrou o gesto (--cap-entra caiu de 0.97 p/ 0.13).
        let t = (vh - r.top) / (vh * 0.62);

        // A PASSAGEM DO PALCO GOVERNA O CAPITULO 03 (05/09).
        //
        // O cap 03 comeca 60vh antes de a pista do palco acabar (margin-top
        // negativa no CSS) e pinta por cima dele. Se ele usasse a PROPRIA
        // medida aqui, ja estaria 53% revelado no instante em que a passagem
        // comeca — cobrindo o texto do palco antes da hora.
        // Entao, enquanto a entrega corre (0 -> 1), e ELA que abre o capitulo.
        // A abertura começa em 0,38: antes disso a quinta peça ainda é o quadro,
        // e revelar qualquer faixa do mapa cria exatamente a sobreposição errada
        // vista na auditoria pós-D36. De 0,38 a 1 a nova cena cobre a anterior;
        // existe coexistência, mas o capítulo 03 não nasce como rodapé fantasma.
        // Reversivel: ao voltar, a entrega cai e o capitulo fecha de novo.
        if (el.id === "cap-estrada") {
          const e = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--entrega"),
          ) || 0;
          const passagem = Math.min(
            1,
            Math.max(0, (e - ENTREGA_COMECA_ESTRADA) / (1 - ENTREGA_COMECA_ESTRADA)),
          );
          t = e >= 0.98 ? Math.max(t, 1) : passagem;
        }
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
