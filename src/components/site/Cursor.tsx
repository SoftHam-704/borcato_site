import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: precise dot + lagging ring (mix-blend-difference).
 * Grows and labels itself over interactive elements ([data-cursor], links, buttons).
 * Only mounts on fine pointers (mouse/trackpad).
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      const t = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, [data-cursor]"
      );
      setActive(!!t);
      setLabel(t?.dataset["cursor"] ?? null);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring"
        data-active={active}
        data-pressed={pressed}
        aria-hidden
      >
        {label && <span className="cursor-label">{label}</span>}
      </div>
      <div ref={dotRef} className="cursor-dot" data-active={active} aria-hidden />
    </>
  );
}
