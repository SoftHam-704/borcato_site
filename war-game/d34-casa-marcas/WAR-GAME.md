# WAR-GAME — D-34 Casa → Marcas

## Contexto e escopo

O dono mostrou Casa e Marcas ocupando o mesmo quadro. O escopo foi somente a
passagem entre esses capítulos, sem alterar conteúdo ou outros relógios.

## Hipóteses

- Otimista: o fluxo normal deixa a cortina sincronizar pelo topo real e remove a colisão.
- Pessimista: sem sobreposição, a passagem perde o impacto ou cria um vazio perceptível.

## Ação → reação → contra-ação

1. Retirar a margem negativa → Marcas deixa de nascer cedo → manter a cortina como camada visual.
2. Retirar o sticky de Casa → o capítulo anterior rola para fora → validar três pontos de scroll.

## Falhas, detecção e recuperação

- Marcas aparecer antes do fim de Casa: medir `top`/`bottom`; reverter o commit.
- Cortina ausente ou presa: comparar `--passagem` e captura; abrir nova decisão, sem novo ajuste de margem.
- Regressão em outra seção: rodar `tsc`, build e portão; reverter apenas D-34.

## Saída e aborto

Saída: os critérios de `success.md` passam em captura e código. Orçamento desta
rodada: uma correção estrutural, sem segunda tentativa. Abortar se a passagem
voltar a depender de dois relógios ou de sobreposição negativa.

## Comando para retomada

Leia este pacote e `LEIA-PRIMEIRO.md`; reproduza os três pontos de scroll antes
de tocar na passagem. Não altere Hero, mapa ou peças nesta decisão.
