# UI Redesign Brief: from bland/static to modern, animated, product-led

> Hand this file to Claude Code from the root of your existing project (e.g. `claude "Read UI_REDESIGN_BRIEF.md and execute it"`).
> It is a **redesign of the presentation layer only**. Do not change business logic, data models, API contracts or routes.

---

## 0. Your role and ground rules

You are a senior front-end engineer and product designer. The current UI is flat, text-heavy and static. Transform it into a polished, motion-rich interface in the spirit of the two references below.

**Before writing any code:**
1. Inspect the repo: framework, router, styling approach (Tailwind / CSS modules / plain CSS), component library, existing design tokens, and the page list. Summarise what you found in 5-10 lines.
2. Reuse the existing stack. Do **not** migrate frameworks. Only add libraries listed in section 7, and only if the stack is React/Next/Vite-based. If it is plain HTML/CSS/JS, use CSS + IntersectionObserver + vanilla JS equivalents instead of Framer Motion.
3. Propose the plan (section 9), then implement in the phases given. Commit after each phase if the repo is under git.
4. Keep all existing copy, product names and branding unless told otherwise. Do not invent customer logos, stats or testimonials. Use clearly marked placeholders (`TODO: real figure`) where content is missing.

---

## 1. Reference A: "ProFinance" landing page (Conceptzilla)

Take from it: **colour confidence, big friendly type, product mockups as the hero, and card-based sections.**

- **Palette:** near-white page (`#F5F5F5`-ish) with one loud accent, a **lime / acid-yellow-green (~`#DFFF3C`)**, plus black and a coral red (~`#F26B6B`) used sparingly for negative/sell states. Calls to action are **black pills with white text**.
- **Hero:** a huge rounded lime panel (very large radius, ~32-40px) containing a bold two-line headline ("Invest for the Future"), a short supporting paragraph, one black CTA, and a **hand-drawn black squiggle/arrow doodle** pointing from the CTA toward the product. On the right, **two overlapping phone mockups** (a light "Market" list screen and a dark candlestick-chart screen) at slight offsets so they feel layered.
- **Typography:** clean geometric sans, heavy weight for headlines, tight leading, generous size contrast between headline and body.
- **Section rhythm:**
  - "Trade in Real Time": a dark chart card sitting on a tilted lime blob, text beside it.
  - "100,000+ in Your App": floating white asset cards (logo, ticker, price, tiny sparkline) arranged on a lime circle with a hand-drawn loop line connecting them.
  - "Get the Most Out of Your Investments": two large rounded cards, each with a lime/black/coral abstract shape (blob, donut chart) and a "Read More →" link.
  - "Advantages": 2x2 grid separated by hairline dividers, each cell has a small lime circular icon, a bold title, one sentence and a small outlined button.
  - "Our Partners": a row of circular grey logo chips.
- **Details to copy:** large radii everywhere, soft shadows on floating cards, lime circular icon badges, hairline dividers, doodle line-art as a personality accent.

## 2. Reference B: HackerRank B2B SaaS landing page (Ramotion) ← **the one the owner personally prefers**

Take from it: **dark cinematic hero, kinetic typography, glowing green accent, and scroll-driven storytelling.** Where A and B conflict, **B wins.**

- **Hero (dark):** pure black background, centered headline set in a **light/regular-weight grotesk at very large size**, e.g. "The future of development is **[icon] human + [icon] AI**". The top lines are **dimmed grey**; the key phrase is **bright white** and includes **inline glowing icons** (a green fingerprint, a green sparkle/star) sitting inside the text line. Below: a small muted subhead, then a single **dark ghost button with a faint green glow** ("Join The Community"). Slim top nav: wordmark left, text links centre, right side has a ghost "Request Demo" button and a **solid mint-green "Sign Up"** button.
- **Hero motion:** the headline **assembles letter by letter** (characters blur/fade in with staggered timing, some letters brighter than others during the transition, then settle). Treat this as a signature moment.
- **Section transition:** the dark hero ends and a **white content sheet with a large rounded top edge slides up over it**, like a card being pulled up. The whole composition is framed on a deep green radial-gradient backdrop in the showcase.
- **Light sections:**
  - "Choose Your Adventure": centered headline with the second word in green; below it **two dark rounded cards side by side** ("For developers" / "For business"), each with a bullet list, a mint-green or dark-outline CTA, and a **glowing product visual** (code-editor snippet; a translucent 3D cube with a "GenAI" chip) bleeding off the card edge.
  - "AI Changing Software Development": a **scroll-linked text list** where statements highlight one at a time (active = dark, others faded to light grey), next to **an image card overlapped by a dark profile card** (avatar, role, certification tiles, hex-shaped badges). The overlap/depth is the point.
