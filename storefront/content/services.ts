import type { Localized, Money, Availability } from '@/lib/types'

/**
 * Productized services (registration help, delivery). These are the
 * differentiator + recurring-touchpoint layer. Priced as add-ons that attach to
 * a vehicle purchase or sell standalone. Prices [VERIFY] before launch.
 */
export interface Service {
  id: string
  handle: string
  name: Localized
  summary: Localized
  price: Money
  availability: Availability
  shopifyVariantId?: string
  verify?: boolean
}

export const registrationService: Service = {
  id: 'svc-registration',
  handle: 'registreringshjalp',
  name: {
    sv: 'Registreringshjälp – komplett',
    en: 'Registration help – full service',
  },
  summary: {
    sv: 'Vi hanterar ursprungskontroll, CoC-intyg, bokar registreringsbesiktning och guidar dig hela vägen till svensk registreringsskylt.',
    en: 'We handle the origin check, CoC certificate, book the registration inspection and guide you all the way to Swedish plates.',
  },
  price: { sek: 3495, eur: 310 }, // [VERIFY]
  availability: { state: 'in_stock' },
  verify: true,
}

export const services: Service[] = [registrationService]
