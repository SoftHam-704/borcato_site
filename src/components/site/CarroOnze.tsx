import { useEffect, useRef } from "react";

import { PONTOS as REGIOES } from "./MapaMinas";
import { pecaDe } from "./PecaNoCursor";
import carroRaioX from "@/assets/site/carro-raiox.webp";
import carroRaioX800 from "@/assets/site/carro-raiox-800.webp";

// A CENA-ASSINATURA — substitui o PalcoPecas (lab, item ★, âncora `#p9`).
//
// O Fábio não vende uma peça: representa ONZE indústrias que, juntas, cobrem
// o carro inteiro. Aqui isso vira imagem. O carro nasce apagado, em raio-X, e
// ganha luz conforme as 11 peças chegam — cada uma pousa numa vaga e uma guia
// a liga ao componente dela lá dentro. Contador 00→11. PAUSA com o carro
// inteiro aceso ("Onze indústrias. Um carro inteiro."). Depois a EXPLOSÃO:
// cada peça voa até uma das 8 regiões de Minas — "Da fábrica à estrada. Oito
// regiões de Minas." Rolando de volta, tudo se refaz ao contrário.
//
// O CONTRATO QUE NÃO PODE QUEBRAR: esta cena escreve `--entrega` (0→1) na
// RAIZ, a mesma variável que o PalcoPecas escrevia. `Capitulos.tsx`,
// `MapaMinas.tsx` e o CSS (`@property --entrega`, `.cap--estrada`) leem essa
// variável para a passagem ao capítulo A Estrada. Fica em 0 durante toda a
// cena e sobe de 0 a 1 SÓ durante a explosão para o mapa (mesma janela do
// lab: 0,68 → 1), chegando a 1 quando a cena termina — ver `war-game/specs/
// wg-fronteira-02-03.md` e a D-13 do ledger: esta fronteira custou seis
// tentativas antes de fechar.
//
// PADRÃO DA CASA: o JS só escreve variáveis de progresso (--k, --k2, --x,
// --mont, --lit, --entrega…); o CSS compõe. Sem GSAP, sem Three.js.

const cl = (v: number) => Math.min(1, Math.max(0, v));

/** As 8 regiões de Minas — MESMOS dados de `MapaMinas.tsx` (`PONTOS`), para
 *  não duplicar geografia. A silhueta também vem de lá. */
const SILHUETA_MINAS = (() => {
  // reexportada como string fixa para não importar duas vezes o módulo;
  // ver `MapaMinas.tsx` para a fonte e o porquê das coordenadas.
  return "M 42.6,6.0 L 61.5,8.4 L 67.8,13.9 L 78.0,15.8 L 85.9,21.8 L 91.4,26.9 L 94.0,34.7 L 88.3,42.6 L 82.0,47.2 L 80.4,55.5 L 85.1,62.4 L 79.6,67.5 L 73.3,71.2 L 67.0,78.1 L 59.9,81.8 L 54.4,82.8 L 46.5,86.0 L 39.5,83.2 L 33.9,79.5 L 28.4,72.1 L 18.2,61.1 L 11.9,55.5 L 6.0,52.7 L 7.2,46.3 L 12.7,41.7 L 18.2,39.8 L 26.1,37.0 L 33.9,32.4 L 38.7,25.0 L 44.2,18.6 L 46.5,12.1 Z";
})();

/** As 11 peças: id (bate com `pecaDe`), categoria, marca, vaga (ax,ay dentro
 *  do carro), lado de onde a guia sai ("t" topo / "b" base) e a posição de
 *  partida (sx) na fileira externa. Dados portados do bloco `P` do lab
 *  (laboratorio/transicoes/index.html, bloco "O carro que as onze montam"). */
