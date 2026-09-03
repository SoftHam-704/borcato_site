import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import partsCollage from "@/assets/parts-collage.jpg";

export const Route = createFileRoute("/empresa")({
  head: () => ({
    meta: [
      { title: "A Empresa — H.M. Borçato Representação Comercial" },
      {
        name: "description",
        content:
          "Conheça a história da H.M. Borçato: 14 anos de know-how em representação de autopeças no mercado mineiro e uma nova trajetória iniciada em 2018.",
      },
      { property: "og:title", content: "A Empresa — H.M. Borçato" },
      { property: "og:description", content: "História, missão, visão, valores e equipe da H.M. Borçato." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Empresa,
});

const team = ["Fábio Borçato", "Valéria", "Vanessa", "Phillip", "Gabriela"];

function Empresa() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="bg-ink text-ink-foreground">
        <div className="grid-lines mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pb-24 lg:pt-40">
          <Reveal>
            <p className="font-display text-xs font-medium uppercase tracking-[0.26em] text-primary-glow">Empresa</p>
            <h1 className="mt-4 max-w-[18ch] text-balance font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Nossa história
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="grid-lines-light">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
          <Reveal className="space-y-5 text-pretty leading-relaxed text-muted-foreground">
            <p>
              Com um know-how de 14 anos em representação comercial de autopeças atuando no mercado
              mineiro — dentre outras funções, e na maioria dos anos como gerente de outro
              escritório —, chegamos ao fim de um belo ciclo e, em Setembro de 2018, iniciamos a
              trajetória da H.M. Borçato Representação Comercial e Marketing.
            </p>
            <p>
              Seu sócio-fundador, Fábio Borçato, após anos de experiência atendendo todos os
              distribuidores regionais de MG e as filiais dos nacionais presentes no estado,
              trabalhando para grandes indústrias multinacionais e importantes indústrias nacionais,
              partiu para um novo desafio e criou a H.M. Borçato.
            </p>
            <p>
              O nome da empresa homenageia os dois filhos do sócio-fundador — Henrique e Mateus — e
              o nome de sua família.
            </p>
            <p>
              Procuramos novos desafios no mercado, visando prestar um serviço de representação
              comercial e marketing com excelência, diferenciado e com qualidade, gerando resultados
              e crescimento qualitativo e quantitativo para todos os envolvidos. A prestação dos
              melhores serviços aos nossos clientes e representadas é o que nos move.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <figure className="overflow-hidden rounded-lg ring-1 ring-border glow-blue">
              <img
                src={partsCollage}
                alt="Autopeças representadas pela H.M. Borçato"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 sm:grid-cols-3">
          {[
            {
              title: "Missão",
              text: "Proporcionar às nossas indústrias representadas e aos nossos clientes os melhores, mais competitivos e mais rentáveis negócios.",
            },
            {
              title: "Visão",
              text: "Ser reconhecida como uma empresa de excelência e referência em representação comercial, com o compromisso de aperfeiçoamento contínuo de seus processos e rentabilidade nos seus negócios.",
            },
            {
              title: "Valores",
              text: "Ética, valorização e respeito às pessoas, humildade, transparência, satisfação do cliente, sustentabilidade, evolução contínua, resultados extraordinários e lealdade.",
            },
          ].map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <article className="h-full rounded-lg bg-card p-7 ring-1 ring-border">
                <span className="font-display text-3xl font-semibold text-primary">0{i + 1}</span>
                <h2 className="mt-3 font-display text-xl font-semibold uppercase tracking-tight">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <p className="font-display text-xs font-medium uppercase tracking-[0.26em] text-primary">Pessoas</p>
            <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight sm:text-5xl">
              Equipe qualificada
            </h2>
            <p className="mt-4 max-w-[56ch] text-pretty leading-relaxed text-muted-foreground">
              Contamos com uma equipe de profissionais dos mais qualificados para atender aos nossos
              clientes e representadas.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {team.map((name, i) => (
              <Reveal key={name} delay={i * 80}>
                <div className="group text-center">
                  <div className="mx-auto grid aspect-square w-full max-w-[160px] place-items-center rounded-full bg-ink font-display text-3xl font-semibold uppercase text-primary-glow ring-1 ring-border transition-transform group-hover:-translate-y-1">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <p className="mt-4 font-display text-sm font-medium uppercase tracking-[0.12em]">{name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
