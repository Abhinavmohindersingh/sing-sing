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
  AlertTriangle,
  DollarSign,
  TrendingDown,
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

    // Real Industry Use Cases
    caseStudiesTitle: "AI Solutions for Every Industry",
    caseStudiesSubtitle:
      "See how businesses like yours solve real problems with AI automation",
    useCases: [
      {
        industry: "Accounting & Finance",
        challenge:
          "Manual trust accounting, receipt processing, cross-account reconciliation taking days",
        solution:
          "AI agents automate receipt OCR, categorization, account movements, and documentation",
        processes: [
          "Automated receipt scanning & data extraction",
          "Smart account reconciliation",
          "Real-time trust accounting updates",
          "Instant document generation",
        ],
        metrics: {
          primary: "95%",
          secondary: "3 days → 2 hours",
          label: "Manual Work Eliminated",
        },
      },
      {
        industry: "Professional Services",
        challenge: "Client onboarding taking 2+ weeks per account",
        solution:
          "AI agents automate document collection, compliance verification, and kickoff coordination",
        processes: [
          "Automated document requests",
          "Smart compliance checking",
          "Instant kickoff scheduling",
        ],
        metrics: {
          primary: "2 days",
          secondary: "5x capacity",
          label: "Onboarding Time",
        },
      },
      {
        industry: "E-commerce & Retail",
        challenge: "Customer inquiries waiting 24+ hours, losing sales",
        solution:
          "24/7 AI support handling FAQs, order tracking, returns instantly",
        processes: [
          "Instant inquiry responses",
          "Intelligent product matching",
          "Automated order updates",
        ],
        metrics: {
          primary: "<1 min",
          secondary: "+40% conversions",
          label: "Response Time",
        },
      },
      {
        industry: "Healthcare & Wellness",
        challenge: "Appointment chaos, frequent no-shows, admin overload",
        solution:
          "Smart scheduling AI with automated reminders and rescheduling",
        processes: [
          "Intelligent scheduling optimization",
          "Automated reminder sequences",
          "Self-service rescheduling",
        ],
        metrics: {
          primary: "60%",
          secondary: "70% time saved",
          label: "No-Show Reduction",
        },
      },
      {
        industry: "Real Estate",
        challenge: "Lead qualification eating up agent time, low conversion",
        solution:
          "AI agents pre-qualify leads, schedule viewings, follow up automatically",
        processes: [
          "Instant lead qualification",
          "Automated viewing coordination",
          "Smart follow-up sequences",
        ],
        metrics: {
          primary: "3x",
          secondary: "80% admin reduction",
          label: "Lead Capacity",
        },
      },
      {
        industry: "Marketing Agencies",
        challenge:
          "Campaign tracking across platforms, manual client reporting",
        solution:
          "Multi-platform analytics aggregation with automated dashboards",
        processes: [
          "Cross-platform data sync",
          "Automated performance reports",
          "Predictive optimization",
        ],
        metrics: {
          primary: "90%",
          secondary: "Real-time insights",
          label: "Time Saved",
        },
      },
    ],

    // Proof Section
    proofTitle: "Real Results Across Industries",
    proofSubtitle: "Proven impact for businesses that choose AI automation",
    stats: [
      { value: "95%", label: "Avg. Efficiency Gain" },
      { value: "2-8 weeks", label: "Time to ROI" },
      { value: "6+", label: "Industries Served" },
      { value: "24/7", label: "System Uptime" },
    ],
    industryResults: [
      {
        industry: "Accounting",
        result: "Trust accounting automated end-to-end",
        impact: "95% manual work eliminated, real-time compliance",
      },
      {
        industry: "Professional Services",
        result: "Client onboarding in 2 days vs 2 weeks",
        impact: "5x capacity increase without new hires",
      },
      {
        industry: "E-commerce",
        result: "24/7 customer support, <1 min response",
        impact: "40% conversion lift, zero missed inquiries",
      },
      {
        industry: "Healthcare",
        result: "60% no-show reduction through smart scheduling",
        impact: "70% admin time saved, better patient flow",
      },
      {
        industry: "Real Estate",
        result: "3x lead capacity with AI qualification",
        impact: "80% admin reduction, agents focus on closing",
      },
      {
        industry: "Marketing",
        result: "Multi-platform analytics automated",
        impact: "90% reporting time saved, real-time insights",
      },
    ],

    // FAQ Section
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "How quickly can we see results?",
        a: "Most clients see improvements within 30 to 90 days. Quick wins first, full transformation follows.",
      },
      {
        q: "Will this disrupt operations?",
        a: "Zero disruption. Systems run in parallel during transition with full continuity.",
      },
      {
        q: "What industries do you serve?",
        a: "Professional services, real estate, marketing, consulting, healthcare, e-commerce, energy.",
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
    contactEmail: "hello@singsingh.com",
    contactAddress: "Brisbane, QLD",
    copyright: "© 2025 Sing Singh AI Advisory. All rights reserved.",

    // Quiz
    quizTitle: "AI Readiness Assessment",
    quizGetResults: "Get Your Results",
    quizCustomRoadmap: "Your Custom AI Roadmap",
    quizEnterDetails: "Enter your details to see your personalized results",
    quizName: "Full Name",
    quizEmail: "Email Address",
    quizMobile: "Mobile Number (Optional)",
    quizBookingInfo: "Book a 15-minute brief meeting via Zoom or Google Meet",

    quizCompany: "Company Name",
    quizBack: "Back",
    quizProcessing: "Processing...",
    quizSubmitResults: "Get My Results",
    quizYourScore: "Your AI Readiness Score",
    quizClose: "Close",
    quizQuestion: "Question {current} of {total}",
    quizPrevious: "Previous",
    quizNext: "Next",
    quizFinish: "Finish Quiz",
    quizBookCall: "Book Free Consultation",

    // Quiz Results
    quizResultsTitle:
      "Based on your answers, here's where AI can immediately improve your business",
    quizHoursWasted: "Hours Wasted/Week",
    quizAnnualSavings: "Annual Savings",
    quizROI: "ROI Year One",
    quizPayback: "Payback Period",
    quizTopFixes: "Your Top 3 Priority Fixes",
    quizPriority: "PRIORITY {number}: {severity}",
    quizWeeksToImplement: "{weeks} weeks to implement",
    quizCurrentState: "Your Current State",
    quizWastedPerWeek: "wasted per week",
    quizWithAI: "With AI Agent",
    quizAutomated: "automated",
    quizWhatGetsAutomated: "What Gets Automated",
    quizAnnualSavingsLabel: "Annual Savings",
    quizAICost: "AI Cost",
    quizROILabel: "ROI",
    quizMonthShort: "mo",
    quizHrsShort: "hrs",
    quizWeekShort: "week",
    quizTransformBusiness: "Ready to Transform Your Business?",
    quizScheduleCall:
      "Schedule a 15-minute strategy call to review your specific workflows and build your custom implementation plan.",
    quizTimeWasted: "Time Currently Wasted",

    // Severity levels
    severityCritical: "CRITICAL",
    severityHigh: "HIGH",
    severityMedium: "MEDIUM",
    severityLow: "LOW",
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
      "停止浪费时间处理手动混乱。星星人工智能 提供智能AI系统，自动化运营、解锁洞察、让您的业务增长3倍更快。",
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

    // Case Studies - Real Industry Use Cases
    caseStudiesTitle: "每个行业的AI解决方案",
    caseStudiesSubtitle: "看看像您这样的企业如何通过AI自动化解决实际问题",
    useCases: [
      {
        industry: "会计与金融",
        challenge: "手动信托会计、收据处理、跨账户对账需要数天时间",
        solution: "AI代理自动化收据OCR、分类、账户移动和文档",
        processes: [
          "自动收据扫描和数据提取",
          "智能账户对账",
          "实时信托会计更新",
          "即时文档生成",
        ],
        metrics: {
          primary: "95%",
          secondary: "3天→2小时",
          label: "消除手动工作",
        },
      },
      {
        industry: "专业服务",
        challenge: "每个账户的客户入职需要2周以上",
        solution: "AI代理自动化文档收集、合规验证和启动协调",
        processes: ["自动文档请求", "智能合规检查", "即时启动安排"],
        metrics: {
          primary: "2天",
          secondary: "5倍容量",
          label: "入职时间",
        },
      },
      {
        industry: "电子商务和零售",
        challenge: "客户咨询等待24小时以上，失去销售",
        solution: "24/7 AI支持即时处理常见问题、订单跟踪、退货",
        processes: ["即时查询响应", "智能产品匹配", "自动订单更新"],
        metrics: {
          primary: "<1分钟",
          secondary: "+40%转化",
          label: "响应时间",
        },
      },
      {
        industry: "医疗保健和健康",
        challenge: "预约混乱，频繁缺席，管理负担",
        solution: "智能调度AI，自动提醒和重新安排",
        processes: ["智能调度优化", "自动提醒序列", "自助重新安排"],
        metrics: {
          primary: "60%",
          secondary: "节省70%时间",
          label: "缺席减少",
        },
      },
      {
        industry: "房地产",
        challenge: "潜在客户资格占用代理时间，转化率低",
        solution: "AI代理预先筛选潜在客户，安排看房，自动跟进",
        processes: ["即时潜在客户资格", "自动看房协调", "智能跟进序列"],
        metrics: {
          primary: "3倍",
          secondary: "80%管理减少",
          label: "潜在客户容量",
        },
      },
      {
        industry: "营销机构",
        challenge: "跨平台活动跟踪，手动客户报告",
        solution: "多平台分析聚合与自动化仪表板",
        processes: ["跨平台数据同步", "自动绩效报告", "预测优化"],
        metrics: {
          primary: "90%",
          secondary: "实时洞察",
          label: "节省时间",
        },
      },
    ],

    // Proof Section
    proofTitle: "跨行业的真实成果",
    proofSubtitle: "选择AI自动化的企业的已验证影响",
    stats: [
      { value: "95%", label: "平均效率提升" },
      { value: "2-8周", label: "投资回报时间" },
      { value: "6+", label: "服务行业" },
      { value: "24/7", label: "系统正常运行时间" },
    ],
    industryResults: [
      {
        industry: "会计",
        result: "端到端自动化信托会计",
        impact: "消除95%手动工作，实时合规",
      },
      {
        industry: "专业服务",
        result: "2天客户入职 vs 2周",
        impact: "5倍容量增加，无需新招聘",
      },
      {
        industry: "电子商务",
        result: "24/7客户支持，<1分钟响应",
        impact: "40%转化提升，零错过咨询",
      },
      {
        industry: "医疗保健",
        result: "通过智能调度减少60%缺席",
        impact: "节省70%管理时间，更好的患者流程",
      },
      {
        industry: "房地产",
        result: "AI资格筛选3倍潜在客户容量",
        impact: "80%管理减少，代理专注于成交",
      },
      {
        industry: "营销",
        result: "多平台分析自动化",
        impact: "节省90%报告时间，实时洞察",
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
    footerDescription: "为雄心勃勃的公司提供AI驱动的业务转型",
    services: ["AI运营", "商业智能", "增长自动化"],
    company: ["关于", "职业", "博客"],
    
    contactEmail: "hello@singsingh.com",
    contactAddress: "布里斯班，昆士兰",
    copyright: "© 2025 Sing Singh AI Advisory。保留所有权利。",

    // Quiz
    quizTitle: "AI准备度评估",
    quizGetResults: "获取您的结果",
    quizCustomRoadmap: "您的定制AI路线图",
    quizEnterDetails: "输入您的详细信息以查看您的个性化结果",
    quizName: "全名",
    quizEmail: "电子邮件地址",
    quizCompany: "公司名称",
    quizBack: "返回",
    quizProcessing: "处理中...",
    quizSubmitResults: "获取我的结果",
    quizYourScore: "您的AI准备度评分",
    quizClose: "关闭",
    quizQuestion: "第{current}题，共{total}题",
    quizPrevious: "上一步",
    quizNext: "下一步",
    quizFinish: "完成测试",
    quizBookCall: "预订免费咨询",

    // Quiz Results
    quizResultsTitle: "根据您的答案，这些是AI可以立即改善您业务的地方",
    quizHoursWasted: "每周浪费小时数",
    quizAnnualSavings: "年度节省",
    quizMobile: "手机号码（可选）",
    quizBookingInfo: "通过 Zoom 或 Google Meet 预订 15 分钟简短会议",
    quizROI: "第一年投资回报率",
    quizPayback: "回本期",
    quizTopFixes: "您的前3个优先修复项",
    quizPriority: "优先级{number}：{severity}",
    quizWeeksToImplement: "{weeks}周实施",
    quizCurrentState: "您当前的状态",
    quizWastedPerWeek: "每周浪费",
    quizWithAI: "使用AI代理",
    quizAutomated: "自动化",
    quizWhatGetsAutomated: "自动化内容",
    quizAnnualSavingsLabel: "年度节省",
    quizAICost: "AI成本",
    quizROILabel: "投资回报率",
    quizMonthShort: "月",
    quizHrsShort: "小时",
    quizWeekShort: "周",
    quizTransformBusiness: "准备好转型您的业务了吗？",
    quizScheduleCall:
      "安排15分钟策略电话，审查您的具体工作流程并构建您的定制实施计划。",
    quizTimeWasted: "当前浪费的时间",

    // Severity levels
    severityCritical: "紧急",
    severityHigh: "高",
    severityMedium: "中",
    severityLow: "低",
  },
};

// 🔴 **SECTION IDS FOR NAVIGATION**
const SECTION_IDS = {
  howItWorks: "how-it-works",
  caseStudies: "case-studies",
  faq: "faq",
};

// 🔴 **AI SOLUTIONS DATABASE**
const AI_SOLUTIONS = {
  DATA_ENTRY: {
    name: "Intelligent Data Processing Agent",
    solves: "Manual data entry, receipt scanning, document processing",
    features: [
      "OCR receipt/invoice extraction",
      "Auto-categorization with ML",
      "Duplicate detection",
      "Real-time data validation",
    ],
    timeSaved: "90-95% reduction",
    hoursPerWeek: 32,
    implementation: "2 weeks",
    cost: 500,
    priority: 1,
  },

  RECONCILIATION: {
    name: "Smart Reconciliation Agent",
    solves: "Time-consuming bank reconciliation, account matching",
    features: [
      "Automated transaction matching",
      "Cross-account reconciliation",
      "Discrepancy flagging",
      "Audit trail generation",
    ],
    timeSaved: "3 days → 2 hours",
    hoursPerWeek: 28,
    implementation: "3 weeks",
    cost: 600,
    priority: 2,
  },

  CUSTOMER_SUPPORT: {
    name: "24/7 Customer Service Agent",
    solves: "Slow response times, missed inquiries, after-hours support",
    features: [
      "Instant response to common questions",
      "Ticket creation & routing",
      "Order status lookup",
      "Escalation to humans when needed",
    ],
    timeSaved: "80% inquiries automated",
    hoursPerWeek: 20,
    implementation: "3 weeks",
    cost: 800,
    priority: 3,
  },

  TRUST_ACCOUNTING: {
    name: "Trust Account Management Agent",
    solves: "Manual trust accounting, compliance tracking",
    features: [
      "Real-time balance monitoring",
      "IOLTA compliance checks",
      "Client statement generation",
      "Movement tracking & alerts",
    ],
    timeSaved: "90% automated",
    hoursPerWeek: 25,
    implementation: "4 weeks",
    cost: 700,
    priority: 2,
  },

  SCHEDULING: {
    name: "Intelligent Scheduling Agent",
    solves: "Calendar chaos, no-shows, manual booking",
    features: [
      "Smart availability matching",
      "Automated reminders (SMS/Email)",
      "Self-service rescheduling",
      "No-show prediction & prevention",
    ],
    timeSaved: "60% no-show reduction",
    hoursPerWeek: 15,
    implementation: "2 weeks",
    cost: 400,
    priority: 4,
  },

  REPORTING: {
    name: "Automated Reporting Agent",
    solves: "Manual report compilation, data aggregation",
    features: [
      "Real-time dashboard updates",
      "Multi-source data aggregation",
      "Custom report generation",
      "Scheduled delivery",
    ],
    timeSaved: "90% faster",
    hoursPerWeek: 12,
    implementation: "3 weeks",
    cost: 500,
    priority: 5,
  },

  LEAD_QUALIFICATION: {
    name: "Lead Intelligence Agent",
    solves: "Time wasted on unqualified leads, slow follow-up",
    features: [
      "Auto lead scoring & qualification",
      "Instant follow-up sequences",
      "Meeting scheduling",
      "CRM auto-updates",
    ],
    timeSaved: "3x more leads handled",
    hoursPerWeek: 18,
    implementation: "2 weeks",
    cost: 600,
    priority: 3,
  },

  DOCUMENT_MANAGEMENT: {
    name: "Document Intelligence Agent",
    solves: "Manual filing, document search, compliance docs",
    features: [
      "Auto-filing by category",
      "Smart search & retrieval",
      "Version control",
      "Compliance tracking",
    ],
    timeSaved: "70% faster retrieval",
    hoursPerWeek: 10,
    implementation: "3 weeks",
    cost: 450,
    priority: 5,
  },
};

// 🔴 **SMART QUIZ QUESTIONS WITH CATEGORIES - BILINGUAL**
const getSmartQuizQuestions = (lang = "en") => {
  if (lang === "zh") {
    return [
      {
        id: 1,
        category: "DATA_ENTRY",
        question: "您的团队每周花多少时间进行手动数据输入？",
        options: [
          { text: "少于5小时", score: 1, hours: 3 },
          { text: "5-15小时", score: 3, hours: 10 },
          { text: "15-30小时", score: 5, hours: 22 },
          { text: "超过30小时", score: 7, hours: 35 },
        ],
      },
      {
        id: 2,
        category: "DATA_ENTRY",
        question: "您目前如何处理收据和发票？",
        options: [
          { text: "完全自动化OCR系统", score: 1, hours: 1 },
          { text: "自动化和手动混合", score: 3, hours: 8 },
          { text: "主要手动输入", score: 5, hours: 15 },
          { text: "100%手动，经常延迟", score: 7, hours: 20 },
        ],
      },
      {
        id: 3,
        category: "RECONCILIATION",
        question: "账户对账需要多长时间？",
        options: [
          { text: "当天（自动化）", score: 1, hours: 2 },
          { text: "1-2天", score: 3, hours: 12 },
          { text: "3-5天", score: 5, hours: 24 },
          { text: "超过一周", score: 7, hours: 40 },
        ],
      },
      {
        id: 4,
        category: "RECONCILIATION",
        question: "您在对账中发现差异的频率如何？",
        options: [
          { text: "很少（系统捕获）", score: 1, hours: 1 },
          { text: "偶尔（每月）", score: 3, hours: 4 },
          { text: "频繁（每周）", score: 5, hours: 8 },
          { text: "不断（每天）", score: 7, hours: 12 },
        ],
      },
      {
        id: 5,
        category: "CUSTOMER_SUPPORT",
        question: "您的平均客户响应时间是多少？",
        options: [
          { text: "1小时以内", score: 1, hours: 5 },
          { text: "1-4小时", score: 3, hours: 10 },
          { text: "4-24小时", score: 5, hours: 20 },
          { text: "超过24小时", score: 7, hours: 30 },
        ],
      },
      {
        id: 6,
        category: "CUSTOMER_SUPPORT",
        question: "下班后有多少客户咨询未得到答复？",
        options: [
          { text: "无（24/7覆盖）", score: 1, hours: 0 },
          { text: "少数（第二天处理）", score: 3, hours: 5 },
          { text: "许多（造成挫败感）", score: 5, hours: 12 },
          { text: "大多数（失去业务）", score: 7, hours: 20 },
        ],
      },
      {
        id: 7,
        category: "TRUST_ACCOUNTING",
        question: "您如何管理信托账户？（如果不适用请跳过）",
        options: [
          { text: "带警报的自动化系统", score: 1, hours: 2 },
          { text: "软件加手动检查", score: 3, hours: 10 },
          { text: "电子表格和手动跟踪", score: 5, hours: 20 },
          { text: "完全手动，合规问题", score: 7, hours: 30 },
        ],
      },
      {
        id: 8,
        category: "SCHEDULING",
        question: "您的预约缺席率是多少？",
        options: [
          { text: "低于5%", score: 1, hours: 2 },
          { text: "5-15%", score: 3, hours: 5 },
          { text: "15-30%", score: 5, hours: 10 },
          { text: "超过30%", score: 7, hours: 15 },
        ],
      },
      {
        id: 9,
        category: "SCHEDULING",
        question: "预约协调需要多少时间？",
        options: [
          { text: "自动化（1-2小时/周）", score: 1, hours: 1.5 },
          { text: "半自动化（5-10小时）", score: 3, hours: 7.5 },
          { text: "主要手动（10-20小时）", score: 5, hours: 15 },
          { text: "完全手动（20+小时）", score: 7, hours: 25 },
        ],
      },
      {
        id: 10,
        category: "REPORTING",
        question: "生成业务报告需要多长时间？",
        options: [
          { text: "实时（自动化仪表板）", score: 1, hours: 1 },
          { text: "几小时（半自动化）", score: 3, hours: 4 },
          { text: "1-2天（手动编译）", score: 5, hours: 12 },
          { text: "一周以上（复杂手动流程）", score: 7, hours: 20 },
        ],
      },
      {
        id: 11,
        category: "LEAD_QUALIFICATION",
        question: "您如何处理潜在客户资格筛选？",
        options: [
          { text: "自动评分系统", score: 1, hours: 3 },
          { text: "基本CRM加手动审核", score: 3, hours: 8 },
          { text: "电子表格和直觉判断", score: 5, hours: 15 },
          { text: "完全手动，不一致", score: 7, hours: 25 },
        ],
      },
      {
        id: 12,
        category: "LEAD_QUALIFICATION",
        question: "有多少百分比的潜在客户从未得到跟进？",
        options: [
          { text: "少于5%（自动跟进）", score: 1, hours: 2 },
          { text: "5-15%", score: 3, hours: 5 },
          { text: "15-30%", score: 5, hours: 10 },
          { text: "超过30%", score: 7, hours: 15 },
        ],
      },
      {
        id: 13,
        category: "DOCUMENT_MANAGEMENT",
        question: "找到特定文档需要多长时间？",
        options: [
          { text: "几秒钟（智能搜索）", score: 1, hours: 1 },
          { text: "几分钟（有组织的文件夹）", score: 3, hours: 3 },
          { text: "10-30分钟（搜索中）", score: 5, hours: 8 },
          { text: "几小时或找不到", score: 7, hours: 15 },
        ],
      },
      {
        id: 14,
        category: "REPORTING",
        question: "您的业务预测准确性如何？",
        options: [
          { text: "95%+（AI驱动）", score: 1, hours: 2 },
          { text: "80-94%（数据驱动）", score: 3, hours: 5 },
          { text: "60-79%（基于电子表格）", score: 5, hours: 10 },
          { text: "低于60%（猜测）", score: 7, hours: 15 },
        ],
      },
      {
        id: 15,
        category: "DOCUMENT_MANAGEMENT",
        question: "您如何确保合规文档？",
        options: [
          { text: "自动跟踪和警报", score: 1, hours: 2 },
          { text: "定期手动审核", score: 3, hours: 6 },
          { text: "临时检查", score: 5, hours: 12 },
          { text: "被动（仅在需要时）", score: 7, hours: 20 },
        ],
      },
    ];
  }

  // English questions
  return [
    {
      id: 1,
      category: "DATA_ENTRY",
      question:
        "How much time does your team spend on manual data entry each week?",
      options: [
        { text: "Less than 5 hours", score: 1, hours: 3 },
        { text: "5-15 hours", score: 3, hours: 10 },
        { text: "15-30 hours", score: 5, hours: 22 },
        { text: "More than 30 hours", score: 7, hours: 35 },
      ],
    },
    {
      id: 2,
      category: "DATA_ENTRY",
      question: "How do you currently process receipts and invoices?",
      options: [
        { text: "Fully automated OCR system", score: 1, hours: 1 },
        { text: "Mix of automation and manual", score: 3, hours: 8 },
        { text: "Mostly manual entry", score: 5, hours: 15 },
        { text: "100% manual, often delayed", score: 7, hours: 20 },
      ],
    },
    {
      id: 3,
      category: "RECONCILIATION",
      question: "How long does account reconciliation take?",
      options: [
        { text: "Same day (automated)", score: 1, hours: 2 },
        { text: "1-2 days", score: 3, hours: 12 },
        { text: "3-5 days", score: 5, hours: 24 },
        { text: "More than a week", score: 7, hours: 40 },
      ],
    },
    {
      id: 4,
      category: "RECONCILIATION",
      question: "How often do you find discrepancies in reconciliation?",
      options: [
        { text: "Rarely (system catches them)", score: 1, hours: 1 },
        { text: "Occasionally (monthly)", score: 3, hours: 4 },
        { text: "Frequently (weekly)", score: 5, hours: 8 },
        { text: "Constantly (daily)", score: 7, hours: 12 },
      ],
    },
    {
      id: 5,
      category: "CUSTOMER_SUPPORT",
      question: "What's your average customer response time?",
      options: [
        { text: "Under 1 hour", score: 1, hours: 5 },
        { text: "1-4 hours", score: 3, hours: 10 },
        { text: "4-24 hours", score: 5, hours: 20 },
        { text: "More than 24 hours", score: 7, hours: 30 },
      ],
    },
    {
      id: 6,
      category: "CUSTOMER_SUPPORT",
      question: "How many customer inquiries go unanswered after hours?",
      options: [
        { text: "None (24/7 coverage)", score: 1, hours: 0 },
        { text: "Few (handled next day)", score: 3, hours: 5 },
        { text: "Many (causing frustration)", score: 5, hours: 12 },
        { text: "Most (losing business)", score: 7, hours: 20 },
      ],
    },
    {
      id: 7,
      category: "TRUST_ACCOUNTING",
      question: "How do you manage trust accounts? (Skip if N/A)",
      options: [
        { text: "Automated system with alerts", score: 1, hours: 2 },
        { text: "Software with manual checks", score: 3, hours: 10 },
        { text: "Spreadsheets and manual tracking", score: 5, hours: 20 },
        { text: "Fully manual, compliance concerns", score: 7, hours: 30 },
      ],
    },
    {
      id: 8,
      category: "SCHEDULING",
      question: "What's your appointment no-show rate?",
      options: [
        { text: "Under 5%", score: 1, hours: 2 },
        { text: "5-15%", score: 3, hours: 5 },
        { text: "15-30%", score: 5, hours: 10 },
        { text: "More than 30%", score: 7, hours: 15 },
      ],
    },
    {
      id: 9,
      category: "SCHEDULING",
      question: "How much time goes into appointment coordination?",
      options: [
        { text: "Automated (1-2 hours/week)", score: 1, hours: 1.5 },
        { text: "Semi-automated (5-10 hours)", score: 3, hours: 7.5 },
        { text: "Mostly manual (10-20 hours)", score: 5, hours: 15 },
        { text: "Fully manual (20+ hours)", score: 7, hours: 25 },
      ],
    },
    {
      id: 10,
      category: "REPORTING",
      question: "How long does it take to generate business reports?",
      options: [
        { text: "Real-time (automated dashboards)", score: 1, hours: 1 },
        { text: "Few hours (semi-automated)", score: 3, hours: 4 },
        { text: "1-2 days (manual compilation)", score: 5, hours: 12 },
        { text: "Week+ (complex manual process)", score: 7, hours: 20 },
      ],
    },
    {
      id: 11,
      category: "LEAD_QUALIFICATION",
      question: "How do you handle lead qualification?",
      options: [
        { text: "Automated scoring system", score: 1, hours: 3 },
        { text: "Basic CRM with manual review", score: 3, hours: 8 },
        { text: "Spreadsheets and gut feeling", score: 5, hours: 15 },
        { text: "Fully manual, inconsistent", score: 7, hours: 25 },
      ],
    },
    {
      id: 12,
      category: "LEAD_QUALIFICATION",
      question: "What percentage of leads never get followed up?",
      options: [
        { text: "Less than 5% (automated follow-up)", score: 1, hours: 2 },
        { text: "5-15%", score: 3, hours: 5 },
        { text: "15-30%", score: 5, hours: 10 },
        { text: "More than 30%", score: 7, hours: 15 },
      ],
    },
    {
      id: 13,
      category: "DOCUMENT_MANAGEMENT",
      question: "How long to find a specific document?",
      options: [
        { text: "Seconds (smart search)", score: 1, hours: 1 },
        { text: "Few minutes (organized folders)", score: 3, hours: 3 },
        { text: "10-30 minutes (searching)", score: 5, hours: 8 },
        { text: "Hours or can't find it", score: 7, hours: 15 },
      ],
    },
    {
      id: 14,
      category: "REPORTING",
      question: "How accurate is your business forecasting?",
      options: [
        { text: "95%+ (AI-powered)", score: 1, hours: 2 },
        { text: "80-94% (data-driven)", score: 3, hours: 5 },
        { text: "60-79% (spreadsheet-based)", score: 5, hours: 10 },
        { text: "Less than 60% (guesswork)", score: 7, hours: 15 },
      ],
    },
    {
      id: 15,
      category: "DOCUMENT_MANAGEMENT",
      question: "How do you ensure compliance documentation?",
      options: [
        { text: "Automated tracking and alerts", score: 1, hours: 2 },
        { text: "Scheduled manual reviews", score: 3, hours: 6 },
        { text: "Ad-hoc checks", score: 5, hours: 12 },
        { text: "Reactive (only when needed)", score: 7, hours: 20 },
      ],
    },
  ];
};

// Keep the old constant for backward compatibility
const smartQuizQuestions = getSmartQuizQuestions("en");

// 🔴 **GAP ANALYSIS FUNCTION**
function analyzeGaps(answers) {
  const categoryScores = {};
  const hoursWasted = {};

  Object.keys(AI_SOLUTIONS).forEach((category) => {
    categoryScores[category] = 0;
    hoursWasted[category] = 0;
  });

  answers.forEach((answer, index) => {
    const question = smartQuizQuestions[index];
    if (!question) return;

    const category = question.category;
    const selectedOption = question.options[answer];

    if (selectedOption) {
      categoryScores[category] += selectedOption.score;
      hoursWasted[category] += selectedOption.hours;
    }
  });

  const gaps = Object.entries(categoryScores)
    .map(([category, score]) => ({
      category,
      score,
      hoursWasted: hoursWasted[category],
      solution: AI_SOLUTIONS[category],
      severity:
        score > 18
          ? "CRITICAL"
          : score > 12
            ? "HIGH"
            : score > 6
              ? "MEDIUM"
              : "LOW",
    }))
    .filter((gap) => gap.score > 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const totalHoursWasted = Object.values(hoursWasted).reduce(
    (sum, hours) => sum + hours,
    0,
  );
  const totalScore = Object.values(categoryScores).reduce(
    (sum, score) => sum + score,
    0,
  );
  const totalMonthlyCost = gaps.reduce(
    (sum, gap) => sum + gap.solution.cost,
    0,
  );
  const totalHoursSaved = gaps.reduce(
    (sum, gap) => sum + gap.solution.hoursPerWeek,
    0,
  );

  return {
    gaps,
    totalHoursWasted,
    totalScore,
    totalMonthlyCost,
    totalHoursSaved,
    overallSeverity:
      totalScore > 60
        ? "CRITICAL"
        : totalScore > 40
          ? "HIGH"
          : totalScore > 20
            ? "MEDIUM"
            : "LOW",
  };
}

// 🔴 **FIXED TRANSLATION FUNCTION**
const t = (key, lang = "en", replacements = {}) => {
  // Ensure valid language
  const validLang = lang === "zh" ? "zh" : "en";

  // Split key for nested access (e.g., 'Hero Section.heroTitle1' -> ['Hero Section', 'heroTitle1'])
  const keyParts = key.split(".");
  let result = translations[validLang];

  // Navigate nested structure safely
  for (const part of keyParts) {
    if (result && typeof result === "object" && part in result) {
      result = result[part];
    } else {
      // Fallback to English if Chinese missing
      result = translations.en;
      for (const englishPart of keyParts) {
        if (result && typeof result === "object" && englishPart in result) {
          result = result[englishPart];
        } else {
          break;
        }
      }
      // If still missing, return the key as string for debugging
      if (result === undefined || result === null) {
        console.warn(
          `Missing translation: ${key} for ${validLang} (using: ${key})`,
        );
        return key; // Shows key instead of undefined
      }
      break;
    }
  }

  // If result is undefined, return key
  if (result === undefined || result === null) {
    console.warn(`Translation not found: ${key} for ${validLang}`);
    return key;
  }

  // If result is an array or object (not a string), return it as-is
  if (
    Array.isArray(result) ||
    (typeof result === "object" && result !== null)
  ) {
    return result;
  }

  // If result is a string, do placeholder replacement
  if (typeof result === "string") {
    Object.keys(replacements).forEach((repKey) => {
      const placeholder = `{${repKey}}`;
      const regex = new RegExp(
        placeholder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "g",
      );
      result = result.replace(regex, replacements[repKey]);
    });
  }

  return result;
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
  },
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
  ),
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
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
  </motion.div>
));
Card.displayName = "Card";

