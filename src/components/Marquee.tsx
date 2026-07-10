const ITEMS = [
  "LLM Pipelines",
  "Agentic Systems",
  "Computer Vision",
  "RAG Architectures",
  "Voice AI",
  "Realtime Inference",
  "Multi-Agent Orchestration",
  "Generative Interfaces",
];

export function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-border py-8 bg-background">
      <div className="marquee flex whitespace-nowrap gap-16">
        {loop.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-16 font-display text-4xl font-medium tracking-tightest md:text-6xl"
          >
            <span>{t}</span>
            <span className="text-signal text-3xl md:text-4xl">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
