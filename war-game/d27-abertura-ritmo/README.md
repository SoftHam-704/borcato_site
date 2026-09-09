# D-27 — Ritmo da abertura

## Defeito observado

O contador de anos passava rápido demais e a porta liberava o hero antes de a
sequência ter peso. O gesto completo parecia apressado.

## Ajuste

- 180 ms por ano, em vez de 110 ms;
- luz aos 160 ms e nome aos 300 ms;
- 2026 fica em tela por dois segundos antes de a porta começar;
- a máscara da cápsula passa de 900 ms para 1.150 ms.

Em 2026, 2018→2026 passa a ocupar cerca de 1,44 s. Após o último ano, a cena
segura por dois segundos e só então começa a entrega ao hero.

## Critérios

- Cada ano deve ser legível.
- 2026 deve permanecer legível por dois segundos antes do hero.
- O botão Pular e `prefers-reduced-motion` continuam instantâneos.
