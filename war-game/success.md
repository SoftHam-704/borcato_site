# success.md — o que conta como sucesso

> Escrito na METADE 1 (planejamento). Nada aqui e opiniao: cada linha e uma medida
> que uma maquina ou um humano consegue verificar e responder sim/nao.

---

## 1. Sucesso do WAR GAME (este plano)

- [ ] Toda fase tem **criterio de saida medivel** (numero, nao adjetivo)
- [ ] Toda fase tem **criterio de aborto** — a condicao em que o executor PARA e chama o humano
- [ ] Toda fase tem **orcamento de tentativas** e o que fazer ao estoura-lo
- [ ] Todo risco tem **deteccao** e **recuperacao**
- [ ] Todo `[INDEFINIDO]` esta no `ledger.md` com a pergunta ao humano — nenhum virou palpite
- [ ] Um executor **sem contexto anterior** roda a Fase N lendo so `specs/fase-N.md`
- [ ] Nenhuma linha de codigo de producao foi escrita durante o planejamento
- [ ] As decisoes `D-01…D-12` estao listadas e **nenhuma foi decidida pela IA**

---

## 2. Sucesso do PROJETO (o site)

### 2.1 A regua real, que nao e a nota

A meta declarada e 8,3 ponderado. Mas a nota e **estimativa de um agente, nao veredito de
juri** — ver risco R-01. A regua que o dono declarou e operacional:

> *"um representante que ve isso liga para voce"*

Traduzida em tres provas verificaveis:

| Prova | Como se mede | Passa quando |
|---|---|---|
| **P1 — o site e lembrado** | quem rolou o site inteiro descreve, sem reabrir, **uma cena** (nao "e bonito") | 3 de 3 descrevem a mesma cena |
| **P2 — o site diz o que o Fabio faz** | um leitor leigo responde "o que ele vende?" e "para quem?" | 3 de 3 acertam os dois |
| **P3 — nao parece de IA** | portao anti-cara-de-IA da skill `producao-web-premium` | zero item violado |

### 2.2 Portoes duros — reprovam sozinhos, no fim de TODA fase

| # | Portao | Medida hoje (evidencia) | Alvo |
|---|---|---|---|
| G1 | Peso de assets no fio | **1721 KB** (`.output/public/assets`, medido) | **<= 1000 KB** ao fim da F1; nunca sobe dai |
| G2 | Overflow horizontal em 375/430/768/1024/1440 | 0 | 0 |
| G3 | Alvo de toque < 44px | 0 | 0 |
| G4 | Erro de console nas 5 larguras | 0 | 0 |
| G5 | Contraste AA em todo texto de conteudo | AA | AA |
| G6 | `tsc` + `vite build` sem erro | passa | passa |
| G7 | Zero numero de cliente / faturamento / valor | limpo | limpo |
| G8 | Zero asset de terceiro alem das 11 representadas ja autorizadas | limpo | limpo |
| G9 | Colisao de camadas fixas (nav x conteudo x carrossel) | **1 conhecida**: `.cap-nav` z-index 40 (styles.css:846) sobre `.marcas` z-index 2 (styles.css:1215) | 0 |
| G10 | Cursor customizado ausente em ponteiro grosso | **NAO VERIFICADO** — nenhum teste emula touch | verificado com `has_touch=True` |

> **G1 e o portao que mata fase.** A F2 acrescenta imagem. Se entrar sem a F1 ter tirado
> os 619 KB duplicados, a pagina passa de 2 MB — que o dono declarou inaceitavel.
> Por isso a ordem 1 -> 2 e inegociavel.

### 2.3 Sucesso por fase

| Fase | Sucesso e |
|---|---|
| **F1** Reparo + peso | G1 <= 1000 KB · G9 = 0 · G10 verificado · cabeca inteira em 375/430 |
| **F2** Materia visual | 3 capitulos com objeto proprio · pecas passam no **teste de sessao unica** (2.4) · G1 mantido |
| **F3** Estrada vira mapa | rota percorre os 11 estados com a rolagem · SVG <= 40 KB gzip · **sem jank** (2.5) |
| **F4** Abertura dos 4 icones | icones se montam a partir de **vetor real** · abertura <= 3,4 s · pular funciona |
| **F5** Micro-interacoes | CTA magnetico · rotulo de cursor · tudo desligado em touch e reduced-motion |
| **F6** Historia | 1 paragrafo por publico · linha do tempo · equipe de 4 — **tudo confirmado pelo Fabio** |
| **F7** Portoes e submissao | G1–G10 · fingerprint · video de 30 s |

### 2.4 Teste de sessao unica (a F2 depende dele)

O modo de falha mais provavel da F2 e **8–10 imagens que nao parecem da mesma sessao
fotografica**. Criterio objetivo, medido ANTES de qualquer peca entrar no site:

| Metrica | Como medir | Tolerancia |
|---|---|---|
| Temperatura de cor | matiz mediano do quartil mais claro | **desvio <= 12 graus** entre todas |
| Direcao da luz | lado do pixel mais claro em relacao ao centroide | **mesma direcao** em 100% |
| Nivel de preto | percentil 5 da luminancia | **desvio <= 6/255** |
| Nivel de branco | percentil 98 da luminancia | **desvio <= 10/255** |
| Enquadramento | fracao da area ocupada pelo objeto | **0,38–0,62** em todas |

Uma peca fora -> regerar **aquela** peca. Duas ou mais fora na mesma rodada -> o
prompt-base esta errado; reescrever o prompt (gatilho de aborto da F2).

### 2.5 Sem jank (a F3 depende dele)

O mapa entra num scroll que ja tem **7 leitores de `scroll`** (Estrada.tsx:156,
Capitulo x4 em Capitulos.tsx:114, HeroTravessia.tsx:92, FotoViva.tsx:107) mais Lenis.

- mediana de tempo de quadro na rolagem do cap. 03: **<= 16,7 ms**
- comparacao **relativa** antes/depois no mesmo ambiente — headless nao tem GPU, e a
  regra dura 7 do QG diz que numero absoluto ali nao vale
- **long tasks > 50 ms durante a rolagem: zero**

---

## 3. Os NAOs (valem para o executor da METADE 2)

1. Nao executa nada fora da fase aprovada
2. Nao replaneja do zero
3. **Nao "melhora" o que ja foi aprovado** (hero, abertura, foto viva, clip-path, carrossel)
4. Nao assume caminho feliz
5. Nao esconde incerteza — vira item de ledger
6. Nao inventa fato ausente sobre o cliente
7. Nao sobrescreve versao boa (commit antes de cada fase)
8. Nao publica nem faz deploy
9. Nao autoaprova fase — o gate e humano
10. Nao troca decisao arquitetural sem `D-*` aprovado
