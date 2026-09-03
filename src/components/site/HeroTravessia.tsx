import { useEffect, useRef } from "react";
import { estados, empresa } from "@/lib/dados";
// Gerada com o Nano Banana a partir da original (marca/geracao/): luz lateral
// dura e olhar fora de quadro. O passo do rastro de exposicao longa FALHOU —
// o modelo criou uma segunda pessoa atras dele — entao o rastro fica no CSS.
import fabioEscuro from "@/assets/site/fabio-travessia.jpg";

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

  useEffect(() => {
    const el = capsulaRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // sem movimento o tratamento existe no estado assentado, não some
      el.style.setProperty("--sep", "0px");
      el.style.setProperty("--filme", "0.45");
      return;
    }

    let pedido = 0;
    const aoRolar = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        // fração da altura de viewport já rolada, travada em [0,1]
        const t = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
        el.style.setProperty("--capsula-y", `${t * 64}px`);
        el.style.setProperty("--capsula-esc", String(1 + t * 0.06));
        // o tratamento de filme é forte na chegada e vai assentando: 6px -> 0.
        // A foto "chega" em vez de já estar lá, que é o gesto da travessia.
        el.style.setProperty("--sep", `${(1 - t) * 6}px`);
        el.style.setProperty("--filme", String(1 - t * 0.55));
      });
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    <section className="hero-tr" aria-label="Apresentação">
      <div className="hero-tr__texto">
        <p className="hero-tr__eb">
          <span>Desde {empresa.fundacao}</span>
          <i aria-hidden />
          <span>{empresa.base}</span>
        </p>

        {/* Sem <br>. O título quebrava na mão em tres linhas, e mao nao sobrevive a
            outra largura. O <em> e a unica marcacao, porque ele carrega SIGNIFICADO
            (o numero e o argumento); a quebra fica com text-wrap: balance no CSS. */}
        <h1 className="hero-tr__titulo">
          De Minas para <em>outros onze</em> estados.
        </h1>

        <p className="hero-tr__sub">
          Onze indústrias representadas, levadas ao distribuidor onde ele está — não por
          catálogo, por estrada.
        </p>

        {/* Os 12 estados como dado, não como enfeite. Alcance é verificável;
            faturamento e número de cliente NÃO entram (ver src/lib/dados.ts). */}
        <ul className="hero-tr__ufs" aria-label="Estados atendidos">
          {estados.map((e) => (
            <li key={e.uf} className={e.casa ? "is-casa" : undefined} title={e.nome}>
              {e.uf}
            </li>
          ))}
        </ul>
      </div>

      {/* O TRATAMENTO DE FILME — o efeito da foto do lukebaffait.fr.
          São três coisas empilhadas, e o nome de cada uma:

          1. ABERRAÇÃO CROMÁTICA (RGB split): duas cópias da foto, uma tingida de
             vermelho e outra de ciano, deslocadas em sentidos opostos e somadas com
             `mix-blend-mode: screen`. Onde as três se sobrepõem a cor volta ao normal;
             nas bordas de contraste sobra a franja colorida. Não dá para fazer com
             filtro: `screen` sobre o fundo preto é que devolve a imagem original.
          2. GRÃO DE FILME: ruído em SVG (feTurbulence) por cima de tudo.
          3. VINHETA: o centro nítido, as bordas afundando no escuro.

          O deslocamento é `--sep`, escrito pelo scroll: forte na chegada, limpando
          conforme a foto assenta. O JS escreve só o número; a composição é do CSS. */}
      <div className="hero-tr__capsula" ref={capsulaRef}>
        <div className="capsula__filme" aria-hidden>
          <img src={fabioEscuro} className="capsula__canal capsula__canal--r" alt="" />
          <img src={fabioEscuro} className="capsula__canal capsula__canal--c" alt="" />
        </div>
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
  );
}
