import { useEffect, useRef, useState } from "react";
import { empresa } from "@/lib/dados";
import { som } from "@/lib/som";

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
  const [mostrarContato, setMostrarContato] = useState(false);
  const [somAtivo, setSomAtivo] = useState(false);
  const marcado = useRef<string>(CAPITULOS[0].id);
  const contatoMarcado = useRef(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setSomAtivo(som.estaAtivo);
  }, []);

  const alternarSom = () => {
    const prox = som.alternar();
    setSomAtivo(prox);
  };

  useEffect(() => {
    const casa = document.getElementById("cap-casa");
    const marcas = document.getElementById("cap-marcas");
    const nome = document.getElementById("cap-nome");
    const fecho = document.querySelector<HTMLElement>(".fecho");
    if (!casa || !marcas || !nome) return;

    let pedido = 0;
    let ultimoTemaClaro: boolean | null = null;
    let ultimoChaoNav = "";
    // O VÉU DA NAV TOMA O CHÃO DO CAPÍTULO VISÍVEL SOB ELA.
    // Quando a página está no Hero (#08090c, antes da cápsula clara de A Casa
    // cobrir a coluna da nav), o véu permanece escuro. Assim que A Casa (#edf2f7)
    // assume, a nav recebe `data-nav-tema="claro"` e adapta tinta/contraste AA.
    const atualizarTemaNav = (idAtivo: string, emCasaClara: boolean) => {
      const nav = navRef.current;
      if (!nav) return;
      if (emCasaClara !== ultimoTemaClaro) {
        ultimoTemaClaro = emCasaClara;
        if (emCasaClara) {
          nav.setAttribute("data-nav-tema", "claro");
        } else {
          nav.removeAttribute("data-nav-tema");
        }
      }
      let chao = "#08090c";
      if (emCasaClara) {
        chao = "#edf2f7";
      } else if (idAtivo !== "cap-casa") {
        const secao = document.getElementById(idAtivo);
        const lido = secao ? getComputedStyle(secao).getPropertyValue("--br-chao").trim() : "";
        if (lido) chao = lido;
      }
      if (chao !== ultimoChaoNav) {
        ultimoChaoNav = chao;
        nav.style.setProperty("--nav-chao", chao);
      }
    };
    const marcar = (id: string) => {
      if (id === marcado.current) return;
      marcado.current = id;
      setAtivo(id);
    };
    const medir = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        const vh = window.innerHeight;
        const linhaDeTroca = vh * 0.55;
        const entrega = parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--entrega"),
        ) || 0;

        const rCasa = casa.getBoundingClientRect();
        const rMarcas = marcas.getBoundingClientRect();
        const rNome = nome.getBoundingClientRect();

        // O Nome volta ao critério geométrico porque já não divide palco com
        // outro capítulo. Estrada usa o relógio da entrega: sua margem negativa
        // cruza o centro cedo demais, enquanto a quinta peça ainda manda no quadro.
        if (rNome.top <= linhaDeTroca) {
          marcar("cap-nome");
        } else if (entrega >= ENTREGA_ESTRADA_DOMINANTE) {
          marcar("cap-estrada");
        } else if (rMarcas.top <= linhaDeTroca) {
          marcar("cap-marcas");
        } else {
          marcar("cap-casa");
        }

        // A coluna da nav fica sobre o papel claro (#edf2f7) de A Casa quando a
        // cápsula do Hero terminou de abrir (--passa >= 0.68) ou o topo de A Casa
        // já subiu, até o monólito escuro de As Marcas cruzar a linha de troca.
        const passaHero = parseFloat(casa.style.getPropertyValue("--passa")) || 0;
        const emCasaClara =
          marcado.current === "cap-casa" &&
          (passaHero >= 0.68 || rCasa.top <= vh * 0.65) &&
          rMarcas.top > linhaDeTroca;
        atualizarTemaNav(marcado.current, emCasaClara);

        // D-38: Contato persistente durante a travessia (entre o CTA do Hero e o FechoFabio)
        const passouHero = window.scrollY > vh * 0.72;
        const antesDoFecho = !fecho || fecho.getBoundingClientRect().top > vh * 0.72;
        const visivel = passouHero && antesDoFecho;
        if (visivel !== contatoMarcado.current) {
          contatoMarcado.current = visivel;
          setMostrarContato(visivel);
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
    <nav className="cap-nav" aria-label="Capítulos" ref={navRef}>
      <ul>
        {CAPITULOS.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.destino}`}
              className={ativo === c.id ? "is-aqui" : undefined}
              aria-current={ativo === c.id ? "true" : undefined}
              onPointerEnter={() => som.tique()}
              onClick={() => som.clique()}
            >
              <b>{c.num}</b>
              <span>{c.rotulo}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="cap-nav__extras">
        <a
          href={empresa.celular.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`cap-nav__contato${mostrarContato ? " is-visivel" : ""}`}
          aria-label="Falar com a Borçato pelo WhatsApp"
          tabIndex={mostrarContato ? 0 : -1}
          onPointerEnter={() => som.tique()}
          onClick={() => som.clique()}
        >
          <i aria-hidden>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </i>
          <span>Contato</span>
        </a>
        <button
          type="button"
          className={`cap-nav__som${somAtivo ? " is-ativo" : ""}`}
          onClick={alternarSom}
          aria-label={somAtivo ? "Desativar áudio mecânico tátil" : "Ativar áudio mecânico tátil"}
          title={somAtivo ? "Áudio mecânico ativo" : "Ativar áudio tátil"}
        >
          <span className="cap-nav__som-barras" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="cap-nav__som-txt">{somAtivo ? "SOM ON" : "SOM OFF"}</span>
        </button>
      </div>
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
    let ultimoCap = "";
    let ultimoSai = "";
    const ultimosRevela = new WeakMap<HTMLElement, string>();
    const capCasa = el.id === "cap-marcas" ? document.getElementById("cap-casa") : null;
    const capEstrada = el.id === "cap-nome" ? document.getElementById("cap-estrada") : null;

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
          const val = Math.min(1, Math.max(0, local)).toFixed(4);
          if (ultimosRevela.get(bloco) !== val) {
            ultimosRevela.set(bloco, val);
            bloco.style.setProperty("--revela", val);
          }
        });
        // 0 quando o topo encosta no rodapé da tela; 1 quando sobe 62% da viewport.
        let t = (vh - r.top) / (vh * 0.62);

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
        const capVal = Math.min(1, Math.max(0, t)).toFixed(4);
        if (capVal !== ultimoCap) {
          ultimoCap = capVal;
          el.style.setProperty("--cap-entra", capVal);
        }

        // Recuo em profundidade da cena anterior enquanto o painel atual sobe
        if (capCasa) {
          const saiVal = Math.min(1, Math.max(0, (vh * 0.74 - r.top) / (vh * 0.62))).toFixed(4);
          if (saiVal !== ultimoSai) {
            ultimoSai = saiVal;
            capCasa.style.setProperty("--casa-sai", saiVal);
          }
        } else if (capEstrada) {
          const saiVal = Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (vh * 0.68))).toFixed(4);
          if (saiVal !== ultimoSai) {
            ultimoSai = saiVal;
            capEstrada.style.setProperty("--estrada-sai", saiVal);
          }
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
    <section id={id} ref={ref} className={className ? `cap ${className}` : "cap"}>
      {children}
    </section>
  );
}
