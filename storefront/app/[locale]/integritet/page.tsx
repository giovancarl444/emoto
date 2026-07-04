import type { Metadata } from 'next'
import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { PageShell, Prose } from '@/components/ui/Prose'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  return { title: l === 'sv' ? 'Integritetspolicy' : 'Privacy policy' }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const l: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const sv = l === 'sv'
  return (
    <PageShell
      title={sv ? 'Integritetspolicy' : 'Privacy policy'}
      lead={sv ? 'Hur vi behandlar dina personuppgifter enligt GDPR.' : 'How we process your personal data under the GDPR.'}
      breadcrumbs={[{ name: 'ELDR', href: `/${l}` }, { name: sv ? 'Integritet' : 'Privacy' }]}
    >
      <Prose>
        <p>{sv ? `Personuppgiftsansvarig är ${BRAND.legalName} (org.nr ${BRAND.orgNumber}). Kontakt: ${BRAND.email.hello}. [VERIFY uppgifter]` : `The data controller is ${BRAND.legalName} (reg. no. ${BRAND.orgNumber}). Contact: ${BRAND.email.hello}. [VERIFY details]`}</p>
        <h2>{sv ? 'Vilka uppgifter vi samlar in' : 'What we collect'}</h2>
        <ul>
          <li>{sv ? 'Order- och kunduppgifter (namn, adress, e-post, telefon) för att fullgöra köp och leverans.' : 'Order and customer data (name, address, email, phone) to fulfil purchase and delivery.'}</li>
          <li>{sv ? 'Registreringsuppgifter (t.ex. VIN, CoC) för registreringstjänsten.' : 'Registration data (e.g. VIN, CoC) for the registration service.'}</li>
          <li>{sv ? 'Analysdata via GA4 — endast om du samtyckt via cookiebannern (Consent Mode).' : 'Analytics via GA4 — only if you consent via the cookie banner (Consent Mode).'}</li>
        </ul>
        <h2>{sv ? 'Rättslig grund' : 'Legal basis'}</h2>
        <p>{sv ? 'Avtal (köp), rättslig förpliktelse (bokföring, registrering), samtycke (marknadsföring och analys) och berättigat intresse (säkerhet).' : 'Contract (purchase), legal obligation (accounting, registration), consent (marketing and analytics) and legitimate interest (security).'}</p>
        <h2>{sv ? 'Lagringstid' : 'Retention'}</h2>
        <p>{sv ? 'Bokföringsunderlag sparas i 7 år enligt bokföringslagen. Övriga uppgifter raderas när ändamålet upphört.' : 'Accounting records are kept for 7 years per the Bookkeeping Act. Other data is deleted when its purpose ends.'}</p>
        <h2>{sv ? 'Dina rättigheter' : 'Your rights'}</h2>
        <p>{sv ? 'Du har rätt till tillgång, rättelse, radering, begränsning, dataportabilitet och att invända. Du kan klaga hos Integritetsskyddsmyndigheten (IMY).' : 'You have the right of access, rectification, erasure, restriction, portability and objection. You may complain to the Swedish Authority for Privacy Protection (IMY).'}</p>
        <h2>{sv ? 'Cookies' : 'Cookies'}</h2>
        <p>{sv ? 'Nödvändiga cookies krävs för att sidan ska fungera. Analys-cookies aktiveras endast med ditt samtycke och kan återkallas när som helst.' : 'Necessary cookies are required for the site to work. Analytics cookies activate only with your consent and can be withdrawn at any time.'}</p>
      </Prose>
    </PageShell>
  )
}
