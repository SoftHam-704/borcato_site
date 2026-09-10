# WAR GAME — D-36 Recuperação final

## Preâmbulo de evidências

O build não é o problema: `npm run build` e `npx tsc --noEmit` passam. A falha é
visível e sistêmica. O site usa uma máscara geral por capítulo, uma cortina fixa para
Marcas, pseudo-elementos como superfícies, uma margem negativa de 60vh em Estrada e
três progressos para a passagem Peças → mapa. Os consertos recentes reduziram
colisões, mas cada correção local acrescentou uma nova camada de comportamento.

## Objetivo

Entregar uma versão apresentável, previsível em 375 e 1440 px, preservando as cenas
fortes e reconstruindo apenas as fronteiras que ainda denunciam implementação.

## Fora de escopo

- nova identidade, copy, fotografia, vídeo ou logotipo;
- biblioteca de animação;
- refatoração integral do CSS;
- SEO, lint histórico ou publicação;
- reescrita do mapa e do palco de peças.

## Caminho crítico

`abertura mobile → piloto 03/04 → gate visual → piloto 01/02 → nav → auditoria completa`

## Fase 1 — congelar a linha de base

**Objetivo:** registrar commit, dimensões e quadros atuais. Não editar código.

- Otimista: as falhas são repetíveis nos mesmos pontos.
- Pessimista: o smooth scroll altera o instante e mascara a causa.
- Ação → reação → contra-ação: capturar por progressos fixos → frames variam →
  congelar scroll nativo durante a medição e restaurar depois.
- Falha: evidência baseada somente em full-page screenshot.
- Saída: tira e geometria para 375 e 1440.
- Aborto: estado não reproduzível em duas recargas.
- Orçamento: 1 sessão de medição.
- Dono/evidência: executor; relatório F1.

## Fase 2 — piloto P36-A: abertura mobile e 03 → 04

**Objetivo:** eliminar os dois defeitos bloqueadores. Não tocar em Marcas, mapa ou
conteúdo.

- Otimista: separar a máscara móvel da desktop e remover o pseudochão concorrente
  resolve os dois defeitos.
- Pessimista: o progresso de capítulo começa cedo e O Nome ainda nasce vazio.
- Ação → reação → contra-ação: estado móvel final explícito → Hero assenta inteiro;
  O Nome vira o próprio painel → conteúdo acompanha a superfície.
- Falhas: flash preto, capítulo sem texto, retrato cortado, faixa reaparece na volta.
- Detecção: tiras de 8 quadros, ida/volta, 375 e 1440.
- Recuperação: reverter somente P36-A e aplicar contingência C nessas costuras.
- Saída: S36-01/02/03/07/08/09/11/12.
- Aborto: duas tentativas ou qualquer regressão da rota.
- Orçamento: 1 implementação + 1 correção.
- Dono/evidência: executor; `outputs/pilotos/p36-a-resultado.md`.

## Gate G36-A

O dono vê a tira e o vídeo. Sem aprovação, P36-B não começa.

## Fase 3 — piloto P36-B: Casa → Marcas

**Objetivo:** fazer Marcas entrar como uma seção real e começar parada. Não alterar
a lista, o palco de peças ou logos.

- Otimista: a introdução real pode ocupar o painel sem duplicação.
- Pessimista: o trilho depende da posição atual e começa deslocado.
- Ação → reação → contra-ação: remover conteúdo decorativo da cortina e anexar o
  primeiro quadro real à pista → deslocamento espera assentamento → recalibrar a
  janela dentro do mesmo progresso.
- Falhas: painel vazio, título duplicado, Casa reaparece, primeiro card cortado.
- Detecção: três quadros de passagem e início do trilho em 375/1440.
- Recuperação: reverter P36-B e usar fade/wipe simples entre cenas.
- Saída: S36-04/05/06/11/12.
- Aborto: duas tentativas ou nova margem negativa no ancestral.
- Orçamento: 1 implementação + 1 correção.
- Dono/evidência: executor; `outputs/pilotos/p36-b-resultado.md`.

## Gate G36-B

O dono aprova o gesto e a ausência de repetição antes do ajuste de navegação.

## Fase 4 — navegação e auditoria

**Objetivo:** sincronizar o capítulo ativo com a cena dominante e rodar os gates.

- Otimista: a regra atual precisa apenas de uma janela neutra durante as costuras.
- Pessimista: cada componente calcula ativo por um relógio diferente.
- Ação → reação → contra-ação: eleger uma fonte de capítulo dominante → nav deixa de
  cruzar estados → se a fonte não for estável, esconder o texto durante a passagem.
- Falha: dois ativos, rótulo truncado, foco preso, mobile coberto.
- Saída: S36-10/12/13 e vídeo completo.
- Aborto: alteração em estrutura ou conteúdo fora do escopo.
- Orçamento: 1 implementação + 1 correção.
- Dono/evidência: executor e dono; auditoria final.

## Unknown unknowns e recuperação global

Mudanças de altura afetam cálculos por posição. Cada piloto precisa de commit próprio,
sem misturar formatação. Se um piloto falhar duas vezes, reverter o commit inteiro e
aplicar a opção C somente naquela fronteira. O restante do site continua demonstrável.

## Próxima decisão humana

**Aprovar D-36 na opção A** autoriza apenas Fase 1 e P36-A. G36-A continua fechado.

Comando para o executor após aprovação:

> Leia todo `war-game/d36-recuperacao-final`. Execute somente Fase 1 e P36-A.
> Registre tiras em 375 e 1440, atualize ledger/riscos/resultado e pare no G36-A.

