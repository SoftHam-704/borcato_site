# Spec — FASE 3: a estrada vira mapa (a cena-pico)

**Pre-requisito:** F1b aprovada · **D-04** (que mapa) e **D-05** (ordem) aprovados.
**Toca `src/`?** SIM — cria componente novo e estende `Estrada.tsx`. **Commite antes.**
**Duracao estimada:** 2 dias. **Orcamento:** 4 tentativas de geometria, 3 de progresso.

---

## O problema, com a prova

O capitulo 03 se chama "A estrada" e e a secao mais parada do site: um `MG` grande e uma
lista de 11 siglas (`src/routes/index.tsx:119-132`). A linha que atravessa a pagina passa
**pela margem direita, sem tocar em nada** — a rota poe o ponto do `cap-estrada` em
`0.86` da largura (`Estrada.tsx:40`), no vao livre.

Visivel na captura `juri/06-estrada.png`: a curva desce pela direita, a lista fica a
esquerda, e as duas coisas nunca se encontram.

---

## O que construir

A linha que ja vem descendo **pousa** num contorno do Brasil e vira rota: sai de MG e
percorre os 11 estados conforme se rola, acendendo cada sigla ao chegar.

### A decisao de arquitetura que evita o defeito principal

**NAO crie um segundo `path`.** Se houver dois — a estrada global, cujo progresso vai de 0
a 1 na pagina inteira (`Estrada.tsx:139`), e uma rota local do capitulo 03 — eles terao
progressos diferentes e **a emenda ficara visivel**. Esse e o risco R-43 e ele e o modo de
falha numero 1 desta fase.

**A saida e um `path` so.** A `Estrada` ja monta a curva a partir das posicoes reais das
secoes (`Estrada.tsx:62-126`): hoje sao 4 pontos de capitulo mais 2 de entrada/saida. O
ponto do `cap-estrada` vira a **entrada do mapa**, e os 11 estados viram **pontos
adicionais da mesma spline Catmull-Rom**. A emenda deixa de existir por construcao, em vez
de ser disfarcada.

Consequencia pratica: o `ROTA` de `Estrada.tsx:32-44` deixa de ser um numero por capitulo e
passa a poder devolver **uma lista de pontos** para o capitulo 03. Mantenha a assinatura do
resto intacta.

### As regras que a `Estrada` ja pagou e que continuam valendo

Estao escritas nos comentarios do proprio arquivo. Nao as reaprenda:

1. **LINEAR, nunca `ease()`** (`Estrada.tsx:14-16`). Um ease faz a ponta correr 1,5x o dedo
   e o cliente percebe.
2. **O path nasce das posicoes REAIS** (`Estrada.tsx:18-22`). A altura da pagina muda 17%
   entre 375 e 1440.
3. **Nao atravessar conteudo denso** (`Estrada.tsx:26-31`). A primeira rota morreu em cima
   da grade das marcas.
4. `document.fonts.ready` ja dispara remontagem (`Estrada.tsx:159`) — as fontes mudam a
   altura dos capitulos.

### Os limites duros

| Limite | Valor | Por que |
|---|---|---|
| Geometria do mapa | **<= 40 KB gzip** | e simbolo, nao cartografia (D-04) |
| Posicao relativa dos 12 estados | **correta** | errar a ordem geografica e o unico erro que este publico detecta |
| Precisao do contorno | **estilizada, declarada** | imprecisao de estilo e direcao; imprecisao acidental e erro |
| reduced-motion | rota completa, siglas acesas | e o que `Estrada.tsx:123` ja faz para a linha |
| Mobile (< 900px) | **decisao obrigatoria** | a estrada nao existe la (`Estrada.tsx:59-65`) |

### O item de escopo que o levantamento nao previu

Abaixo de 900px a estrada e desligada, porque 62 de 121 amostras caiam sobre o texto
(medido, `Estrada.tsx:56-59`). Se o mapa herdar isso, **o capitulo 03 continua parado no
celular** — e nao se sabe se o publico real e desktop (R-05).

Voce tem de **entregar uma das duas coisas**, nunca nenhuma:
- (a) uma versao mobile da cena (ex.: o mapa como bloco proprio, sem a linha de fundo), ou
- (b) uma decisao registrada no ledger de que nao ha, com a justificativa por escrito.

---

## Como saber que ficou bom (e nao so pronto)

Alem dos numeros, dois testes de espirito:

1. **Nao pode parecer mapa de calor.** Contorno mais pontinhos acendendo e o grafico de
   "cobertura nacional" de todo site B2B. O que salva e ser **rota percorrida**: existe uma
   ponta que anda, e o que ficou para tras esta aceso.
2. **A prova P1** (`success.md`): alguem que rolou o site descreve esta cena sem reabrir.

---

## Criterios de saida

- [ ] a rota parte de MG e toca os 11 na ordem, acendendo a sigla ao chegar
- [ ] geometria <= 40 KB gzip
- [ ] **zero emenda visivel** entre a estrada e a rota, em 1024/1440/1920
- [ ] reduced-motion mostra rota completa e siglas acesas
- [ ] mobile: versao entregue OU decisao registrada
- [ ] `prova_estrada.py` continua limpo em todas as larguras
- [ ] `prova_jank.py`: mediana de quadro na rolagem do cap. 03 nao piora mais de 15%
- [ ] G1-G10 mantidos

## Criterios de aborto

- Apos **2** tentativas com emenda ainda visivel: **PARE**. A arquitetura de um-path-so nao
  esta valendo, e a alternativa e decisao arquitetural humana.
- Se a geometria nao couber em 40 KB sem virar borrao: **PARE** e leve as duas opcoes ao
  humano (simplificar mais, ou aceitar peso maior).

## Ao terminar

Relatorio em `outputs/fases/f3-relatorio.md`, capturas antes/depois em 375/768/1440, e o
pacote para o Fable jurado.

```
Nao implemente ainda. Nao replaneje do zero.
Atualize ledger e README. Pare ao final da fase.
```
