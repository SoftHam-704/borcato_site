# Resultado P-21A/B

Data: 08/09/2026  
Decisão executada: D-21, opção A.

## Mudanças

- A navegação do capítulo 02 aponta para uma âncora de layout fora da cena transformada.
- O primeiro quadro reúne manchete e primeira indústria; os cartões ocupam duas alturas.
- A prancha caiu de 6.600 para 3.850 px sem reduzir o número de representadas.
- O cartão editorial redundante do fim da prancha foi removido.
- No celular, a manchete permanece em fluxo e somente os cartões rolam de lado.
- Entraram snap obrigatório, instrução “Arraste” e contador de posição.
- O palco seguinte deixou de enumerar as onze marcas outra vez e apresenta cinco famílias:
  movimento, filtração, iluminação, lubrificação e plásticos automotivos.

## Evidência medida

### 1440 × 900

- clique “02 As marcas”: `--esteira-ato = 0`, `--esteira-x = 0px`;
- manchete: x=0, y=162, 760×294;
- primeiro cartão: x=800, y=186, 300×306;
- prancha: 2.226 px, ou 2,47 viewports;
- palco de categorias: 1.638 px, ou 1,82 viewports;
- página: 9.644 px, ou 10,72 viewports;
- overflow horizontal do documento: 0.

### 375 × 812

- manchete: y=183..396;
- CTA “Ver as peças”: y=363..407;
- “Arraste · 01 / 11”: y=414..430;
- primeiro cartão: y=442..864, com o próximo cartão parcialmente visível;
- nav fixa: y=721..812;
- overflow horizontal do documento: 0;
- mapa continua inteiro ao navegar para “03 A estrada”; nenhuma regra do P-21C foi alterada.

## Pendências mantidas pelo gate

- P-21C continua fechado: peça, mapa e rota pedem uma rodada própria.
- A página ainda excede a meta final de dez viewports em 0,72 viewport.
- O capítulo 02 foi reduzido 39,4%, mas ainda representa 43,1% da página encurtada.
- Os PNGs continuam limitando a nitidez; aguardar os arquivos oficiais em vetor.
- O lint global conserva o débito anterior de formatação/CRLF. O build de produção passa.

## Decisão seguinte

Revisar o piloto em movimento. Se a leitura e a velocidade forem aprovadas, abrir uma
decisão separada para P-21C e para o corte final de até 0,72 viewport. Não propagar
novas transições antes dessa revisão.
