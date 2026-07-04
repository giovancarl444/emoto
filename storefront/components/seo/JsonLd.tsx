import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { L } from '@/lib/i18n'
import type { Model, Variant } from '@/lib/types'

function Script({ data }: { data: Record<string, unknown> }) {
  // JSON-LD injected server-side; safe (our own data, not user input).
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: BRAND.name,
        legalName: BRAND.legalName,
        url: `${BRAND.siteUrl}/${locale}`,
        logo: `${BRAND.siteUrl}/brand/emoto-mark.svg`,
        description: L(BRAND.proposition, locale),
        email: BRAND.email.hello,
        sameAs: [BRAND.social.instagram, BRAND.social.youtube, BRAND.social.tiktok],
        address: {
          '@type': 'PostalAddress',
          streetAddress: BRAND.address.line1,
          postalCode: BRAND.address.postal,
          addressLocality: BRAND.address.city,
          addressCountry: BRAND.address.country,
        },
      }}
    />
  )
}

const AVAIL: Record<Variant['availability']['state'], string> = {
  in_stock: 'https://schema.org/InStock',
  build_to_order: 'https://schema.org/PreOrder',
  preorder: 'https://schema.org/PreOrder',
  sold_out: 'https://schema.org/OutOfStock',
}

export function ProductJsonLd({ model, locale }: { model: Model; locale: Locale }) {
  const url = `${BRAND.siteUrl}/${locale}/motorcyklar/${model.handle}`
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${model.marque} ${model.name}`,
        brand: { '@type': 'Brand', name: model.marque },
        description: L(model.summary, locale),
        image: [`${BRAND.siteUrl}${model.hero.src}`],
        category: model.category,
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'SEK',
          lowPrice: Math.min(...model.variants.map((v) => v.price.sek)),
          highPrice: Math.max(...model.variants.map((v) => v.price.sek)),
          offerCount: model.variants.length,
          availability: AVAIL[model.variants[0].availability.state],
          seller: { '@type': 'Organization', name: BRAND.name },
          url,
        },
      }}
    />
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: it.name,
          item: it.url,
        })),
      }}
    />
  )
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  if (!items.length) return null
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }}
    />
  )
}
