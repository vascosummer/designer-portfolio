import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import { Hairline } from "@/components/shared/Hairline";
import { PRACTICE_CHAPTERS } from "@/data/content";

/**
 * Act IV — The Practice (book-spread metaphor).
 * Pinned section; horizontal "page turn" between chapters as user scrolls.
 */
export const PracticeSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const totalChapters = PRACTICE_CHAPTERS.length;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(totalChapters - 1) * 100}%`]);

  return (
    <section
      ref={ref}
      data-testid="practice-section"
      className="relative w-full bg-[#0A0A0B]"
      style={{ height: `${totalChapters * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Section eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          transition={{ duration: DUR.cinematic, ease: EASE.quiet }}
          className="absolute top-12 left-8 md:left-12 z-10 font-mono text-[11px] tracking-[0.3em] uppercase text-[#F2EBDD]/50"
        >
          04 — The Practice
        </motion.div>

        {/* Page indicator */}
        <motion.div className="absolute top-12 right-8 md:right-12 z-10 font-mono text-[11px] tracking-[0.3em] uppercase text-[#F2EBDD]/50">
          <PageCounter scrollYProgress={scrollYProgress} total={totalChapters} />
        </motion.div>

        {/* Horizontal pages */}
        <motion.div style={{ x }} className="flex h-full will-change-transform">
          {PRACTICE_CHAPTERS.map((c, i) => (
            <div
              key={c.id}
              className="w-screen h-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 px-8 md:px-12 lg:px-24 gap-16 items-center"
            >
              {/* Verso */}
              <div className="flex flex-col justify-center">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#F2EBDD]/40">
                  Chapter {c.number}
                </div>
                <h3
                  className="mt-8 font-display italic text-[clamp(40px,5vw,72px)] leading-[1.0] text-[#F2EBDD] font-light"
                >
                  {c.title}
                </h3>
                <div className="mt-10 w-24">
                  <Hairline width="100%" duration={DUR.deliberate} />
                </div>
                <p className="mt-8 max-w-[42ch] text-[17px] leading-[1.6] text-[#F2EBDD]/65 font-light">
                  {c.body}
                </p>
              </div>
              {/* Recto — supporting artifact (geometric still) */}
              <div className="hidden lg:flex items-center justify-center h-full">
                <ChapterArtifact index={i} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const PageCounter = ({
  scrollYProgress,
  total,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) => {
  const current = useTransform(scrollYProgress, (v) =>
    Math.min(Math.floor(v * total) + 1, total)
  );
  return (
    <motion.span>
      <motion.span>{current}</motion.span>
      <span className="mx-2 text-[#F2EBDD]/30">/</span>
      <span>{String(total).padStart(2, "0")}</span>
    </motion.span>
  );
};

const ChapterArtifact = ({ index }: { index: number }) => {
  // Each chapter has its own quiet visual signature
  const variants = [
    // 01 — concentric circles (systems)
    <svg key="01" viewBox="0 0 400 400" className="w-[60%] max-w-[400px] opacity-80">
      {Array.from({ length: 8 }).map((_, i) => (
        <circle
          key={i}
          cx="200"
          cy="200"
          r={20 + i * 22}
          fill="none"
          stroke="#F2EBDD"
          strokeOpacity={0.4 - i * 0.04}
          strokeWidth="0.5"
        />
      ))}
    </svg>,
    // 02 — vertical lines (trust ladder)
    <svg key="02" viewBox="0 0 400 400" className="w-[60%] max-w-[400px] opacity-80">
      {Array.from({ length: 16 }).map((_, i) => (
        <line
          key={i}
          x1={50 + i * 20}
          y1={80}
          x2={50 + i * 20}
          y2={320 - (i % 2) * 40}
          stroke="#F2EBDD"
          strokeOpacity={0.35}
          strokeWidth="0.5"
        />
      ))}
    </svg>,
    // 03 — grid intersections (posture)
    <svg key="03" viewBox="0 0 400 400" className="w-[60%] max-w-[400px] opacity-80">
      <rect x="50" y="50" width="300" height="300" fill="none" stroke="#F2EBDD" strokeOpacity="0.35" strokeWidth="0.5" />
      <line x1="50" y1="200" x2="350" y2="200" stroke="#F2EBDD" strokeOpacity="0.25" strokeWidth="0.5" />
      <line x1="200" y1="50" x2="200" y2="350" stroke="#F2EBDD" strokeOpacity="0.25" strokeWidth="0.5" />
      <circle cx="200" cy="200" r="3" fill="#A8643C" />
    </svg>,
    // 04 — wordmark mark (brands)
    <div key="04" className="font-display text-[clamp(72px,9vw,160px)] italic font-light text-[#F2EBDD]/85">
      &
    </div>,
    // 05 — single dot (direction)
    <svg key="05" viewBox="0 0 400 400" className="w-[60%] max-w-[400px] opacity-80">
      <rect x="40" y="40" width="320" height="320" fill="none" stroke="#F2EBDD" strokeOpacity="0.3" strokeWidth="0.5" />
      <circle cx="280" cy="120" r="4" fill="#F2EBDD" fillOpacity="0.9" />
    </svg>,
  ];
  return <>{variants[index] || variants[0]}</>;
};
