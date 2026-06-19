import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { DUR, EASE } from "@/lib/motion";
import { Hairline } from "@/components/shared/Hairline";
import { ProjectArtifact } from "@/components/shared/ProjectArtifact";
import { PROJECTS_FALLBACK } from "@/data/content";

/**
 * Act II — The Reel.
 * Three asymmetric rows of project thumbnails on a pinned section.
 * Each row drifts at its own horizontal speed → parallax depth without
 * the cards ever aligning to a grid.
 *
 * Row A (top, accent): smaller tiles, slowest scroll, raised
 * Row B (middle, hero): larger tiles, primary scroll, baseline
 * Row C (bottom, echo): smallest tiles, fastest scroll, lowered
 */

// Distribute 12 projects across rows — asymmetric counts so rows feel different
const ROW_A_IDS = [1, 4, 7, 10, 2, 5];           // 6 tiles
const ROW_B_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // all 12, prominent
const ROW_C_IDS = [11, 8, 3, 6, 9, 12];          // 6 tiles

const byIndex = (i: number) =>
  PROJECTS_FALLBACK.find((p) => p.index === i) || PROJECTS_FALLBACK[0];

export const ReelSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Each row scrolls a different total distance — parallax depth
  const xA = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const xB = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);
  const xC = useTransform(scrollYProgress, [0, 1], ["-8%", "-52%"]);

  return (
    <section
      ref={containerRef}
      data-testid="reel-section"
      className="relative w-full bg-[#0A0A0B]"
      style={{ height: "520vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: DUR.cinematic, ease: EASE.quiet }}
          className="absolute top-12 left-8 md:left-12 z-20 font-mono text-[10px] tracking-[0.3em] uppercase text-[#F2EBDD]/45"
        >
          02 — The Reel · {ROW_B_IDS.length} works
        </motion.div>

        {/* Row A — top, smaller tiles */}
        <motion.div
          style={{ x: xA }}
          className="flex gap-6 md:gap-10 pl-[14vw] pr-[14vw] will-change-transform mb-8 -mt-8"
        >
          {ROW_A_IDS.map((idx, i) => (
            <ReelTile key={`a-${i}`} project={byIndex(idx)} size="sm" />
          ))}
        </motion.div>

        {/* Row B — middle, primary */}
        <motion.div
          style={{ x: xB }}
          className="flex gap-8 md:gap-14 pl-[18vw] pr-[18vw] will-change-transform"
        >
          {ROW_B_IDS.map((idx, i) => (
            <ReelTile key={`b-${i}`} project={byIndex(idx)} size="lg" prominent />
          ))}
        </motion.div>

        {/* Row C — bottom, smallest, offset */}
        <motion.div
          style={{ x: xC }}
          className="flex gap-6 md:gap-10 pl-[26vw] pr-[10vw] will-change-transform mt-8 -mb-4"
        >
          {ROW_C_IDS.map((idx, i) => (
            <ReelTile key={`c-${i}`} project={byIndex(idx)} size="xs" />
          ))}
        </motion.div>

        {/* Bottom hairline */}
        <div className="absolute bottom-12 left-8 md:left-12 right-8 md:right-12 z-10">
          <Hairline width="100%" duration={DUR.held} delay={0.2} />
        </div>
        <div className="absolute bottom-14 right-8 md:right-12 z-10 font-mono text-[10px] tracking-[0.3em] uppercase text-[#F2EBDD]/40">
          Scroll →
        </div>
      </div>
    </section>
  );
};

type ReelTileProps = {
  project: typeof PROJECTS_FALLBACK[number];
  size: "xs" | "sm" | "lg";
  prominent?: boolean;
};

const SIZE = {
  xs: "w-[28vw] md:w-[18vw] h-[22vh]",
  sm: "w-[38vw] md:w-[24vw] h-[30vh]",
  lg: "w-[58vw] md:w-[36vw] lg:w-[32vw] h-[48vh]",
} as const;

const ReelTile = ({ project, size, prominent = false }: ReelTileProps) => {
  const [active, setActive] = useState(false);
  return (
    <Link
      to={`/work/${project.slug}`}
      viewTransition
      data-testid={`reel-card-${project.slug}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive(true)}
      className={`relative flex-shrink-0 ${SIZE[size]} overflow-hidden block group`}
      style={{ viewTransitionName: active && prominent ? "artifact" : undefined }}
    >
      <ProjectArtifact index={project.index} color={project.color} />
      <div className="absolute inset-0 border border-[#F2EBDD]/10 pointer-events-none" />
      <div
        className="absolute inset-0 bg-[#0A0A0B]/0 group-hover:bg-[#0A0A0B]/8"
        style={{ transition: `background-color ${DUR.base}s ${EASE.quiet}` }}
      />
      {/* Label — only on large tiles to keep small ones quiet */}
      {prominent && (
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#F2EBDD]/55">
              {String(project.index).padStart(2, "0")} · {project.year}
            </div>
            <div className="mt-1.5 font-display text-[clamp(16px,1.6vw,24px)] text-[#F2EBDD] leading-tight">
              {project.title}
            </div>
          </div>
          <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#F2EBDD]/40">
            {project.disciplines[0]}
          </div>
        </div>
      )}
      {/* Tiny tag for small tiles */}
      {!prominent && (
        <div className="absolute top-3 left-3 font-mono text-[8px] tracking-[0.22em] uppercase text-[#F2EBDD]/45">
          {String(project.index).padStart(2, "0")}
        </div>
      )}
    </Link>
  );
};
