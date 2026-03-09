import React from "react";
import { motion } from "framer-motion";

const NeonButton = ({
  children,
  variant = "filled",
  color = "cyan",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ...props
}) => {
  const colorStyles = {
    cyan: {
      filled: {
        background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))",
        border: "1.5px solid rgba(0,245,255,0.5)",
        color: "#ffffff",
        hoverShadow: "0 0 25px rgba(0,245,255,0.35), 0 0 50px rgba(0,245,255,0.1)",
      },
      outline: {
        background: "transparent",
        border: "1.5px solid rgba(0,245,255,0.5)",
        color: "#00f5ff",
        hoverShadow: "0 0 20px rgba(0,245,255,0.3)",
      },
      ghost: {
        background: "transparent",
        border: "1.5px solid rgba(255,255,255,0.12)",
        color: "#94a3b8",
        hoverShadow: "none",
      },
    },
    orange: {
      filled: {
        background: "linear-gradient(135deg, rgba(255,107,53,0.2), rgba(255,45,120,0.15))",
        border: "1.5px solid rgba(255,107,53,0.5)",
        color: "#ffffff",
        hoverShadow: "0 0 25px rgba(255,107,53,0.35)",
      },
      outline: {
        background: "transparent",
        border: "1.5px solid rgba(255,107,53,0.5)",
        color: "#ff6b35",
        hoverShadow: "0 0 20px rgba(255,107,53,0.3)",
      },
    },
    green: {
      filled: {
        background: "linear-gradient(135deg, rgba(0,255,136,0.15), rgba(6,182,212,0.15))",
        border: "1.5px solid rgba(0,255,136,0.5)",
        color: "#ffffff",
        hoverShadow: "0 0 25px rgba(0,255,136,0.35)",
      },
      outline: {
        background: "transparent",
        border: "1.5px solid rgba(0,255,136,0.5)",
        color: "#00ff88",
        hoverShadow: "0 0 20px rgba(0,255,136,0.3)",
      },
    },
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg",
  };

  const style = (colorStyles[color] || colorStyles.cyan)[variant] || colorStyles.cyan.filled;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2
        font-mono font-semibold uppercase tracking-widest
        rounded-lg transition-all duration-300
        disabled:opacity-40 disabled:cursor-not-allowed
        ${sizeStyles[size]} ${className}
      `}
      style={{
        background: style.background,
        border: style.border,
        color: style.color,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.boxShadow = style.hoverShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default NeonButton;
