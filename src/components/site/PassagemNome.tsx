import { useEffect, useRef, useState } from "react";

import fabioTravessia from "@/assets/site/fabio-travessia.jpg";
import { empresa } from "@/lib/dados";
import { som } from "@/lib/som";

// PASSAGEM 05 · O NOME → O FECHAMENTO — "o nome revela o homem"
//
// Protótipo aprovado: laboratorio/transicoes/index.html, `#p6`. Era o único dos
// sete que nunca chegou ao site — e justamente o que fecha o arco: as letras
// H.M. viram janela, a câmera atravessa a haste do M e o Fábio ocupa a tela.
// "O nome e a pessoa sao a mesma coisa."
//
// COMO FUNCIONA (mesmo padrão da casa: o JS só escreve progresso, o CSS compõe)
//
//   · duas cópias da MESMA foto no SVG: uma solta, outra recortada por uma
//     máscara de texto "H.M.". A recortada é a janela.
//   · a máscara e o contorno escalam juntos (`--pn-z`); a foto NÃO escala.
//     Por isso não há perda de resolução: as letras é que vêm em direção ao
//     visitante, e a foto é revelada no lugar — o olho lê como câmera entrando.
//   · a foto solta entra em `--pn` 0.56 e cobre a janela antes do fim.
//
// A homenagem faz um arco, não um fade: existe no começo (explica as letras),
// sai quando a janela abre, e VOLTA no fim sobre o rosto — o nome, o homem e a
// razão do nome, nessa ordem.

const ZOOM_MAX = 6;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function PassagemNome() {
  const ref = useRef<HTMLDivElement>(null);
  const [carregada, setCarregada] = useState(false);

  // 633 KB: só entra quando a passagem se aproxima. Antes disso a máscara
  // mostra o fundo, e o contorno de H.M. já segura a composição.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setCarregada(true);
      return;
    }
    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setCarregada(true);
          io.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pedido = 0;
    let ultimo = "";
    let pulsou = false;

    const medir = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;

        // sem movimento: a cena entrega o estado que tem significado —
        // as letras como janela, com a homenagem legível. É a composição
        // que se entende parada; a foto cheia não diria nada.
        if (reduzido.matches) {
          if (ultimo === "r") return;
          ultimo = "r";
          el.style.setProperty("--pn", "0");
          el.style.setProperty("--pn-z", "1");
          el.style.setProperty("--pn-hom", "1");
          el.style.setProperty("--pn-veu", "0");
          return;
        }

        const r = el.getBoundingClientRect();
        const curso = Math.max(1, r.height - window.innerHeight);
        const t = clamp01(-r.top / curso);
        const chave = t.toFixed(4);
        if (chave === ultimo) return;
        ultimo = chave;

        // ease-in-out: o gesto acelera no meio e assenta nas pontas
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const abre = clamp01((e - 0.14) / 0.62);
        const sai = clamp01((e - 0.1) / 0.14);
        const volta = clamp01((e - 0.84) / 0.1);

        el.style.setProperty("--pn", e.toFixed(4));
        el.style.setProperty("--pn-z", Math.pow(ZOOM_MAX, abre).toFixed(4));
        el.style.setProperty("--pn-hom", Math.max(1 - sai, volta).toFixed(4));
        el.style.setProperty("--pn-veu", clamp01((e - 0.8) / 0.14).toFixed(4));

        // um pulso grave quando a câmera começa a entrar. Só soa se o
        // visitante ligou o áudio — o motor já trata isso.
        if (e > 0.14 && !pulsou) {
          pulsou = true;
          som.pulso();
        } else if (e < 0.1) {
          pulsou = false;
        }
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
    <div className="passagem-nome" ref={ref}>
      <div className="passagem-nome__cena">
        <h2 className="sr-only">H.M. Borçato — o nome revela o homem</h2>

        <svg
          className="passagem-nome__svg"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <mask id="pn-janela" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="1000">
              <rect x="0" y="0" width="1600" height="1000" fill="black" />
              <text className="passagem-nome__letra" x="800" y="520" textAnchor="middle" fill="white">
                H.M.
              </text>
            </mask>
          </defs>

          {carregada ? (
            <>
              {/* a foto inteira, que assume a tela no fim */}
              <image
                className="passagem-nome__cheia"
                href={fabioTravessia}
                x="0"
                y="-160"
                width="1600"
                height="1920"
                preserveAspectRatio="xMidYMin slice"
              />
              {/* a mesma foto, visível só através das letras */}
              <image
                className="passagem-nome__janela"
                href={fabioTravessia}
                x="0"
                y="-160"
                width="1600"
                height="1920"
                preserveAspectRatio="xMidYMin slice"
                mask="url(#pn-janela)"
              />
            </>
          ) : null}

          <text className="passagem-nome__contorno" x="800" y="520" textAnchor="middle">
            H.M.
          </text>
        </svg>

        <div className="passagem-nome__veu" aria-hidden />

        <p className="passagem-nome__homenagem">{empresa.homenagem}</p>
      </div>
    </div>
  );
}
