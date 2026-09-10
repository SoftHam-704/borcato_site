# D-29 — Borda de revelação do hero

## O que é a faixa

É a borda arredondada da máscara da abertura. Ela recua da direita para a
esquerda e revela o hero que já está atrás dela; o trecho claro pertence ao
enquadramento do hero, não é um elemento branco separado.

## Ajuste

A travessia do `clip-path` passa de 1,15 s para 1,45 s. O descarte da abertura
acompanha os mesmos 1.450 ms, para não cortar a borda antes de ela chegar ao
fim.
