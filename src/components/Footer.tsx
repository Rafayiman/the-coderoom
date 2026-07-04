export function Footer() {
  return (
    <footer className="relative border-t border-border py-16 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col gap-16">
          <div className="font-display text-[clamp(4rem,18vw,20rem)] leading-[0.8] tracking-tightest">
            thecoderoom
          </div>
          <div className="grid gap-8 md:grid-cols-4 border-t border-border pt-8">
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Studio
              </div>
              <div className="text-sm">Brooklyn / Remote</div>
              <div className="text-sm text-muted-foreground">Est. 2024</div>
            </div>
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Contact
              </div>
              <a href="mailto:hello@thecoderoom.ai" className="text-sm block hover:underline">
                hello@thecoderoom.ai
              </a>
              <div className="text-sm text-muted-foreground">+1 (415) 555-0123</div>
            </div>
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Social
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <a href="#" className="hover:underline">Twitter / X</a>
                <a href="#" className="hover:underline">GitHub</a>
                <a href="#" className="hover:underline">LinkedIn</a>
              </div>
            </div>
            <div className="md:text-right">
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Status
              </div>
              <div className="flex md:justify-end items-center gap-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Accepting Q1 2026 engagements
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <div>© MMXXVI thecoderoom — All rights reserved.</div>
            <div>Crafted with GSAP · Three.js · Lenis</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
