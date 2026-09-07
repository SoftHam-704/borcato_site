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

/** O PASSO da esteira: quanto o dedo anda em relação ao trilho. 1 = o Norris
 *  (1:1); 0,55 = a pista encurta 45% sem mudar o tamanho dos cartões.
 *  Ver o comentário em `medir()`. */
const PASSO = 0.55;

/** três larguras que se alternam: é isto que dá a leitura de profundidade */
const RITMO = ["m", "g", "p"] as const;
/** e três alturas, em ciclo deslocado do das larguras para não travarem juntas */
const ALTURA = ["meio", "alto", "baixo"] as const;

export function EsteiraMarcas({ cabeca }: { cabeca?: ReactNode }) {
  const pistaRef = useRef<HTMLDivElement>(null);
  const cenaRef = useRef<HTMLDivElement>(null);
  const pranchaRef = useRef<HTMLDivElement>(null);
  const trilhoRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const pista = pistaRef.current;
    const cena = cenaRef.current;
    const prancha = pranchaRef.current;
    const trilho = trilhoRef.current;
    if (!pista || !cena || !prancha || !trilho) return;

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
        prancha.style.removeProperty("--esteira-x");
        return;
      }
      pista.classList.remove("is-livre");
      sobra = Math.max(0, prancha.scrollWidth - cena.clientWidth);
      // O PASSO É 0,55×, NÃO 1:1 (D-14, 06/09).
      //
      // O Norris move o trilho um pixel por pixel rolado, e eu copiei. MEDIDO:
      // com 3542px de trilho isso dava 4,9 TELAS de pista — a esteira sozinha
      // ficava maior que o hero, o capítulo 01, o 03 e o 04 SOMADOS, e a página
      // inteira em 12,9 telas.
      //
      // Com 0,55 o dedo anda 55% do caminho e o trilho percorre 100%: a pista
      // cai para 3,2 telas e a página para ~11,2. A leitura de cada cartão não
      // muda — eles continuam do mesmo tamanho; só o percurso encurta.
      //
      // (No celular a esteira é livre e nunca teve esse custo: 0,9 tela.)
      pista.style.height = `calc(100vh + ${Math.round(sobra * PASSO)}px)`;
      esfregar();
    };

    const esfregar = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        if (livre.matches || !sobra) return;
        const r = pista.getBoundingClientRect();
        const t = Math.min(1, Math.max(0, -r.top / (sobra * PASSO)));
        // A prancha inteira anda: manchete, vazios, logos e legendas preservam
        // suas relações. O trilho sozinho criava um carrossel dentro de uma
        // seção parada, que era justamente o defeito visto na referência.
        const ato = t;
        prancha.style.setProperty("--esteira-ato", ato.toFixed(4));
        // O painel vertical já reservou a apresentação da manchete. Repetir aqui
        // uma espera de 28% criava uma tela quase vazia depois da transição. A
        // prancha inteira começa a viajar assim que sua cena sticky assume.
        prancha.style.setProperty("--esteira-x", `${(-ato * sobra).toFixed(1)}px`);
        // o indicador: quanto do trilho já passou (a auditoria pediu um
        // progresso claro — sem ele o visitante não sabe onde está nas 11)
        pista.style.setProperty("--esteira-t", t.toFixed(4));
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
        <div className="esteira__prancha" ref={pranchaRef}>
          {cabeca ? <div className="esteira__cabeca">{cabeca}</div> : null}

          <ul className="esteira__trilho" ref={trilhoRef} aria-label="As onze indústrias">
            {representadas.map((r, i) => {
              const src = arquivoDe(r.id);
              return (
                <li
                  key={r.id}
                  className={`esteira__item esteira__item--${RITMO[i % 3]} esteira__item--${ALTURA[(i * 2) % 3]}`}
                >
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
            <li className="esteira__final" aria-label="Transição para o palco de peças">
              <span className="esteira__final-kicker">02 · AS MARCAS</span>
              <strong>Agora, o que cada uma coloca na estrada.</strong>
              <span>Do nome da indústria à peça que chega ao balcão.</span>
              <span className="esteira__final-arrow" aria-hidden>↗</span>
            </li>
          </ul>
        </div>

        {/* O INDICADOR: uma régua fina que enche conforme a prancha anda. */}
        <div className="esteira__regua" aria-hidden>
          <span />
        </div>
      </div>
    </div>
  );
}
