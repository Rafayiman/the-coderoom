import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/home/Hero";
import { TechStrip } from "@/components/home/TechStrip";
import { ImpactMetrics } from "@/components/home/ImpactMetrics";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { WhyChoose } from "@/components/home/WhyChoose";
import { ClientTestimonials } from "@/components/home/ClientTestimonials";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { site, pageMeta } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => pageMeta(site.name, site.description, "/"),
  component: HomePage,
});

function HomePage() {
  return (
    <PageShell>
      <Hero />
      <TechStrip />
      <ImpactMetrics />
      <About />
      <Services />
      <FeaturedProjects />
      <WhyChoose />
      <ClientTestimonials />
      <CtaBanner />
    </PageShell>
  );
}
