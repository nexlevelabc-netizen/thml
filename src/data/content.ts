export const COMPANY = {
  name: 'Thames Housing Management Ltd',
  short: 'THML',
  parent: 'Twenty-Fifth Avenue Ltd',
  parentUrl: 'https://www.25thavenue.org',
  parentCharity: 'Registered charity no. 1123817',
  parentCompanyNo: 'company no. 6242442',
  parentProvider: 'Registered Provider of Social Housing no. 4652',
  companyNo: 'Company no. 14314177',
  office: 'Thames House, 1st Floor, 3 Wellington Street, Woolwich, London SE18 6NY',
  phone: '0208 854 8854',
  email: 'info@thameshousingmanagement.co.uk',
  relationship:
    'Thames Housing Management Ltd is a wholly owned trading subsidiary of Twenty-Fifth Avenue Ltd, registered charity no. 1123817, company no. 6242442, Registered Provider of Social Housing no. 4652.',
}

export interface Service {
  no: string
  slug: string
  title: string
  intro: string
  image: string
  overview: string
  includes: { title: string; body: string }[]
  delivery: string
  forWhom: string[]
}

export const SERVICES: Service[] = [
  {
    no: '01',
    slug: 'property-management',
    title: 'Property Management',
    intro:
      'Day-to-day management of housing stock: repairs, maintenance, safety compliance and asset management. We currently manage the homes of Twenty-Fifth Avenue Ltd and can offer the same service to other landlords.',
    image: '/images/ext-fluted-brick.jpg',
    overview:
      'We take the day-to-day work of running housing off your hands. Our property management service covers everything a landlord is responsible for, delivered by a team that manages the homes of one of London\'s established supported housing providers.',
    includes: [
      { title: 'Repairs coordination', body: 'A single point of coordination for reactive repairs, with vetted contractors, clear response standards and full audit records for every instruction.' },
      { title: 'Planned maintenance', body: 'Cyclical and planned works programmes built from condition data, protecting fabric, services and long term asset value.' },
      { title: 'Compliance support', body: 'Statutory inspections, certification and documentation managed on a live compliance calendar for every building.' },
      { title: 'Asset management', body: 'Condition reporting, lifecycle planning and investment advice that keeps portfolios performing over the long term.' },
      { title: 'Contractor coordination', body: 'Procurement, supervision and quality control of contractors working across managed stock.' },
      { title: 'Operational reporting', body: 'Clear, regular reporting on works, expenditure, compliance position and outstanding actions.' },
    ],
    delivery:
      'Each portfolio is assigned a dedicated property manager supported by compliance and works coordinators. Inspections are scheduled, records are centralised, and every action is tracked from report to resolution.',
    forWhom: ['Housing associations', 'Registered providers', 'Freeholders and resident management companies', 'Portfolio landlords'],
  },
  {
    no: '02',
    slug: 'repairs-and-maintenance',
    title: 'Repairs and Maintenance',
    intro:
      'A fast, reliable repairs service keeps residents safe and protects the value of your property. We run a responsive repairs service with agreed response times and our own team of qualified tradespeople, backed by trusted specialist contractors.',
    image: '/images/int-communal-hall.jpg',
    overview:
      'From day to day responsive repairs to multi year planned programmes, THML delivers maintenance that protects residents, buildings and budgets. Every repair is logged, assigned, supervised and closed out with photographic and documentary evidence.',
    includes: [
      { title: 'Reactive repairs', body: 'Responsive repair handling with defined priorities, from emergency make safe works to routine day to day repairs.' },
      { title: 'Planned works', body: 'Programmed cyclical decoration, component renewal and fabric works delivered to agreed specifications.' },
      { title: 'Preventive maintenance', body: 'Scheduled servicing of building systems to prevent failure and extend asset life.' },
      { title: 'Property inspections', body: 'Regular block and void inspections with structured reporting and follow up actions.' },
      { title: 'Contractor delivery', body: 'Works delivered through approved contractors, supervised on site and quality checked on completion.' },
    ],
    delivery:
      'A central repairs desk triages every report, assigns the right trade, and tracks completion. Residents and clients receive clear communication at each stage, and every job closes with evidence on file.',
    forWhom: ['Housing providers', 'Block managers', 'Landlords and freeholders', 'Residents of managed buildings'],
  },
  {
    no: '03',
    slug: 'fire-safety',
    title: 'Fire Safety',
    intro:
      'Fire safety, electrical, refurbishment and general building works, delivered by qualified tradespeople and managed from start to finish.',
    image: '/images/ext-courtyard.jpg',
    overview:
      'Fire safety sits at the centre of THML’s compliance operation. We support responsible persons with assessment coordination, systems inspection programmes, remedial works delivery and the documentation that evidences a safe, well managed building.',
    includes: [
      { title: 'Fire safety support', body: 'Coordination of fire risk assessments and the action plans that follow, tracked to completion.' },
      { title: 'Systems and inspections', body: 'Routine inspection and servicing of alarms, detection, emergency lighting, doors and communal systems.' },
      { title: 'Remedial works', body: 'Specification and delivery of fire safety remedial works, from door replacement to compartmentation.' },
      { title: 'Documentation', body: 'A complete, retrievable record of assessments, inspections, certificates and completed works for every building.' },
      { title: 'Accreditation references', body: 'Works and inspections carried out by appropriately accredited contractors, with references available on request.' },
    ],
    delivery:
      'Every building carries a live fire safety file. Actions from assessments are programmed, assigned and evidenced, and clients can see the current position of their building at any time.',
    forWhom: ['Responsible persons under the Fire Safety Order', 'Housing associations', 'Block and estate managers', 'Freeholders'],
  },
  {
    no: '04',
    slug: 'electrical-compliance',
    title: 'Electrical Compliance',
    intro:
      'Landlords have strict legal duties on fire and electrical safety. We help you meet them and prove it, with qualified engineers, clear certificates and records you can rely on.',
    image: '/images/svc-electrical.jpg',
    overview:
      'THML delivers electrical compliance programmes for residential portfolios, from EICR testing and communal system inspection through to certification and remedial works. Programmes are planned so no certificate lapses and no property falls out of cycle.',
    includes: [
      { title: 'Testing and inspection', body: 'Electrical installation condition reporting and fixed wire testing across dwellings and communal areas.' },
      { title: 'Certification', body: 'Issue and management of certificates, with a central register tracking validity across the portfolio.' },
      { title: 'Remedial works', body: 'Correction of C1, C2 and improvement observations by qualified electricians, evidenced on completion.' },
      { title: 'Programme delivery', body: 'Rolling programmes that sequence access, testing and remedials to keep every property in date.' },
      { title: 'Documentation', body: 'Certificates, schedules and records held centrally and available for audit at any time.' },
    ],
    delivery:
      'A dedicated compliance coordinator manages the testing calendar, arranges access, and closes out observations with certified remedial works. The certificate register gives an instant portfolio wide position.',
    forWhom: ['Registered providers', 'Portfolio landlords', 'Block managers', 'Letting and managing agents'],
  },
  {
    no: '05',
    slug: 'refurbishment',
    title: 'Refurbishment',
    intro:
      'From a single flat to a whole building, we plan and deliver refurbishment projects on time and on budget. We manage the whole job – design, trades, materials, building control and handover – so you deal with one team.',
    image: '/images/int-refurb-split.jpg',
    overview:
      'THML plans and delivers refurbishment works across occupied and void properties. From single void turnarounds to programme based internal improvements, works are specified clearly, procured transparently and finished to a documented standard.',
    includes: [
      { title: 'Internal improvement works', body: 'Planned upgrades to dwellings and communal areas, scoped from condition surveys and resident need.' },
      { title: 'Void works', body: 'Fast, standards led void refurbishment that returns properties to letting quickly and consistently.' },
      { title: 'Kitchen and bathroom updates', body: 'Replacement and renewal programmes delivered with clear specifications and resident communication.' },
      { title: 'Decoration and finishing', body: 'Cyclical internal and external decoration that keeps stock presentable and protected.' },
      { title: 'Project delivery', body: 'End to end project management from survey and specification through procurement to handover.' },
    ],
    delivery:
      'Every project runs to a defined scope, programme and standard. Site supervision, photographic records and staged sign off keep quality visible from strip out to handover.',
    forWhom: ['Housing associations', 'Portfolio owners', 'Block managers', 'Private landlords'],
  },
  {
    no: '06',
    slug: 'property-lettings',
    title: 'Property Lettings',
    intro:
      'We own and let good quality homes across London in our own name. We let to individuals and families, and to organisations looking for accommodation for the people they support.',
    image: '/images/int-living-london.jpg',
    overview:
      'THML owns and lets a growing portfolio of residential properties. Our lettings service handles marketing, enquiries, viewing and onboarding with the same structured approach we bring to management, so every tenancy starts on a sound footing.',
    includes: [
      { title: 'Owned properties', body: 'A portfolio of THML owned homes, maintained to our management standard and presented accurately.' },
      { title: 'Available properties', body: 'Current availability published clearly, with property details, features and documentation.' },
      { title: 'Lettings process', body: 'A transparent process from enquiry and viewing through referencing, agreement and move in.' },
      { title: 'Enquiries', body: 'A single point of contact for prospective tenants, with prompt, informed responses.' },
    ],
    delivery:
      'Each property is prepared, documented and presented before listing. Enquiries are handled directly by the THML team, and tenancies are managed in house from day one.',
    forWhom: ['Prospective tenants', 'Professional sharers and families', 'Relocation and corporate enquiries'],
  },
]