const PECAS: {
  id: string;
  categoria: string;
  marca: string;
  ax: number;
  ay: number;
  topo: boolean;
  sx: number;
}[] = [
  { id: "rolamento", categoria: "Rolamentos", marca: "NTN-SNR", ax: 753.6, ay: 277.5, topo: false, sx: 780 },
  { id: "suspensao", categoria: "Suspensão", marca: "Pysko", ax: 241.9, ay: 201.5, topo: false, sx: 400 },
  { id: "filtro", categoria: "Filtros", marca: "Filtros Brasil", ax: 715.6, ay: 197.1, topo: true, sx: 418 },
  { id: "oleo", categoria: "Óleo lubrificante", marca: "Hexlub", ax: 653.1, ay: 251.6, topo: false, sx: 600 },
  { id: "injetor", categoria: "Bicos injetores", marca: "Meca Brazil", ax: 755.9, ay: 152.4, topo: true, sx: 746 },
  { id: "bomba", categoria: "Bombas d’água", marca: "Nidec", ax: 802.8, ay: 206.0, topo: true, sx: 910 },
  { id: "motor", categoria: "Peças de motor", marca: "Sintech", ax: 738.0, ay: 174.7, topo: true, sx: 582 },
  { id: "lanterna", categoria: "Lanternas", marca: "Cofran", ax: 130.2, ay: 143.4, topo: true, sx: 90 },
  { id: "plastico", categoria: "Peças plásticas", marca: "VP", ax: 898.9, ay: 246.2, topo: false, sx: 930 },
  { id: "quimica", categoria: "Química automotiva", marca: "Auto América", ax: 369.3, ay: 223.9, topo: true, sx: 254 },
  { id: "spray", categoria: "Sprays", marca: "Mundial Prime", ax: 212.9, ay: 266.3, topo: false, sx: 170 },
];

/** O contorno externo do carro em raio-X, e o que existe dentro dele — os
 *  mesmos traços do lab (`TRACOS`, `INTERNOS`), aqui só a lista de `d`. Cada
 *  peça das onze indústrias aponta para um destes componentes. */
const TRACOS = [
  "M 72,302 L 62,258 Q 60,222 96,208 L 182,170 Q 205,158 232,150 L 330,126 Q 360,120 400,119 L 560,119 Q 600,120 628,134 L 712,184 Q 725,190 742,192 L 870,210 Q 915,217 932,240 L 942,272 Q 944,296 924,302 L 858,302 A 66 66 0 0 0 726,302 L 282,302 A 66 66 0 0 0 150,302 Z",
  "M 238,184 L 272,154 Q 296,141 336,136 L 552,135 Q 590,136 612,149 L 672,184 Z",
  "M 452,136 L 452,184", "M 238,192 L 690,192", "M 452,192 L 452,296", "M 672,192 L 688,294", "M 238,192 L 236,296",
  "M 400,212 L 428,212", "M 610,212 L 638,212",
  "M 900,222 Q 922,226 930,242 L 905,244 Q 896,236 900,222 Z", "M 66,236 L 92,222 L 96,244 L 68,252 Z",
  "M 880,280 L 940,282", "M 64,282 L 120,284", "M 676,186 L 700,176 L 706,190 Z",
  "M 740,306 A 52 52 0 1 0 844,306 A 52 52 0 1 0 740,306", "M 758,306 A 34 34 0 1 0 826,306 A 34 34 0 1 0 758,306",
  "M 164,306 A 52 52 0 1 0 268,306 A 52 52 0 1 0 164,306", "M 182,306 A 34 34 0 1 0 250,306 A 34 34 0 1 0 182,306",
];

