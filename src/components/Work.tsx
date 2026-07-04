import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  description: string;
  color: string;
};

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Nexus.ai",
    client: "Fintech Startup",
    year: "2025",
    tags: ["Multi-Agent", "RAG", "Next.js"],
    description:
      "Autonomous financial research agent processing 40k+ documents daily.",
    color: "from-neutral-800 to-neutral-950",
  },
  {
    id: "02",
    title: "Synthwave OS",
    client: "Media Collective",
    year: "2025",
    tags: ["Generative", "WebGL", "Three.js"],
    description:
      "Real-time generative visual engine for live music performances.",
    color: "from-neutral-700 to-neutral-950",
  },
  {
    id: "03",
    title: "Halcyon Voice",
    client: "Healthcare",
    year: "2024",
    tags: ["Voice AI", "LLM", "Edge"],
    description:
      "Sub-300ms voice AI for clinical intake with medical-grade accuracy.",
    color: "from-neutral-800 to-neutral-950",
  },
  {
    id: "04",
    title: "Orbit Commerce",
    client: "DTC Brand",
    year: "2024",
    tags: ["Personalization", "Vision", "Recommendation"],
    description:
      "Vision-based product discovery engine driving 3.2× conversion lift.",
    color: "from-neutral-700 to-neutral-950",
  },
];

export function Work() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-title-word", {
        yPercent: 100,
        duration: 1,
        stagger: 0.05,
        ease: "expo.out",
        scrollTrigger: { trigger: ".work-title", start: "top 80%" },
      });

      const items = gsap.utils.toArray<HTMLElement>(".project-row");
      items.forEach((item, i) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
        });
        ScrollTrigger.create({
          trigger: item,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={rootRef}
      className="relative border-t border-border py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-20 flex items-end justify-between">
          <div>
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              [ 02 ] Selected Work
            </div>
            <h2 className="work-title font-display text-6xl font-medium tracking-tightest md:text-8xl">
              <span className="inline-block overflow-hidden">
                <span className="work-title-word inline-block">Built.</span>
              </span>{" "}
              <span className="inline-block overflow-hidden">
                <span className="work-title-word inline-block text-outline">Shipped.</span>
              </span>
            </h2>
          </div>
          <div className="hidden md:block font-mono-tech text-xs text-muted-foreground">
            {String(active + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </div>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {PROJECTS.map((p, i) => (
            <a
              href="#book"
              key={p.id}
              className="project-row group relative grid grid-cols-12 items-center gap-4 py-8 md:py-10 transition-colors hover:bg-card/50"
              onMouseEnter={() => setActive(i)}
            >
              <div className="col-span-2 md:col-span-1 font-mono-tech text-xs text-muted-foreground">
                {p.id}
              </div>
              <div className="col-span-10 md:col-span-4">
                <div className="font-display text-3xl md:text-5xl font-medium tracking-tightest transition-transform duration-500 group-hover:translate-x-2">
                  {p.title}
                </div>
                <div className="mt-1 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {p.client}
                </div>
              </div>
              <div className="hidden md:block col-span-4 text-sm text-muted-foreground max-w-md">
                {p.description}
              </div>
              <div className="hidden md:flex col-span-2 flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-border px-2 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="col-span-12 md:col-span-1 flex items-center justify-end gap-3">
                <span className="font-mono-tech text-xs text-muted-foreground">
                  {p.year}
                </span>
                <span className="text-2xl transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
