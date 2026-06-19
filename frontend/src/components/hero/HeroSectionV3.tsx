import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { HeroScene } from "./HeroScene";
import { MaskedText } from "@/components/shared/MaskedText";
import { Hairline } from "@/components/shared/Hairline";
import { SITE } from "@/data/content";

/**
 * Hero — V3 (HYBRID).
 * V1's full 3D scene as the canvas + V2's fragmented editorial typography + meta strips.
 * No photographic backdrop.
 *
 * To revert: change the import in HomePage.tsx to HeroSectionV2 or HeroSection.
 */
export const HeroSectionV3 = () => {
  const { position } = useMousePosition(0.06);

  return (
    <section
      data-testid="hero-section-v3"
      className="relative w-full h-screen overflow-hidden bg-[#0A0A0B]"
    >
      {/* ============================================================
          LAYER 1 — Full 3D scene (V1)
          ============================================================ */}
      <div className="absolute inset-0 z-0">
        <HeroScene mouse={position} />
      </div>

      {/* Volumetric key-light ray */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(155deg, rgba(255, 230, 190, 0.07) 0%, transparent 35%)",
        }}
      />

      {/* Mouse-reactive light wash */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: `radial-gradient(700px circle at ${50 + position.x * 16}% ${
            45 + position.y * 12
          }%, rgba(242, 235, 221, 0.045) 0%, transparent 60%)`,
        }}
      />

      {/* Left fade for typography legibility */}
      <div
        aria-hidden
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,11,0.78) 0%, rgba(10,10,11,0.45) 30%, transparent 55%)",
        }}
      />

      {/* Bottom floor fog */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none z-[4]"
        style={{
          background:
            "linear-gradient(to top, #0A0A0B 12%, rgba(22, 22, 26, 0.7) 50%, transparent 100%)",
        }}
      />

      {/* ============================================================
          LAYER 5 — Fragmented editorial typography + meta strips
          ============================================================ */}
      <div className="absolute inset-0 z-30 px-8 md:px-12 lg:px-16 py-16 md:py-20 flex flex-col justify-between pointer-events-none">
        {/* TOP STRIP — coordinates / practice / index */}
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
            style={{ fontSize: "clamp(56px, 8.4vw, 156px)", textShadow: "0 2px 24px rgba(10, 10, 11, 0.4)" }}
            data-testid="hero-thesis-v3"
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-10 max-w-[220px]"
          >
            <Hairline delay={1.5} duration={DUR.deliberate} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.cinematic, ease: EASE.quiet, delay: 1.5 }}
            className="mt-8 max-w-[1100px]"
          >
            <p className="text-[14px] md:text-[15px] leading-[1.55] text-[#F2EBDD]/65 font-light max-w-[44ch]">
              A private practice for product surfaces and brand systems.
              <br className="hidden md:block" />
              Twelve years. Engagements considered, not assumed.
            </p>
          </motion.div>
        </div>

        {/* BOTTOM STRIP — role / cycle / admission */}
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
