import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { site, mailto, whatsappUrl } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Link to="/" className="group inline-block" aria-label={`${site.name} home`}>
            <Logo />
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Web applications, AI-powered systems, data analytics and automation for businesses.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono-tech text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Explore
          </h2>
          <ul className="mt-4 space-y-2.5">
            {site.nav.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono-tech text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Contact
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={mailto()}
                className="inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" /> {site.contact.email}
              </a>
            </li>
            {site.contact.phones.map((p) => (
              <li key={p.tel}>
                <a
                  href={`tel:${p.tel}`}
                  className="inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 text-primary" /> {p.display}
                </a>
              </li>
            ))}
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-whatsapp"
              >
                <MessageCircle className="h-4 w-4 text-whatsapp" /> Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="shell flex flex-col gap-1 py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
