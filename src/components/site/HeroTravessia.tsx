import { useEffect, useRef } from "react";
import { regioes, casa, empresa } from "@/lib/dados";
import { BarraMarcas } from "@/components/site/BarraMarcas";
import { FotoViva } from "@/components/site/FotoViva";
import { Palavras } from "@/components/site/Palavras";
// Gerada com o Nano Banana a partir da original (marca/geracao/): luz lateral
// dura e olhar fora de quadro. O passo do rastro de exposicao longa FALHOU —
// o modelo criou uma segunda pessoa atras dele — entao o rastro fica no CSS.
import fabioEscuro from "@/assets/site/fabio-travessia.jpg";

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

  // A barra de marcas e absoluta na base do hero, e a altura dela MUDA com a
  // largura (medido: 238px em 375, onde as pastilhas quebram em 3 linhas; 117px
  // em 1440). O hero precisa reservar esse espaco, e nenhum valor fixo serve —
  // entao ele e MEDIDO e escrito em --alt-marcas. Tres tentativas com grid
  // falharam antes disto.
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero-tr");
    const barra = document.querySelector<HTMLElement>(".marcas");
    if (!hero || !barra) return;
    const medir = () => {
      hero.style.setProperty("--alt-marcas", `${Math.round(barra.offsetHeight)}px`);
    };
    medir();
    const obs = new ResizeObserver(medir);
    obs.observe(barra);
    return () => obs.disconnect();
  }, []);

  // O TEXTO SE ESCREVE quando a abertura termina, nao quando a pagina carrega:
  // a abertura cobre tudo, e animar por baixo dela e desperdicar o gesto. A
  // Abertura avisa por evento; se ela nao existir (reduced-motion, ou um dia
  // sem abertura), o fallback de 4,5s garante que o texto nunca fique preso.
  useEffect(() => {
    const secao = capsulaRef.current?.closest<HTMLElement>(".hero-tr");
    if (!secao) return;
    const pronta = () => secao.classList.add("is-pronta");
    window.addEventListener("hmb:abriu", pronta, { once: true });
    const fallback = window.setTimeout(pronta, 4500);
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

            As tres linhas dividem UMA cascata de 6 palavras: a contagem continua
            de uma linha para a outra, entao o titulo se escreve na ordem da leitura. */}
        <h1 className="hero-tr__titulo">
          <span className="ln ln--1"><Palavras texto="Todo distribuidor" total={6} /></span>{" "}
          <em className="ln ln--2"><Palavras texto="de Minas" desde={2} total={6} /></em>{" "}
          <span className="ln ln--3"><Palavras texto="conhece o nome." desde={4} total={6} /></span>
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
            href={`https://wa.me/55${empresa.celular.rotulo.replace(/\D/g, "")}`}
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
          <a className="link-marcas" href="#cap-marcas">Ver as onze marcas ↓</a>
        </div>

      {/* O TRILHO DA COBERTURA. Antes eram as 12 UFs do RepOne — dado FALSO, e o
          proprio Fabio pegou o erro olhando o hero (03/09). Ver dados.ts.
          Agora sao as regioes de Minas: a cobertura que ele tem de verdade. O
          numero que abre a linha e publico (IBGE) e e do ESTADO, nao do cliente —
          nenhuma contagem de cliente ou pedido, como manda a regra dura. */}
      <ul className="hero-tr__trilho" aria-label="Cobertura em Minas Gerais">
        <li className="trilho__rotulo" aria-hidden>
          <b>{casa.municipios}</b>
          <span>municípios · um estado</span>
        </li>
        {regioes.map((r) => (
          <li key={r.nome} title={r.ancoras}>
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

      {/* As 11 representadas na BASE DA PRIMEIRA TELA, como no 26 (Ferrari).
          Antes eram irmas do hero e comecavam 1px abaixo da dobra em toda
          largura — a promessa da ficha nunca se cumpria. Para um representante
          comercial as marcas que ele carrega SAO a credencial: enterra-las a
          tres telas de distancia e enterrar o argumento mais forte. */}
      <BarraMarcas />
    </section>
    </div>
  );
}
