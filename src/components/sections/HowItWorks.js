import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Zap, TrendingUp, Sparkles, CheckCircle } from "lucide-react";
import { SECTION_IDS } from "../../data/translations";

const icons = [Play, Zap, TrendingUp, Sparkles];
const stepColors = ["#2f5eec", "#2f5eec", "#2f5eec", "#2f5eec"];

const HowItWorks = ({ t }) => {
  const phases = t("phases");
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef = useRef(null);

  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          phases.forEach((_, i) => {
            setTimeout(() => setActiveStep(i), i * 500 + 300);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [phases]);

  return (
    <section
      id={SECTION_IDS.howItWorks}
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 overflow-hidden bg-mist-100"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-ink">
            {t("howItWorksTitle")}
          </h2>
          <p className="text-lg md:text-xl text-slate-500">{t("howItWorksSubtitle")}</p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-16 left-[12.5%] right-[12.5%] h-px">
            <div className="absolute inset-0" style={{ background: "rgba(15,23,42,0.08)" }} />
            <motion.div
              className="absolute inset-0 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              style={{
                background: "#2f5eec",
              }}
            />
          </div>

          <div className="grid grid-cols-4 gap-6">
            {phases.map((phase, i) => {
              const Icon = icons[i];
              const isActive = activeStep >= i;
              const color = stepColors[i];

              return (
                <div key={i} className="flex flex-col items-center">
                  <motion.div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center mb-8 z-10"
                    animate={isActive ? { scale: [1, 1.12, 1] } : {}}
                    transition={{ duration: 0.6 }}
                    style={{
                      background: isActive ? `${color}18` : "#f1f3fa",
                      border: `2px solid ${isActive ? color : "rgba(15,23,42,0.1)"}`,
                      transition: "all 0.5s ease",
                    }}
                  >
                    <Icon size={22} style={{ color: isActive ? color : "#94a3b8" }} />
                    <span
                      className="absolute -top-6 font-mono text-xs font-bold"
                      style={{ color: isActive ? color : "#94a3b8" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isActive ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="glass-card p-5 w-full text-center relative overflow-hidden"
                    style={{
                      border: `1px solid ${isActive ? color + "40" : "var(--card-border)"}`,
                      transition: "border-color 0.5s ease",
                    }}
                  >
                    <div className="font-mono text-xs font-bold mb-3" style={{ color: isActive ? color : "#94a3b8" }}>
                      {phase.duration?.toUpperCase()}
                    </div>
                    <h3 className="text-lg font-display font-bold text-ink mb-3 leading-tight">
                      {phase.step}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">{phase.description}</p>
                    <ul className="space-y-2">
                      {phase.details.map((detail, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-slate-500">
                          <CheckCircle size={12} style={{ color: isActive ? color : "#94a3b8", flexShrink: 0 }} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="lg:hidden relative">
          <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: "rgba(15,23,42,0.08)" }}>
            <motion.div
              className="absolute left-0 top-0 w-full origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{
                height: "100%",
                background: "#2f5eec",
              }}
            />
          </div>
          <div className="space-y-6 pl-4">
            {phases.map((phase, i) => {
              const Icon = icons[i];
              const color = stepColors[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 relative overflow-hidden ml-8"
                  style={{ borderLeft: `3px solid ${color}` }}
                >
                  <div
                    className="absolute -left-[2.35rem] top-6 w-4 h-4 rounded-full z-10"
                    style={{
                      background: color,
                      border: "2px solid #faf8f5",
                    }}
                  />
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${color}18`,
                        border: `1px solid ${color}40`,
                      }}
                    >
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs font-bold" style={{ color }}>{phase.duration}</span>
                      </div>
                      <h3 className="text-lg font-display font-bold text-ink mb-2">{phase.step}</h3>
                      <p className="text-sm text-slate-500 mb-3 leading-relaxed">{phase.description}</p>
                      <ul className="space-y-1.5">
                        {phase.details.map((detail, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs text-slate-500">
                            <CheckCircle size={12} style={{ color, flexShrink: 0 }} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
