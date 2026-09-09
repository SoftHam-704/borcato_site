"""Coleta leve dos portais oficiais das indústrias representadas.

Uso:
  python ferramentas/coleta/scrapling_portais.py

Requer:
  pip install "scrapling[fetchers]"

O programa visita apenas a página inicial publicada de cada portal. Não usa
modo stealth, não autentica, não contorna bloqueios e não baixa logotipos. Ele
gera um inventário para revisão humana: título, descrição, imagem social e
endereços que parecem apontar para a marca.
"""

from __future__ import annotations

import json
from pathlib import Path
from time import sleep
from urllib.parse import urljoin

from curl_cffi import requests
from lxml import html
from scrapling.fetchers import Fetcher


MARCAS = (
    ("NTN-SNR", "https://ntn.com.br/"),
    ("Filtros Brasil", "https://www.filtrosbrasil.com.br/"),
    ("Nidec", "http://www.nidec-gpm.com.br/"),
    ("Cofran", "https://cofranlanternas.com.br/"),
    ("Pysko", "https://www.pysko.com.br/"),
    ("Hexlub", "https://hexxlub.com.br/"),
    ("Meca Brazil", "https://mecabrazil.com/"),
    ("Auto América", "https://www.autoamerica.com.br/"),
    ("Mundial Prime", "https://mundialprime.com.br/"),
    ("Sintech", "https://www.sintechdobrasil.com.br/"),
    ("VP", "https://vp.ind.br/"),
)

DESTINO = Path(__file__).parents[2] / "pesquisa" / "portais-oficiais.json"
CHAVES_DE_MARCA = ("logo", "brand", "marca", "wordmark", "logotipo")


def texto(valor: str | None) -> str:
    return " ".join((valor or "").split())


def candidato(url: str, base: str, contexto: str = "") -> str | None:
    absoluto = urljoin(base, url.strip())
    sinal = f"{absoluto} {contexto}".lower()
    if any(chave in sinal for chave in CHAVES_DE_MARCA) or absoluto.lower().endswith(".svg"):
        return absoluto
    return None


def coletar(nome: str, url: str) -> dict[str, object]:
    try:
        pagina = Fetcher.get(url, timeout=25)
        base = str(pagina.url)
        logos: set[str] = set()

        og_image = texto(pagina.css('meta[property="og:image"]::attr(content)').get())
        if og_image:
            logos.add(urljoin(base, og_image))

        for seletor in ("img", "link"):
            for elemento in pagina.css(seletor):
                atributos = elemento.attrib
                origem = atributos.get("src") or atributos.get("data-src") or atributos.get("href") or ""
                achado = candidato(origem, base, f"{atributos.get('alt', '')} {atributos.get('rel', '')}")
                if achado:
                    logos.add(achado)

        return {
            "marca": nome,
            "portal_informado": url,
            "status": pagina.status,
            "url_final": base,
            "titulo": texto(pagina.css("title::text").get()),
            "descricao": texto(pagina.css('meta[name="description"]::attr(content)').get()),
            "imagem_social": urljoin(base, og_image) if og_image else None,
            "candidatos_logo": sorted(logos),
            "observacao": "Candidatos exigem validação humana e não são ativos aprovados para publicação.",
        }
    except UnicodeDecodeError:
        # Alguns portais legados declaram Windows-1252. A requisição continua
        # sendo simples e pública; só trocamos o decodificador para não perder
        # uma marca inteira por causa do HTML antigo.
        resposta = requests.get(url, impersonate="chrome", timeout=25)
        base = str(resposta.url)
        arvore = html.fromstring(resposta.content.decode("windows-1252", errors="replace"))
        logos: set[str] = set()

        def primeiro(xpath: str) -> str:
            valores = arvore.xpath(xpath)
            return texto(str(valores[0])) if valores else ""

        og_image = primeiro('//meta[@property="og:image"]/@content')
        if og_image:
            logos.add(urljoin(base, og_image))
        for elemento in arvore.xpath("//img | //link"):
            origem = elemento.get("src") or elemento.get("data-src") or elemento.get("href") or ""
            achado = candidato(origem, base, f"{elemento.get('alt', '')} {elemento.get('rel', '')}")
            if achado:
                logos.add(achado)

        return {
            "marca": nome,
            "portal_informado": url,
            "status": resposta.status_code,
            "url_final": base,
            "titulo": primeiro("//title/text()"),
            "descricao": primeiro('//meta[@name="description"]/@content'),
            "imagem_social": urljoin(base, og_image) if og_image else None,
            "candidatos_logo": sorted(logos),
            "observacao": "Portal legado lido como Windows-1252; candidatos exigem validação humana.",
        }
    except Exception as erro:
        return {
            "marca": nome,
            "portal_informado": url,
            "status": "erro",
            "erro": f"{type(erro).__name__}: {erro}",
            "observacao": "Requer revisão manual ou coleta com navegador; não houve tentativa de contorno.",
        }


def main() -> None:
    registros = []
    for nome, url in MARCAS:
        registros.append(coletar(nome, url))
        sleep(1)  # uma requisição por vez, sem pressionar os portais

    DESTINO.parent.mkdir(exist_ok=True)
    DESTINO.write_text(
        json.dumps(registros, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Inventário salvo em {DESTINO}")


if __name__ == "__main__":
    main()
