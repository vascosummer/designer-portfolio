import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { HeroScene } from "./HeroScene";
import { MaskedText } from "@/components/shared/MaskedText";
import { Hairline } from "@/components/shared/Hairline";
import { SITE } from "@/data/content";

/**
 * Hero — V2 (Obsidian Assembly-inspired).
 * Material photographic backdrop · fragmented editorial typography ·
 * discrete coordinate-style meta info · 3D scene as a framed window.
 *
 * To revert: swap <HeroSectionV2 /> back to <HeroSection /> in HomePage.tsx
 */
export const HeroSectionV2 = () => {
  const { position } = useMousePosition(0.06);
  const containerRef = useRef<HTMLElement>(null);

  // Parallax: backdrop drifts slowly with scroll; type stays anchored
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section
      ref={containerRef}
      data-testid="hero-section-v2"
      className="relative w-full h-screen overflow-hidden bg-[#0A0A0B]"
    >
      {/* ============================================================
          LAYER 1 — Photographic material backdrop
          Picsum returns a deterministic image by seed. Heavy treatment
          (grayscale + duo-tone + grain) makes it feel cinematic.
          ============================================================ */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img
          src="https://picsum.photos/id/1067/2400/1600?grayscale&blur=1"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-55"
          style={{ filter: "contrast(1.15) brightness(0.85)" }}
        />
        {/* Duo-tone wash — warms the gray to stone */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(168, 100, 60, 0.10) 0%, rgba(10, 10, 11, 0.4) 50%, rgba(10, 10, 11, 0.85) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        {/* Left fade for typography legibility */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #0A0A0B 0%, rgba(10,10,11,0.85) 25%, rgba(10,10,11,0.5) 50%, transparent 75%)",
          }}
        />
        {/* Bottom floor */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-[35%]"
          style={{
            background:
              "linear-gradient(to top, #0A0A0B 0%, rgba(10,10,11,0.7) 50%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ============================================================
          LAYER 2 — Mouse-reactive light wash (subtle)
          ============================================================ */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${50 + position.x * 20}% ${
            40 + position.y * 15
          }%, rgba(242, 235, 221, 0.06) 0%, transparent 60%)`,
        }}
      />

      {/* ============================================================
          LAYER 3 — Framed 3D scene (smaller, lower-right)
          Reads as a "window" / portal — the cinematic detail behind the editorial frame.
          ============================================================ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: DUR.held, ease: EASE.cinematic, delay: 0.6 }}
        className="absolute right-8 md:right-12 bottom-32 md:bottom-28 w-[44vw] md:w-[36vw] lg:w-[32vw] h-[44vh] md:h-[50vh] z-10 hidden md:block"
      >
        {/* Frame */}
        <div className="absolute inset-0 border border-[#F2EBDD]/15 pointer-events-none z-20" />
        {/* Corner ticks */}
        <CornerTicks />
        <div className="absolute inset-[1px] overflow-hidden">
          <HeroScene mouse={position} />
        </div>
        {/* Frame label */}
        <div className="absolute -top-6 left-0 font-mono text-[9px] tracking-[0.32em] uppercase text-[#F2EBDD]/45 z-20">
          Interior V — Forming
        </div>
        <div className="absolute -bottom-6 right-0 font-mono text-[9px] tracking-[0.32em] uppercase text-[#F2EBDD]/35 z-20">
          (I) Origin
        </div>
      </motion.div>

      {/* ============================================================
          LAYER 4 — Fragmented editorial typography
          ============================================================ */}
      <div className="absolute inset-0 z-30 px-8 md:px-12 lg:px-16 py-16 md:py-20 flex flex-col justify-between pointer-events-none">
        {/* TOP STRIP — coordinates / index / withheld */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.deliberate, ease: EASE.considered, delay: 0.3 }}
          className="grid grid-cols-12 gap-4 mt-12 md:mt-16"
        >
          <div className="col-span-6 md:col-span-3 font-mono text-[10px] tracking-[0.3em] uppercase">
            <div className="text-[#F2EBDD]/40">Coordinates</div>
            <div className="mt-1 text-[#F2EBDD]/75">38°43′N · 09°08′W</div>
          </div>
          <div className="hidden md:block col-span-3 font-mono text-[10px] tracking-[0.3em] uppercase">
            <div className="text-[#F2EBDD]/40">Practice</div>
            <div className="mt-1 text-[#F2EBDD]/75">Withheld</div>
          </div>
          <div className="col-span-6 md:col-span-3 md:col-start-10 font-mono text-[10px] tracking-[0.3em] uppercase text-right md:text-left">
            <div className="text-[#F2EBDD]/40">Index</div>
            <div className="mt-1 text-[#F2EBDD]/75">I — Opening</div>
          </div>
        </motion.div>

        {/* MIDDLE — fragmented thesis */}
        <div className="relative max-w-[1300px]">
          {/* Small left-rail label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ duration: DUR.deliberate, ease: EASE.quiet, delay: 0.2 }}
            className="absolute -top-8 left-0 font-mono text-[10px] tracking-[0.32em] uppercase text-[#F2EBDD]/40"
          >
            (I) — Thesis
          </motion.div>

          <h1
            className="font-display text-[#F2EBDD] leading-[0.88] tracking-[-0.02em]"
            style={{ fontSize: "clamp(56px, 8.4vw, 156px)" }}
            data-testid="hero-thesis-v2"
          >
            <div>
              <MaskedText delay={0.18}>Nothing</MaskedText>
            </div>
            <div className="ml-[6vw] md:ml-[9vw]">
              <MaskedText delay={0.32}>
                <span className="italic font-light">Shown</span>
              </MaskedText>
            </div>
            <div className="ml-[16vw] md:ml-[22vw]">
              <MaskedText delay={0.46}>First.</MaskedText>
            </div>
          </h1>

          {/* Hairline — settles below thesis */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-10 max-w-[220px]"
          >
            <Hairline delay={1.5} duration={DUR.deliberate} />
          </motion.div>

          {/* Subtitle row — practice description with seek admission */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.cinematic, ease: EASE.quiet, delay: 1.5 }}
            className="mt-8 grid grid-cols-12 gap-6 max-w-[1100px]"
          >
            <p className="col-span-12 md:col-span-6 text-[14px] md:text-[15px] leading-[1.55] text-[#F2EBDD]/60 font-light max-w-[44ch]">
              A private practice for product surfaces and brand systems.
              <br className="hidden md:block" />
              Twelve years. Engagements considered, not assumed.
            </p>
          </motion.div>
        </div>

        {/* BOTTOM STRIP — admission affordance & meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.cinematic, ease: EASE.quiet, delay: 1.8 }}
          className="grid grid-cols-12 gap-4 items-end mb-12 md:mb-16"
        >
          <div className="col-span-6 md:col-span-4 font-mono text-[10px] tracking-[0.3em] uppercase">
            <div className="text-[#F2EBDD]/40">{SITE.role}</div>
            <div className="mt-1 text-[#F2EBDD]/75">
              {SITE.discipline} · {SITE.location}
            </div>
          </div>
          <div className="hidden md:block col-span-3 font-mono text-[10px] tracking-[0.3em] uppercase">
            <div className="text-[#F2EBDD]/40">Cycle</div>
            <div className="mt-1 text-[#F2EBDD]/75">
              Open · {SITE.availability}
            </div>
          </div>
          <div className="col-span-6 md:col-span-3 md:col-start-10 font-mono text-[10px] tracking-[0.3em] uppercase text-right md:text-left pointer-events-auto">
            <div className="text-[#F2EBDD]/40">Admission</div>
            <a
              href={`mailto:${SITE.email}`}
              data-testid="hero-admission-link"
              className="mt-1 inline-flex items-center gap-2 text-[#F2EBDD]/85 hover:text-[#A8643C]"
              style={{ transition: `color ${DUR.base}s ${EASE.considered}` }}
            >
              → Seek Admission
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CornerTicks = () => (
  <>
    {/* Top-left */}
    <span className="absolute top-0 left-0 w-3 h-px bg-[#F2EBDD]/45" />
    <span className="absolute top-0 left-0 h-3 w-px bg-[#F2EBDD]/45" />
    {/* Top-right */}
    <span className="absolute top-0 right-0 w-3 h-px bg-[#F2EBDD]/45" />
    <span className="absolute top-0 right-0 h-3 w-px bg-[#F2EBDD]/45" />
    {/* Bottom-left */}
    <span className="absolute bottom-0 left-0 w-3 h-px bg-[#F2EBDD]/45" />
    <span className="absolute bottom-0 left-0 h-3 w-px bg-[#F2EBDD]/45" />
    {/* Bottom-right */}
    <span className="absolute bottom-0 right-0 w-3 h-px bg-[#F2EBDD]/45" />
    <span className="absolute bottom-0 right-0 h-3 w-px bg-[#F2EBDD]/45" />
  </>
);
