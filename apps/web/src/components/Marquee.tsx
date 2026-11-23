/** Slow, pausable text marquee (CSS only). The list is duplicated for a seamless loop; the copy is aria-hidden. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-light tracking-tight text-ink/70 sm:text-4xl">
          {t}<span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
        </li>
      ))}
    </ul>
  );
  return <div className="marquee flex overflow-hidden py-8">{row(false)}{row(true)}</div>;
}
