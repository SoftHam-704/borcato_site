# H.M. Borçato — recado para quem assume

**Escrito em 05/09/2026, no fim de uma sessão em que o dono reprovou o site.**
Ler inteiro leva 15 minutos e economiza dias.

---

## 1. O ESTADO REAL, sem verniz

O dono viu o site e disse, textualmente:

> *"péssimo"* · *"isso é site de principiante"* · *"qualquer bosta no mundo faz um
> site assim"* · *"do preloader ao final, tá parecendo trabalho de amador ralo"*

Ele estava certo, e o diagnóstico é **estrutural, não de acabamento**:

**Os quatro capítulos repetiam o MESMO esqueleto** — título gigante → parágrafo →
bloco embaixo. Quatro vezes seguidas. Esse é o esqueleto de qualquer template de
landing page, e nenhum polimento salva.

O que ele aprovou: **o hero** (e só). Única parte a não mexer sem motivo forte.

### O que já foi refeito

| Capítulo | Estado | Cena |
|---|---|---|
| Hero | ✅ **aprovado pelo dono** — não mexer | a cápsula, a palavra atravessando |
| 01 · A casa | ✅ **REFEITO** | retrato ao lado do texto + 4 marcos |
| 02 · As marcas | ✅ **REFEITO** | peça ocupando meia tela, 11 pastilhas |
| 03 · A estrada | ✅ **REFEITO** | mapa de MG numerado, regiões acendendo |
| 04 · O nome | ✅ **REFEITO** | H. e M. em planos, homenagem entre elas |
| Abertura | ✅ encurtada para 1,9s, "Pular" visível desde o início | |

**Os quatro capítulos saíram do esqueleto repetido** (título gigante → parágrafo →
bloco) que fazia o site ler como template. Cada um tem imagem, ação e razão própria.

> **O que falta NÃO é composição.** É evidência real da operação — fotos de evento
> com legenda de cidade e ano — e isso depende do Fábio (ver §7).

---

## 2. ⭐ A BIBLIOTECA COMPRADA — abra ANTES de inventar layout

### `E:\Sistemas_ia\biblioteca-templates\grigoletto\`

Comprada pelo dono em 19/08/2026. **Eu a ignorei por dias e ele teve de me cobrar
duas vezes.** Não repita o erro.

```
grigoletto/
├── INDICE.md                 ← COMECE AQUI: os 39 protótipos, um por linha
├── capturas/                 ← as 39 capas em PNG (folheável, sem abrir o Figma)
│   ├── 01-bloom-editorial.png
│   ├── 26-ferrari-296-gtb.png     ← ⭐ "ELA É A QUE SALVA" (palavras do dono)
│   └── ... 39 no total
├── manifesto.json            ← os 39 em JSON (nome, descrição, link do Figma)
├── CHECKLIST-duplicar.md     ← como duplicar um protótipo do Figma
└── extras/
    ├── 01-kit-sites-cinematograficos-com-ia.txt   (43 KB — o método completo)
    ├── 02-design-system-blueprint.txt             (35 KB — design system)
    ├── 03-15-golden-skills-motion.txt             (7 KB — o stack de motion)
    └── skills-15/            ← 15 SKILLS DE MOTION E DESIGN EM MARKDOWN
        ├── affaan-m__motion-foundations.md
        ├── affaan-m__motion-patterns.md
        ├── affaan-m__motion-advanced.md
        ├── affaan-m__make-interfaces-feel-better.md
        ├── affaan-m__design-system.md
        ├── mattnigh__design.md
        ├── sickn33__design-spells.md
        ├── sickn33__ui-pattern.md
        ├── sickn33__ui-review.md
        ├── wshobson__accessibility-compliance.md
        ├── wshobson__design-system-patterns.md
        └── ... 16 arquivos no total
```

> ⚠️ **AS 15 SKILLS DE MOTION EU NUNCA ABRI.** Estão em markdown, prontas para ler.
> `motion-foundations`, `motion-patterns`, `motion-advanced` e
> `make-interfaces-feel-better` são exatamente o assunto do que falta neste site.
> **Ler antes de inventar animação.** É material pago, já na máquina.

### A referência que o dono escolheu: nº 26 (Ferrari 296 GTB)

O que ela tem e o site não tinha:
- o **objeto ocupa metade da tela**, com luz dramática caindo sobre ele
- o **texto fica AO LADO**, não em cima
- as marcas ficam **ancoradas no rodapé** em pastilhas
- uma **janela de dado flutua na borda**, cortada pela margem

