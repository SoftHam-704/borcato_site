# WAR GAME — H.M. Borcato, do 6,8 ao podio

> **Nao execute ainda. Primeiro simule como este projeto pode falhar.**
>
> Documento principal da METADE 1. Escrito em 2026-09-03 sobre o commit `b981df1`.
> Nada aqui foi implementado. Toda afirmacao sobre o sistema cita `arquivo:linha`.

---

## 1. Preambulo — para o executor que chega sem contexto

Voce vai trabalhar num site de **cliente real** (Fabio Luiz Borcato, representacao
comercial de autopecas, Belo Horizonte). O site ja existe, ja funciona e **ja tem partes
aprovadas que nao se toca**. Seu trabalho e acrescentar, nunca refazer.

O que ja esta aprovado e **e proibido "melhorar"**:

| Peca | Onde | Por que nao se toca |
|---|---|---|
| Hero "A DISTANCIA" | `src/components/site/HeroTravessia.tsx` | foi reprovado uma vez e refeito com war game; a versao atual passou |
| Palavra-fantasma | `styles.css:1507-1526` | 3 criterios medidos (contraste, corte pelas 2 bordas, cruzamento) |
| Abertura de 4 tempos | `src/components/site/Abertura.tsx` | substituiu um preloader falso; o dono aprovou o gesto |
| Foto viva (5 quadros em canvas) | `src/components/site/FotoViva.tsx` | validada quadro a quadro; e a unica coisa do site que o juri nao viu em outro lugar |
| Transicoes `clip-path` | `styles.css:1801-1910` | 4 direcoes com significado, mais a costura de luz |
| Carrossel das 11 marcas | `src/components/site/BarraMarcas.tsx` | pedido explicito do dono |
| Estrada (linha Catmull-Rom) | `src/components/site/Estrada.tsx` | 3 licoes pagas estao nos comentarios do arquivo |

**Se voce achar que uma dessas esta errada: registre no ledger e PARE. Nao conserte.**

Duas armadilhas ja pagas neste projeto (`qg/metodo/REGRAS-DURAS.md`):
1. **Regra CSS larga com lista de excecoes mordeu 3 vezes.** Nomeie quem sobe.
2. **Padding nao reserva espaco: ele SOMA.** Faca a conta antes de mexer em altura.

---

## 2. Contexto, objetivo, publico, stack, restricoes

**Contexto.** Site de pagina unica, 4 capitulos, em React 19 + TanStack Start + Vite.
Cliente real e contratado. Mas o objetivo maior nao e o Fabio: o dono da SoftHam tem
carteira de **36 representantes**, e este site e a peca que vende os outros 35.

**Objetivo.** Levar a nota ponderada estimada de 6,8 para 8,3. **Ressalva registrada como
D-02:** essa nota e autoavaliacao de um agente, nao veredito. A regua operacional e
*"um representante que ve isso liga para voce"*, traduzida nas provas P1/P2/P3 do
`success.md`.

**Publico.** Juri do Awwwards · o Fabio · os outros 35 representantes.

**Stack.** React 19 · TanStack Start 1.168 · Vite 8 · Tailwind 4 · Lenis 1.3
(`package.json:38-73`). **GSAP nao esta instalado. three.js nao esta instalado.**
Padrao da casa: o JS escreve as PECAS em custom properties, o CSS compoe
(`HeroTravessia.tsx:22-24`, `styles.css:786-790`). `@property` e obrigatorio para
variavel usada dentro de `calc()` aninhado (`styles.css:1419-1431`).

**Restricoes.** Sem numero de cliente/faturamento/valor · as 11 representadas sao decisao
fechada (`dados.ts:31-38`) · paleta `#005f96` / `#a0d0f0` / `#0a0a0c` / `#d8d8f0` ·
assets originais, nunca de terceiro · deploy FTP no cPanel — **e o build nao gera
`index.html` (D-01)**.

**O que nao pode acontecer.** Quebrar o que funciona · a pagina engordar (hoje **1721 KB**
medidos em `.output/public/assets`) · virar copia de referencia · cara de IA · regredir
acessibilidade.

---

## 3. CRITICA DO PLANO DE 7 FASES — o que muda e por que

O esboco do levantamento e bom, mas tem **cinco problemas** que este war game corrige.

### 3.1 A ordem: F3 deve vir antes de F2

O levantamento poe Materia (F2, +1,6) antes do Mapa (F3, +0,9), pelo tamanho do ganho.
**Discordo, por tres razoes de risco, nao de gosto:**

1. **F2 depende de aprovacao do cliente e F3 nao.** O proprio levantamento lista
   "aprovar as pecas geradas" como pedido ao Fabio. Se ele demorar, a F2 fica com o
   trabalho feito e nao publicavel — e a F3, que nao depende de ninguem, ficou esperando.
2. **F3 e a cena que o juri lembra; F2 e riqueza distribuida.** A prova P1 do `success.md`
   pede *uma cena descrita sem reabrir*. Natureza-morta de rolamento nao vira essa cena.
3. **F3 muda a geometria da pagina; a F2 se ajusta a ela — nao o contrario.** O mapa ocupa
   o vao direito do capitulo 03, que e **exatamente por onde a estrada desce hoje**
   (`Estrada.tsx:32-44`, `"cap-estrada": 0.86`). Fazer a materia primeiro e depois mexer
   na rota significa refazer o enquadramento das pecas.

