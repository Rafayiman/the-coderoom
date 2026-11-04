interface AmbientBackgroundProps {
  variant?: "hero" | "subtle" | "glow";
  className?: string;
}

export function AmbientBackground({ variant = "subtle", className = "" }: AmbientBackgroundProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="bg-dots absolute inset-0 opacity-40" />

      {variant === "hero" && (
        <>
          {/* Top-right drifting warm champagne & indigo aurora */}
          <div className="animate-blob absolute -right-20 -top-28 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-transparent blur-[120px]" />
          {/* Left ambient sunset peach glow echoing the logo */}
          <div className="animate-blob-delayed absolute -left-28 top-1/4 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-transparent blur-[120px]" />
          {/* Bottom subtle emerald sheen */}
          <div className="animate-blob absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />
        </>
      )}

      {variant === "glow" && (
        <>
          <div className="animate-blob absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[34rem] w-[34rem] rounded-full bg-gradient-to-r from-indigo-500/20 via-rose-500/10 to-transparent blur-[120px]" />
        </>
      )}

      {variant === "subtle" && (
        <div className="animate-blob absolute -right-20 top-10 h-72 w-72 rounded-full bg-indigo-500/15 blur-[100px]" />
      )}
    </div>
  );
}
