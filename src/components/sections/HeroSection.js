import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Zap, MessageSquare, BarChart3, Clock } from "lucide-react";
import NeonButton from "../ui/NeonButton";

const NeuralCanvas = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const NODE_COUNT = window.innerWidth < 768 ? 50 : 90;
    const MAX_DIST = window.innerWidth < 768 ? 120 : 160;
    const MOUSE_RADIUS = 140;

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.02;
          node.vx += dx / dist * force;
          node.vy += dy / dist * force;
        }
        node.vx *= 0.99;
        node.vy *= 0.99;
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.2;
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, `rgba(0, 245, 255, ${alpha})`);
            grad.addColorStop(0.5, `rgba(124, 58, 237, ${alpha * 0.7})`);
            grad.addColorStop(1, `rgba(0, 255, 136, ${alpha})`);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        const pulse = Math.sin(t * 2 + node.pulsePhase) * 0.3 + 0.7;
        const r = node.radius * pulse;
        const alpha = node.opacity * pulse;
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 5);
        glow.addColorStop(0, `rgba(0, 245, 255, ${alpha * 0.5})`);
        glow.addColorStop(0.5, `rgba(124, 58, 237, ${alpha * 0.15})`);
        glow.addColorStop(1, "rgba(0, 245, 255, 0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${alpha})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="neural-canvas"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
};

const MiniWorkflowWidget = () => (
  <motion.div
    className="dashboard-widget p-4 w-48"
    initial={{ opacity: 0, x: 40, y: 20 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
  >
    <div className="font-mono text-xs text-slate-500 mb-3">WORKFLOW</div>
    {["Count hours", "Add to CRM", "Send invoice"].map((step, i) => (
      <div key={i} className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {i === 0 ? <Clock size={10} style={{ color: "#fff" }} /> :
           i === 1 ? <BarChart3 size={10} style={{ color: "#fff" }} /> :
           <Zap size={10} style={{ color: "#fff" }} />}
        </div>
        <span className="text-xs text-slate-400 flex-1">{step}</span>
        <div className="w-3 h-3">
          {i === 0 && <div className="w-3 h-3 rounded-full" style={{ background: "#01b501" }} />}
          {i === 1 && <div className="w-3 h-3 rounded-full" style={{ background: "#ff9800" }} />}
          {i === 2 && <div className="w-3 h-3 rounded-full" style={{ background: "#b50000" }} />}
        </div>
      </div>
    ))}
    <div className="h-1 w-full rounded-full mt-2 overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: "linear-gradient(90deg, #00f5ff, #7c3aed)", width: "66%" }}
        initial={{ width: 0 }}
        animate={{ width: "66%" }}
        transition={{ delay: 2.8, duration: 1.5, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);

const MiniChatWidget = () => (
  <motion.div
    className="dashboard-widget p-4 w-44"
    initial={{ opacity: 0, x: -40, y: 20 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
  >
    <div className="font-mono text-xs text-slate-500 mb-3">AI CHATBOT</div>
    <div className="space-y-2">
      <div className="flex gap-2 items-end">
        <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }} />
        <div className="rounded-md p-1.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex gap-1">
            <div className="w-8 h-1 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="w-5 h-1 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
          <div className="flex gap-1 mt-1">
            <div className="w-6 h-1 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="w-4 h-1 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-end justify-end">
        <div className="rounded-md p-1.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex gap-1">
            <div className="w-10 h-1 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="w-3 h-1 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
        </div>
        <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0" style={{ background: "rgba(0,245,255,0.15)" }} />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-3 p-1.5 rounded" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <span className="text-xs text-slate-500 flex-1">Custom chat bots</span>
      <MessageSquare size={10} style={{ color: "rgba(255,255,255,0.4)" }} />
    </div>
  </motion.div>
);

const HeroBadge = ({ text }) => {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full overflow-hidden max-w-[90vw]"
      style={{
        background: "rgba(26, 26, 26, 0.9)",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "2px",
      }}
    >
      <div
        className="px-2 py-1 rounded-full text-xs font-mono font-medium flex-shrink-0"
        style={{ background: "rgba(0,245,255,0.2)", color: "#00f5ff" }}
      >
        New
      </div>
      <AnimatePresence>
        {revealed && (
          <motion.span
            className="text-xs font-mono text-slate-300 pr-3 truncate"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

const HeroSection = ({ onOpenContact, onOpenQuiz, t }) => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #0a0d1a 0%, #04050d 60%)" }}
    >
      <NeuralCanvas />

      <div
        className="radial-blob morphing-blob w-[500px] h-[500px] left-1/4 top-1/4"
        style={{ background: "rgba(0, 245, 255, 0.035)" }}
      />
      <div
        className="radial-blob morphing-blob w-[400px] h-[400px] right-1/4 bottom-1/3"
        style={{ background: "rgba(124, 58, 237, 0.04)", animationDelay: "-5s" }}
      />


      <div className="absolute top-24 left-6 md:left-12 pointer-events-none hidden md:block">
        <div className="font-mono text-xs text-cyan-400/30 space-y-1">
          <div>SYS.STATUS: ONLINE</div>
          <div>AI.CORES: 8/8 ACTIVE</div>
          <div>UPTIME: 99.97%</div>
        </div>
      </div>
      <div className="absolute top-24 right-6 md:right-12 pointer-events-none text-right hidden md:block">
        <div className="font-mono text-xs text-cyan-400/30 space-y-1">
          <div>ZONE.00</div>
          <div>NEURAL ODYSSEY</div>
          <div className="text-green-400/40">● READY</div>
        </div>
      </div>

      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-4">
          <HeroBadge text={t("badge")} />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-none tracking-tight"
        >
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #00f5ff 0%, #7c3aed 50%, #00ff88 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("heroTitle1")}
          </span>
          <span className="block text-white mt-2">{t("heroTitle2")}</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {t("heroDescription")}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <NeonButton variant="filled" color="cyan" size="lg" onClick={onOpenContact}>
            {t("heroCTA")}
            <ArrowRight size={18} />
          </NeonButton>
          <NeonButton variant="outline" color="cyan" size="lg" onClick={onOpenQuiz}>
            {t("heroSecondary")}
          </NeonButton>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {[
            { value: "95%", label: "Efficiency Gain" },
            { value: "2-8wk", label: "Time to ROI" },
            { value: "24/7", label: "AI Uptime" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold font-mono mb-1"
                style={{ color: "#00f5ff" }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating dashboard widgets */}
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 hidden lg:block">
        <MiniWorkflowWidget />
      </div>
      <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 hidden lg:block">
        <MiniChatWidget />
      </div>

      <motion.div
        className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="font-mono text-xs text-slate-600 uppercase tracking-widest text-center">
          {t("heroScroll")}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={20} style={{ color: "#00f5ff" }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
