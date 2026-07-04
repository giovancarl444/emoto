# ELDR — Operations & Fulfillment Playbook (Phase 2)

How ELDR sources, stocks, ships, registers, warranties and supports — the operational spine behind the storefront. Facts trace to [`research-dossier.md`](./research-dossier.md); anything unconfirmed against a primary source is **[VERIFY]**. Where a process is operationalized in code, the file is named.

---

## 1. Sourcing & supply model

**Position:** authorized independent retailer of Sur-Ron, architected multi-brand (every vehicle carries a `marque`; a second/third marque is a content addition — see `storefront/content/models.ts`).

- **Primary channel:** the Sur-Ron supply chain via Sweden's official general agent **Adoy AB** (which also underpins warranty for independents) and/or vetted EU distributors. [VERIFY exact terms, MOQ, dealer pricing.]
- **Registered professional importer (the moat):** ELDR applies to Transportstyrelsen to become a **registrerad yrkesmässig importör**. This lets us register **new** vehicles (never taken into use) directly on the **CoC**, skipping ursprungskontroll — faster customer promise and an operational edge over grey-import competitors. Requires a Bolagsverket certificate (<12 mo) showing vehicle trade/import + a Skatteverket VAT/trade extract. [VERIFY current application requirements.]
- **Landed-cost note:** China-built e-motorcycles clear at the ~6 % MFN duty (CN 8711 60) [VERIFY]; crucially the EU's 7.8–35.3 % countervailing duties on Chinese EVs apply **only to passenger cars (HS 8703), not motorcycles (HS 8711)** — protects margin.
- **FX:** price buffers on SEK vs supplier currency; forward-buy hero SKUs.

---

## 2. Inventory & lead-time logic

Two-tier model, surfaced truthfully per variant (never "ships soon"):

| Tier | What | Customer promise | Working capital |
|---|---|---|---|
| **In-stock buffer** | ~8–12 hero units in a Swedish warehouse | **2–5 business days** | ~0.4–0.55 MSEK tied up [VERIFY] |
| **Build-to-order** | factory build + ship | dated window (e.g. 45–90 days) | deposit-funded, minimal float |
| **Pre-order** | flagship/next batch | 75–120 days | deposit-funded |

- **Availability states** live in content (`content/models.ts` → `Availability {state, stockQty, leadTimeDays}`): `in_stock` · `build_to_order` · `preorder` · `sold_out`.
- **ETA engine:** `lib/fulfillment.ts › deliveryEstimate()` turns lead-time into a human window — in-stock reads "Leverans 2–5 arbetsdagar"; build-to-order reads a **dated** window ("ca 20–27 juli"). Shown on the PDP configurator and reflected in stock badges.
- **Reorder policy:** replenish in-stock buffer when it drops below ~4 units of a hero SKU; batch build-to-order weekly to the factory. [VERIFY against real demand once live.]

---

## 3. Shipping — DDP / DAP

- **Within the EU: DDP** (Delivered Duty Paid) — ELDR pays import duty + import VAT + customs clearance; the customer sees **no border surprises**. Delivered **assembled and ride-ready**.
- **Outside the EU: DAP** — customer clears customs and pays import VAT/duty (disclosed at checkout).
- **Import VAT:** 25 % on CIF + duty + freight, always due (Tullverket). EORI + customs declaration + EU 168/2013 type-approval required for the import.
- **Carriers:** palletised freight for vehicles (2-man/kerbside options), parcel for parts. [VERIFY carrier contracts + insured-in-transit terms.]
- **Cross-border VAT (Nordic expansion):** below the **EUR 10,000/yr** distance-selling threshold → Swedish 25 % VAT; above → destination VAT via **Union OSS**.

---

## 4. Returns & warranty ops

### 4.1 Withdrawal (ångerrätt) — SOP
Trigger: customer opens a withdrawal request (`/[locale]/angerratt` → **Start a withdrawal request** → `/support?topic=returns`, ticket created via `/api/support`).
1. Acknowledge within 1 business day; confirm the 14-day window (from possession) applies (distance sale).
2. Customer arranges/pays return transport (pre-informed); ELDR arranges a freight quote on request.
3. On receipt, inspect for **värdeminskning** (handling beyond establishing characteristics) — apply an ARN-benchmarked use deduction only where justified; document with photos.
4. **Refund** price + original standard outbound delivery within 14 days of the withdrawal notice (may withhold until goods returned or proof of return).
5. **Registered vehicle:** withdrawal still valid; coordinate deregistration; value deduction applies. Factory-option vehicles are **not** "made to order" → keep full withdrawal rights.

