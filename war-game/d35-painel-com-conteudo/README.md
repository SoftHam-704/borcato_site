# D-35 · Painel Casa → Marcas com conteúdo

## Motivo

O D-34 eliminou a colisão entre capítulos, mas a captura seguinte mostrou um
quadro azul vazio: a cortina fixa completava sua subida antes de o cabeçalho de
Marcas alcançar a viewport.

## Ação

O painel agora carrega uma apresentação curta da própria seção 02 — rótulo,
manchete e linha de apoio — com entrada vertical e opacidade ligadas à subida da
cortina. O fluxo de Casa/Marcas e o relógio de progresso permanecem intactos.

## Critérios de saída

- nenhum quadro de cortina totalmente azul sem texto de Marcas;
- Casa continua terminando antes de Marcas no fluxo;
- a cortina segue decorativa (`aria-hidden`) e some antes do conteúdo principal;
- `tsc`, build e portão de responsividade passam.

## Limite

Esta rodada não altera Hero, mapa, peças, copy principal ou breakpoints. Se o
texto duplicado parecer repetitivo na captura, abrir nova decisão de direção;
não remover a cortina às cegas.
