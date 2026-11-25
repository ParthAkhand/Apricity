/** Kinetic headline: each character blurs/fades in with a stagger. Pure CSS, so it renders on the server. */
export function SplitText({ text, start = 0, step = 22, className = "" }: { text: string; start?: number; step?: number; className?: string }) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(" ").map((w, wi, all) => (
          // Words stay unbroken; characters inside them animate.
          <span key={wi} className="inline-block whitespace-nowrap">
            {[...w].map((c, ci) => (
              <span key={ci} className="char" style={{ ["--d" as string]: `${start + (all.slice(0, wi).join(" ").length + wi + ci) * step}ms` }}>{c}</span>
            ))}
            {wi < all.length - 1 && "\u00a0"}
          </span>
        ))}
      </span>
    </span>
  );
}
