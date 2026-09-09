# D-25 — Estrada: chegada, percurso, permanência

## Defeito visto pelo dono

O mapa já aparecia quase todo riscado quando a Estrada entrava e só completava
quando começava a sair. A rota era calculada por um marco abaixo do SVG, então
seu relógio começava antes da cena ser realmente assumida.

## Contrato

- Durante Peças → Estrada, a rota vale `0`: há apenas silhueta e território.
- Em desktop, Estrada é uma pista de 200vh com uma cena sticky de 100vh.
- A rota começa quando a cena assume o topo, usa 75% da pista e fica completa
  pelos 25% finais.
- Só depois desse repouso a seção seguinte pode subir.
- Em mobile, mantém-se a âncora estável existente; não se prende uma composição
  que precisa fluir verticalmente.
