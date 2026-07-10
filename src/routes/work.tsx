import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Work } from "@/components/Work";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — thecoderoom" },
      { name: "description", content: "Selected AI product, agent, and interface work by thecoderoom." },
      { property: "og:title", content: "Work — thecoderoom" },
      { property: "og:description", content: "Selected AI product, agent, and interface work." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <SmoothScroll>
      <main className="noise relative bg-background text-foreground">
        <Navbar />
        <div className="pt-32" />
        <Work />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
