import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale, L } from '@/lib/i18n'
import { getWarranty } from '@/lib/content'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon, type IconName } from '@/components/ui/Icon'
import { SupportForm } from '@/components/sections/SupportForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  return { title: l === 'sv' ? 'Support & garanti' : 'Support & warranty' }
}

type Topic = 'order' | 'registration' | 'warranty' | 'returns' | 'general'
const isTopic = (v: string | undefined): v is Topic =>
  !!v && ['order', 'registration', 'warranty', 'returns', 'general'].includes(v)

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ topic?: string }>
}) {
  const { locale: raw } = await params
  const { topic } = await searchParams
  const l: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const sv = l === 'sv'
  const w = getWarranty('w-vehicle')

  const quick: { icon: IconName; label: { sv: string; en: string }; href: string }[] = [
    { icon: 'truck', label: { sv: 'Spåra din order', en: 'Track your order' }, href: `/${l}/spar-order` },
    { icon: 'file-check', label: { sv: 'Registreringshjälp', en: 'Registration help' }, href: `/${l}/tjanster/registrering` },
    { icon: 'arrow-up-right', label: { sv: 'Ångerrätt & retur', en: 'Withdrawal & returns' }, href: `/${l}/angerratt` },
    { icon: 'shield', label: { sv: 'Leverans & returer', en: 'Delivery & returns' }, href: `/${l}/leverans-returer` },
  ]

  return (
    <div className="container-eldr section">
      <Breadcrumbs items={[{ name: 'ELDR', href: `/${l}` }, { name: 'Support' }]} />
      <header className="mb-10 max-w-2xl">
        <h1 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-text-strong sm:text-4xl">
          {sv ? 'Support & garanti' : 'Support & warranty'}
        </h1>
        <p className="mt-4 text-md text-text-muted">
          {sv
            ? 'Riktig support på svenska — och en garanti som ligger ovanpå dina lagstadgade rättigheter.'
            : 'Real support in Swedish — and a warranty that sits on top of your statutory rights.'}
        </p>
      </header>

      {/* Quick links */}
      <div className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quick.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="group flex items-center gap-3 rounded-md border border-border bg-surface p-4 transition-colors hover:border-border-strong"
          >
            <Icon name={q.icon} size={20} className="shrink-0 text-signal" />
            <span className="text-sm font-medium text-text-strong">{L(q.label, l)}</span>
            <Icon name="chevron-right" size={16} className="ml-auto text-text-faint transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* Warranty */}
        <section>
          <SectionHeading eyebrow={sv ? 'Garanti' : 'Warranty'} title={sv ? 'Vad som täcks' : 'What’s covered'} />
          {w && (
            <>
              <ul className="mb-6 flex flex-col gap-2">
                {w.terms.map((term, i) => (
                  <li key={i} className="flex gap-2 text-sm text-text-muted">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-success" />
                    {L(term, l)}
                  </li>
                ))}
              </ul>
              <h3 className="eyebrow mb-2">{sv ? 'Undantag' : 'Exclusions'}</h3>
              <ul className="flex flex-col gap-2">
                {w.exclusions.map((term, i) => (
                  <li key={i} className="flex gap-2 text-sm text-text-faint">
                    <Icon name="minus" size={16} className="mt-0.5 shrink-0" />
                    {L(term, l)}
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="mt-6 text-sm text-text-muted">
            {sv ? 'Support: ' : 'Support: '}
            <a href={`mailto:${BRAND.email.support}`} className="text-link underline">
              {BRAND.email.support}
            </a>{' '}
            · {BRAND.phone}
          </p>
        </section>

        {/* Contact form */}
        <section>
          <SectionHeading eyebrow={sv ? 'Kontakta oss' : 'Contact us'} title={sv ? 'Skicka ett ärende' : 'Open a request'} />
          <SupportForm locale={l} initialTopic={isTopic(topic) ? topic : 'general'} />
        </section>
      </div>
    </div>
  )
}