**Recomendacao: F1a -> F1b -> F3 -> F2 -> F5 -> F6 -> F7.** Fica como **D-05**.

### 3.2 A F1 esta subespecificada, e um dos quatro "bugs" nao existe como descrito

O achado 5 lista quatro bugs. **Li o codigo dos quatro:**

| Bug alegado | Evidencia real | Veredito |
|---|---|---|
| Nav sobre o carrossel | `.cap-nav{z-index:40}` (`styles.css:846`) vs `.marcas{z-index:2}` (`styles.css:1215`) | **CONFIRMADO** |
| Cursor em tela de toque | `Cursor.tsx:17` **ja testa** `(pointer: fine)` e retorna cedo | **PARCIALMENTE FALSO** |
| Capsula corta a cabeca no mobile | `styles.css:814` aplica `object-position: 50% 22%` **so no `<img>` de base**; o canvas da FotoViva faz o proprio cover centralizado (`FotoViva.tsx:45-48`) e **ignora o 22%** | **CONFIRMADO, causa diferente** |
| Barra de capitulos cobre o trilho | `.cap-nav` no mobile e `bottom:0` (`styles.css:925-938`) sem reserva no `.hero-tr` | **CONFIRMADO** |

**O caso do cursor e o achado mais importante desta critica.** O codigo ja se protege.
Mas a captura `juri/m0-hero.png` **mostra o anel do cursor numa viewport de 390px**. As
duas coisas so sao verdadeiras juntas se o **instrumento** estiver mentindo: o Playwright
cria paginas sem `has_touch`, entao `(pointer: fine)` da `true` mesmo em 390px de largura.
Verificado: `vistoria_borcato.py:73` e os tres `prova_*.py` usam so `viewport=`, **nunca
`has_touch` nem `is_mobile`**.

> **Conclusao com evidencia:** o bug do cursor provavelmente **nao existe no celular real**
> — existe no nosso instrumento. Se a F1 "consertar" isso, conserta nada e pode quebrar o
> cursor no desktop. **A F1 tem de corrigir o TESTE primeiro.** E o achado vale para todo
> numero ja medido em contexto de toque.

