# ELDR — Brand System

*The identity for a flagship, not a reseller. Nordic-industrial. Matte. Forged.*

Token code lives in [`../storefront/styles/tokens.css`](../storefront/styles/tokens.css) and [`../storefront/tailwind.config.ts`](../storefront/tailwind.config.ts). Marks live in [`../storefront/public/brand/`](../storefront/public/brand/).

---

## 1. Naming

Three territories were generated and pressure-tested on rationale, domain plausibility and a trademark red-flag scan. We commit to **ELDR**.

### Territory 1 — ELDR *(committed)*
- **Rationale:** Swedish **"eld" = fire**; Old Norse **"eldr" = fire / forge / heat**; the leading **"EL-"** reads *electric*. A single word carries electric + fire/forge + Nordic depth — and *forge/heat* maps perfectly onto a mechanical, CNC-milled, performance brand. Arbitrary/suggestive marks are the **strongest trademark class**.
- **Domain plausibility:** `eldr.se` / `eldr.com` plausible and short. [VERIFY availability with IIS (.se) and a registrar.]
- **TM red-flag scan:** searches for "Eldr / Eldur electric motorcycle / moped brand" returned **no existing e-moto or EV brand** in the namespace — a clean field. [VERIFY formal search via PRV / EUIPO before registering.]
- **Risk & mitigation:** possible "elder" misread — neutralised by the all-caps industrial wordmark and brand context; to a Swede it reads unmistakably as *eld* (fire).

### Territory 2 — RÅ *(strong runner-up)*
- **Rationale:** Swedish **"rå" = raw**; also a forest spirit in folklore. Minimalist, premium, ownable as a two-letter wordmark ("raw performance").
- **Why not chosen:** two-letter marks are hard to trademark and to make searchable/SEO-findable; less electric resonance.

### Territory 3 — VOLTRA *(explored and rejected — the scan that killed it)*
- **Rationale considered:** coined "volt + terra/ultra", overtly electric.
- **Rejected on diligence:** the "Volt-" space is **crowded and directly conflicting** — a Cambodian **Voltra Motors** already makes electric motorcycles, plus Voltra Energy (CA/MY), voltra.com, Voltera Power, and Swedish **Volta Trucks**. Category-adjacent confusion + weak (descriptive) trademark. Documented here to show the standard we hold names to.

**Legal-brand guardrail:** the legal/brand name avoids "surron". We may use *"Oberoende återförsäljare av Sur-Ron®" / "Independent Sur-Ron® retailer"* as descriptor copy only, with the trademark attributed to its owner.

---

## 2. Positioning

- **Positioning statement:** *For Nordic riders making a high-consideration electric-motorcycle purchase, ELDR is the independent flagship retailer that makes performance, road-legality and ownership effortless — the opposite of a price-shop.*
- **One-line proposition (sv/en):** *"Elektrisk terräng."* / *"Electric terrain, forged."*
- **Three messaging pillars:**
  1. **Effortless road-legal** — registration concierge; L1e vs L3e made plain.
  2. **Forged for terrain** — performance, and curated upgrades for the known weak points.
  3. **Trust without fine print** — fixed pricing, honest warranty on top of statutory rights, real Swedish support.

---

## 3. Voice & tone

Precise, confident, rider-native. **Nordic-industrial restraint over hype.** We state facts and let the machine and the terrain carry the drama. Swedish-first, full English parity.

| Do | Don't |
|---|---|
| "45 km/h, AM-körkort från 15 år. Vi registrerar den åt dig." | "🔥🔥 INSANE POWER!! Limited drop!!" |
| "Off-road only. Får inte köras på allmän väg." | Vague "check local laws" hand-waving |
| "Byggs på beställning · 45–75 dagar" (truth) | Fake "was 84,900 / now 79,900" discount theatre |
| Short, technical, specific. Numbers with units. | Emoji spam, exclamation stacking, stock-photo optimism |
| "Eld i terrängen." (evocative, restrained) | Clichéd "unleash the beast" copy |

Tone shifts by context: **editorial** on the hero and story, **technical/mono** on specs and badges, **plain and reassuring** on compliance, warranty and registration.

---

## 4. Visual language

An opinionated, defensible direction — **not** a stock template and **not** a generic "tech gradient".

- **Territory:** dark, matte, performance-tuned. Obsidian/graphite base (`--ink-900 #0B0C0E`), warm bone text (`--bone-100 #E9E8E2`), a single molten **Ember** signal (`--ember-500 #FF5A1F`) used sparingly for CTAs and hot states, and a restrained cool **Ion** steel accent for info/links.
- **Detailing:** technical/mechanical — hairline rules, a faint CNC **grid-etch** backdrop, uppercase mono eyebrows (the `.eyebrow` signature), small industrial radii. Fire appears only as *signal*, never decoration.
- **Product-as-hero:** vehicles and parts sit on dark, matte, uncluttered surfaces; the ember accent draws the eye to the one thing that matters on each screen (usually the price + add-to-cart).
- **Motion:** purposeful and performant (transform/opacity only), reduced-motion honoured. A single `.reveal` rise on entry; hover lifts on CTAs; nothing gratuitous.

