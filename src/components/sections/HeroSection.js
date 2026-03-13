import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, CheckCircle } from "lucide-react";
import { LiquidButton } from "../ui/liquid-glass-button";
import { SplineScene } from "../ui/splite";
import { Spotlight } from "../ui/spotlight";

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
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.02;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
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


const HeroSection = ({ onOpenContact, t }) => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const valueProps = t("heroValueProps") || [];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 pt-16 pb-8 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #0a0d1a 0%, #04050d 60%)" }}
    >
      <NeuralCanvas />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(0,245,255,0.3)" />

      <div
        className="radial-blob morphing-blob w-[500px] h-[500px] left-1/4 top-1/4"
        style={{ background: "rgba(0, 245, 255, 0.035)" }}
      />
      <div
        className="radial-blob morphing-blob w-[400px] h-[400px] right-1/4 bottom-1/3"
        style={{ background: "rgba(124, 58, 237, 0.04)", animationDelay: "-5s" }}
      />

      {/* 3D Spline Scene - full background */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        style={{ opacity: 0.35 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
      >
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </motion.div>

      {/* Hero content - centered */}
      <div className="max-w-7xl mx-auto relative z-10 w-full flex items-center" style={{ pointerEvents: "none" }}>

        {/* Content */}
        <motion.div
          className="w-full text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-none tracking-tight"
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
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {t("heroDescription")}
          </motion.p>

          {/* Value propositions */}
          {valueProps.length > 0 && (
            <motion.ul
              variants={itemVariants}
              className="space-y-3 mb-10 max-w-xl mx-auto"
            >
              {valueProps.map((prop, i) => (
                <li key={i} className="flex items-center gap-3 justify-center">
                  <CheckCircle size={16} style={{ color: "#00f5ff", flexShrink: 0 }} />
                  <span className="text-sm text-slate-300">{prop}</span>
                </li>
              ))}
            </motion.ul>
          )}

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-14"
          >
            <div style={{ pointerEvents: "auto" }}>
              <LiquidButton size="xl" onClick={onOpenContact}>
                {t("heroCTA")}
                <ArrowRight size={18} />
              </LiquidButton>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {[
              { value: "95%", label: "Efficiency Gain" },
              { value: "2–8wk", label: "Time to ROI" },
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
