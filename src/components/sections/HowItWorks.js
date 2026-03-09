import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Zap, TrendingUp, Sparkles, CheckCircle } from "lucide-react";
import SectionTag from "../ui/SectionTag";
import { SECTION_IDS } from "../../data/translations";

const icons = [Play, Zap, TrendingUp, Sparkles];
const stepColors = ["#00f5ff", "#a78bfa", "#00ff88", "#f59e0b"];

const HowItWorks = ({ t }) => {
  const phases = t("phases");
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Stagger unlock steps
          phases.forEach((_, i) => {
            setTimeout(() => setActiveStep(i), i * 400 + 200);
          });
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
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04050d 0%, #050a12 50%, #04050d 100%)" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 hud-grid opacity-50" />

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
            <SectionTag zone="ZONE 03" label="MISSION TIMELINE" color="cyan" />
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
            {t("howItWorksTitle")}
          </h2>
          <p className="text-lg md:text-xl text-slate-400">{t("howItWorksSubtitle")}</p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-16 left-[12.5%] right-[12.5%] h-px">
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,245,255,0.1)" }}
            />
            <motion.div
              className="absolute inset-0 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              style={{
                background: "linear-gradient(90deg, #00f5ff, #7c3aed, #00ff88, #f59e0b)",
              }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-4 gap-6">
            {phases.map((phase, i) => {
              const Icon = icons[i];
              const isActive = activeStep >= i;
              const color = stepColors[i];

              return (
                <div key={i} className="flex flex-col items-center">
                  {/* Node */}
                  <motion.div
                    className="relative w-12 h-12 rounded-full flex items-center justify-center mb-8 z-10"
                    animate={
                      isActive
                        ? {
                            boxShadow: [`0 0 0px ${color}00`, `0 0 20px ${color}80`, `0 0 10px ${color}40`],
                            scale: [1, 1.15, 1],
                          }
                        : {}
                    }
                    transition={{ duration: 0.6 }}
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${color}30, ${color}10)`
                        : "rgba(255,255,255,0.04)",
                      border: `2px solid ${isActive ? color : "rgba(255,255,255,0.1)"}`,
                      transition: "all 0.5s ease",
                    }}
                  >
                    <Icon size={20} style={{ color: isActive ? color : "#475569" }} />
                    {/* Step number */}
                    <span
                      className="absolute -top-5 font-mono text-xs font-bold"
                      style={{ color: isActive ? color : "#475569" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isActive ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="glass-card p-5 w-full text-center relative overflow-hidden"
                    style={{
                      border: `1px solid ${isActive ? color + "30" : "rgba(255,255,255,0.06)"}`,
                      transition: "border-color 0.5s ease",
                    }}
                  >
                    {/* Week badge */}
                    <div
                      className="font-mono text-xs font-bold mb-3"
                      style={{ color: isActive ? color : "#475569" }}
                    >
                      {phase.duration?.toUpperCase()}
                    </div>

                    <h3 className="text-lg font-display font-bold text-white mb-3 leading-tight">
                      {phase.step}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                      {phase.description}
                    </p>
                    <ul className="space-y-2">
                      {phase.details.map((detail, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2 text-xs text-slate-400"
                        >
                          <CheckCircle
                            size={12}
                            style={{ color: isActive ? color : "#475569", flexShrink: 0 }}
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    {/* Active glow */}
                    {isActive && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-px"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
                        }}
                      />
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="lg:hidden space-y-6">
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
                className="glass-card p-6 relative overflow-hidden"
                style={{ borderLeft: `3px solid ${color}60` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${color}20, ${color}08)`,
                      border: `1px solid ${color}40`,
                    }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs font-bold" style={{ color }}>
                        {phase.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-white mb-2">{phase.step}</h3>
                    <p className="text-sm text-slate-400 mb-3 leading-relaxed">{phase.description}</p>
                    <ul className="space-y-1.5">
                      {phase.details.map((detail, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-slate-400">
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
    </section>
  );
};

export default HowItWorks;
