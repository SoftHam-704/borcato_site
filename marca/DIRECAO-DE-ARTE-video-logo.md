# H.M. Borçato — direção de arte do vídeo do logotipo

**Data:** 2026-09-02
**Autoria:** direção de arte de motion design (agente especialista), a pedido do dono da SoftHam.
**Status:** aprovado para produção **assim que a cor da marca for resolvida** (ver §0 e §6, risco 4).
**Cliente:** REAL e contratado — Fábio Borçato. Nada aqui é exercício.

---

## 0. Correção de briefing — leia antes de tudo

Duas coisas que eu (Fable) havia afirmado **não sobreviveram à leitura dos arquivos reais**.
Ficam registradas porque a produção inteira depende delas.

### A marca não tem cor. Não é "a versão que temos está dessaturada".

Amostragem dos dois arquivos de logo baixados do site atual:

| Arquivo | Tamanho | O que é |
|---|---|---|
| `hm_borcato_logo_ng.png` | 225×50 | As 12 cores mais frequentes são **todas cinzas neutros** — (229,229,229), (172,172,172), (117,117,117)… R=G=B em todas |
| `hm_borcato.png` | 188×40 | **Preto puro** (0,0,0) com canal alfa variável. É a marca monocromática |

**Não há um pixel saturado em nenhum dos dois.**

### O verde não é a cor da marca — é `:hover` de um template comprado

Eu havia contado ocorrências no CSS e concluído "verde dominante". O especialista foi olhar
**onde** cada cor é usada, e o quadro muda:

| Cor | Ocorrências | Onde de fato aparece |
|---|---|---|
| `#90c140` verde | 6× | `#topnav a:hover`, `#breadcrumbs a:hover`, `#leftmenu a:hover`, `table.category th a:hover` — **4 dos 6 usos são estado `:hover`** |
| `#005f96` azul | 4× | `a` (cor de link padrão), `.btn` background, `border-bottom` de título, botão — **estrutural** |

E o template se chama **`cirrus-green`**: é tema Joomla de prateleira. O verde é herança do
fornecedor antigo, não decisão do Fábio.

**Consequência:** a marca real da Borçato hoje é **preto + metal + tipografia condensada
pesada**. Verde e azul entram como **luz**, em dose pequena, e o **azul pesa mais que o verde**.
Fazer quatro imagens banhadas em `#90c140` seria elevar um acidente de template a identidade.

### ✅ RESOLVIDO EM 03/09 — a marca é AZUL

Duas fotos profissionais do Fábio chegaram com o projeto
(`WhatsApp Image 2026-09-01 at 07.48.23.jpeg` e `...07.54.32.jpeg`) e **uma delas mostra
o logo bordado na camisa, em close e em cores.**

Amostragem do bordado (`marca/_bordado_4x.png`, crop ampliado 4×):

| Cor | Matiz | Sat | Luz |
|---|---|---|---|
| `#a0d0f0` | **204°** | 73% | 78% |
| `#c0d0e0` | 210° | 34% | 82% |
| `#d0d0e0` | 240° | 21% | 85% |
| `#202030` | 240° | 20% | 16% |

**Todas as matizes dominantes ficam entre 204° e 240° — azul. NENHUM verde aparece.**

Confirma a análise do CSS: `#005f96` é a cor da marca; o `#90c140` era `:hover` do
template `cirrus-green` e **não pertence à identidade**.

**Consequência para os prompts:** manter `#005f96` como luz de recorte nos quatro. O
acento verde `#90c140` previsto para o trecho 4 (turbina) **deve ser removido** — trocar
por um azul mais claro, na faixa de `#a0d0f0`, que é o tom real do bordado.

**Ainda vale pedir a arte original** (AI/EPS/CDR/PDF) para produção — a foto resolve a
COR, não a resolução.

### A pergunta original (mantida para registro)

> Existe arte original do logo (**AI / EPS / CDR / PDF**) ou alguma aplicação impressa em
> cores — cartão de visita, adesivo de veículo, pasta, assinatura de e-mail?

Se existir, decide a cor dos ícones em cinco minutos. Enquanto não vier, a direção
monocromática abaixo é a única honesta — e tem a vantagem de **não errar**: metal escuro com
luz colorida funciona seja qual for a resposta.

---

## 1. A decisão de estilo

