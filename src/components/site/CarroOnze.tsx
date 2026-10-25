import { useEffect, useRef } from "react";

import { PONTOS as REGIOES } from "./MapaMinas";
import carroRaioX from "@/assets/site/carro-raiox.webp";
import carroRaioX800 from "@/assets/site/carro-raiox-800.webp";
import { som } from "@/lib/som";

// AS 11 FOTOS DE PEÇA — direto pelo nome do arquivo (`rolamento.jpg`,
// `suspensao.jpg`…), o mesmo glob de `PecaNoCursor.tsx`.
const FOTOS_PECAS = import.meta.glob<{ default: string }>("../../assets/pecas/*.jpg", {
  eager: true,
});
function fotoDaPeca(id: string): string | undefined {
  const chave = Object.keys(FOTOS_PECAS).find((k) => k.endsWith(`/${id}.jpg`));
  return chave ? FOTOS_PECAS[chave]?.default : undefined;
}

const cl = (v: number) => Math.min(1, Math.max(0, v));

/** As 8 regiões de Minas — MESMOS dados de `MapaMinas.tsx` (`PONTOS`) */
const SILHUETA_MINAS = (() => {
  return "M 42.6,6.0 L 61.5,8.4 L 67.8,13.9 L 78.0,15.8 L 85.9,21.8 L 91.4,26.9 L 94.0,34.7 L 88.3,42.6 L 82.0,47.2 L 80.4,55.5 L 85.1,62.4 L 79.6,67.5 L 73.3,71.2 L 67.0,78.1 L 59.9,81.8 L 54.4,82.8 L 46.5,86.0 L 39.5,83.2 L 33.9,79.5 L 28.4,72.1 L 18.2,61.1 L 11.9,55.5 L 6.0,52.7 L 7.2,46.3 L 12.7,41.7 L 18.2,39.8 L 26.1,37.0 L 33.9,32.4 L 38.7,25.0 L 44.2,18.6 L 46.5,12.1 Z";
})();

