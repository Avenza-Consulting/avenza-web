export const nav = [
  {
    label: "Capabilities",
    href: "/capabilities",
    items: [
      { label: "Core Banking Transformation", href: "/capabilities/core-banking" },
      { label: "Temenos Transact", href: "/capabilities/temenos-transact" },
      { label: "Digital Banking", href: "/capabilities/digital-banking" },
      { label: "Temenos Payments", href: "/capabilities/temenos-payments" },
      { label: "Temenos FCM", href: "/capabilities/temenos-fcm" },
      { label: "System Integration", href: "/capabilities/system-integration" },
      { label: "Testing", href: "/capabilities/testing" },
      { label: "Migration", href: "/capabilities/migration" },
      { label: "Upgrades", href: "/capabilities/upgrades" },
      { label: "Application Support", href: "/capabilities/application-support" },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "How We Deliver", href: "/about#how-we-deliver" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Industry Expertise", href: "/about/industry-expertise" },
    ],
  },
  { label: "Accelerators", href: "/accelerators" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Life @ Avenza", href: "/life-at-avenza" },
] as const;

export const leadership = [
  {
    id: "mahesh-dutt-kolar",
    name: "Mahesh Dutt Kolar",
    title: "Chief Executive Officer",
    bio: "Sets the vision and holds the bar for how Avenza delivers.",
    photo: "/leadership-mahesh-dutt-kolar.png",
    video: "/leadership-mahesh-dutt-kolar.mp4",
  },
  {
    id: "ratnadeep-mukherjee",
    name: "Ratnadeep Mukherjee",
    title: "Co-Founder & Chief Revenue Officer",
    bio: "Builds the relationships and growth engine behind the business.",
    photo: "/leadership-ratnadeep-mukherjee.png",
    video: "/leadership-ratnadeep-mukherjee.mp4",
  },
  {
    id: "gopinath-chandran",
    name: "Gopinath Chandran",
    title: "Chief Operating Officer",
    bio: "Turns strategy into dependable, day-to-day delivery.",
    photo: "/leadership-gopinath-chandran.png",
    video: "/leadership-gopinath-chandran.mp4",
  },
] as const;

export const achievements = [
  {
    id: "temenos-techdays-2026-shark-tank",
    eyebrow: "Achievement",
    title: "Avenza wins Shark Tank at Temenos TechDays '26",
    summary:
      "Our team took the stage at Temenos TechDays 2026 in Chennai and won the Shark Tank innovation pitch — recognition for the ideas we're building to help banks move faster on Temenos.",
    photo: "/achievement-techdays-2026.jpg",
    href: "/achievements/temenos-techdays-2026-shark-tank",
  },
  {
    id: "trf26-apac-silver-sponsor",
    eyebrow: "Achievement",
    title: "Avenza is a Silver Sponsor at TRF'26 APAC",
    summary:
      "We joined 300+ banking leaders from across Asia-Pacific at the Temenos Regional Forum in Hanoi as a Silver Sponsor — sharing how we help banks modernize their core with a timely, on-budget approach to transformation.",
    photo: "/achievement-trf26-apac-silver-sponsor.jpg",
    href: "/achievements/trf26-apac-silver-sponsor",
  },
] as const;

export const achievement = achievements[0];

export const clientLogos = [
  { id: "al-baraka", name: "al Baraka", src: "/clients/al-baraka.png" },
  { id: "bdo", name: "BDO", src: "/clients/bdo.png" },
  { id: "cognizant", name: "Cognizant", src: "/clients/cognizant.png" },
  { id: "eastwest", name: "EastWest", src: "/clients/eastwest.png" },
  { id: "hdbank", name: "HDBank", src: "/clients/hdbank.png" },
  { id: "rabobank", name: "Rabobank", src: "/clients/rabobank.png" },
] as const;

export const trf = {
  eyebrow: "TRF'26 APAC",
  bannerText: "We're excited to be a Silver Sponsor at the Temenos",
  bannerHighlight: "Silver Sponsor at the Temenos",
  cta: "I'm Interested",
  featuredLabel: "Featured Speaker",
  eventTitle: "Regional Forum APAC 2026 in Hanoi",
  eventSubtitle: "Join us to hear our COO speak on timely SaaS transformation",
  speakerName: "Gopinath Chandran",
  speakerLinkedin: "https://www.linkedin.com/in/gopinath-chandran-811b3425/",
  eventDate: "Tuesday, 25 August · 16:30–16:50 GMT+7",
  eventLink: "https://www.temenos.com/event/trf-apac-2026/",
  modalTitle: "We're excited to be a Silver Sponsor at the Temenos",
  modalBody:
    "will be one of the speakers at the Temenos Regional Forum APAC 2026 in Hanoi. And if a SaaS route for your core is on the table this year, those 20 minutes are the best place to ignite the thinking.",
} as const;

export const capabilityGroups = [
  { id: "core-platform", label: "Core Platform" },
  { id: "payments-compliance", label: "Payments & Compliance" },
  { id: "delivery-support", label: "Delivery & Support" },
] as const;

export const capabilities = [
  {
    id: "core-banking",
    group: "core-platform",
    title: "Core Banking Transformation",
    body: "We move financial institutions off legacy cores and onto modern, agile platforms. The engagement covers strategic roadmapping, architecture design, execution and the cutover itself. Two things we hold onto throughout are platform stability and composable architecture, because they are what let the core keep pace with the market instead of locking you into last year's product set. Faster product launches, room to scale, and a lower total cost of ownership all follow from that.",
    highlights: ["Strategic roadmapping", "Architecture design", "Cutover execution", "Composable architecture"],
    problem:
      "A legacy core is hard to change safely, harder to scale, and increasingly expensive to run — but the fear of a failed cutover keeps most banks patching around it instead of replacing it.",
    howItWorks:
      "We start with a fact-based roadmap — current-state assessment, target architecture and a sequenced, continuity-first migration path — then execute in controlled phases with rehearsed cutovers, so risk is retired steadily instead of concentrated in one big-bang event.",
    benefits: [
      "A platform that keeps pace with the market instead of locking in last year's product set",
      "Composable architecture that supports faster product launches",
      "Room to scale without a rebuild",
      "A lower total cost of ownership over the platform's life",
    ],
  },
  {
    id: "temenos-transact",
    group: "core-platform",
    title: "Temenos Transact",
    body: "Greenfield implementations, custom configuration, performance optimization: our Transact specialists work across all of it with both technical and functional depth. Aligning the platform's capabilities with your specific product portfolios is what produces high straight-through processing rates and efficient operations. We work with Temenos-approved accelerators and established practice, which cuts time-to-market and keeps execution risk down. Whether you are launching a new digital brand or migrating a complicated legacy portfolio, the aim is to get the full value out of Transact.",
    highlights: ["Greenfield implementation", "Custom configuration", "Performance optimization", "Temenos-approved accelerators"],
    problem:
      "Transact is a deep, configurable platform — teams that don't know it well end up under-using it, over-customising it, or both, which shows up later as slow processing and expensive maintenance.",
    howItWorks:
      "Our specialists align Transact's product catalogue and parameterisation with your actual product portfolios rather than defaulting to broad customisation, and lean on Temenos-approved accelerators and established practice wherever the requirement is a known pattern.",
    benefits: [
      "High straight-through processing rates from properly aligned configuration",
      "Faster time-to-market using proven, Temenos-approved accelerators",
      "Lower execution risk on both greenfield builds and complex re-platforming",
      "Full value extracted from the platform instead of a thin implementation",
    ],
  },
  {
    id: "digital-banking",
    group: "core-platform",
    title: "Digital Banking",
    body: "Front-end solutions such as Temenos Infinity get integrated cleanly with the transformed core, which is what makes omnichannel actually work rather than just appear on a slide. We design for hyper-personalized journeys across retail, corporate and wealth management. API-first architecture and microservices keep data moving between layers in real time. Banks use this to lift engagement, push self-service adoption, and put a distinctive digital brand in front of customers in a crowded market.",
    highlights: ["Temenos Infinity integration", "Omnichannel journeys", "API-first architecture", "Microservices"],
    problem:
      "A modern front end bolted onto a core that can't keep up produces the classic symptom of digital banking done badly: channels that look consistent in a demo but drift out of sync the moment real data and real volume hit them.",
    howItWorks:
      "We integrate Temenos Infinity (or your chosen front end) directly against the transformed core using API-first, microservices architecture, so retail, corporate and wealth journeys share the same real-time data instead of each channel keeping its own stale copy.",
    benefits: [
      "Omnichannel that's actually synchronized, not just visually consistent",
      "Higher engagement and self-service adoption from journeys built around real customer needs",
      "A distinctive digital brand that stands out in a crowded market",
      "Real-time data flow between core and channel layers",
    ],
  },
  {
    id: "temenos-payments",
    group: "payments-compliance",
    title: "Temenos Payments",
    body: "We deploy the Temenos Payments Hub to streamline global money movement and tighten processing efficiency. Payment scheme integration is handled end to end, with secure real-time processing and readiness for instant payments in the markets you operate in. Automated enrichments, exception handling and ISO 20022 compliance lift straight-through processing rates and bring transaction costs down. The infrastructure scales, and it keeps up with regulatory change without a rebuild each time.",
    highlights: ["Temenos Payments Hub", "Payment scheme integration", "ISO 20022 compliance", "Instant payments"],
    problem:
      "Payment schemes, formats and regulatory requirements keep multiplying, and a payments stack built for yesterday's rails turns every new scheme or instant-payments mandate into a bespoke, high-risk project.",
    howItWorks:
      "We deploy and configure the Temenos Payments Hub with end-to-end scheme integration, automated enrichment and exception handling, and ISO 20022 compliance built in from the start rather than retrofitted after go-live.",
    benefits: [
      "Higher straight-through processing rates with lower transaction costs",
      "Readiness for instant payments in the markets you operate in",
      "Infrastructure that absorbs regulatory change without a rebuild",
      "Secure, real-time processing across schemes",
    ],
  },
  {
    id: "temenos-fcm",
    group: "payments-compliance",
    title: "Temenos FCM",
    body: "Financial Crime Mitigation gets configured as part of the transformation, so the platform is compliant by design instead of remediated afterwards. We deploy the full FCM suite: watch-list screening, dynamic KYC risk scoring, AML transaction monitoring, fraud prevention algorithms. The Temenos FCM AI Agent helps compliance teams cut false positives sharply while catching suspicious activity faster, which is the trade-off most screening setups get wrong in one direction or the other. These safeguards run inside the customer lifecycle in real time, protecting your reputation and keeping regulatory penalties off the table.",
    highlights: ["Watch-list screening", "KYC risk scoring", "AML transaction monitoring", "Temenos FCM AI Agent"],
    problem:
      "Most screening setups force a trade-off between catching genuine suspicious activity and drowning compliance teams in false positives — and bolting compliance on after go-live almost always lands on the wrong side of that trade-off.",
    howItWorks:
      "We configure the full FCM suite — watch-list screening, dynamic KYC risk scoring, AML transaction monitoring and fraud prevention — as part of the core transformation, with the Temenos FCM AI Agent tuned to cut false positives while keeping genuine risk caught fast.",
    benefits: [
      "Compliance built in by design, not remediated after the fact",
      "Sharply fewer false positives without losing detection coverage",
      "Real-time safeguards running inside the customer lifecycle",
      "Regulatory penalties and reputational risk kept off the table",
    ],
  },
  {
    id: "system-integration",
    group: "payments-compliance",
    title: "System Integration",
    body: "Complex ecosystems need a modular, API-first integration strategy rather than point-to-point patching. Our teams connect Temenos platforms to external gateways, third-party fintech products and legacy enterprise systems, and the result is a unified open-banking architecture. Modern middleware and event-driven design keep core, payments and digital channels synchronized in real time. Data silos go, operations get more flexible, and new microservices plug in as you scale.",
    highlights: ["API-first integration", "Open-banking architecture", "Event-driven design", "Third-party connectivity"],
    problem:
      "Point-to-point integrations solve today's connection but multiply the cost and risk of every future one — a growing ecosystem of fintech partners and legacy systems eventually collapses under its own integration debt.",
    howItWorks:
      "We design a modular, API-first integration layer with event-driven middleware, connecting Temenos platforms to external gateways, fintech products and legacy enterprise systems through a unified open-banking architecture rather than bespoke point-to-point links.",
    benefits: [
      "Core, payments and digital channels synchronized in real time",
      "Data silos eliminated across the ecosystem",
      "New microservices and partners plug in without re-architecting",
      "More flexible operations as the integration landscape scales",
    ],
  },
  {
    id: "testing",
    group: "delivery-support",
    title: "Testing",
    body: "We deliver a fully managed testing framework built for complex Temenos environments. It covers test strategy end to end, functional and non-functional testing, system integration testing (SIT) and dedicated User Acceptance Testing (UAT) support. Test automation tools validate workflows, APIs and high-volume transaction processing at high coverage. Rigorous QA before go-live is what keeps business risk and platform instability out of your first week.",
    highlights: ["Functional & non-functional testing", "System integration testing", "UAT support", "Test automation"],
    problem:
      "Manual regression testing can't keep pace with a live Temenos transformation programme, and coverage gaps that look minor in a test report tend to show up as production incidents in the first week after go-live.",
    howItWorks:
      "We run a fully managed testing framework end to end — test strategy, functional and non-functional testing, system integration testing and dedicated UAT support — backed by automation tools that validate workflows, APIs and high-volume transactions at high coverage.",
    benefits: [
      "Business risk and platform instability kept out of the first week",
      "High test coverage across workflows, APIs and transaction volumes",
      "A test strategy that scales with a complex Temenos environment",
      "Dedicated UAT support rather than an afterthought",
    ],
  },
  {
    id: "migration",
    group: "delivery-support",
    title: "Migration",
    body: "Our migration methodology moves institutions from legacy systems to Temenos without data loss or operational disruption. We manage the whole journey: extraction, profiling and deep data cleansing, then mapping, transformation and loading. Financial reconciliation and multiple dress rehearsals happen before the final cutover, so the process is already tuned by the time it counts. Specialized migration utilities protect data integrity and regulatory compliance through the launch weekend.",
    highlights: ["Extraction & profiling", "Data cleansing", "Mapping & transformation", "Dress rehearsals & reconciliation"],
    problem:
      "A migration that skips straight to cutover is a leap of faith — data quality issues, mapping gaps and reconciliation surprises that would have been caught in rehearsal instead surface live, on launch weekend.",
    howItWorks:
      "We manage the whole journey — extraction, profiling, deep data cleansing, mapping, transformation and loading — with financial reconciliation and multiple dress rehearsals completed before the final cutover, using specialised migration utilities throughout.",
    benefits: [
      "Legacy-to-Temenos migration without data loss or operational disruption",
      "A cutover that's already tuned by the time it counts, not a first attempt",
      "Data integrity and regulatory compliance protected through launch weekend",
      "Financial reconciliation built into the process, not bolted on after",
    ],
  },
  {
    id: "upgrades",
    group: "delivery-support",
    title: "Upgrades",
    body: "Temenos upgrades, technical and functional, are complicated enough that most banks defer them. We run them so you stay on the platform's current capabilities. The starting point is an impact assessment that identifies custom code needing refactoring and infrastructure dependencies such as OS or database upgrades. New modules and architectural changes then go in with minimal downtime and historical data preserved. Planned carefully, a mandatory upgrade turns into a chance to improve the business rather than a box to tick.",
    highlights: ["Impact assessment", "Technical & functional upgrades", "Database & OS upgrades", "Minimal-downtime rollout"],
    problem:
      "Upgrades get deferred because the impact on years of accumulated customisation is unknown — and an unplanned upgrade risks breaking exactly the custom code the business has come to rely on.",
    howItWorks:
      "We start with an impact assessment that identifies custom code needing refactoring and infrastructure dependencies like OS or database versions, then roll out new modules and architectural changes with minimal downtime and historical data preserved.",
    benefits: [
      "Access to the platform's current capabilities instead of staying stuck on an old version",
      "A known impact on customisations before work begins, not discovered during it",
      "Minimal-downtime rollout with historical data preserved",
      "A mandatory upgrade turned into a chance to improve the business",
    ],
  },
  {
    id: "application-support",
    group: "delivery-support",
    title: "Application Support",
    body: "Our managed services team provides continuous L1, L2 and L3 application support for your Temenos ecosystem. We handle environment management, performance monitoring and proactive incident resolution to keep system availability high. Beyond break-fix, we manage local customizations, regulatory enhancements and minor product configuration changes in line with your roadmap. We work as an extension of your IT operations, so your internal teams can spend their time on growth rather than platform maintenance.",
    highlights: ["L1/L2/L3 support", "Environment management", "Performance monitoring", "Regulatory enhancements"],
    problem:
      "Keeping a live Temenos estate running — environment management, monitoring, incident resolution, the steady stream of regulatory enhancements — is a full-time commitment that pulls internal teams away from the growth work they're actually there to do.",
    howItWorks:
      "We run continuous L1, L2 and L3 application support as an extension of your IT operations — environment management, performance monitoring, proactive incident resolution, plus local customisations and regulatory enhancements delivered in line with your roadmap.",
    benefits: [
      "High system availability from proactive incident resolution",
      "Regulatory enhancements and configuration changes handled on your roadmap",
      "Internal teams freed up to focus on growth, not platform maintenance",
      "A support team that acts as an extension of your own operations",
    ],
  },
] as const;

export const acceleratorCategories = [
  "Assess",
  "Transform",
  "Validate",
  "Deploy",
  "Optimise",
] as const;

export const acceleratorCatalog = [
  {
    id: "migration-toolkit",
    title: "Migration Toolkit",
    category: "Transform",
    summary:
      "A reusable migration framework covering extraction, transformation and reconciliation with built-in traceability.",
    problem:
      "Migrations lose time and confidence to bespoke extraction, mapping and reconciliation built from scratch each time.",
    howItWorks:
      "Pre-built pipelines and reconciliation controls are configured to the target model, so effort shifts from plumbing to data quality.",
    benefits: [
      "Lower migration effort",
      "End-to-end traceability",
      "Faster reconciliation",
      "Repeatable across programmes",
    ],
  },
  {
    id: "configuration-templates",
    title: "Configuration Templates",
    category: "Transform",
    summary: "A library of proven configuration templates for common banking models and modules.",
    problem:
      "Core and upgrade configuration is repetitive, error-prone and slow when started from a blank canvas.",
    howItWorks:
      "Templates are adapted to the bank's requirements, giving a known-good baseline instead of first-principles configuration.",
    benefits: ["Faster configuration", "Fewer defects", "Consistency across environments"],
  },
  {
    id: "data-mapping-utilities",
    title: "Data Mapping Utilities",
    category: "Assess",
    summary: "Reusable mapping utilities that accelerate and document source-to-target definitions.",
    problem: "Source-to-target mapping is one of the most time-consuming and error-sensitive parts of any migration.",
    howItWorks:
      "Mappings are captured, validated and versioned in a structured form that feeds directly into migration pipelines.",
    benefits: ["Accelerated mapping", "Documented lineage", "Reduced rework"],
  },
  {
    id: "test-automation-framework",
    title: "Test Automation Framework",
    category: "Validate",
    summary: "A banking-aware automation framework for regression, integration and non-functional testing.",
    problem: "Manual regression cannot keep pace with a live transformation, so coverage and confidence slip.",
    howItWorks:
      "Reusable test assets and harnesses are configured to the programme, enabling repeatable automated runs.",
    benefits: ["Higher coverage", "Faster releases", "Audit-ready evidence"],
  },
  {
    id: "deployment-automation",
    title: "Deployment Automation",
    category: "Deploy",
    summary: "Automation that standardises and de-risks build, promotion and deployment.",
    problem: "Manual, inconsistent deployments introduce risk and slow every environment promotion.",
    howItWorks: "Deployment steps are codified and repeatable, reducing manual error and shortening cutover.",
    benefits: ["Predictable deployments", "Reduced cutover risk", "Faster environment turnaround"],
  },
  {
    id: "documentation-automation",
    title: "Documentation Automation",
    category: "Optimise",
    summary: "AI-assisted generation and maintenance of technical and configuration documentation.",
    problem: "Documentation drifts out of date the moment a programme moves, eroding knowledge and audit-readiness.",
    howItWorks:
      "Documentation is generated from the current state and reviewed by experts, keeping knowledge current with far less effort.",
    benefits: ["Always-current documentation", "Lower manual effort", "Stronger audit-readiness"],
  },
  {
    id: "ai-implementation-tools",
    title: "AI Implementation Tools",
    category: "Transform",
    summary:
      "AI-powered tooling for code analysis, conversion and implementation assistance — with a human in the loop.",
    problem: "Skilled engineers spend too much time on repeatable implementation and conversion work.",
    howItWorks:
      "AI proposes conversions, documentation and test cases; banking experts validate every output before it lands.",
    benefits: ["Reduced implementation effort", "Consistent quality", "Expert oversight retained"],
  },
] as const;

export const deliveryLifecycle = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    body: "Understand the business, the estate and the ambition — before proposing change.",
    tags: ["Domain discovery", "Estate mapping", "Ambition alignment"],
  },
  {
    id: "assess",
    number: "02",
    title: "Assess",
    body: "Profile the core, customisations, data quality and risk to build a fact-based baseline.",
    tags: ["Architecture review", "Data profiling", "Risk assessment"],
  },
  {
    id: "design",
    number: "03",
    title: "Design",
    body: "Design the target architecture and a sequenced, continuity-first delivery path.",
    tags: ["Target architecture", "Roadmap", "Migration strategy"],
  },
  {
    id: "transform",
    number: "04",
    title: "Transform",
    body: "Implement, customise and modernise — incrementally, with accelerators doing the heavy lifting.",
    tags: ["Implementation", "Customisation", "Accelerators"],
  },
  {
    id: "validate",
    number: "05",
    title: "Validate",
    body: "Prove every step with functional, non-functional and automated testing plus reconciliation.",
    tags: ["SIT / UAT", "Automation", "Reconciliation"],
  },
  {
    id: "deploy",
    number: "06",
    title: "Deploy",
    body: "Rehearse and execute cutover so go-live becomes a controlled, measured event.",
    tags: ["Dress rehearsal", "Cutover", "Rollback planning"],
  },
  {
    id: "stabilise",
    number: "07",
    title: "Stabilise",
    body: "Support the live platform through hypercare with L1/L2/L3 and rapid resolution.",
    tags: ["Hypercare", "L1/L2/L3", "Incident response"],
  },
  {
    id: "optimise",
    number: "08",
    title: "Optimise",
    body: "Tune, enhance and continuously improve — running and changing the bank together.",
    tags: ["Optimisation", "Enhancements", "Run & change"],
  },
] as const;

