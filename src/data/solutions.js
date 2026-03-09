// AI Solutions database

export const AI_SOLUTIONS = {
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

export function analyzeGaps(answers, questions) {
  const categoryScores = {};
  const hoursWasted = {};

  Object.keys(AI_SOLUTIONS).forEach((category) => {
    categoryScores[category] = 0;
    hoursWasted[category] = 0;
  });

  answers.forEach((answer, index) => {
    const question = questions[index];
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
      severity: score > 18 ? "CRITICAL" : score > 12 ? "HIGH" : score > 6 ? "MEDIUM" : "LOW",
    }))
    .filter((gap) => gap.score > 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const totalHoursWasted = Object.values(hoursWasted).reduce((sum, h) => sum + h, 0);
  const totalScore = Object.values(categoryScores).reduce((sum, s) => sum + s, 0);
  const totalMonthlyCost = gaps.reduce((sum, gap) => sum + gap.solution.cost, 0);
  const totalHoursSaved = gaps.reduce((sum, gap) => sum + gap.solution.hoursPerWeek, 0);

  return {
    gaps,
    totalHoursWasted,
    totalScore,
    totalMonthlyCost,
    totalHoursSaved,
    overallSeverity: totalScore > 60 ? "CRITICAL" : totalScore > 40 ? "HIGH" : totalScore > 20 ? "MEDIUM" : "LOW",
  };
}

export function getScoreAnalysis(score) {
  if (score <= 35)
    return {
      level: "AI-Ready Leader",
      color: "#00ff88",
      message: "Your operations are optimised! AI can enhance efficiency further.",
      quickWins: ["Predictive analytics", "Advanced automation", "Strategic AI insights"],
      estimatedROI: "15-25% gains",
      timeline: "45-60 days",
    };
  if (score <= 70)
    return {
      level: "Prime for Transformation",
      color: "#00f5ff",
      message: "You're doing well but AI can unlock 20-40% more capacity.",
      quickWins: ["Client onboarding automation", "Operations dashboard", "Smart lead qualification"],
      estimatedROI: "30-50% gains",
      timeline: "60-90 days",
    };
  return {
    level: "High-Impact Opportunity",
    color: "#7c3aed",
    message: "AI can reclaim 25+ hours weekly and unlock exponential growth.",
    quickWins: ["80% admin automation", "Eliminate data entry", "AI customer engagement"],
    estimatedROI: "40-60% gains",
    timeline: "30-60 days",
  };
}
