import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BarChart2, TrendingUp, Users, Eye, MousePointer, RefreshCw, ArrowLeft, Linkedin, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const TikTokIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.79a4.85 4.85 0 01-1.02-.1z"/>
  </svg>
);

const PLATFORM_DATA = [
  { id: "linkedin",  label: "LinkedIn",   icon: Linkedin,   color: "#60a5fa", bg: "rgba(10,102,194,0.12)",  border: "rgba(10,102,194,0.35)",  reach: "3.2K",  impressions: "8.7K",  ctr: "1.8%", engagement: "2.4%", clicks: "157",  shares: "48",  trend: +22 },
  { id: "instagram", label: "Instagram",  icon: Instagram,  color: "#f472b6", bg: "rgba(225,48,108,0.12)",  border: "rgba(225,48,108,0.35)",  reach: "6.8K",  impressions: "19.4K", ctr: "2.9%", engagement: "4.1%", clicks: "563",  shares: "201", trend: +38 },
  { id: "tiktok",    label: "TikTok",     icon: TikTokIcon, color: "#f87171", bg: "rgba(255,0,80,0.1)",     border: "rgba(255,0,80,0.3)",     reach: "11.2K", impressions: "34.6K", ctr: "3.4%", engagement: "6.2%", clicks: "1177", shares: "392", trend: +54 },
  { id: "twitter",   label: "Twitter/X",  icon: Twitter,    color: "#67e8f9", bg: "rgba(29,155,240,0.12)",  border: "rgba(29,155,240,0.35)",  reach: "1.9K",  impressions: "5.2K",  ctr: "1.2%", engagement: "1.4%", clicks: "62",   shares: "24",  trend: +11 },
  { id: "facebook",  label: "Facebook",   icon: Facebook,   color: "#93c5fd", bg: "rgba(24,119,242,0.12)",  border: "rgba(24,119,242,0.35)",  reach: "4.1K",  impressions: "11.3K", ctr: "1.6%", engagement: "2.1%", clicks: "181",  shares: "67",  trend: +17 },
  { id: "youtube",   label: "YouTube",    icon: Youtube,    color: "#fca5a5", bg: "rgba(255,0,0,0.1)",      border: "rgba(255,0,0,0.3)",      reach: "2.4K",  impressions: "6.1K",  ctr: "2.2%", engagement: "3.1%", clicks: "134",  shares: "41",  trend: +19 },
];

const SPARKLINE_PATHS = [
  "M0 40 C20 36 35 28 50 22 C65 16 75 20 90 14 C105 8 115 10 130 6",
  "M0 38 C15 34 30 26 50 18 C70 10 85 16 100 10 C115 4 125 8 130 4",
  "M0 42 C18 38 32 30 50 20 C68 10 80 14 100 8 C118 2 126 6 130 2",
  "M0 36 C20 32 38 28 55 22 C72 16 85 20 100 16 C115 12 124 14 130 10",
  "M0 39 C22 35 40 29 58 23 C76 17 88 21 104 17 C118 13 126 15 130 11",
  "M0 41 C18 37 36 31 52 25 C68 19 82 22 98 18 C112 14 122 16 130 12",
];

