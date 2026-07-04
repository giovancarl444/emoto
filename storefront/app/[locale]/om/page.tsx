import type { Metadata } from 'next'
import { Media } from '@/components/ui/Media'
import type { Locale } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { PageShell, Prose } from '@/components/ui/Prose'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  return { title: l === 'sv' ? 'Om ELDR' : 'About ELDR' }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const l: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const sv = l === 'sv'
  return (
    <PageShell
      title={sv ? 'Om ELDR' : 'About ELDR'}
      lead={sv ? 'Namnet betyder eld. Vi bygger den premiumbutik för elektrisk terräng som Norden saknat.' : 'The name means fire. We are building the premium store for electric terrain the Nordics have lacked.'}
      breadcrumbs={[{ name: 'ELDR', href: `/${l}` }, { name: sv ? 'Om' : 'About' }]}
    >
      <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-md border border-border">
        <Media src="/editorial/about-forge.svg" alt="" fill sizes="(max-width:768px) 100vw, 42rem" className="object-cover" />
      </div>
      <Prose>
        <p>{sv ? 'ELDR är en oberoende, svenskgrundad återförsäljare av högpresterande elektriska off-road- och gaturegistrerade motorcyklar. Vi säljer Sur-Ron idag och är byggda för att bära fler märken imorgon.' : 'ELDR is an independent, Sweden-founded retailer of high-performance electric off-road and street-legal motorcycles. We sell Sur-Ron today and are built to carry more marques tomorrow.'}</p>
        <h2>{sv ? 'Varför vi finns' : 'Why we exist'}</h2>
        <p>{sv ? 'Marknaden är full av mallbutiker med rabattteater, engelsk text på svenska domäner och begravd information om vägregler. Vi gör tvärtom: fasta, ärliga priser, svenska på riktigt, och registrering, garanti och vägklass förklarat så att det går att förstå.' : 'The market is full of template shops with discount theatre, English text on Swedish domains and buried road-law information. We do the opposite: fixed, honest pricing, real Swedish, and registration, warranty and road class explained so they make sense.'}</p>
        <h2>{sv ? 'Oberoende — inte Sur-Ron' : 'Independent — not Sur-Ron'}</h2>
        <p>{sv ? 'ELDR är en fristående butik. Sur-Ron® är ett varumärke som tillhör sin ägare. Vi imiterar inte märket — vi bygger en egen, ägbar retailerupplevelse runt produkterna.' : 'ELDR is a standalone store. Sur-Ron® is a trademark of its owner. We do not imitate the marque — we build our own ownable retail experience around the products.'}</p>
      </Prose>
    </PageShell>
  )
}
