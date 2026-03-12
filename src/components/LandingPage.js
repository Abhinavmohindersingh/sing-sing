import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";

import { t as translate, SECTION_IDS } from "../data/translations";

import ScrollProgress from "./ui/ScrollProgress";
import NeonButton from "./ui/NeonButton";
import QuizModal from "./ui/QuizModal";
import ContactModal from "./ui/ContactModal";
import ChatbotWidget from "./ui/chatbot/ChatbotWidget";

import HeroSection from "./sections/HeroSection";
import ProblemSection from "./sections/ProblemSection";
import ComparisonSection from "./sections/ComparisonSection";
import SolutionSection from "./sections/SolutionSection";
import HowItWorks from "./sections/HowItWorks";
import CaseStudies from "./sections/CaseStudies";
import ProofSection from "./sections/ProofSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import FAQSection from "./sections/FAQSection";
import CTASection from "./sections/CTASection";

const ZoneDivider = ({ fromZone, toZone }) => (
  <div className="zone-divider relative">
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest"
      style={{ color: "rgba(0,245,255,0.2)" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {fromZone && toZone ? `${fromZone} → ${toZone}` : ""}
    </motion.div>
  </div>
);

const Navbar = ({ lang, setLang, onOpenContact, scrolled }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = (key) => translate(key, lang);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
          <div className="flex items-center gap-3">
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

const Footer = ({ t }) => (
  <footer
    className="relative py-16 px-6 overflow-hidden"
    style={{
      background: "linear-gradient(180deg, #04050d 0%, #020307 100%)",
      borderTop: "1px solid rgba(0,245,255,0.1)",
    }}
  >
    <div className="absolute inset-0 hud-grid opacity-30" />
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid gap-10 lg:grid-cols-[2fr,1fr,1fr] mb-12">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img src="/logo2.png" alt="SingSingh AI" className="w-12 h-12 rounded-xl object-contain" />
            <div>
              <div
                className="font-display font-bold text-2xl leading-none"
                style={{
                  background: "linear-gradient(135deg, #00f5ff, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("footerTitle")}
              </div>
              <div className="font-mono text-xs mt-1" style={{ color: "rgba(0,245,255,0.4)" }}>
                Smarter AI · Stronger Business
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">{t("footerDescription")}</p>
        </div>

        <div>
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(0,245,255,0.5)" }}>
            Services
          </h3>
          <ul className="space-y-2">
            {t("services").map((service, i) => (
              <li key={i} className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">{service}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(0,245,255,0.5)" }}>
            Contact
          </h3>
          <div className="space-y-3">
            {[
              { icon: Phone, text: t("contactPhone") },
              { icon: Mail, text: t("contactEmail1") },
              { icon: Mail, text: t("contactEmail2") },
              { icon: MapPin, text: t("contactAddress") },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                <item.icon size={14} style={{ color: "rgba(0,245,255,0.4)", flexShrink: 0 }} />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 text-xs text-slate-600"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span>{t("copyright")}</span>
        <span style={{ color: "rgba(0,245,255,0.3)" }}>● NEURAL ODYSSEY · AI SYSTEMS ONLINE · 24/7</span>
      </div>
    </div>
  </footer>
);

const LandingPage = () => {
  const [lang, setLang] = useState("en");
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tFn = (key, replacements = {}) => translate(key, lang, replacements);

  return (
    <div className="min-h-screen font-sans" style={{ background: "#04050d", color: "#e2e8f0" }}>
      <ScrollProgress />

      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        scrolled={scrolled}
      />

      <main>
        <HeroSection
          onOpenContact={() => setIsContactOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
          t={tFn}
        />
        <ZoneDivider fromZone="00" toZone="01" />
        <ProblemSection t={tFn} />
        <ZoneDivider fromZone="01" toZone="01.5" />
        <ComparisonSection t={tFn} />
        <ZoneDivider fromZone="01.5" toZone="02" />
        <SolutionSection t={tFn} />
        <ZoneDivider fromZone="02" toZone="03" />
        <HowItWorks t={tFn} />
        <ZoneDivider fromZone="03" toZone="04" />
        <CaseStudies t={tFn} />
        <ZoneDivider fromZone="04" toZone="05" />
        <ProofSection t={tFn} />
        <ZoneDivider fromZone="05" toZone="05.5" />
        <TestimonialsSection t={tFn} />
        <ZoneDivider fromZone="05.5" toZone="06" />
        <FAQSection t={tFn} />
        <ZoneDivider fromZone="06" toZone="07" />
        <CTASection
          onStartQuiz={() => setIsQuizOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          t={tFn}
        />
      </main>

      <Footer t={tFn} />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        lang={lang}
        t={tFn}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        lang={lang}
        t={tFn}
      />

      <ChatbotWidget lang={lang} />
    </div>
  );
};

export default LandingPage;