function mola(x: number, y1: number, y2: number, w: number) {
  let d = `M ${x},${y1}`;
  const n = 7;
  const h = (y2 - y1) / n;
  for (let i = 1; i <= n; i++) d += ` L ${(x + (i % 2 ? w : -w)).toFixed(1)},${(y1 + h * i).toFixed(1)}`;
  return d;
}
function raios(cx: number, cy: number) {
  let d = "";
  for (let i = 0; i < 5; i++) {
    const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    d += ` M ${(cx + Math.cos(a) * 11).toFixed(1)},${(cy + Math.sin(a) * 11).toFixed(1)} L ${(cx + Math.cos(a) * 32).toFixed(1)},${(cy + Math.sin(a) * 32).toFixed(1)}`;
  }
  return d;
}
function circ(cx: number, cy: number, r: number) {
  return `M ${cx - r},${cy} A ${r} ${r} 0 1 0 ${cx + r},${cy} A ${r} ${r} 0 1 0 ${cx - r},${cy}`;
}
const INTERNOS: { classe: string; d: string }[] = [
  { classe: "interno metal cheio", d: "M 738,204 L 852,204 L 852,246 L 738,246 Z" },
  { classe: "interno metal", d: "M 752,204 L 752,192 L 772,192 L 772,204 M 780,204 L 780,192 L 800,192 L 800,204 M 808,204 L 808,192 L 828,192 L 828,204" },
  { classe: "interno metal", d: "M 744,188 L 846,188 M 758,188 L 758,180 M 786,188 L 786,180 M 814,188 L 814,180 M 838,188 L 838,180" },
  { classe: "interno metal", d: "M 750,246 L 846,246 L 838,264 L 758,264 Z" },
  { classe: "interno metal", d: circ(868, 222, 10) + " " + circ(872, 244, 7) + " M 868,212 L 872,237 M 878,222 L 879,244" },
  { classe: "interno metal cheio", d: "M 716,212 L 732,212 L 732,244 L 716,244 Z M 716,220 L 732,220 M 716,236 L 732,236" },
  { classe: "interno", d: "M 904,236 L 916,236 L 916,278 L 904,278 Z M 904,246 L 916,246 M 904,256 L 916,256 M 904,266 L 916,266" },
  { classe: "interno", d: "M 694,200 L 714,200 L 714,216 L 694,216 Z" },
  { classe: "interno metal", d: circ(792, 306, 24) + " " + circ(792, 306, 8) + raios(792, 306) },
  { classe: "interno metal", d: circ(216, 306, 24) + " " + circ(216, 306, 8) + raios(216, 306) },
  { classe: "interno metal", d: "M 776,286 Q 792,276 808,286" },
  { classe: "interno metal", d: "M 200,286 Q 216,276 232,286" },
  { classe: "interno", d: mola(792, 212, 262, 7) + " M 788,206 L 796,206" },
  { classe: "interno", d: mola(216, 206, 256, 7) + " M 212,200 L 220,200" },
  { classe: "interno", d: "M 760,266 Q 740,288 700,292 L 300,292 M 190,292 L 96,292 M 190,286 L 300,286 L 300,298 L 190,298 Z" },
  { classe: "interno", d: "M 240,306 L 768,306" },
  { classe: "interno cheio", d: "M 292,262 L 392,262 Q 398,262 398,268 L 398,280 Q 398,286 392,286 L 292,286 Q 286,286 286,280 L 286,268 Q 286,262 292,262 Z" },
  { classe: "interno", d: "M 520,240 L 520,200 Q 520,176 544,172 L 556,172 M 520,240 L 588,240 L 592,226 L 530,226" },
  { classe: "interno", d: "M 330,240 L 330,196 Q 330,176 352,172 L 362,172 M 330,240 L 404,240 L 408,226 L 340,226" },
  { classe: "interno", d: "M 636,196 Q 652,178 664,186 Q 668,200 650,208 Q 634,210 636,196 Z M 650,197 L 612,230" },
];

