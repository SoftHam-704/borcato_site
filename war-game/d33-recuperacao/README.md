# D-33 — Recuperação após regressão D-32

## Decisão e execução

Pedido: revisar a sobreposição quebrada com economia de limite. Removidas
somente as mudanças de código de D-32; src voltou ao estado de 3cee290.
Preservados o preloader com pausa de 2s e a revelação do hero de 1,65s.

## Diagnóstico

A margem -129svh aplicada a passagem-casa-marcas antecipava também Marcas,
seu marcador e a cortina fixa. Ocultar A Casa não oculta seus irmãos.
A Casa sticky também não reserva tempo adicional de leitura no fluxo.
Outro erro da implementação: o z-index 2 era sobrescrito por z-index 0 na
regra posterior com mesma especificidade. Medições anteriores só verificaram
o recorte; não demonstraram que a composição estava correta.

## Evidência da recuperação

Prévia inspecionada por screenshot e DOM: viewport de altura 916px, scroll
600px. Hero ocupa y=0..916; A Casa começa em y=1174; Marcas em y=1634.
Margem do contêiner restaurada a 0px. Screenshot mostra o hero completo,
sem os dois painéis de Marcas que apareciam na captura do usuário.
TypeScript e git diff --check passaram. Código src igual ao commit 3cee290.

## Próximo piloto delimitado

A sobreposição lateral verdadeira continua pendente. Reservar uma pista
exclusiva para Hero → Casa, com dois planos e duração própria no layout;
Marcas deve começar após a leitura de Casa. Não reaplicar margem negativa
no ancestral que contém as próximas seções. Não ligar ao fim do preloader:
o vídeo futuro terá seu próprio término a integrar quando o arquivo existir.

Aceite: capturas no início, meio e fim, nos dois sentidos; hero legível antes
da transição, somente Hero/Casa coexistindo, Casa com tempo de leitura antes
de Marcas, último card e peça acessíveis, mobile e movimento reduzido legíveis.
Validar composição por imagem, não inferir sucesso de variáveis CSS.
Uma implementação isolada e uma correção; se falhar, manter a recuperação.
