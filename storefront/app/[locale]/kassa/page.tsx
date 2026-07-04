import type { Metadata } from 'next'
import type { Locale } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { CheckoutSummary } from '@/components/commerce/CheckoutSummary'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  return (
    <div className="container-emoto section">
      <CheckoutSummary locale={locale} />
    </div>
  )
}
