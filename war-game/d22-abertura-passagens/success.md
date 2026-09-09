# Critérios de sucesso

## P22-A · Abertura → hero

- A primeira informação surge em até 250 ms; não há quadro de espera vazio.
- Da primeira marca visível ao hero completamente legível: 2,0–2,4 s em 1440 e 375.
- O retrato, a cápsula e a primeira linha do hero compartilham a mesma entrega; não há
  uma segunda entrada longa depois que a cortina termina.
- O cursor decorativo não aparece durante a abertura.
- `Pular`, Esc e `prefers-reduced-motion` continuam funcionais.

## P22-B · Casa → Marcas

- A Casa fica legível até a prancha cobrir ao menos 75% da viewport.
- A prancha sobe como superfície única; o trilho não inicia deslocamento lateral antes
  que a superfície esteja assentada.
- Não há quadro vazio, corte de fundo ou texto atravessando a borda da prancha.
- A volta por scroll reproduz o gesto de modo reversível.

## Não fazer

- Não instalar GSAP, Three, Motion ou biblioteca visual.
- Não tocar em Peças → Estrada, conteúdo, marcas, assets, hero estacionado ou fotos.
- Não usar `height`, `top`, `margin` ou `padding` como animação.

## Resultado da rodada (09/09/2026)

- P22-A aprovado em navegador local: a fase da marca inicia aos 120 ms, a cortina
  inicia aos 900 ms e desaparece aos 1,8 s; o hero recebe o mesmo evento e termina
  sua leitura por volta de 2,2 s. O cursor não participa da abertura e `Pular`
  chega ao hero sem deixar a camada presa.
- P22-B aprovado em navegador local: o painel usa uma âncora de fluxo e não mede a
  própria caixa transformada. A prancha permaneceu em `x=0` durante a subida e
  começou sua viagem lateral somente após a cena se assentar.
- A variante de movimento reduzido preserva Marcas sem translação vertical e a
  esteira livre, conforme o contrato existente.