- **Palette:** black `#000`/`#0A0A0A`, white, mint-green accent (~`#2EE59D` / `#1DDF8A`), dark card surfaces (~`#12161A`) with 1px low-contrast borders, soft green glows. Body text is small and muted.
- **Feel:** premium, minimal, lots of negative space, dark UI cards floating on a light page, glow instead of heavy shadow.

---

## 3. Design direction for **our** project

Blend the two, weighted toward B:

| Decision | Direction |
|---|---|
| Overall mode | **Dark hero + light content sheet** (B), with **dark cards on light sections** |
| Accent | **One** accent colour. Default to a mint/emerald green close to B. Define as a token so it can be swapped for the brand colour in one line. Optional secondary "highlight" tone borrowed from A used only for tiny badges |
| Shape language | Large radii (24-40px on hero/section sheets, 16-24px on cards, full pill on buttons) |
| Type | One variable geometric sans (e.g. Inter Tight / Geist / Plus Jakarta Sans / Satoshi-like). Hero: 72-120px desktop, weight 300-400, tracking -0.03em. Section titles: 40-56px, weight 500-600. Body 15-17px, muted |
| Depth | Layered/overlapping cards, soft glows on dark, light shadows on white. Never flat boxes with 1px grey borders only |
| Personality | One or two hand-drawn doodle SVG accents (arrow/squiggle) borrowed from A, used sparingly |
| Imagery | Real product screenshots or realistic mockups in device frames. No stock-photo clichés. Use existing product screenshots from the repo if present; otherwise build CSS/SVG mock UI cards |

## 4. Design tokens (create or extend, don't hardcode)

Create a single source of truth (`tokens.css` / Tailwind theme / CSS variables):

```css
:root {
  --bg-dark: #0a0a0a;
  --bg-dark-elev: #12161a;
  --bg-light: #ffffff;
  --bg-light-soft: #f5f5f5;
  --ink-on-dark: #f4f4f5;
  --ink-on-dark-muted: #8b9199;
  --ink-on-light: #0b0f12;
  --ink-on-light-muted: #6b7280;
  --accent: #2ee59d;            /* swap for brand colour */
  --accent-glow: rgba(46,229,157,.35);
  --danger: #f26b6b;
  --border-dark: rgba(255,255,255,.08);
  --border-light: rgba(0,0,0,.08);
  --radius-sheet: 40px;
  --radius-card: 24px;
  --radius-pill: 999px;
  --ease-out: cubic-bezier(.22,1,.36,1);
  --dur-fast: .2s; --dur-base: .5s; --dur-slow: .9s;
}
```
Support `prefers-color-scheme` only if the app already does. The hero is dark regardless.

## 5. Page / section architecture

Apply to the marketing/landing page first, then carry the system into inner pages.

1. **Nav:** sticky, transparent over the hero, becomes blurred glass (`backdrop-filter`) after 40px scroll. Logo left, 3-5 links, ghost secondary button and solid accent primary button on the right. Mobile: full-screen slide-in menu with staggered link reveal.
2. **Hero (dark):** kinetic headline (see 6.1), muted subhead, one primary + one ghost CTA, subtle animated gradient/glow behind the text, optional slowly drifting grain or particle layer (very low contrast). Hero content must fit above the fold at 1440x900 and 390x844.
3. **Content sheet:** white sheet with `border-radius: var(--radius-sheet) var(--radius-sheet) 0 0`, overlapping the hero by ~48px, `position: relative; z-index: 2`, slides up on scroll.
4. **Audience split / "Choose your path":** two dark rounded cards with bullets, CTA and a glowing visual bleeding off the edge. Hover: card lifts 6px, glow intensifies, visual shifts with parallax.
5. **Scroll-linked story section:** statement list on the left where the active line is full-ink and others are muted, advancing with scroll (sticky container). On the right, an overlapping image/profile/product card pair with depth.
6. **Feature grid ("Advantages"):** 2x2 or 3x2 with hairline dividers, small accent icon badges, title, one-liner, small outlined CTA.
7. **Live-feeling data / proof:** animated counters, a sparkline or chart card, floating "asset-style" cards (from A) showing the product's own real metrics.
8. **Logos / partners row:** circular chips, grayscale to colour on hover, slow marquee if more than 6.
9. **Final CTA band** and a clean footer.

Map our own product's actual features, copy and screens into these slots. Do not keep finance or HackerRank wording.

## 6. Motion spec (this is what fixes "static")

Use **transform and opacity only** for animation. Respect `prefers-reduced-motion: reduce` (disable parallax, typing and marquee, and keep simple fades).

