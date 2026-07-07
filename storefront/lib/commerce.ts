/**
 * Commerce mode detection + shared cart types.
 *
 * The storefront is wired to Shopify's Storefront API for the buy (cart,
 * checkout, payments, tax/VAT, orders) — the thing Shopify is best at. But the
 * repo must run with ZERO credentials, so when Shopify env vars are absent we
 * fall back to a cookie-backed mock cart whose prices resolve from the content
 * layer. This keeps `npm run dev` working while the wiring stays real.
 *
 * Merchandising data (specs, fitment, editorial, legal) always comes from the
 * content layer (= Shopify metafields / CMS in production), never hardcoded in
 * components.
 */

export type CommerceMode = 'shopify' | 'mock'

export function commerceMode(): CommerceMode {
  const forced = process.env.NEXT_PUBLIC_COMMERCE_MODE
  if (forced === 'mock') return 'mock'
  const configured =
    !!process.env.SHOPIFY_STORE_DOMAIN && !!process.env.SHOPIFY_STOREFRONT_API_TOKEN
  return configured ? 'shopify' : 'mock'
}

export interface CartLineInput {
  /** Content variant id (mock) or Shopify merchandise id (live). */
  variantId: string
  quantity: number
}

export interface CartLine {
  id: string
  variantId: string
  quantity: number
  title: string
  subtitle?: string
  image?: string
  unitPriceSek: number
  lineTotalSek: number
  href: string
}

export interface Cart {
  id: string | null
  lines: CartLine[]
  totalQuantity: number
  subtotalSek: number
  /** Present in live mode — Shopify-hosted secure checkout. */
  checkoutUrl: string | null
  mode: CommerceMode
}

export const EMPTY_CART: Cart = {
  id: null,
  lines: [],
  totalQuantity: 0,
  subtotalSek: 0,
  checkoutUrl: null,
  mode: 'mock',
}