Aplicado no capítulo 02. **É o que o resto do site precisa.**

Outras que servem aos capítulos restantes: **15 · Lineage Hot** (seção "sobre" dark
com narrativa de origem — serve ao capítulo 01), **11 · Coda Noir** (footer editorial
dark — serve ao 04), **04 · AR Mirror** (split screen).

### As outras referências que ele mandou

- **landonorris.com** — medido: 15,1 telas, 41 `clip-path`, 16 `mask-image`, 70
  pedaços de texto, tema por seção. Nós: 6,4 telas, 4 `clip-path`, **0**
  `mask-image`. Ele é **Webflow + Lenis + Rive** — a distância nunca foi técnica.
- **noomoagency.com** — transição de cima para baixo
- **lukebaffait.fr** — a cápsula e a linha (já aplicados no hero)

---

## 3. AS REGRAS DURAS (violar = retrabalho ou problema com o cliente)

1. **NUNCA número de cliente nem valor financeiro.** Nem "100+ empresas". Temos
   acesso ao ERP dele (é cliente da frota) — isso dá matéria-prima, **não
   autorização**.
2. **Nada de afirmação não confirmada pelo cliente.** Aconteceu: o site foi ao ar
   dizendo *"de Minas para outros onze estados"* — **falso**, ele atende só MG, e
   quem pegou foi o próprio Fábio. Eu tinha escrito "a confirmar" na minha própria
   documentação e publiquei assim mesmo.
   *Hoje quase repeti:* escrevi *"é o que separa vender uma vez de ser chamado de
   volta"* — frase minha sobre como ele trabalha. Reescrevi com só o que ele disse.
3. **A lista de 11 representadas é decisão fechada do cliente.** Não auditar, não
   sugerir. Blintech não faz parte.
4. **A paleta é azul `#005f96`** — provado no logo bordado da camisa. Não mudar.
5. **Deploy: FTP manual, envio PONTUAL, nunca espelhado.** O servidor tem subpastas
   que não existem no projeto (`cgi-bin`, `masterfisher`, `repone`, `manuais`) e
   **precisam ser preservadas**. Ver `COMO-PUBLICAR.md`.
6. **Nada de biblioteca de componente pronto** (Uiverse, React Bits). Componente de
   biblioteca é a média materializada — é o que dá cara de IA.
7. **Sem perguntas pessoais ao cliente.** Ele já vetou duas vezes.

---

## 4. O MÉTODO (aprendido apanhando, hoje, várias vezes)

### Medição REPROVA, nunca aprova

**Quatro vezes hoje a medição aprovou e o olho reprovou** — sempre porque o defeito
estava numa dimensão que não pensei em medir:

| O que medi | Disse | A verdade |
|---|---|---|
| rótulo do cursor | "anel 56px, cabe, 0 erro" | saía "FALAR COM A BORÇAT**[WHATSAPP]**" |
| giro do vídeo do Fábio | "15,0 — girou bastante" | era **troca de pessoa**, não rotação |
| identidade do rosto | "desvio +0,0" | cabelo grisalho, outro homem |
| altura da página | "11451px, não mudou" | eram 8679 — li uma medição obsoleta |

> **SEMPRE OLHAR A CAPTURA antes de aprovar.** Número não vê colisão de texto, não
> vê troca de pessoa, não vê moldura.

E o inverso: **hoje inventei uma "caixa preta" que não existia.** Medi depois e dava
6 níveis somados nos 3 canais — no limiar do perceptível. O que eu tinha visto era o
anel do cursor. **Gastei duas correções num problema imaginário.**

### Movimento não se lê em código parado

Li o código do Norris, contei "21 canvas WebGL", concluí que a distância era técnica
e usei isso para **não aplicar** a referência. Eram **20 Rive e 2 WebGL**.

> **Referência de movimento entra como VÍDEO + uma frase do que chamou atenção.**
> Nem só link (não mostra tempo), nem só vídeo (mostra vinte gestos; a frase é o
> recorte).

### Adjetivo não é briefing

"Moderno", "impactante", "não genérico" não têm geometria nem tempo. Quem lê preenche
com a média do que já viu — **que é a definição de genérico**. Referência entra como
**asset**: gravação, print, arquivo de identidade.

### Armadilhas de medição já pagas

