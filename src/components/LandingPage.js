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
    brandName: "SING SINGH",
    tagline: "Smarter AI, Scalable Businesses",
    // Navigation
    navHowItWorks: "How It Works",
    navCaseStudies: "Case Studies",
    navFAQ: "FAQ",
    navStartQuiz: "Start Quiz",
    navContact: "Contact Us",
    contactTitle: "Get In Touch",
    contactDescription:
      "Tell us about your business challenges and we'll show you how AI can help.",
    contactName: "Full Name",
    contactEmail: "Email Address",
    contactCompany: "Company Name",
    contactMessage: "Tell us about your challenges",
    contactSubmit: "Send Message",
    contactSending: "Sending...",
    contactSuccess: "Message sent! We'll get back to you within 24 hours.",
    contactError: "Failed to send message. Please try again.",
    // Hero Section
    badge: "Scale 5X faster with SingSinghAI ",
    heroTitle1: "Grow Your Business",
    heroTitle2: "with AI Intelligence",
    heroDescription:
      "SingSingh AI builds custom AI that saves you loads of hours & boost your business efficiency by 3x.",
    heroCTA: "Book my free consultation",
    // heroSubtext: "No credit card • 2 minutes • Instant personalised roadmap",

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
          "Task prioritisation",
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
        features: ["Resource allocation", "Scaling triggers", "Optimisation"],
      },
    ],

    // How It Works
    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "Simple 4-step process to get you started.",
    phases: [
      {
        step: "1. Tell Us About You",
        description: "Share your goals and challenges with us.",
        details: ["Quick chat", "Understand your needs", "Find opportunities"],
        duration: "Week 1",
      },
      {
        step: "2. We Build For You",
        description: "Our team creates AI tools tailored to your business.",
        details: ["Custom setup", "Easy integration", "Live dashboards"],
        duration: "Week 2-4",
      },
      {
        step: "3. See Results",
        description: "Watch your business run smoother and faster.",
        details: ["Track progress", "Measure savings", "Get reports"],
        duration: "Week 5+",
      },
      {
        step: "4. AI That Learns You",
        description:
          "Your AI gets smarter and understands you better over time.",
        details: ["Learns your style", "Adapts to you", "Always improving"],
        duration: "Ongoing",
      },
    ],

    // Real Industry Use Cases
    caseStudiesTitle: "We Help Businesses Like Yours",
    caseStudiesSubtitle:
      "Real solutions for real problems. See how we make work easier.",
    useCases: [
      {
        industry: "Accounting & Finance",
        challenge:
          "Drowning in receipts, spending days on reconciliation, and still worried about mistakes",
        solution:
          "We scan your receipts, sort everything automatically, and keep your books perfect — so you can sleep at night",
        processes: [
          "Receipts scanned and sorted for you",
          "Accounts matched automatically",
          "Trust accounting always up to date",
          "Documents ready when you need them",
        ],
        metrics: {
          primary: "20+",
          secondary: "More Work in less time",
          label: "Hours Saved",
        },
      },
      {
        industry: "Professional Services",
        challenge:
          "New clients take forever to onboard, and your team is stuck chasing paperwork",
        solution:
          "We collect documents, check compliance, and get new clients started — while you focus on the real work",
        processes: [
          "Documents collected automatically",
          "Compliance checked instantly",
          "Kickoff meetings scheduled for you",
        ],
        metrics: {
          primary: "2 days",
          secondary: "5x capacity",
          label: "To Get Started",
          secondaryLabel: "Per Person",
        },
      },
      {
        industry: "E-commerce & Retail",
        challenge:
          "Hard to know what products will sell, and reaching customers feels like guesswork",
        solution:
          "We help you understand your market, find winning products, and connect with the right customers",
        processes: [
          "Market research done for you",
          "Find products people actually want",
          "Reach customers who are ready to buy",
        ],
        metrics: {
          primary: "40%",
          secondary: "2x faster",
          label: "More Sales",
          secondaryLabel: "To Market",
        },
      },
      {
        industry: "Healthcare & Clinics",
        challenge:
          "Patients don't show up, paperwork piles up, and your staff is overwhelmed",
        solution:
          "We remind patients, handle scheduling, and take care of the admin — so your team can focus on patient care",
        processes: [
          "Patients reminded automatically",
          "Easy rescheduling for everyone",
          "Paperwork handled behind the scenes",
        ],
        metrics: {
          primary: "60%",
          secondary: "70% less work",
          label: "Fewer No-Shows",
          secondaryLabel: "Per Staff",
        },
      },
      {
        industry: "Property Management",
        challenge:
          "Managing rentals is exhausting — tenant questions, booking chaos, endless follow-ups",
        solution:
          "We handle inquiries, manage bookings, and keep tenants happy — whether it's short-term or long-term rentals",
        processes: [
          "Guest and tenant questions answered 24/7",
          "Bookings managed automatically",
          "Follow-ups that feel personal",
        ],
        metrics: {
          primary: "3x",
          secondary: "Happier tenants",
          label: "More Bookings",
          secondaryLabel: "Less Stress",
        },
      },
      {
        industry: "Marketing Agencies",
        challenge:
          "Data scattered everywhere, hours spent making reports, clients asking 'what's working?'",
        solution:
          "We pull all your data together, build reports automatically, and show you what's actually driving results",
        processes: [
          "All your platforms in one view",
          "Reports that build themselves",
          "Clear insights on what's working",
        ],
        metrics: {
          primary: "90%",
          secondary: "Live updates",
          label: "Time Saved",
          secondaryLabel: "Always Fresh",
        },
      },
    ],

    // Proof Section
    proofTitle: "Real Results Across Industries",
    proofSubtitle: "Proven impact for businesses that choose AI automation",
    stats: [
      { value: "95%", label: "Avg. Efficiency Gain" },
      { value: "2-8 weeks", label: "Time to ROI" },
      // { value: "6+", label: "Industries Served" },
      { value: "24/7", label: "System Uptime" },
    ],
    industryResults: [
      {
        industry: "Accounting",
        result: "Your books done automatically, every time",
        impact: "95% less manual work, always audit-ready",
      },
      {
        industry: "Professional Services",
        result: "New clients onboarded in days, not weeks",
        impact: "Handle 5x more clients without hiring",
      },
      {
        industry: "E-commerce & Retail",
        result: "Know what your customers want before they do",
        impact: "Find winning products faster, reach your market smarter",
      },
      {
        industry: "Healthcare & Clinics",
        result: "Patients show up, paperwork disappears",
        impact: "60% fewer no-shows, your staff focuses on care",
      },
      {
        industry: "Property Management",
        result: "Your rentals run themselves, short or long term",
        impact: "Happy tenants, fewer headaches, more bookings",
      },
      {
        industry: "Marketing",
        result: "All your data in one place, insights that matter",
        impact: "90% less time on reports, know what's working",
      },
    ],

    // FAQ Section
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "How fast do we see results?",
        a: "Right when you talk to us and we start building your AI helpers, you'll see quick wins fast. Most people notice real changes in just 30 days!",
      },
      {
        q: "Will this mess up my work?",
        a: "Nope! We run everything side-by-side so your business keeps going smooth - no interruptions at all.",
      },
      {
        q: "What businesses do you help?",
        a: "We help accountants, real estate agents, marketing teams, doctors, online stores, and anyone stuck doing boring repeat work.",
      },
      {
        q: "Do I need to be techy?",
        a: "No way! Our screens are easy to use and everything runs automatically - anyone on your team can do it.",
      },
      {
        q: "Is my info safe?",
        a: "Totally safe! We use bank-level protection that's ready for all the big privacy rules.",
      },
    ],

    // CTA Section
    ctaTitle: "Ready to Grow Smarter?",
    ctaDescription:
      "Start your free AI assessment. 2 minutes to personalised growth roadmap.",
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
    contactPhone: "+61402733202",
    contactEmail1: "henry.ho@singsinghai.com.au",
    contactEmail2: "abhinav.singh@singsinghai.com.au",

    contactAddress: "Brisbane, QLD",
    copyright: "© 2025 Sing Singh AI Advisory. All rights reserved.",

    // Quiz
    quizTitle: "AI Readiness Assessment",
    quizGetResults: "Get Your Results",
    quizCustomRoadmap: "Your Custom AI Roadmap",
    quizEnterDetails: "Enter your details to see your personalised results",
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
    brandName: "SING SINGH",
    tagline: "更智能的AI，可扩展的业务",
    // Navigation
    navHowItWorks: "工作原理",
    navCaseStudies: "案例研究",
    navFAQ: "常见问题",
    navStartQuiz: "开始测试",
    navContact: "联系我们",
    contactTitle: "联系我们",
    contactDescription: "告诉我们您的业务挑战，我们将向您展示AI如何提供帮助。",
    contactName: "全名",
    contactEmail: "电子邮件地址",
    contactCompany: "公司名称",
    contactMessage: "告诉我们您的挑战",
    contactSubmit: "发送消息",
    contactSending: "发送中...",
    contactSuccess: "消息已发送！我们将在24小时内回复您。",
    contactError: "发送失败。请重试。",
    // Hero Section
    // Chinese translations (translations.zh)
    badge: "SingSinghAI让您业务增长5倍快。",
    heroTitle1: "Grow Your Business",
    heroTitle2: "with AI Intelligence",
    heroDescription:
      "SingSingh AI打造专属AI，帮您省下大量时间，同时提升业务效率3倍。",
    heroCTA: "预约免费咨询",

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
    howItWorksTitle: "如何运作",
    howItWorksSubtitle: "简单4步流程，轻松开始。",
    phases: [
      {
        step: "1. 告诉我们您的需求",
        description: "与我们分享您的目标和挑战。",
        details: ["快速沟通", "了解需求", "发现机会"],
        duration: "第1周",
      },
      {
        step: "2. 我们为您构建",
        description: "我们的团队为您的业务打造定制AI工具。",
        details: ["定制设置", "轻松集成", "实时仪表板"],
        duration: "第2-4周",
      },
      {
        step: "3. 看到成果",
        description: "见证您的业务运行更顺畅、更高效。",
        details: ["追踪进度", "衡量节省", "获取报告"],
        duration: "第5周+",
      },
      {
        step: "4. AI越来越懂您",
        description: "您的AI会随着时间变得更智能，更了解您。",
        details: ["学习您的风格", "适应您的需求", "持续改进"],
        duration: "持续进行",
      },
    ],

    // Case Studies - Real Industry Use Cases
    caseStudiesTitle: "我们帮助像您这样的企业",
    caseStudiesSubtitle:
      "真实的解决方案，解决真实的问题。看看我们如何让工作更轻松。",
    useCases: [
      {
        industry: "会计与金融",
        challenge: "被收据淹没，花好几天对账，还担心出错",
        solution:
          "我们帮你扫描收据，自动分类整理，让账目完美无缺——让你安心睡好觉",
        processes: [
          "收据自动扫描分类",
          "账目自动匹配",
          "信托账户实时更新",
          "需要的文件随时就绪",
        ],
        metrics: {
          primary: "95%",
          secondary: "3天→2小时",
          label: "省下时间",
          secondaryLabel: "每人",
        },
      },
      {
        industry: "专业服务",
        challenge: "新客户入职太慢，团队一直在追着要文件",
        solution: "我们帮你收集文件、检查合规、安排启动——让你专注真正的工作",
        processes: ["文件自动收集", "合规即时检查", "启动会议自动安排"],
        metrics: {
          primary: "2天",
          secondary: "5倍容量",
          label: "开始合作",
          secondaryLabel: "每人",
        },
      },
      {
        industry: "电商与零售",
        challenge: "不知道什么产品能卖，找客户像碰运气",
        solution: "我们帮你了解市场，找到爆款产品，精准触达对的客户",
        processes: [
          "市场调研帮你做好",
          "找到真正有人要的产品",
          "触达准备购买的客户",
        ],
        metrics: {
          primary: "40%",
          secondary: "快2倍",
          label: "更多销售",
          secondaryLabel: "上市速度",
        },
      },
      {
        industry: "医疗与诊所",
        challenge: "患者不来，文书堆积，员工忙不过来",
        solution:
          "我们提醒患者、处理预约、搞定行政事务——让你的团队专注于照顾患者",
        processes: ["自动提醒患者", "轻松改约", "文书后台处理好"],
        metrics: {
          primary: "60%",
          secondary: "70%少工作",
          label: "更少爽约",
          secondaryLabel: "每位员工",
        },
      },
      {
        industry: "房产管理",
        challenge: "管理租房太累——租客问题、预订混乱、无尽的跟进",
        solution: "我们处理咨询、管理预订、让租客满意——不管是短租还是长租",
        processes: ["24/7回答租客问题", "预订自动管理", "跟进让人感觉贴心"],
        metrics: {
          primary: "3倍",
          secondary: "租客更满意",
          label: "更多预订",
          secondaryLabel: "更少烦恼",
        },
      },
      {
        industry: "营销机构",
        challenge: "数据到处都是，花几小时做报告，客户问'什么有效？'",
        solution: "我们把所有数据整合，自动生成报告，告诉你什么真正带来效果",
        processes: ["所有平台一目了然", "报告自动生成", "清楚看到什么有效"],
        metrics: {
          primary: "90%",
          secondary: "实时更新",
          label: "省下时间",
          secondaryLabel: "随时最新",
        },
      },
    ],

    // Proof Section
    proofTitle: "跨行业的真实成果",
    proofSubtitle: "选择AI自动化的企业的已验证影响",
    stats: [
      { value: "95%", label: "平均效率提升" },
      { value: "2-8周", label: "投资回报时间" },
      // { value: "6+", label: "服务行业" },
      { value: "24/7", label: "系统正常运行时间" },
    ],
    industryResults: [
      {
        industry: "会计",
        result: "账目自动搞定，每次都准",
        impact: "95%少做手工活，随时准备审计",
      },
      {
        industry: "专业服务",
        result: "新客户几天就能上手，不用等几周",
        impact: "不用招人也能服务5倍的客户",
      },
      {
        industry: "电商与零售",
        result: "比客户更早知道他们想要什么",
        impact: "更快找到爆款，更聪明地触达市场",
      },
      {
        industry: "医疗与诊所",
        result: "患者准时来，文书自动消失",
        impact: "爽约减少60%，员工专注于护理",
      },
      {
        industry: "房产管理",
        result: "短租长租都能自己跑起来",
        impact: "租客满意，烦恼更少，订单更多",
      },
      {
        industry: "营销",
        result: "所有数据一目了然，洞察真正重要的",
        impact: "报告时间省90%，清楚什么有效",
      },
    ],

    // FAQ Section
    faqTitle: "常见问题",
    faqs: [
      {
        q: "多久能看到效果？",
        a: "你一找我们，我们就开始为你做AI助手，很快就能看到第一批成果！大部分客户30天内就感觉变化很大。",
      },
      {
        q: "会打乱我现在的工作吗？",
        a: "完全不会！我们一边跑新系统一边保持你原来的业务正常运行，一点不中断。",
      },
      {
        q: "你们帮哪些行业？",
        a: "我们帮会计师、房产中介、营销团队、医生诊所、网店，还有任何做重复工作的公司。",
      },
      {
        q: "我需要懂技术吗？",
        a: "不用！界面超简单，全部自动运行，你团队任何人都能用。",
      },
      {
        q: "我的数据安全吗？",
        a: "绝对安全！用银行级别的保护，完全符合国际隐私标准。",
      },
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
    contactPhone: "+61402733202",
    contactEmail1: "henry.ho@singsinghai.com.au",
    contactEmail2: "abhinav.singh@singsinghai.com.au",
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
      "Auto-categorisation with ML",
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
        { text: "Few minutes (organised folders)", score: 3, hours: 3 },
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
    0
  );
  const totalScore = Object.values(categoryScores).reduce(
    (sum, score) => sum + score,
    0
  );
  const totalMonthlyCost = gaps.reduce(
    (sum, gap) => sum + gap.solution.cost,
    0
  );
  const totalHoursSaved = gaps.reduce(
    (sum, gap) => sum + gap.solution.hoursPerWeek,
    0
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
          `Missing translation: ${key} for ${validLang} (using: ${key})`
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
        "g"
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
        "Your operations are optimised! AI can enhance efficiency further.",
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
          {/* ADD THIS CONTACT BUTTON */}
          <Button
            variant="secondary"
            onClick={() => {
              onNavClick("contact");
              onClose();
            }}
            className="w-full justify-start"
          >
            {t("navContact", lang)}
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
  const [status, setStatus] = useState(null);

  const questions = getSmartQuizQuestions(lang); // Use language-aware function
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isAnswered = answers[currentQuestion] !== undefined;

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    // ✅ AUTO-ADVANCE after short delay
    setTimeout(() => {
      if (currentQuestion === questions.length - 1) {
        setShowContactForm(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 300); // 300ms delay so user sees their selection
  };

  // const handleNext = () => {
  //   if (currentQuestion === questions.length - 1) {
  //     setShowContactForm(true);
  //   } else {
  //     setCurrentQuestion(currentQuestion + 1);
  //   }
  // };

  const handlePrevious = () =>
    currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);
  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Fixed handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      console.log("Sending contact form:", formData);

      // ✅ ADD message field with quiz context
      const submissionData = {
        ...formData,
        message: formData.mobile
          ? `Quiz submission. Mobile: ${formData.mobile}. ${formData.bookingInfo || ""}`
          : `Quiz submission. ${formData.bookingInfo || "Interested in AI assessment"}`,
      };

      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData), // ✅ Use submissionData instead
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const text = await response.text();
        console.error("Error response:", text);
        throw new Error(`Server error: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned non-JSON response");
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);

      setStatus("success");

      // ✅ NOW show results after successful submission
      const analysis = analyzeGaps(answers);
      setGapAnalysis(analysis);
      setShowResults(true);
      setShowContactForm(false);
    } catch (error) {
      console.error("Full error sending contact form:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
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
                                  lang
                                ),
                              })}
                            </span>
                            <span className="text-sm px-3 py-1 rounded-full bg-white/10 text-gray-300">
                              {t("quizWeeksToImplement", lang, {
                                weeks: gap.solution.implementation.replace(
                                  /\D/g,
                                  ""
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
                            : "border-[#334155] hover:border-[#0EA5E9]/50 hover:bg-[#0EA5E9]/10"
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
                                : "border-white/30"
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
                    {/* <Button
                      onClick={handleNext}
                      disabled={!isAnswered}
                      className="ml-auto"
                    >
                      {currentQuestion === questions.length - 1
                        ? t("quizFinish", lang)
                        : t("quizNext", lang)}
                    </Button> */}
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
// 🔴 **CONTACT MODAL**
const ContactModal = ({ isOpen, onClose, lang }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      console.log("Sending contact form:", formData); // Debug log

      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status); // Debug log

      const responseData = await response.json();
      console.log("Response data:", responseData); // Debug log

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to send");
      }

      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });

      setTimeout(() => {
        onClose();
        setStatus(null);
      }, 2000);
    } catch (error) {
      console.error("Full error sending contact form:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-[#0F172A] border border-[#475569] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#0F172A] border-b border-[#475569] p-4 flex items-center justify-between z-10">
                <h1 className="text-xl font-bold text-white">
                  {t("contactTitle", lang)}
                </h1>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="text-center mb-6">
                  <Mail className="w-16 h-16 mx-auto mb-4 text-[#0EA5E9]" />
                  <p className="text-gray-400">
                    {t("contactDescription", lang)}
                  </p>
                </div>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <p className="text-green-300">
                      {t("contactSuccess", lang)}
                    </p>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-center gap-3"
                  >
                    <X className="w-5 h-5 text-red-400" />
                    <p className="text-red-300">{t("contactError", lang)}</p>
                  </motion.div>
                )}

                <div className="space-y-4">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contactName", lang)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1E293B] border border-[#334155] text-white placeholder-gray-500 focus:outline-none focus:border-[#0EA5E9]"
                  />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contactEmail", lang)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1E293B] border border-[#334155] text-white placeholder-gray-500 focus:outline-none focus:border-[#0EA5E9]"
                  />
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t("contactCompany", lang)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1E293B] border border-[#334155] text-white placeholder-gray-500 focus:outline-none focus:border-[#0EA5E9]"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contactMessage", lang)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-[#1E293B] border border-[#334155] text-white placeholder-gray-500 focus:outline-none focus:border-[#0EA5E9] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || status === "success"}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      {t("contactSending", lang)}
                    </>
                  ) : (
                    <>
                      {t("contactSubmit", lang)}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
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

                {/* Pain Points */}
                <div className="mb-6">
                  <h4 className="text-sm text-[#94A3B8] uppercase tracking-wide mb-2 font-semibold">
                    Pain Points
                  </h4>
                  <p className="text-white font-medium leading-relaxed">
                    {useCase.challenge}
                  </p>
                </div>

                {/* SingSingh AI Solution */}
                <div className="mb-6">
                  <h4 className="text-sm text-[#94A3B8] uppercase tracking-wide mb-2 font-semibold">
                    SingSingh AI Solution
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
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="text-xl font-bold text-white mb-1">
                          {useCase.metrics.secondary}
                        </div>
                        <div className="text-xs text-[#94A3B8]">
                          {useCase.metrics.secondaryLabel}
                        </div>
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
const HeroSection = ({ onOpenContact, t }) => (
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
        <Button onClick={onOpenContact} size="lg" className="mb-6">
          <span>{t("heroCTA")}</span>
          <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
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
      // duration: t("phases")[0].duration,
    },
    {
      step: t("phases")[1].step,
      description: t("phases")[1].description,
      icon: Zap,
      details: t("phases")[1].details,
      // duration: t("phases")[1].duration,
    },
    {
      step: t("phases")[2].step,
      description: t("phases")[2].description,
      icon: TrendingUp,
      details: t("phases")[2].details,
      // duration: t("phases")[2].duration,
    },
    {
      step: t("phases")[3].step,
      description: t("phases")[3].description,
      icon: Sparkles,
      details: t("phases")[3].details,
      // duration: t("phases")[3].duration,
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {t("stats").map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20 min-w-[200px]"
            >
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-[#0EA5E9]" />
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-[#E2E8F0]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div> */}
      </div>
    </section>
  );
};

const FaqSection = ({ t }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="cursor-pointer" onClick={() => toggleFaq(i)}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{faq.q}</h3>
                  <ChevronDown
                    className={`w-6 h-6 text-[#0EA5E9] transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-[#E2E8F0] overflow-hidden"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
            <Mail className="w-4 h-4" /> {t("contactEmail1")}
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> {t("contactEmail2")}
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
  const [isContactOpen, setIsContactOpen] = useState(false); // ADD THIS

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
    } else if (section === "contact") {
      // ADD THIS
      setIsContactOpen(true);
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
          <div className="flex items-center gap-3">
            {/* Logo */}
            {/* Logo Placeholder */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#10B981] flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>

            <div className="flex flex-col">
              <div className="font-mono text-2xl font-bold bg-gradient-to-r from-[#1E3A8A] to-[#10B981] bg-clip-text text-transparent">
                {translate("brandName")}
              </div>
              <div className="text-xs font-semibold text-[#0EA5E9]/80 tracking-wide">
                {translate("tagline")}
              </div>
            </div>
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
            <Button
              variant="secondary"
              onClick={() => handleNavClick("contact")}
            >
              {translate("navContact")}
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
        <HeroSection
          onOpenContact={() => setIsContactOpen(true)}
          t={translate}
        />
        {/* <ProblemSection t={translate} /> */}
        {/* <SolutionSection t={translate} /> */}
        <HowItWorksSection t={translate} />
        <CaseStudiesSection t={translate} />
        <ProofSection t={translate} />
        <FaqSection t={translate} />
        {/* <CtaSection onStartQuiz={() => setIsQuizOpen(true)} t={translate} /> */}
      </main>

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        lang={lang}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        lang={lang}
      />

      <Footer t={translate} />
    </div>
  );
};

export default LandingPage;
