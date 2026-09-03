# A foto nova do Fábio — briefing de geração

**Decidido em 03/09/2026 com o dono.** O Fábio gostou do efeito do lukebaffait.fr, e a
foto atual (`src/assets/site/fabio-escuro.jpg`) é de estúdio, limpa, olhando para a
câmera. A nova deve ter o Fábio **olhando para o lado**, como o Luke no print.

---

## Por que a imagem, e não só o CSS

O tratamento em CSS já está no site (grão, vinheta, aberração cromática reagindo ao
scroll) e está calibrado — mas ele tem teto. **O rastro do print do Luke é fotográfico:
vem de exposição longa com movimento real diante da lente, não de pós-processamento.**
Nenhum filtro reproduz isso, porque o borrão do original tem informação que a foto
parada não tem: o rosto ocupou duas posições enquanto o obturador estava aberto.

Então a divisão é: **o peso vem na imagem, o CSS faz o acabamento e o movimento.**

Quando a imagem nova chegar, é só trocar o arquivo em `src/assets/site/` e apontar o
`import` em `HeroTravessia.tsx`. Nada mais muda.

---

## O que preservar (não negociável)

- **É o Fábio.** Mesma pessoa, mesmo rosto, reconhecível por quem o conhece. Barba,
  cabelo e compleição iguais.
- **A camisa clara com o logo bordado da H.M. Borçato** — é a marca dele no peito.
- **O fundo escuro.** A cápsula é recortada sobre `#0a0a0c`; fundo claro não funciona.
- **A proporção 780 × 936** (a cápsula é `aspect-ratio: 780/936`). Gerar maior nessa
  mesma proporção — 1560 × 1872 é o ideal, para a tela retina.
- **Enquadramento vertical**, sujeito da cintura para cima, com **espaço negativo à
  esquerda** — é por lá que o título passa.

## O que muda

- **Olhando para o lado**, não para a câmera. De perfil parcial (3/4), o olhar saindo
  do quadro. É o que dá a leitura de "quem está a caminho", que é a direção do site.
- **Luz lateral dura**, recortando o rosto contra o fundo. A foto atual tem luz de
  estúdio chapada.
- **Rastro de exposição longa**: um fantasma do rosto/ombro deslocado para um lado,
  como se ele tivesse se movido durante a exposição.

---

## Prompt (para Flow / Nano Banana / Seedream — image-to-image a partir da foto atual)

> Cinematic portrait of the same man from the reference photo, preserving his exact
> facial features, beard, and hairstyle. He is now turned in three-quarter profile,
> looking off-frame to the side, not at the camera. He wears the same light blue
> button-up work shirt with the embroidered chest logo. Deep black background.
> Hard directional key light from one side carving his face out of the darkness,
> strong falloff into shadow. Long-exposure motion blur: a soft ghosted double of his
> head and shoulder trailing to one side, as if he moved while the shutter was open.
> Subtle chromatic aberration on the high-contrast edges. Fine 35mm film grain.
> Vertical composition, subject from the waist up, positioned to the right of frame
> with negative space on the left. Moody, editorial, analog film look.
> Aspect ratio 780:936.

### Negativos
> looking at camera, studio softbox lighting, white or light background, full-body,
> horizontal composition, different person, cartoon, illustration, text, watermark,
> oversaturated colors, red or green color cast

---

## Aviso sobre a cor

**A identidade é AZUL** (`#005f96`), provada no logo bordado da camisa dele — o verde
do site antigo era `:hover` de template comprado. Se o gerador devolver a imagem com
dominante vermelha (como o print do Luke, que é vermelho), **rejeitar**: o print serve
de referência de TÉCNICA, não de cor. Ver `qg/clientes/borcato.md`.

---

## Como conferir antes de aceitar

1. Alguém que conhece o Fábio o reconhece? Se não, descartar — não adianta ser bonito.
2. O logo bordado continua legível no peito?
3. O fundo é escuro o bastante para sumir no `#0a0a0c` da cápsula?
4. Há espaço negativo de um lado para o título respirar?
5. A dominante de cor é neutra ou azulada — nunca vermelha ou esverdeada.
