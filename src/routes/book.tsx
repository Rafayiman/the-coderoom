import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Book } from "@/components/Book";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a call — thecoderoom" },
      { name: "description", content: "Book a 30-minute strategy call with thecoderoom." },
      { property: "og:title", content: "Book a call — thecoderoom" },
      { property: "og:description", content: "Book a 30-minute strategy call." },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <SmoothScroll>
      <main className="noise relative bg-background text-foreground">
        <Navbar />
        <div className="pt-32" />
        <Book />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
