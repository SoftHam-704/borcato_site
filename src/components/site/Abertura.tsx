import { useEffect, useRef, useState } from "react";

// A ABERTURA — o evento antes do hero.
//
// O preloader anterior era do Lovable: um contador FALSO (`Math.random()`) que
// segurava a página ~2,5s girando "Representação / Comercial / Marketing", que é
// a linguagem de categoria que a direção recusou. Eu removi e não coloquei nada
// no lugar — e o dono apontou: "não existe transição elegante entre o preloader
// e o hero". Os três sites de referência (landonorris.com, noomoagency.com,
// igloo.inc) abrem com evento.
//
// A diferença para um preloader: isto não mede carregamento nenhum, e não mente
// sobre progresso. É uma ABERTURA — quatro tempos, 3,4s, com botão de pular.
//
// O gesto é o do próprio site: a cápsula (a forma que o cliente escolheu) se abre
// e o hero está atrás dela. A porta e a travessia são a mesma coisa.

const TEMPOS = {
  luz: 250, // a luz acende no escuro
  nome: 700, // "H.M. BORÇATO" se monta, letra a letra
  capsula: 2000, // a cápsula se abre e revela o hero
  fim: 3400, // a camada sai do caminho
} as const;

const CHAVE = "hmb-abertura";

export function Abertura() {
  const [saindo, setSaindo] = useState(false);
  const [fora, setFora] = useState(false);
  const [fase, setFase] = useState<"escuro" | "luz" | "nome" | "abrindo">("escuro");
  const relogios = useRef<number[]>([]);

  const encerrar = () => {
    relogios.current.forEach(clearTimeout);
    relogios.current = [];
    setSaindo(true);
    document.body.classList.remove("is-abrindo");
    window.setTimeout(() => setFora(true), 700);
    try {
      sessionStorage.setItem(CHAVE, "1");
    } catch {
      /* sessionStorage bloqueado: a abertura roda de novo, e tudo bem */
    }
  };

  useEffect(() => {
    // quem já viu nesta sessão vai direto ao site
    let jaViu = false;
    try {
      jaViu = sessionStorage.getItem(CHAVE) === "1";
    } catch {
      jaViu = false;
    }
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (jaViu || semMovimento) {
      setFora(true);
      return;
    }

    document.body.classList.add("is-abrindo");
    const t = (ms: number, fn: () => void) => relogios.current.push(window.setTimeout(fn, ms));

    t(TEMPOS.luz, () => setFase("luz"));
    t(TEMPOS.nome, () => setFase("nome"));
    t(TEMPOS.capsula, () => setFase("abrindo"));
    t(TEMPOS.fim, encerrar);

    // Esc pula, como em qualquer coisa que segura o visitante
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") encerrar();
    };
    window.addEventListener("keydown", aoTeclar);

    return () => {
      relogios.current.forEach(clearTimeout);
      window.removeEventListener("keydown", aoTeclar);
      document.body.classList.remove("is-abrindo");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fora) return null;

  return (
    <div
      className={`abertura fase-${fase}${saindo ? " is-saindo" : ""}`}
      role="presentation"
      aria-hidden
    >
      {/* a luz que acende — o mesmo cone que recorta o rosto do Fábio na foto */}
      <span className="abertura__luz" />

      <div className="abertura__nome">
        {/* cada letra entra por conta própria: o nome se MONTA, não aparece */}
        {"H.M.".split("").map((c, i) => (
          <span key={`a${i}`} style={{ "--i": i } as React.CSSProperties}>
            {c}
          </span>
        ))}
        <b className="abertura__sobrenome">
          {"BORÇATO".split("").map((c, i) => (
            <span key={`b${i}`} style={{ "--i": i + 4 } as React.CSSProperties}>
              {c}
            </span>
          ))}
        </b>
      </div>

      <p className="abertura__pe">Representação comercial · Belo Horizonte</p>

      <button type="button" className="abertura__pular" onClick={encerrar}>
        Pular
      </button>
    </div>
  );
}
