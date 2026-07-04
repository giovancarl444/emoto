# ELDR Storefront — Design System

> ELDR is a premium Nordic-industrial retailer of high-performance electric motorcycles.
> The aesthetic is **dark, matte, forged**, with a single molten **ember** signal colour
> (`#FF5A1F`). This document is derived directly from the code — every token, hex value and
> class name below is real and traceable to a source file.

**Source of truth**

| Concern | File |
| --- | --- |
| Design tokens (the one file a re-skin edits) | `storefront/styles/tokens.css` |
| Token → utility mapping | `storefront/tailwind.config.ts` |
| Type faces | `storefront/app/fonts.ts` |
| Base layer, primitives, `.eyebrow`, `.container-eldr`, `.grid-etch` | `storefront/app/globals.css` |
| UI components | `storefront/components/ui/` |
| Commerce components | `storefront/components/commerce/` |
| Section components | `storefront/components/sections/` |
| App shell / skip link | `storefront/app/[locale]/layout.tsx` |

---

## 1. Design principles

1. **Mobile-first.** The fluid type scale, spacing and layout are authored from the 360px end
   up. Interactive commerce surfaces (PDP add-to-cart) render a **sticky, thumb-reachable ATC bar**
   on small screens (`ProductConfigurator.tsx`), with the inline CTAs reserved for `lg+`.
2. **Token-driven re-skin.** Components consume **semantic** tokens (`--surface`, `--text`,
   `--signal`) never raw ramp values. A re-skin is a change to `tokens.css` only — Tailwind maps
   every utility back to a custom property, and no component hardcodes a hex.
3. **Nordic-industrial restraint.** Restrained radii, hairline borders, a warm-graphite → obsidian
   neutral ramp, desaturated functional hues, and mono technical detailing. Fire is used *only* as
   signal — never decoration.
4. **Purposeful motion.** Transitions are short and functional (hover/press/enter). Animation is
   **transform/opacity only** (compositor-safe, CWV-friendly) and fully collapses under
   `prefers-reduced-motion`.
5. **Trust everywhere.** Stock states, road-class legality, VAT breakdowns, DDP delivery, warranty,
   registration help and payment marks are surfaced across cards, PDP, cart and footer.
6. **WCAG 2.1 AA.** Focus-visible rings are never removed, tap targets meet 2.5.5 (44px),
   contrast pairings are deliberate, and interactive commerce widgets carry correct ARIA roles.

---

## 2. Design tokens

All tokens live in `:root` in `styles/tokens.css` (`color-scheme: dark`). Tailwind utilities
resolve to `var(--…)`, so e.g. `bg-surface` → `var(--surface)`, `text-signal` → `var(--signal)`.

### 2.1 Colour — raw ramps

Ink = warm graphite → obsidian neutral. Bone = warm off-white. Ember = the signal (molten fire).
Ion = restrained cool steel accent. Functional hues are kept desaturated for Nordic restraint.

| Token | Hex | Tailwind | Role |
| --- | --- | --- | --- |
| `--ink-950` | `#08090b` | `ink-950` | Deepest — page base / sunken |
| `--ink-900` | `#0b0c0e` | `ink-900` | App background (obsidian) |
| `--ink-850` | `#101215` | `ink-850` | — |
| `--ink-800` | `#141619` | `ink-800` | Raised surface |
| `--ink-750` | `#191c20` | `ink-750` | Surface hover |
| `--ink-700` | `#1c1f24` | `ink-700` | Card surface |
| `--ink-600` | `#262a31` | `ink-600` | Hairline / border on dark |
| `--ink-500` | `#363b44` | `ink-500` | Strong border, disabled fill |
| `--ink-400` | `#4c525d` | `ink-400` | Muted iconography |
| `--ink-300` | `#6b7280` | `ink-300` | Muted text (AA on ink-900) |
| `--ink-200` | `#969ca7` | `ink-200` | Secondary text |
| `--ink-150` | `#b7bcc5` | — | — |
| `--ink-100` | `#d7dae0` | `ink-100` | High-contrast secondary |
| `--bone-100` | `#e9e8e2` | `bone-100` | Body text on dark |
| `--bone-050` | `#f4f3ee` | `bone-50` | Headline / bone white |
| `--ember-700` | `#b8330b` | `ember-700` | — |
| `--ember-600` | `#db3f0d` | `ember-600` | Signal press |
| `--ember-500` | `#ff5a1f` | `ember-500` | **PRIMARY SIGNAL** — CTA, hot state |
| `--ember-400` | `#ff7a45` | `ember-400` | Signal hover / focus ring |
| `--ember-300` | `#ff9d73` | `ember-300` | — |
| `--ember-100` | `#ffe3d6` | `ember-100` | — |
| `--ion-600` | `#2e5a6b` | — | — |
| `--ion-500` | `#3f7d94` | `ion-500` | — |
| `--ion-400` | `#5e9cb3` | `ion-400` | Info / link accent (sparingly) |
| `--ion-300` | `#8bbccc` | `ion-300` | Link |
| `--green-500` | `#34c07f` | `success` | In-stock / success |
| `--amber-500` | `#e5a93c` | `warning` | Build-to-order / lead-time warning |
| `--red-500` | `#e5484d` | `danger` | Error / danger (distinct from ember) |
| `--white` | `#ffffff` | `white` | Pure reference |
| `--black` | `#000000` | `black` | Pure reference |

