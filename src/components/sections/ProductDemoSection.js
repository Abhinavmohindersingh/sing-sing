import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Maximize2, Volume2, VolumeX } from "lucide-react";
import SectionTag from "../ui/SectionTag";

const ProductDemoSection = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Pause when scrolled out of view (only after user has started)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && hasStarted) {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [hasStarted]);

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
    <section
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #06091a 0%, #04050d 50%, #06091a 100%)" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 hud-grid opacity-40" />

      {/* Glow blobs */}
      <div
        className="radial-blob w-[600px] h-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "rgba(124, 58, 237, 0.04)" }}
      />
      <div
        className="radial-blob w-[300px] h-[300px] right-0 top-1/4"
        style={{ background: "rgba(0, 245, 255, 0.03)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <SectionTag zone="ZONE 03.5" label="LIVE DEMO" color="purple" />
          </div>
          <h2
            className="text-4xl md:text-6xl font-display font-bold mb-5"
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #00f5ff 60%, #00ff88 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Tax Automation System
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Watch our AI-powered tax automation system in action — built by SingSingh AI to eliminate manual filing, reduce errors, and save your team hours every week.
          </p>
        </motion.div>

        {/* Browser frame + video */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(124, 58, 237, 0.35)",
            boxShadow: "0 0 60px rgba(124,58,237,0.12), 0 0 120px rgba(0,245,255,0.06), 0 30px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Browser chrome bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              background: "rgba(8, 10, 22, 0.95)",
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
              poster="/demo-thumbnail.jpg"
              muted={muted}
              playsInline
              preload="metadata"
              loop
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover"
              style={{ display: "block" }}
            />

            {/* Play overlay — shown whenever paused */}
            {!playing && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                style={{
                  background: hasStarted ? "rgba(4,5,13,0.45)" : "rgba(4,5,13,0.0)",
                  backdropFilter: hasStarted ? "blur(2px)" : "none",
                }}
                onClick={togglePlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.85), rgba(0,245,255,0.65))",
                    border: "2px solid rgba(0,245,255,0.4)",
                    boxShadow: "0 0 40px rgba(0,245,255,0.3), 0 0 80px rgba(124,58,237,0.2)",
                  }}
                >
                  <Play size={32} fill="white" style={{ color: "white", marginLeft: 4 }} />
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Custom controls bar */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{
              background: "rgba(6, 8, 18, 0.97)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Play/pause */}
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{
                background: "rgba(124,58,237,0.15)",
                border: "1px solid rgba(124,58,237,0.3)",
                color: "#a78bfa",
              }}
            >
              {playing ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: 1 }} />}
            </button>

            {/* Progress bar */}
            <div
              className="flex-1 h-1.5 rounded-full cursor-pointer relative"
              style={{ background: "rgba(255,255,255,0.08)" }}
              onClick={handleSeek}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #7c3aed, #00f5ff)",
                }}
              />
            </div>

            {/* Mute */}
            <button
              onClick={toggleMute}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: muted ? "#475569" : "#94a3b8",
              }}
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>

            {/* Fullscreen */}
            <button
              onClick={openFullscreen}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#94a3b8",
              }}
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { value: "3 min", label: "Full walkthrough" },
            { value: "90%", label: "Reduction in manual filing time" },
            { value: "Live", label: "Real system, not a prototype" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="text-lg font-bold font-mono"
                style={{ color: i === 0 ? "#a78bfa" : i === 1 ? "#00f5ff" : "#00ff88" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-slate-500">{stat.label}</div>
              {i < 2 && <div className="hidden sm:block w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }} />}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ProductDemoSection;
