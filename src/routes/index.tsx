import { createFileRoute } from "@tanstack/react-router";
import { Abertura } from "@/components/site/Abertura";
import { HeroTravessia } from "@/components/site/HeroTravessia";
import { BarraMarcas } from "@/components/site/BarraMarcas";
import { Capitulo, NavCapitulos } from "@/components/site/Capitulos";
import { Estrada } from "@/components/site/Estrada";
import { Palavras } from "@/components/site/Palavras";
import { PalcoPecas } from "@/components/site/PalcoPecas";
import { empresa, regioes, casa, representadas } from "@/lib/dados";

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
          {/* VOCABULARIO DO OFICIO, e nao e invencao nossa: e a propria bio do
              Fabio ("representacao consultiva no aftermarket de MG", "presenca
              real e resultado do sell in ao giro"). Sell in e o que a industria
              vende ao distribuidor; giro e o que sai da prateleira. Um
              representante que so olha o sell in empurra estoque; olhar o giro
              e a diferenca — e e o distribuidor que reconhece a frase.
              Ver PROXIMA-SESSAO.md §2. */}
          <p>
            Representação consultiva: do <i>sell in</i> ao giro.
          </p>
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
        <div className="cap--marcas__abre">
          <p className="cap__num">02 / As marcas</p>
          <h2 className="cap__titulo">
            <Palavras texto="De rolamento a filtro de cabine. Onze indústrias na mesma pasta." />
          </h2>
          <div className="cap__corpo">
            <p>
              Um distribuidor que compra rolamento da NTN-SNR resolve a bomba d&apos;água, o filtro,
              a lanterna e o óleo na mesma conversa. É essa a diferença entre representar uma marca e
              representar um catálogo.
            </p>
          </div>
        </div>

        <PalcoPecas />
      </Capitulo>

      {/* 03 — A ESTRADA. A cobertura, que e o dado publicavel mais forte que existe.
          CORRIGIDO em 03/09: era a lista das 12 UFs do RepOne, e era FALSO — ele
          atende so MG. O argumento verdadeiro e melhor: um estado inteiro, praca
          por praca, e a prova estava no material dele o tempo todo ("atendeu todos
          os distribuidores regionais de MG e as filiais dos nacionais no estado"). */}
      <Capitulo id="cap-estrada" className="cap--estrada">
        <p className="cap__num">03 / A estrada</p>
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

        <div className="estrada">
          <p className="estrada__casa">
            <b>{casa.uf}</b>
            <span>{casa.municipios} municípios · um estado</span>
          </p>
          <ul className="estrada__ufs">
            {regioes.map((r) => (
              <li key={r.nome}>
                <b>{r.nome}</b>
              </li>
            ))}
          </ul>
        </div>
      </Capitulo>

      {/* 04 — O NOME. A revelação, guardada até o fim. */}
      <Capitulo id="cap-nome" className="cap--nome">
        <p className="cap__num">04 / O nome</p>
        <h2 className="cap__titulo cap__titulo--grande">
          {/* as letras sao spans para que o gesto de aproximacao (--cap-entra)
              tenha o que aproximar; o leitor de tela recebe "H.M." inteiro */}
          <span aria-hidden>H.</span>
          <span aria-hidden>M.</span>
          <span className="sr-only">H.M.</span>
        </h2>
        <div className="cap__corpo cap__corpo--centro">
          <p className="cap__homenagem">{empresa.homenagem}</p>
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