# Escolhido: o ÍCONE DO LOGO GANHANDO VOLUME

O quadrado arredondado do logo vira um **objeto físico de metal escuro**, e o pictograma é uma
superfície **gravada em baixo-relevo** nesse objeto. A silhueta que a câmera vê é literalmente
a silhueta da marca.

### Por quê

**Fidelidade.** É o único caminho em que a imagem *é* a marca. Nas alternativas, a marca só
aparece se o espectador fizer a ligação "ah, um pistão, igual ao do logo" — e ele não vai fazer,
porque um pistão fotográfico real não se parece com aquele pictograma de 29×23px.

**Risco de banco de imagem.** A evidência está no próprio material do cliente:
`hm_borcato_representacao.jpg` é uma pilha de autopeças em fundo cinza degradê, luz de estúdio
chapada — catálogo de fornecedor, intercambiável com o de qualquer concorrente. É exatamente o
que a rota "macro fotográfica real" produz.

**Coerência da série — o argumento decisivo.** Nas outras rotas as quatro peças são geometrias
hostis entre si: pistão vertical e alongado, bloco de motor largo e maciço, turbina circular.
Fazer as quatro parecerem série exige domar quatro formas incompatíveis, prompt a prompt.
Na placa, **as quatro têm a mesma silhueta externa** — mesmo retângulo arredondado, mesmo
tamanho, mesmo lugar do quadro. Só o relevo interno muda. A coerência deixa de ser negociação e
vira estrutura. Isso derruba drasticamente a taxa de descarte na geração.

### Medida que decide a execução

Bloco de ícones medido em `hm_borcato_logo_ng.png`: bbox x 0-59, y 0-47 → **60×48px para o 2×2**,
logo cada tile é **~29×23px, proporção 1,26:1**.

> **Os tiles NÃO são quadrados. São retângulos horizontais.**

Por isso os prompts pedem *"rounded rectangle, slightly wider than tall"*. Se o gerador entregar
quadrado perfeito, a montagem final do 2×2 não bate com a marca — e não bate justamente no frame
em que o espectador está olhando o logo.

### Descartadas

- **Macro fotográfica real** — reproduz `hm_borcato_representacao.jpg`, que é o problema que
  viemos resolver.
- **Render 3D metálico girando no escuro** — é o output *default* de todo gerador em 2026 para
  este tema. Genérico por construção, e não carrega a silhueta da marca.

### O que essa escolha custa

Os pictogramas de origem têm 29×23px e são toscos em detalhe; o gerador vai inventar detalhe
mecânico ao interpretá-los. **Não teremos fidelidade de desenho técnico** — aceito, porque em
movimento, com luz rasante, o que se lê é silhueta e relevo, não o detalhe do cilindro.
**O que fecha para o futuro:** amarra a marca a uma linguagem de "objeto gravado" que será cara
de abandonar depois, porque vira a assinatura visual do site inteiro.

---

## 2. O movimento — 8 segundos, 4 trechos de 2s

**Conceito: a placa vira para a luz.** Cada peça é uma placa de metal escuro já no quadro, quase
invisível, que **gira ~20°** encontrando a luz — o relevo acende, o eixo colorido varre a
superfície. Fecha e corta para a próxima. No quarto trecho a câmera abre e as quatro placas se
assentam no bloco 2×2 da marca.

**Ninguém "monta" nada voando pela tela.** A montagem final acontece por *abertura de câmera*,
não por peças voando — peças voando é estética de vinheta de canal esportivo dos anos 2000, e o
Flow erra feio quando se pede translação de múltiplos objetos.

| t | trecho | ação | luz |
|---|---|---|---|
| 0,0–2,0 | 1 · pistão | placa gira do escuro, relevo acende de cima-esquerda | branca fria, varredura **azul `#005f96`** |
| 2,0–4,0 | 2 · bloco de motor | mesma rotação, mesmo eixo, mesmo tempo | idem |
| 4,0–6,0 | 3 · suspensão/freio | idem | idem |
| 6,0–8,0 | 4 · turbina | rotor cede ~15° extra e **para**; câmera recua e revela o 2×2 | fecha com acento **verde `#90c140`** no último meio segundo |

**Por que o verde só no fim:** verde é `:hover` no CSS — é a cor do *acontecimento*. Guardá-lo
para o frame de fechamento faz dele o ponto de chegada em vez de papel de parede. Azul carrega
os 8 segundos; verde marca o assentamento da marca.

