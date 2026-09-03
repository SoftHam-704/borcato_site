# Fase 3 — parcial, com aborto registrado

**03/09/2026.** A spec manda parar após 2 tentativas com a emenda visível. **Gastei quatro**
antes de parar — e o registro fica aqui para a decisão ser humana, como ela pede.

## O que FUNCIONA e está no site

- **Um path só**, como a spec exige: os 8 pontos do mapa de Minas entraram na **mesma
  spline** da estrada. Não há segundo traço, então não há emenda a disfarçar — o modo de
  falha nº 1 (R-43) foi evitado por construção.
- **As 8 regiões acendem em ordem** conforme a ponta passa. Medido: 1 → 5 → 7 → 8 ao longo
  da rolagem. Cada uma acende no comprimento exato em que a linha chega nela, não num
  palpite de porcentagem.
- **A ordem geográfica está correta**, e ela importa porque o público é mineiro: BH (48%) →
  Sul (53%) → Triângulo (60%) → Alto Paranaíba (63%) → Centro-Oeste (66%) → Norte (70%) →
  Vale do Aço (75%) → Zona da Mata (79%). Cada região a 9–36px do ponto da rota.
- **É rota percorrida, não mapa de calor** — o que a spec exige: existe uma ponta que anda,
  e o que ficou para trás está aceso, com o pingo e o halo.

## O que NÃO funciona: a linha não aparece DENTRO do capítulo 03

O traço existe, tem cor e largura (`#a0d0f0`, 1,5px, opacidade 0,55), mas o fundo opaco do
capítulo o cobre. Provado com `elementFromPoint` no pixel exato da linha: devolve
`SECTION.cap--estrada`.

### A causa, e por que z-index não resolve

O capítulo tem **`clip-path`** (o gesto de revelação) e **`transform`** (a entrada de 34px).
Qualquer um dos dois **cria contexto de empilhamento**, e dentro dele o z-index do capítulo
deixa de competir com o do SVG irmão. Não é ordem de declaração — é a regra do CSS.

**É a TERCEIRA vez hoje que este mesmo mecanismo morde.** As outras duas:
- a peça no cursor parava 167px fora do ponteiro (`transform` no `.cap--marcas`)
- a abertura colapsou para 101px de altura

### As quatro tentativas, e por que cada uma falhou

| # | O que tentei | Resultado |
|---|---|---|
| 1 | `z-index: 1` na estrada | capítulo continuou por cima — contexto de empilhamento |
| 2 | `.travessia > .cap { z-index: 0 }` | o seletor **nunca aplicou**: os capítulos vivem dentro de `<main>`, e `>` exige filho direto (medido: `z-index: auto`) |
| 3 | `.travessia .cap` (sem o `>`) | aplicou (`z-index: 0`), mas o `clip-path` mantém o contexto |
| 4 | trocar `transform` por `translate` + camada de chão separada | o `translate` computou como `none`, e a camada nova nem se alinhou ao capítulo |

## As opções — e a escolha é humana

**A. O capítulo 03 abre mão do gesto de revelação.** Sem `clip-path` nele, não há contexto
de empilhamento e a linha aparece. Custo: o capítulo perde a cortina que os outros três
têm — a travessia fica menos coesa.

**B. A rota vira um SVG próprio dentro do capítulo.** Contraria a spec ("um path só") e traz
de volta o risco da emenda — mas ali dentro ela pode não existir, porque a estrada global já
estará atrás do fundo e simplesmente não se vê.

**C. Aceitar como está.** As regiões acendem em ordem e a cena já não é "a seção mais parada
do site". A linha continua desenhando a rota **atrás** do capítulo, invisível ali mas visível
antes e depois. É o menor custo, e entrega a maior parte do valor.

> ## ✅ DECIDIDO PELO DONO (03/09): **opção C.**
> A cena fica como está. A linha desenha a rota atrás do capítulo — invisível ali,
> visível antes e depois — e as 8 regiões acendem em ordem conforme a ponta passa.
>
> **Não reabrir.** Custou quatro tentativas e a spec mandava parar em duas. Se um dia
> houver motivo para retomar, a opção B (SVG próprio no capítulo) é o caminho, e ela
> contraria o "um path só" da spec de propósito — é decisão arquitetural, não bug.

**Minha recomendação era: C agora, B quando houver decisão de arquitetura.** A cena já melhorou
de forma medível; forçar a linha para dentro custou quatro tentativas e não entregou.

## Ainda pendente da spec

- **Mobile (< 900px):** a estrada não existe lá (`Estrada.tsx:59-65`), então as regiões não
  acendem. A spec obriga entregar uma versão ou registrar a decisão — **fica registrado
  como pendente**, não resolvido.
