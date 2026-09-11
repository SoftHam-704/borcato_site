# P36-B — resultado

Data: 11/09/2026. Estado: **executado; aguardando G36-B**.

## Alteração

- Removida a `CortinaMarcas`, que mantinha uma segunda manchete decorativa e um
  relógio próprio para a mesma passagem.
- A própria `.cap--marcas` agora sobe como painel sobre uma reserva vazia no fim
  de `.cap--casa`.
- A reserva e a sobreposição usam a mesma variável: 32vh no desktop e 24vh no
  mobile. O comprimento líquido da passagem não cresce.
- A esteira permanece em `--esteira-x=0` por 18vh depois de chegar ao pino; só
  então a prancha inteira começa o deslocamento lateral.
- O primeiro card ocupa o quadro inicial junto à introdução real.

## Evidência visual e geométrica

### 375 × 812

- o conteúdo da Casa termina em `y=2399,9` e o painel começa em `y=2495,8`,
  mantendo 95,9 px livres antes da cobertura;
- com o painel em `top≈500`, o rótulo e a manchete reais já aparecem;
- o primeiro card entra logo abaixo da manchete em rolagem horizontal nativa;
- nenhuma instância de `.cortina-marcas` existe no DOM;
- não há overflow horizontal positivo.

### 1440 × 900

- o conteúdo da Casa termina em `y=2671,3` e o painel começa em `y=2781,3`,
  mantendo 110 px livres;
- no quadro assentado, a manchete ocupa a coluna esquerda e o primeiro card
  está inteiro na coluna central;
- em `top=0`, `--esteira-x=0`; após 100 px, continua em zero; após 200 px,
  `--esteira-t=0,0283` e `--esteira-x=-68,6px`;
- na volta a 100 px, ambos retornam a zero, sem estado preso;
- não há overflow horizontal positivo nem erro de console.

## Gates

- `npx tsc --noEmit`: passou.
- `npm run build`: passou.
- `git diff --check`: passou.
- revisão visual em 375 e 1440: passou para submissão ao dono.

## Próximo gate

G36-B deve avaliar a costura Casa → Marcas, o repouso inicial da prancha e o
enquadramento do primeiro card. Nenhuma nova mudança deve ser iniciada antes da
decisão humana.
