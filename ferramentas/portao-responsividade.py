# -*- coding: utf-8 -*-
"""Portao de responsividade da espinha do Borcato — as cinco larguras da casa.

Mede, nao opina: overflow horizontal, alvo tatil < 44px, truncamento e erro de
console. Screenshot de cada largura para inspecao visual.
"""
import pathlib
from playwright.sync_api import sync_playwright

SAIDA = pathlib.Path(__file__).parent / "vistoria"
SAIDA.mkdir(exist_ok=True)
URL = "http://localhost:8080/"
LARGURAS = [(375, 812), (430, 932), (768, 1024), (1024, 768), (1440, 900)]

JS_AUDITORIA = """
() => {
  const doc = document.documentElement;
  const overflow = doc.scrollWidth - doc.clientWidth;

  // alvos tateis abaixo de 44px (o portao da casa)
  const pequenos = [];
  for (const el of document.querySelectorAll('a,button,[role=button]')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;      // oculto, nao conta
    if (r.width < 44 || r.height < 44) {
      pequenos.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className || '').toString().slice(0, 60),
        txt: (el.textContent || '').trim().slice(0, 34),
        w: Math.round(r.width), h: Math.round(r.height),
      });
    }
  }

  // texto cortado por overflow hidden/clip
  const truncados = [];
  for (const el of document.querySelectorAll('h1,h2,h3,p,li,span,b,em,a')) {
    if (el.children.length) continue;                    // so folhas
    const s = getComputedStyle(el);
    if (s.overflow === 'visible' || s.display === 'none') continue;
    if (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) {
      truncados.push({
        cls: (el.className || '').toString().slice(0, 50),
        txt: (el.textContent || '').trim().slice(0, 34),
        sw: el.scrollWidth, cw: el.clientWidth,
      });
    }
  }

  // elementos que estouram a direita da viewport
  const estouram = [];
  const vw = doc.clientWidth;
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    if (r.right > vw + 2) {
      estouram.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className || '').toString().slice(0, 50),
        right: Math.round(r.right), vw,
      });
    }
  }

  // CONTROLE FORA DA TELA — o furo que este portao TINHA.
  // Em 05/09 as 11 pastilhas do palco somavam 584px e, centralizadas com
  // `translate: -50%`, sangravam para os DOIS lados: comecavam em x=-104 numa
  // tela de 375. Duas ficavam inalcancaveis — e o teste de overflow do
  // documento dava ZERO, porque sangrar simetricamente nao cria barra de
  // rolagem. **Overflow zero nao prova que cabe.**
  // Aqui a pergunta e outra: existe algo CLICAVEL fora da area visivel?
  const foraDaTela = [];
  for (const el of document.querySelectorAll('a,button,[role=button],input,select,textarea')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const s = getComputedStyle(el);
    if (s.visibility === 'hidden' || s.display === 'none') continue;
    // DOIS casos legitimos de estar fora da tela, e o teste precisa saber:
    //  1. um pai que ROLA de lado — o item e alcancavel rolando
    //  2. uma MARQUISE (o pai anda em translateX): por construcao ela sempre
    //     tem itens fora do quadro, e sao copias do que ja passou. Sem esta
    //     excecao o portao acusava 12 falhas em TODA largura, inclusive 1440
    //     onde nao ha problema — 12 iguais em toda largura e assinatura de
    //     falso positivo, nao de defeito.
    // DUAS EXCECOES, e so duas — ambas NOMEADAS.
    //
    // A 1a versao ignorava QUALQUER ancestral com translateX > 1px, achando que
    // isso identificava a marquise. Nao identificava: identificava qualquer
    // translacao. Provado em 05/09 — um botao fora da tela sob um pai com
    // `translateX(20px)` passava despercebido. Excecao por FORMA e cega;
    // excecao por NOME e auditavel.
    const MARQUISES = ['marcas__trilho'];
    let ignorar = false;
    for (let p = el.parentElement; p; p = p.parentElement) {
      const ps = getComputedStyle(p);
      // 1. pai que rola de lado: o item e alcancavel rolando
      if (ps.overflowX === 'auto' || ps.overflowX === 'scroll') { ignorar = true; break; }
      // 2. marquise CONHECIDA: por construcao tem copias fora do quadro
      const cls = (p.className || '').toString();
      if (MARQUISES.some((m) => cls.includes(m))) { ignorar = true; break; }
    }
    if (ignorar) continue;

    // RECORTE PARCIAL TAMBEM CONTA. A 1a versao so pegava o que estava
    // INTEIRO fora (`right < 2 || left > vw - 2`) — um botao com metade da
    // largura cortada passava limpo, e metade de um alvo de 44px e 22px:
    // abaixo do piso da casa, na pratica inclicavel.
    // Aqui o criterio e quanto do alvo SOBRA visivel.
    const visivelX = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0));
    const fracao = r.width > 0 ? visivelX / r.width : 0;
    if (visivelX < 44 || fracao < 0.6) {
      foraDaTela.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className || '').toString().slice(0, 40),
        txt: (el.textContent || '').trim().slice(0, 26),
        left: Math.round(r.left), right: Math.round(r.right), vw,
        visivel: Math.round(visivelX), pct: Math.round(fracao * 100),
      });
    }
  }

  return { overflow, pequenos, truncados, estouram: estouram.slice(0, 12),
           foraDaTela: foraDaTela.slice(0, 12), altura: doc.scrollHeight };
}
"""

