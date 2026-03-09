import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionTag from "../ui/SectionTag";

const TestimonialsSection = ({ t }) => {
  const testimonials = t("testimonials");

  return (
    <section
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04050d 0%, #060810 50%, #04050d 100%)" }}
    >
      <div className="absolute inset-0 hud-grid opacity-20" />
      <div
        className="radial-blob w-[500px] h-[500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "rgba(0,245,255,0.03)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <SectionTag zone="ZONE 05.5" label="CLIENT SIGNALS" color="cyan" />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4"
            style={{
              background: "linear-gradient(135deg, #00f5ff, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("testimonialsTitle")}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t("testimonialsSubtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((item, i) => {
            const accentColors = ["#00f5ff", "#a78bfa", "#00ff88"];
            const accent = accentColors[i % accentColors.length];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.1, 0.3) }}
                viewport={{ once: true, margin: "-30px" }}
                className="rounded-2xl p-6 md:p-7 relative overflow-hidden flex flex-col"
                style={{
                  background: "rgba(8,8,15,0.9)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}50, transparent)` }}
                />

                <Quote
                  size={24}
                  className="mb-4 flex-shrink-0"
                  style={{ color: `${accent}40` }}
                />

                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                  ))}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6 flex-1">
                  "{item.review}"
                </p>

                <div
                  className="pt-4 border-t flex items-center gap-3"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm"
                    style={{
                      background: `linear-gradient(135deg, ${accent}25, ${accent}08)`,
                      border: `1px solid ${accent}40`,
                      color: accent,
                    }}
                  >
                    {item.userName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.userName}</div>
                    <div className="text-xs font-mono" style={{ color: `${accent}90` }}>
                      {item.designation}
                    </div>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}30, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
