import React from "react";

const dotMap = {
  cyan: "#2f5eec",
  orange: "#d97706",
  green: "#0ea570",
  purple: "#7c5cfc",
};

const SectionTag = ({ label, color = "cyan" }) => (
  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">
    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dotMap[color] }} />
    {label}
  </span>
);

export default SectionTag;
