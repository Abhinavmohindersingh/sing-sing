import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  Target,
  Clock,
  TrendingUp,
  Users,
  Play,
  Zap,
  CheckCircle,
  Shield,
  BarChart3,
  Lightbulb,
  Globe,
  X,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs) => twMerge(clsx(inputs.filter(Boolean)));

// 🔴 **COMPLETE TRANSLATIONS**
const translations = {
  en: {
    // Navigation
    navHowItWorks: "How It Works",
    navCaseStudies: "Case Studies",
    navFAQ: "FAQ",
    navStartQuiz: "Start Quiz",

    // Hero Section
    badge: "AI-Powered Growth Engine",
    heroTitle1: "Grow Your Business",
    heroTitle2: "with AI Intelligence",
    heroDescription:
      "Stop wasting time on manual chaos. Sing Singh delivers intelligent AI systems that automate operations, unlock insights, and scale your business 3x faster.",
    heroCTA: "Get Your AI Score",
    heroSubtext: "No credit card • 2 minutes • Instant personalized roadmap",

    // Problem Section
    problemTitle: "Why Scaling Feels Impossible",
    problemSubtitle:
      "Manual processes create invisible ceilings. AI breaks them.",
    problems: [
      {
        title: "Constant Firefighting",
        description:
          "Operations consume your time, leaving no room for strategic growth.",
        stats: "80% lose 6+ hours/week",
      },
      {
        title: "Repetitive Manual Work",
        description: "Data entry steals hours that could drive revenue.",
        stats: "23 hours/week wasted",
      },
      {
        title: "No Real Visibility",
        description: "Gut decisions limit growth without data insights.",
        stats: "67% lack real-time intel",
      },
      {
        title: "Scaling = Hiring",
        description:
          "Growth requires expensive headcount instead of smart systems.",
        stats: "3x staff for 2x growth",
      },
    ],

    // Solution Section
    solutionTitle: "AI That Delivers Results",
    solutionSubtitle:
      "Custom intelligent systems built for your exact business challenges.",
    solutions: [
      {
        title: "Intelligent Operations",
        description: "AI automates 80% of manual tasks with full visibility.",
        features: [
          "Client onboarding",
          "Task prioritization",
          "Performance tracking",
        ],
      },
      {
        title: "Data-Driven Decisions",
        description: "Custom AI analytics reveal hidden growth opportunities.",
        features: [
          "Revenue forecasting",
          "Customer insights",
          "Competitive intel",
        ],
      },
      {
        title: "Scalable Growth",
        description: "AI systems adapt automatically as you grow.",
        features: ["Resource allocation", "Scaling triggers", "Optimization"],
      },
    ],

    // How It Works
    howItWorksTitle: "How We Transform Your Business",
    howItWorksSubtitle: "Proven 3-phase approach with zero disruption.",
    phases: [
      {
        step: "1. Discovery",
        description: "Deep analysis of operations and growth bottlenecks.",
        details: ["AI audit", "Process mapping", "ROI analysis"],
        duration: "Week 1-2",
      },
      {
        step: "2. Implementation",
        description: "Phased deployment of custom AI solutions.",
        details: ["Model training", "Integration", "Dashboards"],
        duration: "Week 3-8",
      },
      {
        step: "3. Optimization",
        description: "Ongoing refinement and expansion.",
        details: ["Monitoring", "A/B testing", "Analytics"],
        duration: "Week 9+",
      },
    ],

    // Case Studies
    caseStudiesTitle: "Case Studies",
    caseStudies: [
      {
        title: "TechFlow: 65% Admin Reduction",
        industry: "SaaS",
        result: "+42% Revenue",
        image: "TF",
      },
      {
        title: "Urban Growth: Sustainable Scaling",
        industry: "Real Estate",
        result: "3x Capacity",
        image: "UG",
      },
      {
        title: "Digital Collective: 38% CAC Drop",
        industry: "Marketing",
        result: "94% Forecast",
        image: "DC",
      },
    ],

    // Proof Section
    proofTitle: "Real Results for Real Businesses",
    stats: [
      { value: "98%", label: "Client Satisfaction" },
      { value: "3.2x", label: "Efficiency Gain" },
      { value: "12", label: "Industries" },
      { value: "24", label: "Months Retention" },
    ],
    testimonials: [
      {
        name: "Sarah Chen",
        company: "TechFlow",
        quote: "Cut admin time by 65% and doubled capacity without hiring.",
        avatar: "SC",
      },
      {
        name: "Michael Rodriguez",
        company: "Urban Growth",
        quote: "Revenue up 42%, team happier, scaling sustainably.",
        avatar: "MR",
      },
      {
        name: "Priya Patel",
        company: "Digital Collective",
        quote: "Acquisition costs dropped 38%, forecasting 94% accurate.",
        avatar: "PP",
      },
    ],

    // FAQ Section
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "How quickly can we see results?",
        a: "Most clients see improvements within 30 days. Quick wins first, full transformation follows.",
      },
      {
        q: "Will this disrupt operations?",
        a: "Zero disruption. Systems run in parallel during transition with full continuity.",
      },
      {
        q: "What industries do you serve?",
        a: "Professional services, real estate, marketing, consulting, healthcare, e-commerce.",
      },
      {
        q: "Do I need technical expertise?",
        a: "No. Intuitive dashboards and automated workflows for any team member.",
      },
      {
        q: "What about data security?",
        a: "Enterprise-grade encryption, GDPR/CCPA compliant, financial institution standards.",
      },
    ],

    // CTA Section
    ctaTitle: "Ready to Grow Smarter?",
    ctaDescription:
      "Start your free AI assessment. 2 minutes to personalized growth roadmap.",
    ctaButton: "Start Free Assessment",
    ctaQuick: "2 min",
    ctaFree: "100% free",
    ctaInstant: "Instant",

    // Footer
    footerTitle: "SING SINGH",
    footerDescription:
      "AI-powered business transformation for ambitious companies.",
    services: ["AI Operations", "Business Intelligence", "Growth Automation"],
    company: ["About", "Careers", "Blog"],
    contactPhone: "+1 555 123-4567",
    contactEmail: "hello@sing-singh.com",
    contactAddress: "San Francisco, CA",
    copyright: "© 2025 Sing Singh AI Advisory. All rights reserved.",

    // Quiz
    quizGetResults: "Get Your Results",
    quizName: "Full Name",
    quizEmail: "Email Address",
    quizCompany: "Company Name",
    quizBack: "Back",
    quizProcessing: "Processing...",
    quizYourScore: "Your AI Readiness Score",
    quizClose: "Close",
    quizQuestion: "Question {current} of {total}",
    quizPrevious: "Previous",
    quizNext: "Next",
    quizFinish: "Finish Quiz",
  },
  zh: {
    // Navigation
    navHowItWorks: "工作原理",
    navCaseStudies: "案例研究",
    navFAQ: "常见问题",
    navStartQuiz: "开始测试",

    // Hero Section
    badge: "AI驱动增长引擎",
    heroTitle1: "用AI智能",
    heroTitle2: "加速业务增长",
    heroDescription:
      "停止浪费时间处理手动混乱。Sing Singh 提供智能AI系统，自动化运营、解锁洞察、让您的业务增长3倍更快。",
    heroCTA: "获取您的AI评分",
    heroSubtext: "无需信用卡 • 2分钟 • 即时个性化路线图",

    // Problem Section
    problemTitle: "为什么扩展如此困难",
    problemSubtitle: "手动流程制造无形天花板。AI打破它们。",
    problems: [
      {
        title: "持续救火",
        description: "运营消耗您的时间，留不下战略增长的空间。",
        stats: "80%每周损失6+小时",
      },
      {
        title: "重复手动工作",
        description: "数据录入窃取了可以驱动收入的小时。",
        stats: "每周浪费23小时",
      },
      {
        title: "缺乏实时可见性",
        description: "没有数据洞察的直觉决策限制增长。",
        stats: "67%缺乏实时情报",
      },
      {
        title: "扩展=招聘",
        description: "增长需要昂贵的人力而不是智能系统。",
        stats: "2倍增长需要3倍员工",
      },
    ],

    // Solution Section
    solutionTitle: "AI带来实际成果",
    solutionSubtitle: "为您的具体业务挑战量身定制的智能系统。",
    solutions: [
      {
        title: "智能运营",
        description: "AI自动化80%的手动任务并提供完全可见性。",
        features: ["客户入职", "任务优先级", "绩效跟踪"],
      },
      {
        title: "数据驱动决策",
        description: "定制AI分析揭示隐藏的增长机会。",
        features: ["收入预测", "客户洞察", "竞争情报"],
      },
      {
        title: "可扩展增长",
        description: "AI系统随着您的增长自动适应。",
        features: ["资源分配", "扩展触发", "优化"],
      },
    ],

    // How It Works
    howItWorksTitle: "我们如何改造您的业务",
    howItWorksSubtitle: "零干扰的3阶段方法。",
    phases: [
      {
        step: "1. 发现",
        description: "深入分析运营和增长瓶颈。",
        details: ["AI审计", "流程映射", "ROI分析"],
        duration: "第1-2周",
      },
      {
        step: "2. 实施",
        description: "分阶段部署定制AI解决方案。",
        details: ["模型训练", "集成", "仪表板"],
        duration: "第3-8周",
      },
      {
        step: "3. 优化",
        description: "持续改进和扩展。",
        details: ["监控", "A/B测试", "分析"],
        duration: "第9周+",
      },
    ],

    // Case Studies
    caseStudiesTitle: "案例研究",
    caseStudies: [
      {
        title: "TechFlow：65%行政减少",
        industry: "SaaS",
        result: "收入+42%",
        image: "TF",
      },
      {
        title: "Urban Growth：可持续扩展",
        industry: "房地产",
        result: "产能3倍",
        image: "UG",
      },
      {
        title: "Digital Collective：38%获客成本下降",
        industry: "营销",
        result: "预测94%",
        image: "DC",
      },
    ],

    // Proof Section
    proofTitle: "真实企业的真实成果",
    stats: [
      { value: "98%", label: "客户满意度" },
      { value: "3.2倍", label: "效率提升" },
      { value: "12", label: "行业" },
      { value: "24", label: "月留存" },
    ],
    testimonials: [
      {
        name: "Sarah Chen",
        company: "TechFlow",
        quote: "行政时间减少65%，无需招聘就翻倍了产能。",
        avatar: "SC",
      },
      {
        name: "Michael Rodriguez",
        company: "Urban Growth",
        quote: "收入增长42%，团队更快乐，可持续扩展。",
        avatar: "MR",
      },
      {
        name: "Priya Patel",
        company: "Digital Collective",
        quote: "获取成本下降38%，预测准确率94%。",
        avatar: "PP",
      },
    ],

    // FAQ Section
    faqTitle: "常见问题",
    faqs: [
      {
        q: "我们多久能看到成果？",
        a: "大多数客户在30天内看到改善。快速成果先行，完整转型随后。",
      },
      {
        q: "这会干扰运营吗？",
        a: "零干扰。系统在过渡期间并行运行，保持完全连续性。",
      },
      {
        q: "您服务哪些行业？",
        a: "专业服务、房地产、营销、咨询、医疗、电子商务。",
      },
      {
        q: "我需要技术专长吗？",
        a: "不需要。直观仪表板和自动化工作流适合任何团队成员。",
      },
      { q: "数据安全如何？", a: "企业级加密，符合GDPR/CCPA，金融行业标准。" },
    ],

    // CTA Section
    ctaTitle: "准备更智能地增长吗？",
    ctaDescription: "开始免费AI评估。2分钟获得个性化增长路线图。",
    ctaButton: "开始免费评估",
    ctaQuick: "2分钟",
    ctaFree: "100%免费",
    ctaInstant: "即时",

    // Footer
    footerTitle: "SING SINGH",
    footerDescription: "为雄心勃勃的公司提供AI驱动的业务转型。",
    services: ["AI运营", "商业智能", "增长自动化"],
    company: ["关于", "职业", "博客"],
    contactPhone: "+1 555 123-4567",
    contactEmail: "hello@sing-singh.com",
    contactAddress: "旧金山，加州",
    copyright: "© 2025 Sing Singh AI Advisory。保留所有权利。",

    // Quiz
    quizGetResults: "获取您的结果",
    quizName: "全名",
    quizEmail: "电子邮件地址",
    quizCompany: "公司名称",
    quizBack: "返回",
    quizProcessing: "处理中...",
    quizYourScore: "您的AI准备度评分",
    quizClose: "关闭",
    quizQuestion: "第{current}题，共{total}题",
    quizPrevious: "上一步",
    quizNext: "下一步",
    quizFinish: "完成测试",
  },
};

