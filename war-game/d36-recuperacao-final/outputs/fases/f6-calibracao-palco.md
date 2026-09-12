# F6 — Calibração da rolagem do palco de peças

## Evidência

Em viewport de 1694 × 720 px, o palco reservava cerca de **71 px úteis por
ato**. Um gesto comum da roda, medido em aproximadamente 220 px, atravessava
quase três peças.

## Ajuste

- trecho igual: `22vh` → `45vh`;
- passagem final: preservada em `50vh`;
- CSS passou a ser a fonte única das duas medidas, lidas pelo componente;
- nenhum interceptador de `wheel`, snap forçado ou atraso artificial foi criado.

Com a nova pista, cada ato recebe aproximadamente **223 px úteis** nessa
viewport. A altura total do palco fica em 2304 px e a pista rolável em 1584 px.

## Prova no navegador

Cinco gestos consecutivos de 220 px produziram:

`Filtração → Iluminação → Lubrificação → Plásticos automotivos → passagem`

A volta com os mesmos cinco gestos reproduziu a sequência inversa sem saltos.
O primeiro gesto a partir da abertura mantém “Movimento” porque ele conduz da
abertura ao primeiro ato, que usa a mesma peça.

