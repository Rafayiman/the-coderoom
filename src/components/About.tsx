import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { v: "40+", l: "Shipped systems" },
  { v: "12", l: "Enterprise clients" },
  { v: "$180M", l: "Client revenue impacted" },
  { v: "8", l: "Time zones covered" },
];

export function About() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".about-word");
      gsap.from(words, {
        opacity: 0.15,
        stagger: 0.03,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-copy",
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      gsap.from(".stat", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stats", start: "top 80%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const copy =
    "thecoderoom is a compact, senior team of AI engineers, product designers and creative technologists. We take a small number of engagements each quarter — pairing frontier models with taste-driven interfaces to build things people actually want to use.";

  return (
    <section
      id="about"
      ref={rootRef}
      className="relative border-t border-border py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              [ 04 ] The Studio
            </div>
            <h2 className="font-display text-5xl font-medium tracking-tightest">
              Small team. <br />
              <span className="text-outline">Loud output.</span>
            </h2>
          </div>

          <p className="about-copy md:col-span-8 font-display text-3xl md:text-5xl leading-[1.15] tracking-tightest">
            {copy.split(" ").map((w, i) => (
              <span key={i} className="about-word inline-block mr-3">
                {w}
              </span>
            ))}
          </p>
        </div>

        <div className="stats mt-32 grid grid-cols-2 gap-px bg-border md:grid-cols-4 border border-border">
          {STATS.map((s) => (
            <div key={s.l} className="stat bg-background p-8 md:p-10">
              <div className="font-display text-5xl md:text-6xl font-medium tracking-tightest">
                {s.v}
              </div>
              <div className="mt-2 font-mono-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
