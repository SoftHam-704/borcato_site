# D-36 — Recuperação final de apresentação

## Estado

**AGUARDANDO GATE HUMANO. Nenhuma implementação foi autorizada nesta rodada.**

Este pacote transforma a auditoria visual de 10/09/2026 em uma recuperação curta,
mensurável e reversível. O objetivo imediato é deixar o site seguro para uma
apresentação ao cliente. A ambição de prêmio continua como direção de qualidade,
mas não pode justificar novas regressões.

## Escopo proposto

1. corrigir a abertura em 375 px sem alterar a pausa aprovada de 2 s após 2026;
2. substituir a faixa preta entre Estrada e O Nome por um painel real de O Nome;
3. fazer a passagem Casa → Marcas carregar o primeiro quadro verdadeiro da seção,
   sem manchete duplicada em uma cortina decorativa;
4. garantir um único estado ativo da navegação durante cada passagem;
5. preservar Hero, conteúdo, mapa, palco de peças, fecho e ativos de logotipo.

## Decisão necessária

**D-36**

- **A — estabilização dirigida, recomendada:** executar os quatro consertos acima,
  em dois pilotos independentes e com no máximo duas tentativas por costura.
- **B — reescrever todo o sistema de cenas:** maior teto criativo e risco alto de
  perder o que já funciona no prazo atual.
- **C — retirar as passagens complexas:** usar cortes e fades simples; é a saída de
  contingência caso os pilotos da opção A reprovem.

Recomendação: **A**. Ela corrige o que o cliente consegue perceber como defeito sem
reabrir mapa, copy, conteúdo comercial ou a composição final do Hero.

## Ordem de leitura

1. `success.md`
2. `ledger.md`
3. `risks.md`
4. `WAR-GAME.md`
5. `specs/recuperacao.md`
6. `outputs/fases/f1-auditoria.md`
7. `outputs/pilotos/p36-proposta.md`

## Dono da decisão

O dono do projeto aprova D-36 e o cliente valida a apresentação final. O executor
não pode ampliar o escopo durante os pilotos.

