/**
 * Brand constants — single place to change name/identity. The flagship name is
 * centralized here so a rename is a one-line change, never a rewrite.
 * Values marked [VERIFY] are placeholders to confirm before going live.
 */
export const BRAND = {
  name: 'EMOTO',
  // EMOTO = electric + moto(rcycle) — the category name, owned as a brand
  legalName: 'EMOTO AB', // [VERIFY] — register company + reserve name at Bolagsverket
  orgNumber: '000000-0000', // [VERIFY]
  vatNumber: 'SE000000000001', // [VERIFY]
  domain: 'emoto.se', // [VERIFY availability — .se via IIS, .com]
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://emoto.se',

  descriptor: {
    sv: 'Oberoende återförsäljare av Sur-Ron®',
    en: 'Independent Sur-Ron® retailer',
  },
  tagline: {
    sv: 'Elektrisk terräng.',
    en: 'Electric terrain.',
  },
  proposition: {
    sv: 'Högpresterande elektriska off-road- och gaturegistrerade motorcyklar — levererade, registrerade och garanterade i Sverige.',
    en: 'High-performance electric off-road and street-legal motorcycles — delivered, registered and warrantied in Sweden.',
  },

  email: {
    hello: 'hej@emoto.se',
    support: 'support@emoto.se',
    press: 'press@emoto.se',
  },
  phone: '+46 8 000 00 00', // [VERIFY]
  address: {
    line1: 'Verkstadsgatan 1', // [VERIFY]
    postal: '117 43',
    city: 'Stockholm',
    country: 'SE',
  },
  social: {
    instagram: 'https://instagram.com/emoto',
    youtube: 'https://youtube.com/@emoto',
    tiktok: 'https://tiktok.com/@emoto',
  },
} as const

export type Locale = 'sv' | 'en'
