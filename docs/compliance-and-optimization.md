# ELDR — Optimization & Compliance Report

What was actually implemented for performance, SEO, CRO and accessibility, and the verified Sweden/EU compliance decisions behind the storefront. Facts and citations trace to [`research-dossier.md`](./research-dossier.md); anything not confirmed against a primary source is marked **[VERIFY]**.

---

# Part A — Optimization ("optimized in all ways")

## A1. Performance / Core Web Vitals
Target: green CWV on mobile (LCP, CLS, INP).

- **Build proof:** `npm run build` prerenders every route as **static / SSG** for both locales (`generateStaticParams` on the PDP and part pages); First-Load JS is **~102–118 kB** per route (shared 102 kB). Product/parts/legal pages ship almost no page-specific JS.
- **Fonts, zero CLS:** Archivo / Hanken Grotesk / JetBrains Mono are self-hosted at build via `next/font` with `display: swap` and automatic size-adjust fallbacks — no network font request, no layout shift (`app/fonts.ts`).
- **Images:** `next/image` everywhere with explicit `sizes`, `priority` only on the hero + first PDP image, AVIF/WebP formats enabled, lazy by default. The placeholder catalogue ships as lightweight SVG; real raster photography from the Shopify CDN is optimized through the image pipeline (`next.config.mjs`).
- **Motion budget:** all animation is `transform`/`opacity` only (`.reveal`, hover lifts) — compositor-friendly, no layout thrash — and fully disabled under `prefers-reduced-motion` (tokens zero out durations).
- **JS discipline:** server components by default; client islands are scoped to what needs interactivity (cart, header, configurator, gallery, cookie banner, filters). GA4 is injected **only after consent**, keeping the default payload lean.
- **Caching/edge:** static routes are CDN-cacheable; cart mutations use `cache: 'no-store'`. Security headers set in `next.config.mjs`.

## A2. SEO
- **Semantic HTML + IA:** one `<h1>` per page, sectioned landmarks, `<nav aria-label>`, breadcrumb lists, clean locale-prefixed URLs (`/sv/...`, `/en/...`).
- **Metadata:** per-page `generateMetadata` (title template `%s · ELDR`, descriptions), `metadataBase`, canonical + **hreflang alternates** for sv/en (+ x-default) on every route (`lib/i18n.ts › alternates`).
- **Structured data (JSON-LD):** `Organization` (site-wide), `Product` + `AggregateOffer` (PDP), `BreadcrumbList` (PLP/PDP), `FAQPage` (PDP + registration) — `components/seo/JsonLd.tsx`.
- **Open Graph / Twitter:** per-page OG title/description/image + Twitter `summary_large_image`.
- **Sitemap & robots:** dynamic `app/sitemap.ts` (all routes × both locales, with hreflang alternates) and `app/robots.ts` (allow all, disallow `/api/` and `/kassa`, sitemap reference).
- **Keyword map (build targets):** model terms (Light Bee X, Ultra Bee, Storm Bee), `elcrossmoped`, `Sur-Ron köpa/återförsäljare`, `vägregistrerad L3e`, `L1e moped`, `elmotorcykel`, `registreringshjälp`, plus Swedish buyer-intent long-tail for the Phase 3 content engine.

## A3. CRO (conversion)
- **Mobile-first, thumb-reachable:** sticky add-to-cart bar on the PDP (mobile), 44px minimum tap targets (`--tap-min`), primary actions in the ember signal colour.
- **Anxiety reducers at the decision point:** the PDP configurator shows the road-class toggle with **plain-language consequences** (top speed, licence, min age, registration) inline; stock + lead-time truth (in-stock vs factory build ETA); DDP delivery clarity; warranty summary; 14-day withdrawal note.
- **Attach-rate engine:** registration-help upsell checkbox on street-legal variants; compatible-parts cross-sell on every PDP; quick add-to-cart on part cards; parts PLP filterable by model (fitment).
- **Trust everywhere:** trust strip (DDP, registration, warranty, secure payment, Swedish support), reviews on home + PDP, transparent VAT breakdown on price, honest "build-to-order" labelling instead of discount theatre.
- **Friction removal:** instant client cart with localStorage persistence, slide-over drawer, one-tap checkout that hands off to Shopify's hosted secure checkout (Klarna/card/PayPal/invoice); financing framing ("from X kr/mo") available.

