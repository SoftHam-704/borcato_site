# -*- coding: utf-8 -*-
"""VIDEO -> SEQUENCIA DE QUADROS para scrub em canvas, no peso do site.

Nao e "extrair frames": e escolher QUAIS, no tamanho certo, no formato certo, e
PROVAR que o resultado serve antes de virar codigo. Video gerado (Gemini, Veo,
Kling) vem em 24-30fps e 1280x720 — mandar isso pro site sao dezenas de MB.

O que a ferramenta faz, nesta ordem:
  1. varre o video e acha a JANELA UTIL (onde o gesto acontece), ignorando o
     trecho parado e a volta — geradores costumam voltar ao inicio no fim
  2. amostra N quadros dentro dessa janela
  3. exporta em AVIF na largura pedida, com a tabela de peso medida
  4. RODA OS TESTES DO ARSENAL: corpo parado, giro suficiente, mesma sessao

Uso:
  python video_para_frames.py <video> [n_quadros] [largura] [qualidade]
"""
import subprocess, sys, pathlib, shutil
from PIL import Image, ImageChops, ImageStat

def quadro(video: str, t: float, destino: pathlib.Path) -> Image.Image:
    subprocess.run(["ffmpeg", "-y", "-ss", f"{t:.3f}", "-i", video, "-frames:v", "1",
                    str(destino)], capture_output=True)
    return Image.open(destino)

def duracao(video: str) -> float:
    r = subprocess.run(["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
                        "-of", "csv=p=0", video], capture_output=True, text=True)
    return float(r.stdout.strip())

def faixa(d: Image.Image, a: float, b: float) -> float:
    W, H = d.size
    return ImageStat.Stat(d.crop((0, int(H*a), W, int(H*b)))).mean[0]

def janela_util(video: str, dur: float, passo: float = 0.25) -> tuple[float, float]:
    """Onde o gesto ACONTECE. O gerador costuma parar no meio e voltar no fim:
    incluir a volta faz o scrub desfazer o movimento na segunda metade."""
    tmp = pathlib.Path("_vf_tmp"); tmp.mkdir(exist_ok=True)
    base = quadro(video, 0.0, tmp / "b.png").convert("L")
    perfil = []
    t = 0.0
    while t < dur - 0.05:
        im = quadro(video, t, tmp / "c.png").convert("L")
        if im.size != base.size: im = im.resize(base.size)
        perfil.append((t, faixa(ImageChops.difference(base, im), 0, .35)))
        t += passo
    pico = max(p for _, p in perfil)
    if pico < 1.0:
        shutil.rmtree(tmp, ignore_errors=True)
        return 0.0, dur
    # inicio: primeiro instante que sai do repouso. fim: quando ATINGE o pico
    # (dali em diante ou esta parado, ou esta voltando)
    ini = next(t for t, p in perfil if p > pico * 0.06)
    fim = next(t for t, p in perfil if p >= pico * 0.97)
    shutil.rmtree(tmp, ignore_errors=True)
    print(f"  janela util : {ini:.2f}s a {fim:.2f}s   (video tem {dur:.2f}s)")
    print(f"                pico de giro {pico:.1f}; depois de {fim:.2f}s ele para ou volta")
    return ini, fim

def exportar(video: str, ini: float, fim: float, n: int, larg: int, q: int) -> pathlib.Path:
    v = pathlib.Path(video)
    saida = v.parent / f"{v.stem}-frames"
    if saida.exists(): shutil.rmtree(saida)
    saida.mkdir()
    tempos = [ini + (fim - ini) * i / (n - 1) for i in range(n)] if n > 1 else [ini]
    for i, t in enumerate(tempos):
        subprocess.run(["ffmpeg", "-y", "-ss", f"{t:.3f}", "-i", video, "-frames:v", "1",
                        "-vf", f"scale={larg}:-2", "-q:v", str(q), str(saida / f"{i}.avif")],
                       capture_output=True)
    return saida

def provar(saida: pathlib.Path) -> bool:
    """Os testes do arsenal. Sem isto e so um extrator de frames."""
    qs = sorted(saida.glob("*.avif"), key=lambda p: int(p.stem))
    ims = [Image.open(p).convert("L") for p in qs]
    print(f"\n  {'par':>6} {'cabeca':>8} {'tronco':>8} {'bracos':>8}   corpo")
    giro = 0.0; ruins = 0
    for i in range(len(ims) - 1):
        d = ImageChops.difference(ims[i], ims[i+1])
        cab, tro, bra = faixa(d,0,.35), faixa(d,.35,.70), faixa(d,.70,1.)
        giro += cab
        ok = tro <= 14 and bra <= 14
        if not ok: ruins += 1
        print(f"  {i}->{i+1:<3} {cab:8.1f} {tro:8.1f} {bra:8.1f}   {'ok' if ok else 'SE MEXE'}")
    peso = sum(p.stat().st_size for p in qs) / 1024
    print(f"\n  giro total  : {giro:.1f}   (os 5 do site hoje somam 39,8)")
    print(f"  peso        : {peso:.0f} KB os {len(qs)}   ({peso/len(qs):.0f} KB cada)")
    print(f"  corpo parado: {'OK' if ruins == 0 else f'{ruins} par(es) tremendo'}")
    return ruins == 0

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__); raise SystemExit
    vid = sys.argv[1]
    n    = int(sys.argv[2]) if len(sys.argv) > 2 else 5
    larg = int(sys.argv[3]) if len(sys.argv) > 3 else 880
    q    = int(sys.argv[4]) if len(sys.argv) > 4 else 30
    dur = duracao(vid)
    print(f"\n{pathlib.Path(vid).name}  ({dur:.1f}s)")
    ini, fim = janela_util(vid, dur)
    saida = exportar(vid, ini, fim, n, larg, q)
    provar(saida)
    print(f"\n  em {saida}")
