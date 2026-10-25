import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type UIEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { representadas } from "@/lib/dados";
import { pecaDe } from "./PecaNoCursor";
import { som } from "@/lib/som";

// A ESTEIRA DAS INDÚSTRIAS — a seção inteira anda de lado (ref. landonorris.com).
//
// O dono, sobre o Norris: "esse carrossel que roda a seção inteira é o máximo".
// E sobre a nossa barra de logos no hero: "muito pequeno". Aqui as onze ficam
// GRANDES, cada uma com o portal dela, e a esteira abre o capítulo 02 — as onze
// de uma vez; depois o palco detalha uma a uma. O palco fica.
//
// A MECÂNICA, medida no site dele (arsenal, 03/09): a seção gruda (sticky), o
// trilho recebe translateX negativo LINEAR 1:1 com a rolagem — cada pixel rolado
// para baixo move o trilho um pixel para o lado. A profundidade NÃO vem de 3D:
// vem das larguras desiguais dos cartões (lá: 264, 284, 589px) e de eles
// ficarem em alturas diferentes. É composição.
//
// Sem biblioteca: o padrão da casa (JS escreve a peça, CSS compõe) e a pista
// presa que o hero e o palco já usam.
//
// NO CELULAR e com movimento reduzido a esteira é LIVRE: rolagem horizontal
// nativa com snap, sem pino. Um trilho preso a scroll vertical no dedo é
// desorientador, e o toque já sabe arrastar de lado.

const logos = import.meta.glob<{ default: string }>("../../assets/marcas/*.png", {
  eager: true,
});

function arquivoDe(id: string): string | undefined {
  const chave = Object.keys(logos).find((k) => k.endsWith(`/${id}.png`));
  return chave ? logos[chave]?.default : undefined;
}

/** O PASSO da esteira: quanto o dedo anda em relação ao trilho. 1 = o Norris
 *  (1:1); 0,55 = a pista encurta 45% sem mudar o tamanho dos cartões.
 *  Ver o comentário em `medir()`. */
const PASSO = 0.55;

/** três larguras que se alternam: é isto que dá a leitura de profundidade */
const RITMO = ["m", "g", "p"] as const;
/** e três alturas, em ciclo deslocado do das larguras para não travarem juntas */
const ALTURA = ["meio", "alto", "baixo"] as const;

/** o vão que o parágrafo-ponte ocupava no fluxo, entre a esteira e o carro
 *  (MEDIDO em 4daebac: 303px a 1440×900, 154px a 375×812) */
const VAO_MESA = 300;
const VAO_CELULAR = 150;
/** a fração da pista do carro que corre DENTRO da moldura, antes de ela virar
 *  a tela inteira: cobre o desenho do carro e o começo da 1ª peça (~325px a
 *  1440×900, ~270px a 375×812). A linha do tempo do carro não é tocada — só
 *  se escolhe quanto dela acontece com a janela ainda abrindo. */
const ABERTURA = 0.095;
/** da fase presa antes da abertura, a fatia em que a moldura cresce; o resto
 *  é o respiro para ler o parágrafo, com a moldura ainda crescendo devagar */
const CRESCE = 0.55;
/** até aqui do crescimento os cartões ainda recebem clique e arrasto */
const TRAVA = 0.2;

const cl = (v: number) => Math.min(1, Math.max(0, v));

