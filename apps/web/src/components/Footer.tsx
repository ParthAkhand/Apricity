import Image from "next/image";
import Link from "next/link";
import type { Settings } from "@apricity/shared";

export function Footer({ settings: s }: { settings: Settings }) {
  const link = "inline-block py-1.5 text-paper/80 transition hover:translate-x-1 hover:text-accent";
  return (
    <footer className="on-dark relative bg-ink text-paper grid-bg">
      <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden />
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image src="/apricity-logo.png" alt={s.name} width={72} height={60} />
          <p className="mt-4 max-w-sm text-base text-paper/80">{s.name} is a {s.parentCompany} company.</p>
        </div>
        <nav aria-label="Company">
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
        <address className="text-sm not-italic text-paper/80">
          <h2 className="eyebrow mb-3">Contact</h2>
          <p>{s.address}</p>
          <p className="mt-2"><a className={link} href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a></p>
          <p><a className={link} href={`mailto:${s.email}`}>{s.email}</a></p>
        </address>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-paper/60">
        © 2026 by {s.name}. All Rights Reserved
      </div>
    </footer>
  );
}
