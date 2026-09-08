# Régua de sucesso

## Resultado comercial

O piloto será considerado melhor quando Fábio conseguir, em uma apresentação curta,
responder sem ajuda:

1. quem é a H.M. Borçato;
2. o que ela representa;
3. onde atua;
4. por que sua forma de trabalhar importa;
5. como iniciar uma conversa.

O teste humano antecede qualquer meta de prêmio.

## Critérios verificáveis

| Código | Critério | Gate |
|---|---|---|
| S-01 | Navegação “02 As marcas” pousa com manchete e primeiro cartão visíveis | 1440 e 375 |
| S-02 | Nenhum CTA ou texto fica sob a barra fixa móvel | 375 × 812 e 430 × 932 |
| S-03 | Página desktop entre 8 e 10 viewports | medição de altura |
| S-04 | “As marcas” ocupa no máximo 35% da página | medição de altura |
| S-05 | Uma representada não é enumerada duas vezes em sequência | revisão editorial |
| S-06 | Cada transição tem quadro inicial, transformação e quadro final legíveis | tira de 6 quadros por costura |
| S-07 | Mapa inteiro fica visível enquanto a rota progride de 0 a 1 | captura e valores CSS |
| S-08 | Carrossel móvel informa que é arrastável e mostra posição | teste sem instrução verbal |
| S-09 | CTA primário está visível no hero e no fecho | desktop e mobile |
| S-10 | Toda afirmação comercial é aprovada ou rastreável | ledger de conteúdo |
| S-11 | Logos usados em grande escala têm vetor ou raster suficiente | 1× e 2× |
| S-12 | Build, lint, console, teclado e reduced motion passam | comandos e gravação |

## Medição do piloto P-21A/B — 08/09/2026

| Código | Estado | Resultado |
|---|---|---|
| S-01 | passa | 1440 e 375 chegam à manchete e ao primeiro cartão com progresso `0`. |
| S-02 | passa no piloto | CTA “Ver as peças” termina em y=407; nav móvel começa em y=721. |
| S-03 | pendente | Página caiu de 13,7 para 10,72 viewports; o alvo final é no máximo 10. |
| S-04 | parcial | Capítulo caiu de 6.852 para 4.152 px, redução de 39,4%; ainda ocupa 43,1% da página mais curta. |
| S-05 | passa | Onze indústrias aparecem na prancha; o palco seguinte mostra cinco categorias. |
| S-08 | passa | Mobile tem snap horizontal, instrução visível e contador `01 / 11`. |
| S-12 | parcial | `npm run build` e `git diff --check` passam; o lint global mantém o débito anterior de Prettier/CRLF e não é gateado por este piloto. |

## NÃOs

- Não adicionar outro efeito antes de cortar repetição e corrigir navegação.
- Não usar duração como substituto de conteúdo.
- Não copiar outra cena do Lando Norris literalmente.
- Não criar fatos, depoimentos, números ou clientes.
- Não ampliar logos raster acima da resolução útil.
- Não aprovar por uma captura estática; transições exigem tira temporal.
