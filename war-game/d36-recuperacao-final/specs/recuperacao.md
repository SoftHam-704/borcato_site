# Especificação fechada — D-36

## Invariantes

1. Uma fronteira tem uma superfície dominante, um progresso e um conteúdo real.
2. Camada decorativa não pode ser a única portadora da mensagem.
3. O elemento usado para medir progresso não pode ser transformado pelo próprio
   progresso.
4. Uma cena deve atingir estado assentado antes de iniciar sua saída.
5. Mobile tem composição própria quando a máscara desktop perde legibilidade.
6. Rolagem reversa usa a mesma função e recompõe os mesmos estados.
7. Reduced motion mostra o estado final, sem máscara residual.

## Contrato da abertura

- Manter a sequência de anos e a pausa de 2.000 ms depois de 2026.
- Mostrar um sinal da marca no primeiro quadro útil.
- Desktop pode manter a borda arredondada lateral.
- Em até 900 px, a saída deve revelar o Hero por uma borda de largura total; é
  proibido formar uma janela vertical estreita.
- Hero só começa sua animação interna quando pelo menos 70% dele está descoberto.
- Ao remover a abertura, o Hero já deve estar em seu primeiro estado completo.

## Contrato Estrada → O Nome

- A superfície de O Nome é o painel que cobre Estrada de baixo para cima.
- O rótulo `04 / O nome` e a primeira manifestação de `H.M.` pertencem ao painel.
- Não usar `::after` como segundo chão acima ou abaixo do capítulo.
- A rota precisa estar em 1 e permanecer assim por pelo menos 20% da janela final da
  pista antes da passagem começar.
- O painel cobre 100% da viewport antes de liberar a continuação interna.
- A cor na costura não pode expor `body` ou `main`.

## Contrato Casa → Marcas

- Casa termina no fluxo; não usar margem negativa no ancestral.
- A introdução de Marcas presente na passagem é a mesma instância que permanece no
  começo do capítulo.
- A cortina pode existir como máscara/superfície, mas não pode duplicar texto em
  `aria-hidden`.
- A esteira inicia com deslocamento 0 e conserva isso até a introdução assentar.
- O primeiro card precisa estar inteiro ou deliberadamente enquadrado; cortes
  acidentais nas bordas reprovam.

## Contrato da navegação

- Exatamente um item ativo fora das passagens.
- Durante uma passagem, o ativo muda quando a nova superfície ocupa mais de 55% da
  viewport.
- Se o contraste não for garantido, rótulos textuais somem durante a janela e os
  marcadores permanecem; não exibir dois nomes concorrentes.

## Portão técnico

```text
npx tsc --noEmit
npm run build
git diff --check
portão responsivo em 375, 768, 1024, 1440 e 1920
console sem erros
teste de teclado
prefers-reduced-motion
```

