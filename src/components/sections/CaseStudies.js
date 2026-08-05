import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { SECTION_IDS } from "../../data/translations";

const industryColors = Array.from({ length: 6 }, () => ({ primary: "#2f5eec", secondary: "#eef4ff" }));

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
      className="relative py-24 md:py-32 px-4 overflow-hidden bg-mist-100"
    >
      <div
        className="radial-blob w-[600px] h-[600px] right-0 top-1/2 -translate-y-1/2"
        style={{ background: "rgba(124, 92, 252, 0.05)" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-ink">
            {t("caseStudiesTitle")}
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto">
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
              background: "#ffffff",
              border: "1px solid rgba(15,23,42,0.1)",
              boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#eef4ff";
              e.currentTarget.style.borderColor = "rgba(47,94,236,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.borderColor = "rgba(15,23,42,0.1)";
            }}
          >
            <ChevronLeft size={20} style={{ color: "#64748b" }} />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(15,23,42,0.1)",
              boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#eef4ff";
              e.currentTarget.style.borderColor = "rgba(47,94,236,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.borderColor = "rgba(15,23,42,0.1)";
            }}
          >
            <ChevronRight size={20} style={{ color: "#64748b" }} />
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
                className="rounded-2xl relative"
                style={{ position: "absolute", width: "100%", top: 0, left: 0 }}
              >
                <div
                  className="rounded-2xl p-8 md:p-10 relative overflow-hidden bg-white shadow-card-lg"
                  style={{ border: "1px solid rgba(15,23,42,0.08)" }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: colors.primary }}
                  />

                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-slate-400" style={{ letterSpacing: "0.15em" }}>
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
                        <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: colors.primary }}>
                          Challenge
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{useCase.challenge}</p>
                      </div>

                      <div>
                        <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: colors.primary }}>
                          AI Solution
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">{useCase.solution}</p>
                      </div>

                      <div className="pt-4 border-t border-slate-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-3xl md:text-4xl font-display font-bold mb-0.5" style={{ color: colors.primary }}>
                              {useCase.metrics.primary}
                            </div>
                            <div className="text-xs text-slate-500">{useCase.metrics.label}</div>
                          </div>
                          <div>
                            <div className="text-xl font-display font-bold text-ink mb-0.5">
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
                      <div className="font-mono text-xs uppercase tracking-widest mb-3 text-slate-400">
                        What Gets Automated
                      </div>
                      <ul className="space-y-3">
                        {useCase.processes.map((process, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-sm text-slate-500"
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
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators + counter */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="font-mono text-xs mr-2 text-slate-400">
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
                        : "rgba(15,23,42,0.12)",
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
