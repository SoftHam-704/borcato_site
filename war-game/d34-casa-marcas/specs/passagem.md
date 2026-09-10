# Especificação fechada

- Em telas `min-width: 901px`, `.passagem-casa-marcas > .cap--casa` é `position: relative`.
- Em telas `min-width: 901px`, `.passagem-casa-marcas > .cap--marcas` usa `margin-top: 0`.
- `.cortina-marcas` permanece `position: fixed` e mede somente `#cap-marcas`.
- Não adicionar `transform`, `overflow` ou novo marcador de progresso ao ancestral da passagem.
- Aceite: em `scrollY` 1708, 1959 e 2295 (viewport 916), `top(marcas) >= bottom(casa)` no instante medido.
