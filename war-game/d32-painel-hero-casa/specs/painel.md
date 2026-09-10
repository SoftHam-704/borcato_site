# Especificação do painel

## Contrato

- Fonte de progresso: a fração já calculada no palco do hero.
- Janela desktop: começa no último terço do palco e termina em `1`.
- Superfície: a própria `#cap-casa`, opaca e acima do hero.
- Direção: área visível nasce na direita e cresce até a esquerda.
- Mobile e movimento reduzido: layout de fluxo normal.

## Invariantes

- O hero não lê nem modifica A Casa diretamente.
- O capítulo continua sendo o único dono de `--cap-entra`.
- Nenhum ancestral de `CortinaMarcas` recebe `transform` ou `overflow` novos.
