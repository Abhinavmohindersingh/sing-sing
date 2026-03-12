// Complete bilingual translations for SingSingh AI website

export const translations = {
  en: {
    brandName: "SING SINGH",
    tagline: "Smarter AI, Stronger Business",
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
    badge: "Personalised AI Solutions for Your Business",
    heroTitle1: "Grow Your Business",
    heroTitle2: "with Personalised AI",
    heroDescription:
      "We design and deploy personalised AI solutions that reduce operational costs and increase business efficiency - built specifically around your workflows, not generic tools.",
    heroValueProps: [
      "We identify the right AI fit for your specific business",
      "Seamlessly integrates into your existing workflows",
      "Solutions built for your business, not off-the-shelf products",
    ],
    heroCTA: "Book Your Strategy Meeting",
    heroScroll: "Scroll to Explore",
    // Problem Section
    problemTitle: "Where Are You Draining Most of Your Time?",
    problemSubtitle:
      "Identify the operational bottlenecks that are limiting your growth and the AI solutions designed to resolve them.",
    problems: [
      {
        title: "Constant Firefighting",
        description: "Day-to-day operations consume your time and attention, leaving no capacity for strategic growth initiatives.",
        stats: "80% lose 6+ hours/week",
      },
      {
        title: "Recurring Tasks",
        description: "Data entry, follow-ups, and scheduling consume your team's most productive hours every single week.",
        stats: "23+ hours/week on repetitive work",
      },
      {
        title: "Inconsistent Marketing",
        description: "Reactive, patchy marketing is difficult to maintain, hard to scale, and nearly impossible to keep consistent.",
        stats: "67% struggle with consistency",
      },
      {
        title: "AI That Doesn't Know Your Business",
        description: "Generic AI tools provide generic answers. Your business deserves AI that understands your operations, your clients, and your goals.",
        stats: "Generic tools = generic results",
      },
    ],
    // Solution Section
    solutionTitle: "AI Solutions Built for Your Business",
    solutionSubtitle:
      "Three core pillars of personalised AI - each designed to address a specific operational challenge your business faces.",
    solutions: [
      {
        title: "AI Marketing Automation",
        description: "Automate content creation, campaign scheduling, and brand communications so your marketing runs consistently without manual effort.",
        features: ["Content creation and scheduling", "Campaign automation", "Brand consistency across channels"],
        painPoint: "Addresses: Inconsistent Marketing",
      },
      {
        title: "AI Compliance & Documentation",
        description: "Streamline document handling, automate compliance checks, and maintain audit-ready records with minimal manual intervention.",
        features: ["Automated document processing", "Compliance verification", "Audit-ready record keeping"],
        painPoint: "Addresses: Recurring Administrative Tasks",
      },
      {
        title: "AI Business Operations",
        description: "Deploy personalised AI trained on your business data for task automation, staff onboarding, and a centralised knowledge base.",
        features: ["Personalised AI on your business data", "Process and task automation", "Knowledge base and onboarding"],
        painPoint: "Addresses: AI That Doesn't Know Your Business",
      },
    ],
    // How It Works
    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "A structured four-step process from discovery to deployment.",
    phases: [
      {
        step: "AI Discovery",
        description: "We take the time to understand your business - your processes, your team, and the specific challenges you need to solve.",
        details: ["In-depth business review", "Identify key bottlenecks", "Define AI opportunities"],
        duration: "Week 1",
      },
      {
        step: "System Design",
        description: "Our team architects a personalised AI solution designed around your workflows and integrated with your existing tools.",
        details: ["Personalised solution architecture", "Workflow mapping", "Integration planning"],
        duration: "Week 2",
      },
      {
        step: "Development",
        description: "We build and configure your AI solution, training it on your business data to ensure accurate, relevant outputs.",
        details: ["AI training on your data", "System configuration", "Quality assurance testing"],
        duration: "Week 3–4",
      },
      {
        step: "Launch",
        description: "Your solution goes live. We support the transition, monitor performance, and continue to refine the system over time.",
        details: ["Smooth transition support", "Performance monitoring", "Continuous optimisation"],
        duration: "Week 5+",
      },
    ],
    // Case Studies
    caseStudiesTitle: "We Help Businesses Like Yours",
    caseStudiesSubtitle:
      "Real solutions for real problems. See how we make work easier.",
    useCases: [
      {
        industry: "Accounting & Finance",
        challenge:
          "Drowning in receipts, spending days on reconciliation, and still worried about mistakes",
        solution:
          "We scan your receipts, sort everything automatically, and keep your books perfect - so you can sleep at night",
        processes: [
          "Receipts scanned and sorted for you",
          "Accounts matched automatically",
          "Trust accounting always up to date",
          "Documents ready when you need them",
        ],
        metrics: { primary: "20+", secondary: "More Work in less time", label: "Hours Saved" },
      },
      {
        industry: "Professional Services",
        challenge:
          "New clients take forever to onboard, and your team is stuck chasing paperwork",
        solution:
          "We collect documents, check compliance, and get new clients started - while you focus on the real work",
        processes: [
          "Documents collected automatically",
          "Compliance checked instantly",
          "Kickoff meetings scheduled for you",
        ],
        metrics: { primary: "2 days", secondary: "5x capacity", label: "To Get Started", secondaryLabel: "Per Person" },
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
        metrics: { primary: "40%", secondary: "2x faster", label: "More Sales", secondaryLabel: "To Market" },
      },
      {
        industry: "Healthcare & Clinics",
        challenge: "Patients don't show up, paperwork piles up, and your staff is overwhelmed",
        solution:
          "We remind patients, handle scheduling, and take care of the admin - so your team can focus on patient care",
        processes: [
          "Patients reminded automatically",
          "Easy rescheduling for everyone",
          "Paperwork handled behind the scenes",
        ],
        metrics: { primary: "60%", secondary: "70% less work", label: "Fewer No-Shows", secondaryLabel: "Per Staff" },
      },
      {
        industry: "Property Management",
        challenge: "Managing rentals is exhausting - tenant questions, booking chaos, endless follow-ups",
        solution:
          "We handle inquiries, manage bookings, and keep tenants happy - whether it's short-term or long-term rentals",
        processes: [
          "Guest and tenant questions answered 24/7",
          "Bookings managed automatically",
          "Follow-ups that feel personal",
        ],
        metrics: { primary: "3x", secondary: "Happier tenants", label: "More Bookings", secondaryLabel: "Less Stress" },
      },
      {
        industry: "Marketing Agencies",
        challenge: "Data scattered everywhere, hours spent making reports, clients asking 'what's working?'",
        solution:
          "We pull all your data together, build reports automatically, and show you what's actually driving results",
        processes: [
          "All your platforms in one view",
          "Reports that build themselves",
          "Clear insights on what's working",
        ],
        metrics: { primary: "90%", secondary: "Live updates", label: "Time Saved", secondaryLabel: "Always Fresh" },
      },
    ],
    // Proof Section
    proofTitle: "Real Results Across Industries",
    proofSubtitle: "Proven impact for businesses that choose AI automation",
    stats: [
      { value: "95%", label: "Avg. Efficiency Gain" },
      { value: "2-8 weeks", label: "Time to ROI" },
      { value: "24/7", label: "System Uptime" },
    ],
    industryResults: [
      { industry: "Accounting", result: "Your books done automatically, every time", impact: "95% less manual work, always audit-ready" },
      { industry: "Professional Services", result: "New clients onboarded in days, not weeks", impact: "Handle 5x more clients without hiring" },
      { industry: "E-commerce & Retail", result: "Know what your customers want before they do", impact: "Find winning products faster, reach your market smarter" },
      { industry: "Healthcare & Clinics", result: "Patients show up, paperwork disappears", impact: "60% fewer no-shows, your staff focuses on care" },
      { industry: "Property Management", result: "Your rentals run themselves, short or long term", impact: "Happy tenants, fewer headaches, more bookings" },
      { industry: "Marketing", result: "All your data in one place, insights that matter", impact: "90% less time on reports, know what's working" },
    ],
    // Comparison Section
    comparisonTitle: "Without AI vs With SingSingh AI",
    comparisonLeft: "Without AI",
    comparisonRight: "With SingSingh AI",
    comparisonOld: [
      "Constant firefighting consuming your day",
      "Hours lost to data entry, follow-ups, and scheduling",
      "Reactive, inconsistent marketing with no structure",
      "Generic AI tools that don't understand your business",
      "Decisions made without real-time business context",
      "Growth bottlenecked by manual processes",
    ],
    comparisonNew: [
      "AI handles routine operations, freeing you for strategy",
      "Recurring tasks automated, saving 20+ hours per week",
      "Automated marketing that runs on schedule, consistently",
      "AI trained on your business data gives trusted, relevant answers",
      "Data-driven insights enabling informed decisions in real time",
      "Scale your operations without scaling your headcount",
    ],
    // Testimonials Section
    testimonialsTitle: "What Our Clients Say",
    testimonialsSubtitle: "Real results from businesses that have adopted personalised AI with SingSingh AI.",
    testimonials: [
      {
        userName: "Jessica T.",
        review: "SingSingh AI reduced our accounting team's manual workload by more than 20 hours per week. Our records are always audit-ready and the team can focus on advisory work rather than data entry.",
        designation: "CFO, Financial Services",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        handle: "@jessicaT",
      },
      {
        userName: "Marcus L.",
        review: "Client onboarding went from two weeks to two days. The personalised AI handles document collection, compliance checks, and scheduling - effectively replacing three full-time roles.",
        designation: "Director, Professional Services",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        handle: "@marcusL",
      },
      {
        userName: "Sarah K.",
        review: "Our marketing is now consistent and automated. What previously required daily manual effort now runs on schedule without intervention. The difference in output quality has been significant.",
        designation: "Owner, E-commerce Retail",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        handle: "@sarahK",
      },
      {
        userName: "David P.",
        review: "The AI they built actually understands our business. It knows our processes, our clients, and our terminology. We stopped getting generic responses the moment we switched from off-the-shelf tools.",
        designation: "Managing Director, Property Management",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        handle: "@davidP",
      },
      {
        userName: "Priya N.",
        review: "Compliance documentation used to take our team days every month. SingSingh AI automated the entire process - now it takes minutes, and the records are always accurate and complete.",
        designation: "Operations Manager, Healthcare",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
        handle: "@priyaN",
      },
    ],
    // FAQ Section
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "How is SingSingh AI different from ChatGPT?",
        a: "ChatGPT is a general-purpose AI designed to answer any question for any user. SingSingh AI builds personalised solutions trained on your specific business data - your processes, your clients, your workflows. The result is AI that provides accurate, contextually relevant answers for your business, not generic responses built for the masses.",
      },
      {
        q: "How quickly will we see results?",
        a: "Most clients begin to see measurable improvements within the first 30 days of deployment. The initial strategy meeting allows us to identify the highest-impact areas, so early wins are typically visible before full implementation is complete.",
      },
      {
        q: "Will this disrupt our existing operations?",
        a: "No. Our implementation process is designed to run in parallel with your current systems, ensuring business continuity throughout. There is no requirement to replace existing tools - we integrate with what you already use.",
      },
      {
        q: "What industries do you work with?",
        a: "We work with businesses across a broad range of industries including accounting and finance, professional services, legal, e-commerce and retail, healthcare, property management, marketing agencies, and any organisation with repetitive, time-consuming processes that would benefit from intelligent automation.",
      },
      {
        q: "Do we need technical expertise to use your solutions?",
        a: "No technical expertise is required. Our solutions are built to be used by your existing team without any specialist training. We handle all technical setup, integration, and ongoing maintenance.",
      },
      {
        q: "How is our data protected?",
        a: "All data is handled with enterprise-grade security protocols, fully compliant with applicable privacy regulations. Your business data is used exclusively to power your personalised AI solution and is never shared with third parties.",
      },
    ],
    // CTA Section
    ctaTitle: "Ready to Transform Your Business?",
    ctaDescription: "Book a strategy meeting to discuss how personalised AI can reduce costs and increase efficiency across your operations.",
    ctaButton: "Book Your Strategy Meeting",
    ctaSecondary: "Contact Us",
    ctaFree: "No Obligation",
    ctaInstant: "Personalised",
    ctaQuick: "Strategy",
    // Footer
    footerTitle: "SING SINGH",
    footerDescription: "Personalised AI solutions provider helping businesses reduce costs, automate operations, and scale with confidence.",
    services: ["AI Marketing Automation", "AI Compliance & Documentation", "AI Business Operations"],
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
    quizResultsTitle: "Based on your answers, here's where AI can immediately improve your business",
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
    quizScheduleCall: "Schedule a 15-minute strategy call to review your specific workflows and build your custom implementation plan.",
    quizTimeWasted: "Time Currently Wasted",
    severityCritical: "CRITICAL",
    severityHigh: "HIGH",
    severityMedium: "MEDIUM",
    severityLow: "LOW",
  },
  zh: {
    brandName: "SING SINGH",
    tagline: "更智能的AI，可扩展的业务",
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
    badge: "SingSinghAI让您业务增长5倍快。",
    heroTitle1: "Grow Your Business",
    heroTitle2: "with AI Intelligence",
    heroDescription: "SingSingh AI打造专属AI，帮您省下大量时间，同时提升业务效率3倍。",
    heroCTA: "预约免费咨询",
    heroSecondary: "运行AI评估",
    heroScroll: "向下滚动探索",
    problemTitle: "为什么扩展如此困难",
    problemSubtitle: "手动流程制造无形天花板。AI打破它们。",
    problems: [
      { title: "持续救火", description: "运营消耗您的时间，留不下战略增长的空间。", stats: "80%每周损失6+小时" },
      { title: "重复手动工作", description: "数据录入窃取了可以驱动收入的小时。", stats: "每周浪费23小时" },
      { title: "缺乏实时可见性", description: "没有数据洞察的直觉决策限制增长。", stats: "67%缺乏实时情报" },
      { title: "扩展=招聘", description: "增长需要昂贵的人力而不是智能系统。", stats: "2倍增长需要3倍员工" },
    ],
    solutionTitle: "AI带来实际成果",
    solutionSubtitle: "为您的具体业务挑战量身定制的智能系统。",
    solutions: [
      { title: "智能运营", description: "AI自动化80%的手动任务并提供完全可见性。", features: ["客户入职", "任务优先级", "绩效跟踪"] },
      { title: "数据驱动决策", description: "定制AI分析揭示隐藏的增长机会。", features: ["收入预测", "客户洞察", "竞争情报"] },
      { title: "可扩展增长", description: "AI系统随着您的增长自动适应。", features: ["资源分配", "扩展触发", "优化"] },
    ],
    howItWorksTitle: "如何运作",
    howItWorksSubtitle: "简单4步流程，轻松开始。",
    phases: [
      { step: "1. 告诉我们您的需求", description: "与我们分享您的目标和挑战。", details: ["快速沟通", "了解需求", "发现机会"], duration: "第1周" },
      { step: "2. 我们为您构建", description: "我们的团队为您的业务打造定制AI工具。", details: ["定制设置", "轻松集成", "实时仪表板"], duration: "第2-4周" },
      { step: "3. 看到成果", description: "见证您的业务运行更顺畅、更高效。", details: ["追踪进度", "衡量节省", "获取报告"], duration: "第5周+" },
      { step: "4. AI越来越懂您", description: "您的AI会随着时间变得更智能，更了解您。", details: ["学习您的风格", "适应您的需求", "持续改进"], duration: "持续进行" },
    ],
    caseStudiesTitle: "我们帮助像您这样的企业",
    caseStudiesSubtitle: "真实的解决方案，解决真实的问题。看看我们如何让工作更轻松。",
    useCases: [
      { industry: "会计与金融", challenge: "被收据淹没，花好几天对账，还担心出错", solution: "我们帮你扫描收据，自动分类整理，让账目完美无缺--让你安心睡好觉", processes: ["收据自动扫描分类", "账目自动匹配", "信托账户实时更新", "需要的文件随时就绪"], metrics: { primary: "95%", secondary: "3天→2小时", label: "省下时间", secondaryLabel: "每人" } },
      { industry: "专业服务", challenge: "新客户入职太慢，团队一直在追着要文件", solution: "我们帮你收集文件、检查合规、安排启动--让你专注真正的工作", processes: ["文件自动收集", "合规即时检查", "启动会议自动安排"], metrics: { primary: "2天", secondary: "5倍容量", label: "开始合作", secondaryLabel: "每人" } },
      { industry: "电商与零售", challenge: "不知道什么产品能卖，找客户像碰运气", solution: "我们帮你了解市场，找到爆款产品，精准触达对的客户", processes: ["市场调研帮你做好", "找到真正有人要的产品", "触达准备购买的客户"], metrics: { primary: "40%", secondary: "快2倍", label: "更多销售", secondaryLabel: "上市速度" } },
      { industry: "医疗与诊所", challenge: "患者不来，文书堆积，员工忙不过来", solution: "我们提醒患者、处理预约、搞定行政事务--让你的团队专注于照顾患者", processes: ["自动提醒患者", "轻松改约", "文书后台处理好"], metrics: { primary: "60%", secondary: "70%少工作", label: "更少爽约", secondaryLabel: "每位员工" } },
      { industry: "房产管理", challenge: "管理租房太累--租客问题、预订混乱、无尽的跟进", solution: "我们处理咨询、管理预订、让租客满意--不管是短租还是长租", processes: ["24/7回答租客问题", "预订自动管理", "跟进让人感觉贴心"], metrics: { primary: "3倍", secondary: "租客更满意", label: "更多预订", secondaryLabel: "更少烦恼" } },
      { industry: "营销机构", challenge: "数据到处都是，花几小时做报告，客户问'什么有效？'", solution: "我们把所有数据整合，自动生成报告，告诉你什么真正带来效果", processes: ["所有平台一目了然", "报告自动生成", "清楚看到什么有效"], metrics: { primary: "90%", secondary: "实时更新", label: "省下时间", secondaryLabel: "随时最新" } },
    ],
    proofTitle: "跨行业的真实成果",
    proofSubtitle: "选择AI自动化的企业的已验证影响",
    stats: [
      { value: "95%", label: "平均效率提升" },
      { value: "2-8周", label: "投资回报时间" },
      { value: "24/7", label: "系统正常运行时间" },
    ],
    industryResults: [
      { industry: "会计", result: "账目自动搞定，每次都准", impact: "95%少做手工活，随时准备审计" },
      { industry: "专业服务", result: "新客户几天就能上手，不用等几周", impact: "不用招人也能服务5倍的客户" },
      { industry: "电商与零售", result: "比客户更早知道他们想要什么", impact: "更快找到爆款，更聪明地触达市场" },
      { industry: "医疗与诊所", result: "患者准时来，文书自动消失", impact: "爽约减少60%，员工专注于护理" },
      { industry: "房产管理", result: "短租长租都能自己跑起来", impact: "租客满意，烦恼更少，订单更多" },
      { industry: "营销", result: "所有数据一目了然，洞察真正重要的", impact: "报告时间省90%，清楚什么有效" },
    ],
    comparisonTitle: "传统方式 vs AI方式",
    comparisonLeft: "传统方式",
    comparisonRight: "使用SingSingh AI",
    comparisonOld: [
      "手动数据录入浪费大量时间",
      "反复催客户提供文件",
      "表格总出错、数据不及时",
      "报告要花好几天才能做好",
      "工作多了只能多招人",
      "没有数据，全靠感觉做决定",
    ],
    comparisonNew: [
      "AI几秒钟处理好数据",
      "文件自动收集整理",
      "实时仪表板，数据随时最新",
      "报告即时生成，随时可用",
      "AI处理5倍的工作量",
      "数据驱动洞察，助力增长",
    ],
    testimonialsTitle: "客户怎么说",
    testimonialsSubtitle: "来自我们帮助转型的企业的真实反馈。",
    testimonials: [
      {
        userName: "Jessica T.",
        review: "SingSingh AI每周为我们的会计团队节省了20多个小时。我们的账目现在随时可以审计，团队可以专注于咨询工作而不是数据录入。",
        designation: "首席财务官，金融服务",
      },
      {
        userName: "Marcus L.",
        review: "客户入职从两周缩短到两天。AI处理文件收集、合规检查和排期--就像多了3个员工。",
        designation: "总监，专业服务",
      },
      {
        userName: "Sarah K.",
        review: "我们终于能在进货前知道什么产品会卖。营销花费效率提高了40%，我们触达的都是真正会购买的客户。",
        designation: "老板，电商零售",
      },
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "多久能看到效果？", a: "你一找我们，我们就开始为你做AI助手，很快就能看到第一批成果！大部分客户30天内就感觉变化很大。" },
      { q: "会打乱我现在的工作吗？", a: "完全不会！我们一边跑新系统一边保持你原来的业务正常运行，一点不中断。" },
      { q: "你们帮哪些行业？", a: "我们帮会计师、房产中介、营销团队、医生诊所、网店，还有任何做重复工作的公司。" },
      { q: "我需要懂技术吗？", a: "不用！界面超简单，全部自动运行，你团队任何人都能用。" },
      { q: "我的数据安全吗？", a: "绝对安全！用银行级别的保护，完全符合国际隐私标准。" },
    ],
    ctaTitle: "准备更智能地增长吗？",
    ctaDescription: "开始免费AI评估。2分钟获得个性化增长路线图。",
    ctaButton: "开始免费评估",
    ctaSecondary: "预约咨询",
    ctaQuick: "2分钟",
    ctaFree: "100%免费",
    ctaInstant: "即时",
    footerTitle: "SING SINGH",
    footerDescription: "为雄心勃勃的公司提供AI驱动的业务转型",
    services: ["AI运营", "商业智能", "增长自动化"],
    company: ["关于", "职业", "博客"],
    contactPhone: "+61402733202",
    contactEmail1: "henry.ho@singsinghai.com.au",
    contactEmail2: "abhinav.singh@singsinghai.com.au",
    contactAddress: "布里斯班，昆士兰",
    copyright: "© 2025 Sing Singh AI Advisory。保留所有权利。",
    quizTitle: "AI准备度评估",
    quizGetResults: "获取您的结果",
    quizCustomRoadmap: "您的定制AI路线图",
    quizEnterDetails: "输入您的详细信息以查看您的个性化结果",
    quizName: "全名",
    quizEmail: "电子邮件地址",
    quizMobile: "手机号码（可选）",
    quizBookingInfo: "通过 Zoom 或 Google Meet 预订 15 分钟简短会议",
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
    quizResultsTitle: "根据您的答案，这些是AI可以立即改善您业务的地方",
    quizHoursWasted: "每周浪费小时数",
    quizAnnualSavings: "年度节省",
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
    quizScheduleCall: "安排15分钟策略电话，审查您的具体工作流程并构建您的定制实施计划。",
    quizTimeWasted: "当前浪费的时间",
    severityCritical: "紧急",
    severityHigh: "高",
    severityMedium: "中",
    severityLow: "低",
  },
};

export const SECTION_IDS = {
  howItWorks: "how-it-works",
  caseStudies: "case-studies",
  faq: "faq",
};

export const t = (key, lang = "en", replacements = {}) => {
  const validLang = lang === "zh" ? "zh" : "en";
  const keyParts = key.split(".");
  let result = translations[validLang];

  for (const part of keyParts) {
    if (result && typeof result === "object" && part in result) {
      result = result[part];
    } else {
      result = translations.en;
      for (const englishPart of keyParts) {
        if (result && typeof result === "object" && englishPart in result) {
          result = result[englishPart];
        } else { break; }
      }
      if (result === undefined || result === null) return key;
      break;
    }
  }

  if (result === undefined || result === null) return key;
  if (Array.isArray(result) || (typeof result === "object" && result !== null)) return result;

  if (typeof result === "string") {
    Object.keys(replacements).forEach((repKey) => {
      const regex = new RegExp(`\\{${repKey}\\}`, "g");
      result = result.replace(regex, replacements[repKey]);
    });
  }

  return result;
};
