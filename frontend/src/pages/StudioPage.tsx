import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import { Hairline } from "@/components/shared/Hairline";
import { MaskedText } from "@/components/shared/MaskedText";
import { SITE } from "@/data/content";

const PRINCIPLES = [
  "I ship.",
  "I document.",
  "I name things carefully.",
  "I cut twice as much as I add.",
  "I leave the room better.",
];

const PHASES = [
  { label: "Discover", body: "Listen, sketch the territory, agree on the real problem." },
  { label: "Define", body: "Frame the design opportunity. Cut the brief in half." },
  { label: "Direct", body: "Set the visual stance and the system. Build the first surface." },
  { label: "Deliver", body: "Ship to production. Document. Hand over with no loose ends." },
];

const TOOLS = ["Figma", "Cursor", "After Effects", "Cavalry", "Pen"];

export default function StudioPage() {
  return (
    <main
      data-testid="studio-page"
      className="relative min-h-screen bg-[#0A0A0B] text-[#F2EBDD] pt-32 pb-40 px-8 md:px-12 lg:px-24"
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: DUR.cinematic, ease: EASE.quiet }}
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#F2EBDD]/50 mb-6"
        >
          Studio
        </motion.div>

        <h1 className="font-display text-[clamp(48px,7vw,120px)] leading-[0.95] tracking-[-0.02em]">
          <div><MaskedText delay={0.1}>{SITE.designerName}</MaskedText></div>
        </h1>

        <div className="mt-10 w-32">
          <Hairline delay={0.7} duration={DUR.deliberate} />
        </div>

        {/* First-person paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: DUR.cinematic, ease: EASE.quiet, delay: 0.8 }}
          className="mt-12 max-w-[60ch] text-[18px] md:text-[20px] leading-[1.6] text-[#F2EBDD]/80 font-light"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Twelve years in
          product and brand design. I work alone, occasionally with a small bench of
          collaborators I trust. I take two engagements a quarter. I am based in{" "}
          {SITE.location} and work worldwide.
        </motion.p>

        {/* Principles */}
        <section className="mt-32">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#F2EBDD]/40 mb-10">
            Operating Principles
          </div>
          <ul className="space-y-4">
            {PRINCIPLES.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.85, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: DUR.base, ease: EASE.cinematic, delay: i * 0.06 }}
                className="font-display italic font-light text-[clamp(24px,3vw,40px)] text-[#F2EBDD]/85"
              >
                {p}
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Process */}
        <section className="mt-32">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#F2EBDD]/40 mb-10">
            Process
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: DUR.base, ease: EASE.cinematic, delay: i * 0.05 }}
                className="border-t border-[#F2EBDD]/10 pt-6"
              >
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#F2EBDD]/40">
                  0{i + 1}
                </div>
                <div className="mt-3 font-display text-[28px] tracking-tight text-[#F2EBDD]">
                  {phase.label}
                </div>
                <p className="mt-3 text-[15px] leading-[1.6] text-[#F2EBDD]/65 font-light max-w-[40ch]">
                  {phase.body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="mt-24 flex items-center gap-4 font-mono text-[11px] tracking-[0.22em] uppercase text-[#F2EBDD]/50">
          <span className="text-[#F2EBDD]/30">Tools:</span>
          <span>{TOOLS.join("  ·  ")}</span>
        </section>

        {/* Now */}
        <section className="mt-32 border-l-2 border-[#A8643C] pl-6 max-w-[60ch]">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#A8643C]">
            Now
          </div>
          <p className="mt-3 text-[16px] leading-[1.6] text-[#F2EBDD]/80 font-light italic">
            Currently directing a brand reposition for a fintech in EU, and finishing
            a long type project. Open for one more engagement this quarter.
          </p>
          <div className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-[#F2EBDD]/35">
            Updated this week
          </div>
        </section>
      </div>
    </main>
  );
}
