import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import SectionTag from "../ui/SectionTag";
import { SECTION_IDS } from "../../data/translations";

const FAQSection = ({ t }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = t("faqs");

  return (
    <section
      id={SECTION_IDS.faq}
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04050d 0%, #080510 50%, #04050d 100%)" }}
    >
      <div className="absolute inset-0 hud-grid opacity-40" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <SectionTag zone="ZONE 06" label="INTEL BRIEFING" color="purple" />
          </div>
          <h2
            className="text-4xl md:text-6xl font-display font-bold"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #00f5ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("faqTitle")}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.25), duration: 0.4 }}
                viewport={{ once: true, margin: "-30px" }}
                className="rounded-2xl overflow-hidden relative"
                style={{
                  background: isOpen ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isOpen ? "rgba(0,245,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                  backdropFilter: "blur(12px)",
                  transition: "all 0.3s ease",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                >
                  <span className="text-white font-semibold text-base md:text-lg pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: isOpen ? "rgba(0,245,255,0.1)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isOpen ? "rgba(0,245,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    <Plus size={16} style={{ color: isOpen ? "#00f5ff" : "#475569" }} />
                  </motion.div>
                </button>

                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300"
                  style={{
                    background: isOpen ? "linear-gradient(180deg, #00f5ff, #7c3aed)" : "transparent",
                  }}
                />

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-5 md:px-6 pb-5 md:pb-6 pt-0 text-slate-400 leading-relaxed border-t"
                        style={{ borderColor: "rgba(255,255,255,0.05)" }}
                      >
                        <div className="pt-4">{faq.a}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
