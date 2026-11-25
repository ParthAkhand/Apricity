"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const active = (h: string) => path === h || path.startsWith(`${h}/`);
  return (
    <header className={`on-dark sticky top-0 z-40 border-b text-paper transition-colors duration-300 ${scrolled ? "border-white/10 bg-ink/70 backdrop-blur-xl" : "border-transparent bg-ink"}`}>
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label="Apricity Digital home" className="flex items-center gap-2">
          <Image src="/apricity-logo.png" alt="" width={36} height={30} priority />
          <span className="whitespace-nowrap font-display text-lg font-bold tracking-tight">Apricity Digital</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}
              className={`relative py-1 text-sm transition-colors hover:text-accent after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100 ${active(n.href) ? "text-accent after:scale-x-100" : "text-paper/80"}`}>{n.label}</Link>
          ))}
          <DemoButton products={products} className="btn btn-primary whitespace-nowrap !py-2" />
        </nav>
        <button type="button" className="grid h-11 w-11 place-items-center lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="step-in container-x grid gap-1 pb-4 lg:hidden">
          {nav.map((n, i) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} aria-current={active(n.href) ? "page" : undefined}
              style={{ animationDelay: `${i * 60}ms` }} className={`step-in rounded-xl px-3 py-3 ${active(n.href) ? "bg-accent/15 text-accent" : "text-paper/90"}`}>{n.label}</Link>
          ))}
          <DemoButton products={products} className="btn btn-primary mt-2" />
        </nav>
      )}
    </header>
  );
}
