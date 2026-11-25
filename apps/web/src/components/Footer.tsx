import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { Product, Settings } from "@apricity/shared";
import { productHref } from "@/lib/api";

export function Footer({ settings: s, products }: { settings: Settings; products: Product[] }) {
  const link = "inline-block py-1.5 text-paper/80 transition hover:translate-x-1 hover:text-accent";
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-paper">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="glow-drift pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-accent/10 blur-[110px]" aria-hidden />
      <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden />
      <div className="container-x relative grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Image src="/apricity-logo.png" alt={s.name} width={72} height={60} />
          <p className="mt-4 max-w-sm text-base text-paper/80">{s.name} is a {s.parentCompany} company.</p>
          <p className="mt-3 max-w-sm text-sm text-paper/60">{s.tagline} We build software for municipal corporations, enterprises and institutions.</p>
        </div>
        <nav aria-label="Products" className="md:col-span-2">
          <h2 className="eyebrow mb-3">Products</h2>
          <ul className="space-y-2 text-sm">
            {products.map((p) => (
              <li key={p.id}>
                {p.landingType === "EXTERNAL"
                  ? <a className={link} href={productHref(p)} target="_blank" rel="noopener noreferrer">{p.name}<ArrowUpRight size={14} className="ml-1 inline" aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a>
                  : <Link className={link} href={productHref(p)}>{p.name}</Link>}
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company" className="md:col-span-3">
          <h2 className="eyebrow mb-3">Company</h2>
          <ul className="space-y-2 text-sm">
            <li><Link className={link} href="/about">About</Link></li>
            <li><Link className={link} href="/products">Products</Link></li>
            <li><Link className={link} href="/services">Services</Link></li>
            <li><Link className={link} href="/careers">Careers</Link></li>
            <li><Link className={link} href="/contact">Contact</Link></li>
          </ul>
          <h2 className="eyebrow mb-3 mt-6">Legal</h2>
          <ul className="space-y-2 text-sm">
            <li><Link className={link} href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
            <li><Link className={link} href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link className={link} href="/support-policy">Support Policy</Link></li>
          </ul>
        </nav>
        <address className="text-sm not-italic text-paper/80 md:col-span-3">
          <h2 className="eyebrow mb-3">Contact</h2>
          <p className="flex gap-2"><MapPin size={16} className="mt-1 shrink-0 text-accent" aria-hidden />{s.address}</p>
          <p className="mt-2 flex gap-2"><Phone size={16} className="mt-2 shrink-0 text-accent" aria-hidden /><a className={link} href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a></p>
          <p className="flex gap-2"><Mail size={16} className="mt-2 shrink-0 text-accent" aria-hidden /><a className={link} href={`mailto:${s.email}`}>{s.email}</a></p>
        </address>
      </div>
      <div className="relative border-t border-white/10 py-5 text-center text-xs text-paper/60">
        © 2026 by {s.name}. All Rights Reserved
      </div>
    </footer>
  );
}
