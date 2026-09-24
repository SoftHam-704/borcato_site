# Outlier Research — representação comercial de autopeças (Brasil)

Dados crus da pesquisa. Coleta: 24/09/2026. A página visual está em `outlier-representacao-autopecas.html`.

- **Nicho:** escritórios de representação comercial (PJ) que representam indústrias de autopeças junto a distribuidores e atacadistas.
- **Arquétipo:** B2B / serviço profissional regional. A conversão é o contato comercial (WhatsApp, telefone, e-mail, formulário).
- **Descoberta:** WebSearch com 14 buscas (termos gerais + "representante comercial autopeças [MG|SP|PR|RS|SC|GO|BA|PE|CE]", "linha leve pesada", "rolamentos filtros", "nossas representadas", "área de atuação … catálogos WhatsApp"). Firecrawl não estava disponível.
- **Extração:** Playwright (Chromium) com viewport de 1440×900, `networkidle` + 2 s, rolagem completa feita duas vezes, e uma captura a 375 px. As seções foram detectadas no DOM e rotuladas à mão com base no texto, nos títulos e na captura de página inteira. Scripts e capturas estão em `…\scratchpad\outlier\` (temporário).
- **Proxy de qualidade:** este nicho não tem avaliações de clientes. O ranking considerou site ativo, responsivo a 375 px, domínio próprio, sinais de atualização (© ou posts de 2024 em diante), clareza das marcas, área de atuação explícita e contato acessível.

## Aviso sobre a amostra

O nicho é pequeno e tem pouca presença digital. Das cerca de 40 URLs encontradas, só **22 são escritórios de representação de autopeças com site próprio que abre**. Encontrei **10 que dá para chamar de "decentes"**. Chamá-los de "vencedores" é **relativo**: nenhum passaria numa régua de agência. Há shortcode quebrado à vista (JWG, Betel), nota interna de briefing publicada como texto (BNREP) e texto praticamente idêntico entre concorrentes (Filgueiras e Ginn). Com n=10, cada site vale 10 pontos percentuais. As frequências indicam tendência. Não são lei.

## 1. Candidatos

### Vencedores (10), em ordem de qualidade pelo proxy

| # | Site | UF | Sinal de atualização | Por que entrou |
|---|------|----|----|----|
| 1 | gadelharepresentacoes.com.br | GO/DF | © 2026, SPA moderno | Marcas descritas uma a uma, área de atuação por cidade, WhatsApp flutuante e no menu |
| 2 | trucksulrep.com.br | CE/MA/PI | © 2026, posts 2023–2025 | Representadas já no hero, depoimentos nomeados, catálogos, roteador de público |
| 3 | bnrep.com.br | SP | © 2026 | Home inteira organizada em torno de catálogo em PDF por marca, WhatsApp flutuante |
| 4 | jwgrepres.com.br | CE/Nordeste | © 2026, PDF de 04/2026 | Foto real no hero, números, catálogos por marca, depoimento em vídeo (tem shortcode quebrado na seção de notícias) |
| 5 | jmrautomotive.com.br | CE | © 2025, blog 02/2024 | Representadas por linha (pesada, leve, ferramentas, som), catálogos, área do cliente |
| 6 | kaloka.com.br | SC | © 2026 | Área no título, cards das marcas, CTA de WhatsApp |
| 7 | betelrepresentacoes.com.br | MG/ES | © 2025 | Catálogo por marca, mapa MG/ES, FAQ e formulário (shortcode do Instagram quebrado) |
| 8 | furlanrepresentacoes.com | RS/SC | WP 6.8, página de catálogos | Hero fala com o distribuidor, WhatsApp flutuante, área no "sobre" (sem ano de ©) |
| 9 | lagrepresentacoes.com.br | SP | © 2025 | Representadas com linhas de produto, história do fundador (não informa área) |
| 10 | repfilgueiras.com.br | CE/PI/MA/BA | menções de 2024 | Faixa de marcas em 2º, 3 escritórios no rodapé, WhatsApp flutuante |

### Intermediários (9): analisados, fora dos dois grupos

| Site | UF | Motivo de não estar entre os 10 |
|---|---|---|
| jgranja.com.br | RJ | Conteúdo parado em 2020, mas com foto e história do fundador, números e formulário. Ficou em 11º. |
| dinamicaonline.com.br | GO/DF | Catálogo 2025, mas a home tem 10.872 px com um bloco longo por marca, sem hierarquia |
| carvalhorepresentacao.com.br | CE | Logos no hero, mas o conteúdo mais recente é de 2012 e tem mapa e formulário |
| regisrepresentacoes.com.br | PR | © 2021, hero é carrossel de banner de uma representada |
| convertweb.com.br | RJ | Template Mobirise v4 (~2017), sem ano, sem marcas nomeadas na home |
| hswrepresentacoes.com.br | PR | Wix. Marcas por estado, bem feito, mas o "diferenciais" é uma imagem cheia de texto |
| assisrepresentacoes.com.br | MG | © 2019 |
| brekapecas.com.br | RS | Layout de uma tela só, estilo anos 2000, embora com notícias de 2025 |
| fanarep.com.br | RS | © 2020. Abre direto nos logos das representadas, sem hero |

### Perdedores de contraste (3)

| Site | UF | Por que é contraste |
|---|---|---|
| ginn.com.br | SP | WordPress 4.2.2, notícias de 2015, layout quebrado (overflow horizontal em 1440 e em 375), sem WhatsApp. "25 anos" congelado. |
| mdrvendas.com.br | — | Yola. Uma tela só de texto corrido, sem nenhuma marca, sem área, sem WhatsApp. Fala só com a indústria. |
| multimercadorepresentacoes.com | RJ | Wix © 2021, e-mail @uol, 5 logos pequenos, hero com carro esportivo de banco de imagem. Na primeira passada, o `networkidle` estourou o tempo. |

### Rejeitados (com motivo)

| URL | Motivo |
|---|---|
| capelinirepresentacoes.com.br | Fora do nicho: representa construção civil, hidráulica e EPI (Onduline, Krona, Viqua). É o site com mais "gente" da amostra, mas não é autopeças. |
| b2bautoparts.com.br | Modelo diferente: intermediação, licenciamento, private label e sourcing internacional. Na 2ª coleta deu timeout. |
| rocharepresentacoes.com | DNS não resolve (site morto) |
| 2drepresentacoes.com | DNS não resolve |
| famartins.com.br | "Nosso site está passando por manutenção" |
| remape.com | 503, "site em reforma" (só contatos) |
| waeforterepresentacoes.com.br | Desafio anti-bot da Cloudflare bloqueou o Playwright |
| ohub.com.br, portaldorepresentante.com.br, centraldosrepresentantes.com.br, e-representantecomercial.com.br, confere.org.br, maiscnpj, econodata, solutudo | Diretórios e portais |
| atualautopecas, perfildistribuidora, autopratense, monacodistribuidora, grupobrasildistribuidora, scatarina, emopecas, lucios, verticalautomotivo, autopecasbezerra | Distribuidoras ou varejo |
| triadeautopecas, autoplast, reserplastic, ds.ind.br, brimpecas, edreaza, cabovel, alternativa.ind.br, taranto, dsc.ind.br | Fabricantes. As páginas "representantes" deles listam nomes e telefones, quase nunca site. |
| truckcenter.com.br, jornalbrasilpecas, ideiasdesaas, blogdosrepresentantes | Conteúdo ou vagas, não é escritório |
| Ribeiro Repr., Car Peças Repr. (BH), Sasso & Sasso, Fedato, BV Assessoria, Paulo-Par, Florianópolis Repr. | Sem site próprio (aparecem só em listas de fabricantes) |

## 2. Estrutura extraída (cabeçalho e rodapé à parte)

Legenda: **M** = posição da 1ª marca representada visível. **A** = posição da 1ª menção à área. **C** = contato. **WA-f** = WhatsApp flutuante. **Cat** = catálogo. **Foto** = foto real de pessoa.

### Vencedores

**1. Gadelha (GO/DF).** Menu com botão "Consultoria WhatsApp".
1. `hero`: sobrelinha "A FORÇA DE GOIÁS E DF", H1 "TRADIÇÃO QUE MOVE A INDÚSTRIA". CTA "Falar com um Especialista" (WhatsApp) + "Nossas Marcas". Render 3D de motor e selo "40 ANOS+".
2. `faixa-de-marcas`: "PARCEIROS DE CONFIANÇA", 8 logos.
3. `marcas-representadas` em cards: "NOSSAS REPRESENTADAS" (AJUSA, KGM, Eckisil…), com 1 linha do que cada uma faz + "SAIBA MAIS" e card "SUA MARCA AQUI / Seja Representado".
4. `area-de-atuacao`: "ONDE A INDÚSTRIA ACONTECE, A GADELHA ESTÁ PRESENTE." com 8 cidades-polo em mapa estilizado.
5. `diferenciais`: "POR QUE A GADELHA?" (40 anos · base em Goiânia · atendimento técnico).
Rodapé com marcas e contato. M=2 (logo), A=1, C=1+menu, WA-f sim, Cat não, Foto não.

**2. Truck Sul (CE).** Barra superior "Ligue agora (85) 3051-8700 / Fale conosco pelo nosso WhatsApp", Catálogos e Área de atuação no menu.
1. `hero`: "Truck Sul Representações — Escritório de representação comercial do setor automotivo no estado do Ceará." CTA "Entre em contato", com card-carrossel "Representadas" dentro do hero.
2. `sobre`: "Prazer, somos a Truck Sul Representações" (desde 2014, CE/MA/PI), com foto de caminhão.
3. `roteador-de-publico`: "Como podemos ajudar hoje?" (Quero revender uma representada · Sou cliente e preciso de ajuda · Quero ser representado).
4. `marcas-representadas`: "Nossas representadas" com carrossel de logos e "Ver todas".
5. `depoimentos`: "Depoimentos de nossos clientes" (nome + autopeças do cliente).
6. `conteudos/blog`: "Conteúdos" (3 posts).
7. `cta-final`: "Ainda tem alguma dúvida?" / "Entre em contato".
M=1, A=1, C=barra superior + 1 + 7, WA-f não (chatbot), Cat sim (página), Foto não.

**3. BNREP (SP).** Menu com botão WhatsApp.
1. `hero-catalogo`: "Catálogos das principais indústrias de autopeças em um só lugar". CTA "Ver catálogos" + "Falar no WhatsApp".
2. `catalogo-download`: "Catálogos das marcas representadas", um card por marca com "Abrir catálogo / Baixar PDF". O texto publicado inclui a nota interna: *"Aqui é o coração do site. O usuário bate o olho, acha a marca e abre o PDF. Simples, rápido e elegante."*
3. `sobre + diferenciais`: "O elo entre a Indústria e o Distribuidor" (4 cards).
4. `feiras-eventos`: "Feiras e eventos do setor automotivo".
5. `cta-final-whatsapp`: "Precisa de apoio comercial ou quer receber os catálogos direto no WhatsApp?"
M=2, A=não informa, C=menu+1+5, WA-f sim, Cat sim (é o site), Foto não.

**4. JWG (CE/Nordeste).** Menu com botão WhatsApp.
1. `hero`: foto real de dois homens (equipe). "Bem vindo à JWG REPRESENTAÇÕES — Parceria estratégica com as principais fabricantes de autopeças". CTA "CONHEÇA NOSSAS REPRESENTADAS".
2. `faixa-aviso` (barra vermelha).
3. `sobre + numeros`: "O elo confiável entre indústrias automotivas e redes de distribuição em todo o Nordeste" (26 anos de atuação · 9 fábricas representadas).
4. `marcas-representadas`: "Nossas Representações", carrossel com "VER CATÁLOGOS" por marca.
5. `depoimentos`: depoimento em vídeo de cliente nomeado.
6. `noticias`: o shortcode `[blog_posts …]` aparece cru.
7. `diferenciais`: "Por que escolher a JWG Representações?"
8. `galeria-eventos`: fotos de feiras.
M=4, A=3, C=menu, WA-f sim, Cat sim, Foto **sim**.

**5. JMR Automotive (CE).** Barra superior com telefone, WhatsApp, Catálogos e Área do cliente.
1. `hero-banner-de-representada`: carrossel "CATÁLOGO INTERATIVO LD3 — BAIXE AGORA".
2. `sobre`: "JMR Automotive … atendemos a todo o estado do Ceará".
3. `marcas-por-linha`: "Linha pesada — Caminhões, pick-ups e utilitários".
4. `marcas-por-linha`: "Linha Leve — Peças, acessórios e som automotivo".
5. `marcas-por-linha`: "Ferramentas" / "Sonorização".
6. `blog`: "Últimas do nosso Blog".
7. `cta-final`: "Entre em contato conosco!"
M=1, A=2, C=barra superior + 7, WA-f não (chatbot), Cat sim, Foto não.

**6. Kaloka (SC).** Barra superior com e-mail e telefones.
1. `hero-banner-de-representada`: slide Max Gear com QR code.
2. `sobre`: "Representação de Autopeças em Santa Catarina" (desde 1982, Brusque).
3. `diferenciais` trio: "Desde 1983 · Sede em Brusque · Qualidade Total".
4. `marcas-representadas`: "Conheça as marcas que representamos para toda Santa Catarina" (DS, BSB, HELLA… + "Saiba mais").
5. `cta-final-whatsapp`: "Entre em contato para falar com nossos representantes." / "Chame no WhatsApp".
6. Instagram no rodapé.
M=1, A=2, C=barra superior + 5, WA-f não, Cat não, Foto não (mascote).

**7. Betel (MG/ES).**
1. `hero-banner-de-representada`: carrossel Betel/Vetor/ZM/DNI/3RHO/Sulcarbon/Gbusch/UEDA.
2. `marcas-catalogo`: "Conheça as empresas parceiras! Clique em cada uma e seja redirecionado para seu catálogo!"
3. `sobre + mapa-area`: "Sobre a Betel Representações" com mapa do Brasil destacando MG/ES.
4. `blog`: "Confira nosso Blog".
5. `instagram`: shortcode `[instagram-feed feed=1]` aparece cru.
6. `contato`: formulário + "NOSSO WHATSAPP (31) 3484-7474".
7. `faq`: "Como vejo os catálogos das empresas? … Onde vocês atendem?"
M=1, A=3, C=6, WA-f não, Cat sim, Foto não.

**8. Furlan (RS/SC).** Barra superior "SEJA NOSSO PARCEIRO | SOLICITE SEU ORÇAMENTO".
1. `hero`: "Representando há 40 anos os melhores produtos da indústria para o distribuidor". CTA "Seja Distribuidor". Foto de caminhão.
2. `sobre`: "Excelência no segmento de Autopeças e Eletropeças" (RS e SC, distribuidores e atacadistas).
3. `marcas-representadas`: "Conheça nossas Representadas" (Parker, Tek, Lubrasil…).
4. `roteador-de-publico`: "Representamos as melhores marcas" (Seja nosso parceiro · Solicite uma visita · Solicite um orçamento).
M=3, A=2, C=barra superior + 1 + 4, WA-f sim, Cat sim (página), Foto não.

**9. LAG (SP).**
1. `hero`: "Representação Comercial das MELHORES E MAIORES MARCAS DO SEGMENTO DE AUTOPEÇAS." com card da IMA.
2. `servicos` (4 blocos): Qualificação de estoque · Promotor exclusivo · Ações comerciais · Treinamento comercial.
3. `marcas-com-linhas-de-produto`: Paraflu, IMA (Rolamentos · Cubo de roda · Garfo de embreagem), Fania, Ampri.
4. `sobre/historia-do-fundador`: "fundada em 1995 … Luiz Alberto Grizolli, mais conhecido como 'Butina'" + missão/visão/valores.
5. `eventos`.
M=1, A=**não informa**, C=rodapé, WA-f não, Cat link externo, Foto não.

**10. Filgueiras (CE/PI/MA/BA).**
1. `hero-slider`: "TEMOS A PEÇA QUE VOCÊ PROCURA!" / "SUA MARCA BEM REPRESENTADA!" / "CONHEÇA NOSSAS REPRESENTADAS!", um slide para cada público.
2. `faixa-de-marcas` ("Portfólio").
3. `missao-visao-valores`.
4. `video-institucional`.
5. `sobre`: "QUEM SOMOS … desde 1974 … linha leve, utilitários, linha pesada e máquinas agrícolas. Cobrimos os estados do Ceará, Piauí, Maranhão e Bahia."
6. `trio` "SUPORTE A VENDAS / MELHORES PRODUTOS / REGIÃO DE ABRAGÊNCIA". O texto é **praticamente idêntico ao da Ginn** (muda uma palavra e repete o erro "Abragência").
7. `newsletter`.
Rodapé com matriz e 2 filiais. M=2, A=5, C=rodapé, WA-f sim, Cat não, Foto não.

### Intermediários (resumo)

- **J. Granja (RJ):** hero "SEJA NOSSO PARCEIRO." → números (16 fábricas · 300+ clientes) → fábricas parceiras (logos) → sobre com **foto do fundador** → citação → "Nossas vantagens" dividido em *para quem vende / para quem compra* → CTA "Aproveite nossa experiência de 20+ anos" → formulário + endereço → "A história do meu pai: Paulo Granja" (foto) → rodapé.
- **Dinâmica (GO/DF):** hero "DESDE 1977 · ATUAMOS EM GO / DF · SOLICITE SEU CATÁLOGO 2025" → faixa de indústrias → quem somos (foto da recepção) → contato → 6 blocos, um por marca (3-RHO, IABV, JP2, BR Brasil, Ciamet, Mazi) com capa do catálogo → história → contato com mapa do Brasil.
- **Carvalho (CE):** hero = mosaico de logos por linha → faixa "Entre em contato pelo Whatsapp" → quem somos + MVV → serviços → marcas + clientes (logos de distribuidoras) → formulário → Google Maps.
- **Regis (PR):** hero = banner Sampel → "Gostaria de receber uma visita de um promotor de vendas? Agendar Visita ou chame via Whatsapp" → logos "MAIS DE +1000 EMPRESAS ATENDIDAS TODOS OS MESES NO ESTADO DO PARANÁ" → quem somos → o que fazemos.
- **Convert (RJ):** hero "REPRESENTAÇÃO COMERCIAL — Especializada no segmento automotivo" → "Seja Bem-Vindo" → texto para a **indústria estrangeira** → 4 cards → depoimentos de gerentes nacionais das indústrias → mapa.
- **HSW (PR):** hero com foto do escritório → feed do Instagram → sobre/MVV → representadas **agrupadas por estado (PR e SC / PR)** → contato → diferenciais em imagem de texto.
- **Assis (MG):** hero com caminhões → empresa ("quatro cantos do estado de Minas") → produtos (logo + link de cada fábrica) → catálogo Usimar → ilustrações da equipe → formulário.
- **Brekapeças (RS):** tela única: menu por linha (Leve / Pesada / Agrícola) + "AUTOPEÇAS NO RS" + últimas notícias.
- **Fana (RS):** abre direto na grade de logos "Representadas" → sobre com **fotos do escritório** e marcas de veículo atendidas → mapa + formulário.

### Perdedores

- **Ginn (SP):** hero "Trazendo aos seus clientes sempre as melhores empresas do mercado automotivo." + "BAIXE AQUI NOSSAS LISTAS DE PREÇOS" → logos sem nome (1.555 px) → trio "Suporte a vendas / Melhores produtos / Região de Abragência" → empresa → lançamentos → faixa de catálogos → newsletter de 2015 → contato (sem WhatsApp).
- **MDR:** uma tela de texto: "VOCÊ GOSTARIA DE TER UM REPRESENTANTE COMERCIAL COM... Mais de 35 anos de Experiência…". Não mostra nenhuma marca, não diz a área, não tem WhatsApp.
- **Multimercado (RJ):** hero "SOMOS ESPECIALISTAS EM REPRESENTAÇÃO COMERCIAL NO SEGMENTO DE AUTOPEÇAS - REPOSIÇÃO" com carro esportivo → "Por que escolher" (Foco · Seriedade · Competência) → 5 logos → rodapé (WhatsApp em texto, e-mail @uol, © 2021).

## 3. Tabela de frequência (10 vencedores)

Universal ≥ 80% · maioria 50–79% · dividido < 50%.

| Seção / elemento | Sites | Freq. | Posição média | Classe |
|---|---|---|---|---|
| Hero | todos | 10/10 | 1 | universal |
| ↳ hero com headline declarativa (quem + o quê) | Gadelha, Truck Sul, BNREP, JWG, Furlan, LAG, Filgueiras | 7/10 | 1 | maioria |
| ↳ hero = carrossel de banners da representada | JMR, Kaloka, Betel | 3/10 | 1 | dividido |
| ↳ CTA de contato no hero | Gadelha, Truck Sul, BNREP, Furlan | 4/10 | 1 | dividido |
| Marcas representadas (seção própria) | todos | 10/10 | 3,0 | universal |
| ↳ 1ª marca visível | todos | 10/10 | **1,8** (5/10 já na 1ª dobra) | universal |
| Sobre / quem somos com tempo de mercado | todos exceto Gadelha | 9/10 | 2,9 | universal |
| Área de atuação nomeada (texto) | todos exceto BNREP e LAG | 8/10 | 1ª menção 2,4 | universal |
| ↳ área como seção visual (mapa/cidades) | Gadelha, Betel, Filgueiras | 3/10 | 4 | dividido |
| Diferenciais / "por que nós" | Gadelha, BNREP, JWG, Kaloka, LAG, Filgueiras, Furlan | 7/10 | 4,3 | maioria |
| CTA final de contato antes do rodapé | Truck Sul, BNREP, JMR, Kaloka, Betel, Furlan | 6/10 | 5,7 (penúltima) | maioria |
| Catálogo acessível (home ou menu) | Truck Sul, BNREP, JWG, JMR, Betel, Furlan | 6/10 | — | maioria |
| ↳ catálogo como seção da home | BNREP, Betel, JWG, JMR | 4/10 | 2,3 | dividido |
| Blog / conteúdos / notícias | Truck Sul, JWG, JMR, Betel | 4/10 | 5,5 | dividido |
| Fala com a indústria ("seja representado") | Gadelha, Truck Sul, Furlan, Filgueiras | 4/10 | — | dividido |
| Eventos / feiras | BNREP, LAG, JWG | 3/10 | 5,7 | dividido |
| Marcas por linha de produto (leve, pesada…) | JMR, LAG | 2/10 | 2 | dividido |
| Depoimentos | Truck Sul, JWG | 2/10 | 5 | dividido |
| Missão / visão / valores | LAG, Filgueiras | 2/10 | — | dividido |
| Instagram | Kaloka, Betel | 2/10 | — | dividido |
| Vídeo | Filgueiras, JWG | 2/10 | — | dividido |
| FAQ | Betel | 1/10 | 7 | dividido |
| Newsletter | Filgueiras | 1/10 | 7 | dividido |
| Formulário na home | Betel | 1/10 | 6 | dividido |

**Elementos transversais**

| Elemento | Vencedores (10) | Intermediários (9) | Perdedores (3) |
|---|---|---|---|
| WhatsApp em algum lugar | **10/10** | 5/9 | 1/3 (só como texto) |
| Contato no cabeçalho (telefone/WhatsApp) | 7/10 | 3/9 | 0/3 |
| WhatsApp flutuante | 5/10 | 2/9 (Convert, Regis) | 0/3 |
| Formulário na home | 1/10 | 4/9 (J.Granja, Carvalho, Fana, Assis) | 0/3 |
| Foto real de pessoa (equipe/fundador) | **1/10** (JWG) | 1/9 (J.Granja) + 2 com foto do escritório (Fana, Dinâmica) | 0/3 |
| Ano ≥ 2024 visível | 9/10 | 2/9 | 0/3 |
| Altura média da home (1440 px) | 4.364 px | — | — |

## 4. H.M. Borçato (build local, não publicado)

Servido de `borcato/.output/public` na porta 8095. Esperei o `.abertura` ser removido do DOM. Altura: **11.780 px**. Nenhum arquivo do projeto foi alterado.

1. `hero`: "DESDE 2018 · BELO HORIZONTE · MG", H1 "TODO DISTRIBUIDOR DE MINAS CONHECE O NOME.", subtítulo "Onze indústrias representadas em um estado inteiro — não por catálogo, por estrada, praça por praça." CTA "FALAR COM A BORÇATO" (WhatsApp) + "Ver as onze marcas ↓". Lista das 8 regiões de MG. **Foto real do fundador.**
2. `a-casa` (sobre): "ANTES DE SER BORÇATO, JÁ ERAM CATORZE ANOS DE ESTRADA."
3. `marcas-representadas` (esteira): "DE ROLAMENTO A FILTRO DE CABINE. ONZE INDÚSTRIAS NA MESMA PASTA." Onze marcas, cada uma com a categoria e link "PORTAL ↗".
4. `pecas-por-categoria` (palco): Movimento · Filtração · Iluminação · Lubrificação · Plásticos automotivos.
5. `area-de-atuacao` (a estrada): "UM ESTADO INTEIRO CABE EM MUITOS QUILÔMETROS.", mapa com as 8 regiões.
6. `origem-do-nome`: "H.M." (Henrique e Mateus).
7. `fecho/contato`: "FALE COM QUEM RODA A ESTRADA." Celular/WhatsApp, escritório e e-mail.

Elementos fixos: navegação por capítulos (A Casa · As Marcas · A Estrada · O Nome) e cursor próprio. Não há cabeçalho com telefone nem WhatsApp flutuante. Não há catálogo (os links de portal das indústrias fazem esse papel em parte). M=3 (a ~2.780 px, só como texto no hero), A=1, C=1 e 7. A 375 px, a primeira dobra mostra foto, H1 e CTA, sem overflow horizontal.
