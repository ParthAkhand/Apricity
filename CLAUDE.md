# TASK: Review, archive and rebuild apricitydigital.in as a FULL-STACK website (prototype for the Director)

You are my senior product architect and full-stack co-pilot. This is a large task. Work in phases, and STOP for my approval at the end of Phase 1. Use plan mode for Phases 0-1.

## 0. Context
- Company: **Human Matrix Securite** (Indore) is the PARENT company of everything here. **Apricity Digital** is its software brand. Show this relationship clearly (footer, About page, structured data). Customers are municipal corporations (B2G), enterprises and institutions.
- Current site: https://www.apricitydigital.in/ (Wix, static, no real backend). It lists old products. Of those, **Insstanto is still live and must stay**. Its landing page is **https://insstanto.com/**. The others (the old "Human Matrix / Securite" website-development product block (the company itself stays, as parent) and "TaskForce Waste Management") are no longer in use and must go.
- Goal: a modern, premium, director-presentable **full-stack** website (frontend + backend + database + admin), not a brochure site. Every product is a clickable card that goes to that product's landing page.
- Prototype products (3):
  1. **Matrix Track 2.0**: internal landing page on our new site
  2. **Matrix Track** (face-attendance app): internal landing page on our new site
  3. **Insstanto**: card links OUT to https://insstanto.com/ (opens in a new tab, `rel="noopener noreferrer"`). Do not build an internal landing page for it. Fetch insstanto.com once to align the card's one-line description with how the product presents itself, but do not copy its text or assets.
- The architecture must make adding or changing a product a data change (done in the admin panel), not a code change.
- Do NOT touch the live domain or DNS. All work stays in a new local project.

## 1. Facts that MUST be kept exactly (do not rewrite or "improve")
From the current site (re-verify by fetching it yourself, and diff against this list):
- Company name: **Apricity Digital**
- Address: **206, Gulab Bagh Colony, Indore, 452010 MP** (current site text: "206,Gulab Bagh Colony Indore,452010 MP"; fix only spacing/punctuation, not content)
- Phone: **+91 9111 8999 09**
- Email: **info@apricitydigital.in**
- Footer legal links: Terms & Conditions, Privacy Policy, Support Policy
- Copyright line: update the year to 2026, keep the format "© 2026 by Apricity Digital. All Rights Reserved"
- Founder (UPDATED by user, matches the live /technology page): `founder: { name: "Capt. Sunpreet Singh", title: "CEO" }` in the company settings seed; render it on the About page. Do not add a photo, bio or quotes beyond what the live site says. Ask in the final summary whether a photo should be added.
- Legal pages: keep the live text as-is (user instruction). Stats: keep as-is. Logo: use the one from the live site (legacy/wix-snapshot/assets/apricity-logo.png).
- Parent company: **Human Matrix Securite**. Footer line: "Apricity Digital is a Human Matrix Securite company." (rewrite if you find better wording, but keep the name exactly "Human Matrix Securite"). Store it in the company settings as `parentCompany: "Human Matrix Securite"`. Add it to the About page and to the Organization JSON-LD (`parentOrganization`). Do not invent a logo, registration number or separate address for it.
- Old tagline "Redefining Cities with AI-Driven Innovation." and the "Smarter Solutions" subline: keep as the brand line unless I say otherwise.
- Old stats (11+ Cities, 40+ Communities, 200+ Team Members): keep, stored with a `verified: false` flag. Show them in the prototype, but list them in the summary for the Director to confirm.
- Old "Industry Partners" logos are unnamed, so drop that section. Never add fake logos or testimonials.

## 2. Phase 0: Review and audit (read-only)
Fetch and inspect the live site (all pages: /, /contact, /technology, /about, /blank-1, /blank-2, /blank-4, /privacy-policy, /terms-and-coniditions, /blank-4-1) and insstanto.com. Write `docs/01-site-review.md` covering:
1. Full content inventory (copy, contacts, links, images). Save the raw HTML and text of every page to `legacy/wix-snapshot/` (this is the "stash": a frozen reference copy; tag the first commit `legacy-reference`).
2. Problems found. Known so far: nav labels do not match URLs (About Us -> /technology, Services -> /about); placeholder URLs (/blank-1, /blank-2, /blank-4); a typo in a URL (/terms-and-coniditions); stale products; "2024" copyright; no social links; no leadership or founder; the parent company is not mentioned; the Insstanto and Human Matrix/Securite blocks both point to the same generic page; Wix lock-in, weak SEO control, and no backend (contact and sign-up have nowhere real to go).
3. SEO and performance baseline (title, meta, OG tags, Lighthouse numbers if you can run them).
4. A keep / drop / rewrite table for every item.
5. Legal pages: if the live legal text is only labels, flag that real Privacy/Terms/Support text must come from the company. Create clearly marked placeholder pages, not invented legal text.

## 3. Phase 1: Plan (stop here for my approval)
Write `docs/02-plan.md` with:

