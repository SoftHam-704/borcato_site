# O que pedir ao Veo 3.1 — v2

**Por que existe uma v2:** a primeira geração foi medida contra os 5 quadros que estão no
site hoje, e perdeu em duas frentes. Não é opinião — são números:

| | Giro acumulado da cabeça | Aproveitamento do quadro |
|---|---|---|
| Os 5 quadros do site hoje | **39,8** | vertical, cheio |
| Vídeo v1 (Veo, 16:9) | **8,3** | sujeito em **37%** da largura |

Ou seja: gira **4,7× menos** e desperdiça **63% do quadro**.

---

## 1. Mude o Aspect ratio para 9:16 (o ajuste que mais rende, e é um clique)

**Está na barra lateral direita, hoje em 16:9.**

A cápsula do site é **vertical** (780 × 936). Um vídeo 16:9 recortado para vertical joga
fora ~53% da largura — por isso o Fábio sai pequeno. Em 9:16 ele ocupa o quadro inteiro, e
os mesmos 720p passam a valer muito mais pixel útil no rosto.

> **Resolução não é o gargalo.** A cápsula usa 880px de largura; 720p em 9:16 já sobra.
> Enquadramento é o gargalo.

## 2. Trave a amplitude pela IMAGEM FINAL, não pelo texto

Você já está usando referência de **início → fim** (os dois retratos com a seta). Esse é o
modo certo — mas ele é só tão forte quanto a diferença entre as duas pontas.

**Se as duas referências forem parecidas, o vídeo interpola pouco.** Foi o que aconteceu:
pedir "75 graus" em texto não vence uma imagem final que mostra menos que isso.

- **Quadro inicial:** o Fábio de frente, como está hoje.
- **Quadro final:** o Fábio **já em perfil de 3/4**, com a amplitude que você quer ver.
  Se não existir essa foto, gerar antes uma imagem estática dele virado e usá-la como fim.

**A direção:** o v1 virou para a **direita** (medido). Se você quer para a esquerda,
**quem decide é o quadro final** — a imagem vence a frase quando as duas discordam.

## 3. O gesto tem que ocupar os 8 segundos inteiros

**Medido no v1:** o giro acontece de **0,5s a 3,75s**. Os 4,25s restantes ele fica parado
e depois **volta ao início**.

Isso é grave para o nosso uso: o site esfrega os quadros com a rolagem. Se o vídeo volta,
o Fábio vira a cabeça e **desvira** enquanto o visitante rola — o gesto se desfaz sozinho.
(A ferramenta da casa detecta e corta a volta, mas cortando sobra metade do material.)

**No prompt, explicitamente:**
> The rotation is slow, continuous and one-way across the entire 8 seconds. He does NOT
> return to the starting position. The last frame is the most turned.

## 4. O corpo travado — em maiúsculas

Isto já é regra da casa e funcionou no v1 (corpo passou em todos os pares). **Manter:**

> HIS SHOULDERS, ARMS AND TORSO DO NOT MOVE AT ALL — the crossed arms, shirt folds, watch
> and tattoo stay in exactly the same position, pixel for pixel. Only the head and neck
> rotate.

Corpo parado é o que impede o scrub de tremer.

---

## O prompt, pronto para colar

> Only the man's head and neck rotate. HIS SHOULDERS, ARMS AND TORSO DO NOT MOVE AT ALL —
> the crossed arms, shirt folds, watch and tattoo stay in exactly the same position, pixel
> for pixel.
>
> He turns his head slowly and continuously from facing the camera to a three-quarter
> profile, following the final reference image. The rotation is one-way and spans the
> entire 8 seconds — he does NOT return to the starting position, and the last frame is
> the most turned.
>
> Lighting, background and framing stay identical throughout. No camera movement, no zoom,
> no change of expression.

**Configuração:** Aspect ratio **9:16** · duração 8s · 24fps · 720p (não precisa mais).

---

## Como conferir quando chegar (antes de virar código)

```
python qg/ferramentas/video-para-frames.py <video> 5 880 30
```

Ele responde as três coisas, medindo:

1. **`giro total`** — precisa passar de **39,8** para valer a troca. O v1 deu 18,9.
2. **`corpo parado`** — tem de dar OK em todos os pares.
3. **`janela útil`** — se disser algo como "0,5s a 3,75s", o gesto ainda está encolhido e
   parte do vídeo foi desperdiçada. O ideal é a janela cobrir quase os 8s.

**O peso não é preocupação:** o v1 já saiu em **53 KB os cinco quadros**, contra 546 KB dos
que estão no site. Sobra folga de 10×.
