// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { rmSync } from "node:fs";
import { join } from "node:path";

// ── LIXO DO WINDOWS NÃO VAI PARA O SERVIDOR DO CLIENTE ──────────────────────
// O Explorer cria `Thumbs.db` (cache de miniaturas) em toda pasta de imagens
// que alguém abre. O `.gitignore` cobre — por isso ele nunca entrou no git —
// mas o .gitignore NÃO governa a cópia de `public/`: o Vite copia a pasta
// inteira, e o arquivo vazava para `.output/public/`.
//
// ACHADO no portão de peso (05/09): 3 KB de Thumbs.db dentro do build, a um
// deploy de distância de ir para o cPanel do Fábio. Apagar à mão não resolve,
// porque o Windows recria assim que alguém abre a pasta.
const semLixoDoWindows = {
  name: "sem-lixo-do-windows",
  closeBundle() {
    for (const f of ["Thumbs.db", "desktop.ini", ".DS_Store"]) {
      rmSync(join(".output", "public", f), { force: true });
    }
  },
};

export default defineConfig({
  vite: { plugins: [semLixoDoWindows] },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },

    // ── PRERENDER: é o que torna o deploy da casa possível ────────────────────
    // A casa publica por FTP no cPanel, e o build vinha só como worker
    // Cloudflare: `.output/public/` NÃO tinha index.html, então não havia o que
    // subir. Um site premiado precisa estar NO AR para ser julgado.
    //
    // Tentei antes trocar o preset do nitro para `static` e o build quebrou
    // ("rolldownOptions.input should not be an html file when building for SSR"),
    // porque a entrada de servidor daqui é a src/server.ts acima.
    //
    // O prerender resolve sem trocar preset nenhum: o nitro renderiza a rota e
    // grava o HTML pronto. O site é UMA rota, então `crawlLinks` fica desligado.
    //
    // Medido depois de ligar: index.html de 95 KB com o site inteiro (manchete,
    // as 11 marcas com descrição, as 8 regiões), servido como arquivo estático
    // puro com ZERO erro de console e ZERO requisição falha. 667 KB no fio com
    // o gzip do Apache — dentro do orçamento de 1000 KB.
    //
    // Para publicar: subir o conteúdo de `.output/public/` para o cPanel.
    // O `.output/server/` (1,1 MB) NÃO vai — é o worker, e o FTP não usa.
    prerender: { enabled: true, crawlLinks: false, routes: ["/"] },
  },
});
