import { useEffect, useRef } from "react";

/**
 * Painel independente da passagem Casa → Marcas.
 *
 * Ele observa apenas a entrada do capítulo 02. Fica fora dos dois palcos
 * sticky para nunca transformar, recortar ou antecipar a esteira das marcas.
 */
export function CortinaMarcas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const painel = ref.current;
    const alvo = document.getElementById("cap-marcas");
    if (!painel || !alvo) return;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduzido.matches) {
      painel.style.setProperty("--passagem", "1");
      return;
    }

    let pedido = 0;
    const medir = () => {
      if (pedido) return;
      pedido = requestAnimationFrame(() => {
        pedido = 0;
        const r = alvo.getBoundingClientRect();
        const janela = window.innerHeight * 0.62;
        const t = Math.min(1, Math.max(0, (window.innerHeight - r.top) / janela));
        painel.style.setProperty("--passagem", t.toFixed(4));
      });
    };

    medir();
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    <div ref={ref} className="cortina-marcas" aria-hidden>
      <div className="cortina-marcas__conteudo">
        <span>02 / As marcas</span>
        <strong>De rolamento a filtro de cabine.</strong>
        <em>Onze indústrias na mesma pasta.</em>
      </div>
      <i />
    </div>
  );
}
