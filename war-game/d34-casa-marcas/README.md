# D-34 · Casa → Marcas — alinhamento da passagem

## Estado

Executado em 10/09/2026 após a captura do dono mostrar Marcas entrando antes
de A Casa terminar. Escopo limitado à passagem entre os dois capítulos.

## Evidência observada

No viewport de 916 px, em `scrollY=1400`:

- `#cap-casa`: `top=340`, `bottom=1331`;
- `#cap-marcas`: `top=829`, `margin-top=-531px` (`-58vh`);
- sobreposição real: aproximadamente 502 px.

O mesmo `top` antecipado era usado por `CortinaMarcas` para calcular a entrada,
logo a cortina também começava cedo. A causa foi localizada no bloco
`.passagem-casa-marcas > .cap--marcas` de `src/styles.css`.

## Ação executada

Removidos o `margin-top: -58vh` de Marcas e o `position: sticky` de Casa. Os dois
capítulos voltam ao fluxo normal, sem uma cena anterior presa sob a seguinte.
A cortina permanece independente e começa quando Marcas realmente chega à janela.

## Piloto no navegador

Após o hot reload, três pontos foram conferidos em viewport de 916 px:

| scrollY | Casa (top…bottom) | Marcas (top…bottom) | Cortina |
|---:|---:|---:|---|
| 1708 | 32…1024 | 1058…5421 | fechada |
| 1959 | −219…773 | 800…5163 | abrindo |
| 2295 | −555…437 | 442…4805 | recuando |

Em todos os pontos, Marcas começa depois do fim de Casa; não houve colisão de
conteúdo. A captura do ponto intermediário mostrou o painel cobrindo a troca,
sem o título da Casa por baixo.

## Critérios de saída

- Marcas não pode ter `top` menor que o `bottom` de Casa no início da passagem.
- Casa não pode permanecer `sticky` enquanto Marcas entra.
- A cortina deve continuar visível durante a entrada de Marcas.
- Nenhuma alteração em Hero, mapa, peças, conteúdo ou responsividade fora desta
  passagem.

## Aborto / recuperação

Se a cortina desaparecer ou a prancha voltar a sair antes do último card, reverter
este commit e abrir uma nova decisão; não reintroduzir margem negativa por ajuste.
