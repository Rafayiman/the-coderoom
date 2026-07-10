import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — thecoderoom" },
      { name: "description", content: "Inside thecoderoom: our team, principles, and four-phase engagement process." },
      { property: "og:title", content: "Studio — thecoderoom" },
      { property: "og:description", content: "Inside the studio: team, principles, and process." },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <SmoothScroll>
      <main className="noise relative bg-background text-foreground">
        <Navbar />
        <div className="pt-32" />
        <About />
        <Process />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
