import { useEffect, useRef } from "react";
import { CEL_SEGUE_FIM, SEGUE_FIM } from "@/components/site/MapaMinas";

// A ESTRADA ESCREVE O NOME — passagem 4, A Estrada → O Nome (27/09).
//
// Aprovada no laboratório (`laboratorio/transicoes/index.html`, `#p5`): a rota
// pelas oito regiões termina no Triângulo e NÃO para. O traço segue, sai do
// mapa, desce pela página e escreve H.M. — as letras de traço engrossam e
// cruzam para as letras sólidas de O Nome. A empresa nasce do caminho.
//
// UM TRAÇO SÓ, em três trechos que se emendam ponta com ponta:
//   1. o elo dentro do mapa (`.mapa-mg__segue`, em MapaMinas.tsx)
//   2. a ligação (aqui): do fim do elo até o topo da haste esquerda do H
//   3. as letras (aqui): H num traço contínuo (as voltas sobre a própria haste
//      não aparecem), M emendado no pé do H, e o ponto final
//
// Mesmo padrão da Estrada: o PATH nasce das posições reais (remontado a cada
// resize e quando as fontes chegam); no scroll o JS escreve só progresso.
// Linear, sem ease — a ponta anda o que o dedo anda, trecho a trecho.

type Marcos = { s0: number; s1: number; s2: number; s3: number; fh: number; fm: number };

const lim = (v: number) => Math.min(1, Math.max(0, v));

/**
 * A anatomia de uma letra, medida no próprio desenho da fonte.
 *
 * A caixa do `<b>` é a caixa da linha, não a da tinta: as hastes do H e o
 * vértice do M só existem nos pixels. A letra é desenhada uma vez num canvas
 * com a mesma fonte da página e lida por varredura — as letras de traço
 * caem em cima das sólidas em qualquer fonte que o navegador tenha carregado.
 * Tudo relativo à origem do glifo (x) e à linha de base (y, negativo acima).
 */
function anatomia(fonte: string, ch: string) {
  const cv = document.createElement("canvas");
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.font = fonte;
  const m = ctx.measureText(ch);
  const alto = Math.ceil(m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) + 8;
  const pad = 4;
  cv.width = Math.ceil(m.actualBoundingBoxLeft + m.actualBoundingBoxRight) + pad * 2;
  cv.height = alto;
  ctx.font = fonte;
  ctx.fillStyle = "#fff";
  const ox = pad + m.actualBoundingBoxLeft;
  const base = pad + m.actualBoundingBoxAscent;
  ctx.fillText(ch, ox, base);
  const px = ctx.getImageData(0, 0, cv.width, cv.height).data;
  const cheio = (x: number, y: number) => px[(y * cv.width + x) * 4 + 3]! > 127;

  // trechos cheios numa linha / numa coluna
  const linha = (y: number) => {
    const r: [number, number][] = [];
    let ini = -1;
    for (let x = 0; x <= cv.width; x++) {
      const c = x < cv.width && cheio(x, y);
      if (c && ini < 0) ini = x;
      if (!c && ini >= 0) {
        r.push([ini - ox, x - ox]);
        ini = -1;
      }
    }
    return r;
  };
  const coluna = (x: number) => {
    const r: [number, number][] = [];
    let ini = -1;
    for (let y = 0; y <= cv.height; y++) {
      const c = y < cv.height && cheio(x, y);
      if (c && ini < 0) ini = y;
      if (!c && ini >= 0) {
        r.push([ini - base, y - base]);
        ini = -1;
      }
    }
    return r;
  };

  const topo = -m.actualBoundingBoxAscent;
  // as hastes são lidas no quarto de baixo, longe da barra do H e do V do M
  const hastes = linha(Math.round(base + topo * 0.2));
  return {
    esq: -m.actualBoundingBoxLeft,
    dir: m.actualBoundingBoxRight,
    topo,
    fundo: m.actualBoundingBoxDescent,
    avanco: m.width,
    hastes,
    coluna: (xRel: number) => coluna(Math.round(ox + xRel)),
  };
}

