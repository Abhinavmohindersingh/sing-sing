import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

import { t as translate } from "../data/translations";

import ScrollProgress from "./ui/ScrollProgress";
import Navbar from "./ui/Navbar";
import QuizModal from "./ui/QuizModal";
import ContactModal from "./ui/ContactModal";
// import ChatbotWidget from "./ui/chatbot/ChatbotWidget"; // disabled for now

import HeroSection from "./sections/HeroSection";
import ProblemSection from "./sections/ProblemSection";
import ComparisonSection from "./sections/ComparisonSection";
import SolutionSection from "./sections/SolutionSection";
import HowItWorks from "./sections/HowItWorks";
import CaseStudies from "./sections/CaseStudies";
import ProofSection from "./sections/ProofSection";
import FAQSection from "./sections/FAQSection";
import CTASection from "./sections/CTASection";

const ZoneDivider = () => <div className="zone-divider relative" />;


const Footer = ({ t }) => (
  <footer
    className="relative py-16 px-6 overflow-hidden"
    style={{
      background: "#ffffff",
      borderTop: "1px solid rgba(15,23,42,0.08)",
    }}
  >
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid gap-10 lg:grid-cols-[2fr,1fr,1fr] mb-12">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img src="/logo2.png" alt="SingSingh AI" className="w-12 h-12 rounded-xl object-contain" />
            <div>
              <div
                className="font-display font-bold text-2xl leading-none"
                style={{
                  background: "linear-gradient(135deg, #2f5eec, #7c5cfc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("footerTitle")}
              </div>
              <div className="font-mono text-xs mt-1" style={{ color: "rgba(47,94,236,0.6)" }}>
                Smarter AI · Stronger Business
              </div>
            </div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{t("footerDescription")}</p>
        </div>

        <div>
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-4 text-slate-400">
            Services
          </h3>
          <ul className="space-y-2">
            {t("services").map((service, i) => (
              <li key={i} className="text-sm text-slate-500 hover:text-ink transition-colors cursor-pointer">{service}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-4 text-slate-400">
            Contact
          </h3>
          <div className="space-y-3">
            {[
              { icon: Mail, text: t("contactEmail1") },
              { icon: Mail, text: t("contactEmail2") },
              { icon: MapPin, text: t("contactAddress") },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                <item.icon size={14} style={{ color: "#94a3b8", flexShrink: 0 }} />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 text-xs text-slate-400"
        style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}
      >
        <span>{t("copyright")}</span>
        <span className="text-slate-400">SINGSINGH AI · SINGSINGHAI.COM.AU</span>
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

  // Scroll to section if navigated here with a hash (e.g. from Demo page)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const tryScroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    // Give the page a moment to render before scrolling
    const timer = setTimeout(tryScroll, 300);
    return () => clearTimeout(timer);
  }, []);

  const tFn = (key, replacements = {}) => translate(key, lang, replacements);

  return (
    <div className="min-h-screen font-sans" style={{ background: "#f8f9fd", color: "#0f1729" }}>
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
        <ZoneDivider fromZone="05" toZone="06" />
        <FAQSection t={tFn} />
        <ZoneDivider fromZone="06" toZone="07" />
        <CTASection
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

      {/* Chatbot disabled for now
      <ChatbotWidget lang={lang} />
      */}
    </div>
  );
};

export default LandingPage;
