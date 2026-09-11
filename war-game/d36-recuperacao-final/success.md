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

## Estado após P36-A

| Critério | Estado | Evidência |
|---|---|---|
| S36-01 | passa | abertura móvel usa lâmina horizontal de largura total; cinco quadros sem fresta vertical |
| S36-02 | passa | `PAUSA_APOS_2026` permanece em 2.000 ms e a marca aparece no primeiro quadro |
| S36-03 | passa no escopo | a máscara não corta Hero ao ser removida; composição interna permanece para a fase de navegação |
| S36-07 | passa | `--rota=1.0000` antes de O Nome entrar |
| S36-08 | passa | nenhuma faixa preta estrutural em 375 ou 1440 nas tiras observadas |
| S36-09 | passa | rótulo e H.M. viajam na própria superfície azul |
| S36-11 | passa | volta medida de `--cap-entra=0.859795` para `0.214634`, com rota em 1 |
| S36-12 | passa por contrato | abertura some e Hero recebe estado final explícito; nenhum recorte permanece em O Nome |
| S36-13 | parcial | 375/1440 sem overflow; `tsc`, build e `diff --check` passam |

## Estado após P36-B

| Critério | Estado | Evidência |
|---|---|---|
| S36-04 | passa | Marcas começa 96–110 px depois do fim do conteúdo da Casa e sobrepõe somente a reserva equivalente |
| S36-05 | passa | a cortina duplicada foi removida do DOM e do código; a entrada carrega a própria `.esteira__cabeca` |
| S36-06 | passa | em 1440, `--esteira-x=0` nos primeiros 18vh; o primeiro card já está visível antes do movimento |
| S36-11 | passa no piloto | na volta de 200 px para 100 px após o pino, `--esteira-t` retorna de 0,0283 para 0 sem salto |
| S36-12 | passa por contrato | em movimento reduzido a esteira continua livre e a passagem usa somente fluxo e sobreposição equivalente |
| S36-13 | passa no piloto | 375/1440 sem overflow positivo ou erro de console; `tsc`, build e `diff --check` passam |
