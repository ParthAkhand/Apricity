"use client";
import { toast } from "@/components/Toaster";
import { useCallback, useEffect, useState } from "react";
import type { Product } from "@apricity/shared";
import { adm, refreshSite } from "@/lib/adminApi";

// shortcut: nested content (modules, features, metrics, content) is edited as JSON, not per-field widgets; upgrade when non-developers edit it.
const DETAIL_KEYS = ["audience", "modules", "features", "metrics", "media", "content"] as const;
const toForm = (p: Product) => ({
  id: p.id, order: p.order, slug: p.slug, name: p.name, tagline: p.tagline, summary: p.summary,
  landingType: p.landingType, externalUrl: p.externalUrl ?? "", published: p.published,
  details: JSON.stringify(Object.fromEntries(DETAIL_KEYS.map((k) => [k, p[k]])), null, 2),
});
type Form = ReturnType<typeof toForm>;

export default function AdminProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [form, setForm] = useState<Form | null>(null);
  const [msg, setMsg] = useState("");

  const load = useCallback(() => adm<Product[]>("/admin/products").then(setItems), []);
  useEffect(() => { load(); }, [load]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    try {
      const { id, details, externalUrl, ...rest } = form;
      const body = { ...rest, ...JSON.parse(details), externalUrl: externalUrl || null };
      await adm(`/admin/products/${id}`, { method: "PUT", json: body });
      setForm(null); setMsg("Saved."); toast("Product saved"); await load(); refreshSite();
    } catch (err) { setMsg(err instanceof Error ? err.message : "Save failed"); }
  }

  async function act(fn: () => Promise<unknown>) {
    try { await fn(); await load(); refreshSite(); } catch (err) { setMsg(err instanceof Error ? err.message : "Failed"); }
  }
  const move = (i: number, d: number) => {
    const ids = items.map((p) => p.id);
    [ids[i], ids[i + d]] = [ids[i + d], ids[i]];
    return act(() => adm("/admin/products/reorder", { method: "PUT", json: { ids } }));
  };

  const field = "w-full rounded-lg border border-ink/25 bg-white px-3 py-2 text-sm";
  const set = (k: keyof Form, v: string | boolean) => setForm((f) => (f ? { ...f, [k]: v } : f));

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Products</h1>
      <p role="status" className="mt-2 min-h-5 text-sm text-ink/70">{msg}</p>

      <ul className="mt-4 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
        {items.map((p, i) => (
          <li key={p.id} className="flex flex-wrap items-center gap-3 p-4">
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{p.name} <span className="text-xs font-normal text-ink/60">/{p.slug} · {p.landingType}</span></p>
              <p className="truncate text-sm text-ink/70">{p.tagline}</p>
            </div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.published} onChange={() => act(() => adm(`/admin/products/${p.id}`, { method: "PUT", json: { ...p, published: !p.published } }))} /> Published</label>
            <button className="btn btn-ghost !px-3 !py-1.5" disabled={i === 0} aria-label={`Move ${p.name} up`} onClick={() => move(i, -1)}>↑</button>
            <button className="btn btn-ghost !px-3 !py-1.5" disabled={i === items.length - 1} aria-label={`Move ${p.name} down`} onClick={() => move(i, 1)}>↓</button>
            <button className="btn btn-ghost !px-3 !py-1.5" onClick={() => { setForm(toForm(p)); setMsg(""); }}>Edit</button>
            <button className="btn btn-ghost !px-3 !py-1.5 text-red-700" onClick={() => confirm(`Delete ${p.name}?`) && act(() => adm(`/admin/products/${p.id}`, { method: "DELETE" }))}>Delete</button>
          </li>
        ))}
      </ul>

      {form && (
        <form onSubmit={save} className="mt-8 grid gap-4 rounded-2xl border border-ink/10 bg-white p-6 sm:grid-cols-2">
          <h2 className="font-display text-xl font-bold sm:col-span-2">Edit {form.name}</h2>
          <div><label className="mb-1 block text-sm font-medium" htmlFor="p-slug">Slug</label><input id="p-slug" className={field} required value={form.slug} onChange={(e) => set("slug", e.target.value)} /></div>
          <div><label className="mb-1 block text-sm font-medium" htmlFor="p-name">Name</label><input id="p-name" className={field} required value={form.name} onChange={(e) => set("name", e.target.value)} /></div>
          <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium" htmlFor="p-tag">Tagline</label><input id="p-tag" className={field} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} /></div>
          <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium" htmlFor="p-sum">Summary</label><textarea id="p-sum" rows={2} className={field} value={form.summary} onChange={(e) => set("summary", e.target.value)} /></div>
          <div><label className="mb-1 block text-sm font-medium" htmlFor="p-type">Landing</label>
            <select id="p-type" className={field} value={form.landingType} onChange={(e) => set("landingType", e.target.value)}><option value="INTERNAL">Internal page</option><option value="EXTERNAL">External link</option></select></div>
          <div><label className="mb-1 block text-sm font-medium" htmlFor="p-url">External URL (https)</label><input id="p-url" className={field} value={form.externalUrl} onChange={(e) => set("externalUrl", e.target.value)} disabled={form.landingType !== "EXTERNAL"} /></div>
          <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium" htmlFor="p-det">Details (JSON: audience, modules, features, metrics, media, content)</label><textarea id="p-det" rows={12} className={`${field} font-mono text-xs`} value={form.details} onChange={(e) => set("details", e.target.value)} /></div>
          <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} /> Published</label>
          <div className="flex gap-3 sm:col-span-2"><button className="btn btn-dark" type="submit">Save</button><button className="btn btn-ghost" type="button" onClick={() => setForm(null)}>Cancel</button></div>
        </form>
      )}
    </div>
  );
}
