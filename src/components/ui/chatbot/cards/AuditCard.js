import React from "react";
import { motion } from "framer-motion";
import { Globe, Layers, AlertCircle, CheckCircle } from "lucide-react";

const Chip = ({ label, color = "#00f5ff" }) => (
  <span
    className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full font-mono"
    style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
  >
    {label}
  </span>
);

const AuditCard = ({ data }) => {
  if (!data || data.error) return null;

  const { url, title, industry, tech_signals, pain_points_detected, description } = data;

  const hostname = (() => {
    try { return new URL(url).hostname.replace("www.", ""); }
    catch { return url; }
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="rounded-xl overflow-hidden w-full"
      style={{
        background: "rgba(255,107,53,0.03)",
        border: "1px solid rgba(255,107,53,0.15)",
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ borderBottom: "1px solid rgba(255,107,53,0.1)", background: "rgba(0,0,0,0.2)" }}
      >
        <Globe size={13} style={{ color: "#ff6b35" }} />
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "#ff6b35" }}>
          Website Analysed
        </span>
        <span className="ml-auto text-[10px] text-slate-500 font-mono truncate">
          {hostname}
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Title + industry */}
        {title && (
          <div>
            <p className="text-white text-xs font-semibold leading-tight truncate">{title}</p>
            {industry && (
              <p className="text-slate-500 text-[10px] mt-0.5">{industry}</p>
            )}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">{description}</p>
        )}

        {/* Tech stack */}
        {tech_signals?.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Layers size={10} style={{ color: "#7c3aed" }} />
              <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: "#7c3aed" }}>Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {tech_signals.map((t) => <Chip key={t} label={t} color="#7c3aed" />)}
            </div>
          </div>
        )}

        {/* Pain points */}
        {pain_points_detected?.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertCircle size={10} style={{ color: "#ff6b35" }} />
              <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: "#ff6b35" }}>Automation Opportunities</span>
            </div>
            <div className="space-y-1">
              {pain_points_detected.map((p) => (
                <div key={p} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <CheckCircle size={10} style={{ color: "#00ff88", flexShrink: 0 }} />
                  {p}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AuditCard;