export const whyAvenza = [
  {
    id: "credentials",
    number: "01",
    title: "Credentials",
    points: [
      "Seasoned banking technology specialists",
      "Backed by a fast-growing digital company",
      "Deep understanding of challenges and best practices",
    ],
  },
  {
    id: "talent",
    number: "02",
    title: "Talent Pool",
    points: [
      "Experts with global delivery experience",
      "Consultants with Innovator-level Temenos certifications",
      "15+ years of average experience in core banking",
    ],
  },
  {
    id: "thought-leadership",
    number: "03",
    title: "Thought Leadership",
    points: [
      "White papers on core modernization",
      "Point of view on cloud migration",
      "Automation of deployment pipeline",
    ],
  },
  {
    id: "accelerators",
    number: "04",
    title: "Accelerators",
    points: [
      "Proven implementation methodology",
      "Pre-filled product configuration templates",
      "Reusable data mapping sheets for migrations",
    ],
  },
] as const;

export const stats = [
  { id: "experience", icon: "experience", value: 15, suffix: "+", label: "Years average experience in core banking" },
  { id: "service-lines", icon: "service-lines", value: 4, suffix: "", label: "Managed services: End to End Implementation, Managed upgrades, Post Live Application support, Managed Testing" },
  { id: "product-lines", icon: "product-lines", value: 5, suffix: "", label: "Temenos product lines: Transact, Payment Hub, FCM, TDH, Digital Banking" },
  { id: "engagement", icon: "engagement", value: 100, suffix: "%", label: "Flexible engagement — end-to-end or staff augmentation" },
] as const;

