import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Mail, MessageCircle, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { mailto, site, whatsappUrl } from "@/config/site";
import { services } from "@/config/services";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().max(30, "That phone number looks too long.").optional(),
  service: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little about your project (10+ characters).")
    .max(3000, "Please keep your message under 3000 characters."),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;
type Status = "idle" | "sending" | "success" | "error";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {optional && <span className="ml-1 font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields, people don't.
    if (data.get("_honey")) return;

    const parsed = schema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone") || undefined,
      service: data.get("service") || undefined,
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
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
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
          message: v.message,
          _subject: `New enquiry from ${v.name} | ${site.name} website`,
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
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="card flex h-full flex-col items-center justify-center p-8 text-center sm:p-12"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="t-h3 mt-5">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Thank you for reaching out. We will get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-outline btn-sm mt-6"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="card space-y-5 p-6 sm:p-8"
      aria-label="Contact form"
    >
      {/* Honeypot field, hidden from people and assistive tech */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className="field"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="field"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="phone" label="Phone" optional error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+92 300 0000000"
            className="field"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </Field>
        <Field id="service" label="Service" optional>
          <select id="service" name="service" className="field" defaultValue="">
            <option value="">Select an area</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </Field>
      </div>

      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us briefly about your project"
          className="field resize-y"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
      </Field>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            We could not send your message. Please try again, or email us directly at{" "}
            <a href={mailto()} className="font-semibold underline">
              {site.contact.email}
            </a>
            .
          </p>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full sm:w-auto"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Send Message <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
  value,
  external,
  tone = "text-primary bg-primary-soft",
}: {
  href: string;
  icon: typeof Mail;
  label: string;
  value: string;
  external?: boolean;
  tone?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="card card-hover group flex items-center gap-4 p-4"
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${tone}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-medium text-muted-foreground">{label}</span>
        <span className="block truncate text-[0.9375rem] font-bold">{value}</span>
      </span>
    </a>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary-soft via-white to-white p-6 sm:p-10 lg:p-14">
          <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <SectionHeading
                id="contact-title"
                eyebrow="Contact"
                title="Let's talk about your project"
                description="Tell us what you need. We will get back to you with next steps."
              />
              <ul className="mt-8 space-y-3">
                <Reveal as="li" delay={80}>
                  <ContactLink
                    href={mailto()}
                    icon={Mail}
                    label="Email"
                    value={site.contact.email}
                  />
                </Reveal>
                {site.contact.phones.map((p, i) => (
                  <Reveal as="li" key={p.tel} delay={140 + i * 60}>
                    <ContactLink
                      href={`tel:${p.tel}`}
                      icon={Phone}
                      label="Call"
                      value={p.display}
                    />
                  </Reveal>
                ))}
                <Reveal as="li" delay={340}>
                  <ContactLink
                    href={whatsappUrl()}
                    icon={MessageCircle}
                    label="WhatsApp"
                    value="Chat with us"
                    external
                    tone="text-whatsapp bg-emerald-50"
                  />
                </Reveal>
              </ul>
            </div>
            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
