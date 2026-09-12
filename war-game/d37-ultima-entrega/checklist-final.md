# Checklist final do projeto

## P0 — obrigatórios antes de apresentar como final

- [ ] Percorrer o site inteiro em 375, 768, 1024, 1440 e 1920 px, ida e volta.
- [ ] Confirmar que nenhuma costura cria painel vazio, faixa preta, texto cortado ou dois capítulos visíveis ao mesmo tempo.
- [ ] Confirmar que o capítulo 02 só começa a andar depois de sua introdução e que um gesto comum troca aproximadamente uma peça.
- [ ] Confirmar mapa: rota começa em 0 ao entrar, cresce monotonicamente até 1 e só inicia a saída depois de permanecer completo.
- [ ] Confirmar abertura: 2026 permanece 2 s, a saída não mistura preloader e Hero, e o refresh volta ao topo.
- [ ] Confirmar Hero: título inteiro, sem “O” órfão, e “NOME” legível diante da marca d’água em desktop e mobile.
- [ ] Validar fecho com Fábio frontal, CTA, contatos e contraste em todos os tamanhos.
- [ ] Aprovar copy, nomes das indústrias, contatos, links e afirmações comerciais com o cliente.

## P1 — acabamento que decide a percepção do cliente

- [ ] Dar identidade própria às costuras restantes: cada capítulo precisa ter um gesto visual claro sem repetir a mesma máscara em sequência.
- [ ] Animar a entrada dos textos por blocos (rótulo, título, corpo e CTA), ligada ao progresso da própria cena e com estado final explícito.
- [ ] Refinar o preloader: ritmo legível dos anos, pausa após 2026 e passagem para o Hero com continuidade de luz, sem faixa branca abrupta.
- [ ] Substituir logotipos raster pelos SVGs oficiais, normalizando viewBox, proporção, área de respiro, altura óptica, contraste e fallback.
- [ ] Conferir que a prancha não invade a navegação, não corta cards e não deixa logos fora da área útil.
- [ ] Revisar contraste, foco de teclado, nomes acessíveis, ordem de tabulação e `prefers-reduced-motion`.

## P2 — fechamento técnico antes da publicação

- [ ] Corrigir os 10 avisos reais de Fast Refresh e o `no-empty`; tratar CRLF/Prettier em rodada separada.
- [ ] Verificar título, descrição, Open Graph, favicon, URL canônica e imagem social.
- [ ] Medir carregamento em aparelho móvel real: LCP, CLS, peso das imagens e lazy loading.
- [ ] Testar Chrome, Edge e Safari atuais, além de toque sem roda do mouse.
- [ ] Gerar build de produção e testar o artefato publicado.
- [ ] Confirmar domínio, HTTPS, rotas de fallback, analytics e formulário de contato.

## Fora desta última entrega

Não reescrever a arquitetura, trocar copy sem aprovação, adicionar biblioteca de animação,
reabrir o relógio do mapa, alterar a pausa de 2 s ou versionar `ferramentas/vistoria/`.

