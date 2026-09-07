# Especificação fechada dos pilotos

## Preloader → hero

- A máscara recua da direita para a esquerda, revelando primeiro a cápsula do
  retrato, cuja borda arredondada define a borda móvel.
- O evento que inicia o hero ocorre depois do começo da abertura.
- Existe um só timer de descarte, posterior aos 900 ms do `clip-path`.
- Pular, Escape e movimento reduzido permanecem funcionais.

## A casa → As marcas

- Desktop: os dois capítulos compart vivem no mesmo contexto de empilhamento;
  “A casa” fica sticky e “As marcas” pinta por cima, de baixo para cima.
- A prancha inicia com `--esteira-ato=0`; seu movimento horizontal mantém a
  janela já existente e não participa do painel vertical.
- Mobile/reduced-motion: fluxo vertical comum e carrossel horizontal nativo.
- Blocos marcados com `data-revela` recebem progresso pela própria caixa.