### 2.2 Colour — semantic tokens (what components consume)

| Token | Resolves to | Hex | Tailwind |
| --- | --- | --- | --- |
| `--bg` | `--ink-900` | `#0b0c0e` | `bg-bg` |
| `--bg-sunken` | `--ink-950` | `#08090b` | `bg-bg-sunken` |
| `--surface` | `--ink-800` | `#141619` | `bg-surface` |
| `--surface-raised` | `--ink-700` | `#1c1f24` | `bg-surface-raised` |
| `--surface-hover` | `--ink-750` | `#191c20` | `bg-surface-hover` |
| `--overlay` | `rgba(8,9,11,0.72)` | — | `bg-overlay` |
| `--border` | `--ink-600` | `#262a31` | `border-border` |
| `--border-strong` | `--ink-500` | `#363b44` | `border-border-strong` |
| `--border-signal` | `--ember-500` | `#ff5a1f` | `border-border-signal` |
| `--text` | `--bone-100` | `#e9e8e2` | `text-text` |
| `--text-strong` | `--bone-050` | `#f4f3ee` | `text-text-strong` |
| `--text-muted` | `--ink-200` | `#969ca7` | `text-text-muted` |
| `--text-faint` | `--ink-300` | `#6b7280` | `text-text-faint` |
| `--text-on-signal` | `--ink-950` | `#08090b` | `text-on-signal` |
| `--signal` | `--ember-500` | `#ff5a1f` | `bg-signal` / `text-signal` |
| `--signal-hover` | `--ember-400` | `#ff7a45` | `signal-hover` |
| `--signal-press` | `--ember-600` | `#db3f0d` | `signal-press` |
| `--signal-tint` | `rgba(255,90,31,0.12)` | — | `signal-tint` |
| `--accent` | `--ion-400` | `#5e9cb3` | `accent` |
| `--link` | `--ion-300` | `#8bbccc` | `text-link` |
| `--success` | `--green-500` | `#34c07f` | `success` |
| `--warning` | `--amber-500` | `#e5a93c` | `warning` |
| `--danger` | `--red-500` | `#e5484d` | `danger` |
| `--focus-ring` | `--ember-400` | `#ff7a45` | (outline colour) |

### 2.3 Typography scale

Three faces exposed as CSS variables (see §4). Fluid sizes are mobile-first
`clamp(min @360px, fluid, max @1280px)`, ratio ~1.2 mobile → ~1.28 desktop.

| Token | Tailwind | Value | Notes |
| --- | --- | --- | --- |
| `--text-2xs` | `text-2xs` | `0.6875rem` (11px) | Mono micro-labels / eyebrows |
| `--text-xs` | `text-xs` | `0.75rem` (12px) | — |
| `--text-sm` | `text-sm` | `0.875rem` (14px) | — |
| `--text-base` | `text-base` | `1rem` (16px) | Body default |
| `--text-md` | `text-md` | `clamp(1.0625rem, 0.9rem + 0.5vw, 1.1875rem)` | Lead / intro |
| `--text-lg` | `text-lg` | `clamp(1.1875rem, 0.95rem + 0.75vw, 1.5rem)` | — |
| `--text-xl` | `text-xl` | `clamp(1.375rem, 1.05rem + 1.1vw, 2rem)` | Card headings |
| `--text-2xl` | `text-2xl` | `clamp(1.75rem, 1.2rem + 2.1vw, 2.85rem)` | Section headings |
| `--text-3xl` | `text-3xl` | `clamp(2.25rem, 1.4rem + 3.4vw, 4rem)` | PDP / page H1 |
| `--text-4xl` | `text-4xl` | `clamp(2.75rem, 1.4rem + 5.4vw, 5.75rem)` | Hero (mobile→md) |
| `--text-display` | `text-display` | `clamp(3.25rem, 1.1rem + 9vw, 8.5rem)` | Hero only |

**Line-height** — `--leading-tight` `1.02` · `--leading-snug` `1.12` · `--leading-normal` `1.5`
(body default) · `--leading-relaxed` `1.65`.

**Tracking** — `--tracking-tight` `-0.02em` (headlines) · `--tracking-normal` `0` ·
`--tracking-wide` `0.04em` · `--tracking-caps` `0.12em` (uppercase mono labels).

**Weight** — `--weight-regular` `400` · `--weight-medium` `500` · `--weight-semibold` `600` ·
`--weight-bold` `700` · `--weight-black` `800`.

### 2.4 Spacing (4px base)

