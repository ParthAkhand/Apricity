"use client";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { LeadForm } from "./LeadForm";

export function DemoButton({ products, className = "btn btn-primary", label = "Request a demo", defaultProduct }: { products: { slug: string; name: string }[]; className?: string; label?: string; defaultProduct?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  // Mount the form only after first open: keeps hydration light on every page.
  const [opened, setOpened] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => { setOpened(true); ref.current?.showModal(); }}>{label}</button>
      <dialog ref={ref} aria-labelledby="demo-title" className="w-[min(36rem,92vw)] rounded-2xl p-0 text-ink backdrop:bg-ink/70">
        <div className="relative bg-paper p-6 sm:p-8">
          <button type="button" aria-label="Close" className="absolute right-4 top-4 rounded p-1 hover:bg-ink/10" onClick={() => ref.current?.close()}><X size={20} aria-hidden /></button>
          <h2 id="demo-title" className="mb-1 font-display text-2xl font-bold">Request a demo</h2>
          <p className="mb-5 text-sm text-ink/70">Tell us a little about your organisation and we will get in touch.</p>
          {opened && <LeadForm products={products} source="demo-modal" defaultProduct={defaultProduct} />}
        </div>
      </dialog>
    </>
  );
}
