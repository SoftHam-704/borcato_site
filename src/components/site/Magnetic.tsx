import { useRef, type ReactNode, type CSSProperties } from "react";

/**
 * Magnetic hover: the child is gently pulled toward the cursor
 * and springs back on leave. Wrap CTAs and key interactive elements.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
  style,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      el.style.transition = "transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)";
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transition = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: "inline-block", ...style }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  );
}
