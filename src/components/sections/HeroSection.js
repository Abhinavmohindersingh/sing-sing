import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import HeroProductDemo from "./HeroProductDemo";

const HeroSection = ({ onOpenContact, t }) => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative px-4 pt-32 pb-16 md:pt-40 md:pb-20 bg-white">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.05] tracking-tight text-ink"
        >
          {t("heroTitle1")} {t("heroTitle2")}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-9 leading-relaxed"
        >
          {t("heroDescription")}
        </motion.p>

        <motion.div variants={itemVariants} className="flex items-center justify-center gap-6">
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white transition-transform hover:scale-[1.02]"
            style={{ background: "#2f5eec" }}
          >
            {t("heroCTA")}
            <ArrowRight size={16} />
          </button>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1 font-medium"
            style={{ color: "#2f5eec" }}
          >
            See how it works
            <ChevronRight size={16} />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="max-w-5xl mx-auto mt-16 md:mt-20"
      >
        <HeroProductDemo />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="max-w-4xl mx-auto mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-4"
      >
        {[
          { value: "95%", label: "Efficiency gain" },
          { value: "2–8wk", label: "Time to ROI" },
          { value: "24/7", label: "AI uptime" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <span className="text-xl font-display font-bold text-ink">{stat.value}</span>
            <span className="text-sm text-slate-400 ml-2">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;
