import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { newsItems } from "@/lib/news";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Notícias e Lançamentos — H.M. Borçato" },
      {
        name: "description",
        content:
          "Fique por dentro das novidades da H.M. Borçato: lançamentos de rolamentos, lâmpadas e novidades das nossas representadas.",
      },
      { property: "og:title", content: "Notícias — H.M. Borçato" },
      { property: "og:description", content: "Lançamentos e novidades do mercado de autopeças em Minas Gerais." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Noticias,
});

function Noticias() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="bg-ink text-ink-foreground">
        <div className="grid-lines mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pb-24 lg:pt-40">
          <Reveal>
            <p className="font-display text-xs font-medium uppercase tracking-[0.26em] text-primary-glow">
              Fique por dentro
            </p>
            <h1 className="mt-4 max-w-[18ch] text-balance font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Notícias e lançamentos
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="grid-lines-light">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 100}>
              <article className="group h-full overflow-hidden rounded-lg bg-card ring-1 ring-border transition-transform hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="font-display text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
                    {item.category}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-semibold uppercase leading-snug tracking-tight">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
