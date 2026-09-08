# Registro de riscos

| Código | Risco | Prob. | Impacto | Sinal/detecção | Recuperação | Parada | Decisor |
|---|---|---:|---:|---|---|---|---|
| R-21-01 | Continuar adicionando efeitos sem resolver a rejeição | alta | crítico | mais commits e mesma reação | congelar motion e aprovar storyboard | duas tentativas sem melhora | dono |
| R-21-02 | Cortar marcas e parecer que alguma foi preterida | média | alto | cliente pergunta por uma ausente | todas aparecem uma vez; peças viram categorias | qualquer representada ausente | Fábio |
| R-21-03 | Manter afirmação absoluta não aprovada | média | alto | desconforto com a manchete | trocar por promessa verificável | sem aprovação explícita | Fábio |
| R-21-04 | Novo carrossel continuar longo ou vazio | alta | alto | mais de 35% da página | limitar largura, altura e número de atos | piloto excede 10 viewports | dono |
| R-21-05 | Corrigir âncora e quebrar scroll scrub | média | alto | salto, regressão ou frame errado | destino próprio antes da pista | uma regressão em ida/volta | executor |
| R-21-06 | Mobile parecer uma miniatura do desktop | alta | alto | corte, sobreposição, swipe oculto | composição própria e gate em 375/430 | CTA encoberto | dono |
| R-21-07 | SVGs atrasarem a recuperação | alta | médio | ativos não chegam | limitar escala e usar wordmark tipográfico temporário | publicar raster ampliado | Fábio |
| R-21-08 | Mapa voltar a retroceder | média | alto | `--rota` diminui na ida | marcador monotônico e tira bidirecional | primeiro retrocesso | executor |
| R-21-09 | Otimizar para Awwwards e perder função comercial | alta | crítico | cliente não entende oferta/CTA | teste de cinco perguntas de `success.md` | Fábio reprova piloto | Fábio |
| R-21-10 | Dívida CSS gerar regressões invisíveis | alta | médio | seletor duplicado vence regra nova | consolidar somente módulos tocados | mais de duas correções colaterais | executor |

## Unknown unknowns

- O motivo real da rejeição pode ser tom, texto, fotografia ou posicionamento, não
  apenas movimento.
- Portais das representadas podem ter regras de marca incompatíveis com o tratamento
  monocromático.
- O comportamento em aparelhos reais pode divergir do viewport emulado por causa de
  barra do navegador, taxa de atualização e inércia.
- A abertura obrigatória em todo reload pode cansar Fábio durante a demonstração,
  mesmo com “Pular”.

