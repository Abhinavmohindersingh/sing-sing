import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, Search, Sparkles } from "lucide-react";
import BrowserFrame from "../ui/BrowserFrame";

const useReveal = () => {
  const [active, setActive] = useState(false);
  const triggered = useRef(false);
  const onViewportEnter = () => {
    if (triggered.current) return;
    triggered.current = true;
    setActive(true);
  };
  return { active, onViewportEnter };
};

/* ── 1. Marketing automation: content calendar filling in ── */
export const MarketingAutomationDemo = () => {
  const { active, onViewportEnter } = useReveal();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const filled = [true, true, false, true, false, true, false];

  return (
    <motion.div onViewportEnter={onViewportEnter} viewport={{ once: true, amount: 0.4 }}>
      <BrowserFrame url="app.singsinghai.com/marketing">
        <div className="p-6 min-h-[260px]">
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-semibold text-ink">Content calendar</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <Sparkles size={12} style={{ color: "#7c5cfc" }} />
              Auto-generated
            </span>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-5">
            {days.map((d, i) => (
              <div key={d} className="text-center">
                <div className="text-[10px] text-slate-400 mb-1.5">{d}</div>
                <motion.div
                  className="aspect-square rounded-lg flex items-center justify-center"
                  style={{ background: filled[i] ? "#eef4ff" : "#f5f3ef" }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={active ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.35 }}
                >
                  {filled[i] && <CheckCircle2 size={14} style={{ color: "#2f5eec" }} />}
                </motion.div>
              </div>
            ))}
          </div>
          <motion.div
            className="rounded-xl px-4 py-3 bg-mist-100 text-xs text-slate-500 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            Thursday's post generated — awaiting your approval
          </motion.div>
        </div>
      </BrowserFrame>
    </motion.div>
  );
};

/* ── 2. Compliance: document scan + field extraction ── */
export const ComplianceDemo = () => {
  const { active, onViewportEnter } = useReveal();
  const fields = [
    { label: "Invoice #4471", delay: 0.3 },
    { label: "GST amount verified", delay: 0.7 },
    { label: "Vendor matched to ledger", delay: 1.1 },
  ];

  return (
    <motion.div onViewportEnter={onViewportEnter} viewport={{ once: true, amount: 0.4 }}>
      <BrowserFrame url="app.singsinghai.com/compliance">
        <div className="p-6 min-h-[260px] grid grid-cols-[auto,1fr] gap-6 items-center">
          <div className="relative w-20 h-24 rounded-lg bg-mist-100 flex-shrink-0 overflow-hidden">
            <FileText size={28} className="absolute inset-0 m-auto" style={{ color: "#94a3b8" }} />
            <motion.div
              className="absolute left-0 right-0 h-0.5"
              style={{ background: "#2f5eec" }}
              initial={{ top: "0%", opacity: 0 }}
              animate={active ? { top: ["0%", "100%"], opacity: [0, 1, 0] } : {}}
              transition={{ duration: 1.4, ease: "linear" }}
            />
          </div>
          <div className="space-y-3">
            {fields.map((f, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 text-sm text-ink"
                initial={{ opacity: 0, x: -8 }}
                animate={active ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: f.delay, duration: 0.35 }}
              >
                <CheckCircle2 size={15} style={{ color: "#0ea570", flexShrink: 0 }} />
                {f.label}
              </motion.div>
            ))}
          </div>
        </div>
      </BrowserFrame>
    </motion.div>
  );
};

/* ── 3. Internal knowledge assistant: search + answer ── */
const QUERY = "What's our refund policy for enterprise clients?";

export const KnowledgeAssistantDemo = () => {
  const { active, onViewportEnter } = useReveal();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setQuery(QUERY.slice(0, i));
      if (i >= QUERY.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [active]);

  return (
    <motion.div onViewportEnter={onViewportEnter} viewport={{ once: true, amount: 0.4 }}>
      <BrowserFrame url="app.singsinghai.com/knowledge">
        <div className="p-6 min-h-[260px] flex flex-col justify-center">
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-mist-100 mb-4">
            <Search size={15} style={{ color: "#94a3b8", flexShrink: 0 }} />
            <span className="text-sm text-ink">{query}</span>
          </div>
          <motion.div
            className="rounded-xl border p-4"
            style={{ borderColor: "rgba(47,94,236,0.2)", background: "#eef4ff" }}
            initial={{ opacity: 0, y: 8 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.4 }}
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold mb-2" style={{ color: "#2f5eec" }}>
              <Sparkles size={12} />
              From your policy docs
            </div>
            <p className="text-sm text-ink leading-relaxed">
              Enterprise clients receive a full refund within 30 days of signing, prorated after.
            </p>
          </motion.div>
        </div>
      </BrowserFrame>
    </motion.div>
  );
};
