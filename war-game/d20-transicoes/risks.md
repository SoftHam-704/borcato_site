# Riscos

| Código | Risco | Sinal | Recuperação / parada |
|---|---|---|---|
| R1 | Casa presa antes de todo o conteúdo ser lido | texto cortado ou salto ao entrar no painel | desativar pin; parar após 2 tentativas |
| R2 | Prancha começa a andar durante a subida | título e logos atravessam a borda do painel | reservar o primeiro ato só à entrada |
| R3 | Entrada local disputa com `--cap-entra` | texto pisca ou retrocede | um único `--revela` por bloco; remover regra antiga local |
| R4 | Preloader corta antes do fim | último frame salta | remoção derivada da duração CSS |
| R5 | Mobile herda pin desktop | rolagem presa ou conteúdo inacessível | desligar estágio abaixo de 901 px |

Decisor de estética e propagação: dono do projeto. Critério de aborto: regressão
de leitura, overflow ou dois ciclos sem reproduzir o gesto aprovado.

