export const nav = [
  { label: "Home", href: "/" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Expertise", href: "/#why-avenza" },
  { label: "Insights", href: "/#insights" },
  { label: "Leadership", href: "/leadership" },
  { label: "Careers", href: "/careers" },
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

export const heroPillars = [
  {
    id: "agility",
    title: "Agility & Hyper-Personalized Service",
    body: "Our core banking transformation services help banks stay agile, deploy new features quickly, and seamlessly integrate with emerging technologies. We deliver hyper-personalized experiences aligned with your business goals.",
  },
  {
    id: "temenos",
    title: "Specialized Expertise in Temenos Transact, TPH and FCM",
    body: "With deep expertise in Temenos products, we deliver tailored solutions for smooth implementation, optimization, and long-term platform stability.",
  },
  {
    id: "accelerators",
    title: "Value-Added Tools & Accelerators",
    body: "We offer home-grown tools and accelerators that streamline processes, cutting time-to-market and boosting delivery confidence.",
  },
  {
    id: "ai",
    title: "Leverage Technology & AI",
    body: "We leverage AI for product implementation, streamlining documentation across the SDLC and enabling faster, more accurate delivery.",
  },
  {
    id: "engagement",
    title: "Flexible Engagement Models",
    body: "We offer flexible engagement models tailored to your needs — from end-to-end project delivery to staff augmentation.",
  },
] as const;

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
    body: "End-to-end transformation of core banking platforms — from strategy through cutover — built for agility and long-term platform stability.",
  },
  {
    id: "temenos-transact",
    group: "core-platform",
    title: "Temenos Transact",
    body: "Deep specialist expertise across Temenos Transact implementation, configuration, and optimization.",
  },
  {
    id: "digital-banking",
    group: "core-platform",
    title: "Digital Banking",
    body: "Modern digital channel experiences layered cleanly onto transformed core platforms.",
  },
  {
    id: "temenos-payments",
    group: "payments-compliance",
    title: "Temenos Payments",
    body: "Temenos Payment Hub delivery — from payment scheme integration to real-time processing readiness.",
  },
  {
    id: "temenos-fcm",
    group: "payments-compliance",
    title: "Temenos FCM",
    body: "Financial Crime Mitigation implementation to keep transformation programs compliant by design.",
  },
  {
    id: "system-integration",
    group: "payments-compliance",
    title: "System Integration",
    body: "Modularized, API-first integration across core, payments, channels and surrounding ecosystems.",
  },
  {
    id: "cloud",
    group: "modernization",
    title: "Cloud Transformation",
    body: "Cloud migration and SaaS-ready architecture strategy for modern, resilient banking infrastructure.",
  },
  {
    id: "data",
    group: "modernization",
    title: "Data & Analytics",
    body: "Data mapping, transformation and analytics accelerators that de-risk migration and unlock insight.",
  },
  {
    id: "ai-automation",
    group: "modernization",
    title: "AI & Automation",
    body: "AI applied across the SDLC — from documentation to code conversion, testing and deployment automation.",
  },
  {
    id: "testing",
    group: "delivery-support",
    title: "Testing",
    body: "Test strategy & planning, system integration testing, functional & non-functional testing, UAT support, test automation, and fully managed testing.",
  },
  {
    id: "migration",
    group: "delivery-support",
    title: "Migration",
    body: "Migration strategy & planning, data extraction & cleansing, mapping, transformation & loading, reconciliation, dress rehearsals and cutover support.",
  },
  {
    id: "upgrades",
    group: "delivery-support",
    title: "Upgrades",
    body: "Technical & functional upgrades, upgrade review & assessment, database & OS upgrades, and new module implementation.",
  },
  {
    id: "application-support",
    group: "delivery-support",
    title: "Application Support",
    body: "Business & technical support, L1/L2/L3 application support, environment management, and local customization & enhancements.",
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

export const accelerators = [
  "Proven implementation methodology",
  "Pre-filled product configuration templates",
  "Reusable data mapping sheets for migrations",
  "Automation of deployment pipelines",
  "Reusable delivery assets across engagements",
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
