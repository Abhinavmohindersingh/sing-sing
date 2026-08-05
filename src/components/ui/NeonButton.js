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
        background: "#2f5eec",
        border: "1.5px solid #2f5eec",
        color: "#ffffff",
        hoverShadow: "0 8px 20px rgba(47,94,236,0.25)",
      },
      outline: {
        background: "transparent",
        border: "1.5px solid rgba(47,94,236,0.4)",
        color: "#2f5eec",
        hoverShadow: "none",
      },
      ghost: {
        background: "transparent",
        border: "1.5px solid rgba(15,23,42,0.12)",
        color: "#334155",
        hoverShadow: "none",
      },
    },
    orange: {
      filled: {
        background: "#d97706",
        border: "1.5px solid #d97706",
        color: "#ffffff",
        hoverShadow: "0 8px 20px rgba(217,119,6,0.25)",
      },
      outline: {
        background: "transparent",
        border: "1.5px solid rgba(217,119,6,0.4)",
        color: "#b45309",
        hoverShadow: "none",
      },
    },
    green: {
      filled: {
        background: "#0ea570",
        border: "1.5px solid #0ea570",
        color: "#ffffff",
        hoverShadow: "0 8px 20px rgba(14,165,112,0.25)",
      },
      outline: {
        background: "transparent",
        border: "1.5px solid rgba(14,165,112,0.4)",
        color: "#0ea570",
        hoverShadow: "none",
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
        font-semibold tracking-wide
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
