# ledger.md — bloqueios, indefinidos e decisoes pendentes

Estado: **METADE 1 (planejamento)**. Nada abaixo foi decidido pela IA.
Formato de aprovacao que o humano usa:
`Aprovo D-XX conforme recomendacao (a). Registre no ledger. Nao implemente ainda.`

---

## A. Decisoes que exigem humano (D-01 … D-12)

### D-01 — O deploy: o build de hoje NAO gera site estatico
**Fato medido:** `.output/public/` **nao tem `index.html`** (verificado por `ls`); tem
`assets/`, `favicon.png`, `robots.txt`, `_headers`. O servidor esta em `.output/server/`
(1,1 MB) com `wrangler.json`. A regra dura 4 do QG manda publicar por **FTP no cPanel**,
subindo `assets/` e depois `index.html`.
**Consequencia:** hoje **nao existe caminho de publicacao**. Isso nao trava F1–F6, mas
trava a entrega. E se a saida escolhida for prerender, ela muda `vite.config.ts`, que e
gerado pelo preset do Lovable (`@lovable.dev/vite-tanstack-config`) — mexer nele e risco.
**Opcoes:**
- (a) **Prerender da rota unica** para gerar `index.html` estatico e continuar no FTP
- (b) Publicar como worker Cloudflare e abandonar o FTP so neste cliente
- (c) Portar a pagina para HTML/CSS/JS puro na entrega final
**Recomendo (a)** — e a unica que respeita a regra dura 4 sem reescrever o site.
**Risco de assumir errado:** construir 7 fases e descobrir na vespera que nao publica.
**Pergunta ao humano:** o site do Borcato vai para o cPanel por FTP como todo o resto, ou
este cliente abre excecao?

### D-02 — A meta 8,3 e alvo ou e regua?
**Fato:** a nota 6,8 e o alvo 8,3 sao estimativa de um agente lendo o proprio site
(`LEVANTAMENTO-JURI-2026-09-03.html`), nao veredito de juri. Nao ha calibragem externa.
**Pergunta:** perseguimos o numero, ou perseguimos as tres provas P1/P2/P3 do `success.md`
e usamos o numero so como termometro? **Recomendo a segunda.**

### D-03 — Quantas pecas de natureza-morta, e de que objetos?
**Fato:** o levantamento fala em "rolamento, filtro, lanterna, oleo". `dados.ts:44-54`
lista 6 marcas com `fornece` preenchido e **5 vazias** (Meca Brazil, Auto America, Mundial
Prime, Sintech, VP). Gerar peca para marca cujo produto nao sabemos = inventar fato.
**Opcoes:** (a) gerar so as 6 conhecidas; (b) perguntar ao Fabio o que faltam; (c) gerar
generico para as 5. **(c) viola a regra dura 2.**
**Pergunta:** aprova (a) agora e (b) quando houver conversa?

### D-04 — O mapa do Brasil: qual fonte geometrica?
Nao ha SVG de mapa no projeto (verificado: `find src -type f` nao retorna nenhum).
**Opcoes:** (a) desenhar um Brasil **estilizado** proprio (nao cartografico); (b) usar
malha do IBGE simplificada. **(b) e dado publico, mas e asset de terceiro** — o insumo 5
diz "gerar os nossos". **Recomendo (a)**: contorno proprio, imperfeito de proposito, que
tambem e o antidoto de "cara de IA".
**Pergunta:** aprova mapa estilizado autoral em vez de mapa cartografico correto?

### D-05 — A ordem das fases 2 e 3
O levantamento poe F2 (materia) antes de F3 (mapa). **Este war game discorda em parte** —
ver `WAR-GAME.md` §3. O mapa e a **cena que o juri lembra** e nao depende de aprovacao do
cliente; a materia depende de o Fabio aprovar as pecas geradas (pedido 5 do levantamento).
**Recomendo: F3 antes de F2**, com F1 continuando primeiro.
**Pergunta:** aprova inverter, ou a ordem do levantamento e para manter?

### D-06 — O bordado diz "Comarcial"
Registrado em `qg/clientes/borcato.md:182`. Na capsula a letra tem ~7px. **E erro de
grafia numa peca de cliente real.**
**Opcoes:** (a) colar o bordado original por cima; (b) regerar; (c) deixar.
**(c) e risco de credibilidade** se alguem ampliar. **Pergunta:** qual?

### D-07 — A abertura de 3,4 s continua rodando SEMPRE?
`Abertura.tsx:16-18` documenta a decisao: roda sempre porque o site e peca de venda.
O levantamento (achado 3) diz que ela **segura 3,4 s para entregar texto** e custa nota.
Sao duas decisoes em conflito, ambas justificadas.
**Pergunta:** manter sempre, ou rodar so na 1a visita da sessao com o Fabio tendo um jeito
de forcar (ex.: `?abertura=1`)?

