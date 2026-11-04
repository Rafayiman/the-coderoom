import { Code2, Server, Cpu, Users } from "lucide-react";
import { CountUp } from "@/components/shared/CountUp";
import { Reveal } from "@/components/shared/Reveal";

const metrics = [
  {
    icon: Code2,
    value: 15,
    suffix: "+",
    label: "Production Deployments",
    description: "Live web apps, portals and enterprise systems.",
  },
  {
    icon: Cpu,
    value: 99,
    suffix: ".9%",
    label: "Uptime & Reliability",
    description: "Engineered for fault-tolerance and resilience.",
  },
  {
    icon: Server,
    value: 50,
    suffix: "k+",
    label: "Daily Queries Handled",
    description: "High-throughput API & vector pipeline capacity.",
  },
  {
    icon: Users,
    value: 100,
    suffix: "%",
    label: "Client Retention",
    description: "Long-term engineering partnerships.",
  },
];

export function ImpactMetrics() {
  return (
    <section aria-label="Our Impact and Metrics" className="border-b border-border bg-surface/30 py-14">
      <div className="shell">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label} delay={idx * 80}>
                <div className="card card-hover group relative flex flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono-tech text-xs text-muted-foreground">0{idx + 1}</span>
                  </div>

                  <div className="mt-6">
                    <div className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                      <CountUp end={item.value} suffix={item.suffix} />
                    </div>
                    <h3 className="mt-2 text-base font-bold text-foreground">{item.label}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