## A4. Accessibility (WCAG 2.1 AA)
- Focus-visible ring (2px ember, 2px offset) is **never removed**, only styled.
- Colour contrast: bone text on obsidian and dark text on ember both clear AA; semantic tokens keep it consistent.
- Keyboard + ARIA: cart drawer is a labelled `role="dialog" aria-modal` with Escape-to-close and body-scroll lock; the variant selector is a `radiogroup`; the gallery is a `tablist`; FAQ uses native `<details>`/`<summary>`; skip-link to `#main`.
- Reduced motion honoured globally; alt text on all content images (localized); form inputs labelled (`sr-only` where visually implicit).

---

# Part B — Compliance (Sweden / EU)

> All Swedish official sites (transportstyrelsen.se, skatteverket.se, riksdagen.se, konsumentverket.se) blocked direct fetch in this environment, so figures come from grounded search summaries of those official pages. Confirm paragraph numbers and current amounts against primary text before go-live. Each item below carries confidence and, where relevant, **[VERIFY]**.

## B1. Vehicle classification — EU 168/2013 & Sweden *(high confidence)*
Implemented as editable content on every PDP + the registration page.

| Class | Speed / power | Swedish name | Licence · age | Register · plate | Helmet · insurance |
|---|---|---|---|---|---|
| **L1e-A** | ≤25 km/h, ≤1000 W | powered cycle | — | — | — |
| **L1e-B** | >25–45 km/h, ≤4 kW cont. | moped klass I (EU-moped) | **AM · 15** | **Yes** · rear plate | Yes · Yes |
| **L3e-A1** | >45 km/h, ≤11 kW | lätt motorcykel | **A1 · 16** | Yes · rear plate | Yes · Yes |
| Moped klass II | ≤25 km/h, ≤1 kW | national tier | förarbevis/AM · 15 | No | Yes (in use) |
| EPAC / elcykel | ≤250 W, assist to 25 km/h, pedal-only | cykel | none | none | none |

**Design consequence:** a 45 km/h / ≤4 kW bike is an **L1e-B moped klass I** (AM, from 15); more power/speed makes it an **L3e** (A1, from 16). Marketing "peak" kW routinely exceeds the class's rated cap — the storefront flags [VERIFY CoC] on power figures. *Sources: Regulation (EU) 168/2013 Annex I; Transportstyrelsen.*

## B2. Registration of an imported EU vehicle in Sweden *(high/medium)*
Productized as the registration service (`/tjanster/registrering`).
- Registration = entry into **vägtrafikregistret** (Transportstyrelsen); the pivotal document is the **CoC / "intyg om överensstämmelse"** (required to register *and* insure).
- **Retailer route:** apply to be a **registrerad yrkesmässig importör** → register NEW vehicles directly on the CoC, skipping ursprungskontroll (an operational moat).
- **Standard route:** ursprungskontroll (**~1,240 kr** [VERIFY], valid 5 yrs, normally 2–5 business days but currently often weeks) → **registreringsbesiktning** (Besikta/Carspect/etc., ~600–800 kr [VERIFY]; an identity/document check for a new EU-type-approved vehicle) → entry in register → **registreringsbevis + plates**.
- **Fees/tax:** plate **~80 kr** each [VERIFY — raised from ~62 kr]; annual vägtrafikregisteravgift **~74 kr** [VERIFY]; **mopeds exempt from fordonsskatt**; motorcycles a flat 180 kr but **electric MC effectively 0 kr**; **trafikförsäkring mandatory before riding**. *Sources: Transportstyrelsen; SMC.*