- **Medir a TINTA, não a caixa** (`Range.getClientRects()`): a caixa de um `<p>` vai
  até a borda da coluna, o texto para antes. Erro de até 58px que não existe.
- **`full_page` MENTE neste site**: todo gesto nasce de `--cap-entra`, escrito no
  scroll. Sem rolar, a captura sai preta.
- **`mouse.wheel` TRAVA**: o Lenis intercepta a roda. Rolar com `scrollTo` em passos.
- **`offsetTop` não é a posição na página** quando o pai tem `transform`. Usar
  `getBoundingClientRect().top + scrollY`.
- **`opacity === "1"` é um instante, não um estado** — a transição ainda corre.
  Comparar `> 0.5`.
- **Navegador headless não tem GPU:** número absoluto de desempenho não vale ali.

---

## 4-B. REVISÃO DO GERENTE (05/09) — seis achados, todos confirmados no código

Uma revisão independente conferiu meus documentos **contra o código** e achou seis
coisas que eu deixei passar. **Todas verificadas e corrigidas.** Ficam aqui porque
o padrão importa mais que os defeitos.

| Achado | O que era | Estado |
|---|---|---|
| Contato do fecho | rótulo dizia "Celular · WhatsApp", `href` era `tel:` | ✅ corrigido; hero e fecho agora leem a mesma fonte |
| Botão Pular | `aria-hidden` no contêiner engolia o único controle da cena | ✅ agora só a decoração se esconde |
| Telas de erro | "Page not found", "Go home" num documento `pt-BR` | ✅ traduzidas |
| Pastilhas do palco | 584px de trilha; em 375px começavam em **x = −104** | ✅ trilha rola de lado, alvo de 44px intacto |
| `offsetTop` no palco | a armadilha que este próprio arquivo documenta | ✅ trocado por `getBoundingClientRect` |
| Âncoras de cidade | `dados.ts` pedia confirmação; a página já as exibia | ✅ **removidas** (decisão do dono: só as regiões) |

### O furo do portão, que é a lição maior

As pastilhas ficavam fora da tela **e o portão dava "overflow: 0px OK"**. Motivo:
`translate: -50%` faz o elemento sangrar para os **dois lados**, e sangria simétrica
não cria barra de rolagem.

> **Overflow zero não prova que cabe.**

O portão ganhou um teste novo — **controle clicável fora da área visível** — que ignora
quem tem pai rolável ou é item de marquise. **E foi validado reintroduzindo o bug:**
com o defeito de volta ele acusa 4 e nomeia os certos; sem, acusa zero.

### As cidades saíram (05/09) — decisão do dono

Perguntei, ele respondeu **"apenas as regiões"**. Saíram do hero, do capítulo 03 e do
próprio `dados.ts` (o campo `ancoras` não existe mais, para não ficar dado publicável
sem uso). Voltam só com autorização explícita do Fábio.

---

## 4-C. SEGUNDA AUDITORIA (05/09) — e ela achou furo no MEU teste

Uma segunda revisão conferiu a rodada anterior. Três achados, todos procedentes:

**1. Eu declarei a tradução concluída e faltavam duas linhas.** Meu grep buscou os
títulos e botões; os parágrafos ficaram. ✅ corrigido, com varredura ampla depois.

**2. O indicador do palco mentia no celular.** Em 375px a trilha mostra 315px de 569px:
**da 7ª marca em diante a pastilha ativa saía da área visível e o `scrollLeft` ficava em
zero** — cinco das onze sem indicação de posição. ✅ a trilha agora acompanha a marca
ativa (sem `scrollIntoView`: ele rolaria a página inteira e daria salto vertical).

**3. O teste que EU criei e declarei "validado" tinha dois furos.** Este é o mais
instrutivo:

| Furo | O que passava | Por quê |
|---|---|---|
| Exceção por forma | botão fora da tela sob pai com `translateX(20px)` | eu ignorava **qualquer** translação em X, achando que isso identificava a marquise |
| Recorte parcial | botão com metade da largura cortada | eu só detectava o que estava **inteiro** fora |

**Provei os dois criando o defeito**, e ambos passavam despercebidos.

> **A lição:** validar um teste com UM caso não o valida. Eu tinha reintroduzido o bug
> das pastilhas, visto o teste pegar, e chamado de validado. Um caso prova que ele pega
> aquele caso.
>
> **E exceção por FORMA é cega; exceção por NOME é auditável.** Agora a marquise é
> ignorada pela classe (`marcas__trilho`), não por ter transform. E o critério passou a
> ser *quanto do alvo sobra visível* (mínimo 44px e 60%), não "está inteiro fora".

