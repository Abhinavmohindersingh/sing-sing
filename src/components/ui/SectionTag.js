import React from "react";

const SectionTag = ({ zone, label, color = "cyan" }) => {
  const colorMap = {
    cyan: "rgba(0,245,255,0.3)",
    orange: "rgba(255,107,53,0.3)",
    green: "rgba(0,255,136,0.3)",
    purple: "rgba(124,58,237,0.3)",
  };
  const textColorMap = {
    cyan: "#00f5ff",
    orange: "#ff6b35",
    green: "#00ff88",
    purple: "#a78bfa",
  };
  const bgMap = {
    cyan: "rgba(0,245,255,0.06)",
    orange: "rgba(255,107,53,0.06)",
    green: "rgba(0,255,136,0.06)",
    purple: "rgba(124,58,237,0.06)",
  };

  return (
    <span
      className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full border"
      style={{
        color: textColorMap[color],
        borderColor: colorMap[color],
        background: bgMap[color],
        letterSpacing: "0.2em",
      }}
    >
      {zone && <span className="opacity-60">[{zone}]</span>}
      {label}
    </span>
  );
};

export default SectionTag;
