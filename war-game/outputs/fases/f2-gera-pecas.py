# -*- coding: utf-8 -*-
"""FASE 2 — as peças que o Fábio vende, em natureza-morta.

A regra número 1 da spec: **UM prompt-base, só o objeto varia.** Luz, câmera,
fundo, distância e enquadramento ficam FIXOS. Improvisar por peça é o que faz
o conjunto parecer banco de imagens — a definição visual de "cara de IA".

Nenhuma marca visível: seria logo de terceiro em contexto não autorizado.
As peças ficam FORA de src/ até passarem no teste de sessão única.
"""
import subprocess, pathlib, sys, shutil, time

EDIT = r"C:\Users\Systems\.claude\skills\banana\scripts\generate.py"
SAIDA = pathlib.Path(r"E:\Sistemas_ia\borcato\war-game\outputs\fases\f2-pecas")
SAIDA.mkdir(parents=True, exist_ok=True)

# ── O PROMPT-BASE. Tudo aqui é fixo; {OBJETO} é a única variável. ──
# Sem palavra banida (nada de "8k", "photorealistic", "masterpiece").
# Âncora de prestígio no lugar: catálogo de peça alemão.
BASE = (
    "A single {OBJETO}, unbranded and with no logos or text of any kind, "
    "resting on a matte charcoal surface. Studio still life. "
    "One hard key light from the upper left carving the form, deep falloff into "
    "shadow on the lower right, a faint cool rim light along the top edge. "
    "Background is seamless near-black, unlit, no horizon and no visible edge. "
    "The part fills roughly half the frame, centred, shot straight on at eye level. "
    "Machined metal and moulded surfaces show their real texture: turning marks, "
    "casting grain, the slight oil sheen of a part that has been handled. "
    "Captured with a Sony A7R IV, 90mm macro lens at f/8, cool neutral white balance. "
    "Dark, technical, precise. German automotive parts catalogue photography."
)

# uma peça por representada — o produto vem de dados.ts, confirmado pela carta
PECAS = [
    ("rolamento",   "deep-groove ball bearing, steel, seen at a three-quarter angle"),
    ("filtro",      "cylindrical automotive oil filter canister, pleated paper visible at the open end"),
    ("bomba",       "automotive water pump with its impeller and pulley flange"),
    ("lanterna",    "automotive tail light housing, clear and amber lens facets, unlit"),
    ("suspensao",   "coil spring and shock absorber assembly standing upright"),
    ("oleo",        "thick amber lubricating oil pouring in a single ribbon into a shallow steel pan"),
    ("injetor",     "fuel injector nozzle with its electrical connector"),
    ("quimica",     "unlabelled aerosol can with a spray nozzle, brushed aluminium body"),
    ("spray",       "unlabelled aerosol can lying on its side with the cap removed beside it"),
    ("motor",       "engine cylinder head gasket, layered steel, laid flat"),
    ("plastico",    "moulded black plastic automotive clip and grommet set"),
]

def gerar(nome: str, objeto: str) -> bool:
    destino = SAIDA / f"{nome}.png"
    if destino.exists():
        print(f"  {nome:11} ja existe, pulando")
        return True
    prompt = BASE.replace("{OBJETO}", objeto)
    r = subprocess.run(
        [sys.executable, EDIT, "--prompt", prompt, "--aspect-ratio", "4:3",
         "--resolution", "1K", "--image-only"],
        capture_output=True, text=True, timeout=300,
    )
    saida = r.stdout + r.stderr
    caminho = None
    for linha in saida.splitlines():
        if '"path"' in linha:
            caminho = linha.split('"path":')[1].strip().strip('",').replace("\\\\", "\\")
            break
    if caminho and pathlib.Path(caminho).exists():
        shutil.copy(caminho, destino)
        print(f"  {nome:11} OK  {destino.stat().st_size // 1024} KB")
        return True
    print(f"  {nome:11} FALHOU: {saida.strip()[:150]}")
    return False

if __name__ == "__main__":
    print(f"gerando {len(PECAS)} pecas com UM prompt-base\n")
    ok = 0
    for nome, objeto in PECAS:
        if gerar(nome, objeto):
            ok += 1
        time.sleep(1)  # o free tier limita RPM
    print(f"\n{ok}/{len(PECAS)} geradas em {SAIDA}")