### 3.1 Architecture and repo decision (my decision: ONE monorepo, two apps)
Use a single git repository with npm/pnpm workspaces:
```
apricity-digital/
  apps/web      # frontend: Next.js (App Router) + TypeScript + Tailwind + Framer Motion
  apps/api      # backend: Node.js + TypeScript + Fastify (or NestJS if you can justify it) + Prisma
  packages/shared  # shared zod schemas and TypeScript types (Product, ContactRequest, etc.)
  docs/  legacy/  docker-compose.yml  .env.example
```
Why one repo for now: one team, one prototype, shared types prevent frontend/backend drift, atomic commits, one CI. Both apps are independently buildable and deployable, so splitting into two repos later is trivial. Include this reasoning in the plan. You may recommend two repos instead only if you find a concrete reason; explain it and wait for my approval.

### 3.2 Backend scope (real, but sized for a prototype)
- Database: PostgreSQL via Prisma (use SQLite for local dev only if it speeds setup; keep the schema Postgres-compatible). Include seed scripts.
- Models: `Product` (slug, name, tagline, summary, audience, modules, features, metrics, media, `landingType: INTERNAL | EXTERNAL`, `externalUrl`, order, published), `CompanySettings` (name, address, phone, email, founder, stats with verified flags, tagline), `Lead` (demo / contact requests: name, organisation, role, email, phone, product interest, message, source, status, createdAt), `AdminUser`, optional `Page` (legal pages).
- Public REST API (versioned `/api/v1`): `GET /products`, `GET /products/:slug`, `GET /settings`, `POST /leads` (zod-validated, rate-limited, honeypot or Turnstile-ready spam protection, saves to DB, sends an email notification to info@apricitydigital.in through an SMTP adapter that logs to console in dev).
- Admin API + **admin panel** at `/admin` in the web app (auth with secure httpOnly cookie sessions or JWT; hashed passwords with argon2/bcrypt; first admin created via seed/env, never hard-coded): manage products (create/edit/reorder/publish, mark internal vs external landing), edit company settings, view and export leads (CSV), change lead status.
- Security basics: input validation everywhere, CORS locked to the web origin, helmet headers, rate limiting, CSRF protection for the cookie auth, no secrets in the repo, `.env.example` only, audit of dependencies.
- Product pages and the home page fetch from the API (SSR/ISR with revalidation) so admin edits show up without a redeploy. Provide a seeded fallback so the demo still works if the API is down.
- API docs: generate OpenAPI/Swagger at `/docs` and a few integration tests for leads and products (Vitest or Jest + supertest).