**A regra que segura a série:** os quatro trechos usam **o mesmo eixo de rotação (vertical, giro
para a direita), o mesmo ângulo e a mesma duração**. A variação está no relevo, nunca no
movimento.

**Corte:** duro, sem crossfade, **no pico de brilho** de cada placa. O flash mascara a emenda —
é o que faz clipes de IA gerados separadamente colarem.

---

## 3. Proporção

# 16:9 nos quatro

O vídeo entra num site scroll-driven; 16:9 é a proporção nativa de `<video>` em bloco de largura
total e é onde o Flow tem mais material de treino. O objeto é retangular-horizontal (1,26:1) e o
2×2 final é 60×48 (1,25:1) — ambos assentam confortavelmente em 16:9 com ar nas laterais, e esse
ar é onde a luz colorida vive.

- **Quadrado descartado:** obrigaria recorte no fim, quando o 2×2 precisa respirar.
- **Vertical descartado:** não é peça de social, é hero de site.
- **Mobile:** NÃO gerar de novo. Enquadrar os frames com margem lateral suficiente para um crop
  central 4:5 seguro e servir o mesmo master com `object-fit: cover`.

---

## 4. Os quatro prompts de imagem

**Bloco comum** (a série vive ou morre aqui — luz sempre de **cima-esquerda**, fundo sempre o
mesmo, escala sempre a mesma):

> Cinematic product macro of a single dark gunmetal object, isolated, centered, filling about 60%
> of frame. Deep charcoal-black seamless background, subtle vignette. Key light from upper left at
> 45 degrees, hard and narrow, raking across the surface to catch the relief. Cool blue rim light
> #005f96 along the right edge. Materials: dark anodized metal, fine brushed texture,
> micro-scratches, matte with controlled specular highlights. Shallow depth of field, 85mm macro
> look. No text, no logos, no lettering, no hands, no people, no studio grey gradient backdrop, no
> floating parts, no lens flare clutter. Photorealistic render, 16:9.

### 1 · Pistão

```
A single dark gunmetal plaque in the shape of a rounded rectangle, slightly wider than tall, corner radius about 20% of the side. Machined from solid dark anodized metal, edges softly beveled. Raised on its face, in low bas-relief, the shape of an automotive piston seen from the side: piston crown with three compression ring grooves at the top, connecting rod descending diagonally, small round eye at the rod end. The relief is part of the same metal, not printed. Cinematic product macro, object isolated and centered, filling about 60% of frame. Deep charcoal-black seamless background, subtle vignette. Key light from upper left at 45 degrees, hard and narrow, raking across the surface so the relief casts crisp shadows to the lower right. Cool blue rim light #005f96 along the right edge. Dark anodized metal, fine brushed texture, micro-scratches, matte with controlled specular highlights. Shallow depth of field, 85mm macro look. No text, no logos, no lettering, no hands, no people, no grey studio gradient, no floating parts. Photorealistic, 16:9. --ar 16:9
```

### 2 · Bloco de motor

```
A single dark gunmetal plaque in the shape of a rounded rectangle, slightly wider than tall, corner radius about 20% of the side. Machined from solid dark anodized metal, edges softly beveled. Raised on its face, in low bas-relief, the shape of a V-configuration engine block seen from above: broad V silhouette, two angled cylinder banks with visible bore circles, a small round pulley detail at the lower center. The relief is part of the same metal, not printed. Cinematic product macro, object isolated and centered, filling about 60% of frame, same size and position as the previous plaque. Deep charcoal-black seamless background, subtle vignette. Key light from upper left at 45 degrees, hard and narrow, raking across the surface so the relief casts crisp shadows to the lower right. Cool blue rim light #005f96 along the right edge. Dark anodized metal, fine brushed texture, micro-scratches, matte with controlled specular highlights. Shallow depth of field, 85mm macro look. No text, no logos, no lettering, no hands, no people, no grey studio gradient, no floating parts. Photorealistic, 16:9. --ar 16:9
```

### 3 · Suspensão / freio

