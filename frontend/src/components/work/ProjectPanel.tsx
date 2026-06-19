import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DUR, EASE } from "@/lib/motion";
import { Hairline } from "@/components/shared/Hairline";
import { MaskedText } from "@/components/shared/MaskedText";
import { ProjectArtifact } from "@/components/shared/ProjectArtifact";
import type { Project } from "@/lib/api";

interface ProjectPanelProps {
  project: Project;
  index: number;
  reverse: boolean;
}

/**
 * Single project panel — one full viewport.
 * Composition alternates left/right. Type cascades in three beats.
 */
export const ProjectPanel = ({ project, index, reverse }: ProjectPanelProps) => {
  const [morphing, setMorphing] = useState(false);
  return (
    <article
      data-testid={`project-panel-${project.slug}`}
      className="relative w-full min-h-screen flex items-center bg-[#0A0A0B] overflow-hidden"
    >
      <div
        className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 px-8 md:px-12 lg:px-16 py-32 ${
          reverse ? "lg:[direction:rtl]" : ""
        }`}
      >
        {/* Artifact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: DUR.cinematic, ease: EASE.cinematic }}
          className="lg:col-span-7 [direction:ltr] relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden"
          style={{ viewTransitionName: morphing ? "artifact" : undefined }}
        >
          <ProjectArtifact index={project.index} color={project.color} />
          <div className="absolute inset-0 border border-[#F2EBDD]/10 pointer-events-none" />
        </motion.div>

        {/* Type column */}
        <div className="lg:col-span-5 [direction:ltr] flex flex-col justify-center">
          {/* Beat 2 — eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: DUR.base, ease: EASE.quiet, delay: 0.2 }}
            className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#F2EBDD]/50 mb-8"
          >
            <span>{String(project.index).padStart(2, "0")}</span>
            <span className="mx-3 text-[#F2EBDD]/30">·</span>
            <span>{project.year}</span>
            <span className="mx-3 text-[#F2EBDD]/30">·</span>
            <span>{project.role}</span>
          </motion.div>

          {/* Beat 3 — title */}
          <motion.h2
            className="font-display text-[clamp(40px,5vw,76px)] leading-[0.95] tracking-[-0.02em] text-[#F2EBDD]"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.4 }}
          >
            <span className="inline-block overflow-hidden">
              <motion.span
                variants={{
                  initial: { y: "110%" },
                  animate: { y: "0%" },
                }}
                transition={{ duration: DUR.cinematic, ease: EASE.cinematic, delay: 0.3 }}
                className="inline-block"
              >
                {project.title}
              </motion.span>
            </span>
          </motion.h2>

          {/* Outcome */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.75 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: DUR.cinematic, ease: EASE.quiet, delay: 0.6 }}
            className="mt-8 max-w-[44ch] text-[17px] md:text-[18px] leading-[1.55] text-[#F2EBDD]/75 font-light"
          >
            {project.outcome}
          </motion.p>

          {/* Hairline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.8 }}
            className="mt-10 w-32"
          >
            <Hairline delay={0.85} duration={DUR.considered} width="100%" />
          </motion.div>

          {/* Disciplines */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: DUR.base, ease: EASE.quiet, delay: 1.0 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.22em] uppercase text-[#F2EBDD]/55"
          >
            {project.disciplines.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </motion.div>

          {/* Enter affordance */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: DUR.base, ease: EASE.quiet, delay: 1.2 }}
            className="mt-12"
          >
            <Link
              to={`/work/${project.slug}`}
              viewTransition
              data-testid={`enter-project-${project.slug}`}
              onClick={() => setMorphing(true)}
              className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-[#F2EBDD]/70 hover:text-[#F2EBDD]"
              style={{ transition: `color ${DUR.quick}s ${EASE.quiet}` }}
            >
              Enter
              <span className="inline-block w-8 h-px bg-current" />
            </Link>
          </motion.div>
        </div>
      </div>
    </article>
  );
};
