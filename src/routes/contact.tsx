import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  Mail,
  MessageCircle,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  Sparkles,
  ShieldCheck,
  Check,
  Copy,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/shared/Reveal";
import { AmbientBackground } from "@/components/shared/AmbientBackground";
import { mailto, site, whatsappUrl, pageMeta } from "@/config/site";
import { services } from "@/config/services";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta(
      "Contact Us",
      "Get in touch with The CodeRoom to discuss your software, AI, web application, or database project.",
      "/contact",
    ),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().max(30, "That phone number looks too long.").optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little about your project (10+ characters).")
    .max(3000, "Please keep your message under 3000 characters."),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;
type Status = "idle" | "sending" | "success" | "error";

const budgetOptions = [
  "Under $2,500",
  "$2,500 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Flexible / Undecided",
];

function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(site.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("_honey")) return;

    const parsed = schema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone") || undefined,
      service: selectedService || data.get("service") || undefined,
      budget: selectedBudget || undefined,
      message: data.get("message"),
    });

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        next[key] ??= issue.message;
      }
      setErrors(next);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("sending");
    const v = parsed.data;

    try {
      const res = await fetch(site.contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: v.name,
          email: v.email,
          phone: v.phone ?? "Not provided",
          service: v.service ?? "Not specified",
          budget: v.budget ?? "Not specified",
          message: v.message,
          _subject: `New Project Enquiry from ${v.name} | The CodeRoom`,
          _replyto: v.email,
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.success === "false" || json?.success === false)
        throw new Error("failed");
      setStatus("success");
      form.reset();
      setSelectedService("");
      setSelectedBudget("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <PageShell>
      {/* Header */}
      <section className="relative isolate overflow-hidden pb-12 pt-28 md:pb-16 md:pt-40">
        <AmbientBackground variant="hero" />

        <div className="shell text-center">
          <span className="eyebrow">Get In Touch</span>
          <h1 className="t-hero mt-4">
            Let&apos;s build something <span className="text-gradient">exceptional together.</span>
          </h1>
          <p className="t-lead mx-auto mt-4 max-w-2xl">
            Have a project in mind, need technical consultancy, or want to discuss an AI integration?
            Reach out and let&apos;s talk specifics.
          </p>
        </div>
      </section>

      {/* Main Contact Content */}
      <section className="pb-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Interactive Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="card p-7 sm:p-10 shadow-soft">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-rise">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h3 className="t-h2 mt-6 text-2xl font-bold">Message Received</h3>
                  <p className="mt-3 max-w-md text-sm text-muted-foreground">
                    Thank you! An engineer from The CodeRoom will review your project details and get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="btn btn-primary mt-8"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-6">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Name & Email Row */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
                        Your Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className="field"
                        aria-invalid={Boolean(errors.name)}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
                        Work Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="field"
                        aria-invalid={Boolean(errors.email)}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">
                      Phone / WhatsApp Number{" "}
                      <span className="text-xs font-normal text-muted-foreground">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="field"
                    />
                  </div>

                  {/* Service Pills Selector */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Interested In{" "}
                      <span className="text-xs font-normal text-muted-foreground">(select service)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() =>
                            setSelectedService((prev) => (prev === s.title ? "" : s.title))
                          }
                          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                            selectedService === s.title
                              ? "bg-primary text-primary-foreground shadow-xs"
                              : "border border-border bg-surface text-muted-foreground hover:border-primary hover:text-foreground"
                          }`}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Chips */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Estimated Project Scope / Budget
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedBudget((prev) => (prev === opt ? "" : opt))}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                            selectedBudget === opt
                              ? "bg-primary text-primary-foreground shadow-xs"
                              : "border border-border bg-surface text-muted-foreground hover:border-primary hover:text-foreground"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">
                      Project Details <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us about what you want to build, key goals, target timeline..."
                      className="field resize-y min-h-[120px]"
                      aria-invalid={Boolean(errors.message)}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
                    )}
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <span>Something went wrong sending your message. Please reach out to us via email or WhatsApp directly.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn btn-primary w-full py-3.5 text-base"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Sending Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Project Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    We treat all communications under non-disclosure. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Quick Connect Channels (5 Cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* WhatsApp Direct Card */}
            <div className="glow-border card p-6 bg-gradient-to-br from-white via-surface to-emerald-50/30">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 font-mono-tech text-xs font-semibold text-emerald-700">
                  <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-500" />
                  Fastest Channel
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                Chat Directly on WhatsApp
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Connect directly with our engineering leads for quick scoping, technical Q&A, or instant replies.
              </p>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp mt-5 w-full"
              >
                <MessageCircle className="h-4 w-4" />
                Open WhatsApp Chat
              </a>
            </div>

            {/* Email Contact Card */}
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 font-mono-tech text-xs text-primary hover:underline"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy email</span>
                    </>
                  )}
                </button>
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">
                Email Engineering
              </h3>
              <a
                href={mailto()}
                className="mt-1 block font-mono-tech text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                {site.contact.email}
              </a>
              <p className="mt-1 text-xs text-muted-foreground">
                Average reply time: under 4 hours on business days.
              </p>
            </div>

            {/* Direct Phone Lines */}
            <div className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">
                Direct Phone Lines
              </h3>
              <div className="mt-3 space-y-2">
                {site.contact.phones.map((phone) => (
                  <div key={phone.tel} className="flex items-center justify-between text-xs">
                    <a
                      href={`tel:${phone.tel}`}
                      className="font-mono-tech font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {phone.display}
                    </a>
                    <a
                      href={`https://wa.me/${phone.wa}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:underline"
                    >
                      WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* SLA / Quality Promise */}
            <div className="rounded-2xl border border-border bg-surface p-5 text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Confidentiality & Response SLA</span>
              </div>
              <p>
                Every project enquiry is reviewed directly by our technical architects. We never share your data or project concepts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
