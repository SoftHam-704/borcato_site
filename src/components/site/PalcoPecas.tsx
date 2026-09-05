import { useEffect, useRef, useState, type ReactNode } from "react";

import { representadas } from "@/lib/dados";
import { pecaDe } from "./PecaNoCursor";

// O PALCO DAS PEÇAS — o capítulo 02 deixa de ser grade.
//
// O dono foi direto: "isso é site de principiante", "qualquer bosta no mundo faz
// um site assim". Estava certo, e o diagnóstico é estrutural: os quatro capítulos
// repetiam o MESMO esqueleto — título gigante, parágrafo, bloco embaixo. Quatro
// vezes seguidas é o esqueleto de qualquer template de landing page.
//
// A referência é a nº 26 da biblioteca comprada (Ferrari 296 GTB), que ele apontou
// como "a que salva": objeto ocupando METADE DA TELA com luz dramática, texto ao
// lado — não em cima —, e as marcas ancoradas embaixo em pastilhas.
//
// Aqui o objeto é a PEÇA. Elas já existiam, tratadas em duotom na paleta da casa,
// e apareciam só no hover do cursor: o ativo mais forte do site estava escondido.
//
// A MECÂNICA: palco preso (sticky) enquanto a rolagem troca a peça em foco. Não é
// carrossel automático — quem manda é o dedo. Mesmo padrão do hero e da estrada:
// o JS escreve só o índice, o CSS compõe.

const COM_PECA = representadas
  .map((r) => ({ ...r, peca: pecaDe(r.id) }))
  .filter((r): r is typeof r & { peca: string } => Boolean(r.peca));