/** As 11 peças com especificação de engenharia automotiva pesada */
const PECAS: {
  id: string;
  categoria: string;
  marca: string;
  spec: string;
  ax: number;
  ay: number;
  topo: boolean;
  sx: number;
}[] = [
  { id: "rolamento", categoria: "Rolamentos", marca: "NTN-SNR", spec: "Aço cromo ISO P5", ax: 748.7, ay: 420.8, topo: false, sx: 780 },
  { id: "suspensao", categoria: "Suspensão", marca: "Pysko", spec: "Forja temperada", ax: 240.1, ay: 353.8, topo: false, sx: 400 },
  { id: "filtro", categoria: "Filtros", marca: "Filtros Brasil", spec: "Retenção 99.8%", ax: 649.5, ay: 296.8, topo: true, sx: 418 },
  { id: "oleo", categoria: "Óleo lubrificante", marca: "Hexlub", spec: "Sintético API-SP", ax: 709.0, ay: 321.6, topo: false, sx: 600 },
  { id: "injetor", categoria: "Bicos injetores", marca: "Meca Brazil", spec: "Calibração micro", ax: 719.0, ay: 289.3, topo: true, sx: 746 },
  { id: "bomba", categoria: "Bombas d’água", marca: "Nidec", spec: "Vedação SiC OEM", ax: 793.4, ay: 334.0, topo: true, sx: 910 },
  { id: "motor", categoria: "Peças de motor", marca: "Sintech", spec: "Tolerância pesada", ax: 694.2, ay: 311.7, topo: true, sx: 582 },
  { id: "lanterna", categoria: "Lanternas", marca: "Cofran", spec: "Policarbonato UV", ax: 123.5, ay: 281.9, topo: true, sx: 90 },
  { id: "plastico", categoria: "Peças plásticas", marca: "VP", spec: "Polímero PA66", ax: 907.5, ay: 353.8, topo: false, sx: 930 },
  { id: "quimica", categoria: "Química automotiva", marca: "Auto América", spec: "Composto SiO2", ax: 376.3, ay: 373.7, topo: true, sx: 254 },
  { id: "spray", categoria: "Sprays", marca: "Mundial Prime", spec: "Anticorrosivo", ax: 212.8, ay: 388.6, topo: false, sx: 170 },
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
    // 27/09 (auditoria, rótulos de 7–8px em 768/1024): o modo LISTA vai até
    // 900px, o MESMO corte do resto do site (o sticky da Estrada também é
    // `min-width: 901px`) — um só "celular" para a cena e para a passagem.
    const telaEstreita = window.matchMedia("(max-width: 900px)");
    // a escala do mapa do carro na silhueta (ver `medirGeometria`): o pouso
    // precisa dela para casar a silhueta com a do mapa real, ponto a ponto
    let escalaSil = 4.6;
    let txSil = 270;
    let tySil = 118;

    // Cache de propriedades escritas no DOM para zerar mutações de estilo
    // redundantes quando a cena está travada em 0 (antes) ou 1 (depois).
    const cacheProps = new WeakMap<Element, Record<string, string>>();
    const definirProp = (el: Element & ElementCSSInlineStyle | null | undefined, prop: string, val: string) => {
      if (!el) return;
      let mapa = cacheProps.get(el);
      if (!mapa) {
        mapa = {};
        cacheProps.set(el, mapa);
      }
      if (mapa[prop] !== val) {
        mapa[prop] = val;
        el.style.setProperty(prop, val);
      }
    };
    let ultimaConta = "";
    let ctmInicializado = false;

    /** onde o mapa mora dentro do desenho, e para onde cada peça voa —
     *  recalculado no resize porque a geometria muda com o breakpoint. */
    const medirGeometria = () => {
      ctmInicializado = false;
      const celular = telaEstreita.matches;
      if (fotoRef.current) {
        fotoRef.current.setAttribute("href", celular ? carroRaioX800 : carroRaioX);
      }
      if (carroSvgRef.current) {
        carroSvgRef.current.setAttribute("viewBox", celular ? "70 160 860 340" : "0 0 1000 660");
      }
      const s = celular ? 2.5 : 4.6;
      const tx = 500 - 50 * s;
      const ty = celular ? 278 : 118;
      escalaSil = s;
      txSil = tx;
      tySil = ty;
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
        definirProp(g, "--mx", (reg.x - p.sx).toFixed(1));
        definirProp(g, "--my", (reg.y - sy).toFixed(1));
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

    // A PONTE, EM PX (27/09): o voo do mapa do carro até o mapa real e a
    // abertura da Estrada deixaram de caber no fim da pista — ver `aplicarPonte`
    const META_PX_VOO = 140;
    const META_PX_ABRE = 60;

    const aplicarQuadro = (eBruto: number) => {
      const e = cl(eBruto);
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
      // o mapa: nomes sobem no 1º terço de fMapa, depois o CLÍMAX parado;
      // a ponte começa em `inicioPonte` e é medida em px (ver `aplicarPonte`)
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
        const kStr = k.toFixed(4);
        const k2Str = k2.toFixed(4);
        const xStr = x.toFixed(4);
        const g = pecaRefs.current[i];
        definirProp(g, "--k", kStr);
        definirProp(g, "--k2", k2Str);
        definirProp(g, "--x", xStr);
        // a guia se desenha com --k2 (a peça já pousando), não com --k: com
        // --k ela chegava à vaga enquanto a peça ainda voava (auditoria 27/09)
        definirProp(guiaRefs.current[i], "--k2", k2Str);
        const li = listaRefs.current[i];
        definirProp(li, "--k2", k2Str);
        definirProp(li, "--x", xStr);
        if (k2 > 0.6) acesas++;
        const reg = i % 8;
        litPorRegiao[reg] = Math.max(litPorRegiao[reg]!, cl((x - 0.8) / 0.2));
      });
      regRefs.current.forEach((g, i) => definirProp(g, "--lit", litPorRegiao[i]!.toFixed(4)));

      const mapaVal = cl((e - (inicioExplosao + fExplosao * 0.15)) / (fExplosao * 0.85));
      definirProp(cena, "--mont", cl((e - fDesenho * 0.8) / (fChegada + fPausa * 0.5)).toFixed(4));
      definirProp(cena, "--X", cl((e - inicioExplosao) / fExplosao).toFixed(4));
      definirProp(cena, "--mapa", mapaVal.toFixed(4));
      definirProp(cena, "--rumo", cl((e - (inicioExplosao + fExplosao * 0.6)) / (fExplosao * 0.4 + fMapa * 0.2)).toFixed(4));
      definirProp(cena, "--nomes", cl((e - inicioMapa) / (fimNomes - inicioMapa)).toFixed(4));
      definirProp(cena, "--c", cl(e / fDesenho).toFixed(4));
      // O PICO (auditoria 27/09): os dois títulos trocavam por cross-fade no
      // mesmo lugar e ficavam ~130px dobrados. `--fim` agora sobe em 25% da
      // pausa (era 55%) e o CSS faz a troca EM SEQUÊNCIA na primeira e na
      // segunda metade dele — o título final fica cheio o resto da pausa.
      definirProp(cena, "--fim", cl((e - inicioPausa) / (fPausa * 0.25)).toFixed(4));
      const contaStr = String(acesas).padStart(2, "0");
      if (contaRef.current && ultimaConta !== contaStr) {
        if (ultimaConta !== "" && acesas > parseInt(ultimaConta, 10)) {
          som.tique();
          if (acesas === 11) som.pulso();
        }
        ultimaConta = contaStr;
        contaRef.current.textContent = contaStr;
        if (acesas === 11) {
          cena.classList.add("is-homologado");
        } else {
          cena.classList.remove("is-homologado");
        }
      }

      aplicarPonte((eBruto - inicioPonte) * curso(), e, mapaVal);
    };

    /* A PONTE CARRO → ESTRADA (reescrita na auditoria de 27/09). */
    const aplicarPonte = (pxDesdePonte: number, e: number, mapaVal: number) => {
      const raiz = document.documentElement;
      const mapaReal = document.querySelector<HTMLElement>(".cap--estrada .mapa-mg-ref");
      const capEstrada = mapaReal?.closest<HTMLElement>(".cap--estrada");
      const cenaEstrada = mapaReal?.closest<HTMLElement>(".estrada__cena");
      const svg = carroSvgRef.current;
      const grupoMapa = mapaGrupoRef.current;
      const voo = cl(pxDesdePonte / META_PX_VOO);
      if (!mapaReal || !capEstrada || !svg || !grupoMapa) {
        const vooStr = voo.toFixed(4);
        definirProp(cena, "--ponte", vooStr);
        definirProp(cena, "--cede", vooStr);
        definirProp(cena, "--funde", vooStr);
        definirProp(raiz, "--entrega", e >= 1 ? "1" : vooStr);
        return;
      }
      const vh = window.innerHeight;
      const celular = telaEstreita.matches;
      const R = mapaReal.getBoundingClientRect();
      const C = capEstrada.getBoundingClientRect().top;
      const L = vh * 0.74; // o levante do CSS de `.cap--estrada .mapa-mg`
      const P = celular
        ? Math.max(vh * 0.2, (vh - R.height) * 0.68)
        : R.top - Math.max(0, cenaEstrada?.getBoundingClientRect().top ?? 0);
      const V = R.top <= P ? R.top : Math.max(P, R.top - L);
      const entregaAlvo = V >= R.top ? 1 : 0.9 + 0.1 * cl(1 - (R.top - V) / L);

      // a abertura da Estrada (o wipe do `clip-path`, 0,38→0,72 de --entrega)
      const abre = celular
        ? cl((P + R.height + 70 - C) / META_PX_ABRE)
        : cl((pxDesdePonte - META_PX_VOO + 20) / META_PX_ABRE);
      const entrega = abre >= 1 ? entregaAlvo : abre * entregaAlvo;
      definirProp(raiz, "--entrega", entrega.toFixed(4));

      // o voo: o mapa do carro vai ao retângulo em que o real está (V)
      definirProp(cena, "--ponte", (celular ? 1 : voo).toFixed(4));
      const funde = celular ? cl((P + R.height * 0.5 - C) / (R.height * 0.5)) : abre;
      definirProp(cena, "--funde", (abre < 1 && celular ? 0 : funde).toFixed(4));
      const cede = abre < 1 ? 0 : cl((V * 0.5 - C) / Math.max(1, V * 0.5));
      definirProp(cena, "--cede", cede.toFixed(4));
      const passou = C > 0 ? Math.max(0, vh - pista.getBoundingClientRect().bottom) : 0;
      definirProp(cena, "--passou", passou.toFixed(1));

      // O POUSO, PONTO A PONTO. Só recalcula CTM quando o mapa do carro está
      // visível (`mapaVal > 0 && cede < 1`) ou na primeira medição após resize.
      if (!ctmInicializado || (mapaVal > 0 && cede < 1)) {
        const ctm = svg.getScreenCTM();
        if (ctm && R.width > 0 && R.height > 0) {
          ctmInicializado = true;
          const k = Math.min(R.width / 100, R.height / 92);
          const x0 = R.left + (R.width - 100 * k) / 2;
          const alvoTopo = celular ? Math.min(V, P) : V;
          const y0 = alvoTopo + (R.height - 92 * k) / 2;
          const S = k / (ctm.a * escalaSil);
          const tX = (x0 - ctm.e) / ctm.a - S * txSil;
          const tY = (y0 - ctm.f) / ctm.d - S * tySil;
          definirProp(grupoMapa, "--ponte-dx", tX.toFixed(2));
          definirProp(grupoMapa, "--ponte-dy", tY.toFixed(2));
          definirProp(grupoMapa, "--ponte-escala", S.toFixed(4));
        }
      }
    };

    if (reduzido.matches) {
      medirGeometria();
      PECAS.forEach((_p, i) => {
        const g = pecaRefs.current[i];
        definirProp(g, "--k", "1");
        definirProp(g, "--k2", "1");
        definirProp(g, "--x", "0");
        definirProp(guiaRefs.current[i], "--k2", "1");
        definirProp(listaRefs.current[i], "--k2", "1");
        definirProp(listaRefs.current[i], "--x", "0");
      });
      const finais: [string, string][] = [
        ["--c", "1"],
        ["--mont", "1"],
        ["--fim", "1"],
        ["--X", "0"],
        ["--mapa", "0"],
        ["--rumo", "0"],
        ["--nomes", "0"],
        ["--ponte", "0"],
        ["--cede", "0"],
        ["--funde", "0"],
        ["--passou", "0"],
      ];
      finais.forEach(([v, n]) => definirProp(cena, v, n));
      if (contaRef.current) contaRef.current.textContent = String(PECAS.length);
      pista.style.height = "auto";
      const capEstrada = document.getElementById("cap-estrada");
      const entregaSemMovimento = () => {
        const topo = capEstrada ? capEstrada.getBoundingClientRect().top : 0;
        definirProp(
          document.documentElement,
          "--entrega",
          topo <= window.innerHeight * 0.55 ? "1" : "0",
        );
      };
      entregaSemMovimento();
      window.addEventListener("scroll", entregaSemMovimento, { passive: true });
      window.addEventListener("resize", entregaSemMovimento);
      return () => {
        window.removeEventListener("scroll", entregaSemMovimento);
        window.removeEventListener("resize", entregaSemMovimento);
      };
    }

    let pedido = 0;
    const quadro = () => {
      pedido = 0;
      const r = pista.getBoundingClientRect();
      // SEM clamp: depois do fim da pista a ponte continua medindo em px
      aplicarQuadro(-r.top / curso());
    };
    const pedir = () => {
      if (!pedido) pedido = window.requestAnimationFrame(quadro);
    };
    const medir = () => {
      medirGeometria();
      quadro();
    };

    const aoMoverPonteiro = (ev: PointerEvent) => {
      if (ev.pointerType === "touch") return;
      const rect = cena.getBoundingClientRect();
      const nx = ((ev.clientX - rect.left) / rect.width) * 100;
      const ny = ((ev.clientY - rect.top) / rect.height) * 100;
      definirProp(cena, "--spot-x", `${nx.toFixed(1)}%`);
      definirProp(cena, "--spot-y", `${ny.toFixed(1)}%`);
    };

    medir();
    cena.addEventListener("pointermove", aoMoverPonteiro, { passive: true });
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", medir);
    reduzido.addEventListener("change", medir);
    return () => {
      cena.removeEventListener("pointermove", aoMoverPonteiro);
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", medir);
      reduzido.removeEventListener("change", medir);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    <div className="carro-onze" id="carro-onze" ref={pistaRef}>
      <div className="carro-onze__cena" ref={cenaRef}>
        <div className="carro-onze__topo">
          {/* "estrada só." inseparáveis (auditoria 27/09): a 375 a coluna do
              título tem ~221px e nenhuma das duas metades cabe numa linha
              (241/252px medidos) — sem o espaço fixo o "SÓ." caía sozinho na
              última linha. Fonte intocada. */}
          <h3>
            Onze indústrias. <b>Uma estrada{" "}só.</b>
          </h3>
          <p className="carro-onze__final">
            Onze indústrias. <span>Um carro inteiro.</span>
          </p>
          <p className="carro-onze__rumo">
            Da fábrica à estrada. <span>Oito regiões de Minas.</span>
          </p>
          <div className="carro-onze__conta">
            <span ref={contaRef}>00</span> <small>/ 11</small>
            <span className="carro-onze__homologado-badge" aria-hidden>
              <i className="carro-onze__homologado-led" />
              <span>SISTEMA INTEGRADO</span>
            </span>
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

          {/* as guias, do lugar de partida até a vaga dentro do carro. */}
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
                  <text className="carro-onze__rot" x={p.sx} y={p.topo ? 20 : 620}>
                    <tspan className="carro-onze__cat" x={p.sx}>
                      {p.categoria}
                    </tspan>
                    <tspan className="carro-onze__mar" x={p.sx} dy={16}>
                      {p.marca}
                    </tspan>
                    <tspan className="carro-onze__spec" x={p.sx} dy={14}>
                      {p.spec}
                    </tspan>
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* NO CELULAR: a lista das peças acendendo, em vez das guias/rótulos */}
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
                {src ? <img src={src} alt="" loading="lazy" decoding="async" /> : null}
                <span>
                  <b>{p.categoria}</b>
                  <small>{p.marca} · {p.spec}</small>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