// 🔴 **SECTION IDS FOR NAVIGATION**
const SECTION_IDS = {
  howItWorks: "how-it-works",
  caseStudies: "case-studies",
  faq: "faq",
};

// 🔴 **COMPLETE QUIZ QUESTIONS (15 QUESTIONS - BOTH LANGUAGES)**
const quizQuestions = (lang) => [
  {
    id: 1,
    question:
      lang === "zh"
        ? "您的团队每周花多少时间在手动重复任务上？"
        : "How much time does your team spend on manual, repetitive tasks each week?",
    options:
      lang === "zh"
        ? [
            { text: "少于5小时", score: 1 },
            { text: "5-15小时", score: 3 },
            { text: "15-30小时", score: 5 },
            { text: "超过30小时", score: 7 },
          ]
        : [
            { text: "Less than 5 hours", score: 1 },
            { text: "5-15 hours", score: 3 },
            { text: "15-30 hours", score: 5 },
            { text: "More than 30 hours", score: 7 },
          ],
  },
  // ... (keeping all 15 questions - same as before)
  {
    id: 2,
    question:
      lang === "zh"
        ? "您最大的数据管理挑战是什么？"
        : "What's your biggest data management challenge?",
    options:
      lang === "zh"
        ? [
            { text: "一切都已自动化和有组织", score: 1 },
            { text: "电子表格和手动跟踪", score: 4 },
            { text: "多个不连接的系统", score: 6 },
            { text: "完全没有集中数据", score: 8 },
          ]
        : [
            { text: "Everything is automated and organized", score: 1 },
            { text: "Spreadsheets and manual tracking", score: 4 },
            { text: "Multiple disconnected systems", score: 6 },
            { text: "No centralized data at all", score: 8 },
          ],
  },
  {
    id: 3,
    question:
      lang === "zh"
        ? "您目前如何跟踪业务绩效？"
        : "How do you currently track business performance?",
    options:
      lang === "zh"
        ? [
            { text: "实时仪表板", score: 1 },
            { text: "每周手动报告", score: 3 },
            { text: "每月电子表格", score: 5 },
            { text: "没有正式跟踪", score: 7 },
          ]
        : [
            { text: "Real-time dashboards", score: 1 },
            { text: "Weekly manual reports", score: 3 },
            { text: "Monthly spreadsheets", score: 5 },
            { text: "No formal tracking", score: 7 },
          ],
  },
  {
    id: 4,
    question:
      lang === "zh"
        ? "您的客户入职流程如何？"
        : "What's your client onboarding process like?",
    options:
      lang === "zh"
        ? [
            { text: "完全自动化", score: 1 },
            { text: "半自动化", score: 3 },
            { text: "大部分手动", score: 5 },
            { text: "100%手动", score: 7 },
          ]
        : [
            { text: "Fully automated", score: 1 },
            { text: "Semi-automated", score: 3 },
            { text: "Mostly manual", score: 5 },
            { text: "100% manual", score: 7 },
          ],
  },
  {
    id: 5,
    question:
      lang === "zh"
        ? "您的收入预测准确率如何？"
        : "How accurate is your revenue forecasting?",
    options:
      lang === "zh"
        ? [
            { text: "95%+准确", score: 1 },
            { text: "80-94%准确", score: 3 },
            { text: "60-79%准确", score: 5 },
            { text: "低于60%", score: 7 },
          ]
        : [
            { text: "95%+ accurate", score: 1 },
            { text: "80-94% accurate", score: 3 },
            { text: "60-79% accurate", score: 5 },
            { text: "Less than 60%", score: 7 },
          ],
  },
  {
    id: 6,
    question:
      lang === "zh"
        ? "您有实时客户洞察吗？"
        : "Do you have real-time customer insights?",
    options:
      lang === "zh"
        ? [
            { text: "完全可见性", score: 1 },
            { text: "基本分析", score: 3 },
            { text: "有限报告", score: 5 },
            { text: "没有洞察", score: 7 },
          ]
        : [
            { text: "Complete visibility", score: 1 },
            { text: "Basic analytics", score: 3 },
            { text: "Limited reports", score: 5 },
            { text: "No insights", score: 7 },
          ],
  },
  {
    id: 7,
    question:
      lang === "zh"
        ? "多少时间用于行政 vs. 增长活动？"
        : "How much time goes to admin vs. growth activities?",
    options:
      lang === "zh"
        ? [
            { text: "20%行政/80%增长", score: 1 },
            { text: "40%行政/60%增长", score: 3 },
            { text: "60%行政/40%增长", score: 5 },
            { text: "80%+行政", score: 7 },
          ]
        : [
            { text: "20% admin / 80% growth", score: 1 },
            { text: "40% admin / 60% growth", score: 3 },
            { text: "60% admin / 40% growth", score: 5 },
            { text: "80%+ admin", score: 7 },
          ],
  },
  {
    id: 8,
    question:
      lang === "zh"
        ? "您最大的增长瓶颈是什么？"
        : "What's your biggest growth bottleneck?",
    options:
      lang === "zh"
        ? [
            { text: "没有瓶颈", score: 1 },
            { text: "手动流程", score: 4 },
            { text: "数据孤岛", score: 6 },
            { text: "团队容量", score: 8 },
          ]
        : [
            { text: "No bottlenecks", score: 1 },
            { text: "Manual processes", score: 4 },
            { text: "Data silos", score: 6 },
            { text: "Team capacity", score: 8 },
          ],
  },
  {
    id: 9,
    question:
      lang === "zh" ? "您目前使用AI工具吗？" : "Do you use AI tools currently?",
    options:
      lang === "zh"
        ? [
            { text: "多个AI系统", score: 1 },
            { text: "基本AI工具", score: 3 },
            { text: "完全没有AI", score: 5 },
            { text: "不知道", score: 7 },
          ]
        : [
            { text: "Multiple AI systems", score: 1 },
            { text: "Basic AI tools", score: 3 },
            { text: "No AI at all", score: 5 },
            { text: "Don't know", score: 7 },
          ],
  },
  {
    id: 10,
    question:
      lang === "zh"
        ? "您对运营效率满意度如何？"
        : "How satisfied are you with operations efficiency?",
    options:
      lang === "zh"
        ? [
            { text: "非常满意", score: 1 },
            { text: "满意", score: 3 },
            { text: "中立", score: 5 },
            { text: "不满意", score: 7 },
          ]
        : [
            { text: "Very satisfied", score: 1 },
            { text: "Satisfied", score: 3 },
            { text: "Neutral", score: 5 },
            { text: "Dissatisfied", score: 7 },
          ],
  },
  {
    id: 11,
    question:
      lang === "zh"
        ? "您的月流失率是多少？"
        : "What's your monthly churn rate?",
    options:
      lang === "zh"
        ? [
            { text: "低于2%", score: 1 },
            { text: "2-5%", score: 3 },
            { text: "5-10%", score: 5 },
            { text: "10%+", score: 7 },
          ]
        : [
            { text: "Less than 2%", score: 1 },
            { text: "2-5%", score: 3 },
            { text: "5-10%", score: 5 },
            { text: "10%+", score: 7 },
          ],
  },
  {
    id: 12,
    question:
      lang === "zh" ? "您有自动化报告吗？" : "Do you have automated reporting?",
    options:
      lang === "zh"
        ? [
            { text: "完全自动化", score: 1 },
            { text: "部分自动化", score: 3 },
            { text: "手动报告", score: 5 },
            { text: "没有报告", score: 7 },
          ]
        : [
            { text: "Fully automated", score: 1 },
            { text: "Partially automated", score: 3 },
            { text: "Manual reports", score: 5 },
            { text: "No reports", score: 7 },
          ],
  },
  {
    id: 13,
    question:
      lang === "zh"
        ? "您如何处理潜在客户筛选？"
        : "How do you handle lead qualification?",
    options:
      lang === "zh"
        ? [
            { text: "AI评分", score: 1 },
            { text: "基本自动化", score: 3 },
            { text: "手动审查", score: 5 },
            { text: "没有筛选", score: 7 },
          ]
        : [
            { text: "AI-powered scoring", score: 1 },
            { text: "Basic automation", score: 3 },
            { text: "Manual review", score: 5 },
            { text: "No qualification", score: 7 },
          ],
  },
  {
    id: 14,
    question:
      lang === "zh"
        ? "您的客户支持响应时间是？"
        : "What's your customer support response time?",
    options:
      lang === "zh"
        ? [
            { text: "1小时以内", score: 1 },
            { text: "1-4小时", score: 3 },
            { text: "4-24小时", score: 5 },
            { text: "24+小时", score: 7 },
          ]
        : [
            { text: "Under 1 hour", score: 1 },
            { text: "1-4 hours", score: 3 },
            { text: "4-24 hours", score: 5 },
            { text: "24+ hours", score: 7 },
          ],
  },
  {
    id: 15,
    question:
      lang === "zh"
        ? "您计划在未来12个月扩展吗？"
        : "Are you planning to scale in next 12 months?",
    options:
      lang === "zh"
        ? [
            { text: "已在扩展", score: 1 },
            { text: "计划扩展", score: 3 },
            { text: "考虑中", score: 5 },
            { text: "没有计划", score: 7 },
          ]
        : [
            { text: "Already scaling", score: 1 },
            { text: "Planning to scale", score: 3 },
            { text: "Considering", score: 5 },
            { text: "No plans", score: 7 },
          ],
  },
];

