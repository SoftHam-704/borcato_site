# Ledger

- D-22 aprovado pelo dono em 09/09/2026 para P22-A e P22-B.
- Evidência inicial: inspeção visual rolada em 1440; Casa ficou parada entre scrolls
  1971 e 2675 e Marcas entrou quase pronta por volta de 3347.
- Evidência inicial: a abertura completa fica visualmente resolvida apenas depois de
  mais de quatro segundos, pois cortina, cápsula e palavras têm tempos independentes.
- O logo de cada indústria não será tratado nesta rodada.
- O diretório `ferramentas/vistoria/` é do usuário e não pode ser alterado nem incluído.
- P22-A executado: a marca entra na fase própria aos 120 ms; a cortina começa aos
  900 ms, sai aos 1,8 s e o hero conclui sua leitura na mesma entrega. O cursor
  permanece oculto durante a abertura. `Pular` foi verificado até o estado final.
- P22-B executado: `--painel-marcas` é derivado da âncora estática
  `.marcas-inicio`. Em leitura local, no painel a 49%, Marcas estava em y=372 px
  com a esteira em x=0; depois do assentamento, a esteira passou a deslocar.
- Verificações: `npm run build` passou; console local sem erros ou avisos.