### D-08 — Rotas orfas do Lovable
`qg/clientes/borcato.md:178` lista `/empresa`, `/servicos`, `/noticias`, `/contato` como
abertas — mas `find src/routes` mostra **so `index.tsx` e `__root.tsx`**. As rotas ja
sairam (commit `fd479e1`). **Item resolvido; fica registrado para nao reabrir.**

### D-09 — O que entra no lugar do `src/components/ui/` (48 arquivos shadcn)
Nenhum e usado pelo site (o `index.tsx` importa so de `components/site/`). Eles nao pesam
no bundle (tree-shaking), mas confundem executor novo.
**Pergunta:** remover na F7 ou deixar? **Recomendo remover** — reduz superficie de erro.

### D-10 — Quem e o "Fable jurado" e com que material ele julga
Ver `WAR-GAME.md` §6. Precisa de decisao sobre **nota minima que libera a fase seguinte**.
**Recomendo 7,5 por fase**, com o composto so sendo cobrado na F7.

### D-11 — Orcamento de tempo real
O levantamento estima 11–14 dias. Nao ha data de submissao registrada.
**Pergunta:** existe prazo? Se existir, ele muda o corte de escopo (ver §8 do WAR-GAME).

### D-12 — O que fazer se o Fabio nao responder
F4 trava no logo vetor, F6 trava na conversa de 20 min. Sem resposta, o teto da nota cai.
**Pergunta:** ha prazo para a resposta dele, e existe plano B autorizado (ex.: vetorizar o
raster dos icones nos, e escrever a historia so com o material de
`CONTEUDO-fabio-2026-09-02.md`, submetendo a ele para aprovacao)?

---

## B. `[INDEFINIDO]` — o que nao sabemos e nao vamos inventar

| ID | O que falta | Por que importa | Fase que depende | Pode assumir? | Risco de assumir errado |
|---|---|---|---|---|---|
| I-01 | Logo em vetor (AI/EPS/CDR/PDF) | os 4 icones so existem em raster ~400px (`marca/_icones_8x.png`) | F4 | nao | icone borrado no hero = pior que nao ter |
| I-02 | O que Meca Brazil, Auto America, Mundial Prime, Sintech e VP fornecem | 5 de 11 marcas sem `fornece` (`dados.ts:49-53`) | F2, F6 | nao | inventar produto de representada viola regra dura 2 |
| I-03 | A historia do Fabio (por que saiu, a viagem mais dura, o que diz ao distribuidor) | e o Conteudo (peso 10%) e a P2 do success | F6 | nao | texto generico = exatamente o defeito diagnosticado |
| I-04 | Fotos da equipe de 4 | "onde esta minha equipe?" e fala do cliente no levantamento | F6 | nao | gerar rosto de pessoa real sem autorizacao |
| I-05 | Existe foto real da estrada / do carro / da caixa de pecas? | registro real vale mais que geracao | F2 | nao | perder a unica materia autentica disponivel |
| I-06 | Prazo de submissao | define corte de escopo | todas | nao | planejar 7 fases para um prazo de 3 dias |
| I-07 | Ha calibragem externa da nota? | sem ela, 8,3 e autoavaliacao | D-02 | nao | perseguir numero que so existe aqui dentro |
| I-08 | O `_headers` do build serve cache? | afeta peso percebido, nao peso real | F7 | sim, provisoriamente | baixo |

---

## C. Bloqueios ativos

| Bloqueio | Trava | Desbloqueia com |
|---|---|---|
| Logo em vetor (I-01) | **F4 inteira** | pedido ao Fabio |
| Conversa de 20 min (I-03) | **F6 inteira** | agendamento |
| Deploy sem `index.html` (D-01) | **a entrega**, nao as fases | decisao humana |
| Aprovacao das pecas geradas (D-03) | a **publicacao** da F2, nao a producao | envio ao Fabio |

---

## D. Historico de decisoes aprovadas

_(vazio — nenhuma D-* aprovada ate agora)_

| ID | Decisao | Aprovada em | Por |
|---|---|---|---|


---

## E. Frente nova (06/09/2026) — a fronteira 02 → 03

Spec: `war-game/specs/wg-fronteira-02-03.md`. Metade 1 rodada depois de **seis tentativas
fracassadas** de fazer a peça e o mapa dividirem o quadro.

**A causa raiz, medida** (e diferente do que eu vinha supondo em todas as seis): não é o
`clip-path` (já abre) nem a distância no documento (o mapa nasce 112px ACIMA do fim do
palco). É que `.palco-pecas__cena` é `height: 100vh` e ocupa a tela inteira — no auge da
passagem só 154px dos 491px do mapa cabem embaixo. **A tela está ocupada; não há para onde
o mapa entrar.**

