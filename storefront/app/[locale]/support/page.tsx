import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale, L } from '@/lib/i18n'
import { getWarranty } from '@/lib/content'
import { PageShell, Prose } from '@/components/ui/Prose'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  return { title: l === 'sv' ? 'Support & garanti' : 'Support & warranty' }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const l: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const sv = l === 'sv'
  const w = getWarranty('w-vehicle')
  return (
    <PageShell
      title={sv ? 'Support & garanti' : 'Support & warranty'}
      lead={sv ? 'Riktig support på svenska — och en garanti som ligger ovanpå dina lagstadgade rättigheter.' : 'Real support in Swedish — and a warranty that sits on top of your statutory rights.'}
      breadcrumbs={[{ name: 'ELDR', href: `/${l}` }, { name: 'Support' }]}
    >
      <Prose>
        <h2>{sv ? 'Kontakta oss' : 'Contact us'}</h2>
        <p>
          {sv ? 'Support: ' : 'Support: '}
          <a href={`mailto:${BRAND.email.support}`}>{BRAND.email.support}</a> · {BRAND.phone}
        </p>
        <h2>{sv ? 'Garanti' : 'Warranty'}</h2>
        {w && (
          <ul>
            {w.terms.map((t, i) => (
              <li key={i}>{L(t, l)}</li>
            ))}
          </ul>
        )}
        <h3>{sv ? 'Undantag' : 'Exclusions'}</h3>
        {w && (
          <ul>
            {w.exclusions.map((t, i) => (
              <li key={i}>{L(t, l)}</li>
            ))}
          </ul>
        )}
        <h2>{sv ? 'Registrering' : 'Registration'}</h2>
        <p>
          {sv ? 'Behöver du hjälp att vägregistrera? Se ' : 'Need help road-registering? See '}
          <Link href={`/${l}/tjanster/registrering`}>{sv ? 'Registreringshjälp' : 'Registration help'}</Link>.
        </p>
      </Prose>
    </PageShell>
  )
}
