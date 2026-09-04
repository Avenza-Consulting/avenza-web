export const nav = [
  { label: "Home", href: "/" },
  {
    label: "About",
    items: [
      { label: "Capabilities", href: "/#capabilities" },
      { label: "Solutions", href: "/#solutions" },
      { label: "Expertise", href: "/#why-avenza" },
      { label: "Accelerators", href: "/accelerators" },
    ],
  },
  { label: "Insights", href: "/#insights" },
  {
    label: "Careers",
    items: [
      { label: "Life at Avenza", href: "/life-at-avenza" },
      { label: "Open Roles", href: "/careers" },
      { label: "Leadership", href: "/leadership" },
    ],
  },
  { label: "Contact", href: "/contact" },
] as const;

export const leadership = [
  {
    id: "mahesh-dutt-kolar",
    name: "Mahesh Dutt Kolar",
    title: "Chief Executive Officer",
    photo: "/leadership-mahesh-dutt-kolar.png",
  },
  {
    id: "ratnadeep-mukherjee",
    name: "Ratnadeep Mukherjee",
    title: "Co-Founder & Chief Revenue Officer",
    photo: "/leadership-ratnadeep-mukherjee.png",
  },
  {
    id: "gopinath-chandran",
    name: "Gopinath Chandran",
    title: "Chief Operating Officer",
    photo: "/leadership-gopinath-chandran.png",
  },
] as const;

export const achievement = {
  id: "temenos-techdays-2026-shark-tank",
  eyebrow: "Achievement",
  title: "Avenza wins Shark Tank at Temenos TechDays '26",
  summary:
    "Our team took the stage at Temenos TechDays 2026 in Chennai and won the Shark Tank innovation pitch — recognition for the ideas we're building to help banks move faster on Temenos.",
  photo: "/achievement-techdays-2026.jpg",
  href: "/achievements/temenos-techdays-2026-shark-tank",
} as const;

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
  { id: "modernization", label: "Modernization" },
  { id: "delivery-support", label: "Delivery & Support" },
] as const;

