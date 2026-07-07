import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../globals.css'
import { fontVariables } from '../fonts'
import { BRAND } from '@/lib/brand'
import type { Locale } from '@/lib/brand'
import { DEFAULT_LOCALE, LOCALES, isLocale, L, alternates } from '@/lib/i18n'
import { formatPrice } from '@/lib/format'
import { getAllModels } from '@/lib/content'
import { CartProvider } from '@/components/commerce/CartProvider'
import { CartDrawer } from '@/components/commerce/CartDrawer'
import { Header, type NavModel } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { CookieBanner } from '@/components/sections/CookieBanner'
import { Analytics } from '@/components/sections/Analytics'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  const title = `${BRAND.name} — ${L(BRAND.tagline, l)}`
  return {
    metadataBase: new URL(BRAND.siteUrl),
    title: {
      default: title,
      template: `%s · ${BRAND.name}`,
    },
    description: L(BRAND.proposition, l),
    applicationName: BRAND.name,
    alternates: {
      canonical: `/${l}`,
      languages: alternates('', BRAND.siteUrl),
    },
    openGraph: {
      type: 'website',
      siteName: BRAND.name,
      locale: l === 'sv' ? 'sv_SE' : 'en_SE',
      title,
      description: L(BRAND.proposition, l),
      url: `${BRAND.siteUrl}/${l}`,
    },
    twitter: { card: 'summary_large_image', title, description: L(BRAND.proposition, l) },
    robots: { index: true, follow: true },
    icons: { icon: '/icon.svg' },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l: Locale = locale

  const navModels: NavModel[] = getAllModels().map((m) => ({
    handle: m.handle,
    name: m.name,
    marque: m.marque,
    tagline: L(m.tagline, l),
    priceFrom: `${formatPrice(m.priceFrom, l).primary}`,
    hasStreet: m.variants.some((v) => v.roadClass !== 'offroad'),
  }))

  return (
    <html lang={l} className={fontVariables} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-toast focus:rounded-sm focus:bg-signal focus:px-4 focus:py-2 focus:text-on-signal"
        >
          {l === 'sv' ? 'Hoppa till innehåll' : 'Skip to content'}
        </a>
        <CartProvider>
          <Header locale={l} models={navModels} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer locale={l} />
          <CartDrawer locale={l} />
        </CartProvider>
        <CookieBanner locale={l} />
        <Analytics />
        <OrganizationJsonLd locale={l} />
      </body>
    </html>
  )
}