```
A single dark gunmetal plaque in the shape of a rounded rectangle, slightly wider than tall, corner radius about 20% of the side. Machined from solid dark anodized metal, edges softly beveled. Raised on its face, in low bas-relief, two automotive suspension components side by side: on the left a vertical cylindrical shock absorber with a domed top and a mounting bracket at its base, on the right a finned brake drum seen from the side with vertical cooling ribs. The relief is part of the same metal, not printed. Cinematic product macro, object isolated and centered, filling about 60% of frame, same size and position as the previous plaque. Deep charcoal-black seamless background, subtle vignette. Key light from upper left at 45 degrees, hard and narrow, raking across the surface so the relief casts crisp shadows to the lower right. Cool blue rim light #005f96 along the right edge. Dark anodized metal, fine brushed texture, micro-scratches, matte with controlled specular highlights. Shallow depth of field, 85mm macro look. No text, no logos, no lettering, no hands, no people, no grey studio gradient, no floating parts. Photorealistic, 16:9. --ar 16:9
```

### 4 · Turbina — o único com verde, porque é o frame de fechamento

```
A single dark gunmetal plaque in the shape of a rounded rectangle, slightly wider than tall, corner radius about 20% of the side. Machined from solid dark anodized metal, edges softly beveled. Raised on its face, in low bas-relief, a turbocharger seen head-on: a circular housing ring containing a star-shaped impeller with radial blades converging at a central hub, and a small volute scroll outlet at the upper right. The relief is part of the same metal, not printed. Cinematic product macro, object isolated and centered, filling about 60% of frame, same size and position as the previous plaque. Deep charcoal-black seamless background, subtle vignette. Key light from upper left at 45 degrees, hard and narrow, raking across the surface so the relief casts crisp shadows to the lower right. Cool blue rim light #005f96 along the right edge, plus a single narrow lime green #90c140 accent glow catching the impeller blade tips only. Dark anodized metal, fine brushed texture, micro-scratches, matte with controlled specular highlights. Shallow depth of field, 85mm macro look. No text, no logos, no lettering, no hands, no people, no grey studio gradient, no floating parts. Photorealistic, 16:9. --ar 16:9
```

---

## 5. Os prompts do Flow (image-to-video)

**Quatro prompts, não um.** Movimento contínuo está descartado: cada imagem é o **primeiro
quadro** de um trecho, e um único prompt exigiria que o Flow inventasse a transição entre quatro
objetos diferentes — que é exatamente onde ele derrete a geometria. Quatro clipes de 2s com
movimento idêntico e corte duro no pico de brilho dão controle total e emenda invisível.

### Trecho 1 — pistão

```
The metal plaque rotates slowly to the right around its vertical axis, about 20 degrees over 2 seconds, catching the hard key light from the upper left. The engraved relief brightens as the light rakes across it. The blue rim light sweeps along the right edge. Camera locked, no zoom. Slow, heavy, mechanical motion with weight. Background stays black and empty.
```

### Trechos 2 e 3 — bloco de motor e suspensão

**Mesmo texto do trecho 1, sem alterar uma palavra.** É o que garante o movimento idêntico.

### Trecho 4 — turbina + revelação

```
The metal plaque rotates slowly to the right around its vertical axis, about 20 degrees, then settles and stops. The impeller blades catch a green accent glow. The camera slowly pulls back, revealing three more identical metal plaques arranging into a 2x2 grid, slightly wider than tall. Slow, heavy, mechanical motion. Camera pull-back is smooth and short. Background stays black and empty.
```

**Plano B para o trecho 4** (é o mais provável de falhar): gerar o trecho 4 **só com a rotação e
a parada**, e montar o 2×2 em pós (After Effects, ou CSS/GSAP direto no site). São quatro
retângulos posicionados — não precisa de IA para isso, e o resultado fica geometricamente exato
em vez de aproximado.

---

## 6. Os riscos

**1 · O gerador vai transformar o baixo-relevo em ícone chapado ou peça solta.**
É o risco número um e vai acontecer em boa parte das gerações. A frase
`The relief is part of the same metal, not printed` existe para combater isso; se ainda vier
chapado, reforce com `shallow bas-relief carved into the plaque surface, catching raking light,
casting its own shadow`. **Descarte sem dó:** uma imagem em que o pictograma virou adesivo mata o
conceito inteiro.

