"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

type T = { id: number; text: string };
const listeners = new Set<(t: T) => void>();
/** Fire a toast from anywhere on the client: toast("Saved"). */
export const toast = (text: string) => listeners.forEach((l) => l({ id: Date.now() + Math.random(), text }));

export function Toaster() {
  const [items, setItems] = useState<T[]>([]);
  useEffect(() => {
    const add = (t: T) => {
      setItems((x) => [...x, t]);
      setTimeout(() => setItems((x) => x.filter((i) => i.id !== t.id)), 4000);
    };
    listeners.add(add);
    return () => { listeners.delete(add); };
  }, []);
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed bottom-5 right-5 z-[60] flex flex-col gap-2">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: 40 }}
            className="on-dark flex items-center gap-2 rounded-full border border-accent/40 bg-ink-800 px-4 py-3 text-sm text-paper shadow-[0_10px_40px_-10px_var(--accent-glow)]">
            <CheckCircle2 size={18} className="text-accent" aria-hidden />{t.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
