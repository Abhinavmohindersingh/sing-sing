import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import NeonButton from "../ui/NeonButton";

// Neural network canvas animation
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

    // Node configuration
    const NODE_COUNT = window.innerWidth < 768 ? 45 : 80;
    const MAX_DIST = window.innerWidth < 768 ? 120 : 160;
    const MOUSE_RADIUS = 120;

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      nodes.forEach((node) => {
        // Mouse attraction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.015;
          node.vx += dx / dist * force;
          node.vy += dy / dist * force;
        }

        // Damping & move
        node.vx *= 0.99;
        node.vy *= 0.99;
        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25;
            // Gradient line
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, `rgba(0, 245, 255, ${alpha})`);
            grad.addColorStop(0.5, `rgba(124, 58, 237, ${alpha * 0.8})`);
            grad.addColorStop(1, `rgba(0, 255, 136, ${alpha})`);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const pulse = Math.sin(t * 2 + node.pulsePhase) * 0.3 + 0.7;
        const r = node.radius * pulse;
        const alpha = node.opacity * pulse;

        // Glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4);
        glow.addColorStop(0, `rgba(0, 245, 255, ${alpha * 0.6})`);
        glow.addColorStop(1, "rgba(0, 245, 255, 0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
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
      {/* Neural network canvas */}
      <NeuralCanvas />

      {/* Radial glow blobs */}
      <div
        className="radial-blob w-96 h-96 left-1/4 top-1/4"
        style={{ background: "rgba(0, 245, 255, 0.04)" }}
      />
      <div
        className="radial-blob w-80 h-80 right-1/4 bottom-1/3"
        style={{ background: "rgba(124, 58, 237, 0.05)" }}
      />

      {/* HUD corner decorations */}
      <div className="absolute top-24 left-6 md:left-12 pointer-events-none">
        <div className="font-mono text-xs text-cyan-400/30 space-y-1">
          <div>SYS.STATUS: ONLINE</div>
          <div>AI.CORES: 8/8 ACTIVE</div>
          <div>UPTIME: 99.97%</div>
        </div>
      </div>
      <div className="absolute top-24 right-6 md:right-12 pointer-events-none text-right">
        <div className="font-mono text-xs text-cyan-400/30 space-y-1">
          <div>ZONE.00</div>
          <div>INITIALIZING</div>
          <div className="text-green-400/40">● READY</div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <span className="section-tag">
            <Sparkles size={12} className="text-cyan-400 animate-pulse" />
            {t("badge")}
          </span>
        </motion.div>

        {/* Title */}
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

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {t("heroDescription")}
        </motion.p>

        {/* CTA buttons */}
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

        {/* Stats strip */}
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

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="font-mono text-xs text-slate-600 uppercase tracking-widest">
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
