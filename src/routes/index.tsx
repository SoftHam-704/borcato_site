import { createFileRoute } from "@tanstack/react-router";
import { Abertura } from "@/components/site/Abertura";
import { HeroTravessia } from "@/components/site/HeroTravessia";
import { BarraMarcas } from "@/components/site/BarraMarcas";
import { Capitulo, NavCapitulos } from "@/components/site/Capitulos";
import { Estrada } from "@/components/site/Estrada";
import { empresa, estados, representadas } from "@/lib/dados";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "H.M. Borçato — Representação Comercial e Marketing" },
      {
        name: "description",
        content:
          "De Belo Horizonte para doze estados. Onze indústrias representadas, levadas ao distribuidor onde ele está.",
      },
      { property: "og:title", content: "H.M. Borçato — Representação Comercial e Marketing" },
      {
        property: "og:description",
        content: "De Belo Horizonte para doze estados. Onze indústrias representadas.",
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
  const fora = estados.filter((e) => !e.casa);

  return (
    <div className="home-borcato travessia">
      <Abertura />
      <NavCapitulos />

      {/* a estrada atravessa a pagina inteira, por tras do conteudo */}
      <Estrada />

      <HeroTravessia />
      <BarraMarcas />

      {/* 01 — A CASA. Quem e, e de onde fala. */}
      <Capitulo id="cap-casa" className="cap--casa">
        <p className="cap__num">01 / A casa</p>
        <h2 className="cap__titulo">
          Catorze anos de estrada antes de a placa ter o nome dele.
        </h2>
        <div className="cap__corpo">
          <p>
            A H.M. Borçato nasceu em setembro de {empresa.fundacao}, em {empresa.base}. Não foi um
            começo: foi a hora em que o escritório passou a ter o nome de quem já rodava o mercado
            mineiro de autopeças havia catorze anos.
          </p>
          <p>
            São quatro pessoas. É pouca gente para doze estados, e é de propósito — quem atende
            conhece o distribuidor pelo nome, e o industrial sabe com quem está falando.
          </p>
        </div>
      </Capitulo>

      {/* 02 — AS MARCAS. A amplitude do catálogo é o argumento. */}
      <Capitulo id="cap-marcas" className="cap--marcas">
        <p className="cap__num">02 / As marcas</p>
        <h2 className="cap__titulo">
          De rolamento a filtro de cabine. Onze indústrias na mesma pasta.
        </h2>
        <div className="cap__corpo">
          <p>
            Um distribuidor que compra rolamento da NTN-SNR resolve a bomba d&apos;água, o filtro,
            a lanterna e o óleo na mesma conversa. É essa a diferença entre representar uma marca e
            representar um catálogo.
          </p>
        </div>

        <ul className="marcas-lista">
          {representadas.map((r) => (
            <li key={r.id}>
              <b>{r.nome}</b>
              {r.fornece ? <span>{r.fornece}</span> : null}
            </li>
          ))}
        </ul>
      </Capitulo>

      {/* 03 — A ESTRADA. O alcance, que é o dado publicável mais forte que existe. */}
      <Capitulo id="cap-estrada" className="cap--estrada">
        <p className="cap__num">03 / A estrada</p>
        <h2 className="cap__titulo">Minas é a casa. O resto é quilômetro rodado.</h2>
        <div className="cap__corpo">
          <p>
            Representação comercial se prova em presença. A H.M. Borçato atende hoje doze estados
            — e a lista abaixo não é ambição de cobertura, é onde já se entra.
          </p>
        </div>

        <div className="estrada">
          <p className="estrada__casa">
            <b>MG</b>
            <span>Minas Gerais — a casa</span>
          </p>
          <ul className="estrada__ufs">
            {fora.map((e) => (
              <li key={e.uf}>
                <b>{e.uf}</b>
                <span>{e.nome}</span>
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
    </div>
  );
}