> **[VERIFY] 19 Jun 2026 "ångerknapp":** a mandatory in-interface withdrawal button. Implement in the checkout/account before that date. Failure to inform about withdrawal extends the window up to 12 months.

### 4.2 Warranty & reklamation — SOP
- ELDR warranty (`content/warranties.ts`): 24-mo vehicle + battery [VERIFY vs Adoy AB], layered **on top of** the statutory **3-year reklamationsrätt** (konsumentköplagen 2022:260), with a **2-year reversed burden of proof**.
- Claim flow: ticket (`/support?topic=warranty`) → triage against exclusions (wear items, competition/rental limits, non-approved parts) → repair/replace via Adoy AB channel or service partner → keep the customer's statutory floor intact regardless of manufacturer term.
- Reliability watch-list (drives the upgrade catalogue): stock controller, BMS/battery connectors, KKE/DNM forks, undersized brakes, tyres, water ingress.

---

## 5. Registration concierge — SOP (the productized service)

Sold as `/[locale]/tjanster/registrering` (SKU `svc-registration`, 3,495 kr + official fees [VERIFY]).

| Step | ELDR does | Official fee (est.) [VERIFY] | Timeline [VERIFY] |
|---|---|---|---|
| 1. CoC & homologation | Confirm valid CoC for the class (L1e/L3e) per vehicle | — | at order |
| 2. Ursprungskontroll* | Apply to Transportstyrelsen (*skipped if we're a registered importer registering a new vehicle on CoC) | ~1,240 kr | 2–5 days (often longer at peak) |
| 3. Registreringsbesiktning | Book Besikta/Carspect/etc.; for new EU-type-approved = identity/document check | ~600–800 kr | by appointment |
| 4. Plates & bevis | Vehicle entered in vägtrafikregistret; registreringsbevis + rear plate; guide to trafikförsäkring | plate ~80 kr; register fee ~74 kr/yr | ~1 week for plates |

Tax reminders surfaced to the buyer: **mopeds exempt** from fordonsskatt; **electric MC effectively 0 kr**; **trafikförsäkring mandatory before riding**.

---

## 6. Order-status & support flows

### 6.1 Order status (operationalized)
- Fulfillment stages (`lib/fulfillment.ts › stagesFor()`): **placed → confirmed → building* → shipping → registration* → delivered** (\*conditional on build-to-order / registration).
- Customer self-serve tracker: `/[locale]/spar-order` (order # + email lookup → `OrderTracker` stage timeline with dates + events). Noindexed. In production this reads Shopify Orders / customer account; the demo uses `content/orders.ts`.
- Proactive comms: email/SMS on each stage transition (confirmed, shipped, registration started, delivered). [Wire to Klaviyo/Shopify notifications in Phase 3.]

### 6.2 Support
- Intake: `/[locale]/support` — quick links (track order, registration, withdrawal, delivery) + a topic-routed request form (`SupportForm` → `/api/support`) that returns a ticket ref. Topics: order · registration · warranty · returns · general.
- Channel promise: Swedish-language, reply target < 1 h on weekdays.
- Production: route tickets to a helpdesk (Gorgias/Front/Zendesk) + `support@eldr.se`.

---

## 7. SLAs & KPIs (targets — [VERIFY] against reality)

| Metric | Target |
|---|---|
| First support response (weekday) | < 1 hour |
| In-stock dispatch | ≤ 2 business days |
| Withdrawal acknowledgement | < 1 business day |
| Refund after return received | ≤ 14 days (statutory) |
| Registration completion (registered-importer path) | ≤ 2 weeks from delivery |
| Registration attach rate (street-legal) | ≥ 25 % → 40 % |
| Parts attach rate (per vehicle order) | ≥ 35 % |
| On-time delivery vs promised window | ≥ 90 % |

---

## 8. Open operational items to verify before launch
- [ ] Sign supply terms with Adoy AB / distributor (pricing, MOQ, warranty backstop).
- [ ] Submit registered-importer application (Transportstyrelsen) + confirm exact requirements.
- [ ] Contract 3PL/warehouse in Sweden + insured freight carriers (vehicle + parts).
- [ ] Confirm current official fees & handläggningstid (Transportstyrelsen, besiktning providers).
- [ ] Stand up helpdesk + email/SMS notification flows; connect Shopify Orders to `/spar-order`.
- [ ] Implement the 19 Jun 2026 withdrawal button in checkout/account.
