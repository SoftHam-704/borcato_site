# Especificação fechada para a recuperação

## Fronteira

Esta spec autoriza, depois do gate D-21, apenas um piloto da opção aprovada. Ela não
autoriza publicação, troca de conteúdo factual nem propagação para todas as cenas.

## Arquitetura editorial desejada

1. **Hero — reputação e contato.** Retrato, promessa aprovada, cobertura e CTA.
2. **A Casa — origem e modo de trabalhar.** História curta, quatro marcos e retrato.
3. **As Marcas — amplitude.** Todas as onze aparecem uma vez em uma prancha curta.
4. **O que vai à estrada — categorias.** De três a cinco peças representativas,
   escolhidas por variedade, sem repetir onze marcas.
5. **A Estrada — cobertura.** Mapa inteiro, rota monotônica e conclusão textual.
6. **O Nome — significado e conversa.** H.M., Fábio de frente, CTA e contatos.

## Três pilotos obrigatórios

### P-21A — navegação e entrada de marcas

- Criar um destino estável que mostre kicker, manchete, guia e início da prancha.
- A prancha não pode ter progredido ao chegar pela âncora.
- Na rolagem normal, A Casa fica legível e o novo plano cobre a cena antes do
  deslocamento horizontal.
- Orçamento: duas tentativas.

### P-21B — prancha editada

- Todas as representadas aparecem uma vez.
- A composição usa a altura inteira, sem vazio superior acima de 30% da viewport por
  mais de 300 px de rolagem.
- A cena inteira consome no máximo 2,5 viewports em desktop.
- Mobile usa snap, indicação “arraste” e contador; não depende de hover.
- Orçamento: duas tentativas.

### P-21C — peça para território

- A última peça sai enquanto a silhueta inteira de Minas já está legível.
- O mapa permanece inteiro enquanto `--rota` progride de 0 a 1.
- A volta é espelhada e nunca deixa rota/peça em estado contraditório.
- Orçamento: duas tentativas. Se falhar, substituir coexistência por corte editorial
  deliberado; não criar quarto relógio implícito.

## Contratos

- Um relógio por gesto e um dono explícito para cada propriedade de progresso.
- Destinos de navegação não podem ser elementos transformados pelo próprio scrub.
- Conteúdo móvel reserva a altura real da navegação fixa.
- Estados reduzidos removem deslocamento e mantêm todo conteúdo e controle disponíveis.
- Nenhuma mudança de texto comercial sem registro no ledger.
- Nenhum logo raster ampliado além de 1,25× da largura natural.

## Testes de aceite

- Tiras em 1440 × 900, 1024 × 768, 430 × 932 e 375 × 812.
- Ida, volta, clique de capítulo, CTA, teclado, toque e reduced motion.
- `npm run build`, `npm run lint` e console limpos.
- Comparativo antes/depois com altura total, altura de marcas, quadro da âncora e
  janela completa do mapa.
- Gate humano com o cliente sobre uma gravação de 60 a 90 segundos do piloto.

