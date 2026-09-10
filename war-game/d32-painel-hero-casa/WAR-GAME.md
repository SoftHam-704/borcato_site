# War Game — Painel Hero → A Casa

## Evidência e objetivo

O hero termina em um palco sticky e A Casa já é um capítulo sticky no início de
`passagem-casa-marcas`. O recorte atual abre da direita, mas o capítulo só
alcança a viewport depois de o hero ceder; por isso parece revelação, não uma
tela passando sobre outra.

Objetivo: fazer A Casa atravessar o hero como painel real, da direita para a
esquerda, usando o último trecho da rolagem do próprio hero.

## Arquitetura fechada

1. O hero espelha seu progresso de rolagem em uma propriedade raiz numérica.
2. Somente A Casa, em desktop sem movimento reduzido, remapeia a janela final
   desse progresso para `--cap-entra`.
3. A passagem A Casa → Marcas começa antes no fluxo, mas A Casa permanece
   inteira e recortada até a janela abrir.
4. O próprio capítulo carrega o fundo e os conteúdos do painel. Não há clone,
   cortina vazia ou temporizador.

## Fases autorizadas

### Fase 1 — Piloto

**Ação:** antecipar A Casa e vinculá-la ao progresso final do hero.

**Falha provável:** o painel surge antes da leitura do hero.

**Detecção:** com o progresso abaixo do limiar, o `clip-path` precisa ter inset
esquerdo de 100% e nenhum conteúdo pode ser visto.

**Recuperação:** remover a margem negativa e o remapeamento exclusivo de A Casa.

**Orçamento:** uma implementação e uma validação de estados fechado/intermediário/aberto.

### Fase 2 — Auditoria

**Saída:** TypeScript, build e inspeção dos três estados; reduced-motion sem
sobreposição.

## Fora de escopo

Vídeo do Fábio, nova animação facial, mudanças na copy, nas marcas e nas outras
três passagens.
