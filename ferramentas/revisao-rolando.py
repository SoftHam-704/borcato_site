# -*- coding: utf-8 -*-
"""Revisao ROLANDO — o full_page mente neste site.

Todo gesto nasce de --cap-entra, escrito pelo JS no scroll. Um full_page
fotografa a pagina inteira sem rolar: os capitulos ficam em opacity 0 e a
imagem sai preta. Aqui eu rolo em passos, espero assentar, e fotografo.
"""
import pathlib
from playwright.sync_api import sync_playwright

SAIDA = pathlib.Path("revisao"); SAIDA.mkdir(exist_ok=True)
W, H = 1440, 900

with sync_playwright() as pw:
    nav = pw.chromium.launch()
    pg = nav.new_page(viewport={"width": W, "height": H})
    erros = []
    pg.on("console", lambda m: m.type == "error" and "hydrated but some" not in m.text
          and erros.append(m.text))
    pg.on("pageerror", lambda e: erros.append(f"PAGEERROR {e}"))
    pg.goto("http://localhost:8080/", wait_until="networkidle")
    pg.wait_for_timeout(4600 + 1200)   # a abertura roda sempre

    alt = pg.evaluate("document.documentElement.scrollHeight")
    print(f"altura total: {alt}px  ({alt/H:.1f} telas)\n")

    # onde cada capitulo comeca, para fotografar no ponto certo
    caps = pg.evaluate("""() => {
      const o = {};
      for (const el of document.querySelectorAll('[id^=cap-]')) {
        const r = el.getBoundingClientRect();
        o[el.id] = Math.round(r.top + window.scrollY);
      }
      return o;
    }""")
    print("capitulos:", caps, "\n")

    # ROLA COM scrollTo, NAO com mouse.wheel. O Lenis intercepta a roda e o
    # laco de wheel nunca chega ao fim — travou a revisao por 400s.
    passo = H // 2
    for y in range(0, alt - H, passo):
        pg.evaluate(f"window.scrollTo(0, {y})")
        pg.wait_for_timeout(70)
    pg.wait_for_timeout(1200)

    # agora fotografa cada capitulo, indo direto ao ponto
    for nome, topo in caps.items():
        pg.evaluate(f"window.scrollTo(0, {topo + 120})")
        pg.wait_for_timeout(1400)
        pg.screenshot(path=str(SAIDA / f"{nome}.png"))
        print(f"  {nome:14} y={topo}")

    # o fim da pagina
    pg.evaluate("window.scrollTo(0, document.documentElement.scrollHeight)")
    pg.wait_for_timeout(1400)
    pg.screenshot(path=str(SAIDA / "zz-fim.png"))

    print(f"\nerros de console: {len(erros)}")
    for e in erros[:5]: print("   ", e[:140])
    nav.close()
print(f"\nem {SAIDA.resolve()}")
