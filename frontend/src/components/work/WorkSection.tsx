import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import { Hairline } from "@/components/shared/Hairline";
import { ProjectPanel } from "./ProjectPanel";
import { api, type Project } from "@/lib/api";
import { PROJECTS_FALLBACK } from "@/data/content";

/**
 * Act III — Selected Work.
 * Opens with the "pull-back" reveal — hairline → label → first project.
 */
export const WorkSection = () => {
  const [projects, setProjects] = useState<Project[]>(PROJECTS_FALLBACK as Project[]);

  useEffect(() => {
    api
      .get<Project[]>("/projects")
      .then((res) => {
        if (res.data && res.data.length) setProjects(res.data);
      })
      .catch(() => {
        // Use fallback content from data file
      });
  }, []);

  // Selected Work — show only the featured ones (the deep dives)
  const featured = projects.filter((p) => p.is_featured);

  return (
    <section
      data-testid="work-section"
      className="relative w-full bg-[#0A0A0B]"
    >
      {/* Opening pull-back — hairline + label */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "30vw" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: DUR.cinematic, ease: EASE.cinematic }}
        >
          <Hairline width="100%" duration={DUR.cinematic} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: DUR.deliberate, ease: EASE.quiet, delay: 0.6 }}
          className="mt-6 font-mono text-[11px] tracking-[0.3em] uppercase text-[#F2EBDD]/60"
          data-testid="work-section-label"
        >
          Selected Work
        </motion.div>
      </div>

      {/* Project panels (featured only — full deep-dive treatment) */}
      {featured.map((p, i) => (
        <ProjectPanel key={p.id} project={p} index={i} reverse={i % 2 === 1} />
      ))}
    </section>
  );
};
