import { useEffect, useRef, useState } from "react";
import { som } from "@/lib/som";

// O MAPA DE MINAS — o capítulo 03 deixa de ser lista.
//
// A SILHUETA vem de latitude/longitude REAIS, projetadas para o viewBox 100×92.
// Os extremos batem com os do estado: oeste −51,05 (o bico do Triângulo), leste
// −39,86, norte −14,23 (divisa BA), sul −22,92 (a ponta com SP).

const SILHUETA =
  "M 42.6,6.0 L 61.5,8.4 L 67.8,13.9 L 78.0,15.8 L 85.9,21.8 L 91.4,26.9 L 94.0,34.7 L 88.3,42.6 L 82.0,47.2 L 80.4,55.5 L 85.1,62.4 L 79.6,67.5 L 73.3,71.2 L 67.0,78.1 L 59.9,81.8 L 54.4,82.8 L 46.5,86.0 L 39.5,83.2 L 33.9,79.5 L 28.4,72.1 L 18.2,61.1 L 11.9,55.5 L 6.0,52.7 L 7.2,46.3 L 12.7,41.7 L 18.2,39.8 L 26.1,37.0 L 33.9,32.4 L 38.7,25.0 L 44.2,18.6 L 46.5,12.1 Z";

/**
 * A ORDEM AQUI E A DA VIAGEM (por proximidade, saindo de casa em BH)
 * com as principais rodovias federais e estaduais de escoamento.
 */
export const PONTOS: {
  nome: string;
  cx: number;
  cy: number;
  rodovia: string;
  eixo: string;
}[] = [
  { nome: "Central / RMBH", cx: 62.0, cy: 58.5, rodovia: "Sede BH", eixo: "Anel Rodoviário · Betim · Contagem" },
  { nome: "Centro-Oeste", cx: 54.6, cy: 60.5, rodovia: "BR-262", eixo: "Divinópolis · Nova Serrana" },
  { nome: "Sul de Minas", cx: 46.3, cy: 73.5, rodovia: "BR-381 Sul", eixo: "Fernão Dias · Pouso Alegre · Varginha" },
  { nome: "Zona da Mata", cx: 66.6, cy: 75.5, rodovia: "BR-040 Sul", eixo: "Juiz de Fora · Barbacena" },
  { nome: "Vale do Aço", cx: 73.0, cy: 54.3, rodovia: "BR-381 Leste", eixo: "Ipatinga · Cel. Fabriciano" },
  { nome: "Norte", cx: 62.6, cy: 29.0, rodovia: "BR-040 / 135", eixo: "Montes Claros · Sete Lagoas" },
  { nome: "Alto Paranaíba", cx: 41.7, cy: 46.1, rodovia: "BR-262 / 354", eixo: "Patos de Minas · Araxá" },
  { nome: "Triângulo", cx: 27.8, cy: 49.2, rodovia: "BR-050 / 365", eixo: "Uberlândia · Uberaba" },
];

/**
 * O COMPRIMENTO ACUMULADO ate cada parada, em unidades do viewBox.
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

/**
 * A ROTA NAO PARA NO TRIANGULO (passagem C, 27/09).
 */
const SEGUE = "M 27.8,49.2 C 22,62 8,70 0,84";
export const SEGUE_FIM = { x: 0, y: 84, dx: -8, dy: 14 };
export const CEL_SEGUE_FIM = 0.48;

