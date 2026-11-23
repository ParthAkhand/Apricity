"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { DemoButton } from "./DemoButton";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function Header({ products }: { products: { slug: string; name: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="on-dark sticky top-0 z-40 border-b border-white/10 bg-ink text-paper">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label="Apricity Digital home" className="flex items-center gap-2">
          <Image src="/apricity-logo.png" alt="" width={36} height={30} priority />
          <span className="whitespace-nowrap font-display text-lg font-bold tracking-tight">Apricity Digital</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-paper/80 hover:text-accent">{n.label}</Link>
          ))}
          <DemoButton products={products} className="btn btn-primary whitespace-nowrap !py-2" />
        </nav>
        <button type="button" className="lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="container-x grid gap-1 pb-4 lg:hidden">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded py-2 text-paper/90">{n.label}</Link>
          ))}
          <DemoButton products={products} className="btn btn-primary mt-2" />
        </nav>
      )}
    </header>
  );
}
