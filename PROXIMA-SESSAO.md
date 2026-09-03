# Próxima sessão — 04/09/2026

## 1. O que pedir ao Fábio (destrava duas fases e a esteira)

### As fotos de evento — e existe um acervo pronto

O Instagram dele (`@representanteautopecas`) tem **192 posts**. É o acervo de eventos.

**Não raspar.** O Instagram bloqueia raspagem sem login desde 2021, e contornar viola os
termos de uso — o site é de cliente real e identificável, e o problema cairia no colo dele.

**O caminho certo:** ele é o dono da conta. Pedir a ele:
- **8 a 13 posts de evento** que ele mesmo escolha (feira, treinamento, visita, lançamento)
- Para cada um: **o que era, a cidade e o ano**
- Ou o arquivo de "Baixar suas informações" do Instagram, que vem com data e legenda

**Por que ele escolher é melhor que baixarmos tudo:** um representante sabe quais fotos o
mostram no meio certo. Das 192, muita coisa deve ser produto, que não serve à esteira.

**⚠️ Levantar com ele:** foto de evento tem gente que não é ele — pessoal de indústria,
distribuidores. Ou são pessoas que autorizaram, ou a foto é de plano aberto onde ninguém é
o assunto.

**Se vierem menos de 8:** a esteira acaba rápido demais e o gesto não se justifica. Aí é
composição estática, e se faz diferente.

### Os 20 minutos de conversa (fase 6)

Continua travando a fase 6 inteira. Por que saiu do escritório onde era gerente; a viagem
mais dura; o que responde ao distribuidor que pergunta o que ele faz.

### O logo em vetor

AI, EPS, CDR ou PDF. Trava a abertura com os quatro ícones (fase 4, opcional).

---

## 2. A COPY QUE ELE JÁ ESCREVEU, e que é melhor que a minha

A bio do Instagram dele:

> *"Representação consultiva no aftermarket de MG. Crescimento com ética, presença real e
> resultado do sell in ao giro."*

**"Presença real"** e **"do sell in ao giro"** são vocabulário do ofício — exatamente o que
falta no capítulo 01, e o que faz outro representante reconhecer que quem escreveu conhece
o negócio. **Usar isso na fase 6.**

E confirma a correção do escopo: ele mesmo se posiciona como **"aftermarket de MG"**.

---

## 3. Onde a esteira vai (decidido nesta sessão)

**No capítulo 01, não no 03.** O 03 já tem a cena das regiões acendendo; dois gestos fortes
disputariam. No 01 ela preenche o vazio e dá lastro ao texto.

E resolve um achado do júri que segue aberto: **não aparece outra pessoa além do Fábio no
site inteiro.** Foto de evento tem gente, aperto de mão, estande.

**A legenda é o que separa arquivo de galeria.** Medido no Norris: 10 das 13 fotos têm
legenda com ano. No caso dele — "Automec, São Paulo · 2024".

**Medidas da esteira** (de `qg/arsenal/TECNICAS.md`): 8 a 13 fotos, larguras entre 250 e
600px propositalmente desiguais, ~4.600px de trilho. A profundidade vem da desigualdade de
tamanho, não de 3D.

---

## 4. As fases que restam

| Fase | O quê | Prazo | Trava |
|---|---|---|---|
| **5 · Micro-interações** | CTA magnético, cursor com rótulo, miniatura na nav | 1 dia | **nada — é a próxima** |
| 6 · A história | frase dele, linha do tempo, equipe de 4, os dois públicos | 1 dia | a conversa |
| 7 · Portões | anti-cara-de-IA, fingerprint, 5 larguras, vídeo de submissão | 1 dia | por último |

**A fase 5 é a que mais muda a sensação de site caro por dia de trabalho** — hoje o cursor
é um círculo que não reage a nada. E não depende de ninguém.

### Guardadas, fora da fila
- **A esteira horizontal** — técnica medida, esperando o conteúdo
- **A abertura com os 4 ícones** — trava no logo em vetor (o arquiteto rebaixou para opcional)
- **O mapa no celular** — as regiões não acendem abaixo de 900px (`Estrada.tsx:59-65`)

---

## 5. Como retomar

```
cd E:\Sistemas_ia\borcato
npx vite dev --port 5180
```

O build de produção sai com `npx vite build`; o procedimento de publicação está em
`COMO-PUBLICAR.md`. **Atenção:** rodar o build derruba um servidor estático que esteja
servindo `.output/public` — o Windows não deixa apagar pasta em uso.

**Estado:** tudo commitado, portão limpo nas 5 larguras, 994 KB no disco e 667 KB no fio.
