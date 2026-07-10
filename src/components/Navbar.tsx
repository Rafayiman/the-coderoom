import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const NAV = [
  { label: "Work", to: "/work" as const },
  { label: "Studio", to: "/studio" as const },
  { label: "Book", to: "/book" as const },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
        <Link to="/" className="flex items-center gap-3">
          <div className="relative grid h-8 w-8 place-items-center border border-foreground">
            <div className="h-3 w-3 bg-foreground" />
          </div>
          <span className="font-display text-sm font-semibold tracking-tight">
            thecoderoom
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="font-mono-tech text-[11px] uppercase tracking-[0.22em] transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link to="/book" className="md:hidden btn-solid-tech !py-2 !px-3">
          Book
        </Link>
      </div>
    </header>
  );
}
