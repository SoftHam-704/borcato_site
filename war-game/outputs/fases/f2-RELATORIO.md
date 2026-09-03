# Fase 2 — relatório de parada

**Data:** 03/09/2026 · **Status:** **BLOQUEADA POR SALDO**, não por técnica.

## O que aconteceu

O prompt-base foi escrito e as 11 peças foram disparadas. **As 11 falharam com o mesmo
erro**, e não é limite de velocidade:

```
429 — "Your prepayment credits are depleted.
       Please go to AI Studio at https://ai.studio/projects
       to manage your project and billing."
```

O retry automático da skill tentou duas vezes (2s, 4s) e bateu no mesmo erro. **Os
créditos da API do Gemini acabaram.**

## O que JÁ está pronto e não precisa ser refeito

O script `f2-gera-pecas.py` (nesta pasta) tem o prompt-base completo e as 11 peças
mapeadas. Assim que houver saldo, rodar:

```
python war-game/outputs/fases/f2-gera-pecas.py
```

Ele pula o que já existe, então pode ser rodado de novo sem desperdiçar crédito.

### O prompt-base, e por que ele é UM só

A regra número 1 da spec: **luz, câmera, fundo, distância e enquadramento fixos; só o
objeto varia.** Improvisar por peça é o que faz o conjunto parecer banco de imagens — a
definição visual de "cara de IA". O prompt fixa:

- uma key light dura de cima à esquerda, queda para sombra embaixo à direita
- rim light frio na borda de cima
- fundo preto sem horizonte e sem borda visível
- a peça ocupa ~metade do quadro, centrada, à altura do olho
- Sony A7R IV, macro 90mm em f/8, balanço de branco frio neutro
- âncora: fotografia de catálogo de autopeça alemão

**Nenhuma marca visível** em nenhuma peça — seria logo de terceiro em contexto não
autorizado (G8).

### As 11 peças, uma por representada

| Peça | Representada | Produto (confirmado pela carta de 03/09) |
|---|---|---|
| rolamento | NTN-SNR | Rolamentos |
| filtro | Filtros Brasil | Filtros de ar, óleo, combustível e cabine |
| bomba | Nidec | Bombas d'água e de óleo |
| lanterna | Cofran | Lanternas e retrovisores |
| suspensao | Pysko | Kits de suspensão |
| oleo | Hexlub | Óleo lubrificante |
| injetor | Meca Brazil | Bicos injetores, sensores, conectores |
| quimica | Auto América | Química automotiva, óleo de transmissão |
| spray | Mundial Prime | Desengripante, limpa-contato, sprays |
| motor | Sintech | Peças para motor |
| plastico | VP | Peças plásticas automotivas |

> **A trava da spec caiu.** A spec original proibia gerar peça para 5 representadas cujo
> produto não sabíamos. A carta que o Fábio entregou em 03/09 preencheu as cinco — então
> as 11 têm produto conhecido e nenhuma peça inventa fato sobre o negócio dele.

## O que falta depois da geração (a ordem da spec, sem pular)

1. **Teste de sessão única** — as 5 métricas medidas (temperatura ≤12°, direção da luz
   idêntica, preto ≤6/255, branco ≤10/255, enquadramento 0,38–0,62). Duas peças fora na
   mesma rodada significa que o **prompt-base** está errado, não as peças.
2. **Enviar ao Fábio** — não é opcional; a resposta pode vir depois.
3. **Duotom** — só na peça, nunca na foto dele.
4. **Integrar** — teto de 250 KB somados, e G1 (≤ 1000 KB na página) continua valendo.
5. **Definir o toque** — a peça no cursor não existe no celular; sem alternativa o
   capítulo 02 volta a ser lista onde parte do público vai olhar.

## Aborto

Três reescritas do prompt-base sem passar no teste de sessão única → **parar**. A saída
provável deixa de ser geração e passa a ser **fotografia real** — que é o pedido 4 ao
Fábio, e uma decisão humana.
