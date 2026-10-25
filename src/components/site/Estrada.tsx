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

export const REGIOES_MAPA: { nome: string; x: number; y: number }[] = [
  { nome: "Central / RMBH", x: 0.62, y: 0.52 },
  { nome: "Sul de Minas", x: 0.54, y: 0.74 },
  { nome: "Triângulo", x: 0.30, y: 0.55 },
  { nome: "Alto Paranaíba", x: 0.44, y: 0.47 },
  { nome: "Centro-Oeste", x: 0.53, y: 0.44 },
  { nome: "Norte", x: 0.60, y: 0.18 },
  { nome: "Vale do Aço", x: 0.74, y: 0.40 },
  { nome: "Zona da Mata", x: 0.78, y: 0.66 },
];

const ROTA: Record<string, number> = {
  "cap-casa": 0.74,
  "cap-marcas": 1.02,
  "cap-estrada": 0.86,
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
    let ultimoOffset = "";

    /** Remonta a curva a partir de onde os capítulos estão AGORA. */
    const montar = () => {
      ultimoOffset = "";
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

      const pontos = alvos.flatMap((el) => {
        const r = el.getBoundingClientRect();
        const topo = r.top + topoDoc;
        if (el.id === "cap-estrada") {
          return REGIOES_MAPA.map((g) => ({
            x: larg * g.x,
            y: topo + r.height * g.y,
          }));
        }
        const corredor = el.querySelector<HTMLElement>("[data-estrada-corredor]");
        const itens = corredor ? corredor.children : null;
        if (itens && itens.length >= 2 && window.matchMedia("(min-width: 901px)").matches) {
          const a = itens[0]!.getBoundingClientRect();
          const b = itens[1]!.getBoundingClientRect();
          if (b.left > a.right) {
            return [{ x: (a.right + b.left) / 2, y: topo + r.height / 2 }];
          }
        }
        return [{ x: larg * (ROTA[el.id] ?? 0.5), y: topo + r.height / 2 }];
      });

      const ultimo = pontos[pontos.length - 1]!;
      const primeiro = pontos[0]!;
      const alturaTotal = ultimo.y + 320;
      const largRef = Math.min(larg, 1920);

      pontos.unshift({ x: Math.min(larg * 0.9, largRef * 0.94), y: primeiro.y - 620 });
      pontos.push({ x: Math.min(larg * 1.12, largRef * 1.08), y: alturaTotal });

      let d = `M ${pontos[0]!.x.toFixed(1)},${pontos[0]!.y.toFixed(1)}`;
      for (let i = 0; i < pontos.length - 1; i++) {
        const p0 = pontos[i - 1] ?? pontos[i]!;
        const p1 = pontos[i]!;
        const p2 = pontos[i + 1]!;
        const p3 = pontos[i + 2] ?? p2;
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
      path.style.strokeDashoffset = reduzido.matches ? "0" : `${compr}`;

      return compr;
    };

    let compr = montar() ?? 0;

    let pedido = 0;
    const esfregar = () => {
      if (pedido || reduzido.matches || estreito.matches) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        const doc = document.documentElement;
        const rolavel = doc.scrollHeight - window.innerHeight;
        if (rolavel <= 0) return;
        // LINEAR. Sem ease: a ponta anda exatamente o que o dedo anda.
        const t = Math.min(1, Math.max(0, window.scrollY / rolavel));
        const offsetStr = (compr * (1 - t)).toFixed(1);
        if (offsetStr !== ultimoOffset) {
          ultimoOffset = offsetStr;
          path.style.strokeDashoffset = offsetStr;
        }
      });
    };
    esfregar();

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
