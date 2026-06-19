import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import { Hairline } from "@/components/shared/Hairline";
import { CLIENTS, AWARDS, QUOTE } from "@/data/content";

/**
 * Act V — Recognition, as a drift.
 * Marquee of clients + single editorial pull-quote + awards line.
 */
export const RecognitionSection = () => {
  return (
    <section
      data-testid="recognition-section"
      className="relative w-full bg-[#0A0A0B] py-40 lg:py-56 overflow-hidden"
    >
      {/* Drifting client marquee */}
      <div className="relative w-full overflow-hidden mb-32">
        <motion.div
          className="flex gap-20 whitespace-nowrap will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((c, i) => (
            <span
              key={i}
              className="font-mono text-[clamp(20px,2.4vw,32px)] tracking-[0.25em] uppercase text-[#F2EBDD]/12"
              style={{ color: "rgba(242, 235, 221, 0.13)" }}
            >
              {c}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Editorial pull-quote */}
      <div className="px-8 md:px-12 lg:px-24 max-w-[1400px]">
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: DUR.held, ease: EASE.cinematic }}
          className="font-display italic font-light text-[clamp(28px,3.6vw,56px)] leading-[1.15] text-[#F2EBDD]/85 max-w-[22ch]"
          data-testid="recognition-quote"
        >
          {QUOTE.body}
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: DUR.cinematic, ease: EASE.quiet, delay: 0.5 }}
          className="mt-10 font-mono text-[11px] tracking-[0.22em] uppercase text-[#F2EBDD]/55"
        >
          — {QUOTE.attribution}
        </motion.div>

        <div className="mt-24 max-w-[180px]">
          <Hairline duration={DUR.deliberate} delay={0.2} />
        </div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.55 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: DUR.cinematic, ease: EASE.quiet, delay: 0.7 }}
          className="mt-10 font-mono text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-[#F2EBDD]/55"
          data-testid="recognition-awards"
        >
          {AWARDS}
        </motion.div>
      </div>
    </section>
  );
};
