import React from "react";
import { motion } from "framer-motion";

const ProofSection = ({ t }) => {
  const stats = t("stats");
  const industryResults = t("industryResults");
  const statDescriptions = [
    "Across all integrated clients",
    "From deployment to payback",
    "Guaranteed AI availability",
  ];

  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink max-w-2xl leading-tight">
            {t("proofTitle")}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mt-5">{t("proofSubtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8 md:gap-12 pb-20 mb-20 border-b border-slate-200">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-5xl md:text-6xl font-display font-bold text-ink mb-2"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.12 + 0.15, type: "spring", stiffness: 200, damping: 14 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <div className="text-ink font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-slate-400">{statDescriptions[i]}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-display font-bold mb-8 text-ink">Industry Outcomes</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {industryResults.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.25), duration: 0.4 }}
                viewport={{ once: true, margin: "-30px" }}
              >
                <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
                  {result.industry}
                </span>
                <p className="text-ink font-medium mt-2 mb-1 text-sm leading-relaxed">{result.result}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{result.impact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofSection;