// 🔴 **FIXED TRANSLATION FUNCTION**
const t = (key, lang, replacements = {}) => {
  let text = translations[lang][key] || key;

  Object.keys(replacements).forEach((repKey) => {
    const placeholder = `{${repKey}}`;
    const regex = new RegExp(
      placeholder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "g"
    );
    text = text.replace(regex, replacements[repKey]);
  });

  return text;
};

// 🔴 **BUTTON COMPONENT**
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-mono font-semibold uppercase tracking-wide transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-offset-2 backdrop-blur-md",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-[#1E3A8A] via-[#0EA5E9] to-[#10B981] text-white hover:from-[#1E40AF] hover:via-[#0284C7] hover:to-[#059669] shadow-[0_20px_40px_rgba(30,58,138,0.3)] hover:shadow-[0_25px_50px_rgba(30,58,138,0.4)] px-8 py-4 min-h-[3rem] ring-[#1E3A8A]/30 transform hover:scale-105",
        secondary:
          "bg-white/10 text-white border border-white/30 backdrop-blur-xl hover:bg-white/20 hover:border-white/50 px-8 py-4 min-h-[3rem] ring-transparent",
        outline:
          "border-2 border-[#0EA5E9] text-[#0EA5E9] bg-transparent hover:bg-[#0EA5E9] hover:text-white px-8 py-4 min-h-[3rem]",
        toggle:
          "bg-white/10 text-white border border-white/30 backdrop-blur-xl hover:bg-white/20 hover:border-white/50 px-4 py-2 min-h-[2.5rem] ring-transparent text-sm",
        nav: "text-[#E2E8F0] hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all",
      },
      size: {
        lg: "h-14 px-10 text-lg",
        default: "h-12 px-6",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, children, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";

// 🔴 **CARD COMPONENT**
const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={cn(
      "bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl hover:border-[#0EA5E9]/30 transition-all duration-300 flex flex-col h-full",
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
  </motion.div>
));
Card.displayName = "Card";

// 🔴 **LANGUAGE TOGGLE**
const LanguageToggle = ({ lang, onToggle }) => (
  <Button variant="toggle" onClick={onToggle} className="ml-4">
    {lang === "en" ? "中文" : "English"}
  </Button>
);

// 🔴 **SCORE ANALYSIS**
const getScoreAnalysis = (score) => {
  if (score <= 35)
    return {
      level: "AI-Ready Leader",
      color: "#10B981",
      message:
        "Your operations are optimized! AI can enhance efficiency further.",
      quickWins: [
        "Predictive analytics",
        "Advanced automation",
        "Strategic AI insights",
      ],
      estimatedROI: "15-25% gains",
      timeline: "45-60 days",
    };
  if (score <= 70)
    return {
      level: "Prime for Transformation",
      color: "#0EA5E9",
      message: "You're doing well but AI can unlock 20-40% more capacity.",
      quickWins: [
        "Client onboarding automation",
        "Operations dashboard",
        "Smart lead qualification",
      ],
      estimatedROI: "30-50% gains",
      timeline: "60-90 days",
    };
  return {
    level: "High-Impact Opportunity",
    color: "#1E3A8A",
    message: "AI can reclaim 25+ hours weekly and unlock exponential growth.",
    quickWins: [
      "80% admin automation",
      "Eliminate data entry",
      "AI customer engagement",
    ],
    estimatedROI: "40-60% gains",
    timeline: "30-60 days",
  };
};

// 🔴 **MOBILE MENU**
const MobileMenu = ({ isOpen, onClose, onNavClick, lang }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed right-0 top-16 w-64 h-full bg-white/5 backdrop-blur-xl border-l border-white/10 z-40"
      >
        <div className="p-6 space-y-4">
          <Button
            variant="nav"
            onClick={() => {
              onNavClick("howItWorks");
              onClose();
            }}
            className="w-full justify-start"
          >
            {t("navHowItWorks", lang)}
          </Button>
          <Button
            variant="nav"
            onClick={() => {
              onNavClick("caseStudies");
              onClose();
            }}
            className="w-full justify-start"
          >
            {t("navCaseStudies", lang)}
          </Button>
          <Button
            variant="nav"
            onClick={() => {
              onNavClick("faq");
              onClose();
            }}
            className="w-full justify-start"
          >
            {t("navFAQ", lang)}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onNavClick("quiz");
              onClose();
            }}
            className="w-full"
          >
            {t("navStartQuiz", lang)}
          </Button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// 🔴 **QUIZ MODAL - FIXED**
