import { Check, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { services } from "@/config/services";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section bg-surface">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="services-title"
            eyebrow="Our Services"
            title="What we build"
            description="Five core areas of work, covering the full path from raw data to an enterprise-grade product."
          />
          <Reveal delay={100}>
            <Link to="/services" className="btn btn-primary shrink-0">
              View All Services & Process <ArrowRight className="arrow h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {services.map(({ id, title, summary, icon: Icon, items }, i) => (
            <Reveal
              as="li"
              key={id}
              delay={(i % 3) * 90}
              className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}
            >
              <article className="card card-hover group relative h-full overflow-hidden p-6 sm:p-7">
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-mint transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-x-100" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-all duration-500 group-hover:rotate-[-6deg] group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="t-h3 mt-5">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{summary}</p>
                <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                  {items.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
