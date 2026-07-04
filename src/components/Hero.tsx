import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HeroCanvas } from "./HeroCanvas";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 120,
        duration: 1.2,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.2,
      });
      gsap.from(".hero-meta", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 1,
      });
      gsap.from(".hero-canvas", {
        opacity: 0,
        scale: 1.15,
        duration: 2,
        ease: "expo.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden grid-bg"
    >
      <div className="hero-canvas absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_90%)]" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-[1600px] flex-col justify-between px-6 pb-10 pt-32 md:px-10 md:pt-40">
        {/* Meta top row */}
        <div className="hero-meta flex justify-between font-mono-tech text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>[ 01 ] // Ai_Agency</span>
          <span className="hidden md:inline">EST — MMXXIV</span>
          <span>N 40.7° / W 74.0°</span>
        </div>

        {/* Headline */}
        <div className="my-auto">
          <div className="hero-meta font-mono-tech text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
            <span className="inline-block h-1.5 w-1.5 mr-3 bg-foreground align-middle" />
            AI-first digital atelier
          </div>
          <h1 className="font-display font-medium leading-[0.85] tracking-tightest text-[clamp(3.5rem,13vw,13rem)]">
            <div className="overflow-hidden">
              <div className="hero-line">We engineer</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line text-outline">intelligent</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line">interfaces<span className="blink text-foreground">_</span></div>
            </div>
          </h1>
        </div>

        {/* Bottom row */}
        <div className="hero-meta mt-16 grid grid-cols-2 items-end gap-6 md:grid-cols-3">
          <p className="max-w-sm font-mono-tech text-xs leading-relaxed text-muted-foreground md:col-span-1">
            A studio building AI-native products, autonomous agents and
            experiential web systems for founders who move fast.
          </p>
          <div className="hidden md:block text-center">
            <div className="mx-auto h-16 w-px bg-border" />
            <div className="mt-3 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Scroll
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <a href="#work" className="btn-ghost-tech">
              View Work
            </a>
            <a href="#book" className="btn-solid-tech">
              Book Call →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
