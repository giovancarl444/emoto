# ELDR

**Premium independent retailer of high-performance electric off-road & street-legal motorcycles.** Sweden first, Nordics next. Sells Sur-Ron today; architected to carry more marques tomorrow.

> *"Elektrisk terräng."* — ELDR ("eld" = Swedish for *fire*; "el-" reads *electric*). A flagship brand, not a reseller: Nordic-industrial, matte, forged, with a molten ember signal on obsidian graphite.

This repository is the **Phase 1 foundation** — strategy, brand, design system and a production-grade storefront — built to beat the generically-branded incumbents (ridesurron.se and peers) on brand, experience, conversion, performance and trust.

---

## What's here (Phase 1 deliverables)

| # | Deliverable | Location |
|---|---|---|
| 1 | **Business plan** + financial model | [`docs/business-plan.md`](docs/business-plan.md) · [`docs/financial-model.csv`](docs/financial-model.csv) |
| 2 | **Brand system** (naming → ELDR, voice, visual language, logo, art direction) | [`docs/brand-system.md`](docs/brand-system.md) · marks in [`storefront/public/brand/`](storefront/public/brand/) |
| 3 | **Design system** (tokens + component inventory with states) | [`docs/design-system.md`](docs/design-system.md) · tokens in [`storefront/styles/tokens.css`](storefront/styles/tokens.css) |
| 4 | **Storefront** (runnable Next.js commerce front end) | [`storefront/`](storefront/) — see [`storefront/README.md`](storefront/README.md) |
| 5 | **Optimization + compliance report** | [`docs/compliance-and-optimization.md`](docs/compliance-and-optimization.md) |
| — | **Grounding research dossier** (cited facts behind everything) | [`docs/research-dossier.md`](docs/research-dossier.md) |

### Accuracy discipline
Every factual claim about products, law, tax and vehicle classification is grounded in cited sources in the research dossier. Anything that could not be confirmed against a primary source in this pass is marked **[VERIFY]**. Vehicle specs live as editable content, not hardcoded strings, so corrections are a content change.

---

## The storefront in one minute

- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind (token-driven) · Shopify Storefront API for the buy.
- **Runs with zero credentials:** with no Shopify env vars set it falls back to a cookie-backed mock cart whose prices resolve from the content layer — `npm run dev` just works. Set the Shopify vars to wire the real backend.
- **Mobile-first**, sv/en parity with hreflang, JSON-LD, sitemap/robots, GA4 behind consent-mode, WCAG 2.1 AA, CWV-tuned (static/SSG, self-hosted fonts, `next/image`).
- **Multi-brand ready:** every vehicle carries a `marque`; nothing in the schema is Sur-Ron-specific — a new marque or model is a content addition, not a rebuild.

```bash
cd storefront
cp .env.example .env.local   # optional — runs in mock mode without it
npm install
npm run dev                  # → http://localhost:3000 (redirects to /sv)
```

Full setup, architecture and Shopify wiring: [`storefront/README.md`](storefront/README.md).

---

## Legal
ELDR is an **independent retailer**. **Sur-Ron®** is a trademark of its owner; ELDR does not counterfeit or misrepresent the marque. Road-legality, registration and warranty claims are written to be truthful and are marked **[VERIFY]** where a rule or figure must be confirmed before launch.