export const jobs = [
  {
    id: "senior-developer",
    title: "Senior Developer",
    blurb: "We are seeking an experienced Senior Developer.",
    datePosted: "2026-08-01",
    employmentType: "FULL_TIME",
    workMode: "Hybrid",
    category: "Delivery",
    level: "Senior",
    experience: "6-12 Years",
  },
  {
    id: "sr-product-specialist",
    title: "Sr. Product Specialist",
    blurb: "We are seeking an experienced Sr. Product Specialist.",
    datePosted: "2026-08-01",
    employmentType: "FULL_TIME",
    workMode: "Hybrid",
    category: "Product",
    level: "Senior",
    experience: "6-12 Years",
  },
  {
    id: "pre-sales-lead",
    title: "Pre-Sales Lead",
    blurb:
      "Avenza is seeking an experienced Pre-Sales solutioning lead with 18+ years of experience to join our core team.",
    datePosted: "2026-08-01",
    employmentType: "FULL_TIME",
    workMode: "Remote",
    category: "Pre-Sales",
    level: "Lead",
    experience: "12-15 Years",
  },
  {
    id: "lead-product-consultant",
    title: "Lead Product Consultant",
    blurb: "We are seeking an experienced Lead Product Consultant.",
    datePosted: "2026-08-01",
    employmentType: "FULL_TIME",
    workMode: "Remote",
    category: "Product",
    level: "Lead",
    experience: "12-15 Years",
  },
] as const;

