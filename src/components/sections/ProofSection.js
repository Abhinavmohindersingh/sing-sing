import React from "react";
import { motion } from "framer-motion";
import SectionTag from "../ui/SectionTag";

const statConfigs = [
  { color: "#00f5ff", description: "Across all integrated clients", fillWidth: "95%" },
  { color: "#00ff88", description: "From deployment to payback", fillWidth: "75%" },
  { color: "#a78bfa", description: "Guaranteed AI availability", fillWidth: "100%" },
];

const ProofSection = ({ t }) => {
  const stats = t("stats");
  const industryResults = t("industryResults");

  return (
    <section
      className="relative py-24 md:py-32 px-4 overflow-hidden scanlines"
      style={{ background: "linear-gradient(180deg, #04050d 0%, #070814 50%, #04050d 100%)" }}
    >
      <div className="absolute inset-0 hud-grid opacity-60" />
      <div
        className="radial-blob w-[500px] h-[500px] left-0 top-1/2 -translate-y-1/2"
        style={{ background: "rgba(0, 255, 136, 0.03)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <SectionTag zone="ZONE 05" label="SYSTEM DIAGNOSTICS" color="green" />
          </div>
          <h2
            className="text-4xl md:text-6xl font-display font-bold mb-6"
            style={{
              background: "linear-gradient(135deg, #00ff88, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("proofTitle")}
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            {t("proofSubtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => {
            const config = statConfigs[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                viewport={{ once: true }}
                className="dashboard-widget p-8 text-center relative overflow-hidden hud-corner-tl hud-corner-tr"
              >
                <div className="font-mono text-xs font-bold mb-4 uppercase tracking-widest" style={{ color: config.color + "60" }}>
                  METRIC.{String(i + 1).padStart(2, "0")}
                </div>

                <div className="text-4xl md:text-5xl font-display font-bold mb-3" style={{ color: config.color }}>
                  {stat.value}
                </div>

                <div className="text-white font-medium mb-2">{stat.label}</div>
                <div className="text-xs text-slate-500 mb-4">{config.description}</div>

                <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${config.color}80, ${config.color})` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: config.fillWidth }}
                    transition={{ delay: i * 0.2 + 0.5, duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>

                <div className="radial-blob w-32 h-32 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: config.color + "08" }} />
                <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${config.color}60, transparent)` }} />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-center text-2xl font-display font-bold mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
            <span className="font-mono text-sm" style={{ color: "#00f5ff" }}>// </span>
            Industry Outcomes
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industryResults.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.07, 0.3), duration: 0.4 }}
                viewport={{ once: true, margin: "-30px" }}
                className="glass-card p-5 relative overflow-hidden group"
              >
                <span className="font-mono text-xs font-bold" style={{ color: "#00f5ff", letterSpacing: "0.15em" }}>
                  {result.industry.toUpperCase()}
                </span>
                <p className="text-white font-medium mt-2 mb-1 text-sm leading-relaxed">{result.result}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{result.impact}</p>
                <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: "linear-gradient(180deg, #00f5ff40, transparent)" }} />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(90deg, transparent, #00f5ff40, transparent)" }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofSection;