### Decisões abertas

| ID | Decisão | Opções | Recomendação da IA | Estado |
|---|---|---|---|---|
| D-13 | Arquitetura da fronteira 02→03 | A · B · C | (a) A | ✅ **APROVADA NA OPÇÃO B** (06/09) — o dono: "A pode abrir espaço, mas não garante transformação. O objeto e o território precisam dividir a mesma cena durante alguns instantes." Sem fallback automático para C. **IMPLEMENTADA E VALIDADA** — ver §F |
| D-14 | 12,9 telas de altura | manter · encurtar | encurtar a esteira (o problema estava num lugar só) | ✅ **APROVADA 06/09** — passo da esteira 1:1 → 0,55×. Página 12,9 → **11,2 telas** |
| D-15 | A barra de logos do hero sai? | sai · fica | sai | ✅ **APROVADA 06/09** — os logos da esteira são **4,5× maiores** (261×42 contra 58×9). O hero recuperou 99px |
| D-16 | A pausa da abertura | somar · tratar junto | **não mexer agora** — a página encurtou 1,7 tela e o ritmo geral mudou; reavaliar com olhos frios | ⏸ adiada por decisão conjunta |

### Indefinidos novos

| ID | O que falta | Por que importa | Fase que depende | Pode assumir? | Risco de assumir errado |
|---|---|---|---|---|---|
| I-09 | **O link do vídeo** (Gustavo Campelo) com a transição que o dono aprovou | "a seção dois vem comendo a seção um" pode ser exatamente a opção A — ou outra coisa | D-13 | **não** | planejar e executar a arquitetura errada |
| I-10 | O `sticky` com altura variável salta no Safari/iOS? | todas as medições foram em Chromium headless | Fase 1 | não | aprovar em headless algo que quebra no aparelho do Fábio |

**I-06 (prazo) segue sem resposta desde a primeira rodada** — e agora ele decide se vale
tentar A/B ou ir direto para C.

### Achados da revisão externa (06/09), estado

| Achado | Estado |
|---|---|
| `scale` declarado duas vezes no objeto do palco | ✅ corrigido e validado nos dois sentidos (`3edc24b`) |
| Atalho "Ver as peças" no capítulo 02 | ⏸ Fase 3 da spec — **não depende de D-13** |
| Não somar pausas na abertura | ⏸ virou D-16 |
| Validar a passagem nos dois sentidos | ✅ feito — reversibilidade OK, **mas revelou que o mapa chega a só 31%** |


---

## F. D-13 (opção B) — implementada e validada em 06/09

**Como foi feito sem quebrar o mapa (o risco R-54):** o mapa **não muda de pai** e não vira
`fixed`. Continua filho do capítulo 03 e continua medindo o próprio rect. O que muda é onde
ele é **desenhado** durante a passagem: um `translate` (`--mapa-sobe-px`) o traz para a cena,
e o JS do mapa **desconta esse deslocamento** da janela de medição. Um valor só, escrito uma
vez, lido pelos dois lados.

**Os três estados exigidos pelo dono, medidos e capturados:**

| Estado | 1440 | 375 |
|---|---|---|
| 1. VP legível | peça 100%, mapa 0% | peça 100%, mapa 0% |
| 2. **coexistindo** | peça 94% + mapa 48%; depois peça 22% + mapa 100% | peça 87% + **mapa 89%**; depois peça 16% + 100% |
| 3. mapa assume | peça 0%, mapa 100%, rota completa | idem |

**Sem vazio entre os momentos:** o mapa começa a subir em `--entrega` 0,18, quando a peça
ainda tem ~85% de opacidade.

**Portões:** responsividade código 0 · F-01 com **zero desencontros** (a sincronização ficou
intacta) · `reduced-motion` com rota inteira e 8/8 · reversibilidade espelhada nas duas
larguras · zero erros de console.

**O que continua aberto:** D-14 (altura de 12,9 telas), D-15 (a barra do hero), D-16 (a pausa
da abertura), I-06 (prazo), I-09 (o vídeo de referência — o dono confirmou que **ainda não
tem**; quando vier, calibra ritmo e composição **sem reabrir a estrutura aprovada**), I-10
(sticky em aparelho físico, nunca testado fora do Chromium headless).


---

## G. D-13 concluída — a rota ganha fonte própria (06/09)

**Autorização do dono, em duas etapas:** (1) tocar na sincronização para separar progresso da
passagem e progresso da rota; (2) criar um marcador próprio, depois que a medição provou que
`--cap-entra` estava saturado.

### A arquitetura final — dois atos consecutivos, não relógios concorrentes

