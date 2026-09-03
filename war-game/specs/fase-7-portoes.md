# Spec — FASE 7: portoes e submissao

**Pre-requisito:** todas as fases anteriores aprovadas · **D-01 (deploy) resolvido**.
**Duracao estimada:** 1 dia.

---

## 1. Os dez portoes (G1-G10 do `success.md`)

Rodar e anexar a **saida crua**, nunca o resumo:

| Portao | Ferramenta |
|---|---|
| G1 peso <= 1000 KB | `prova_peso.py` |
| G2 overflow · G3 alvo 44px · G4 console | `vistoria_borcato.py` (5 larguras) |
| G5 contraste AA | medicao de contraste sobre texto de conteudo |
| G6 build | `tsc` e `vite build` |
| G7 zero numero comercial | leitura linha a linha de `dados.ts` e do texto |
| G8 zero asset de terceiro | inventario de `src/assets/` |
| G9 colisao de camadas | `prova_colisao.py` |
| G10 cursor em toque | `prova_touch.py` |

## 2. Portao anti-cara-de-IA

Da skill `producao-web-premium`. **Se o proprio site violar um item, admitir e corrigir —
nao relativizar** (regra dura 5).

## 3. Fingerprint

Regra do `qg/referencias/CATALOGO.md:51-54`: o build novo tem de diferir de **cada**
anterior em pelo menos **4 de 6** dimensoes — gramatica, nav, hero, forma dos atos,
fechamento, signature move.

**A ressalva honesta que precisa estar escrita:** este site declara cinco emprestimos de
referencia (capsula do lukebaffait.fr; nav de capitulo do Ferrari 26; palavra-fantasma dos
36 e 25; CTA do 25; trilho do 22). O fingerprint compara **build contra build da casa**,
nao contra a referencia — entao ele passa. Mas se o unico argumento de originalidade for
"combinamos cinco referencias", **a fase reprova**. O que carrega assinatura propria e a
foto viva e a estrada que vira rota; documente isso.

## 4. Deploy — o item de maior risco do projeto

**Fato medido:** `.output/public/` **nao contem `index.html`** (so `assets/`,
`favicon.png`, `robots.txt`, `_headers`). O servidor esta em `.output/server/` (1,1 MB),
com `wrangler.json`. **A casa publica por FTP no cPanel** (regra dura 4).

**Sem D-01 resolvido, PARE aqui. Nunca improvisar deploy.**

Quando houver caminho definido, a ordem que funciona (regra dura 4):
1. subir `assets/` primeiro
2. `index.html` **por ultimo** — para nao haver instante apontando para arquivo inexistente
3. so entao remover os bundles antigos que aquele build substituiu

**Envio PONTUAL, nunca espelhado.** O servidor tem `cgi-bin`, `masterfisher`, `repone` e
`manuais`, que **precisam ser preservados** (R-65).

**E publicar so quando o dono pedir** (regra dura 6).

## 5. Video de 30 s para a submissao

## 6. As pendencias que tem de estar fechadas antes de submeter

- [ ] **D-06** — o bordado que diz "Comarcial" (R-03). E a assinatura de que a foto foi
      gerada por IA, e o custo de um jurado perceber supera qualquer ganho de nota
- [ ] **D-09** — os 48 arquivos de `src/components/ui/` que o site nao usa
- [ ] `lang`, skip link e ordem de foco **medidos**, nao presumidos

---

## Criterios de saida

- [ ] G1-G10 verdes nas 5 larguras, com saida crua anexada
- [ ] anti-cara-de-IA sem item violado
- [ ] fingerprint documentado, com o argumento de assinatura propria
- [ ] caminho de deploy **testado em copia**, nunca direto no ar
- [ ] video de 30 s
- [ ] D-06 e D-09 fechados

## Criterio de aborto

Se D-01 nao tiver saida definida: **PARE antes de qualquer publicacao.**

## Ao terminar

```
Nao implemente ainda. Nao replaneje do zero.
Atualize ledger e README. Pare ao final da fase.
```
