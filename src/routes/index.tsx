import { createFileRoute } from "@tanstack/react-router";
import { Abertura } from "@/components/site/Abertura";
import { HeroTravessia } from "@/components/site/HeroTravessia";
import { BarraMarcas } from "@/components/site/BarraMarcas";
import { Capitulo, NavCapitulos } from "@/components/site/Capitulos";
import { Estrada } from "@/components/site/Estrada";
import { Palavras } from "@/components/site/Palavras";
import { PalcoPecas } from "@/components/site/PalcoPecas";
import { MapaMinas, PONTOS } from "@/components/site/MapaMinas";
import { empresa, casa, representadas } from "@/lib/dados";
import fabioCasa from "@/assets/site/fabio-casa.avif";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "H.M. Borçato — Representação Comercial e Marketing" },
      {
        name: "description",
        content:
          "Representação comercial de autopeças em Minas Gerais. Onze indústrias representadas, praça por praça, desde 2018.",
      },
      { property: "og:title", content: "H.M. Borçato — Representação Comercial e Marketing" },
      {
        property: "og:description",
        content: "Onze indústrias representadas em Minas Gerais. Todo distribuidor de Minas conhece o nome.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// A TRAVESSIA — quatro capítulos, uma página.
//
// O que saiu daqui, e por quê:
//
// · <Header> com Home/Empresa/Serviços/Notícias/Contato — indice de site institucional.
//   A nav agora e de capitulos (NavCapitulos), que narra em vez de listar.
// · <ScrollRail> — a barra "00/05" que passava por cima da foto do Fabio.
// · <Preloader> — contador FALSO (Math.random()) que segurava o site por ~2,5s
//   girando as palavras "Representacao / Comercial / Marketing / Minas Gerais":
//   exatamente a linguagem de categoria que a direcao recusou. Nao ha o que
//   pre-carregar: a abertura e a capsula, e ela entra com fetchPriority=high.
// · A faixa "853 municipios / 586.528 km2 / 3o maior PIB / 2a maior frota" — sao numeros
//   de MINAS GERAIS, nao da Borcato. Emprestar o tamanho do estado como se fosse conquista
//   da empresa e o tipo de inflacao que o dono proibiu.
// · Os tres cards Missao/Visao/Valores com icone da lucide — o proprio metodo da casa
//   proibe. O que sobrevive deles e uma frase so, no capitulo 01, dita como o Fabio diria.
//
// Nada de faturamento, numero de clientes ou pedidos. Ver src/lib/dados.ts.
function Index() {

  return (
    <div className="home-borcato travessia">
      <Abertura />
      <NavCapitulos />

      {/* a estrada atravessa a pagina inteira, por tras do conteudo */}
      <Estrada />
      {/* FORA dos capitulos: dentro deles o transform do gesto de revelacao
          vira bloco de contencao e quebra o `position: fixed` da peca. */}

      <HeroTravessia />

      <main>
      {/* 01 — A CASA. Quem e, e de onde fala. */}
      <Capitulo id="cap-casa" className="cap--casa">
        <p className="cap__num">01 / A casa</p>
        <div className="casa">
          {/* A COLUNA QUE FALA */}
          <div className="casa__dizer">
            <h2 className="cap__titulo">
              <Palavras texto="Catorze anos de estrada antes de a placa ter o nome dele." />
            </h2>
            <div className="cap__corpo">
              <p>
                A H.M. Borçato nasceu em setembro de {empresa.fundacao}, em {empresa.base}. Não foi um
                começo: foi a hora em que o escritório passou a ter o nome de quem já rodava o mercado
                mineiro de autopeças havia catorze anos.
              </p>
              <p>
                São quatro pessoas para um estado inteiro, e é de propósito — quem atende conhece
                o distribuidor pelo nome, e o industrial sabe com quem está falando.
              </p>
            </div>

            {/* OS MARCOS: a história em quatro paradas, não em parágrafo.
                Nada aqui é invenção — fundação e trajetória vêm do material do
                cliente, e a última linha é a bio dele, palavra por palavra. */}
            <ol className="casa__marcos">
              {/* "14 ANOS", NAO "2004". A 3a auditoria pegou: 2004 nao aparece
                  em lugar nenhum no material do cliente — era deducao minha
                  (2018 menos 14), apresentada como fato. O que ele escreveu e
                  a DURACAO: "com um know how de 14 anos em representacao
                  comercial de auto pecas atuando no mercado mineiro".
                  Se a duracao era aproximada, o ano derivado inventa precisao
                  que ninguem afirmou. Regra dura n2. */}
              <li>
                <b>14 anos</b>
                <span>rodando o mercado mineiro antes de abrir a empresa</span>
              </li>
              <li>
                <b>{empresa.fundacao}</b>
                <span>o escritório passa a ter o nome dele</span>
              </li>
              <li>
                <b>MG</b>
                <span>um estado inteiro, praça por praça</span>
              </li>
              <li>
                <b>11</b>
                <span>indústrias na mesma pasta</span>
              </li>
            </ol>

            <p className="casa__bio">
              Representação consultiva: do <i>sell in</i> ao giro.
            </p>
          </div>

          {/* O RETRATO — outro enquadramento do mesmo ensaio do hero: lá o
              busto, aqui o close. Mesma pessoa, outra leitura. */}
          <figure className="casa__retrato">
            <img
              src={fabioCasa}
              alt="Fábio Borçato, sócio-fundador da H.M. Borçato."
              loading="lazy"
              decoding="async"
              width={900}
              height={1125}
            />
          </figure>
        </div>
      </Capitulo>

      {/* 02 — AS MARCAS. A amplitude do catalogo e o argumento.
          REFEITO (05/09): era titulo + paragrafo + GRADE de 11 celulas, o mesmo
          esqueleto dos outros tres capitulos. O dono: "isso e site de
          principiante". Estava certo — quatro capitulos com a mesma estrutura
          leem como template, por melhor que seja o hero.
          Agora e PALCO: a peca ocupa metade da tela com luz, o texto fica ao
          lado, as marcas viram pastilhas ancoradas. Ref. 26 da biblioteca
          comprada (Ferrari 296 GTB), que ele apontou como "a que salva".
          As 11 pecas ja existiam e apareciam so no hover: o ativo mais forte
          do site estava escondido. */}
      <Capitulo id="cap-marcas" className="cap--marcas">
        {/* A ABERTURA ENTRA NO PALCO (05/09). O flip-book mostrou a entrada
            mais fraca do site: titulo do capitulo em cima, em fluxo normal, e
            a primeira peca CORTADA embaixo quando o palco preso chegava. Agora
            o titulo e o paragrafo sao o TRECHO ZERO do proprio palco: ocupam a
            coluna de texto, se escrevem na cascata, e ao rolar cedem o lugar
            para "01 NTN-SNR" enquanto a peca assume — no mesmo palco, sem
            corte. E a preparacao do capitulo, espelhando a passagem no fim. */}
        <PalcoPecas
          abre={
            <>
              <p className="cap__num">02 / As marcas</p>
              <h2 className="cap__titulo palco-pecas__titulo">
                <Palavras texto="De rolamento a filtro de cabine. Onze indústrias na mesma pasta." />
              </h2>
              <div className="cap__corpo">
                <p>
                  Um distribuidor que compra rolamento da NTN-SNR resolve a bomba d&apos;água, o
                  filtro, a lanterna e o óleo na mesma conversa. É essa a diferença entre representar
                  uma marca e representar um catálogo.
                </p>
              </div>
            </>
          }
        />
      </Capitulo>

      {/* 03 — A ESTRADA. A cobertura, que e o dado publicavel mais forte que existe.
          CORRIGIDO em 03/09: era a lista das 12 UFs do RepOne, e era FALSO — ele
          atende so MG. O argumento verdadeiro e melhor: um estado inteiro, praca
          por praca, e a prova estava no material dele o tempo todo ("atendeu todos
          os distribuidores regionais de MG e as filiais dos nacionais no estado"). */}
      <Capitulo id="cap-estrada" className="cap--estrada">
        <p className="cap__num">03 / A estrada</p>

        {/* O MAPA ABRE O CAPITULO (05/09). A tira de contatos de 24 quadros
            mostrou os capitulos 01, 02 e 03 abrindo com o MESMO esqueleto: um
            titulo de 3 linhas em caixa alta. Aqui a primeira vista passa a ser
            o territorio — e o titulo e o corpo descem para o fim, onde viram
            conclusao ("Nao e um mapa de ambicao. E onde o carro ja chegou.")
            em vez de abertura. O mapa vem primeiro no DOM tambem porque a
            passagem vinda do palco o revela por um wipe da esquerda. */}
        <div className="estrada">
          <MapaMinas />

          <div className="estrada__dizer">
            <p className="estrada__casa">
              <b>{casa.uf}</b>
              <span>{casa.municipios} municípios · um estado</span>
            </p>
            {/* A LISTA SEGUE A ORDEM DA VIAGEM, e nao uma propria: e o mesmo
                array que posiciona os pontos no mapa. Com o numero dos dois
                lados, da para ligar "05" no mapa ao Vale do Aco na lista sem
                deduzir pela geografia (R3-03). */}
            <ol className="estrada__ufs">
              {PONTOS.map((p, i) => (
                <li key={p.nome}>
                  <em aria-hidden>{String(i + 1).padStart(2, "0")}</em>
                  <b>{p.nome}</b>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <h2 className="cap__titulo">
          <Palavras texto="Um estado inteiro cabe em muitos quilômetros." />
        </h2>
        <div className="cap__corpo">
          <p>
            Representação comercial se prova em presença, e presença se mede em estrada.
            A H.M. Borçato atende os distribuidores regionais de Minas e as filiais dos
            nacionais no estado — do Triângulo à Zona da Mata, do Sul ao Norte.
          </p>
          <p>
            Não é um mapa de ambição. É onde o carro já chegou.
          </p>
        </div>
      </Capitulo>

      {/* 04 — O NOME. A revelação, guardada até o fim. */}
      <Capitulo id="cap-nome" className="cap--nome">
        <p className="cap__num">04 / O nome</p>

        {/* AS LETRAS COMO ARQUITETURA. Parecer de juri: "a homenagem a Henrique
            e Mateus e provavelmente o conteudo mais unico do site. Hoje ela
            termina como titulo H.M. centralizado e um paragrafo. Eu faria as
            letras funcionarem como espaco arquitetonico: H. e M. em planos
            diferentes, a frase da homenagem entrando entre elas."

            Cada letra e a INICIAL DE UM FILHO — e o significado que estava
            escondido num titulo. Agora cada uma carrega o nome que representa,
            e a homenagem passa por dentro. */}
        <div className="nome">
          <h2 className="nome__marca">
            <span className="sr-only">H.M.</span>
            {/* OS NOMES PEQUENOS SAIRAM (3a auditoria, R3-01).
                Medido em 1440 e 1024: a 4a linha da homenagem (y=463..479)
                cruzava "Henrique" e "Mateus" (y=456..467) — 4px de sobreposicao,
                e o conteudo mais pessoal do site ficava ilegivel.
                Das duas saidas possiveis, escolhi a que NAO soma efeito: a
                homenagem ja diz "Henrique e Mateus" por extenso, entao o rotulo
                sob cada inicial era redundancia. A cena continua sendo as duas
                letras em planos diferentes — que e o gesto do capitulo. */}
            <span className="nome__letra nome__letra--h" aria-hidden>
              <b>H.</b>
            </span>
            <span className="nome__letra nome__letra--m" aria-hidden>
              <b>M.</b>
            </span>
          </h2>

          <p className="nome__homenagem">{empresa.homenagem}</p>
        </div>

        <div className="fecho">
          <p className="fecho__chamada">Fale com quem roda a estrada.</p>
          <ul className="fecho__vias">
            <li>
              <a href={empresa.celular.href}>{empresa.celular.rotulo}</a>
              <span>Celular · WhatsApp</span>
            </li>
            <li>
              <a href={empresa.telefone.href}>{empresa.telefone.rotulo}</a>
              <span>Escritório · {empresa.base}</span>
            </li>
            <li>
              <a href={`mailto:${empresa.email}`}>{empresa.email}</a>
              <span>E-mail</span>
            </li>
          </ul>
          <p className="fecho__assinatura">
            {empresa.nome} — {empresa.descritor}
          </p>
        </div>
      </Capitulo>
      </main>
    </div>
  );
}
