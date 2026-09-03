import { useEffect, useState } from "react";

const sections = [
  { id: "sec-empresa", label: "Empresa" },
  { id: "sec-pilares", label: "Princípios" },
  { id: "sec-servicos", label: "Serviços" },
  { id: "sec-noticias", label: "Notícias" },
  { id: "sec-contato", label: "Contato" },
];

/** Fixed side rail: scroll progress + active section indicator. */
export function ScrollRail() {
  const [active, setActive] = useState(-1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);

      let current = -1;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <aside className="scroll-rail" aria-hidden>
      <span className="scroll-rail-count">
        {String(Math.max(0, active + 1)).padStart(2, "0")}
        <i>/{String(sections.length).padStart(2, "0")}</i>
      </span>
      <span className="scroll-rail-track">
        <span className="scroll-rail-bar" style={{ transform: `scaleY(${progress})` }} />
      </span>
      <ul className="scroll-rail-list">
        {sections.map((s, i) => (
          <li key={s.id} data-active={i === active ? "true" : undefined}>
            <button
              type="button"
              tabIndex={-1}
              onClick={() =>
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
