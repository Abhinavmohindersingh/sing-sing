import React from "react";
import { motion } from "framer-motion";
import { Clock, Zap, X, Check } from "lucide-react";
import SectionTag from "../ui/SectionTag";

const ComparisonSection = ({ t }) => {
  const oldItems = t("comparisonOld");
  const newItems = t("comparisonNew");

  return (
    <section
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04050d 0%, #040308 50%, #04050d 100%)" }}
    >
      <div className="absolute inset-0 hud-grid opacity-20" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <SectionTag zone="ZONE 01.5" label="BEFORE & AFTER" color="green" />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #00ff88 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("comparisonTitle")}
          </h2>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-0 mb-8 flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <div
            className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Clock size={14} style={{ color: "rgba(255,255,255,0.5)" }} />
            <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
              {t("comparisonLeft")}
            </span>
          </div>
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-2 md:mx-3 font-display font-bold text-xs md:text-sm flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #00f5ff, #7c3aed)",
              color: "#000",
              boxShadow: "0 0 0 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,245,255,0.2)",
              zIndex: 2,
            }}
          >
            VS
          </div>
          <div
            className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full"
            style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)" }}
          >
            <Zap size={14} style={{ color: "#00ff88" }} />
            <span className="text-sm font-medium" style={{ color: "#00ff88" }}>
              {t("comparisonRight")}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{ background: "rgba(10,10,15,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="space-y-4">
              {oldItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(i * 0.06, 0.3), duration: 0.35 }}
                  viewport={{ once: true, margin: "-30px" }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <X size={10} style={{ color: "rgba(255,255,255,0.3)" }} />
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
            style={{
              background: "rgba(0,15,8,0.85)",
              border: "1px solid rgba(0,255,136,0.18)",
              boxShadow: "0 0 40px rgba(0,255,136,0.05)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.4), transparent)" }}
            />
            <div className="space-y-4">
              {newItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(i * 0.06, 0.3), duration: 0.35 }}
                  viewport={{ once: true, margin: "-30px" }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.3)" }}
                  >
                    <Check size={10} style={{ color: "#00ff88" }} />
                  </div>
                  <span className="text-sm text-white leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.3), transparent)" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
