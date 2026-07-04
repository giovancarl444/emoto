# EMOTO — Launch Map

The single board we work off. `[x]` done · `[ ]` open · **(you)** needs you · **(me)** I can do · **(both)** paired.
Store: `emoto-9696.myshopify.com` · Theme auto-deploys from the `shopify-theme` branch.

---

## 0. Legend of what's real vs. placeholder right now
- ✅ **Real & live in theme:** homepage, PDP, all templates, cart drawer, footer, SEO scaffolding, Ultra Bee photo.
- ⚠️ **Placeholder (must become real before publish):**
  - Product photos for **Light Bee X** and **Storm Bee** (currently reuse the Ultra Bee cutout).
  - **Reviews/testimonials** ("Johan L." etc.) — illustrative only. Trustpilot badge now auto-hides until a real rating is entered.
  - **Payment badges** in footer (Klarna/Qliro/…) — decorative until the providers are actually connected.
  - Spec numbers (kW, range, weight) — sourced from public figures, marked `[VERIFY]` in the dossier.

---

## 1. Content pages  *(fixes the footer/nav gaps)*
Footer links now render only when the page exists — creating these auto-populates the footer.
- [ ] **(me)** `Om EMOTO` (`om-oss`) — brand story, independent-retailer positioning, why electric
- [ ] **(me)** `Leverans & frakt` (`leverans`) — free EU DDP, lead times, tracking, what's included
- [ ] **(me)** `Delbetalning` (`delbetalning`) — how Klarna/Qliro installments work, examples, FAQ
- [ ] **(me)** `Garanti & retur` — 2-year warranty terms, returns/ångerrätt (14 days), service network
- [ ] **(me)** `Registreringshjälp` — the concierge/road-legal service explained (a signature EMOTO value)
- [ ] **(me)** Expand `Kontakt` content (hours, response time, service booking)
- [ ] **(you)** Set store **policies** — only Privacy is set; add **Refund**, **Terms**, **Shipping** (Shopify → Settings → Policies; can auto-generate then edit)
- [ ] **(me)** Rename blog `News` → `Journal` (brand) and seed 3–5 SEO articles (see §6)

## 2. Products & photography
- [ ] **(you)** Real cutout photos (transparent PNG, side profile) for **Light Bee X** + **Storm Bee** — and ideally 3–5 angles each for the gallery
- [ ] **(you/me)** Additional Ultra Bee angles (detail shots: battery, brakes, display) for the gallery
- [ ] **(me)** Per-product long-form copy + full spec tables (each model, per road-class variant)
- [ ] **(me)** Wire each model's gallery + specs once photos land
- [ ] **(both)** Decide accessories/parts range (helmets, batteries, chargers) — future collection
- [ ] **(you)** Confirm final **prices** per variant and stock/lead-time per model

## 3. Payments & financing  *(the profit engine)*
- [ ] **(you)** Activate **Klarna** in Shopify Payments (installments up to 36 mo) — the whole delbetalning story depends on this
- [ ] **(you)** Activate **Qliro** and/or **Swish** if desired (Nordic trust)
- [ ] **(me)** PDP **financing block**: "Från X kr/mån i 36 mån" with a clean cost breakdown + Klarna on-site-messaging placement, on every product page
- [ ] **(me)** Cart + drawer financing line (already stubbed) → wire to real monthly figure
- [ ] **(me)** Financing explainer page (§1) + link from every PDP
- [ ] **(you)** Confirm terms with the credit provider (interest, min/max, admin fee) so the copy is accurate

## 4. Trust & social proof  *(honest only)*
- [ ] **(you)** Real **Trustpilot** profile URL + rating/count → I wire the live badge/widget
- [ ] **(you)** Collect 3–5 genuine early reviews (or remove the section until you have them)
- [ ] **(me)** Replace or remove placeholder testimonials before publish — **hard gate**
- [ ] **(me)** Real trust signals that are true today: warranty, authorised-reseller status, Swedish support, secure checkout

## 5. Legal & compliance (Sweden/EU)
- [ ] **(you)** Company details in footer (org.nr, VAT, registered address) — required for e-commerce in SE
- [ ] **(you/me)** Cookie consent banner (GDPR) — Shopify's consent API or an app
- [ ] **(me)** Road-class clarity on PDPs (off-road vs. L1e/L3e legal use) — partly done, expand
- [ ] **(you)** WEEE/battery recycling + distance-selling (ångerrätt) notices
- [ ] **(me)** `[VERIFY]` spec/law/tax markers in the dossier → confirm before publish

## 6. SEO & traffic  *(your #1 priority)*
- [x] Meta/OG/Twitter, JSON-LD (Org, WebSite, Product, Breadcrumb, FAQ, BlogPosting), canonical, self-hosted fonts
- [ ] **(you)** Set products **Active** (drafts aren't indexable) at go-live
- [ ] **(you)** Connect **Google Search Console** + submit sitemap; **GA4** (consent-gated)
- [ ] **(me)** Keyword-driven **content articles** (e.g. "Sur-Ron Ultra Bee: allt du behöver veta", "Är elmotocross lagligt i Sverige?", "L1e vs L3e", "Bäst i test elenduro")
- [ ] **(me)** Collection/category SEO copy; internal linking
- [ ] **(you)** Custom domain **emoto.se** (DNS → Shopify); hreflang if EN added
- [ ] **(me)** Image alt text + descriptive filenames across the store

## 7. Go-live gate
- [ ] All §4 placeholders real or removed
- [ ] Payments live and test-ordered
- [ ] Real photos for all 3 models
- [ ] Policies + company details present
- [ ] Products Active, domain live, GSC/GA4 connected
- [ ] Final CRO pass on the live preview (your eye)

---

## Suggested execution order
1. **Now (me):** content pages + per-product copy/specs + financing PDP block + blog SEO articles — best run as a **multi-agent workflow** (parallel drafting, then verify/polish).
2. **You, in parallel:** Klarna activation, real photos, policies/company details, Trustpilot.
3. **Then:** wire real photos/reviews/payments → final CRO pass → flip to live.
