# -*- coding: utf-8 -*-
"""VIDEO DE REFERENCIA -> TIRA DE CONTATOS, para eu conseguir LER o movimento.

O Claude Code nao aceita video como anexo (aceita imagem e SVG). Mas o gesto
esta na SEQUENCIA de quadros, nao no arquivo .mp4 — entao a limitacao nao e do
conteudo, e do formato. ffmpeg resolve: quadros em intervalo regular, montados
numa grade unica com o tempo carimbado em cada um.

Por que grade e nao quadros soltos: numa grade eu vejo a PROGRESSAO de relance —
se o deslocamento entre quadros vizinhos e constante (linear) ou se acelera e
desacelera (ease). Quadros soltos me obrigam a comparar de memoria, que e
exatamente onde eu erro.

VALIDADO com movimento de verdade conhecida (06s: 3s lineares + 3s com ease-out).
Na tira, a linha 1 avanca em passos iguais e a linha 2 tem passos que encolhem ate
quase empatar — a leitura a olho bate com a medicao (56/54/56 px contra 128/64/24/2).

DUAS ARMADILHAS DE LEITURA, achadas nesse teste:
  1. A QUEBRA DE LINHA ENGANA. Do fim de uma linha para o inicio da seguinte o
     objeto "volta" para a esquerda. Nao e o movimento, e a grade. Comparar ritmo
     SEMPRE dentro da mesma linha.
  2. fps baixo demais esconde ease. A 2/s um gesto de 0,4s cabe entre dois quadros
     e some. Para micro-interacao (hover, cursor) usar 8 a 12.

Uso:  python tira_de_contatos.py <video> [fps] [colunas]
      fps 2  -> rolagem longa de pagina (o padrao)
      fps 8+ -> micro-interacao, hover, cursor
"""
import subprocess, sys, pathlib, json, math

def duracao(v: str) -> float:
    r = subprocess.run(
        ["ffprobe", "-v", "quiet", "-print_format", "json", "-show_format", "-show_streams", v],
        capture_output=True, text=True)
    d = json.loads(r.stdout)
    fmt = d.get("format", {})
    vid = next((s for s in d.get("streams", []) if s.get("codec_type") == "video"), {})
    print(f"  duracao : {float(fmt.get('duration', 0)):.1f}s")
    print(f"  tamanho : {vid.get('width')}x{vid.get('height')}  @ {vid.get('r_frame_rate')}")
    return float(fmt.get("duration", 0))

def extrair(video: str, fps: float = 2.0, colunas: int = 5) -> pathlib.Path:
    v = pathlib.Path(video)
    saida = v.parent / f"{v.stem}-tira"
    saida.mkdir(exist_ok=True)
    dur = duracao(video)
    n = max(1, int(dur * fps))
    linhas = math.ceil(n / colunas)

    # drawtext carimba o SEGUNDO em cada quadro: sem isso a tira mostra a
    # sequencia mas nao o RITMO, e ritmo e metade da leitura de movimento.
    # fontconfig nao existe no Windows: sem fontfile explicito o drawtext morre
    # com "Cannot load default config file". Caminho escapado no dialeto do ffmpeg.
    fonte = "C\:/Windows/Fonts/arial.ttf"
    filtro = (
        f"fps={fps},scale=440:-1,"
        f"drawtext=fontfile='{fonte}':text='%{{eif\:t\:d}}.%{{eif\:mod(t*10,10)\:d}}s'"
        f":x=6:y=6:fontsize=20:fontcolor=white:box=1:boxcolor=black@0.65:boxborderw=4,"
        f"tile={colunas}x{linhas}:margin=6:padding=4:color=0x101014"
    )
    alvo = saida / f"{v.stem}-tira-%02d.png"
    r = subprocess.run(
        ["ffmpeg", "-y", "-i", video, "-vf", filtro, "-frames:v", "1", str(alvo)],
        capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stderr[-1200:]); raise SystemExit("ffmpeg falhou")

    print(f"\n  {n} quadros a {fps}/s  ->  grade {colunas}x{linhas}")
    for p in sorted(saida.glob("*.png")):
        print(f"    {p.name}  {p.stat().st_size/1024:.0f} KB")
    return saida

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__); raise SystemExit
    fps = float(sys.argv[2]) if len(sys.argv) > 2 else 2.0
    cols = int(sys.argv[3]) if len(sys.argv) > 3 else 5
    extrair(sys.argv[1], fps, cols)