export function EstradaEscreve() {
  const svgRef = useRef<SVGSVGElement>(null);
  const ligaRef = useRef<SVGPathElement>(null);
  const hRef = useRef<SVGPathElement>(null);
  const mRef = useRef<SVGPathElement>(null);
  const pRef = useRef<SVGPathElement>(null);
  const faixaRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const liga = ligaRef.current;
    const letraH = hRef.current;
    const letraM = mRef.current;
    const ponto = pRef.current;
    if (!svg || !liga || !letraH || !letraM || !ponto) return;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    const largo = window.matchMedia("(min-width: 901px)");
    const capNome = document.getElementById("cap-nome");

    /** Remonta o traço a partir de onde o mapa e as letras estão AGORA. */
    const montar = (): Marcos | null => {
      const capE = document.getElementById("cap-estrada");
      const raiz = svg.parentElement;
      const pista = capE?.querySelector<HTMLElement>(".estrada");
      const cena = capE?.querySelector<HTMLElement>(".estrada__cena");
      const mapa = capE?.querySelector<SVGSVGElement>(".mapa-mg");
      const marco = capE?.querySelector<HTMLElement>(".mapa-mg-marco");
      const dizer = capE?.querySelector<HTMLElement>(".estrada__dizer");
      const titulo = capE?.querySelector<HTMLElement>(":scope > .cap__titulo");
      const corpo = capE?.querySelector<HTMLElement>(":scope > .cap__corpo");
      const bH = document.querySelector<HTMLElement>(".nome__letra--h b");
      const bM = document.querySelector<HTMLElement>(".nome__letra--m b");
      const marca = document.querySelector<HTMLElement>(".nome__marca");
      if (
        !capE ||
        !raiz ||
        !pista ||
        !cena ||
        !mapa ||
        !marco ||
        !dizer ||
        !titulo ||
        !corpo ||
        !bH ||
        !bM ||
        !marca ||
        !capNome
      ) {
        return null;
      }

      const sy = window.scrollY;
      const vh = window.innerHeight;
      const W = document.documentElement.clientWidth;
      const desktop = largo.matches;

      // O ESTADO FINAL DA ESTRADA, CONGELADO PARA MEDIR.
      // Na passagem a Estrada já está assentada (entrega 1: nada deslocado),
      // mas o resize pode acontecer em qualquer ponto da página. Por um
      // instante, síncrono e sem pintura no meio, os gestos saem e a cena
      // presa volta ao fluxo — mede-se a página como ela estará quando o traço
      // passar, e tudo volta como estava.
      const congelados: [HTMLElement | SVGSVGElement, string, string][] = [
        [capE, "transform", "none"],
        [pista, "translate", "none"],
        [mapa, "translate", "none"],
        [mapa, "scale", "1"],
        [titulo, "transform", "none"],
        [corpo, "transform", "none"],
      ];
      if (desktop) congelados.push([cena, "position", "static"]);
      const antes = congelados.map(([el, prop]) => el.style.getPropertyValue(prop));
      congelados.forEach(([el, prop, v]) => el.style.setProperty(prop, v));

      // no desktop a cena termina presa no pé da pista: é lá que o mapa está
      // quando a pista solta, e é ali que o traço sai dele
      const dCena = desktop ? pista.offsetHeight - cena.offsetHeight : 0;
      const ctm = mapa.getScreenCTM();
      const rMapa = mapa.getBoundingClientRect();
      const rDizer = dizer.getBoundingClientRect();
      const rTitulo = titulo.getBoundingClientRect();
      const texto = document.createRange();
      let direitaTexto = 0;
      [titulo, corpo].forEach((el) => {
        texto.selectNodeContents(el);
        direitaTexto = Math.max(direitaTexto, texto.getBoundingClientRect().right);
      });
      const pistaTopo = pista.getBoundingClientRect().top + sy;
      const marcoTopo = marco.getBoundingClientRect().top + sy;
      const recuo = parseFloat(getComputedStyle(capE).paddingLeft) || 20;

      congelados.forEach(([el, prop], i) => {
        if (antes[i]) el.style.setProperty(prop, antes[i]!);
        else el.style.removeProperty(prop);
      });
      if (!ctm) return null;

      const escala = ctm.a;
      const E = {
        x: ctm.a * SEGUE_FIM.x + ctm.c * SEGUE_FIM.y + ctm.e,
        y: ctm.b * SEGUE_FIM.x + ctm.d * SEGUE_FIM.y + ctm.f + sy + dCena,
      };
      const nt = Math.hypot(SEGUE_FIM.dx, SEGUE_FIM.dy);
      const t0 = { x: SEGUE_FIM.dx / nt, y: SEGUE_FIM.dy / nt };
      const mapaFundo = rMapa.bottom + sy + dCena;
      const dizerFundo = rDizer.bottom + sy + dCena;
      const dizerTopo = rDizer.top + sy + dCena;
      const tituloTopo = rTitulo.top + sy;

      // ── AS LETRAS: a tinta de verdade, no lugar final ──────────────────────
      const cs = getComputedStyle(bH);
      const fonte = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const F = parseFloat(cs.fontSize) || 100;
      const aH = anatomia(fonte, "H");
      const aM = anatomia(fonte, "M");
      const aP = anatomia(fonte, ".");
      if (!aH || !aM || !aP || aH.hastes.length < 2 || aM.hastes.length < 2) return null;
      const cv = document.createElement("canvas").getContext("2d");
      if (!cv) return null;
      cv.font = fonte;
      const asc = cv.measureText("H").fontBoundingBoxAscent;
      const rH = bH.getBoundingClientRect();
      const rM = bM.getBoundingClientRect();
      // a caixa de um inline é a área de conteúdo da fonte: a base fica a
      // `ascent` do topo dela
      const base = rH.top + sy + asc;
      const topo = base + aH.topo;

      const hEsq = aH.hastes[0]!;
      const hDir = aH.hastes[aH.hastes.length - 1]!;
      const xL = rH.left + (hEsq[0] + hEsq[1]) / 2;
      const xR = rH.left + (hDir[0] + hDir[1]) / 2;
      const haste = (hEsq[1] - hEsq[0] + (hDir[1] - hDir[0])) / 2;
      // a barra do H: o trecho cheio no meio do vão entre as hastes
      const barra = aH
        .coluna((hEsq[1] + hDir[0]) / 2)
        .find((r) => r[0] > aH.topo * 0.8 && r[1] < -2);
      const barraY = base + (barra ? (barra[0] + barra[1]) / 2 : aH.topo * 0.5);

      const mEsq = aM.hastes[0]!;
      const mDir = aM.hastes[aM.hastes.length - 1]!;
      const xML = rM.left + (mEsq[0] + mEsq[1]) / 2;
      const xMR = rM.left + (mDir[0] + mDir[1]) / 2;
      const meioM = (aM.esq + aM.dir) / 2;
      // o vértice do V: o trecho cheio mais baixo na coluna do meio do M
      const v = aM
        .coluna(meioM)
        .filter((r) => r[1] - r[0] > 2)
        .pop();
      const xV = rM.left + meioM;
      const yV = base + (v ? (v[0] + v[1]) / 2 : 0);

      // o ponto depois do M: a letra-espaçamento negativa aproxima os dois
      const ls = parseFloat(getComputedStyle(bM).letterSpacing) || 0;
      const oP = rM.left + aM.avanco + ls;
      const xP = oP + (aP.esq + aP.dir) / 2;
      const pTopo = base + aP.topo;

      const Htopo = { x: xL, y: topo };
      const f = (n: number) => n.toFixed(1);

      // ── A LIGAÇÃO: do fim do elo até o topo do H ──────────────────────────
      let d = `M ${f(E.x)},${f(E.y)}`;
      if (desktop) {
        // O VÃO LIVRE É À DIREITA (a mesma leitura da Estrada global): o
        // título e o corpo são alinhados à esquerda, as letras são centradas.
        // O traço desce o vão entre o mapa e o título, desce pela coluna livre
        // e faz a curva por cima do H.M. para entrar no topo do H.
        const direitaLetras = rM.right;
        const xc = Math.min(W - 24, Math.max(direitaTexto, direitaLetras) + Math.max(40, W * 0.04));
        // a curva cruza o vão entre o mapa e o título na diagonal e chega à
        // coluna já descendo — sem trecho reto na horizontal
        const yBanda = (Math.max(mapaFundo, dizerFundo) + tituloTopo) / 2;
        const B = { x: xc, y: yBanda + Math.min(vh * 0.08, (tituloTopo - yBanda) * 0.6) };
        const yArco = Math.max(B.y + 10, topo - F * 0.95);
        const k1 = Math.abs(B.y - E.y) * 0.3 + 40;
        const k2 = (B.y - E.y) * 0.6;
        d += ` C ${f(E.x + t0.x * k1)},${f(E.y + t0.y * k1)} ${f(B.x)},${f(B.y - k2)} ${f(B.x)},${f(B.y)}`;
        d += ` L ${f(xc)},${f(yArco)}`;
        // alças curtas: o S por cima do H.M. desce em diagonal, não deita
        const dv = (Htopo.y - yArco) * 0.45;
        d += ` C ${f(xc)},${f(yArco + dv)} ${f(Htopo.x)},${f(Htopo.y - dv)} ${f(Htopo.x)},${f(Htopo.y)}`;
      } else {
        // NO CELULAR NÃO HÁ VÃO: o conteúdo ocupa a largura toda. O traço
        // encosta na margem esquerda (metade do recuo do capítulo), desce
        // rente a ela e dobra para dentro no topo do H — que fica à esquerda.
        const xg = Math.max(6, recuo / 2);
        const dA = Math.max(34, Math.min(dizerTopo - E.y - 6, (E.x - xg) * 0.45));
        const A = { x: xg, y: E.y + dA };
        const B = { x: xg, y: Math.max(A.y + 20, topo - F * 0.9) };
        d += ` C ${f(E.x + t0.x * dA * 0.5)},${f(E.y + t0.y * dA * 0.5)} ${f(A.x)},${f(A.y - dA * 0.5)} ${f(A.x)},${f(A.y)}`;
        d += ` L ${f(B.x)},${f(B.y)}`;
        const dv = (Htopo.y - B.y) * 0.5;
        d += ` C ${f(B.x)},${f(B.y + dv)} ${f(Htopo.x)},${f(Htopo.y - dv)} ${f(Htopo.x)},${f(Htopo.y)}`;
      }

      // ── AS LETRAS, num traço ─────────────────────────────────────────────
      // H: desce a haste esquerda, volta até a barra (por cima de si mesma,
      // invisível), atravessa, sobe a haste direita e desce de novo.
      const dH =
        `M ${f(xL)},${f(topo)} L ${f(xL)},${f(base)} L ${f(xL)},${f(barraY)} ` +
        `L ${f(xR)},${f(barraY)} L ${f(xR)},${f(topo)} L ${f(xR)},${f(base)}`;
      // M: nasce no pé dele mesmo, colado ao pé do H (o M cobre a haste
      // direita do H; entre os dois pés há 2-3 px). Um tracinho emendando os
      // dois pés virava, grosso, um dente abaixo da base — medido na captura.
      const dM =
        `M ${f(xML)},${f(base)} L ${f(xML)},${f(topo)} ` +
        `L ${f(xV)},${f(yV)} L ${f(xMR)},${f(topo)} L ${f(xMR)},${f(base)}`;
      // o ponto: um toque curto, da largura da haste
      const dP = `M ${f(xP)},${f(pTopo)} L ${f(xP)},${f(base)}`;

      const yMin = Math.floor(E.y - 60);
      const yMax = Math.ceil(base + 60);
      const raizTopo = raiz.getBoundingClientRect().top + sy;
      svg.setAttribute("viewBox", `0 ${yMin} ${W} ${yMax - yMin}`);
      svg.style.top = `${yMin - raizTopo}px`;
      svg.style.width = `${W}px`;
      svg.style.height = `${yMax - yMin}px`;
      // a mesma espessura da rota no mapa (0,6 unidade do viewBox dele)
      svg.style.setProperty("--traco", `${(0.6 * escala).toFixed(2)}px`);
      svg.style.setProperty("--haste", `${haste.toFixed(1)}px`);
      liga.setAttribute("d", d);
      letraH.setAttribute("d", dH);
      letraM.setAttribute("d", dM);
      ponto.setAttribute("d", dP);
      // a faixa das letras: do topo da letra à base. O bisel das quinas do M
      // espeta para fora dela quando o traço engrossa; a letra de verdade não
      const faixa = faixaRef.current;
      if (faixa) {
        faixa.setAttribute("x", "0");
        faixa.setAttribute("y", f(topo));
        faixa.setAttribute("width", String(W));
        faixa.setAttribute("height", f(base - topo));
      }

      // ── OS TEMPOS, em pixels de rolagem ─────────────────────────────────
      // s0: o elo termina (a pista solta a cena / a âncora chega a 48%)
      // s1: a base das letras já está na tela — a escrita pode começar
      // s3: o H.M. chega perto do meio da tela (ou a foto do fecho ia entrar),
      //     sólido, com a homenagem
      // s2: fim da escrita; de s2 a s3 o traço engrossa e vira letra
      const s0 = desktop ? pistaTopo + pista.offsetHeight - vh : marcoTopo - vh * CEL_SEGUE_FIM;
      // no celular a barra de capítulos ocupa o rodapé: a base tem de passar dela
      const nav = document.querySelector<HTMLElement>(".cap-nav");
      const rNav = nav?.getBoundingClientRect();
      const rodape = rNav && rNav.top > vh / 2 ? vh - rNav.top : 0;
      let s1 = base - vh + rodape + vh * 0.04;
      s1 = Math.max(s1, s0 + vh * 0.3);
      const rMarca = marca.getBoundingClientRect();
      const centro = (rMarca.top + rMarca.bottom) / 2 + sy;
      // RESTRIÇÃO DO CLIENTE: o rosto do Fábio só no hero e no fecho. O fecho
      // vem logo depois de O Nome, e no celular a foto dele entra na tela
      // antes de o H.M. chegar ao meio. A passagem termina ANTES de a foto
      // aparecer: o nome assenta sozinho, e só então o fecho sobe.
      const retrato = document.querySelector<HTMLElement>(".fecho__retrato");
      const fecho = document.querySelector<HTMLElement>(".fecho");
      let sFoto = Infinity;
      if (retrato && fecho) {
        // sem os gestos de entrada do fecho: o lugar mais alto que a foto
        // pode ocupar (o conservador — ela nunca aparece antes disso)
        const els = [fecho, retrato];
        const antesF = els.map((el) => el.style.getPropertyValue("transform"));
        els.forEach((el) => el.style.setProperty("transform", "none"));
        sFoto = retrato.getBoundingClientRect().top + sy - vh + rodape - vh * 0.06;
        els.forEach((el, i) => {
          if (antesF[i]) el.style.setProperty("transform", antesF[i]!);
          else el.style.removeProperty("transform");
        });
      }
      const s3 = Math.max(Math.min(centro - vh * 0.4, sFoto), s1 + vh * 0.2);
      const s2 = s1 + (s3 - s1) * 0.62;

      const LH = letraH.getTotalLength();
      const LM = letraM.getTotalLength();
      const LP = ponto.getTotalLength();
      const tot = LH + LM + LP || 1;
      return { s0, s1, s2, s3, fh: LH / tot, fm: (LH + LM) / tot };
    };

    let marcos: Marcos | null = null;
    const escrever = (liga_: number, l: number, vira: number, m: Marcos) => {
      svg.style.setProperty("--liga", liga_.toFixed(4));
      svg.style.setProperty("--h", lim(l / m.fh).toFixed(4));
      svg.style.setProperty("--m", lim((l - m.fh) / (m.fm - m.fh)).toFixed(4));
      svg.style.setProperty("--ponto", lim((l - m.fm) / (1 - m.fm)).toFixed(4));
      svg.style.setProperty("--vira", vira.toFixed(4));
      capNome?.style.setProperty("--vira", vira.toFixed(4));
    };

    let pedido = 0;
    const esfregar = () => {
      if (pedido || !marcos) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        const m = marcos;
        if (!m) return;
        if (reduzido.matches) {
          // sem movimento: o estado final, direto
          escrever(1, 1, 1, m);
          return;
        }
        // LINEAR em cada trecho: a ponta anda o que o dedo anda
        const s = window.scrollY;
        escrever(
          lim((s - m.s0) / (m.s1 - m.s0)),
          lim((s - m.s1) / (m.s2 - m.s1)),
          lim((s - m.s2) / (m.s3 - m.s2)),
          m,
        );
      });
    };

    let pedidoResize = 0;
    const aoRedimensionar = () => {
      if (pedidoResize) return;
      pedidoResize = window.requestAnimationFrame(() => {
        pedidoResize = 0;
        marcos = montar() ?? marcos;
        esfregar();
      });
    };
    aoRedimensionar();

    window.addEventListener("scroll", esfregar, { passive: true });
    window.addEventListener("resize", aoRedimensionar);
    window.addEventListener("load", aoRedimensionar);
    // as fontes chegam depois e mudam o desenho das letras
    document.fonts?.ready.then(aoRedimensionar);

    return () => {
      window.removeEventListener("scroll", esfregar);
      window.removeEventListener("resize", aoRedimensionar);
      window.removeEventListener("load", aoRedimensionar);
      if (pedido) cancelAnimationFrame(pedido);
      if (pedidoResize) cancelAnimationFrame(pedidoResize);
    };
  }, []);

  return (
    <svg className="estrada-escreve" ref={svgRef} aria-hidden focusable="false">
      <path ref={ligaRef} className="estrada-escreve__liga" d="" pathLength={1} />
      <defs>
        <clipPath id="estrada-escreve-faixa">
          <rect ref={faixaRef} />
        </clipPath>
      </defs>
      <g clipPath="url(#estrada-escreve-faixa)">
        <path
          ref={hRef}
          className="estrada-escreve__letra estrada-escreve__letra--h"
          d=""
          pathLength={1}
        />
        <path
          ref={mRef}
          className="estrada-escreve__letra estrada-escreve__letra--m"
          d=""
          pathLength={1}
        />
        <path
          ref={pRef}
          className="estrada-escreve__letra estrada-escreve__letra--p"
          d=""
          pathLength={1}
        />
      </g>
    </svg>
  );
}
