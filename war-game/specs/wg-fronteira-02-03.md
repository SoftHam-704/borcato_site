# War Game — a fronteira 02 → 03

> **METADE 1 · PLANEJAMENTO. Nada foi implementado neste documento.**
> Escrito em 06/09/2026, depois de **seis tentativas fracassadas** de fazer a peça e o mapa
> dividirem o quadro. Modelo forte, esforço alto. O executor desta spec será um agente
> **sem contexto anterior** — tudo que ele precisa saber está aqui.

---

## 1. Contexto

O capítulo 02 (As marcas) termina num **palco preso**: `.palco-pecas` é uma pista de
`(11+1) × 22vh` e dentro dela `.palco-pecas__cena` é `position: sticky; height: 100vh`.
O capítulo 03 (A estrada) é **irmão** dele no DOM e começa com `margin-top: -60vh`,
pintando por cima do palco.

A passagem 02→03 já existe e é governada por `--entrega` (0→1), escrita na raiz pelo
`PalcoPecas.tsx` no 13º trecho da pista. Enquanto ela corre, o `Capitulos.tsx` entrega o
`--cap-entra` do capítulo 03 a essa mesma variável, e o `clip-path` do capítulo revela num
wipe da esquerda.

## 2. Objetivo

**Que a peça cedendo e o território chegando dividam o mesmo quadro** — o gesto que o dono
pediu ("do objeto para o território") e que as capturas mostram não acontecer.

## 3. O estado real, medido (não suposto)

| Medida | Valor |
|---|---|
| Fim da pista do palco | y=9796 |
| Topo do mapa no documento | y=9684 — **112px ACIMA do fim do palco** |
| Mapa no auge da passagem (`--entrega` 0,9) | y=746..1261, viewport 900 |
| Quanto do mapa cabe na tela ali | **154px de 491 (31%)** |
| `clip-path` do capítulo 03 no auge | `inset(0 0 0 0%)` — **já aberto** |
| `--cap-entra` no auge | 0,9 — **já revelado** |
| Base da cena do palco | y=900 — **a tela inteira** |

### A causa raiz

**Não é o `clip-path` e não é a distância no documento.** A sobreposição existe (−112px) e a
revelação acontece. O que impede é geométrico e simples:

> `.palco-pecas__cena` é `height: 100vh` e ocupa a tela **inteira** até o último quadro da
> pista. O mapa nasce logo abaixo dela. Enquanto o palco não libera altura, só a franja do
> mapa (154px) cabe embaixo.

As seis tentativas anteriores falharam porque atacaram o alvo errado: subir o mapa com
`translate` (3×), encolher o palco sem medir, abrir o `clip-path`, alongar a pista. **A tela
está ocupada — não há para onde o mapa entrar.**

## 4. Restrições (o que não se pode quebrar)

1. **A reversibilidade.** Ida e volta hoje são espelhos exatos (validado 06/09). Qualquer
   solução tem de manter isso.
2. **A VP tem trecho de leitura próprio.** Custou uma rodada; não pode voltar a ser comida
   pela passagem.
3. **O hero é aprovado** e não se toca sem decisão do dono.
4. **`prefers-reduced-motion` entrega as duas cenas inteiras**, sem sobreposição.
5. **Sem biblioteca nova.** GSAP e three.js seguem fora (decisão registrada).
6. **O portão precisa sair com código 0** nas cinco larguras.
7. **A altura da página já está em 12,9 telas** — nenhuma solução pode esticá-la mais.

## 5. O que NÃO pode acontecer

- Quebrar a passagem que já funciona em progresso e reversibilidade.
- Uma sétima tentativa de calibrar valor sem mudar a estrutura.
- Aprovar por medição: **a evidência é a tira ida-e-volta**, não o número.
- Inventar que "resolveu" quando a tira mostrar tela vazia no meio.

---

## 6. As três arquiteturas possíveis

> **Nenhuma delas é decisão da IA.** São as opções para a decisão **D-13** (§8).

### A — O palco cede altura (a cena encolhe)

`.palco-pecas__cena` deixa de ser `100vh` fixo e passa a `calc(100vh - X)` conforme
`--entrega` avança. O vão que abre embaixo é por onde o mapa entra.

- **Ação:** a cena encolhe de 100vh para ~46vh no fim da passagem.
- **Reação provável:** a peça, centrada na cena, **sobe junto** — some pelo topo em vez de
  ceder no lugar. E o `sticky` pode saltar quando a altura muda no meio do curso.
- **Contra-ação:** ancorar a peça ao topo da cena (`align-content: start`) durante a
  entrega, e testar o salto do sticky nas cinco larguras.
- **Custo:** baixo. Uma propriedade, uma expressão.
- **Risco:** R-51 (salto do sticky), R-52 (peça sobe em vez de ceder).
- **Já tentada?** Sim, uma vez, **sem medir depois** — foi descartada por engano quando
  os números não mudaram (o defeito era outro: o `--entrega` ainda não chegava lá).

### B — O mapa vive no palco (uma cena só)

O `MapaMinas` deixa de ser filho do capítulo 03 e passa a ser um segundo objeto **dentro
da mesma cena presa**, ocupando a mesma célula da grade que a peça — como a abertura e a
coluna de texto já fazem (`grid-template-areas`).

- **Ação:** as duas cenas passam a ser **uma** cena com dois estados.
- **Reação provável:** o capítulo 03 fica sem o mapa no fluxo normal — ele teria de
  aparecer duas vezes (uma no palco, outra no capítulo) ou o capítulo 03 perde a cena.
- **Contra-ação:** o mapa do palco é o **mesmo** nó, movido por `position` no fim da
  passagem; ou o capítulo 03 abre já com o mapa herdado.
