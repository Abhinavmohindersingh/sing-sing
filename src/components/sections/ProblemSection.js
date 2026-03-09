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
      style={{ background: "linear-gradient(180deg, #04050d 0%, #08040a 50%, #04050d 100%)" }}
    >
      {/* HUD grid background */}
      <div className="absolute inset-0 hud-grid opacity-60" />

      {/* Red tint blob */}
      <div
        className="radial-blob w-[600px] h-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "rgba(255, 107, 53, 0.04)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <SectionTag zone="ZONE 01" label="PAIN POINTS DETECTED" color="orange" />
          </div>
          <h2
            className="text-4xl md:text-6xl font-display font-bold mb-6"
            style={{
              background: "linear-gradient(135deg, #ff6b35, #ff2d78)",
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

        {/* Problem cards */}
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
                glowColor="orange"
                delay={i * 0.1}
                className="p-6 md:p-8 relative"
              >
                {/* ALERT badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className="alert-badge inline-flex items-center gap-1 font-mono text-xs font-bold px-2 py-1 rounded"
                    style={{
                      background: "rgba(255, 107, 53, 0.15)",
                      border: "1px solid rgba(255, 107, 53, 0.4)",
                      color: "#ff6b35",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
                    ALERT
                  </span>
                </div>

                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,107,53,0.2), rgba(255,45,120,0.1))",
                      border: "1px solid rgba(255,107,53,0.3)",
                    }}
                  >
                    <Icon size={24} style={{ color: "#ff6b35" }} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3">
                      {problem.title}
                    </h3>
                    <p className="text-slate-400 mb-4 leading-relaxed">{problem.description}</p>
                    <div
                      className="inline-flex items-center gap-2 font-mono text-sm font-semibold"
                      style={{ color: "#ff6b35" }}
                    >
                      <AlertTriangle size={14} />
                      {problem.stats}
                    </div>
                  </div>
                </div>

                {/* Bottom scan line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.4), transparent)",
                  }}
                />
              </GlowCard>
            );
          })}
        </motion.div>

        {/* Divider arrow */}
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
