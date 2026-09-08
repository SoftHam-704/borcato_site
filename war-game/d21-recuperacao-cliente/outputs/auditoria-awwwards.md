# Auditoria crítica — 08/09/2026

## Veredito

O site tem direção de arte, fotografia e ambição suficientes para ser memorável,
mas ainda não está pronto para apresentação ao cliente nem para inscrição no
Awwwards. O problema central é editorial: a experiência pede atenção demais para
repetir a mesma prova e entrega pouca clareza comercial em troca.

Hoje ele se comporta como uma demonstração de motion design aplicada a uma empresa
de representação. Para reverter o quadro, precisa voltar a ser a história e a
ferramenta comercial da H.M. Borçato, com movimento servindo à leitura.

## Nota estimada pela régua do Awwwards

O Awwwards pondera Design em 40%, Usabilidade em 30%, Criatividade em 20% e
Conteúdo em 10%. Esta é uma avaliação crítica interna, não uma previsão oficial.

| Critério | Nota atual | Parecer |
|---|---:|---|
| Design | 7,3 | Paleta, retratos, tipografia e mapa são fortes; o miolo perde composição por vazios, escalas irregulares e logos raster ampliados. |
| Usabilidade | 5,2 | Navegação de capítulo entra no ponto errado, o mobile tem colisão com a barra fixa e a interação horizontal não é ensinada. |
| Criatividade | 7,0 | Há gestos próprios, mas a linguagem se apoia demais nas referências e repete scroll preso, fade e deslocamento. |
| Conteúdo | 5,8 | A história do Fábio e o território são autênticos; faltam uma proposta comercial mais concreta, método de atuação e prova aprovada pelo cliente. |
| **Total ponderado** | **6,4** | Bom portfólio em construção; ainda distante de 9,5 e vulnerável numa apresentação comercial. |

O Dev Award também não está pronto: build e semântica básica estão saudáveis, mas
responsividade, navegação, lint, metadados sociais e comportamento das animações
reduzem a nota.

## Evidências observadas

### 1. A experiência é longa demais para a quantidade de argumento

- Em 1440 × 900, o documento mede **12.344 px**, cerca de 13,7 viewports.
- `#cap-marcas` mede **6.852 px**, 55% de toda a página.
- A esteira mede 3.738 px e o palco de peças mede 2.826 px.
- As onze representadas aparecem primeiro como logos editoriais e depois como onze
  peças. A frase que explica a diferença não compensa o custo de repetir onze
  paradas completas.

**Efeito no cliente:** a empresa parece ter menos história do que a interface tem
duração. O visitante percebe esforço antes de perceber valor.

### 2. A prancha de marcas é o maior bloqueio visual

Na rolagem desktop, a primeira captura útil do capítulo já mostrou as marcas 03 a
05 e aproximadamente metade superior da tela vazia. Em 69,5% da prancha, apenas os
cartões 07 a 10 estavam visíveis e o vazio superior continuava dominante.

O CSS fixa um trilho de 6.600 px e posiciona os cartões entre `top: 0` e
`top: 340px`. A cena tem 100vh, mas os logos vivem quase todos na metade inferior.
O vazio é estrutural, não um instante ruim da captura.

**Correção:** editar a prancha para uma única faixa narrativa de 5 a 7 telas de
conteúdo aparente, com uma composição que ocupe verticalmente a viewport. A
profundidade das peças deve ser amostrada, não repetir onze vezes a enumeração.

### 3. O acesso direto a “As marcas” está quebrado

Teste em 1440 × 900, após clicar no item “02 As marcas”:

- `scrollY = 3.643`;
- `--esteira-ato = 0,2529`;
- `--esteira-x = -1.305px`;
- a manchete ficou de `x=-1.118` a `x=-631`, completamente fora da viewport.

O menu promete o início do capítulo e entrega o quinto cartão. Isso é uma falha de
usabilidade, acessibilidade e narrativa.

### 4. O mobile ainda é uma redução do desktop

Em 375 × 812:

- o link “Ver as onze marcas” ocupou `y=776..821`;
- a navegação fixa ocupou `y=721..812`;
- portanto, o link ficou integralmente atrás da navegação;
- a frase introdutória de “As marcas” ultrapassou a borda direita;
- a esteira tem `scrollWidth=3.709px` para uma janela de 360 px e não há instrução
  visível de “arraste” nem indicador de posição compreensível;
- a página mede aproximadamente 8.630 px.

O conteúdo não estoura o documento horizontalmente, mas isso não torna a interação
descoberta ou confortável.

### 5. Peças → mapa continua sem o quadro de entrega prometido

Na passagem observada em `scrollY=8.849`, `--entrega=0,9937`, a rota estava em
0,2813 e o mapa media `y=417..933`: ainda cortado pela borda inferior. A rota só
chegou a 1 quando o capítulo já tinha subido 406 px.

O mapa funciona isoladamente. A passagem não oferece o instante legível em que a
última peça cede e o território inteiro assume. O problema antigo permanece visível.

### 6. As transições não formam uma gramática clara

- Preloader → hero: a porta entrega primeiro o retrato e tem boa intenção, mas a
  marca some numa camada escura antes que a manchete assuma. É mais efeito que
  revelação de mensagem.
- Hero → A Casa: a troca é essencialmente uma rolagem vertical; partes do hero
  permanecem no topo enquanto o capítulo entra, sem um gesto de passagem legível.
