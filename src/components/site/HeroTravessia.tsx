import { useEffect, useRef } from "react";
import { estados, empresa } from "@/lib/dados";
import fabioEscuro from "@/assets/site/fabio-escuro.jpg";

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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pedido = 0;
    const aoRolar = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        // fração da altura de viewport já rolada, travada em [0,1]
        const t = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
        el.style.setProperty("--capsula-y", `${t * 64}px`);
        el.style.setProperty("--capsula-esc", String(1 + t * 0.06));
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

        <h1 className="hero-tr__titulo">
          De Minas para
          <br />
          <em>outros onze</em>
          <br />
          estados.
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

      <div className="hero-tr__capsula" ref={capsulaRef}>
        <img
          src={fabioEscuro}
          width={780}
          height={936}
          alt="Fábio Borçato, sócio-fundador da H.M. Borçato."
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
