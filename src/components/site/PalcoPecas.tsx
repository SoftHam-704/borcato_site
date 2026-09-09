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

// A prancha anterior já apresenta as onze indústrias. Aqui entram cinco
// famílias de produto, uma peça por função, para aprofundar sem repetir a
// mesma lista. Os nomes vêm do catálogo já aprovado; não acrescentam promessa.
const CATEGORIAS = [
  { marcaId: "ntn-snr", rotulo: "Movimento" },
  { marcaId: "filtros-brasil", rotulo: "Filtração" },
  { marcaId: "cofran", rotulo: "Iluminação" },
  { marcaId: "hexlub", rotulo: "Lubrificação" },
  { marcaId: "vp", rotulo: "Plásticos automotivos" },
]
  .map(({ marcaId, rotulo }) => {
    const representada = representadas.find((r) => r.id === marcaId);
    const peca = pecaDe(marcaId);
    return representada && peca ? { ...representada, rotulo, peca } : null;
  })
  .filter((r): r is NonNullable<typeof r> => Boolean(r));

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
        const pista = Math.max(1, palco.offsetHeight - window.innerHeight);
        const r = palco.getBoundingClientRect();
        const t = Math.min(1, Math.max(0, -r.top / pista));
        // t=0 é a primeira peça, t=1 a última. O piso de 0,999 evita que o
        // último quadro pisque de volta para a primeira ao encostar no fim.
        // A PISTA TEM A ABERTURA, CINCO CATEGORIAS E UMA PASSAGEM.
        //
        // O 12o e a PASSAGEM, e ele existe porque a versao anterior roubava o
        // tempo da ultima marca: a entrega ocupava o ultimo 1/11, que era
        // justamente o trecho da VP. MEDIDO — clicar na pastilha dela levava a
        // entrega=0,653, com o texto em 10% de opacidade. A 11a marca era a
        // unica que o visitante nao conseguia ler.
        //
        // As cinco categorias ocupam os trechos centrais, cada uma com leitura
        // inteira, e a passagem tem trecho próprio depois delas.
        // A PISTA EM PROPORÇÃO, não em trechos iguais.
        //
        // São seis trechos de 22vh (a abertura + cinco categorias) MAIS a passagem,
        // que vale 34vh — ela precisa de mais rolagem que uma troca de peça,
        // porque nela acontecem três estados (VP inteira → VP e mapa juntos →
        // mapa assumindo).
        //
        // Antes eu dividia a pista em 13 fatias IGUAIS enquanto o CSS
        // reservava 12: a passagem ficava sem altura própria e durava ~110px.
        // Aqui as duas contas nascem da mesma proporção.
        const IGUAIS = CATEGORIAS.length + 1; // abertura + 5 categorias, 22vh cada
        // 50/22: a passagem vale 2,27 trechos. O 50 vem de medição — com 34
        // ela corria em 210px porque a pista útil é `altura − 100vh`. Este
        // número e o `+ 50vh` do CSS têm de andar juntos.
        const PESO_PASSAGEM = 50 / 22;
        const TOTAL = IGUAIS + PESO_PASSAGEM;
        const trecho = t * 0.999 * TOTAL;
        const abre = Math.min(1, Math.max(0, trecho));
        palco.style.setProperty("--abre", abre.toFixed(4));
        const i = Math.min(CATEGORIAS.length - 1, Math.max(0, Math.floor(trecho - 1)));
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
        // a entrega corre ao longo do peso da passagem, não de um trecho igual
        const entrega = Math.min(
          1,
          Math.max(0, (trecho - IGUAIS) / PESO_PASSAGEM),
        );
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

  const marca = CATEGORIAS[ativa]!;

  return (
    <div className="palco-pecas" id="palco-pecas" ref={palcoRef} style={{ "--n": CATEGORIAS.length } as React.CSSProperties}>
      <div className="palco-pecas__cena">
        {/* A ABERTURA: mesma celula da grade que a coluna de texto — as duas
            se sobrepoem e trocam por opacidade conforme `--abre`. */}
        {abre ? <div className="palco-pecas__abre">{abre}</div> : null}

        {/* A COLUNA DE TEXTO — ao lado do objeto, não acima dele. */}
        <div className="palco-pecas__dizer">
          <p className="palco-pecas__conta">
            <b>{String(ativa + 1).padStart(2, "0")}</b>
            <span>/ {String(CATEGORIAS.length).padStart(2, "0")}</span>
          </p>
          <h3 className="palco-pecas__marca">{marca.rotulo}</h3>
          <p className="palco-pecas__fornece">{marca.fornece}</p>
        </div>

        {/* O OBJETO — todas as peças empilhadas; só a ativa aparece. Trocar
            `src` faria a imagem piscar enquanto baixa; empilhadas, a troca é
            só opacidade, e o navegador já tem todas em mãos. */}
        <div className="palco-pecas__objeto">
          {CATEGORIAS.map((r, i) => (
            <img
              key={r.id}
              src={r.peca}
              alt={i === ativa ? `${r.rotulo} — ${r.fornece}` : ""}
              className={i === ativa ? "is-emcena" : undefined}
              aria-hidden={i !== ativa}
              loading={i < 2 ? "eager" : "lazy"}
            />
          ))}
        </div>

        {/* AS PASTILHAS — como os logos no rodapé da referência. Clicáveis:
            quem não quer percorrer as cinco categorias salta direto. */}
        <ul className="palco-pecas__trilha" ref={trilhaRef} aria-label="Cinco categorias de produto">
          {CATEGORIAS.map((r, i) => (
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
                  // mira o meio do trecho da categoria
                  // +1: o trecho 0 e a abertura; a peca i vive no trecho i+1
                  // o meio do trecho da marca, na pista com a passagem pesada
                  const alvo =
                    topo +
                    (pista * (i + 1.5)) / (CATEGORIAS.length + 1 + 50 / 22);
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
                <span className="sr-only">{r.rotulo}</span>
                <i aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
