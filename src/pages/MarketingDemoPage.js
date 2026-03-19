import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Sparkles, Send, CheckCircle, Linkedin, Instagram, Twitter,
  ChevronRight, RotateCcw, ThumbsUp, ThumbsDown, Edit3,
  Zap, Target, Users, BarChart2, Clock, Globe, Facebook, Youtube, MessageCircle
} from "lucide-react";

// ── Page transition variants ──────────────────────────────────────────────────
const pageVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "60%" : "-60%",
    opacity: 0,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? "-60%" : "60%",
    opacity: 0,
    filter: "blur(8px)",
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ── Custom SVG icons for platforms lucide doesn't cover ───────────────────────
const TikTokIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.79a4.85 4.85 0 01-1.02-.1z"/>
  </svg>
);

const PinterestIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const GoogleIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 11h8.533c.044.385.067.78.067 1.184 0 2.734-.98 5.036-2.678 6.6-1.485 1.371-3.518 2.175-5.922 2.175-4.761 0-8.622-3.86-8.622-8.622s3.861-8.622 8.622-8.622c2.322 0 4.273.853 5.771 2.245L15.656 8.1c-.882-.848-2.098-1.362-3.656-1.362-3.147 0-5.701 2.554-5.701 5.701s2.554 5.701 5.701 5.701c3.273 0 5.101-1.997 5.42-4.14H12V11z"/>
  </svg>
);

// ── Helpers ───────────────────────────────────────────────────────────────────
const PLATFORMS = [
  { id: "linkedin",  label: "LinkedIn",         icon: Linkedin,      color: "#0a66c2", bg: "rgba(10,102,194,0.12)",  border: "rgba(10,102,194,0.35)" },
  { id: "instagram", label: "Instagram",        icon: Instagram,     color: "#e1306c", bg: "rgba(225,48,108,0.12)",  border: "rgba(225,48,108,0.35)" },
  { id: "facebook",  label: "Facebook",         icon: Facebook,      color: "#1877f2", bg: "rgba(24,119,242,0.12)",  border: "rgba(24,119,242,0.35)" },
  { id: "twitter",   label: "Twitter / X",      icon: Twitter,       color: "#1d9bf0", bg: "rgba(29,155,240,0.12)",  border: "rgba(29,155,240,0.35)" },
  { id: "tiktok",    label: "TikTok",           icon: TikTokIcon,    color: "#ff0050", bg: "rgba(255,0,80,0.1)",     border: "rgba(255,0,80,0.3)" },
  { id: "youtube",   label: "YouTube",          icon: Youtube,       color: "#ff0000", bg: "rgba(255,0,0,0.1)",      border: "rgba(255,0,0,0.3)" },
  { id: "pinterest", label: "Pinterest",        icon: PinterestIcon, color: "#e60023", bg: "rgba(230,0,35,0.1)",     border: "rgba(230,0,35,0.3)" },
  { id: "google",    label: "Google Business",  icon: GoogleIcon,    color: "#4285f4", bg: "rgba(66,133,244,0.1)",   border: "rgba(66,133,244,0.3)" },
];

const CONTENT_TYPES = [
  { id: "post",     label: "Social Post",  color: "#00f5ff",  bg: "rgba(0,245,255,0.1)",   border: "rgba(0,245,255,0.3)" },
  { id: "image",    label: "Image",        color: "#a78bfa",  bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)" },
  { id: "video",    label: "Video",        color: "#f472b6",  bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.3)" },
  { id: "blog",     label: "Blog Article", color: "#34d399",  bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)" },
  { id: "landing",  label: "Landing Page", color: "#fb923c",  bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.3)" },
  { id: "email",    label: "Email",        color: "#60a5fa",  bg: "rgba(96,165,250,0.1)",  border: "rgba(96,165,250,0.3)" },
  { id: "ad",       label: "Ad Copy",      color: "#fbbf24",  bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.3)" },
  { id: "carousel", label: "Carousel",     color: "#e879f9",  bg: "rgba(232,121,249,0.1)", border: "rgba(232,121,249,0.3)" },
];

const TONES = ["Professional", "Casual", "Bold", "Inspirational", "Educational"];
const AUDIENCES = ["B2B Decision Makers", "Students", "General Public", "Industry Professionals", "Job Seekers"];
const CAMPAIGNS = ["Brand Awareness", "Lead Generation", "Event Promotion", "Product Launch", "Recruitment"];

const GENERATED_POSTS = {
  linkedin: {
    copy: `🚀 The future of marketing isn't hiring more people — it's working smarter.

We just processed 3 months of campaign data in under 30 seconds. Our AI identified that Tuesday 9am posts drive 47% more engagement for B2B audiences in the APAC region.

That insight used to take a team of analysts a week to surface.

The shift isn't coming. It's already here.

How is your team adapting to AI-driven marketing?

#MarketingAI #B2BMarketing #DigitalTransformation #AITools`,
    hashtags: ["#MarketingAI", "#B2BMarketing", "#DigitalTransformation", "#AITools"],
    emoji: "💼",
    engagement: { reach: "12.4K", impressions: "38.2K", ctr: "4.7%" },
  },
  instagram: {
    copy: `Your competitors are already using AI to write, schedule & optimise their content ✨

Are you still doing it manually?

Drop a 🔥 if you're ready to automate your marketing.

#MarketingAutomation #AIMarketing #ContentCreator #DigitalMarketing #GrowthHacking`,
    hashtags: ["#MarketingAutomation", "#AIMarketing", "#ContentCreator", "#DigitalMarketing"],
    emoji: "📸",
    engagement: { reach: "28.1K", impressions: "91.5K", ctr: "6.2%" },
  },
  twitter: {
    copy: `Hot take: 80% of your marketing content could be AI-generated by end of 2025.

The other 20%? That's the human edge — strategy, empathy, creativity.

The brands that figure out this ratio first will dominate their niches.

Thoughts? 🧵`,
    hashtags: ["#MarketingAI", "#ContentStrategy", "#FutureOfMarketing"],
    emoji: "🐦",
    engagement: { reach: "8.9K", impressions: "22.3K", ctr: "3.8%" },
  },
};

