import type { Locale } from './brand'
import type { Localized } from './types'

export const LOCALES: Locale[] = ['sv', 'en']
export const DEFAULT_LOCALE: Locale = 'sv'

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value)
}

/** Resolve a Localized field for the active locale (falls back to sv). */
export function L(value: Localized, locale: Locale): string {
  return value[locale] ?? value.sv
}

/** hreflang alternates for a given path (without locale prefix). */
export function alternates(path: string, siteUrl: string) {
  const clean = path.replace(/^\/+/, '')
  const languages: Record<string, string> = {}
  for (const l of LOCALES) languages[l] = `${siteUrl}/${l}${clean ? '/' + clean : ''}`
  languages['x-default'] = `${siteUrl}/${DEFAULT_LOCALE}${clean ? '/' + clean : ''}`
  return languages
}

/**
 * UI dictionary — chrome copy (nav, buttons, status labels). Product/legal copy
 * lives in /content as Localized fields. Keep keys flat and grep-able.
 */
type Dict = Record<string, Localized>

export const T: Dict = {
  'nav.motorcycles': { sv: 'Motorcyklar', en: 'Motorcycles' },
  'nav.parts': { sv: 'Delar & tillbehör', en: 'Parts & accessories' },
  'nav.registration': { sv: 'Registrering', en: 'Registration' },
  'nav.compare': { sv: 'Jämför', en: 'Compare' },
  'nav.about': { sv: 'Om EMOTO', en: 'About' },
  'nav.support': { sv: 'Support', en: 'Support' },
  'nav.journal': { sv: 'Journal', en: 'Journal' },

  'cta.shop': { sv: 'Se modeller', en: 'Explore models' },
  'cta.configure': { sv: 'Konfigurera', en: 'Configure' },
  'cta.addToCart': { sv: 'Lägg i varukorg', en: 'Add to cart' },
  'cta.buy': { sv: 'Köp nu', en: 'Buy now' },
  'cta.learn': { sv: 'Läs mer', en: 'Learn more' },
  'cta.viewAll': { sv: 'Visa alla', en: 'View all' },
  'cta.book': { sv: 'Boka registrering', en: 'Book registration' },
  'cta.checkout': { sv: 'Till kassan', en: 'Checkout' },
  'cta.continue': { sv: 'Fortsätt handla', en: 'Continue shopping' },

  'label.from': { sv: 'Från', en: 'From' },
  'label.inclVat': { sv: 'inkl. moms', en: 'incl. VAT' },
  'label.exVat': { sv: 'exkl. moms', en: 'ex. VAT' },
  'label.vatOf': { sv: 'varav moms', en: 'of which VAT' },
  'label.specs': { sv: 'Specifikationer', en: 'Specifications' },
  'label.overview': { sv: 'Översikt', en: 'Overview' },
  'label.fitment': { sv: 'Passar', en: 'Fits' },
  'label.delivery': { sv: 'Leverans', en: 'Delivery' },
  'label.warranty': { sv: 'Garanti', en: 'Warranty' },
  'label.faq': { sv: 'Vanliga frågor', en: 'FAQ' },
  'label.reviews': { sv: 'Omdömen', en: 'Reviews' },
  'label.gallery': { sv: 'Galleri', en: 'Gallery' },
  'label.compatibleParts': { sv: 'Uppgraderingar som passar', en: 'Compatible upgrades' },
  'label.roadClass': { sv: 'Vägklass', en: 'Road class' },
  'label.topSpeed': { sv: 'Toppfart', en: 'Top speed' },
  'label.license': { sv: 'Körkort', en: 'Licence' },
  'label.minAge': { sv: 'Lägsta ålder', en: 'Minimum age' },
  'label.registration': { sv: 'Registrering', en: 'Registration' },
  'label.insurance': { sv: 'Försäkring', en: 'Insurance' },
  'label.helmet': { sv: 'Hjälm', en: 'Helmet' },

  'finance.from': { sv: 'Delbetala från', en: 'From' },
  'finance.perMonth': { sv: 'kr/mån', en: 'kr/mo' },
  'finance.with': { sv: 'med Klarna', en: 'with Klarna' },
  'stock.onlyLeft': { sv: 'kvar i lager', en: 'left in stock' },

  'stock.in_stock': { sv: 'I lager', en: 'In stock' },
  'stock.build_to_order': { sv: 'Byggs på beställning', en: 'Built to order' },
  'stock.preorder': { sv: 'Förbeställning', en: 'Pre-order' },
  'stock.sold_out': { sv: 'Slutsåld', en: 'Sold out' },
  'stock.leadTime': { sv: 'Leveranstid', en: 'Lead time' },
  'stock.days': { sv: 'dagar', en: 'days' },
  'stock.shipsFrom': { sv: 'Skickas från vårt lager i Sverige', en: 'Ships from our Sweden warehouse' },
  'stock.chinaBuild': {
    sv: 'Byggs i fabrik och fraktas — reserverad plats i kö',
    en: 'Factory-built and shipped — reserved production slot',
  },

  'trust.ddp': { sv: 'DDP inom EU — inga oväntade avgifter', en: 'DDP within the EU — no surprise fees' },
  'trust.registration': { sv: 'Registreringshjälp ingår som tillval', en: 'Registration help available' },
  'trust.warranty': { sv: 'Garanti på fordon & batteri', en: 'Vehicle & battery warranty' },
  'trust.secure': { sv: 'Säker betalning · Klarna · kort', en: 'Secure payment · Klarna · card' },
  'trust.support': { sv: 'Riktig support på svenska', en: 'Real support, in Swedish' },

  'cart.title': { sv: 'Varukorg', en: 'Cart' },
  'cart.empty': { sv: 'Din varukorg är tom', en: 'Your cart is empty' },
  'cart.subtotal': { sv: 'Delsumma', en: 'Subtotal' },
  'cart.shippingNote': { sv: 'Frakt & moms beräknas i kassan', en: 'Shipping & VAT calculated at checkout' },
  'cart.remove': { sv: 'Ta bort', en: 'Remove' },

  'footer.rights': { sv: 'Alla rättigheter förbehållna.', en: 'All rights reserved.' },
  'footer.independent': {
    sv: 'EMOTO är en oberoende återförsäljare. Sur-Ron® är ett varumärke som tillhör sin ägare.',
    en: 'EMOTO is an independent retailer. Sur-Ron® is a trademark of its owner.',
  },
}

export function t(key: string, locale: Locale): string {
  const entry = T[key]
  if (!entry) return key
  return L(entry, locale)
}
