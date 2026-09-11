import { useEffect, useRef } from "react";
import { regioes, casa, empresa } from "@/lib/dados";
import { FotoViva } from "@/components/site/FotoViva";
import { Palavras } from "@/components/site/Palavras";
// Gerada com o Nano Banana a partir da original (marca/geracao/): luz lateral
// dura e olhar fora de quadro. O passo do rastro de exposicao longa FALHOU —
// o modelo criou uma segunda pessoa atras dele — entao o rastro fica no CSS.
// O PISO da capsula e o QUADRO 0 da foto viva, nao um arquivo separado.
// Antes era `fabio-travessia.jpg` (619 KB) mostrando exatamente a mesma
// imagem do quadro 0 (110 KB) — 619 KB baixados para nada, e 68% do peso
// da pagina era o Fabio duas vezes. Era o achado no 8 do juri.
import fabioEscuro from "@/assets/site/frames/0.avif";

// Hero da direção "A DISTÂNCIA" (escolhida em 03/09/2026).
//
// A abertura NÃO diz a categoria. "Representação comercial de autopeças" é o que
// qualquer concorrente do Fábio escreveria, e era o que a proposta do Lovable dizia.
// Aqui a abertura é o ALCANCE — o que ele construiu e ninguém copia de graça.
//
// A CÁPSULA é o efeito que o cliente escolheu, medido na página do lukebaffait.fr:
// `.about-photo`, 780×936, `border-radius: 280px 0 0 280px` — raio grande só nos dois
// cantos da ESQUERDA, sangrando pela direita. A foto é recortada nessa proporção em
// src/assets/site/ (ver marca/_capsula-prova.png).
//
// O parallax do retrato é escrito em custom property e composto no CSS — o mesmo padrão
// que a home da SoftHam usa: o JS escreve só a PEÇA, o CSS compõe o transform. Assim o
// hover/reduced-motion não briga com inline style.
export function HeroTravessia() {
  const capsulaRef = useRef<HTMLDivElement>(null);

  // A BARRA DE MARCAS SAIU DO HERO (D-15, 06/09).
  //
  // Ela existia para pôr as 11 credenciais na primeira tela — e isso continua
  // certo como argumento. O que mudou foi a esteira do capítulo 02: MEDIDO,
  // o logo lá tem 261×42px contra 58×9px aqui. **4,5× maior.** A barra gastava
  // 99px do hero aprovado para exibir logos de 9px de altura — que era a queixa
  // original do dono ("o carrossel de indústrias está muito pequeno").
  //
  // Com a esteira, as mesmas 11 marcas apareciam TRÊS vezes (barra, esteira,
  // palco). Saiu a menor. O `--alt-marcas` some junto: sem ele, o hero não
  // reserva um vão para algo que não existe mais.

  // O TEXTO SE ESCREVE quando a abertura termina, nao quando a pagina carrega:
  // a abertura cobre tudo, e animar por baixo dela e desperdicar o gesto. A
  // Abertura avisa por evento; se ela nao existir (reduced-motion, ou um dia
  // sem abertura), o fallback de 2,5s garante que o texto nunca fique preso.
  useEffect(() => {
    const secao = capsulaRef.current?.closest<HTMLElement>(".hero-tr");
    if (!secao) return;
    const pronta = () => secao.classList.add("is-pronta");
    // Sem movimento não há cortina para entregar o evento. O estado final
    // precisa existir no primeiro quadro, inclusive se a ordem dos effects
    // fizer a Abertura desmontar antes de este listener ser registrado.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pronta();
      return;
    }
    window.addEventListener("hmb:abriu", pronta, { once: true });
    // O fallback não pode disparar por baixo da abertura. Depois que a pausa de
    // 2 s após 2026 entrou, 2,5 s passou a ser anterior à entrega real e o Hero
    // chegava pronto antes de ser revelado. Se a abertura ainda existe, o evento
    // dela continua sendo a única fonte de verdade.
    const fallback = window.setTimeout(() => {
      if (!document.body.classList.contains("is-abrindo")) pronta();
    }, 2500);
    return () => {
      window.removeEventListener("hmb:abriu", pronta);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    const el = capsulaRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // sem movimento o tratamento existe no estado assentado, não some
      el.style.setProperty("--filme", "0.45");
      return;
    }

    // O PALCO PRESO. O hero fica grudado na tela enquanto a pista rola por baixo,
    // e só libera a página quando BORÇATO atravessou INTEIRO. Pedido do dono:
    // "o site só deve sair da seção hero após todo o texto BORÇATO ser visualizado".
    //
    // A pista tem --hero-pista de altura (ver CSS); o hero é sticky dentro dela.
    // `t` deixa de ser "fração de uma viewport rolada" e passa a ser a fração DA
    // PISTA — que é o que faz o gesto durar o quanto a palavra precisa.
    const palco = el.closest<HTMLElement>(".hero-palco");

    let pedido = 0;
    const aoRolar = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(() => {
        pedido = 0;
        // quanto da pista já foi percorrido, travado em [0,1]
        const pista = palco
          ? Math.max(1, palco.offsetHeight - window.innerHeight)
          : window.innerHeight;
        const t = Math.min(1, Math.max(0, window.scrollY / pista));
        el.style.setProperty("--capsula-y", `${t * 64}px`);
        el.style.setProperty("--capsula-esc", String(1 + t * 0.06));
        // o grão assenta conforme a foto "chega" — sem deslocar canal nenhum
        el.style.setProperty("--filme", String(1 - t * 0.55));
        // A PALAVRA-FANTASMA ANDA: rolando para baixo ela vai para a ESQUERDA,
        // e volta quando se sobe. E parallax — mais lenta que o conteudo — o que
        // faz a capsula "passar na frente" dela. O dono pediu exatamente isto.
        // 14% da largura no percurso da primeira tela: le como movimento, nao
        // como a palavra fugindo.
        // A PALAVRA ATRAVESSA INTEIRA. Antes andava 14% da largura e o "ÇATO"
        // nunca aparecia — a palavra saia de cena antes de ser lida. Agora o
        // deslocamento e medido: o quanto falta para a ULTIMA letra entrar no
        // quadro, mais uma folga. Assim ela e lida do B ao O.
        const secao = el.closest<HTMLElement>(".hero-tr");
        const fant = secao?.querySelector<HTMLElement>(".hero-tr__fantasma");
        if (secao && fant) {
          const sobra = Math.max(0, fant.scrollWidth - document.documentElement.clientWidth);
          secao.style.setProperty("--fant-x", `${(-t * (sobra + 40)).toFixed(1)}px`);
          // o progresso do pino, cru, para o CSS compor a SAIDA da capsula
          // (a passagem hero -> 01: ela recua e esmaece no ultimo quarto)
          secao.style.setProperty("--hero-t", t.toFixed(4));
        }
      });
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    // A PISTA. O hero e sticky dentro dela: enquanto ela rola, ele fica na tela.
    // A altura da pista define quanto tempo o hero segura a pagina — e ela e
    // calculada no CSS a partir do quanto BORCATO precisa andar.
    <div className="hero-palco">
    <section className="hero-tr" aria-label="Apresentação">
      {/* A PALAVRA-FANTASMA — a peça central da direção.
          Referências: 36 (Techwear) e 25 (Silent Shogun), onde a figura fica NA
          FRENTE das letras e as corta.

          Ela resolve o defeito estrutural do hero anterior: a cápsula tem fundo
          preto e a página também, então a curva não se lia — preto sobre preto.
          Com a palavra atrás, a janela da foto RECORTA as letras, e é o corte que
          devolve a forma à cápsula. Sem tocar na foto.

          Ela precisa ficar abaixo de 8% de contraste, cortada pelas DUAS bordas
          laterais e pela cápsula. Se aparecer inteira em alguma largura, vira o
          clichê da palavra gigante de fundo. */}
      <span className="hero-tr__fantasma" aria-hidden>Borçato</span>

      <div className="hero-tr__texto">
        <p className="hero-tr__eb">
          <span>Desde {empresa.fundacao}</span>
          <i aria-hidden />
          <span>{empresa.base}</span>
        </p>

        {/* Tres linhas, tres PESOS — como o 26 (regular/itálico/light) e o 22
            (alternando bold e light por palavra). Antes era um peso só, com a
            diferenciação feita só por cor: assinatura de template.
            O <em> destaca "de Minas" — o argumento agora é o ESTADO, não a
            contagem de UFs. */}
        {/* A MANCHETE. Dizia "De Minas para outros onze estados" e era FALSO — o
            proprio Fabio pegou o erro olhando o hero (03/09/2026). Ele atende
            APENAS MINAS GERAIS. Ver a nota em dados.ts.

            A cobertura mineira e um argumento MAIS FORTE que doze estados
            arranhados, e a prova estava no material dele desde o inicio: atendeu
            todos os distribuidores regionais de MG e as filiais dos nacionais no
            estado. Deixa de ser quantidade de UF e vira reputacao.

            As linhas dividem UMA cascata de 6 palavras: a contagem continua de
            uma linha para a outra, entao o titulo se escreve na ordem da leitura.

            O "O" ORFAO (06/09, revisao do dono em 1440 e 375): "conhece o nome."
            era UMA linha so, longa demais para caber — e o navegador quebrava
            onde dava, deixando "CONHECE O" junto e "NOME." descendo sozinho. O
            desfecho da frase, que e o gancho do capitulo 04, virava sobra.

            A quebra agora e ESTRUTURAL, nao sorte de largura: "conhece" e "o
            nome." sao linhas proprias (recomendacao do dono). Os indices da
            cascata seguem 4, 5, 6 — a animacao nao sabe que mudou nada. */}
        <h1 className="hero-tr__titulo">
          <span className="ln ln--1"><Palavras texto="Todo distribuidor" total={6} /></span>{" "}
          <em className="ln ln--2"><Palavras texto="de Minas" desde={2} total={6} /></em>{" "}
          <span className="ln ln--3"><Palavras texto="conhece" desde={4} total={6} /></span>{" "}
          <span className="ln ln--4"><Palavras texto="o nome." desde={5} total={6} /></span>
        </h1>

        <p className="hero-tr__sub">
          Onze indústrias representadas em um estado inteiro — não por catálogo,
          por estrada, praça por praça.
        </p>

        {/* O CTA — o hero nao tinha NENHUM. Todos os 14 heros da biblioteca tem.
            Formato dividido (ref 25 Silent Shogun): bloco claro com o rotulo +
            quadrado na cor da marca com a seta. O numero ja existia em dados.ts,
            so nao estava na tela — e e WhatsApp. */}
        <div className="hero-tr__acoes">
          <a
            className="btn-falar"
            /* a URL vem pronta de dados.ts (fonte unica). Antes era montada
               aqui, extraindo digitos do ROTULO — dois lugares para a mesma
               coisa, e o fecho da pagina ja tinha divergido para `tel:`. */
            href={empresa.celular.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Falar com a Borçato</span>
            <i aria-hidden>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </i>
          </a>
          <a className="link-marcas" href="#marcas-inicio">Ver as onze marcas ↓</a>
        </div>

      {/* O TRILHO DA COBERTURA. Antes eram as 12 UFs do RepOne — dado FALSO, e o
          proprio Fabio pegou o erro olhando o hero (03/09). Ver dados.ts.
          Agora sao as regioes de Minas: a cobertura que ele tem de verdade.

          O "853 municipios" SAIU (06/09, decisao do dono). O numero era
          verdadeiro e publico (IBGE) e falava do ESTADO, nao do cliente — mas
          nesta moldura sugeria que a Borcato atende os 853, e transformava uma
          informacao de PRESENCA num indicador quantitativo que nao prova
          desempenho nenhum. Um numero que promete o que ninguem afirmou e pior
          do que numero nenhum.

          O que fica diz a mesma coisa sem a promessa: o territorio, inteiro. */}
      <ul className="hero-tr__trilho" aria-label="Cobertura em Minas Gerais">
        <li className="trilho__rotulo" aria-hidden>
          <b>Minas Gerais</b>
          <span>um estado inteiro</span>
        </li>
        {regioes.map((r) => (
          <li key={r.nome}>
            {r.nome}
          </li>
        ))}
      </ul>
      </div>

      {/* O GRÃO e a VINHETA ficam; o RGB SPLIT SAIU.
          Ele era invenção minha — o cliente escolheu a FORMA da cápsula do
          lukebaffait.fr, não um glitch sobre o rosto. E ele estava destruindo a
          foto: deslocava duas cópias tingidas 6px para cada lado na primeira
          pintura, deixando o logo bordado da camisa ILEGÍVEL — justamente a
          prova visível da cor da marca. Nenhuma das 39 referências da biblioteca
          aplica glitch sobre rosto humano. */}
      <div className="hero-tr__capsula" ref={capsulaRef}>
        {/* A foto PARADA e o piso: aparece na hora, e fica se o canvas nao
            puder rodar (sem JS, reduced-motion, ou um quadro que falhou). */}
        <img
          src={fabioEscuro}
          width={780}
          height={936}
          alt="Fábio Borçato, sócio-fundador da H.M. Borçato."
          fetchPriority="high"
          className="capsula__base"
        />
        {/* A foto VIVA cobre a parada assim que os cinco quadros carregam. */}
        <FotoViva />
        <span className="capsula__grao" aria-hidden />
        <span className="capsula__vinheta" aria-hidden />
      </div>

    </section>
    </div>
  );
}
