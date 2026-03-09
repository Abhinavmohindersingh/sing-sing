import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Clock, Shield } from "lucide-react";
import SectionTag from "../ui/SectionTag";
import NeonButton from "../ui/NeonButton";

const CTASection = ({ onStartQuiz, onOpenContact, t }) => {
  return (
    <section
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04050d 0%, #06050f 50%, #04050d 100%)" }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 50% 50%, rgba(0,245,255,0.06) 0%, transparent 60%)",
            "radial-gradient(ellipse at 60% 40%, rgba(124,58,237,0.06) 0%, transparent 60%)",
            "radial-gradient(ellipse at 40% 60%, rgba(0,255,136,0.05) 0%, transparent 60%)",
            "radial-gradient(ellipse at 50% 50%, rgba(0,245,255,0.06) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-0 hud-grid opacity-30" />

      <div className="absolute inset-0 holo-shimmer opacity-30" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center mb-8">
            <SectionTag zone="ZONE 07" label="BEGIN YOUR MISSION" color="cyan" />
          </div>

          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-none"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #00f5ff 40%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("ctaTitle")}
          </h2>

          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("ctaDescription")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <NeonButton variant="filled" color="cyan" size="xl" onClick={onStartQuiz}>
              {t("ctaButton")}
              <ArrowRight size={20} />
            </NeonButton>
            <NeonButton variant="outline" color="cyan" size="xl" onClick={onOpenContact}>
              {t("ctaSecondary")}
            </NeonButton>
          </div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Clock, value: t("ctaQuick"), label: "Quick Quiz" },
              { icon: Shield, value: t("ctaFree"), label: "No Card Needed" },
              { icon: Zap, value: t("ctaInstant"), label: "Results" },
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <badge.icon size={20} style={{ color: "rgba(0,245,255,0.5)" }} />
                <div className="text-xl md:text-2xl font-display font-bold" style={{ color: "#00f5ff" }}>
                  {badge.value}
                </div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">{badge.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {[
          { pos: "top-0 left-0", border: "borderTop borderLeft" },
          { pos: "top-0 right-0", border: "borderTop borderRight" },
          { pos: "bottom-0 left-0", border: "borderBottom borderLeft" },
          { pos: "bottom-0 right-0", border: "borderBottom borderRight" },
        ].map((corner, i) => (
          <div
            key={i}
            className={`absolute ${corner.pos} w-16 h-16 pointer-events-none`}
            style={{
              borderTop: corner.border.includes("borderTop") ? "1.5px solid rgba(0,245,255,0.3)" : "none",
              borderBottom: corner.border.includes("borderBottom") ? "1.5px solid rgba(0,245,255,0.3)" : "none",
              borderLeft: corner.border.includes("borderLeft") ? "1.5px solid rgba(0,245,255,0.3)" : "none",
              borderRight: corner.border.includes("borderRight") ? "1.5px solid rgba(0,245,255,0.3)" : "none",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CTASection;