1. **Kinetic hero headline:** split into characters (or words on mobile). Stagger 18-30ms each, from `opacity:0; filter:blur(8px); translateY(12px)` to settled, 0.8-1.2s total. Dimmed lines first, the emphasised phrase last with its inline icons popping in (`scale .6 -> 1`, glow pulse once).
2. **Scroll reveals:** every section heading, card and image fades/rises (`translateY(24px)` to 0, 0.6s `--ease-out`), staggered by 80ms inside groups. Trigger once at ~20% visibility.
3. **Sheet slide-up:** the white sheet translates up over the pinned hero as the user scrolls, with the hero text slightly scaling down and fading.
4. **Scroll-linked highlight list:** drive the active index from scroll progress in a sticky section; crossfade ink colour and opacity.
5. **Cards:** hover lift + glow, cursor-aware tilt (max 4-6deg) on the two big audience cards. Use a spotlight gradient following the cursor on dark cards.
6. **Parallax:** floating mockups move at 0.85-1.15x scroll speed. Keep it subtle.
7. **Counters and charts:** numbers count up and sparklines draw (`stroke-dashoffset`) once when entering view.
8. **Buttons:** primary has a soft glow and a 2px press-down; ghost buttons gain border-glow on hover; arrow icons slide 4px.
9. **Nav:** smooth state change on scroll, animated underline on links.
10. **Page transitions** (if the router allows): 250ms fade/slide between routes.
11. **Micro-interactions:** skeleton shimmer for loading, animated toasts, focus rings that glow in the accent colour.

Performance budget: no layout-thrashing animations; lazy-load below-fold media; animation should hold 60fps on a mid-range laptop; Lighthouse performance >= 85 on the landing page.

## 7. Allowed additions (React-based stack only)

- **Motion:** `framer-motion` (or `motion`) for reveals, layout and scroll-linked effects. Optional `lenis` for smooth scroll. Use GSAP + ScrollTrigger only if the pinned sheet or scrubbed sections prove unreliable in Framer.
- **Icons:** `lucide-react` (or the existing icon set).
- **Fonts:** self-host via `next/font` or `@fontsource`, no render-blocking CDN fonts.
- **Charts (only if real data exists):** the lightest option already in the repo, otherwise hand-rolled SVG.
- Nothing else without asking. No UI-kit swaps.

For non-React stacks: CSS keyframes, `IntersectionObserver`, `animation-timeline: view()` where supported (with a JS fallback) and small vanilla modules.

## 8. Accessibility, responsiveness and quality bars

- WCAG AA contrast on both dark and light surfaces (check the muted greys; they are the usual failure).
- Fully keyboard-navigable, visible focus states, semantic landmarks, alt text on all real imagery, `aria-hidden` on decorative glows/doodles.
- Mobile first: breakpoints at 390 / 768 / 1024 / 1440. Hero headline uses `clamp()`. Two-card sections stack, scroll-linked list becomes a simple reveal list on mobile.
- No horizontal scroll at any width. Tap targets >= 44px.
- No console errors or warnings. Lint and type-check pass. Existing tests still pass.

## 9. Execution plan (follow in order, pause for review after Phase 2)

**Phase 0: Audit.** Report stack, pages, current styling approach, any existing tokens. List the files you expect to touch.
**Phase 1: Foundation.** Tokens, typography, global styles, base components (Button, Card, Section, Container, Badge, Nav), motion helpers (`Reveal`, `SplitText`, `useScrollProgress`).
**Phase 2: Landing page.** Nav, kinetic hero, sheet slide-up, audience cards. **Stop and show screenshots/summary.**
**Phase 3: Remaining sections.** Scroll-linked story, feature grid, proof/data, partners, final CTA, footer.
**Phase 4: Inner pages/app screens.** Apply cards, tokens, hover and loading states consistently. Keep layouts, upgrade surfaces.
**Phase 5: Polish.** Reduced-motion pass, a11y pass, responsive pass, performance pass, remove dead CSS.

## 10. Deliverables

- Working redesigned UI in the existing repo, no new framework.
- A short `DESIGN_SYSTEM.md` at the repo root: tokens, components, motion rules, how to change the accent colour.
- A final summary: what changed, files touched, anything left as a `TODO`, and any deviations from this brief with reasons.

## 11. Do not

- Do not copy either reference pixel-for-pixel or reuse their copy, logos, brand names or imagery. Use them for **style, structure and motion only**.
- Do not add autoplaying audio, popups, or heavy video backgrounds.
- Do not animate everything. Motion should guide attention, not decorate every element.
- Do not break existing routes, forms, auth or data flows.

---

### Reference links (for the human; Claude Code may not be able to open them)
- ProFinance landing (Conceptzilla): https://dribbble.com/shots/16709886-Landing-Page-Design-For-a-Finance-Investment-Platform
- HackerRank B2B SaaS landing (Ramotion): https://dribbble.com/shots/26414267-B2B-SaaS-Landing-Page-Design-for-HackerRank
