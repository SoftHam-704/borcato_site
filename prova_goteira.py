# -*- coding: utf-8 -*-
"""Prova que a nav ABERTA nao invade o conteudo, em toda largura de desktop.

Mede a borda direita do rotulo do capitulo ATIVO (que e o estado largo) contra a
borda esquerda do texto do capitulo. Se sobrepoe, falha — e o numero diz de quanto.
"""
from playwright.sync_api import sync_playwright

LARGURAS = [(1024, 768), (1280, 800), (1440, 900), (1920, 1080)]
CAPS = ["cap-casa", "cap-marcas", "cap-estrada", "cap-nome"]

with sync_playwright() as pw:
    nav = pw.chromium.launch()
    falhas = 0
    for w, h in LARGURAS:
        pg = nav.new_page(viewport={"width": w, "height": h})
        pg.goto("http://localhost:5180/", wait_until="networkidle")
        pg.wait_for_timeout(500)
        print(f"\n=== {w}x{h} ===")
        for cid in CAPS:
            pg.evaluate(
                "id => document.getElementById(id)"
                ".scrollIntoView({block:'center', behavior:'instant'})",
                cid,
            )
            pg.wait_for_timeout(650)  # o rotulo abre em 0.5s
            r = pg.evaluate(
                """id => {
                  const aceso = document.querySelector('.cap-nav a.is-aqui');
                  const navDir = aceso ? aceso.getBoundingClientRect().right : 0;
                  const cap = document.getElementById(id);
                  // a folha de conteudo mais a esquerda dentro do capitulo
                  // MEDE A TINTA, nao a caixa: a caixa de um <p> vai ate a borda
                  // do capitulo enquanto o texto para antes, e num capitulo
                  // centralizado isso dava falso positivo (-58px que nao existiam).
                  let esq = Infinity, quem = '';
                  for (const el of cap.querySelectorAll('h2,p,li,b,span,a')) {
                    for (const n of el.childNodes) {
                      if (n.nodeType !== 3 || !n.textContent.trim()) continue;
                      const rg = document.createRange(); rg.selectNodeContents(n);
                      for (const rr of rg.getClientRects()) {
                        if (rr.width > 1 && rr.left < esq) {
                          esq = rr.left;
                          quem = n.textContent.trim().slice(0, 22);
                        }
                      }
                    }
                  }
                  return { navDir: Math.round(navDir), esq: Math.round(esq), quem };
                }""",
                cid,
            )
            folga = r["esq"] - r["navDir"]
            ok = folga >= 12
            if not ok:
                falhas += 1
            print(
                f"  {cid:12} nav_dir={r['navDir']:<5} conteudo_esq={r['esq']:<5} "
                f"folga={folga:<5} {'OK' if ok else '<<< INVADE'}  {r['quem']}"
            )
        pg.close()
    nav.close()
    print(f"\nfalhas: {falhas}")