| Fonte | Governa | Elemento medido |
|---|---|---|
| `--entrega` | a transição peça → território | a pista do palco |
| `.mapa-mg-marco` | a viagem dentro do mapa | um marcador de layout, altura 0, sem transform |
| `.mapa-mg-ref` | (wrapper) — separa a camada visual da referência | um div que nunca recebe transform |

`--rota` é derivado do marcador numa janela explícita (128% → 58% da altura da tela), e
**traço, pontos e lista leem o mesmo valor**.

### O que a medição derrubou pelo caminho

1. **`parseFloat` de expressão CSS dava sempre 0.** `getPropertyValue` devolve o `calc(...)`
   em texto; `parseFloat` disso é `NaN`, que o `|| 0` engolia. O desconto nunca existiu — a
   rota funcionava por acidente, e qualquer mudança na curva a quebrava (chegou a andar para
   trás: 0,69 → 0,29 → 0,02). **Regra que fica: nunca extrair número de expressão CSS.**
2. **`--cap-entra` satura em 1 antes de o mapa aparecer** (salta de 0 a 1 num passo). A
   `margin-top: -60vh` da passagem, que é o que faz as cenas dividirem o quadro, consome a
   janela do capítulo. Por isso a rota precisou de fonte própria.
3. **A primeira medição da janela quase me fez parar por engano:** olhei só o espaço abaixo
   do mapa (542px) e concluí "janela curta". A janela real são **900px** — ela começa
   enquanto o mapa ainda sobe.
4. **Os limiares iniciais (78%→12%) atrasavam a viagem em quase uma tela:** a rota fechava
   com o mapa a 0% visível. Com 128%→58% ela fecha com o mapa **inteiro**.

### Validado (desktop 1440 e celular 375)

| Critério | 1440 | 375 |
|---|---|---|
| progresso crescente na ida | ✅ | ✅ |
| regressão equivalente na volta | ✅ | ✅ |
| continuidade (maior salto) | ✅ 0,23 | ✅ 0,21 |
| rota completa com o mapa legível | ✅ **100% visível** | ✅ 65% |
| pontos e lista no mesmo progresso | ✅ | ✅ |

**A emenda:** 2 quadros (~100px) entre a passagem terminar e a rota começar — e neles o mapa
cresce de 58% para 77%. Não é período morto: é o território assentando. Depois a rota corre
contínua (0,069 → 0,942) com o mapa em 100% durante quase toda a viagem.

**Portões:** responsividade código 0 · `reduced-motion` com rota inteira e 8/8 · zero erros.

> **Nota sobre o critério 6 do aceite anterior:** o teste `prova_d13_final.py` mede a rota
> *durante* a passagem e agora acusa 0. É o comportamento correto, não uma falha — a viagem
> começa depois que o território chega, como o dono reinterpretou: "a rota não precisa estar
> completa quando a passagem termina; basta que continue sem descontinuidade".


---

## H. D-14 e D-15 resolvidas (06/09) — a medição decidiu as duas

**D-14 · a altura.** O problema não estava distribuído: estava num lugar só.

| | antes | agora |
|---|---|---|
| Página (desktop) | 12,9 telas | **11,2** |
| Página (celular) | 9,4 | **9,1** |
| A esteira sozinha | **4,9 telas** | **3,2** |

A esteira ocupava mais que o hero + capítulos 01, 03 e 04 **somados**. A causa era a mecânica
1:1 copiada do Norris — cada pixel rolado movia o trilho um pixel, e são 3.542px de trilho.
Com `PASSO = 0,55` o dedo anda 55% do caminho e o trilho percorre 100%. **Os cartões não
mudaram de tamanho**; só o percurso encurtou.

No celular a esteira sempre custou 0,9 tela — lá ela é livre, sem pino.

**D-15 · a barra do hero.** Medido antes de decidir:

| | logo |
|---|---|
| barra do hero | 58 × 9 px |
| esteira | 261 × 42 px |

**4,5× maior na esteira.** A barra gastava 99px do hero aprovado para exibir logos de 9px —
que era literalmente a queixa original do dono ("o carrossel está muito pequeno"). Com a
esteira, as 11 marcas apareciam três vezes. Saiu a menor.

O `--alt-marcas` saiu junto: sem ele o hero não reserva vão para algo que não existe. Medido:
o padding da base caiu de 120px reservados para 21,6px reais.

⚠️ **`BarraMarcas.tsx` continua no disco, sem montagem.** Não apaguei: se a decisão for
revista, o componente está pronto. Se em uma semana ninguém o quiser, apagar.

**D-16 adiada por decisão conjunta:** a página encurtou 1,7 tela e o ritmo geral mudou.
Reavaliar a abertura depois, com olhos frios.

**Portões:** responsividade código 0 · os cinco critérios da rota mantidos · zero erros.
