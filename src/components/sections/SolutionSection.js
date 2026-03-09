import React from "react";
import { motion } from "framer-motion";
import { Zap, BarChart3, TrendingUp, CheckCircle } from "lucide-react";
import SectionTag from "../ui/SectionTag";
import GlowCard from "../ui/GlowCard";

const icons = [Zap, BarChart3, TrendingUp];

const glowColors = ["cyan", "purple", "green"];
const iconGradients = [
  "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.15))",
  "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(0,245,255,0.1))",
  "linear-gradient(135deg, rgba(0,255,136,0.2), rgba(6,182,212,0.1))",
];
const iconColors = ["#00f5ff", "#a78bfa", "#00ff88"];

const SolutionSection = ({ t }) => {
  const solutions = t("solutions");

  return (
    <section
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04050d 0%, #06091a 50%, #04050d 100%)" }}
    >
      {/* HUD grid */}
      <div className="absolute inset-0 hud-grid" />

      {/* Cyan glow blob center */}
      <div
        className="radial-blob w-[500px] h-[500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "rgba(0, 245, 255, 0.03)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <SectionTag zone="ZONE 02" label="AI SYSTEMS ONLINE" color="cyan" />
          </div>
          <h2
            className="text-4xl md:text-6xl font-display font-bold mb-6"
            style={{
              background: "linear-gradient(135deg, #00f5ff, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("solutionTitle")}
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            {t("solutionSubtitle")}
          </p>
        </motion.div>

        {/* Solution cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((sol, i) => {
            const Icon = icons[i];
            return (
              <GlowCard
                key={i}
                glowColor={glowColors[i]}
                delay={i * 0.15}
                className="p-6 md:p-8"
              >
                {/* Status badge */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: iconColors[i], letterSpacing: "0.15em" }}
                  >
                    SYS.{String(i + 1).padStart(2, "0")} ● ACTIVE
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: iconGradients[i],
                    border: `1px solid ${iconColors[i]}40`,
                    boxShadow: `0 0 20px ${iconColors[i]}20`,
                  }}
                >
                  <Icon size={24} style={{ color: iconColors[i] }} />
                </div>

                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3">
                  {sol.title}
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{sol.description}</p>

                {/* Features */}
                <ul className="space-y-3">
                  {sol.features.map((feature, j) => (
                    <motion.li
                      key={j}
                      className="flex items-center gap-3 text-slate-300 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + j * 0.08, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle size={16} style={{ color: iconColors[i], flexShrink: 0 }} />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${iconColors[i]}60, transparent)`,
                  }}
                />
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
