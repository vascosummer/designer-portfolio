import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { DUR, EASE } from "@/lib/motion";
import { Hairline } from "@/components/shared/Hairline";
import { ProjectArtifact } from "@/components/shared/ProjectArtifact";
import { PROJECTS_FALLBACK } from "@/data/content";

/**
 * Act II — The Reel.
 * Horizontally-scrubbing montage of muted motion captures.
 * Page pins; scroll scrubs the timeline.
 */
export const ReelSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section
      ref={containerRef}
      data-testid="reel-section"
      className="relative w-full bg-[#0A0A0B]"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Act marker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: DUR.cinematic, ease: EASE.quiet }}
          className="absolute top-1/2 left-8 md:left-12 -translate-y-1/2 z-20 font-mono text-[10px] tracking-[0.3em] uppercase text-[#F2EBDD]/40"
        >
          02 — The Reel
        </motion.div>

        {/* Horizontal track */}
        <motion.div
          style={{ x }}
          className="flex gap-8 md:gap-16 pl-[20vw] pr-[20vw] will-change-transform"
        >
          {PROJECTS_FALLBACK.map((p, i) => (
            <ReelCard key={p.id} project={p} />
          ))}
        </motion.div>

        {/* Bottom hairline */}
        <div className="absolute bottom-12 left-8 md:left-12 right-8 md:right-12 z-10">
          <Hairline width="100%" duration={DUR.held} delay={0.2} />
        </div>
      </div>
    </section>
  );
};

/**
 * ReelCard — clickable card with view-transition-name set on hover.
 * The name is only applied at click time so multiple cards don't clash.
 */
const ReelCard = ({ project }: { project: typeof PROJECTS_FALLBACK[number] }) => {
  const [active, setActive] = useState(false);
  return (
    <Link
      to={`/work/${project.slug}`}
      viewTransition
      data-testid={`reel-card-${project.slug}`}
      onClick={() => setActive(true)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="relative flex-shrink-0 w-[70vw] md:w-[55vw] lg:w-[44vw] h-[64vh] overflow-hidden block group"
      style={{ viewTransitionName: active ? "artifact" : undefined }}
    >
      <ProjectArtifact index={project.index} color={project.color} />
      <div className="absolute inset-0 border border-[#F2EBDD]/10 pointer-events-none" />
      <div className="absolute inset-0 bg-[#0A0A0B]/0 group-hover:bg-[#0A0A0B]/10" style={{ transition: `background-color ${DUR.base}s ${EASE.quiet}` }} />
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#F2EBDD]/50">
            {String(project.index).padStart(2, "0")} · {project.year}
          </div>
          <div className="mt-2 font-display text-[clamp(20px,2vw,32px)] text-[#F2EBDD]">
            {project.title}
          </div>
        </div>
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#F2EBDD]/40">
          {project.disciplines[0]}
        </div>
      </div>
    </Link>
  );
};

