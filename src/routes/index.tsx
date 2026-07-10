import { createFileRoute, Link } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "thecoderoom — AI Agency for Intelligent Interfaces" },
      {
        name: "description",
        content:
          "A compact AI studio building autonomous agents, LLM pipelines and experiential web systems.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <main className="noise relative bg-background text-foreground">
        <Navbar />
        <Hero />
        <Teaser />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

function Teaser() {
  const links = [
    { to: "/work" as const, label: "Work", sub: "Selected projects & case studies" },
    { to: "/studio" as const, label: "Studio", sub: "The team, process & principles" },
    { to: "/book" as const, label: "Book", sub: "Start a 30-min strategy call" },
  ];
  return (
    <section className="relative border-t border-border">
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className="group block border-b border-border transition-colors hover:bg-card/50"
        >
          <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-10 md:px-10 md:py-14">
            <div className="flex items-baseline gap-8">
              <span className="font-display text-4xl md:text-7xl font-medium tracking-tightest transition-transform duration-500 group-hover:translate-x-2">
                {l.label}
              </span>
              <span className="hidden md:inline font-mono-tech text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {l.sub}
              </span>
            </div>
            <span className="text-2xl transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-1">
              ↗
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
