import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, DollarSign, TrendingUp, CheckCircle, Zap } from "lucide-react";

// Animated number counter
const CountUp = ({ target, prefix = "", suffix = "", duration = 1.2 }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = (Date.now() - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  return <span>{prefix}{value.toLocaleString()}{suffix}</span>;
};

const ROICard = ({ data }) => {
  const { solution_name, features, implementation_weeks, monthly_ai_cost, roi_calculations } = data;
  const { weekly_hours_saved, annual_savings_dollars, roi_percent, payback_months } = roi_calculations;

  const tiles = [
    {
      icon: Clock,
      label: "Hours Saved / Week",
      value: weekly_hours_saved,
      suffix: " hrs",
      color: "#00f5ff",
      bg: "rgba(0,245,255,0.06)",
      border: "rgba(0,245,255,0.15)",
    },
    {
      icon: DollarSign,
      label: "Annual Savings",
      value: annual_savings_dollars,
      prefix: "$",
      color: "#00ff88",
      bg: "rgba(0,255,136,0.06)",
      border: "rgba(0,255,136,0.15)",
    },
    {
      icon: TrendingUp,
      label: "ROI",
      value: roi_percent,
      suffix: "%",
      color: "#7c3aed",
      bg: "rgba(124,58,237,0.06)",
      border: "rgba(124,58,237,0.15)",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="rounded-xl overflow-hidden w-full"
      style={{
        background: "rgba(0,245,255,0.03)",
        border: "1px solid rgba(0,245,255,0.12)",
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ borderBottom: "1px solid rgba(0,245,255,0.08)", background: "rgba(0,0,0,0.2)" }}
      >
        <Zap size={13} style={{ color: "#00f5ff" }} />
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "#00f5ff" }}>
          ROI Analysis
        </span>
        <span className="ml-auto text-[10px] text-slate-500 font-mono truncate max-w-[55%] text-right">
          {solution_name}
        </span>
      </div>

      {/* Metric tiles */}
      <div className="grid grid-cols-3 gap-2 p-3">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="rounded-lg p-2.5 flex flex-col items-center text-center"
            style={{ background: tile.bg, border: `1px solid ${tile.border}` }}
          >
            <tile.icon size={14} style={{ color: tile.color, marginBottom: 4 }} />
            <div className="font-mono font-bold text-base leading-tight" style={{ color: tile.color }}>
              <CountUp target={tile.value} prefix={tile.prefix || ""} suffix={tile.suffix || ""} />
            </div>
            <div className="text-[9px] text-slate-500 mt-1 leading-tight">{tile.label}</div>
          </div>
        ))}
      </div>

      {/* Details row */}
      <div
        className="flex items-center justify-between px-4 py-2 text-[10px] font-mono"
        style={{ borderTop: "1px solid rgba(0,245,255,0.06)", color: "#475569" }}
      >
        <span>Implementation: <span style={{ color: "#94a3b8" }}>{implementation_weeks} weeks</span></span>
        <span>Payback: <span style={{ color: "#94a3b8" }}>{payback_months} months</span></span>
        <span>Cost: <span style={{ color: "#94a3b8" }}>${monthly_ai_cost}/mo</span></span>
      </div>

      {/* Features */}
      {features?.length > 0 && (
        <div className="px-4 pb-3 space-y-1.5">
          {features.slice(0, 3).map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] text-slate-400">
              <CheckCircle size={11} style={{ color: "#00ff88", flexShrink: 0 }} />
              {f}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ROICard;
