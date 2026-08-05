import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Calendar } from "lucide-react";

const CTASection = ({ onOpenContact, t }) => {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-none text-ink">
            {t("ctaTitle")}
          </h2>

          <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("ctaDescription")}
          </p>

          <div className="flex items-center justify-center mb-14">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white text-lg transition-transform hover:scale-[1.02]"
              style={{ background: "#2f5eec" }}
            >
              {t("ctaButton")}
              <ArrowRight size={20} />
            </button>
          </div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Calendar, value: t("ctaQuick"), label: "Meeting" },
              { icon: Shield, value: t("ctaFree"), label: "Commitment" },
              { icon: Zap, value: t("ctaInstant"), label: "Roadmap" },
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <badge.icon size={18} style={{ color: "#94a3b8" }} />
                <div className="text-xl md:text-2xl font-display font-bold text-ink">
                  {badge.value}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-widest">{badge.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
