import { useEffect, useRef } from "react";

// O MAPA DE MINAS — o capítulo 03 deixa de ser lista.
//
// O parecer de júri foi direto: "a lista de regiões é informativa, mas
// visualmente ainda parece uma lista. O mapa estilizado de Minas precisa ocupar
// metade da tela, com as oito regiões acendendo conforme a rolagem. No celular,
// deve virar um mapa simplificado ou uma sequência de regiões; não pode
// simplesmente desaparecer."
//
// A SILHUETA é desenhada aqui, não copiada: a forma de um estado é geografia,
// e o traço é nosso. Não é cartografia de precisão — é a silhueta RECONHECÍVEL,
// que é o que o público mineiro julga. Errar onde fica o Triângulo ou a Zona da
// Mata é o único erro que ele detecta na hora.
//
// AS COORDENADAS NÃO VÊM de `REGIOES_MAPA` (a da estrada global), e é de
// propósito: lá elas são fração da TELA, calibradas para a linha passar pelo vão
// livre da página. Aqui precisam ser GEOGRAFIA — Uberlândia no Triângulo, Juiz
// de Fora na Zona da Mata. Duas finalidades diferentes, dois conjuntos.
//
// EXISTE NO CELULAR. A estrada global se desliga abaixo de 900px porque não há
// vão por onde passar; o mapa não: ele É o conteúdo, e some junto com o
// argumento se desligar.

/**
 * O CONTORNO DE MINAS, em viewBox 100×92.
 *
 * A 1ª versão eu desenhei de cabeça e saiu uma MANCHA arredondada: sem o bico
 * do Triângulo a oeste, sem a ponta sul. O público é mineiro, e a forma do
 * próprio estado é o único erro que ele detecta na hora.
 *
 * Esta versão vem de latitude/longitude REAIS, projetadas para o viewBox. Os
 * extremos batem com os do estado: oeste −51,05 (o bico do Triângulo), leste
 * −39,86, norte −14,23 (divisa BA), sul −22,92 (a ponta com SP).
 *
 * Não é cartografia de precisão — é a silhueta reconhecível, que é o critério.
 */
const SILHUETA =
  "M 42.6,6.0 L 61.5,8.4 L 67.8,13.9 L 78.0,15.8 L 85.9,21.8 L 91.4,26.9 L 94.0,34.7 L 88.3,42.6 L 82.0,47.2 L 80.4,55.5 L 85.1,62.4 L 79.6,67.5 L 73.3,71.2 L 67.0,78.1 L 59.9,81.8 L 54.4,82.8 L 46.5,86.0 L 39.5,83.2 L 33.9,79.5 L 28.4,72.1 L 18.2,61.1 L 11.9,55.5 L 6.0,52.7 L 7.2,46.3 L 12.7,41.7 L 18.2,39.8 L 26.1,37.0 L 33.9,32.4 L 38.7,25.0 L 44.2,18.6 L 46.5,12.1 Z";

/**
 * Onde cada região cai dentro do viewBox — posicionada pela cidade-polo
 * (Belo Horizonte, Uberlândia, Montes Claros…). As cidades NÃO são publicadas
 * (decisão do dono, 05/09): elas só ancoram o ponto na geografia certa.
 */
const PONTOS: { nome: string; cx: number; cy: number }[] = [
  { nome: "Central / RMBH", cx: 62.0, cy: 58.5 },
  { nome: "Centro-Oeste", cx: 54.6, cy: 60.5 },
  { nome: "Sul de Minas", cx: 46.3, cy: 73.5 },
  { nome: "Zona da Mata", cx: 66.6, cy: 75.5 },
  { nome: "Vale do Aço", cx: 73.0, cy: 54.3 },
  { nome: "Norte", cx: 62.6, cy: 29.0 },
  { nome: "Alto Paranaíba", cx: 41.7, cy: 46.1 },
  { nome: "Triângulo", cx: 27.8, cy: 49.2 },
];

export function MapaMinas() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const cap = svg.closest<HTMLElement>(".cap");
    if (!cap) return;

    let pedido = 0;
    const aoRolar = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        const r = cap.getBoundingClientRect();
        const vh = window.innerHeight;
        // a rota é percorrida ENQUANTO o capítulo atravessa a tela: começa
        // quando ele chega ao meio e termina quando o rodapé dele passa
        const t = Math.min(
          1,
          Math.max(0, (vh * 0.72 - r.top) / Math.max(1, r.height * 0.62)),
        );
        svg.style.setProperty("--rota", t.toFixed(4));
        const acesas = Math.round(t * PONTOS.length);
        svg.querySelectorAll<SVGGElement>("[data-regiao]").forEach((g, i) => {
          g.classList.toggle("is-acesa", i < acesas);
        });
      });
    };

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  // a rota que liga as oito paradas, na ordem da viagem
  const rota = PONTOS.map((p, i) => `${i ? "L" : "M"} ${p.cx.toFixed(1)},${p.cy.toFixed(1)}`).join(" ");

  return (
    <svg
      ref={svgRef}
      className="mapa-mg"
      viewBox="0 0 100 92"
      role="img"
      aria-label="Minas Gerais, com as oito regiões atendidas pela H.M. Borçato."
    >
      {/* o corpo do estado */}
      <path className="mapa-mg__chao" d={SILHUETA} />
      <path className="mapa-mg__borda" d={SILHUETA} />

      {/* a rota entre as paradas, esfregada pelo scroll */}
      <path className="mapa-mg__rota" d={rota} pathLength={1} />

      {PONTOS.map((p, i) => (
        <g key={p.nome} data-regiao={p.nome} style={{ "--i": i } as React.CSSProperties}>
          <circle className="mapa-mg__halo" cx={p.cx} cy={p.cy} r={3.4} />
          <circle className="mapa-mg__ponto" cx={p.cx} cy={p.cy} r={1.5} />
        </g>
      ))}
    </svg>
  );
}