export const yercaudTrip = {
  eyebrow: "Team Offsite 2026",
  title: "The whole company, two days, one hill station",
  dates: "5–6 September 2026",
  location: "Yercaud, Tamil Nadu",
  description:
    "Every single person at Avenza — the whole company, not just a team or two — packed up for a weekend in the hills of Yercaud. We travelled up together, stayed together, and spent two days on things that had nothing to do with sprints or release dates: games on the lawn, a sunset that stopped everyone mid-conversation, and a lot of laughing at each other's photos the next morning. The kind of trip that reminds you why the people matter as much as the work.",
  heroPhoto: { src: "/yercaud-2026-9.jpg", alt: "Avenza whole-company team photo at the Yercaud 2026 offsite", width: 1280, height: 720 },
  heroVideo: "/yercaud-2026-video-2.mp4",
} as const;

export const cultureValues = [
  {
    id: "people-first",
    title: "People-First Approach",
    body: "You bring the talent; we bring the support, mentorship, and opportunities to help you thrive.",
  },
  {
    id: "ethical",
    title: "Ethical & Fair Work Culture",
    body: "Integrity isn't just a word for us — it's how we do business, treat people, and build lasting relationships.",
  },
  {
    id: "transparency",
    title: "Transparency at Every Level",
    body: "We keep things real. No hidden policies, no corporate silos — just open conversations and trust.",
  },
] as const;

