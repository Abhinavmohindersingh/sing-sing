import React from "react";
import { motion } from "framer-motion";

const ProblemSection = ({ t }) => {
  const problems = t("problems");

  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink max-w-2xl leading-tight">
            {t("problemTitle")}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mt-5">
            {t("problemSubtitle")}
          </p>
        </motion.div>

        <div className="border-t border-slate-200">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              className="grid md:grid-cols-[auto,1fr] gap-4 md:gap-10 py-8 border-b border-slate-200 items-baseline"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.08, 0.3), duration: 0.5 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <span className="text-sm font-mono text-slate-300 md:w-16">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-ink mb-2">
                  {problem.title}
                </h3>
                <p className="text-slate-500 leading-relaxed max-w-xl mb-2">{problem.description}</p>
                <span className="text-sm font-medium" style={{ color: "#7c5cfc" }}>
                  {problem.stats}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