---

## 5. AS FERRAMENTAS (em `ferramentas/`)

```bash
# 1. PORTÃO DE RESPONSIVIDADE — obrigatório antes de publicar
python ferramentas/portao-responsividade.py
#    as 5 larguras da casa: 375 · 430 · 768 · 1024 · 1440
#    zero overflow, zero alvo < 44px, zero erro de console
#    ⚠️ "truncados" .sr-only são FALSOS POSITIVOS (texto de leitor de tela)

# 2. REVISÃO ROLANDO — o full_page não serve aqui
python ferramentas/revisao-rolando.py

# 3. TIRA DE CONTATOS — ler MOVIMENTO de um vídeo de referência
python ferramentas/tira-de-contatos.py <video> [fps] [colunas]
#    fps 2 = rolagem de página · fps 8+ = hover/cursor
#    passos iguais = linear; passos que encolhem = ease-out
#    ⚠️ a quebra de linha da grade FINGE que o objeto voltou

# 4. VÍDEO → QUADROS — vídeo gerado (Veo/Gemini) vira sequência AVIF
python ferramentas/video-para-frames.py <video> [n] [largura] [qualidade]
#    acha a JANELA ÚTIL sozinho (o gerador para no meio e VOLTA no fim)
#    roda os testes: corpo parado, giro acumulado, peso
```

**Ajustar a porta** dentro dos scripts (o dev sobe em 8080; o build servido, em outra).

---

## 6. A FOTO DO FÁBIO — assunto ENCERRADO, não reabrir

Os **5 quadros em `src/assets/site/frames/`** são o melhor material que existe.
Gerados um a partir do outro, passam nos dois critérios.

**Tentativas de melhorar, todas medidas e todas piores:**

| Gerador | Trava o corpo | Preserva a pessoa |
|---|---|---|
| **Veo 3.1** (vídeo) | ❌ tronco 43,7 e 45,9 (limite 14) | ✅ |
| **Nano Banana** (imagem) | ✅ tronco 9,6 | ❌ **trocou o homem** |

Nenhum entrega os dois. E o Veo **anima uma pessoa**: no v2 o Fábio acenou a cabeça
em concordância e depois **desvirou**.

> **Semelhança de pessoa é veredito humano, não métrica.** Meus dois testes aprovaram
> um quadro que era outro homem. Se tentar de novo, o pedido está em
> `marca/geracao/PEDIDO-VEO-v2.md` — e o número que decide é **giro total > 39,8**.

---

## 7. O QUE DEPENDE DO FÁBIO

1. **8 a 13 fotos de evento** que ele mesmo escolha, com o que era / cidade / ano.
   O Instagram dele (`@representanteautopecas`) tem 192 posts.
   **NÃO raspar** — bloqueia sem login desde 2021, viola os termos, e o problema
   cairia no colo dele. Ele é o dono da conta: basta pedir.
   ⚠️ Foto de evento tem gente de terceiros — ou autorizaram, ou é plano aberto.
2. **20 minutos de conversa** — por que saiu do escritório onde era gerente; a viagem
   mais dura; o que responde ao distribuidor que pergunta o que ele faz.
   **Trava a fase 6 inteira.**
3. **O logo em vetor** (AI, EPS, CDR ou PDF).

**A copy que ele já escreveu e vale mais que a nossa** — a bio do Instagram:
> *"Representação consultiva no aftermarket de MG. Crescimento com ética, presença
> real e resultado do sell in ao giro."*

Já entrou no capítulo 01. **"Presença real"** e **"do sell in ao giro"** são
vocabulário do ofício — é o que faz outro representante reconhecer quem conhece o
negócio.

---

## 8. POR ONDE COMEÇAR (ordem de impacto)

**Os quatro capítulos já foram refeitos** (ver §1). O que sobra:

1. **Ler as 15 skills de motion** em `extras/skills-15/`. Material pago que nunca foi
   aberto, e trata exatamente de sincronização e acabamento — que é onde está o
   próximo ganho, segundo a 3ª auditoria.
2. **As fotos de evento** — o único item que muda a nota e não depende de nós.
   Sem elas o site fala de "presença e estrada" mostrando só o Fábio, logos e peças
   geradas. Ver §7.
