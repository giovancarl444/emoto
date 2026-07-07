# EMOTO Storefront

Production-grade, mobile-first commerce front end for EMOTO. Next.js 15 (App Router) · TypeScript · Tailwind (token-driven) · Shopify Storefront API, with a zero-credential mock fallback so it runs out of the box.

## Quick start

```bash
cp .env.example .env.local   # optional; runs in mock mode without it
npm install
npm run dev                  # http://localhost:3000  (→ /sv)
```

Scripts: `dev`, `build`, `start`, `lint`, `typecheck`.

## Commerce modes

The repo must run with no backend, so commerce degrades gracefully:

- **Mock mode (default, no env):** merchandising comes from the typed content layer (`content/`), the cart is client-side (localStorage), and checkout shows a demo summary (`/kassa`).
- **Shopify mode:** set `SHOPIFY_STORE_DOMAIN` + `SHOPIFY_STOREFRONT_API_TOKEN` and `/api/checkout` builds a real Shopify cart and returns the hosted secure checkout URL (Klarna/card/PayPal/invoice, VAT/tax). Configure Swedish VAT, SEK primary + EUR, and DDP/DAP shipping in Shopify admin.

Detection lives in `lib/commerce.ts` (`NEXT_PUBLIC_COMMERCE_MODE=auto|mock`).

## Architecture

```
app/
  [locale]/            # sv | en — locale IS the root layout (no app/layout.tsx)
    layout.tsx         # <html lang>, providers, header/footer, consent, JSON-LD
    page.tsx           # home (flagship)
    motorcyklar/…      # model PLP + PDP (configurator, road-class toggle)
    delar/…            # parts PLP (fitment filter) + PDP
    tjanster/registrering/  # productized registration service + L1e/L3e explainer
    jamfor/            # compare
    kassa/             # mock checkout
    om · support · leverans-returer · villkor · angerratt · integritet · kontakt · aterforsaljare
  api/checkout/        # Shopify cart → checkout URL (mock fallback)
  sitemap.ts · robots.ts · icon.svg · not-found.tsx
components/  ui/ · commerce/ · sections/ · seo/
content/     models.ts · parts.ts · services.ts · warranties.ts   # editable "CMS" layer
lib/         brand.ts · types.ts · i18n.ts · format.ts · content.ts · commerce.ts · shopify.ts
styles/tokens.css      # design tokens — a re-skin edits THIS file
middleware.ts          # locale routing (/ → /sv, prefixing, Accept-Language)
```

### Key decisions
- **Content layer = source of truth for merchandising** (specs, fitment, editorial, legal), Shopify for the buy. In production these are Shopify metafields / a headless CMS; here they're typed seed modules. Multi-brand by design (`marque` on every model).
- **i18n:** the `[locale]` segment is the root layout (Next's i18n pattern); dictionaries + localized content in `lib/i18n.ts` and `content/`; hreflang alternates on every route.
- **Design tokens** in `styles/tokens.css` drive the Tailwind theme — re-skin = token change, not a rewrite. See [`../docs/design-system.md`](../docs/design-system.md).
- **SEO/perf/a11y** built in: per-page metadata, JSON-LD, sitemap/robots, self-hosted fonts, `next/image`, static/SSG, consent-gated GA4, WCAG 2.1 AA. See [`../docs/compliance-and-optimization.md`](../docs/compliance-and-optimization.md).

## Placeholder assets
No real product photography exists yet, so the catalogue ships branded **SVG placeholders** (`public/models`, `public/parts`, `public/editorial`) generated to the EMOTO art direction. Real raster photography drops in via the content layer and is optimized through `next/image`. `next.config.mjs` allows SVG through the image pipeline for the placeholders only.

## Environment
See [`.env.example`](.env.example). All keys optional for local dev.

## Note on `[VERIFY]`
Specs, prices, fees and legal specifics carry `[VERIFY]` markers where a manufacturer CoC, Transportstyrelsen page, or Skatteverket/Konsumentverket figure must be confirmed before go-live. Treat them as a launch checklist, not finished copy.