export function MapaMinas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const rotaRef = useRef<HTMLDivElement>(null);
  const [focoAtivo, setFocoAtivo] = useState<number | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const marco = rotaRef.current;
    if (!svg || !marco) return;

    const grupos = Array.from(svg.querySelectorAll<SVGGElement>("[data-regiao]"));
    const lis = Array.from(
      document.querySelectorAll<HTMLElement>("#cap-estrada .estrada__ufs li"),
    );

    // Sincronização interativa bidirecional (mapa <-> lista de regiões)
    const destacar = (idx: number | null) => {
      if (idx !== null) som.tique();
      setFocoAtivo(idx);
      grupos.forEach((g, i) => g.classList.toggle("is-foco", i === idx));
      lis.forEach((li, i) => li.classList.toggle("is-foco", i === idx));
    };

    const limpezasFoco: (() => void)[] = [];
    grupos.forEach((g, i) => {
      const entrar = () => destacar(i);
      const sair = () => destacar(null);
      g.addEventListener("pointerenter", entrar);
      g.addEventListener("pointerleave", sair);
      limpezasFoco.push(() => {
        g.removeEventListener("pointerenter", entrar);
        g.removeEventListener("pointerleave", sair);
      });
    });
    lis.forEach((li, i) => {
      const entrar = () => destacar(i);
      const sair = () => destacar(null);
      li.addEventListener("pointerenter", entrar);
      li.addEventListener("pointerleave", sair);
      limpezasFoco.push(() => {
        li.removeEventListener("pointerenter", entrar);
        li.removeEventListener("pointerleave", sair);
      });
    });

    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (semMovimento.matches) {
      svg.style.setProperty("--rota", "1");
      svg.style.setProperty("--segue", "1");
      grupos.forEach((g) => g.classList.add("is-acesa"));
      lis.forEach((li) => li.classList.add("is-percorrida"));
      return () => limpezasFoco.forEach((fn) => fn());
    }

    let pedido = 0;
    let ultimaRota = "";
    let ultimoSegue = "";
    let ultimasAcesas = -1;

    const aoRolar = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        const vh = window.innerHeight;

        const entrega = parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--entrega"),
        ) || 0;
        const pista = svg.closest<HTMLElement>(".estrada");
        const desktop = window.matchMedia("(min-width: 901px)").matches;
        let t = 0;
        let segue = 0;

        if (desktop && pista && entrega >= 0.98) {
          const rPista = pista.getBoundingClientRect();
          const curso = Math.max(1, pista.offsetHeight - vh);
          const cena = Math.min(1, Math.max(0, -rPista.top / curso));
          t = Math.min(1, cena / 0.75);
          segue = Math.min(1, Math.max(0, (cena - 0.75) / 0.25));
        } else if (!desktop && entrega >= 0.95) {
          // Só avança a rota quando o carro já entregou a cena no mobile (--entrega >= 0.95)
          const rMarco = marco.getBoundingClientRect();
          const inicioR = vh * 1.18;
          const fimR = vh * 0.58;
          t = Math.min(
            1,
            Math.max(0, (inicioR - rMarco.top) / Math.max(1, inicioR - fimR)),
          );
          const fimS = vh * CEL_SEGUE_FIM;
          segue = Math.min(1, Math.max(0, (fimR - rMarco.top) / Math.max(1, fimR - fimS)));
        }

        const rotaStr = t.toFixed(4);
        const segueStr = segue.toFixed(4);
        if (rotaStr !== ultimaRota) {
          ultimaRota = rotaStr;
          svg.style.setProperty("--rota", rotaStr);
        }
        if (segueStr !== ultimoSegue) {
          ultimoSegue = segueStr;
          svg.style.setProperty("--segue", segueStr);
        }

        const andado = t * COMPRIMENTO;
        const acesas = ATE.filter((c) => andado >= c).length;
        if (acesas !== ultimasAcesas) {
          ultimasAcesas = acesas;
          grupos.forEach((g, i) => {
            g.classList.toggle("is-acesa", i < acesas);
          });
          lis.forEach((li, i) => {
            li.classList.toggle("is-percorrida", i < acesas);
          });
        }
      });
    };

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      limpezasFoco.forEach((fn) => fn());
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  // a rota que liga as oito paradas, na ordem da viagem
  const rota = PONTOS.map((p, i) => `${i ? "L" : "M"} ${p.cx.toFixed(1)},${p.cy.toFixed(1)}`).join(" ");

  return (
    <div className="mapa-mg-ref">
      <svg
        ref={svgRef}
        className="mapa-mg"
        viewBox="0 0 100 92"
        role="img"
        aria-label="Minas Gerais, com as oito regiões atendidas pela H.M. Borçato."
      >
        <path className="mapa-mg__chao" d={SILHUETA} />
        <path className="mapa-mg__borda" d={SILHUETA} />

        <path className="mapa-mg__rota" d={rota} pathLength={1} />
        <path className="mapa-mg__segue" d={SEGUE} pathLength={1} />

        {/* Rodovias e Artérias Federais conectando a Sede BH às 8 regiões */}
        <g className="mapa-mg__arterias">
          {PONTOS.slice(1).map((p, i) => {
            const bh = PONTOS[0]!;
            const idx = i + 1;
            const ativa = focoAtivo === idx;
            return (
              <line
                key={`arteria-${p.nome}`}
                x1={bh.cx}
                y1={bh.cy}
                x2={p.cx}
                y2={p.cy}
                className={`mapa-mg__arteria${ativa ? " is-ativa" : ""}`}
              />
            );
          })}
        </g>

        {PONTOS.map((p, i) => (
          <g key={p.nome} data-regiao={p.nome} style={{ "--i": i } as React.CSSProperties}>
            <circle className="mapa-mg__alvo" cx={p.cx} cy={p.cy} r={5.5} fill="transparent" />
            <circle className="mapa-mg__halo" cx={p.cx} cy={p.cy} r={3.4} />
            <circle className="mapa-mg__ponto" cx={p.cx} cy={p.cy} r={1.5} />
            <text className="mapa-mg__num" x={p.cx} y={p.cy - 5.2}>
              {i + 1}
            </text>
          </g>
        ))}

        {/* HUD Flutuante da Rodovia Ativa */}
        {focoAtivo !== null && focoAtivo > 0 ? (
          <g
            className="mapa-mg__hud"
            transform={`translate(${PONTOS[focoAtivo]!.cx} ${PONTOS[focoAtivo]!.cy - 9})`}
          >
            <rect
              x={-24}
              y={-7}
              width={48}
              height={11}
              rx={2.5}
              className="mapa-mg__hud-bg"
            />
            <text className="mapa-mg__hud-txt" textAnchor="middle" y={-1.5}>
              {PONTOS[focoAtivo]!.rodovia}
            </text>
            <text className="mapa-mg__hud-sub" textAnchor="middle" y={2.8}>
              {PONTOS[focoAtivo]!.nome}
            </text>
          </g>
        ) : null}
      </svg>

      <div className="mapa-mg-marco" ref={rotaRef} aria-hidden />
    </div>
  );
}
