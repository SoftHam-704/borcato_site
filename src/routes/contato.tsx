import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — H.M. Borçato Representação Comercial" },
      {
        name: "description",
        content:
          "Fale com a H.M. Borçato: (31) 3146-1975, (31) 99656-8022 ou contato@hmborcato.com.br. Envie sua mensagem e entraremos em contato.",
      },
      { property: "og:title", content: "Contato — H.M. Borçato" },
      { property: "og:description", content: "Envie sua mensagem e entraremos em contato." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contato,
});

const channels = [
  { icon: Mail, label: "E-mail", value: "contato@hmborcato.com.br", href: "mailto:contato@hmborcato.com.br" },
  { icon: Phone, label: "Telefone", value: "(31) 3146-1975", href: "tel:+553131461975" },
  { icon: Phone, label: "Celular / WhatsApp", value: "(31) 99656-8022", href: "tel:+5531996568022" },
];

function Contato() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") ?? "");
    const email = String(data.get("email") ?? "");
    const mensagem = String(data.get("mensagem") ?? "");
    const subject = encodeURIComponent(`Contato pelo site — ${nome}`);
    const body = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`);
    window.location.href = `mailto:contato@hmborcato.com.br?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="bg-ink text-ink-foreground">
        <div className="grid-lines mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pb-24 lg:pt-40">
          <Reveal>
            <p className="font-display text-xs font-medium uppercase tracking-[0.26em] text-primary-glow">Contato</p>
            <h1 className="mt-4 max-w-[20ch] text-balance font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Envie sua mensagem e entraremos em contato
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="grid-lines-light">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-tight">Canais diretos</h2>
            <ul className="mt-8 space-y-5">
              {channels.map((c) => (
                <li key={c.value}>
                  <a href={c.href} className="group flex items-center gap-4">
                    <span className="grid size-11 place-items-center rounded-md bg-accent ring-1 ring-primary/20 transition-transform group-hover:-translate-y-0.5">
                      <c.icon className="size-5 text-primary" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">{c.label}</span>
                      <span className="font-display text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {c.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              Atendemos distribuidores, oficinas e indústrias em todo o estado de Minas Gerais,
              a partir de Belo Horizonte.
            </p>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-lg bg-card p-7 ring-1 ring-border sm:p-9 glow-blue"
              aria-label="Formulário de contato"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nome" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Nome
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    required
                    placeholder="Seu nome"
                    className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="empresa" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Empresa
                  </label>
                  <input
                    id="empresa"
                    name="empresa"
                    placeholder="Sua empresa"
                    className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="voce@empresa.com.br"
                    className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="mensagem" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={5}
                    placeholder="Como podemos ajudar?"
                    className="w-full resize-none rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-display text-sm font-medium uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:-translate-y-0.5 glow-blue"
              >
                Enviar mensagem
              </button>
              {sent && (
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-primary" role="status">
                  <CheckCircle2 className="size-4" aria-hidden />
                  Abrimos seu aplicativo de e-mail com a mensagem pronta para envio.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