export function PalcoPecas({ abre }: { abre?: ReactNode }) {
  const palcoRef = useRef<HTMLDivElement>(null);
  const trilhaRef = useRef<HTMLUListElement>(null);
  const [ativa, setAtiva] = useState(0);

  useEffect(() => {
    const palco = palcoRef.current;
    if (!palco) return;

    let pedido = 0;
    const aoRolar = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        // quanto da PISTA já foi percorrido (a pista é a altura extra do palco)
        const r = palco.getBoundingClientRect();
        const pista = Math.max(1, palco.offsetHeight - window.innerHeight);
        const t = Math.min(1, Math.max(0, -r.top / pista));
        // t=0 é a primeira peça, t=1 a última. O piso de 0,999 evita que o
        // último quadro pisque de volta para a primeira ao encostar no fim.
        // A PISTA TEM 12 TRECHOS PARA 11 MARCAS.
        //
        // O 12o e a PASSAGEM, e ele existe porque a versao anterior roubava o
        // tempo da ultima marca: a entrega ocupava o ultimo 1/11, que era
        // justamente o trecho da VP. MEDIDO — clicar na pastilha dela levava a
        // entrega=0,653, com o texto em 10% de opacidade. A 11a marca era a
        // unica que o visitante nao conseguia ler.
        //
        // Agora as 11 marcas ocupam os 11 primeiros trechos, cada uma com
        // leitura inteira, e a passagem tem trecho proprio depois delas.
        // 13 TRECHOS (05/09): a ABERTURA (trecho 0), as 11 pecas, a passagem.
        // O trecho 0 e o titulo e o paragrafo do capitulo dentro do palco: ao
        // rolar, `--abre` vai de 0 a 1 e o texto cede para a primeira peca —
        // sem o corte que havia quando a abertura ficava em fluxo normal.
        const TRECHOS = COM_PECA.length + 2;
        const trecho = t * 0.999 * TRECHOS;
        const abre = Math.min(1, Math.max(0, trecho));
        palco.style.setProperty("--abre", abre.toFixed(4));
        const i = Math.min(COM_PECA.length - 1, Math.max(0, Math.floor(trecho - 1)));
        setAtiva((antes) => (antes === i ? antes : i));

        // A PASSAGEM PARA "A ESTRADA" — do objeto para o territorio.
        //
        // Nas quatro auditorias a mesma leitura voltou: as cenas se SUCEDEM em
        // vez de se transformarem. Aqui a ultima peca nao some para o mapa
        // entrar: ela CEDE o palco. Enquanto o ultimo trecho da pista corre, a
        // peca recua e esmaece e o capitulo seguinte ja esta subindo por tras.
        //
        // Um gesto so, esfregado pelo scroll: reversivel ao voltar, sem
        // relogio proprio, e o conteudo continua legivel o tempo todo — quem
        // parar no meio ve uma peca menor, nao um estado quebrado.
        //
        // A passagem roda no 12o trecho — DEPOIS de a VP ter sido lida.
        const entrega = Math.min(1, Math.max(0, trecho - (COM_PECA.length + 1)));
        // NA RAIZ, e nao so no palco: o capitulo 03 e IRMAO deste (nao filho),
        // entao uma variavel escrita aqui nunca chegaria la. A passagem precisa
        // que as duas cenas leiam o MESMO relogio — e o que separa uma entrega
        // coordenada de dois fades independentes.
        document.documentElement.style.setProperty("--entrega", entrega.toFixed(4));
      });
    };

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  // A TRILHA ACOMPANHA A MARCA ATIVA.
  // MEDIDO (05/09, achado da 2a auditoria): em 375px a trilha mostra 315px de
  // 569px de conteudo. Da 7a marca em diante a pastilha ativa saia da area
  // visivel e o `scrollLeft` ficava em ZERO — cinco das onze sem indicacao de
  // posicao. Rolar a trilha nao e opcional: sem isso o indicador mente.
  //
  // `scrollIntoView` esta FORA DE QUESTAO aqui: ele rola o ancestral mais
  // proximo que rola — que e a PAGINA — e daria um salto vertical no meio da
  // leitura. Aqui so o eixo X da propria trilha se move.
  useEffect(() => {
    const ul = trilhaRef.current;
    if (!ul) return;
    const btn = ul.querySelectorAll("button")[ativa];
    if (!btn) return;
    const u = ul.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    if (b.left >= u.left && b.right <= u.right) return; // ja visivel
    // centraliza a pastilha na faixa, sem tocar na rolagem vertical
    const alvo = ul.scrollLeft + (b.left - u.left) - (u.width - b.width) / 2;
    ul.scrollTo({
      left: Math.max(0, alvo),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [ativa]);

  const marca = COM_PECA[ativa]!;

  return (
    <div className="palco-pecas" ref={palcoRef} style={{ "--n": COM_PECA.length } as React.CSSProperties}>
      <div className="palco-pecas__cena">
        {/* A ABERTURA: mesma celula da grade que a coluna de texto — as duas
            se sobrepoem e trocam por opacidade conforme `--abre`. */}
        {abre ? <div className="palco-pecas__abre">{abre}</div> : null}

        {/* A COLUNA DE TEXTO — ao lado do objeto, não acima dele. */}
        <div className="palco-pecas__dizer">
          <p className="palco-pecas__conta">
            <b>{String(ativa + 1).padStart(2, "0")}</b>
            <span>/ {String(COM_PECA.length).padStart(2, "0")}</span>
          </p>
          <h3 className="palco-pecas__marca">{marca.nome}</h3>
          <p className="palco-pecas__fornece">{marca.fornece}</p>
        </div>

        {/* O OBJETO — todas as peças empilhadas; só a ativa aparece. Trocar
            `src` faria a imagem piscar enquanto baixa; empilhadas, a troca é
            só opacidade, e o navegador já tem todas em mãos. */}
        <div className="palco-pecas__objeto">
          {COM_PECA.map((r, i) => (
            <img
              key={r.id}
              src={r.peca}
              alt={i === ativa ? `${r.nome} — ${r.fornece}` : ""}
              className={i === ativa ? "is-emcena" : undefined}
              aria-hidden={i !== ativa}
              loading={i < 2 ? "eager" : "lazy"}
            />
          ))}
        </div>

        {/* AS PASTILHAS — como os logos no rodapé da referência. Clicáveis:
            quem não quer rolar onze vezes salta direto. */}
        <ul className="palco-pecas__trilha" ref={trilhaRef} aria-label="As onze indústrias">
          {COM_PECA.map((r, i) => (
            <li key={r.id}>
              <button
                type="button"
                className={i === ativa ? "is-aqui" : undefined}
                aria-current={i === ativa ? "true" : undefined}
                onClick={() => {
                  const palco = palcoRef.current;
                  if (!palco) return;
                  const pista = palco.offsetHeight - window.innerHeight;
                  // `offsetTop` e relativo ao ancestral posicionado, e o .cap
                  // tem `transform` — o salto caia no lugar errado. O proprio
                  // LEIA-PRIMEIRO ja registrava essa armadilha e eu a repeti
                  // horas depois, neste arquivo. Achado na revisao de 05/09.
                  const topo =
                    palco.getBoundingClientRect().top + window.scrollY;
                  // mira o meio do trecho DA MARCA, na conta de 12 trechos
                  // +1: o trecho 0 e a abertura; a peca i vive no trecho i+1
                  const alvo = topo + (pista * (i + 1.5)) / (COM_PECA.length + 2);
                  // MESMA REGRA DA ROLAGEM HORIZONTAL DA TRILHA (linha ~101):
                  // este salto pedia `smooth` incondicional, e o outro ja
                  // respeitava a preferencia. Duas rolagens na mesma tela com
                  // regras diferentes — achado da 4a auditoria.
                  window.scrollTo({
                    top: alvo,
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                      .matches
                      ? "auto"
                      : "smooth",
                  });
                }}
              >
                <span className="sr-only">{r.nome}</span>
                <i aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
