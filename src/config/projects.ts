/**
 * Real, live projects. Every field comes from the live sites or from the
 * portfolio at rafayiman.tech.
 * Images live in /public/projects.
 */

export const projectCategories = [
  "AI & ML",
  "Business Software",
  "Web Platforms",
  "E-commerce",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type CaseStudy = {
  challenge: string;
  solution: string;
  keyFeatures: string[];
  architecture: string[];
  metrics: { label: string; value: string }[];
  confidentialityNote?: string;
};

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  description: string;
  stack: string[];
  image: string;
  liveUrl: string;
  /** Shown on the home page when true. */
  featured?: boolean;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "binderdocs",
    name: "BinderDocs",
    category: "AI & ML",
    description:
      "AI-powered document automation with RAG search, workflow orchestration and e-signatures.",
    stack: [".NET 9", "Angular", "Qdrant", "RAG", "Azure"],
    image: "/projects/binderdocs.webp",
    liveUrl: "https://binder-docs-frontend.vercel.app/",
    featured: true,
    caseStudy: {
      challenge:
        "Legal teams and enterprise operations were bogged down by manual contract review, buried clauses in thousands of multi-page agreements, and fragmented signature workflows across multiple third-party tools.",
      solution:
        "The CodeRoom engineered an end-to-end intelligent document suite combining vector-based RAG search, multi-tenant digital signature pipelines, and automated contract template generation from structured inputs.",
      keyFeatures: [
        "Vector-based RAG search returning cited clauses in <300ms",
        "Multi-party cryptographic e-signature pipeline with audit trail",
        "Automated contract generation from structured data forms",
        "Granular role-based access control and tenant encryption",
        "Automated PDF compilation and bulk export",
      ],
      architecture: [
        ".NET 9 Enterprise Web API",
        "Angular 18 Reactive UI",
        "Qdrant Vector Database",
        "Azure Blob Storage",
        "Custom Embeddings Pipeline",
      ],
      metrics: [
        { label: "Contract Review Speed", value: "85% Faster" },
        { label: "Vector Search Latency", value: "<300ms" },
        { label: "System Availability", value: "99.9% SLA" },
      ],
      confidentialityNote:
        "Enterprise Portal: Due to client confidentiality and data protection agreements, private tenant vaults require corporate SSO credentials. The live preview demonstrates the public onboarding interface.",
    },
  },
  {
    slug: "blueprint-manager",
    name: "Blueprint Manager",
    category: "Business Software",
    description:
      "Project management for architecture, engineering and construction firms: Gantt charts, Kanban, budget tracking and resource planning.",
    stack: ["Angular", "Azure", "ASP.NET Core", "SQL Server"],
    image: "/projects/blueprint-manager.webp",
    liveUrl: "https://blueprint-frontend-seven.vercel.app/",
    featured: true,
    caseStudy: {
      challenge:
        "Architecture and construction firms struggled with disconnected spreadsheets, untracked subcontractor schedule conflicts, delayed budget auditing, and lost revisions on CAD/PDF blueprints.",
      solution:
        "We built a centralized AEC project management platform featuring interactive dependency-linked Gantt timelines, live budget variance calculations, blueprint markup layers, and automated contractor dispatch.",
      keyFeatures: [
        "Interactive multi-tier Gantt chart with task dependencies",
        "Real-time budget variance tracker and procurement logs",
        "Cloud PDF/CAD blueprint viewer with revision history",
        "Subcontractor resource allocation and milestone deadlines",
        "Exportable executive progress audits and billing reports",
      ],
      architecture: [
        "Angular 18 Single-Page Architecture",
        "ASP.NET Core Enterprise Web API",
        "Azure SQL Database with High-Concurrency Indexing",
        "SignalR Real-time Event Broadcaster",
      ],
      metrics: [
        { label: "Milestone Tracking Speed", value: "40% Faster" },
        { label: "Revision Discrepancies", value: "Reduced to 0%" },
        { label: "Active Project Capacity", value: "Unlimited Tiers" },
      ],
      confidentialityNote:
        "Corporate ERP: Firm projects, subcontractor rates, and proprietary blueprints are protected under client tenant authorization. Public preview shows platform structure.",
    },
  },
  {
    slug: "lovedoner-pos",
    name: "LoveDoner POS",
    category: "Business Software",
    description:
      "Cloud point-of-sale and franchise operations: sales, kitchen, inventory and supply chain.",
    stack: ["Angular", "Azure", "PostgreSQL", "WebSockets"],
    image: "/projects/lovedoner-pos.webp",
    liveUrl: "https://love-doner.vercel.app/",
    featured: true,
    caseStudy: {
      challenge:
        "A growing food franchise experienced ordering bottlenecks, inaccurate manual stock reconciliation, and kitchen ticket delays across multiple restaurant locations.",
      solution:
        "Architected a real-time cloud Point of Sale (POS) and Kitchen Display System (KDS) that instantly syncs counter orders, deducts recipe-level inventory automatically, and provides franchise owners live revenue metrics.",
      keyFeatures: [
        "Sub-second touch order entry with offline synchronization fallback",
        "Kitchen Display System (KDS) with color-coded preparation timers",
        "Automated recipe-level ingredient depletion and low-stock alerts",
        "Centralized multi-branch revenue telemetry and cashier shift audits",
        "Thermal printer and digital receipt integrations",
      ],
      architecture: [
        "Angular Frontend Optimized for Touch Displays",
        "Azure Microservices Backend",
        "PostgreSQL Relational Storage",
        "WebSockets for Instant Kitchen Push Updates",
      ],
      metrics: [
        { label: "Ticket Preparation Time", value: "-35% Quicker" },
        { label: "Stock Discrepancy", value: "<1% Variance" },
        { label: "Multi-branch Sync", value: "Instantaneous" },
      ],
      confidentialityNote:
        "Franchise Operations: Operational POS terminals require authenticated cashier PINs and branch device authorization to process live transactions.",
    },
  },
  {
    slug: "tradecrawler",
    name: "TradeCrawler",
    category: "AI & ML",
    description:
      "AI-powered B2B lead intelligence that automates buyer and supplier discovery across global marketplaces.",
    stack: ["Python", "FastAPI", "AI", "Playwright", "PostgreSQL"],
    image: "/projects/tradecrawler.webp",
    liveUrl: "https://trade-crawler-frontend.vercel.app/",
    featured: true,
    caseStudy: {
      challenge:
        "Global trade agents and B2B exporters spent hundreds of manual hours every month browsing disparate international trade directories, verifying manufacturer credentials, and collecting fragmented contact info.",
      solution:
        "Developed an autonomous B2B lead intelligence engine that crawls, deduplicates, and scores buyers and suppliers across international marketplaces, utilizing AI to verify trading activity and extract decision-maker contacts.",
      keyFeatures: [
        "Distributed scraper clusters parsing multi-language marketplaces",
        "AI-driven entity deduplication and corporate credential verification",
        "Automated decision-maker email and contact discovery",
        "Trade volume classification and export-readiness scoring",
        "One-click CRM export and API synchronization",
      ],
      architecture: [
        "Python Async FastAPI Backend",
        "Headless Distributed Crawlers via Playwright",
        "PostgreSQL with Full-Text & Vector Search",
        "NLP Keyword & Category Extractors",
      ],
      metrics: [
        { label: "Global Records Processed", value: "100,000+" },
        { label: "Prospecting Time Saved", value: "80% Reduction" },
        { label: "Lead Precision Rate", value: "94% Accuracy" },
      ],
      confidentialityNote:
        "Proprietary Intelligence: Live data queries and custom crawler executions require client API access credentials.",
    },
  },
  {
    slug: "malaria-detector",
    name: "Malaria Detector",
    category: "AI & ML",
    description: "Computer vision model that detects malaria from blood smear images.",
    stack: ["Python", "PyTorch", "ResNet50", "FastAPI", "React"],
    image: "/projects/malaria-detector.webp",
    liveUrl: "https://malariadetector.vercel.app/",
    featured: true,
    caseStudy: {
      challenge:
        "Remote clinics in underserved regions often lack access to experienced microscopists, resulting in delayed malaria diagnosis and treatment during critical illness windows.",
      solution:
        "Trained and deployed a high-accuracy convolutional neural network based on ResNet-50, capable of classifying infected red blood cells from standard microscope photograph uploads in fractions of a second.",
      keyFeatures: [
        "Instant image upload and cell boundary preprocessing",
        "Deep learning inference distinguishing parasitized vs. uninfected cells",
        "Confidence rating score and diagnostic heatmaps",
        "Lightweight architecture deployable on low-spec edge clinic hardware",
        "Detailed patient report generator with diagnostic summary",
      ],
      architecture: [
        "PyTorch Deep Learning Framework",
        "Fine-tuned ResNet-50 CNN Architecture",
        "Python FastAPI Inference Microservice",
        "Modern React Diagnostic Dashboard",
      ],
      metrics: [
        { label: "Diagnostic Accuracy", value: "96.8% Validation" },
        { label: "Inference Latency", value: "<500ms" },
        { label: "Model Size", value: "Optimized for Edge" },
      ],
    },
  },
  {
    slug: "jewelignite",
    name: "JewelIgnite",
    category: "E-commerce",
    description:
      "Online store and admin panel for a handmade jewellery brand, with WhatsApp ordering and photo reviews.",
    stack: ["React", "TypeScript", "Tailwind", "Supabase", "PostgreSQL"],
    image: "/projects/jewelignite.jpg",
    liveUrl: "https://jewel-ignite.vercel.app",
    featured: true,
    caseStudy: {
      challenge:
        "A luxury artisan jewelry brand needed an online experience that felt as elegant as their physical pieces, with frictionless mobile checkout and easy administrative control over custom bespoke requests.",
      solution:
        "Delivered a bespoke luxury e-commerce experience with deep aesthetic visuals, 1-click WhatsApp checkout pre-formatted with SKU codes, customer photo review walls, and a real-time Supabase inventory management suite.",
      keyFeatures: [
        "Mobile-first luxury storefront with interactive high-res zoom",
        "1-click WhatsApp ordering generating pre-populated item summaries",
        "Customer verified photo review gallery",
        "Admin portal for product variations, collections, and pricing updates",
        "Instant real-time stock sync via Supabase WebSockets",
      ],
      architecture: [
        "React & TypeScript with Vite",
        "Tailwind CSS Dark Luxury Theme",
        "Supabase Backend & PostgreSQL Storage",
        "Row-Level Security (RLS) for Admin Authentication",
      ],
      metrics: [
        { label: "Checkout Conversion", value: "+300% via WhatsApp" },
        { label: "Mobile Page Load", value: "<0.8s" },
        { label: "Customer Photo Reviews", value: "100+ Verified" },
      ],
    },
  },
  {
    slug: "smart-fitness-wear",
    name: "Smart Fitness Wear",
    category: "E-commerce",
    description:
      "Storefront and custom team-wear enquiry flow for a gym apparel brand, with a photo review wall.",
    stack: ["React", "TypeScript", "Tailwind", "Supabase", "PostgreSQL"],
    image: "/projects/smart-fitness-wear.jpg",
    liveUrl: "https://smart-fitness-wear.vercel.app/",
    featured: true,
    caseStudy: {
      challenge:
        "A fitness apparel manufacturer needed to sell direct-to-consumer athletic wear while simultaneously capturing large custom bulk team-wear inquiries from gyms, crossfit boxes, and sports franchises.",
      solution:
        "Engineered an athletic e-commerce storefront combining standard retail cart checkout with a specialized interactive bulk team-wear design configurator and customer community review wall.",
      keyFeatures: [
        "High-performance catalog with fit, compression, and fabric filtering",
        "Custom team-wear inquiry flow with logo file upload and quantity calculator",
        "Dynamic customer review wall with real athlete photo submissions",
        "Supabase relational database managing inventory, sizes, and inquiry pipelines",
        "Fully responsive layout optimized for mobile fitness enthusiasts",
      ],
      architecture: [
        "React with TypeScript",
        "Tailwind CSS Athletic UI",
        "Supabase Cloud Database & Storage",
        "PostgreSQL Relational Schema",
      ],
      metrics: [
        { label: "Bulk Team Inquiries", value: "+45% Increase" },
        { label: "Mobile Performance", value: "98/100 Lighthouse" },
        { label: "Order Lead Time", value: "Streamlined by 50%" },
      ],
    },
  },
  {
    slug: "techconnect",
    name: "TechConnect",
    category: "Web Platforms",
    description:
      "Community learning platform with skill swapping, live sessions, real-time messaging and stories.",
    stack: ["Next.js", "Supabase", "TypeScript", "WebSockets"],
    image: "/projects/techconnect.webp",
    liveUrl: "https://tech-connect-web-project.vercel.app/",
    caseStudy: {
      challenge:
        "Self-taught developers and engineering students struggled to find peers for collaborative pair-programming, technical portfolio feedback, and structured skill swapping.",
      solution:
        "Created an interactive developer hub featuring skill-matching algorithms, real-time messaging, scheduled virtual pair-programming sessions, and community technical project stories.",
      keyFeatures: [
        "Skill-match algorithm pairing learners with experienced mentors",
        "Instant peer-to-peer messaging and notification alerts",
        "Interactive technical showcase feed with community upvoting",
        "Profile badges verified by project contributions",
      ],
      architecture: [
        "Next.js App Router Architecture",
        "Supabase Realtime Database & Row-Level Security",
        "TypeScript with Strict Type Validation",
        "Tailwind CSS Responsive UI",
      ],
      metrics: [
        { label: "Active Connections", value: "Thousands Made" },
        { label: "Chat Latency", value: "<50ms Realtime" },
        { label: "Community Retention", value: "High Engagement" },
      ],
    },
  },
  {
    slug: "pehchaan",
    name: "Pehchaan",
    category: "Web Platforms",
    description:
      "Smart QR-based vehicle contact platform that lets people reach a vehicle owner anonymously.",
    stack: ["React", "Node.js", "Cloud APIs", "Twilio"],
    image: "/projects/pehchaan.webp",
    liveUrl: "https://pehchaan-51fb61.webflow.io/",
    caseStudy: {
      challenge:
        "Urban parking congestion frequently causes parked cars to block driveways or other vehicles. Leaving phone numbers on dashboards exposes car owners to privacy breaches, spam, and stalking.",
      solution:
        "Engineered an anonymous vehicle contact ecosystem using windshield QR decals. Scanning the QR code triggers masked calls or encrypted SMS alerts without exposing either party's private phone number.",
      keyFeatures: [
        "Instant camera QR scan triggering masked calling and WhatsApp alerts",
        "Complete privacy shielding protecting vehicle owner mobile numbers",
        "Emergency alert options (towed, window left down, lights on)",
        "Fleet portal for commercial parking and vehicle management",
      ],
      architecture: [
        "React Frontend for Instant QR Landing Flow",
        "Node.js Backend Microservices",
        "Telephony Masking Gateway",
        "Scalable Cloud Decal Verification Engine",
      ],
      metrics: [
        { label: "Privacy Protection", value: "100% Number Masked" },
        { label: "Registered Vehicles", value: "1,000+ Active" },
        { label: "Incident Resolution", value: "<2 Minute Average" },
      ],
    },
  },
];
