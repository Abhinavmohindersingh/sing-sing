import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import SectionTag from "../ui/SectionTag";
import { SECTION_IDS } from "../../data/translations";

const industryColors = [
  { primary: "#00f5ff", secondary: "rgba(0,245,255,0.08)", gradient: "linear-gradient(230deg, rgba(0,245,255,0.15) 0%, rgba(0,245,255,0.02) 33%)" },
  { primary: "#a78bfa", secondary: "rgba(167,139,250,0.08)", gradient: "linear-gradient(230deg, rgba(167,139,250,0.15) 0%, rgba(167,139,250,0.02) 33%)" },
  { primary: "#00ff88", secondary: "rgba(0,255,136,0.08)", gradient: "linear-gradient(230deg, rgba(0,255,136,0.15) 0%, rgba(0,255,136,0.02) 33%)" },
  { primary: "#f59e0b", secondary: "rgba(245,158,11,0.08)", gradient: "linear-gradient(230deg, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.02) 33%)" },
  { primary: "#fb7185", secondary: "rgba(251,113,133,0.08)", gradient: "linear-gradient(230deg, rgba(251,113,133,0.15) 0%, rgba(251,113,133,0.02) 33%)" },
  { primary: "#38bdf8", secondary: "rgba(56,189,248,0.08)", gradient: "linear-gradient(230deg, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.02) 33%)" },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const CaseStudies = ({ t }) => {
  const useCases = t("useCases");
  const [[activeIndex, direction], setActive] = useState([0, 0]);

  const paginate = useCallback(
    (dir) => {
      setActive(([prev]) => {
        const next = (prev + dir + useCases.length) % useCases.length;
        return [next, dir];
      });
    },
    [useCases.length]
  );

  const goTo = useCallback((idx) => {
    setActive(([prev]) => [idx, idx > prev ? 1 : -1]);
  }, []);

  const colors = industryColors[activeIndex % industryColors.length];
  const useCase = useCases[activeIndex];

  return (
    <section
      id={SECTION_IDS.caseStudies}
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04050d 0%, #060810 50%, #04050d 100%)" }}
    >
      <div className="absolute inset-0 hud-grid opacity-40" />
      <div
        className="radial-blob w-[600px] h-[600px] right-0 top-1/2 -translate-y-1/2"
        style={{ background: "rgba(124, 58, 237, 0.04)" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
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

        {/* Carousel */}
        <div className="relative">
          {/* Arrow buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,245,255,0.1)";
              e.currentTarget.style.borderColor = "rgba(0,245,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <ChevronLeft size={20} style={{ color: "#94a3b8" }} />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,245,255,0.1)";
              e.currentTarget.style.borderColor = "rgba(0,245,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <ChevronRight size={20} style={{ color: "#94a3b8" }} />
          </button>

          {/* Card container with fixed height to prevent layout shift */}
          <div className="relative overflow-hidden mx-8 md:mx-0" style={{ minHeight: 420 }}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="rounded-[17px] p-px relative"
                style={{ background: colors.gradient, position: "absolute", width: "100%", top: 0, left: 0 }}
              >
                <div
                  className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
                  style={{ background: "rgba(8, 8, 15, 0.95)" }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}80, transparent)` }}
                  />

                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold" style={{ color: "rgba(0,245,255,0.4)", letterSpacing: "0.15em" }}>
                      CASE #{String(activeIndex + 1).padStart(3, "0")}
                    </span>
                    <span
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ background: colors.secondary, color: colors.primary, border: `1px solid ${colors.primary}40` }}
                    >
                      {useCase.industry}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-5">
                      <div>
                        <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: `${colors.primary}80` }}>
                          Challenge
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">{useCase.challenge}</p>
                      </div>

                      <div>
                        <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: colors.primary + "80" }}>
                          AI Solution
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{useCase.solution}</p>
                      </div>

                      <div className="pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-3xl md:text-4xl font-display font-bold mb-0.5" style={{ color: colors.primary }}>
                              {useCase.metrics.primary}
                            </div>
                            <div className="text-xs text-slate-500">{useCase.metrics.label}</div>
                          </div>
                          <div>
                            <div className="text-xl font-display font-bold text-white mb-0.5">
                              {useCase.metrics.secondary}
                            </div>
                            <div className="text-xs text-slate-500">
                              {useCase.metrics.secondaryLabel || "Improvement"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                        What Gets Automated
                      </div>
                      <ul className="space-y-3">
                        {useCase.processes.map((process, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-sm text-slate-400"
                          >
                            <div
                              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ background: colors.secondary, border: `1px solid ${colors.primary}30` }}
                            >
                              <CheckCircle size={13} style={{ color: colors.primary }} />
                            </div>
                            {process}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}40, transparent)` }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators + counter */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="font-mono text-xs mr-2" style={{ color: "rgba(0,245,255,0.4)" }}>
              {String(activeIndex + 1).padStart(2, "0")} / {String(useCases.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2">
              {useCases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative transition-all duration-300"
                  style={{
                    width: i === activeIndex ? 28 : 8,
                    height: 8,
                    borderRadius: 4,
                    background:
                      i === activeIndex
                        ? industryColors[i % industryColors.length].primary
                        : "rgba(255,255,255,0.12)",
                    boxShadow:
                      i === activeIndex
                        ? `0 0 10px ${industryColors[i % industryColors.length].primary}60`
                        : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
