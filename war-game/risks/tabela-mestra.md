# Tabela mestra de riscos — Borcato

Probabilidade e impacto: **A**lta · **M**edia · **B**aixa.
"Quem decide" e quem tem autoridade para escolher a contra-acao — o executor **nunca**
decide onde estiver escrito HUMANO.

---

## 1. Riscos de PROJETO (os que matam a entrega)

| # | Risco | P | I | Como detectar | Como recuperar | Quando parar | Quem decide |
|---|---|---|---|---|---|---|---|
| R-01 | **A nota 8,3 e autoavaliacao, nao veredito.** 6,8 e 8,3 saem de um agente lendo o proprio site; nao ha calibragem externa | A | A | nao ha instrumento — este e o ponto | trocar a meta pelas provas P1/P2/P3 do `success.md` | antes de F1 | HUMANO (D-02) |
| R-02 | **Nao existe caminho de publicacao.** `.output/public/` nao tem `index.html`; ha `wrangler.json` e servidor de 1,1 MB, e a casa publica por FTP | A | A | `ls .output/public/index.html` nao existe (verificado) | prerender da rota unica, ou worker, ou porte estatico | antes de F7 | HUMANO (D-01) |
| R-03 | **A foto do Fabio e gerada por IA**, e o bordado diz "Comarcial" | M | A | ampliar a capsula; `qg/clientes/borcato.md:182` | colar o bordado original por cima, ou regerar | antes de submeter | HUMANO (D-06) |
| R-04 | **Bloqueio de terceiro sem prazo:** logo vetor (F4) e conversa de 20 min (F6) | A | M | ausencia de resposta | F4 e opcional; F6 vira F6-minima | quando a F5 terminar | HUMANO (D-12) |
| R-05 | **O plano e desktop-first para um uso talvez mobile-first.** Estrada, cursor e magnetismo nao existem no celular | M | A | `Estrada.tsx:59-65`; `Cursor.tsx:17` | exigir versao mobile da cena-pico na F3 | na F3 | HUMANO |
| R-06 | **Prazo desconhecido** (I-06) | M | M | nao registrado | aplicar a ordem de corte da secao 8 | antes de F2 | HUMANO (D-11) |

---

## 2. Riscos de INSTRUMENTO (medir errado e pior que nao medir)

| # | Risco | P | I | Como detectar | Como recuperar | Quando parar | Quem decide |
|---|---|---|---|---|---|---|---|
| R-10 | **Os testes nao emulam toque.** `vistoria_borcato.py:73` e os tres `prova_*.py` usam so `viewport=`; logo `(pointer: fine)` da true em 390px | A | A | ler os scripts (verificado) | F1a acrescenta `has_touch` e `is_mobile` | F1a e pre-requisito de tudo | executor |
| R-11 | **Medir a caixa em vez da tinta** da falso positivo de ate -58px | M | M | colisao acusada onde o texto nao chega | `Range.getClientRects()` sobre nos de texto | sempre | executor |
| R-12 | **Numero absoluto de desempenho em headless** (sem GPU) tratado como verdade | M | M | conclusao de fps sem par de comparacao | so comparacao relativa no mesmo ambiente | sempre | executor |
| R-13 | **Teste que passa por acidente** — nao reprova nada | M | A | rodar contra defeito plantado | reescrever o teste | F1a | executor |
| R-14 | **O peso no disco difere do peso no fio** (compressao, cache) | A | B | as duas medidas divergem | reportar as duas: disco (verdade do FTP) e transferido (verdade do visitante) | sempre | executor |

---

## 3. Riscos de REGRESSAO (quebrar o que ja funciona)

| # | Risco | P | I | Como detectar | Como recuperar | Quando parar | Quem decide |
|---|---|---|---|---|---|---|---|
| R-20 | **O executor melhora peca aprovada** (hero, abertura, foto viva, clip-path, carrossel) | A | A | `git diff --stat` toca arquivo da lista da secao 1 | `git checkout` do arquivo | imediato | HUMANO |
| R-21 | **Mexer em `--br-goteira`** reabre os 8 de 16 casos de colisao nav x conteudo ja resolvidos | M | A | `prova_goteira.py` | reverter o token | imediato | executor |
| R-22 | **Regra CSS larga com lista de excecoes** — ja mordeu 3 vezes (`styles.css:1346-1350`) | M | A | surgimento de `:not(` em seletor de `.travessia >` | reescrever nomeando quem sobe | imediato | executor |
| R-23 | **Altura da pagina muda e desalinha a estrada inteira** (`Estrada.tsx:89,116-117`) | A | M | `prova_estrada.py` apos qualquer fase que acrescente altura | `montar()` ja remonta no resize; forcar remontagem | fim de cada fase | executor |
| R-24 | **Padding somando em vez de reservar** — 6 tentativas ja pagas | M | M | hero deixa de ser viewport exata | fazer a conta inteira antes de mexer | ao mexer em altura | executor |
| R-25 | **Aplicar dois consertos para a mesma colisao** (barra desce E nav ganha fundo) | M | M | as 11 marcas saem da 1a tela | escolher um so | F1b | executor |
| R-26 | **Piso da capsula trocado, mas o arquivo antigo continua no bundle** | M | M | `grep -rn "fabio-travessia" src/` e inspecao do `.output` | remover o import orfao | F1b | executor |

---

## 4. Riscos de CONTEUDO e de CLIENTE

