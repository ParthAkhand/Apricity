# 01 – Site review (Phase 0)

Source: https://www.apricitydigital.in/ (Wix), fetched 2026-11-23. Raw HTML + extracted text of every page: `legacy/wix-snapshot/` (`*.html`, `*.txt`, `*.meta.json`). Logo: `legacy/wix-snapshot/assets/apricity-logo.png` (450×372 PNG, transparent).

## 1. Content inventory

| URL | Title | Nav label | What it holds |
|---|---|---|---|
| `/` | Home \| Apricity Digital | – | Hero ("Redefining Cities with AI-Driven Innovation. Smarter Solutions"), Vision, 3 product blocks (Insstanto, Human Matrix Securite website dev, TaskForce Waste Management), Why Apricity, stats (11+ Cities, 40+ Communities, 200+ Team Members), empty "Industry Partners" |
| `/technology` | About Us | About Us | Mission, History (founded by Mr. Sunpreet Singh, Indian Army background), "Meet the Founders": **CEO Capt. Sunpreet Singh**, **VPE Aditi Agarwal** |
| `/about` | Services | Services | AI-driven solutions, websites and apps, data security. First paragraph is stale template copy about a "Volaso delivery robot" |
| `/blank-1` | Solutions | Solutions | Waste/sanitation solutions: fleet tracking, Deployment Plan Monitoring, Swachhata Setu, MRF Digital Monitoring |
| `/blank-2` | Careers | Careers | "Join us" form with CV upload |
| `/contact` | Contact | CONTACT | Contact form (first/last name, email, org, inquiry type, message, marketing consent) |
| `/privacy-policy` | Privacy Policy | footer | Real policy text (company-specific) |
| `/terms-and-coniditions` | Terms & Conditions | footer | Real terms text; says "© Apricity Digital 2022" |
| `/blank-4-1` | ApricitySupportPolicy | footer | Real support policy; support email **it@apricitydigital.in**, Mon–Sat 9:30–18:30 IST |
| `/blank-4` | TaskForce T&C | (home card) | Privacy policy for the TaskForce Waste Management app |

Footer on every page: address "206,Gulab Bagh  Colony / Indore,452010 MP", +91 9111 8999 09, info@apricitydigital.in, "© 2024 by Apricity Digital . All Rights Reserved", newsletter line "Be the First to Receive the Latest Services From Apricity." (no working destination found).

**insstanto.com**: fetch returned HTTP 200 but the page is client-rendered, so only the title was readable: "Insstanto - Full Home Cleaning, Maid, Driver, Electrical & Security Services". A browser-based check is still needed for the card line (marked `// CONFIRM`). Card wording will stay modest and match that title.

## 2. Problems found

1. Nav labels ≠ URLs: About Us → `/technology`, Services → `/about`.
2. Placeholder slugs: `/blank-1`, `/blank-2`, `/blank-4`, `/blank-4-1`.
3. URL typo: `/terms-and-coniditions`.
4. Stale products: TaskForce Waste Management, Human Matrix Securite "website development" block.
5. "© 2024" and "© Apricity Digital 2022" (terms) – inconsistent years.
6. No social links; no parent-company mention (Human Matrix Securite).
7. Naming drift: "Apricity Digital" vs "Apricity Digital Labs" vs "APRICITY DIGITAL LAB".
8. Home nav omits "Insight", sub-pages include it (no such page exists).
9. Stale template copy on `/about` ("Volaso delivery robot").
10. Terms page claims "registered trademarks" – unverified; carried over only as-is (see §5).
11. Two support emails (info@ vs it@) – confirm which is public.
12. Wix lock-in, no backend: contact, careers and newsletter have no verified destination.
13. Empty "Industry Partners" section.

## 3. SEO / performance baseline

- Titles are `Page | Apricity Digital`; no `<meta name="description">` on home; `og:title/url/site_name/type` present; no og:image; canonical on home only; one JSON-LD block (Wix default); one `<h1>`.
- Home HTML ≈ 980 KB (Wix runtime). Lighthouse **not run** (not available in this session); to do in QA on the new build, and optionally on the old site for comparison.

## 4. Keep / drop / rewrite

| Item | Decision |
|---|---|
| Company name, address, phone, email | **Keep** exactly (fix spacing only) |
| Tagline + "Smarter Solutions" | **Keep** as brand line |
| Stats 11+ / 40+ / 200+ | **Keep**, `verified: false` (you confirmed) |
| Founder block | **Keep, rewrite**: CEO, Capt. Sunpreet Singh (supplied). VPE Aditi Agarwal is on the live site but not in your brief → open question |
| Mission / History / Vision copy | **Rewrite** lightly; keep facts only. "Smart traffic systems", "leader in AI" = unverified claims → drop or `// CONFIRM` |
| Insstanto card | **Keep**, external link to https://insstanto.com/ |
| Human Matrix Securite web-dev block | **Drop** (company stays as parent) |
| TaskForce Waste Management + `/blank-4` | **Drop** |
| Solutions page (fleet tracking, Swachhata Setu, MRF) | **Rewrite** into Matrix Track 2.0 modules; drop old product names |
| Services page | **Rewrite**; remove Volaso copy |
| Careers form | **Rewrite** as simple page / coming soon; CV upload deferred |
| Contact form | **Rewrite**, wired to `POST /leads` |
| Industry Partners, newsletter strip | **Drop** (no content / no destination) |
| Legal pages | **Keep live text as-is** (you confirmed), moved to clean URLs |
| Logo | **Keep** (`apricity-logo.png`) |
| Copyright | **Update** year to 2026 |

## 5. Legal pages

Correction to the brief's assumption: the live Privacy, Terms and Support pages contain **real text, not just labels**. Per your instruction they will be carried over unchanged into `/privacy-policy`, `/terms-and-conditions`, `/support-policy`, with a `// CONFIRM` note for the company to review. Known issues inside the text: "© 2022", the "registered trademarks" statement, the old "Apricity Digital Lab" naming, and the TaskForce-specific policy (`/blank-4`, not carried over). Old URLs get 301 redirects.

## 6. Open items from this phase

1. VPE Aditi Agarwal: include on About or not?
2. Which logo version/colours to use (only the transparent PNG was found; no SVG). Human Matrix Securite logo: none on the site.
3. Confirm support email (info@ vs it@).
4. insstanto.com card line needs a browser check.