- A Casa → As Marcas: há sobreposição, mas quando a cena é percebida a prancha já
  começou a andar e a introdução desapareceu.
- Marcas → peças: repete o mesmo assunto com mudança de escala; parece um segundo
  carrossel, não um novo ato.
- Peças → estrada: mapa ainda nasce cortado.
- Estrada → O Nome: o painel azul aparece, porém a seção anterior já saiu; não há a
  sensação de o novo capítulo cobrir um quadro retido.
- O Nome → fecho: o retrato começa a aparecer cortado na dobra, e o fecho vira uma
  continuação vertical convencional.

Novidade não significa usar sete efeitos. Significa que cada transição deve concluir
uma ideia: pessoa → casa; portfólio → peça; peça → território; território → nome;
nome → conversa.

### 7. O conteúdo ainda não fecha a venda

O site responde quem é Fábio, quais marcas carrega e onde atua. Ele não responde com
a mesma força:

- como a representação trabalha no dia a dia;
- que problema resolve para o distribuidor;
- por que uma indústria escolheria a H.M. Borçato;
- qual é o próximo passo além de telefone, WhatsApp e e-mail.

A afirmação “Todo distribuidor de Minas conhece o nome” é absoluta. Mesmo sendo uma
boa manchete, deve receber aprovação explícita do cliente ou ser trocada por uma
promessa verificável. Num projeto já rejeitado, uma frase de reputação não confirmada
é um risco maior que uma frase menos espetacular.

### 8. Os ativos de marca não suportam a escala atual

Os PNGs das representadas têm entre 156 e 328 px de largura, mas alguns aparecem
em cartões de 520 a 650 px. Exemplo: `mundial-prime.png` tem 158 × 88 e o cartão
tem 610 px. A baixa definição observada pelo dono é inevitável.

Os SVGs solicitados são dependência de liberação. Até chegarem, a prancha não deve
usar ampliações que exponham a limitação.

### 9. Base técnica: pontos bons e lacunas

**Aprovados:** build de produção, um H1, `lang=pt-BR`, um `main`, textos alternativos
relevantes, `prefers-reduced-motion`, links externos com `noopener noreferrer` e zero
erros ou avisos no console durante a vistoria.

**Reprovados ou incompletos:** `npm run lint` retorna 2.370 ocorrências, sendo 2.359
de Prettier, um erro `no-empty` e dez avisos de Fast Refresh; não há skip link; faltam
canonical, `og:image`, URL social e dados estruturados; um portal ainda usa HTTP; o
CSS tem 4.072 linhas e 155 seletores ligados às áreas mais iteradas, aumentando o
risco de regressão.

## O que preservar

1. O retrato e a composição final do hero, após corrigir mobile e validar a promessa.
2. “Antes de ser Borçato...” e a fotografia de A Casa.
3. A ideia da prancha editorial, em versão muito mais curta.
4. Uma amostra do palco de peças como prova da amplitude de catálogo.
5. O mapa de Minas e as oito regiões, com uma janela estável de leitura.
6. A revelação H.M. e o fecho com Fábio de frente.
7. A paleta escura, o azul e a tipografia atual.

## O que cortar ou reestruturar

1. Reduzir a página desktop para **8 a 10 viewports**.
2. Reduzir o capítulo de marcas em **35% a 50%**.
3. Mostrar todas as marcas uma vez; usar de 3 a 5 peças para demonstrar categorias,
   com controle opcional para explorar as demais.
4. Remover os grandes vazios superiores da prancha.
5. Transformar a navegação em destinos confiáveis, inclusive no mobile.
6. Dar ao contato final um CTA explícito e um fechamento legal mínimo.

## Prioridades para reverter a percepção

| Ordem | Ação | Resultado esperado |
|---:|---|---|
| P0 | Corrigir destinos da navegação e colisões móveis | O site volta a ser navegável e demonstrável. |
| P0 | Editar o capítulo de marcas e eliminar repetição | A experiência ganha ritmo e foco comercial. |
| P0 | Validar promessa, tom e objetivo com Fábio | Evita polir uma mensagem que o cliente não reconhece. |
| P1 | Refazer três costuras críticas como pilotos | As transições passam a concluir ideias. |
| P1 | Recalibrar tipografia, ocupação vertical e estados móveis | O acabamento deixa de depender da largura desktop. |
| P1 | Substituir logos por SVGs e limitar raster enquanto isso | Elimina perda de definição. |
| P2 | Completar SEO social, skip link, lint e checagem de contraste | Fecha o Dev Award e a entrega profissional. |

## Comparação correta com Lando Norris

A referência funciona porque combina abundância de material autêntico, variação de
composição e objetivos claros. A página atual de Lando oferece fotos de eventos,
mensagem pessoal, áreas On/Off Track, capacetes, parceiros, redes e contato. O gesto
horizontal é uma parte de um sistema rico, não o assunto principal.

Para a H.M. Borçato, copiar o comprimento ou a quantidade de cenas sem possuir o
mesmo volume de conteúdo produz repetição. A inspiração útil é a edição: cada ato
muda o tipo de evidência e cada transição prepara a próxima mensagem.

## Fontes da régua

- Awwwards, exemplo de avaliação com os pesos de Design, Usabilidade, Criatividade e
  Conteúdo: https://www.awwwards.com/sites/beauvoir
- Awwwards Mobile Excellence Guidelines: https://www.awwwards.com/mobile-excellence-guidelines.pdf
- Referência declarada do projeto: https://landonorris.com/