- **Custo:** alto. Mexe em dois componentes e na fronteira.
- **Risco:** R-53 (mapa duplicado), R-54 (a rota do mapa mede a si mesma — mudar o pai
  quebra o cálculo do F-01, que hoje tem zero desencontros).
- **Ganho:** é a única que garante o quadro compartilhado **por construção**.

### C — Aceitar e trocar o gesto

Assumir que a fronteira não comporta quadro compartilhado, e trocar a passagem por outra
que a estrutura suporta: a peça cede e o **chão** faz a travessia (o azul do 02 vira o do
03 sob a peça que sai), sem tentar trazer o mapa.

- **Custo:** baixíssimo. Já existe: a jornada tonal e as costuras.
- **Risco:** nenhum técnico. O risco é de ambição — não é o gesto que o dono pediu.
- **Honestidade:** é a opção que **não** entrega "do objeto para o território".

---

## 7. Fases (se D-13 for A ou B)

### Fase 1 — Prova de conceito medida (1 tentativa)

- **O que será feito:** aplicar SÓ a mudança estrutural da opção escolhida, sem polir.
- **O que NÃO será feito:** nenhum ajuste de valor, nenhum efeito novo.
- **Suposição otimista:** o mapa passa de 31% para >60% de altura visível no auge.
- **Suposição pessimista:** o palco salta, ou a peça sobe em vez de ceder.
- **Como detectar:** `passagem_ida_volta.py` — a tira com os dois sentidos.
- **Critério de saída:** no quadro de `--entrega ≈ 0,5`, **peça com opacidade ≥ 0,3 E mapa
  com ≥ 50% de altura visível, na mesma captura.**
- **Critério de aborto:** se após **2 tentativas** o mapa não passar de 50%, **PARAR** e
  reportar. Não tentar uma terceira — foi assim que gastamos seis.
- **Orçamento:** 2 tentativas.

### Fase 2 — Reversibilidade e portões

- **Critério de saída:** ida e volta espelhadas (como hoje), portão código 0 nas cinco
  larguras, `reduced-motion` com as duas cenas inteiras, altura da página **não maior** que
  12,9 telas.
- **Critério de aborto:** qualquer regressão na reversibilidade → reverter a Fase 1 inteira.

### Fase 3 — O atalho "Ver as peças" (independente das outras)

Achado da revisão: esteira + 11 peças é longo demais. Um link que salta para o primeiro
trecho do palco.

- **Critério de saída:** o link existe, é alcançável por teclado, e o portão segue em 0.
- **Custo:** baixo. **Não depende de D-13** — pode ser executado antes.

---

## 8. Decisões que exigem humano

| ID | Decisão | Opções | Recomendação |
|---|---|---|---|
| **D-13** | Qual arquitetura para a fronteira 02→03 | A (palco cede) · B (mapa no palco) · C (trocar o gesto) | **(a) A**, por ser a de menor custo e menor risco de regressão; se falhar em 2 tentativas, ir direto para **C** e registrar que B ficou para uma reestruturação planejada |
| **D-14** | Aceitar 12,9 telas de altura, ou comprimir a esteira | manter · encurtar cartões | — |
| **D-15** | A barra de logos do hero sai, agora que a esteira existe? | sai · fica | — |
| **D-16** | Somar mais pausa na abertura, ou tratá-la como sequência única com a escrita do hero | somar · tratar junto | — |

**Formato de aprovação:**
`Aprovo D-13 conforme recomendação (a). Registre no ledger. Não implemente ainda.`

---

## 9. Riscos novos desta frente

| Código | Descrição | Prob. | Impacto | Detecção | Recuperação | Quem decide |
|---|---|---|---|---|---|---|
| R-51 | O `sticky` salta quando a altura da cena muda no meio do curso | média | alto | tira ida-e-volta com salto vertical | fixar altura e mover só o conteúdo | executor |
| R-52 | A peça sobe em vez de ceder (está centrada na cena que encolhe) | alta | médio | a peça sai pelo topo na captura | `align-content: start` durante a entrega | executor |
| R-53 | Mapa duplicado (opção B) | alta | alto | dois `.mapa-mg` no DOM | um nó só, movido | humano |
| R-54 | A rota do mapa mede a si mesma; trocar o pai quebra o F-01 | alta | alto | `prova_f01.py` com desencontros > 0 | reverter | humano |
| R-55 | Sétima tentativa de calibrar valor sem mudar estrutura | **alta** | alto | mais de 2 tentativas na Fase 1 | **abortar e ir para C** | humano |

## 10. Unknown unknowns levantados

- **Known unknown:** ninguém mediu se o `sticky` com altura variável salta no Safari/iOS —
  todas as medições foram em Chromium headless. **Aparelho físico segue sem teste.**
- **Unknown known (conhecimento tácito do dono não explicitado):** qual é o prazo. O
  `ledger` pergunta isso desde a primeira rodada (I-06) e segue sem resposta — e ele define
  se vale tentar A/B ou ir direto para C.
- **Unknown unknown provável:** a linguagem de transição do vídeo do Gustavo Campelo
  ("a seção dois vem comendo a seção um") pode ser **exatamente a opção A** descrita aqui,
  ou algo estruturalmente diferente. **Sem o link, estou planejando às cegas nesse ponto.**

---

## 11. Próxima ação HUMANA

1. Responder **D-13** (e, se possível, I-06 — o prazo).
2. Mandar **o link do vídeo** da transição. Ele pode tornar este war game obsoleto antes da
   execução, e isso seria barato — o caro é executar a arquitetura errada.
3. Só então: executor roda a **Fase 1**, com orçamento de 2 tentativas.

**A Fase 3 (atalho "Ver as peças") não depende de nada disso** e pode ser autorizada em
separado.
