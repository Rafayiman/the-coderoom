import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Brain,
  Code2,
  BarChart3,
  Database,
  Workflow,
  Check,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Layers,
  Cpu,
  ShieldCheck,
  Clock,
  Compass,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/shared/Reveal";
import { AmbientBackground } from "@/components/shared/AmbientBackground";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { pageMeta } from "@/config/site";
import { services } from "@/config/services";

export const Route = createFileRoute("/services")({
  head: () =>
    pageMeta(
      "Our Services",
      "Full-stack web applications, AI & machine learning, database engineering, automation, and data analytics built by The CodeRoom.",
      "/services",
    ),
  component: ServicesPage,
});

const serviceDetails = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    summary:
      "Transforming business operations with intelligent systems that comprehend text, generate structured knowledge, and classify visual data.",
    icon: Brain,
    deliverables: [
      "Custom Retrieval-Augmented Generation (RAG) knowledge bases",
      "Autonomous agent workflows and task orchestration",
      "Computer vision classification & object detection models",
      "Enterprise chatbot systems with role-based access",
      "Fine-tuned open-source & commercial LLMs (DeepSeek, Llama, OpenAI)",
      "Embeddings & semantic vector database integrations (Qdrant, Pinecone)",
    ],
    tech: ["Python", "PyTorch", "FastAPI", "Qdrant", "LangChain", "OpenAI"],
    caseStudy: {
      name: "BinderDocs & TradeCrawler",
      description: "AI-driven legal document automation and automated global marketplace intelligence.",
      link: "/projects",
    },
  },
  {
    id: "web-software",
    title: "Web & Software Development",
    summary:
      "Enterprise-grade platforms and modern responsive web applications built with rigorous architecture and clean code.",
    icon: Code2,
    deliverables: [
      "Full-stack web applications with modern SSR & client-side rendering",
      "Enterprise internal tools, admin portals, and multi-tenant SaaS",
      "High-concurrency RESTful and GraphQL API backends",
      "Third-party payments, CRM, ERP, and webhook integrations",
      "Performance optimization for sub-second page loads",
      "Progressive Web Apps (PWAs) with offline sync support",
    ],
    tech: ["React", "Next.js", "Angular", ".NET 9", "Node.js", "TypeScript"],
    caseStudy: {
      name: "Blueprint Manager",
      description: "Full-scale project management platform for architecture, engineering and construction.",
      link: "/projects",
    },
  },
  {
    id: "automation",
    title: "Automation & Workflow Tooling",
    summary:
      "Eliminating repetitive operational bottlenecks with custom automated pipelines, robotic sync tools, and API connectors.",
    icon: Workflow,
    deliverables: [
      "Automated web data scrapers and lead extraction pipelines",
      "Scheduled background jobs and batch processing engines",
      "Multi-system synchronization (POS, Kitchen, Accounting, CRM)",
      "Automated PDF document compilation and digital signature flows",
      "Webhook event-driven architecture and real-time alerts",
    ],
    tech: ["Python", "Node.js", "Playwright", "Azure Functions", "Docker"],
    caseStudy: {
      name: "LoveDoner POS & TradeCrawler",
      description: "Automated franchise kitchen-to-inventory sync and global market data pipelines.",
      link: "/projects",
    },
  },
  {
    id: "databases",
    title: "Database Solutions & Cloud Architecture",
    summary:
      "Resilient database schemas, query optimization, and cloud storage designed to preserve speed as your volume grows.",
    icon: Database,
    deliverables: [
      "Relational & non-relational database architecture (Postgres, Supabase, Azure)",
      "SQL query profiling, indexing strategies, and latency reduction",
      "High-throughput caching tiers with Redis",
      "Automated backup, replication, and disaster recovery strategies",
      "Data migration, schema refactoring, and zero-downtime upgrades",
    ],
    tech: ["PostgreSQL", "Supabase", "SQL Server", "Redis", "Azure SQL"],
    caseStudy: {
      name: "JewelIgnite & LoveDoner Database",
      description: "Real-time transactional storage and inventory management under high concurrent load.",
      link: "/projects",
    },
  },
  {
    id: "analytics-bi",
    title: "Data Analytics & Business Intelligence",
    summary:
      "Transforming fragmented databases into clean executive dashboards, KPI monitors, and actionable business insights.",
    icon: BarChart3,
    deliverables: [
      "Interactive executive dashboards with Power BI",
      "Custom business intelligence reporting pipelines",
      "Real-time operational telemetry and alert triggers",
      "Data warehouse aggregation and ETL processing",
      "Customer lifetime value, retention, and funnel analytics",
    ],
    tech: ["Power BI", "SQL", "Python Pandas", "DAX", "Data Studio"],
    caseStudy: {
      name: "Enterprise Business Analytics",
      description: "Multi-branch franchise revenue and inventory reconciliation dashboards.",
      link: "/projects",
    },
  },
];

const lifecycleSteps = [
  {
    step: "01",
    title: "Discovery & Architecture",
    text: "We deep-dive into your requirements, map system architecture, design database schemas, and define milestones before writing code.",
    icon: Compass,
  },
  {
    step: "02",
    title: "Interactive Prototyping",
    text: "Rapid interactive wireframes and API contract definitions ensure design alignment and clarify technical feasibility upfront.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Agile Development Sprints",
    text: "Two-week iteration cycles with weekly progress demos, continuous Git integration, and direct communication on WhatsApp/Slack.",
    icon: Cpu,
  },
  {
    step: "04",
    title: "Stress Testing & Security QA",
    text: "Rigorous load testing, edge-case fuzzing, automated unit tests, and cross-device browser verification ensure rock-solid stability.",
    icon: ShieldCheck,
  },
  {
    step: "05",
    title: "Production Launch & Care",
    text: "Zero-downtime cloud provisioning, CI/CD pipeline setup, full source code handover, and ongoing SLA maintenance.",
    icon: Clock,
  },
];

