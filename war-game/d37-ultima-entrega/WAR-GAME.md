# War Game — D-37

## Caminho crítico

1. Congelar `a55ccc0` e capturar o estado atual nas cinco larguras.
2. Corrigir a manchete do Hero e qualquer quadro vazio ou costura quebrada.
3. Fazer piloto de transições e textos, uma costura por vez; parar na primeira regressão.
4. Integrar SVGs oficiais somente após recebê-los e normalizá-los.
5. Rodar o gate técnico, teste em aparelho real e aprovação editorial do cliente.

## Riscos e respostas

| Risco | Sinal | Resposta | Aborto |
|---|---|---|---|
| Nova máscara corta conteúdo | quadro vazio ou texto truncado | voltar ao contrato anterior | uma ocorrência |
| Mais efeitos deixam tudo igual | costuras indistintas | escolher um gesto por capítulo | duas tentativas |
| Ajuste do Hero quebra mobile | falha em 375 px | manter variante responsiva isolada | primeira regressão |
| SVG altera proporção dos cards | logo invade ou fica ópticamente menor | normalizar viewBox e respiro | sem SVG aprovado |
| Aumento de duração piora narrativa | pausa sem argumento | reduzir trecho e medir | duas tentativas |

## Critério de parada

Não executar P1 enquanto algum P0 estiver aberto. Não publicar enquanto copy,
contatos, ativos oficiais e build publicado não tiverem aceite humano.

## Comando para o executor

Leia este pacote e os relatórios D-36. Execute somente a primeira fase autorizada,
atualize evidências e pare. Qualquer mudança de arquitetura recebe novo ID de decisão.

