import { useEffect, useState } from "react";
import logo from "@/assets/hm-borcato-logo.png";

const WORDS = ["Representação", "Comercial", "Marketing", "Minas Gerais"];

export function Preloader() {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("hmb-preloaded") === "1") {
      setDone(true);
      document.body.classList.remove("is-loading");
      return;
    }

    document.body.classList.add("is-loading");
    let value = 0;
    const tick = window.setInterval(() => {
      value = Math.min(100, value + Math.random() * 9 + 3);
      setCount(Math.floor(value));
      if (value >= 100) {
        window.clearInterval(tick);
        window.setTimeout(() => setLeaving(true), 320);
        window.setTimeout(() => {
          setDone(true);
          document.body.classList.remove("is-loading");
          sessionStorage.setItem("hmb-preloaded", "1");
        }, 1500);
      }
    }, 90);

    const words = window.setInterval(() => setWord((w) => (w + 1) % WORDS.length), 380);

    return () => {
      window.clearInterval(tick);
      window.clearInterval(words);
      document.body.classList.remove("is-loading");
    };
  }, []);

  if (done) return null;

  return (
    <div
      className={`preloader ${leaving ? "is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Carregando"
    >
      <div className="preloader-panel" aria-hidden />
      <div className="preloader-panel" aria-hidden />
      <div className="preloader-panel" aria-hidden />
      <div className="preloader-panel" aria-hidden />

      <div className="preloader-content">
        <div className="flex items-center gap-4">
          <img src={logo} alt="" className="h-9 w-auto brightness-0 invert" />
          <span className="h-8 w-px bg-ink-foreground/20" aria-hidden />
          <span className="overflow-hidden font-display text-xs uppercase tracking-[0.3em] text-ink-soft">
            {WORDS[word]}
          </span>
        </div>

        <div className="mt-10 w-[min(78vw,760px)]">
          <div className="flex items-end justify-between">
            <span className="font-display text-[18vw] font-semibold leading-[0.8] tracking-tighter text-ink-foreground sm:text-[9rem]">
              {String(count).padStart(3, "0")}
            </span>
            <span className="pb-3 font-display text-xs uppercase tracking-[0.3em] text-primary-glow">%</span>
          </div>
          <div className="mt-6 h-px w-full bg-ink-foreground/15">
            <div
              className="h-px bg-primary-glow transition-[width] duration-200 ease-out"
              style={{ width: `${count}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