export const capabilities = [
  {
    id: "core-banking",
    group: "core-platform",
    title: "Core Banking Transformation",
    body: "We move financial institutions off legacy cores and onto modern, agile platforms. The engagement covers strategic roadmapping, architecture design, execution and the cutover itself. Two things we hold onto throughout are platform stability and composable architecture, because they are what let the core keep pace with the market instead of locking you into last year's product set. Faster product launches, room to scale, and a lower total cost of ownership all follow from that.",
  },
  {
    id: "temenos-transact",
    group: "core-platform",
    title: "Temenos Transact",
    body: "Greenfield implementations, custom configuration, performance optimization: our Transact specialists work across all of it with both technical and functional depth. Aligning the platform's capabilities with your specific product portfolios is what produces high straight-through processing rates and efficient operations. We work with Temenos-approved accelerators and established practice, which cuts time-to-market and keeps execution risk down. Whether you are launching a new digital brand or migrating a complicated legacy portfolio, the aim is to get the full value out of Transact.",
  },
  {
    id: "digital-banking",
    group: "core-platform",
    title: "Digital Banking",
    body: "Front-end solutions such as Temenos Infinity get integrated cleanly with the transformed core, which is what makes omnichannel actually work rather than just appear on a slide. We design for hyper-personalized journeys across retail, corporate and wealth management. API-first architecture and microservices keep data moving between layers in real time. Banks use this to lift engagement, push self-service adoption, and put a distinctive digital brand in front of customers in a crowded market.",
  },
  {
    id: "temenos-payments",
    group: "payments-compliance",
    title: "Temenos Payments",
    body: "We deploy the Temenos Payments Hub to streamline global money movement and tighten processing efficiency. Payment scheme integration is handled end to end, with secure real-time processing and readiness for instant payments in the markets you operate in. Automated enrichments, exception handling and ISO 20022 compliance lift straight-through processing rates and bring transaction costs down. The infrastructure scales, and it keeps up with regulatory change without a rebuild each time.",
  },
  {
    id: "temenos-fcm",
    group: "payments-compliance",
    title: "Temenos FCM",
    body: "Financial Crime Mitigation gets configured as part of the transformation, so the platform is compliant by design instead of remediated afterwards. We deploy the full FCM suite: watch-list screening, dynamic KYC risk scoring, AML transaction monitoring, fraud prevention algorithms. The Temenos FCM AI Agent helps compliance teams cut false positives sharply while catching suspicious activity faster, which is the trade-off most screening setups get wrong in one direction or the other. These safeguards run inside the customer lifecycle in real time, protecting your reputation and keeping regulatory penalties off the table.",
  },
  {
    id: "system-integration",
    group: "payments-compliance",
    title: "System Integration",
    body: "Complex ecosystems need a modular, API-first integration strategy rather than point-to-point patching. Our teams connect Temenos platforms to external gateways, third-party fintech products and legacy enterprise systems, and the result is a unified open-banking architecture. Modern middleware and event-driven design keep core, payments and digital channels synchronized in real time. Data silos go, operations get more flexible, and new microservices plug in as you scale.",
  },
  {
    id: "cloud",
    group: "modernization",
    title: "Cloud Transformation",
    body: "We run secure, scalable moves to the cloud, with migration and SaaS-ready architecture strategies built specifically for banking infrastructure. That runs from readiness assessment through to deploying Temenos on the major hyperscalers or in a managed SaaS environment. We tune the infrastructure for high availability, disaster recovery and dynamic resource scaling. Banks come out with a much smaller on-premise IT footprint, better-controlled spending and stronger operational resilience.",
  },
  {
    id: "data",
    group: "modernization",
    title: "Data & Analytics",
    body: "Core banking data becomes usable through careful mapping, extraction and transformation. Our accelerators de-risk large data migrations and leave behind a clean, unified data model that analytics can be built on. Connecting Temenos data to enterprise data lakes and BI tools is what lets you dig into customer behavior, sharpen risk models and forecast market trends. The architecture we design handles historical reporting and predictive work, not one at the expense of the other.",
  },
  {
    id: "ai-automation",
    group: "modernization",
    title: "AI & Automation",
    body: "AI and intelligent automation go in across the SDLC to speed up Temenos delivery. Automated code conversion, environment provisioning and technical documentation generation take a large share of the manual development work off your team. Mature CI/CD pipelines automate testing and deployment, cutting human error and keeping release cycles short. Streamlining the engineering workflow is what gets you to value faster without letting code quality slip.",
  },
  {
    id: "testing",
    group: "delivery-support",
    title: "Testing",
    body: "We deliver a fully managed testing framework built for complex Temenos environments. It covers test strategy end to end, functional and non-functional testing, system integration testing (SIT) and dedicated User Acceptance Testing (UAT) support. Test automation tools validate workflows, APIs and high-volume transaction processing at high coverage. Rigorous QA before go-live is what keeps business risk and platform instability out of your first week.",
  },
  {
    id: "migration",
    group: "delivery-support",
    title: "Migration",
    body: "Our migration methodology moves institutions from legacy systems to Temenos without data loss or operational disruption. We manage the whole journey: extraction, profiling and deep data cleansing, then mapping, transformation and loading. Financial reconciliation and multiple dress rehearsals happen before the final cutover, so the process is already tuned by the time it counts. Specialized migration utilities protect data integrity and regulatory compliance through the launch weekend.",
  },
  {
    id: "upgrades",
    group: "delivery-support",
    title: "Upgrades",
    body: "Temenos upgrades, technical and functional, are complicated enough that most banks defer them. We run them so you stay on the platform's current capabilities. The starting point is an impact assessment that identifies custom code needing refactoring and infrastructure dependencies such as OS or database upgrades. New modules and architectural changes then go in with minimal downtime and historical data preserved. Planned carefully, a mandatory upgrade turns into a chance to improve the business rather than a box to tick.",
  },
  {
    id: "application-support",
    group: "delivery-support",
    title: "Application Support",
    body: "Our managed services team provides continuous L1, L2 and L3 application support for your Temenos ecosystem. We handle environment management, performance monitoring and proactive incident resolution to keep system availability high. Beyond break-fix, we manage local customizations, regulatory enhancements and minor product configuration changes in line with your roadmap. We work as an extension of your IT operations, so your internal teams can spend their time on growth rather than platform maintenance.",
  },
] as const;

