import type { Order } from '@/lib/fulfillment'

/**
 * Mock orders for the order-status tracker demo. In production these come from
 * Shopify Orders (via Admin API / customer account) — here they let the
 * /spar-order flow work offline. Look up by order id + email.
 *
 * Try in the UI:
 *   ELDR-2026-0042 · erik@example.com   (build-to-order L3e, registration, in transit)
 *   ELDR-2026-0031 · sara@example.com   (in-stock parts, delivered)
 *   ELDR-2026-0048 · johan@example.com  (Storm Bee preorder, building)
 */
export const orders: Order[] = [
  {
    id: 'ELDR-2026-0042',
    email: 'erik@example.com',
    placedAt: '2026-06-18',
    lines: [
      { title: 'Sur-Ron Ultra Bee — T · L3e', qty: 1, kind: 'vehicle' },
      { title: 'Registreringshjälp – komplett', qty: 1, kind: 'service' },
      { title: '250 mm oversize bromsskive-kit', qty: 1, kind: 'part' },
    ],
    currentStage: 'shipping',
    buildToOrder: true,
    includesRegistration: true,
    eta: { sv: 'ca 20–27 juli', en: 'approx. 20–27 July' },
    events: [
      { stage: 'placed', date: '2026-06-18' },
      { stage: 'confirmed', date: '2026-06-18', note: { sv: 'Betald via Klarna', en: 'Paid via Klarna' } },
      { stage: 'building', date: '2026-06-20', note: { sv: 'Byggplats reserverad i fabrik', en: 'Production slot reserved' } },
      { stage: 'shipping', date: '2026-07-02', note: { sv: 'Skickad DDP från fabrik', en: 'Shipped DDP from factory' } },
    ],
  },
  {
    id: 'ELDR-2026-0031',
    email: 'sara@example.com',
    placedAt: '2026-06-28',
    lines: [
      { title: 'KKE uppgraderade framgafflar', qty: 1, kind: 'part' },
      { title: 'CNC-frästa fotpinnar', qty: 1, kind: 'part' },
    ],
    currentStage: 'delivered',
    buildToOrder: false,
    includesRegistration: false,
    eta: { sv: 'Levererad 2 juli', en: 'Delivered 2 July' },
    events: [
      { stage: 'placed', date: '2026-06-28' },
      { stage: 'confirmed', date: '2026-06-28' },
      { stage: 'shipping', date: '2026-06-29', note: { sv: 'Skickad från lager i Sverige', en: 'Shipped from Sweden warehouse' } },
      { stage: 'delivered', date: '2026-07-02' },
    ],
  },
  {
    id: 'ELDR-2026-0048',
    email: 'johan@example.com',
    placedAt: '2026-07-01',
    lines: [{ title: 'Sur-Ron Storm Bee — F · Street L3e', qty: 1, kind: 'vehicle' }],
    currentStage: 'building',
    buildToOrder: true,
    includesRegistration: true,
    eta: { sv: 'ca 15 sep – 20 okt', en: 'approx. 15 Sep – 20 Oct' },
    events: [
      { stage: 'placed', date: '2026-07-01' },
      { stage: 'confirmed', date: '2026-07-01', note: { sv: 'Betald, förbeställning bekräftad', en: 'Paid, pre-order confirmed' } },
      { stage: 'building', date: '2026-07-03' },
    ],
  },
]
