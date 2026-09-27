import { useEffect, useRef } from "react";

import { PONTOS as REGIOES } from "./MapaMinas";
import carroRaioX from "@/assets/site/carro-raiox.webp";
import carroRaioX800 from "@/assets/site/carro-raiox-800.webp";

// AS 11 FOTOS DE PEÇA — direto pelo nome do arquivo (`rolamento.jpg`,
// `suspensao.jpg`…), o mesmo glob de `PecaNoCursor.tsx`. NÃO uso `pecaDe()`
// daquele componente: ele espera o ID da MARCA ("ntn-snr") e devolve o nome
// do arquivo — aqui os `PECAS.id` abaixo JÁ SÃO o nome do arquivo. Passar
// "rolamento" para `pecaDe()` (que procura em `DE_QUEM["rolamento"]`,
// inexistente) sempre voltava `undefined` — as 11 miniaturas ficavam vazias
// e nenhum portão pegava, porque `document.images` não lista `<image>` de
// SVG (achado da revisão; corrigido também no portão, ver `portao.py`).
const FOTOS_PECAS = import.meta.glob<{ default: string }>("../../assets/pecas/*.jpg", {
  eager: true,
});
function fotoDaPeca(id: string): string | undefined {
  const chave = Object.keys(FOTOS_PECAS).find((k) => k.endsWith(`/${id}.jpg`));
  return chave ? FOTOS_PECAS[chave]?.default : undefined;
}

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

/** As 11 peças: id (bate com o arquivo em `assets/pecas/`), categoria, marca, vaga (ax,ay dentro
 *  do carro), lado de onde a guia sai ("t" topo / "b" base) e a posição de
 *  partida (sx) na fileira externa.
 *
 * `ax,ay` FORAM RECALIBRADAS (achado da revisão, 26/09): os valores do lab
 * miravam o desenho em linha desenhado à mão (removido — ver comentário na
 * `<image>` da foto), não a FOTO raio-X real. Sem o desenho por baixo, os
 * pontos caíam "no ar". Recalibrado contra a foto (`carro-raiox.webp`,
 * 1800×1005px) com uma grade de referência: medi em pixels da imagem onde
 * cada componente aparece e converti para o viewBox 1000×660 pela mesma
 * transformação de `<image x=58.7 y=83.4 width=893.8 height=498.7
 * preserveAspectRatio="xMidYMid meet">` (escala ≈0,4962, sem letterbox
 * vertical — a proporção da foto quase bate com a caixa). */
const PECAS: {
  id: string;
  categoria: string;
  marca: string;
  ax: number;
  ay: number;
  topo: boolean;
  sx: number;
}[] = [
  { id: "rolamento", categoria: "Rolamentos", marca: "NTN-SNR", ax: 748.7, ay: 420.8, topo: false, sx: 780 },
  { id: "suspensao", categoria: "Suspensão", marca: "Pysko", ax: 240.1, ay: 353.8, topo: false, sx: 400 },
  { id: "filtro", categoria: "Filtros", marca: "Filtros Brasil", ax: 649.5, ay: 296.8, topo: true, sx: 418 },
  { id: "oleo", categoria: "Óleo lubrificante", marca: "Hexlub", ax: 709.0, ay: 321.6, topo: false, sx: 600 },
  { id: "injetor", categoria: "Bicos injetores", marca: "Meca Brazil", ax: 719.0, ay: 289.3, topo: true, sx: 746 },
  { id: "bomba", categoria: "Bombas d’água", marca: "Nidec", ax: 793.4, ay: 334.0, topo: true, sx: 910 },
  { id: "motor", categoria: "Peças de motor", marca: "Sintech", ax: 694.2, ay: 311.7, topo: true, sx: 582 },
  { id: "lanterna", categoria: "Lanternas", marca: "Cofran", ax: 123.5, ay: 281.9, topo: true, sx: 90 },
  { id: "plastico", categoria: "Peças plásticas", marca: "VP", ax: 907.5, ay: 353.8, topo: false, sx: 930 },
  { id: "quimica", categoria: "Química automotiva", marca: "Auto América", ax: 376.3, ay: 373.7, topo: true, sx: 254 },
  { id: "spray", categoria: "Sprays", marca: "Mundial Prime", ax: 212.8, ay: 388.6, topo: false, sx: 170 },
];

