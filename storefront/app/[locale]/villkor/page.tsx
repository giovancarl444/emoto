import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { PageShell, Prose } from '@/components/ui/Prose'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  return { title: l === 'sv' ? 'Köpvillkor' : 'Terms of sale' }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const l: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const sv = l === 'sv'
  return (
    <PageShell
      title={sv ? 'Köpvillkor' : 'Terms of sale'}
      lead={sv ? 'Villkoren för köp hos ELDR. Skrivna för att vara begripliga.' : 'The terms for buying from ELDR. Written to be understood.'}
      breadcrumbs={[{ name: 'ELDR', href: `/${l}` }, { name: sv ? 'Köpvillkor' : 'Terms' }]}
    >
      <Prose>
        <p>{sv ? `Säljare: ${BRAND.legalName}, org.nr ${BRAND.orgNumber}, ${BRAND.address.city}. [VERIFY]` : `Seller: ${BRAND.legalName}, reg. no. ${BRAND.orgNumber}, ${BRAND.address.city}. [VERIFY]`}</p>
        <h2>{sv ? 'Priser och moms' : 'Prices and VAT'}</h2>
        <p>{sv ? 'Alla priser anges i svenska kronor (SEK) inklusive moms 25 %, i enlighet med prisinformationslagen. EUR-priser är vägledande för EU-kunder.' : 'All prices are in Swedish kronor (SEK) including 25% VAT, per the Price Information Act. EUR prices are indicative for EU customers.'}</p>
        <h2>{sv ? 'Betalning' : 'Payment'}</h2>
        <p>{sv ? 'Betalning sker i Shopifys säkra kassa via Klarna, kort (Visa/Mastercard), PayPal eller faktura. Vi lagrar aldrig dina kortuppgifter.' : 'Payment is made in Shopify’s secure checkout via Klarna, card (Visa/Mastercard), PayPal or invoice. We never store your card details.'}</p>
        <h2>{sv ? 'Leverans' : 'Delivery'}</h2>
        <p>{sv ? 'Inom EU levereras fordon DDP (Delivered Duty Paid) — moms och eventuell tull är betalda, inga överraskningar vid gränsen. Utanför EU tillämpas DAP, där köparen ansvarar för importmoms och tull. Lagervaror skickas från vårt svenska lager; beställningsvaror byggs och fraktas med angiven leveranstid.' : 'Within the EU, vehicles are delivered DDP (Delivered Duty Paid) — VAT and any duty are paid, no surprises at the border. Outside the EU, DAP applies and the buyer is responsible for import VAT and duty. In-stock items ship from our Swedish warehouse; build-to-order items are built and shipped within the stated lead time.'}</p>
        <h2>{sv ? 'Ångerrätt' : 'Right of withdrawal'}</h2>
        <p>{sv ? 'Vid distansköp gäller 14 dagars ångerrätt. Se ' : 'For distance purchases a 14-day right of withdrawal applies. See '}<Link href={`/${l}/angerratt`}>{sv ? 'Ångerrätt' : 'Right of withdrawal'}</Link>.</p>
        <h2>{sv ? 'Garanti och reklamation' : 'Warranty and complaints'}</h2>
        <p>{sv ? 'ELDR-garanti gäller på fordon och batteri. Utöver garantin har du 3 års reklamationsrätt enligt konsumentköplagen (2022:260), med omvänd bevisbörda de första 2 åren.' : 'The ELDR warranty covers vehicle and battery. On top of it you have a 3-year statutory complaint right under the Consumer Purchase Act (2022:260), with reversed burden of proof for the first 2 years.'}</p>
        <h2>{sv ? 'Registrering och vägbruk' : 'Registration and road use'}</h2>
        <p>{sv ? 'Off-road-fordon får endast köras på privat mark. Vägregistrerade versioner (L1e/L3e) kräver registrering, körkort, hjälm och trafikförsäkring. Homologering bekräftas mot CoC per fordon.' : 'Off-road vehicles may only be ridden on private land. Road-legal versions (L1e/L3e) require registration, a licence, helmet and traffic insurance. Homologation is confirmed against the CoC per vehicle.'}</p>
        <h2>{sv ? 'Tvist' : 'Disputes'}</h2>
        <p>{sv ? 'Vid tvist kan du vända dig till Allmänna reklamationsnämnden (ARN). Svensk lag tillämpas.' : 'In case of dispute you can turn to the National Board for Consumer Disputes (ARN). Swedish law applies.'}</p>
      </Prose>
    </PageShell>
  )
}
