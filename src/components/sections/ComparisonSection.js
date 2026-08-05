import React from "react";
import { motion } from "framer-motion";
import {
  X, Sparkles, Flame, Clock, Megaphone, Bot, HelpCircle, TrendingUp,
  Target, Send, Brain, BarChart3, Rocket,
} from "lucide-react";

const oldIcons = [Flame, Clock, Megaphone, Bot, HelpCircle, TrendingUp];
const newIcons = [Target, Clock, Send, Brain, BarChart3, Rocket];

const ComparisonSection = ({ t }) => {
  const oldItems = t("comparisonOld");
  const newItems = t("comparisonNew");

  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4">
            <span className="text-ink">{t("comparisonLeft")}</span>{" "}
            <span className="text-slate-300">vs</span>{" "}
            <span style={{ color: "#2f5eec" }}>{t("comparisonRight")}</span>
          </h2>
          <p className="text-lg text-slate-500">
            The difference isn't just automation. It's <span style={{ color: "#2f5eec" }}>transformation</span>.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-2 gap-6 md:gap-0">
          <motion.div
            className="rounded-2xl p-6 md:p-8 bg-white md:rounded-r-none"
            style={{ border: "1px solid rgba(15,23,42,0.1)" }}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2.5 mb-6 pb-5 border-b border-slate-100">
              <X size={16} style={{ color: "#94a3b8" }} />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                {t("comparisonLeft")}
              </span>
            </div>
            <div className="space-y-1">
              {oldItems.map((item, i) => {
                const Icon = oldIcons[i] || Flame;
                return (
                  <motion.div
                    key={i}
                    className={`flex items-center gap-4 py-4 ${i < oldItems.length - 1 ? "border-b border-slate-100" : ""}`}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.06, 0.3), duration: 0.35 }}
                    viewport={{ once: true, margin: "-30px" }}
                  >
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-mist-100">
                      <Icon size={15} style={{ color: "#94a3b8" }} />
                    </div>
                    <span className="text-sm text-slate-500 leading-snug">{item}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl p-6 md:p-8 bg-white md:rounded-l-none md:-ml-px"
            style={{ border: "1px solid rgba(47,94,236,0.3)", boxShadow: "0 4px 12px rgba(47,94,236,0.06), 0 16px 40px rgba(47,94,236,0.08)" }}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2.5 mb-6 pb-5 border-b border-slate-100">
              <Sparkles size={16} style={{ color: "#2f5eec" }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#2f5eec" }}>
                {t("comparisonRight")}
              </span>
            </div>
            <div className="space-y-1">
              {newItems.map((item, i) => {
                const Icon = newIcons[i] || Target;
                return (
                  <motion.div
                    key={i}
                    className={`flex items-center gap-4 py-4 ${i < newItems.length - 1 ? "border-b border-slate-100" : ""}`}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.06, 0.3), duration: 0.35 }}
                    viewport={{ once: true, margin: "-30px" }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #2f5eec, #3f6ff2)" }}
                    >
                      <Icon size={15} color="#fff" />
                    </div>
                    <span className="text-sm text-ink font-medium leading-snug">{item}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full items-center justify-center font-display font-bold text-sm bg-white z-10"
            style={{ border: "1.5px solid rgba(47,94,236,0.35)", color: "#2f5eec", boxShadow: "0 4px 12px rgba(15,23,42,0.08)" }}
          >
            VS
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
