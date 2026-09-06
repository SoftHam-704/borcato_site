import { useEffect, useRef } from "react";

import fabioEscuro from "@/assets/site/fabio-escuro.jpg";
import { empresa } from "@/lib/dados";

/**
 * O fecho tem seu próprio relógio porque a homenagem precisa existir antes da
 * pessoa entrar. O JS só escreve progresso; o CSS decide a composição de cada
 * camada e reproduz a sequência quando o visitante volta.
 */
export function FechoFabio() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pedido = 0;

    const medir = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        if (reduzido.matches) {
          el.style.setProperty("--fecho-t", "1");
          return;
        }
        const r = el.getBoundingClientRect();
        // A cena começa quando seu topo está no rodapé e termina quando o
        // painel ocupa a viewport; ao voltar, a mesma faixa reproduz o gesto.
        const t = Math.min(1, Math.max(0, (window.innerHeight - r.top) / window.innerHeight));
        el.style.setProperty("--fecho-t", t.toFixed(4));
      });
    };

    medir();
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    reduzido.addEventListener("change", medir);
    return () => {
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
      reduzido.removeEventListener("change", medir);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    <div className="fecho" ref={ref}>
      <div className="fecho__retrato">
        <img src={fabioEscuro} alt="Fábio Borçato" />
        <span aria-hidden>H.M. BORÇATO</span>
      </div>
      <div className="fecho__conteudo">
        <p className="fecho__chamada">Fale com quem roda a estrada.</p>
        <ul className="fecho__vias">
          <li>
            <a href={empresa.celular.href}>{empresa.celular.rotulo}</a>
            <span>Celular · WhatsApp</span>
          </li>
          <li>
            <a href={empresa.telefone.href}>{empresa.telefone.rotulo}</a>
            <span>Escritório · {empresa.base}</span>
          </li>
          <li>
            <a href={`mailto:${empresa.email}`}>{empresa.email}</a>
            <span>E-mail</span>
          </li>
        </ul>
        <p className="fecho__assinatura">
          {empresa.nome} — {empresa.descritor}
        </p>
      </div>
    </div>
  );
}
