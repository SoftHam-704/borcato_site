# Spec — FASE 1a: consertar o instrumento

**Pre-requisito:** D-05 aprovado. **Nao depende de mais nada.**
**Toca `src/`?** NAO. Zero arquivo de producao.
**Duracao estimada:** meio dia. **Orcamento:** 6 tentativas por teste.

---

## Por que esta fase existe

Os testes de hoje nao medem o que dizem medir. Provas:

1. `vistoria_borcato.py:73` faz `nav.new_page(viewport={...})` — **sem `has_touch`, sem
   `is_mobile`**. O mesmo vale para `prova_capitulos.py:11`, `prova_estrada.py:13` e
   `prova_goteira.py:16`. Logo, `(pointer: fine)` da `true` mesmo numa viewport de 390px,
   e o `Cursor.tsx:17` — que **ja se protege** — nunca e testado de verdade.
2. Nenhum teste mede **peso**. O achado 8 do levantamento (619 KB duplicados) foi apurado
   a mao.
3. Nenhum teste mede **colisao entre camadas**. A colisao conhecida (`.cap-nav`
   `z-index:40` em `styles.css:846` sobre `.marcas` `z-index:2` em `styles.css:1215`)
   passa por todos os portoes atuais, porque nao e overflow nem alvo tatil.
4. Nenhum teste mede **jank**, e a F3 vai acrescentar leitor de scroll a uma pagina que ja
   tem sete.

---

## O que fazer

Escrever quatro scripts no scratchpad
(`C:\Users\Systems\AppData\Local\Temp\claude\e--Sistemas-ia-SoftHam-Site\<sessao>\scratchpad\`),
no mesmo estilo dos existentes: **medem, nao opinam**; imprimem numero; salvam captura.

### 1. `prova_touch.py`
- Abrir 375 e 430 com `has_touch=True, is_mobile=True`; e 1024/1440 com `has_touch=False`.
- Medir: o `.cursor-dot`/`.cursor-ring` existe no DOM? `matchMedia("(pointer: fine)")` da
  o que? Erros de console?
- **Saida esperada:** afirmar com evidencia se o bug do cursor em toque existe no
  navegador real ou so no instrumento.

### 2. `prova_peso.py`
- Via CDP/`page.on("response")`, somar bytes por tipo (jpg, png, js, css, font) ate
  `networkidle`.
- Reportar **duas** medidas: transferido (visitante) e disco (`.output/public/assets`).
- **Teto declarado:** 1000 KB no disco.

### 3. `prova_colisao.py`
- Listar os elementos **fixos/absolutos** (`.cap-nav`, `.marcas`, `.cursor-*`) e cruzar o
  retangulo deles com a **tinta** do conteudo.
- **Obrigatorio:** medir a tinta com `Range.getClientRects()` sobre nos de texto, NUNCA
  `getBoundingClientRect()` do bloco — a regra dura do QG registra falso positivo de ate
  -58px, que ja fez consertar duas vezes o que estava certo.
- Rodar em 375/430/768/1024/1280/1440/1920.

### 4. `prova_jank.py`
- Rolar a pagina em passos, coletando `PerformanceObserver` de `longtask` e o tempo entre
  quadros.
- Reportar **mediana** e **p95**, e o numero de long tasks acima de 50 ms.
- **So vale comparacao relativa** antes/depois no mesmo ambiente: headless nao tem GPU.

---

## Validacao obrigatoria: defeito plantado

Cada teste tem de **reprovar um defeito conhecido**. Sem isso ele nao serve.

| Teste | Defeito a plantar (temporario, revertido em seguida) | Deve |
|---|---|---|
| `prova_touch` | remover a guarda de `Cursor.tsx:17` | acusar cursor em toque |
| `prova_peso` | nada — o duplicado ja existe hoje | acusar 1721 KB |
| `prova_colisao` | nada — a colisao nav x carrossel ja existe | acusar a colisao |
| `prova_jank` | um `for` bloqueante de 200 ms no listener de scroll | acusar long task |

**Reverter o defeito plantado com `git checkout` imediatamente apos cada teste.** Se voce
esquecer de reverter, a fase falhou.

---

## Entregaveis

1. Os quatro scripts, rodando
2. `checkpoints/base-b981df1.json` com a linha de base de todas as medidas
3. Relatorio em `outputs/fases/f1a-relatorio.md` com o **veredito sobre o cursor**
4. `ledger.md` atualizado se aparecer defeito novo

---

## Criterios de saida

- [ ] 4 scripts rodam e produzem numero
- [ ] 4 de 4 reprovaram o defeito plantado
- [ ] defeitos plantados revertidos (`git status` limpo)
- [ ] linha de base salva
- [ ] veredito sobre o cursor escrito com evidencia

## Criterio de aborto

Se `has_touch=True` impedir a pagina de carregar a ponto de nao dar para medir: **PARE**.
Isso e bug de producao maior que qualquer fase — registrar no ledger e chamar o humano.

## Ao terminar

```
Nao implemente ainda. Nao replaneje do zero.
Atualize ledger e README. Pare ao final da fase.
```
