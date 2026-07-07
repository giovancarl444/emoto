import { commerceMode } from './commerce'

/**
 * Low-level Shopify Storefront API client. Used for the buy-side (cart +
 * checkout). Returns null-ish and callers fall back to mock when unconfigured.
 */

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN
const VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? '2025-01'

interface GraphQLResult<T> {
  data?: T
  errors?: { message: string }[]
}

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  if (commerceMode() !== 'shopify' || !DOMAIN || !TOKEN) {
    throw new Error('Shopify is not configured (running in mock mode).')
  }
  const endpoint = `https://${DOMAIN}/api/${VERSION}/graphql.json`
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    // Cart mutations must never be cached.
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Shopify HTTP ${res.status}`)
  const json = (await res.json()) as GraphQLResult<T>
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '))
  if (!json.data) throw new Error('Shopify returned no data')
  return json.data
}

/* ── Cart operations (live mode) ──────────────────────────────────────────── */

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartParts on Cart {
    id
    checkoutUrl
    totalQuantity
    cost { subtotalAmount { amount currencyCode } }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount }
              image { url }
              product { title handle }
            }
          }
        }
      }
    }
  }
`

export async function createShopifyCart(lines: { merchandiseId: string; quantity: number }[]) {
  const query = /* GraphQL */ `
    mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { ...CartParts }
        userErrors { message }
      }
    }
    ${CART_FRAGMENT}
  `
  return shopifyFetch<{ cartCreate: { cart: unknown } }>(query, { lines })
}

export async function addShopifyCartLines(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
) {
  const query = /* GraphQL */ `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartParts }
        userErrors { message }
      }
    }
    ${CART_FRAGMENT}
  `
  return shopifyFetch<{ cartLinesAdd: { cart: unknown } }>(query, { cartId, lines })
}

export async function getShopifyCart(cartId: string) {
  const query = /* GraphQL */ `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartParts }
    }
    ${CART_FRAGMENT}
  `
  return shopifyFetch<{ cart: unknown }>(query, { cartId })
}
