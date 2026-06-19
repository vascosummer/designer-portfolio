import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import { Hairline } from "@/components/shared/Hairline";
import { MaskedText } from "@/components/shared/MaskedText";
import { ProjectArtifact } from "@/components/shared/ProjectArtifact";
import { api, type Project } from "@/lib/api";
import { PROJECTS_FALLBACK } from "@/data/content";

export default function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);

  useEffect(() => {
    api
      .get<Project[]>("/projects")
      .then((res) => {
        const list = res.data?.length ? res.data : (PROJECTS_FALLBACK as Project[]);
        const idx = list.findIndex((p) => p.slug === slug);
        if (idx >= 0) {
          setProject(list[idx]);
          setNextProject(list[(idx + 1) % list.length]);
        }
      })
      .catch(() => {
        const list = PROJECTS_FALLBACK as Project[];
        const idx = list.findIndex((p) => p.slug === slug);
        if (idx >= 0) {
          setProject(list[idx]);
          setNextProject(list[(idx + 1) % list.length]);
        }
      });
  }, [slug]);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0A0A0B] text-[#F2EBDD]/60 font-mono text-xs tracking-widest uppercase">
        Loading
      </main>
    );
  }

  return (
    <main data-testid="work-detail-page" className="relative bg-[#0A0A0B] text-[#F2EBDD] pt-32 pb-40">
      {/* Cover */}
      <section className="px-8 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: DUR.cinematic, ease: EASE.quiet }}
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#F2EBDD]/50 mb-8"
        >
          {String(project.index).padStart(2, "0")} · {project.year} · {project.role}
        </motion.div>

        <h1 className="font-display text-[clamp(56px,8vw,140px)] leading-[0.92] tracking-[-0.02em] text-[#F2EBDD]">
          <div><MaskedText delay={0.1}>{project.title}</MaskedText></div>
        </h1>

        <div className="mt-12 max-w-[200px]">
          <Hairline delay={0.8} duration={DUR.deliberate} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.75, y: 0 }}
          transition={{ duration: DUR.cinematic, ease: EASE.quiet, delay: 0.9 }}
          className="mt-10 max-w-[60ch] text-[18px] md:text-[20px] leading-[1.55] text-[#F2EBDD]/75 font-light"
        >
          {project.outcome}
        </motion.p>
      </section>

      {/* Hero artifact */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: DUR.held, ease: EASE.cinematic, delay: 1.0 }}
        className="relative mt-24 aspect-[16/9] max-w-[1600px] mx-auto overflow-hidden"
        style={{ viewTransitionName: "artifact" }}
      >
        <ProjectArtifact index={project.index} color={project.color} />
      </motion.div>

      {/* Body — Context / Tension / Approach / Outcome */}
      <section className="px-8 md:px-12 lg:px-24 max-w-[1100px] mx-auto mt-32 space-y-24">
        {[
          { label: "Context", body: project.description },
          { label: "Tension", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The real design problem stated honestly. Sed do eiusmod tempor incididunt ut labore et dolore magna." },
          { label: "Approach", body: "Three strategic moves. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
          { label: "Outcome", body: "Duis aute irure dolor. The default pattern across the org. 40k creators daily. Adoption within two cycles." },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: DUR.deliberate, ease: EASE.cinematic, delay: i * 0.06 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-3 font-mono text-[11px] tracking-[0.3em] uppercase text-[#F2EBDD]/40 pt-2">
              {String(i + 1).padStart(2, "0")} · {s.label}
            </div>
            <div className="md:col-span-9 text-[18px] leading-[1.65] text-[#F2EBDD]/80 font-light">
              {s.body}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Next project */}
      {nextProject && (
        <section className="px-8 md:px-12 lg:px-24 max-w-[1600px] mx-auto mt-40">
          <div className="mb-8 max-w-[180px]">
            <Hairline duration={DUR.deliberate} />
          </div>
          <Link
            to={`/work/${nextProject.slug}`}
            data-testid="next-project-link"
            className="group block"
          >
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#F2EBDD]/50">
              Next project
            </div>
            <div className="mt-6 font-display text-[clamp(40px,6vw,96px)] tracking-[-0.02em] text-[#F2EBDD] group-hover:text-[#F2EBDD]/70" style={{ transition: `color ${DUR.base}s ${EASE.quiet}` }}>
              {nextProject.title} →
            </div>
          </Link>
        </section>
      )}
    </main>
  );
}
