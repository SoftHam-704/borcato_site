# D-37 — Última entrega ao cliente

## Propósito

Consolidar tudo que ainda pode impedir a apresentação ou reduzir a percepção de
acabamento do site H.M. Borçato. Este pacote é de planejamento; nenhuma alteração
de código começa antes do gate do dono.

## Estado confirmado

Hero, abertura com pausa de 2 s, costuras Casa → Marcas e Peças → Estrada,
mapa, fecho frontal e rolagem do palco de peças estão funcionais. TypeScript,
build e `git diff --check` passam. A última correção está no commit `a55ccc0`.

## Decisão recomendada

**D-37/A — acabamento dirigido:** fechar primeiro os bloqueadores de percepção,
depois os testes responsivos e somente então os detalhes de marca. Limitar o ciclo
a uma passagem crítica por item, com reversão imediata se uma cena aprovada regredir.

## Gate humano

O dono deve aprovar a lista e a ordem. Sem essa aprovação, o executor apenas
inspeciona e atualiza as evidências.

