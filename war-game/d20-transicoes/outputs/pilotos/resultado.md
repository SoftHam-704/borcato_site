# Resultado dos pilotos — 07/09/2026

## Preloader → hero

Passou com ressalva estética aberta ao dono. A saída começa durante a contagem,
revela o lado do retrato e mantém a camada por 950 ms para uma transição CSS de
900 ms. O hero termina íntegro e a manchete permanece legível.

## A casa → As marcas

Passou tecnicamente. Em 1440 px, “A casa” permaneceu em `top=0` enquanto o painel
de marcas assumiu a viewport; durante o gesto a prancha ficou em `x=0`. Eliminada
a espera interna de 28% que criava um quadro vazio. Em 375 px o pin é desligado,
o carrossel continua nativo e o documento mede zero overflow.

## Portões

- `npx tsc --noEmit`: código 0.
- `npm run build`: código 0.
- `python ferramentas/portao-responsividade.py`: passou em 375, 430, 768,
  1024 e 1440; zero overflow, zero alvo menor que 44 px e zero erro de console.
- `npm run lint`: não utilizável como gate; 2.374 ocorrências preexistentes,
  dominadas pela divergência CRLF/Prettier, inclusive em arquivos não tocados.

Gate ainda fechado: propagar esta arquitetura para os demais capítulos.

