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
// RODA SEMPRE, não uma vez por sessão. A convenção padrão é não segurar quem já
// viu, mas este site é PEÇA DE VENDA: o Fábio vai abrir na frente de distribuidor
// e de indústria, e quem recarrega na mesma reunião é justamente ele. Perder a
// abertura na segunda vez é perdê-la onde ela mais importa. Quem não quer, pula.
//
// O gesto é o do próprio site: a cápsula (a forma que o cliente escolheu) se abre
// e o hero está atrás dela. A porta e a travessia são a mesma coisa.

const TEMPOS = {
  luz: 250, // a luz acende no escuro
  nome: 700, // "H.M. BORÇATO" se monta, letra a letra
  capsula: 2000, // a cápsula se abre e revela o hero
  fim: 3400, // a camada sai do caminho
} as const;

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
    // o hero escuta isto para comecar a escrever o titulo — no instante em que a
    // capsula abre, nao antes (estaria escondido) nem depois (estaria atrasado)
    window.dispatchEvent(new CustomEvent("hmb:abriu"));
    window.setTimeout(() => setFora(true), 700);
  };

  useEffect(() => {
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (semMovimento) {
      setFora(true);
      window.dispatchEvent(new CustomEvent("hmb:abriu"));
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
    >
      {/* a luz que acende — o mesmo cone que recorta o rosto do Fábio na foto */}
      <span className="abertura__luz" aria-hidden />

      {/* ACESSIBILIDADE: o `aria-hidden` vivia no CONTAINER e engolia junto o
          botao Pular — o unico controle da cena ficava invisivel para leitor de
          tela, mas continuava focavel. Achado na revisao de 05/09.
          Agora cada peca decorativa se esconde sozinha e o botao permanece. */}
      <div className="abertura__nome" aria-hidden>
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

      <p className="abertura__pe" aria-hidden>Representação comercial · Belo Horizonte</p>

      <button type="button" className="abertura__pular" onClick={encerrar}>
        Pular
      </button>
    </div>
  );
}
