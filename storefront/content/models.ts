import type { Model, RoadClassProfile } from '@/lib/types'

/**
 * Vehicle catalog — Sur-Ron 2025/2026 platforms. Specs are grounded in current
 * manufacturer/dealer sources (see docs/research-dossier.md) and marked
 * [VERIFY] where a marketing "peak" figure must be confirmed against the EU
 * Certificate of Conformity (CoC) before it is presented as a legal/road fact.
 *
 * KEY EU caps (Reg. 168/2013): L1e-B moped ≤ 4 kW continuous rated power &
 * ≤ 45 km/h; L3e-A1 motorcycle ≤ 11 kW. Manufacturer "peak" kW routinely
 * exceeds the rated cap of the class the bike is homologated under — hence the
 * distinction between off-road peak power and the road-restricted figure.
 */

const OFFROAD_PROFILE = (topSpeed: string): RoadClassProfile => ({
  roadClass: 'offroad',
  label: { sv: 'Off-road', en: 'Off-road' },
  topSpeed: { sv: topSpeed, en: topSpeed },
  licenseRequired: { sv: 'Inget körkort (endast privat mark)', en: 'No licence (private land only)' },
  minAge: { sv: '—', en: '—' },
  registrationRequired: false,
  helmetRequired: true,
  insuranceRequired: false,
  summary: {
    sv: 'Endast för privat mark, bana och tävling — får inte köras på allmän väg. Ingen registrering, inget körkort och ingen trafikförsäkring krävs.',
    en: 'For private land, track and competition only — not road-legal. No registration, licence or traffic insurance required.',
  },
})

const L1E_PROFILE: RoadClassProfile = {
  roadClass: 'L1e-B',
  label: { sv: 'L1e-B · EU-moped klass I', en: 'L1e-B · moped class I' },
  topSpeed: { sv: '45 km/h (vägbegränsad)', en: '45 km/h (road-restricted)' },
  licenseRequired: { sv: 'AM-körkort', en: 'AM licence' },
  minAge: { sv: '15 år', en: '15 years' },
  registrationRequired: true,
  helmetRequired: true,
  insuranceRequired: true,
  summary: {
    sv: 'EU-moped klass I. Registreras hos Transportstyrelsen med bakre skylt, kräver AM-körkort från 15 år, hjälm och trafikförsäkring. Ingen fordonsskatt och ingen periodisk besiktning.',
    en: 'EU moped class I. Registered with Transportstyrelsen with a rear plate, requires an AM licence from age 15, a helmet and traffic insurance. No vehicle tax and no periodic inspection.',
  },
  verify: true,
}

const L3E_PROFILE = (topSpeed: string): RoadClassProfile => ({
  roadClass: 'L3e',
  label: { sv: 'L3e · Lätt motorcykel', en: 'L3e · light motorcycle' },
  topSpeed: { sv: topSpeed, en: topSpeed },
  licenseRequired: { sv: 'A1-körkort', en: 'A1 licence' },
  minAge: { sv: '16 år', en: '16 years' },
  registrationRequired: true,
  helmetRequired: true,
  insuranceRequired: true,
  summary: {
    sv: 'Lätt motorcykel L3e (A1). Registreras hos Transportstyrelsen, kräver minst A1-körkort från 16 år, hjälm och trafikförsäkring. Fordonsskatt för elmotorcykel är i praktiken 0 kr.',
    en: 'Light motorcycle L3e (A1). Registered with Transportstyrelsen, requires at least an A1 licence from age 16, a helmet and traffic insurance. Vehicle tax for an electric motorcycle is effectively 0 kr.',
  },
  verify: true,
})