| Token | Tailwind spacing | Value |
| --- | --- | --- |
| `--space-0` | `0` | `0` |
| `--space-1` | `1` | `0.25rem` (4px) |
| `--space-2` | `2` | `0.5rem` (8px) |
| `--space-3` | `3` | `0.75rem` (12px) |
| `--space-4` | `4` | `1rem` (16px) |
| `--space-5` | `5`* | `1.5rem` (24px) |
| `--space-6` | `6`* | `2rem` (32px) |
| `--space-7` | — | `3rem` (48px) |
| `--space-8` | — | `4rem` (64px) |
| `--space-9` | — | `6rem` (96px) |
| `--space-10` | — | `8rem` (128px) |
| `--container-max` | `max-w-container` | `84rem` (1344px) |
| `--gutter` | `px-gutter` | `clamp(1rem, 0.5rem + 2.5vw, 2.5rem)` |
| `--tap-min` | `min-h-tap-min` | `44px` |

\* The custom `--space-*` scale documents intent; components predominantly use Tailwind's default
numeric spacing utilities. `gutter` and `tap-min` are wired into Tailwind's `extend.spacing`.

### 2.5 Radius (industrial = restrained)

| Token | Tailwind | Value |
| --- | --- | --- |
| `--radius-none` | `rounded-none` | `0` |
| `--radius-xs` | `rounded-xs` | `2px` (focus-ring corner) |
| `--radius-sm` | `rounded-sm` | `4px` (buttons, inputs, chips, cards) |
| `--radius-md` | `rounded-md` | `8px` (cards, panels, media) |
| `--radius-lg` | `rounded-lg` | `12px` |
| `--radius-xl` | `rounded-xl` | `18px` |
| `--radius-pill` | `rounded-pill` | `999px` (filter chips, badges dot) |
| — | `rounded-full` | `9999px` |

### 2.6 Elevation / shadow

On dark, depth = borders + a faint shadow + an inset top highlight (not glossy drop shadows).

| Token | Tailwind | Value |
| --- | --- | --- |
| `--shadow-sm` | `shadow-sm` | `0 1px 2px rgba(0,0,0,0.4)` |
| `--shadow-md` | `shadow-md` | `0 6px 20px rgba(0,0,0,0.45)` |
| `--shadow-lg` | `shadow-lg` | `0 18px 48px rgba(0,0,0,0.55)` (drawer, menus, banners) |
| `--shadow-signal` | `shadow-signal` | `0 8px 30px rgba(255,90,31,0.28)` (signal button hover) |
| `--hairline-top` | `.hairline-top` | `inset 0 1px 0 rgba(255,255,255,0.04)` |

### 2.7 Motion

| Token | Tailwind | Value | Use |
| --- | --- | --- | --- |
| `--dur-1` | `duration-1` | `120ms` | Micro — hover / press |
| `--dur-2` | `duration-2` | `200ms` | Standard transitions |
| `--dur-3` | `duration-3` | `320ms` | Enter / leave (drawer slide) |
| `--dur-4` | `duration-4` | `560ms` | Hero / large media reveal |
| `--ease-standard` | `ease-standard` | `cubic-bezier(0.2,0,0,1)` | Default |
| `--ease-out` | `ease-ease-out` | `cubic-bezier(0.16,1,0.3,1)` | Enter |
| `--ease-in` | `ease-ease-in` | `cubic-bezier(0.7,0,0.84,0)` | Exit |

### 2.8 Z-index

| Token | Tailwind | Value | Layer |
| --- | --- | --- | --- |
| `--z-base` | — | `0` | Base |
| `--z-sticky` | `z-sticky` | `20` | Mobile sticky ATC bar |
| `--z-header` | `z-header` | `40` | Sticky header |
| `--z-drawer` | `z-drawer` | `60` | Cart drawer + backdrop |
| `--z-modal` | `z-modal` | `80` | Modals |
| `--z-toast` | `z-toast` | `100` | Cookie banner, skip link |

### 2.9 Breakpoints

Runtime source of truth is `tailwind.config.ts › theme.screens` (mirrored as a comment in
`tokens.css`). Min-width, mobile-first.

| Name | Min width |
| --- | --- |
| `xs` | `480px` |
| `sm` | `640px` |
| `md` | `768px` |
| `lg` | `1024px` |
| `xl` | `1280px` |
| `2xl` | `1536px` |

### 2.10 Reduced-motion override

`tokens.css` zeroes all four durations under `@media (prefers-reduced-motion: reduce)`:

```css
@media (prefers-reduced-motion: reduce) {
  :root { --dur-1: 0ms; --dur-2: 0ms; --dur-3: 0ms; --dur-4: 0ms; }
}
```

`globals.css` additionally sets `scroll-behavior: auto` on `html` and disables the `.reveal`
animation. Because durations feed Tailwind's `duration-*` utilities, **every** token-driven
transition collapses to instant automatically.

---

## 3. Colour & accessibility

- **The CTA contrast decision.** The primary CTA is **ember `#FF5A1F` fill with dark ink text**
  (`--text-on-signal` = `--ink-950` `#08090b`). Ember on dark text passes AA for the button label —
  light text on ember would not. This is codified once in the `--text-on-signal` token and reused by
  every signal surface: `Button` variant `signal`, `AddToCartButton`, cookie "Accept all", the cart
  count badge, and the skip link.
- **Body text.** `--text` (`bone-100` `#e9e8e2`) on `--bg` (`ink-900` `#0b0c0e`) is the default
  body pairing; headings step up to `--text-strong` (`bone-050` `#f4f3ee`). Muted/faint text use
  `ink-200` / `ink-300`, where `ink-300` is annotated in-source as "AA on ink-900".
