# D-23 — pistas completas antes da próxima cena

## Defeito confirmado pelo dono

Depois de D-22, Marcas e Peças ainda podiam liberar a próxima cena antes de
concluir suas pistas. A entrada de Marcas transladava o capítulo inteiro, o que
também movia os filhos `sticky`: mesmo uma medição corrigida não impediria o palco
de abandonar visualmente a viewport cedo.

## Contrato

- A entrada visual é uma sobreposição estática de fluxo (`margin-top`), não uma
  transformação no ancestral dos palcos.
- O progresso das pistas volta a usar a posição real de cada bloco, pois ela não
  recebe transform do capítulo.
- O último card e a última peça permanecem legíveis até o fim da pista.
- O capítulo seguinte não avança enquanto a pista atual não chega a 100%.
- Mobile e movimento reduzido não aplicam a compensação de painel.

## Evidência local

Na trilha de Marcas, a cena ainda estava fixa em `y=0` com progresso `0,9621`;
o palco de Peças só chegou à viewport depois de a trilha atingir `1`. O palco
permaneceu fixo até a entrega para Estrada chegar a `0,9964`. Build, TypeScript e
console local passaram sem erro.
