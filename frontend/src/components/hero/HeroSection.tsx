import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { HeroScene } from "./HeroScene";
import { MaskedText } from "@/components/shared/MaskedText";
import { Hairline } from "@/components/shared/Hairline";
import { SITE } from "@/data/content";

/**
 * Act I — The Opening Frame.
 * 100vh dark cinematic prologue. 3D still life on the right,
 * thesis typography anchored to the left third.
 */
export const HeroSection = () => {
  const { position } = useMousePosition(0.06);

  return (
    <section
      data-testid="hero-section"
      className="relative w-full h-screen overflow-hidden bg-[#0A0A0B]"
    >
      {/* Volumetric key-light ray (upper-left, 22°) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(155deg, rgba(255, 230, 190, 0.08) 0%, transparent 35%)",
          zIndex: 2,
        }}
      />

      {/* 3D scene */}
      <div className="absolute inset-0 z-10">
        <HeroScene mouse={position} />
      </div>

      {/* Bottom fog gradient (sells the floor) */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #0A0A0B 10%, rgba(22, 22, 26, 0.7) 50%, transparent 100%)",
          zIndex: 20,
        }}
      />

      {/* Pre-roll hairline that becomes the horizon */}
      <motion.div
        className="absolute left-8 md:left-12 top-[50%] z-30 pointer-events-none"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "30vw", opacity: 0.3 }}
        transition={{ duration: 0.6, ease: EASE.cinematic, delay: 0.1 }}
      >
        <Hairline delay={0} duration={0.6} width="100%" />
      </motion.div>

      {/* Foreground typography — anchored left, never parallaxes */}
      <div className="absolute inset-0 z-30 flex items-center pointer-events-none">
        <div className="px-8 md:px-12 lg:px-16 max-w-[760px]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: DUR.deliberate, ease: EASE.quiet, delay: 0.2 }}
            className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#F2EBDD] mb-10"
            data-testid="hero-eyebrow"
          >
            {SITE.role} <span className="mx-2 text-[#F2EBDD]/40">·</span>{" "}
            {SITE.discipline} <span className="mx-2 text-[#F2EBDD]/40">·</span>{" "}
            Available {SITE.availability}
          </motion.div>

          {/* Thesis */}
          <h1
            className="font-display text-[#F2EBDD] leading-[0.92] tracking-[-0.02em]"
            style={{ fontSize: "clamp(56px, 6.8vw, 124px)" }}
            data-testid="hero-thesis"
          >
            <div>
              <MaskedText delay={0.18} testId="hero-line-1">
                {SITE.thesisStart}
              </MaskedText>
            </div>
            <div>
              <MaskedText delay={0.28}>surfaces</MaskedText>{" "}
            </div>
            <div className="mt-1">
              <MaskedText delay={0.4}>
                people&nbsp;
                <span className="italic font-light text-[#F2EBDD]">trust.</span>
              </MaskedText>
            </div>
          </h1>

          {/* Hairline underscore */}
          <div className="mt-12 max-w-[220px]">
            <Hairline delay={1.4} duration={DUR.deliberate} />
          </div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: DUR.cinematic, ease: EASE.quiet, delay: 1.4 }}
            className="mt-8 max-w-[38ch] text-[15px] md:text-[16px] leading-[1.6] text-[#F2EBDD]/60 font-light"
            data-testid="hero-subline"
          >
            {SITE.subline}
          </motion.p>
        </div>
      </div>
    </section>
  );
};
