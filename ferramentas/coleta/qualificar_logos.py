"""Qualifica tecnicamente os candidatos de logo do inventário Scrapling.

O resultado não aprova a marca visualmente. Ele responde apenas se o arquivo
tem resolução suficiente para a prancha e destaca vetores que devem ser
priorizados para validação humana.
"""

from __future__ import annotations

import json
from io import BytesIO
from pathlib import Path

from curl_cffi import requests
from PIL import Image


RAIZ = Path(__file__).parents[2]
ENTRADA = RAIZ / "pesquisa" / "portais-oficiais.json"
SAIDA = RAIZ / "pesquisa" / "qualidade-candidatos-logo.json"


def classificar(url: str) -> dict[str, object]:
    try:
        resposta = requests.get(url, impersonate="chrome", timeout=25)
        tipo = resposta.headers.get("content-type", "").split(";", 1)[0].lower()
        if url.lower().endswith(".svg") or "svg" in tipo:
            return {"url": url, "status": resposta.status_code, "tipo": tipo, "qualidade": "vetor candidato"}

        imagem = Image.open(BytesIO(resposta.content))
        largura, altura = imagem.size
        maior, menor = max(largura, altura), min(largura, altura)
        if maior >= 1000 and menor >= 200:
            qualidade = "raster com margem para prancha"
        elif maior >= 400 and menor >= 100:
            qualidade = "raster limitado; pedir vetor"
        else:
            qualidade = "raster insuficiente; usar só como referência"
        return {
            "url": url,
            "status": resposta.status_code,
            "tipo": tipo or imagem.format,
            "dimensoes_px": [largura, altura],
            "qualidade": qualidade,
        }
    except Exception as erro:
        return {"url": url, "status": "erro", "qualidade": f"não lido: {type(erro).__name__}"}


def main() -> None:
    inventario = json.loads(ENTRADA.read_text(encoding="utf-8"))
    resultado = []
    for marca in inventario:
        resultado.append(
            {
                "marca": marca["marca"],
                "candidatos": [classificar(url) for url in marca.get("candidatos_logo", [])],
                "nota": "Qualidade técnica não confirma que o arquivo é o logo oficial aprovado.",
            }
        )

    SAIDA.write_text(json.dumps(resultado, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Triagem salva em {SAIDA}")


if __name__ == "__main__":
    main()
