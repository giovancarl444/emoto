# EMOTO — Launch Map

The single board we work off. `[x]` done · `[ ]` open · **(you)** needs you · **(me)** I can do · **(both)** paired.
Store: `emoto-9696.myshopify.com` · Theme auto-deploys from the `shopify-theme` branch.

---

## 0. Legend of what's real vs. placeholder right now
- ✅ **Real & live in theme:** homepage, PDP, all templates, cart drawer, footer, SEO scaffolding, Ultra Bee photo.
- ⚠️ **Placeholder (must become real before publish):**
  - ~~Product photos for **Light Bee X** and **Storm Bee**~~ ✅ each now has its own photo (one angle); more angles still wanted for the gallery.
  - ~~**Reviews/testimonials** ("Johan L." etc.)~~ ✅ removed — reviews section self-hides until real reviews exist; Trustpilot badge auto-hides until a real rating is entered.
  - **Payment badges** in footer (Klarna/Qliro/…) — decorative until the providers are actually connected.
  - Spec numbers (kW, range, weight) — sourced from public figures, marked `[VERIFY]` in the dossier.

---

## 1. Content pages  *(fixes the footer/nav gaps)*
Footer links now render only when the page exists — creating these auto-populates the footer.
- [x] **(me)** `Om EMOTO` (`om-oss`) — brand story, independent-retailer positioning, why electric ✅ live
- [x] **(me)** `Leverans & frakt` (`leverans`) — free EU DDP, lead times, tracking, what's included ✅ live
- [x] **(me)** `Delbetalning` (`delbetalning`) — how Klarna/Qliro installments work, examples, FAQ ✅ live
- [x] **(me)** `Garanti & retur` (`garanti-och-retur`) — 2-year warranty, returns/ångerrätt (14 days), service ✅ live
- [x] **(me)** `Registreringshjälp` (`registreringshjalp`) — the concierge/road-legal service ✅ live
- [x] **(me)** `Kontakt` content (hours, response time, service booking) ✅ live
- [~] **(you/me)** Store **policies** — ✅ paste-ready Swedish drafts written (`docs/policies-sv.md`: Ångerrätt/retur, Köpvillkor, Frakt, Cookies/GDPR). You fill company details (org.nr/moms/adress) + jurist-review, then paste into Shopify → Settings → Policies and link in the footer
- [x] **(me)** Rename blog `News` → `Journal` (brand) and seed 5 SEO articles ✅ done (see §6)

## 2. Products & photography
- [~] **(you)** Real cutout photos for **Light Bee X** + **Storm Bee** — ✅ one photo each is live (now shown on the homepage); still want 3–5 angles each (transparent side-profile ideal for the dark showroom)
- [ ] **(you/me)** Additional Ultra Bee angles (detail shots: battery, brakes, display) for the gallery
- [x] **(me)** Per-product long-form copy + spec tables (each model) ✅ live — descriptions, SEO, and per-product spec/highlight metafields set
- [x] **(me)** Homepage model surfaces (showroom hero, lineup, feature) now render each linked product's own photo; PDP gallery uses product media ✅ done — galleries auto-fill as more angles are added in Shopify
- [ ] **(both)** Decide accessories/parts range (helmets, batteries, chargers) — future collection
- [ ] **(you)** Confirm final **prices** per variant and stock/lead-time per model

## 3. Payments & financing  *(the profit engine)*
- [ ] **(you)** Activate **Klarna** in Shopify Payments (installments up to 36 mo) — the whole delbetalning story depends on this
- [ ] **(you)** Activate **Qliro** and/or **Swish** if desired (Nordic trust)
- [x] **(me)** PDP **financing block** — "Delbetala från X kr/mån i upp till 36 mån via Klarna & Qliro", live per variant, on every PDP ✅ done
- [x] **(me)** Financing explainer page (`/pages/delbetalning`) linked from every PDP ✅ done
- [ ] **(me)** Cart + drawer financing line → wire to the real provider figure once Klarna is connected
- [ ] **(you)** Confirm terms with the credit provider (interest, min/max, admin fee) so the copy is accurate

## 4. Trust & social proof  *(honest only)*
- [ ] **(you)** Real **Trustpilot** profile URL + rating/count → I wire the live badge/widget
- [ ] **(you)** Collect 3–5 genuine early reviews (or remove the section until you have them)
- [x] **(me)** Placeholder testimonials removed from all templates; reviews section now self-hides until real review blocks exist (Trustpilot badge already auto-hides). Presets/defaults de-faked so nothing fabricated can slip back via the editor ✅ done
- [ ] **(me)** Real trust signals that are true today: warranty, authorised-reseller status, Swedish support, secure checkout

## 5. Legal & compliance (Sweden/EU)
- [ ] **(you)** Company details in footer (org.nr, VAT, registered address) — required for e-commerce in SE
- [ ] **(you/me)** Cookie consent banner (GDPR) — Shopify's consent API or an app
- [x] **(me)** Road-class clarity — off-road vs. L1e/L3e explicit across PDPs, registreringshjälp + legal article; law verified (age **15**, MC-skatt **~180 kr/år**, terrängkörning barmark caveat) ✅
- [ ] **(you)** WEEE/battery recycling + distance-selling (ångerrätt) notices
- [~] **(me)** `[VERIFY]` markers — ✅ specs + SE/EU law researched against primary sources (see `content-verify-flags.md`). Ultra Bee specs reconciled live + theme; Storm/Light Bee + battery-care verified as-written. Remaining law fixes (AM age **15**, MC-skatt **~180 kr/år**, off-road/road-reg per SKU, financing *effektiv ränta*) + comparison-article specs → applying next

## 6. SEO & traffic  *(your #1 priority)*
- [x] Meta/OG/Twitter, JSON-LD (Org, WebSite, Product, Breadcrumb, FAQ, BlogPosting), canonical, self-hosted fonts
- [ ] **(you)** Set products **Active** (drafts aren't indexable) at go-live
- [ ] **(you)** Connect **Google Search Console** + submit sitemap; **GA4** (consent-gated)
- [x] **(me)** Keyword-driven **content articles** ✅ 5 published to /blogs/journal (Ultra Bee guide, "är elmotocross lagligt", delbetala-guide, modell-jämförelse, batteriunderhåll)
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