export function CarroOnze() {
  const pistaRef = useRef<HTMLDivElement>(null);
  const cenaRef = useRef<HTMLDivElement>(null);
  const contaRef = useRef<HTMLSpanElement>(null);
  const fotoRef = useRef<SVGImageElement>(null);
  const carroSvgRef = useRef<SVGSVGElement>(null);
  const silRef = useRef<SVGPathElement>(null);
  // um <g> por peça: guia, ponto+halo, a peça voadora e o rótulo
  const pecaRefs = useRef<(SVGGElement | null)[]>([]);
  const guiaRefs = useRef<(SVGPathElement | null)[]>([]);
  const regRefs = useRef<(SVGGElement | null)[]>([]);
  const regPosRef = useRef<{ x: number; y: number }[]>([]);
  // no celular a lista substitui as guias/rótulos (não cabem em tela estreita);
  // cada <li> lê as mesmas --k2/--x da peça correspondente (ver `.carro-onze__lista`)
  const listaRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const pista = pistaRef.current;
    const cena = cenaRef.current;
    if (!pista || !cena) return;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");

    /** onde o mapa mora dentro do desenho, e para onde cada peça voa —
     *  recalculado no resize porque a geometria muda com o breakpoint. */
    const medirGeometria = () => {
      const celular = window.innerWidth < 768;
      if (fotoRef.current) {
        fotoRef.current.setAttribute("href", celular ? carroRaioX800 : carroRaioX);
      }
      if (carroSvgRef.current) {
        carroSvgRef.current.setAttribute("viewBox", celular ? "70 160 860 340" : "0 0 1000 660");
      }
      const s = celular ? 2.5 : 4.6;
      const tx = 500 - 50 * s;
      const ty = celular ? 278 : 118;
      silRef.current?.setAttribute("transform", `translate(${tx} ${ty}) scale(${s})`);

      const ladoEsquerdo = new Set(["Centro-Oeste", "Sul de Minas", "Triângulo"]);
      regPosRef.current = REGIOES.map((r) => ({ x: tx + r.cx * s, y: ty + r.cy * s }));
      regRefs.current.forEach((g, i) => {
        if (!g) return;
        const pos = regPosRef.current[i]!;
        const esquerda = ladoEsquerdo.has(REGIOES[i]!.nome);
        const halo = g.querySelector<SVGCircleElement>(".carro-onze__reg-halo");
        const ponto = g.querySelector<SVGCircleElement>(".carro-onze__reg-ponto");
        const nome = g.querySelector<SVGTextElement>(".carro-onze__reg-nome");
        [halo, ponto].forEach((c) => {
          c?.setAttribute("cx", pos.x.toFixed(1));
          c?.setAttribute("cy", pos.y.toFixed(1));
        });
        if (nome) {
          nome.setAttribute("text-anchor", esquerda ? "end" : "start");
          nome.setAttribute("x", (pos.x + (esquerda ? -12 : 12)).toFixed(1));
          nome.setAttribute("y", (pos.y + 4).toFixed(1));
        }
      });
      PECAS.forEach((p, i) => {
        const g = pecaRefs.current[i];
        const reg = regPosRef.current[i % 8]!;
        const sy = p.topo ? 92 : 566;
        g?.style.setProperty("--mx", (reg.x - p.sx).toFixed(1));
        g?.style.setProperty("--my", (reg.y - sy).toFixed(1));
      });
    };

    /* a linha do tempo da cena, amarrada à rolagem (mesma janela do lab):
       0,00-0,10 o carro se desenha · 0,10-0,57 as onze peças chegam
       0,57-0,68 PAUSA: o carro inteiro, aceso · 0,68-0,90 a explosão leva
       as peças às regiões · 0,90-1,00 o mapa de Minas com as 8 acesas */
    const aplicarQuadro = (e: number) => {
      let acesas = 0;
      const litPorRegiao = [0, 0, 0, 0, 0, 0, 0, 0];
      PECAS.forEach((_p, i) => {
        const k = cl((e - (0.1 + i * 0.042)) / 0.07);
        const k2 = cl((k - 0.55) / 0.45);
        const x = cl((e - (0.68 + i * 0.013)) / 0.15);
        const g = pecaRefs.current[i];
        g?.style.setProperty("--k", k.toFixed(4));
        g?.style.setProperty("--k2", k2.toFixed(4));
        g?.style.setProperty("--x", x.toFixed(4));
        guiaRefs.current[i]?.style.setProperty("--k", k.toFixed(4));
        const li = listaRefs.current[i];
        li?.style.setProperty("--k2", k2.toFixed(4));
        li?.style.setProperty("--x", x.toFixed(4));
        if (k2 > 0.6) acesas++;
        const reg = i % 8;
        litPorRegiao[reg] = Math.max(litPorRegiao[reg]!, cl((x - 0.8) / 0.2));
      });
      regRefs.current.forEach((g, i) => g?.style.setProperty("--lit", litPorRegiao[i]!.toFixed(4)));

      cena.style.setProperty("--mont", cl((e - 0.08) / 0.5).toFixed(4));
      cena.style.setProperty("--X", cl((e - 0.68) / 0.12).toFixed(4));
      cena.style.setProperty("--mapa", cl((e - 0.7) / 0.14).toFixed(4));
      cena.style.setProperty("--rumo", cl((e - 0.8) / 0.08).toFixed(4));
      cena.style.setProperty("--nomes", cl((e - 0.88) / 0.08).toFixed(4));
      cena.style.setProperty("--c", cl(e / 0.1).toFixed(4));
      cena.style.setProperty("--fim", cl((e - 0.57) / 0.06).toFixed(4));
      if (contaRef.current) contaRef.current.textContent = String(acesas).padStart(2, "0");

      // O CONTRATO: `--entrega` fica em 0 durante toda a cena e sobe de 0 a 1
      // SÓ na explosão para o mapa (mesma janela de `--X`/`--mapa`: 0,68→1),
      // chegando a 1 quando a cena termina — é o relógio que `Capitulos.tsx`
      // e `MapaMinas.tsx` leem na raiz para abrir o capítulo A Estrada.
      const entrega = cl((e - 0.68) / 0.32);
      document.documentElement.style.setProperty("--entrega", entrega.toFixed(4));
    };

    if (reduzido.matches) {
      // sem movimento: a cena mostra o estado final (carro montado, peças nas
      // regiões) e entrega o capítulo seguinte já revelado — mesmo padrão do
      // PalcoPecas em `prefers-reduced-motion`.
      medirGeometria();
      aplicarQuadro(1);
      pista.style.height = "auto";
      return;
    }

    let pedido = 0;
    const quadro = () => {
      pedido = 0;
      const curso = Math.max(1, pista.offsetHeight - window.innerHeight);
      const r = pista.getBoundingClientRect();
      const e = cl(-r.top / curso);
      aplicarQuadro(e);
    };
    const pedir = () => {
      if (!pedido) pedido = window.requestAnimationFrame(quadro);
    };
    const medir = () => {
      medirGeometria();
      quadro();
    };

    medir();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", medir);
    reduzido.addEventListener("change", medir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", medir);
      reduzido.removeEventListener("change", medir);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    <div className="carro-onze" ref={pistaRef}>
      <div className="carro-onze__cena" ref={cenaRef}>
        <div className="carro-onze__topo">
          <h3>
            Onze indústrias. <b>Uma estrada só.</b>
          </h3>
          <p className="carro-onze__final">
            Onze indústrias. <span>Um carro inteiro.</span>
          </p>
          <p className="carro-onze__rumo">
            Da fábrica à estrada. <span>Oito regiões de Minas.</span>
          </p>
          <div className="carro-onze__conta">
            <span ref={contaRef}>00</span> <small>/ 11</small>
          </div>
        </div>

        <svg
          className="carro-onze__svg"
          ref={carroSvgRef}
          viewBox="0 0 1000 660"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Um carro desenhado em linha, montado pelas peças das onze indústrias"
        >
          <defs>
            <clipPath id="carro-onze-circ" clipPathUnits="objectBoundingBox">
              <circle cx="0.5" cy="0.5" r="0.5" />
            </clipPath>
            <radialGradient id="carro-onze-borda" cx="0.5" cy="0.52" r="0.56">
              <stop offset="0.72" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </radialGradient>
            <mask id="carro-onze-fade" maskContentUnits="objectBoundingBox">
              <rect width="1" height="1" fill="url(#carro-onze-borda)" />
            </mask>
          </defs>

          <g className="carro-onze__carroG">
            <image
              ref={fotoRef}
              className="carro-onze__foto"
              href={carroRaioX}
              x={58.7}
              y={83.4}
              width={893.8}
              height={498.7}
              mask="url(#carro-onze-fade)"
              preserveAspectRatio="xMidYMid meet"
            />
            <g transform="translate(0 150)">
              <path className="carro-onze__chao" d="M 30,362 L 970,362" />
              <g>
                {TRACOS.map((d, i) => (
                  <path key={i} className="carro-onze__linha" d={d} pathLength={1} />
                ))}
              </g>
              <g>
                {INTERNOS.map((it, i) => (
                  <path key={i} className={`carro-onze__${it.classe.replace(/ /g, " carro-onze__")}`} d={it.d} pathLength={1} />
                ))}
              </g>
              <g className="carro-onze__vivos">
                {TRACOS.map((d, i) => (
                  <path key={i} className="carro-onze__linha carro-onze__linha--viva" d={d} pathLength={1} />
                ))}
              </g>
              <g className="carro-onze__dentroVivo">
                {INTERNOS.map((it, i) => (
                  <path key={i} className={`carro-onze__${it.classe.replace(/ /g, " carro-onze__")}`} d={it.d} pathLength={1} />
                ))}
              </g>
            </g>
          </g>

          {/* o mapa de Minas — mesma silhueta e regiões de MapaMinas.tsx */}
          <g className="carro-onze__mapa">
            <path ref={silRef} className="carro-onze__mgSil" d={SILHUETA_MINAS} />
            <g>
              {REGIOES.map((r, i) => (
                <g
                  key={r.nome}
                  ref={(el) => {
                    regRefs.current[i] = el;
                  }}
                  className="carro-onze__reg"
                >
                  <circle className="carro-onze__reg-halo" r={7} />
                  <circle className="carro-onze__reg-ponto" r={5} />
                  <text className="carro-onze__reg-nome">{r.nome}</text>
                </g>
              ))}
            </g>
          </g>

          {/* as guias, do lugar de partida até a vaga dentro do carro */}
          <g className="carro-onze__guias">
            {PECAS.map((p, i) => {
              const sy = p.topo ? 92 : 566;
              const ey = p.topo ? sy + 44 : sy - 44;
              const d = `M ${p.sx},${ey} L ${p.ax},${p.ay}`;
              return (
                <path
                  key={p.id}
                  ref={(el) => {
                    guiaRefs.current[i] = el;
                  }}
                  className="carro-onze__guia"
                  d={d}
                  pathLength={1}
                />
              );
            })}
          </g>

          {/* a vaga (ponto + halo) dentro do carro, onde a peça pousa */}
          <g className="carro-onze__pontos">
            {PECAS.map((p) => (
              <g key={p.id}>
                <circle className="carro-onze__halo" cx={p.ax} cy={p.ay} r={9} />
                <circle className="carro-onze__ponto" cx={p.ax} cy={p.ay} r={4.5} />
              </g>
            ))}
          </g>

          {/* as 11 peças voadoras, com a categoria e a marca */}
          <g className="carro-onze__pecas carro-onze__desk">
            {PECAS.map((p, i) => {
              const sy = p.topo ? 92 : 566;
              const R = 44;
              const src = pecaDe(p.id);
              return (
                <g
                  key={p.id}
                  ref={(el) => {
                    pecaRefs.current[i] = el;
                  }}
                  className="carro-onze__peca"
                  style={{ "--dx": ((p.sx - 500) * 1.3).toFixed(1), "--dy": ((sy - 330) * 1.6).toFixed(1) } as React.CSSProperties}
                >
                  {src ? (
                    <image
                      href={src}
                      x={p.sx - R}
                      y={sy - R}
                      width={2 * R}
                      height={2 * R}
                      clipPath="url(#carro-onze-circ)"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  ) : null}
                  <circle className="carro-onze__aro" cx={p.sx} cy={sy} r={R} />
                  <text className="carro-onze__rot" x={p.sx} y={p.topo ? 26 : 630}>
                    <tspan className="carro-onze__cat" x={p.sx}>
                      {p.categoria}
                    </tspan>
                    <tspan className="carro-onze__mar" x={p.sx} dy={18}>
                      {p.marca}
                    </tspan>
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* NO CELULAR: a lista das peças acendendo, em vez das guias/rótulos
            (que não cabem em tela estreita) — ver `.carro-onze__lista`. */}
        <ul className="carro-onze__lista">
          {PECAS.map((p, i) => {
            const src = pecaDe(p.id);
            return (
              <li
                key={p.id}
                ref={(el) => {
                  listaRefs.current[i] = el;
                }}
              >
                {src ? <img src={src} alt="" /> : null}
                <span>
                  <b>{p.categoria}</b>
                  <small>{p.marca}</small>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
