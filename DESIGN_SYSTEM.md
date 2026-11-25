# Design system

Dark hero + white content sheet, one mint accent, large radii, pill buttons.

## Tokens
Defined in `apps/web/src/app/globals.css` (`:root`) and mapped in `apps/web/tailwind.config.ts`.
**Change the accent:** edit `--accent`, `--accent-rgb`, `--accent-ink`, `--accent-ink-rgb` (AA-safe on light) and `--accent-glow`. Hex and RGB-channel pairs must match.
Radii: `--radius-sheet` 40px, `--radius-card` 24px, buttons are full pills.

## Components
- `.btn .btn-primary | .btn-ghost | .btn-dark`: pill buttons, glow, 2px press.
- `.sheet`: white rounded-top sheet overlapping the dark hero (home). `PageHero` draws the same edge on inner pages.
- `SplitText`: kinetic per-character headline (CSS only, `sr-only` copy for screen readers).
- `Spot`: cursor spotlight + max 4deg tilt for dark cards.
- `StoryScroll`: sticky scroll-linked statement list (plain list under 768px).
- `Reveal`, `CountUp`: scroll reveal and count-up.

## Motion rules
Transform/opacity only. Hero copy fades as the sheet slides over it via CSS `animation-timeline: scroll()` (progressive enhancement). `prefers-reduced-motion` collapses all animation; `Spot` and counters skip their effects.

## Deviations from the brief
- No new dependencies (no framer-motion/lenis): CSS + IntersectionObserver cover the spec.
- Not done: route page transitions, skeleton shimmer, toasts, partner marquee (only 3 partners), parallax mockups.