export function CarroOnze() {
  const pistaRef = useRef<HTMLDivElement>(null);
  const cenaRef = useRef<HTMLDivElement>(null);
  const contaRef = useRef<HTMLSpanElement>(null);
  const fotoRef = useRef<SVGImageElement>(null);
  const carroSvgRef = useRef<SVGSVGElement>(null);
  const silRef = useRef<SVGPathElement>(null);
  const mapaGrupoRef = useRef<SVGGElement>(null);
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

    /* A LINHA DO TEMPO DA CENA — RECALIBRADA (achado da revisão, 26/09).
       O dono já tinha reclamado do ritmo apressado do palco antigo, e a
       calibração aprovada foi de UMA PEÇA POR GESTO (~220px de rolagem por
       peça, ver `war-game/d36-recuperacao-final/outputs/fases/
       f6-calibracao-palco.md`). A primeira versão desta cena dava só
       ~112px/peça (00→11 entre y5642 e y6875, medido) — o teto de altura
       era 5%. Com o teto agora em +15%, a pista pode crescer o bastante
       para caber a calibração aprovada.
       META: ~200px de leitura por peça e ~250px de pausa com o carro
       inteiro aceso, ambos medidos contra a ALTURA REAL da pista (lida de
       `pista.offsetHeight`, não um número fixo) — se a pista mudar de
       altura no CSS, as frações abaixo se recalibram sozinhas. */
    const curso = () => Math.max(1, pista.offsetHeight - window.innerHeight);
    const META_PX_POR_PECA = 200;
    const META_PX_PAUSA = 250;
    const META_PX_CLIMAX = 260;
    // as frações de desenho/explosão/mapa mantêm a MESMA PROPORÇÃO relativa
    // do lab entre si (10% desenho, 22% explosão, 10% mapa, de um total de
    // 42% "não-chegada") — só a fatia de CHEGADA (as 11 peças) e a de PAUSA
    // passam a ser dimensionadas em px reais, não em fração fixa do lab.
    const fracaoChegada = () => Math.min(0.9, (META_PX_POR_PECA * PECAS.length) / curso());
    const fracaoPausa = () => Math.min(0.3, META_PX_PAUSA / curso());
    // CLÍMAX (revisão 27/09): o mapa com as 8 regiões acesas e "Da fábrica à
    // estrada" ficava apagado — a cena inteira esmaecia com `--mapa`, no mesmo
    // instante em que o mapa surgia (um anulava o outro). Agora há um quadro
    // PARADO em brilho total, dimensionado em px, antes da ponte começar.
    const fracaoClimax = () => Math.min(0.15, META_PX_CLIMAX / curso());
    const fracaoRestante = () => Math.max(0, 1 - fracaoChegada() - fracaoPausa() - fracaoClimax());
    const PROP_DESENHO = 0.1 / 0.42;
    const PROP_EXPLOSAO = 0.14 / 0.42;
    const PROP_MAPA = 0.18 / 0.42;

    const aplicarQuadro = (e: number) => {
      const restante = fracaoRestante();
      const fDesenho = restante * PROP_DESENHO;
      const fChegada = fracaoChegada();
      const fPausa = fracaoPausa();
      const fExplosao = restante * PROP_EXPLOSAO;
      const fMapa = restante * PROP_MAPA;

      const inicioChegada = fDesenho;
      const fimChegada = inicioChegada + fChegada;
      const inicioPausa = fimChegada;
      const fimPausa = inicioPausa + fPausa;
      const inicioExplosao = fimPausa;
      const fimExplosao = inicioExplosao + fExplosao;
      const inicioMapa = fimExplosao;
      // o mapa: nomes sobem no 1º terço de fMapa, depois o CLÍMAX parado,
      // depois a ponte (resto de fMapa) até e=1
      const fimNomes = inicioMapa + fMapa * 0.35;
      const inicioPonte = fimNomes + fracaoClimax();

      const porPeca = fChegada / PECAS.length;
      // a janela de transição de CADA peça é mais larga que o passo entre
      // elas (overlap parcial, mesma proporção do lab: 0,07 de janela para
      // 0,0427 de passo — fator ≈1,64).
      const janelaPeca = porPeca * 1.64;

      let acesas = 0;
      const litPorRegiao = [0, 0, 0, 0, 0, 0, 0, 0];
      PECAS.forEach((_p, i) => {
        const k = cl((e - (inicioChegada + i * porPeca)) / janelaPeca);
        const k2 = cl((k - 0.55) / 0.45);
        const x = cl((e - (inicioExplosao + i * (fExplosao / PECAS.length / 3))) / (fExplosao * 0.7));
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

      cena.style.setProperty("--mont", cl((e - fDesenho * 0.8) / (fChegada + fPausa * 0.5)).toFixed(4));
      cena.style.setProperty("--X", cl((e - inicioExplosao) / fExplosao).toFixed(4));
      cena.style.setProperty("--mapa", cl((e - (inicioExplosao + fExplosao * 0.15)) / (fExplosao * 0.85)).toFixed(4));
      cena.style.setProperty("--rumo", cl((e - (inicioExplosao + fExplosao * 0.6)) / (fExplosao * 0.4 + fMapa * 0.2)).toFixed(4));
      cena.style.setProperty("--nomes", cl((e - inicioMapa) / (fimNomes - inicioMapa)).toFixed(4));
      // `--ponte`: SÓ depois do clímax — move o mapa até o `.mapa-mg-ref` e
      // esmaece a cena (antes os dois liam `--mapa`)
      cena.style.setProperty("--ponte", cl((e - inicioPonte) / Math.max(1e-4, 1 - inicioPonte)).toFixed(4));
      cena.style.setProperty("--c", cl(e / fDesenho).toFixed(4));
      cena.style.setProperty("--fim", cl((e - inicioPausa) / (fPausa * 0.55)).toFixed(4));
      if (contaRef.current) contaRef.current.textContent = String(acesas).padStart(2, "0");

      // O CONTRATO: `--entrega` fica em 0 durante toda a cena e sobe de 0 a 1
      // SÓ na ponte (mesma janela de `--ponte`, depois do clímax), chegando a
      // 1 quando a cena termina — é o relógio que `Capitulos.tsx` e
      // `MapaMinas.tsx` leem na raiz para abrir o capítulo A Estrada. 27/09:
      // antes subia desde a explosão, e o wipe da Estrada cortava o clímax.
      const entrega = cl((e - inicioPonte) / Math.max(1e-4, 1 - inicioPonte));
      document.documentElement.style.setProperty("--entrega", entrega.toFixed(4));

      // O ELEMENTO-PONTE (achado da revisão): sem isto, a passagem para A
      // Estrada cortava a tela ao meio — metade mapa da cena do carro,
      // metade capítulo Estrada, com uma linha dura entre os dois. Em vez
      // de deixar os dois mapas em posições independentes, o mapa da cena
      // do carro é ANIMADO até terminar EXATAMENTE no retângulo em que o
      // `.mapa-mg-ref` (o mapa real do capítulo Estrada, que nunca recebe
      // transform) vai aparecer — medido em tempo de execução a cada
      // quadro. Quando os dois coincidem, a troca não tem corte: o mapa da
      // cena esmaece exatamente onde o real assume.
      const mapaReal = document.querySelector<HTMLElement>(".cap--estrada .mapa-mg-ref");
      const grupoMapa = mapaGrupoRef.current;
      if (mapaReal && grupoMapa) {
        const alvo = mapaReal.getBoundingClientRect();
        // o retângulo ATUAL do grupo do mapa dentro do SVG do carro, sem a
        // ponte ainda aplicada (zera a transform pontual pra medir o pouso
        // "neutro" antes de mover) — como o grupo só tem opacity/translate
        // por CSS var, o rect nativo já reflete a posição não-transladada
        // do SVG (viewBox), então convertemos via matriz do próprio SVG.
        const svg = carroSvgRef.current;
        if (svg && alvo.width > 0 && alvo.height > 0) {
          const pt = svg.createSVGPoint();
          const ctm = grupoMapa.getScreenCTM();
          if (ctm) {
            // o retângulo do <g> no espaço de TELA (considera viewBox e
            // qualquer transform herdado, mas NÃO a translate/scale da
            // ponte — aplicados via CSS custom properties, que não entram
            // no CTM do SVG)
            const bbox = grupoMapa.getBBox();
            pt.x = bbox.x;
            pt.y = bbox.y;
            const p1 = pt.matrixTransform(ctm);
            pt.x = bbox.x + bbox.width;
            pt.y = bbox.y + bbox.height;
            const p2 = pt.matrixTransform(ctm);
            const atualLeft = Math.min(p1.x, p2.x);
            const atualTop = Math.min(p1.y, p2.y);
            const atualWidth = Math.abs(p2.x - p1.x) || 1;
            const atualHeight = Math.abs(p2.y - p1.y) || 1;

            const escala = Math.min(alvo.width / atualWidth, alvo.height / atualHeight);
            const alvoCx = alvo.left + alvo.width / 2;
            const alvoCy = alvo.top + alvo.height / 2;
            const atualCx = atualLeft + atualWidth / 2;
            const atualCy = atualTop + atualHeight / 2;
            // translate em PIXELS DE TELA — mas o <g> vive dentro do SVG,
            // então convertemos o deslocamento de tela para unidades do
            // viewBox dividindo pela escala do CTM (a mesma em x e y aqui,
            // porque não há distorção não-uniforme entre os dois SVGs)
            const escalaCtm = Math.hypot(ctm.a, ctm.b) || 1;
            const dxViewbox = (alvoCx - atualCx) / escalaCtm;
            const dyViewbox = (alvoCy - atualCy) / escalaCtm;

            grupoMapa.style.setProperty("--ponte-dx", dxViewbox.toFixed(2));
            grupoMapa.style.setProperty("--ponte-dy", dyViewbox.toFixed(2));
            grupoMapa.style.setProperty("--ponte-escala", escala.toFixed(4));
          }
        }
      }
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
      const r = pista.getBoundingClientRect();
      const e = cl(-r.top / curso());
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

          {/* SÓ A FOTO (achado da revisão): o desenho em linha à mão
              (TRACOS/INTERNOS/vidro/chão) voltava por cima do raio-X real —
              no lab esses traços ficam ocultos (`.d9 .vidro, .d9 .linha,
              .d9 .interno, .d9 .chao { display: none; }`), porque a imagem
              JÁ é o carro. Removidos daqui: nada de desenho manual duplicado. */}
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
          </g>

          {/* o mapa de Minas — mesma silhueta e regiões de MapaMinas.tsx.
              `--ponte-dx/dy/escala` (calculadas em tempo real, ver
              `aplicarQuadro`) movem este mapa até coincidir com o retângulo
              onde `.mapa-mg-ref` (o mapa real do capítulo Estrada) vai
              aparecer — o elemento-ponte que evita o corte seco entre as
              duas cenas. */}
          <g className="carro-onze__mapa" ref={mapaGrupoRef}>
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

          {/* as guias, do lugar de partida até a vaga dentro do carro.
              `carro-onze__desk`: SÓ DESKTOP (achado da revisão) — o
              viewBox mobile é um RECORTE (70 160 860 340), e as posições de
              partida (sx/sy, calculadas para o "varal" externo desktop)
              ficam fora dele; sem esconder, viravam linhas soltas saindo da
              tela no mobile (visto na captura de revisão). */}
          <g className="carro-onze__guias carro-onze__desk">
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

          {/* a vaga (ponto + halo) dentro do carro, onde a peça pousa — esta
              FICA no mobile (as vagas em si estão dentro do recorte, só as
              guias e a fileira externa não). */}
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
              const src = fotoDaPeca(p.id);
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
            const src = fotoDaPeca(p.id);
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
