import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, TrendingUp } from "lucide-react";
import BrowserFrame from "../ui/BrowserFrame";

const RESPONSE = "You're spending 23 hrs/week on manual reconciliation. Automating this could save you $41K/year.";

const useTypewriter = (text, active, speed = 18) => {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) return;
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [active, text, speed]);
  return out;
};

const useCountUp = (target, active, duration = 1200) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
};

const HeroProductDemo = () => {
  const [active, setActive] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const typed = useTypewriter(RESPONSE, showResponse);
  const hours = useCountUp(23, active);
  const savings = useCountUp(41, active);
  const bars = [40, 65, 50, 80, 60, 95];
  const triggered = useRef(false);

  const handleEnter = () => {
    if (triggered.current) return;
    triggered.current = true;
    setActive(true);
    setTimeout(() => setShowResponse(true), 500);
  };

  return (
    <motion.div onViewportEnter={handleEnter} viewport={{ once: true, amount: 0.4 }}>
      <BrowserFrame url="app.singsinghai.com/dashboard">
        <div className="grid md:grid-cols-[1.3fr,1fr] min-h-[280px] md:min-h-[340px]">
          {/* Chat pane */}
          <div className="p-6 md:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#eef4ff" }}>
                <Bot size={16} style={{ color: "#2f5eec" }} />
              </div>
              <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-mist-100 text-sm text-ink leading-relaxed max-w-md min-h-[3rem]">
                {typed}
                {showResponse && typed.length < RESPONSE.length && (
                  <span className="inline-block w-0.5 h-3.5 ml-0.5 align-middle bg-ink animate-pulse" />
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 pl-11">
              <Sparkles size={12} style={{ color: "#7c5cfc" }} />
              <span className="text-xs text-slate-400">Trained on your business data</span>
            </div>
          </div>

          {/* Insights pane */}
          <div className="p-6 md:p-8 flex flex-col justify-center gap-6 bg-mist-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-display font-bold text-ink">{hours}<span className="text-base">hrs/wk</span></div>
                <div className="text-xs text-slate-400 mt-0.5">Time reclaimed</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold" style={{ color: "#0ea570" }}>${savings}K</div>
                <div className="text-xs text-slate-400 mt-0.5">Annual savings</div>
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{ background: i === bars.length - 1 ? "#2f5eec" : "#dfe4ee" }}
                  initial={{ height: 0 }}
                  animate={{ height: active ? `${h}%` : 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "#0ea570" }}>
              <TrendingUp size={12} />
              Efficiency trending up
            </div>
          </div>
        </div>
      </BrowserFrame>
    </motion.div>
  );
};

export default HeroProductDemo;