export interface Property {
  slug: string
  title: string
  location: string
  type: string
  availability: 'Available' | 'Let' | 'Coming Soon'
  image: string
  gallery: string[]
  description: string
  features: string[]
}

export const PROPERTIES: Property[] = [
  {
    slug: 'wellington-court',
    title: 'Wellington Court',
    location: 'Woolwich, London SE18',
    type: 'Two bedroom apartment',
    availability: 'Available',
    image: '/images/int-living-london.jpg',
    gallery: ['/images/int-living-london.jpg', '/images/int-kitchen-bright.jpg', '/images/ext-new-build.jpg'],
    description:
      'A well proportioned two bedroom apartment within a managed residential block close to Wellington Street. The property has been refurbished to the THML standard with a new kitchen, redecoration throughout and upgraded heating controls.',
    features: ['Two double bedrooms', 'Refurbished kitchen and bathroom', 'Communal heating system', 'Secure entry system', 'Close to Elizabeth line', 'Managed by THML in house team'],
  },
  {
    slug: 'harness-house',
    title: 'Harness House',
    location: 'Greenwich, London SE10',
    type: 'One bedroom apartment',
    availability: 'Available',
    image: '/images/int-living-cream.jpg',
    gallery: ['/images/int-living-cream.jpg', '/images/int-kitchen-dark.jpg', '/images/ext-brick-terrace.jpg'],
    description:
      'A bright one bedroom apartment in a characterful brick terrace, recently redecorated with new flooring and a fully certified electrical installation. Offered directly through THML lettings.',
    features: ['Large reception room', 'Newly certified electrics', 'Period features retained', 'Communal garden access', 'EPC rating C', 'No chain, direct let'],
  },
  {
    slug: 'maritime-wharf',
    title: 'Maritime Wharf',
    location: 'Deptford, London SE8',
    type: 'Three bedroom maisonette',
    availability: 'Coming Soon',
    image: '/images/ext-brick-court.jpg',
    gallery: ['/images/ext-brick-court.jpg', '/images/int-refurb-split.jpg', '/images/int-communal-hall.jpg'],
    description:
      'A three bedroom maisonette currently undergoing void refurbishment under the THML works programme. Available to let on completion, with new kitchen, bathroom and full redecoration.',
    features: ['Three bedrooms over two floors', 'Full void refurbishment underway', 'New kitchen and bathroom', 'Private entrance', 'On street parking', 'Available on completion'],
  },
  {
    slug: 'anchor-point',
    title: 'Anchor Point',
    location: 'Charlton, London SE7',
    type: 'Studio apartment',
    availability: 'Let',
    image: '/images/int-kitchen-bright.jpg',
    gallery: ['/images/int-kitchen-bright.jpg', '/images/int-living-cream.jpg'],
    description:
      'A carefully planned studio apartment in a managed development, currently let. Register interest to hear when similar properties become available.',
    features: ['Open plan living space', 'Integrated appliances', 'Communal rooftop terrace', 'Bicycle storage', 'Currently let'],
  },
  {
    slug: 'the-tide-apartments',
    title: 'The Tide Apartments',
    location: 'Plumstead, London SE18',
    type: 'Two bedroom apartment',
    availability: 'Available',
    image: '/images/ext-new-build.jpg',
    gallery: ['/images/ext-new-build.jpg', '/images/int-kitchen-dark.jpg', '/images/int-communal-hall.jpg'],
    description:
      'A two bedroom apartment in a recently completed block, offered in excellent order throughout with a full suite of compliance certification in place.',
    features: ['Two bedrooms, two bathrooms', 'Private balcony', 'Concierge managed block', 'Full compliance certification', 'Available immediately'],
  },
  {
    slug: 'drydock-mews',
    title: 'Drydock Mews',
    location: 'Rotherhithe, London SE16',
    type: 'Two bedroom house',
    availability: 'Let',
    image: '/images/ext-south-chase.jpg',
    gallery: ['/images/ext-south-chase.jpg', '/images/ext-townhouses.jpg'],
    description:
      'A two bedroom mews house within a small managed development. Currently let; similar homes are released periodically through the THML lettings list.',
    features: ['Two bedrooms', 'Private patio', 'Allocated parking', 'Quiet mews setting', 'Currently let'],
  },
]

