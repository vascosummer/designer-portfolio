import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DUR, EASE } from "@/lib/motion";
import { Hairline } from "@/components/shared/Hairline";
import { SITE } from "@/data/content";

/**
 * Act VI — The Closing Frame.
 * The film's quietest moment. The email is the largest type on the site.
 */
export const ClosingSection = () => {
  return (
    <section
      data-testid="closing-section"
      className="relative w-full min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center px-8 md:px-12 py-32"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: DUR.held, ease: EASE.cinematic }}
        className="w-full max-w-[1400px] flex flex-col items-center text-center"
      >
        {/* Top hairline */}
        <div className="w-[40%] max-w-[300px] mb-16">
          <Hairline duration={DUR.held} />
        </div>

        {/* Statement */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 0.55, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: DUR.held, ease: EASE.cinematic, delay: 0.2 }}
          className="font-mono text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-[#F2EBDD]/60 mb-16"
        >
          Currently accepting two engagements for {SITE.availability}
        </motion.p>

        {/* Email — the largest type on the closing frame */}
        <motion.a
          href={`mailto:${SITE.email}?subject=New engagement enquiry`}
          data-testid="closing-email"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: DUR.held, ease: EASE.cinematic, delay: 0.5 }}
          className="font-display text-[clamp(36px,6vw,96px)] leading-[1] tracking-[-0.02em] text-[#F2EBDD] hover:text-[#F2EBDD]/70"
          style={{ transition: `color ${DUR.base}s ${EASE.quiet}` }}
        >
          {SITE.email}
        </motion.a>

        {/* Sub-line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: DUR.cinematic, ease: EASE.quiet, delay: 1.0 }}
          className="mt-16 font-mono text-[11px] tracking-[0.22em] uppercase text-[#F2EBDD]/55 flex flex-wrap gap-4 justify-center"
        >
          <span>Replies within 48h</span>
          <span className="text-[#F2EBDD]/30">·</span>
          <span>Based in {SITE.location}</span>
          <span className="text-[#F2EBDD]/30">·</span>
          <span>Worldwide</span>
        </motion.div>

        {/* Contact form link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: DUR.cinematic, ease: EASE.quiet, delay: 1.2 }}
          className="mt-24"
        >
          <Link
            to="/contact"
            data-testid="closing-contact-link"
            className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-[#F2EBDD]/70 hover:text-[#F2EBDD]"
            style={{ transition: `color ${DUR.quick}s ${EASE.quiet}` }}
          >
            Or send a brief
            <span className="inline-block w-8 h-px bg-current" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-8 left-8 md:left-12 right-8 md:right-12 flex flex-col gap-4">
        <Hairline duration={DUR.held} />
        <div className="flex flex-col md:flex-row md:justify-between gap-4 font-mono text-[10px] tracking-[0.18em] uppercase text-[#F2EBDD]/40">
          <div>© {new Date().getFullYear()} {SITE.designerName}</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#F2EBDD]/70" style={{ transition: `color ${DUR.quick}s ${EASE.quiet}` }}>Instagram</a>
            <a href="#" className="hover:text-[#F2EBDD]/70" style={{ transition: `color ${DUR.quick}s ${EASE.quiet}` }}>Read.cv</a>
            <a href="#" className="hover:text-[#F2EBDD]/70" style={{ transition: `color ${DUR.quick}s ${EASE.quiet}` }}>LinkedIn</a>
          </div>
          <div className="text-[#F2EBDD]/30">Set in Fraunces, Inter & JetBrains Mono</div>
        </div>
      </footer>
    </section>
  );
};
