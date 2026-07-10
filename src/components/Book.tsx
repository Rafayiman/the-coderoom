import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLOTS = [
  { day: "MON", date: "14", time: "10:00", tz: "EST" },
  { day: "TUE", date: "15", time: "14:30", tz: "EST" },
  { day: "WED", date: "16", time: "09:00", tz: "EST" },
  { day: "THU", date: "17", time: "16:00", tz: "EST" },
  { day: "FRI", date: "18", time: "11:30", tz: "EST" },
];

const BUDGETS = ["< $25K", "$25K – $75K", "$75K – $200K", "$200K+"];

export function Book() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [slot, setSlot] = useState(0);
  const [budget, setBudget] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".book-title", {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
      gsap.from(".book-el", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="book"
      ref={rootRef}
      className="relative border-t border-border py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="label mb-6">05 — Get in touch</div>
            <div className="overflow-hidden">
              <h2 className="book-title font-display text-6xl md:text-8xl font-medium tracking-tightest leading-[0.9]">
                Book a <br />
                <span className="text-outline">30-min</span> <br />
                strategy call.
              </h2>
            </div>
            <p className="book-el mt-8 max-w-sm text-muted-foreground">
              We'll audit your product, sketch an AI roadmap, and tell you honestly
              whether we're the right fit. No decks. No sales.
            </p>
            <div className="book-el mt-10 space-y-2 font-mono-tech text-xs text-muted-foreground">
              <div>hello@thecoderoom.ai</div>
              <div>+1 (415) 555 – 0123</div>
              <div className="pt-4">— We reply within 24h.</div>
            </div>
          </div>

          <div className="md:col-span-7 border border-border p-6 md:p-10 bg-card/40">
            {submitted ? (
              <div className="flex flex-col items-start gap-6 py-16">
                <div className="label">Message received</div>
                <h3 className="font-display text-5xl md:text-6xl font-medium tracking-tightest">
                  Locked in.
                </h3>
                <p className="text-muted-foreground max-w-md">
                  A calendar invite will arrive from{" "}
                  <span className="text-foreground">hello@thecoderoom.ai</span> within
                  the next few hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-ghost-tech mt-4"
                >
                  ← New booking
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-8"
              >
                <div className="book-el">
                  <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                    Pick a slot
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {SLOTS.map((s, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setSlot(i)}
                        className={`flex flex-col items-center gap-1 border p-3 transition-all ${
                          slot === i
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground/50"
                        }`}
                      >
                        <span className="font-mono-tech text-[10px] tracking-widest">
                          {s.day}
                        </span>
                        <span className="font-display text-2xl leading-none">
                          {s.date}
                        </span>
                        <span className="font-mono-tech text-[10px] opacity-70">
                          {s.time}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="book-el grid gap-6 md:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Company" name="company" />
                  <Field label="Website" name="site" placeholder="https://" />
                </div>

                <div className="book-el">
                  <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                    Budget
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b, i) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setBudget(i)}
                        className={`border px-4 py-2 font-mono-tech text-xs transition-all ${
                          budget === i
                            ? "border-foreground bg-foreground text-background"
                            : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="book-el">
                  <label className="block font-mono-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                    Tell us about the project
                  </label>
                  <textarea
                    name="brief"
                    rows={4}
                    className="w-full bg-transparent border border-border p-3 text-sm outline-none focus:border-foreground transition-colors resize-none"
                    placeholder="What are you building?"
                  />
                </div>

                <div className="book-el flex items-center justify-between pt-4 border-t border-border">
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    <span className="text-signal">●</span> {SLOTS[slot].day} {SLOTS[slot].date} · {SLOTS[slot].time} {SLOTS[slot].tz}
                  </span>
                  <button type="submit" className="btn-solid-tech">
                    Send message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block font-mono-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
        {label} {required && <span className="text-foreground">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-border py-2 text-sm outline-none focus:border-foreground transition-colors"
      />
    </label>
  );
}
