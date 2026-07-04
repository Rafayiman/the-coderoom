import { useEffect, useState } from "react";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Book", href: "#book" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    const id = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "UTC",
        }) + " UTC"
      );
    }, 1000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(id);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center border border-foreground">
            <div className="h-3 w-3 bg-foreground" />
          </div>
          <span className="font-display text-sm font-semibold tracking-tight">
            thecoderoom<span className="text-muted-foreground">/</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="text-foreground/40 mr-1">
                {String(NAV.indexOf(n) + 1).padStart(2, "0")}
              </span>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{time || "SYNCING"}</span>
        </div>

        <a href="#book" className="md:hidden btn-solid-tech !py-2 !px-3">
          Book
        </a>
      </div>
    </header>
  );
}
