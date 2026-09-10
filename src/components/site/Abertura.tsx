import { useEffect, useRef, useState } from "react";

import { anosDeEstrada, INICIO } from "@/lib/dados";

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
// sobre progresso. É uma abertura curta: monta a marca, percorre os anos e
// entrega o hero no mesmo gesto, com botão de pular.
//
// RODA SEMPRE, não uma vez por sessão. A convenção padrão é não segurar quem já
// viu, mas este site é PEÇA DE VENDA: o Fábio vai abrir na frente de distribuidor
// e de indústria, e quem recarrega na mesma reunião é justamente ele. Perder a
// abertura na segunda vez é perdê-la onde ela mais importa. Quem não quer, pula.
//
// O gesto é o do próprio site: a cápsula (a forma que o cliente escolheu) se abre
// e o hero está atrás dela. A porta e a travessia são a mesma coisa.

// ENCURTADA DE 3,4s PARA 1,9s (05/09, parecer de júri).
//
// A justificativa anterior era de negócio: o site é peça de venda, o Fábio abre
// na frente de distribuidor, e quem recarrega na mesma reunião é ele — perder a
// abertura na segunda vez é perdê-la onde mais importa. Isso continua valendo, e
// por isso ela SEGUE rodando sempre.
//
// O que o parecer inverteu foi o custo: "para um jurado, ela custa a primeira
// impressão". E é o júri que dá a nota. 3,4s antes da primeira tela é caro
// demais para quem chega sem contexto.
//
// A saída não foi amputar tempo, foi COMPRIMIR os quatro: a luz acende, o nome
// se monta, a cápsula abre, a camada sai — o gesto inteiro continua legível,
// só que em 1,9s. Assinatura, não barreira.
// AJUSTADO PARA 2,9s (05/09, fim do dia). Eu tinha comprimido de 3,4s para 1,9s
// respondendo ao parecer de juri ("para um jurado, ela custa a primeira
// impressao") — e comprimi DEMAIS: o dono viu e disse que a passagem para o
// hero ficou "extremamente rapida, precisamos de mais pausa ali".
//
// O erro foi tratar o tempo como uma coisa so. A ABERTURA em si podia encolher
// (a luz, o nome se montando); o que nao podia era a ENTREGA — o instante em
// que a capsula abre e o hero aparece. Ali o visitante precisa de um tempo
// para perceber que chegou em algum lugar.
//
// Agora: o nome se monta rapido (a parte que o juri achava cara), e a pausa
// vai toda para a entrega — 800ms entre o nome montado e a capsula abrir, mais
// 1200ms de camada saindo (era 700).
// UMA PASSAGEM SÓ, não duas esperas empilhadas (06/09, auditoria do dono):
// "experimentaria começar a revelar o hero enquanto os últimos anos passam,
// transformando contador e hero em uma única passagem".
//
// Ele estava certo sobre o defeito. A contagem terminava aos 2100ms, a cápsula
// só abria aos 2400 e a camada só saía aos 3600: 1,5s em que os anos já tinham
// parado e o visitante olhava para uma porta fechada. Duas esperas em fila —
// primeiro conte, depois entre — quando o gesto é um só.
//
// Agora a porta começa a abrir com os DOIS ÚLTIMOS anos ainda correndo: o hero
// aparece por trás enquanto a contagem termina. Não é a abertura encurtada com
// pressa; é a mesma abertura em que as duas coisas acontecem JUNTAS.
//
// Os tempos derivam da contagem em vez de serem digitados soltos ao lado dela —
// se um dia forem 20 anos, o encaixe se mantém sozinho. Dois números que
// precisam concordar não podem ser escritos duas vezes.
// D-27: 110ms por ano transformava 2018→2026 em um borrão. A leitura precisa
// de uma parada por ano, mas a porta ainda abre antes da última contagem para
// não criar duas esperas em sequência.
const PASSO_ANO = 180;
const PAUSA_APOS_2026 = 2_000;

const TEMPOS = {
  luz: 160,
  // A marca precisa dar o primeiro sinal antes de a abertura parecer um loader.
  nome: 300,
} as const;

