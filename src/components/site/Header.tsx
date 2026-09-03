import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { Magnetic } from "./Magnetic";
import logo from "@/assets/hm-borcato-logo.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/empresa", label: "Empresa" },
  { to: "/servicos", label: "Serviços" },
  { to: "/noticias", label: "Notícias" },
  { to: "/contato", label: "Contato" },
] as const;

function RollLink({
  to,
  label,
  exact,
  dark,
  onClick,
}: {
  to: string;
  label: string;
  exact: boolean;
  dark: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      activeOptions={{ exact }}
      className="nav-roll group"
      data-cursor
    >
      {({ isActive }) => (
        <span className="nav-roll-box">
          <span
            className={`nav-roll-inner ${
              isActive
                ? dark
                  ? "text-primary-glow"
                  : "text-primary"
                : dark
                  ? "text-ink-foreground/75"
                  : "text-foreground/70"
            }`}
          >
            <span className="nav-roll-line">{label}</span>
            <span className={`nav-roll-line ${dark ? "text-primary-glow" : "text-primary"}`} aria-hidden>
              {label}
            </span>
          </span>
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        setScrolled(y > 32);
        // hide when scrolling down past the hero fold, reveal on any upward intent
        setHidden(y > 480 && y > lastY + 4);
        if (y < lastY - 4) setHidden(false);
        lastY = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dark = !scrolled && !open;

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50 ${scrolled ? "is-scrolled" : ""} ${hidden ? "is-hidden" : ""}`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 sm:h-[4.5rem]">
          <Link to="/" className="flex items-center gap-3" aria-label="H.M. Borçato — Home" data-cursor>
            <img
              src={logo}
              alt="H.M. Borçato Representação Comercial e Marketing"
              className={`h-10 w-auto transition-all duration-500 ${dark ? "brightness-0 invert" : ""}`}
            />
            <span
              className={`hidden font-display text-[10px] font-medium uppercase leading-tight tracking-[0.18em] transition-colors duration-500 sm:block ${
                dark ? "text-ink-foreground/60" : "text-muted-foreground"
              }`}
            >
              Representação Comercial
              <span className="block">e Marketing</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
            {navItems.map((item) => (
              <RollLink
                key={item.to}
                to={item.to}
                label={item.label}
                exact={item.to === "/"}
                dark={dark}
              />
            ))}
          </nav>

          <Magnetic className="hidden sm:inline-block" strength={0.3}>
            <a
              href="tel:+553131461975"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-display text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground glow-blue"
              data-cursor="Ligar"
            >
              <Phone className="size-3.5" aria-hidden />
              (31) 3146-1975
            </a>
          </Magnetic>

          <button
            className={`inline-flex size-10 items-center justify-center rounded-full border transition-colors md:hidden ${
              dark ? "border-ink-foreground/25 text-ink-foreground" : "border-border text-foreground"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav className="flex h-full flex-col justify-center px-8" aria-label="Menu móvel">
          <ul className="flex flex-col gap-2">
            {navItems.map((item, i) => (
              <li key={item.to} style={{ "--i": i } as React.CSSProperties} className="mobile-menu-item">
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 py-2"
                >
                  <span className="font-display text-xs text-primary-glow">0{i + 1}</span>
                  <span className="font-display text-5xl font-semibold uppercase leading-none text-ink-foreground transition-colors group-hover:text-primary-glow">
                    {item.label}
                  </span>
                  <ArrowUpRight className="size-5 self-center text-ink-soft opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="tel:+553131461975"
            className="mt-12 inline-flex w-fit items-center gap-3 rounded-full bg-primary px-7 py-3.5 font-display text-sm font-medium uppercase tracking-[0.16em] text-primary-foreground"
          >
            <Phone className="size-4" aria-hidden />
            (31) 3146-1975
          </a>
        </nav>
      </div>
    </>
  );
}
