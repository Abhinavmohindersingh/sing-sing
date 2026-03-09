import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import SectionTag from "../ui/SectionTag";
import GlowCard from "../ui/GlowCard";
import { SECTION_IDS } from "../../data/translations";

const industryColors = [
  { primary: "#00f5ff", secondary: "rgba(0,245,255,0.08)" },
  { primary: "#a78bfa", secondary: "rgba(167,139,250,0.08)" },
  { primary: "#00ff88", secondary: "rgba(0,255,136,0.08)" },
  { primary: "#f59e0b", secondary: "rgba(245,158,11,0.08)" },
  { primary: "#fb7185", secondary: "rgba(251,113,133,0.08)" },
  { primary: "#38bdf8", secondary: "rgba(56,189,248,0.08)" },
];

const CaseStudies = ({ t }) => {
  const useCases = t("useCases");

  return (
    <section
      id={SECTION_IDS.caseStudies}
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04050d 0%, #060810 50%, #04050d 100%)" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 hud-grid opacity-40" />

      {/* Purple blob */}
      <div
        className="radial-blob w-[600px] h-[600px] right-0 top-1/2 -translate-y-1/2"
        style={{ background: "rgba(124, 58, 237, 0.04)" }}
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
            <SectionTag zone="ZONE 04" label="DEPLOYMENT RECORDS" color="purple" />
          </div>
          <h2
            className="text-4xl md:text-6xl font-display font-bold mb-6"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #00f5ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("caseStudiesTitle")}
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            {t("caseStudiesSubtitle")}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, i) => {
            const colors = industryColors[i % industryColors.length];

            return (
              <GlowCard
                key={i}
                glowColor="white"
                delay={i * 0.08}
                className="p-6 flex flex-col h-full relative overflow-hidden"
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${colors.primary}80, transparent)`,
                  }}
                />

                {/* Case number + industry */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: "rgba(0,245,255,0.4)", letterSpacing: "0.15em" }}
                  >
                    CASE #{String(i + 1).padStart(3, "0")}
                  </span>
                  <span
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{
                      background: colors.secondary,
                      color: colors.primary,
                      border: `1px solid ${colors.primary}40`,
                    }}
                  >
                    {useCase.industry}
                  </span>
                </div>

                {/* Pain point */}
                <div className="mb-4">
                  <div
                    className="font-mono text-xs uppercase tracking-widest mb-2"
                    style={{ color: "rgba(255,107,53,0.6)" }}
                  >
                    Challenge
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{useCase.challenge}</p>
                </div>

                {/* Solution */}
                <div className="mb-4">
                  <div
                    className="font-mono text-xs uppercase tracking-widest mb-2"
                    style={{ color: colors.primary + "80" }}
                  >
                    AI Solution
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{useCase.solution}</p>
                </div>

                {/* Automated processes */}
                <div className="mb-6 flex-1">
                  <div
                    className="font-mono text-xs uppercase tracking-widest mb-3"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    What Gets Automated
                  </div>
                  <ul className="space-y-2">
                    {useCase.processes.map((process, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle
                          size={13}
                          style={{ color: colors.primary, flexShrink: 0, marginTop: 1 }}
                        />
                        {process}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div
                  className="pt-4 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div
                        className="text-2xl md:text-3xl font-display font-bold mb-0.5"
                        style={{ color: colors.primary }}
                      >
                        {useCase.metrics.primary}
                      </div>
                      <div className="text-xs text-slate-500">{useCase.metrics.label}</div>
                    </div>
                    <div>
                      <div className="text-lg font-display font-bold text-white mb-0.5">
                        {useCase.metrics.secondary}
                      </div>
                      <div className="text-xs text-slate-500">
                        {useCase.metrics.secondaryLabel || "Improvement"}
                      </div>
                    </div>
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
