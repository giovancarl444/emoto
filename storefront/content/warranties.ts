import type { Warranty } from '@/lib/types'

/**
 * Warranty terms. Built HONEST and on top of Swedish law: Konsumentköplagen
 * (2022:260) gives a 3-year reklamationsrätt with a 2-year reversed burden of
 * proof that overrides any shorter manufacturer term — so EMOTO's stated cover
 * sits alongside statutory rights, never below them. Sur-Ron's own baseline is
 * ~12 months (18 at some dealers); we lead with the stronger legal floor.
 * Figures [VERIFY] against the general agent (Adoy AB) terms before launch.
 */
export const warranties: Warranty[] = [
  {
    id: 'w-vehicle',
    title: { sv: 'EMOTO fordonsgaranti', en: 'EMOTO vehicle warranty' },
    vehicleMonths: 24, // EMOTO-backed, above Sur-Ron's 12-mo baseline [VERIFY]
    batteryMonths: 24,
    vehicleKmCap: 32000, // battery ~20,000 mi cap per manufacturer [VERIFY]
    terms: [
      {
        sv: 'Ram, svingarm, motor och styrenhet: 24 månaders EMOTO-garanti mot fabrikationsfel.',
        en: 'Frame, swingarm, motor and controller: 24-month EMOTO warranty against manufacturing defects.',
      },
      {
        sv: 'Batteri: 24 månader eller 32 000 km, det som inträffar först.',
        en: 'Battery: 24 months or 32,000 km, whichever comes first.',
      },
      {
        sv: 'Utöver garantin har du alltid 3 års reklamationsrätt enligt konsumentköplagen (2022:260), med omvänd bevisbörda de första 2 åren.',
        en: 'On top of the warranty you always have a 3-year statutory complaint right under the Swedish Consumer Purchase Act (2022:260), with reversed burden of proof for the first 2 years.',
      },
    ],
    exclusions: [
      {
        sv: 'Slitdelar (däck, bromsbelägg/skivor, kedja, drev, grepp, wire, glödlampor) täcks inte av garantin.',
        en: 'Wear items (tyres, pads/discs, chain, sprockets, grips, cables, bulbs) are not covered by the warranty.',
      },
      {
        sv: 'Tävling och sluten bana: begränsad täckning. Kommersiell uthyrning undantas.',
        en: 'Competition and closed-circuit use: limited cover. Commercial rental is excluded.',
      },
      {
        sv: 'Trimning eller montering av icke-godkända delar kan sätta fordonsgarantin ur spel — statutär reklamationsrätt påverkas dock separat.',
        en: 'Tuning or fitting non-approved parts may void the vehicle warranty — your statutory complaint right is assessed separately.',
      },
    ],
  },
]
