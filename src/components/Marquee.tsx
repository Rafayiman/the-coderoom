const ITEMS = [
  "LLM PIPELINES",
  "AGENTIC SYSTEMS",
  "COMPUTER VISION",
  "RAG ARCHITECTURES",
  "VOICE AI",
  "WEB3 × AI",
  "REAL-TIME INFERENCE",
  "MULTI-AGENT ORCHESTRATION",
];

export function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-border py-6 bg-background">
      <div className="marquee flex whitespace-nowrap gap-16">
        {loop.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-16 font-display text-4xl font-medium tracking-tightest md:text-6xl"
          >
            <span>{t}</span>
            <span className="text-foreground/30">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
