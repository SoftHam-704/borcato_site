import { createFileRoute } from "@tanstack/react-router";
import { Abertura } from "@/components/site/Abertura";
import { HeroTravessia } from "@/components/site/HeroTravessia";
import { Capitulo, NavCapitulos } from "@/components/site/Capitulos";
import { Estrada } from "@/components/site/Estrada";
import { EstradaEscreve } from "@/components/site/EstradaEscreve";
import { Palavras } from "@/components/site/Palavras";
import { CarroOnze } from "@/components/site/CarroOnze";
import { EsteiraMarcas } from "@/components/site/EsteiraMarcas";
import { FechoFabio } from "@/components/site/FechoFabio";
import { PassagemNome } from "@/components/site/PassagemNome";
import { MapaMinas, PONTOS } from "@/components/site/MapaMinas";
import { empresa, casa } from "@/lib/dados";

export const Route = createFileRoute("/")({
  component: Index,
});

// A TRAVESSIA — quatro capítulos, uma página.
//
// Nada de faturamento, número de clientes ou pedidos. Ver src/lib/dados.ts.
function Index() {
  return (
    <div className="home-borcato travessia">
      <a href="#cap-casa" className="pular-conteudo">
        Pular para o conteúdo
      </a>
      <Abertura />
      <NavCapitulos />

      {/* a estrada atravessa a pagina inteira, por tras do conteudo */}
      <Estrada />
      {/* a rota do mapa que continua e escreve H.M. (passagem 4, 27/09) —
          fora dos capitulos pelo mesmo motivo da estrada: ela atravessa dois */}
      <EstradaEscreve />

      <HeroTravessia />

      <main>
        <div className="passagem-casa-marcas">
          {/* 01 — A CASA. Quem e, e de onde fala. */}
          <Capitulo id="cap-casa" className="cap--casa">
            <div className="casa">
              {/* A COLUNA QUE FALA */}
              <div className="casa__dizer">
                <h2 className="cap__titulo" data-revela>
                  <Palavras texto="Antes de ser Borçato, já eram catorze anos de estrada." />
                </h2>
                <div className="cap__corpo" data-revela>
                  <p>
                    A H.M. Borçato nasceu em setembro de {empresa.fundacao}, em {empresa.base}. A
                    experiência, porém, começou muito antes: foram catorze anos percorrendo o mercado
                    mineiro de autopeças antes de o Fábio colocar o próprio nome no negócio.
                  </p>
                  <p>
                    Hoje, quatro pessoas representam onze indústrias em Minas Gerais. Uma estrutura
                    próxima do distribuidor, com atuação consultiva.
                  </p>
                </div>

                <ol className="casa__marcos" data-revela data-estrada-corredor>
                  <li>
                    <b>14 anos</b>
                    <span>de experiência antes da H.M. Borçato</span>
                  </li>
                  <li>
                    <b>{empresa.fundacao}</b>
                    <span>o início da empresa em Belo Horizonte</span>
                  </li>
                  <li>
                    <b>Minas Gerais</b>
                    <span>presença em todo o estado</span>
                  </li>
                  <li>
                    <b>11 indústrias</b>
                    <span>representadas no mercado mineiro</span>
                  </li>
                </ol>

                <p className="casa__bio" data-revela>
                  Presença real. Do <i>sell in</i> ao giro.
                </p>
              </div>
            </div>
          </Capitulo>

          {/* 02 — AS MARCAS. A amplitude do catalogo e o argumento. */}
          <span id="marcas-inicio" className="marcas-inicio" aria-hidden />
          <Capitulo id="cap-marcas" className="cap--marcas">
            <EsteiraMarcas
              cabeca={
                <>
                  <h2 className="cap__titulo esteira__titulo" data-revela>
                    <Palavras texto="De rolamento a filtro de cabine. Onze indústrias na mesma pasta." />
                  </h2>
                  <p className="esteira__guia" data-revela>
                    Primeiro as indústrias. Depois, as onze peças que chegam à estrada.
                    <a href="#carro-onze" className="esteira__atalho">
                      Ver as peças <i aria-hidden>↓</i>
                    </a>
                  </p>
                </>
              }
              passagem={
                <p className="carro-onze__abre">
                  Um distribuidor que compra rolamento da NTN-SNR resolve a bomba d&apos;água, o
                  filtro, a lanterna e o óleo na mesma conversa. É essa a diferença entre representar
                  uma marca e representar um catálogo.
                </p>
              }
            />

            <CarroOnze />
          </Capitulo>
        </div>

        {/* 03 — A ESTRADA. A cobertura, que e o dado publicavel mais forte que existe. */}
        <Capitulo id="cap-estrada" className="cap--estrada">
          <div className="estrada">
            <div className="estrada__cena">
              <MapaMinas />

              <div className="estrada__dizer">
                <p className="estrada__casa">
                  <b>{casa.uf}</b>
                  <span>presença em todo o estado</span>
                </p>
                <ol className="estrada__ufs">
                  {PONTOS.map((p, i) => (
                    <li key={p.nome}>
                      <em aria-hidden>{String(i + 1).padStart(2, "0")}</em>
                      <div className="estrada__regiao-box">
                        <b>{p.nome}</b>
                        <span className="estrada__rodovia-badge">{p.rodovia}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
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
          <PassagemNome />
          <FechoFabio />
        </Capitulo>
      </main>
    </div>
  );
}
