# Ledger — D-36

## Decisões

| ID | Estado | Decisão | Evidência | Impacto |
|---|---|---|---|---|
| D-22 | executada | abertura e passagens teriam contrato único por cena | `d22-abertura-passagens/specs/contrato-de-cena.md` | o estado atual voltou a fragmentar esse contrato |
| D-28 | fechada | manter 2 s após 2026 | `Abertura.tsx`, `PAUSA_APOS_2026 = 2_000` | não pode ser encurtada sem nova decisão |
| D-34 | executada | Casa e Marcas retornam ao fluxo normal | `d34-casa-marcas/README.md` | eliminou colisão, mas deixou uma cortina separada |
| D-35 | executada | adicionar texto à cortina vazia | `d35-painel-com-conteudo/README.md` | resolveu o vazio, criou repetição editorial |
| D-36 | opção A aprovada | estabilização dirigida | aprovação do dono em 10/09/2026 | P36-A e P36-B executados |
| G36-A | aprovado | aceitar P36-A e iniciar P36-B | “vamos prosseguir parceiro” em 11/09/2026 | liberou Casa → Marcas |
| G36-B | pendente | aceitar ou reprovar P36-B | `outputs/pilotos/p36-b-resultado.md` | bloqueia qualquer nova intervenção |

## Fatos observados em 10/09/2026

| Código | Fato | Evidência |
|---|---|---|
| F36-01 | A primeira impressão desktop pode ser quase toda preta, com apenas “Pular”. | captura imediata no navegador local |
| F36-02 | Em 375 px, a saída da abertura forma um recorte estreito e mistura preloader, Hero, retrato e CTA. | `ferramentas/vistoria/topo-375.png` e captura fornecida pelo dono |
| F36-03 | A cortina Casa → Marcas é `position: fixed`, `aria-hidden` e contém uma segunda manchete. | `CortinaMarcas.tsx`; `styles.css:2617-2675` |
| F36-04 | Marcas dura 3.675 px no viewport auditado; esteira e palco formam três atos longos para o mesmo tema. | geometria DOM no navegador local |
| F36-05 | A entrada de Estrada combina margem `-60vh`, `--entrega`, `--cap-entra` e `--rota`. | `styles.css:2130-2140`, `Capitulos.tsx`, `PalcoPecas.tsx`, `MapaMinas.tsx` |
| F36-06 | A rota começa depois da entrada visual do mapa; no miolo ela funciona e chega a 1. | amostragem de scroll e `MapaMinas.tsx` |
| F36-07 | Estrada → O Nome exibe uma faixa preta horizontal grande antes do painel azul. | captura em `scrollY≈7308` |
| F36-08 | O conteúdo inicial de O Nome entra com contraste baixo e demora a assumir a cena. | captura da fronteira 03 → 04 |
| F36-09 | O fecho com Fábio frontal, chamada e contatos é legível e deve ser preservado. | captura no `scrollY=8198` |
| F36-10 | O documento medido tem 8.918 px em 1280 × 720 e nenhum overflow horizontal no fim. | inspeção DOM |
| F36-11 | Build de produção e `tsc --noEmit` passam. | execução local em 10/09/2026 |
| F36-12 | `styles.css` tem 3.984 linhas e 78 regras iniciadas pelos seletores das cenas auditadas. | contagem local |

## Informações ausentes

| Item | Pode ser inferido? | Risco de assumir errado | Tratamento |
|---|---|---|---|
| Aprovação do cliente para a copy final | não | alto | fora desta recuperação; validar antes da entrega pública |
| Logos vetoriais oficiais | não | médio | manter tamanhos atuais; substituir numa rodada própria |
| Vídeo futuro do Fábio olhando para a esquerda | não | médio | a passagem Hero → Casa deve continuar funcionando sem ele |
| Desempenho em aparelhos físicos antigos | não | médio | medir depois que os pilotos visuais passarem |

## Suposições temporárias

- O cliente rejeita principalmente a leitura quebrada e a aparência amadora das
  costuras; o Hero, o mapa no estado final e o fecho são ativos a preservar.
- A apresentação ocorrerá primeiro em desktop, mas uma falha evidente em 375 px é
  bloqueadora de entrega.
- O código atual é a linha de base; `ferramentas/vistoria/` permanece fora de commits.
