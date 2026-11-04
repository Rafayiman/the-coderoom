import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Sparkles } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { site } from "@/config/site";

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change, and lock body scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isCurrent = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border/80 bg-[#090a0f]/85 shadow-[0_4px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between md:h-[4.75rem]">
        <Link to="/" aria-label={`${site.name} home`} className="group flex items-center">
          <Logo />
        </Link>

        {/* Primary Desktop Navigation */}
        <nav
          aria-label="Primary"
          className="hidden items-center rounded-full border border-border/70 bg-[#13151f]/80 p-1.5 shadow-[0_2px_15px_rgba(0,0,0,0.4)] backdrop-blur-md md:flex"
        >
          {site.nav.map((item) => {
            const current = isCurrent(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                aria-current={current ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-[0.9375rem] font-semibold transition-all duration-300 ${
                  current
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn btn-primary btn-sm hidden md:inline-flex">
            <Sparkles className="h-3.5 w-3.5" />
            Let&apos;s Talk
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-5 w-5">
              <Menu
                className={`absolute inset-0 transition-all duration-300 ${
                  open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              />
              <X
                className={`absolute inset-0 transition-all duration-300 ${
                  open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out)] md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="overflow-hidden border-b border-border bg-[#090a0f]/98 backdrop-blur-2xl">
          <nav aria-label="Mobile" className="shell flex flex-col gap-1.5 pb-6 pt-2">
            {site.nav.map((item, i) => {
              const current = isCurrent(item.path);
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
                  aria-current={current ? "page" : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-bold transition-all duration-500 ${
                    open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                  } ${
                    current
                      ? "bg-primary-soft text-primary"
                      : "text-foreground hover:bg-surface"
                  }`}
                >
                  <span>{item.label}</span>
                  {current && <span className="h-2 w-2 rounded-full bg-primary" />}
                </Link>
              );
            })}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-3 flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Let&apos;s Talk
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
