import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { DUR, EASE } from "@/lib/motion";
import { ACTS, SITE } from "@/data/content";

interface HUDProps {
  scrollProgress: number;
  scrolling: boolean;
}

/**
 * The Quiet Interface — top-left logomark, top-right nav,
 * bottom-left chapter indicator, bottom-right scroll affordance.
 * Fades to 30% after 4s idle; returns instantly on movement.
 */
export const HUD = ({ scrollProgress, scrolling }: HUDProps) => {
  const [idle, setIdle] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const reset = () => {
      setIdle(false);
      clearTimeout(t);
      t = setTimeout(() => setIdle(true), 4000);
    };
    reset();
    window.addEventListener("mousemove", reset);
    window.addEventListener("scroll", reset);
    window.addEventListener("touchstart", reset);
    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("touchstart", reset);
    };
  }, []);

  // Current act based on scroll progress (only on home route)
  const isHome = location.pathname === "/";
  const actIndex = Math.min(Math.floor(scrollProgress * ACTS.length), ACTS.length - 1);
  const currentAct = ACTS[actIndex];

  const opacity = idle && !scrolling ? 0.3 : 1;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      animate={{ opacity }}
      transition={{ duration: DUR.cinematic, ease: EASE.quiet }}
    >
      {/* Top-left: logomark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: DUR.deliberate, ease: EASE.cinematic, delay: 0.4 }}
        className="absolute top-8 left-8 md:top-10 md:left-12 pointer-events-auto"
      >
        <Link
          to="/"
          data-testid="hud-logo"
          className="font-display text-[20px] tracking-tight text-[#F2EBDD] hover:opacity-60 transition-opacity"
          style={{ transition: `opacity ${DUR.quick}s ${EASE.quiet}` }}
        >
          <span className="italic">a</span>n
        </Link>
      </motion.div>

      {/* Top-right: nav */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.deliberate, ease: EASE.considered, delay: 0.5 }}
        className="absolute top-8 right-8 md:top-10 md:right-12 pointer-events-auto"
      >
        <ul className="flex gap-8 font-mono text-[11px] tracking-[0.18em] uppercase">
          {[
            { to: "/", label: "Index" },
            { to: "/archive", label: "Archive" },
            { to: "/studio", label: "Studio" },
            { to: "/contact", label: "Contact" },
          ].map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                data-testid={`hud-nav-${item.label.toLowerCase()}`}
                className="text-[#F2EBDD]/50 hover:text-[#F2EBDD] transition-colors"
                style={{ transition: `color ${DUR.quick}s ${EASE.quiet}` }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Bottom-left: chapter indicator (hidden in final 8% — gives way to footer) */}
      <AnimatePresence mode="wait">
        {isHome && scrollProgress < 0.92 && (
          <motion.div
            key={currentAct.roman}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 0.45, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: DUR.base, ease: EASE.considered }}
            className="absolute bottom-8 left-8 md:bottom-10 md:left-12 font-mono text-[11px] tracking-[0.18em] uppercase text-[#F2EBDD] pointer-events-none"
            data-testid="chapter-indicator"
          >
            <span className="text-[#F2EBDD]/80">{currentAct.roman}</span>
            <span className="mx-3 text-[#F2EBDD]/30">/</span>
            <span className="text-[#F2EBDD]/60">VI</span>
            <span className="ml-4 text-[#F2EBDD]/40">— {currentAct.name}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-right: scroll affordance */}
      <AnimatePresence>
        {isHome && scrollProgress < 0.05 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.cinematic, ease: EASE.quiet, delay: 1.6 }}
            className="absolute bottom-10 right-8 md:bottom-12 md:right-12 flex flex-col items-center gap-3 pointer-events-none"
            data-testid="scroll-affordance"
          >
            <span
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#F2EBDD]/60"
              style={{ writingMode: "vertical-rl" }}
            >
              Scroll
            </span>
            <div className="relative w-px h-12 overflow-hidden bg-[#F2EBDD]/15">
              <motion.div
                className="absolute top-0 left-0 w-px h-6 bg-[#F2EBDD]/80"
                animate={{ y: [-24, 48] }}
                transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