export const contactInfo = {
  address:
    "43/B, 1st Main Road, Sarakki Industrial Layout, 3rd Phase, JP Nagar, Bengaluru - 560 078.",
  email: "info@avenza-consulting.com",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Avenza+Consulting%2C+43%2FB%2C+1st+Main+Road%2C+Sarakki+Industrial+Layout%2C+3rd+Phase%2C+JP+Nagar%2C+Bengaluru+-+560+078",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Avenza+Consulting%2C+43%2FB%2C+1st+Main+Road%2C+Sarakki+Industrial+Layout%2C+3rd+Phase%2C+JP+Nagar%2C+Bengaluru+-+560+078&z=16&output=embed",
} as const;

export const insightCategories = ["Core Modernization", "Cloud", "Automation"] as const;

export const insights = [
  {
    id: "core-modernization",
    slug: "modernizing-the-core-without-a-big-bang",
    type: "Point of View",
    tag: "Core Modernization",
    title: "Modernizing the core without a big-bang gamble",
    summary:
      "Why continuity-first, incremental core modernization beats rip-and-replace — and how to sequence it so the business never stops.",
    date: "2026-07-08",
    readTime: "6 min read",
    body: [
      "Every bank carrying a legacy core faces the same tension: the platform that runs the business is also the thing holding it back. The instinct to replace it wholesale is understandable — and usually wrong.",
      "A continuity-first approach treats modernization as a sequenced programme rather than a single event. Each increment is assessed, designed, transformed and validated before the next begins, so risk is retired steadily rather than concentrated at one catastrophic go-live.",
      "The discipline that makes this work is evidence: automated testing, reconciliation and rehearsal at every step. Modernization stops being a leap of faith and becomes a measured, reversible sequence of controlled changes.",
    ],
  },
  {
    id: "cloud-migration",
    slug: "sequencing-cloud-migration-with-core-transformation",
    type: "Whitepaper",
    tag: "Cloud",
    title: "Sequencing cloud migration with core transformation",
    summary:
      "Running a cloud move alongside a core transformation multiplies risk if it's improvised — here's how banks are sequencing the two so they reinforce each other instead.",
    date: "2026-06-10",
    readTime: "8 min read",
    body: [
      "Cloud migration and core transformation are often treated as separate initiatives with separate timelines — which is exactly how they end up colliding mid-programme.",
      "Sequencing them deliberately means moving non-critical workloads first to prove the cloud landing zone, then migrating the core once the operating model, security posture and observability are already proven under real load.",
      "Done this way, the cloud migration de-risks the core transformation instead of competing with it for attention, and the bank ends up with a validated cloud foundation before the workload that matters most ever moves.",
    ],
  },
  {
    id: "deployment-automation",
    slug: "automating-the-deployment-pipeline",
    type: "Article",
    tag: "Automation",
    title: "Automating the deployment pipeline",
    summary:
      "Reducing release risk and cycle time with CI/CD built for core banking environments, where every change carries regulatory and reconciliation weight.",
    date: "2026-05-14",
    readTime: "5 min read",
    body: [
      "Core banking deployments carry a different weight than typical software releases — every change touches customer money, so speed can't come at the cost of auditability.",
      "An automated pipeline built for this context standardizes build, test and promotion across environments, with approvals and rollback designed in rather than bolted on afterward.",
      "The payoff isn't just faster releases — it's releases that are repeatable and provable, which is what actually shortens the path from code complete to a controlled, confident go-live.",
    ],
  },
] as const;
