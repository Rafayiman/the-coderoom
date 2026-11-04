import { useEffect } from "react";

export function useSmoothScroll() {
  useEffect(() => {
    // Only on client, and respect prefers-reduced-motion
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenisInstance: any = null;
    let frameId: number;

    import("lenis")
      .then(({ default: Lenis }) => {
        lenisInstance = new Lenis({
          duration: 1.15,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 1.5,
        });

        function onFrame(time: number) {
          lenisInstance?.raf(time);
          frameId = requestAnimationFrame(onFrame);
        }

        frameId = requestAnimationFrame(onFrame);
      })
      .catch((err) => {
        console.warn("Smooth scroll initialization skipped:", err);
      });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      lenisInstance?.destroy();
    };
  }, []);
}
