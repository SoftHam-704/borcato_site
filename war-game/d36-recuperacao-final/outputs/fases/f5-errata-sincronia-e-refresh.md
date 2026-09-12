# Fase 5 — errata pós-auditoria

Data: 12/09/2026. Base: `2f95af1`. Resultado: **corrigido e validado**.

## Evidência que reabriu a verificação

Uma captura do dono mostrou a quinta peça ainda dominante, o mapa surgindo no
rodapé e a navegação já marcando `03 / A estrada`. A Fase 4 havia verificado que
existia exatamente um `aria-current`, mas não verificou se esse único capítulo
correspondia ao protagonista visual. A conclusão anterior era incompleta.

## Correção da passagem 02 → 03

- A abertura do capítulo 03 permanece fechada até `--entrega = 0,38`.
- Entre 0,38 e 1, a Estrada cobre o palco de forma progressiva.
- A navegação troca de 02 para 03 em `--entrega = 0,64`, quando a nova cena já
  domina o quadro; a margem negativa de 60vh deixa de decidir o capítulo ativo.
- A mesma régua funciona na volta, sem dois capítulos ativos.

Medição em 1694 × 720:

| `--entrega` | capítulo | entrada do 03 | opacidade da peça |
|---:|---|---:|---:|
| 0,0068 | 02 | 0 | 1 |
| 0,2903 | 02 | 0 | 1 |
| 0,5615 | 02 | 0,2927 | 0,53 |
| 0,6847 | 03 | 0,4915 | 0,2562 |
| 0,5491, na volta | 02 | 0,2727 | — |

## Refresh e abertura

O navegador restaurava a posição anterior do documento enquanto a abertura
rodava. Agora a restauração é manual e a abertura zera a rolagem antes da
pintura e antes da inicialização do scroll suave.

Teste partindo de `scrollY = 4198`:

- 250 ms após o refresh: abertura visível, `scrollY = 0`, capítulo 01 ativo;
- após a entrega do Hero: abertura removida, Hero pronto, `scrollY = 0`;
- zero erros e zero avisos no console.

## Integridade

- `npx tsc --noEmit`: passou;
- `npm run build`: passou;
- `git diff --check`: passou.
