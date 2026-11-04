import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const reviews = [
  {
    quote:
      "The CodeRoom built BinderDocs with cutting-edge RAG search and document automation. The speed and quality of delivery blew our team away.",
    author: "Enterprise Legal Tech Client",
    role: "BinderDocs Project",
    rating: 5,
  },
  {
    quote:
      "Blueprint Manager coordinates complex AEC Gantt charts and Kanban boards flawlessly. Our project managers rely on it every single day.",
    author: "Architecture & Engineering Lead",
    role: "Blueprint Manager",
    rating: 5,
  },
  {
    quote:
      "Deploying LoveDoner POS across multi-branch franchises was smooth. Real-time kitchen and inventory sync has streamlined our operations.",
    author: "Franchise Operations Director",
    role: "LoveDoner POS",
    rating: 5,
  },
  {
    quote:
      "TradeCrawler revolutionized our B2B buyer discovery. Automated scraping, data extraction and AI analysis cut our lead time by 80%.",
    author: "Global Supply Partner",
    role: "TradeCrawler Intelligence",
    rating: 5,
  },
];

export function ClientTestimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="section bg-surface/50">
      <div className="shell">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Client Impact"
          title="Engineered for real-world reliability"
          description="Hear from teams that rely on applications engineered and maintained by The CodeRoom."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {reviews.map((r, idx) => (
            <Reveal key={r.author} delay={idx * 100}>
              <div className="card card-hover group relative flex h-full flex-col justify-between p-7">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-primary/30 transition-transform group-hover:scale-110" />
                </div>

                <p className="mt-5 text-base leading-relaxed text-foreground/90">&ldquo;{r.quote}&rdquo;</p>

                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-display font-bold text-foreground">{r.author}</p>
                  <p className="font-mono-tech text-xs text-primary">{r.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
