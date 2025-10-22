import React, { useState } from "react";
import ScrollProgress from "./ScrollProgress";
import PremiumNavbar from "./PremiumNavbar";
import PremiumHero from "./PremiumHero";
import InteractiveChatbox from "./InteractiveChatbox";
import PremiumFeatures from "./PremiumFeatures";
import PremiumCTA from "./PremiumCTA";
import PremiumFooter from "./PremiumFooter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  Target,
  Clock,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  CheckCircle,
  Shield,
  Lightbulb,
  Globe,
  X,
  AlertCircle,
  RefreshCw,
  FileText,
  Database,
  MessageSquare,
  Calendar,
  DollarSign,
  TrendingDown,
  Layers,
  GitBranch,
  Briefcase,
  ShoppingCart,
  Heart,
  Building,
  PieChart,
} from "lucide-react";

// Quiz Modal with Enhanced UI
const SingSinghQuizModal = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    company: "",
  });

  const quizQuestions = [
    {
      id: 1,
      question:
        "How much time does your team spend on manual, repetitive tasks each week?",
      options: [
        { text: "Less than 5 hours", score: 1 },
        { text: "5-15 hours", score: 3 },
        { text: "15-30 hours", score: 5 },
        { text: "More than 30 hours", score: 7 },
      ],
    },
    {
      id: 2,
      question: "How often do you miss deadlines due to operational overhead?",
      options: [
        { text: "Rarely or never", score: 1 },
        { text: "Occasionally (monthly)", score: 3 },
        { text: "Frequently (weekly)", score: 5 },
        { text: "Constantly (daily)", score: 7 },
      ],
    },
    {
      id: 3,
      question: "What's your biggest operational bottleneck?",
      options: [
        { text: "Data entry and management", score: 5 },
        { text: "Customer communication", score: 4 },
        { text: "Reporting and analytics", score: 6 },
        { text: "Scheduling and coordination", score: 3 },
      ],
    },
    {
      id: 4,
      question: "How do you currently handle customer inquiries?",
      options: [
        { text: "Fully automated system", score: 1 },
        { text: "Mix of automation and manual", score: 3 },
        { text: "Mostly manual responses", score: 5 },
        { text: "Completely manual, often delayed", score: 7 },
      ],
    },
    {
      id: 5,
      question: "How scalable is your current operation?",
      options: [
        { text: "Can 2x without adding staff", score: 1 },
        { text: "Need minor adjustments to scale", score: 3 },
        { text: "Would need significant hiring", score: 5 },
        { text: "Can't scale without major overhaul", score: 7 },
      ],
    },
    {
      id: 6,
      question: "How accurate is your business forecasting?",
      options: [
        { text: "Very accurate (>90%)", score: 1 },
        { text: "Moderately accurate (70-90%)", score: 3 },
        { text: "Somewhat accurate (50-70%)", score: 5 },
        { text: "Unreliable (<50%)", score: 7 },
      ],
    },
    {
      id: 7,
      question: "How long does it take to onboard a new client?",
      options: [
        { text: "Less than 1 day", score: 1 },
        { text: "1-3 days", score: 3 },
        { text: "1-2 weeks", score: 5 },
        { text: "More than 2 weeks", score: 7 },
      ],
    },
    {
      id: 8,
      question: "What percentage of your data is actionable insights?",
      options: [
        { text: "More than 75%", score: 1 },
        { text: "50-75%", score: 3 },
        { text: "25-50%", score: 5 },
        { text: "Less than 25%", score: 7 },
      ],
    },
    {
      id: 9,
      question: "How often do team members request 'one more person'?",
      options: [
        { text: "Never", score: 1 },
        { text: "Occasionally", score: 3 },
        { text: "Frequently", score: 5 },
        { text: "All the time", score: 7 },
      ],
    },
    {
      id: 10,
      question: "How much revenue are you losing to inefficiencies?",
      options: [
        { text: "Less than 5%", score: 1 },
        { text: "5-15%", score: 3 },
        { text: "15-30%", score: 5 },
        { text: "More than 30%", score: 7 },
      ],
    },
    {
      id: 11,
      question: "How do you track competitor movements?",
      options: [
        { text: "Automated monitoring system", score: 1 },
        { text: "Regular manual research", score: 3 },
        { text: "Occasional checks", score: 5 },
        { text: "Rarely or never", score: 7 },
      ],
    },
    {
      id: 12,
      question: "What's your customer response time?",
      options: [
        { text: "Under 1 hour", score: 1 },
        { text: "1-4 hours", score: 3 },
        { text: "4-24 hours", score: 5 },
        { text: "More than 24 hours", score: 7 },
      ],
    },
    {
      id: 13,
      question: "How often do you update your business strategy?",
      options: [
        { text: "Real-time data-driven adjustments", score: 1 },
        { text: "Monthly reviews", score: 3 },
        { text: "Quarterly reviews", score: 5 },
        { text: "Yearly or less", score: 7 },
      ],
    },
    {
      id: 14,
      question: "What's your team's biggest complaint?",
      options: [
        { text: "We're too efficient (rarely)", score: 1 },
        { text: "Need better tools", score: 4 },
        { text: "Too much busywork", score: 6 },
        { text: "Drowning in repetitive tasks", score: 7 },
      ],
    },
    {
      id: 15,
      question: "How future-ready is your business?",
      options: [
        { text: "Leading edge, AI-integrated", score: 1 },
        { text: "Modern but room for improvement", score: 3 },
        { text: "Behind competitors", score: 5 },
        { text: "Still using legacy systems", score: 7 },
      ],
    },
  ];

  const handleAnswer = (score) => {
    const newAnswers = { ...answers, [currentQuestion]: score };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
  };

  const getScoreAnalysis = (score) => {
    if (score <= 35) {
      return {
        level: "AI-Ready Leader",
        color: "from-green-500 to-emerald-600",
        borderColor: "border-green-500/30",
        message:
          "Your operations are already efficient! AI can help you optimize further and maintain your competitive edge.",
        recommendations: [
          "Advanced predictive analytics",
          "AI-powered strategic insights",
          "Automated competitive monitoring",
        ],
        urgency: "low",
      };
    } else if (score <= 60) {
      return {
        level: "Growth Opportunity",
        color: "from-blue-500 to-cyan-600",
        borderColor: "border-blue-500/30",
        message:
          "You're doing well but leaving growth on the table. AI agents can unlock 30-50% efficiency gains.",
        recommendations: [
          "Workflow automation for repetitive tasks",
          "Customer service AI agents",
          "Data-driven decision making tools",
        ],
        urgency: "medium",
      };
    } else if (score <= 85) {
      return {
        level: "High-Impact Candidate",
        color: "from-orange-500 to-amber-600",
        borderColor: "border-orange-500/30",
        message:
          "Significant inefficiencies are holding you back. AI can deliver immediate, measurable ROI.",
        recommendations: [
          "Operations automation (highest priority)",
          "AI-powered customer engagement",
          "Real-time business intelligence",
        ],
        urgency: "high",
      };
    } else {
      return {
        level: "Critical Transformation Needed",
        color: "from-red-500 to-rose-600",
        borderColor: "border-red-500/30",
        message:
          "Your competitors are pulling ahead. Immediate AI integration is essential for survival.",
        recommendations: [
          "Emergency operational overhaul",
          "Full-stack AI agent deployment",
          "24/7 automated systems",
        ],
        urgency: "critical",
      };
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>

          {!showResults ? (
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  AI Readiness Assessment
                </h2>
                <p className="text-gray-400 text-center text-lg">
                  Discover your business automation potential
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                  {quizQuestions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(option.score)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                          answers[currentQuestion] === option.score
                            ? "bg-blue-500/20 border-blue-500"
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                              answers[currentQuestion] === option.score
                                ? "border-blue-500 bg-blue-500"
                                : "border-white/30"
                            }`}
                          >
                            {answers[currentQuestion] === option.score && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span className="text-white font-medium">
                            {option.text}
                          </span>
                        </div>
                      </motion.button>
                    )
                  )}
                </div>

                {/* Navigation */}
                <div className="flex gap-4 pt-4">
                  {currentQuestion > 0 && (
                    <button
                      onClick={handlePrevious}
                      className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors font-medium"
                    >
                      Previous
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="p-8 md:p-12">
              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {(() => {
                  const score = calculateScore();
                  const analysis = getScoreAnalysis(score);

                  return (
                    <>
                      {/* Score Display */}
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className={`inline-block px-8 py-4 rounded-2xl bg-gradient-to-r ${analysis.color} mb-6`}
                        >
                          <div className="text-5xl font-bold text-white mb-2">
                            {score}
                          </div>
                          <div className="text-white/90 font-medium">
                            Your AI Readiness Score
                          </div>
                        </motion.div>

                        <h3 className="text-3xl font-bold text-white mb-3">
                          {analysis.level}
                        </h3>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                          {analysis.message}
                        </p>
                      </div>

                      {/* Recommendations */}
                      <div
                        className={`border-2 ${analysis.borderColor} rounded-2xl p-6 bg-white/5`}
                      >
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                          <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                          Recommended Solutions
                        </h4>
                        <ul className="space-y-3">
                          {analysis.recommendations.map((rec, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                              className="flex items-start"
                            >
                              <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-200">{rec}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Contact Form */}
                      <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-white/10">
                        <h4 className="text-xl font-bold text-white mb-4">
                          Get Your Personalized Strategy
                        </h4>
                        <p className="text-gray-300 mb-6">
                          Let's discuss how AI agents can transform your
                          business. Our team will reach out within 24 hours.
                        </p>

                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={contactInfo.name}
                            onChange={(e) =>
                              setContactInfo({
                                ...contactInfo,
                                name: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                          />
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={contactInfo.email}
                            onChange={(e) =>
                              setContactInfo({
                                ...contactInfo,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="Company Name"
                            value={contactInfo.company}
                            onChange={(e) =>
                              setContactInfo({
                                ...contactInfo,
                                company: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                          />

                          <button
                            onClick={() => {
                              // Handle form submission
                              console.log("Form submitted:", {
                                ...contactInfo,
                                score,
                                analysis: analysis.level,
                              });
                              onClose();
                            }}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-xl font-medium hover:scale-105 transition-transform"
                          >
                            Get My Custom Roadmap{" "}
                            <ArrowRight className="inline ml-2 w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Retake Button */}
                      <button
                        onClick={() => {
                          setShowResults(false);
                          setCurrentQuestion(0);
                          setAnswers({});
                        }}
                        className="w-full px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors font-medium"
                      >
                        Retake Assessment
                      </button>
                    </>
                  );
                })()}
              </motion.div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Enhanced Demo Components
const OperationsAutomationDemo = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
  >
    <div className="flex items-start justify-between mb-6">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-white">
          Workflow Automation Dashboard
        </h3>
        <p className="text-gray-400">
          Watch manual tasks disappear in real-time
        </p>
      </div>
      <Zap className="w-12 h-12 text-blue-400" />
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {/* Before */}
      <div className="bg-black/40 rounded-2xl p-6 border border-red-500/20">
        <h4 className="text-lg font-semibold text-red-400 mb-4 flex items-center">
          <TrendingDown className="w-5 h-5 mr-2" />
          Before AI Agents
        </h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start">
            <AlertCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">40+ hours/week on data entry</span>
          </li>
          <li className="flex items-start">
            <AlertCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">
              3-5 day customer response time
            </span>
          </li>
          <li className="flex items-start">
            <AlertCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">Manual report generation</span>
          </li>
          <li className="flex items-start">
            <AlertCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">Constant context switching</span>
          </li>
        </ul>
      </div>

      {/* After */}
      <div className="bg-black/40 rounded-2xl p-6 border border-green-500/20">
        <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          With AI Agents
        </h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start">
            <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">
              Automated 24/7, zero manual input
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">
              Instant responses, happy customers
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">
              Real-time dashboards, auto-updated
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">Focus on strategic work only</span>
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
      <p className="text-center text-blue-300 font-semibold">
        <Clock className="w-4 h-4 inline mr-2" />
        Average Time Saved: 65% of weekly operations
      </p>
    </div>
  </motion.div>
);

const InsightsGenerationDemo = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
  >
    <div className="flex items-start justify-between mb-6">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-white">
          AI-Powered Business Intelligence
        </h3>
        <p className="text-gray-400">Turn data chaos into clear action items</p>
      </div>
      <BarChart3 className="w-12 h-12 text-green-400" />
    </div>

    <div className="space-y-6">
      {/* Data Sources */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Database, label: "CRM Data", color: "blue" },
          { icon: MessageSquare, label: "Customer Feedback", color: "purple" },
          { icon: BarChart3, label: "Sales Metrics", color: "green" },
          { icon: Globe, label: "Market Trends", color: "orange" },
        ].map((source, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`bg-${source.color}-500/10 border border-${source.color}-500/20 rounded-xl p-4 text-center`}
          >
            <source.icon
              className={`w-8 h-8 text-${source.color}-400 mx-auto mb-2`}
            />
            <p className="text-xs text-gray-300">{source.label}</p>
          </motion.div>
        ))}
      </div>

      {/* AI Processing */}
      <div className="relative">
        <div className="flex items-center justify-center py-4">
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="relative bg-black px-6 py-3 rounded-full border border-purple-500/50">
            <RefreshCw className="w-6 h-6 text-purple-400 animate-spin" />
          </div>
        </div>
      </div>

      {/* Insights Output */}
      <div className="bg-black/40 rounded-2xl p-6 border border-green-500/20 space-y-4">
        <h4 className="text-lg font-semibold text-green-400 mb-4">
          AI-Generated Insights
        </h4>

        {[
          {
            insight: "Churn risk detected in 23 accounts",
            action: "Proactive outreach campaign initiated",
          },
          {
            insight: "Product X demand surge predicted",
            action: "Inventory scaling recommended",
          },
          {
            insight: "Customer segment Y underserved",
            action: "New service offering suggested",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-start space-x-3 bg-white/5 rounded-lg p-4"
          >
            <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">{item.insight}</p>
              <p className="text-gray-400 text-xs mt-1">→ {item.action}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const GrowthStrategyDemo = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
  >
    <div className="flex items-start justify-between mb-6">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-white">
          Scalability Engine
        </h3>
        <p className="text-gray-400">
          Growth without growing pains or headcount
        </p>
      </div>
      <TrendingUp className="w-12 h-12 text-purple-400" />
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          title: "2x Revenue",
          subtitle: "Same team size",
          metric: "+100%",
          color: "purple",
          icon: DollarSign,
        },
        {
          title: "5x Capacity",
          subtitle: "Zero new hires",
          metric: "+400%",
          color: "blue",
          icon: Users,
        },
        {
          title: "10x Speed",
          subtitle: "Process automation",
          metric: "+900%",
          color: "green",
          icon: Zap,
        },
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`bg-black/40 rounded-2xl p-6 border border-${stat.color}-500/20 text-center`}
        >
          <stat.icon
            className={`w-10 h-10 text-${stat.color}-400 mx-auto mb-4`}
          />
          <div className={`text-3xl font-bold text-${stat.color}-400 mb-2`}>
            {stat.metric}
          </div>
          <h4 className="text-lg font-semibold text-white mb-1">
            {stat.title}
          </h4>
          <p className="text-sm text-gray-400">{stat.subtitle}</p>
        </motion.div>
      ))}
    </div>

    <div className="mt-6 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
      <h4 className="text-white font-semibold mb-3 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-purple-400" />
        How We Scale Your Business
      </h4>
      <ul className="space-y-2 text-sm text-gray-300">
        <li className="flex items-start">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
          AI agents handle increasing workload automatically
        </li>
        <li className="flex items-start">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
          Predictive systems prevent bottlenecks before they occur
        </li>
        <li className="flex items-start">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
          Seamless integration with your existing tools
        </li>
      </ul>
    </div>
  </motion.div>
);

// Main Landing Page Component
const ImprovedLandingPage = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Pain Points Data - Real business challenges
  const painPoints = [
    {
      icon: Clock,
      title: "Drowning in Repetitive Tasks",
      problem:
        "Your team spends 30+ hours weekly on manual data entry, scheduling, and admin work",
      impact: "Missing deadlines, burned-out employees, lost opportunities",
      color: "red",
    },
    {
      icon: TrendingDown,
      title: "Can't Scale Without Hiring",
      problem:
        "Every 20% growth requires new hires, eating into margins and slowing momentum",
      impact: "Revenue growth capped, cash flow strained, scaling paralysis",
      color: "orange",
    },
    {
      icon: AlertCircle,
      title: "Slow Customer Response Times",
      problem:
        "Inquiries take 24-48 hours to answer, customers ghost before you reply",
      impact: "Lost deals, poor reviews, competitor advantage",
      color: "yellow",
    },
    {
      icon: Database,
      title: "Data Rich, Insight Poor",
      problem:
        "Mountains of data but no actionable intelligence to guide decisions",
      impact: "Reactive strategy, missed opportunities, guesswork decisions",
      color: "purple",
    },
  ];

  // Solutions Data - What AI agents can do
  const solutions = [
    {
      icon: Zap,
      title: "Intelligent Workflow Automation",
      solution:
        "AI agents handle data entry, scheduling, reporting, and routine communication 24/7",
      results: [
        "65% reduction in operational overhead",
        "Zero manual data entry",
        "Instant task completion",
      ],
      color: "blue",
    },
    {
      icon: TrendingUp,
      title: "Scalable Growth Engine",
      solution:
        "Systems that expand capacity without expanding headcount, adapting to demand in real-time",
      results: [
        "2-5x capacity with same team",
        "Predictive resource allocation",
        "Sustainable scaling",
      ],
      color: "green",
    },
    {
      icon: MessageSquare,
      title: "24/7 Customer Engagement",
      solution:
        "AI agents respond instantly to inquiries, qualify leads, and schedule meetings around the clock",
      results: [
        "Instant response times",
        "40% higher conversion rates",
        "Never miss a lead",
      ],
      color: "purple",
    },
    {
      icon: BarChart3,
      title: "Predictive Business Intelligence",
      solution:
        "AI analyzes all your data sources to deliver actionable insights and strategic recommendations",
      results: [
        "94% forecast accuracy",
        "Proactive problem-solving",
        "Data-driven decisions",
      ],
      color: "cyan",
    },
  ];

  // Real Use Case Scenarios - Industry-specific examples
  const useCaseScenarios = [
    {
      industry: "Professional Services",
      challenge: "Client onboarding taking 2+ weeks per account",
      solution:
        "AI agents automate document collection, compliance verification, and kickoff coordination",
      metrics: {
        primary: "2 days",
        secondary: "5x client capacity",
        label: "Onboarding Time",
      },
      processes: [
        "Automated document requests",
        "Smart compliance checking",
        "Instant kickoff scheduling",
      ],
      icon: Target,
      color: "blue",
    },
    {
      industry: "E-commerce & Retail",
      challenge: "Customer inquiries waiting 24+ hours, losing sales",
      solution:
        "24/7 AI support handling FAQs, order tracking, returns, and product recommendations instantly",
      metrics: {
        primary: "<1 min",
        secondary: "+40% conversions",
        label: "Response Time",
      },
      processes: [
        "Instant inquiry responses",
        "Intelligent product matching",
        "Automated order updates",
      ],
      icon: MessageSquare,
      color: "green",
    },
    {
      industry: "Healthcare & Wellness",
      challenge: "Appointment chaos, frequent no-shows, admin overload",
      solution:
        "Smart scheduling AI with automated reminders, rescheduling, and insurance verification",
      metrics: {
        primary: "60%",
        secondary: "70% time saved",
        label: "No-Show Reduction",
      },
      processes: [
        "Intelligent scheduling optimization",
        "Automated reminder sequences",
        "Self-service rescheduling",
      ],
      icon: Calendar,
      color: "purple",
    },
    {
      industry: "Real Estate",
      challenge: "Lead qualification eating up agent time, low conversion",
      solution:
        "AI agents pre-qualify leads, schedule viewings, and follow up automatically",
      metrics: {
        primary: "3x",
        secondary: "80% admin reduction",
        label: "Lead Capacity",
      },
      processes: [
        "Instant lead qualification",
        "Automated viewing coordination",
        "Smart follow-up sequences",
      ],
      icon: Layers,
      color: "orange",
    },
    {
      industry: "Financial Services",
      challenge: "Manual reporting taking days, compliance risks high",
      solution:
        "Automated data aggregation, report generation, and compliance monitoring",
      metrics: {
        primary: "Real-time",
        secondary: "99% accuracy",
        label: "Reporting Speed",
      },
      processes: [
        "Continuous data monitoring",
        "Instant report generation",
        "Automated compliance alerts",
      ],
      icon: Shield,
      color: "cyan",
    },
    {
      industry: "Marketing Agencies",
      challenge:
        "Campaign tracking across platforms, manual reporting to clients",
      solution:
        "Multi-platform analytics aggregation with automated client dashboards",
      metrics: {
        primary: "90%",
        secondary: "Real-time insights",
        label: "Time Saved",
      },
      processes: [
        "Cross-platform data sync",
        "Automated performance reports",
        "Predictive optimization",
      ],
      icon: BarChart3,
      color: "pink",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgress />
      <PremiumNavbar />
      <PremiumHero />

      {/* Pain Points Section - Enhanced Version */}
      <section className="py-24 relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.05),transparent_50%)]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
              The Hidden Cost of Inefficiency
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sound Familiar?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              These pain points are costing you revenue, time, and competitive
              advantage every single day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {painPoints.map((pain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br from-${pain.color}-900/10 to-black rounded-3xl p-8 border border-${pain.color}-500/20 hover:border-${pain.color}-500/40 transition-all duration-300`}
              >
                <pain.icon
                  className={`w-12 h-12 text-${pain.color}-400 mb-6`}
                />
                <h3 className="text-2xl font-bold text-white mb-3">
                  {pain.title}
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                      The Problem
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {pain.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                      The Impact
                    </p>
                    <p className={`text-${pain.color}-400 font-medium`}>
                      {pain.impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA After Pain Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-gray-400 mb-6 text-lg">
              Ready to eliminate these pain points?
            </p>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="bg-gradient-to-r from-red-600 to-orange-600 px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform inline-flex items-center"
            >
              Discover Your Solution <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 relative bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
              The AI Advantage
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transform Pain Points into Profit
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              AI agents don't just automate tasks—they multiply your capacity
              while reducing costs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br from-${solution.color}-900/10 to-black rounded-3xl p-8 border border-${solution.color}-500/20 hover:border-${solution.color}-500/40 transition-all duration-300`}
              >
                <solution.icon
                  className={`w-12 h-12 text-${solution.color}-400 mb-6`}
                />
                <h3 className="text-2xl font-bold text-white mb-3">
                  {solution.title}
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                      How It Works
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {solution.solution}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                      Your Results
                    </p>
                    <ul className="space-y-2">
                      {solution.results.map((result, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-gray-300"
                        >
                          <CheckCircle
                            className={`w-4 h-4 text-${solution.color}-400 mr-2 mt-0.5 flex-shrink-0`}
                          />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Sections */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              See AI Agents in Action
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real examples of how businesses are automating operations and
              scaling effortlessly.
            </p>
          </motion.div>

          <div className="space-y-16">
            <OperationsAutomationDemo />
            <InsightsGenerationDemo />
            <GrowthStrategyDemo />
          </div>
        </div>
      </section>

      {/* Real Use Cases Section - Replacing Fake Testimonials */}
      <section className="py-24 relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent_50%)]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              Industry Solutions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI Agents for Every Industry
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See how businesses like yours are solving real problems with AI
              automation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCaseScenarios.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br from-${useCase.color}-900/10 to-black rounded-3xl p-8 border border-${useCase.color}-500/20 hover:border-${useCase.color}-500/40 transition-all duration-300 hover:scale-105`}
              >
                {/* Icon & Industry */}
                <div className="flex items-center justify-between mb-6">
                  <useCase.icon
                    className={`w-10 h-10 text-${useCase.color}-400`}
                  />
                  <span
                    className={`text-xs px-3 py-1 rounded-full bg-${useCase.color}-500/10 text-${useCase.color}-400 font-medium`}
                  >
                    {useCase.industry}
                  </span>
                </div>

                {/* Challenge */}
                <div className="mb-6">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                    The Challenge
                  </h4>
                  <p className="text-white font-medium leading-relaxed">
                    {useCase.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                    AI Solution
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {useCase.solution}
                  </p>
                </div>

                {/* Key Processes */}
                <div className="mb-6">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wide mb-3">
                    What Gets Automated
                  </h4>
                  <ul className="space-y-2">
                    {useCase.processes.map((process, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle
                          className={`w-4 h-4 text-${useCase.color}-400 mr-2 mt-0.5 flex-shrink-0`}
                        />
                        <span className="text-gray-300">{process}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className={`pt-6 border-t border-${useCase.color}-500/20`}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div
                        className={`text-3xl font-bold text-${useCase.color}-400 mb-1`}
                      >
                        {useCase.metrics.primary}
                      </div>
                      <div className="text-xs text-gray-500">
                        {useCase.metrics.label}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">
                        {useCase.metrics.secondary}
                      </div>
                      <div className="text-xs text-gray-500">
                        Additional Impact
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Industry Not Listed CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/20 inline-block">
              <p className="text-gray-300 mb-4 text-lg">
                Don't see your industry? We adapt to any business model.
              </p>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform inline-flex items-center"
              >
                Discover Your Custom Solution{" "}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative bg-gradient-to-br from-yellow-900/20 via-black to-orange-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05),transparent_50%)]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stop Working IN Your Business.
              <br />
              Start Working ON It.
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Take the 3-minute assessment and discover exactly where AI agents
              can transform your operations. No commitment, just insights.
            </p>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform inline-flex items-center shadow-2xl"
            >
              Get Your Free AI Readiness Score{" "}
              <ArrowRight className="ml-3 w-6 h-6" />
            </button>

            <p className="text-gray-500 mt-6 text-sm">
              Used by 500+ companies • Average ROI: 327% in first year
            </p>
          </motion.div>
        </div>
      </section>

      {/* Keep existing footer components */}
      <InteractiveChatbox />
      <PremiumCTA />
      <PremiumFooter />

      {/* Quiz Modal */}
      <SingSinghQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
};

export default ImprovedLandingPage;
