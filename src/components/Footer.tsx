import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-16 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col gap-16">
          <Link to="/" className="block font-display text-[clamp(4rem,18vw,20rem)] leading-[0.8] tracking-tightest hover:opacity-90 transition-opacity">
            thecoderoom
          </Link>
          <div className="grid gap-8 md:grid-cols-4 border-t border-border pt-8">
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Studio
              </div>
              <div className="text-sm">Brooklyn / Remote</div>
            </div>
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Contact
              </div>
              <a href="mailto:hello@thecoderoom.ai" className="text-sm block hover:underline">
                hello@thecoderoom.ai
              </a>
            </div>
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Social
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <a href="#" className="hover:underline">Twitter</a>
                <a href="#" className="hover:underline">GitHub</a>
                <a href="#" className="hover:underline">LinkedIn</a>
              </div>
            </div>
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Navigate
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <Link to="/work" className="hover:underline">Work</Link>
                <Link to="/studio" className="hover:underline">Studio</Link>
                <Link to="/book" className="hover:underline">Book</Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <div>© 2026 thecoderoom</div>
            <div>Crafted in Brooklyn</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
