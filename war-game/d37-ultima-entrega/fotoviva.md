# Fase FotoViva — correção aprovada

## Defeito

O scrub original convertia o progresso em cinco índices com `Math.round` e
desenhava cada PNG seco. Isso produzia quatro trocas instantâneas na primeira
tela de rolagem, apesar dos cinco frames formarem uma sequência válida.

## Correção executada

- `Math.floor` + fração para compor quadros vizinhos com `globalAlpha`;
- easing quadrático `ease-in-out` no progresso da rolagem;
- blur máximo de 0,7 px apenas durante a sobreposição, sem alterar os arquivos;
- progresso preservado durante redimensionamento do canvas;
- `prefers-reduced-motion` e carregamento integral dos cinco frames preservados.

## Evidência

Em `http://127.0.0.1:5188/`, os quadros em 0, 104, 316 e 536 px mostraram uma
virada contínua da frente para o lado, sem salto aparente. O canvas ficou
`is-pronta` e não houve erros ou avisos no console.

## Limite

Isto suaviza a percepção entre os frames existentes; não cria informação visual
intermediária real. Um movimento totalmente contínuo exigiria frames adicionais
gerados por filmagem ou ferramenta de interpolação.

