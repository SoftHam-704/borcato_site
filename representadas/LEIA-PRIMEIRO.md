# Representadas da H.M. Borçato — recorte monocromático

**Feito em:** 2026-09-03.
**Origem dos arquivos:** extraídos do PDF `Carta de apresentação HM Borçato - Agosto.26
Fábio.pdf`. Os 12 ativos foram filtrados pelo próprio Fábio (WhatsApp, 01/09).

---

## O que existe aqui

| Pasta | Conteúdo |
|---|---|
| `ativas/` | Os 12 logos originais, recortados do PDF e renomeados |
| `descartadas/` | Os 6 que o Fábio não incluiu (Cyclo, Airpure, Novonol, Quimi Vida, Universal, GPS) + a assinatura de e-mail dele |
| `mono/` | **Os 12 recortes monocromáticos creme** — é o que vai para o site |
| `_medidas.json` | Proporção e peso de densidade por marca, para a normalização |
| `_FOLHA-CONTATO.png` | As 22 imagens brutas do PDF, para conferência |
| `_MONO-FOLHA.png` | Os 12 monocromáticos lado a lado |
| `_PAREDE-card3.png` | **Prova visual com a normalização aplicada em card 3,00** |

---

## O que os arquivos eram — NÃO REMEDIR

Medido antes de converter:

- **10 dos 12 são retângulos brancos chapados.** Só `cofran` e `pysko` têm alfa.
- **`filtros-brasil` é o caso invertido:** fundo azul-marinho `(10,28,43)`, 63,8% escuro,
  marca clara sobre escuro.
- Proporções de **1,31** (VP) a **7,00** (Auto América).
- Densidade de traço: **0,121** (Sintech) a **0,579** (VP). Mediana **0,246**.

É o mesmo quadro da parede da SoftHam, e por isso o tratamento é o mesmo.

---

## O conversor

Detecção de fundo pela **mediana da moldura** (funciona para branco e para escuro, sem
lista manual), normalização pelo pico da própria imagem, piso de 0,16 para matar sombra e
serrilhado, expoente 0,78 para devolver peso aos meios-tons.

**Três casos especiais tratados:**

1. **`cofran` e `pysko` já têm alfa** — o alfa deles *é* o recorte. Só recolorir. Passar
   pela detecção de fundo estragaria.
2. **`hexlub`** tinha a bandeirinha do Brasil virando um retângulo cinza sujo. As cores
   da bandeira entram como "fundo extra" e somem.
3. **`ntn-snr`** tinha o SNR em branco sobre bloco azul — o bloco virava mancha sólida.
   O azul entra como fundo extra e o SNR vira contorno.

**`meca-brazil` e `sintech`** receberam piso mais alto (0,34 e 0,30) porque têm esferas
de gradiente 3D. Melhorou, mas **não resolveu** — ver limitação abaixo.

---

## A normalização de tamanho

Mesma fórmula da SoftHam: iguala a **área de tinta**, não a caixa.

```
largura = √(φ · k² · proporção_do_logo / proporção_do_card)
altura  = √(φ · k² · proporção_do_card / proporção_do_logo)
depois:  fator = min(1, TETO/largura, TETO/altura)
```

φ = 0,30 · k travado em 0,72–1,38 · TETO = 0,88.

### O card aqui é 3,00, não 1,60 — e isso é uma diferença real

| card | razão de tinta máx/mín | travados no teto |
|---|---|---|
| 1,30 | 3,35× | 5 |
| 1,60 | 2,72× | 4 |
| 2,20 | 1,98× | 4 |
| 2,60 | 1,67× | 3 |
| **3,00** | **1,45×** | **1** |

Na SoftHam o melhor foi card 1,60 com 1,69×. Aqui o melhor é **3,00 com 1,45×** — melhor
que lá. O motivo é que **estas marcas são muito mais horizontais**: Auto América tem
proporção 7,00, NTN-SNR tem 6,18, Sintech 4,54, Nidec 4,49. Card quadrado desperdiça e
força a trava; card largo acompanha a forma natural delas.

**Não copiar o 1,60 da SoftHam para cá.** O número saiu de medição, não de convenção.

---

## Limitações conhecidas — não tentar "consertar" com script