const QuizModal = ({ isOpen, onClose, lang }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = quizQuestions(lang);
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isAnswered = answers[currentQ?.id] !== undefined;
  const totalScore = Object.values(answers).reduce(
    (sum, score) => sum + score,
    0
  );
  const analysis = getScoreAnalysis(totalScore);

  const handleAnswer = (questionId, score) =>
    setAnswers({ ...answers, [questionId]: score });
  const handleNext = () =>
    currentQuestion === questions.length - 1
      ? setShowContactForm(true)
      : setCurrentQuestion(currentQuestion + 1);
  const handlePrevious = () =>
    currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);
  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setShowResults(true);
    setIsSubmitting(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setShowContactForm(false);
    setFormData({ name: "", email: "", company: "" });
    onClose();
  };

  const questionText = t("quizQuestion", lang, {
    current: currentQuestion + 1,
    total: questions.length,
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-2xl"
              style={{
                background: "#1E293B",
                border: "1px solid #334155",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              }}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-2 hover:bg-[#334155]"
              >
                <X className="h-6 w-6 text-[#E2E8F0]" />
              </button>

              {showContactForm && !showResults ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 p-8"
                >
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#1E3A8A] to-[#10B981] bg-clip-text text-transparent">
                    {t("quizGetResults", lang)}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder={t("quizName", lang)}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all text-white placeholder-gray-400"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder={t("quizEmail", lang)}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all text-white placeholder-gray-400"
                    />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleFormChange}
                      placeholder={t("quizCompany", lang)}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all text-white placeholder-gray-400"
                    />
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => setShowContactForm(false)}
                      >
                        {t("quizBack", lang)}
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting
                          ? t("quizProcessing", lang)
                          : t("quizGetResults", lang)}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              ) : showResults ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center space-y-6"
                >
                  <CheckCircle2
                    className="w-16 h-16 mx-auto"
                    style={{ color: analysis.color }}
                  />
                  <h2 className="text-3xl font-bold text-white">
                    {t("quizYourScore", lang)}
                  </h2>
                  <div
                    className="text-6xl font-bold"
                    style={{ color: analysis.color }}
                  >
                    {totalScore}/225
                  </div>
                  <div
                    className="inline-flex px-6 py-3 rounded-full border border-[#475569]"
                    style={{ background: "#0F172A" }}
                  >
                    <span className="font-mono text-sm uppercase text-white">
                      {analysis.level}
                    </span>
                  </div>
                  <p className="text-xl max-w-2xl mx-auto text-[#E2E8F0]">
                    {analysis.message}
                  </p>
                  <Button onClick={resetQuiz}>{t("quizClose", lang)}</Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 space-y-8"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-mono text-gray-400">
                      <span>{questionText}</span>
                    </div>
                    <div className="w-full h-2 bg-[#334155] rounded-full">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#1E3A8A] via-[#0EA5E9] to-[#10B981] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {currentQ.question}
                  </h2>
                  <div className="space-y-3">
                    {currentQ.options.map((option, i) => (
                      <motion.button
                        key={i}
                        onClick={() => handleAnswer(currentQ.id, option.score)}
                        className={cn(
                          "w-full p-4 rounded-xl border-2 transition-all",
                          answers[currentQ.id] === option.score
                            ? "border-[#1E3A8A] bg-[#1E3A8A]/20"
                            : "border-[#334155] hover:border-[#0EA5E9]/50 hover:bg-[#0EA5E9]/10"
                        )}
                        whileHover={
                          answers[currentQ.id] === option.score
                            ? {}
                            : { scale: 1.02 }
                        }
                      >
                        <span
                          className={
                            answers[currentQ.id] === option.score
                              ? "text-[#1E3A8A]"
                              : "text-[#E2E8F0]"
                          }
                        >
                          {option.text}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {currentQuestion > 0 && (
                      <Button variant="outline" onClick={handlePrevious}>
                        {t("quizPrevious", lang)}
                      </Button>
                    )}
                    <Button
                      onClick={handleNext}
                      disabled={!isAnswered}
                      className="ml-auto"
                    >
                      {currentQuestion === questions.length - 1
                        ? t("quizFinish", lang)
                        : t("quizNext", lang)}
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// 🔴 **CASE STUDIES SECTION**
const CaseStudiesSection = ({ t }) => (
  <section
    id={SECTION_IDS.caseStudies}
    className="py-24 px-4 relative bg-gradient-to-b from-[#0F172A]/50 to-[#111827]/50"
  >
    <div className="max-w-7xl mx-auto">
      <motion.div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#0EA5E9] to-[#1E3A8A] bg-clip-text text-transparent">
          {t("caseStudiesTitle")}
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8">
        {t("caseStudies").map((study, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="group hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#1E3A8A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold">{study.image}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {study.title}
              </h3>
              <p className="text-[#E2E8F0] mb-4">{study.industry}</p>
              <div className="text-3xl font-bold text-[#10B981] mb-4">
                {study.result}
              </div>
              <Button variant="outline" size="default" className="mt-auto">
                View Case Study
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// 🔴 **HERO, PROBLEM, SOLUTION, HOW IT WORKS, PROOF, FAQ, CTA SECTIONS**
// (Same as before - keeping them unchanged for brevity)
const HeroSection = ({ onStartQuiz, t }) => (
  <section className="min-h-screen flex items-center justify-center text-center px-4 pt-32 pb-20 relative overflow-hidden">
    <div
      className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#111827]"
      style={{ backgroundSize: "400% 400%" }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(30,58,138,0.2),transparent_50%)]" />
    <div className="max-w-5xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-3 rounded-full px-6 py-3 mb-8 backdrop-blur-xl border border-white/20"
        style={{ background: "rgba(255,255,255,0.1)" }}
      >
        <Sparkles className="w-5 h-5 text-[#0EA5E9] animate-pulse" />
        <span className="text-white font-mono text-sm uppercase tracking-widest">
          {t("badge")}
        </span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
      >
        <span className="bg-gradient-to-r from-[#1E3A8A] via-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">
          {t("heroTitle1")}
        </span>
        <br />
        <span className="text-white">{t("heroTitle2")}</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl mb-12 max-w-4xl mx-auto text-[#E2E8F0]"
      >
        {t("heroDescription")}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button onClick={onStartQuiz} size="lg" className="mb-6">
          <span>{t("heroCTA")}</span>
          <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-sm text-[#CBD5E0] font-medium"
      >
        {t("heroSubtext")}
      </motion.p>
    </div>
  </section>
);

const ProblemSection = ({ t }) => {
  const painPoints = [
    {
      icon: Target,
      title: t("problems")[0].title,
      description: t("problems")[0].description,
      stats: t("problems")[0].stats,
      gradient: "from-[#1E3A8A] to-[#0EA5E9]",
    },
    {
      icon: Clock,
      title: t("problems")[1].title,
      description: t("problems")[1].description,
      stats: t("problems")[1].stats,
      gradient: "from-[#0EA5E9] to-[#F59E0B]",
    },
    {
      icon: TrendingUp,
      title: t("problems")[2].title,
      description: t("problems")[2].description,
      stats: t("problems")[2].stats,
      gradient: "from-[#10B981] to-[#059669]",
    },
    {
      icon: Users,
      title: t("problems")[3].title,
      description: t("problems")[3].description,
      stats: t("problems")[3].stats,
      gradient: "from-[#F59E0B] to-[#D97706]",
    },
  ];

  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-transparent to-[#0F172A]/30">
      <div className="max-w-7xl mx-auto relative">
        <motion.div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1E3A8A] to-[#10B981] bg-clip-text text-transparent">
            {t("problemTitle")}
          </h2>
          <p className="text-xl text-[#E2E8F0] max-w-4xl mx-auto">
            {t("problemSubtitle")}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group cursor-pointer hover:-translate-y-2">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${point.gradient})`,
                    boxShadow: `0 10px 25px ${point.gradient.split("to-")[1]}30`,
                  }}
                >
                  <point.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {point.title}
                </h3>
                <p className="text-[#E2E8F0] mb-6">{point.description}</p>
                <p className="text-sm font-mono text-[#10B981]">
                  {point.stats}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionSection = ({ t }) => {
  const solutions = [
    {
      title: t("solutions")[0].title,
      description: t("solutions")[0].description,
      icon: Zap,
      features: t("solutions")[0].features,
      gradient: "from-[#1E3A8A] to-[#0EA5E9]",
    },
    {
      title: t("solutions")[1].title,
      description: t("solutions")[1].description,
      icon: BarChart3,
      features: t("solutions")[1].features,
      gradient: "from-[#0EA5E9] to-[#F59E0B]",
    },
    {
      title: t("solutions")[2].title,
      description: t("solutions")[2].description,
      icon: TrendingUp,
      features: t("solutions")[2].features,
      gradient: "from-[#10B981] to-[#059669]",
    },
  ];

  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-[#0F172A]/50 to-[#111827]/50">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#10B981] to-[#1E3A8A] bg-clip-text text-transparent">
            {t("solutionTitle")}
          </h2>
          <p className="text-xl text-[#E2E8F0] max-w-4xl mx-auto">
            {t("solutionSubtitle")}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((sol, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${sol.gradient})`,
                  }}
                >
                  <sol.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {sol.title}
                </h3>
                <p className="text-[#E2E8F0] mb-6">{sol.description}</p>
                <ul className="space-y-3">
                  {sol.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-3 text-[#E2E8F0]"
                    >
                      <CheckCircle className="w-5 h-5 text-[#10B981]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = ({ t }) => {
  const phases = [
    {
      step: t("phases")[0].step,
      description: t("phases")[0].description,
      icon: Play,
      details: t("phases")[0].details,
      duration: t("phases")[0].duration,
    },
    {
      step: t("phases")[1].step,
      description: t("phases")[1].description,
      icon: Zap,
      details: t("phases")[1].details,
      duration: t("phases")[1].duration,
    },
    {
      step: t("phases")[2].step,
      description: t("phases")[2].description,
      icon: TrendingUp,
      details: t("phases")[2].details,
      duration: t("phases")[2].duration,
    },
  ];

  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="py-24 px-4 relative bg-gradient-to-b from-transparent to-[#0F172A]/30"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1E3A8A] to-[#10B981] bg-clip-text text-transparent">
            {t("howItWorksTitle")}
          </h2>
          <p className="text-xl text-[#E2E8F0]">{t("howItWorksSubtitle")}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="relative pt-16">
                <div className="absolute -top-8 left-8 w-16 h-16 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#10B981] flex items-center justify-center shadow-lg">
                  <phase.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {phase.step}
                </h3>
                <p className="text-[#E2E8F0] mb-6">{phase.description}</p>
                <ul className="space-y-2 mb-6">
                  {phase.details.map((d, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-[#10B981]"
                    >
                      <CheckCircle className="w-4 h-4 text-[#059669]" />
                      {d}
                    </li>
                  ))}
                </ul>
                <span className="text-right inline-block text-[#10B981] font-medium">
                  {phase.duration}
                </span>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProofSection = ({ t }) => {
  const testimonials = [
    {
      name: t("testimonials")[0].name,
      company: t("testimonials")[0].company,
      quote: t("testimonials")[0].quote,
      avatar: t("testimonials")[0].avatar,
    },
    {
      name: t("testimonials")[1].name,
      company: t("testimonials")[1].company,
      quote: t("testimonials")[1].quote,
      avatar: t("testimonials")[1].avatar,
    },
    {
      name: t("testimonials")[2].name,
      company: t("testimonials")[2].company,
      quote: t("testimonials")[2].quote,
      avatar: t("testimonials")[2].avatar,
    },
  ];

  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-[#0F172A]/50 to-[#111827]/50">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#0EA5E9] to-[#1E3A8A] bg-clip-text text-transparent">
            {t("proofTitle")}
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {t("stats").map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20"
            >
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-[#0EA5E9]" />
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-[#E2E8F0]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#1E3A8A] flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-400">{testimonial.company}</div>
                  </div>
                </div>
                <p className="text-[#E2E8F0] italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex gap-1 mb-4">
                  {Array(5)
                    .fill()
                    .map((_, j) => (
                      <CheckCircle key={j} className="w-5 h-5 text-[#F59E0B]" />
                    ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FaqSection = ({ t }) => (
  <section
    id={SECTION_IDS.faq}
    className="py-24 px-4 relative bg-gradient-to-b from-transparent to-[#0F172A]/20"
  >
    <div className="max-w-4xl mx-auto">
      <motion.div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#10B981] to-[#1E3A8A] bg-clip-text text-transparent">
          {t("faqTitle")}
        </h2>
      </motion.div>
      <div className="space-y-4">
        {t("faqs").map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: "auto" }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="cursor-pointer group">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{faq.q}</h3>
                <ChevronDown className="w-6 h-6 text-[#0EA5E9] group-hover:rotate-180 transition-transform" />
              </div>
              <p className="mt-4 text-[#E2E8F0]">{faq.a}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CtaSection = ({ onStartQuiz, t }) => (
  <section className="py-24 px-4 text-center relative">
    <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/20 to-[#111827]/20" />
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto relative z-10 bg-white/10 backdrop-blur-2xl rounded-2xl p-12 border border-white/20"
    >
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#1E3A8A] to-[#10B981] bg-clip-text text-transparent">
        {t("ctaTitle")}
      </h2>
      <p className="text-xl mb-8 text-[#E2E8F0]">{t("ctaDescription")}</p>
      <Button onClick={onStartQuiz} size="lg" className="mb-8">
        {t("ctaButton")}
        <ArrowRight className="w-5 h-5 ml-3" />
      </Button>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="p-4">
          <div className="text-2xl font-bold text-white">{t("ctaQuick")}</div>
          <div className="text-[#CBD5E0]">Quick quiz</div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-white">{t("ctaFree")}</div>
          <div className="text-[#CBD5E0]">No card needed</div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-white">{t("ctaInstant")}</div>
          <div className="text-[#CBD5E0]">Results</div>
        </div>
      </div>
    </motion.div>
  </section>
);

const Footer = ({ t }) => (
  <footer className="py-12 px-4 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#111827] text-white border-t border-white/10">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
      <div>
        <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#1E3A8A] to-[#10B981] bg-clip-text text-transparent">
          {t("footerTitle")}
        </div>
        <p className="text-[#E2E8F0] mb-6">{t("footerDescription")}</p>
        <div className="flex space-x-4">
          <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#1E3A8A]/20 hover:to-[#10B981]/20">
            <Twitter className="w-5 h-5" />
          </a>
          <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#1E3A8A]/20 hover:to-[#10B981]/20">
            <Linkedin className="w-5 h-5" />
          </a>
          <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#1E3A8A]/20 hover:to-[#10B981]/20">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-4 text-white">Services</h3>
        <ul className="space-y-2 text-[#E2E8F0] text-sm">
          {t("services").map((service, i) => (
            <li key={i}>
              <a className="hover:text-[#0EA5E9] transition-colors">
                {service}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-4 text-white">Company</h3>
        <ul className="space-y-2 text-[#E2E8F0] text-sm">
          {t("company").map((item, i) => (
            <li key={i}>
              <a className="hover:text-[#0EA5E9] transition-colors">{item}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-4 text-white">Contact</h3>
        <div className="space-y-2 text-[#E2E8F0] text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> {t("contactPhone")}
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> {t("contactEmail")}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {t("contactAddress")}
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-[#CBD5E0]">
      {t("copyright")}
    </div>
  </footer>
);

// 🔴 **COMPLETE LANDING PAGE WITH FULL NAVIGATION**
const LandingPage = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState("en");

  const translate = (key, replacements = {}) => t(key, lang, replacements);

  // 🔴 **SMOOTH SCROLL FUNCTION**
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavClick = (section) => {
    if (section === "quiz") {
      setIsQuizOpen(true);
    } else {
      scrollToSection(SECTION_IDS[section]);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans bg-[#0F172A]">
      {/* HEADER WITH FULL NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
          <div className="font-mono text-2xl font-bold bg-gradient-to-r from-[#1E3A8A] to-[#10B981] bg-clip-text text-transparent">
            SING SINGH
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Button variant="nav" onClick={() => handleNavClick("howItWorks")}>
              {translate("navHowItWorks")}
            </Button>
            <Button variant="nav" onClick={() => handleNavClick("caseStudies")}>
              {translate("navCaseStudies")}
            </Button>
            <Button variant="nav" onClick={() => handleNavClick("faq")}>
              {translate("navFAQ")}
            </Button>
            <Button variant="primary" onClick={() => handleNavClick("quiz")}>
              {translate("navStartQuiz")}
            </Button>
            <LanguageToggle
              lang={lang}
              onToggle={() => setLang(lang === "en" ? "zh" : "en")}
            />
          </nav>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavClick={handleNavClick}
        lang={lang}
      />

      <main>
        <HeroSection onStartQuiz={() => setIsQuizOpen(true)} t={translate} />
        <ProblemSection t={translate} />
        <SolutionSection t={translate} />
        <HowItWorksSection t={translate} />
        <CaseStudiesSection t={translate} />
        <ProofSection t={translate} />
        <FaqSection t={translate} />
        <CtaSection onStartQuiz={() => setIsQuizOpen(true)} t={translate} />
      </main>

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        lang={lang}
      />
      <Footer t={translate} />
    </div>
  );
};

export default LandingPage;
