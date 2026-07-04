import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { Book } from "@/components/Book";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <main className="noise relative bg-background text-foreground">
        <Navbar />
        <Hero />
        <Marquee />
        <Work />
        <Process />
        <About />
        <Book />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
