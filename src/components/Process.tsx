import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "Deep audits, model selection, cost modeling, and a technical north star. Two weeks, no fluff.",
  },
  {
    n: "02",
    title: "Prototype",
    body: "Working demo in your hands within 14 days. Real data, real inference, real users testing it.",
  },
  {
    n: "03",
    title: "Deploy",
    body: "Production-grade infra: observability, evals, guardrails. We stay on until it prints revenue.",
  },
  {
    n: "04",
    title: "Evolve",
    body: "Ongoing model retraining, agent orchestration and interface iteration as your usage scales.",
  },
];

export function Process() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-grid", start: "top 75%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative border-t border-border py-32 md:py-48 grid-bg"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-20 max-w-3xl">
          <div className="label mb-6">How we work</div>
          <h2 className="font-display text-5xl font-medium tracking-tightest md:text-7xl">
            A four-phase pipeline from <span className="text-outline">idea</span> to
            production intelligence.
          </h2>
        </div>

        <div className="process-grid grid gap-px bg-border md:grid-cols-4">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="process-card group relative flex flex-col justify-between gap-8 bg-background p-8 md:p-10 min-h-[340px] transition-colors hover:bg-card"
            >
              <div className="font-mono-tech text-xs text-muted-foreground">
                {s.n} — {STEPS.length.toString().padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-display text-4xl font-medium tracking-tightest mb-4">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </div>
              <div className="h-px w-full bg-border transition-all duration-500 group-hover:bg-foreground" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