- **Semantic tokens drive theming.** Components never read raw ramp values — they read `--surface`,
  `--text`, `--signal`, `--border`, etc. Retheming (or a full re-skin) is a single-file edit to
  `tokens.css`; nothing in `components/` changes.
- **Danger ≠ signal.** Error/danger uses a distinct red (`--red-500` `#e5484d`), deliberately kept
  separate from the ember signal so "hot CTA" and "error" never read as the same colour.
- **Selection & focus** reuse the ember system: `::selection` is `ember-500` on `ink-950`; the
  focus ring is `--focus-ring` (`ember-400` `#ff7a45`).

---

## 4. Typography system

Loaded via `next/font/google` in `app/fonts.ts` — self-hosted at build time (no runtime request,
no layout shift), `display: swap` with fallback metrics to avoid FOIT. Exposed as CSS variables and
mapped to `fontFamily` in Tailwind.

| Role | Face | Tailwind | Weights loaded | CSS var |
| --- | --- | --- | --- | --- |
| Display | **Archivo** (industrial grotesk) | `font-display` | 500, 600, 700, 800, 900 | `--font-archivo` → `--font-display` |
| UI / body | **Hanken Grotesk** (legible workhorse) | `font-sans` | 400, 500, 600, 700 | `--font-hanken` → `--font-ui` |
| Mono | **JetBrains Mono** | `font-mono` | 400, 500, 600 | `--font-jetbrains` → `--font-mono` |

**Usage rules**

- **Archivo — headlines.** Applied to `h1–h4` in the base layer as `font-black`,
  `uppercase`, `leading-tight` (1.02), `tracking-tight` (-0.02em), colour `--text-strong`,
  `text-wrap: balance`. This is the industrial headline voice (Hero, `SectionHeading`,
  `ProductCard`/`PartCard` titles, PDP H1, cart/checkout headings). Prices also use the display face
  (`Price.tsx`) for a forged, numeric-poster feel.
- **Hanken Grotesk — body.** The `body` default; paragraph copy gets `text-wrap: pretty`.
  Line-height `--leading-normal` (1.5), relaxed 1.65 for long-form (`Prose`, FAQ answers, reviews).
- **JetBrains Mono — technical readouts.** Eyebrows, spec values (`SpecTable`/`SpecStrip`),
  badges (`Badge`, `StockBadge`, `RoadClassBadge`), breadcrumbs, cart quantities, price secondary
  line, payment marks. Mono = "technical data" signal.
- **The `.eyebrow` signature** (`globals.css`) — the ELDR technical-detailing motif:
  ```css
  .eyebrow {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);      /* 11px */
    letter-spacing: var(--tracking-caps); /* 0.12em */
    text-transform: uppercase;
    color: var(--text-faint);
    font-weight: var(--weight-medium);
  }
  .eyebrow--signal { color: var(--signal); }
  ```
  Used as the small mono kicker above nearly every section/card heading; the `--signal` modifier
  tints it ember for emphasis.

---

## 5. Component inventory

Each interactive component is documented with its variants and every state present in the code.

### 5.1 Button — `ui/Button.tsx`

Renders a `<button>`, or a Next `<Link>` when `href` is passed. Base classes: `inline-flex`,
`gap-2`, `font-medium`, `rounded-sm`, transition of `background-color,border-color,color,transform,
box-shadow` at `duration-1 ease-standard`, `select-none whitespace-nowrap`.

**Variants × states**

| Variant | Default | Hover | Active/press | Notes |
| --- | --- | --- | --- | --- |
| `signal` (default) | `bg-signal` + `text-on-signal`, transparent border | `bg-signal-hover` + `shadow-signal` (ember glow lift) | `bg-signal-press` | Primary CTA |
| `solid` | `bg-bone-50` + `text-ink-950` | `bg-white` | — | High-contrast neutral |
| `outline` | transparent, `text-text-strong`, `border-border-strong` | `border-bone-100` + `bg-surface` | — | Outline on dark |
| `ghost` | transparent, `text-text`, transparent border | `bg-surface` + `text-text-strong` | — | Quiet |

**Sizes** (min tap target 44px via `--tap-min`)

| Size | Height | Padding | Text | Tap-target guard |
| --- | --- | --- | --- | --- |
| `sm` | `h-9` (36px) | `px-3.5` | `text-sm` | `min-w-[2.25rem]` (icon-square min); height is below 44px — reserve for dense/secondary contexts |
| `md` (default) | `h-11` (44px) | `px-5` | `text-sm` | `min-h-tap-min` (44px) |
| `lg` | `h-[3.25rem]` (52px) | `px-7` | `text-base` | `min-h-tap-min` (44px) |

**Shared states**

- **Focus-visible:** `focus-visible:outline-2 focus-visible:outline-offset-2` (ember ring inherited
  from the global `:focus-visible` rule).
