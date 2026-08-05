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
    stats: [
      { value: "10x", label: "Faster campaigns" },
      { value: "24/7", label: "Automated outreach" },
      { value: "Live", label: "Real system" },
    ],
  },
];

const ACCENT = "#2f5eec";

/* ── Video player card ── */
const VideoCard = ({ demo, isActive, onClick }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [isActive]);

  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    v.pause(); v.currentTime = 0;
    setPlaying(false); setProgress(0); setHasStarted(false);
  }, [demo.id]);

  useEffect(() => {
    const onHide = () => {
      if (document.hidden && videoRef.current) { videoRef.current.pause(); setPlaying(false); }
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    const v = videoRef.current; if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else { v.play(); setPlaying(true); setHasStarted(true); }
  };
  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current; if (!v) return;
    v.muted = !muted; setMuted(!muted);
  };
  const handleTimeUpdate = () => {
    const v = videoRef.current; if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };
  const handleSeek = (e) => {
    e.stopPropagation();
    const v = videoRef.current; if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };
  const openFullscreen = (e) => {
    e.stopPropagation();
    const v = videoRef.current; if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();
  };

  return (
    <div
      onClick={!isActive ? onClick : undefined}
      className="rounded-2xl overflow-hidden w-full bg-white"
      style={{
        border: "1px solid rgba(15,23,42,0.08)",
        boxShadow: isActive
          ? "0 20px 60px rgba(15,23,42,0.15)"
          : "0 8px 24px rgba(15,23,42,0.08)",
        cursor: isActive ? "default" : "pointer",
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3 bg-mist-100"
        style={{ borderBottom: "1px solid rgba(15,23,42,0.06)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div className="flex-1 mx-4 rounded-md px-3 py-1 text-xs text-center truncate bg-white border border-slate-200 text-slate-400">
          SingSinghAI · {demo.title}
        </div>
      </div>

      {/* Video */}
      <div className="relative bg-slate-100" style={{ aspectRatio: "2000/1400" }}>
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

        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(21,22,26,0.35)" }}>
            <div className="px-4 py-2 rounded-full text-xs font-medium bg-white text-ink">
              Click to view
            </div>
          </div>
        )}

        {isActive && !playing && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            style={{ background: hasStarted ? "rgba(21,22,26,0.25)" : "transparent" }}
            onClick={togglePlay}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: ACCENT, boxShadow: "0 8px 24px rgba(47,94,236,0.35)" }}
            >
              <Play size={32} fill="white" style={{ color: "white", marginLeft: 4 }} />
            </motion.div>
          </motion.div>
        )}
      </div>

      {isActive && (
        <div className="flex items-center gap-3 px-4 py-3 bg-white" style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}>
          <button onClick={togglePlay}
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#eef4ff", color: ACCENT }}
          >
            {playing ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: 1 }} />}
          </button>
          <div className="flex-1 h-1.5 rounded-full cursor-pointer bg-slate-200" onClick={handleSeek}>
            <div className="h-full rounded-full" style={{ width: `${progress}%`, background: ACCENT, transition: "width 0.1s linear" }} />
          </div>
          <button onClick={toggleMute}
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-mist-100"
            style={{ color: muted ? "#94a3b8" : "#64748b" }}
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <button onClick={openFullscreen}
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-mist-100 text-slate-500"
          >
            <Maximize2 size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

/* ── Page ── */
const DemoPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lang, setLang] = useState("en");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  const tFn = (key) => translate(key, lang);
  const demo = DEMOS[activeIndex];
  const n = DEMOS.length;

  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + n) % n), [n]);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % n), [n]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getCardStyle = (i) => {
    let o = i - activeIndex;
    if (o > n / 2) o -= n;
    if (o < -n / 2) o += n;
    if (o === 0) return { rotateY: 0, x: "0%", scale: 1, opacity: 1, zIndex: 10, pointerEvents: "auto" };
    const sign = o > 0 ? 1 : -1;
    const abs = Math.abs(o);
    return {
      rotateY: sign * Math.min(abs * 48, 68),
      x: `${sign * Math.min(abs * 62, 88)}%`,
      scale: Math.max(1 - abs * 0.15, 0.6),
      opacity: Math.max(1 - abs * 0.38, 0.22),
      zIndex: 10 - abs,
      pointerEvents: "auto",
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-ink" style={{ overflowX: "hidden" }}>
      <Navbar lang={lang} setLang={setLang} onOpenContact={() => setIsContactOpen(true)} scrolled={scrolled} />

      <main className="flex-1 flex flex-col items-center px-4 py-12 pt-32">

        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={demo.id + "-title"}
              className="text-4xl md:text-5xl font-display font-bold mb-3 text-ink"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {demo.title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={demo.id + "-desc"}
              className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              {demo.description}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="w-full max-w-6xl relative"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {isMobile ? (
            /* ── Mobile: full-width, no transition animation (prevents blink) ── */
            <div className="relative">
              <VideoCard demo={demo} isActive onClick={() => {}} />
              <button onClick={prev}
                className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center bg-white text-slate-500"
                style={{ border: "1px solid rgba(15,23,42,0.1)", zIndex: 20 }}
              >
                <ChevronLeft size={16} />
              </button>
              <button onClick={next}
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center bg-white text-slate-500"
                style={{ border: "1px solid rgba(15,23,42,0.1)", zIndex: 20 }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          ) : (
            /* ── Desktop: original 3D coverflow ── */
            <div>
              <div className="relative w-full" style={{ perspective: "1200px" }}>
                <div className="relative w-full" style={{ transformStyle: "preserve-3d" }}>
                  {DEMOS.map((d, i) => {
                    const s = getCardStyle(i);
                    return (
                      <motion.div
                        key={d.id}
                        animate={{ rotateY: s.rotateY, x: s.x, scale: s.scale, opacity: s.opacity, zIndex: s.zIndex }}
                        transition={{ type: "spring", stiffness: 280, damping: 30 }}
                        style={{
                          position: i === activeIndex ? "relative" : "absolute",
                          top: 0, left: 0, width: "100%",
                          transformStyle: "preserve-3d",
                          transformOrigin: s.rotateY > 0 ? "left center" : s.rotateY < 0 ? "right center" : "center",
                          pointerEvents: s.pointerEvents,
                        }}
                      >
                        <VideoCard demo={d} isActive={i === activeIndex} onClick={() => setActiveIndex(i)} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <button onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-11 h-11 rounded-full flex items-center justify-center transition-all bg-white text-slate-500"
                style={{ border: "1px solid rgba(15,23,42,0.1)", zIndex: 20 }}
              >
                <ChevronLeft size={20} />
              </button>
              <button onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-11 h-11 rounded-full flex items-center justify-center transition-all bg-white text-slate-500"
                style={{ border: "1px solid rgba(15,23,42,0.1)", zIndex: 20 }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </motion.div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {DEMOS.map((d, i) => (
            <button key={i} onClick={() => setActiveIndex(i)}
              style={{
                width: activeIndex === i ? 22 : 6, height: 6, borderRadius: 3,
                background: activeIndex === i ? ACCENT : "rgba(15,23,42,0.15)",
                transition: "all 0.3s ease", border: "none", cursor: "pointer", padding: 0,
              }}
            />
          ))}
        </div>

        {/* Stats */}
        <AnimatePresence mode="wait">
          <motion.div
            key={demo.id + "-stats"}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-8"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            {demo.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-lg font-bold text-ink">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
                {i < demo.stats.length - 1 && (
                  <div className="hidden sm:block w-px h-4 bg-slate-200" />
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