const StatCard = ({ label, value, icon: Icon, color, sub, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="rounded-2xl p-5"
    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{label}</span>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}40` }}>
        <Icon size={14} style={{ color }} />
      </div>
    </div>
    <div className="text-3xl font-bold font-mono mb-1" style={{ color }}>{value}</div>
    {sub && <div className="text-xs text-slate-500">{sub}</div>}
  </motion.div>
);

export default function PerformancePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const totalReach = "29.6K";
  const totalImpressions = "85.3K";
  const avgCTR = "2.2%";
  const totalClicks = "2,274";

  return (
    <div className="min-h-screen" style={{ background: "#04050d", fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}>
      {/* Nav */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16"
        style={{ background: "rgba(4,5,13,0.92)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(16px)" }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Demo
          </button>
          <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="flex items-center gap-2">
            <img src="/logo2.png" alt="SingSinghAI" className="w-7 h-7 rounded-lg object-contain" />
            <span className="text-sm font-bold" style={{ background: "linear-gradient(135deg,#00f5ff,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              SingSinghAI
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00ff88" }} />
          <span className="text-xs font-mono" style={{ color: "#00ff88" }}>LIVE · Updated 2 min ago</span>
        </div>
      </div>

      <div className="pt-16 max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", color: "#00f5ff" }}>
              Campaign · AI Marketing Automation Post
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00ff88" }}>
              Published Today 9:02 AM AEST
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Campaign Performance</h1>
          <p className="text-slate-400 text-sm">Real-time analytics across all published platforms</p>
        </motion.div>

        {/* Top KPI cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Reach"       value={totalReach}       icon={Users}          color="#00f5ff" sub="Across 6 platforms"  delay={0.0} />
          <StatCard label="Total Impressions" value={totalImpressions} icon={Eye}            color="#a78bfa" sub="↑ 18% vs last post"  delay={0.1} />
          <StatCard label="Avg. CTR"          value={avgCTR}           icon={MousePointer}   color="#00ff88" sub="Industry avg: 1.9%"  delay={0.2} />
          <StatCard label="Total Clicks"      value={totalClicks}      icon={TrendingUp}     color="#fb923c" sub="↑ 24% vs last post"  delay={0.3} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {["overview", "by platform"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all"
              style={{
                background: activeTab === tab ? "rgba(0,245,255,0.12)" : "transparent",
                border: activeTab === tab ? "1px solid rgba(0,245,255,0.3)" : "1px solid transparent",
                color: activeTab === tab ? "#00f5ff" : "#475569",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" ? (
          <div className="grid grid-cols-3 gap-5">
            {/* Sparkline chart */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="col-span-2 rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm font-semibold text-white mb-0.5">Reach Over Time</div>
                  <div className="text-xs text-slate-500">Last 7 days · all platforms</div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "#00ff88" }}>
                  <TrendingUp size={12} />
                  +48% this week
                </div>
              </div>
              {/* SVG chart */}
              <svg width="100%" height="120" viewBox="0 0 500 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="reach-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#00f5ff" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0 90 C60 80 110 65 170 50 C230 35 270 45 330 30 C390 15 440 22 500 10 L500 120 L0 120 Z" fill="url(#reach-grad)"/>
                <path d="M0 90 C60 80 110 65 170 50 C230 35 270 45 330 30 C390 15 440 22 500 10" stroke="#00f5ff" strokeWidth="2" fill="none" strokeLinecap="round"/>
                {/* Day labels */}
                {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => (
                  <text key={d} x={i * 83 + 8} y="118" fontSize="9" fill="#334155" fontFamily="monospace">{d}</text>
                ))}
                {/* End dot */}
                <circle cx="500" cy="10" r="4" fill="#00f5ff"/>
                <circle cx="500" cy="10" r="8" fill="#00f5ff" fillOpacity="0.2"/>
              </svg>
            </motion.div>

            {/* Content breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="text-sm font-semibold text-white mb-5">Engagement Split</div>
              <div className="space-y-4">
                {[
                  { label: "Likes",    value: "1,847", pct: 62, color: "#00f5ff" },
                  { label: "Comments", value: "312",   pct: 11, color: "#a78bfa" },
                  { label: "Shares",   value: "763",   pct: 26, color: "#00ff88" },
                  { label: "Saves",    value: "284",   pct: 10, color: "#fb923c" },
                ].map(({ label, value, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">{label}</span>
                      <span className="font-mono font-semibold" style={{ color }}>{value}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg,${color},${color}88)` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="col-span-3 rounded-2xl p-6"
              style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#a78bfa"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                </div>
                <span className="text-sm font-semibold text-white">AI Insights</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full ml-1" style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)" }}>Auto-generated</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { insight: "TikTok is outperforming other platforms with 54% reach growth. Short-form video is resonating with your audience.", action: "Boost TikTok" },
                  { insight: "Tuesday 9AM posts generate 2.1× higher CTR than weekday averages for your account. AI will schedule here by default.", action: "Set as default" },
                  { insight: "#MarketingAI accounted for 22% of organic discovery on this post. AI has saved it to your brand playbook.", action: "View playbook" },
                ].map(({ insight, action }) => (
                  <div key={action} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">{insight}</p>
                    <button className="text-xs font-semibold" style={{ color: "#a78bfa" }}>→ {action}</button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          /* By Platform tab */
          <div className="flex flex-col gap-3">
            {PLATFORM_DATA.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${p.border}` }}
              >
                <div className="grid grid-cols-7 gap-4 items-center">
                  {/* Platform name */}
                  <div className="flex items-center gap-3 col-span-1">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: p.bg, border: `1px solid ${p.border}` }}>
                      <p.icon size={15} style={{ color: p.color }} />
                    </div>
                    <span className="text-sm font-semibold text-white">{p.label}</span>
                  </div>
                  {/* Metrics */}
                  {[
                    { label: "Reach",       val: p.reach },
                    { label: "Impressions", val: p.impressions },
                    { label: "CTR",         val: p.ctr },
                    { label: "Clicks",      val: p.clicks },
                    { label: "Shares",      val: p.shares },
                  ].map(({ label, val }) => (
                    <div key={label} className="text-center">
                      <div className="text-sm font-bold font-mono text-white">{val}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                    </div>
                  ))}
                  {/* Trend + sparkline */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold" style={{ color: "#00ff88" }}>↑ {p.trend}%</span>
                    <svg width="80" height="30" viewBox="0 0 130 44">
                      <defs>
                        <linearGradient id={`sg-${p.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={p.color} stopOpacity="0.2"/>
                          <stop offset="100%" stopColor={p.color} stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path d={SPARKLINE_PATHS[i % SPARKLINE_PATHS.length].replace("M0", "M0").replace("130 6", "130 44 L0 44 Z")} fill={`url(#sg-${p.id})`}/>
                      <path d={SPARKLINE_PATHS[i % SPARKLINE_PATHS.length]} stroke={p.color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-8 flex gap-3"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: "linear-gradient(135deg,rgba(0,245,255,0.12),rgba(124,58,237,0.2))", border: "1.5px solid rgba(0,245,255,0.3)", color: "#fff" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 24px rgba(0,245,255,0.15)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            <RefreshCw size={14} />
            Create New Campaign
          </button>
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748b" }}
          >
            <BarChart2 size={14} />
            Export Report
          </button>
        </motion.div>
      </div>
    </div>
  );
}
