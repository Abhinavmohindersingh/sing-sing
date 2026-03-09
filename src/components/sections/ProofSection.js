import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionTag from "../ui/SectionTag";

// Animated count-up number
const CountUp = ({ end, duration = 1500, suffix = "", prefix = "" }) => {
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);
  const elemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Handle non-numeric endings like "95%", "2-8 weeks", "24/7"
          if (isNaN(parseFloat(end))) {
            // Just animate appearance for complex values
            setTimeout(() => setDisplay(end), duration * 0.8);
            return;
          }
          const endNum = parseFloat(end);
          const startTime = performance.now();
          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * endNum);
            setDisplay(prefix + current + suffix);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (elemRef.current) observer.observe(elemRef.current);
    return () => observer.disconnect();
  }, [end, duration, prefix, suffix]);

  return <span ref={elemRef} className="count-up">{display || (prefix + "0" + suffix)}</span>;
};

const statConfigs = [
  { valueKey: "value", color: "#00f5ff", label: "Avg. Efficiency Gain", description: "Across all integrated clients" },
  { valueKey: "value", color: "#00ff88", label: "Time to ROI", description: "From deployment to payback" },
  { valueKey: "value", color: "#a78bfa", label: "System Uptime", description: "Guaranteed AI availability" },
];

const ProofSection = ({ t }) => {
  const stats = t("stats");
  const industryResults = t("industryResults");

  return (
    <section
      className="relative py-24 md:py-32 px-4 overflow-hidden scanlines"
      style={{ background: "linear-gradient(180deg, #04050d 0%, #070814 50%, #04050d 100%)" }}
    >
      {/* HUD grid */}
      <div className="absolute inset-0 hud-grid opacity-60" />

      {/* Green blob */}
      <div
        className="radial-blob w-[500px] h-[500px] left-0 top-1/2 -translate-y-1/2"
        style={{ background: "rgba(0, 255, 136, 0.03)" }}
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

        {/* Stats dashboard */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => {
            const color = statConfigs[i]?.color || "#00f5ff";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center relative overflow-hidden hud-corner-tl hud-corner-tr"
              >
                {/* Dashboard label */}
                <div
                  className="font-mono text-xs font-bold mb-4 uppercase tracking-widest"
                  style={{ color: color + "60" }}
                >
                  METRIC.{String(i + 1).padStart(2, "0")}
                </div>

                {/* Big value */}
                <div
                  className="text-4xl md:text-5xl font-display font-bold mb-3"
                  style={{ color }}
                >
                  {stat.value}
                </div>

                <div className="text-white font-medium mb-2">{stat.label}</div>
                <div className="text-xs text-slate-500">
                  {statConfigs[i]?.description || "Measured across clients"}
                </div>

                {/* Glow bg */}
                <div
                  className="radial-blob w-32 h-32 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ background: color + "08" }}
                />

                {/* Bottom scan line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Industry results grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3
            className="text-center text-2xl font-display font-bold mb-8"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <span className="font-mono text-sm" style={{ color: "#00f5ff" }}>// </span>
            Industry Outcomes
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industryResults.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                viewport={{ once: true }}
                className="glass-card p-5 relative overflow-hidden"
              >
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: "#00f5ff", letterSpacing: "0.15em" }}
                >
                  {result.industry.toUpperCase()}
                </span>
                <p className="text-white font-medium mt-2 mb-1 text-sm leading-relaxed">
                  {result.result}
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">{result.impact}</p>
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5"
                  style={{ background: "linear-gradient(180deg, #00f5ff40, transparent)" }}
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
