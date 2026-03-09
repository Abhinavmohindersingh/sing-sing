import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Clock, DollarSign, TrendingUp, TrendingDown, AlertTriangle, Calendar } from "lucide-react";
import { getSmartQuizQuestions } from "../../data/quiz";
import { analyzeGaps } from "../../data/solutions";
import NeonButton from "./NeonButton";

const severityConfig = {
  CRITICAL: { border: "rgba(255,107,53,0.4)", text: "#ff6b35", bg: "rgba(255,107,53,0.08)", icon: "🔴", label: "CRITICAL" },
  HIGH:     { border: "rgba(245,158,11,0.4)",  text: "#f59e0b", bg: "rgba(245,158,11,0.08)",  icon: "🟡", label: "HIGH" },
  MEDIUM:   { border: "rgba(234,179,8,0.4)",   text: "#eab308", bg: "rgba(234,179,8,0.08)",   icon: "🟡", label: "MEDIUM" },
  LOW:      { border: "rgba(0,255,136,0.3)",    text: "#00ff88", bg: "rgba(0,255,136,0.06)",   icon: "🟢", label: "LOW" },
};

const QuizModal = ({ isOpen, onClose, lang, t }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", mobile: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gapAnalysis, setGapAnalysis] = useState(null);
  const [status, setStatus] = useState(null);

  const questions = getSmartQuizQuestions(lang);
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentQuestion === questions.length - 1) {
        setShowContactForm(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 300);
  };

  const handlePrevious = () => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      const submissionData = {
        ...formData,
        message: `Quiz submission. Mobile: ${formData.mobile || "N/A"}. Interested in AI assessment.`,
      };
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      if (!response.ok) throw new Error("Server error");
      setStatus("success");
      const analysis = analyzeGaps(answers, questions);
      setGapAnalysis(analysis);
      setShowResults(true);
      setShowContactForm(false);
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setShowContactForm(false);
    setFormData({ name: "", email: "", company: "", mobile: "" });
    setGapAnalysis(null);
    setStatus(null);
    onClose();
  };

  if (!isOpen) return null;

  const inputClass = `
    w-full px-4 py-3 rounded-lg font-mono text-sm text-white placeholder-slate-600
    focus:outline-none transition-all duration-200
  `;
  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
  };
  const inputFocusStyle = { borderColor: "rgba(0,245,255,0.5)", boxShadow: "0 0 0 2px rgba(0,245,255,0.1)" };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={resetQuiz}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-2xl relative"
              style={{
                background: "linear-gradient(180deg, #0a0d1a 0%, #06080f 100%)",
                border: "1px solid rgba(0,245,255,0.2)",
                boxShadow: "0 0 60px rgba(0,245,255,0.08)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
                style={{
                  background: "rgba(6,8,15,0.95)",
                  backdropFilter: "blur(12px)",
                  borderBottom: "1px solid rgba(0,245,255,0.1)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: "#00f5ff", letterSpacing: "0.2em" }}
                  >
                    // {t("quizTitle").toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={resetQuiz}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ color: "#475569" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#00f5ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                >
                  <X size={18} />
                </button>
              </div>

              {/* ── CONTACT FORM ── */}
              {showContactForm && !showResults ? (
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                      {t("quizCustomRoadmap")}
                    </h2>
                    <p className="text-slate-400">{t("quizEnterDetails")}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: "name", placeholder: t("quizName"), type: "text", required: true },
                      { name: "email", placeholder: t("quizEmail"), type: "email", required: true },
                      { name: "company", placeholder: t("quizCompany"), type: "text", required: true },
                      { name: "mobile", placeholder: t("quizMobile"), type: "tel", required: false },
                    ].map((field) => (
                      <input
                        key={field.name}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={handleFormChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        className={inputClass}
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 text-center">{t("quizBookingInfo")}</p>
                  {status === "error" && (
                    <p className="text-sm text-red-400 text-center">{t("contactError")}</p>
                  )}
                  <div className="flex gap-4">
                    <NeonButton type="button" variant="outline" color="cyan" size="md" onClick={() => setShowContactForm(false)}>
                      {t("quizBack")}
                    </NeonButton>
                    <NeonButton type="submit" variant="filled" color="cyan" size="md" disabled={isSubmitting} className="ml-auto">
                      {isSubmitting ? t("quizProcessing") : t("quizSubmitResults")}
                    </NeonButton>
                  </div>
                </form>

              /* ── RESULTS ── */
              ) : showResults && gapAnalysis ? (
                <div className="p-6 md:p-8 space-y-8">
                  {/* Score header */}
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                      className="inline-block px-8 py-5 rounded-2xl mb-6"
                      style={{
                        background: `linear-gradient(135deg, ${severityConfig[gapAnalysis.overallSeverity].bg}, rgba(0,0,0,0))`,
                        border: `1px solid ${severityConfig[gapAnalysis.overallSeverity].border}`,
                      }}
                    >
                      <div
                        className="text-5xl font-display font-bold mb-1"
                        style={{ color: severityConfig[gapAnalysis.overallSeverity].text }}
                      >
                        {gapAnalysis.totalHoursWasted} hrs/wk
                      </div>
                      <div className="text-white/80 font-mono text-sm">
                        {severityConfig[gapAnalysis.overallSeverity].icon} {t("quizTimeWasted")}
                      </div>
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                      {t("quizCustomRoadmap")}
                    </h3>
                    <p className="text-slate-400 max-w-2xl mx-auto">{t("quizResultsTitle")}</p>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Clock, color: "#00f5ff", value: gapAnalysis.totalHoursWasted, label: t("quizHoursWasted") },
                      { icon: DollarSign, color: "#00ff88", value: `$${((gapAnalysis.totalHoursWasted * 52 * 50 - gapAnalysis.totalMonthlyCost * 12) / 1000).toFixed(0)}K`, label: t("quizAnnualSavings") },
                      { icon: TrendingUp, color: "#a78bfa", value: `${(((gapAnalysis.totalHoursWasted * 52 * 50 - gapAnalysis.totalMonthlyCost * 12) / (gapAnalysis.totalMonthlyCost * 12)) * 100).toFixed(0)}%`, label: t("quizROI") },
                      { icon: Calendar, color: "#f59e0b", value: `${((gapAnalysis.totalMonthlyCost * 12) / ((gapAnalysis.totalHoursWasted * 52 * 50 - gapAnalysis.totalMonthlyCost * 12) / 12)).toFixed(1)}mo`, label: t("quizPayback") },
                    ].map((metric, i) => (
                      <div
                        key={i}
                        className="glass-card p-4 text-center"
                        style={{ border: `1px solid ${metric.color}20` }}
                      >
                        <metric.icon size={22} style={{ color: metric.color, margin: "0 auto 8px" }} />
                        <div className="text-2xl font-display font-bold text-white">{metric.value}</div>
                        <div className="text-xs text-slate-500 mt-1">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Top fixes */}
                  <div>
                    <h4 className="text-xl font-display font-bold text-white flex items-center gap-2 mb-5">
                      <AlertTriangle size={20} style={{ color: "#f59e0b" }} />
                      {t("quizTopFixes")}
                    </h4>
                    <div className="space-y-5">
                      {gapAnalysis.gaps.map((gap, i) => {
                        const cfg = severityConfig[gap.severity];
                        const annualSavings = gap.solution.hoursPerWeek * 52 * 50 - gap.solution.cost * 12;
                        return (
                          <motion.div
                            key={gap.category}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="rounded-xl p-5"
                            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-mono text-sm font-bold" style={{ color: cfg.text }}>
                                {cfg.icon} {t("quizPriority", {}, { number: i + 1, severity: cfg.label })}
                              </span>
                              <span className="text-xs px-3 py-1 rounded-full font-mono" style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8" }}>
                                {gap.solution.implementation}
                              </span>
                            </div>
                            <h5 className="text-lg font-display font-bold text-white mb-1">{gap.solution.name}</h5>
                            <p className="text-slate-400 text-sm mb-4">{gap.solution.solves}</p>

                            <div className="grid md:grid-cols-2 gap-3 mb-4">
                              <div className="rounded-lg p-3" style={{ background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.2)" }}>
                                <div className="flex items-center gap-1.5 text-xs text-orange-400 font-semibold mb-1">
                                  <TrendingDown size={12} /> {t("quizCurrentState")}
                                </div>
                                <div className="text-2xl font-bold text-white">{gap.hoursWasted} hrs</div>
                                <div className="text-xs text-slate-500">{t("quizWastedPerWeek")}</div>
                              </div>
                              <div className="rounded-lg p-3" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }}>
                                <div className="flex items-center gap-1.5 text-xs text-green-400 font-semibold mb-1">
                                  <TrendingUp size={12} /> {t("quizWithAI")}
                                </div>
                                <div className="text-2xl font-bold text-white">{gap.solution.timeSaved}</div>
                                <div className="text-xs text-slate-500">{t("quizAutomated")}</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                              <div className="text-center">
                                <div className="text-lg font-bold" style={{ color: "#00ff88" }}>${(annualSavings / 1000).toFixed(0)}K</div>
                                <div className="text-xs text-slate-500">{t("quizAnnualSavingsLabel")}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold" style={{ color: "#00f5ff" }}>${gap.solution.cost}/mo</div>
                                <div className="text-xs text-slate-500">{t("quizAICost")}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold" style={{ color: "#a78bfa" }}>{((annualSavings / (gap.solution.cost * 12)) * 100).toFixed(0)}%</div>
                                <div className="text-xs text-slate-500">{t("quizROILabel")}</div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div
                    className="rounded-2xl p-8 text-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,245,255,0.06), rgba(124,58,237,0.06))",
                      border: "1px solid rgba(0,245,255,0.15)",
                    }}
                  >
                    <h4 className="text-2xl font-display font-bold text-white mb-3">{t("quizTransformBusiness")}</h4>
                    <p className="text-slate-400 mb-6 max-w-xl mx-auto">{t("quizScheduleCall")}</p>
                    <NeonButton variant="outline" color="cyan" size="md" onClick={resetQuiz}>
                      {lang === "zh" ? "重新评估" : "Retake Assessment"}
                    </NeonButton>
                  </div>
                </div>

              /* ── QUIZ QUESTIONS ── */
              ) : (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="p-6 md:p-8 space-y-7"
                >
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-slate-500">
                      <span>{t("quizQuestion", {}, { current: currentQuestion + 1, total: questions.length })}</span>
                      <span>{Math.round(progress)}% {lang === "zh" ? "完成" : "Complete"}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        style={{
                          background: "linear-gradient(90deg, #00f5ff, #7c3aed, #00ff88)",
                          boxShadow: "0 0 8px rgba(0,245,255,0.4)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <h2 className="text-xl md:text-2xl font-display font-bold text-white leading-snug">
                    {currentQ.question}
                  </h2>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQ.options.map((option, i) => {
                      const isSelected = answers[currentQuestion] === i;
                      return (
                        <motion.button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          whileHover={isSelected ? {} : { x: 4 }}
                          className="w-full p-4 rounded-xl text-left flex items-center gap-4 transition-all duration-200"
                          style={{
                            background: isSelected ? "rgba(0,245,255,0.1)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${isSelected ? "rgba(0,245,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                          }}
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              border: `2px solid ${isSelected ? "#00f5ff" : "rgba(255,255,255,0.2)"}`,
                              background: isSelected ? "#00f5ff" : "transparent",
                            }}
                          >
                            {isSelected && <CheckCircle size={12} color="#000" />}
                          </div>
                          <span className="text-sm" style={{ color: isSelected ? "#ffffff" : "#94a3b8" }}>
                            {option.text}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Previous button */}
                  {currentQuestion > 0 && (
                    <div>
                      <NeonButton variant="ghost" color="cyan" size="sm" onClick={handlePrevious}>
                        ← {t("quizPrevious")}
                      </NeonButton>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
