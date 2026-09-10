# Régua de sucesso — D-36

## Resultado esperado

O site precisa poder ser apresentado do começo ao fim sem que o operador explique,
desculpe ou pule uma transição. Movimento deve revelar conteúdo; não pode produzir
quadros vazios, costuras, manchetes duplicadas ou capítulos simultâneos.

## Critérios verificáveis

| Código | Critério | Evidência de aceite |
|---|---|---|
| S36-01 | Em 375 × 812, preloader e Hero nunca ficam legíveis ao mesmo tempo dentro de uma faixa estreita. | tira de 8 quadros da abertura |
| S36-02 | A marca dá sinal visual desde o primeiro quadro útil; a pausa de 2 s após 2026 permanece. | cronologia gravada e temporizadores |
| S36-03 | Hero aparece inteiro ao fim da saída, sem texto, CTA ou retrato cortado. | capturas em 375 e 1440 |
| S36-04 | Casa termina legível antes de Marcas assumir. | posições de `bottom(casa)` e `top(marcas)` e tira temporal |
| S36-05 | O painel Casa → Marcas contém o conteúdo real que continuará na prancha; não repete uma manchete decorativa. | DOM e três quadros da passagem |
| S36-06 | A prancha começa parada, com introdução e primeiro conteúdo visíveis, e só depois inicia o deslocamento lateral. | progresso do trilho e captura |
| S36-07 | O mapa nasce com rota 0, progride monotonicamente até 1 e permanece completo antes de sair. | valores de `--rota` e tira temporal |
| S36-08 | Entre Estrada e O Nome não aparece faixa preta maior que 2 px nem área sem conteúdo maior que 120 ms. | tira de 8 quadros |
| S36-09 | O painel de O Nome já traz seu rótulo e sua primeira mensagem enquanto cobre Estrada. | captura no meio da passagem |
| S36-10 | A navegação mostra exatamente um capítulo ativo e não cruza a costura com dois rótulos concorrentes. | capturas em cada fronteira |
| S36-11 | Rolagem reversa recompõe as cenas sem salto, rota regressiva acidental ou conteúdo preso. | vídeo ida/volta |
| S36-12 | Movimento reduzido mostra todo o conteúdo sem máscara ou deslocamento residual. | captura e inspeção CSS |
| S36-13 | Não há overflow horizontal, erro de console, erro TypeScript ou falha de build. | 375, 768, 1024, 1440 e 1920; comandos de gate |

## NÃOs

- Não alterar a pausa aprovada de 2 s após 2026.
- Não redesenhar o Hero nem trocar sua copy nesta recuperação.
- Não editar mapa, lista de regiões, palco de peças ou ordem das indústrias.
- Não ampliar logos raster; os vetores oficiais continuam como dependência futura.
- Não adicionar biblioteca de animação.
- Não criar outro relógio por filho transformado.
- Não considerar uma captura isolada como aprovação de movimento.
- Não gastar mais de duas tentativas por piloto.

