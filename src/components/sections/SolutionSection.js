import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { MarketingAutomationDemo, ComplianceDemo, KnowledgeAssistantDemo } from "./SolutionDemos";

const demoComponents = [MarketingAutomationDemo, ComplianceDemo, KnowledgeAssistantDemo];

const SolutionSection = ({ t }) => {
  const solutions = t("solutions");

  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink max-w-2xl leading-tight">
            {t("solutionTitle")}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mt-5">{t("solutionSubtitle")}</p>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {solutions.map((sol, i) => {
            const reversed = i % 2 === 1;
            const DemoComponent = demoComponents[i] || MarketingAutomationDemo;
            return (
              <motion.div
                key={i}
                className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${reversed ? "md:[direction:rtl]" : ""}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div style={reversed ? { direction: "ltr" } : undefined}>
                  <span className="text-sm font-mono text-slate-300">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-ink mt-2 mb-4">
                    {sol.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed mb-6 max-w-md">{sol.description}</p>
                  <ul className="space-y-2.5">
                    {sol.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                        <CheckCircle size={15} style={{ color: "#0ea570", flexShrink: 0 }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={reversed ? { direction: "ltr" } : undefined}>
                  <DemoComponent />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