- **Active (all variants):** `active:translate-y-px` (1px press nudge).
- **Disabled:** `disabled:pointer-events-none disabled:opacity-45`.
- **Loading:** `loading` renders a spinning ring (`h-4 w-4 animate-spin border-2 border-current
  border-t-transparent`), sets `aria-busy`, and force-disables the button. Icons are hidden while
  loading.
- **Icons:** `iconLeft` / `iconRight` (from the `Icon` set); icon size 20 on `lg`, else 18.
- **`fullWidth`** → `w-full`.

### 5.2 AddToCartButton — `commerce/AddToCartButton.tsx`

Thin wrapper over `Button` (defaults `variant="signal"`, `size="lg"`, `iconRight="cart"`). Adds a
**busy affordance**: on click it sets `loading` for ~350ms (`setBusy(true)` → `setTimeout(…350)`)
while `add(item)` fires and the cart drawer opens. Accepts `disabled`. Used by `PartCard`
(as `outline`/`sm`) and elsewhere.

### 5.3 Badge, StockBadge, RoadClassBadge — `ui/Badge.tsx`

Base badge: `inline-flex`, `rounded-sm`, `border`, `px-2 py-0.5`, `font-mono text-2xs uppercase
tracking-caps`. Tones map to colour pairs:

| Tone | Classes |
| --- | --- |
| `neutral` | `border-border text-text-muted bg-surface` |
| `signal` | `border-signal/40 text-signal bg-signal-tint` |
| `success` | `border-success/40 text-success bg-success/10` |
| `warning` | `border-warning/40 text-warning bg-warning/10` |
| `danger` | `border-danger/40 text-danger bg-danger/10` |
| `info` | `border-ion-400/40 text-ion-300 bg-ion-400/10` |

**StockBadge** maps availability `state` → tone: `in_stock`→success, `build_to_order`→warning,
`preorder`→info, `sold_out`→danger. Optional leading **dot** (`bg-current`); the in-stock dot gets a
glow (`boxShadow: 0 0 6px currentColor`). Appends localized lead-time (`leadTimeDays[0]–[1] days`)
for non-in-stock states.

**RoadClassBadge** maps legal class → tone/label: `offroad`→neutral "Off-road", `L1e-B`→info
"L1e-B · moped", `L3e`→signal "L3e · motorcycle" (localized sv/en). The signal tone on L3e ties the
brand's hero product tier to ember.

### 5.4 Price — `ui/Price.tsx`

Primary amount in `font-display font-bold tracking-tight text-text-strong`, size responsive to
`size` (`lg`→`text-2xl`, `md`→`text-lg`, `sm`→`text-base`). Optional `showFrom` eyebrow, strikethrough
`compareAt` (`text-text-faint line-through`), "incl. VAT" note (`text-2xs`), and a mono secondary
line: EUR approximation (`≈ …`) and optional VAT-of breakdown. Currency formatting is delegated to
`lib/format`.

### 5.5 Icon — `ui/Icon.tsx`

Inline SVG set, 24×24 viewBox, `stroke="currentColor"` at `strokeWidth 1.6`, round caps/joins,
`aria-hidden="true"`, default `size=20`. Inline = no icon-font FOUT, no extra request, tree-shaken,
inherits text colour. Names: `arrow-right, arrow-up-right, chevron-down, chevron-right, cart, check,
bolt, shield, truck, menu, close, plus, minus, star, globe, wrench, gauge, info, file-check`.

### 5.6 SpecStrip / SpecTable — `ui/SpecTable.tsx`

- **SpecStrip** — condensed `<dl>`, `grid-cols-2 xs:grid-cols-4`; labels use `.eyebrow`, values
  `font-mono text-sm text-text-strong`. Used on cards/hero/configurator key-specs.
- **SpecTable** — full grouped PDP table; each group titled with `.eyebrow.eyebrow--signal`; rows in
  a `divide-y divide-border border-y` `<dl>`, label `text-text-muted`, value `font-mono text-sm`
  (`text-signal` when `highlight`, else `text-text-strong`), optional sans `note` in `text-2xs
  text-text-faint`.

### 5.7 Faq — `ui/Faq.tsx`

Native `<details>/<summary>` (keyboard-accessible, JS-free). Summary is `text-md font-medium
text-text-strong`, list marker hidden; a `plus` icon rotates 45° on open
(`group-open:rotate-45 transition-transform duration-2`). Answer is `text-sm leading-relaxed
text-text-muted`.

### 5.8 Logo / Mark — `ui/Logo.tsx`

`Mark` is an inline SVG emblem — three ascending blades, the tallest filled `fill-signal` (ember),
the others `fill-bone-100`, with `role="img"` + `aria-label`. `Logo` variants: `full` (mark +
wordmark), `mark`, `wordmark`. Wordmark is `font-display font-black uppercase tracking-tight
text-text-strong` with a trailing ember tick (`.` in `text-signal`) — the brand signature. Never a
raster.

### 5.9 Breadcrumbs — `ui/Breadcrumbs.tsx`

`<nav aria-label="Breadcrumb">` → `<ol>` in `font-mono text-2xs uppercase tracking-caps
text-text-faint`. Links hover to `text-text-strong`; current (no `href`) is `text-text-muted`;
separators are a `chevron-right` icon in `text-border-strong`.