**E a cabeca cortada tem causa diferente da diagnosticada.** O conserto proposto ("no
mobile a capsula usa `object-position` no topo") **ja esta aplicado** (`styles.css:814`) e
nao resolve, porque quem pinta e o **canvas**. Consertar so o CSS e perseguir o sintoma —
a armadilha ja registrada na regra dura ("quando o mesmo conserto falha tres vezes, o alvo
esta errado, nao o valor").

### 3.3 Os ganhos sao otimistas, e a aritmetica nao fecha

Somando o levantamento: +0,8 +1,6 +0,9 +0,5 +0,6 +0,6 = **+5,0**, sobre 6,8, daria 11,8.
Os ganhos obviamente nao somam na ponderada — mas o documento **nao explica a conversao**,
e isso importa: um executor que trate cada "+X" como meta persegue numero inventado.
**Trate os ganhos como ordenacao de prioridade, jamais como aritmetica.** (D-02.)

### 3.4 Uma fase deve ser dividida, e uma parte de outra deve ser fundida

- **F1 -> F1a (instrumento) + F1b (reparo).** Consertar o portao antes do site. Sem isso,
  todo numero da F1 e suspeito — inclusive o "zero erro de console" que hoje conta a favor.
- **Parte da F5 pertence a F2.** "A peca presa ao cursor sobre cada marca" esta nas DUAS
  fases (F2: *"a peca aparece no cursor ao passar sobre a marca"*; F5: *"a pastilha da
  marca traz a foto da peca presa ao cursor"*). Mesmo trabalho, mesmas imagens. Fazer duas
  vezes e loop garantido.

### 3.5 A armadilha: a Fase 4

**E a fase que eu mais recomendo NAO fazer nesta rodada.** Quatro motivos:

1. Trava em I-01 (logo vetor), que depende de terceiro sem prazo.
2. Ela **substitui uma peca aprovada** (a abertura atual) — e o unico item do plano que
   mexe no que ja passou. Risco de regressao alto para ganho estimado baixo (+0,5).
3. O `marca/_icones_8x.png` que abri e um raster de ~400px **ja upscalado 8x**. Vetorizar
   isso da contorno chapado — e piston/motor/roda em caixinha arredondada e exatamente o
   vocabulario que o portao anti-cara-de-IA condena.
4. O achado 3 reclama que a abertura "segura 3,4 s". Trocar por outra abertura de 3,4 s
   **nao resolve o que ele apontou**. Se o problema e o tempo, a decisao e **D-07** e custa
   uma linha — nao uma fase de dois dias.

**Recomendacao: F4 vira opcional, so se o vetor chegar, e so depois da F6.**

---

## 4. Caminho critico

```
F1a instrumento -> F1b reparo+peso -> F3 mapa -> F2 materia -> F5 micro -> F6 historia -> F7 portoes
  (meio dia)        (1 dia)           (2 dias)   (3-4 dias)    (1 dia)     (1 dia)*       (1 dia)
                                                                              |
                                                        * so depois da conversa de 20 min (I-03)

F4 abertura de icones: OPCIONAL, so com vetor (I-01), depois da F6
```

**Duracao sem os bloqueios de terceiro: 9,5 a 10,5 dias.**
**O caminho critico nao passa pelo Fabio ate a F6 — de proposito.**

---

## 5. As fases

Formato obrigatorio da Secao 8 do prompt-mestre. A spec executavel de cada uma esta em
`specs/fase-N.md`.

---

### FASE 1a — Consertar o instrumento antes de consertar o site

**Objetivo.** Fazer o portao de testes medir o que ele diz que mede.

**O que sera feito.** Acrescentar aos testes: emulacao de toque (`has_touch`,
`is_mobile`), medicao de **peso transferido** por recurso, deteccao de **colisao de
camadas** (sobreposicao entre elemento fixo e conteudo), e medicao **relativa** de tempo
de quadro na rolagem.

**O que NAO sera feito.** Nenhuma mudanca em `src/`. Zero.

**Suposicao otimista.** Os testes novos confirmam 3 dos 4 bugs e derrubam o do cursor; o
executor economiza um dia de conserto inutil.

**Suposicao pessimista.** Os testes revelam bugs que ninguem viu — em 768 e 1024, que a
regra dura ja avisa serem "os mais esquecidos" — e a F1b cresce.

**Acao.** Escrever `prova_touch.py`, `prova_peso.py`, `prova_colisao.py`, `prova_jank.py`;
rodar contra o commit atual; salvar a linha de base em `checkpoints/base-b981df1.json`.

**Reacao possivel.** (i) `has_touch=True` faz o Lenis ou o Cursor lancar erro novo;
(ii) a medicao de peso pelo CDP nao bate com o `ls` do `.output` (cache, compressao);
(iii) a colisao acusa dezenas de falsos positivos porque compara **caixa**, nao tinta.

**Contra-acao.** (i) e resultado valido, nao falha do teste: registrar. (ii) reportar
**duas** medidas — bytes no disco (a verdade do FTP) e bytes transferidos (a verdade do
visitante). (iii) **medir a tinta com `Range.getClientRects()`**, nunca
`getBoundingClientRect()`: a regra dura do QG registra falso positivo de ate -58px, que ja
fez "consertar" duas vezes o que estava certo.

**Modos de falha.** Teste que passa por acidente (nao afirma nada) · teste que so roda na
maquina de quem escreveu · numero absoluto de desempenho tratado como verdade (headless
nao tem GPU).

**Como detectar.** Rodar cada teste novo **contra um defeito plantado**. Se o teste nao
reprova um defeito conhecido, o teste nao serve.

**Como recuperar.** Testes vivem no scratchpad; descartar e reescrever nao custa nada.

**Criterios de saida.**
- [ ] os 4 testes rodam e produzem linha de base salva
- [ ] cada teste validado contra defeito plantado (4/4 reprovaram quando deviam)
- [ ] o veredito sobre o cursor em toque esta escrito, com evidencia

**Criterios de aborto.** Se `has_touch=True` quebrar o carregamento a ponto de nao dar
para medir, PARE: e bug de producao maior que qualquer fase, e vira item de ledger na hora.

**Orcamento de tentativas.** 6 por teste. Ao estourar: entregar os que funcionam e
registrar o que faltou.

---

### FASE 1b — O que reprova: peso e colisao

**Objetivo.** Sair de 1721 KB para **<= 1000 KB** e zerar as colisoes reais.

**O que sera feito.**
1. **-619 KB:** o piso da capsula deixa de ser `fabio-travessia.jpg` (633.930 bytes,
   medido) e passa a ser o quadro 0 (113.103 bytes), que **ja e baixado**
   (`FotoViva.tsx:86-102`). Mexe em `HeroTravessia.tsx:9` e `:189-196`.
2. **Quadros em WebP/AVIF** com fallback — so se a economia medida passar de 150 KB.
3. **Colisao nav x carrossel:** escolher **um** conserto: ou a barra comeca depois da
   goteira, ou a nav ganha fundo. **Nunca os dois.**
4. **Cabeca cortada no mobile:** a correcao e no **canvas** (`FotoViva.tsx:45-48`), nao no
   CSS — ver 3.2.
5. **Barra de capitulos x trilho:** reservar respiro no `.hero-tr` no mobile, pelo mesmo
   padrao que ja mede `--alt-marcas` (`HeroTravessia.tsx:33-44`).

**O que NAO sera feito.** Nao mexer no cursor ate a F1a dizer se ha bug. Nao trocar a foto
do hero. Nao mexer na composicao do hero. **Nao tocar em `--br-goteira`.**

**Suposicao otimista.** Trocar o piso derruba 619 KB e ninguem ve diferenca — o quadro 0 e
a mesma imagem noutra resolucao.

**Suposicao pessimista.** O quadro 0 tem enquadramento ou tratamento diferente do
`fabio-travessia.jpg`, e aparece um "pulo" no instante em que o canvas assume
(`FotoViva.tsx:97`).

**Acao.** Trocar o import; medir; comparar captura antes/depois no mesmo pixel.

**Reacao possivel.** (i) pulo visivel na troca; (ii) o LCP piora por perda de prioridade;
(iii) AVIF nao decodifica em algum navegador e o canvas fica vazio; (iv) o conserto da
colisao empurra as 11 marcas para fora da 1a tela.

**Contra-acao.** (i) o pulo **nao** se resolve devolvendo os 619 KB: sendo o mesmo arquivo,
o pulo so pode vir de dimensao no CSS — corrigir la. (ii) manter `fetchPriority="high"` no
piso novo. (iii) **WebP em vez de AVIF**: suporte mais antigo, economia menor, risco menor;
nunca sem fallback. (iv) medir com `prova_goteira.py` e a promessa das 11 marcas na 1a tela
(`qg/clientes/borcato.md:166`) antes de aceitar o conserto.

**Modos de falha.**
- Trocar o piso e esquecer que `fabio-travessia.jpg` continua importado em outro lugar —
  ele fica no bundle sem aparecer. **Detectar:** `grep -rn "fabio-travessia" src/` e
  conferir o `.output` depois do build.
- Aplicar as **duas** correcoes de colisao: base do hero desequilibrada e a promessa das
  11 marcas na 1a tela quebrada.
- Mexer em `--br-goteira` e reabrir os 8 de 16 casos de colisao ja resolvidos
  (`qg/arsenal/TECNICAS.md`, secao "Nav fixa numa goteira").

**Como recuperar.** `git checkout` do arquivo. Os 5 itens sao independentes: um falhar nao
derruba os outros.

**Criterios de saida.**
- [ ] assets <= **1000 KB** no `.output/public/assets`
- [ ] colisao nav x carrossel = 0 em 1024/1280/1440/1920
- [ ] cabeca inteira em 375 e 430 (>= 24px de folga acima do topo da cabeca)
- [ ] trilho dos 12 estados visivel acima da barra em 375/430
- [ ] as 11 marcas continuam na 1a tela em 1024/1280/1440/1920
- [ ] G2, G3, G4, G6 mantidos

**Criterios de aborto.** Se apos **3** tentativas o peso nao cair abaixo de 1100 KB, PARE:
o problema deixou de ser o piso duplicado e virou escopo (quantos quadros a foto viva tem)
— decisao que a IA nao toma.

**Orcamento de tentativas.** 3 por item, 5 itens.

---

### FASE 3 — A estrada vira mapa (a cena-pico)

> Promovida a primeira fase de conteudo. Justificativa em 3.1. Depende de **D-04** e **D-05**.

**Objetivo.** O capitulo 03 deixa de ser lista e vira a cena que o juri lembra.

**O que sera feito.** A linha que ja desce desde o hero **pousa** num contorno do Brasil e
vira rota: sai de MG e, conforme se rola, percorre os 11 estados, acendendo cada sigla ao
chegar.

**O que NAO sera feito.** Nao substituir a `Estrada` — **estender**. Nao adicionar
biblioteca (sem GSAP, sem three). Nao usar malha cartografica de terceiro sem D-04.

**Suposicao otimista.** O padrao que ja funciona (`stroke-dasharray` esfregado pelo scroll,
`Estrada.tsx:120-141`) se aplica ao trecho do mapa, e o codigo novo e pequeno.

**Suposicao pessimista.** Sao **duas** logicas de progresso — a global, de 0 a 1 na pagina
inteira (`Estrada.tsx:139`), e a local do capitulo 03 — e elas brigam: a global ja consumiu
parte do traco quando a local comeca. **A emenda fica visivel.**

**Acao.** (1) desenhar o contorno; (2) posicionar os 12 pontos de UF; (3) derivar a rota;
(4) ligar o progresso; (5) acender as siglas.

**Reacao possivel.**
- (i) **A emenda entre a estrada global e a rota do mapa nao casa.** Modo de falha n. 1.
- (ii) O SVG fica pesado: contorno detalhado do Brasil, com recortes e ilhas, passa de
  100 KB de `path` sem esforco.
- (iii) O mapa fica **impreciso** e alguem de MG ve que o formato do estado esta errado —
  num site cujo argumento e "conheco o territorio".
- (iv) O capitulo 03 cresce em altura, muda a altura da pagina de que a `Estrada` depende
  (`Estrada.tsx:89, 116-117`) e **desalinha a curva inteira**.
- (v) Jank: mais um leitor de scroll sobre os 7 existentes.

**Contra-acao.**
- (i) **Nao emendar dois `path`. Um `path` so.** A `Estrada` ja monta a curva a partir das
  posicoes reais das secoes (`Estrada.tsx:62-126`): o ponto do `cap-estrada` vira a
  **entrada do mapa**, e os 11 estados viram pontos adicionais da mesma spline. Isso
  **elimina a emenda por construcao**, em vez de disfarcar.
- (ii) Orcamento duro de **40 KB gzip** para a geometria. O mapa e simbolo, nao cartografia
  (D-04).
- (iii) Imprecisao **de estilo declarado** e aceitavel; imprecisao acidental, nao. **A
  posicao relativa dos 12 estados tem de estar certa** — errar a ordem geografica e o unico
  erro que este publico detecta na hora.
- (iv) Apos montar, rodar `prova_estrada.py` (ja existe, testa a curva em varias larguras).
  `document.fonts.ready` ja dispara remontagem (`Estrada.tsx:159`).
- (v) `prova_jank.py` da F1a, comparacao **relativa** antes/depois.

**Modos de falha adicionais.**
- **O mapa vira lugar-comum.** Contorno mais pontinhos piscando e o grafico de "cobertura
  nacional" de todo site B2B. O que salva e ser **rota percorrida**, nao mapa preenchido:
  se em algum momento parecer mapa de calor, a fase falhou no espirito ainda que passe nos
  numeros.
- **Reduced-motion.** Hoje a estrada existe inteira sem depender de rolagem
  (`Estrada.tsx:123`). O mapa precisa da mesma saida: rota completa, siglas acesas.
- **Mobile.** A estrada **nao existe abaixo de 900px** (`Estrada.tsx:59-65`; medido: 62 de
  121 amostras caiam sobre o texto). Logo, ou o mapa ganha versao propria de mobile, ou o
  capitulo 03 continua parado exatamente onde parte do juri vai olhar. **Item de escopo que
  o levantamento nao previu.**

**Como recuperar.** O componente e novo e isolado; remover o import restaura o estado
anterior. Commitar antes de comecar.

**Criterios de saida.**
- [ ] a rota parte de MG e toca os 11 na ordem, acendendo a sigla ao chegar
- [ ] geometria <= 40 KB gzip
- [ ] **zero emenda visivel** entre estrada e rota (1024/1440/1920)
- [ ] reduced-motion mostra rota completa e siglas acesas
- [ ] existe versao mobile, ou decisao registrada de que nao ha, com justificativa
- [ ] mediana de quadro na rolagem do cap. 03 nao piora mais de 15% vs. base
- [ ] G1-G10 mantidos

**Criterios de aborto.** Se apos **2** tentativas a emenda continuar visivel, PARE: a
arquitetura de um-path-so nao esta valendo, e a alternativa (duas linhas assumidas, ou mapa
desacoplado da estrada) e decisao arquitetural — humano decide. Aborte tambem se a
geometria nao couber em 40 KB sem virar borrao.

**Orcamento de tentativas.** 4 de geometria, 3 de sincronizacao de progresso.

---

### FASE 2 — Materia nos capitulos

> A maior fase, a de maior ganho, e a de maior risco de "cara de IA". Depende de **D-03**.

**Objetivo.** Cada capitulo ganha um objeto visual seu, produzido por nos.

**O que sera feito.** 01 A casa: BH ou a estrada ao amanhecer, em duotom azul. 02 As
marcas: as pecas em natureza-morta monocromatica, aparecendo presas ao cursor sobre cada
marca (**inclui o item que o levantamento repetiu na F5**). 03: ja resolvido pela F3.

**O que NAO sera feito.** Nenhuma imagem de terceiro. Nenhuma peca com marca visivel
(seria logo de terceiro em contexto nao autorizado). **Nenhuma peca para as 5 representadas
cujo produto nao sabemos** (`dados.ts:49-53`) — I-02.

**Suposicao otimista.** Um prompt-base bem escrito gera as pecas coerentes na primeira
rodada e o teste de sessao unica passa.

**Suposicao pessimista.** As pecas saem **inconsistentes entre si** — luz de lados
diferentes, pretos diferentes, escalas diferentes — e o conjunto le como banco de imagens
montado, que e a definicao visual de "cara de IA". **Modo de falha n. 1 desta fase, e o
levantamento nao o menciona.**

**Acao.** (1) escrever UM prompt-base com luz, camera, fundo e enquadramento fixos, e so o
objeto variando; (2) gerar; (3) rodar o **teste de sessao unica** (`success.md` 2.4);
(4) tratar em duotom pela paleta; (5) integrar.

**Reacao possivel.**
- (i) 2 ou mais pecas fora de tolerancia -> o prompt-base esta errado, nao as pecas.
- (ii) A peca **nao parece a peca real** — um "rolamento" que nenhum mecanico reconhece. O
  Fabio percebe na hora, e ele e o publico que mais importa aqui.
- (iii) O peso volta a subir: 6 pecas a 60 KB sao mais 360 KB, e a F1b acabou de derrubar 619.
- (iv) A imagem nova **briga com a palavra-fantasma e com a estrada**, que ja ocupam fundo.
  Tres camadas de fundo na mesma tela e ruido.
- (v) O duotom azul sobre tudo faz o site parecer um filtro, nao uma direcao.

**Contra-acao.**
- (i) reescrever o **prompt-base**, nao as pecas. Maximo **2** reescritas (aborto na 3a).
- (ii) **validacao humana antes de integrar**: as pecas vao ao Fabio e ficam em
  `outputs/fases/f2-pecas/`, **fora de `src/`**, ate ele responder.
- (iii) orcamento de peso **fechado**: a F2 tem direito a **no maximo 250 KB** somados. Se
  nao couber, corta-se numero de pecas — nunca a qualidade de cada uma.
- (iv) **uma camada de fundo por tela.** Onde a peca aparece, a fantasma nao existe (ela e
  so do hero, `styles.css:1507`), e a estrada passa pelo vao, nao pelo objeto — o mesmo erro
  ja pago uma vez (`Estrada.tsx:26-31`: a 1a rota morria sobre a grade das marcas).
- (v) o duotom se aplica a peca, **nunca a foto do Fabio**.

**Modos de falha adicionais.**
- **A peca presa ao cursor nao existe em toque** — e no celular o capitulo 02 volta a ser
  lista. Precisa de comportamento proprio (ex.: a peca acende no card ao entrar em
  viewport), decidido **nesta** fase e nao adiado para a F5.
- **O executor "melhora" o carrossel** para acomodar a peca. Proibido: `BarraMarcas.tsx` e
  peca aprovada por pedido do dono.
- **Alt text.** Peca decorativa leva alt vazio; peca informativa leva descricao. Errar isso
  regride acessibilidade, que e criterio de nao-regressao.

**Como recuperar.** As pecas vivem fora de `src/` ate serem aprovadas; reverter e remover
o import. Commitar antes.

**Criterios de saida.**
- [ ] pecas passam nas 5 metricas do teste de sessao unica
- [ ] peso somado da F2 <= 250 KB, e **G1 continua valendo** apos a fase
- [ ] capitulo 02 tem comportamento definido em toque
- [ ] zero marca de terceiro visivel nas pecas
- [ ] as pecas foram enviadas ao Fabio (a aprovacao pode vir depois; o envio, nao)
- [ ] G1-G10 mantidos

**Criterios de aborto.**
- 3 reescritas do prompt-base sem passar no teste de sessao unica -> PARE. A saida provavel
  deixa de ser geracao e passa a ser **fotografia real** (pedido 4 ao Fabio) — decisao humana.
- Se o Fabio disser que a peca nao representa o que ele vende -> PARE aquela peca.

**Orcamento de tentativas.** 3 rodadas de geracao; 2 reescritas de prompt-base.

---

### FASE 5 — Micro-interacoes

**Objetivo.** O site responder ao visitante, nao so ao scroll.

**O que sera feito.** CTA magnetico; rotulo no cursor por capitulo e por marca (o
`Cursor.tsx:39-43` **ja le `data-cursor`** — falta popular os alvos); miniatura na nav.

**O que NAO sera feito.** Nao reescrever o `Cursor`. Nao instalar biblioteca de motion.

**Suposicao otimista.** E quase so acrescentar `data-cursor` nos elementos: o mecanismo
existe e ja renderiza o rotulo (`Cursor.tsx:81`).

**Suposicao pessimista.** O CTA magnetico exige transform no `.btn-falar`, que **ja tem
`transition: transform`** (`styles.css:1557`) e um `:hover` que translada
(`styles.css:1579`). Escrever transform inline por JS vai brigar com o hover — exatamente o
erro que a casa ja documentou no arsenal ("quando o JS escreve o transform inteiro inline,
um `:hover` briga com ele, e a saida errada e animar `margin-top`").

**Acao.** (1) popular `data-cursor`; (2) escrever `--btn-ima-x/--btn-ima-y` por JS e
compor no CSS; (3) miniatura na nav.

**Reacao possivel.** (i) o magnetismo briga com o hover; (ii) a miniatura pesa; (iii) o rAF
do magnetismo continua rodando com a aba em segundo plano; (iv) o alvo tatil do CTA quebra.

**Contra-acao.** (i) padrao da casa sem excecao: JS escreve as PECAS, CSS compoe, com
`@property` declarado — ver `styles.css:1419-1431` e `1935-1937` para o formato ja usado
aqui. (ii) teto de 20 KB somados para miniaturas; se nao couber, corta a miniatura.
(iii) guarda por `document.visibilityState` e `pointer: fine`. (iv) rodar
`vistoria_borcato.py` (ja mede alvo < 44px).

**Modos de falha.** Rotulo de cursor em toque (nao existe cursor la) · efeito magnetico em
reduced-motion · miniatura carregando no primeiro paint em vez de sob demanda.

**Como recuperar.** Cada item e independente e pequeno; `git checkout` do arquivo.

**Criterios de saida.**
- [ ] rotulo em todos os capitulos e em todas as marcas
- [ ] CTA magnetico so em `(pointer:fine)` e desligado em reduced-motion
- [ ] miniaturas <= 20 KB somados
- [ ] G1-G10 mantidos

**Criterios de aborto.** Se o magnetismo brigar com o `:hover` depois de **2** tentativas,
**corte o magnetismo** e entregue o resto: e o item de menor valor da fase, e insistir nele
e o tipo de loop que este metodo existe para evitar.

**Orcamento de tentativas.** 2 por item.

---

### FASE 6 — A historia de verdade (trava em I-03)

**Objetivo.** Resolver o criterio Conteudo (5,8, o mais baixo) e a prova P2.

**O que sera feito.** Um paragrafo para o distribuidor e um para a industria; a linha do
tempo (14 anos -> 2018 -> hoje); a equipe de quatro.

**O que NAO sera feito.** **Nada sem confirmacao do Fabio** (regra dura 2). Nao gerar rosto
de pessoa real sem autorizacao (I-04).

**Suposicao otimista.** A conversa de 20 min rende 3 frases proprias e a fase e curta.

**Suposicao pessimista.** A conversa nao acontece e a pressao vira "escreve alguma coisa" —
que produz exatamente o texto generico ja diagnosticado. **O fracasso desta fase nao e
travar: e destravar errado.**

**Acao.** (1) conversa; (2) transcricao; (3) selecao de 3 a 5 frases proprias; (4) texto;
(5) devolver ao Fabio para conferencia.

**Reacao possivel.** (i) a conversa nao acontece; (ii) o que ele diz nao e publicavel (ex.:
cita numero de cliente ou de faturamento — regra dura 1); (iii) as fotos da equipe nao vem.

**Contra-acao.** (i) **F6-minima**: reorganizar so o que ja esta confirmado em
`CONTEUDO-fabio-2026-09-02.md` (os 14 anos, a gerencia anterior, setembro de 2018) e a
equipe de 4 com nomes de `qg/clientes/borcato.md:50`. Vale menos, mas nao inventa nada.
(ii) cortar o numero, manter a frase. (iii) equipe sem foto: nome e funcao ja e mais do que
ha hoje.

**Modos de falha.** Publicar frase nao confirmada · publicar nome ou foto de funcionario
sem autorizacao · o texto novo brigar com a economia do site, que e curto de proposito.

**Criterios de saida.**
- [ ] toda frase nova rastreavel a uma fonte que o cliente controla
- [ ] equipe so com autorizacao registrada
- [ ] P2 do `success.md` passa com 3 leitores
- [ ] G7 (zero numero comercial) reconferido linha a linha

**Criterios de aborto.** Qualquer duvida sobre autorizacao de nome ou imagem -> PARE.

**Orcamento de tentativas.** 2 rodadas de texto.

---

### FASE 4 (OPCIONAL) — Abertura com os quatro icones

> **Recomendo nao fazer nesta rodada.** Justificativa em 3.5. Trava em I-01.

Se for feita, tres travas obrigatorias:
1. **Nao apagar a abertura atual.** Construir a nova em paralelo, atras de uma chave, e
   comparar as duas com o dono antes de trocar.
2. **Criterio de aborto imediato:** se os icones vetorizados lerem como icone de
   biblioteca (piston, motor, roda em caixinha arredondada), a fase morre ali — isso viola
   o portao anti-cara-de-IA, e nenhuma quantidade de polimento conserta.
3. A abertura nova nao pode passar dos 3,4 s atuais, e o botao Pular e o Esc continuam
   valendo (`Abertura.tsx:63-67, 106`).

---

### FASE 7 — Portoes e submissao

**Objetivo.** Nada quebrado, nada pesado, nada copiado, e um caminho de publicacao.

**O que sera feito.** G1-G10 · portao anti-cara-de-IA · **fingerprint** (4 de 6 dimensoes
diferentes de cada build anterior, `qg/referencias/CATALOGO.md:51-54`) · video de 30 s ·
**resolver D-01 (deploy)**.

**Suposicao pessimista.** O fingerprint reprova. O site usa capsula do lukebaffait.fr, nav
de capitulo do Ferrari 26, palavra-fantasma dos 36/25, CTA do 25, trilho do 22 — **cinco
emprestimos declarados**.

**Contra-acao.** O fingerprint compara **build contra build da casa**, nao contra a
referencia — entao ele passa. Mas o argumento de originalidade tem de estar escrito, e o
que carrega a assinatura sao os itens proprios: a foto viva e a estrada que vira rota. **Se
o unico argumento for "combinamos cinco referencias", a fase reprova.**

**Modos de falha.** Publicar antes de o dono mandar (regra dura 6) · deploy espelhado
apagando `cgi-bin`, `masterfisher`, `repone`, `manuais` (regra dura 4) · subir `index.html`
antes de `assets/`.

**Criterios de saida.**
- [ ] G1-G10 verdes nas 5 larguras
- [ ] portao anti-cara-de-IA sem item violado
- [ ] fingerprint documentado
- [ ] caminho de deploy testado **em copia**, nunca direto no ar
- [ ] video de 30 s

**Criterios de aborto.** Se o deploy (D-01) nao tiver saida definida, PARE antes de
qualquer publicacao. **Nunca improvisar deploy.**

---

## 6. O Fable como jurado no fim de cada fase

### O que ele recebe (pacote fixo, sempre o mesmo)

1. **Capturas** em 375, 768 e 1440 — topo, meio e pagina inteira — **antes e depois** da fase
2. O **diff** da fase: `git diff --stat` e a lista de arquivos tocados
3. A **saida crua** dos portoes: `prova_peso`, `prova_colisao`, `prova_touch`,
   `prova_jank`, `vistoria_borcato`
4. O `specs/fase-N.md` da fase — para julgar contra o que foi prometido, nao contra gosto
5. **A lista do que era proibido tocar** (secao 1 deste documento)

### O que ele responde (formato fixo, sem prosa livre)

```
NOTA POR CRITERIO (1-10):  Design . Usabilidade . Criatividade . Conteudo
REGRESSAO:                 sim/nao  — se sim: qual peca aprovada, e em que captura se ve
PORTAO ANTI-CARA-DE-IA:    passa/reprova + o item violado
FINGERPRINT:               quantas das 6 dimensoes diferem   (so na F7)
O QUE EU FARIA DIFERENTE:  no maximo 3 itens, cada um com o arquivo onde mexer
VEREDITO:                  LIBERA / LIBERA COM RESSALVA / REPROVA
```

### A nota que libera a fase seguinte

| Situacao | Regra |
|---|---|
| Nota da fase | **>= 7,5** no criterio que a fase ataca (D-10) |
| Regressao = sim | **REPROVA automatica**, qualquer que seja a nota |
| Portao anti-cara-de-IA reprovado | **REPROVA automatica** |
| LIBERA COM RESSALVA | a ressalva vira item de ledger e **o humano decide** — nunca o executor |

**Tres travas contra o jurado complacente:**
1. O Fable jurado **nao pode ser o mesmo agente que executou a fase.** Julgar o proprio
   trabalho e como o hero passou na primeira vez e foi reprovado pelo dono depois.
2. Ele julga **contra a captura anterior**, nao contra a memoria. Sem o "antes", ele nao
   pode afirmar que nao houve regressao — e a resposta correta e "nao sei".
3. Ele recebe a **saida crua** dos portoes, nao o resumo do executor. Resumo de quem
   executou e onde a regressao se esconde.

---

## 7. Unknown unknowns

**Known knowns.** As 3 colisoes confirmadas, o peso duplicado de 619 KB, os 7 leitores de
scroll, a paleta, as 11 marcas, a ausencia de GSAP e three.

**Known unknowns.** Os 8 itens `[INDEFINIDO]` do `ledger.md`.

**Unknown knowns** — conhecimento tacito do dono que ainda nao virou regra escrita:
- O que ele quis dizer com *"o valor e o que menos importa"*: se e permissao para gastar
  **tempo** ou para gastar **token**. Isso muda todo orcamento de tentativas deste plano.
- Se "podio do dia" e ambicao ou compromisso assumido com alguem.
- **Qual dos 35 representantes ele quer que veja primeiro** — porque isso define o publico
  real da peca, e um representante de autopecas nao le o site como um jurado le.

**Unknown unknowns** — o que eu procuraria e ainda nao sei:

- **O site vai ser visto ONDE?** Se o Fabio abre no celular numa reuniao com distribuidor,
  metade do plano nao existe la: a estrada some abaixo de 900px (`Estrada.tsx:59`), o
  cursor com rotulo nao existe em toque, o magnetismo nao existe. **O plano inteiro e
  desktop-first para um uso que pode ser mobile-first.** Isso nao esta em lugar nenhum do
  levantamento e pode ser o maior erro de direcao do projeto.
- **Awwwards julga o site NO AR, em dominio proprio.** Se D-01 nao resolver, nao ha
  submissao — e as sete fases valem zero. O item de menor glamour e o de maior risco.
- **A foto do Fabio e gerada por IA a partir da original** (`HeroTravessia.tsx:6-8`;
  `marca/geracao/p4-APROVADA.png`). Se um jurado perceber, o custo supera qualquer ganho de
  nota — e o bordado que diz **"Comarcial"** (D-06) e justamente a assinatura de que foi
  gerada. **Este e o risco mais subestimado do projeto inteiro**, e ele nao aparece em
  nenhum dos nove achados do levantamento.
- Ninguem verificou `lang`, skip link e ordem de foco com prova. O levantamento cita o skip
  link de passagem, sem medicao.
- **O `src/components/ui/` tem 48 arquivos shadcn que o site nao usa** (o `index.tsx`
  importa so de `components/site/`). Nao pesam no bundle, mas um executor novo pode
  "aproveitar" um deles e injetar vocabulario de template no site (D-09).

---

## 8. Se o prazo apertar: a ordem de corte

Cortar **de baixo para cima**: F4 (ja opcional) -> F5 -> F6-minima -> F2 reduzida a 3 pecas.

**Nunca cortar F1a, F1b, F3 nem F7.** Sem F1 o site nao passa nos portoes; sem F3 nao ha
cena para lembrar; sem F7 nao ha publicacao.

---

## 9. Comandos

**Iniciar:**
> "Leia o `WAR-GAME.md` completo e o `specs/fase-N.md`. Nao replaneje. Execute somente a
> Fase N. Nao avance sem autorizacao. Se encontrar falha, consulte
> `risks/tabela-mestra.md` antes de improvisar. Pare ao final e entregue relatorio curto."

**Proxima fase:**
> "Execute somente a proxima fase aprovada. Nao pule criterios de saida. Nao altere decisao
> arquitetural sem `D-*` aprovado. Pare ao final."

**Travamento:**
> "A execucao travou. Consulte `WAR-GAME.md`, `risks/tabela-mestra.md` e `ledger.md`.
> Explique: qual risco ocorreu, qual sinal apareceu, qual contra-acao recomenda, e se
> devemos continuar / abortar / voltar ao estrategista."

**Auditoria:**
> "Audite o plano atual. Nao reescreva tudo. Procure riscos faltantes, fases fracas,
> criterios ruins e pontos de loop. Proponha ajustes pontuais."

**Rollback:** `git checkout -- <arquivo>` para item isolado. `git reset --hard <commit da
fase anterior>` **so com autorizacao humana explicita**.

**Frase de controle, ao fim de toda fase:**
```
Nao implemente ainda. Nao replaneje do zero.
Atualize ledger e README. Pare ao final da fase.
```

---

## 10. Proxima acao

Ver `README.md`, secao final. Resumo: **nada comeca antes de D-01, D-03 e D-05 estarem
aprovados.** A F1a e a unica excecao — ela pode comecar assim que D-05 estiver decidido,
porque nao toca em `src/`.