### 3.3 Frontend scope
**Information architecture**
- `/` Home: hero, proof strip, product cards (each fully clickable; internal ones go to `/products/[slug]`, Insstanto goes to https://insstanto.com/ in a new tab with a small "external" indicator), platform story, how it works, who we serve, CTA
- `/products` index, `/products/matrix-track-2`, `/products/matrix-track`
- `/about` (company story, founder block, address), `/contact` (real form wired to `POST /leads`, plus phone, email, address, map link), `/careers` (simple or "coming soon"), `/privacy-policy`, `/terms-and-conditions`, `/support-policy`, `/admin/*`
- Fix the nav so labels match routes. Header: Products, Solutions, About, Careers, Contact (+ "Request a demo" button that opens the lead form).
- One dynamic route `/products/[slug]` renders a landing page from the API data. A product with `landingType: EXTERNAL` never gets an internal page; its cards link to `externalUrl`.

**Design direction (premium, not a template)**
- Load and follow the `frontend-design` skill if it is available. Pick ONE bold aesthetic for a smart-city / GovTech brand (confident, civic, data-rich), with a considered type pairing, a restrained palette with one accent, generous spacing and subtle motion.
- Signature visuals: an animated "city command centre" hero (SVG or CSS built dashboard mock: map, ward scorecards, live counters), product mockups built in code.
- No stock photos of people, no copyrighted imagery, no emoji icons. Use inline SVG icons (lucide).
- Mobile-first, fully responsive, WCAG AA contrast, keyboard accessible, `prefers-reduced-motion` respected.
- Target: Lighthouse 95+ on Performance, Accessibility, Best Practices and SEO.

### 3.4 Product content (use only what is below; mark anything uncertain `// CONFIRM`)

*Matrix Track 2.0 (flagship)*
- Smart-city operations suite / Integrated Command & Control Centre for municipal commissioners (Nagar Nigam / ULBs) and enterprise heads.
- Brings Matrix Track attendance, Swachh Parvv (civic sanitation audit), Task Force (collection and vehicle monitoring), MRF and processing, Survekshan (surveys and ranking), and a command dashboard with a Commissioner View into one platform.
- Live GIS asset map, facial attendance, restroom hygiene scoring, litter-bin monitoring, ward scorecards.
- Sanitation audit flow: a field supervisor takes a geo-tagged photo, AI gives a hygiene score from 1 to 10, the Sector In-charge approves, and the City Commissioner reviews. Planned vs actual manpower drives penalty deductions.
- Separate ULB and Commissioner dashboards whose figures match.
- Terminology rules: say "assets" (litter bins, beats, toilets), never "units" or "entities". The 20% rule: each Daroga covers 20% of assigned assets daily, and the SI checks and approves 20% of those reports daily, which gives 100% coverage 5 times a month.
- Go-live on a city's own data within days; measurable results in about 2 weeks only once all workforce and locations are registered. Do not overclaim beyond this.
- Do not name any specific city or corporation as a deployment or client anywhere. No "live in <city>" claims, no logos.

*Matrix Track (face-attendance app, also the entry module of MT 2.0)*
- Facial recognition attendance: 1:1 and 1:N group mode (field crews, classrooms), geotagging, leave management.
- Audience: municipal field workforce, enterprises, institutions.

*Insstanto (external landing: https://insstanto.com/)*
- On-demand services marketplace (B2C and B2B): deep cleaning (sofa, tank, home), hourly maids, electricians, carpenters, on-demand drivers, physical security (guards, gunmen, bouncers). The old site described it as an on-demand home cleaning app, so keep the card's claim modest and consistent with insstanto.com. `// CONFIRM`

Landing page sections for each internal product: hero with product mockup, problem and outcome, key modules, how it works (3 to 4 steps), dashboard or app showcase, who it is for, proof (only real facts), FAQ, "Request a demo" CTA with the lead form.

### 3.5 Other plan items
- Route table, API endpoint table, ER diagram (mermaid), component list, SEO plan (metadata, OG images, sitemap, robots, JSON-LD Organization and SoftwareApplication), analytics placeholder, performance budget.
- Local dev with `docker-compose` (Postgres + api + web), and a one-command `npm run dev`.
- Deployment proposal: web on Vercel (or any Node host), API + Postgres on Render/Railway/a VPS, plus the cutover plan from Wix (DNS, redirects for old URLs, email unaffected).
- Risks and open questions: founder surname/designation/photo (optional), real Terms/Privacy text, verified stats, whether Human Matrix Securite should have its own logo or link in the footer, SMTP credentials, hosting choice, admin user list.
- A phased task list with estimates and a QA checklist.

**STOP and show me the plan. Wait for my approval before building.**

## 4. Phase 2: Build (after approval)
1. Scaffold the monorepo, shared package, tooling (ESLint, Prettier, TypeScript strict, Husky or lint-staged optional), `.env.example`, docker-compose.
2. Backend first: schema, migrations, seeds (company settings, the 3 products, 1 admin from env), endpoints, validation, auth, email adapter, tests, OpenAPI docs.
3. Frontend: design tokens, layout, header, footer, shared components, then Home, Products index, the two internal product landing pages, About, Contact (wired to the API), Careers, legal pages.
4. Product cards (home and index): fully clickable, hover/focus states; internal vs external handled by `landingType`.
5. Admin panel: login, products CRUD, settings, leads list with status and CSV export.
6. Hero and product mockups as code (SVG/CSS) with subtle motion. SEO, sitemap, robots, favicon, OG image.
7. Commit in small steps with clear messages.

## 5. Phase 3: QA
- `build`, lint, typecheck and tests must all pass in both apps with no errors. Run Lighthouse and fix anything under 95.
- End-to-end checks: submit the contact form -> row appears in the admin leads list and the email adapter fires; add a product in admin -> it appears on the site; set a product to EXTERNAL -> its card goes to the external URL; unpublish -> it disappears.
- Check at 360, 768, 1280 and 1920 px. Check keyboard navigation and contrast.
- Verify every link and every product card destination (including https://insstanto.com/). Verify the kept facts (name, address, phone, email) match section 1 character for character.
- Security pass: unauthenticated access to admin routes is refused, rate limits work, no secrets committed.
- Grep the whole project for leftovers: "TaskForce", the old "Human Matrix/Securite" website-development copy, "Lorem", "TODO". No TODO may remain except items listed as open in the plan. Also check that no city or municipal corporation is named as a client or deployment anywhere (including seed data and metadata).
- Because this is a Director demo, also run a copy review: no spelling errors, no overclaims, consistent terminology.

## 6. Phase 4: Deliverables
- Working prototype: `docker compose up` (or `npm run dev`) starts web, API and DB with seeded data and a demo admin login (printed in the README, dev only).
- `README.md` with setup, env vars, scripts, and architecture.
- `docs/03-final-summary.md`: what changed (old vs new), page map, architecture and the one-repo decision, design rationale, the kept-facts checklist, open items for me (founder surname/designation/photo, real legal text, stats to verify, Human Matrix Securite logo/link, domain cutover plan, production secrets), and next steps (more products, splitting repos if needed, hosting).
- A 5-line demo script for the Director that includes showing a product being added from the admin panel.
- A short chat summary of the same at the end.

## Rules
- Never invent facts, clients, deployments, metrics, testimonials, certifications or founder details beyond the name given. Never mention any specific city or corporation as a client or deployment. Mark unknowns clearly.
- Do not modify or deploy to the live domain.
- Ask me before adding major dependencies beyond the stack above, and before any destructive command.
- Never commit secrets. Use `.env.example` with placeholders only.
- Keep the code clean, typed and commented where the logic is not obvious.
