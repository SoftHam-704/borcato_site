# Especificação fechada do piloto

## Estrutura

- Preservar `.nome` e `.nome__homenagem`.
- Transformar `.fecho` em cena de pelo menos `100svh` com duas camadas:
  `fecho__retrato` e `fecho__conteudo`.
- Reutilizar `src/assets/site/fabio-escuro.jpg`; não criar cópia nem imagem derivada.
- Desktop: retrato central/inferior, ocupando 45–62% da largura; contatos em coluna lateral.
- Mobile: retrato primeiro, chamada e WhatsApp logo abaixo; demais vias continuam acessíveis.

## Movimento

- Progresso único do próprio fecho, derivado de sua posição no viewport.
- 0–35%: retrato sobe e assenta; texto ainda oculto.
- 35–65%: chamada revela linha por linha com máscara vertical.
- 60–85%: vias entram com defasagem curta.
- 85–100%: assinatura e estado final.
- Volta deve reproduzir a sequência ao contrário, sem estado preso.

## Invariantes

- JS escreve apenas progresso/custom properties; CSS compõe transformações.
- Não adicionar biblioteca.
- Não tocar em hero, capítulos 01–03, dados ou contatos.
- Não alterar a fotografia.
- A chamada continua `Fale com quem roda a estrada.` até decisão textual explícita.
- WhatsApp usa a mesma fonte de dados do hero.

## Provas

- Capturas 1440×900 e 375×812 nos progressos aproximados 0, 0,5 e 1.
- Volta do progresso 1 para 0.
- Teclado: foco visível nas três vias.
- `prefers-reduced-motion` com composição final estática.
- `tsc`, build, portão responsivo e zero erros de console.

