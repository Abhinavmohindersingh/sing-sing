import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart2, ChevronDown, ChevronRight, Linkedin, Instagram, Twitter, Facebook, Youtube, CheckCircle, Clock, TrendingUp, Eye, MousePointer, Users } from "lucide-react";

const TikTokIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.79a4.85 4.85 0 01-1.02-.1z"/>
  </svg>
);
const PinterestIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const PLATFORM_MAP = {
  linkedin:  { label: "LinkedIn",        icon: Linkedin,      color: "#60a5fa", bg: "rgba(10,102,194,0.15)",  border: "rgba(10,102,194,0.4)" },
  instagram: { label: "Instagram",       icon: Instagram,     color: "#f472b6", bg: "rgba(225,48,108,0.12)",  border: "rgba(225,48,108,0.4)" },
  twitter:   { label: "Twitter/X",       icon: Twitter,       color: "#67e8f9", bg: "rgba(29,155,240,0.12)",  border: "rgba(29,155,240,0.4)" },
  facebook:  { label: "Facebook",        icon: Facebook,      color: "#93c5fd", bg: "rgba(24,119,242,0.12)",  border: "rgba(24,119,242,0.4)" },
  tiktok:    { label: "TikTok",          icon: TikTokIcon,    color: "#f87171", bg: "rgba(255,0,80,0.1)",     border: "rgba(255,0,80,0.35)" },
  youtube:   { label: "YouTube",         icon: Youtube,       color: "#fca5a5", bg: "rgba(255,0,0,0.1)",      border: "rgba(255,0,0,0.35)" },
  pinterest: { label: "Pinterest",       icon: PinterestIcon, color: "#f9a8d4", bg: "rgba(230,0,35,0.1)",     border: "rgba(230,0,35,0.35)" },
};

