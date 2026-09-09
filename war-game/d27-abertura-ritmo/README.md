# D-27 — Ritmo da abertura

## Defeito observado

O contador de anos passava rápido demais e a porta liberava o hero antes de a
sequência ter peso. O gesto completo parecia apressado.

## Ajuste

- 180 ms por ano, em vez de 110 ms;
- luz aos 160 ms e nome aos 300 ms;
- a porta continua começando com os dois últimos anos em curso;
- a máscara da cápsula passa de 900 ms para 1.150 ms.

Em 2026, 2018→2026 passa a ocupar cerca de 1,44 s. A entrega inicia com 2025 e
2026 ainda visíveis e termina por volta de 2,73 s: leitura, sobreposição e
chegada em um único gesto.

## Critérios

- Cada ano deve ser legível.
- Não pode haver pausa com contador parado e hero fechado.
- O botão Pular e `prefers-reduced-motion` continuam instantâneos.
