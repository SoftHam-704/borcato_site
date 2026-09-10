# Riscos

| Código | Risco | Prob. | Impacto | Sinal | Recuperação | Parada |
|---|---|---:|---:|---|---|---|
| R34-1 | Marcas voltar a sobrepor Casa | média | alto | `top(marcas) < bottom(casa)` | reverter D-34 | uma ocorrência |
| R34-2 | Cortina cobrir conteúdo errado | baixa | médio | captura mostra texto sob painel | nova decisão visual | não ajustar valores no escuro |
| R34-3 | Mudança atingir mobile | baixa | médio | diferença nas cinco larguras | reverter regra desktop | qualquer overflow novo |