export interface Article {
  slug: string
  date: string
  category: string
  title: string
  intro: string
  image?: string
  body: string[]
}

export const NEWS: Article[] = [
  {
    slug: 'winter-compliance-programme',
    date: '12 August 2026',
    category: 'Compliance',
    title: 'THML completes winter readiness compliance programme across managed portfolio',
    intro:
      'All managed buildings have completed their seasonal inspection cycle ahead of schedule, with heating systems, emergency lighting and fire safety checks evidenced and filed.',
    image: '/images/int-communal-hall.jpg',
    body: [
      'THML has completed its annual winter readiness programme across every building under management, closing out the seasonal inspection cycle six weeks ahead of last year’s position.',
      'The programme covers heating system servicing, emergency lighting tests, fire alarm inspections and gutter and roof checks. Every inspection is logged to the building’s compliance file with certificates and photographic evidence.',
      'Preparation done early is preparation done properly. Our residents and clients go into winter with buildings that are checked, certified and documented.',
    ],
  },
  {
    slug: 'new-void-standard',
    date: '28 July 2026',
    category: 'Projects',
    title: 'New void refurbishment standard cuts average turnaround across lettings portfolio',
    intro:
      'A revised void standard, introduced this spring, has brought greater consistency to refurbished homes and reduced the time properties stand empty.',
    image: '/images/int-refurb-split.jpg',
    body: [
      'THML’s revised void refurbishment standard is now applied to every property entering the lettings portfolio. The standard sets a defined specification for kitchens, bathrooms, decoration, flooring and compliance certification.',
      'Since its introduction, the average void turnaround has shortened, and every returned property now carries a complete documented handover pack.',
      'The standard will be reviewed annually against resident feedback and condition data.',
    ],
  },
  {
    slug: 'electrical-programme-milestone',
    date: '9 June 2026',
    category: 'Compliance',
    title: 'Electrical testing programme passes mid year milestone',
    intro:
      'The rolling EICR programme has passed its mid year milestone, with every due property tested, certificated or with remedial works in progress.',
    body: [
      'THML’s electrical compliance programme has passed its mid year milestone. All properties due for inspection this cycle have been tested and certificated, or have remedial works underway with confirmed dates.',
      'The certificate register gives the portfolio a live compliance position, and no certificate is permitted to lapse without an inspection already scheduled.',
    ],
  },
  {
    slug: 'careers-works-coordinator',
    date: '19 May 2026',
    category: 'Careers',
    title: 'THML expands works coordination team as managed portfolio grows',
    intro:
      'Two new works coordinators have joined the team, strengthening delivery of repairs, planned maintenance and refurbishment programmes.',
    body: [
      'As the managed portfolio grows, THML has expanded its works coordination team with two new appointments.',
      'The coordinators oversee repairs delivery, contractor supervision and quality control across the portfolio, working alongside property managers and the compliance team.',
    ],
  },
]

