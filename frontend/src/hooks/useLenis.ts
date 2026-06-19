import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

/**
 * Lenis-driven smooth scroll. Exposes progress (0–1) of total page scroll.
 * The cinematic backbone — every shot is mapped to scroll progress.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const [progress, setProgress] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      infinite: false,
    });
    lenisRef.current = lenis;

    let rafId: number;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onScroll = ({ progress }: { progress: number }) => {
      setProgress(progress);
      setScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setScrolling(false), 120);
    };
    lenis.on("scroll", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollTimeout);
      lenis.destroy();
    };
  }, []);

  return { progress, scrolling, lenis: lenisRef.current };
}
