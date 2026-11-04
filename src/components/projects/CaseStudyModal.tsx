import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  X,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Lock,
  Layers,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
} from "lucide-react";
import type { Project } from "@/config/projects";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const cs = project.caseStudy;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-rise"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 flex flex-col w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl border border-border/80 bg-[#0e1017] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)] animate-rise">
        {/* Sticky Header */}
        <div className="flex items-center justify-between border-b border-border/70 bg-[#131520] px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="tag tag-primary text-xs font-semibold">{project.category}</span>
            <div className="flex items-center gap-2">
              <span className="pulse-dot h-2 w-2 rounded-full bg-mint" />
              <span className="font-mono-tech text-xs text-muted-foreground hidden sm:inline">
                Case Study & Architecture
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Case Study"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-surface text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="hide-scrollbar overflow-y-auto p-5 sm:p-8 space-y-8">
          {/* Title & Preview Image */}
          <div>
            <h2 id="case-study-title" className="t-h2 text-2xl sm:text-3xl font-extrabold text-foreground">
              {project.name}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-lift">
              <img
                src={project.image}
                alt={`${project.name} Interface`}
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-mono-tech font-semibold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  Production Deployment
                </span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-xs font-bold text-white shadow-soft transition-transform hover:scale-105"
                >
                  Visit Live <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Enterprise Confidentiality Callout if applicable */}
          {cs?.confidentialityNote && (
            <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-200">
              <Lock className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-300">Access & Privacy Notice: </strong>
                <span>{cs.confidentialityNote}</span>
              </div>
            </div>
          )}

          {/* Key Metrics Impact Grid */}
          {cs?.metrics && cs.metrics.length > 0 && (
            <div>
              <h3 className="font-mono-tech text-xs font-semibold uppercase tracking-widest text-primary flex items-center gap-1.5 mb-3">
                <TrendingUp className="h-3.5 w-3.5" />
                Performance & Impact Results
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {cs.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-border/70 bg-surface/80 p-4 text-center backdrop-blur-xs"
                  >
                    <p className="font-display text-xl sm:text-2xl font-extrabold text-foreground">
                      {m.value}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground font-medium leading-tight">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problem Statement vs Solution */}
          {cs && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-[#12141e] p-5">
                <h4 className="font-display text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  The Business Challenge
                </h4>
                <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {cs.challenge}
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-[#12141e] p-5">
                <h4 className="font-display text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  The CodeRoom Solution
                </h4>
                <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {cs.solution}
                </p>
              </div>
            </div>
          )}

          {/* Key Features Delivered */}
          {cs?.keyFeatures && cs.keyFeatures.length > 0 && (
            <div>
              <h3 className="font-mono-tech text-xs font-semibold uppercase tracking-widest text-primary flex items-center gap-1.5 mb-3">
                <ShieldCheck className="h-3.5 w-3.5" />
                Key Engineered Capabilities
              </h3>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {cs.keyFeatures.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-surface/50 p-3 text-xs sm:text-[13px] text-foreground/90"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture & Stack */}
          <div>
            <h3 className="font-mono-tech text-xs font-semibold uppercase tracking-widest text-primary flex items-center gap-1.5 mb-3">
              <Cpu className="h-3.5 w-3.5" />
              Technical Stack & Architecture
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-surface px-3 py-1 font-mono-tech text-xs font-semibold text-foreground/80 shadow-xs"
                >
                  {item}
                </span>
              ))}
            </div>

            {cs?.architecture && (
              <div className="mt-3 rounded-xl border border-border/60 bg-surface/40 p-3.5">
                <p className="font-mono-tech text-[11px] text-muted-foreground uppercase tracking-wider mb-2">
                  System Blueprint Components:
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/80">
                  {cs.architecture.map((arch) => (
                    <span key={arch} className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {arch}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border/70 bg-[#131520] px-5 py-4 sm:px-7">
          <Link
            to="/contact"
            onClick={onClose}
            className="btn btn-primary btn-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Discuss a Similar Project
          </Link>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm flex items-center justify-center gap-2"
          >
            <span>Open Running Site</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