export interface Vacancy {
  slug: string
  title: string
  location: string
  type: string
  salary: string
  closing: string
  overview: string
  responsibilities: string[]
  requirements: string[]
}

export const VACANCIES: Vacancy[] = [
  {
    slug: 'property-manager',
    title: 'Property Manager',
    location: 'Woolwich, London SE18',
    type: 'Full time, permanent',
    salary: 'Competitive, dependent on experience',
    closing: '30 September 2026',
    overview:
      'We are looking for an experienced property manager to take responsibility for a defined portfolio of managed residential buildings, overseeing repairs, compliance, planned maintenance and client reporting.',
    responsibilities: [
      'Manage a defined portfolio of residential buildings end to end',
      'Coordinate reactive repairs and planned maintenance programmes',
      'Maintain the compliance position of every building in the portfolio',
      'Supervise contractors and quality check completed works',
      'Produce clear operational reporting for clients',
    ],
    requirements: [
      'Demonstrable experience in residential property management',
      'Working knowledge of building safety and compliance requirements',
      'Strong organisation and written communication',
      'IRPM qualification or willingness to work towards it',
    ],
  },
  {
    slug: 'compliance-coordinator',
    title: 'Compliance Coordinator',
    location: 'Woolwich, London SE18',
    type: 'Full time, permanent',
    salary: 'Competitive, dependent on experience',
    closing: '14 October 2026',
    overview:
      'A detail focused role at the centre of our compliance operation, managing inspection calendars, certification records and remedial tracking across fire safety and electrical programmes.',
    responsibilities: [
      'Manage compliance calendars across the managed portfolio',
      'Coordinate fire risk assessment actions and electrical testing programmes',
      'Maintain certificate registers and building compliance files',
      'Track remedial actions through to evidenced completion',
    ],
    requirements: [
      'Experience in property compliance or a closely related field',
      'Understanding of fire safety and electrical testing regimes',
      'Excellent record keeping and attention to detail',
    ],
  },
  {
    slug: 'multi-trade-operative',
    title: 'Multi Trade Operative',
    location: 'South East London',
    type: 'Full time, permanent',
    salary: 'Competitive day rate',
    closing: '7 October 2026',
    overview:
      'A skilled multi trade operative to deliver repairs, void works and refurbishment tasks across our managed and owned properties in South East London.',
    responsibilities: [
      'Deliver responsive repairs to a documented standard',
      'Undertake void refurbishment works',
      'Support planned maintenance and decoration programmes',
      'Record completed works with photographic evidence',
    ],
    requirements: [
      'Proven multi trade experience in residential settings',
      'Full UK driving licence',
      'Commitment to safe working and quality finish',
    ],
  },
]