export function Abertura() {
  // o contador sobe de 0 até os anos de estrada durante a fase do nome
  const alvo = anosDeEstrada();
  const [contados, setContados] = useState(0);
  const [saindo, setSaindo] = useState(false);
  const [fora, setFora] = useState(false);
  const [fase, setFase] = useState<"escuro" | "luz" | "nome" | "abrindo">("escuro");
  const relogios = useRef<number[]>([]);
  const encerrando = useRef(false);

  // DOIS CAMINHOS, não um.
  //
  // MEDIDO (06/09): adiantar só a `fase-abrindo` não fundiu nada — a tira
  // quadro a quadro mostrou a porta PARADA nos frames 2350→2700ms, com o ano
  // trocando e mais nada acontecendo. `fase-abrindo` apenas prepara; quem
  // revela o hero é o `clip-path` de `is-saindo`. Eu tinha adiantado o ensaio,
  // não a entrada.
  //
  // Agora a saída começa com os últimos anos ainda correndo — e para isso ela
  // NÃO pode zerar a contagem: `setContados(alvo)` existia para quem PULA (não
  // ver o número pela metade), e aplicado à entrega natural mataria justamente
  // o que se quer ver. Quem pula corta; quem fica vê os anos terminarem já com
  // o hero aparecendo por trás.
  const encerrar = (cortando = false) => {
    if (encerrando.current) return;
    encerrando.current = true;
    if (cortando) {
      setContados(alvo); // quem pula não vê o número pela metade
      relogios.current.forEach(clearTimeout);
      relogios.current = [];
    }
    setSaindo(true);
    // A borda móvel começa pelo lado do retrato. O hero recebe a entrada depois
    // que essa janela já existe; disparar no primeiro frame faria a manchete se
    // animar escondida atrás da cortina.
    window.dispatchEvent(new CustomEvent("hmb:abriu"));
    // O hero já começou a assentar atrás da cortina; o descarte acontece ao fim
    // do mesmo gesto, sem uma segunda espera.
    relogios.current.push(
      window.setTimeout(() => {
        setFora(true);
        document.body.classList.remove("is-abrindo");
      }, 1450),
    );
  };

  useEffect(() => {
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (semMovimento) {
      setContados(alvo);
      setFora(true);
      window.dispatchEvent(new CustomEvent("hmb:abriu"));
      return;
    }

    document.body.classList.add("is-abrindo");
    const t = (ms: number, fn: () => void) => relogios.current.push(window.setTimeout(fn, ms));

    // OS ANOS PASSANDO, um a um — não um total subindo.
    //
    // Antes eram 26 passos de 0 até 8: oito números em ~1,2s ficam quase
    // instantâneos, e o dono viu — "gostaria de ver os anos contando, não um
    // número sem sentido". Um total que salta não é uma contagem; é um número
    // que apareceu.
    //
    // Agora cada ANO é uma parada: 2018, 2019, 2020 … até hoje. São 9 paradas
    // em 2026, e o ritmo é o mesmo para cada uma — dá para ler cada ano.
    //
    // A janela se ADAPTA ao total: se um dia forem 20 anos, o passo encurta em
    // vez de a abertura esticar. Piso de 90ms para não virar borrão.
    // 190ms POR ANO, e a abertura se estica para caber (nao o contrario).
    // MEDIDO: espremendo 9 paradas na janela que existia dava 100ms cada — no
    // limite do borrao, e o dono quer VER os anos passando. Com 190ms a
    // sequencia 2018→2026 leva 1,5s e cada ano da para ler.
    const inicio = TEMPOS.nome + 200;
    const passo = PASSO_ANO;
    for (let k = 0; k <= alvo; k++) {
      t(inicio + passo * k, () => setContados(k));
    }
    // o instante do último ano — daqui saem os outros dois tempos
    const ultimoAno = inicio + passo * alvo;

    // D-28: 2026 precisa assentar como conclusão da trajetória. A pausa é
    // deliberada: só depois de dois segundos a cápsula começa a ceder ao hero.
    // `abre` prepara o estado um quadro antes; `sai` é o gesto visual real.
    const sai = ultimoAno + PAUSA_APOS_2026;
    const abre = sai - 160;

    t(TEMPOS.luz, () => setFase("luz"));
    t(TEMPOS.nome, () => setFase("nome"));
    t(abre, () => setFase("abrindo"));
    t(sai, () => encerrar());

    // Esc pula, como em qualquer coisa que segura o visitante
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") encerrar(true);
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

      {/* O CONTADOR DE ANOS — ideia do dono (05/09): "sao 14 anos, um contador de
          anos poderia nos dar o tempo que esperamos no preloader".
          Ele resolve duas coisas de uma vez: dá CONTEÚDO à espera (em vez de um
          progresso falso, que é o que a abertura recusa desde o início) e o
          número se corrige sozinho — `anosDeEstrada()` deriva do relógio.
          Conta de 0 até o total enquanto o nome está montado: a espera passa a
          ser a própria trajetória correndo.
          O número são os anos DA EMPRESA (desde set/2018, fato publicado no
          site dele), não os "14 anos de estrada" — ver dados.ts. */}
      <p className="abertura__conta" aria-hidden>
        <b>{INICIO.ano + contados}</b>
        <span>
          {contados === 0
            ? "começa a trajetória"
            : `${contados} ${contados === 1 ? "ano" : "anos"} de H.M. Borçato`}
        </span>
      </p>

      <p className="abertura__pe" aria-hidden>Representação comercial · Belo Horizonte</p>

      {/* PULAR corta: quem pula não fica vendo o número pela metade */}
      <button type="button" className="abertura__pular" onClick={() => encerrar(true)}>
        Pular
      </button>
    </div>
  );
}