// ── Step indicator ────────────────────────────────────────────────────────────
const StepIndicator = ({ current }) => {
  const steps = ["Prompt", "Generate", "Publish"];
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-mono"
                animate={{
                  background: done
                    ? "linear-gradient(135deg,#00f5ff,#7c3aed)"
                    : active
                    ? "rgba(0,245,255,0.15)"
                    : "rgba(255,255,255,0.04)",
                  border: done
                    ? "1.5px solid transparent"
                    : active
                    ? "1.5px solid rgba(0,245,255,0.6)"
                    : "1.5px solid rgba(255,255,255,0.1)",
                  color: done ? "#04050d" : active ? "#00f5ff" : "#475569",
                  boxShadow: active ? "0 0 14px rgba(0,245,255,0.35)" : "none",
                }}
                transition={{ duration: 0.4 }}
              >
                {done ? <CheckCircle size={16} /> : i + 1}
              </motion.div>
              <span
                className="text-xs font-mono tracking-widest uppercase"
                style={{
                  color: active ? "#00f5ff" : done ? "#a78bfa" : "#64748b",
                  transition: "color 0.3s",
                }}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="w-16 md:w-24 h-px mx-2 mb-5"
                style={{
                  background: done
                    ? "linear-gradient(90deg,#00f5ff,#7c3aed)"
                    : "rgba(255,255,255,0.08)",
                  transition: "background 0.5s",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ── Custom Dropdown (portal-based — escapes all overflow/clip parents) ─────────
const CustomDropdown = ({ label, value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target) &&
        menuRef.current && !menuRef.current.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Recalculate position on scroll/resize
  useEffect(() => {
    if (!open) return;
    const update = () => {
      if (triggerRef.current) {
        const r = triggerRef.current.getBoundingClientRect();
        const menuHeight = options.length * 45;
        const spaceBelow = window.innerHeight - r.bottom;
        const openUp = spaceBelow < menuHeight + 20;
        setCoords({ top: openUp ? r.top - menuHeight - 6 : r.bottom + 6, left: r.left, width: r.width });
      }
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update, true); window.removeEventListener("resize", update); };
  }, [open]);

  const handleToggle = () => {
    if (triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      const menuHeight = options.length * 45;
      const spaceBelow = window.innerHeight - r.bottom;
      const openUp = spaceBelow < menuHeight + 20;
      setCoords({
        top: openUp ? r.top - menuHeight - 6 : r.bottom + 6,
        left: r.left,
        width: r.width,
      });
    }
    setOpen(o => !o);
  };

  const menu = open && ReactDOM.createPortal(
    <div
      ref={menuRef}
      style={{
        position: "fixed",
        top: coords.top,
        left: coords.left,
        width: coords.width,
        zIndex: 99999,
        background: "#0d1120",
        border: "1px solid rgba(0,245,255,0.3)",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,245,255,0.06)",
      }}
    >
      {options.map((o, i) => (
        <button
          key={o}
          type="button"
          onClick={() => { onChange(o); setOpen(false); }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            textAlign: "left",
            padding: "12px 16px",
            fontSize: "14px",
            fontFamily: "inherit",
            color: o === value ? "#00f5ff" : "#c8d4e8",
            background: o === value ? "rgba(0,245,255,0.08)" : "transparent",
            border: "none",
            borderBottom: i < options.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            cursor: "pointer",
            transition: "all 0.12s",
          }}
          onMouseEnter={e => { if (o !== value) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#ffffff"; }}}
          onMouseLeave={e => { if (o !== value) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c8d4e8"; }}}
        >
          {o}
          {o === value && (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          )}
        </button>
      ))}
    </div>,
    document.body
  );

  return (
    <div style={{ position: "relative" }}>
      <label style={{ display: "block", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b", marginBottom: "8px" }}>
        {label}
      </label>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderRadius: "12px",
          fontSize: "14px",
          fontFamily: "inherit",
          background: open ? "rgba(0,245,255,0.07)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${open ? "rgba(0,245,255,0.4)" : "rgba(255,255,255,0.12)"}`,
          color: "#ffffff",
          cursor: "pointer",
          boxShadow: open ? "0 0 18px rgba(0,245,255,0.12)" : "none",
          transition: "all 0.2s",
        }}
      >
        <span>{value}</span>
        <svg
          width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="2"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {menu}
    </div>
  );
};

// ── Step 1 — Prompt ───────────────────────────────────────────────────────────
const PromptStep = ({ onNext }) => {
  const [prompt, setPrompt] = useState("");
  const [platforms, setPlatforms] = useState(["linkedin"]);
  const togglePlatform = (id) => setPlatforms(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  const [contentTypes, setContentTypes] = useState(["post"]);
  const toggleContent = (id) => setContentTypes(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  const [tone, setTone] = useState("Professional");
  const [audience, setAudience] = useState("B2B Decision Makers");
  const [campaign, setCampaign] = useState("Brand Awareness");

  const placeholders = [
    "Create 3 posts about AI marketing for APAC region...",
    "Write a LinkedIn post about our new product launch...",
    "Generate Instagram content for March intake campaign...",
  ];
  const [phIdx] = useState(Math.floor(Math.random() * placeholders.length));

  const canProceed = prompt.trim().length > 0 || true; // always allow for demo

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Two-column layout */}
      <div className="grid grid-cols-5 gap-12 items-start">

        {/* LEFT — Title + context */}
        <div className="col-span-2 pt-2">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6"
            style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.25)", color: "#00f5ff" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            STEP 1 OF 3
          </div>
          <h2 className="font-bold mb-4 leading-tight" style={{ fontSize: "clamp(28px,3vw,42px)", color: "#f1f5f9" }}>
            What do you want to{" "}
            <span style={{
              background: "linear-gradient(135deg,#00f5ff,#7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              create?
            </span>
          </h2>
          <p className="leading-relaxed mb-8" style={{ fontSize: "15px", color: "#94a3b8" }}>
            Describe your campaign in plain English, or use the guided fields. The AI will generate platform-ready content, matched to your brand and audience.
          </p>

          {/* Info chips */}
          <div className="space-y-3">
            {[
              { icon: "✦", label: "Brand-aware content" },
              { icon: "✦", label: "Platform-optimised formatting" },
              { icon: "✦", label: "RAG-backed accuracy" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm" style={{ color: "#cbd5e1" }}>
                <span style={{ color: "#00f5ff", fontSize: "10px" }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="col-span-3">
          {/* Plain English input */}
          <div
            className="rounded-2xl p-px mb-6"
            style={{ background: "linear-gradient(135deg,rgba(0,245,255,0.25),rgba(124,58,237,0.25))" }}
          >
            <div className="rounded-2xl p-5" style={{ background: "#070910" }}>
              <div className="flex items-start gap-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.25)" }}
                >
                  <Sparkles size={16} style={{ color: "#00f5ff" }} />
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={placeholders[phIdx]}
                  rows={4}
                  className="flex-1 bg-transparent resize-none text-slate-200 placeholder-slate-600 outline-none leading-relaxed"
                  style={{ fontSize: "15px" }}
                />
              </div>
            </div>
          </div>

          {/* Platform select */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest">Platform</label>
              {platforms.length > 0 && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.25)", color: "#00f5ff" }}>
                  {platforms.length} selected
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {PLATFORMS.map((p) => {
                const active = platforms.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: active ? p.bg : "rgba(255,255,255,0.03)",
                      border: `1px solid ${active ? p.border : "rgba(255,255,255,0.07)"}`,
                      color: active ? p.color : "#94a3b8",
                      boxShadow: active ? `0 0 18px ${p.bg}` : "none",
                    }}
                  >
                    <p.icon size={14} />
                    <span className="truncate">{p.label}</span>
                    {active && (
                      <CheckCircle size={12} style={{ marginLeft: "auto", flexShrink: 0 }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content type */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest">Content Type</label>
              {contentTypes.length > 0 && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)", color: "#a78bfa" }}>
                  {contentTypes.length} selected
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {CONTENT_TYPES.map((c) => {
                const active = contentTypes.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => toggleContent(c.id)}
                    className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: active ? c.bg : "rgba(255,255,255,0.03)",
                      border: `1px solid ${active ? c.border : "rgba(255,255,255,0.07)"}`,
                      color: active ? c.color : "#94a3b8",
                      boxShadow: active ? `0 0 16px ${c.bg}` : "none",
                    }}
                  >
                    <span className="truncate">{c.label}</span>
                    {active && <CheckCircle size={12} style={{ marginLeft: "auto", flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guided fields */}
          <div className="grid grid-cols-3 gap-4 mb-7">
            {[
              { label: "Tone", value: tone, setter: setTone, options: TONES },
              { label: "Audience", value: audience, setter: setAudience, options: AUDIENCES },
              { label: "Campaign Goal", value: campaign, setter: setCampaign, options: CAMPAIGNS },
            ].map(({ label, value, setter, options }) => (
              <CustomDropdown key={label} label={label} value={value} options={options} onChange={setter} />
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => onNext({ prompt, platform: platforms[0] || "linkedin", platforms, contentTypes, tone, audience, campaign })}
            className="w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-3 transition-all"
            style={{
              background: "linear-gradient(135deg,rgba(0,245,255,0.15),rgba(124,58,237,0.28))",
              border: "1.5px solid rgba(0,245,255,0.4)",
              color: "#ffffff",
              boxShadow: "0 0 30px rgba(0,245,255,0.12)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 50px rgba(0,245,255,0.28)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(0,245,255,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <Zap size={18} style={{ color: "#00f5ff" }} />
            Generate with AI
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ── Step 2 — Generate ─────────────────────────────────────────────────────────
const GenerateStep = ({ config, onNext, onBack }) => {
  const [phase, setPhase] = useState("loading"); // loading | preview
  const [displayedText, setDisplayedText] = useState("");
  const [approved, setApproved] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState(null);

  const handleAction = (action) => {
    setApproved(action);
    const msgs = {
      approve: "Recorded in learning centre — AI will favour this style.",
      edit: "Recorded in learning centre — AI will refine this copy.",
      reject: "Recorded in learning centre — AI will avoid this approach.",
    };
    setFeedbackToast(msgs[action]);
    setTimeout(() => setFeedbackToast(null), 3000);
    if (action !== "reject") setTimeout(() => onNext({ post, config }), 700);
  };
  const primaryPlatform = (config.platforms && config.platforms[0]) || config.platform || "linkedin";
  const post = GENERATED_POSTS[primaryPlatform] || GENERATED_POSTS.linkedin;
  const platformInfo = PLATFORMS.find((p) => p.id === primaryPlatform);

  // Typewriter effect
  useEffect(() => {
    if (phase !== "preview") return;
    let i = 0;
    const full = post.copy;
    setDisplayedText("");
    const timer = setInterval(() => {
      i++;
      setDisplayedText(full.slice(0, i));
      if (i >= full.length) clearInterval(timer);
    }, 12);
    return () => clearInterval(timer);
  }, [phase, post.copy]);

  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [progressPct, setProgressPct] = useState(0);

  const LOADING_STEPS = [
    { label: "Connecting to knowledge base",           icon: Globe,       duration: 2000 },
    { label: "Fetching brand guidelines & assets",     icon: Target,      duration: 2500 },
    { label: "Loading product & service catalogue",    icon: BarChart2,   duration: 2000 },
    { label: "Reading audience profiles",              icon: Users,       duration: 2000 },
    { label: "Scanning historical campaign data",      icon: Clock,       duration: 2500 },
    { label: "Pulling competitor content signals",     icon: Globe,       duration: 2000 },
    { label: "Analysing campaign context",             icon: Target,      duration: 2000 },
    { label: "Running RAG on knowledge base",          icon: Sparkles,    duration: 3000 },
    { label: "Retrieving top-performing references",   icon: BarChart2,   duration: 2000 },
    { label: "Applying brand tone & voice rules",      icon: Target,      duration: 2000 },
    { label: "Generating platform-optimised copy",     icon: Zap,         duration: 3000 },
    { label: "Formatting for selected platforms",      icon: Globe,       duration: 2000 },
    { label: "Running compliance check",               icon: CheckCircle, duration: 1500 },
    { label: "Finalising content package",             icon: Sparkles,    duration: 1500 },
  ];
  const TOTAL_DURATION = LOADING_STEPS.reduce((a, s) => a + s.duration, 0);

  // Fake loading sequence — staged over ~30s
  useEffect(() => {
    let elapsed = 0;
    const timers = [];
    LOADING_STEPS.forEach((step, i) => {
      timers.push(setTimeout(() => {
        setActiveStep(i);
      }, elapsed));
      elapsed += step.duration;
      timers.push(setTimeout(() => {
        setCompletedSteps(prev => [...prev, i]);
      }, elapsed - 200));
    });
    timers.push(setTimeout(() => setPhase("preview"), elapsed + 300));

    // Smooth progress bar
    const start = Date.now();
    const interval = setInterval(() => {
      const p = Math.min(((Date.now() - start) / (TOTAL_DURATION + 300)) * 100, 99);
      setProgressPct(p);
    }, 80);
    timers.push(interval);

    return () => { timers.forEach(t => { clearTimeout(t); clearInterval(t); }); };
  }, []);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-4"
          style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          STEP 2 — AI GENERATION
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#f1f5f9" }}>
          {phase === "loading" ? (
            <>AI is <span style={{ background: "linear-gradient(135deg,#a78bfa,#00f5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>thinking...</span></>
          ) : (
            <>Your content is <span style={{ color: "#00ff88" }}>ready</span></>
          )}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {phase === "loading" ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {/* Terminal stream layout */}
            <div className="grid grid-cols-5 gap-8 items-start">

              {/* LEFT — progress */}
              <div className="col-span-2">
                <div
                  className="rounded-2xl p-6 sticky top-8"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {/* Spinner */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-16 h-16">
                      <motion.div className="absolute inset-0 rounded-full"
                        style={{ border: "2px solid transparent", borderTopColor: "#00f5ff" }}
                        animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div className="absolute inset-2 rounded-full"
                        style={{ border: "2px solid transparent", borderTopColor: "#7c3aed" }}
                        animate={{ rotate: -360 }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles size={18} style={{ color: "#00f5ff" }} />
                      </div>
                    </div>
                  </div>

                  {/* % */}
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold font-mono" style={{ color: "#00f5ff" }}>{Math.round(progressPct)}%</span>
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-1">Processing</div>
                  </div>

                  {/* Bar */}
                  <div className="h-1.5 rounded-full mb-6" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${progressPct}%`,
                        background: "linear-gradient(90deg,#00f5ff,#7c3aed,#00ff88)",
                        transition: "width 0.1s linear",
                        boxShadow: "0 0 8px rgba(0,245,255,0.4)",
                      }}
                    />
                  </div>

                  {/* Step count */}
                  <div className="flex justify-between text-xs font-mono" style={{ color: "#475569" }}>
                    <span>{completedSteps.length} completed</span>
                    <span>{LOADING_STEPS.length - completedSteps.length} remaining</span>
                  </div>
                </div>
              </div>

              {/* RIGHT — stream */}
              <div className="col-span-3">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "#060910", border: "1px solid rgba(0,245,255,0.12)" }}
                >
                  {/* Terminal header */}
                  <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)" }}>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                    </div>
                    <span className="text-xs font-mono ml-2" style={{ color: "rgba(0,245,255,0.5)" }}>ai-engine · processing</span>
                    <div className="ml-auto flex gap-1">
                      {[0,1,2].map(d => (
                        <motion.div key={d} className="w-1 h-1 rounded-full" style={{ background: "#00f5ff" }}
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.25 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Stream lines */}
                  <div className="p-4 space-y-1" style={{ minHeight: 320 }}>
                    {LOADING_STEPS.map(({ label }, i) => {
                      const done = completedSteps.includes(i);
                      const active = activeStep === i && !done;
                      if (i > activeStep + 1) return null;
                      return (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-3 py-1.5"
                        >
                          <span className="font-mono text-xs w-5 flex-shrink-0" style={{ color: "#334155" }}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-mono text-xs" style={{ color: "#475569" }}>›</span>
                          <span className="font-mono text-xs flex-1" style={{
                            color: done ? "#00ff88" : active ? "#ffffff" : "#64748b",
                          }}>
                            {label}
                            {active && (
                              <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity }}
                                style={{ color: "#00f5ff", marginLeft: 4 }}
                              >▋</motion.span>
                            )}
                          </span>
                          {done && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="font-mono text-xs flex-shrink-0"
                              style={{ color: "#00ff88" }}
                            >
                              ✓
                            </motion.span>
                          )}
                          {active && (
                            <span className="font-mono text-xs flex-shrink-0" style={{ color: "rgba(0,245,255,0.5)" }}>
                              running...
                            </span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="preview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Platform badge */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
                style={{ background: platformInfo?.bg, border: `1px solid ${platformInfo?.border}`, color: platformInfo?.color }}
              >
                {platformInfo && <platformInfo.icon size={12} />}
                {platformInfo?.label} Post
              </div>
              <div
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono"
                style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00ff88" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                AI Generated
              </div>
            </div>

            {/* LinkedIn Post — realistic light-mode card */}
            <div
              className="rounded-2xl overflow-hidden mb-5"
              style={{
                background: "#ffffff",
                border: "1px solid #e0e0e0",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.28)",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                color: "#000000e6",
              }}
            >
              {/* ── Feed chrome: nav stub ── */}
              <div style={{ background: "#f3f2ef", borderBottom: "1px solid #e0e0e0", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a66c2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span style={{ fontSize: 11, color: "#00000099", fontWeight: 500, letterSpacing: 0.2 }}>linkedin.com</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#57c557" }} />
                  <span style={{ fontSize: 10, color: "#57c557", fontWeight: 600, letterSpacing: "0.06em" }}>LIVE PREVIEW</span>
                </div>
              </div>

              {/* ── Post content ── */}
              <div style={{ padding: "12px 16px 0" }}>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    {/* Avatar */}
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: "50%",
                        background: "linear-gradient(135deg,#00b4d8,#7c3aed)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, fontSize: 18, color: "#fff",
                        border: "2px solid #fff", boxShadow: "0 0 0 1px #e0e0e0",
                      }}>S</div>
                      {/* Online dot */}
                      <div style={{ position: "absolute", bottom: 1, right: 1, width: 11, height: 11, borderRadius: "50%", background: "#57c557", border: "2px solid #fff" }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#000000e6", lineHeight: 1.3 }}>SingSinghAI</span>
                        <span style={{ fontSize: 12, color: "#0a66c2", fontWeight: 400 }}>• 1st</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#00000099", lineHeight: 1.4 }}>AI-Powered Marketing Automation · APAC</div>
                      <div style={{ fontSize: 11, color: "#00000073", lineHeight: 1.4, display: "flex", alignItems: "center", gap: 3, marginTop: 1 }}>
                        <span>Just now</span>
                        <span>·</span>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="#00000073"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                      </div>
                    </div>
                  </div>
                  {/* Follow + more */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <button style={{ padding: "5px 14px", borderRadius: 16, border: "1.5px solid #0a66c2", color: "#0a66c2", background: "transparent", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#0a66c2"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                      Follow
                    </button>
                    <button style={{ padding: "6px", borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", color: "#00000073", display: "flex" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                    </button>
                    <button style={{ padding: "6px", borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", color: "#00000073", display: "flex" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                    </button>
                  </div>
                </div>

                {/* Copy */}
                <div style={{ fontSize: 14, color: "#000000e6", lineHeight: 1.7, whiteSpace: "pre-wrap", marginBottom: 8 }}>
                  {displayedText}
                </div>

                {/* Hashtags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
                  {post.hashtags.map(tag => (
                    <span key={tag} style={{ fontSize: 13, color: "#0a66c2", cursor: "pointer", fontWeight: 400 }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* ── Attached visual — full bleed ── */}
              <motion.div
                style={{ position: "relative", background: "#000", borderTop: "1px solid #e8e8e8", overflow: "hidden" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <img
                  src="/post-visual.png"
                  alt="AI Generated Visual"
                  style={{ width: "100%", display: "block" }}
                />
                {/* AI badge overlay */}
                <div style={{
                  position: "absolute", top: 10, right: 10,
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "3px 8px", borderRadius: 100,
                  background: "rgba(0,0,0,0.62)", backdropFilter: "blur(6px)",
                  color: "#00f5ff", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em",
                  border: "1px solid rgba(0,245,255,0.3)",
                }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="#00f5ff"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                  AI Generated
                </div>
                {/* Image caption strip */}
                <div style={{ background: "#f3f2ef", borderTop: "1px solid #e0e0e0", padding: "8px 12px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#000000e6" }}>Cut marketing time by 80% with AI automation</div>
                  <div style={{ fontSize: 11, color: "#00000073", marginTop: 1 }}>singsinghAI.com.au · AI-powered content for every platform</div>
                </div>
              </motion.div>

              {/* ── Reaction summary ── */}
              <div style={{ padding: "6px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8e8e8" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ display: "flex" }}>
                    {[
                      { bg: "#0a66c2", path: "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" },
                      { bg: "#e8365d", path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" },
                      { bg: "#f5a623", path: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" },
                    ].map(({ bg, path }, i) => (
                      <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: bg, border: "1.5px solid #fff", marginLeft: i > 0 ? -4 : 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="white"><path d={path}/></svg>
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: 12, color: "#00000073", marginLeft: 3 }}>847 reactions</span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontSize: 12, color: "#00000073", cursor: "pointer" }}>124 comments</span>
                  <span style={{ fontSize: 12, color: "#00000073", cursor: "pointer" }}>38 reposts</span>
                </div>
              </div>

              {/* ── Action bar ── */}
              <div style={{ display: "flex", padding: "2px 8px 4px" }}>
                {[
                  { label: "Like", path: "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" },
                  { label: "Comment", path: "M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" },
                  { label: "Repost", path: "M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" },
                  { label: "Send", path: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" },
                ].map(({ label, path }) => (
                  <button
                    key={label}
                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "10px 4px", border: "none", background: "transparent", cursor: "pointer", borderRadius: 4, color: "#00000099", fontSize: 13, fontWeight: 600 }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#f3f2ef"; e.currentTarget.style.color = "#000000cc"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#00000099"; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={path}/></svg>
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* ── Comment input stub ── */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px 12px", borderTop: "1px solid #e8e8e8" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#00b4d8,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>S</div>
                <div style={{ flex: 1, padding: "7px 14px", borderRadius: 20, border: "1px solid #c0c0c0", fontSize: 13, color: "#00000073", background: "#fff", cursor: "text" }}>
                  Add a comment…
                </div>
              </div>
            </div>

            {/* Review actions */}
            {/* Feedback toast */}
            <AnimatePresence>
              {feedbackToast && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-3 text-xs font-mono"
                  style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  {feedbackToast}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "Approve", icon: ThumbsUp,  color: "#00ff88", activeBg: "rgba(0,255,136,0.18)",  activeBorder: "rgba(0,255,136,0.5)",  idleBg: "rgba(0,255,136,0.08)",  idleBorder: "rgba(0,255,136,0.25)",  action: "approve" },
                { label: "Edit",    icon: Edit3,      color: "#00f5ff", activeBg: "rgba(0,245,255,0.18)",  activeBorder: "rgba(0,245,255,0.5)",  idleBg: "rgba(0,245,255,0.06)",  idleBorder: "rgba(0,245,255,0.2)",   action: "edit"    },
                { label: "Reject",  icon: ThumbsDown, color: "#ff6b35", activeBg: "rgba(255,107,53,0.18)", activeBorder: "rgba(255,107,53,0.5)", idleBg: "rgba(255,107,53,0.06)", idleBorder: "rgba(255,107,53,0.2)",  action: "reject"  },
              ].map(({ label, icon: Icon, color, activeBg, activeBorder, idleBg, idleBorder, action }) => {
                const isActive = approved === action;
                return (
                  <button
                    key={action}
                    onClick={() => handleAction(action)}
                    className="py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                    style={{
                      background: isActive ? activeBg : idleBg,
                      border: `1.5px solid ${isActive ? activeBorder : idleBorder}`,
                      color: color,
                      boxShadow: isActive ? `0 0 20px ${activeBg}, 0 0 40px ${idleBg}` : "none",
                    }}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={onBack}
              className="w-full py-3 rounded-xl text-sm text-slate-500 flex items-center justify-center gap-2 transition-all hover:text-slate-300"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <RotateCcw size={13} />
              Regenerate with new brief
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── Schedule Toggle ───────────────────────────────────────────────────────────
const SCHEDULE_OPTIONS = [
  { label: "Now", sub: "Publish immediately" },
  { label: "Tue 9:00 AM", sub: "Peak B2B window · AEST" },
  { label: "Wed 12:00 PM", sub: "Lunch scroll window · AEST" },
  { label: "Custom", sub: "Pick date & time" },
];

const ScheduleToggle = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Clock size={13} style={{ color: "#a78bfa" }} />
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Schedule</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {SCHEDULE_OPTIONS.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => setSelected(i)}
            className="rounded-xl p-3 text-left transition-all"
            style={{
              background: selected === i ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
              border: `1.5px solid ${selected === i ? "#a78bfa" : "rgba(255,255,255,0.1)"}`,
              boxShadow: selected === i ? "0 0 20px rgba(124,58,237,0.25), inset 0 0 12px rgba(124,58,237,0.1)" : "none",
            }}
          >
            <div className="text-xs font-bold mb-0.5" style={{ color: selected === i ? "#c4b5fd" : "#94a3b8" }}>{opt.label}</div>
            <div className="text-xs leading-tight" style={{ color: selected === i ? "#a78bfa" : "#475569" }}>{opt.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ── Step 3 — Publish ──────────────────────────────────────────────────────────
const PublishStep = ({ config, onReset }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(config.platforms || [config.platform]);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  // per-platform: null | "connecting" | "uploading" | "posting" | "done" | "error"
  const [platStatus, setPlatStatus] = useState({});

  const togglePlatform = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const handlePublish = () => {
    setPublishing(true);
    const stages = ["connecting", "uploading", "posting", "done"];
    // stagger each platform by 800ms
    selected.forEach((id, idx) => {
      let delay = idx * 900;
      stages.forEach((stage, si) => {
        setTimeout(() => {
          setPlatStatus(prev => ({ ...prev, [id]: stage }));
        }, delay + si * 700);
      });
    });
    // total time: last platform start + 3 stages * 700ms + buffer
    const total = (selected.length - 1) * 900 + 3 * 700 + 500;
    setTimeout(() => { setPublishing(false); setPublished(true); }, total);
  };

  const platformInfo = PLATFORMS.find((p) => p.id === config.platform);
  const post = GENERATED_POSTS[config.platform] || GENERATED_POSTS.linkedin;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-4"
          style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          STEP 3 — PUBLISH
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#f1f5f9" }}>
          {published ? (
            <>Content <span style={{ color: "#00ff88" }}>published!</span></>
          ) : (
            <>Ready to <span style={{ color: "#00ff88" }}>go live?</span></>
          )}
        </h2>
        {!published && <p className="text-slate-400 text-sm">Select your platforms and push to the publishing queue.</p>}
      </div>

      <AnimatePresence mode="wait">
        {published ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Success banner */}
            <div
              className="rounded-2xl p-5 mb-5 flex items-center gap-4"
              style={{ background: "rgba(0,255,136,0.07)", border: "1.5px solid rgba(0,255,136,0.3)", boxShadow: "0 0 30px rgba(0,255,136,0.08)" }}
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 220, delay: 0.1 }}>
                <CheckCircle size={36} style={{ color: "#00ff88", flexShrink: 0 }} />
              </motion.div>
              <div>
                <div className="font-bold text-white text-base mb-0.5">Campaign published successfully</div>
                <div className="text-xs text-slate-400">Your content is live across {selected.length} platform{selected.length > 1 ? "s" : ""}. AI is tracking performance in real-time.</div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: "Platforms live", value: selected.length, color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)" },
                { label: "Projected Reach", value: "40K+",         color: "#00f5ff", bg: "rgba(0,245,255,0.08)",   border: "rgba(0,245,255,0.25)" },
                { label: "Est. Engagement", value: "5.2%",          color: "#00ff88", bg: "rgba(0,255,136,0.08)",   border: "rgba(0,255,136,0.25)" },
              ].map(({ label, value, color, bg, border }) => (
                <div key={label} className="rounded-xl p-4 text-center" style={{ background: bg, border: `1.5px solid ${border}` }}>
                  <div className="text-2xl font-bold font-mono mb-1" style={{ color }}>{value}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Published platforms */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selected.map((id) => {
                const p = PLATFORMS.find((pl) => pl.id === id);
                if (!p) return null;
                return (
                  <div key={id} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
                    style={{ background: p.bg, border: `1px solid ${p.color}`, color: p.color }}>
                    <p.icon size={12} />
                    {p.label}
                    <CheckCircle size={11} />
                  </div>
                );
              })}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              {selected.includes("linkedin") && (
                <a
                  href="https://www.linkedin.com/feed/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: "rgba(10,102,194,0.12)",
                    border: "1.5px solid rgba(10,102,194,0.5)",
                    color: "#60a5fa",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 24px rgba(10,102,194,0.25)"; e.currentTarget.style.background = "rgba(10,102,194,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "rgba(10,102,194,0.12)"; }}
                >
                  <Linkedin size={14} />
                  View Published Post on LinkedIn
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              )}
              <button
                onClick={() => navigate("/performance")}
                className="w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2 transition-all"
                style={{
                  background: "linear-gradient(135deg,rgba(0,245,255,0.15),rgba(124,58,237,0.25))",
                  border: "1.5px solid rgba(0,245,255,0.4)",
                  color: "#ffffff",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 30px rgba(0,245,255,0.2)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <BarChart2 size={16} />
                See Performance of this Post
              </button>
              <button
                onClick={() => navigate("/historical")}
                className="w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                style={{
                  background: "rgba(167,139,250,0.08)",
                  border: "1.5px solid rgba(167,139,250,0.3)",
                  color: "#a78bfa",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 20px rgba(167,139,250,0.12)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
                See Historical Performance
              </button>
              <button
                onClick={onReset}
                className="w-full py-3 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748b" }}
                onMouseEnter={e => e.currentTarget.style.color = "#94a3b8"}
                onMouseLeave={e => e.currentTarget.style.color = "#64748b"}
              >
                <RotateCcw size={13} />
                Create another campaign
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="publish-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Platform select */}
            <div className="mb-6">
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
                Select platforms to publish to
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PLATFORMS.map((p) => {
                  const on = selected.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePlatform(p.id)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: on ? p.bg : "rgba(255,255,255,0.05)",
                        border: `1.5px solid ${on ? p.color : "rgba(255,255,255,0.12)"}`,
                        color: on ? p.color : "#94a3b8",
                        boxShadow: on ? `0 0 18px ${p.bg}, inset 0 0 12px ${p.bg}` : "none",
                      }}
                    >
                      <p.icon size={15} />
                      {p.label}
                      {on && <CheckCircle size={13} style={{ marginLeft: "auto" }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Schedule toggle */}
            <ScheduleToggle />

            {/* Publish button / live status */}
            {publishing ? (
              <div
                className="rounded-2xl p-5"
                style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#00ff88" }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">Publishing in progress</span>
                </div>
                <div className="flex flex-col gap-3">
                  {selected.map((id) => {
                    const pl = PLATFORMS.find(p => p.id === id);
                    if (!pl) return null;
                    const status = platStatus[id] || null;
                    const stageLabel = { connecting: "Connecting...", uploading: "Uploading assets...", posting: "Posting...", done: "Published" }[status] || "Queued";
                    const isDone = status === "done";
                    const isActive = status && status !== "done";
                    return (
                      <div key={id} className="flex items-center gap-3">
                        {/* Platform icon + label */}
                        <div
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono flex-shrink-0"
                          style={{ background: pl.bg, border: `1px solid ${pl.border}`, color: pl.color, minWidth: 130 }}
                        >
                          <pl.icon size={12} />
                          {pl.label}
                        </div>
                        {/* Progress track */}
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: isDone ? "#00ff88" : `linear-gradient(90deg,${pl.color},#00f5ff)` }}
                            initial={{ width: "0%" }}
                            animate={{ width: isDone ? "100%" : isActive ? (status === "connecting" ? "30%" : status === "uploading" ? "65%" : "90%") : "0%" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        </div>
                        {/* Status */}
                        <div className="flex items-center gap-1.5 flex-shrink-0" style={{ minWidth: 110 }}>
                          {isDone ? (
                            <motion.div
                              initial={{ scale: 0 }} animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="flex items-center gap-1"
                            >
                              <CheckCircle size={13} style={{ color: "#00ff88" }} />
                              <span className="text-xs font-mono" style={{ color: "#00ff88" }}>Published</span>
                            </motion.div>
                          ) : isActive ? (
                            <div className="flex items-center gap-1.5">
                              <motion.div
                                className="w-2.5 h-2.5 rounded-full border border-current"
                                style={{ borderColor: pl.color, borderTopColor: "transparent" }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                              />
                              <span className="text-xs font-mono" style={{ color: pl.color }}>{stageLabel}</span>
                            </div>
                          ) : (
                            <span className="text-xs font-mono text-slate-600">Queued</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <button
                onClick={handlePublish}
                disabled={selected.length === 0}
                className="w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2 transition-all"
                style={{
                  background: selected.length > 0
                    ? "linear-gradient(135deg,rgba(0,255,136,0.15),rgba(0,245,255,0.15))"
                    : "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${selected.length > 0 ? "rgba(0,255,136,0.4)" : "rgba(255,255,255,0.06)"}`,
                  color: selected.length > 0 ? "#ffffff" : "#334155",
                  boxShadow: selected.length > 0 ? "0 0 30px rgba(0,255,136,0.15)" : "none",
                }}
              >
                <Send size={16} />
                Publish Now
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── Welcome Screen ────────────────────────────────────────────────────────────
const WelcomeScreen = ({ onEnter }) => {
  const features = [
    { icon: "✦", label: "AI Content Generation" },
    { icon: "✦", label: "Multi-Platform Publishing" },
    { icon: "✦", label: "RAG Optimisation Loop" },
    { icon: "✦", label: "Live Analytics" },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "#04050d" }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{ width: 700, height: 700, top: "-20%", left: "-15%", background: "rgba(0,245,255,0.05)", filter: "blur(80px)" }}
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 600, height: 600, bottom: "-15%", right: "-10%", background: "rgba(124,58,237,0.06)", filter: "blur(80px)" }}
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 400, height: 400, top: "30%", right: "20%", background: "rgba(0,255,136,0.03)", filter: "blur(60px)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />
        {/* Grid */}
        <div className="hud-grid absolute inset-0 opacity-60" />
      </div>

      {/* Content — two column desktop layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-12 flex items-center gap-24">

        {/* LEFT — Logo */}
        <motion.div
          className="flex-shrink-0 flex flex-col items-center"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
            {[320, 380, 440].map((size, i) => (
              <motion.div
                key={size}
                className="absolute rounded-full border"
                style={{
                  width: size, height: size,
                  borderColor: `rgba(0,245,255,${0.14 - i * 0.04})`,
                }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.15, 0.5] }}
                transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
              />
            ))}
            <img
              src="/logo2.png"
              alt="SingSinghAI"
              style={{
                width: 220,
                height: 220,
                objectFit: "contain",
                borderRadius: "36px",
                background: "transparent",
                position: "relative",
                zIndex: 10,
                filter: "brightness(1.25) drop-shadow(0 0 40px rgba(0,245,255,0.35)) drop-shadow(0 0 80px rgba(124,58,237,0.2))",
              }}
            />
          </div>
        </motion.div>

        {/* RIGHT — Text */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase mb-6"
              style={{ background: "rgba(0,245,255,0.07)", border: "1px solid rgba(0,245,255,0.2)", color: "rgba(0,245,255,0.7)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Live Platform
            </div>
          </motion.div>

          <motion.h1
            className="font-bold mb-5 leading-tight"
            style={{ fontSize: "clamp(36px, 4vw, 58px)", color: "#f1f5f9" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            AI-Powered<br />
            <span style={{
              background: "linear-gradient(135deg,#00f5ff,#7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Marketing Platform
            </span>
          </motion.h1>

          <motion.p
            className="leading-relaxed mb-8"
            style={{ fontSize: "16px", color: "#64748b", maxWidth: 480 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            From a plain English brief to published, platform-optimised content — in three steps. See how the full GenAI marketing pipeline works end-to-end.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {features.map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono"
                style={{
                  background: "rgba(0,245,255,0.06)",
                  border: "1px solid rgba(0,245,255,0.18)",
                  color: "rgba(0,245,255,0.75)",
                }}
              >
                <span style={{ color: "#00f5ff" }}>{icon}</span>
                {label}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              onClick={onEnter}
              whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(0,245,255,0.35), 0 20px 50px rgba(0,0,0,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-10 py-4 rounded-2xl text-base font-bold"
              style={{
                background: "linear-gradient(135deg,rgba(0,245,255,0.15),rgba(124,58,237,0.3))",
                border: "1.5px solid rgba(0,245,255,0.45)",
                color: "#ffffff",
                boxShadow: "0 0 30px rgba(0,245,255,0.15), 0 10px 40px rgba(0,0,0,0.3)",
              }}
            >
              <Sparkles size={20} style={{ color: "#00f5ff" }} />
              Get Started
              <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────────
const MarketingDemoPage = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [config, setConfig] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = (next) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handlePromptNext = (data) => {
    setConfig(data);
    goTo(1);
  };

  const handleGenerateNext = (data) => {
    setConfig((prev) => ({ ...prev, ...data }));
    goTo(2);
  };

  const handleReset = () => {
    setConfig(null);
    setDirection(-1);
    setStep(0);
  };

  return (
    <div className="min-h-screen hud-grid" style={{ background: "#04050d", color: "#e2e8f0" }}>
      <AnimatePresence>
        {showWelcome && <WelcomeScreen onEnter={() => setShowWelcome(false)} />}
      </AnimatePresence>
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="radial-blob morphing-blob"
          style={{ width: 600, height: 600, top: "-10%", left: "-5%", background: "rgba(0,245,255,0.04)" }}
        />
        <div
          className="radial-blob morphing-blob"
          style={{ width: 500, height: 500, bottom: "-10%", right: "-5%", background: "rgba(124,58,237,0.05)", animationDelay: "7s" }}
        />
      </div>

      {/* Minimal navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(4,5,13,0.92)" : "rgba(4,5,13,0.4)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(0,245,255,0.12)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <img
            src="/logo2.png"
            alt="SingSinghAI"
            className="cursor-pointer object-contain"
            style={{
              height: "44px",
              width: "auto",
              background: "transparent",
              filter: "brightness(1.3) drop-shadow(0 0 10px rgba(0,245,255,0.35))",
            }}
            onClick={() => navigate("/")}
          />

          <div className="w-8" />
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 pt-24 pb-16">
        <div className="w-full max-w-6xl mx-auto">
          {/* Top label + stepper */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-sm font-mono text-slate-600 uppercase tracking-widest mb-6">
              Marketing GenAI Platform
            </h1>
            <StepIndicator current={step} />
          </motion.div>

        {/* Page transition container */}
        <div className="w-full overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 0 && (
              <motion.div
                key="step0"
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <PromptStep onNext={handlePromptNext} />
              </motion.div>
            )}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <GenerateStep
                  config={config}
                  onNext={handleGenerateNext}
                  onBack={() => goTo(0)}
                />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <PublishStep config={config} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>
      </main>
    </div>
  );
};

export default MarketingDemoPage;
