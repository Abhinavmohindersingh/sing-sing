import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { t as translate, SECTION_IDS } from "../../data/translations";
import NeonButton from "./NeonButton";

const Navbar = ({ lang, setLang, onOpenContact, scrolled }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = (key) => translate(key, lang);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/#${id}`);
    }
    setMobileOpen(false);
  };

  const navLinks = [
    { label: t("navHowItWorks"), id: SECTION_IDS.howItWorks },
    { label: t("navCaseStudies"), id: SECTION_IDS.caseStudies },
    { label: t("navFAQ"), id: SECTION_IDS.faq },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
          backdropFilter: "blur(20px) saturate(1.6)",
          WebkitBackdropFilter: "blur(20px) saturate(1.6)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.6)" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 2px rgba(15,23,42,0.04), 0 8px 32px rgba(15,23,42,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/logo2.png" alt="SingSingh AI" className="w-9 h-9 rounded-lg object-contain" />
            <div>
              <div
                className="font-display font-bold text-lg leading-none"
                style={{
                  background: "linear-gradient(135deg, #2f5eec, #7c5cfc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("brandName")}
              </div>
              <div className="font-mono text-xs" style={{ color: "rgba(47,94,236,0.6)" }}>
                {t("tagline")}
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:text-ink transition-colors font-medium"
                style={{ transition: "all 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2f5eec")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => navigate("/demo")}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: "#f2eefe",
                border: "1px solid rgba(124,92,252,0.3)",
                color: "#6d4ff5",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e9e2fd";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f2eefe";
              }}
            >
              Demo
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle disabled — Chinese translations aren't polished enough to ship yet
            <NeonButton variant="ghost" color="cyan" size="sm" onClick={() => setLang(lang === "en" ? "zh" : "en")}>
              {lang === "en" ? "中文" : "English"}
            </NeonButton>
            */}
            <NeonButton variant="outline" color="cyan" size="sm" onClick={onOpenContact}>
              {t("navContact")}
            </NeonButton>
          </div>

          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#64748b" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(15,23,42,0.35)" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 flex flex-col"
              style={{
                background: "#ffffff",
                borderLeft: "1px solid rgba(15,23,42,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
                <span className="font-mono text-xs" style={{ color: "#2f5eec" }}>NAVIGATION</span>
                <button onClick={() => setMobileOpen(false)} style={{ color: "#475569" }}>
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 p-5 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:text-ink text-sm font-medium transition-colors"
                    style={{ background: "#f6f8fc" }}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => { navigate("/demo"); setMobileOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium"
                  style={{ background: "#f2eefe", color: "#6d4ff5", border: "1px solid rgba(124,92,252,0.25)" }}
                >
                  Demo
                </button>
                <button
                  onClick={() => { onOpenContact(); setMobileOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium"
                  style={{ background: "#eef4ff", color: "#2f5eec", border: "1px solid rgba(47,94,236,0.2)" }}
                >
                  {t("navContact")}
                </button>
              </div>
              {/* Language toggle disabled — Chinese translations aren't polished enough to ship yet
              <div className="p-5" style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}>
                <NeonButton
                  variant="ghost"
                  color="cyan"
                  size="sm"
                  className="w-full"
                  onClick={() => { setLang(lang === "en" ? "zh" : "en"); setMobileOpen(false); }}
                >
                  {lang === "en" ? "切换到中文" : "Switch to English"}
                </NeonButton>
              </div>
              */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
