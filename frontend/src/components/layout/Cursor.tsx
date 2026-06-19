import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";

/**
 * Custom cursor — bone-white inner dot + 1px ring.
 * States: idle (breathing), magnetic (over interactive), reading (over text), engaged (pressed).
 */
export const Cursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Lerp via spring for that viscous follow
  const x = useSpring(mouseX, { damping: 30, stiffness: 220, mass: 0.6 });
  const y = useSpring(mouseY, { damping: 30, stiffness: 220, mass: 0.6 });

  const [state, setState] = useState<"idle" | "magnetic" | "reading" | "engaged">("idle");
  const [hidden, setHidden] = useState(true);
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    // Detect touch — disable cursor on touch devices
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      setHidden(false);
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor='interactive'], [role='button']");
      const text = target.closest("p, h1, h2, h3, h4, h5, h6, [data-cursor='text']");

      if (interactive) {
        const r = (interactive as HTMLElement).getBoundingClientRect();
        rectRef.current = r;
        // Magnetic snap toward element center (subtle)
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (cx - e.clientX) * 0.12;
        const dy = (cy - e.clientY) * 0.12;
        mouseX.set(e.clientX + dx);
        mouseY.set(e.clientY + dy);
        setState("magnetic");
      } else if (text) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        setState("reading");
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        setState("idle");
      }
    };

    const onDown = () => setState((s) => (s === "magnetic" ? "engaged" : s));
    const onUp = () => setState((s) => (s === "engaged" ? "magnetic" : s));
    const onLeave = () => setHidden(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY]);

  const ringSize = state === "magnetic" ? 36 : state === "engaged" ? 24 : state === "reading" ? 4 : 28;
  const ringHeight = state === "reading" ? 22 : ringSize;
  const dotColor = state === "engaged" ? "#A8643C" : "#F2EBDD";

  return (
    <>
      {/* Outer ring */}
      <motion.div
        data-testid="custom-cursor-ring"
        style={{
          x,
          y,
          opacity: hidden ? 0 : 0.5,
          pointerEvents: "none",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 9999,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ width: ringSize, height: ringHeight }}
        transition={{ duration: DUR.base, ease: EASE.considered }}
        className="rounded-full border border-[#F2EBDD]"
      />
      {/* Inner dot */}
      <motion.div
        data-testid="custom-cursor-dot"
        style={{
          x,
          y,
          backgroundColor: dotColor,
          opacity: hidden ? 0 : 1,
          pointerEvents: "none",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 10000,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
        }}
        transition={{ duration: DUR.instant, ease: EASE.quiet }}
        className="rounded-full"
      />
    </>
  );
};
