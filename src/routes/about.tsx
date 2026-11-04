import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Brain,
  Code2,
  Database,
  BarChart3,
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
  ArrowRight,
  Workflow,
  CheckCircle2,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/shared/Reveal";
import { AmbientBackground } from "@/components/shared/AmbientBackground";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { CountUp } from "@/components/shared/CountUp";
import { pageMeta } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About Us",
      "Learn about The CodeRoom: our software engineering team, philosophy, milestones, and how we build AI and web solutions.",
      "/about",
    ),
  component: AboutPage,
});

const values = [
  {
    icon: Zap,
    title: "Pragmatic Architecture",
    description:
      "We avoid over-engineering. We pick proven, high-performance tech stacks that run fast, scale seamlessly, and are easy to maintain.",
  },
  {
    icon: Brain,
    title: "Applied AI with Real Value",
    description:
      "We treat artificial intelligence as a practical tool for automation, RAG search, and insight — not just an empty buzzword.",
  },
  {
    icon: ShieldCheck,
    title: "Code You Truly Own",
    description:
      "Every line of code is clean, documented, and fully owned by you. No vendor lock-in or obfuscated layers.",
  },
  {
    icon: Target,
    title: "Engineering Speed & Ownership",
    description:
      "Work directly with senior developers who understand business realities. Rapid sprints, direct Slack/WhatsApp updates, zero fluff.",
  },
];

const milestones = [
  {
    year: "2023",
    title: "The CodeRoom Founded",
    description:
      "Formed by engineers passionate about full-stack web platforms, clean databases, and high-performance custom business systems.",
    badge: "Origin",
  },
  {
    year: "2024",
    title: "Applied AI & Vector Search",
    description:
      "Pioneered enterprise document search with RAG pipelines, autonomous scrapers, and predictive machine learning models.",
    badge: "AI Evolution",
  },
  {
    year: "2025",
    title: "Multi-Tenant Enterprise Platforms",
    description:
      "Shipped LoveDoner POS, Blueprint Manager AEC platform, and TradeCrawler, scaling to tens of thousands of requests daily.",
    badge: "Scale",
  },
  {
    year: "2026",
    title: "Autonomous Systems & Cloud Expansion",
    description:
      "Delivering end-to-end intelligent applications with deep domain expertise across global e-commerce, legal tech, and logistics.",
    badge: "Current Milestone",
  },
];

const capabilities = [
  {
    category: "Frontend Engineering",
    icon: Code2,
    items: ["React & Next.js", "Angular", "TanStack Suite", "Tailwind CSS", "TypeScript", "Responsive UI/UX"],
  },
  {
    category: "Backend & Systems",
    icon: Workflow,
    items: [".NET 9 / C#", "Node.js & Express", "Python FastAPI", "RESTful & GraphQL APIs", "Microservices", "Docker"],
  },
  {
    category: "AI, ML & NLP",
    icon: Brain,
    items: ["RAG Systems", "Vector Embeddings", "PyTorch Models", "Computer Vision", "LLM Fine-tuning", "Autonomous Agents"],
  },
  {
    category: "Databases & Data",
    icon: Database,
    items: ["PostgreSQL & Supabase", "SQL Server Optimization", "Qdrant Vector DB", "Redis Caching", "Power BI Dashboards"],
  },
];

function AboutPage() {
  return (
    <PageShell>
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden pb-16 pt-28 md:pb-24 md:pt-40">
        <AmbientBackground variant="hero" />

        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">About The CodeRoom</span>
            <h1 className="t-hero mt-4">
              Building software that solves <span className="text-gradient">real business problems.</span>
            </h1>
            <p className="t-lead mt-6">
              We are a dedicated software development company crafting high-impact web applications,
              intelligent AI workflows, and bulletproof data infrastructure for ambitious businesses worldwide.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn btn-primary">
                <Sparkles className="h-4 w-4" />
                Work With Us <ArrowRight className="arrow h-4 w-4" />
              </Link>
              <Link to="/projects" className="btn btn-outline">
                Explore Our Portfolio
              </Link>
            </div>
          </div>

          {/* Quick Counter Banner */}
          <div className="mt-16 grid grid-cols-2 gap-4 rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur-sm sm:grid-cols-4 sm:p-8">
            <div className="text-center">
              <div className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">
                <CountUp end={15} suffix="+" />
              </div>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Production Sites
              </p>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
                <CountUp end={100} suffix="%" />
              </div>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                On-Time Delivery
              </p>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">
                <CountUp end={5} suffix="+" />
              </div>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Specialized Domains
              </p>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
                <CountUp end={99} suffix=".9%" />
              </div>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                SLA Reliability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy / Values */}
      <section className="section bg-surface/40">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our Philosophy</span>
            <h2 className="t-h2 mt-3">How we think and build</h2>
            <p className="t-lead mt-3">
              Software engineering is about longevity, security, and measurable outcomes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 80}>
                  <div className="card card-hover group relative flex h-full flex-col p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="t-h3 mt-5">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Timeline & Milestones */}
      <section className="section bg-surface/30">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our Journey</span>
            <h2 className="t-h2 mt-3">Milestones along the way</h2>
            <p className="t-lead mt-3">
              From our first deployed web portals to enterprise AI pipelines and high-throughput databases.
            </p>
          </div>

          <div className="relative mt-16 max-w-3xl mx-auto">
            {/* Center animated laser line */}
            <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-border sm:left-1/2 sm:-translate-x-1/2">
              <div className="animate-laser absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary to-transparent" />
            </div>

            <div className="space-y-10">
              {milestones.map((m, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <Reveal key={m.year} delay={idx * 120}>
                    <div
                      className={`relative flex flex-col gap-4 pl-14 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-12 items-center ${
                        isEven ? "" : "sm:direction-rtl"
                      }`}
                    >
                      {/* Node point */}
                      <div className="absolute left-6 -translate-x-1/2 sm:left-1/2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-card shadow-soft">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary pulse-dot" />
                      </div>

                      {/* Content Card */}
                      <div className={`w-full ${isEven ? "sm:text-right sm:pr-8" : "sm:col-start-2 sm:pl-8"}`}>
                        <div className="card card-hover p-6">
                          <div className="flex items-center gap-2 mb-2 sm:justify-start">
                            <span className="font-mono-tech text-xs font-bold text-primary px-2.5 py-0.5 rounded-md bg-primary-soft">
                              {m.year}
                            </span>
                            <span className="text-xs font-semibold text-muted-foreground">
                              {m.badge}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground">{m.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {m.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Matrix */}
      <section className="section bg-surface/60">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our Stack</span>
            <h2 className="t-h2 mt-3">Full-stack & AI ecosystem</h2>
            <p className="t-lead mt-3">
              We leverage modern, battle-tested tools across every tier of the application stack.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.category} delay={i * 80}>
                  <div className="card card-hover h-full p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-bold text-foreground text-sm">{c.category}</h3>
                    </div>
                    <ul className="mt-5 space-y-2 border-t border-border pt-4">
                      {c.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to partner with an engineering team that delivers?"
        description="Let's build your next web application, AI system or business software solution."
      />
    </PageShell>
  );
}
