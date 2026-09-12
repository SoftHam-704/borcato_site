# Fase 4 — auditoria final

Data: 12/09/2026. Base: `130206b`. Resultado: **aprovado**.

## Decisão humana

O dono aprovou G36-B explicitamente em 12/09/2026. A Fase 4 não introduziu nova
direção visual: auditou o candidato e verificou se a navegação atual já satisfazia
o contrato. Como ela passou, não recebeu código corretivo.

## Abertura e Hero

- 375 × 812: 2026 apareceu assentado e permaneceu durante a pausa antes da saída.
- A saída começou somente depois da pausa; o Hero terminou com `.is-pronta`.
- A abertura foi removida por completo e o Hero ocupou toda a largura útil.
- A pausa `PAUSA_APOS_2026 = 2_000` continua intacta no código.

## Costuras

- Hero → Casa: conteúdo do Hero permanece legível durante a aproximação da Casa.
- Casa → Marcas: a reserva da Casa termina antes de a seção real cobrir o quadro;
  introdução e primeiro card viajam juntos.
- Peças → Estrada: o quinto ato permanece no quadro enquanto o mapa começa a entrar;
  não foi observada área vazia.
- Estrada → O Nome: a rota já está completa; a superfície azul leva o rótulo e H.M.
  enquanto cobre o capítulo anterior, sem faixa preta estrutural.

## Navegação

Em 1440 × 900 foram amostradas seis posições: Casa, antes de Marcas, Marcas
dominante, Estrada dominante, antes de O Nome e O Nome dominante. Todas exibiram
exatamente um `aria-current`. A troca ocorreu quando o painel entrante cruzou a
faixa central, sem dois rótulos concorrentes.

## Relógio do mapa

### Desktop

`--rota`: 0 → 0,2502 → 0,5006 → 0,9999 → 1. Na volta: 0,5006 → 0.
O oitavo ponto acendeu em 1 e o resultado permaneceu completo antes de O Nome entrar.

### Mobile

`--rota`: 0 → 0,5002 → 0,9998 → 1. Na volta: 0.
Com a rota completa, O Nome ainda estava 1.253 px abaixo da viewport.

## Matriz responsiva

| Largura | Altura | Documento | Overflow positivo | Esteira |
|---:|---:|---:|---:|---|
| 375 | 812 | 7.275 px | 0 | livre |
| 768 | 812 | 7.024 px | 0 | livre |
| 1024 | 900 | 10.573 px | 0 | sticky |
| 1440 | 900 | 10.546 px | 0 | sticky |
| 1920 | 900 | 10.363 px | 0 | sticky |

Os dois lados do breakpoint de 900 px foram inspecionados visualmente. Em 768,
introdução e primeiro card cabem no fluxo horizontal nativo; em 1024, a prancha
assenta com o primeiro card inteiro antes de andar.

## Integridade

- 19 imagens carregadas; zero quebradas ou pendentes.
- zero links vazios e zero IDs duplicados.
- zero erros e zero avisos de console após a travessia integral.
- `npx tsc --noEmit`: passou.
- `npm run build`: passou.
- `git diff --check`: passou.

`npm run lint` continua falhando por uma dívida anterior: 2.176 ocorrências de
formatação, dominadas pela diferença CRLF/Prettier. Fora dessa regra há 10 avisos
de Fast Refresh e um `no-empty`. Normalizar o repositório inteiro produziria um
diff massivo e foi corretamente mantido fora desta recuperação visual.

## Conclusão

O candidato satisfaz a régua D-36 e pode ser apresentado sem intervenção técnica
durante a travessia. O próximo trabalho deve começar de uma nova decisão e preservar
os commits `88069cd` e `130206b` como pontos de recuperação.
