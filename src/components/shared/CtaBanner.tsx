import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { whatsappUrl } from "@/config/site";

interface CtaBannerProps {
  title?: string;
  description?: string;
}

export function CtaBanner({
  title = "Ready to turn your vision into production software?",
  description = "Speak directly with our engineering team to map out architecture, timeline, and estimates.",
}: CtaBannerProps) {
  return (
    <section className="section overflow-hidden bg-background">
      <div className="shell">
        <Reveal>
          <div className="glow-border relative isolate overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface via-card to-primary-soft/20 p-8 sm:p-12 md:p-16">
            {/* Ambient moving gradient orbs */}
            <div className="animate-blob absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
            <div className="animate-blob-delayed absolute -bottom-20 -left-20 -z-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-xl">
                <span className="eyebrow">Start Your Project</span>
                <h2 className="t-h2 mt-4 text-foreground">{title}</h2>
                <p className="t-lead mt-3">{description}</p>
              </div>

              <div className="flex flex-col gap-3.5 sm:flex-row">
                <Link to="/contact" className="btn btn-primary">
                  <Sparkles className="h-4 w-4" />
                  Request a Proposal <ArrowRight className="arrow h-4 w-4" />
                </Link>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
