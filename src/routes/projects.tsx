import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { Reveal } from "@/components/shared/Reveal";
import { AmbientBackground } from "@/components/shared/AmbientBackground";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { pageMeta } from "@/config/site";
import { projects } from "@/config/projects";

export const Route = createFileRoute("/projects")({
  head: () =>
    pageMeta(
      "Projects",
      "Live projects built by The CodeRoom: AI and machine learning, business software, web platforms and e-commerce.",
      "/projects",
    ),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <PageShell>
      <section
        aria-labelledby="projects-page-title"
        className="relative isolate overflow-hidden pb-20 pt-28 md:pb-28 md:pt-40"
      >
        <AmbientBackground variant="hero" />

        <div className="shell">
          <div className="animate-rise max-w-2xl">
            <span className="eyebrow">Production Portfolio</span>
            <h1 id="projects-page-title" className="t-hero mt-4 !text-[clamp(2.25rem,5vw,3.5rem)]">
              All projects
            </h1>
            <p className="t-lead mt-4">
              {projects.length} live applications deployed across AI, business software, web platforms and
              e-commerce. Click any project to open the running application.
            </p>
          </div>

          <div className="mt-12">
            <ProjectsExplorer />
          </div>

          <div className="mt-16">
            <CtaBanner
              title="Have an application idea you want to build?"
              description="From single-page web apps to multi-tenant AI backends, our engineers will turn your idea into reality."
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