export function EsteiraMarcas({
  cabeca,
  passagem,
}: {
  cabeca?: ReactNode;
  /** o que aparece dentro da moldura, antes do carro (o parágrafo-ponte) */
  passagem?: ReactNode;
}) {
  const pistaRef = useRef<HTMLDivElement>(null);
  const cenaRef = useRef<HTMLDivElement>(null);
  const pranchaRef = useRef<HTMLDivElement>(null);
  const trilhoRef = useRef<HTMLUListElement>(null);
  const [movelAtiva, setMovelAtiva] = useState(0);
  // QUAL CARTÃO ESTÁ VIRADO — o laboratório (item 6, `#p7`) provou o gesto:
  // clicar vira o cartão e revela a peça que a marca fornece. Um índice só
  // (não um Set) porque abrir o próximo fecha o anterior — ver o próprio
  // `aria-expanded` do botão, que descreve um estado, não uma lista deles.
  const [virada, setVirada] = useState<number | null>(null);
  // O CARTÃO QUE A CÂMERA ATRAVESSA (passagem para o carro): o JS escolhe na
  // hora de entrar e avisa aqui, para a moldura mostrar a peça DAQUELA marca.
  // De saída, o último da fila — é o que o desktop tem na tela no fim da esteira.
  const [alvoPassagem, setAlvoPassagem] = useState(representadas.length - 1);

  const aoMoverCartao = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const btn = e.currentTarget;
    const r = btn.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    const rx = (0.5 - ny) * 6;
    const ry = (nx - 0.5) * 7;
    btn.style.setProperty("--card-rx", `${rx.toFixed(2)}deg`);
    btn.style.setProperty("--card-ry", `${ry.toFixed(2)}deg`);
    btn.style.setProperty("--card-lx", `${(nx * 100).toFixed(1)}%`);
    btn.style.setProperty("--card-ly", `${(ny * 100).toFixed(1)}%`);
  };

  const aoSairCartao = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    btn.style.setProperty("--card-rx", "0deg");
    btn.style.setProperty("--card-ry", "0deg");
  };

  const aoArrastar = (evento: UIEvent<HTMLDivElement>) => {
    const rolagem = evento.currentTarget;
    const itens = Array.from(
      rolagem.querySelectorAll<HTMLElement>(".esteira__item"),
    );
    if (!itens.length) return;
    const centro = rolagem.scrollLeft + rolagem.clientWidth / 2;
    let maisPerto = 0;
    let distancia = Number.POSITIVE_INFINITY;
    itens.forEach((item, i) => {
      const atual = Math.abs(item.offsetLeft + item.offsetWidth / 2 - centro);
      if (atual < distancia) {
        distancia = atual;
        maisPerto = i;
      }
    });
    setMovelAtiva((antes) => (antes === maisPerto ? antes : maisPerto));
  };

  useEffect(() => {
    const pista = pistaRef.current;
    const cena = cenaRef.current;
    const prancha = pranchaRef.current;
    const trilho = trilhoRef.current;
    if (!pista || !cena || !prancha || !trilho) return;

    const livre = window.matchMedia(
      "(max-width: 900px), (prefers-reduced-motion: reduce)",
    );
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    // a pista da cena do carro: a passagem a puxa para cima (`--entrar-recuo`)
    // e mede o topo dela para saber quando a cena grudou. Nada da linha do
    // tempo do carro é lido ou escrito — só a posição da pista.
    const carroPista = document.querySelector<HTMLElement>(".carro-onze");
    const carroCena = carroPista?.querySelector<HTMLElement>(".carro-onze__cena") ?? null;
    let pedido = 0;
    let sobra = 0;
    let respiro = 0;
    // a passagem (ver o comentário de VAO_MESA): onde começa a fase presa,
    // quanto dura e quanto dela corre com a cena do carro já grudada
    let passa = false;
    let inicio = 0;
    let fase = 0;
    let abertura = 1;
    // o cartão-alvo, medido SEM o empurrão da câmera (escala 1). Zerado sempre
    // que a passagem volta ao início: no celular o alvo muda com o dedo.
    let alvo: HTMLElement | null = null;
    let base: { t: number; d: number; b: number; e: number; ox: number; oy: number } | null =
      null;
    // só escreve o que mudou — fora da passagem, nada é reescrito por quadro
    const escrito = new Map<string, string>();
    const por = (el: HTMLElement, nome: string, valor: string) => {
      const chave = `${el === pista ? "p" : el === prancha ? "t" : "c"}${nome}`;
      if (escrito.get(chave) === valor) return;
      escrito.set(chave, valor);
      el.style.setProperty(nome, valor);
    };

    /** quanto o trilho excede a tela: é a distância que a rolagem percorre */
    const medir = () => {
      const vh = window.innerHeight;
      passa = !reduzido.matches && !!carroPista && !!carroCena;
      escrito.clear();
      base = null;
      if (livre.matches) {
        pista.classList.add("is-livre");
        pista.style.height = "";
        prancha.style.removeProperty("--esteira-x");
        sobra = 0;
      } else {
        pista.classList.remove("is-livre");
        sobra = Math.max(0, prancha.scrollWidth - cena.clientWidth);
        // A seção real primeiro termina de subir sobre A Casa. Só depois de
        // 18vh de quadro assentado a composição começa a viajar lateralmente.
        respiro = vh * 0.18;
        pista.style.height = `calc(100vh + ${Math.round(respiro + sobra * PASSO)}px)`;
        prancha.style.setProperty("--esteira-ato", "0");
        prancha.style.setProperty("--esteira-x", "0px");
        pista.style.setProperty("--esteira-t", "0");
      }

      if (passa && carroPista) {
        pista.classList.add("is-passagem");
        const altura = livre.matches ? cena.offsetHeight : vh;
        const topo = Math.min(0, vh - altura);
        inicio = livre.matches ? Math.max(0, altura - vh) : respiro + sobra * PASSO;
        abertura = Math.max(1, Math.round((carroPista.offsetHeight - vh) * ABERTURA));
        fase = vh + abertura + (livre.matches ? VAO_CELULAR : VAO_MESA);
        pista.style.height = livre.matches
          ? `${Math.round(altura + fase)}px`
          : `calc(100vh + ${Math.round(respiro + sobra * PASSO + fase)}px)`;
        pista.style.setProperty("--entrar-topo", `${topo}px`);
        carroPista.style.setProperty("--entrar-recuo", `${vh + abertura}px`);
      } else {
        pista.classList.remove("is-passagem", "is-entrando");
        carroPista?.style.removeProperty("--entrar-recuo");
        alvo?.removeAttribute("data-alvo");
        alvo = null;
      }
      esfregar();
    };

    /** o cartão que a câmera vai atravessar, e onde ele está com escala 1 */
    const medirAlvo = () => {
      const itens = Array.from(trilho.querySelectorAll<HTMLElement>(".esteira__item"));
      if (!itens.length) return;
      let escolhido = itens[itens.length - 1]!;
      if (livre.matches) {
        const centro = window.innerWidth / 2;
        let distancia = Number.POSITIVE_INFINITY;
        itens.forEach((item) => {
          const r = item.getBoundingClientRect();
          const atual = Math.abs(r.left + r.width / 2 - centro);
          if (atual < distancia) {
            distancia = atual;
            escolhido = item;
          }
        });
      }
      if (alvo !== escolhido) {
        alvo?.removeAttribute("data-alvo");
        escolhido.setAttribute("data-alvo", "");
        alvo = escolhido;
        setAlvoPassagem(itens.indexOf(escolhido));
      }
      // mede com a câmera parada: o empurrão (`scale`) sai por um instante
      pista.style.setProperty("--entrar-a", "0");
      escrito.delete("p--entrar-a");
      const face = escolhido.querySelector<HTMLElement>(".esteira__girar") ?? escolhido;
      const r = face.getBoundingClientRect();
      const p = prancha.getBoundingClientRect();
      base = {
        t: r.top,
        d: window.innerWidth - r.right,
        b: window.innerHeight - r.bottom,
        e: r.left,
        ox: r.left + r.width / 2 - p.left,
        oy: r.top + r.height / 2 - p.top,
      };
    };

    const esfregar = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        const r = pista.getBoundingClientRect();
        if (!livre.matches && sobra) {
          const t = Math.min(
            1,
            Math.max(0, (-r.top - respiro) / (sobra * PASSO)),
          );
          const ato = t;
          por(prancha, "--esteira-ato", ato.toFixed(4));
          por(prancha, "--esteira-x", `${(-ato * sobra).toFixed(1)}px`);
          por(pista, "--esteira-t", t.toFixed(4));
        }
        if (!passa || !carroPista || !carroCena) return;

        const px = -r.top - inicio;
        const antes = fase - abertura;
        const a = cl(px / (antes * CRESCE));
        const h = cl((px - antes * CRESCE) / (antes * (1 - CRESCE)));
        const topoCarro = carroPista.getBoundingClientRect().top;
        const b = cl(-topoCarro / abertura);
        const grudou = topoCarro <= 0.5 ? 1 : 0;

        if (px <= 0) {
          base = null;
        } else if (!base) {
          medirAlvo();
        }
        pista.classList.toggle("is-entrando", a >= TRAVA);
        if (base) {
          por(pista, "--r0-t", `${base.t.toFixed(1)}px`);
          por(pista, "--r0-d", `${base.d.toFixed(1)}px`);
          por(pista, "--r0-b", `${base.b.toFixed(1)}px`);
          por(pista, "--r0-e", `${base.e.toFixed(1)}px`);
          por(pista, "--entrar-ox", `${base.ox.toFixed(1)}px`);
          por(pista, "--entrar-oy", `${base.oy.toFixed(1)}px`);
        }
        por(pista, "--entrar-a", a.toFixed(4));
        por(pista, "--entrar-h", h.toFixed(4));
        por(pista, "--entrar-b", b.toFixed(4));
        por(carroCena, "--entrar-b", b.toFixed(4));
        por(carroCena, "--entrar-v", String(grudou));
      });
    };

    const rolagem = trilho.parentElement;
    const aoArrastarLivre = () => {
      if (!passa) return;
      base = null;
      esfregar();
    };

    const aoFocar = (evento: FocusEvent) => {
      if (livre.matches || !sobra) return;
      const foco = evento.target as HTMLElement | null;
      if (!foco || !prancha.contains(foco)) return;
      window.requestAnimationFrame(() => {
        cena.scrollLeft = 0;
        cena.scrollTop = 0;
        const item = foco.closest<HTMLElement>(".esteira__item");
        const x = item
          ? item.offsetLeft + trilho.offsetLeft
          : foco.getBoundingClientRect().left - prancha.getBoundingClientRect().left;
        const largura = item ? item.offsetWidth : foco.getBoundingClientRect().width;
        const vw = window.innerWidth;
        let topo = 0;
        for (let n: HTMLElement | null = pista; n; n = n.offsetParent as HTMLElement | null) {
          topo += n.offsetTop;
        }
        const percurso = sobra * PASSO;
        const y = window.scrollY;
        const nav = document.querySelector<HTMLElement>(".cap-nav")?.getBoundingClientRect().right ?? 0;
        const esquerda = x - cl((y - topo - respiro) / percurso) * sobra;
        if (y >= topo && y <= topo + respiro + percurso && esquerda >= nav && esquerda + largura <= vw) {
          return;
        }
        const ato = cl((x + largura / 2 - vw / 2) / sobra);
        window.scrollTo({ top: Math.round(topo + respiro + ato * percurso), behavior: "instant" });
      });
    };

    medir();
    prancha.addEventListener("focusin", aoFocar);
    rolagem?.addEventListener("scroll", aoArrastarLivre, { passive: true });
    window.addEventListener("scroll", esfregar, { passive: true });
    window.addEventListener("resize", medir);
    livre.addEventListener("change", medir);
    reduzido.addEventListener("change", medir);
    return () => {
      prancha.removeEventListener("focusin", aoFocar);
      rolagem?.removeEventListener("scroll", aoArrastarLivre);
      window.removeEventListener("scroll", esfregar);
      window.removeEventListener("resize", medir);
      livre.removeEventListener("change", medir);
      reduzido.removeEventListener("change", medir);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const imgs = Array.from(trilho.querySelectorAll<HTMLImageElement>(".esteira__logo img"));
    const proporcao = (img: HTMLImageElement) => {
      if (img.naturalWidth && img.naturalHeight) {
        img.style.setProperty("--logo-prop", (img.naturalWidth / img.naturalHeight).toFixed(4));
      }
    };
    imgs.forEach((img) => {
      if (img.complete) proporcao(img);
      else img.addEventListener("load", () => proporcao(img), { once: true });
    });
  }, []);

  return (
    <div className="esteira" ref={pistaRef}>
      <div className="esteira__cena" ref={cenaRef}>
        <div className="esteira__prancha" ref={pranchaRef}>
          {cabeca ? <div className="esteira__cabeca">{cabeca}</div> : null}

          <p className="esteira__gesto" aria-live="polite">
            <span>Arraste</span>
            <b>{String(movelAtiva + 1).padStart(2, "0")} / {String(representadas.length).padStart(2, "0")}</b>
          </p>

          <div className="esteira__rolagem" onScroll={aoArrastar}>
            <ul className="esteira__trilho" ref={trilhoRef} aria-label="As onze indústrias">
              {representadas.map((r, i) => {
                const src = arquivoDe(r.id);
                const peca = pecaDe(r.id);
                const aberta = virada === i;
                return (
                  <li
                    key={r.id}
                    className={`esteira__item esteira__item--${RITMO[i % 3]} esteira__item--${ALTURA[(i * 2) % 3]}${aberta ? " is-aberta" : ""}`}
                    style={{ "--card-i": i } as React.CSSProperties}
                  >
                    <button
                      type="button"
                      className="esteira__girar"
                      aria-expanded={aberta}
                      aria-label={`${r.nome} — ${r.fornece}. ${aberta ? "Voltar para a marca." : "Ver a peça."}`}
                      onPointerMove={aoMoverCartao}
                      onPointerLeave={aoSairCartao}
                      onPointerEnter={() => som.tique()}
                      onClick={() => {
                        som.clique();
                        setVirada((antes) => (antes === i ? null : i));
                      }}
                    >
                      <span className="esteira__face esteira__frente">
                        <span className="esteira__num" aria-hidden>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="esteira__logo">
                          {src ? <img src={src} alt="" aria-hidden loading="lazy" /> : <b>{r.nome}</b>}
                        </span>
                        <span className="esteira__dizer">
                          <b>{r.nome}</b>
                          <span>{r.fornece}</span>
                        </span>
                        <span className="esteira__dica" aria-hidden>
                          Ver peça <i>↻</i>
                        </span>
                      </span>
                      <span className="esteira__face esteira__verso">
                        {peca ? (
                          <img src={peca} alt="" aria-hidden loading="lazy" />
                        ) : null}
                        <span className="esteira__versoRodape">
                          <b>{r.fornece}</b>
                          <span>fornecido por {r.nome}</span>
                        </span>
                        <span className="esteira__dica esteira__dica--verso" aria-hidden>
                          Marca <i>↺</i>
                        </span>
                      </span>
                    </button>
                    <a
                      className="esteira__portal"
                      href={r.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={aberta ? 0 : -1}
                      aria-hidden={!aberta}
                      onPointerEnter={() => som.tique()}
                      onClick={() => som.clique()}
                    >
                      Portal da {r.nome} <i aria-hidden>↗</i>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* O INDICADOR: uma régua fina que enche conforme a prancha anda. */}
        <div className="esteira__regua" aria-hidden>
          <span />
        </div>

        {/* A MOLDURA (passagem para a cena do carro): nasce sobre o cartão-alvo
            e cresce até o quadro onde a cena do carro vai se abrir. */}
        <div className="esteira__janela">
          <div className="esteira__moldura">
            <div className="esteira__dentro">
              {(() => {
                const r = representadas[alvoPassagem];
                const peca = r ? pecaDe(r.id) : undefined;
                return r ? (
                  <figure className="esteira__dentroPeca" aria-hidden>
                    {peca ? <img src={peca} alt="" loading="lazy" /> : null}
                    <figcaption>
                      <b>{r.fornece}</b>
                      <span>fornecido por {r.nome}</span>
                    </figcaption>
                  </figure>
                ) : null;
              })()}
              {passagem}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
