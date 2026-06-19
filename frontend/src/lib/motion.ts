/**
 * Motion tokens — single source of truth.
 * Mirrors the CSS custom properties in index.css.
 */

export const DUR = {
  instant: 0.08,
  quick: 0.18,
  base: 0.32,
  considered: 0.52,
  deliberate: 0.72,
  cinematic: 1.1,
  held: 1.8,
} as const;

export const EASE = {
  quiet: [0.32, 0.08, 0.24, 1] as [number, number, number, number],
  considered: [0.22, 1, 0.36, 1] as [number, number, number, number],
  cinematic: [0.16, 1, 0.3, 1] as [number, number, number, number],
  exit: [0.7, 0, 0.84, 0] as [number, number, number, number],
  dolly: [0.65, 0, 0.35, 1] as [number, number, number, number],
} as const;

export const STAGGER = {
  paired: 0.08,
  phrase: 0.06,
  cascade: 0.04,
  wave: 0.024,
} as const;

/** Standard masked-text reveal */
export const maskReveal = {
  initial: { y: "110%" },
  animate: { y: "0%" },
  transition: { duration: DUR.cinematic, ease: EASE.cinematic },
};

/** Quiet fade with soft arrival */
export const quietFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DUR.considered, ease: EASE.quiet },
};
