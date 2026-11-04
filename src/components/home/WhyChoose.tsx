import { Blocks, Layers, Sparkles, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const reasons = [
  {
    icon: Sparkles,
    title: "Practical solutions",
    text: "We build software around how your business actually works.",
  },
  {
    icon: Layers,
    title: "Clean engineering",
    text: "Readable, maintainable code and sensible architecture.",
  },
  {
    icon: Blocks,
    title: "Broad capability",
    text: "AI, web development, databases and analytics under one roof.",
  },
  {
    icon: ExternalLink,
    title: "Real, live work",
    text: "Our projects are running applications you can open and try.",
  },
];

export function WhyChoose() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="section bg-surface">
      <div className="shell">
        <SectionHeading
          id="why-title"
          eyebrow="Why The CodeRoom"
          title="Thoughtful engineering, plainly delivered"
          align="center"
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 80}>
              <div className="card card-hover h-full p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="t-h3 mt-5">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
