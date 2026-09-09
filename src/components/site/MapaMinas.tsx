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
/**
 * A ORDEM AQUI E A DA VIAGEM (por proximidade, saindo de casa em BH) — e agora
 * ela e a FONTE UNICA: a lista do capitulo 03 lê daqui, em vez de ter ordem
 * propria. Antes as duas divergiam, e o visitante nao tinha como ligar um ponto
 * do mapa ao nome na lista (achado R3-03 da 3a auditoria).
 */
export const PONTOS: { nome: string; cx: number; cy: number }[] = [
  { nome: "Central / RMBH", cx: 62.0, cy: 58.5 },
  { nome: "Centro-Oeste", cx: 54.6, cy: 60.5 },
  { nome: "Sul de Minas", cx: 46.3, cy: 73.5 },
  { nome: "Zona da Mata", cx: 66.6, cy: 75.5 },
  { nome: "Vale do Aço", cx: 73.0, cy: 54.3 },
  { nome: "Norte", cx: 62.6, cy: 29.0 },
  { nome: "Alto Paranaíba", cx: 41.7, cy: 46.1 },
  { nome: "Triângulo", cx: 27.8, cy: 49.2 },
];

/**
 * O COMPRIMENTO ACUMULADO ate cada parada, em unidades do viewBox.
 *
 * A rota e uma polilinha: `ATE[i]` e quanto a ponta precisa andar para chegar
 * na parada `i`. E o que permite acender no instante da chegada, em vez de
 * dividir o percurso em fatias iguais que ignoram a geografia.
 */
const ATE: number[] = (() => {
  const acc: number[] = [0];
  for (let i = 1; i < PONTOS.length; i++) {
    const a = PONTOS[i - 1]!;
    const b = PONTOS[i]!;
    acc.push(acc[i - 1]! + Math.hypot(b.cx - a.cx, b.cy - a.cy));
  }
  return acc;
})();
const COMPRIMENTO = ATE[ATE.length - 1]!;

export function MapaMinas() {
  const svgRef = useRef<SVGSVGElement>(null);
  // No celular, esta âncora fornece uma janela de leitura sem palco sticky.
  const rotaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const marco = rotaRef.current;
    if (!svg || !marco) return;


    // COM MOVIMENTO REDUZIDO O JS NAO CALCULA NADA.
    // O CSS ja entrega a cena inteira (rota completa, regioes acesas) — o
    // scroll ficava recalculando classes que o proprio CSS sobrepoe. Trabalho
    // por quadro sem efeito nenhum; achado da 4a auditoria.
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (semMovimento.matches) {
      svg.style.setProperty("--rota", "1");
      svg.querySelectorAll<SVGGElement>("[data-regiao]").forEach((g) => {
        g.classList.add("is-acesa");
      });
      document
        .querySelectorAll<HTMLElement>("#cap-estrada .estrada__ufs li")
        .forEach((li) => li.classList.add("is-percorrida"));
      return;
    }

    let pedido = 0;
    const aoRolar = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        const vh = window.innerHeight;

        // D-25: no desktop, a Estrada é uma pista estável. O SVG não mede a
        // própria posição nem tenta resolver `calc()` do CSS: a rota usa só o
        // progresso do contêiner que a mantém no quadro.
        const entrega = parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--entrega"),
        ) || 0;
        const pista = svg.closest<HTMLElement>(".estrada");
        const desktop = window.matchMedia("(min-width: 901px)").matches;
        let t = 0;

        if (desktop && pista && entrega >= 0.98) {
          // D-25: o mapa recebe uma pista própria. Ao entrar, a composição
          // fica inteira e parada; a rota ocupa 75% do trecho sticky e os 25%
          // finais seguram o resultado antes de a Estrada ceder a O Nome.
          const rPista = pista.getBoundingClientRect();
          const curso = Math.max(1, pista.offsetHeight - vh);
          const cena = Math.min(1, Math.max(0, -rPista.top / curso));
          t = Math.min(1, cena / 0.75);
        } else if (!desktop) {
          // No celular não há palco sticky: a âncora de layout preserva a rota
          // inteira dentro da janela visível, sem transformar o SVG.
          const rMarco = marco.getBoundingClientRect();
          const inicioR = vh * 1.28;
          const fimR = vh * 0.58;
          t = Math.min(
            1,
            Math.max(0, (inicioR - rMarco.top) / Math.max(1, inicioR - fimR)),
          );
        }
        svg.style.setProperty("--rota", t.toFixed(4));

        // UMA SO MEDIDA GOVERNA TRACO, PONTO E LISTA.
        //
        // Era `Math.round(t * PONTOS.length)`: o acendimento em oito fatias
        // IGUAIS, enquanto a linha avanca por COMPRIMENTO — e os segmentos da
        // rota tem comprimentos bem diferentes (de 7,7 a 27,4 unidades).
        // MEDIDO (4a auditoria): em t=0,5581 o traco ja tinha passado pelo
        // ponto 5, e ele continuava apagado. A ponta chegava e a luz nao.
        //
        // Agora cada parada acende quando a PONTA ALCANCA o comprimento
        // acumulado ate ela — a mesma regra na ida e na volta.
        const andado = t * COMPRIMENTO;
        const acesas = ATE.filter((c) => andado >= c).length;
        svg.querySelectorAll<SVGGElement>("[data-regiao]").forEach((g, i) => {
          g.classList.toggle("is-acesa", i < acesas);
        });

        // A LISTA SEGUE O MAPA, e nao a estrada global.
        //
        // MEDIDO: em +700 o mapa tinha 4 acesas e a lista 8 — dois relogios
        // diferentes na mesma cena. A estrada global mede a rota dela (que
        // atravessa a pagina inteira); o mapa mede a si proprio, desde o R3-02.
        // Quem o visitante esta olhando e o mapa: e ele que manda.
        const lis = document.querySelectorAll<HTMLElement>(
          "#cap-estrada .estrada__ufs li",
        );
        lis.forEach((li, i) => {
          li.classList.toggle("is-percorrida", i < acesas);
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
  // Wrapper visual do mapa. A âncora interna é usada apenas no fluxo mobile.
  <div className="mapa-mg-ref">
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
          {/* O NUMERO DA PARADA. Sem ele o mapa mostrava cobertura e percurso,
              mas nao dava chave para identificar QUAL regiao e cada ponto — e o
              nome em `data-regiao` nao e legenda visivel. A lista ao lado usa a
              mesma numeracao e a mesma ordem. */}
          <text className="mapa-mg__num" x={p.cx} y={p.cy - 5.2}>
            {i + 1}
          </text>
        </g>
      ))}
    </svg>

      {/* A ÂNCORA DA ROTA. Fica no fluxo, logo abaixo do mapa, sem altura
          visível e sem transform: é a travessia DELA pela tela que conta a
          viagem. Um marcador de layout, não um elemento de design. */}
      <div className="mapa-mg-marco" ref={rotaRef} aria-hidden />
    </div>
  );
}
