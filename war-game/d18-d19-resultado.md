# D-18 / D-19 — resultado da execução

## Decisão aplicada

- **D-18:** a EsteiraMarcas mantém uma única prancha e um único progresso reversível. Os
  primeiros 28% estabelecem a manchete; depois o trilho entra horizontalmente e a
  prancha termina no bloco editorial que entrega ao PalcoPecas. No mobile a prancha
  continua livre, sem scroll preso.
- **D-19:** o capítulo 04 deixa seu fundo transparente durante a entrada. O painel azul
  do próprio capítulo sobe pela borda inferior com `--rev-lento`; H.M. e homenagem só
  começam depois de aproximadamente 35% da cobertura. O relógio do mapa não foi tocado.

## Evidência

Capturas revisadas em 1440×900 e 375×812 nos estados antes, meio e depois das duas
fronteiras, incluindo ida e volta. No desktop, D-18 mede `--esteira-ato` 0 → 0,40 → 1;
D-19 mede `--cap-entra` 0 → 0,86 → 1. O portão passou nas cinco larguras: overflow real
0px, zero alvo clicável fora da tela e zero erro de console.

## Limites

As mensagens de `truncados` e `estouram a direita` do portão continuam sendo os falsos
positivos documentados da navegação, elementos decorativos e conteúdo horizontal
intencional da prancha. Nenhum PNG foi alterado; SVGs ficam para a próxima decisão.

Na auditoria independente, a primeira costura deixou uma faixa preta e a segunda ainda
expunha uma linha do fundo da raiz. A correção final mantém sob o painel o mesmo chão da
estrada (`#0f1f34`); o painel do capítulo 04 continua subindo por cima, sem fresta.
