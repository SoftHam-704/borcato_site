import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cloud, MapPinned, Route as RouteIcon, Users } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import mapaMg from "@/assets/mapa-mg.png";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — H.M. Borçato Representação Comercial" },
      {
        name: "description",
        content:
          "Representação comercial de autopeças com cobertura presencial em todo Minas Gerais: 853 municípios, sistema em nuvem e rotas inteligentes.",
      },
      { property: "og:title", content: "Serviços — H.M. Borçato" },
      { property: "og:description", content: "Cobertura de vendas e marketing em todo o estado de Minas Gerais." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Servicos,
});

const services = [
  {
    icon: Users,
    title: "Equipe qualificada",
    text: "Sediada em Belo Horizonte, a H.M. Borçato conta com uma equipe qualificada e experiente no mercado de autopeças.",
  },
  {
    icon: Cloud,
    title: "Sistema em nuvem",
    text: "Sistema informatizado com base de dados nas nuvens, que possibilita agilidade, precisão, confiabilidade e transparência nas negociações com os clientes.",
  },
  {
    icon: RouteIcon,
    title: "Rotas inteligentes",
    text: "Estratégia ativa de cobertura presencial constante em todas as regiões do estado, com rotas inteligentes e objetivas.",
  },
];

const mgFacts = [
  "Área de 586.528 km²",
  "853 municípios",
  "Segundo estado mais populoso do Brasil, com quase 20 milhões de habitantes",
  "Belo Horizonte reúne cerca de 5,5 milhões de habitantes — 3ª maior aglomeração urbana do Brasil",
  "Terceiro maior PIB do Brasil",
  "2ª maior frota nacional: 10,4% da frota circulante",
];

function Servicos() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="bg-ink text-ink-foreground">
        <div className="grid-lines mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pb-24 lg:pt-40">
          <Reveal>
            <p className="font-display text-xs font-medium uppercase tracking-[0.26em] text-primary-glow">Serviços</p>
            <h1 className="mt-4 max-w-[20ch] text-balance font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Representação comercial e marketing em todo MG
            </h1>
            <p className="mt-6 max-w-[56ch] text-pretty text-ink-soft">
              Levamos as indústrias representadas até cada distribuidor do estado, com método,
              tecnologia e presença constante.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="grid-lines-light">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 sm:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <article className="h-full rounded-lg bg-card p-7 ring-1 ring-border">
                <span className="grid size-11 place-items-center rounded-md bg-accent ring-1 ring-primary/20">
                  <s.icon className="size-5 text-primary" aria-hidden />
                </span>
                <h2 className="mt-5 font-display text-xl font-semibold uppercase tracking-tight">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <Reveal>
            <p className="font-display text-xs font-medium uppercase tracking-[0.26em] text-primary-glow">
              <MapPinned className="mr-2 inline size-4 -translate-y-px" aria-hidden />
              Área de atuação
            </p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl">
              Minas Gerais, por inteiro
            </h2>
            <ul className="mt-8 space-y-4">
              {mgFacts.map((fact) => (
                <li key={fact} className="flex items-start gap-3 text-sm leading-relaxed text-ink-foreground/85">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-glow" aria-hidden />
                  {fact}
                </li>
              ))}
            </ul>
            <Link
              to="/contato"
              className="mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-display text-sm font-medium uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:-translate-y-0.5 glow-blue"
            >
              Fale com a equipe <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={150}>
            <figure className="rounded-lg bg-ink-foreground p-8 ring-1 ring-ink-foreground/10">
              <img
                src={mapaMg}
                alt="Mapa de Minas Gerais destacando a área de atuação da H.M. Borçato"
                loading="lazy"
                className="mx-auto max-h-[460px] w-auto"
              />
              <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Cobertura presencial em todas as regiões
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
