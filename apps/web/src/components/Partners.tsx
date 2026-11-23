import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Logos are the ones used on the previous site. Only Insstanto has a known public URL.
const partners = [
  { name: "Human Matrix Securite", logo: "/partners/human-matrix-securite.png", href: "" },
  { name: "Insstanto", logo: "/partners/insstanto.png", href: "https://insstanto.com/" },
  { name: "Solaris", logo: "/partners/solaris.png", href: "" },
];

export function Partners() {
  return (
    <section className="container-x py-16 md:py-20" aria-labelledby="partners-h">
      <p className="eyebrow">Collaboration</p>
      <h2 id="partners-h" className="mt-2 font-display text-3xl font-bold">Our industry partners</h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-3">
        {partners.map((p) => {
          const img = <Image src={p.logo} alt={`${p.name} logo`} width={200} height={200} className="h-40 w-40 rounded-2xl object-contain" />;
          return (
            <li key={p.name} className="flex flex-col items-center rounded-2xl border border-ink/10 bg-white p-6 text-center">
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                  {img}
                  <span className="mt-4 inline-flex items-center gap-1 font-display font-bold">{p.name}<ArrowUpRight size={16} aria-hidden /><span className="sr-only">(opens in a new tab)</span></span>
                </a>
              ) : (
                <>{img}<span className="mt-4 font-display font-bold">{p.name}</span></>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
