import type { Metadata } from 'next'
import type { Locale } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { getOrder } from '@/lib/content'
import { OrderTracker } from '@/components/commerce/OrderTracker'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Icon } from '@/components/ui/Icon'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  return { title: l === 'sv' ? 'Spåra order' : 'Track order', robots: { index: false } }
}

export default async function TrackOrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ id?: string; email?: string }>
}) {
  const { locale: raw } = await params
  const { id, email } = await searchParams
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const sv = locale === 'sv'

  const order = id && email ? getOrder(id, email) : undefined
  const searched = Boolean(id && email)

  return (
    <div className="container-eldr section">
      <Breadcrumbs items={[{ name: 'ELDR', href: `/${locale}` }, { name: sv ? 'Spåra order' : 'Track order' }]} />

      <div className="mx-auto max-w-xl">
        {order ? (
          <>
            <OrderTracker order={order} locale={locale} />
            <a href={`/${locale}/spar-order`} className="mt-8 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-signal">
              <Icon name="arrow-right" size={16} className="rotate-180" />
              {sv ? 'Spåra en annan order' : 'Track another order'}
            </a>
          </>
        ) : (
          <>
            <header className="mb-6">
              <h1 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-text-strong sm:text-4xl">
                {sv ? 'Spåra din order' : 'Track your order'}
              </h1>
              <p className="mt-3 text-md text-text-muted">
                {sv
                  ? 'Ange ordernummer och e-postadress för att se status — från betalning till registrering och leverans.'
                  : 'Enter your order number and email to see status — from payment to registration and delivery.'}
              </p>
            </header>

            <form method="get" className="flex flex-col gap-4 rounded-md border border-border bg-surface p-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="id" className="eyebrow">
                  {sv ? 'Ordernummer' : 'Order number'}
                </label>
                <input
                  id="id"
                  name="id"
                  required
                  defaultValue={id ?? ''}
                  placeholder="ELDR-2026-0042"
                  className="h-11 rounded-sm border border-border bg-bg px-3 text-sm text-text-strong placeholder:text-text-faint focus-visible:border-signal"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="eyebrow">
                  {sv ? 'E-post' : 'Email'}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  defaultValue={email ?? ''}
                  placeholder="namn@example.com"
                  className="h-11 rounded-sm border border-border bg-bg px-3 text-sm text-text-strong placeholder:text-text-faint focus-visible:border-signal"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-signal px-5 text-sm font-medium text-on-signal transition-colors hover:bg-signal-hover"
              >
                {sv ? 'Spåra order' : 'Track order'}
                <Icon name="arrow-right" size={18} />
              </button>

              {searched && !order && (
                <p className="flex items-center gap-2 text-sm text-danger">
                  <Icon name="info" size={16} />
                  {sv
                    ? 'Ingen order hittades med de uppgifterna. Kontrollera och försök igen.'
                    : 'No order found with those details. Please check and try again.'}
                </p>
              )}
            </form>

            <p className="mt-4 text-2xs text-text-faint">
              {sv ? 'Demo: prova ' : 'Demo: try '}
              <code className="text-text-muted">ELDR-2026-0042</code> ·{' '}
              <code className="text-text-muted">erik@example.com</code>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
