import type { Locale } from './brand'

/**
 * Content data model. Designed for MULTI-BRAND headroom: every vehicle carries a
 * `marque`, and nothing about the schema is Sur-Ron-specific. A second/third
 * marque (or a new model) is a content addition, not a code change. In
 * production these map to Shopify products + metafields; here they live as
 * typed seed data in /content so the app runs with zero backend.
 *
 * All human-readable copy is localized (sv/en) → editable content, never
 * hardcoded strings.
 */

export type Localized = Record<Locale, string>

/** EU road classification per Regulation (EU) 168/2013. */
export type RoadClass = 'offroad' | 'L1e-B' | 'L3e'

export type AvailabilityState = 'in_stock' | 'build_to_order' | 'preorder' | 'sold_out'

export interface Availability {
  state: AvailabilityState
  stockQty?: number
  /** Lead-time window in days for build_to_order / preorder (China build + ship). */
  leadTimeDays?: [number, number]
}

export interface Money {
  sek: number
  eur: number
  /** Optional strikethrough price for promos. */
  compareAtSek?: number
}

export interface SpecItem {
  key: string
  label: Localized
  value: Localized
  /** Optional short note shown on hover/expand. */
  note?: Localized
  /** Highlight in condensed spec strips. */
  highlight?: boolean
}

export interface SpecGroup {
  id: string
  title: Localized
  items: SpecItem[]
}

/** Plain-language consequences of road class — the PDP's anxiety-killer. */
export interface RoadClassProfile {
  roadClass: RoadClass
  label: Localized
  topSpeed: Localized
  licenseRequired: Localized
  minAge: Localized
  registrationRequired: boolean
  helmetRequired: boolean
  insuranceRequired: boolean
  /** One-line plain summary of what this class means for the buyer. */
  summary: Localized
  verify?: boolean
}

export interface MediaAsset {
  src: string
  alt: Localized
  width: number
  height: number
  /** Above-the-fold hero assets get priority loading. */
  priority?: boolean
}

export interface Variant {
  id: string
  handle: string
  name: Localized
  roadClass: RoadClass
  price: Money
  sku: string
  /** Wired to Shopify when configured; ignored in mock mode. */
  shopifyVariantId?: string
  availability: Availability
  /** Variant-level spec overrides merged over the model's base specs. */
  specOverrides?: SpecItem[]
  roadProfile: RoadClassProfile
}

export type ModelCategory = 'lightweight' | 'midsize' | 'flagship'
export type UseCase = 'trail' | 'commute' | 'youth' | 'track' | 'utility'

export interface FaqItem {
  q: Localized
  a: Localized
}

export interface ModelVideo {
  src: string
  poster: string
}

export interface Model {
  id: string
  handle: string
  marque: string // e.g. "Sur-Ron" — the vehicle brand (NOT the retailer brand)
  /** Optional product video, shown as the lead gallery slide when present. */
  video?: ModelVideo
  name: string // model name, kept as a proper noun (not localized)
  tagline: Localized
  category: ModelCategory
  useCases: UseCase[]
  summary: Localized
  /** Longer editorial body, markdown-lite paragraphs. */
  story: Localized[]
  hero: MediaAsset
  gallery: MediaAsset[]
  /** Shared spec groups (variant overrides layer on top). */
  specGroups: SpecGroup[]
  variants: Variant[]
  /** Condensed spec strip shown on cards / hero (keys resolved from specGroups). */
  keySpecKeys: string[]
  compatiblePartIds: string[]
  warrantyId: string
  faq: FaqItem[]
  /** Price floor for "from" display + PLP sort/filter. */
  priceFrom: Money
  /** Any spec/price flagged as unverified pending confirmation. */
  verify?: boolean
}

export type PartCategory =
  | 'wheels-tires'
  | 'suspension'
  | 'brakes'
  | 'controls'
  | 'ergonomics'
  | 'drivetrain'
  | 'protection'

export interface Part {
  id: string
  handle: string
  name: Localized
  category: PartCategory
  brand?: string
  price: Money
  images: MediaAsset[]
  summary: Localized
  description: Localized[]
  /** Fitment: which model ids this part fits (the attach-rate engine). */
  fitment: string[]
  availability: Availability
  sku: string
  shopifyVariantId?: string
  specs?: SpecItem[]
  /** Why it matters — ties parts to known Sur-Ron pain points. */
  upgradeReason?: Localized
  verify?: boolean
}

export interface Warranty {
  id: string
  title: Localized
  vehicleMonths: number
  batteryMonths: number
  vehicleKmCap?: number
  terms: Localized[]
  exclusions: Localized[]
}
