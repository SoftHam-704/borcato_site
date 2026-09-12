# Riscos — D-36

| Código | Risco | Prob. | Impacto | Sinal | Detecção | Recuperação | Parada | Decisor |
|---|---|---:|---:|---|---|---|---|---|
| R36-01 | Corrigir desktop e quebrar mobile | alta | crítico | recorte estreito, texto/CTA cortado | tira em 375 antes de validar 1440 | breakpoint com contrato próprio e reversão do piloto | primeira ocorrência após 2ª tentativa | dono |
| R36-02 | Nova cortina voltar a ser painel vazio | média | alto | mais de 120 ms sem conteúdo útil | tira temporal | usar a seção real como painel; retirar camada duplicada | uma ocorrência | dono |
| R36-03 | Marcas começar a andar antes de assentar | alta | alto | título ou primeiro card já deslocado na entrada | medir progresso da esteira | janela inicial morta para deslocamento, derivada do mesmo contêiner | 2 tentativas | executor |
| R36-04 | Faixa preta persistir em 03 → 04 | alta | crítico | linha/área escura entre superfícies azuis | amostra de 8 quadros | remover pseudochão concorrente e deixar O Nome fornecer a superfície | 2 tentativas | dono |
| R36-05 | Nav exibir dois capítulos | média | médio | dois rótulos ativos ou truncados | captura em cada fronteira | derivar ativo do painel dominante e ocultar texto no intervalo | 2 ocorrências | executor |
| R36-06 | Mexer na passagem e regredir a rota | média | alto | `--rota` inicia acima de 0, retrocede ou não chega a 1 | log de valores em ida e volta | reverter piloto; manter D-25 intacto | uma regressão | dono |
| R36-07 | Acumular mais CSS corretivo | alta | alto | nova regra sobrescreve regra anterior da mesma cena | revisão de seletores e diff | substituir o bloco do contrato, sem anexar override tardio | mais de um override corretivo | executor |
| R36-08 | Perder prazo buscando variedade de efeitos | média | alto | quinta costura entra no escopo | ledger e diff | limitar a duas costuras e um ajuste de nav/abertura | qualquer item fora do escopo | dono |
| R36-09 | Reduced motion herdar máscara invisível | média | alto | conteúdo ausente com preferência reduzida | emulação e captura | estado final explícito sem clip/translate | uma ocorrência | executor |
| R36-10 | Aprovar por frame bonito e esconder salto | alta | alto | extremos bons, miolo quebrado | tira temporal e vídeo ida/volta | reprovar piloto e corrigir a spec | falta de evidência temporal | dono |

## Unknowns

- **Known known:** há mecanismos concorrentes de máscara, pseudochão, margem negativa
  e progresso por posição.
- **Known unknown:** quanto da sensação de lentidão de Marcas vem da duração e quanto
  vem da repetição do mesmo argumento.
- **Unknown known:** decisões antigas estão preservadas em comentários e overrides,
  mas algumas já não descrevem o comportamento atual.
- **Unknown unknown:** um ajuste de altura pode mudar o curso de todos os cálculos por
  `getBoundingClientRect`; por isso cada piloto deve congelar e comparar a geometria.

## Situação no encerramento

- R36-01 a R36-06 e R36-09 a R36-10: mitigados pelos pilotos e pela auditoria final.
- R36-07: reduzido; P36-B removeu 125 linhas líquidas e a cortina concorrente.
- R36-08: mitigado; nenhum item criativo, logo, copy ou biblioteca entrou no ciclo.
- Permanência conhecida: a convenção CRLF do repositório conflita com a regra
  Prettier do ESLint. Resolver isso exige uma rodada de formatação isolada.
