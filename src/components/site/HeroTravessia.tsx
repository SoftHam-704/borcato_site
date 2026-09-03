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
        // o grão assenta conforme a foto "chega" — sem deslocar canal nenhum
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
      {/* A PALAVRA-FANTASMA — a peça central da direção.
          Referências: 36 (Techwear) e 25 (Silent Shogun), onde a figura fica NA
          FRENTE das letras e as corta.

          Ela resolve o defeito estrutural do hero anterior: a cápsula tem fundo
          preto e a página também, então a curva não se lia — preto sobre preto.
          Com a palavra atrás, a janela da foto RECORTA as letras, e é o corte que
          devolve a forma à cápsula. Sem tocar na foto.

          Ela precisa ficar abaixo de 8% de contraste, cortada pelas DUAS bordas
          laterais e pela cápsula. Se aparecer inteira em alguma largura, vira o
          clichê da palavra gigante de fundo. */}
      <span className="hero-tr__fantasma" aria-hidden>Borçato</span>

      <div className="hero-tr__texto">
        <p className="hero-tr__eb">
          <span>Desde {empresa.fundacao}</span>
          <i aria-hidden />
          <span>{empresa.base}</span>
        </p>

        {/* Tres linhas, tres PESOS — como o 26 (regular/itálico/light) e o 22
            (alternando bold e light por palavra). Antes era um peso só, com a
            diferenciação feita só por cor: assinatura de template.
            O <em> continua sendo "outros onze" porque é ele que carrega o
            argumento — o número que nenhum concorrente copia sem ter rodado. */}
        <h1 className="hero-tr__titulo">
          <span className="ln ln--1">De Minas para</span>
          <em className="ln ln--2">outros onze</em>
          <span className="ln ln--3">estados.</span>
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

      {/* O GRÃO e a VINHETA ficam; o RGB SPLIT SAIU.
          Ele era invenção minha — o cliente escolheu a FORMA da cápsula do
          lukebaffait.fr, não um glitch sobre o rosto. E ele estava destruindo a
          foto: deslocava duas cópias tingidas 6px para cada lado na primeira
          pintura, deixando o logo bordado da camisa ILEGÍVEL — justamente a
          prova visível da cor da marca. Nenhuma das 39 referências da biblioteca
          aplica glitch sobre rosto humano. */}
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
  );
}