### 5.10 SectionHeading — `ui/SectionHeading.tsx`

Optional `.eyebrow.eyebrow--signal` kicker, an Archivo `text-2xl sm:text-3xl font-black uppercase
tracking-tight` title, optional body (`text-md text-text-muted`), and an optional right-aligned
link (`arrow-right` icon, hovers to `text-signal`). Responsive: stacks on mobile, row with
`sm:items-end sm:justify-between` on `sm+`.

### 5.11 Prose / PageShell — `ui/Prose.tsx`

`PageShell` wraps editorial/legal pages (breadcrumbs + Archivo H1 + lead + prose column, all
`max-w-2xl`). `Prose` styles rich text via arbitrary variants: links `text-link underline`, `h2`
Archivo uppercase, list items disc, `strong` in `text-text-strong`; column capped at `max-w-2xl`
with relaxed leading for readability.

### 5.12 ProductCard — `commerce/ProductCard.tsx`

Whole card is a `<Link>` (`group`), `rounded-md border border-border bg-surface`. States:
- **Hover:** border → `border-border-strong`; hero image `group-hover:scale-[1.03]`
  (`duration-4 ease-out`); title → `text-signal`; the configure affordance nudges
  `group-hover:translate-x-0.5` and tints `text-signal`.
- Overlays: road-class badges (top-left), best-availability `StockBadge` (top-right).
- `priority` prop forwards to `next/image` for LCP on above-the-fold cards.

### 5.13 PartCard — `commerce/PartCard.tsx`

`group rounded-md border border-border bg-surface`. Image + title link hover to
`border-border-strong` / `text-signal`; image `group-hover:scale-[1.04]`. Shows a category
`.eyebrow`, fitment list (`text-2xs text-text-faint`), display-face price, and an inline
`AddToCartButton` (`outline`/`sm`). `StockBadge` overlaid top-right (`withDot={false}`).

### 5.14 ProductConfigurator — `commerce/ProductConfigurator.tsx`

The PDP buy module. Key patterns:
- **Variant / road-class toggle** — `role="radiogroup"` of `role="radio"` buttons with
  `aria-checked`. **Selected:** `border-signal bg-signal-tint`. **Unselected:** `border-border
  bg-surface hover:border-border-strong`. Each option is `min-h-tap-min`, left-aligned, and carries
  a `RoadClassBadge`. Default selection prefers the first `in_stock` variant.
- **Price + availability** block bordered `border-y`.
- **"What this road class means"** panel — plain-language consequences (top speed, licence, min age,
  registration) with icons; the anxiety-killer trust device.
- **Registration upsell** — a `<label>` wrapping a `checkbox` (`accent-[var(--signal)]`), street-legal
  variants only; hover `border-border-strong`.
- **Key specs** `<dl>` (`grid-cols-2 xs:grid-cols-4`, `.eyebrow` labels, mono values).
- **CTAs:** inline signal add-to-cart + outline compare (`sm:flex-row`).
- **Sticky mobile ATC** — `fixed inset-x-0 bottom-0 z-sticky border-t bg-bg/95 backdrop-blur-md
  lg:hidden`; variant name + price + full-width signal ATC, kept in thumb reach.

### 5.15 MediaGallery — `commerce/MediaGallery.tsx`

Main image `rounded-md border border-border bg-bg-sunken` with a faint `.grid-etch` overlay
(`opacity-30`, `aria-hidden`). Thumbnails are a `role="tablist"` (`aria-label="Product images"`) of
`role="tab"` buttons with `aria-selected` and a descriptive `aria-label` (`"alt (i/n)"`). **Selected
tab:** `border-signal`; **others:** `border-border hover:border-border-strong`. Horizontal-scroll
thumbnail strip on overflow.

### 5.16 FilterControls — `commerce/FilterControls.tsx`

Chip rows for road-class and use-case, driven by URL search params (`router.push(..., {scroll:
false})`). Each chip is a `min-h-9 rounded-pill border` button with `aria-pressed`. **Selected:**
`border-signal bg-signal-tint text-signal`. **Unselected:** `border-border bg-surface text-text-muted
hover:border-border-strong hover:text-text-strong`. `"all"` clears the param.

### 5.17 CartButton — `commerce/CartButton.tsx`

`h-11 w-11` icon button (44px, `rounded-sm`), hover `bg-surface`, dynamic `aria-label` with count.
When `totalQuantity > 0`, a `rounded-pill bg-signal text-on-signal` mono count badge overlays the
cart icon.

### 5.18 CartDrawer — `commerce/CartDrawer.tsx`

Right-side dialog. Container is `fixed inset-0 z-drawer`; when closed, `pointer-events-none` +
`aria-hidden`. **Backdrop:** `bg-overlay backdrop-blur-sm`, opacity transitions `duration-2`.
**Panel:** `role="dialog" aria-modal="true"` with localized `aria-label`, `max-w-md border-l bg-bg
shadow-lg`, slides via `translate-x-full → translate-x-0` at `duration-3 ease-out`. Behaviour:
- **Escape** closes; body scroll locked (`overflow: hidden`) while open (`useEffect`).
- **Empty state:** cart icon + message + outline "shop" CTA.
- **Line items:** thumbnail link, title (hover `text-signal`), a **quantity stepper**
  (`minus`/`plus` icon buttons with `aria-label`s, mono qty), line total, and a remove button
  (`hover:text-danger`, labelled).
