import { useEffect, useRef } from "react";

// A ESTRADA — a linha que atravessa a travessia inteira.
//
// Referência: `.fluid-line` do lukebaffait.fr, o efeito que o Fábio escolheu. Lá é uma
// curva de Bézier atravessando a seção de projetos, nascendo fora do quadro e saindo
// pelo outro lado.
//
// Aqui ela tem significado que lá não tinha: o capítulo 03 se chama "A estrada", e a
// linha É a estrada. Ela sai de Belo Horizonte (a cápsula do hero) e vai até o nome.
//
// DUAS COISAS APRENDIDAS APANHANDO na fita da SoftHam, e que valem aqui:
//
// 1. LINEAR, NUNCA ease(). Um ease no progresso faz a ponta correr ~1,5x o dedo no
//    trecho central, e o cliente percebe na hora: "está correndo mais rápido que a
//    rolagem". O traço é esfregado pelo scroll, não animado.
//
// 2. O PATH NASCE DAS POSIÇÕES REAIS das seções, não de uma curva fixa. A altura da
//    página muda com a viewport (medido: 5510px em 375, 4701px em 1440 — 17% de
//    diferença). O Luke escapa disso com viewBox fixo + `slice`, que funciona mas
//    distorce a curva em telas muito largas ou estreitas. Aqui a curva é remontada a
//    cada resize, ancorada em onde os capítulos REALMENTE estão.

/**
 * Por onde a estrada passa, em fração da largura da tela.
 *
 * A 1a rota jogava a linha em cima da grade das 11 marcas (0,72 no cap-marcas) e ela
 * MORRIA ali — atravessar conteúdo denso é o erro nº 3 da fita da SoftHam, e eu o
 * repeti. O conteúdo dos capítulos é alinhado à esquerda e tem `max-width`, então a
 * faixa da direita é o vão livre: é por lá que a estrada desce, serpenteando.
 */
const ROTA: Record<string, number> = {
  // A rota SERPENTEIA: entra larga, recua, avança de novo. Uma rota quase reta
  // (a 1a tinha os quatro pontos entre 0,78 e 1,06) vira régua, não estrada —
  // é a amplitude horizontal que dá a leitura de curva.
  "cap-casa": 0.74,
  "cap-marcas": 1.02,
  // a lista dos 12 estados é a mais larga da página: aqui a estrada recua para o
  // vão e volta, o que também dá o bojo da curva
  "cap-estrada": 0.86,
  // o capítulo do nome é o único CENTRALIZADO: o "H.M." gigante ocupa o meio da
  // tela, e qualquer rota interna passa por cima dele. A estrada contorna por fora.
  "cap-nome": 1.1,
};

export function Estrada() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    // MEDIDO: em 375px o conteúdo ocupa a largura inteira e 62 de 121 amostras da
    // curva caíam SOBRE o texto. No celular não existe vão por onde a estrada passe:
    // ela é um efeito de desktop, e no mobile simplesmente não existe.
    const estreito = window.matchMedia("(max-width: 900px)");

    /** Remonta a curva a partir de onde os capítulos estão AGORA. */
    const montar = () => {
      if (estreito.matches) {
        svg.style.display = "none";
        return 0;
      }
      svg.style.display = "";
      const alvos = Object.keys(ROTA)
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));
      if (alvos.length < 2) return;

      const topoDoc = window.scrollY;
      const larg = document.documentElement.clientWidth;

      // um ponto por capítulo, no centro vertical dele
      const pontos = alvos.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: larg * (ROTA[el.id] ?? 0.5),
          y: r.top + topoDoc + r.height / 2,
        };
      });

      // a estrada nasce na cápsula do hero e morre depois do último capítulo:
      // entrar e sair FORA do quadro é o que faz ela parecer estrada, não enfeite
      const ultimo = pontos[pontos.length - 1]!;
      const primeiro = pontos[0]!;
      const alturaTotal = ultimo.y + 320;

      // MEDIDO: com -420 o ponto de partida nascia SOBRE uma pastilha da barra de
      // marcas em 1280/1024. Com -560 ele nasce acima dela, dentro da cápsula do
      // hero — que é de onde a estrada deve sair de qualquer forma.
      pontos.unshift({ x: larg * 0.9, y: primeiro.y - 620 });
      // sai pela direita, nao pelo centro: pelo centro ela cruzava o fecho de contato
      pontos.push({ x: larg * 1.12, y: alturaTotal });

      // Catmull-Rom -> Bézier cúbica: passa POR todos os pontos (uma spline comum
      // só se aproxima deles), que é o que garante a linha encostar em cada capítulo
      let d = `M ${pontos[0]!.x.toFixed(1)},${pontos[0]!.y.toFixed(1)}`;
      for (let i = 0; i < pontos.length - 1; i++) {
        const p0 = pontos[i - 1] ?? pontos[i]!;
        const p1 = pontos[i]!;
        const p2 = pontos[i + 1]!;
        const p3 = pontos[i + 2] ?? p2;
        // TENSÃO: menor = curva mais solta. 6 é o Catmull-Rom padrão e deixava o
        // traço quase reto; 4.2 abre a barriga da curva sem criar laço.
        const T = 4.2;
        const c1x = p1.x + (p2.x - p0.x) / T;
        const c1y = p1.y + (p2.y - p0.y) / T;
        const c2x = p2.x - (p3.x - p1.x) / T;
        const c2y = p2.y - (p3.y - p1.y) / T;
        d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
      }

      svg.setAttribute("viewBox", `0 0 ${larg} ${alturaTotal}`);
      svg.style.height = `${alturaTotal}px`;
      path.setAttribute("d", d);

      const compr = path.getTotalLength();
      path.style.strokeDasharray = `${compr}`;
      // reduced-motion: a estrada existe inteira, sem depender de rolagem
      path.style.strokeDashoffset = reduzido.matches ? "0" : `${compr}`;

      return compr;
    };

    let compr = montar() ?? 0;

    let pedido = 0;
    const esfregar = () => {
      if (pedido || reduzido.matches) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        const doc = document.documentElement;
        const rolavel = doc.scrollHeight - window.innerHeight;
        if (rolavel <= 0) return;
        // LINEAR. Sem ease: a ponta anda exatamente o que o dedo anda.
        const t = Math.min(1, Math.max(0, window.scrollY / rolavel));
        path.style.strokeDashoffset = (compr * (1 - t)).toFixed(1);
      });
    };
    esfregar();

    // o resize muda a altura da página, e a curva inteira tem de ser remontada
    let pedidoResize = 0;
    const aoRedimensionar = () => {
      if (pedidoResize) return;
      pedidoResize = window.requestAnimationFrame(() => {
        pedidoResize = 0;
        compr = montar() ?? compr;
        esfregar();
      });
    };

    window.addEventListener("scroll", esfregar, { passive: true });
    window.addEventListener("resize", aoRedimensionar);
    // as fontes chegam depois e mudam a altura dos capítulos
    document.fonts?.ready.then(aoRedimensionar);

    return () => {
      window.removeEventListener("scroll", esfregar);
      window.removeEventListener("resize", aoRedimensionar);
      if (pedido) cancelAnimationFrame(pedido);
      if (pedidoResize) cancelAnimationFrame(pedidoResize);
    };
  }, []);

  return (
    <svg
      className="estrada-linha"
      ref={svgRef}
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
    >
      <path ref={pathRef} d="" fill="none" />
    </svg>
  );
}
