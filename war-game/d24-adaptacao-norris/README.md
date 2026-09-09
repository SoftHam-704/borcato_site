# D-24 — padrões narrativos observados no site de Lando Norris

## Referência observada

- O site é uma experiência editorial em Webflow, com Lenis, JavaScript de cena
  próprio e jQuery carregado pela plataforma. Isso é uma leitura aparente do
  documento entregue ao navegador; não implica acesso nem reaproveitamento de
  código.
- A navegação é mínima e persistente: marca, loja e menu; a home é uma sequência
  de cenas, não uma coleção de cards.
- A primeira dobra combina uma afirmação curta, um dado de contexto e uma imagem
  dominante. Depois alterna fundos claros/escuros, fotografia em escala variável,
  grandes vazios editoriais e composições de borda a borda.
- Cada passagem tem um gesto próprio: painel, imagem que toma o quadro, grade
  editorial ou mudança de superfície. O site evita repetir o mesmo reveal em
  todas as seções.
- A tipografia combina grotesca para informação e uma voz display serifada para
  títulos. As animações mascaram palavras e linhas; não usam fades genéricos
  como único recurso.

## Tradução para H.M. Borçato

- Manter azul, Archivo, mapa, narrativa de representação e as quatro cenas da
  empresa. Não reproduzir verde-limão, assinatura, fotos, textos, rotas, marca,
  estrutura de páginas ou código da referência.
- Marcas recebe uma malha de desenho técnico própria, ligada a catálogo e peça,
  em vez de curvas topográficas da referência.
- Casa entra da esquerda, Marcas do chão, Estrada da direita. A diferença está
  no movimento e na composição, não em trocar conteúdo ou acrescentar efeitos.
- A navegação de capítulos existente continua sendo o mapa de uma página única.

## Verificação

- A malha técnica fica restrita à prancha de Marcas, atrás dos cartões e sem
  interceptar links ou a régua de progresso.
- As variações de entrada respeitam `prefers-reduced-motion`: o estado final
  remove os transforms específicos de Casa e Estrada.