const faqs = [
  {
    q: "How quickly can The CodeRoom kick off a new project?",
    a: "We usually begin architecture discovery and sprint planning within 3 to 5 business days following an initial consultation.",
  },
  {
    q: "Do we retain full ownership of the source code?",
    a: "Yes, 100%. All source code, database schemas, deployment scripts, and IP are completely transferred to your organization upon project completion.",
  },
  {
    q: "Can you integrate with our existing stack and legacy databases?",
    a: "Absolutely. We routinely modernize legacy backends, integrate with external APIs, and connect custom software to pre-existing ERPs or SQL databases.",
  },
  {
    q: "What level of ongoing support do you provide after launch?",
    a: "We offer tailored post-launch maintenance, monitoring, feature expansions, and bug-fix SLAs to keep your software performing at its peak.",
  },
];

function ServicesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <PageShell>
      {/* Services Hero Header */}
      <section className="relative isolate overflow-hidden pb-16 pt-28 md:pb-24 md:pt-40">
        <AmbientBackground variant="hero" />

        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Our Capabilities</span>
            <h1 className="t-hero mt-4">
              Comprehensive engineering across <span className="text-gradient">software, AI and data.</span>
            </h1>
            <p className="t-lead mt-6">
              From applied vector search and machine learning to custom full-stack enterprise platforms,
              we design and ship end-to-end solutions that elevate how you operate.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn btn-primary">
                <Sparkles className="h-4 w-4" />
                Schedule a Consultation
              </Link>
              <Link to="/projects" className="btn btn-outline">
                See Live Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deep-Dive Services Breakdown */}
      <section className="section bg-surface/50">
        <div className="shell space-y-12">
          {serviceDetails.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 === 1;

            return (
              <Reveal key={service.id}>
                <div
                  id={service.id}
                  className={`card card-hover group relative overflow-hidden p-8 sm:p-10 lg:p-12 ${
                    index === 0 ? "glow-border" : ""
                  }`}
                >
                  <div
                    className={`grid gap-8 lg:grid-cols-12 lg:items-center ${
                      isReversed ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Main Description */}
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="font-mono-tech text-xs font-semibold uppercase tracking-wider text-primary">
                          Service 0{index + 1}
                        </span>
                      </div>

                      <h2 className="t-h2 mt-4 text-2xl sm:text-3xl font-extrabold">{service.title}</h2>
                      <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                        {service.summary}
                      </p>

                      <div className="mt-6">
                        <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                          Key Deliverables
                        </h4>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {service.deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/85">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Pills */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {service.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border bg-card px-3 py-1 font-mono-tech text-xs font-semibold text-muted-foreground shadow-xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sidebar / Case Sample */}
                    <div className="lg:col-span-5">
                      <div className="rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur-xs">
                        <span className="font-mono-tech text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Applied Example
                        </span>
                        <h4 className="mt-2 font-display text-lg font-bold text-foreground">
                          {service.caseStudy.name}
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          {service.caseStudy.description}
                        </p>

                        <div className="mt-6 flex flex-col gap-2.5">
                          <Link to="/contact" className="btn btn-primary btn-sm justify-between">
                            <span>Discuss {service.title}</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                          <Link to="/projects" className="btn btn-outline btn-sm justify-between">
                            <span>Explore Live Work</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 5-Phase Development Lifecycle */}
      <section className="section bg-surface/30">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our Methodology</span>
            <h2 className="t-h2 mt-3">From idea to battle-tested software</h2>
            <p className="t-lead mt-3">
              A disciplined, transparent delivery framework engineered for speed and reliability.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {lifecycleSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <Reveal key={step.step} delay={idx * 90}>
                  <div className="card card-hover group relative flex h-full flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tech text-sm font-extrabold text-primary">
                          {step.step}
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary transition-transform group-hover:scale-110">
                          <StepIcon className="h-4 w-4" />
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-base font-bold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {step.text}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/70 flex items-center gap-1.5 text-[0.6875rem] font-mono-tech text-primary font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>Stage Verified</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service FAQs */}
      <section className="section bg-surface/50">
        <div className="shell max-w-3xl">
          <div className="text-center">
            <span className="eyebrow">Frequently Asked</span>
            <h2 className="t-h2 mt-3">Questions about our services</h2>
            <p className="t-lead mt-3">
              Everything you need to know about working with The CodeRoom.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => {
              const open = activeFaq === index;
              return (
                <Reveal key={faq.q} delay={index * 60}>
                  <div className="card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(open ? null : index)}
                      className="flex w-full items-center justify-between p-6 text-left font-display font-bold text-foreground transition-colors hover:text-primary"
                    >
                      <span className="text-base sm:text-lg">{faq.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                          open ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    {open && (
                      <div className="border-t border-border px-6 pb-6 pt-3 text-sm text-muted-foreground leading-relaxed animate-rise">
                        {faq.a}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to build your solution with The CodeRoom?"
        description="Share your specifications with us and receive an architecture breakdown and delivery roadmap."
      />
    </PageShell>
  );
}
