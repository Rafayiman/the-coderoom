import { useState } from "react";
import { Search, X } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { CaseStudyModal } from "./CaseStudyModal";
import { projectCategories, projects, type ProjectCategory, type Project } from "@/config/projects";

type Filter = "All" | ProjectCategory;

export function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filters: Filter[] = ["All", ...projectCategories];

  const visible = projects.filter((p) => {
    const matchesCategory = filter === "All" || p.category === filter;
    const matchesSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Category Pills */}
        <div
          role="group"
          aria-label="Filter projects by category"
          className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {filters.map((f) => {
            const count =
              f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-300 ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {f}{" "}
                <span className={active ? "opacity-90 font-mono-tech" : "opacity-60 font-mono-tech"}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects or stack..."
            className="field pl-9.5 pr-8 py-2 text-sm rounded-full"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {visible.length === 0 ? (
        <div className="card mt-10 p-12 text-center">
          <p className="text-base font-semibold text-foreground">
            No projects found matching your criteria
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try clearing your search keyword or switching categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setSearch("");
            }}
            className="btn btn-outline btn-sm mt-4"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <ul
          key={`${filter}-${search}`}
          aria-live="polite"
          className="animate-rise mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              delay={(i % 3) * 80}
              onOpenCaseStudy={setActiveProject}
            />
          ))}
        </ul>
      )}

      {/* Case Study Popup Modal */}
      <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