const CAMPAIGNS = [
  {
    id: 1,
    date: "19 Mar 2026 · 9:02 AM",
    title: "AI Marketing Automation — B2B Awareness",
    goal: "Brand Awareness",
    tone: "Professional",
    audience: "B2B Decision Makers",
    status: "live",
    platforms: ["linkedin", "instagram", "tiktok"],
    totalReach: "21.2K",
    impressions: "58.4K",
    ctr: "2.4%",
    clicks: "1,402",
    posts: [
      {
        platform: "linkedin",
        copy: `🚀 The future of marketing isn't hiring more people — it's working smarter.\n\nWe just processed 3 months of campaign data in under 30 seconds. Our AI identified that Tuesday 9am posts drive 47% more engagement for B2B audiences in the APAC region.\n\nThat insight used to take a team of analysts a week to surface.\n\nThe shift isn't coming. It's already here.\n\nHow is your team adapting to AI-driven marketing?`,
        hashtags: ["#MarketingAI", "#B2BMarketing", "#DigitalTransformation", "#AITools"],
        reach: "3.2K", impressions: "9.1K", ctr: "1.8%", likes: 214, comments: 31, shares: 47,
      },
      {
        platform: "instagram",
        copy: `Your competitors are already using AI to write, schedule & optimise their content ✨\n\nAre you still doing it manually?\n\nDrop a 🔥 if you're ready to automate your marketing.`,
        hashtags: ["#MarketingAutomation", "#AIMarketing", "#ContentCreator", "#DigitalMarketing"],
        reach: "6.8K", impressions: "19.4K", ctr: "2.6%", likes: 583, comments: 74, shares: 128,
      },
      {
        platform: "tiktok",
        copy: `POV: You let AI run your entire marketing campaign for a week 👀\n\nResults? 3× reach. 80% less time. Zero burnout.\n\nThis is what we built. This is SingSinghAI.`,
        hashtags: ["#MarketingTok", "#AIMarketing", "#BusinessTok", "#GrowthHacking"],
        reach: "11.2K", impressions: "29.9K", ctr: "3.1%", likes: 1247, comments: 189, shares: 312,
      },
    ],
  },
  {
    id: 2,
    date: "14 Mar 2026 · 11:30 AM",
    title: "Product Launch — SingSinghAI Platform",
    goal: "Product Launch",
    tone: "Bold",
    audience: "Industry Professionals",
    status: "completed",
    platforms: ["linkedin", "twitter", "facebook", "youtube"],
    totalReach: "18.6K",
    impressions: "49.2K",
    ctr: "2.1%",
    clicks: "1,033",
    posts: [
      {
        platform: "linkedin",
        copy: `Introducing SingSinghAI — the AI marketing engine built for growth teams who refuse to compromise on quality or speed.\n\nGenerate. Schedule. Publish. Analyse. All in one platform. All automated.\n\nWe're live. Come see what's possible.`,
        hashtags: ["#ProductLaunch", "#MarketingAI", "#SingSinghAI", "#AITools"],
        reach: "4.1K", impressions: "11.8K", ctr: "2.3%", likes: 318, comments: 52, shares: 89,
      },
      {
        platform: "twitter",
        copy: `Hot take: By 2026, 80% of your marketing content will be AI-generated.\n\nThe brands figuring out the human/AI ratio right now will own their niches.\n\nWe built the tool to help you get there. SingSinghAI is live →`,
        hashtags: ["#AIMarketing", "#FutureOfMarketing", "#MarketingTech"],
        reach: "2.8K", impressions: "7.4K", ctr: "1.6%", likes: 187, comments: 24, shares: 63,
      },
      {
        platform: "facebook",
        copy: `Big news — SingSinghAI is officially live!\n\nWe've built an AI that handles your entire content pipeline — from brief to published post — across 8 platforms simultaneously.\n\nClick to see how it works.`,
        hashtags: ["#SingSinghAI", "#MarketingAutomation", "#AITools"],
        reach: "3.6K", impressions: "9.8K", ctr: "1.9%", likes: 241, comments: 38, shares: 67,
      },
      {
        platform: "youtube",
        copy: `NEW VIDEO: We ran our entire marketing operation with AI for 30 days. Here's what happened.\n\nSpoiler: We 3× our reach, cut production time by 80%, and our team got their weekends back.`,
        hashtags: ["#AIMarketing", "#MarketingAutomation", "#SingSinghAI"],
        reach: "8.1K", impressions: "20.2K", ctr: "2.8%", likes: 892, comments: 134, shares: 201,
      },
    ],
  },
  {
    id: 3,
    date: "7 Mar 2026 · 9:00 AM",
    title: "APAC Recruitment Drive — Tech Talent",
    goal: "Recruitment",
    tone: "Inspirational",
    audience: "Job Seekers",
    status: "completed",
    platforms: ["linkedin", "instagram", "facebook"],
    totalReach: "13.4K",
    impressions: "35.8K",
    ctr: "1.9%",
    clicks: "680",
    posts: [
      {
        platform: "linkedin",
        copy: `We're hiring across APAC.\n\nNot just for skills — for people who see AI as a collaborator, not a threat.\n\nIf you believe the future of marketing is human + machine, we'd love to talk.\n\nOpen roles in Sydney, Singapore, and remote across APAC.`,
        hashtags: ["#Hiring", "#APACJobs", "#TechJobs", "#MarketingJobs"],
        reach: "5.2K", impressions: "14.8K", ctr: "2.3%", likes: 412, comments: 68, shares: 94,
      },
      {
        platform: "instagram",
        copy: `Life at SingSinghAI ✨\n\nFlexible. Remote-friendly. AI-powered.\n\nWe're building the future of marketing — and we want you on the team.\n\nLink in bio to see open roles.`,
        hashtags: ["#WeAreHiring", "#TechLife", "#MarketingCareers", "#APACJobs"],
        reach: "4.8K", impressions: "12.6K", ctr: "1.7%", likes: 631, comments: 58, shares: 87,
      },
      {
        platform: "facebook",
        copy: `SingSinghAI is growing fast and we're looking for talented people across APAC.\n\nMarketing specialists, AI trainers, account managers — if you're passionate about the future of content, apply today.`,
        hashtags: ["#Hiring", "#SingSinghAI", "#APACCareers"],
        reach: "3.4K", impressions: "8.4K", ctr: "1.5%", likes: 198, comments: 27, shares: 43,
      },
    ],
  },
];

const STATUS_STYLES = {
  live:      { color: "#00ff88", bg: "rgba(0,255,136,0.1)",  border: "rgba(0,255,136,0.3)",  label: "● Live" },
  completed: { color: "#a78bfa", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)", label: "✓ Completed" },
};

