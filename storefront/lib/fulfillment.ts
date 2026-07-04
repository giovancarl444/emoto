import type { Locale } from './brand'
import type { Availability } from './types'

/**
 * Fulfillment logic — turns inventory + lead-time data into customer-facing
 * delivery estimates, and defines the order fulfillment stages. In-stock hero
 * units ship fast from the Swedish warehouse; build-to-order units carry the
 * honest factory build + ship window shown per variant.
 */

export const IN_STOCK_SHIP_DAYS: [number, number] = [2, 5] // business days from SE warehouse

/** Resolve an availability into a [minDays, maxDays] delivery window. */
export function leadWindow(a: Availability): [number, number] {
  if (a.state === 'in_stock') return IN_STOCK_SHIP_DAYS
  if (a.leadTimeDays) return a.leadTimeDays
  // sensible fallbacks
  if (a.state === 'preorder') return [75, 120]
  if (a.state === 'build_to_order') return [45, 90]
  return [0, 0]
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base)
  d.setDate(d.getDate() + days)
  return d
}

function fmt(d: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'sv' ? 'sv-SE' : 'en-GB', {
    day: 'numeric',
    month: 'short',
  }).format(d)
}

/**
 * Human delivery estimate. In-stock reads as "2–5 arbetsdagar"; build-to-order
 * reads as a dated window ("ca 18 aug – 12 sep") so the customer sees the truth,
 * not a vague "ships soon". `now` is injectable for deterministic tests.
 */
export function deliveryEstimate(a: Availability, locale: Locale, now: Date = new Date()): string {
  const [min, max] = leadWindow(a)
  if (a.state === 'sold_out') return locale === 'sv' ? 'Ej i lager' : 'Out of stock'
  if (a.state === 'in_stock') {
    return locale === 'sv' ? `Leverans ${min}–${max} arbetsdagar` : `Delivery ${min}–${max} business days`
  }
  const from = fmt(addDays(now, min), locale)
  const to = fmt(addDays(now, max), locale)
  return locale === 'sv' ? `Beräknad leverans: ca ${from} – ${to}` : `Estimated delivery: approx. ${from} – ${to}`
}

/* ── Order fulfillment stages ───────────────────────────────────────────── */

export type OrderStage =
  | 'placed'
  | 'confirmed'
  | 'building'
  | 'shipping'
  | 'registration'
  | 'delivered'

export const STAGE_LABEL: Record<OrderStage, { sv: string; en: string }> = {
  placed: { sv: 'Order mottagen', en: 'Order received' },
  confirmed: { sv: 'Bekräftad & betald', en: 'Confirmed & paid' },
  building: { sv: 'Byggs i fabrik', en: 'Building at factory' },
  shipping: { sv: 'Under transport', en: 'In transit' },
  registration: { sv: 'Registrering pågår', en: 'Registration in progress' },
  delivered: { sv: 'Levererad', en: 'Delivered' },
}

export interface OrderLine {
  title: string
  qty: number
  kind: 'vehicle' | 'part' | 'service'
}

export interface OrderEvent {
  stage: OrderStage
  date: string // ISO date
  note?: { sv: string; en: string }
}

export interface Order {
  id: string
  email: string
  placedAt: string // ISO date
  lines: OrderLine[]
  currentStage: OrderStage
  buildToOrder: boolean
  includesRegistration: boolean
  /** Human ETA window text (sv/en). */
  eta: { sv: string; en: string }
  events: OrderEvent[]
}

/**
 * Build the ordered stage list for a specific order. Build-to-order adds the
 * "building" stage; street-legal orders with the registration service add the
 * "registration" stage before delivery.
 */
export function stagesFor(order: {
  buildToOrder: boolean
  includesRegistration: boolean
}): OrderStage[] {
  const s: OrderStage[] = ['placed', 'confirmed']
  if (order.buildToOrder) s.push('building')
  s.push('shipping')
  if (order.includesRegistration) s.push('registration')
  s.push('delivered')
  return s
}