- **Footer:** subtotal (display face), shipping note, full-width `signal` `lg` checkout button that
  enters **loading** state during the `/api/checkout` POST (`checkingOut`).

### 5.19 CheckoutSummary — `commerce/CheckoutSummary.tsx`

Demo/offline checkout. Three states: **placed** (success check in `bg-success/15` circle + thank-you),
**empty** (message + signal shop CTA), and the **summary** grid (line items + totals aside with VAT
25% row, a `warning`-toned demo notice `border-warning/40 bg-warning/10 text-warning`, a signal
"complete" button, and mono payment marks).

### 5.20 Header — `sections/Header.tsx`

`sticky top-0 z-header`. **Scroll state:** transparent at top → on scroll (`scrollY > 8`) or open
menu, gains `border-border bg-bg/92 backdrop-blur-md` (`transition-colors duration-2`). Desktop nav
links are `h-11` (44px) `text-text-muted hover:text-text-strong`. The Motorcycles link opens a
**mega-menu** on hover (`aria-expanded`) — a 2-col grid panel (`border bg-surface shadow-lg`) of
model links (hover `bg-surface-hover`, name → `text-signal`). Locale switch is a mono `globe` pill.
**Mobile:** a `h-11 w-11` menu toggle (`aria-expanded`, icon swaps `menu`/`close`, `lg:hidden`) opens
a full-width nav of `min-h-tap-min` rows.

### 5.21 Footer — `sections/Footer.tsx`

`border-t bg-bg-sunken`. Logo + proposition + `NewsletterForm`, four link columns (`.eyebrow`
headings, `text-text-muted hover:text-text-strong` links) each in its own labelled `<nav>`, an
independent-retailer disclaimer, mono payment marks, and a dynamic-year legal line.

### 5.22 NewsletterForm — `sections/NewsletterForm.tsx`

Form with three states (`'idle' | 'done' | 'error'`):
- **Input:** `h-11 rounded-sm border border-border bg-surface`, `placeholder:text-text-faint`,
  **focus** `focus-visible:border-signal`; carries a `sr-only` `<label>`, `type=email`,
  `inputMode=email`, `autoComplete=email`.
- **Error:** regex-validated on submit → `aria-invalid`, a `text-2xs text-danger` message; typing
  resets error to idle.
- **Done:** success message with a `check` icon in `text-success` (replaces the form).
- Submit button: `h-11 bg-bone-50 text-ink-950 hover:bg-white` (neutral, distinct from the ember CTA
  system to avoid two competing signals in the footer).

### 5.23 TrustStrip — `sections/TrustStrip.tsx`

