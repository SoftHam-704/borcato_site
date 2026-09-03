# War Game — H.M. Borcato

**Estado: METADE 1 concluida (planejamento). Nada foi implementado.**
Escrito em 2026-09-03 sobre o commit `b981df1`. Modelo: Opus, esforco alto.

---

## O que e isto

O plano de como levar o site do Borcato de "Mencao Honrosa, se o juri estiver generoso"
para o podio — **simulando antes como cada fase pode falhar**, para que um executor mais
barato rode fase a fase com menos erro e menos loop.

A frase-ancora do metodo:
> **Nao execute ainda. Primeiro simule como este projeto pode falhar.**

---

## Como usar

| Se voce e... | Leia |
|---|---|
| o **dono**, decidindo | este README ate o fim, depois `ledger.md` secao A (as 12 decisoes) |
| o **executor** de uma fase | `WAR-GAME.md` secao 1 (o que nao se toca) e `specs/fase-N.md`. **So isso.** |
| o **jurado** de fim de fase | `WAR-GAME.md` secao 6 |
| quem **auditar** o plano | `risks/tabela-mestra.md` e `success.md` |

**Ordem de leitura na primeira vez:** README -> `success.md` -> `ledger.md` -> `WAR-GAME.md`.

## Estrutura

```
war-game/
  README.md              este arquivo
  success.md             o que e sucesso, medivel, por fase + os 10 portoes G1-G10
  ledger.md              12 decisoes D-*, 8 indefinidos I-*, bloqueios
  WAR-GAME.md            o documento principal: critica do plano + as 7 fases
  risks/tabela-mestra.md 6 familias de risco, 40 riscos, com deteccao e recuperacao
  specs/                 uma spec executavel por fase
  outputs/fases/         relatorio de cada fase (vazio ate a execucao)
  checkpoints/           linha de base das medicoes
  versions/              versoes do plano, sem sobrescrever
```

---

## Resumo executivo

### O que eu li antes de opinar

O levantamento de juri inteiro; os 9 componentes de `src/components/site/`; `index.tsx`,
`__root.tsx`, `dados.ts`; as regioes relevantes dos 2019 linhas de `styles.css`; o build em
`.output/`; as capturas de juri em 1440 e 390; os 4 scripts de teste; o QG (`QG.md`,
`REGRAS-DURAS.md`, `TECNICAS.md`, `CATALOGO.md`, `clientes/borcato.md`); o INDICE da
biblioteca comprada; a direcao de arte do video e os icones em raster.

### As cinco correcoes que este war game faz no plano de 7 fases

1. **A ordem muda: F3 (mapa) antes de F2 (materia).** A F2 depende de aprovacao do cliente
   e a F3 nao; a F3 e a cena que se lembra; e o mapa ocupa exatamente o vao por onde a
   estrada desce hoje (`Estrada.tsx:40`), entao fazer a materia antes obriga a refazer
   enquadramento depois.
2. **A F1 vira F1a (instrumento) + F1b (reparo).** O portao de testes de hoje **nao emula
   toque** — `vistoria_borcato.py:73` e os tres `prova_*.py` usam so `viewport=`. Consertar
   o site antes do instrumento e consertar no escuro.
3. **Um dos quatro bugs do achado 5 provavelmente nao existe.** `Cursor.tsx:17` **ja testa**
   `(pointer: fine)`. O anel que aparece na captura de 390px e artefato do Playwright sem
   `has_touch`. E a cabeca cortada tem **outra causa** que a diagnosticada: quem corta e o
   canvas (`FotoViva.tsx:45-48`), nao o CSS — o `object-position` proposto **ja esta
   aplicado** em `styles.css:814` e nao resolve.
4. **Parte da F5 pertence a F2.** "A peca presa ao cursor sobre cada marca" esta nas duas
   fases. Mesmo trabalho, mesmas imagens: fazer duas vezes e loop.
5. **A F4 vira opcional e desce para o fim.** E a unica fase que substitui peca aprovada,
   trava em terceiro sem prazo, parte de um raster de 400px ja upscalado, e nao resolve a
   queixa que a originou (o tempo de 3,4 s — que e a decisao D-07, de uma linha).

