# WAR-GAME — D-35 Painel com conteúdo

## Contexto

D-34 corrigiu a colisão de Casa e Marcas, mas deixou a cortina fixa sem conteúdo
durante parte da subida. Esta fase trata apenas da legibilidade desse painel.

## Hipóteses

- Otimista: um teaser curto torna o painel uma cena de entrada e preserva o fluxo.
- Pessimista: o teaser repete a manchete e cria competição com o capítulo seguinte.

## Ação → reação → contra-ação

1. Adicionar rótulo, manchete curta e apoio ao painel → a subida passa a ter narrativa → manter `aria-hidden` e não duplicar cards.
2. Animar com `--sobe` → texto acompanha a cortina → conferir auge e recuo em captura.

## Falhas e recuperação

- Painel vazio: captura no ponto de maior cobertura; reverter D-35.
- Texto ilegível ou repetido: registrar como nova decisão visual; não remover o relógio.
- Regressão responsiva: rodar portão nas cinco larguras e reverter apenas esta fase.

## Saída

Captura sem painel vazio, conteúdo principal assume após o recuo e gates técnicos
passam. Orçamento: uma implementação e uma revisão visual.
