import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "@tanstack/react-router";
import { HeroCanvas } from "./HeroCanvas";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 120,
        duration: 1.3,
        stagger: 0.09,
        ease: "expo.out",
        delay: 0.3,
      });
      gsap.from(".hero-meta", {
        opacity: 0,
        y: 16,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 1.1,
      });
      gsap.from(".hero-canvas", {
        opacity: 0,
        duration: 2.4,
        ease: "expo.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div className="hero-canvas absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64 bg-gradient-to-b from-transparent to-background" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-[1600px] flex-col justify-between px-6 pb-16 pt-32 md:px-10 md:pt-40">
        <div className="my-auto max-w-[1400px]">
          <h1 className="font-display font-medium leading-[0.86] tracking-tightest text-[clamp(3.5rem,13vw,13rem)]">
            <div className="overflow-hidden">
              <div className="hero-line">We engineer</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line text-outline">intelligent</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line">
                interfaces<span className="blink">_</span>
              </div>
            </div>
          </h1>
        </div>

        <div className="hero-meta mt-16 grid grid-cols-2 items-end gap-6 md:grid-cols-3">
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:col-span-1">
            A studio building AI-native products, autonomous agents and
            experiential web systems.
          </p>
          <div className="hidden md:flex flex-col items-center gap-3">
            <div className="h-14 w-px bg-gradient-to-b from-transparent via-foreground to-transparent" />
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              Scroll
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Link to="/work" className="btn-ghost-tech">
              View Work
            </Link>
            <Link to="/book" className="btn-solid-tech">
              Book a Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
