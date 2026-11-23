"use client";
import { useEffect, useRef, useState } from "react";

/** Counts "11+" style values up from 0 when visible. Non-numeric values render as-is. */
export function CountUp({ value }: { value: string }) {
  const m = value.match(/^(\d+)(.*)$/);
  const target = m ? Number(m[1]) : 0;
  const suffix = m ? m[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  // Start at the final value so SSR/no-JS shows the real number; the effect replays it from 0.
  const [n, setN] = useState(target);
  useEffect(() => {
    const el = ref.current;
    if (!el || !m || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1200, 1);
        setN(Math.round(target * (1 - (1 - p) ** 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      setN(0);
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
    // Depend on the string, not `m`: the match array is new every render and re-ran this effect on each setN (endless restart loop).
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps
  return <span ref={ref}>{m ? `${n}${suffix}` : value}</span>;
}