function PostCard({ post }) {
  const pl = PLATFORM_MAP[post.platform];
  if (!pl) return null;
  const Icon = pl.icon;
  return (
    <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${pl.border}` }}>
      {/* Platform badge */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
          style={{ background: pl.bg, border: `1px solid ${pl.border}`, color: pl.color }}>
          <Icon size={11} />
          {pl.label}
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono"
          style={{ background: "rgba(0,255,136,0.07)", border: "1px solid rgba(0,255,136,0.2)", color: "#00ff88" }}>
          <CheckCircle size={10} />
          Published
        </div>
      </div>

      {/* Copy */}
      <p className="text-sm text-slate-300 leading-relaxed mb-3 whitespace-pre-wrap" style={{ fontSize: 13 }}>
        {post.copy}
      </p>

      {/* Hashtags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.hashtags.map(h => (
          <span key={h} style={{ fontSize: 12, color: "#60a5fa" }}>{h}</span>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-5 gap-2 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {[
          { label: "Reach",       val: post.reach,       color: "#00f5ff" },
          { label: "Impressions", val: post.impressions,  color: "#a78bfa" },
          { label: "CTR",         val: post.ctr,          color: "#00ff88" },
          { label: "Likes",       val: post.likes.toLocaleString(), color: "#fb923c" },
          { label: "Comments",    val: post.comments.toLocaleString(), color: "#f472b6" },
        ].map(({ label, val, color }) => (
          <div key={label} className="text-center">
            <div className="text-sm font-bold font-mono" style={{ color }}>{val}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CampaignRow({ campaign, index }) {
  const [expanded, setExpanded] = useState(false);
  const s = STATUS_STYLES[campaign.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
    >
      {/* Header row — clickable */}
      <button
        className="w-full text-left px-6 py-5 flex items-center gap-4 transition-all"
        style={{ background: expanded ? "rgba(255,255,255,0.03)" : "transparent" }}
        onClick={() => setExpanded(e => !e)}
      >
        {/* Index */}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#475569" }}>
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Title + date */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white mb-0.5 truncate">{campaign.title}</div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock size={10} />
            {campaign.date}
            <span>·</span>
            <span>{campaign.goal}</span>
            <span>·</span>
            <span>{campaign.tone}</span>
          </div>
        </div>

        {/* Platform icons */}
        <div className="flex -space-x-1 flex-shrink-0">
          {campaign.platforms.map(pid => {
            const pl = PLATFORM_MAP[pid];
            if (!pl) return null;
            const Icon = pl.icon;
            return (
              <div key={pid} className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: pl.bg, border: `1.5px solid ${pl.border}`, color: pl.color }}>
                <Icon size={10} />
              </div>
            );
          })}
        </div>

        {/* KPIs */}
        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
          {[
            { label: "Reach",       val: campaign.totalReach,    color: "#00f5ff" },
            { label: "Impressions", val: campaign.impressions,   color: "#a78bfa" },
            { label: "CTR",         val: campaign.ctr,           color: "#00ff88" },
          ].map(({ label, val, color }) => (
            <div key={label} className="text-center" style={{ minWidth: 56 }}>
              <div className="text-sm font-bold font-mono" style={{ color }}>{val}</div>
              <div className="text-xs text-slate-600">{label}</div>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
            {s.label}
          </span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} style={{ color: "#475569" }} />
          </motion.div>
        </div>
      </button>

      {/* Expanded posts */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="px-6 py-5">
              <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
                {campaign.posts.length} posts published · {campaign.platforms.length} platforms
              </div>
              <div className="flex flex-col gap-4">
                {campaign.posts.map((post, i) => (
                  <PostCard key={i} post={post} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HistoricalPage() {
  const navigate = useNavigate();

  const totalCampaigns = CAMPAIGNS.length;
  const totalReach = "53.2K";
  const totalPosts = CAMPAIGNS.reduce((a, c) => a + c.posts.length, 0);
  const avgCTR = "2.1%";

  return (
    <div className="min-h-screen" style={{ background: "#04050d" }}>
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
        <button
          onClick={() => navigate("/performance")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
          style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.25)", color: "#00f5ff" }}
        >
          <BarChart2 size={13} />
          Live Dashboard
        </button>
      </div>

      <div className="pt-16 max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono px-3 py-1 rounded-full"
              style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.25)", color: "#a78bfa" }}>
              All Campaigns
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Historical Performance</h1>
          <p className="text-slate-400 text-sm">Every campaign published through SingSinghAI — click any row to see the full posts.</p>
        </motion.div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Campaigns", val: totalCampaigns, icon: ChevronRight, color: "#00f5ff", bg: "rgba(0,245,255,0.08)",   border: "rgba(0,245,255,0.2)" },
            { label: "Total Posts",     val: totalPosts,      icon: CheckCircle,  color: "#00ff88", bg: "rgba(0,255,136,0.08)",   border: "rgba(0,255,136,0.2)" },
            { label: "Combined Reach",  val: totalReach,      icon: Users,        color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)" },
            { label: "Avg. CTR",        val: avgCTR,          icon: TrendingUp,   color: "#fb923c", bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.2)" },
          ].map(({ label, val, icon: Icon, color, bg, border }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5" style={{ background: bg, border: `1.5px solid ${border}` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{label}</span>
                <Icon size={13} style={{ color }} />
              </div>
              <div className="text-3xl font-bold font-mono" style={{ color }}>{val}</div>
            </motion.div>
          ))}
        </div>

        {/* Campaign list */}
        <div className="flex flex-col gap-3">
          {CAMPAIGNS.map((c, i) => (
            <CampaignRow key={c.id} campaign={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
