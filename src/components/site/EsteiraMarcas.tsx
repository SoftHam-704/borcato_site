import { useEffect, useRef, type ReactNode } from "react";

import { representadas } from "@/lib/dados";

// A ESTEIRA DAS INDÚSTRIAS — a seção inteira anda de lado (ref. landonorris.com).
//
// O dono, sobre o Norris: "esse carrossel que roda a seção inteira é o máximo".
// E sobre a nossa barra de logos no hero: "muito pequeno". Aqui as onze ficam
// GRANDES, cada uma com o portal dela, e a esteira abre o capítulo 02 — as onze
// de uma vez; depois o palco detalha uma a uma. O palco fica.
//
// A MECÂNICA, medida no site dele (arsenal, 03/09): a seção gruda (sticky), o
// trilho recebe translateX negativo LINEAR 1:1 com a rolagem — cada pixel rolado
// para baixo move o trilho um pixel para o lado. A profundidade NÃO vem de 3D:
// vem das larguras desiguais dos cartões (lá: 264, 284, 589px) e de eles
// ficarem em alturas diferentes. É composição.
//
// Sem biblioteca: o padrão da casa (JS escreve a peça, CSS compõe) e a pista
// presa que o hero e o palco já usam.
//
// NO CELULAR e com movimento reduzido a esteira é LIVRE: rolagem horizontal
// nativa com snap, sem pino. Um trilho preso a scroll vertical no dedo é
// desorientador, e o toque já sabe arrastar de lado.

const logos = import.meta.glob<{ default: string }>("../../assets/marcas/*.png", {
  eager: true,
});

function arquivoDe(id: string): string | undefined {
  const chave = Object.keys(logos).find((k) => k.endsWith(`/${id}.png`));
  return chave ? logos[chave]?.default : undefined;
}

/** três larguras que se alternam: é isto que dá a leitura de profundidade */
const RITMO = ["m", "g", "p"] as const;
/** e três alturas, em ciclo deslocado do das larguras para não travarem juntas */
const ALTURA = ["meio", "alto", "baixo"] as const;

export function EsteiraMarcas({ cabeca }: { cabeca?: ReactNode }) {
  const pistaRef = useRef<HTMLDivElement>(null);
  const cenaRef = useRef<HTMLDivElement>(null);
  const trilhoRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const pista = pistaRef.current;
    const cena = cenaRef.current;
    const trilho = trilhoRef.current;
    if (!pista || !cena || !trilho) return;

    const livre = window.matchMedia(
      "(max-width: 900px), (prefers-reduced-motion: reduce)",
    );
    let pedido = 0;
    let sobra = 0;

    /** quanto o trilho excede a tela: é a distância que a rolagem percorre */
    const medir = () => {
      if (livre.matches) {
        pista.classList.add("is-livre");
        pista.style.height = "";
        trilho.style.removeProperty("--esteira-x");
        return;
      }
      pista.classList.remove("is-livre");
      sobra = Math.max(0, trilho.scrollWidth - cena.clientWidth);
      // 1:1 — a pista tem exatamente a altura que o trilho tem de sobra
      pista.style.height = `calc(100vh + ${sobra}px)`;
      esfregar();
    };

    const esfregar = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        if (livre.matches || !sobra) return;
        const r = pista.getBoundingClientRect();
        const t = Math.min(1, Math.max(0, -r.top / sobra));
        trilho.style.setProperty("--esteira-x", `${(-t * sobra).toFixed(1)}px`);
      });
    };

    medir();
    window.addEventListener("scroll", esfregar, { passive: true });
    window.addEventListener("resize", medir);
    livre.addEventListener("change", medir);
    return () => {
      window.removeEventListener("scroll", esfregar);
      window.removeEventListener("resize", medir);
      livre.removeEventListener("change", medir);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    <div className="esteira" ref={pistaRef}>
      <div className="esteira__cena" ref={cenaRef}>
        {cabeca ? <div className="esteira__cabeca">{cabeca}</div> : null}

        <ul className="esteira__trilho" ref={trilhoRef} aria-label="As onze indústrias">
          {representadas.map((r, i) => {
            const src = arquivoDe(r.id);
            return (
              <li
                key={r.id}
                className={`esteira__item esteira__item--${RITMO[i % 3]} esteira__item--${ALTURA[(i * 2) % 3]}`}
              >
                {/* O CARTÃO INTEIRO É O LINK para o portal da indústria. */}
                <a
                  href={r.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${r.nome} — ${r.fornece}. Abrir o portal em nova aba.`}
                >
                  <span className="esteira__num" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="esteira__logo">
                    {src ? <img src={src} alt="" aria-hidden loading="lazy" /> : <b>{r.nome}</b>}
                  </span>
                  <span className="esteira__dizer">
                    <b>{r.nome}</b>
                    <span>{r.fornece}</span>
                  </span>
                  <span className="esteira__portal" aria-hidden>
                    Portal <i>↗</i>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
