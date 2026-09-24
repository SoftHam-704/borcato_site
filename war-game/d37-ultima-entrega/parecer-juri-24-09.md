# Parecer de júri — H.M. Borçato (24/09/2026)

> Julgado no **build de produção** (`.output/public` servido como arquivo estático, como o
> cPanel vai servir), a 1440 e 375 px, com a travessia inteira capturada em quadros.
> Base: `6988036`. Nada foi alterado no código.

## Nota — cinco critérios Awwwards

| Critério | Nota | Por quê |
|---|---|---|
| Design | 7,5 | Hero forte: foto real do Fábio, manchete em três pesos, jornada tonal do preto ao azul. |
| Usabilidade | 6,5 | 8,2 s de abertura; 13,1 telas de página; um quadro de passagem quase vazio. |
| Criatividade | 7,5 | Palco de peças, mapa com rota sincronizada, FotoViva e cortina das marcas são próprios. |
| Conteúdo | 7,5 | Fatos verificáveis, sem número inventado. Fábio aparece em três retratos. |
| Developer | 6,5 | Zero erro de JS, zero 404, prerender limpo. Sem `og:image`, sem canonical, lint em dívida. |

**Média ≈ 7,1.** Honorable Mention é plausível hoje. SOTD pede os itens abaixo.

## O que já está no nível

- O hero corrigido: "CONHECE / O NOME." sem órfão, "NOME" legível sobre a marca-d'água.
- O palco de peças com uma peça por gesto (F6) e o mapa com rota monotônica.
- A foto real do Fábio. É o ativo que o RED INFORTEC não tem — e o que mais separa este site
  de um template.

## O que reprova, visto nos quadros

### J1 — Quadro vazio na entrada da Estrada (P0)
A 1440 × 900, em y ≈ 7250, o quadro mostra só o rótulo "03 / A ESTRADA" e uma lasca do mapa
na borda inferior — cerca de 90% da tela é fundo. A auditoria F4 registrou "não foi observada
área vazia" nesta costura; a captura desmente. É o tipo de defeito que a régua D-37 lista como
reprovação ("nenhuma costura cria painel vazio").

### J2 — "O Nome": o parágrafo pisa nas letras H.M. (P0)
Em y ≈ 10150 o texto "O nome da empresa é uma homenagem…" fica sobre a base das letras gigantes,
e o "H" aparece apagado enquanto o "M." está aceso. O capítulo que conta de onde vem o nome é
justamente onde a leitura fica mais difícil.

### J3 — Sem cartão de compartilhamento (P2, mas barato)
Sem `og:image`, `og:url` e `link rel=canonical`. O Fábio vai mandar este link por WhatsApp; ele
chega sem imagem. O RED já tem a receita (1200 × 630, ≤ 150 KB).

### J4 — Três retratos do Fábio
Hero, A Casa e o fecho usam três retratos diferentes — e na passagem Hero → Casa dois deles
aparecem no mesmo quadro. Três vezes o mesmo rosto diluem o que um só faria. **Decisão do dono**,
não do executor: recomendo manter o hero e o fecho, e dar à Casa outra imagem (o FotoViva, a
bancada, um detalhe das mãos).

### J5 — 13,1 telas
A calibração F6 corrigiu a sensibilidade do palco (22vh → 45vh por ato) e com isso a página
voltou a crescer — era 11,2 depois da D-14. A troca foi correta; o custo precisa ser pago
em outro lugar (ver J1: a entrada da Estrada tem uma tela de fundo que pode sair).

### J6 — A abertura
8,2 s visíveis medidos no build. Para um jurado é caro. **Mas é decisão fechada do dono**
(pausa de 2 s após 2026, e no RED ele reprovou a abertura curta). Não mexer. Só confirmar que
"Pular" é visível desde o primeiro quadro.

## Lote proposto (aguarda aprovação do dono)

| # | Tarefa | Aceite | Não pode mudar |
|---|---|---|---|
| L1 | Fechar o vazio da entrada da Estrada (J1) | Nenhum quadro, a cada 150 px de rolagem, com mais de 60% de tela sem conteúdo, ida e volta, a 1440 e 375 | relógio do mapa, rota monotônica, pausa |
| L2 | "O Nome" legível (J2) | parágrafo sem sobrepor as letras em nenhum instante da cena; contraste ≥ 4,5:1 | a cena H.M. e a cortina azul |
| L3 | `og:image` + `og:url` + canonical (J3) | metas na resposta do servidor; imagem 1200 × 630 ≤ 150 KB | título e descrição atuais |
| L4 | Retrato da Casa (J4) | **só depois da decisão do dono** | hero e fecho |

A abertura (J6) e a altura total (J5) não entram no lote: a primeira é decisão fechada, a
segunda cai como consequência do L1.

## Continua pendente, como já estava na D-37

Copy e contatos aprovados pelo Fábio · logotipos oficiais em SVG · teste em aparelho real ·
publicação (o domínio `hmborcato.com.br` ainda serve o site antigo).
