import React from "react";
import { motion } from "framer-motion";

const BrowserFrame = ({ url = "app.singsinghai.com", children, className = "" }) => (
  <motion.div
    className={`rounded-2xl overflow-hidden bg-white ${className}`}
    style={{ border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 4px 12px rgba(15,23,42,0.05), 0 16px 40px rgba(15,23,42,0.08)" }}
    whileHover={{ y: -4, boxShadow: "0 8px 20px rgba(15,23,42,0.08), 0 24px 56px rgba(15,23,42,0.12)" }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
  >
    <div
      className="flex items-center gap-2 px-4 py-3"
      style={{
        background: "rgba(245,243,239,0.7)",
        backdropFilter: "blur(12px) saturate(1.4)",
        WebkitBackdropFilter: "blur(12px) saturate(1.4)",
        borderBottom: "1px solid rgba(15,23,42,0.06)",
      }}
    >
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
      </div>
      <div className="flex-1 mx-3 rounded-md px-3 py-1 text-xs text-center truncate bg-white/80 border border-slate-200 text-slate-400">
        {url}
      </div>
    </div>
    <div className="relative bg-white">{children}</div>
  </motion.div>
);

export default BrowserFrame;
