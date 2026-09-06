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
| D-13 | Arquitetura da fronteira 02→03 | A (o palco cede altura) · B (o mapa vive no palco) · C (trocar o gesto) | (a) A, com aborto para C após 2 tentativas | **aguarda humano** |
| D-14 | 12,9 telas de altura: aceitar ou comprimir a esteira | manter · encurtar | — | aguarda humano |
| D-15 | A barra de logos do hero sai, agora que a esteira existe? | sai · fica | — | aguarda humano |
| D-16 | Mais pausa na abertura, ou tratá-la como sequência única com a escrita do hero | somar · tratar junto | — | aguarda humano |

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
