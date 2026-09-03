import { useEffect, useRef, useState } from "react";

// A PEÇA PRESA AO CURSOR — o capítulo 02 deixa de ser lista.
//
// Passando sobre cada marca, a peça que ela fornece aparece seguindo o cursor.
// Referência: a prévia de projeto do lukebaffait.fr, onde a capa segue o ponteiro
// sobre a lista de trabalhos.
//
// Por que isto importa aqui: era o achado nº 1 do júri — "depois do hero, o site
// é texto sobre preto até o fim". Num site sobre um homem que vende rolamento,
// filtro e lanterna, não aparecia um rolamento, um filtro nem uma lanterna.
//
// As 11 peças foram geradas, normalizadas (mesma luz, mesmo preto, mesmo
// enquadramento) e tratadas em duotom na paleta do site. Nenhuma tem marca
// visível: seriam logos de terceiro em contexto não autorizado.
//
// NO CELULAR NÃO EXISTE CURSOR. A spec obriga a definir o comportamento em
// toque aqui, não depois: lá a peça entra no próprio card quando ele chega à
// tela (ver `.marcas-lista li` no CSS). Sem isso o capítulo 02 voltaria a ser
// lista exatamente onde parte do público vai olhar.

const pecas = import.meta.glob<{ default: string }>("../../assets/pecas/*.jpg", {
  eager: true,
});

/** Qual arquivo de peça pertence a cada representada. */
const DE_QUEM: Record<string, string> = {
  "ntn-snr": "rolamento",
  "filtros-brasil": "filtro",
  nidec: "bomba",
  cofran: "lanterna",
  pysko: "suspensao",
  hexlub: "oleo",
  "meca-brazil": "injetor",
  "auto-america": "quimica",
  "mundial-prime": "spray",
  sintech: "motor",
  vp: "plastico",
};

export function pecaDe(id: string): string | undefined {
  const nome = DE_QUEM[id];
  if (!nome) return undefined;
  const chave = Object.keys(pecas).find((k) => k.endsWith(`/${nome}.jpg`));
  return chave ? pecas[chave]?.default : undefined;
}

export function PecaNoCursor() {
  const caixaRef = useRef<HTMLDivElement>(null);
  const [peca, setPeca] = useState<string | null>(null);
  const alvo = useRef({ x: 0, y: 0 });
  const atual = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // só onde existe ponteiro fino; em toque o card se acende sozinho
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const lista = document.querySelector<HTMLElement>(".marcas-lista");
    if (!lista) return;

    const aoMover = (e: PointerEvent) => {
      alvo.current = { x: e.clientX, y: e.clientY };
    };
    const aoEntrar = (e: PointerEvent) => {
      const li = (e.target as HTMLElement).closest<HTMLElement>("li[data-marca]");
      setPeca(li?.dataset["peca"] ?? null);
      // ANCORA na linha ao entrar nela. Sem isto a peca nasce onde o ponteiro
      // estava por ultimo e "viaja" ate o destino — medido: 165px de residuo,
      // com a peca parada sobre o titulo em vez de sobre a marca.
      if (li) {
        const r = li.getBoundingClientRect();
        alvo.current = { x: e.clientX, y: r.top + r.height / 2 };
        if (!atual.current.x && !atual.current.y) {
          atual.current = { ...alvo.current };
        }
      }
    };
    const aoSair = () => setPeca(null);

    lista.addEventListener("pointermove", aoMover);
    lista.addEventListener("pointerover", aoEntrar);
    lista.addEventListener("pointerleave", aoSair);

    // a peça persegue o cursor com atraso: seguir 1:1 fica nervoso e "colado"
    let vivo = true;
    const seguir = () => {
      if (!vivo) return;
      atual.current.x += (alvo.current.x - atual.current.x) * 0.14;
      atual.current.y += (alvo.current.y - atual.current.y) * 0.14;
      const el = caixaRef.current;
      if (el) {
        el.style.setProperty("--peca-x", `${atual.current.x.toFixed(1)}px`);
        el.style.setProperty("--peca-y", `${atual.current.y.toFixed(1)}px`);
      }
      requestAnimationFrame(seguir);
    };
    requestAnimationFrame(seguir);

    return () => {
      vivo = false;
      lista.removeEventListener("pointermove", aoMover);
      lista.removeEventListener("pointerover", aoEntrar);
      lista.removeEventListener("pointerleave", aoSair);
    };
  }, []);

  return (
    <div
      ref={caixaRef}
      className={`peca-cursor${peca ? " is-visivel" : ""}`}
      aria-hidden
    >
      {peca ? <img src={peca} alt="" /> : null}
    </div>
  );
}
