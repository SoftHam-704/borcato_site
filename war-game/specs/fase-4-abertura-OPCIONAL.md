# Spec — FASE 4 (OPCIONAL): abertura com os quatro icones

> **Este war game recomenda NAO fazer esta fase nesta rodada.** Leia o porque antes de
> comecar. Se o humano decidir fazer mesmo assim, as travas abaixo sao obrigatorias.

**Pre-requisito:** **I-01 desbloqueado** (logo em vetor: AI, EPS, CDR ou PDF) · F6 concluida.
**Duracao estimada:** 2 dias.

---

## Por que este war game recomenda pular

1. **Trava em terceiro sem prazo.** O logo em vetor depende do Fabio (I-01).
2. **E a unica fase que substitui peca aprovada.** A abertura atual
   (`src/components/site/Abertura.tsx`) foi construida depois de o dono apontar que ficar
   *sem nada* no lugar do preloader era o erro. Risco de regressao alto, ganho estimado
   baixo (+0,5).
3. **O material de origem e fraco.** `marca/_icones_8x.png` e um raster de aproximadamente
   400px **ja upscalado 8x**. Vetorizar isso da contorno chapado — e piston, motor, roda e
   pastilha em caixinha arredondada e exatamente o vocabulario que o portao
   anti-cara-de-IA condena.
4. **Nao resolve o que o achado 3 reclama.** A queixa e que a abertura "segura 3,4 s".
   Trocar por outra abertura de 3,4 s nao resolve nada. Se o problema e o tempo, isso e a
   decisao **D-07** e custa uma linha — nao uma fase de dois dias.

---

## Se for feita mesmo assim: as tres travas

### 1. Nao apagar a abertura atual
Construir a nova **em paralelo**, atras de uma chave, e comparar as duas com o dono antes
de trocar. `git checkout` nao e plano de contingencia suficiente aqui: a comparacao tem de
ser possivel lado a lado.

### 2. Criterio de aborto imediato
Se os icones vetorizados lerem como **icone de biblioteca**, a fase morre ali. Nenhuma
quantidade de polimento conserta isso, e o portao anti-cara-de-IA reprova.

### 3. O contrato da abertura atual continua valendo
De `Abertura.tsx`:
- quatro tempos, **3,4 s no total** (`TEMPOS`, linhas 23-28) — a nova nao pode passar disso
- botao **Pular** (`:106`) e tecla **Esc** (`:64-66`)
- o evento `hmb:abriu` (`:43`) — **o hero depende dele** para comecar a escrever o titulo
  (`HeroTravessia.tsx:50-60`). Se a abertura nova nao disparar esse evento, o titulo so
  aparece pelo fallback de 4,5 s
- reduced-motion pula a abertura inteira (`:47-52`)

---

## Criterios de saida

- [ ] os 4 icones vem de **vetor real**, nao de raster vetorizado
- [ ] a abertura nova nao passa de 3,4 s
- [ ] Pular e Esc funcionam
- [ ] o evento `hmb:abriu` continua sendo disparado no instante certo
- [ ] reduced-motion pula
- [ ] o dono comparou as duas e escolheu
- [ ] G1-G10 mantidos

## Ao terminar

```
Nao implemente ainda. Nao replaneje do zero.
Atualize ledger e README. Pare ao final da fase.
```
