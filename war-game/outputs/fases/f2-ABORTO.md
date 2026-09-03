# Fase 2 — ABORTO após as 3 reescritas permitidas

**Data:** 03/09/2026 · **Status:** **PARADA POR CRITÉRIO DE ABORTO DA SPEC.**

A spec diz: *"3 reescritas do prompt-base sem passar: **PARE**. A saída provável deixa de
ser geração e passa a ser fotografia real — decisão humana."* Foi o que aconteceu.

## As três rodadas, e o que cada uma moveu

| Métrica | r1 | r2 | r3 | Limite |
|---|---|---|---|---|
| preto (desvio) | 12,7 | **3,4** | **3,4** | ≤ 6 |
| branco (desvio) | 104,4 | 89,8 | 107,1 | ≤ 10 |
| temperatura (b−r) | — | 16,0 | 9,0 | ≤ 8 |
| direções de luz | 6 | **3** | **3** | 1 |
| enquadramento | 24–54% | 20–64% | 22–77% | 38–62% |

**O que o prompt consertou:** o nível de preto e as direções de luz. O acerto real foi
tirar a superfície — a r1 pedia *"resting on a matte charcoal surface"* e a frase seguinte
dizia *"no horizon and no visible edge"*. Contradição minha; o modelo resolveu de 11 jeitos.

**O que não cedeu em três tentativas:** o branco e o enquadramento.

## Por que não cedeu (e não é falta de tentativa)

**O branco.** Um rolamento cromado e uma junta de aço preta refletem de formas fisicamente
diferentes sob a mesma luz. Pedir *"peaks around 65 percent brightness on every part"*
(r3) é pedir que o modelo simule um fotômetro. Ele não expõe: ele desenha o que a
descrição evoca, e "chrome bearing" evoca brilho, "black gasket" evoca fosco.

**O enquadramento.** Peças com proporções diferentes — um anel achatado, uma mola alta,
uma lata cilíndrica — não ocupam a mesma fração de um quadro 4:3 sem que alguém componha
cada uma. "Fills 50 percent of the frame width" é atendido pela largura; a área varia.

**Ambos são resolvidos na pós-produção, não no prompt.** Normalizar exposição e recortar
para enquadramento comum são duas operações determinísticas de imagem — e é assim que um
estúdio real fecharia uma sessão de catálogo.

## As duas saídas, e as duas são decisão do dono

### A. Normalizar as 11 peças da r3 por pós-produção
As peças estão boas individualmente (ver `f2-pecas-r3/rolamento.png`: fundo preto puro,
sem horizonte, luz de cima, textura de metal usinado, zero marca). O que falta é o
acabamento de sessão:
- **exposição:** esticar cada peça para o mesmo pico de luminância
- **enquadramento:** recortar cada uma para a mesma fração de área ocupada
- **duotom:** aplicar depois, sobre o conjunto já normalizado

Custo: nenhum crédito de API. É processamento local, mensurável, e o teste de sessão
única passa a ser o critério de saída da normalização.

### B. Fotografia real — o pedido 4 ao Fábio
Uma foto do porta-malas, da caixa de peças, de uma visita. **Vale mais que as onze
geradas**, porque é verdade em vez de simulação — e é o que faz outro representante se
reconhecer. Foi a saída que a própria spec previu para este aborto.

## Recomendação

**A e B não competem.** Normalizar a r3 (A) destrava a fase hoje, sem custo e sem esperar
ninguém. Se as fotos do Fábio vierem (B), elas substituem as peças geradas onde couberem —
e aí o site ganha material real, que nenhuma geração alcança.

**O que NÃO fazer:** uma quarta reescrita do prompt. Três rodadas mostraram que o branco e
o enquadramento não são governáveis por texto.
