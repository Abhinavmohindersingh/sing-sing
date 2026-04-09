import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Maximize2, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/ui/Navbar";
import ContactModal from "../components/ui/ContactModal";
import { t as translate } from "../data/translations";

const DEMOS = [
  {
    id: "tax",
    label: "Tax Automation",
    title: "Tax Automation System",
    description:
      "AI-powered tax processing — upload documents, extract data with 99.9% accuracy, and generate audit-ready reports in seconds.",
    src: "/demo.mp4",
    poster: "/demo-thumbnail.png",
    accent: "#a78bfa",
    stats: [
      { value: "3 min", label: "Full walkthrough" },
      { value: "90%", label: "Less manual filing" },
      { value: "Live", label: "Real system" },
    ],
  },
  {
    id: "marketing",
    label: "Marketing Product",
    title: "Marketing Product",
    description:
      "AI-driven marketing automation — generate campaigns, track performance, and optimise outreach in real time.",
    src: "/marketing.mp4",
    poster: null,
    accent: "#00f5ff",
    stats: [
      { value: "10x", label: "Faster campaigns" },
      { value: "24/7", label: "Automated outreach" },
      { value: "Live", label: "Real system" },
    ],
  },
];

/* ── Inline video player ── */
const VideoPlayer = ({ demo }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
    setProgress(0);
    setHasStarted(false);
  }, [demo.id]);

  useEffect(() => {
    const onHide = () => {
      if (document.hidden && videoRef.current) {
        videoRef.current.pause();
        setPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else { v.play(); setPlaying(true); setHasStarted(true); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleSeek = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  const openFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();
  };

  return (
    <div
      className="rounded-2xl overflow-hidden w-full"
      style={{
        border: `1px solid ${demo.accent}55`,
        boxShadow: `0 0 60px ${demo.accent}20, 0 30px 80px rgba(0,0,0,0.6)`,
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: "rgba(8,10,22,0.97)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div
          className="flex-1 mx-4 rounded-md px-3 py-1 text-xs font-mono text-center truncate"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "rgba(148,163,184,0.7)",
          }}
        >
          SingSinghAI · {demo.title}
        </div>
        <div className="font-mono text-xs" style={{ color: `${demo.accent}99` }}>● LIVE</div>
      </div>

      {/* Video */}
      <div className="relative bg-black" style={{ aspectRatio: "2000/1400" }}>
        <video
          ref={videoRef}
          src={demo.src}
          poster={demo.poster || undefined}
          muted={muted}
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
        {!playing && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            style={{ background: hasStarted ? "rgba(4,5,13,0.45)" : "transparent" }}
            onClick={togglePlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, rgba(124,58,237,0.85), ${demo.accent}aa)`,
                border: `2px solid ${demo.accent}66`,
                boxShadow: `0 0 50px ${demo.accent}44`,
              }}
            >
              <Play size={32} fill="white" style={{ color: "white", marginLeft: 4 }} />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: "rgba(6,8,18,0.97)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa" }}
        >
          {playing ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: 1 }} />}
        </button>
        <div
          className="flex-1 h-1.5 rounded-full cursor-pointer"
          style={{ background: "rgba(255,255,255,0.08)" }}
          onClick={handleSeek}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, #7c3aed, ${demo.accent})`,
              transition: "width 0.1s linear",
            }}
          />
        </div>
        <button
          onClick={toggleMute}
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: muted ? "#475569" : "#94a3b8" }}
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
        <button
          onClick={openFullscreen}
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}
        >
          <Maximize2 size={15} />
        </button>
      </div>
    </div>
  );
};

/* ── 3-D Ring Carousel ── */
const Carousel3D = ({ activeIndex, onSelect }) => {
  const n = DEMOS.length;
  const angleStep = 360 / n;
  // radius scales with number of demos
  const radius = n <= 2 ? 220 : n <= 3 ? 280 : 340;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: 80, perspective: 900 }}
    >
      <div
        style={{
          position: "relative",
          width: 180,
          height: 48,
          transformStyle: "preserve-3d",
        }}
      >
        {DEMOS.map((demo, i) => {
          const relativeIndex = (i - activeIndex + n) % n;
          const angle = relativeIndex * angleStep;
          const isActive = i === activeIndex;
          return (
            <motion.button
              key={demo.id}
              onClick={() => onSelect(i)}
              animate={{
                rotateY: angle > 180 ? angle - 360 : angle,
                translateZ: radius,
                opacity: isActive ? 1 : 0.45,
                scale: isActive ? 1 : 0.82,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 180,
                height: 48,
                borderRadius: 12,
                cursor: isActive ? "default" : "pointer",
                background: isActive
                  ? `linear-gradient(135deg, rgba(124,58,237,0.55), ${demo.accent}44)`
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${isActive ? demo.accent + "88" : "rgba(255,255,255,0.1)"}`,
                color: isActive ? "white" : "rgba(148,163,184,0.7)",
                fontFamily: "monospace",
                fontSize: 13,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: isActive ? `0 0 24px ${demo.accent}33` : "none",
                backdropFilter: "blur(8px)",
              }}
            >
              {isActive && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: demo.accent,
                    boxShadow: `0 0 8px ${demo.accent}`,
                    flexShrink: 0,
                  }}
                />
              )}
              {demo.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

/* ── Main page ── */
const DemoPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lang, setLang] = useState("en");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const tFn = (key) => translate(key, lang);
  const demo = DEMOS[activeIndex];

  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + DEMOS.length) % DEMOS.length), []);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % DEMOS.length), []);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#04050d", color: "#e2e8f0" }}>
      <Navbar lang={lang} setLang={setLang} onOpenContact={() => setIsContactOpen(true)} scrolled={scrolled} />

      <main className="flex-1 flex flex-col items-center px-4 py-12 pt-28">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.3)",
            color: "#a78bfa",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          PRODUCT DEMOS
        </motion.div>

        {/* 3-D Ring Carousel */}
        <motion.div
          className="w-full mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div className="flex items-center justify-center gap-4">
            {/* Prev */}
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#94a3b8",
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <Carousel3D activeIndex={activeIndex} onSelect={setActiveIndex} />

            {/* Next */}
            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#94a3b8",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {DEMOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: activeIndex === i ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: activeIndex === i ? DEMOS[i].accent : "rgba(255,255,255,0.15)",
                  transition: "all 0.3s ease",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Active demo heading */}
        <AnimatePresence mode="wait">
          <motion.div
            key={demo.id + "-heading"}
            className="text-center mb-8 max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <h1
              className="text-3xl md:text-4xl font-display font-bold mb-3"
              style={{
                background: `linear-gradient(135deg, #a78bfa 0%, ${demo.accent} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {demo.title}
            </h1>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">{demo.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Video player */}
        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <VideoPlayer demo={demo} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <AnimatePresence mode="wait">
          <motion.div
            key={demo.id + "-stats"}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {demo.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-lg font-bold font-mono" style={{ color: demo.accent }}>
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
                {i < demo.stats.length - 1 && (
                  <div className="hidden sm:block w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }} />
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </main>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} lang={lang} t={tFn} />
    </div>
  );
};

export default DemoPage;
