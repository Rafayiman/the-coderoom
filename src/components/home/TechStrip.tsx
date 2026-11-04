const row1 = [
  "TypeScript",
  "React",
  "Next.js",
  "TanStack",
  "Tailwind CSS",
  "Python",
  "FastAPI",
  "PyTorch",
  "PostgreSQL",
  "Supabase",
  "Azure",
  "Docker",
];

const row2 = [
  "Node.js",
  ".NET 9",
  "Angular",
  "Qdrant Vector DB",
  "LangChain",
  "Power BI",
  "GraphQL",
  "Redis",
  "REST APIs",
  "OpenAI / DeepSeek",
  "AWS",
  "Git / CI/CD",
];

export function TechStrip() {
  // Quadruple to guarantee infinite seamless loop across all display resolutions
  const fullRow1 = [...row1, ...row1, ...row1, ...row1];
  const fullRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section
      aria-label="Technologies we work with"
      className="border-y border-border bg-surface/40 py-8 overflow-hidden relative"
    >
      <div className="shell mb-5 flex items-center justify-between">
        <span className="font-mono-tech text-xs font-semibold uppercase tracking-widest text-primary flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
          Full-Stack & Applied AI Architecture
        </span>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          Continuous Integration • Enterprise Grade
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden space-y-3.5"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/* Row 1: Leftward moving */}
        <div className="flex w-full overflow-hidden">
          <div className="marquee-track-forward flex items-center gap-3">
            {fullRow1.map((t, i) => (
              <div
                key={`r1-${t}-${i}`}
                className="shrink-0 flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-xs sm:text-sm font-semibold text-foreground/85 shadow-xs transition-colors hover:border-primary hover:text-primary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Rightward moving */}
        <div className="flex w-full overflow-hidden">
          <div className="marquee-track-backward flex items-center gap-3">
            {fullRow2.map((t, i) => (
              <div
                key={`r2-${t}-${i}`}
                className="shrink-0 flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-xs sm:text-sm font-semibold text-foreground/85 shadow-xs transition-colors hover:border-primary hover:text-primary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-mint shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
