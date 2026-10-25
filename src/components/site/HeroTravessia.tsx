import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { regioes, empresa } from "@/lib/dados";
import { Palavras } from "@/components/site/Palavras";
import { som } from "@/lib/som";
// Gerada com o Nano Banana a partir da original (marca/geracao/): luz lateral
// dura e olhar fora de quadro. O passo do rastro de exposicao longa FALHOU —
// o modelo criou uma segunda pessoa atras dele — entao o rastro fica no CSS.
// A FOTO DA CAPSULA E O QUADRO 0 da antiga foto viva, nao um arquivo separado.
// Antes era `fabio-travessia.jpg` (619 KB) mostrando exatamente a mesma
// imagem do quadro 0 (110 KB) — 619 KB baixados para nada, e 68% do peso
// da pagina era o Fabio duas vezes. Era o achado no 8 do juri.
import fabioEscuro from "@/assets/site/frames/0.avif";

// Hero da direção "A DISTÂNCIA" (escolhida em 03/09/2026).
//
// A abertura NÃO diz a categoria. "Representação comercial de autopeças" é o que
// qualquer concorrente do Fábio escreveria, e era o que a proposta do Lovable dizia.
// Aqui a abertura é o ALCANCE — o que ele construiu e ninguém copia de graça.
//
// A CÁPSULA é o efeito que o cliente escolheu, medido na página do lukebaffait.fr:
// `.about-photo`, 780×936, `border-radius: 280px 0 0 280px` — raio grande só nos dois
// cantos da ESQUERDA, sangrando pela direita. A foto é recortada nessa proporção em
// src/assets/site/ (ver marca/_capsula-prova.png).
//
// O parallax do retrato é escrito em custom property e composto no CSS — o mesmo padrão
// que a home da SoftHam usa: o JS escreve só a PEÇA, o CSS compõe o transform. Assim o
// hover/reduced-motion não briga com inline style.
export function HeroTravessia() {
  const capsulaRef = useRef<HTMLDivElement>(null);

  const aoMoverCta = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const dx = Math.max(-7, Math.min(7, (e.clientX - (r.left + r.width / 2)) * 0.16));
    const dy = Math.max(-5, Math.min(5, (e.clientY - (r.top + r.height / 2)) * 0.26));
    el.style.setProperty("--btn-ima-x", `${dx.toFixed(1)}px`);
    el.style.setProperty("--btn-ima-y", `${dy.toFixed(1)}px`);
  };

  const aoSairCta = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--btn-ima-x", "0px");
    el.style.setProperty("--btn-ima-y", "0px");
  };

  // O TEXTO SE ESCREVE quando a abertura termina, nao quando a pagina carrega:
  // a abertura cobre tudo, e animar por baixo dela e desperdicar o gesto. A
  // Abertura avisa por evento; se ela nao existir (reduced-motion, ou um dia
  // sem abertura), o fallback de 2,5s garante que o texto nunca fique preso.
  useEffect(() => {
    const secao = capsulaRef.current?.closest<HTMLElement>(".hero-tr");
    if (!secao) return;
    const pronta = () => secao.classList.add("is-pronta");
    // Sem movimento não há cortina para entregar o evento. O estado final
    // precisa existir no primeiro quadro, inclusive se a ordem dos effects
    // fizer a Abertura desmontar antes de este listener ser registrado.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pronta();
      return;
    }
    window.addEventListener("hmb:abriu", pronta, { once: true });
    // O fallback não pode disparar por baixo da abertura. Depois que a pausa de
    // 2 s após 2026 entrou, 2,5 s passou a ser anterior à entrega real e o Hero
    // chegava pronto antes de ser revelado. Se a abertura ainda existe, o evento
    // dela continua sendo a única fonte de verdade.
    const fallback = window.setTimeout(() => {
      if (!document.body.classList.contains("is-abrindo")) pronta();
    }, 2500);
    return () => {
      window.removeEventListener("hmb:abriu", pronta);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    const el = capsulaRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // sem movimento o tratamento existe no estado assentado, não some
      el.style.setProperty("--filme", "0.45");
      return;
    }

    // O PALCO PRESO. O hero fica grudado na tela enquanto a pista rola por baixo,
    // e só libera a página quando BORÇATO atravessou INTEIRO. Pedido do dono:
    // "o site só deve sair da seção hero após todo o texto BORÇATO ser visualizado".
    const palco = el.closest<HTMLElement>(".hero-palco");
    const secaoHero = el.closest<HTMLElement>(".hero-tr");
    const casaCap = document.getElementById("cap-casa");

    let preso = false;
    let ultimoT = "";
    let ultimoPassa = "";
    const medirCapsula = () => {
      if (!secaoHero) return;
      preso = getComputedStyle(secaoHero).position === "sticky";
      ultimoT = "";
      ultimoPassa = "";
      const w = secaoHero.clientWidth;
      const h = secaoHero.clientHeight;
      const l = el.offsetLeft;
      const tp = el.offsetTop;
      secaoHero.style.setProperty("--cap-l", `${l}px`);
      secaoHero.style.setProperty("--cap-t", `${tp}px`);
      secaoHero.style.setProperty("--cap-r", `${w - l - el.offsetWidth}px`);
      secaoHero.style.setProperty("--cap-b", `${h - tp - el.offsetHeight}px`);
    };

    let pedido = 0;
    const aoRolar = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        const pista = palco
          ? Math.max(1, palco.offsetHeight - window.innerHeight)
          : window.innerHeight;
        const t = Math.min(1, Math.max(0, window.scrollY / pista));
        const tStr = t.toFixed(4);

        const secao = el.closest<HTMLElement>(".hero-tr");
        const fant = secao?.querySelector<HTMLElement>(".hero-tr__fantasma");
        const curso = preso
          ? Math.max(1, (palco?.offsetHeight ?? 0) - window.innerHeight)
          : Math.max(1, (secao?.offsetHeight ?? window.innerHeight) - window.innerHeight * 0.45);
        const passa = Math.min(1, Math.max(0, window.scrollY / curso)).toFixed(4);

        if (tStr === ultimoT && passa === ultimoPassa) return;
        ultimoT = tStr;
        ultimoPassa = passa;

        el.style.setProperty("--capsula-y", `${(t * 64).toFixed(1)}px`);
        el.style.setProperty("--capsula-esc", (1 + t * 0.06).toFixed(4));
        el.style.setProperty("--filme", (1 - t * 0.55).toFixed(4));

        if (secao && fant) {
          const sobra = Math.max(0, fant.scrollWidth - document.documentElement.clientWidth);
          secao.style.setProperty("--fant-x", `${(-t * (sobra + 40)).toFixed(1)}px`);
          secao.style.setProperty("--hero-t", tStr);
          secao.style.setProperty("--passa", passa);
          casaCap?.style.setProperty("--passa", passa);
        }
      });
    };
    const aoRedimensionar = () => {
      medirCapsula();
      aoRolar();
    };
    medirCapsula();
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRedimensionar);
    document.fonts?.ready.then(aoRedimensionar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRedimensionar);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    <div className="hero-palco">
    <section className="hero-tr" aria-label="Apresentação">
      <span className="hero-tr__fantasma" aria-hidden>Borçato</span>
      <span className="hero-tr__moldura" aria-hidden />

      <div className="hero-tr__texto">
        <p className="hero-tr__eb">
          <span className="hero-tr__ponto-vivo" aria-hidden />
          <span>MINAS GERAIS · DESDE {empresa.fundacao}</span>
          <i aria-hidden />
          <span className="hero-tr__coord" aria-hidden>19°55' S · 43°56' W</span>
        </p>

        <h1 className="hero-tr__titulo">
          <span className="ln ln--1"><Palavras texto="Todo distribuidor" total={6} /></span>{" "}
          <em className="ln ln--2"><Palavras texto="de Minas" desde={2} total={6} /></em>{" "}
          <span className="ln ln--3"><Palavras texto="conhece" desde={4} total={6} /></span>{" "}
          <span className="ln ln--4"><Palavras texto="o nome." desde={5} total={6} /></span>
        </h1>

        <p className="hero-tr__sub">
          Onze indústrias representadas em um estado inteiro — não por catálogo,
          por estrada, praça por praça.
        </p>

        <div className="hero-tr__acoes">
          <a
            className="btn-falar"
            href={empresa.celular.href}
            target="_blank"
            rel="noopener noreferrer"
            onPointerMove={aoMoverCta}
            onPointerLeave={aoSairCta}
            onPointerEnter={() => som.tique()}
            onClick={() => som.clique()}
          >
            <span>Falar com a Borçato</span>
            <i aria-hidden>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </i>
          </a>
          <a
            className="link-marcas"
            href="#marcas-inicio"
            onPointerEnter={() => som.tique()}
            onClick={() => som.clique()}
          >
            Ver as onze marcas ↓
          </a>
        </div>

      <ul className="hero-tr__trilho" aria-label="Cobertura em Minas Gerais">
        <li className="trilho__rotulo" aria-hidden>
          <b>Minas Gerais</b>
          <span>um estado inteiro</span>
        </li>
        {regioes.map((r) => (
          <li key={r.nome}>
            {r.nome}
          </li>
        ))}
      </ul>
      </div>

      <div className="hero-tr__capsula" ref={capsulaRef}>
        <img
          src={fabioEscuro}
          width={780}
          height={936}
          alt="Fábio Borçato, sócio-fundador da H.M. Borçato."
          fetchPriority="high"
          className="capsula__base"
        />
        <span className="capsula__grao" aria-hidden />
        <span className="capsula__vinheta" aria-hidden />
      </div>

    </section>
    </div>
  );
}