export const models: Model[] = [
  {
    id: 'light-bee-x',
    handle: 'light-bee-x',
    marque: 'Sur-Ron',
    name: 'Light Bee X',
    tagline: { sv: 'Den lätta enduron som startade allt.', en: 'The lightweight enduro that started it all.' },
    category: 'lightweight',
    useCases: ['trail', 'youth', 'commute'],
    summary: {
      sv: 'Cirka 50 kg ren elektrisk enduro. 8 kW toppeffekt, avtagbart 60V-batteri och en känsla som ligger närmare mountainbike än motorcykel — men med vridmoment från noll.',
      en: 'A ~50 kg pure-electric enduro. 8 kW peak, a removable 60V pack and a feel closer to a mountain bike than a motorcycle — with torque from zero.',
    },
    story: [
      {
        sv: 'Light Bee X är referensen för lätt elcross. Låg vikt gör den förlåtande i teknisk terräng och lätt att lasta — och det avtagbara batteriet laddas var som helst.',
        en: 'The Light Bee X is the benchmark for lightweight electric off-road. Its low weight makes it forgiving in technical terrain and easy to transport — and the removable battery charges anywhere.',
      },
      {
        sv: 'Väljer du den gaturegistrerade L1e-versionen blir den en EU-moped klass I: registrerad, försäkrad och körbar från 15 år med AM-körkort. Vi ordnar hela registreringen.',
        en: 'Choose the road-legal L1e version and it becomes an EU moped class I: registered, insured and ridable from age 15 on an AM licence. We handle the whole registration.',
      },
    ],
    hero: { src: '/models/light-bee-x-hero.svg', alt: { sv: 'Sur-Ron Light Bee X', en: 'Sur-Ron Light Bee X' }, width: 1200, height: 900, priority: true },
    gallery: [
      { src: '/models/light-bee-x-hero.svg', alt: { sv: 'Light Bee X studio', en: 'Light Bee X studio' }, width: 1200, height: 900 },
      { src: '/models/light-bee-x-side.svg', alt: { sv: 'Light Bee X profil', en: 'Light Bee X profile' }, width: 1200, height: 900 },
      { src: '/models/light-bee-x-detail.svg', alt: { sv: 'Light Bee X detalj', en: 'Light Bee X detail' }, width: 1200, height: 900 },
      { src: '/models/light-bee-x-action.svg', alt: { sv: 'Light Bee X i terräng', en: 'Light Bee X on trail' }, width: 1200, height: 900 },
    ],
    keySpecKeys: ['power', 'battery', 'range', 'weight'],
    specGroups: [
      {
        id: 'perf',
        title: { sv: 'Prestanda', en: 'Performance' },
        items: [
          { key: 'power', label: { sv: 'Toppeffekt', en: 'Peak power' }, value: { sv: '8 000 W (topp)', en: '8,000 W (peak)' }, note: { sv: 'Off-road. L1e-version är begränsad till 4 kW kontinuerlig rated effekt. [VERIFY CoC]', en: 'Off-road. L1e version restricted to 4 kW continuous rated power. [VERIFY CoC]' }, highlight: true },
          { key: 'topspeed', label: { sv: 'Toppfart', en: 'Top speed' }, value: { sv: '≈75 km/h (off-road)', en: '≈75 km/h (off-road)' } },
          { key: 'modes', label: { sv: 'Körlägen', en: 'Ride modes' }, value: { sv: 'Eco / Sport', en: 'Eco / Sport' } },
        ],
      },
      {
        id: 'battery',
        title: { sv: 'Batteri & räckvidd', en: 'Battery & range' },
        items: [
          { key: 'battery', label: { sv: 'Batteri', en: 'Battery' }, value: { sv: '60V 40Ah · 2 400 Wh', en: '60V 40Ah · 2,400 Wh' }, note: { sv: 'Avtagbart, 21700-celler, ~11,6 kg.', en: 'Removable, 21700 cells, ~11.6 kg.' }, highlight: true },
          { key: 'range', label: { sv: 'Räckvidd', en: 'Range' }, value: { sv: 'upp till 75 km (eco)', en: 'up to 75 km (eco)' }, note: { sv: 'Terräng- och körsättsberoende. [VERIFY]', en: 'Terrain- and riding-dependent. [VERIFY]' } },
          { key: 'charge', label: { sv: 'Laddtid', en: 'Charge time' }, value: { sv: '≈3–3,5 h', en: '≈3–3.5 h' } },
        ],
      },
      {
        id: 'chassis',
        title: { sv: 'Chassi & mått', en: 'Chassis & dimensions' },
        items: [
          { key: 'weight', label: { sv: 'Vikt', en: 'Weight' }, value: { sv: '≈50 kg (off-road)', en: '≈50 kg (off-road)' }, note: { sv: 'L1e-version ≈47 kg. [VERIFY]', en: 'L1e version ≈47 kg. [VERIFY]' }, highlight: true },
          { key: 'wheels', label: { sv: 'Hjul', en: 'Wheels' }, value: { sv: '19″ fram & bak', en: '19″ front & rear' } },
          { key: 'brakes', label: { sv: 'Bromsar', en: 'Brakes' }, value: { sv: 'Hydrauliska skivbromsar', en: 'Hydraulic disc brakes' } },
        ],
      },
    ],
    variants: [
      {
        id: 'v-lbx-offroad',
        handle: 'light-bee-x-offroad',
        name: { sv: 'Off-road', en: 'Off-road' },
        roadClass: 'offroad',
        price: { sek: 54900, eur: 4890 },
        sku: 'SR-LBX-OR',
        availability: { state: 'in_stock', stockQty: 6 },
        roadProfile: OFFROAD_PROFILE('≈75 km/h'),
      },
      {
        id: 'v-lbx-l1e',
        handle: 'light-bee-x-l1e',
        name: { sv: 'L1e vägregistrerad', en: 'L1e road-legal' },
        roadClass: 'L1e-B',
        price: { sek: 59900, eur: 5290 },
        sku: 'SR-LBX-L1E',
        availability: { state: 'build_to_order', leadTimeDays: [45, 75] },
        roadProfile: L1E_PROFILE,
      },
    ],
    compatiblePartIds: ['p-throttle', 'p-kke-forks', 'p-bar-risers', 'p-footpegs', 'p-brake-kit', 'p-controller', 'p-connector', 'p-rims'],
    warrantyId: 'w-vehicle',
    priceFrom: { sek: 54900, eur: 4890 },
    verify: true,
    faq: [
      { q: { sv: 'Får jag köra Light Bee X på väg?', en: 'Can I ride the Light Bee X on the road?' }, a: { sv: 'Off-road-versionen är endast för privat mark och bana. Välj L1e-versionen för att köra lagligt på väg som EU-moped klass I — då ingår registrering via oss.', en: 'The off-road version is for private land and track only. Choose the L1e version to ride legally on the road as an EU moped class I — registration via us is included.' } },
      { q: { sv: 'Vilket körkort krävs?', en: 'What licence do I need?' }, a: { sv: 'L1e (moped klass I) kräver AM-körkort från 15 år. Off-road kräver inget körkort men får inte köras i trafik.', en: 'The L1e (moped class I) requires an AM licence from age 15. Off-road requires no licence but is not road-legal.' } },
    ],
  },

  {
    id: 'ultra-bee',
    handle: 'ultra-bee',
    marque: 'Sur-Ron',
    name: 'Ultra Bee',
    tagline: { sv: 'Mellanviktaren med 440 Nm vid hjulet.', en: 'The mid-weight with 440 Nm at the wheel.' },
    category: 'midsize',
    useCases: ['trail', 'commute', 'track'],
    summary: {
      sv: 'Upp till ~21 kW toppeffekt (2025), 74V/55Ah och upp till 140 km räckvidd. Ultra Bee är steget upp i kraft och stabilitet — som off-road och som gaturegistrerad lätt motorcykel (L3e).',
      en: 'Up to ~21 kW peak (2025), 74V/55Ah and up to 140 km of range. The Ultra Bee steps up in power and stability — as off-road and as a road-legal light motorcycle (L3e).',
    },
    story: [
      {
        sv: 'Ultra Bee kombinerar riktig enduro-geometri med ett större batteri för längre pass. Den gaturegistrerade T-versionen är en lätt motorcykel (L3e) som gör ~90 km/h — perfekt för både pendling och terräng.',
        en: 'The Ultra Bee pairs real enduro geometry with a larger battery for longer sessions. The road-legal T version is a light motorcycle (L3e) doing ~90 km/h — ideal for both commuting and trail.',
      },
    ],
    hero: { src: '/models/ultra-bee-hero.svg', alt: { sv: 'Sur-Ron Ultra Bee', en: 'Sur-Ron Ultra Bee' }, width: 1200, height: 900, priority: true },
    gallery: [
      { src: '/models/ultra-bee-hero.svg', alt: { sv: 'Ultra Bee studio', en: 'Ultra Bee studio' }, width: 1200, height: 900 },
      { src: '/models/ultra-bee-side.svg', alt: { sv: 'Ultra Bee profil', en: 'Ultra Bee profile' }, width: 1200, height: 900 },
      { src: '/models/ultra-bee-detail.svg', alt: { sv: 'Ultra Bee detalj', en: 'Ultra Bee detail' }, width: 1200, height: 900 },
      { src: '/models/ultra-bee-action.svg', alt: { sv: 'Ultra Bee i terräng', en: 'Ultra Bee on trail' }, width: 1200, height: 900 },
    ],
    keySpecKeys: ['power', 'battery', 'range', 'weight'],
    specGroups: [
      {
        id: 'perf',
        title: { sv: 'Prestanda', en: 'Performance' },
        items: [
          { key: 'power', label: { sv: 'Toppeffekt', en: 'Peak power' }, value: { sv: 'upp till ~21 kW (topp, 2025)', en: 'up to ~21 kW (peak, 2025)' }, note: { sv: 'Tidigare årsmodell ~12,5 kW. L3e-A1 begränsas till 11 kW kontinuerlig rated effekt. [VERIFY CoC]', en: 'Earlier model year ~12.5 kW. L3e-A1 capped at 11 kW continuous rated power. [VERIFY CoC]' }, highlight: true },
          { key: 'torque', label: { sv: 'Vridmoment', en: 'Torque' }, value: { sv: '≈440–511 Nm vid hjulet', en: '≈440–511 Nm at the wheel' } },
          { key: 'topspeed', label: { sv: 'Toppfart', en: 'Top speed' }, value: { sv: '≈90 km/h (off-road)', en: '≈90 km/h (off-road)' } },
        ],
      },
      {
        id: 'battery',
        title: { sv: 'Batteri & räckvidd', en: 'Battery & range' },
        items: [
          { key: 'battery', label: { sv: 'Batteri', en: 'Battery' }, value: { sv: '74V 55Ah · 4 070 Wh', en: '74V 55Ah · 4,070 Wh' }, highlight: true },
          { key: 'range', label: { sv: 'Räckvidd', en: 'Range' }, value: { sv: 'upp till 140 km', en: 'up to 140 km' }, note: { sv: 'Vid 40 km/h, terrängberoende. [VERIFY]', en: 'At 40 km/h, terrain-dependent. [VERIFY]' } },
          { key: 'charge', label: { sv: 'Laddtid', en: 'Charge time' }, value: { sv: '≈4 h', en: '≈4 h' } },
        ],
      },
      {
        id: 'chassis',
        title: { sv: 'Chassi & mått', en: 'Chassis & dimensions' },
        items: [
          { key: 'weight', label: { sv: 'Vikt', en: 'Weight' }, value: { sv: '≈85 kg', en: '≈85 kg' }, highlight: true },
          { key: 'wheels', label: { sv: 'Hjul', en: 'Wheels' }, value: { sv: '19″', en: '19″' } },
          { key: 'travel', label: { sv: 'Fjädringsväg', en: 'Suspension travel' }, value: { sv: '≈240 mm', en: '≈240 mm' } },
        ],
      },
    ],
    variants: [
      {
        id: 'v-ub-offroad',
        handle: 'ultra-bee-offroad',
        name: { sv: 'Off-road', en: 'Off-road' },
        roadClass: 'offroad',
        price: { sek: 64900, eur: 5790 },
        sku: 'SR-UB-OR',
        availability: { state: 'in_stock', stockQty: 4 },
        roadProfile: OFFROAD_PROFILE('≈90 km/h'),
      },
      {
        id: 'v-ub-r',
        handle: 'ultra-bee-r-l3e',
        name: { sv: 'R · L3e (väg)', en: 'R · L3e (road)' },
        roadClass: 'L3e',
        price: { sek: 79900, eur: 7090 },
        sku: 'SR-UB-R',
        availability: { state: 'build_to_order', leadTimeDays: [45, 90] },
        roadProfile: L3E_PROFILE('≈90 km/h'),
      },
      {
        id: 'v-ub-t',
        handle: 'ultra-bee-t-l3e',
        name: { sv: 'T · L3e (terräng-trim)', en: 'T · L3e (trail trim)' },
        roadClass: 'L3e',
        price: { sek: 84900, eur: 7590 },
        sku: 'SR-UB-T',
        availability: { state: 'build_to_order', leadTimeDays: [45, 90] },
        roadProfile: L3E_PROFILE('≈90 km/h'),
      },
    ],
    compatiblePartIds: ['p-rims', 'p-brake-kit', 'p-bar-risers', 'p-footpegs', 'p-connector', 'p-throttle'],
    warrantyId: 'w-vehicle',
    priceFrom: { sek: 64900, eur: 5790 },
    verify: true,
    faq: [
      { q: { sv: 'Vad är skillnaden mellan R och T?', en: 'What is the difference between R and T?' }, a: { sv: 'Båda de gaturegistrerade Ultra Bee-versionerna (R och T) är homologerade som lätt motorcykel L3e (~90 km/h, A1-körkort från 16 år) — skillnaden ligger i däck-/fälgtrim (R är mer vägbetonad, T mer terrängbetonad), inte i vägklass. Vi bekräftar CoC per fordon. [VERIFY]', en: 'Both road-legal Ultra Bee versions (R and T) are homologated as a light L3e motorcycle (~90 km/h, A1 licence from 16) — the difference is tyre/rim trim (R more road-biased, T more trail-biased), not road class. We confirm the CoC per vehicle. [VERIFY]' } },
      { q: { sv: 'Betalar jag fordonsskatt?', en: 'Do I pay vehicle tax?' }, a: { sv: 'Mopeder (L1e) är helt befriade. För elmotorcykel (L3e) är fordonsskatten i praktiken 0 kr. Du betalar en liten årlig vägtrafikregisteravgift (~74 kr) och trafikförsäkring.', en: 'Mopeds (L1e) are fully exempt. For an electric motorcycle (L3e) the vehicle tax is effectively 0 kr. You pay a small annual register fee (~74 kr) and traffic insurance.' } },
    ],
  },

  {
    id: 'storm-bee',
    handle: 'storm-bee',
    marque: 'Sur-Ron',
    name: 'Storm Bee',
    tagline: { sv: 'Vätskekyld. 0–50 km/h på 1,9 sekunder.', en: 'Liquid-cooled. 0–50 km/h in 1.9 seconds.' },
    category: 'flagship',
    useCases: ['trail', 'track'],
    summary: {
      sv: 'Sur-Rons fullstora flaggskepp: 22,5 kW toppeffekt, vätskekyld motor, 104V/55Ah och ~110 km/h. En riktig elmotorcykel för den som vill ha allt.',
      en: 'Sur-Ron’s full-size flagship: 22.5 kW peak, a liquid-cooled motor, 104V/55Ah and ~110 km/h. A true electric motorcycle for those who want it all.',
    },
    story: [
      {
        sv: 'Storm Bee är i en egen klass. Vätskekyld drivlina för uthållig effekt, 520 Nm vridmoment och en acceleration som få förbränningsmotorcyklar matchar. Finns som enduro (E) och gaturegistrerad street (F, L3e).',
        en: 'The Storm Bee is in a class of its own. A liquid-cooled drivetrain for sustained power, 520 Nm of torque and acceleration few combustion bikes can match. Available as enduro (E) and road-legal street (F, L3e).',
      },
    ],
    hero: { src: '/models/storm-bee-hero.svg', alt: { sv: 'Sur-Ron Storm Bee', en: 'Sur-Ron Storm Bee' }, width: 1200, height: 900, priority: true },
    gallery: [
      { src: '/models/storm-bee-hero.svg', alt: { sv: 'Storm Bee studio', en: 'Storm Bee studio' }, width: 1200, height: 900 },
      { src: '/models/storm-bee-side.svg', alt: { sv: 'Storm Bee profil', en: 'Storm Bee profile' }, width: 1200, height: 900 },
      { src: '/models/storm-bee-detail.svg', alt: { sv: 'Storm Bee detalj', en: 'Storm Bee detail' }, width: 1200, height: 900 },
      { src: '/models/storm-bee-action.svg', alt: { sv: 'Storm Bee i terräng', en: 'Storm Bee on trail' }, width: 1200, height: 900 },
    ],
    keySpecKeys: ['power', 'battery', 'range', 'weight'],
    specGroups: [
      {
        id: 'perf',
        title: { sv: 'Prestanda', en: 'Performance' },
        items: [
          { key: 'power', label: { sv: 'Toppeffekt', en: 'Peak power' }, value: { sv: '22 500 W (topp) · ~5 kW kont.', en: '22,500 W (peak) · ~5 kW cont.' }, note: { sv: 'Vätskekyld. L3e-registrering kräver rated-effekt enligt CoC. [VERIFY]', en: 'Liquid-cooled. L3e registration uses rated power per CoC. [VERIFY]' }, highlight: true },
          { key: 'torque', label: { sv: 'Vridmoment', en: 'Torque' }, value: { sv: '≈520 Nm', en: '≈520 Nm' } },
          { key: 'accel', label: { sv: 'Acceleration', en: 'Acceleration' }, value: { sv: '0–50 km/h på 1,9 s', en: '0–50 km/h in 1.9 s' } },
          { key: 'topspeed', label: { sv: 'Toppfart', en: 'Top speed' }, value: { sv: '≈110 km/h', en: '≈110 km/h' } },
        ],
      },
      {
        id: 'battery',
        title: { sv: 'Batteri & räckvidd', en: 'Battery & range' },
        items: [
          { key: 'battery', label: { sv: 'Batteri', en: 'Battery' }, value: { sv: '104V 55Ah · 5 720 Wh', en: '104V 55Ah · 5,720 Wh' }, highlight: true },
          { key: 'range', label: { sv: 'Räckvidd', en: 'Range' }, value: { sv: '>100 km', en: '>100 km' }, note: { sv: 'Vid 50 km/h. [VERIFY]', en: 'At 50 km/h. [VERIFY]' } },
          { key: 'charge', label: { sv: 'Laddtid', en: 'Charge time' }, value: { sv: '<4 h', en: '<4 h' } },
        ],
      },
      {
        id: 'chassis',
        title: { sv: 'Chassi & mått', en: 'Chassis & dimensions' },
        items: [
          { key: 'weight', label: { sv: 'Vikt', en: 'Weight' }, value: { sv: '130 kg', en: '130 kg' }, highlight: true },
          { key: 'drive', label: { sv: 'Slutväxel', en: 'Final drive' }, value: { sv: '530 O-ringskedja', en: '530 O-ring chain' } },
          { key: 'traction', label: { sv: 'System', en: 'Systems' }, value: { sv: 'ASR antispinn · BERS regen', en: 'ASR traction · BERS regen' } },
        ],
      },
    ],
    variants: [
      {
        id: 'v-sb-e',
        handle: 'storm-bee-e-offroad',
        name: { sv: 'E · Enduro off-road', en: 'E · Enduro off-road' },
        roadClass: 'offroad',
        price: { sek: 99900, eur: 8900 },
        sku: 'SR-SB-E',
        availability: { state: 'build_to_order', leadTimeDays: [60, 90] },
        roadProfile: OFFROAD_PROFILE('≈110 km/h'),
      },
      {
        id: 'v-sb-f',
        handle: 'storm-bee-f-l3e',
        name: { sv: 'F · Street L3e', en: 'F · Street L3e' },
        roadClass: 'L3e',
        price: { sek: 119900, eur: 10690 },
        sku: 'SR-SB-F',
        availability: { state: 'preorder', leadTimeDays: [75, 120] },
        roadProfile: L3E_PROFILE('≈110 km/h'),
      },
    ],
    compatiblePartIds: ['p-rims', 'p-brake-kit', 'p-bar-risers', 'p-connector'],
    warrantyId: 'w-vehicle',
    priceFrom: { sek: 99900, eur: 8900 },
    verify: true,
    faq: [
      { q: { sv: 'Är Storm Bee gaturegistrerad i Sverige?', en: 'Is the Storm Bee road-legal in Sweden?' }, a: { sv: 'Street-versionen (F) är homologerad som L3e-motorcykel och kan registreras. Vi bekräftar CoC och homologering för din specifika konfiguration innan köp.', en: 'The street version (F) is homologated as an L3e motorcycle and can be registered. We confirm the CoC and homologation for your specific configuration before purchase.' } },
    ],
  },
]
