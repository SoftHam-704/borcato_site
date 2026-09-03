# Como publicar o site da H.M. Borçato

**Resolvido em 03/09/2026.** Antes disto não existia caminho de publicação: o build saía
só como worker Cloudflare e `.output/public/` **não tinha `index.html`** — não havia o que
subir por FTP. Era o D-01 do war game, e invalidava todo o resto do trabalho, porque o
Awwwards julga o site **no ar**.

## O procedimento

```
npx vite build
```

Depois, subir por FTP para o cPanel **o conteúdo de `.output/public/`** — não a pasta,
o conteúdo dela.

**⚠️ `.output/server/` NÃO vai.** É o worker Cloudflare (1,1 MB) e o FTP não usa.

**⚠️ Envio PONTUAL, nunca espelhado.** O servidor tem pastas que não existem no projeto.
É regra dura da casa — ver `qg/metodo/REGRAS-DURAS.md`.

## O que sobe

28 arquivos, 1090 KB no disco e **667 KB no fio** com o gzip do Apache (o limite do
projeto é 1000 KB). O `index.html` sozinho tem 97 KB e comprime muito, porque é markup.

## Por que prerender, e não preset estático

Tentei primeiro trocar o preset do nitro para `static`. O build quebra:

```
rolldownOptions.input should not be an html file when building for SSR.
Please specify a dedicated SSR entry.
```

A causa é a entrada de servidor própria do projeto (`src/server.ts`, o wrapper de erro de
SSR do Lovable) — trocar o preset exigiria desmontar isso.

**O prerender resolve sem trocar preset nenhum:** o nitro renderiza a rota e grava o HTML
pronto ao lado dos assets. Está em `vite.config.ts`, com o motivo escrito lá.

O site é **uma rota só**, então `crawlLinks` fica desligado — não há o que rastrear.

## Verificado, não suposto

O build foi servido como arquivo estático puro (`python -m http.server`, que é o pior
caso: nenhum recurso de servidor, só arquivos) e medido:

| O quê | Resultado |
|---|---|
| Raiz e assets | HTTP 200 |
| Erros de console | **0** |
| Requisições falhas | **0** |
| Manchete, cápsula, foto viva | presentes |
| 11 marcas com peça · 4 capítulos · estrada · carrossel | presentes |

**E resolveu uma dúvida pendente:** o aviso de hidratação que aparecia no `vite dev` vem
do atributo `data-tsd-source`, que o próprio dev server injeta. **Servido estático, ele
não existe.** Não era defeito do site.
