"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type M = { title: string; description: string };

/** Tabbed module browser: one module in focus instead of a wall of cards. Data comes from the product. */
export function ModuleExplorer({ modules, audience = [] }: { modules: M[]; audience?: string[] }) {
  const [i, setI] = useState(0);
  const m = modules[i];
  return (
    <div className="grid gap-6 md:grid-cols-5">
      <div role="tablist" aria-label="Modules" className="flex gap-2 overflow-x-auto md:col-span-2 md:flex-col">
        {modules.map((x, k) => (
          <button key={x.title} role="tab" type="button" aria-selected={k === i} onClick={() => setI(k)}
            className={`shrink-0 rounded-xl border px-4 py-3 text-left font-display font-bold transition ${k === i ? "border-accent bg-accent text-ink" : "border-ink/10 bg-white hover:border-accent"}`}>
            <span className="mr-2 text-xs opacity-70">0{k + 1}</span>{x.title}
          </button>
        ))}
      </div>
      <div className="on-dark relative overflow-hidden rounded-card bg-ink p-8 text-paper md:col-span-3 md:p-10">
        <span aria-hidden className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[10rem] font-bold leading-none text-white/[0.04]">0{i + 1}</span>
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-accent/15 blur-3xl" aria-hidden />
        <AnimatePresence mode="wait">
          <motion.div role="tabpanel" key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="relative">
            <p className="eyebrow">Module 0{i + 1} of 0{modules.length}</p>
            <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{m.title}</h3>
            <p className="mt-4 text-lg text-paper/80">{m.description}</p>
            {audience.length > 0 && (
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-paper/60">Built for</p>
                <ul className="mt-3 flex flex-wrap gap-2">{audience.map((a) => <li key={a} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-paper/85">{a}</li>)}</ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
