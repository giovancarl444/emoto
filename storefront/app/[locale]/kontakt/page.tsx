import type { Metadata } from 'next'
import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { PageShell, Prose } from '@/components/ui/Prose'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  return { title: l === 'sv' ? 'Kontakt' : 'Contact' }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const l: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const sv = l === 'sv'
  return (
    <PageShell
      title={sv ? 'Kontakt' : 'Contact'}
      lead={sv ? 'Vi svarar på svenska, oftast inom en timme på vardagar.' : 'We reply in Swedish, usually within an hour on weekdays.'}
      breadcrumbs={[{ name: 'EMOTO', href: `/${l}` }, { name: sv ? 'Kontakt' : 'Contact' }]}
    >
      <Prose>
        <p>
          <strong>{sv ? 'Allmänt' : 'General'}:</strong> <a href={`mailto:${BRAND.email.hello}`}>{BRAND.email.hello}</a>
          <br />
          <strong>Support:</strong> <a href={`mailto:${BRAND.email.support}`}>{BRAND.email.support}</a>
          <br />
          <strong>{sv ? 'Telefon' : 'Phone'}:</strong> {BRAND.phone}
        </p>
        <h2>{sv ? 'Besök' : 'Visit'}</h2>
        <p>
          {BRAND.address.line1}
          <br />
          {BRAND.address.postal} {BRAND.address.city}
          <br />
          {sv ? 'Sverige' : 'Sweden'} · [VERIFY]
        </p>
        <p className="text-2xs text-text-faint">{sv ? 'Provkörning bokas via e-post. Ett fysiskt showroom är en del av vår lanseringsplan.' : 'Test rides are booked by email. A physical showroom is part of our launch plan.'}</p>
      </Prose>
    </PageShell>
  )
}
