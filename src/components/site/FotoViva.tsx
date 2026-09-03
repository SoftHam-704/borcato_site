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
// SEQUÊNCIA DE FRAMES, não vídeo. A skill de produção da casa registra que o
// scrub de frames em canvas é "a versão superior do scrub de vídeo — mais suave
// e confiável entre navegadores". Vídeo tem `currentTime` que engasga e pede
// codec por navegador; canvas desenha o quadro que eu mandar.
//
// Os 5 quadros foram gerados a partir da foto real do Fábio e VALIDADOS: a
// cabeça muda entre 8,6 e 13,9 de diferença média enquanto o corpo fica em ~6
// (tronco) e ~4 (braços). Corpo parado é o que impede o scrub de tremer.

const QUADROS = [f0, f1, f2, f3, f4];

export function FotoViva() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgsRef = useRef<HTMLImageElement[]>([]);
  const atualRef = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let vivo = true;
    let pedido = 0;

    /** Desenha o quadro n, cobrindo o canvas (object-fit: cover na mão). */
    const desenhar = (n: number) => {
      const img = imgsRef.current[n];
      if (!img?.complete || !img.naturalWidth) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const escala = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * escala;
      const h = img.naturalHeight * escala;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
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
        const n = atualRef.current;
        atualRef.current = -1;
        desenhar(n < 0 ? 0 : n);
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
        const t = Math.min(1, Math.max(0, window.scrollY / (vh * 0.85)));
        const n = Math.min(QUADROS.length - 1, Math.round(t * (QUADROS.length - 1)));
        if (n !== atualRef.current) desenhar(n);
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
