import type { Locale } from './brand'
import type { Money } from './types'

/**
 * Swedish standard VAT (moms) = 25%. Consumer prices are shown INCL. moms by
 * law (Skatteverket / prisinformationslagen). We store gross prices and derive
 * the VAT component for transparency on the PDP.
 * Source: Skatteverket — momssatser (25% standard). [see docs/compliance]
 */
export const VAT_RATE = 0.25

export function vatBreakdown(grossSek: number) {
  const net = grossSek / (1 + VAT_RATE)
  const vat = grossSek - net
  return { gross: grossSek, net, vat }
}

const localeTag: Record<Locale, string> = {
  sv: 'sv-SE',
  en: 'en-SE', // English copy, Swedish market conventions
}

export function formatSEK(value: number, locale: Locale = 'sv'): string {
  return new Intl.NumberFormat(localeTag[locale], {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatEUR(value: number, locale: Locale = 'sv'): string {
  return new Intl.NumberFormat(locale === 'sv' ? 'sv-SE' : 'en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

/** Primary price display: SEK for the Swedish market, EUR as secondary. */
export function formatPrice(money: Money, locale: Locale = 'sv') {
  return {
    primary: formatSEK(money.sek, locale),
    secondary: formatEUR(money.eur, locale),
    compareAt: money.compareAtSek ? formatSEK(money.compareAtSek, locale) : null,
  }
}

export function formatNumber(value: number, locale: Locale = 'sv'): string {
  return new Intl.NumberFormat(localeTag[locale]).format(value)
}
