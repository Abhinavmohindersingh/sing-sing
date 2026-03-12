// CommonJS copy of src/data/solutions.js for backend use

const AI_SOLUTIONS = {
  DATA_ENTRY: {
    name: "Intelligent Data Processing Agent",
    solves: "Manual data entry, receipt scanning, document processing",
    features: ["OCR receipt/invoice extraction", "Auto-categorisation with ML", "Duplicate detection", "Real-time data validation"],
    hoursPerWeek: 32,
    implementationWeeks: 2,
    cost: 500,
  },
  RECONCILIATION: {
    name: "Smart Reconciliation Agent",
    solves: "Time-consuming bank reconciliation, account matching",
    features: ["Automated transaction matching", "Cross-account reconciliation", "Discrepancy flagging", "Audit trail generation"],
    hoursPerWeek: 28,
    implementationWeeks: 3,
    cost: 600,
  },
  CUSTOMER_SUPPORT: {
    name: "24/7 Customer Service Agent",
    solves: "Slow response times, missed inquiries, after-hours support",
    features: ["Instant response to common questions", "Ticket creation & routing", "Order status lookup", "Escalation to humans when needed"],
    hoursPerWeek: 20,
    implementationWeeks: 3,
    cost: 800,
  },
  TRUST_ACCOUNTING: {
    name: "Trust Account Management Agent",
    solves: "Manual trust accounting, compliance tracking",
    features: ["Real-time balance monitoring", "IOLTA compliance checks", "Client statement generation", "Movement tracking & alerts"],
    hoursPerWeek: 25,
    implementationWeeks: 4,
    cost: 700,
  },
  SCHEDULING: {
    name: "Intelligent Scheduling Agent",
    solves: "Calendar chaos, no-shows, manual booking",
    features: ["Smart availability matching", "Automated reminders (SMS/Email)", "Self-service rescheduling", "No-show prediction & prevention"],
    hoursPerWeek: 15,
    implementationWeeks: 2,
    cost: 400,
  },
  REPORTING: {
    name: "Automated Reporting Agent",
    solves: "Manual report compilation, data aggregation",
    features: ["Real-time dashboard updates", "Multi-source data aggregation", "Custom report generation", "Scheduled delivery"],
    hoursPerWeek: 12,
    implementationWeeks: 3,
    cost: 500,
  },
  LEAD_QUALIFICATION: {
    name: "Lead Intelligence Agent",
    solves: "Time wasted on unqualified leads, slow follow-up",
    features: ["Auto lead scoring & qualification", "Instant follow-up sequences", "Meeting scheduling", "CRM auto-updates"],
    hoursPerWeek: 18,
    implementationWeeks: 2,
    cost: 600,
  },
  DOCUMENT_MANAGEMENT: {
    name: "Document Intelligence Agent",
    solves: "Manual filing, document search, compliance docs",
    features: ["Auto-filing by category", "Smart search & retrieval", "Version control", "Compliance tracking"],
    hoursPerWeek: 10,
    implementationWeeks: 3,
    cost: 450,
  },
};

function calculateROI(solutionKey, hourlyRate = 45, numStaff = 1) {
  const solution = AI_SOLUTIONS[solutionKey];
  if (!solution) return null;

  const weeklyHoursSaved = solution.hoursPerWeek * numStaff;
  const annualHoursSaved = weeklyHoursSaved * 52;
  const annualSavings = annualHoursSaved * hourlyRate;
  const annualAICost = solution.cost * 12;
  const netBenefit = annualSavings - annualAICost;
  const roiPercent = Math.round((netBenefit / annualAICost) * 100);
  const paybackMonths = parseFloat((annualAICost / (annualSavings / 12)).toFixed(1));

  return {
    solution_key: solutionKey,
    solution_name: solution.name,
    solves: solution.solves,
    features: solution.features,
    implementation_weeks: solution.implementationWeeks,
    monthly_ai_cost: solution.cost,
    roi_calculations: {
      weekly_hours_saved: weeklyHoursSaved,
      annual_hours_saved: annualHoursSaved,
      hourly_rate_used: hourlyRate,
      annual_savings_dollars: Math.round(annualSavings),
      annual_ai_cost_dollars: annualAICost,
      net_annual_benefit: Math.round(netBenefit),
      roi_percent: roiPercent,
      payback_months: paybackMonths,
    },
  };
}

module.exports = { AI_SOLUTIONS, calculateROI };
