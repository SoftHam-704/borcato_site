import { useEffect, useRef } from "react";

import f0 from "@/assets/site/frames/0.avif";
import f1 from "@/assets/site/frames/1.avif";
import f2 from "@/assets/site/frames/2.avif";
import f3 from "@/assets/site/frames/3.avif";
import f4 from "@/assets/site/frames/4.avif";

// A FOTO VIVA — o Fábio virando o rosto conforme se rola.
//
// É a diferença entre um retrato e uma presença: ele começa olhando para quem
// chegou e vai virando para a estrada. O gesto é literalmente o assunto do site.
//
// SEQUÊNCIA DE FRAMES, não vídeo. Vídeo tem `currentTime` que engasga e pede
// codec por navegador; canvas mantém o gesto sob nosso controle. Como são só
// cinco quadros, a troca precisa ser interpolada visualmente para não virar um
// flip-book.
//
// Os 5 quadros foram gerados a partir da foto real do Fábio e VALIDADOS: a
// cabeça muda entre 8,6 e 13,9 de diferença média enquanto o corpo fica em ~6
// (tronco) e ~4 (braços). Corpo parado é o que impede o scrub de tremer.

const QUADROS = [f0, f1, f2, f3, f4];

export function FotoViva() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgsRef = useRef<HTMLImageElement[]>([]);
  const atualRef = useRef(-1);
  const progressoRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let vivo = true;
    let pedido = 0;

    /** Dimensões para cobrir o canvas (object-fit: cover na mão). */
    const dimensoes = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const escala = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * escala;
      const h = img.naturalHeight * escala;
      return { x: (cw - w) / 2, y: (ch - h) / 2, w, h };
    };

    /** Desenha um quadro com alpha e um blur mínimo no ponto médio da troca. */
    const pintar = (img: HTMLImageElement, alpha: number, blur: number) => {
      const { x, y, w, h } = dimensoes(img);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.filter = blur > 0 ? `blur(${blur}px)` : "none";
      ctx.drawImage(img, x, y, w, h);
      ctx.restore();
    };

    /** Interpola os quadros vizinhos, cobrindo o canvas (object-fit: cover). */
    const desenhar = (t: number) => {
      const posicao = Math.min(QUADROS.length - 1, Math.max(0, t * (QUADROS.length - 1)));
      const n = Math.floor(posicao);
      const frac = posicao - n;
      const atual = imgsRef.current[n];
      const proximo = imgsRef.current[Math.min(QUADROS.length - 1, n + 1)];
      if (!atual?.complete || !atual.naturalWidth) return;

      // Acelera no meio e alivia a sensação de régua no começo e no fim.
      const blur = Math.sin(frac * Math.PI) * 0.7;
      pintar(atual, 1, blur);
      if (frac > 0 && proximo?.complete && proximo.naturalWidth) {
        pintar(proximo, frac, blur);
      }
      progressoRef.current = t;
      atualRef.current = n;
    };

    /** O canvas acompanha o tamanho real da cápsula, com DPR travado em 2. */
    const dimensionar = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const larg = Math.round(r.width * dpr);
      const alt = Math.round(r.height * dpr);
      if (larg && alt && (canvas.width !== larg || canvas.height !== alt)) {
        canvas.width = larg;
        canvas.height = alt;
        // redimensionar limpa o canvas: repinta o quadro que estava
        const progresso = progressoRef.current;
        atualRef.current = -1;
        desenhar(progresso);
      }
    };

    /** Qual quadro para a posição de rolagem atual. */
    const escolher = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        if (!vivo) return;
        const vh = window.innerHeight;
        // a virada acontece na PRIMEIRA tela: começa de frente e, quando o hero
        // saiu de cena, ele já está olhando a estrada
        const bruto = Math.min(1, Math.max(0, window.scrollY / (vh * 0.85)));
        const t = bruto < 0.5
          ? 2 * bruto * bruto
          : 1 - Math.pow(-2 * bruto + 2, 2) / 2;
        desenhar(t);
      });
    };

    // carrega os cinco antes de mostrar qualquer coisa: um quadro faltando no
    // meio do scrub é pior que a foto parada
    let faltam = QUADROS.length;
    imgsRef.current = QUADROS.map((src, i) => {
      const img = new Image();
      img.decoding = "async";
      if (i === 0) img.fetchPriority = "high";
      img.onload = () => {
        faltam -= 1;
        if (i === 0) {
          dimensionar();
          desenhar(0);
        }
        if (faltam === 0 && vivo) {
          canvas.classList.add("is-pronta");
          escolher();
        }
      };
      img.src = src;
      return img;
    });

    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!semMovimento.matches) {
      window.addEventListener("scroll", escolher, { passive: true });
    }
    window.addEventListener("resize", dimensionar);

    return () => {
      vivo = false;
      window.removeEventListener("scroll", escolher);
      window.removeEventListener("resize", dimensionar);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="capsula__viva"
      role="img"
      aria-label="Fábio Borçato, sócio-fundador da H.M. Borçato."
    />
  );
}