### Ordem recomendada

```
F1a instrumento -> F1b reparo -> F3 mapa -> F2 materia -> F5 micro -> F6 historia -> F7 portoes
                                                   F4: opcional, so com vetor, depois da F6
```

Sem os bloqueios de terceiro: **9,5 a 10,5 dias**.

---

## A avaliacao honesta: 8,3 e alcancavel?

**Com este plano, o site chega ao patamar de Site of the Day. Podio do dia (8,3) e
possivel, mas nao provavel — e por tres razoes que nao sao de execucao:**

1. **A nota nao tem calibragem externa** (R-01/D-02). 6,8 e 8,3 sao autoavaliacao de um
   agente lendo o proprio site. Perseguir um numero que so existe aqui dentro e o tipo de
   meta que sempre se cumpre no papel. **Recomendo trocar a meta pelas provas P1/P2/P3 do
   `success.md`** — elas medem a mesma coisa e nao mentem.
2. **Podio se ganha com UMA coisa que ninguem viu, nao com nove reparos.** O plano e
   solido no reparo e tem **um** candidato a assinatura: a estrada que vira rota (F3). Ele
   compete com a foto viva, que ja e boa. **Se a F3 sair meia-boca, nao ha segunda bala** —
   e por isso ela subiu na ordem.
3. **O teto real nao esta em Design: esta em Conteudo** (5,8, peso 10%) **e depende de uma
   conversa de 20 minutos** que ainda nao aconteceu. Nenhuma imagem gerada substitui o
   Fabio dizendo por que saiu do escritorio onde era gerente.

### O ponto de maior risco (se eu so pudesse apontar um)

**Nao e nenhuma das sete fases: e o deploy.**

Medido: `.output/public/` **nao tem `index.html`**; o build produz um servidor de 1,1 MB
com `wrangler.json`, e a casa publica por FTP no cPanel. **Hoje nao existe caminho de
publicacao para este site.** Awwwards julga o site no ar, em dominio proprio. Se isso nao
for resolvido, **as sete fases valem zero** — e e o unico item da lista que nao melhora com
esforco tecnico, so com decisao.

O segundo, com folga: **a foto do Fabio e gerada por IA**, e o bordado dela diz
**"Comarcial"**. Se um jurado perceber, o custo supera qualquer ganho de nota. Isso nao
aparece em nenhum dos nove achados do levantamento.

---

## Recomendacao final — a proxima acao HUMANA

**Nada comeca antes destas quatro coisas, nesta ordem:**

### 1. Decidir D-01 (deploy) — antes de qualquer fase
Este site publica por FTP no cPanel como o resto da casa, ou abre excecao?
Se for FTP: alguem tem de confirmar que **prerender da rota unica** e caminho viavel neste
preset do Lovable. **Recomendo (a): prerender.**

### 2. Aprovar ou recusar D-05 (a ordem das fases)
`Aprovo D-05 conforme recomendacao: F1a, F1b, F3, F2, F5, F6, F7, com F4 opcional.
Registre no ledger. Nao implemente ainda.`

### 3. Mandar os dois pedidos ao Fabio HOJE
O logo em vetor e o agendamento dos 20 minutos. Eles nao travam o caminho critico ate a F6
**de proposito** — mas quanto mais cedo saem, mais cedo a F6 deixa de ser F6-minima.
Aproveitar a mesma mensagem para D-03 (o que Meca Brazil, Auto America, Mundial Prime,
Sintech e VP fornecem) e para I-05 (existe alguma foto real da estrada?).

### 4. Decidir D-06 (o bordado "Comarcial")
Custa pouco e e o risco mais subestimado do projeto.

**Depois disso — e so depois — liberar a F1a**, que e a unica fase que nao toca em `src/` e
pode comecar assim que D-05 estiver decidido.

**Comando de inicio para o executor:**
> "Leia o `WAR-GAME.md` completo e o `specs/fase-1a-instrumento.md`. Nao replaneje. Execute
> somente a Fase 1a. Nao avance sem autorizacao. Se encontrar falha, consulte
> `risks/tabela-mestra.md` antes de improvisar. Pare ao final e entregue relatorio curto."
