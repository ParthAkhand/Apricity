# 03 – Final summary (prototype)

## What changed (old vs new)

| Old (Wix) | New |
|---|---|
| Static Wix pages, no backend | Next.js site + Fastify API + PostgreSQL + admin panel |
| Products hard-coded in page layout | Products are database rows, managed at `/admin` |
| Nav labels not matching URLs, `/blank-*` slugs, `/terms-and-coniditions` typo | Clean routes, 301 redirects from every old URL |
| Insstanto, "Human Matrix Securite" website block, TaskForce on home | Matrix Track 2.0, Matrix Track (internal pages) and Insstanto (external card). Old blocks removed |
| No parent company, no leadership | "Apricity Digital is a Human Matrix Securite company" (footer, About, JSON-LD); CEO Capt. Sunpreet Singh on About |
| Forms with nowhere to go | Contact and demo forms save leads to the database, email info@ (console in dev), appear in admin with status and CSV export |
| © 2024 | © 2026 by Apricity Digital. All Rights Reserved |

## Page map

`/` · `/products` · `/products/matrix-track-2` · `/products/matrix-track` · Insstanto card to https://insstanto.com/ (new tab, `noopener noreferrer`) · `/about` · `/contact` · `/careers` · `/privacy-policy` · `/terms-and-conditions` · `/support-policy` · `/admin` (products, settings, leads) · `/sitemap.xml` · `/robots.txt`

## Architecture and the one-repo decision

One monorepo, two independently buildable apps plus a shared types package, so frontend and backend cannot drift and each commit can change both. Splitting later means moving `apps/api` and publishing `packages/shared`. Fastify was chosen over NestJS: the API is about 15 routes. See `docs/02-plan.md`.

## Design rationale

"Civic control room": ink panels with one amber accent taken from the logo, Space Grotesk + Inter, code-built command-centre hero (SVG + CSS, no client JS), inline Lucide icons, no stock photos, reduced-motion respected.

## Kept-facts checklist

| Fact | Where | Status |
|---|---|---|
| Apricity Digital | seed, footer, metadata | ✔ |
| 206, Gulab Bagh Colony, Indore, 452010 MP | seed → footer, About, Contact | ✔ (spacing fixed only) |
| +91 9111 8999 09 | seed | ✔ |
| info@apricitydigital.in | seed, lead notification address | ✔ |
| Legal links: Terms & Conditions, Privacy Policy, Support Policy | footer | ✔ |
| © 2026 by Apricity Digital. All Rights Reserved | footer | ✔ |
| Founder: Capt. Sunpreet Singh, CEO | seed `founder`, About | ✔ (updated by you) |
| Parent company Human Matrix Securite | seed `parentCompany`, footer, About, JSON-LD `parentOrganization` | ✔ |
| Tagline + "Smarter Solutions" | seed, home hero | ✔ |
| Stats 11+ / 40+ / 200+ | seed, `verified: false` | ✔ shown as-is |
| Legal text | carried over verbatim from the live site | ✔ |
| Industry Partners, fake logos/testimonials | not present | ✔ |

## QA results (what was actually run)

- `eslint`, `tsc` (both apps): clean. `next build`: succeeds. API tests: 9/9 pass (products, leads, honeypot, validation, admin refusal, CSRF, publish/unpublish, CSV formula escaping).
- End-to-end on the running stack: lead submitted and visible in admin; product added in admin appears on `/products`; switched to EXTERNAL → card links out in a new tab and `/products/<slug>` returns 404; deleted → disappears; Insstanto internal URL returns 404; `/blank-1` redirects to Matrix Track 2.0; unauthenticated admin API returns 401.
- `docker compose up --build` starts db, API and web with seeded data.
- Lighthouse (local, mobile profile, production build in Docker): Accessibility 100, Best Practices 100, SEO 100 on `/`, `/products/matrix-track-2`, `/contact`. **Performance: home 90, product page 92 (contact scored 91 before the last tweak and was not re-run), so below the 95 target.** Remaining cost is main-thread JavaScript and font/CSS loading.
- Leftover grep: no TaskForce, Lorem or TODO in app code; no city or corporation named as a client.

## Not done / not verified

- Performance below 95 (above). Next steps: split the header into server and client parts, preload fonts, measure on the real host.
- Not checked: 360/768/1280/1920 px layouts and keyboard flow by hand (Lighthouse accessibility passes, but I did not view the pages in a browser); `npm audit`; rate limits under load; real SMTP.
- No OG image yet (text metadata only).
- Admin edits nested product content as JSON (modules, features, metrics, content). Fine for the demo, not for non-technical editors.
- Framer Motion was dropped (hero now CSS-only) to save JavaScript; the plan listed it.
- Production cookie: API and web must share a site (subdomains).

## Open items for you

1. Verify the stats (11+ Cities, 40+ Communities, 200+ Team Members). "Cities" can read as a deployment claim.
2. Legal text is the old text unchanged: "© 2022", the "registered trademarks" statement and "Apricity Digital Lab" naming need company review.
3. VPE Aditi Agarwal is on the old site but not on the new About page. Add?
4. Founder photo. Human Matrix Securite logo or link (none found; text only). A vector logo.
5. insstanto.com card wording (page only renders in a browser; I could read only its title). Marked `// CONFIRM`.
6. Support email (info@ vs it@), SMTP credentials, hosting choice, admin user list, production secrets.
7. Domain cutover (not done, nothing touched the live domain): deploy to staging, review, apply the redirect map (note the old `/about` was "Services"), then switch DNS; leave MX records alone.

## Next steps

More products via admin; per-field admin editors; OG images; real hosting; split repos only if teams separate.

## 5-line Director demo script

1. Open `/`: show the hero, the three product cards, and click Insstanto (opens in a new tab).
2. Open Matrix Track 2.0: walk through modules, the 4-step audit flow and the FAQ; click "Request a demo" and submit the form.
3. Log in at `/admin`: show the new lead (change its status, export CSV) and the console email.
4. In Products, click "New product", fill name, slug, tagline, set Published, save: reload `/products` and the card is there.
5. Switch that product to External link, show the card now opens its URL in a new tab, then unpublish it and show it disappears.
