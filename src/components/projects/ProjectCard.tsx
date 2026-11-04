import { ArrowUpRight, Sparkles, BookOpen } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import type { Project } from "@/config/projects";

interface ProjectCardProps {
  project: Project;
  delay?: number;
  onOpenCaseStudy?: (project: Project) => void;
}

export function ProjectCard({ project, delay = 0, onOpenCaseStudy }: ProjectCardProps) {
  const { name, category, description, stack, image, liveUrl } = project;

  return (
    <Reveal as="li" delay={delay} className="h-full">
      <article className="card card-hover group flex h-full flex-col overflow-hidden">
        {/* Preview image banner */}
        <div
          role={onOpenCaseStudy ? "button" : undefined}
          tabIndex={onOpenCaseStudy ? 0 : undefined}
          onClick={() => onOpenCaseStudy?.(project)}
          onKeyDown={(e) => {
            if (onOpenCaseStudy && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              onOpenCaseStudy(project);
            }
          }}
          className={`relative block aspect-[16/10] overflow-hidden border-b border-border bg-surface ${
            onOpenCaseStudy ? "cursor-pointer" : ""
          }`}
        >
          <img
            src={image}
            alt={`${name} screenshot`}
            width={1200}
            height={750}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

          {/* Quick Case Study Pill Trigger */}
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-zinc-950/85 border border-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-soft">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span>Case Study</span>
          </span>

          <span className="absolute bottom-3 right-3 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white opacity-0 shadow-soft transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            Open Details <Sparkles className="h-3 w-3" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="tag tag-primary">{category}</span>
            <span className="font-mono-tech text-[11px] text-muted-foreground flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              Production
            </span>
          </div>

          <h3 className="t-h3 mt-3">{name}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>

          {/* Dual Action Buttons */}
          <div className="mt-auto flex items-center justify-between gap-3 pt-6 border-t border-border/70">
            {onOpenCaseStudy ? (
              <button
                type="button"
                onClick={() => onOpenCaseStudy(project)}
                className="btn btn-primary btn-sm flex-1 text-xs"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Read Case Study</span>
              </button>
            ) : null}

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm text-xs px-3"
              title="Launch Live App (may require enterprise credentials)"
            >
              <span>Live Site</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