// 🔴 **LANGUAGE TOGGLE**
const LanguageToggle = ({ lang, onToggle }) => {
  const toggleLanguage = () => {
    const newLang = lang === "en" ? "zh" : "en";
    console.log("Switching language to:", newLang); // Debug log
    onToggle(newLang); // This should be setLang(newLang)
  };

  return (
    <Button
      variant="toggle"
      onClick={toggleLanguage} // Fixed: proper toggle handler
      className="ml-4"
    >
      {lang === "en" ? "中文" : "English"} {/* Fixed: proper toggle text */}
    </Button>
  );
};

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
const MobileMenu = ({
  isOpen,
  onClose,
  onNavClick,
  lang,
  onLanguageToggle,
}) => (
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
          <div className="pt-4 border-t border-white/10">
            <Button
              variant="toggle"
              onClick={() => {
                onLanguageToggle();
                onClose();
              }}
              className="w-full"
            >
              {lang === "en" ? "中文" : "English"}
            </Button>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// 🔴 **QUIZ MODAL - FIXED**
const QuizModal = ({ isOpen, onClose, lang }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    mobile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gapAnalysis, setGapAnalysis] = useState(null);

  const questions = getSmartQuizQuestions(lang); // Use language-aware function
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isAnswered = answers[currentQuestion] !== undefined;

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      setShowContactForm(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () =>
    currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);
  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Fixed handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Call analyzeGaps directly and use the result immediately
    const analysis = analyzeGaps(answers);

    // Set state for UI (results display)
    setGapAnalysis(analysis);

    try {
      // Calculate score using the local analysis
      const answeredCount = answers.filter(
        (answer) => answer !== undefined,
      ).length;
      const totalPossibleScore = answeredCount * 7;
      const overallScorePercent =
        answeredCount > 0
          ? Math.round((analysis.totalScore / totalPossibleScore) * 100)
          : 0;

      // Send to backend with local data
      const response = await fetch("/api/send-quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          mobile: formData.mobile,
          score: overallScorePercent,
          gaps: analysis.gaps || [],
          totalHoursWasted: analysis.totalHoursWasted || 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send results");
      }

      console.log("Email sent to team");
    } catch (error) {
      console.error("Full error sending email:", {
        message: error.message,
        error: error,
        stack: error.stack,
      });
    } finally {
      // Always show results and reset UI state
      setShowResults(true);
      setIsSubmitting(false);
      setShowContactForm(false);
    }
  };

  // Fixed resetQuiz function - properly placed inside component
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setShowContactForm(false);
    setFormData({ name: "", email: "", company: "", mobile: "" });
    setGapAnalysis(null);
    onClose();
  };

  if (!isOpen) return null;

  const severityColors = {
    CRITICAL: {
      bg: "from-red-900/20",
      border: "border-red-500/30",
      text: "text-red-400",
      icon: "🔴",
    },
    HIGH: {
      bg: "from-orange-900/20",
      border: "border-orange-500/30",
      text: "text-orange-400",
      icon: "🟡",
    },
    MEDIUM: {
      bg: "from-yellow-900/20",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
      icon: "🟡",
    },
    LOW: {
      bg: "from-green-900/20",
      border: "border-green-500/30",
      text: "text-green-400",
      icon: "🟢",
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80"
            onClick={resetQuiz}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-[#0F172A] border border-[#475569] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#0F172A] border-b border-[#475569] p-4 flex items-center justify-between z-10">
                <h1 className="text-xl font-bold text-white">
                  {t("quizTitle", lang)}
                </h1>
                <button
                  onClick={resetQuiz}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {showContactForm && !showResults ? (
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {t("quizCustomRoadmap", lang)}
                    </h2>
                    <p className="text-gray-400">
                      {t("quizEnterDetails", lang)}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder={t("quizName", lang)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#1E293B] border border-[#334155] text-white placeholder-gray-500 focus:outline-none focus:border-[#0EA5E9]"
                    />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder={t("quizEmail", lang)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#1E293B] border border-[#334155] text-white placeholder-gray-500 focus:outline-none focus:border-[#0EA5E9]"
                    />
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleFormChange}
                      placeholder={t("quizCompany", lang)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#1E293B] border border-[#334155] text-white placeholder-gray-500 focus:outline-none focus:border-[#0EA5E9]"
                    />
                    <input
                      name="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={handleFormChange}
                      placeholder={t("quizMobile", lang)}
                      className="w-full px-4 py-3 rounded-xl bg-[#1E293B] border border-[#334155] text-white placeholder-gray-500 focus:outline-none focus:border-[#0EA5E9]"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowContactForm(false)}
                    >
                      {t("quizBack", lang)}
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="ml-auto"
                    >
                      {isSubmitting
                        ? t("quizProcessing", lang)
                        : t("quizSubmitResults", lang)}
                    </Button>
                  </div>
                </form>
              ) : showResults && gapAnalysis ? (
                <div className="p-8 space-y-8">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className={`inline-block px-8 py-4 rounded-2xl bg-gradient-to-r ${severityColors[gapAnalysis.overallSeverity].bg} border ${severityColors[gapAnalysis.overallSeverity].border} mb-6`}
                    >
                      <div className="text-5xl font-bold text-white mb-2">
                        {gapAnalysis.totalHoursWasted} {t("quizHrsShort", lang)}
                        /{t("quizWeekShort", lang)}
                      </div>
                      <div className="text-white/90 font-medium">
                        {severityColors[gapAnalysis.overallSeverity].icon}{" "}
                        {t("quizTimeWasted", lang)}
                      </div>
                    </motion.div>
                    <h3 className="text-3xl font-bold text-white mb-3">
                      {t("quizCustomRoadmap", lang)}
                    </h3>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                      {t("quizResultsTitle", lang)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <Clock className="w-8 h-8 text-blue-400 mb-2" />
                      <div className="text-2xl font-bold text-white">
                        {gapAnalysis.totalHoursWasted}
                      </div>
                      <div className="text-sm text-gray-400">
                        {t("quizHoursWasted", lang)}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <DollarSign className="w-8 h-8 text-green-400 mb-2" />
                      <div className="text-2xl font-bold text-white">
                        $
                        {(
                          (gapAnalysis.totalHoursWasted * 52 * 50 -
                            gapAnalysis.totalMonthlyCost * 12) /
                          1000
                        ).toFixed(0)}
                        K
                      </div>
                      <div className="text-sm text-gray-400">
                        {t("quizAnnualSavings", lang)}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <TrendingUp className="w-8 h-8 text-purple-400 mb-2" />
                      <div className="text-2xl font-bold text-white">
                        {(
                          ((gapAnalysis.totalHoursWasted * 52 * 50 -
                            gapAnalysis.totalMonthlyCost * 12) /
                            (gapAnalysis.totalMonthlyCost * 12)) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                      <div className="text-sm text-gray-400">
                        {t("quizROI", lang)}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <Calendar className="w-8 h-8 text-orange-400 mb-2" />
                      <div className="text-2xl font-bold text-white">
                        {(
                          (gapAnalysis.totalMonthlyCost * 12) /
                          ((gapAnalysis.totalHoursWasted * 52 * 50 -
                            gapAnalysis.totalMonthlyCost * 12) /
                            12)
                        ).toFixed(1)}
                        {t("quizMonthShort", lang)}
                      </div>
                      <div className="text-sm text-gray-400">
                        {t("quizPayback", lang)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-white flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400" />
                      {t("quizTopFixes", lang)}
                    </h4>

                    {gapAnalysis.gaps.map((gap, index) => {
                      const gapColors = severityColors[gap.severity];
                      const annualHoursSaved = gap.solution.hoursPerWeek * 52;
                      const annualCostSavings = annualHoursSaved * 50;
                      const aiCost = gap.solution.cost * 12;
                      const netSavings = annualCostSavings - aiCost;

                      return (
                        <motion.div
                          key={gap.category}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className={`border-2 ${gapColors.border} rounded-2xl p-6 bg-gradient-to-br ${gapColors.bg} to-black`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <span
                              className={`text-lg font-bold ${gapColors.text}`}
                            >
                              {gapColors.icon}{" "}
                              {t("quizPriority", lang, {
                                number: index + 1,
                                severity: t(
                                  `severity${gap.severity.charAt(0) + gap.severity.slice(1).toLowerCase()}`,
                                  lang,
                                ),
                              })}
                            </span>
                            <span className="text-sm px-3 py-1 rounded-full bg-white/10 text-gray-300">
                              {t("quizWeeksToImplement", lang, {
                                weeks: gap.solution.implementation.replace(
                                  /\D/g,
                                  "",
                                ),
                              })}
                            </span>
                          </div>
                          <h5 className="text-2xl font-bold text-white mb-2">
                            {gap.solution.name}
                          </h5>
                          <p className="text-gray-400 mb-4">
                            {gap.solution.solves}
                          </p>
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-black/40 rounded-xl p-4 border border-red-500/20">
                              <h6 className="text-sm font-semibold text-red-400 mb-2 flex items-center">
                                <TrendingDown className="w-4 h-4 mr-1" />
                                {t("quizCurrentState", lang)}
                              </h6>
                              <div className="text-3xl font-bold text-white mb-1">
                                {gap.hoursWasted} {t("quizHrsShort", lang)}
                              </div>
                              <div className="text-xs text-gray-400">
                                {t("quizWastedPerWeek", lang)}
                              </div>
                            </div>
                            <div className="bg-black/40 rounded-xl p-4 border border-green-500/20">
                              <h6 className="text-sm font-semibold text-green-400 mb-2 flex items-center">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                {t("quizWithAI", lang)}
                              </h6>
                              <div className="text-3xl font-bold text-white mb-1">
                                {gap.solution.timeSaved}
                              </div>
                              <div className="text-xs text-gray-400">
                                {t("quizAutomated", lang)}
                              </div>
                            </div>
                          </div>
                          <div className="mb-4">
                            <h6 className="text-sm font-semibold text-gray-400 uppercase mb-3">
                              {t("quizWhatGetsAutomated", lang)}
                            </h6>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {gap.solution.features.map((feature, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start text-sm"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-300">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="pt-4 border-t border-white/10">
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <div className="text-lg font-bold text-green-400">
                                  ${(netSavings / 1000).toFixed(0)}K
                                </div>
                                <div className="text-xs text-gray-400">
                                  {t("quizAnnualSavingsLabel", lang)}
                                </div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-blue-400">
                                  ${gap.solution.cost}/
                                  {t("quizMonthShort", lang)}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {t("quizAICost", lang)}
                                </div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-purple-400">
                                  {((netSavings / aiCost) * 100).toFixed(0)}%
                                </div>
                                <div className="text-xs text-gray-400">
                                  {t("quizROILabel", lang)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/20 text-center">
                    <h4 className="text-2xl font-bold text-white mb-4">
                      {t("quizTransformBusiness", lang)}
                    </h4>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                      {t("quizScheduleCall", lang)}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="outline" onClick={resetQuiz}>
                        {lang === "zh" ? "重新评估" : "Retake Assessment"}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 space-y-8"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-mono text-gray-400">
                      <span>
                        {t("quizQuestion", lang, {
                          current: currentQuestion + 1,
                          total: questions.length,
                        })}
                      </span>
                      <span>
                        {Math.round(progress)}%{" "}
                        {lang === "zh" ? "完成" : "Complete"}
                      </span>
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
                        onClick={() => handleAnswer(i)}
                        className={cn(
                          "w-full p-4 rounded-xl border-2 transition-all text-left",
                          answers[currentQuestion] === i
                            ? "border-[#1E3A8A] bg-[#1E3A8A]/20"
                            : "border-[#334155] hover:border-[#0EA5E9]/50 hover:bg-[#0EA5E9]/10",
                        )}
                        whileHover={
                          answers[currentQuestion] === i ? {} : { scale: 1.02 }
                        }
                      >
                        <div className="flex items-center">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center",
                              answers[currentQuestion] === i
                                ? "border-blue-500 bg-blue-500"
                                : "border-white/30",
                            )}
                          >
                            {answers[currentQuestion] === i && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span
                            className={
                              answers[currentQuestion] === i
                                ? "text-white font-medium"
                                : "text-[#E2E8F0]"
                            }
                          >
                            {option.text}
                          </span>
                        </div>
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
const CaseStudiesSection = ({ t }) => {
  const useCases = t("useCases");

  return (
    <section
      id={SECTION_IDS.caseStudies}
      className="py-24 px-4 relative bg-gradient-to-b from-[#0F172A]/50 to-[#111827]/50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#0EA5E9] to-[#1E3A8A] bg-clip-text text-transparent">
            {t("caseStudiesTitle")}
          </h2>
          <p className="text-xl text-[#E2E8F0] max-w-3xl mx-auto">
            {t("caseStudiesSubtitle")}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:border-[#0EA5E9]/40 transition-all duration-300 hover:scale-105">
                {/* Industry Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs px-4 py-2 rounded-full bg-gradient-to-r from-[#1E3A8A]/20 to-[#10B981]/20 text-[#0EA5E9] font-medium border border-[#0EA5E9]/30">
                    {useCase.industry}
                  </span>
                </div>

                {/* Challenge */}
                <div className="mb-6">
                  <h4 className="text-sm text-[#94A3B8] uppercase tracking-wide mb-2 font-semibold">
                    The Challenge
                  </h4>
                  <p className="text-white font-medium leading-relaxed">
                    {useCase.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h4 className="text-sm text-[#94A3B8] uppercase tracking-wide mb-2 font-semibold">
                    AI Solution
                  </h4>
                  <p className="text-[#E2E8F0] text-sm leading-relaxed">
                    {useCase.solution}
                  </p>
                </div>

                {/* Automated Processes */}
                <div className="mb-6">
                  <h4 className="text-sm text-[#94A3B8] uppercase tracking-wide mb-3 font-semibold">
                    What Gets Automated
                  </h4>
                  <ul className="space-y-2">
                    {useCase.processes.map((process, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-[#10B981] mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-[#E2E8F0]">{process}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className="pt-6 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-3xl font-bold text-[#0EA5E9] mb-1">
                        {useCase.metrics.primary}
                      </div>
                      <div className="text-xs text-[#94A3B8]">
                        {useCase.metrics.label}
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white mb-1">
                        {useCase.metrics.secondary}
                      </div>
                      <div className="text-xs text-[#94A3B8]">
                        Additional Impact
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Industry Not Listed CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        ></motion.div>
      </div>
    </section>
  );
};

// 🔴 **HERO SECTION**
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
  const industryResults = t("industryResults");

  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-[#0F172A]/50 to-[#111827]/50">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#0EA5E9] to-[#1E3A8A] bg-clip-text text-transparent">
            {t("proofTitle")}
          </h2>
          <p className="text-xl text-[#E2E8F0] max-w-3xl mx-auto">
            {t("proofSubtitle")}
          </p>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industryResults.map((result, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full hover:border-[#0EA5E9]/40 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-[#1E3A8A]/20 to-[#10B981]/20 text-[#0EA5E9] font-medium border border-[#0EA5E9]/30">
                    {result.industry}
                  </span>
                  <CheckCircle className="w-6 h-6 text-[#10B981]" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {result.result}
                </h3>

                <p className="text-[#E2E8F0] text-sm leading-relaxed">
                  {result.impact}
                </p>
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
            <LanguageToggle lang={lang} onToggle={setLang} />
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
        onLanguageToggle={() => setLang(lang === "en" ? "zh" : "en")}
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
