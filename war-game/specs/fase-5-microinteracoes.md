# Spec — FASE 5: micro-interacoes

**Pre-requisito:** F2 aprovada.
**Toca `src/`?** SIM. **Commite antes.**
**Duracao estimada:** 1 dia. **Orcamento:** 2 tentativas por item.

---

## O problema

O cursor e um circulo que nao reage. O CTA nao atrai. A nav nao antecipa. O site responde
ao scroll, nunca ao visitante.

## O que ja existe (e economiza metade do trabalho)

`Cursor.tsx:39-43` **ja procura** o ancestral mais proximo que seja `a`, `button` ou
`[data-cursor]`, e `Cursor.tsx:81` **ja renderiza** o rotulo lido de `dataset.cursor`.
**O mecanismo esta pronto; faltam os alvos.**

E `Cursor.tsx:17-20` ja desliga tudo fora de `(pointer: fine)` e em reduced-motion.
**Nao reescreva o `Cursor`.**

---

## Os tres itens

### 1. Rotulo de cursor por capitulo e por marca (barato, alto retorno)
Popular `data-cursor` nos alvos: cada `<Capitulo>` e cada botao de marca em
`BarraMarcas.tsx`. Texto curto, na voz do site.

### 2. CTA magnetico (o item com armadilha)

**A armadilha, com a prova:** `.btn-falar` ja tem
`transition: transform 0.4s ...` (`styles.css:1557`) e um `:hover` que translada
(`styles.css:1579`). Se o JS escrever `style.transform` inline, os dois brigam — e a saida
errada, ja documentada no arsenal da casa, e animar `margin-top`, que e propriedade de
**layout**, recalculada a cada quadro.

**A regra da casa, sem excecao:** o JS escreve as **pecas** em custom properties, o CSS
**compoe**:

```
transform: translate(var(--btn-ima-x, 0px), var(--btn-ima-y, 0px)) ...
```

com `@property` declarado — o arquivo ja usa esse padrao em `styles.css:1419-1431` e
`1935-1937`. Siga o formato que ja esta la.

**Guardas obrigatorias:** so em `(pointer: fine)`; desligado em reduced-motion; o rAF para
quando `document.visibilityState !== "visible"`.

### 3. Miniatura na nav
Teto de **20 KB somados**. Carregar sob demanda, nunca no primeiro paint. Se nao couber no
teto, **corte a miniatura** — e o item de menor valor dos tres.

---

## Criterios de saida

- [ ] rotulo em todos os capitulos e em todas as marcas
- [ ] CTA magnetico so em `(pointer:fine)`, desligado em reduced-motion, rAF com guarda de
      visibilidade
- [ ] nenhum `style.transform` inline no `.btn-falar`
- [ ] miniaturas <= 20 KB somados
- [ ] `vistoria_borcato.py`: alvo tatil do CTA continua >= 44px
- [ ] G1-G10 mantidos

## Criterio de aborto

Se o magnetismo brigar com o `:hover` depois de **2** tentativas: **corte o magnetismo** e
entregue o resto. Insistir nele e o loop que este metodo existe para evitar.

## Ao terminar

```
Nao implemente ainda. Nao replaneje do zero.
Atualize ledger e README. Pare ao final da fase.
```
