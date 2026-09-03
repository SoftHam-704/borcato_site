import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  index: number;
  id?: string;
  /** last panel is never covered, so it never recedes */
  last?: boolean;
  className?: string;
};

/**
 * Igloo-style depth stacking: each panel pins to the top, arrives with a curved
 * leading edge, then is pushed back in 3D space as the next panel slides over.
 */
export function StackSection({ children, index, id, last = false, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const update = () => {
      raf = 0;
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;

      // entering: leading edge travelling from bottom of viewport up to the top
      const e = ease(Math.min(1, Math.max(0, 1 - r.top / (vh * 0.85))));
      // covered: how far the next panel has pushed this one back
      const travel = Math.max(1, r.height - vh * 0.3);
      const p = last ? 0 : Math.min(1, Math.max(0, -r.top / travel));

      inner.style.setProperty("--e", e.toFixed(4));
      inner.style.setProperty("--p", p.toFixed(4));
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
  }, [last]);

  return (
    <div ref={wrapRef} id={id} className="stack-item" style={{ zIndex: index }}>
      <div ref={innerRef} className={`stack-inner ${className}`}>
        <div className="stack-content">{children}</div>
        <span className="stack-edge" aria-hidden />
        <span className="stack-shade" aria-hidden />
      </div>
    </div>
  );
}
