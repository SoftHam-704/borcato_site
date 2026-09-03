import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Magnetic } from "./Magnetic";
import heroParts from "@/assets/hero-parts.jpg";

const marquee = [
  "NTN",
  "Tungsram",
  "Airmaks",
  "853 municípios",
  "586.528 km²",
  "3º maior PIB do Brasil",
  "2ª maior frota nacional",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--mx", String(x));
        el.style.setProperty("--my", String(y));
      });
    };
    const onScroll = () => {
      el.style.setProperty("--sy", String(Math.min(1, window.scrollY / 700)));
    };

    el.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="hero relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-ink-foreground"
      aria-label="Apresentação"
    >
      <div className="hero-media absolute inset-0 -z-10">
        <img
          src={heroParts}
          alt="Rolamentos e autopeças de precisão em metal polido sobre fundo escuro"
          width={1920}
          height={1080}
          fetchPriority="high"
          className="h-full w-full scale-110 object-cover opacity-60"
        />
      </div>
      <div className="hero-overlay absolute inset-0 -z-10" aria-hidden />
      <div className="hero-vignette absolute inset-0 -z-10" aria-hidden />
      <div className="grid-lines absolute inset-0 -z-10 opacity-50" aria-hidden />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-16 pt-24 sm:pt-28">
        <p className="hero-in flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.3em] text-primary-glow" style={{ "--d": "0.1s" } as React.CSSProperties}>
          <span className="h-px w-12 bg-primary-glow" aria-hidden />
          Desde 2018 · Belo Horizonte, MG
        </p>

        <h1 className="mt-8 font-display text-[clamp(2.75rem,9vw,7.5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.02em]">
          <span className="line-mask">
            <span className="line-in" style={{ "--d": "0.25s" } as React.CSSProperties}>
              Representação
            </span>
          </span>
          <span className="line-mask">
            <span className="line-in" style={{ "--d": "0.35s" } as React.CSSProperties}>
              comercial <span className="hero-stroke">de</span>
            </span>
          </span>
          <span className="line-mask">
            <span className="line-in text-primary-glow" style={{ "--d": "0.45s" } as React.CSSProperties}>
              autopeças
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 border-t border-ink-foreground/12 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <p
            className="hero-in max-w-[46ch] text-pretty leading-relaxed text-ink-soft"
            style={{ "--d": "0.6s" } as React.CSSProperties}
          >
            Levamos as grandes indústrias até cada distribuidor mineiro — cobertura presencial em
            todo o estado, sistema em nuvem e rotas inteligentes.
          </p>

          <div
            className="hero-in flex flex-wrap items-center gap-4"
            style={{ "--d": "0.72s" } as React.CSSProperties}
          >
            <Magnetic strength={0.4}>
              <Link
                to="/contato"
                data-cursor="Vamos lá"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-display text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground glow-blue"
              >
                Fale conosco
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </Magnetic>
            <Magnetic strength={0.4}>
              <Link
                to="/servicos"
                data-cursor="Explorar"
                className="inline-flex items-center gap-3 rounded-full border border-ink-foreground/25 px-8 py-4 font-display text-xs font-medium uppercase tracking-[0.18em] text-ink-foreground transition-colors duration-300 hover:border-primary-glow hover:text-primary-glow"
              >
                Nossos serviços
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-ink-foreground/12 bg-ink/40 backdrop-blur-sm">
        <div className="marquee py-3.5">
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <span key={dup} className="marquee-group" aria-hidden={dup === 1}>
                {marquee.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-6 font-display text-[11px] uppercase tracking-[0.28em] text-ink-soft"
                  >
                    {item}
                    <span className="size-1 rounded-full bg-primary-glow" aria-hidden />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      <span
        className="hero-in pointer-events-none absolute bottom-24 right-6 hidden items-center gap-2 font-display text-[10px] uppercase tracking-[0.3em] text-ink-soft lg:flex"
        style={{ "--d": "1s" } as React.CSSProperties}
        aria-hidden
      >
        Role
        <ArrowDown className="size-3.5 animate-bounce" />
      </span>
    </section>
  );
}
