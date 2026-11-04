import { useState, useEffect } from "react";
import { ArrowRight, Brain, Code2, BarChart3, Database, Workflow, Play, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/shared/AmbientBackground";

type CodeFile = {
  name: string;
  lang: string;
  lines: { text: string; color: string }[];
  tag: string;
};

const codeFiles: CodeFile[] = [
  {
    name: "coderoom.ts",
    lang: "TypeScript",
    tag: "Full-Stack Core",
    lines: [
      { text: "// The CodeRoom Software Engine", color: "text-slate-400 italic" },
      { text: "export const team = {", color: "text-indigo-600 font-semibold" },
      { text: '  mission: "Enterprise Software & AI",', color: "text-emerald-600" },
      { text: '  capabilities: ["Web", "AI", "Cloud", "Data"],', color: "text-teal-600" },
      { text: "  deliveredProjects: 15,", color: "text-amber-600" },
      { text: "  slaGuarantee: 99.9,", color: "text-amber-600" },
      { text: "  readyToDeploy: true,", color: "text-indigo-600" },
      { text: "};", color: "text-indigo-600 font-semibold" },
    ],
  },
  {
    name: "ai_pipeline.py",
    lang: "Python",
    tag: "Applied AI & RAG",
    lines: [
      { text: "# Vector Retrieval & Autonomous Agent", color: "text-slate-400 italic" },
      { text: "from coderoom.ai import AgentEngine, RAGPipeline", color: "text-indigo-600" },
      { text: "agent = AgentEngine(model='deepseek-v3', temp=0.2)", color: "text-foreground" },
      { text: "retriever = RAGPipeline.load_embeddings('qdrant')", color: "text-teal-600" },
      { text: "response = agent.synthesize(query=user_prompt)", color: "text-foreground" },
      { text: "print(f'Done in {response.latency_ms}ms')", color: "text-emerald-600" },
    ],
  },
  {
    name: "metrics.sql",
    lang: "SQL",
    tag: "High-Throughput DB",
    lines: [
      { text: "-- Telemetry & Real-time Aggregation", color: "text-slate-400 italic" },
      { text: "SELECT client_id, avg_response_time,", color: "text-indigo-600" },
      { text: "       COUNT(*) FILTER (WHERE success) AS success_rate", color: "text-foreground" },
      { text: "FROM enterprise_audit_stream", color: "text-teal-600" },
      { text: "WHERE timestamp >= NOW() - INTERVAL '24h'", color: "text-foreground" },
      { text: "GROUP BY 1 HAVING COUNT(*) > 10000;", color: "text-indigo-600 font-semibold" },
    ],
  },
];

const chips = [
  { icon: Brain, label: "AI & ML", cls: "-top-9 left-6", delay: 0 },
  { icon: Code2, label: "Web Apps", cls: "top-24 -right-4 sm:-right-8", delay: 800 },
  { icon: BarChart3, label: "Analytics & BI", cls: "-top-7 right-4", delay: 1600 },
  { icon: Database, label: "Database", cls: "bottom-16 -right-4 sm:-right-8", delay: 2400 },
  { icon: Workflow, label: "Automation", cls: "-bottom-6 right-10", delay: 3200 },
];

function HeroVisual() {
  const [activeTab, setActiveTab] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % codeFiles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 1200);
  };

  const current = codeFiles[activeTab];

  return (
    <div
      className="animate-rise relative mx-auto w-full max-w-[32rem] [--delay:200ms]"
      aria-hidden="true"
    >
      <div className="animate-blob absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-indigo-200/70 via-sky-100/50 to-teal-100/60 blur-2xl" />

      <div className="card overflow-hidden border-border/80 shadow-lift">
        <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>

          <div className="flex items-center gap-1">
            {codeFiles.map((file, idx) => (
              <button
                key={file.name}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`font-mono-tech rounded-md px-2.5 py-1 text-xs transition-colors ${
                  activeTab === idx
                    ? "bg-card font-semibold text-primary border border-border/80 shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {file.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleRun}
            title="Execute Code Preview"
            className="flex items-center gap-1 rounded-md bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary transition-transform active:scale-95"
          >
            <Play className={`h-3 w-3 ${isRunning ? "animate-spin text-primary" : "fill-primary"}`} />
            <span>{isRunning ? "Running" : "Run"}</span>
          </button>
        </div>

        <div className="font-mono-tech min-h-[200px] space-y-1 px-5 py-6 text-[0.8125rem] leading-7 sm:text-sm">
          {current.lines.map((line, i) => (
            <div key={`${current.name}-${i}`} className="flex items-center gap-3">
              <span className="w-5 select-none text-right text-xs text-muted-foreground/60">
                {i + 1}
              </span>
              <span className={line.color}>{line.text}</span>
            </div>
          ))}
          <div className="flex items-center gap-3 pt-1">
            <span className="w-5 select-none text-right text-xs text-muted-foreground/60">
              {current.lines.length + 1}
            </span>
            <span className="blink text-primary">|</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border bg-surface px-4 py-2.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="pulse-dot h-2 w-2 rounded-full bg-mint" />
            <span className="font-mono-tech font-medium text-foreground">{current.tag}</span>
          </div>
          <span className="font-mono-tech text-[0.6875rem] text-muted-foreground">
            status: 200 OK • latency 14ms
          </span>
        </div>
      </div>

      {chips.map(({ icon: Icon, label, cls, delay }) => (
        <div
          key={label}
          className={`animate-float absolute ${cls} hidden items-center gap-2 rounded-full border border-border/80 bg-surface/90 px-3.5 py-2 text-xs font-semibold shadow-soft backdrop-blur-md min-[460px]:flex`}
          style={{ animationDelay: `${delay}ms` }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Icon className="h-3.5 w-3.5" />
          </span>
          {label}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pb-16 pt-28 md:pb-24 md:pt-40">
      <AmbientBackground variant="hero" />

      <div className="shell grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <h1 className="t-hero animate-rise [--delay:0ms]">
            Software, AI and data solutions{" "}
            <span className="text-gradient">engineered to scale.</span>
          </h1>

          <p className="t-lead animate-rise mt-6 max-w-xl [--delay:200ms]">
            The CodeRoom is a full-cycle software company. We craft resilient web platforms,
            production-ready AI systems, automated pipelines and scalable databases.
          </p>

          <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row [--delay:300ms]">
            <Link to="/projects" className="btn btn-primary">
              Explore Our Work <ArrowRight className="arrow h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn btn-outline">
              <Sparkles className="h-4 w-4 text-primary" />
              Let&apos;s Talk
            </Link>
          </div>

          {/* Quick Metrics Trust Bar */}
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
            <div>
              <p className="font-display text-2xl font-extrabold text-foreground">15+</p>
              <p className="text-xs text-muted-foreground">Live Deployments</p>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold text-primary">99.9%</p>
              <p className="text-xs text-muted-foreground">Uptime & Reliability</p>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold text-foreground">5+</p>
              <p className="text-xs text-muted-foreground">Specialized Domains</p>
            </div>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
