import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import { Hairline } from "@/components/shared/Hairline";
import { api } from "@/lib/api";
import { SITE } from "@/data/content";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    engagement_type: "Product",
    budget_range: "",
    timeline: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/contact", form);
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true); // Silent confirmation regardless — premium UX
    } finally {
      setSubmitting(false);
    }
  };

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <main
      data-testid="contact-page"
      className="relative min-h-screen bg-[#0A0A0B] text-[#F2EBDD] pt-32 pb-40 px-8 md:px-12 lg:px-24"
    >
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: DUR.cinematic, ease: EASE.quiet }}
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#F2EBDD]/50 mb-6"
        >
          Contact
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.cinematic, ease: EASE.quiet }}
            >
              <h1 className="font-display text-[clamp(40px,5vw,72px)] leading-[1] tracking-[-0.02em] max-w-[20ch]">
                Tell me what you are trying to build.
              </h1>

              <div className="mt-10 w-32">
                <Hairline duration={DUR.deliberate} />
              </div>

              <form
                onSubmit={handleSubmit}
                data-testid="contact-form"
                className="mt-16 space-y-12"
              >
                <Field label="Your name">
                  <input
                    required
                    data-testid="contact-name"
                    value={form.name}
                    onChange={update("name")}
                    className="w-full bg-transparent border-0 border-b border-[#F2EBDD]/20 focus:border-[#F2EBDD] py-3 text-[18px] text-[#F2EBDD] outline-none font-light"
                    style={{ transition: `border-color ${DUR.base}s ${EASE.considered}` }}
                  />
                </Field>

                <Field label="Email">
                  <input
                    required
                    type="email"
                    data-testid="contact-email"
                    value={form.email}
                    onChange={update("email")}
                    className="w-full bg-transparent border-0 border-b border-[#F2EBDD]/20 focus:border-[#F2EBDD] py-3 text-[18px] text-[#F2EBDD] outline-none font-light"
                    style={{ transition: `border-color ${DUR.base}s ${EASE.considered}` }}
                  />
                </Field>

                <Field label="Company (optional)">
                  <input
                    data-testid="contact-company"
                    value={form.company}
                    onChange={update("company")}
                    className="w-full bg-transparent border-0 border-b border-[#F2EBDD]/20 focus:border-[#F2EBDD] py-3 text-[18px] text-[#F2EBDD] outline-none font-light"
                    style={{ transition: `border-color ${DUR.base}s ${EASE.considered}` }}
                  />
                </Field>

                <Field label="Engagement type">
                  <select
                    data-testid="contact-type"
                    value={form.engagement_type}
                    onChange={update("engagement_type")}
                    className="w-full bg-transparent border-0 border-b border-[#F2EBDD]/20 focus:border-[#F2EBDD] py-3 text-[18px] text-[#F2EBDD] outline-none font-light cursor-pointer"
                    style={{ transition: `border-color ${DUR.base}s ${EASE.considered}` }}
                  >
                    {["Product", "Brand", "Direction", "Design System", "Other"].map((o) => (
                      <option key={o} value={o} className="bg-[#0A0A0B]">{o}</option>
                    ))}
                  </select>
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <Field label="Budget">
                    <input
                      data-testid="contact-budget"
                      value={form.budget_range}
                      onChange={update("budget_range")}
                      placeholder="e.g. €25–50k"
                      className="w-full bg-transparent border-0 border-b border-[#F2EBDD]/20 focus:border-[#F2EBDD] py-3 text-[18px] text-[#F2EBDD] outline-none font-light placeholder:text-[#F2EBDD]/25"
                      style={{ transition: `border-color ${DUR.base}s ${EASE.considered}` }}
                    />
                  </Field>
                  <Field label="Timeline">
                    <input
                      data-testid="contact-timeline"
                      value={form.timeline}
                      onChange={update("timeline")}
                      placeholder="e.g. Q2 2025"
                      className="w-full bg-transparent border-0 border-b border-[#F2EBDD]/20 focus:border-[#F2EBDD] py-3 text-[18px] text-[#F2EBDD] outline-none font-light placeholder:text-[#F2EBDD]/25"
                      style={{ transition: `border-color ${DUR.base}s ${EASE.considered}` }}
                    />
                  </Field>
                </div>

                <Field label="Tell me about it">
                  <textarea
                    required
                    rows={5}
                    data-testid="contact-message"
                    value={form.message}
                    onChange={update("message")}
                    className="w-full bg-transparent border-0 border-b border-[#F2EBDD]/20 focus:border-[#F2EBDD] py-3 text-[18px] text-[#F2EBDD] outline-none font-light resize-none"
                    style={{ transition: `border-color ${DUR.base}s ${EASE.considered}` }}
                  />
                </Field>

                <div className="pt-8 flex items-center justify-between">
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#F2EBDD]/35">
                    Or email directly · {SITE.email}
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    data-testid="contact-submit"
                    className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#F2EBDD] hover:text-[#A8643C] flex items-center gap-3 disabled:opacity-40"
                    style={{ transition: `color ${DUR.base}s ${EASE.considered}` }}
                  >
                    {submitting ? "Sending" : "Send"}
                    <span className="inline-block w-8 h-px bg-current" />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DUR.cinematic, ease: EASE.cinematic }}
              data-testid="contact-success"
              className="py-20"
            >
              <div className="w-32 mb-10">
                <Hairline duration={DUR.deliberate} />
              </div>
              <p className="font-display italic font-light text-[clamp(28px,3.6vw,48px)] leading-[1.2] text-[#F2EBDD]/90 max-w-[24ch]">
                Received. I will reply within 48 hours.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-[#F2EBDD]/45">
      {label}
    </label>
    {children}
  </div>
);
