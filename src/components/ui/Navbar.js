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
          background: scrolled ? "rgba(4,5,13,0.92)" : "rgba(4,5,13,0.4)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(0,245,255,0.12)" : "1px solid transparent",
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
                  background: "linear-gradient(135deg, #00f5ff, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("brandName")}
              </div>
              <div className="font-mono text-xs" style={{ color: "rgba(0,245,255,0.5)" }}>
                {t("tagline")}
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition-colors font-medium"
                style={{ transition: "all 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00f5ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => navigate("/demo")}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.3)",
                color: "#a78bfa",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(124,58,237,0.2)";
                e.currentTarget.style.color = "#c4b5fd";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(124,58,237,0.1)";
                e.currentTarget.style.color = "#a78bfa";
              }}
            >
              Demo
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <NeonButton variant="ghost" color="cyan" size="sm" onClick={() => setLang(lang === "en" ? "zh" : "en")}>
              {lang === "en" ? "中文" : "English"}
            </NeonButton>
            <NeonButton variant="outline" color="cyan" size="sm" onClick={onOpenContact}>
              {t("navContact")}
            </NeonButton>
          </div>

          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#94a3b8" }}
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
              style={{ background: "rgba(0,0,0,0.6)" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 flex flex-col"
              style={{
                background: "rgba(6,8,15,0.98)",
                borderLeft: "1px solid rgba(0,245,255,0.15)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="font-mono text-xs" style={{ color: "#00f5ff" }}>NAVIGATION</span>
                <button onClick={() => setMobileOpen(false)} style={{ color: "#475569" }}>
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 p-5 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:text-white text-sm font-medium transition-colors"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => { navigate("/demo"); setMobileOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium"
                  style={{ background: "rgba(124,58,237,0.08)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)" }}
                >
                  Demo
                </button>
                <button
                  onClick={() => { onOpenContact(); setMobileOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium"
                  style={{ background: "rgba(0,245,255,0.06)", color: "#00f5ff", border: "1px solid rgba(0,245,255,0.2)" }}
                >
                  {t("navContact")}
                </button>
              </div>
              <div className="p-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
