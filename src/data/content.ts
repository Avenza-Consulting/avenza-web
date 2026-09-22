export const nav = [
  {
    label: "Home",
    href: "/",
    items: [
      { label: "Who We Are", href: "/#who-we-are" },
      { label: "Achievements", href: "/#achievements" },
      { label: "Core Capabilities", href: "/#capabilities" },
      { label: "Why Avenza", href: "/#why-avenza" },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "Industry Expertise", href: "/about#industry-expertise" },
      { label: "Delivery Model", href: "/about#delivery-models" },
      { label: "How We Deliver", href: "/about#how-we-deliver" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Insights", href: "/about#insights" },
    ],
  },
  { label: "Accelerators", href: "/accelerators" },
  { label: "Careers", href: "/careers" },
  { label: "Life @ Avenza", href: "/life-at-avenza" },
  { label: "Contact", href: "/contact" },
] as const;

export const leadership = [
  {
    id: "mahesh-dutt-kolar",
    name: "Mahesh Dutt Kolar",
    title: "Chief Executive Officer",
    bio: "Sets the vision and holds the bar for how Avenza delivers.",
    photo: "/leadership-mahesh-dutt-kolar.png",
  },
  {
    id: "ratnadeep-mukherjee",
    name: "Ratnadeep Mukherjee",
    title: "Co-Founder & Chief Revenue Officer",
    bio: "Builds the relationships and growth engine behind the business.",
    photo: "/leadership-ratnadeep-mukherjee.png",
  },
  {
    id: "gopinath-chandran",
    name: "Gopinath Chandran",
    title: "Chief Operating Officer",
    bio: "Turns strategy into dependable, day-to-day delivery.",
    photo: "/leadership-gopinath-chandran.png",
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

export const deliveryModels = [
  {
    id: "agility",
    title: "Agility & Hyper Personalized Service",
    body: "Our core banking transformation services help banks stay agile, deploy new features quickly, and seamlessly integrate with emerging technologies. With our expertise, we deliver hyper-personalized experiences aligned with your business goals.",
  },
  {
    id: "temenos-expertise",
    title: "Specialized Expertise in Temenos Transact, TPH and FCM",
    body: "With deep expertise in Temenos products, we deliver tailored solutions for smooth implementation, optimized local development, and enhanced performance, helping you maximize Temenos' potential while staying compliant and competitive.",
  },
  {
    id: "accelerators",
    title: "Value Added Tools & Accelerators",
    body: "We offer home grown tools and accelerators that streamline processes, cutting time-to-market, and boosting efficiency. Our proprietary solutions reduce manual effort and mitigate risks through automation and reusability.",
  },
  {
    id: "technology-ai",
    title: "Leverage Technology & AI",
    body: "We leverage AI for product implementation, streamlining documentation across the SDLC and enabling accurate code conversion and upgrades.",
  },
  {
    id: "flexible-engagement",
    title: "Flexible Engagement Models",
    body: "We offer flexible engagement models tailored to your needs, from end-to-end project delivery to staff augmentation or a hybrid approach, we provide the right level of support ensuring success on your terms.",
  },
] as const;

export const deliveryModelsTagline =
  "Avenza blends Temenos expertise with AI, digital, and advanced analytics to deliver future-proof core banking solutions, creating a unique value proposition for customers worldwide.";

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
  { id: "service-lines", icon: "service-lines", value: 4, suffix: "", label: "Managed service lines: testing, migration, support, upgrades" },
  { id: "product-lines", icon: "product-lines", value: 6, suffix: "", label: "Temenos product lines: Transact, Payment Hub, FCM, TDH, Wealth, Digital Banking" },
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
