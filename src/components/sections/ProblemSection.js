import React from "react";
import { motion } from "framer-motion";
import { Target, Clock, TrendingUp, Users, AlertTriangle } from "lucide-react";
import SectionTag from "../ui/SectionTag";
import GlowCard from "../ui/GlowCard";

const icons = [Target, Clock, TrendingUp, Users];

const ProblemSection = ({ t }) => {
  const problems = t("problems");

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <section
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04050d 0%, #08061a 50%, #04050d 100%)" }}
    >
      <div className="absolute inset-0 hud-grid opacity-60" />

      <div
        className="radial-blob w-[600px] h-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "rgba(139, 92, 246, 0.04)" }}
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
            <SectionTag zone="ZONE 01" label="THREAT ANALYSIS" color="purple" />
          </div>
          <h2
            className="text-4xl md:text-6xl font-display font-bold mb-6"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("problemTitle")}
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            {t("problemSubtitle")}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {problems.map((problem, i) => {
            const Icon = icons[i];
            return (
              <GlowCard
                key={i}
                glowColor="purple"
                delay={i * 0.1}
                className="p-6 md:p-8 relative"
              >
                <div className="flex items-start gap-4 md:gap-5">
                  <div
                    className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.1))",
                      border: "1px solid rgba(139,92,246,0.3)",
                    }}
                  >
                    <Icon size={24} style={{ color: "#a78bfa" }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-lg md:text-2xl font-display font-bold text-white leading-tight">
                        {problem.title}
                      </h3>
                      <span
                        className="alert-badge inline-flex items-center gap-1 font-mono text-xs font-bold px-2 py-1 rounded flex-shrink-0"
                        style={{
                          background: "rgba(139, 92, 246, 0.12)",
                          border: "1px solid rgba(139, 92, 246, 0.35)",
                          color: "#a78bfa",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#a78bfa" }} />
                        DETECTED
                      </span>
                    </div>
                    <p className="text-slate-400 mb-4 leading-relaxed">{problem.description}</p>
                    <div
                      className="inline-flex items-center gap-2 font-mono text-sm font-semibold"
                      style={{ color: "#a78bfa" }}
                    >
                      <AlertTriangle size={14} />
                      {problem.stats}
                    </div>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)",
                  }}
                />
              </GlowCard>
            );
          })}
        </motion.div>

        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div
            className="font-mono text-xs text-center"
            style={{ color: "rgba(0,245,255,0.4)" }}
          >
            <div className="mb-2">▼ AI SOLUTION INCOMING ▼</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
