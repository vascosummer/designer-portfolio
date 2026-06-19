import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import { Hairline } from "@/components/shared/Hairline";
import { api, type Project } from "@/lib/api";
import { PROJECTS_FALLBACK } from "@/data/content";

const DISCIPLINES = ["All", "Product", "UI", "Brand", "Design System"];

export default function ArchivePage() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS_FALLBACK as Project[]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api
      .get<Project[]>("/projects")
      .then((r) => r.data?.length && setProjects(r.data))
      .catch(() => {});
  }, []);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.disciplines.some((d) => d === filter));

  return (
    <main
      data-testid="archive-page"
      className="relative min-h-screen bg-[#0A0A0B] text-[#F2EBDD] pt-32 pb-32 px-8 md:px-12 lg:px-24"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#F2EBDD]/50 mb-6">
          Index · {filtered.length} items
        </div>
        <h1 className="font-display text-[clamp(40px,6vw,88px)] tracking-[-0.02em] leading-[0.95]">
          The Archive
        </h1>

        <div className="mt-10 w-32">
          <Hairline duration={DUR.deliberate} />
        </div>

        {/* Filter chips */}
        <div className="mt-12 flex flex-wrap gap-3">
          {DISCIPLINES.map((d) => (
            <button
              key={d}
              data-testid={`archive-filter-${d.toLowerCase().replace(" ", "-")}`}
              onClick={() => setFilter(d)}
              className={`px-4 py-1.5 border font-mono text-[10px] tracking-[0.22em] uppercase ${
                filter === d
                  ? "border-[#F2EBDD] text-[#F2EBDD]"
                  : "border-[#F2EBDD]/15 text-[#F2EBDD]/50 hover:text-[#F2EBDD] hover:border-[#F2EBDD]/40"
              }`}
              style={{ transition: `all ${DUR.base}s ${EASE.considered}` }}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Spreadsheet-style table */}
        <div className="mt-16 border-t border-[#F2EBDD]/10">
          <div className="grid grid-cols-12 py-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[#F2EBDD]/40 border-b border-[#F2EBDD]/10">
            <div className="col-span-1">Year</div>
            <div className="col-span-5">Project</div>
            <div className="col-span-4">Discipline</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: DUR.base, ease: EASE.quiet, delay: i * 0.03 }}
            >
              <Link
                to={`/work/${p.slug}`}
                data-testid={`archive-row-${p.slug}`}
                className="grid grid-cols-12 py-4 border-b border-[#F2EBDD]/8 font-mono text-[12px] text-[#F2EBDD]/70 hover:text-[#F2EBDD] hover:bg-[#F2EBDD]/3 group"
                style={{ transition: `all ${DUR.base}s ${EASE.considered}` }}
              >
                <div className="col-span-1">{p.year}</div>
                <div className="col-span-5 font-display text-[16px] tracking-tight">
                  {p.title}
                </div>
                <div className="col-span-4 text-[11px] tracking-[0.22em] uppercase">
                  {p.disciplines.join(" · ")}
                </div>
                <div className="col-span-2 text-right text-[11px] tracking-[0.22em] uppercase text-[#F2EBDD]/40">
                  Live →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
