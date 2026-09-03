# Spec — FASE 2: materia nos capitulos

**Pre-requisito:** F3 aprovada · **D-03** aprovado (quantas pecas, de que objetos).
**Toca `src/`?** SIM, mas so no fim. **As pecas ficam FORA de `src/` ate serem aprovadas.**
**Duracao estimada:** 3 a 4 dias. **Orcamento:** 3 rodadas de geracao, 2 reescritas de prompt.

---

## O problema, com a prova

Os capitulos 01, 02 e 03 nao tem uma unica imagem. Confirmado lendo
`src/routes/index.tsx:64-133`: sao paragrafos, uma lista de marcas e uma lista de UFs.
Visivel nas capturas `juri/04-casa.png`, `juri/05-marcas.png` e `juri/06-estrada.png`.

Num site sobre um homem que roda doze estados vendendo rolamento, filtro e lanterna, nao
aparece um rolamento, um filtro, uma lanterna nem uma estrada.

---

## O que produzir

| Capitulo | Objeto | Observacao |
|---|---|---|
| 01 A casa | BH ou a estrada ao amanhecer, em duotom azul | uma imagem so |
| 02 As marcas | pecas em natureza-morta monocromatica, presas ao cursor sobre cada marca | **inclui o item que o levantamento repetiu na F5** |
| 03 A estrada | ja resolvido pela F3 | nao produzir nada aqui |

### O que NAO produzir

- Nenhuma imagem de terceiro (nem referencia, nem banco, nem foto de marca)
- Nenhuma peca com **marca visivel** — seria logo de terceiro em contexto nao autorizado
- **Nenhuma peca para as 5 representadas cujo produto nao sabemos.** `dados.ts:49-53`:
  Meca Brazil, Auto America, Mundial Prime, Sintech e VP tem `fornece` vazio. Gerar peca
  para elas e **inventar fato sobre o negocio do cliente** — regra dura 2. (I-02.)

---

## O modo de falha numero 1, e como evita-lo

**As 8-10 imagens nao vao parecer da mesma sessao fotografica.** Luz de lados diferentes,
pretos diferentes, escalas diferentes. O conjunto le como banco de imagens montado — que e
a definicao visual de "cara de IA". O levantamento nao menciona este risco.

### A regra: UM prompt-base, so o objeto varia

Escreva **um** prompt com luz, camera, fundo, distancia e enquadramento **fixos**, e troque
apenas o nome do objeto. Nao improvise por peca.

### O teste de sessao unica (obrigatorio, antes de qualquer peca entrar em `src/`)

| Metrica | Como medir | Tolerancia |
|---|---|---|
| Temperatura de cor | matiz mediano do quartil mais claro | desvio <= 12 graus entre todas |
| Direcao da luz | lado do pixel mais claro em relacao ao centroide | **mesma direcao em 100%** |
| Nivel de preto | percentil 5 da luminancia | desvio <= 6/255 |
| Nivel de branco | percentil 98 da luminancia | desvio <= 10/255 |
| Enquadramento | fracao de area ocupada pelo objeto | 0,38 a 0,62 em todas |

**Uma peca fora** -> regerar aquela peca.
**Duas ou mais fora na mesma rodada** -> o prompt-base esta errado; reescreva o **prompt**,
nao as pecas. Na **terceira** reescrita sem passar: **PARE** (aborto).

---

## Os limites duros

| Limite | Valor | Por que |
|---|---|---|
| Peso somado da fase | **<= 250 KB** | a F1b acabou de derrubar 619 KB; G1 (1000 KB) continua valendo apos a F2 |
| Camadas de fundo por tela | **uma** | a palavra-fantasma e do hero (`styles.css:1507`) e a estrada passa pelo vao; tres camadas de fundo e ruido (R-42) |
| Duotom | so na peca | **nunca na foto do Fabio** |
| Marca de terceiro visivel | zero | G8 |

## O comportamento em toque (decidir AQUI, nao na F5)

A peca presa ao cursor **nao existe no celular**. Se voce nao definir alternativa, o
capitulo 02 volta a ser lista exatamente onde parte do publico vai olhar. Defina e
implemente nesta fase (ex.: a peca acende no card ao entrar em viewport).

## O que e proibido tocar

`src/components/site/BarraMarcas.tsx` — o carrossel e peca aprovada por pedido do dono.
Se a peca no cursor exigir mudanca estrutural nele, **pare e registre** (R-20).

---

## Fluxo obrigatorio

1. Escrever o prompt-base
2. Gerar as pecas em `outputs/fases/f2-pecas/` — **fora de `src/`**
3. Rodar o teste de sessao unica
4. **Enviar ao Fabio.** O envio nao e opcional; a resposta dele pode vir depois
5. Tratar em duotom
6. So entao integrar

**Alt text:** peca decorativa leva alt vazio; peca que carrega informacao leva descricao.
Errar isso regride acessibilidade, que e criterio de nao-regressao.

---

## Criterios de saida

- [ ] pecas passam nas 5 metricas do teste de sessao unica
- [ ] peso somado <= 250 KB e **G1 (<= 1000 KB) continua valendo**
- [ ] capitulo 02 tem comportamento definido e implementado em toque
- [ ] zero marca de terceiro visivel
- [ ] pecas enviadas ao Fabio
- [ ] `BarraMarcas.tsx` intacto (ou parada registrada)
- [ ] G1-G10 mantidos

## Criterios de aborto

- 3 reescritas do prompt-base sem passar: **PARE**. A saida provavel deixa de ser geracao e
  passa a ser fotografia real (pedido 4 ao Fabio) — decisao humana.
- Se o Fabio disser que a peca nao representa o que ele vende: **PARE aquela peca.**

## Ao terminar

```
Nao implemente ainda. Nao replaneje do zero.
Atualize ledger e README. Pare ao final da fase.
```
