import type { Locale } from './brand'
import { models } from '@/content/models'
import { parts } from '@/content/parts'
import { warranties } from '@/content/warranties'
import { services } from '@/content/services'
import { orders } from '@/content/orders'
import type { Order } from './fulfillment'
import type { Model, Part, UseCase, Warranty, RoadClass } from './types'

/**
 * Content access layer. In production these functions read from Shopify
 * metafields / a headless CMS; here they read typed seed modules. Components
 * depend only on these functions, so swapping the source is transparent.
 */

/* ── Models ─────────────────────────────────────────────────────────────── */
export function getAllModels(): Model[] {
  return models
}

export function getModel(handle: string): Model | undefined {
  return models.find((m) => m.handle === handle)
}

export function getModelById(id: string): Model | undefined {
  return models.find((m) => m.id === id)
}

export interface ModelFilter {
  roadClass?: RoadClass | 'all'
  useCase?: UseCase | 'all'
  marque?: string | 'all'
  maxSek?: number
}

export function filterModels(models: Model[], f: ModelFilter): Model[] {
  return models.filter((m) => {
    if (f.marque && f.marque !== 'all' && m.marque !== f.marque) return false
    if (f.useCase && f.useCase !== 'all' && !m.useCases.includes(f.useCase)) return false
    if (f.roadClass && f.roadClass !== 'all') {
      const has = m.variants.some((v) => v.roadClass === f.roadClass)
      if (!has) return false
    }
    if (f.maxSek && m.priceFrom.sek > f.maxSek) return false
    return true
  })
}

/* ── Parts ──────────────────────────────────────────────────────────────── */
export function getAllParts(): Part[] {
  return parts
}

export function getPart(handle: string): Part | undefined {
  return parts.find((p) => p.handle === handle)
}

export function getPartsForModel(modelId: string): Part[] {
  return parts.filter((p) => p.fitment.includes(modelId))
}

export function getCompatibleParts(model: Model): Part[] {
  const explicit = model.compatiblePartIds
    .map((id) => parts.find((p) => p.id === id))
    .filter((p): p is Part => !!p)
  const byFitment = getPartsForModel(model.id)
  const merged = new Map<string, Part>()
  for (const p of [...explicit, ...byFitment]) merged.set(p.id, p)
  return [...merged.values()]
}

/* ── Warranty ───────────────────────────────────────────────────────────── */
export function getWarranty(id: string): Warranty | undefined {
  return warranties.find((w) => w.id === id)
}

/* ── Orders (order-status tracker) ──────────────────────────────────────── */
export function getOrder(id: string, email: string): Order | undefined {
  const norm = (s: string) => s.trim().toLowerCase()
  return orders.find((o) => norm(o.id) === norm(id) && norm(o.email) === norm(email))
}

/* ── Purchasable resolution (cart, mock mode) ───────────────────────────── */
export interface Purchasable {
  variantId: string
  title: string
  subtitle?: string
  image?: string
  unitPriceSek: number
  href: string
  shopifyVariantId?: string
}

/**
 * Resolve a variant id to a purchasable line, searching model variants first
 * then parts. Used by the mock cart to compute prices from the content layer.
 */
export function resolvePurchasable(variantId: string, locale: Locale): Purchasable | null {
  for (const m of models) {
    const v = m.variants.find((x) => x.id === variantId)
    if (v) {
      return {
        variantId,
        title: `${m.marque} ${m.name}`,
        subtitle: v.name[locale] ?? v.name.sv,
        image: m.hero.src,
        unitPriceSek: v.price.sek,
        href: `/${locale}/motorcyklar/${m.handle}`,
        shopifyVariantId: v.shopifyVariantId,
      }
    }
  }
  const p = parts.find((x) => x.id === variantId || x.handle === variantId)
  if (p) {
    return {
      variantId,
      title: p.name[locale] ?? p.name.sv,
      image: p.images[0]?.src,
      unitPriceSek: p.price.sek,
      href: `/${locale}/delar/${p.handle}`,
      shopifyVariantId: p.shopifyVariantId,
    }
  }
  const s = services.find((x) => x.id === variantId || x.handle === variantId)
  if (s) {
    return {
      variantId,
      title: s.name[locale] ?? s.name.sv,
      unitPriceSek: s.price.sek,
      href: `/${locale}/tjanster/registrering`,
      shopifyVariantId: s.shopifyVariantId,
    }
  }
  return null
}
