# A foto nova do Fábio — briefing de geração (v2, em passos)

**Decidido em 03/09/2026 com o dono.** O Fábio gostou do efeito do lukebaffait.fr, e a
foto atual é de estúdio, limpa, olhando para a câmera. A nova deve ter o clima do print
do Luke — o rosto recortado pela luz, com rastro de exposição longa.

> **Por que esta v2:** a v1 pedia tudo num prompt só (pose + luz + rastro + aberração +
> grão). O Nano Banana não trabalha assim — ele é bom em **uma edição por vez**, cada
> uma partindo do resultado da anterior. E pedir para girar a cabeça é o tipo de coisa
> que faz ele trocar a pessoa. Aqui vai em passos, do mais seguro ao mais arriscado.

---

## A imagem de partida

**`S:\Borçato\WhatsApp Image 2026-09-01 at 07.54.32.jpeg`** (1067 × 1600, corpo inteiro).

**Não** partir de `src/assets/site/fabio-escuro.jpg` — aquilo já é um recorte meu em
780×936, com menos resolução e sem margem para reenquadrar.

**Boa notícia:** nessa foto o corpo dele já está em 3/4 e o rosto já está levemente
virado. **Metade do que a v1 pedia já existe** — não é preciso girar a cabeça, só
desviar o olhar. Isso reduz muito o risco de o gerador trocar a pessoa.

---

## Os passos, nesta ordem

Cada passo parte do **resultado aprovado do anterior**. Se um passo estragar a
semelhança, voltar ao anterior e seguir sem ele — os primeiros já entregam muito.

### Passo 1 — a luz (o que mais muda, e o mais seguro)

> Keep the man's face, beard, hair, and clothing exactly as they are. Do not change his
> identity or facial features. Relight the scene: a single hard directional key light
> from the left side, carving his face and shoulder out of the darkness, with deep
> shadow falloff on the opposite side. Background pure black. Moody, cinematic,
> editorial lighting.

Este passo sozinho já tira a cara de estúdio. **Se só ele der certo, já valeu.**

### Passo 2 — o olhar

> Keep everything identical. Change only his gaze: he now looks off to the side, away
> from the camera, eyes directed out of the frame. Head stays in the same position —
> only the eyes and a slight chin turn change.

Pedir **só os olhos e um leve giro de queixo** é muito mais seguro que pedir 3/4 de
perfil. Se ele começar a virar a cabeça toda e o rosto mudar, aceitar só o olhar.

### Passo 3 — o rastro de exposição longa (o passo arriscado)

> Keep the man sharp and in focus. Add a long-exposure ghosting effect: a soft,
> semi-transparent duplicate of his head and shoulder trailing to one side, as if he
> moved slightly while the shutter stayed open. The trail should be subtle and fade
> out; his face must remain sharp and clearly readable.

**Este é o que pode falhar.** Se o Nano Banana borrar a imagem inteira ou desfigurar o
rosto, **pular** — a aberração cromática e o grão já estão no CSS do site, e o rastro é
o único que ele não faz. Melhor sem rastro e com o Fábio reconhecível.

### Passo 4 — enquadramento (pode ser feito à mão, sem IA)

Recortar para **780 × 936** (ou 1560 × 1872 para retina), sujeito da cintura para cima,
**deslocado para a direita, com espaço negativo à esquerda** — é por lá que o título
passa. Esse recorte não precisa de gerador: qualquer editor faz, e sem risco.

---

## Se o Nano Banana não chegar perto

Alternativas, em ordem de esforço:

1. **Aceitar menos.** Passos 1 + 2 + 4, sem o rastro. O CSS do site já dá grão, vinheta
   e aberração — e reagindo ao scroll, o que o print estático do Luke nem tem.
2. **Outro gerador para o passo 3.** Seedream e Flux Kontext costumam ir melhor em
   efeito de movimento; o Nano Banana é melhor em preservar pessoa.
3. **Fotografar de novo.** O efeito do Luke é uma técnica de câmera simples: velocidade
   baixa (1/4 s), sujeito se movendo devagar, flash no fim da exposição. Qualquer
   fotógrafo de retrato faz. Se o Fábio topar 20 minutos de estúdio, sai melhor que
   qualquer geração — e a foto passa a ser dele de verdade.

---

## O que preservar (não negociável)

- **É o Fábio.** Reconhecível por quem o conhece. Se não for, descartar — não adianta
  ficar bonito.
- **A camisa clara com o logo bordado da H.M. Borçato** — é a marca dele no peito.
- **Fundo escuro**, para sumir no `#0a0a0c` da cápsula.
- **Proporção 780 × 936**, vertical.
- **Espaço negativo à esquerda**, para o título.

## Aviso sobre a cor

**A identidade é AZUL** (`#005f96`), provada no logo bordado da camisa — o verde do site
antigo era `:hover` de template comprado. O print do Luke é **vermelho**: serve de
referência de **técnica**, não de cor. Se vier com dominante vermelha, rejeitar.

## Conferência antes de aceitar

1. Alguém que conhece o Fábio o reconhece?
2. O logo bordado continua legível no peito?
3. O fundo é escuro o bastante?
4. Há espaço negativo de um lado?
5. A dominante é neutra ou azulada — nunca vermelha nem esverdeada.

---

## Quando a imagem chegar

Trocar o arquivo em `src/assets/site/` e apontar o `import` em `HeroTravessia.tsx`.
O tratamento de CSS (grão, vinheta, aberração reagindo ao scroll) já está pronto e
calibrado — pode ser que com a imagem nova ele precise **diminuir**, para não somar
tratamento sobre tratamento. É um número: `--sep` e `--filme` em `HeroTravessia.tsx`.
