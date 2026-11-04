import { Brain, Code2, BarChart3, Database, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const pillars = [
  { icon: Code2, label: "Web applications" },
  { icon: Brain, label: "AI-powered systems" },
  { icon: BarChart3, label: "Business technology" },
  { icon: Database, label: "Software solutions" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About The CodeRoom"
            title="A software team focused on practical solutions."
            description="We bridge software engineering, applied artificial intelligence, and cloud architecture to solve high-stakes challenges."
          />
          <div className="mt-6">
            <Link to="/about" className="btn btn-outline">
              Learn More About Our Team <ArrowRight className="arrow h-4 w-4" />
            </Link>
          </div>
        </div>

        <div>
          <Reveal delay={100}>
            <p className="t-lead">
              The CodeRoom develops software solutions, web applications, AI-powered systems and
              business technology. We work across the stack, from databases and APIs to interfaces
              and analytics, so a project can stay with one team from idea to launch.
            </p>
          </Reveal>
          <ul className="mt-8 grid grid-cols-2 gap-3">
            {pillars.map(({ icon: Icon, label }, i) => (
              <Reveal as="li" key={label} delay={150 + i * 80}>
                <div className="card card-hover flex h-full items-center gap-3 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-bold leading-snug">{label}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
