# P36-A — resultado

Data: 10/09/2026. Estado: **executado; aguardando G36-A**.

## Alteração

### Abertura

- Em até 900 px, a cortina deixa de fechar lateralmente e sobe em largura total.
- O Hero recebe `hmb:abriu` 620 ms depois do início da saída natural, quando já
  existe área útil para sua animação.
- O botão Pular mantém entrega imediata.
- O fallback do Hero não dispara enquanto `body.is-abrindo` existir.
- Reduced motion aplica `is-pronta` no primeiro quadro.
- A pausa de 2.000 ms após 2026 foi preservada.

### Estrada → O Nome

- Removido o pseudo-elemento que tentava funcionar como segundo chão móvel.
- A própria `.cap--nome` agora fornece a superfície azul.
- A Estrada ganhou 32vh de área final; O Nome sobrepõe os mesmos 32vh, sem mudar o
  comprimento líquido da passagem.
- Rótulo, H.M., homenagem e fecho pertencem ao painel real.

## Evidência visual e geométrica

### 375 × 812

- cinco quadros da abertura observados;
- nenhum recorte vertical estreito;
- ausência de overflow horizontal;
- quando O Nome estava abaixo da viewport (`top=878`), a rota já estava em 1;
- com o painel em `top=185`, H.M. e homenagem estavam completos;
- nenhuma faixa preta apareceu entre as duas superfícies.

### 1440 × 900

- a revelação lateral desktop foi preservada;
- no início da cobertura, o painel estava em `top≈780` e a conclusão da Estrada
  permanecia legível;
- no meio, o painel estava em `top=420`, `--cap-entra=0.859795` e `--rota=1.0000`;
- na volta, `--cap-entra` caiu para `0.214634` com a rota ainda em 1;
- ausência de overflow horizontal.

## Gates

- `npx tsc --noEmit`: passou.
- `npm run build`: passou.
- `git diff --check`: passou.
- revisão visual em 375 e 1440: passou para submissão ao dono.

## Limite encontrado

A barra móvel ainda usa um fundo escuro fixo e ocupa a base do Hero e de O Nome.
Esse comportamento pertence à fase de navegação já prevista em D-36; não foi
misturado a P36-A.

## Próximo gate

G36-A deve aprovar a lâmina móvel e o painel de O Nome. Somente depois pode começar
P36-B, que transforma Casa → Marcas em conteúdo real sem duplicação.