export const journey = [
  "Discover",
  "Design",
  "Transform",
  "Integrate",
  "Migrate",
  "Test",
  "Launch",
  "Optimize",
] as const;

export const acceleratorEngine = [
  "Proven implementation methodology",
  "Pre-filled product configuration templates",
  "Reusable data mapping sheets for migrations",
  "Automation of deployment pipelines",
  "Reusable delivery assets across engagements",
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

export const aiFlow = [
  "AI",
  "Documentation",
  "Code Conversion",
  "Modernization",
  "Testing",
  "Deployment",
] as const;

export const deliveryModels = [
  {
    id: "e2e",
    title: "End-to-End Delivery",
    body: "Avenza owns the full transformation lifecycle — strategy, delivery, testing, migration and go-live — with a single accountable team.",
  },
  {
    id: "staff-aug",
    title: "Staff Augmentation",
    body: "Deep Temenos and core banking specialists embedded directly into your team, on demand.",
  },
  {
    id: "hybrid",
    title: "Hybrid Engagement",
    body: "A blended model combining Avenza-led delivery with embedded specialists — flexed to your program's shape.",
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
  { value: 15, suffix: "+", label: "Years average experience in core banking" },
  { value: 4, suffix: "", label: "Managed service lines: testing, migration, support, upgrades" },
  { value: 3, suffix: "", label: "Temenos product lines: Transact, Payment Hub, FCM" },
  { value: 100, suffix: "%", label: "Flexible engagement — end-to-end or staff augmentation" },
] as const;

export const jobs = [
  {
    id: "senior-developer",
    title: "Senior Developer",
    blurb: "We are seeking an experienced Senior Developer.",
  },
  {
    id: "sr-product-specialist",
    title: "Sr. Product Specialist",
    blurb: "We are seeking an experienced Sr. Product Specialist.",
  },
  {
    id: "pre-sales-lead",
    title: "Pre-Sales Lead",
    blurb:
      "Avenza is seeking an experienced Pre-Sales solutioning lead with 18+ years of experience to join our core team.",
  },
  {
    id: "lead-product-consultant",
    title: "Lead Product Consultant",
    blurb: "We are seeking an experienced Lead Product Consultant.",
  },
] as const;

export const celebrationPhotos = [
  { id: "founders-day-1", src: "/celebration-founders-day-1.jpg", alt: "Avenza 1st Founders Day celebration cake" },
  { id: "founders-day-2", src: "/celebration-founders-day-2.jpg", alt: "Avenza leadership team at the 1st Founders Day celebration" },
  { id: "founders-day-3", src: "/celebration-founders-day-3.jpg", alt: "Avenza team member speaking at the Founders Day event" },
  { id: "founders-day-4", src: "/celebration-founders-day-4.jpg", alt: "Avenza team group photo at the Founders Day celebration" },
  { id: "avenza100-1", src: "/celebration-avenza100-1.jpg", alt: "Avenza 100 associates milestone celebration cake" },
  { id: "avenza100-2", src: "/celebration-avenza100-2.jpg", alt: "Avenza team celebrating reaching 100 associates" },
  { id: "avenza100-3", src: "/celebration-avenza100-3.jpg", alt: "Avenza team cutting the cake for the 100 associates milestone" },
] as const;

export const sportsPhotos = [
  { id: "cricket-1", src: "/sports-cricket-1.jpg", alt: "Avenza team cricket match" },
  { id: "cricket-2", src: "/sports-cricket-2.jpg", alt: "Avenza team playing cricket" },
  { id: "cricket-3", src: "/sports-cricket-3.jpg", alt: "Avenza team cricket outing" },
  { id: "cricket-4", src: "/sports-cricket-4.jpg", alt: "Avenza team cricket match action" },
  { id: "cricket-5", src: "/sports-cricket-5.jpg", alt: "Avenza team on the cricket field" },
  { id: "cricket-6", src: "/sports-cricket-6.jpg", alt: "Avenza team cricket game" },
  { id: "cricket-7", src: "/sports-cricket-7.jpg", alt: "Avenza team cricket outing photo" },
  { id: "cricket-8", src: "/sports-cricket-8.jpg", alt: "Avenza team playing cricket together" },
  { id: "cricket-9", src: "/sports-cricket-9.jpg", alt: "Avenza team cricket match moment" },
  { id: "cricket-10", src: "/sports-cricket-10.jpg", alt: "Avenza team cricket day photo" },
] as const;

export const offsitePhotos = [
  { id: "chennai-1", src: "/offsite-chennai-1.jpg", alt: "Avenza Chennai team offsite get-together" },
  { id: "chennai-2", src: "/offsite-chennai-2.jpg", alt: "Avenza Chennai team offsite photo" },
  { id: "hyderabad-1", src: "/offsite-hyderabad-1.jpg", alt: "Avenza Hyderabad team offsite" },
  { id: "hyderabad-2", src: "/offsite-hyderabad-2.jpg", alt: "Avenza Hyderabad team offsite photo" },
  { id: "hyderabad-3", src: "/offsite-hyderabad-3.jpg", alt: "Avenza Hyderabad team offsite moment" },
  { id: "hyderabad-4", src: "/offsite-hyderabad-4.jpg", alt: "Avenza Hyderabad team offsite get-together" },
  { id: "hyderabad-5", src: "/offsite-hyderabad-5.jpg", alt: "Avenza Hyderabad team offsite gathering" },
  { id: "hyderabad-6", src: "/offsite-hyderabad-6.jpg", alt: "Avenza Hyderabad team offsite outing" },
  { id: "hyderabad-7", src: "/offsite-hyderabad-7.jpg", alt: "Avenza Hyderabad team offsite photo" },
  { id: "hyderabad-8", src: "/offsite-hyderabad-8.jpg", alt: "Avenza Hyderabad team offsite day" },
] as const;

export const lifeHighlights = [
  {
    id: "team-events",
    title: "Team Events & Celebrations",
    body: "From festival get-togethers to milestone celebrations, we make time to celebrate wins and each other — not just on the calendar, but as a habit.",
  },
  {
    id: "learning",
    title: "Learning & Growth",
    body: "Certifications, internal knowledge-sharing sessions, and hands-on mentorship — we invest in the skills that grow your career, not just the project.",
  },
  {
    id: "work-life-balance",
    title: "Work-Life Balance",
    body: "Flexible working, genuine respect for personal time, and a culture that doesn't equate long hours with commitment.",
  },
  {
    id: "fun-activities",
    title: "Fun & Team Bonding",
    body: "Game nights, sports, and informal hangouts — the moments outside of delivery that turn colleagues into a team.",
  },
] as const;

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
} as const;

export const insights = [
  {
    id: "core-modernization",
    tag: "Core Modernization",
    title: "White papers on core modernization",
    body: "Perspectives on modernizing core banking platforms without disrupting the business.",
  },
  {
    id: "cloud-migration",
    tag: "Cloud",
    title: "A point of view on cloud migration",
    body: "How banks are sequencing cloud migration alongside core transformation programs.",
  },
  {
    id: "deployment-automation",
    tag: "Automation",
    title: "Automating the deployment pipeline",
    body: "Reducing release risk and cycle time with CI/CD built for core banking environments.",
  },
] as const;