### 4.1 Colour (semantic tokens — full ramps in `tokens.css`)
| Role | Token | Value |
|---|---|---|
| Page base | `--bg` / `--ink-900` | `#0B0C0E` |
| Surface / card | `--surface` / `--surface-raised` | `#141619` / `#1C1F24` |
| Body text | `--text` / `--bone-100` | `#E9E8E2` |
| Headline | `--text-strong` / `--bone-050` | `#F4F3EE` |
| **Signal / CTA** | `--signal` / `--ember-500` | **`#FF5A1F`** |
| CTA text (on ember) | `--text-on-signal` | `#08090B` (dark — passes AA on ember) |
| Accent / link | `--accent` / `--ion-400` | `#5E9CB3` |
| Success (in stock) | `--success` | `#34C07F` |
| Warning (build-to-order) | `--warning` | `#E5A93C` |
| Danger | `--danger` | `#E5484D` |

**CTA contrast decision:** ember `#FF5A1F` with near-black text clears WCAG AA for the button label; ember-on-dark-surface is reserved for large text/borders. This keeps the one signal colour both distinctive and accessible.

---

## 5. Typography

Three faces, all open-licensed and self-hosted at build via `next/font` (no layout shift, CWV-safe) — deliberately *not* Inter/Roboto template fonts.

| Role | Face | Usage |
|---|---|---|
| **Display** | **Archivo** (600–900) | Uppercase industrial headlines, tight negative tracking, `leading: 1.02` |
| **UI / body** | **Hanken Grotesk** (400–700) | Highly legible workhorse for all body and UI |
| **Mono / technical** | **JetBrains Mono** (400–600) | Eyebrows, spec readouts, badges, prices, numeric detailing |

Full fluid type scale (mobile-first `clamp()` values), weights, tracking and leading are documented in [`design-system.md`](./design-system.md) and defined in `tokens.css`. Signature rule: **uppercase mono eyebrows** with `letter-spacing: 0.12em` set the technical tone above every headline.

---

## 6. Logo, wordmark, favicon, OG

- **Wordmark:** `ELDR` set in Archivo Black, uppercase, tight tracking, with a trailing **ember tick** (a `.` / spark in `--signal`) — the brand signature. Rendered live in the display face for crispness at any size (`components/ui/Logo.tsx`); a vector press version is [`eldr-wordmark.svg`](../storefront/public/brand/eldr-wordmark.svg) (blocky industrial stencil letterforms, ember on the R-leg).
- **Mark / emblem:** the **"Ascent"** — three ascending angular blades reading simultaneously as *forward motion*, *terrain ridge* and *flame licks*, the tallest tipped in ember. [`eldr-mark.svg`](../storefront/public/brand/eldr-mark.svg). Scales cleanly to a favicon.
- **Favicon / app icon:** [`app/icon.svg`](../storefront/app/icon.svg) — the mark on a rounded obsidian tile.
- **OG / social:** dark 1200×630 treatment with wordmark + tagline ([`og-default.svg`](../storefront/public/brand/og-default.svg)); wired via Next metadata. [VERIFY: rasterise to PNG for platforms that don't render SVG OG.]

---

## 7. Photography / render art-direction guide

So the catalogue reads as one system (placeholder assets in `public/models` and `public/parts` demonstrate the composition; real photography/renders drop in via the content layer):

- **Background:** matte graphite / obsidian, seamless; occasional faint grid-etch. Never white seamless (that reads catalogue, not flagship).
- **Lighting:** hard, directional key with a cool rim to catch mechanical edges (forks, discs, CNC parts); one warm ember-adjacent kicker allowed to tie to the palette.
- **Angles:** low 3/4 hero for menace and scale; clean side profile for the spec/compare context; tight **macro** on the upgrade parts (the detailing that justifies premium).
- **Motion:** terrain/action shots use real dust and low sun — earned drama, not staged smiles. Riders are incidental; the machine is the hero.
- **Consistency rules:** same horizon, same matte floor, same ember-only accent; parts always shot square on the same surface for a coherent PLP grid.
- **Guardrails:** no stock-template look, no rainbow tech gradients, no stereotype-driven or lifestyle-clichéd imagery. Distinctive, intentional, defensible.

---

*Change the brand name in `storefront/lib/brand.ts` and re-skin via `storefront/styles/tokens.css` — the identity is centralised so a rename or restyle is a token change, not a rebuild.*
