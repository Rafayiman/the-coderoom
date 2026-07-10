import { useEffect, useState } from "react";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#about" },
  { label: "Contact", href: "#book" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC",
        }) + " UTC"
      );
    update();
    const id = setInterval(update, 30000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(id);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <div className="relative grid h-8 w-8 place-items-center border border-foreground">
            <div className="h-3 w-3 bg-foreground" />
            <span className="absolute -right-1 -top-1 h-1.5 w-1.5 bg-signal" />
          </div>
          <span className="font-display text-sm font-semibold tracking-tight">
            thecoderoom
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              className="group font-mono-tech text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="text-signal mr-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 font-mono-tech text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-signal pulse-dot" />
          <span>{time || "Online"}</span>
        </div>

        <a href="#book" className="md:hidden btn-solid-tech !py-2 !px-3">
          Book
        </a>
      </div>
    </header>
  );
}
