# Régua de sucesso

- A foto do hero é a primeira parte revelada pela abertura; o texto só começa
  quando a passagem já está perceptível.
- A abertura nunca é removida antes de terminar sua transição CSS.
- No desktop, o quadro final de “A casa” permanece visualmente estável enquanto
  “As marcas” sobe como um painel completo.
- A viagem horizontal só começa depois de o painel ocupar a viewport.
- Manchete, corpo e marcos de “A casa” entram pela própria posição na tela, não
  pelo topo da seção.
- Em 375 px não há pin vertical nem bloqueio do carrossel horizontal nativo.
- `prefers-reduced-motion` elimina deslocamentos e mantém todo o conteúdo visível.

NÃOs: não alterar logos, copy, mapa, palco de peças ou os demais capítulos; não
criar um segundo relógio para o mesmo elemento; não aprovar apenas por DOM.

