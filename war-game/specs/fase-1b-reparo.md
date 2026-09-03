# Spec — FASE 1b: o que reprova (peso e colisao)

**Pre-requisito:** F1a concluida e aprovada.
**Toca `src/`?** SIM. **Commite antes de comecar.**
**Duracao estimada:** 1 dia. **Orcamento:** 3 tentativas por item, 5 itens.

---

## Estado medido hoje (a linha de base que voce tem de melhorar)

| Item | Valor | Onde |
|---|---|---|
| Assets totais | **1721 KB** | `.output/public/assets` |
| So fotos jpg | **1165 KB** | idem |
| `fabio-travessia.jpg` (piso da capsula) | **633.930 bytes** | `src/assets/site/fabio-travessia.jpg` |
| Os 5 quadros | **559.244 bytes** somados | `src/assets/site/frames/` |
| Quadro 0 sozinho | **113.103 bytes** | `frames/0.jpg` |
| JS | 395 KB | — |
| CSS | 98 KB | — |

**Alvo: <= 1000 KB no disco.**

---

## Os cinco itens, em ordem

### Item 1 — Trocar o piso da capsula (-619 KB, o maior ganho isolado)

**Hoje:** `HeroTravessia.tsx:9` importa `fabio-travessia.jpg` e o usa em `:189-196` como
`.capsula__base`, com `fetchPriority="high"`. O canvas da `FotoViva` **ja baixa o quadro 0**
(`FotoViva.tsx:86-102`) e cobre o piso quando os cinco carregam (`FotoViva.tsx:97`).

Ou seja: **a mesma pessoa e baixada duas vezes.**

**Fazer:** o piso passa a ser `frames/0.jpg`.
**Manter:** `fetchPriority="high"`, `width`, `height`, e o `alt` atual (ele carrega o texto
alternativo real, `HeroTravessia.tsx:193`).
**Conferir:** `grep -rn "fabio-travessia" src/` — se restar import, o arquivo continua no
bundle mesmo invisivel (R-26).

**Se aparecer um pulo** no instante em que o canvas assume: **nao devolva os 619 KB.**
Sendo o mesmo arquivo, o pulo so pode vir de dimensao/enquadramento no CSS — corrija la.

### Item 2 — Quadros em WebP (condicional)

**So faca se** a economia medida passar de 150 KB.
**WebP, nao AVIF:** suporte mais antigo, risco menor. **Sempre com fallback.**
Se o canvas ficar vazio em algum navegador, reverta: 300 KB nao valem uma capsula em branco.

### Item 3 — Colisao nav x carrossel

**Confirmado:** `.cap-nav` tem `z-index: 40` (`styles.css:846`), `.marcas` tem `z-index: 2`
(`styles.css:1215`). A nav passa por cima do carrossel.

**Escolha UM conserto. Nunca os dois** (R-25):
- (a) o trilho das marcas comeca depois da goteira — note que `.marcas` **ja tem**
  `padding-left: var(--br-goteira)` (`styles.css:1217`), mas o `.marcas__trilho` que rola
  (`styles.css:1991`) e quem atravessa; ou
- (b) a nav ganha fundo solido no desktop.

**Proibido mexer em `--br-goteira`** (`styles.css:650`): ele resolveu 8 de 16 casos de
colisao e mexer nele reabre todos (R-21).

**Conferir depois:** as 11 marcas continuam na primeira tela em 1024/1280/1440/1920 — e
promessa registrada (`qg/clientes/borcato.md:166`).

### Item 4 — A cabeca cortada no mobile

**O diagnostico do levantamento esta incompleto.** O conserto que ele propoe
(`object-position` no topo) **ja esta aplicado** em `styles.css:814` — e nao resolve,
porque quem pinta a capsula depois que os quadros carregam e o **canvas**, e
`FotoViva.tsx:45-48` faz o proprio "cover" **centralizado**, sem ancoragem:

```
const escala = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
```

O `(ch - h) / 2` e o corte simetrico que come o alto da cabeca quando o `aspect-ratio` vira
`4/3` no mobile (`styles.css:810`).

**Fazer:** dar ao desenho a mesma ancoragem que o CSS ja usa — deslocar verticalmente por
um fator (equivalente ao `22%`) em vez de centralizar, **so quando a proporcao exigir**.
Escreva o porque no comentario, em portugues, com o numero medido (regra dura 8).

**Medir:** folga >= 24px acima do topo da cabeca em 375 e 430.

### Item 5 — Barra de capitulos cobrindo o trilho dos 12 estados

No mobile a `.cap-nav` vira barra em `bottom: 0` (`styles.css:925-938`) e **nada reserva a
altura dela**. Compare com a solucao ja existente e aprovada para a barra de marcas: o hero
mede a altura real e escreve `--alt-marcas` (`HeroTravessia.tsx:33-44`), e o padding do
hero desconta esse valor (`styles.css:668-669`).

**Fazer:** o mesmo padrao para a barra de capitulos. **Nao chute valor fixo** — a lição
registrada e que a altura muda com a largura.

**Lembrete:** padding **soma**, nao reserva (regra dura). Faca a conta antes.

---

## Criterios de saida

- [ ] assets <= **1000 KB** em `.output/public/assets` (`prova_peso.py`)
- [ ] colisao nav x carrossel = 0 em 1024/1280/1440/1920 (`prova_colisao.py`)
- [ ] cabeca inteira com folga >= 24px em 375 e 430
- [ ] trilho dos 12 estados visivel acima da barra em 375/430
- [ ] as 11 marcas na 1a tela em 1024/1280/1440/1920
- [ ] `prova_goteira.py` continua 16/16 limpo
- [ ] G2, G3, G4, G6 mantidos (`vistoria_borcato.py`, `tsc`, `vite build`)
- [ ] `git status` sem arquivo esquecido

## Criterio de aborto

Apos **3** tentativas, se o peso nao cair abaixo de 1100 KB: **PARE**. O problema deixou de
ser o piso duplicado e virou escopo (quantos quadros a foto viva tem) — e escopo e decisao
humana.

## Ao terminar

Relatorio em `outputs/fases/f1b-relatorio.md` com o antes/depois de cada numero, capturas
em 375/768/1440, e o pacote para o Fable jurado (secao 6 do `WAR-GAME.md`).

```
Nao implemente ainda. Nao replaneje do zero.
Atualize ledger e README. Pare ao final da fase.
```
