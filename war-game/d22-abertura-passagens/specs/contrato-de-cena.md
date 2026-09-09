# Contrato de cena D-22

## P22-A

Uma única variável de estado da abertura governa nome, anos, cortina, cápsula e
manchete inicial. A cronologia é: marca/luz (0–0,25s), nome e anos (0,25–0,85s),
entrega conjunta do retrato e da manchete (0,85–1,75s), assentamento (até 2,25s).
Depois disso não pode restar animação de entrada acima de 250ms.

O cursor só volta quando a abertura deixa o DOM. Movimento reduzido remove todos os
transforms e mantém apenas uma transição de opacidade curta, ou mostra diretamente o
estado final.

## P22-B

A passagem é uma superfície `.cap--marcas` que entra de baixo e ocupa a viewport inteira.
Casa é a cena de saída e não recebe novo deslocamento. A superfície usa um progresso
dedicado à passagem, calculado uma vez a partir do contêiner; elementos internos de
Marcas só recebem revelação depois de o progresso chegar ao estado assentado.

O trilho horizontal continua sendo dirigido pelo scroll da própria esteira, mas sua
transformação lateral é zero na janela de entrada do painel. Não há variável baseada na
posição de um filho que também está sendo transformado.
