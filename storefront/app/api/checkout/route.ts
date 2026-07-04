import { NextRequest, NextResponse } from 'next/server'
import { commerceMode } from '@/lib/commerce'
import { createShopifyCart } from '@/lib/shopify'

/**
 * Build a checkout from the client cart lines.
 *  - Shopify mode: create a cart via Storefront API → return the hosted secure
 *    checkout URL (payments, VAT, Klarna/card/invoice handled by Shopify).
 *  - Mock mode: return a local summary URL so the flow is demonstrable offline.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as {
    locale?: string
    items?: { shopifyVariantId?: string; quantity: number }[]
  } | null

  const locale = body?.locale === 'en' ? 'en' : 'sv'
  const items = body?.items ?? []
  if (!items.length) {
    return NextResponse.json({ error: 'empty_cart' }, { status: 400 })
  }

  if (commerceMode() === 'shopify') {
    try {
      const lines = items
        .filter((i) => i.shopifyVariantId)
        .map((i) => ({ merchandiseId: i.shopifyVariantId as string, quantity: i.quantity }))
      const res = (await createShopifyCart(lines)) as {
        cartCreate: { cart: { checkoutUrl: string } }
      }
      const url = res.cartCreate?.cart?.checkoutUrl
      if (url) return NextResponse.json({ checkoutUrl: url })
    } catch (err) {
      // Fall through to mock on any Shopify error so the UX never dead-ends.
      console.error('Shopify checkout failed, falling back:', err)
    }
  }

  return NextResponse.json({ checkoutUrl: `/${locale}/kassa`, mock: true })
}
