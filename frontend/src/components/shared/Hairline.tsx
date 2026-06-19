import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";

interface HairlineProps {
  delay?: number;
  duration?: number;
  className?: string;
  width?: string;
  origin?: "left" | "right" | "center";
}

/**
 * The leitmotif — a hairline that draws across with cinematic timing.
 * Appears 4+ times on the home page: hero, Act III opener, Act V transition, closing frame.
 */
export const Hairline = ({
  delay = 0,
  duration = DUR.cinematic,
  className = "",
  width = "100%",
  origin = "left",
}: HairlineProps) => {
  return (
    <motion.span
      data-testid="hairline"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration, ease: EASE.cinematic, delay }}
      style={{
        display: "block",
        height: 1,
        width,
        background: "#F2EBDD",
        opacity: 0.4,
        transformOrigin: origin,
      }}
      className={className}
    />
  );
};
