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
  const glowMap = {
    cyan: "0 0 0 1px rgba(0,245,255,0.15), 0 0 20px rgba(0,245,255,0.05)",
    orange: "0 0 0 1px rgba(255,107,53,0.2), 0 0 20px rgba(255,107,53,0.06)",
    green: "0 0 0 1px rgba(0,255,136,0.15), 0 0 20px rgba(0,255,136,0.05)",
    purple: "0 0 0 1px rgba(124,58,237,0.2), 0 0 20px rgba(124,58,237,0.06)",
    white: "0 0 0 1px rgba(255,255,255,0.08)",
  };
  const hoverGlowMap = {
    cyan: "0 0 0 1px rgba(0,245,255,0.4), 0 0 30px rgba(0,245,255,0.15)",
    orange: "0 0 0 1px rgba(255,107,53,0.4), 0 0 30px rgba(255,107,53,0.15)",
    green: "0 0 0 1px rgba(0,255,136,0.4), 0 0 30px rgba(0,255,136,0.15)",
    purple: "0 0 0 1px rgba(124,58,237,0.4), 0 0 30px rgba(124,58,237,0.15)",
    white: "0 0 0 1px rgba(255,255,255,0.15)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className={`glass-card relative overflow-hidden ${hover ? "glow-card-hover" : ""} ${className}`}
      style={{
        boxShadow: glowMap[glowColor],
        willChange: "transform, opacity",
      }}
      onMouseEnter={(e) => {
        if (hover) e.currentTarget.style.boxShadow = hoverGlowMap[glowColor];
      }}
      onMouseLeave={(e) => {
        if (hover) e.currentTarget.style.boxShadow = glowMap[glowColor];
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlowCard;