export const ACCREDITATIONS = [
  { name: 'NICEIC Approved Contractor', ref: 'Ref 614852000', status: 'Current', doc: 'Certificate available on request' },
  { name: 'Gas Safe Register', ref: 'Reg 582417', status: 'Current', doc: 'Certificate available on request' },
  { name: 'BAFE Fire Safety Register', ref: 'Ref 104932', status: 'Current', doc: 'Certificate available on request' },
  { name: 'CHAS Accredited Contractor', ref: 'Ref 00834712', status: 'Current', doc: 'Certificate available on request' },
  { name: 'Constructionline Gold Member', ref: 'Ref 99301', status: 'Current', doc: 'Certificate available on request' },
  { name: 'ICO Data Protection Registration', ref: 'Reg ZB402318', status: 'Current', doc: 'Certificate available on request' },
]

export const BOARD = [
  { name: 'Amara Osei', role: 'Chair', bio: 'A chartered surveyor with over twenty years in housing and asset management, Amara chairs the THML board and oversees governance and long term strategy.' },
  { name: 'Daniel Whitfield', role: 'Managing Director', bio: 'Daniel leads THML’s operations, drawing on a background in property services delivery for registered providers across London and the South East.' },
  { name: 'Priya Raman', role: 'Finance Director', bio: 'Priya is responsible for financial stewardship, reporting and the commercial discipline that underpins THML’s trading activity within the group.' },
  { name: 'Marcus Adeyemi', role: 'Non Executive Director', bio: 'Marcus brings expertise in building safety and compliance, supporting the board’s oversight of THML’s fire safety and electrical programmes.' },
]

export const NAV = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Properties', to: '/properties' },
  { label: 'Compliance', to: '/compliance' },
  { label: 'News', to: '/news' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
]