Icon+label grid (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`), icons in `text-signal`, labels
`text-xs text-text-muted`. `compact` prop drops the `border-y bg-bg-sunken` framing. Items: DDP
delivery, registration, warranty, secure payment, support.

### 5.24 Reviews — `commerce/Reviews.tsx`

Card grid (`sm:grid-cols-2 lg:grid-cols-3`), each a `figure` `rounded-md border border-border
bg-surface`. **Stars** render `star` icons `fill-signal text-signal` when `i <= rating`, else
`text-border-strong`, wrapped with an `aria-label="{rating} / 5"`. (Seed data is illustrative — noted
in-source to wire to Judge.me/Trustpilot before launch.)

### 5.25 CookieBanner — `sections/CookieBanner.tsx`

`fixed inset-x-0 bottom-0 z-toast`, `role="dialog"` with `aria-label`. Card `border bg-surface/95
shadow-lg backdrop-blur-md`. Two actions: **Necessary only** (outline `border-border`) and **Accept
all** (`bg-signal text-on-signal hover:bg-signal-hover`). Writes `eldr_consent_v1`, dispatches an
`eldr-consent` event, and fires Google Consent Mode v2 `gtag('consent','update', …)` — `ad_storage`
stays `denied`. Paired with `Analytics.tsx`, which only injects GA4 after consent is granted.

---

## 6. Layout & grid

- **Container** — `.container-eldr`: `width:100%`, `max-width: var(--container-max)` (**84rem /
  1344px**), centered (`margin-inline:auto`), horizontal padding `var(--gutter)`.
- **Gutter** — fluid `clamp(1rem, 0.5rem + 2.5vw, 2.5rem)` (16px mobile → 40px desktop), so page
  margins breathe with viewport width.
- **Section rhythm** — `.section` uses `padding-block: clamp(3rem, 1.5rem + 6vw, 7rem)`;
  `.section-tight` uses `clamp(2rem, 1rem + 4vw, 4rem)`. Hero reserves `min-h-[88vh] sm:min-h-[92vh]`.
- **Breakpoints & mobile-first** — everything is authored at the small end, then enhanced with
  `xs/sm/md/lg/xl/2xl` min-width prefixes (grids typically `grid-cols-2 → sm:grid-cols-3/4 →
  lg:grid-cols-5`). Concrete mobile-first commerce affordances:
  - **Sticky ATC** on the PDP is `lg:hidden` and pinned to the bottom (`z-sticky`) for **thumb
    reach**; the inline CTA row is the desktop path.
  - **Header** collapses the primary nav into a full-screen `min-h-tap-min` mobile menu below `lg`.
  - Cart drawer is `w-full max-w-md` — full-bleed on phones, panel on desktop.
- **App shell** (`app/[locale]/layout.tsx`) — `body` is a `flex min-h-dvh flex-col`; `<main>` is
  `flex-1` so the footer sticks to the bottom (`mt-auto`).
- **Body backdrop** — two barely-there radial gradients (ember at top-right ~5%, ion at bottom-left
  ~4.5%) over the matte base, `background-attachment: fixed` — depth without a "tech gradient" cliché.

---

## 7. Motion

- **Durations & easings** — see §2.7. Convention: `duration-1` for hover/press, `duration-2` for
  standard colour/opacity, `duration-3` for the drawer slide, `duration-4` for hero/media reveals
  and card image zooms. `ease-out` for enters, `ease-standard` as the default.
- **Transform / opacity only** — animations move `transform` and `opacity` exclusively (GPU-composited,
  no layout thrash, CWV-safe). Card hovers scale the image (`scale-[1.03]`/`[1.04]`), buttons nudge
  (`translate-y-px`), the drawer uses `translate-x`, `.reveal` translates + fades.
- **`.reveal`** (`globals.css` utilities) — enters from `opacity:0; translateY(14px)` to neutral via
  `@keyframes reveal` at `--dur-4 --ease-out forwards`. Used across the Hero. Under reduced-motion
  it is forced to `opacity:1; transform:none; animation:none`.
- **`.grid-etch`** — GPU-cheap technical/mechanical backdrop: two 1px `--border` linear-gradients on
  a `64px×64px` grid, radially masked (`mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, …)`),
  `opacity: 0.5`. Used behind the Hero and (fainter) over the MediaGallery.
- **Reduced-motion** — the token override (§2.10) zeroes all durations; `.reveal` disabled;
  `scroll-behavior: auto`. No motion is essential to comprehension.

---

## 8. Accessibility spec

- **Focus-visible rings — never removed.** Global rule in `globals.css`:
  `:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; border-radius:
  var(--radius-xs); }` — a **2px ember** ring (`--focus-ring` = `ember-400` `#ff7a45`) with a 2px
  offset on every focusable element. `Button` additionally sets `focus-visible:outline-2
  outline-offset-2`; the newsletter input signals focus with `focus-visible:border-signal`. Outlines
  are styled, never `outline:none`.
- **Tap targets.** `--tap-min: 44px` (WCAG 2.5.5) is wired to `min-h-tap-min`/`min-w`; header icon
  buttons, cart button and nav items are `h-11`/`min-h-tap-min`; Button `md`/`lg` guarantee 44px.
  (`sm` buttons are 36px tall — intentionally reserved for dense/secondary UI.)
- **Contrast.** Deliberate pairings: dark ink text on ember CTA (`--text-on-signal`), bone body on
  obsidian, `ink-300` documented as AA on `ink-900`; danger red kept distinct from the ember signal.
- **Alt text.** All `next/image` usages take localized alt (`L(...alt, locale)`); decorative images
  (Hero background, gallery grid overlay, badge dots, icons) use empty `alt=""` / `aria-hidden`.
  Icons are `aria-hidden="true"` by default and paired with visible or `sr-only` text.
- **ARIA on interactive commerce widgets:**
  - Cart drawer: `role="dialog" aria-modal="true"`, localized `aria-label`, `aria-hidden` when
    closed, quantity/remove buttons individually labelled.
  - Variant selector: `role="radiogroup"` / `role="radio"` + `aria-checked`.
  - Gallery thumbnails: `role="tablist"` / `role="tab"` + `aria-selected` with positional labels.
  - Filter chips: `aria-pressed`; header disclosures/menus: `aria-expanded`.
  - Cookie banner: `role="dialog"` + `aria-label`. Newsletter: `aria-invalid` on error + `sr-only`
    label.
- **Skip link.** First focusable element in `layout.tsx`: `sr-only` until focused, then reveals as a
  fixed ember chip linking to `#main`; `<main id="main">` is the target (`:target` gets
  `scroll-margin-top: 6rem`). Localized ("Hoppa till innehåll" / "Skip to content").
- **Keyboard navigation.** FAQ uses native `<details>/<summary>`; cart closes on **Escape**; all
  controls are real `<button>`/`<a>`/`<input>` elements (focusable, activatable) with visible focus.
- **`prefers-reduced-motion`.** Honored at the token layer (all durations → 0), on `html`
  (`scroll-behavior: auto`) and for `.reveal` — so no essential content depends on animation.
- **Consent-gated analytics.** GA4 defaults to `analytics_storage: denied` and is only injected
  after explicit consent (`Analytics.tsx` + `CookieBanner.tsx`), with `ad_storage` permanently
  denied and `anonymize_ip` on — privacy by construction.
