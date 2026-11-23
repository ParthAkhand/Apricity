"use client";
import { useState } from "react";

type M = { title: string; description: string };

/** Tabbed module browser: one module in focus instead of a wall of cards. Data comes from the product. */
export function ModuleExplorer({ modules }: { modules: M[] }) {
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
      <div role="tabpanel" key={i} className="step-in on-dark rounded-3xl bg-ink p-8 text-paper md:col-span-3">
        <p className="eyebrow">Module 0{i + 1}</p>
        <h3 className="mt-2 font-display text-3xl font-bold">{m.title}</h3>
        <p className="mt-3 text-lg text-paper/80">{m.description}</p>
      </div>
    </div>
  );
}