**`meca-brazil` e `sintech` têm esfera de gradiente 3D** que em monocromático vira uma
bolha escura. Piso mais alto atenuou, mas o problema é de origem: um degradê esférico não
tem contorno, e o recorte monocromático depende de contorno. É o mesmo caso do TDM na
parede da SoftHam.

Duas saídas, se incomodar:
1. **Pedir o logo em vetor à indústria.** Nidec e NTN-SNR são multinacionais e têm kit de
   marca público; provavelmente Meca e Sintech também.
2. Aceitar. Em card largo e com opacidade de repouso baixa, a esfera lê como marca, não
   como defeito.

---

## Qualidade dos originais

Os logos vieram de dentro de um PDF: o maior tem 343px de largura, o menor 161px.
**Servem para protótipo, não para produção final em tela cheia.**

O tratamento monocromático mitiga isso — foi por isso que funcionou com os 35 logos ruins
da SoftHam — mas se a parede for ocupar tela inteira em 1440px, vale pedir vetor às
indústrias antes de publicar.

---

## 🔒 DECISÃO TRAVADA — NÃO REABRIR

**As 11 marcas que o Fábio pediu são as que vão ao site. Fim.**

Auto América · Cofran · Filtros Brasil · Hexlub · Mundial Prime · Nidec · NTN-SNR ·
Pysko · Sintech · VP · Meca Brazil

O cliente escolheu essa lista e **tem os motivos dele** — contrato, exclusividade,
negociação em andamento, relação comercial. Não é papel nosso auditar a escolha dele.

> **Para o meu outro eu:** eu (Fable) reabri esta questão DUAS vezes depois de fechada,
> trazendo o cadastro do sistema (20 indústrias) e depois o painel de faturamento de 2026
> (20 marcas, incluindo PERFECT com R$ 2,4 mi). O dono teve de me corrigir:
> *"o que você não entendeu ou está teimando é que ele pediu para inserir apenas as
> indústrias que ele pediu."*
>
> **Ter acesso ao sistema do cliente não nos dá autoridade sobre as decisões comerciais
> dele.** Se aparecer divergência entre o que o sistema mostra e o que o cliente pediu,
> **vale o que o cliente pediu**, e não se pergunta de novo.

## Histórico (só registro, sem ação)

O dono da SoftHam confirmou: **valem as marcas que o Fábio mandou pelo WhatsApp**
(01/09, 08:14 e 08:23), incluindo a Meca. Tudo o mais deve ser **DESCONSIDERADO POR
COMPLETO**.

**As 11 oficiais:** Auto América · Cofran · Filtros Brasil · Hexlub · Mundial Prime ·
Nidec · NTN-SNR · Pysko · Sintech(-Blintech) · VP · **Meca Brazil**

> ⚠️ **NÃO usar a tela de cadastro do sistema como fonte.** Em 03/09 o dono mandou um
> print do módulo "Indústrias" com **20 indústrias ativas**, que NÃO bate com a lista
> acima. Ele decidiu que a lista do WhatsApp é a verdade para o site.
>
> Para registro, e para ninguém "corrigir" isso depois achando que faltou coisa: o
> cadastro trazia também Aeroflex, Automaxx, CGD, Cyclo, GPS Gueparts, Partflex,
> Quimicar, Radibras, Thega, Universal e WIR. **Nenhuma delas vai ao site.**
>
> Dois detalhes que o cruzamento revelou e que ficam anotados sem virar ação:
> - No cadastro, `CYCLO` tem razão social **AUTOAMERICA LTDA** — são a mesma empresa. O
>   Fábio pediu para tirar Cyclo e manter Auto América, o que é coerente.
> - A razão social da **Cofran** aparece como "EM RECUPERAÇÃO JUDICIAL". Isso **não vai
>   para o site**, mas está registrado porque é informação que existe no cadastro dele.

Parede renderizada com a lista oficial: `_PAREDE-OFICIAL.png`.

---

## Pendência com o cliente

O Fábio escreveu **"Sintech-Blintech"** como um item só na lista. Na carta são **dois
logos distintos**. Separei os dois, mas:

> **É uma empresa com duas marcas, ou são duas representadas diferentes?**

Decide se o site diz **11 ou 12 representadas**. Não publicar o número antes da resposta.