| # | Risco | P | I | Como detectar | Como recuperar | Quando parar | Quem decide |
|---|---|---|---|---|---|---|---|
| R-30 | **Publicar numero de cliente ou valor** (regra dura 1; os dados existem no RepOne) | B | A | busca por digito seguido de %, cifrao ou "clientes" | remover | imediato | HUMANO |
| R-31 | **Inventar o que uma representada fornece.** 5 de 11 tem `fornece` vazio (`dados.ts:49-53`) | A | A | peca ou texto novo citando produto dessas 5 | perguntar ao Fabio; ate la, nao existe | F2 e F6 | HUMANO (D-03) |
| R-32 | **Publicar nome ou foto de funcionario sem autorizacao** | M | A | rosto novo no site | remover | F6 | HUMANO |
| R-33 | **Texto generico porque precisava de texto** — o defeito ja diagnosticado, reintroduzido | A | M | frase que serve para qualquer representante do Brasil | F6-minima em vez de F6 | F6 | HUMANO |
| R-34 | **A peca gerada nao parece a peca real** e o Fabio percebe | M | A | envio ao cliente antes de integrar | regerar aquela peca | F2 | HUMANO |

---

## 5. Riscos TECNICOS por fase

| # | Risco | P | I | Como detectar | Como recuperar | Quando parar | Quem decide |
|---|---|---|---|---|---|---|---|
| R-40 | **F2: as 8-10 pecas nao parecem da mesma sessao** | A | A | teste de sessao unica (`success.md` 2.4) | reescrever o prompt-base, nao as pecas | 3a reescrita | executor, depois HUMANO |
| R-41 | **F2: a pagina passa de 2 MB** | M | A | `prova_peso.py`; teto de 250 KB para a fase | cortar numero de pecas | ao estourar | executor |
| R-42 | **F2: tres camadas de fundo brigando** (peca, fantasma, estrada) | M | M | captura em 1440 do capitulo com peca | uma camada de fundo por tela | F2 | executor |
| R-43 | **F3: emenda visivel entre a estrada e a rota do mapa** | A | A | inspecao em 1024/1440/1920 | um path so; os estados viram pontos da mesma spline | 2a tentativa | executor, depois HUMANO |
| R-44 | **F3: SVG do mapa pesado** (mais de 100 KB de path e comum) | A | M | medir gzip da geometria | simplificar ate 40 KB; e simbolo, nao cartografia | ao estourar | executor |
| R-45 | **F3: mapa impreciso** e alguem de MG percebe | M | A | conferir posicao relativa dos 12 estados | estilizacao declarada; posicao relativa sempre correta | F3 | HUMANO (D-04) |
| R-46 | **F3: mapa vira grafico de cobertura B2B** (lugar-comum) | M | A | se parece mapa de calor, falhou | rota percorrida, nunca area preenchida | F3 | HUMANO |
| R-47 | **F3/F5: jank** — 7 leitores de scroll ja existem, mais Lenis | M | M | `prova_jank.py`, comparacao relativa | consolidar leitores; um rAF por assunto | fim da fase | executor |
| R-48 | **F5: magnetismo do CTA briga com o hover** (`styles.css:1557,1579`) | A | M | o botao pula ou trava no hover | JS escreve as pecas, CSS compoe, `@property` | 2a tentativa | executor |
| R-49 | **F4: icone vetorizado le como icone de biblioteca** | A | A | portao anti-cara-de-IA | matar a fase | imediato | HUMANO |
| R-50 | **F7: fingerprint questionado** — 5 emprestimos declarados de referencia | M | M | comparar as 6 dimensoes contra builds da casa | documentar o que e proprio (foto viva, rota) | F7 | HUMANO |

---

## 6. Riscos de EXECUCAO por outro agente

| # | Risco | P | I | Como detectar | Como recuperar | Quando parar | Quem decide |
|---|---|---|---|---|---|---|---|
| R-60 | **O executor replaneja** em vez de executar | A | M | ele propoe fase nova ou muda a ordem | frase de controle; voltar ao `specs/fase-N.md` | imediato | HUMANO |
| R-61 | **O executor autoaprova** a fase | A | A | ausencia de veredito do jurado | exigir o pacote da secao 6 do WAR-GAME | imediato | HUMANO |
| R-62 | **Loop de tentativas** sem criterio de parada | M | M | estouro do orcamento da fase | parar e relatar; nunca "mais uma tentativa" | ao estourar | executor |
| R-63 | **O executor usa `src/components/ui/`** (48 arquivos shadcn nao usados) e injeta vocabulario de template | M | M | `git diff` importando de `components/ui` | reverter; ver D-09 | imediato | executor |
| R-64 | **Commit ou deploy sem o dono pedir** (regra dura 6) | B | A | `git log` ou FTP | reverter | imediato | HUMANO |
| R-65 | **Deploy espelhado apaga `cgi-bin`, `masterfisher`, `repone`, `manuais`** (regra dura 4) | B | A | so apos o dano | backup antes; envio pontual, nunca espelho | sempre | HUMANO |

---

## 7. Os cinco riscos que eu vigiaria se so pudesse vigiar cinco

1. **R-02** — sem deploy, as sete fases valem zero.
2. **R-10** — o instrumento mente hoje; todo numero derivado dele e suspeito.
3. **R-40** — a inconsistencia entre pecas e o jeito mais provavel de o site ganhar cara de IA.
4. **R-43** — a emenda do mapa e o defeito que estraga a cena-pico.
5. **R-20** — o executor mexer no que ja passou e o unico erro que anda para tras.