## B3. Consumer law — distance selling *(high, [VERIFY] paragraph refs)*
Implemented in `/angerratt`, `/villkor`, `/leverans-returer`.
- **14-day ångerrätt** from taking possession, no reason (distansavtalslagen 2005:59, implementing CRD 2011/83/EU).
- **In-person exception:** inspecting/test-riding in a showroom before purchase → **no statutory withdrawal** (binding sale).
- **"Made to order" exception is narrow:** a vehicle with factory options from the standard range is **not** bespoke → keeps full withdrawal rights.
- Registration/riding does **not** extinguish withdrawal, but the trader may deduct **värdeminskning** for handling beyond establishing characteristics (ARN nyttoavdrag benchmark ~12 kr/mil in car cases).
- Consumer pays return transport if pre-informed; trader refunds price + standard outbound delivery within 14 days; may withhold until returned.
- Failure to inform about withdrawal → window extended up to **12 months**.
- **From 19 June 2026:** a mandatory online **"ångerknapp"** (withdrawal button) in the same interface where the contract was concluded — **[VERIFY]** and implement in the checkout before that date.
- Separately: **konsumentköplagen (2022:260)** — **3-year reklamationsrätt** with a **2-year reversed burden of proof** (EU legal guarantee). Complaint within 2 months of discovery always timely. Disputes → **ARN** / Hallå Konsument. *Sources: Konsumentverket; riksdagen.se.*

## B4. Tax — moms (VAT) & cross-border *(high)*
Implemented in pricing (`lib/format.ts`), villkor, checkout.
- Standard **moms 25 %**; motorcycles standard-rated. Consumer prices shown **incl. VAT** (prisinformationslagen / Directive 98/6/EC) — the storefront displays incl-VAT with a `varav moms` breakdown.
- **SEK** domestic (primary), **EUR** secondary for EU.
- **EU distance-selling threshold EUR 10,000/yr**: below → Swedish VAT; above → destination VAT via **OSS** (relevant for Nordic expansion).
- **Incoterms:** **DDP within the EU** (seller pays import duty + VAT + clearance — no border surprises), **DAP outside**.
- **Imports:** 25 % import VAT on CIF + duty + freight; China e-motorcycle MFN duty **~6 %** (CN 8711 60) [VERIFY]. **Crucial:** the EU's 7.8–35.3 % countervailing duties on Chinese EVs apply **only to passenger cars (HS 8703), not motorcycles (HS 8711)** — a margin protection. *Sources: Skatteverket; Tullverket; EU Reg. 2024/2754.*

## B5. Warranty *(medium)*
Implemented honestly in `content/warranties.ts`, surfaced on PDP + `/support`.
- Sur-Ron manufacturer baseline is short (~**12 months**, some dealers 18; battery capped ~20,000 mi / 32,000 km). ELDR states **24-month** vehicle + battery cover **[VERIFY vs Adoy AB terms]**, explicitly **layered on** the statutory 3-year reklamationsrätt — so the customer's floor is always the stronger legal right.
- Exclusions are explicit and honest: wear items, competition/rental limits, and that tuning/non-approved parts may void the *warranty* (statutory rights assessed separately). This is also why the parts catalogue flags the sport controller as off-road-only.

## B6. Privacy / GDPR *(implemented)*
`/integritet` + cookie consent.
- **Consent Mode v2:** analytics storage defaults to **denied**; GA4 script is injected **only after** the user accepts in the cookie banner (`components/sections/Analytics.tsx` + `CookieBanner.tsx`). Ad storage stays denied.
- Privacy policy covers controller, data categories, legal bases, 7-year accounting retention, data-subject rights, and the IMY complaint route.

---

## Open compliance items to verify before launch
- [ ] Confirm exact current fees (ursprungskontroll, besiktning, plate, register fee) on Transportstyrelsen.
- [ ] Confirm which Sur-Ron variants are CoC-homologated for Swedish road registration (L1e vs L3e) per model/config.
- [ ] Confirm distansavtalslagen paragraph references and the 19 Jun 2026 ångerknapp requirement; implement the button.
- [ ] Confirm ELDR warranty terms with the general agent (Adoy AB).
- [ ] Register the company + brand (Bolagsverket), VAT (Skatteverket), and run a formal TM search (PRV/EUIPO) for "ELDR".
- [ ] Rasterise OG image to PNG; add a real Trustpilot/Judge.me review source.
