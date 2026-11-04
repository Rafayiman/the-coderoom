import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CaseStudyModal } from "@/components/projects/CaseStudyModal";
import { projects, type Project } from "@/config/projects";

export function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="projects-title"
            eyebrow="Our Work"
            title="Featured Case Studies & Work"
            description="Explore our production deployments. Open any project to view architectural case studies, problem breakdowns, and live interfaces."
          />
          <Reveal delay={100}>
            <Link to="/projects" className="btn btn-outline shrink-0">
              View All Projects <ArrowRight className="arrow h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              delay={(i % 3) * 90}
              onOpenCaseStudy={setActiveProject}
            />
          ))}
        </ul>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