# REPROVA DE VERDADE (achado da 3a auditoria).
# Antes este script so IMPRIMIA as falhas e sempre saia com codigo 0 — quem o
# usasse como bloqueio de publicacao (num hook, num CI) veria "passou" com
# defeito na tela. Agora acumula e sai com codigo 1.
falhas_totais = []

with sync_playwright() as pw:
    nav = pw.chromium.launch()
    for w, h in LARGURAS:
        pg = nav.new_page(viewport={"width": w, "height": h})
        erros = []
        # ignora o aviso de hidratacao do dev server do TanStack: ele vem do
        # atributo `data-tsd-source` que o proprio dev injeta e que nao
        # existe no HTML do servidor. NAO ocorre em producao — e nenhum
        # outro erro e filtrado aqui.
        def _console(m):
            if m.type != "error":
                return
            if "hydrated but some attributes" in m.text:
                return
            erros.append(m.text)
        pg.on("console", _console)
        pg.on("pageerror", lambda e: erros.append(f"PAGEERROR {e}"))
        pg.goto(URL, wait_until="networkidle")
        pg.wait_for_timeout(2100)  # ESPERA_ABERTURA: a abertura roda sempre (3,4s + saida)
        pg.wait_for_timeout(1400)  # preloader + fontes

        a = pg.evaluate(JS_AUDITORIA)
        print(f"\n=== {w}x{h} ===")
        print(f"  altura da pagina : {a['altura']}px")
        print(f"  overflow horiz.  : {a['overflow']}px", "OK" if a["overflow"] <= 0 else "<<< FALHA")
        print(f"  alvos < 44px     : {len(a['pequenos'])}")
        for p in a["pequenos"][:8]:
            print(f"      {p['tag']}.{p['cls']} {p['w']}x{p['h']} :: {p['txt']!r}")
        print(f"  truncados        : {len(a['truncados'])}")
        for t in a["truncados"][:6]:
            print(f"      .{t['cls']} {t['sw']}>{t['cw']} :: {t['txt']!r}")
        print(f"  estouram a dir.  : {len(a['estouram'])}")
        for e in a["estouram"][:6]:
            print(f"      {e['tag']}.{e['cls']} right={e['right']} vw={e['vw']}")
        fora = a.get("foraDaTela", [])
        print(f"  clicavel FORA da tela: {len(fora)}",
              "OK" if not fora else "<<< FALHA (inalcancavel)")
        for f in fora[:6]:
            print(f"      {f['tag']}.{f['cls']} x={f['left']}..{f['right']} "
                  f"visivel {f.get('visivel','?')}px ({f.get('pct','?')}%) :: {f['txt']!r}")
        for rotulo, cond in (
            ("overflow horizontal", a["overflow"] > 0),
            ("alvo < 44px", bool(a["pequenos"])),
            ("clicavel fora da tela", bool(a.get("foraDaTela"))),
        ):
            if cond:
                falhas_totais.append(f"{w}px: {rotulo}")
        if erros:
            falhas_totais.append(f"{w}px: {len(erros)} erro(s) de console")
        print(f"  erros de console : {len(erros)}")
        for e in erros[:5]:
            print(f"      {e[:150]}")

        pg.screenshot(path=str(SAIDA / f"topo-{w}.png"))
        pg.screenshot(path=str(SAIDA / f"inteira-{w}.png"), full_page=True)
        pg.close()
    nav.close()

print(f"\nscreenshots em {SAIDA}")

# ── O VEREDITO, e ele REPROVA ───────────────────────────────────────────────
print("\n" + "=" * 62)
if falhas_totais:
    print(f">>> REPROVOU em {len(falhas_totais)} ponto(s):")
    for f in falhas_totais:
        print(f"      {f}")
    print("=" * 62)
    raise SystemExit(1)
print(">>> PASSOU nas cinco larguras.")
print("    ATENCAO: isto mede a pagina CARREGADA, sem percorrer as cenas.")
print("    Nao e prova de que a experiencia inteira esta aprovada.")
print("=" * 62)