**2 · Os quatro não vão bater de primeira.**
Escala, ângulo do bevel e temperatura do metal vão variar. Mitigação: gerar **o trecho 1
primeiro, aprovar, e usá-lo como referência de imagem** (`--sref` no Midjourney, ou
image-to-image nos demais) para os outros três. **Nunca gerar os quatro em paralelo do zero** —
é assim que se produz quatro imagens bonitas que não formam série.

**3 · A proporção 1,26:1 vai virar quadrado.**
O gerador tende ao quadrado perfeito. Se vier quadrado nos quatro de forma **consistente**,
aceite — quatro quadrados coerentes são melhores que quatro retângulos inconsistentes. Corrija a
proporção no 2×2 final, que é composição em pós e é o momento em que o espectador compara com a
marca.

**4 · A cor pode estar errada, e esse é o risco caro.**
Não há cor no ativo, e a paleta vem de um template de prateleira com o verde majoritariamente em
`:hover`. Se o cliente aparecer com um cartão em, digamos, vermelho e prata, os quatro prompts
são refeitos. **Mitigação, e razão pela qual a direção é monocromática:** a cor entra só como
**luz de recorte**, não como cor de superfície. Trocar `#005f96` por outro hex em quatro prompts
é trabalho de dez minutos; se as placas fossem pintadas de verde, seria retrabalho total.
**Perguntar pela arte original ANTES de gerar.**

**5 · O Flow vai deformar o relevo durante a rotação.**
Os 20° são conservadores de propósito. Se ainda assim borrar, reduzir para 12° e compensar com
movimento de luz — `the key light sweeps across the static plaque` em vez de girar o objeto.
**Luz que se move sobre objeto parado é muito mais estável em image-to-video** que objeto que
gira, e lê quase igual.

**6 · Oito segundos de metal escuro girando é monótono sem áudio.**
A peça depende de sound design: quatro impactos mecânicos secos marcando os cortes e um sub grave
subindo até o assentamento. **Sem áudio, considere a peça 40% pronta.** Se ela for rodar muda no
hero do site (`autoplay muted`, o caso mais provável), **corte para 6 segundos eliminando o
trecho 3** — sem áudio, o quarto batimento cansa antes de chegar.

---

## 7. Ordem de produção

1. **Pedir ao cliente a arte original do logo** (AI/EPS/CDR/PDF) ou foto de aplicação impressa
   colorida. **Não gerar nada** antes da resposta ou de uma decisão explícita de seguir sem ela.
2. Gerar o **trecho 1 (pistão)**. Iterar até o baixo-relevo estar convincente e a silhueta
   arredondada correta. **Este frame é o padrão da série.**
3. Gerar os trechos 2, 3 e 4 **usando o frame 1 como referência de estilo** (`--sref` /
   image-to-image). Descartar tudo que não bater em escala e ângulo de luz.
4. Conferir os quatro **lado a lado em tira única** antes de animar. Se um destoar, refazer
   aquele — não ajustar os outros três.
5. Levar cada frame ao Flow com o prompt correspondente. 2s por trecho.
6. Montar com cortes duros no pico de brilho. Se o pull-back do trecho 4 falhar, montar o 2×2 em
   pós.
7. Sound design (4 impactos + sub). Sem áudio, cortar para 6s eliminando o trecho 3.
8. Exportar master 16:9 e validar o crop central 4:5 para mobile antes de subir.

---

## 8. Arquivos

| Arquivo | O que é |
|---|---|
| `hm_borcato_logo_ng.png` | Marca em cinza, 225×50. Bloco de ícones em 60×48 |
| `hm_borcato.png` | Wordmark, preto puro com alfa, 188×40 |
| `_icones_8x.png` | Ampliação 8× do bloco 2×2 — foi ela que permitiu ler os quatro pictogramas |
| `hm_borcato_representacao.jpg` | **Referência do que EVITAR.** Banco de imagem de peças em fundo cinza |

---

## 9. Observação da SoftHam, fora do escopo do especialista

Este vídeo é uma **peça de abertura** (preloader ou selo). Ele **não substitui** a fotografia
que o efeito escolhido pelo Fábio — a cápsula de canto do `lukebaffait.fr`,
`border-radius: 280px 0 0 280px` em 780×936px — exige. Aquela forma só funciona com imagem de
presença dentro; ícone animado não preenche aquele espaço.

**São duas produções distintas**, e o Fábio precisa saber disso antes de fechar o orçamento de
captação.
