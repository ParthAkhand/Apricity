"use client";
import { useRef, type ReactNode } from "react";

/** Wraps a card: cursor-following spotlight (--mx/--my) and a small tilt. Disabled for reduced motion. */
export function Spot({ children, className = "", tilt = 4 }: { children: ReactNode; className?: string; tilt?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.transform = `perspective(900px) translateY(-6px) rotateX(${(0.5 - y) * tilt}deg) rotateY(${(x - 0.5) * tilt}deg)`;
  };
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={() => { if (ref.current) ref.current.style.transform = ""; }}
      className={`spot transition-transform duration-300 ease-out ${className}`}>{children}</div>
  );
}
