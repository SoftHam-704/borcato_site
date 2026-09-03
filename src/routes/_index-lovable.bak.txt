import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Cloud, Eye, Heart, MapPinned, Phone, Users } from "lucide-react";
import { Header } from "@/components/site/Header";
import { HeroTravessia } from "@/components/site/HeroTravessia";
import { Preloader } from "@/components/site/Preloader";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { StackSection } from "@/components/site/StackSection";
import { ScrollRail } from "@/components/site/ScrollRail";
import { newsItems } from "@/lib/news";
import partsCollage from "@/assets/parts-collage.jpg";
import mapaMg from "@/assets/mapa-mg.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "H.M. Borçato — Representação Comercial e Marketing de Autopeças" },
      {
        name: "description",
        content:
          "Representação comercial e marketing de autopeças em Minas Gerais. Cobertura em 853 municípios, com qualidade, tecnologia e os melhores negócios para distribuidores.",
      },
      { property: "og:title", content: "H.M. Borçato — Representação Comercial e Marketing" },
      {
        property: "og:description",
        content: "Representação de autopeças com cobertura em todo o estado de Minas Gerais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const metrics = [
  { value: "853", label: "Municípios em Minas Gerais" },
  { value: "586.528", label: "km² de área de atuação" },
  { value: "3º", label: "Maior PIB do Brasil" },
  { value: "2ª", label: "Maior frota nacional" },
];

const pillars = [
  {
    icon: Award,
    title: "Missão",
    text: "Proporcionar às nossas indústrias representadas e aos nossos clientes os melhores, mais competitivos e mais rentáveis negócios.",
  },
  {
    icon: Eye,
    title: "Visão",
    text: "Ser reconhecida como empresa de excelência e referência em representação comercial, com aperfeiçoamento contínuo e rentabilidade.",
  },
  {
    icon: Heart,
    title: "Valores",
    text: "Ética, respeito às pessoas, humildade, transparência, satisfação do cliente, sustentabilidade, evolução contínua e lealdade.",
  },
];

