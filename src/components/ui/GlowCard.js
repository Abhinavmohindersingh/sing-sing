import React from "react";
import { motion } from "framer-motion";

const GlowCard = ({
  children,
  className = "",
  glowColor = "cyan",
  delay = 0,
  hover = true,
  ...props
}) => {
  const borderMap = {
    cyan: "rgba(47,94,236,0.14)",
    orange: "rgba(217,119,6,0.16)",
    green: "rgba(14,165,112,0.16)",
    purple: "rgba(124,92,252,0.16)",
    white: "rgba(15,23,42,0.08)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className={`glass-card relative overflow-hidden ${hover ? "glow-card-hover" : ""} ${className}`}
      style={{
        borderColor: borderMap[glowColor],
        willChange: "transform, opacity",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlowCard;