3. **A esteira horizontal** (ref. Norris) — vai no **capítulo 01**, não no 03 (o 03 já
   tem a cena do mapa; dois gestos fortes competem). Depende das fotos.
   **Resolve um achado do júri em aberto: não aparece outra pessoa além do Fábio no
   site inteiro.**
4. **Composição do capítulo 03** — o mapa ainda é um segundo bloco abaixo do texto;
   não divide a primeira vista com a manchete. Oportunidade, não defeito.

---

## 9. ONDE ESTÁ CADA COISA

```
borcato/
├── LEIA-PRIMEIRO.md          ← este arquivo
├── COMO-PUBLICAR.md          ← o deploy, passo a passo (FTP pontual)
├── PROXIMA-SESSAO.md         ← o que pedir ao Fábio, em detalhe
├── REPRESENTADAS.md          ← as 11 marcas e o que cada uma fornece
├── DADOS-DO-SISTEMA.md       ← dados do ERP ⚠️ matéria-prima, NÃO autorização
├── CONTEUDO-fabio-*.md       ← o material que ele mandou
├── ferramentas/              ← os 4 scripts
├── marca/
│   ├── frames/               ← os 5 quadros da foto viva (ENCERRADO)
│   ├── geracao/              ← tentativas + PEDIDO-VEO-v2.md
│   └── IMAGEM-NOVA-*.md      ← briefing da foto, com o que falhou
├── war-game/                 ← specs das fases, ledger, abortos
└── src/
    ├── lib/dados.ts          ← FONTE ÚNICA (11 marcas, 8 regiões, MG)
    ├── styles.css            ← ~2400 linhas, comentado com o PORQUÊ
    └── components/site/
        ├── PalcoPecas.tsx    ← ⭐ O MODELO a seguir nos outros capítulos
        ├── HeroTravessia.tsx ← o hero (aprovado — não mexer sem motivo)
        ├── Estrada.tsx       ← a linha + REGIOES_MAPA (dados do mapa)
        ├── FotoViva.tsx      ← o scrub dos 5 quadros
        └── Abertura.tsx      ← os 4 tempos (3,4s)
```

**Fora do projeto, essencial:**
- `E:\Sistemas_ia\biblioteca-templates\grigoletto\` — **os 39 protótipos + as 15
  skills de motion** (ver §2)
- `E:\Sistemas_ia\SoftHam-Site\qg\arsenal\TECNICAS.md` — 606 linhas de técnica medida
- `E:\Sistemas_ia\SoftHam-Site\qg\metodo\REGRAS-DURAS.md` — 328 linhas de regra

---

## 10. O PADRÃO DE CÓDIGO DA CASA

- **JS escreve só as PEÇAS em custom properties; o CSS compõe.** Nunca o transform
  inteiro inline — uma regra `:hover` briga com ele.
- **`@property` é OBRIGATÓRIO** para custom property usada dentro de `calc()` aninhado
  (`syntax: "<number>"`). `--cap-entra` precisa de `inherits: true`. Sem registrar, a
  variável fica como TEXTO, o gesto não acontece e **nada acusa erro**.
- **Comentário em português explicando o PORQUÊ** — não o quê. O que foi tentado antes
  e falhou, e qual medição justificou o número.
- **Regra larga com lista de exceções: NUNCA.** `> *:not(.a):not(.b)` mordeu três
  vezes no mesmo projeto. Nomear quem sobe.
- **GSAP e three.js NÃO estão instalados, e é decisão.** O parallax por camadas é um
  multiplicador sobre o progresso — o mesmo que o `data-speed` faz. Não vale 70 KB.
- **Sem `sessionStorage` na abertura:** o site é peça de venda, e o dono recarrega na
  frente do cliente. Roda sempre, com botão de pular e Esc.

---

## 11. NÚMEROS DE HOJE (referência para comparar)

| | |
|---|---|
| Peso no fio | **669 KB** (orçamento 1000) |
| Altura da página | 8679px |
| Portão de responsividade | limpo nas 5 larguras |
| Erros de console | 0 |
| Build | `npm run build` → `.output/public/` |

⚠️ **`vite build` apaga `.output/public`** — se um servidor estático estiver servindo
essa pasta, o build falha com erro de `rmdir`. Matar o servidor antes.

---

**Última coisa.** O benchmark não é "o Fábio aprovou". O dono tem **36 representantes**
na carteira e disse que este site é *"a peça que vende os outros 35"*. O alvo é
**pódio de Awwwards** — e o julgamento real é o de um representante que vê e liga.
