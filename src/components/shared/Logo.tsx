import { site } from "@/config/site";

export function LogoMark({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <img
        src="/thecoderoom-logo.png"
        alt={site.name}
        className="h-9 w-auto object-contain mix-blend-screen transition-transform duration-300 group-hover:scale-105"
      />
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src="/thecoderoom-logo.png"
        alt={site.name}
        className="h-8 sm:h-9 w-auto object-contain mix-blend-screen transition-transform duration-300 group-hover:scale-105"
      />
    </span>
  );
}
