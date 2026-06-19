import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";

interface MaskedTextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "p";
  testId?: string;
}

/**
 * Cinematic masked reveal — text rises from below a clip-path mask.
 * The signature type entrance.
 */
export const MaskedText = ({
  children,
  delay = 0,
  duration = DUR.cinematic,
  className = "",
  as = "div",
  testId,
}: MaskedTextProps) => {
  const Tag = motion[as] as typeof motion.div;
  return (
    <span className={`inline-block overflow-hidden ${className}`} data-testid={testId}>
      <Tag
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration, ease: EASE.cinematic, delay }}
        style={{ display: "inline-block" }}
      >
        {children}
      </Tag>
    </span>
  );
};
