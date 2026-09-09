# D-26 — Casa → Marcas: cortina independente

## Falha observada

A transição sumiu quando D-23 retirou o `clip-path` do capítulo de Marcas. O
recorte antigo fazia a esteira parecer sair antes de completar o último cartão.

## Decisão

Uma cortina de viewport lê somente a entrada de `#cap-marcas`. Ela sobe do
rodapé, cobre a Casa por uma fração da passagem e sobe de novo, liberando a
prancha. Não é filha de nenhum capítulo e não altera `transform`, `overflow` ou
altura de palcos sticky.

## Contrato de aceitação

- A cortina aparece apenas entre Casa e Marcas, inclusive ao rolar de volta.
- A esteira ainda fica presa até o último cartão; o palco das peças continua
  depois dela.
- Em movimento reduzido e no mobile, a passagem vira fluxo normal.
- A transição Peças → Estrada permanece controlada por `--entrega`.
