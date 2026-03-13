import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Maximize2, Volume2, VolumeX, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DemoPage = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const navigate = useNavigate();

  // Pause when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && videoRef.current) {
        videoRef.current.pause();
        setPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      video.play();
      setPlaying(true);
      setHasStarted(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * video.duration;
  };

  const openFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#04050d", color: "#e2e8f0" }}
    >
      {/* Minimal top bar */}
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid rgba(0,245,255,0.08)" }}
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm font-mono transition-all"
          style={{ color: "rgba(0,245,255,0.6)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00f5ff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,245,255,0.6)")}
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        <div className="flex items-center gap-3">
          <img src="/logo2.png" alt="SingSingh AI" className="w-7 h-7 rounded-lg object-contain" />
          <span
            className="font-display font-bold text-base"
            style={{
              background: "linear-gradient(135deg, #00f5ff, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SingSingh AI
          </span>
        </div>

        <div className="font-mono text-xs" style={{ color: "rgba(0,245,255,0.35)" }}>
          ● DEMO
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-5"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "#a78bfa",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            PRODUCT DEMO
          </div>
          <h1
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #00f5ff 60%, #00ff88 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Tax Automation System
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
            AI-powered tax processing — upload documents, extract data with 99.9% accuracy, and generate audit-ready reports in seconds.
          </p>
        </motion.div>

        {/* Video player */}
        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(124,58,237,0.35)",
              boxShadow: "0 0 60px rgba(124,58,237,0.12), 0 0 120px rgba(0,245,255,0.05), 0 30px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                background: "rgba(8,10,22,0.97)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              </div>
              <div
                className="flex-1 mx-4 rounded-md px-3 py-1 text-xs font-mono text-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(148,163,184,0.7)",
                }}
              >
                SingSinghAI · Tax Automation System
              </div>
              <div className="font-mono text-xs" style={{ color: "rgba(0,245,255,0.4)" }}>
                ● LIVE
              </div>
            </div>

            {/* Video */}
            <div className="relative bg-black" style={{ aspectRatio: "2000/1400" }}>
              <video
                ref={videoRef}
                src="/demo.mp4"
                poster="/demo-thumbnail.png"
                muted={muted}
                playsInline
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />

              {/* Play overlay — shown whenever paused */}
              {!playing && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  style={{
                    background: hasStarted ? "rgba(4,5,13,0.45)" : "transparent",
                  }}
                  onClick={togglePlay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(124,58,237,0.85), rgba(0,245,255,0.65))",
                      border: "2px solid rgba(0,245,255,0.4)",
                      boxShadow: "0 0 50px rgba(0,245,255,0.3), 0 0 100px rgba(124,58,237,0.2)",
                    }}
                  >
                    <Play size={36} fill="white" style={{ color: "white", marginLeft: 5 }} />
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Controls */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{
                background: "rgba(6,8,18,0.97)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  color: "#a78bfa",
                }}
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
                    background: "linear-gradient(90deg, #7c3aed, #00f5ff)",
                    transition: "width 0.1s linear",
                  }}
                />
              </div>

              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: muted ? "#475569" : "#94a3b8",
                }}
              >
                {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              <button
                onClick={openFullscreen}
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#94a3b8",
                }}
              >
                <Maximize2 size={15} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[
            { value: "3 min", label: "Full walkthrough", color: "#a78bfa" },
            { value: "90%", label: "Less manual filing time", color: "#00f5ff" },
            { value: "Live", label: "Real system, not a prototype", color: "#00ff88" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="text-lg font-bold font-mono" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-sm text-slate-500">{stat.label}</div>
              {i < 2 && <div className="hidden sm:block w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }} />}
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default DemoPage;