function Index() {
  return (
    <div className="home-borcato min-h-screen bg-background text-foreground">
      <Preloader />
      <Header />
      <ScrollRail />

      <HeroTravessia />

      {/* MÉTRICAS MG */}
      <section aria-label="Minas Gerais em números" className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 divide-border lg:grid-cols-4 lg:divide-x">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 80} className="border-border">
                <div className="px-2 py-10 lg:px-8">
                  <p className="font-display text-4xl font-semibold tracking-tight text-primary lg:text-5xl">
                    {m.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="stack">
      {/* SOBRE */}
      <StackSection index={1} id="sec-empresa">
      <section className="grid-lines-light flex min-h-[100svh] items-center bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <Reveal>
            <p className="font-display text-xs font-medium uppercase tracking-[0.26em] text-primary">A empresa</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl">
              Uma ponte entre a indústria e o mercado mineiro
            </h2>
            <p className="mt-6 max-w-[56ch] text-pretty leading-relaxed text-muted-foreground">
              Com um know-how de 14 anos em representação comercial de autopeças atuando no mercado
              mineiro, em Setembro de 2018 iniciamos a trajetória da H.M. Borçato Representação
              Comercial e Marketing.
            </p>
            <p className="mt-4 max-w-[56ch] text-pretty leading-relaxed text-muted-foreground">
              Os produtos que oferecemos são feitos especialmente para quem busca qualidade e
              segurança, desenvolvidos pela mais alta tecnologia, para pessoas como você que sempre
              estão em busca do novo com os melhores preços.
            </p>
            <Link
              to="/empresa"
              className="mt-8 inline-flex items-center gap-2 font-display text-sm font-medium uppercase tracking-[0.14em] text-primary transition-colors hover:text-accent-foreground"
            >
              Conheça nossa história <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={150}>
            <figure className="overflow-hidden rounded-lg ring-1 ring-border glow-blue">
              <img
                src={partsCollage}
                alt="Conjunto de autopeças representadas pela H.M. Borçato"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
          </Reveal>
        </div>
      </section>
      </StackSection>

      {/* MISSÃO / VISÃO / VALORES */}
      <StackSection index={2} id="sec-pilares">
      <section className="flex min-h-[100svh] items-center border-t border-border bg-secondary">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <article className="h-full rounded-lg bg-card p-7 ring-1 ring-border">
                <p.icon className="size-6 text-primary" aria-hidden />
                <h3 className="mt-4 font-display text-xl font-semibold uppercase tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      </StackSection>

      {/* SERVIÇOS + MAPA */}
      <StackSection index={3} id="sec-servicos">
      <section className="flex min-h-[100svh] items-center bg-ink text-ink-foreground">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <Reveal>
            <p className="font-display text-xs font-medium uppercase tracking-[0.26em] text-primary-glow">
              Serviços e cobertura
            </p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl">
              Presença constante em todas as regiões do estado
            </h2>
            <p className="mt-6 max-w-[54ch] text-pretty leading-relaxed text-ink-soft">
              Contamos com um sistema informatizado com base de dados nas nuvens, que nos dá
              agilidade, precisão, confiabilidade e transparência nas negociações. Mantemos uma
              estratégia de cobertura presencial com rotas inteligentes e objetivas.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Users, text: "Equipe qualificada e experiente no mercado de autopeças" },
                { icon: Cloud, text: "Base de dados em nuvem para negociações ágeis e transparentes" },
                { icon: MapPinned, text: "Cobertura presencial constante em todas as regiões de MG" },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-4">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-md bg-primary/20 ring-1 ring-primary/40">
                    <item.icon className="size-4.5 text-primary-glow" aria-hidden />
                  </span>
                  <p className="text-sm leading-relaxed text-ink-foreground/85">{item.text}</p>
                </li>
              ))}
            </ul>
            <Link
              to="/servicos"
              className="mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-display text-sm font-medium uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:-translate-y-0.5 glow-blue"
            >
              Ver serviços <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={150} className="flex items-center">
            <figure className="w-full rounded-lg bg-ink-foreground p-8 ring-1 ring-ink-foreground/10">
              <img
                src={mapaMg}
                alt="Mapa de Minas Gerais com as regiões de atuação da H.M. Borçato"
                loading="lazy"
                className="mx-auto max-h-[420px] w-auto"
              />
              <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Cobertura em todo o território mineiro
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      </StackSection>

      {/* NOTÍCIAS */}
      <StackSection index={4} id="sec-noticias">
      <section className="flex min-h-[100svh] items-center bg-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="font-display text-xs font-medium uppercase tracking-[0.26em] text-primary">
                  Fique por dentro
                </p>
                <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight sm:text-5xl">
                  Notícias e lançamentos
                </h2>
              </div>
              <Link
                to="/noticias"
                className="hidden items-center gap-2 font-display text-sm font-medium uppercase tracking-[0.14em] text-primary hover:text-accent-foreground sm:inline-flex"
              >
                Ver todas <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsItems.slice(0, 3).map((item, i) => (
              <Reveal key={item.slug} delay={i * 100}>
                <Link to="/noticias" className="group block">
                  <article className="h-full overflow-hidden rounded-lg bg-card ring-1 ring-border transition-transform group-hover:-translate-y-1">
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
                      <h3 className="mt-2 font-display text-lg font-semibold uppercase leading-snug tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      </StackSection>

      {/* CTA CONTATO */}
      <StackSection index={5} id="sec-contato" last>
      <section className="flex min-h-[100svh] items-center bg-ink text-ink-foreground">
        <div className="grid-lines mx-auto w-full max-w-6xl px-6 py-20 text-center lg:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-[20ch] text-balance font-display text-4xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl">
              A prestação dos melhores serviços é o que nos move
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-pretty text-ink-soft">
              Fale com nossa equipe e descubra como podemos gerar resultados para a sua indústria ou
              para o seu negócio de distribuição.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-display text-sm font-medium uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:-translate-y-0.5 glow-blue"
              >
                Enviar mensagem <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a
                href="tel:+5531996568022"
                className="inline-flex items-center gap-2 rounded-md border border-ink-foreground/30 px-7 py-3.5 font-display text-sm font-medium uppercase tracking-[0.14em] transition-colors hover:border-primary-glow hover:text-primary-glow"
              >
                <Phone className="size-4" aria-hidden /> (31) 99656-8022
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      </StackSection>
      </div>

      <Footer />
    </div>
  );
}
