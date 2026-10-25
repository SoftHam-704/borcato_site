import { useEffect } from "react";
import Lenis from "lenis";

// Declara globalmente para que componentes como Abertura possam pausar/retomar
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Calcula a posição documental real (topo no fluxo) de um elemento somando
 * `offsetTop` pela cadeia de `offsetParent`, ignorando `transform` / `translate`
 * transitórios de entrada (`--cap-entra`, `--passou`, etc.).
 */
function topoNoFluxo(el: HTMLElement): number {
  let y = 0;
  let atual: HTMLElement | null = el;
  while (atual) {
    y += atual.offsetTop;
    atual = atual.offsetParent as HTMLElement | null;
  }
  return y;
}

/**
 * Calcula o destino exato de rolagem para cada âncora da travessia, levando em
 * conta as sobreposições de margem negativa e janelas sticky (`--passa`,
 * `--entrar-recuo`, `--entrega`).
 */
function calcularDestinoAncora(href: string): number | null {
  if (!href.startsWith("#") || href.length < 2) return null;
  const id = href.slice(1);
  const alvo = document.getElementById(id);
  if (!alvo) return null;

  const vh = window.innerHeight;

  if (id === "cap-casa") {
    return Math.max(0, topoNoFluxo(alvo) + 2);
  }

  if (id === "marcas-inicio" || id === "cap-marcas") {
    const capMarcas = document.getElementById("cap-marcas") ?? alvo;
    const y = topoNoFluxo(capMarcas);
    return Math.max(0, y + Math.round(vh * 0.05));
  }

  if (id === "carro-onze") {
    const y = topoNoFluxo(alvo);
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido) return Math.max(0, y);
    const abertura = Math.max(1, Math.round((alvo.offsetHeight - vh) * 0.095));
    return Math.max(0, y + abertura + 8);
  }

  if (id === "cap-estrada") {
    return Math.max(0, topoNoFluxo(alvo) + 4);
  }

  if (id === "cap-nome") {
    return Math.max(0, topoNoFluxo(alvo) + Math.round(vh * 0.06));
  }

  return Math.max(0, topoNoFluxo(alvo));
}

/**
 * SmoothScroll (Lenis) — inércia de rolagem em desktop com ponteiro fino.
 * Respeita `prefers-reduced-motion: reduce` e desativa em dispositivos de toque
 * (`pointer: coarse`), onde a inércia nativa do sistema operacional é mais
 * responsiva e não compete com gestos horizontais da esteira.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    const toque = window.matchMedia("(pointer: coarse)");

    let lenis: Lenis | null = null;
    let rafId = 0;

    const iniciar = () => {
      if (reduzido.matches || toque.matches) {
        if (lenis) {
          lenis.destroy();
          lenis = null;
          delete window.__lenis;
        }
        return;
      }
      if (lenis) return;

      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      window.__lenis = lenis;

      // Se a abertura ainda está ativa, começa parado
      if (document.body.classList.contains("is-abrindo")) {
        lenis.stop();
      }

      const raf = (time: number) => {
        if (!lenis) return;
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    //Observa a classe `is-abrindo` no body para liberar o scroll quando a cortina abrir
    const obs = new MutationObserver(() => {
      if (!lenis) return;
      if (document.body.classList.contains("is-abrindo")) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    // Intercepta cliques em links de âncora (#cap-casa, #marcas-inicio, #carro-onze, etc.)
    const aoClicarAncora = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const destino = calcularDestinoAncora(href);
      if (destino === null) return;

      e.preventDefault();
      if (window.history?.pushState) {
        window.history.pushState(null, "", href);
      }

      if (lenis && !reduzido.matches) {
        lenis.scrollTo(destino, { duration: 1.05 });
      } else {
        window.scrollTo({
          top: destino,
          behavior: reduzido.matches ? "instant" : "smooth",
        });
      }

      // Se veio do skip-link (.pular-conteudo), move o foco para o capítulo de destino
      if (link.classList.contains("pular-conteudo")) {
        const alvo = document.getElementById(href.slice(1));
        if (alvo) {
          if (!alvo.hasAttribute("tabindex")) alvo.setAttribute("tabindex", "-1");
          alvo.focus({ preventScroll: true });
        }
      }
    };

    iniciar();
    reduzido.addEventListener("change", iniciar);
    toque.addEventListener("change", iniciar);
    document.addEventListener("click", aoClicarAncora);

    return () => {
      reduzido.removeEventListener("change", iniciar);
      toque.removeEventListener("change", iniciar);
      document.removeEventListener("click", aoClicarAncora);
      obs.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        lenis = null;
        delete window.__lenis;
      }
    };
  }, []);

  return null;
}
