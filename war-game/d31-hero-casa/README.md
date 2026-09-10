# D-31 — Hero → A Casa

## Triagem

Mudança visual, reversível e limitada a uma máscara CSS existente. Não cria
relógio, dependência de vídeo ou mudança de layout; por isso usa War Game
enxuto, sem gate separado.

## Estado observado

O hero termina em um palco preso. `--hero-t` chega ao fim antes de `#cap-casa`
começar; este capítulo já recebe `--cap-entra` e a máscara `--rev` no CSS.
Antes, `A Casa` subia pelo rodapé.

## Piloto

Trocar somente o recorte de `A Casa` por uma abertura da direita para a
esquerda, incluindo a linha de costura. O capítulo fica totalmente fechado com
`--rev = 0` e inteiro com `--rev = 1`.

## Critérios

- A Casa não aparece enquanto o hero ainda está no palco.
- Ao entrar, o limite vertical avança da direita do visitante até a esquerda.
- `prefers-reduced-motion` mantém a cena inteira, sem máscara.
- O futuro vídeo não é necessário para que a transição funcione.

## Risco e reversão

Se o movimento competir com o fim do hero, reverter as duas regras de
`.cap--casa` para a máscara vertical anterior. Não há estado persistido ou
dependência em outro componente.
