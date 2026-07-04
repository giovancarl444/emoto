import type { Metadata } from 'next'
import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { PageShell, Prose } from '@/components/ui/Prose'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  return { title: l === 'sv' ? 'Återförsäljare & showroom' : 'Resellers & showroom' }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const l: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const sv = l === 'sv'
  return (
    <PageShell
      title={sv ? 'Återförsäljare & showroom' : 'Resellers & showroom'}
      lead={sv ? 'Vår väg till fysisk närvaro och partnernätverk i Norden.' : 'Our path to physical presence and a partner network across the Nordics.'}
      breadcrumbs={[{ name: 'ELDR', href: `/${l}` }, { name: sv ? 'Återförsäljare' : 'Resellers' }]}
    >
      <Prose>
        <h2>{sv ? 'Showroom Stockholm' : 'Stockholm showroom'}</h2>
        <p>{sv ? `${BRAND.address.line1}, ${BRAND.address.postal} ${BRAND.address.city}. Provkörning bokas via e-post. [VERIFY plats]` : `${BRAND.address.line1}, ${BRAND.address.postal} ${BRAND.address.city}. Test rides by email. [VERIFY location]`}</p>
        <h2>{sv ? 'Bli partner' : 'Become a partner'}</h2>
        <p>{sv ? 'Vi bygger ett kurerat nätverk av service- och provkörningspartners i Norden (SE, NO, FI, DK). Hör av dig till ' : 'We are building a curated network of service and test-ride partners across the Nordics (SE, NO, FI, DK). Reach out to '}<a href={`mailto:${BRAND.email.hello}`}>{BRAND.email.hello}</a>.</p>
      </Prose>
    </PageShell>
  )
}
