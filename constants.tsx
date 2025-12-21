import { AgentItem, GoalType, Horizon } from "./types";

export const ROADMAP_DATA: AgentItem[] = [
  // Q1 2026
  {
    id: "q1-1",
    title: "Employee and Company Information Agent",
    shortDescription: "Instant access to payroll records",
    fullDescription: "An agent responsible for maintaining the single source of truth. It ingests employee data updates from HRIS integrations and validates company tax profiles against local regulations.",
    horizon: Horizon.Q1,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-library"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 3m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 7.26a2.005 2.005 0 0 0 -1.012 1.737v10c0 1.1 .9 2 2 2h10c.75 0 1.158 -.385 1.5 -1" /><path d="M11 7h5" /><path d="M11 10h6" /><path d="M11 13h3" /></svg>',
    goals: [
      { type: GoalType.ACCURACY, value: "↑ Payroll Accuracy", description: "Data consistency across systems" }
    ],
    technicalDetails: ["Entity Resolution", "Real-time HRIS Sync"],
    whatItSolves: {
      paragraphs: [
        "Sprout Payroll hides employee and company information across several modules, forcing admins to jump between pages just to confirm details like salary, departments, recurring adjustments, tax setups, contributions, or company compliance settings.",
        "This agent brings all Payroll-specific employee and company information into a single conversational interface. Users can quickly retrieve what they need without hunting through the system.",
        "It simplifies lookups, reduces navigation time, and eliminates guesswork around where certain fields live."
      ]
    },
    howItDrives2026: {
      mau: "Daily micro-queries for salaries, adjustments, company tax profiles, contribution tables, and employee attributes encourage repeated use of the agent inside Payroll.",
      adoption: "This is the most accessible AI entry point in our ecosystem. It builds user trust by solving a common, low-risk pain: finding payroll information fast.",
      capacity: "Reduces time spent opening multiple modules (Employee Profile, Company Settings, Adjustments, Government Tables). Faster retrieval directly lowers admin overhead.",
      accuracy: "Surfaces the authoritative payroll record instantly, reducing errors caused by outdated mental notes, mis-clicks, or misremembered employee configurations."
    },
    chatScenarios: [
      {
        id: "s1",
        label: "Get Employee Profile",
        script: [
          { role: "user", text: "Pull up the complete payroll profile for Alex" },
          { role: "agent", text: "Found employee Alex Santos (Employee ID: EMP003). Here's their complete payroll profile:\n\n**Employment Details:**\n• Status: Active - Regular\n• Hire Date: 1/1/2024\n• Department: Finance Department\n• Position: Payroll Specialist\n• Pay Group: Rank and File\n• Work Hours: 8 hrs/day\n\n**Compensation:**\n• Basic Salary: ₱21,000.00/month\n• Work Days/Year: 261 days\n• Daily Allowance: ₱150.00 (non-taxable)\n• OT Computation: OT Table 1\n\n**Government Contributions:**\n• SSS: ₱581.30 (employee) | ₱1,260.00 (employer)\n• PhilHealth: ₱200.00 (employee) | ₱200.00 (employer)\n• HDMF: ₱200.00 (employee) | ₱200.00 (employer)\n\n**Government IDs:**\n• TIN: 921-674-582-016\n• SSS No.: 34-1234567-8\n• PhilHealth No.: 12-345678901-2\n• HDMF No.: 1234-5678-9012\n\nAll information verified and up to date ✓" },
          { role: "user", text: "What are the recurring adjustments that Alex has right now?" },
          { role: "agent", text: "Alex Santos currently has **3 active recurring adjustments**:\n\n**1. Monthly Internet Allowance**\n• Type: Taxable Allowance\n• Amount: ₱500.00/month\n• Status: Active since 2/1/2024\n• Next application: Current payroll cycle\n\n**2. Laptop Loan Deduction**\n• Type: Deduction\n• Amount: ₱1,200.00/month\n• Status: Active (8 of 12 payments completed)\n• Remaining balance: ₱4,800.00\n• End date: 9/30/2024\n\n**3. Transportation Subsidy**\n• Type: Non-taxable Allowance\n• Amount: ₱1,000.00/month\n• Status: Active since 1/1/2024\n• Next application: Current payroll cycle\n\nAll adjustments are set to auto-apply during payroll processing." },
          { role: "user", text: "When was Alex hired?" },
          { role: "agent", text: "Alex Santos was hired on **January 1, 2024**.\n\nThat means Alex has been with Sprout Solutions for approximately **10 months** as of today. They're currently classified as a Regular employee in the Finance Department." }
        ]
      }
    ]
  },
  {
    id: "q1-2",
    title: "Payroll Run Information Agent",
    shortDescription: "Fast lookup of run details",
    fullDescription: "Proactively collects attendance logs, commission sheets, and expense claims before the payroll cycle starts, flagging missing inputs automatically.",
    horizon: Horizon.Q1,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-receipt-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2" /><path d="M14 8h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5m2 0v1.5m0 -9v1.5" /></svg>',
    goals: [
      { type: GoalType.CAPACITY, value: "↑ Operational Capacity", description: "Faster payroll cycle initiation" }
    ],
    technicalDetails: ["Data Ingestion Pipeline", "Missing Information Classifier"],
    whatItSolves: {
      paragraphs: [
        "Sprout Payroll keeps all run information in one dashboard, which is great in theory until you remember users still have to open that dashboard, hunt for the right run, click into it, jump across tabs, and manually collect the details they need.",
        "Admins look up past runs, payout dates, coverage periods, statuses, and employee counts every single week, sometimes multiple times a day across multiple companies. These operational checks are part of the \"core payroll tasks\" that eat more time than the processing itself."
      ]
    },
    howItDrives2026: {
      mau: "Daily and weekly run lookups are high-frequency tasks, so shifting them into conversational queries naturally spikes repeated usage.",
      adoption: "This gives admins a simple, low-risk AI win. It handles a task they already do constantly, so adoption feels organic instead of forced.",
      capacity: "By removing all navigation and manual data-gathering from the dashboard, admins reclaim time spent on these recurring operational checks across companies.",
      accuracy: "The agent always returns the canonical run data, reducing mistakes caused by misreading dashboard sections or selecting the wrong run."
    },
    chatScenarios: [
      {
        id: "s1",
        label: "Check Payroll Run",
        script: [
          { role: "user", text: "Is the December 1-15 payroll run ready for approval?" },
          { role: "agent", text: "The **December 1-15, 2025 payroll run** is processing complete and ready for your review:\n\n**Run Overview:**\n• Company: Sprout Solutions\n• Period: 12/1/2025 - 12/15/2025\n• Employees Processed: 24\n• Total Gross Pay: ₱892,450.00\n• Total Net Pay: ₱681,230.50\n• Generated: 11/20/2025 at 09:07:29\n\n✅ **Validation Status:**\n• All timesheets submitted and approved\n• Government contributions calculated correctly\n• No negative net pay detected\n• Bank file ready for processing\n\n**Summary:**\n• Regular Employees: 20\n• Part-Time Employees: 4\n• Total Deductions: ₱211,219.50\n• Employer Contributions: ₱89,450.00\n\nReady to proceed with approval?" },
          { role: "user", text: "Show me Alex Santos's payroll details for this run" },
          { role: "agent", text: "Here's the complete payroll breakdown for **Alex Santos** (EMP003):\n\n**Employee Details:**\n• Position: Payroll Specialist\n• Department: Finance\n• Employment Status: Regular Full-Time\n• Basic Monthly Salary: ₱21,000.00\n\n**Earnings:**\n• Basic Salary (Semi-Monthly): ₱10,500.00\n• Daily Allowance (15 days): ₱2,250.00\n• Internet Allowance: ₱500.00\n• Transportation Subsidy: ₱1,000.00\n• **Gross Pay: ₱14,250.00**\n\n**Attendance:**\n• Days Worked: 10 days\n• Hours Worked: 80.00 hours\n• Days Absent: 0\n• Minutes Late: 0\n\n**Deductions:**\n• Withholding Tax: ₱847.50\n• SSS: ₱581.30\n• PhilHealth: ₱200.00\n• HDMF: ₱200.00\n• Laptop Loan: ₱1,200.00\n• **Total Deductions: ₱3,028.80**\n\n**Net Pay: ₱11,221.20**\n\nAll calculations verified and accurate ✓" },
          { role: "user", text: "Does Alex have any overtime pay this period?" },
          { role: "agent", text: "No, **Alex Santos (EMP003)** does not have overtime pay for this period.\n\n**Alex's Time Summary:**\n• Regular Hours: 80.00 hours (10 days × 8 hours)\n• Overtime Hours: 0.00 hours\n• Holiday Hours: 0.00 hours\n• Night Differential Hours: 0.00 hours\n\nAlex worked their standard schedule with no additional compensable hours beyond the regular 80 hours.\n\n**For Context:** In this payroll run, 3 employees from other departments logged overtime:\n• Mark Reyes (Operations): 12.5 OT hours = ₱1,875.00\n• Sarah Chen (Logistics): 18.0 OT hours = ₱2,340.00\n• David Lopez (IT): 8.0 OT hours = ₱1,200.00" }
        ]
      }
    ]
  },

  // Q2 2026
  {
    id: "q2-1",
    title: "Payroll Run Processing Agent",
    shortDescription: "End-to-end payroll computation",
    fullDescription: "The core autonomous worker that executes gross-to-net calculations, applies complex deduction logic, and prepares bank files without manual intervention.",
    horizon: Horizon.Q2,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-rocket"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" /><path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" /><path d="M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>',
    goals: [
      { type: GoalType.CAPACITY, value: "10× Operational Capacity", description: "Processing volume per instance" }
    ],
    technicalDetails: ["Distributed Calculation Engine", "Policy Rule Engine"],
    whatItSolves: {
      paragraphs: [
        "Payroll run setup is currently functional but still manual. Even when the payroll calendar contains all necessary information, admins must initiate every run themselves, select the correct coverage, choose the pay group, confirm the payout date, and repeat this across dozens of companies.",
        "This creates unnecessary repetitive work, especially since payroll processing happens only once or twice a month, but readiness checks and run setup tasks occur every cycle, across every company.",
        "The agent eliminates that manual initiation. It watches the payroll calendar, knows when a run is due, and prepares or suggests the payroll run proactively. The admin only needs to confirm, not rebuild the setup from scratch."
      ]
    },
    howItDrives2026: {
      mau: "Admins interact with payroll setup every cutoff. Turning this into a guided, conversational workflow increases repeated touchpoints with the agent.",
      adoption: "This agent clearly shows \"AI value\" because it removes a tedious step users have been doing for years. Adoption comes naturally because the user sees immediate time savings.",
      capacity: "It reduces the number of clicks, decisions, and manual checks required for each payroll run. Across multiple companies, this compounds into significant operational capacity gains.",
      accuracy: "By referencing the payroll calendar, previous run status, employee readiness, and pay group data, the agent consistently creates the correct run setup, reducing errors caused by misselecting periods or payout dates."
    },
    chatScenarios: [
      {
        id: "s1",
        label: "Execute Payroll",
        script: [
          { role: "user", text: "Process the next payroll run" },
          { role: "agent", text: "I'll process the payroll for the upcoming period. Based on your payroll calendar, the next run is:\n\n**Period:** December 16-31, 2025\n**Pay Date:** January 5, 2026\n**Employees:** 24 active employees\n\nWould you like me to proceed with this payroll run?" },
          { role: "user", text: "Yes, proceed" },
          { role: "agent", text: "Starting payroll processing for December 16-31, 2025...\n\n⏳ **Processing Status:**\n• Gathering timesheets and attendance data\n• Calculating gross pay and deductions\n• Validating government contributions\n\nProcessing in progress..." },
          { role: "user", text: "Verify Alex's attendance for this period" },
          { role: "agent", text: "**Alex Santos (EMP003) - Attendance Summary:**\n\n**December 16-31, 2025:**\n• Days Worked: 10 days\n• Hours Worked: 80.00 hours\n• Days Absent: 0\n• Late Instances: 0\n• Undertime: 0 minutes\n\n✅ Perfect attendance for this period. All required hours completed." },
          { role: "user", text: "Add a one-time Christmas bonus of ₱5,000 for Alex" },
          { role: "agent", text: "I'll add a one-time Christmas bonus for Alex Santos.\n\n**Adjustment Details:**\n• Employee: Alex Santos (EMP003)\n• Adjustment Type: One-Time Bonus\n• Description: Christmas Bonus\n• Amount: ₱5,000.00\n• Tax Treatment: Taxable\n\nThis will be included in the December 16-31 payroll. Confirm to apply?" },
          { role: "user", text: "Confirmed" },
          { role: "agent", text: "✅ Christmas bonus applied successfully.\n\n**Alex's Updated Pay Summary:**\n• Basic Salary: ₱10,500.00\n• Allowances: ₱3,750.00\n• Christmas Bonus: ₱5,000.00\n• **Gross Pay: ₱19,250.00**\n• Deductions: ₱3,247.50\n• **New Net Pay: ₱16,002.50** (increased by ₱3,780.00)\n\nContinuing payroll processing..." },
          { role: "agent", text: "🎉 **Payroll Processing Complete!**\n\n**December 16-31, 2025 Summary:**\n• Employees Processed: 24\n• Total Gross Pay: ₱913,700.00\n• Total Net Pay: ₱697,233.00\n• Status: **Pending Review**\n\nThe payroll is now in 'Pending' status awaiting your final approval.\n\nTo finalize: Review the payroll register, then click 'Approve & Process' to generate bank files and lock the payroll run." }
        ]
      }
    ]
  },
  {
    id: "q2-2",
    title: "Anomaly Detector Agent",
    shortDescription: "Real-time payroll error detection",
    fullDescription: "Audits every transaction in real-time, identifying outliers like 'Ghost Employees', excessive overtime, or sudden salary jumps before payment release.",
    horizon: Horizon.Q2,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bomb"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.349 5.349l3.301 3.301a1.2 1.2 0 0 1 0 1.698l-.972 .972a7.5 7.5 0 1 1 -5 -5l.972 -.972a1.2 1.2 0 0 1 1.698 0z" /><path d="M17 7l1.293 -1.293a2.414 2.414 0 0 0 .707 -1.707a1 1 0 0 1 1 -1h1" /><path d="M7 13a3 3 0 0 1 3 -3" /></svg>',
    goals: [
      { type: GoalType.ACCURACY, value: "↑ Payroll Accuracy", description: "Fraud attempt detection" }
    ],
    technicalDetails: ["Unsupervised Anomaly Detection", "Statistical outlier analysis"],
    whatItSolves: {
      paragraphs: [
        "Even though payroll runs only happen once or twice a month, the validation work around them happens constantly. Admins manually scan adjustment files, check OT patterns, cross-reference history, and hope nothing slips through.",
        "Right now, the only safety net is a post-run audit, which is basically too little, too late. Errors like excessive OT, unexpected bonuses, or suspicious adjustments go unnoticed until payout, triggering reprocessing, back-and-forth emails, and employee frustration.",
        "This agent cuts through that mess. It reviews payroll data before computation, detects anomalies instantly, and flags anything that looks off. It replaces hours of manual review with real-time intelligence the moment data is uploaded."
      ]
    },
    howItDrives2026: {
      mau: "Every cutoff comes with multiple adjustment uploads, revisions, and checks. Turning these into proactive alerts ensures recurring interaction with the agent throughout the payroll cycle.",
      adoption: "This is the type of AI feature admins immediately trust—because it prevents embarrassing, costly mistakes. Once it saves someone from a bad run, they're hooked.",
      capacity: "Eliminates repetitive manual verification of bulk uploads, historical comparisons, and data sanity checks. The agent handles all the heavy validation work upfront.",
      accuracy: "By detecting outliers before they poison a run, the agent drastically reduces payroll errors, reprocessing incidents, and employee disputes. It becomes a quality-control layer that protects both admins and employees."
    },
    chatScenarios: [
      {
        id: "s1",
        label: "Audit Payroll Run",
        script: [
          { role: "user", text: "Scan the December 16-31 payroll run for anomalies" },
          { role: "agent", text: "🔍 Running anomaly detection on the **December 16-31, 2025** payroll run...\n\n**Scan Complete**\n\n✅ **Overall Status:** Low Risk\n\n**Anomalies Detected:** 2 items flagged for review\n• 1 Medium-Risk anomaly\n• 1 Low-Risk anomaly\n\nWould you like to see the detailed breakdown?" },
          { role: "user", text: "Yes, show me the details" },
          { role: "agent", text: "**Anomaly Report - December 16-31, 2025**\n\n⚠️ **Medium Risk:**\n\n**1. Unusual Salary Variance**\n• Employee: Alex Santos (EMP003)\n• Issue: Net pay increased by 34.7% vs. previous period\n• Previous Net: ₱11,221.20 → Current: ₱16,002.50\n• Difference: +₱4,781.30\n• Reason Detected: One-time adjustment added (Christmas Bonus: ₱5,000.00)\n\n🔵 **Low Risk:**\n\n**2. First-Time Deduction**\n• Employee: Maria Cruz (EMP015)\n• Issue: New deduction category appeared\n• Type: Loan Deduction\n• Amount: ₱2,500.00\n• Reason: Recently approved employee loan" },
          { role: "user", text: "Is Alex's variance legitimate?" },
          { role: "agent", text: "✅ **Yes, Alex's variance is legitimate.**\n\n**Verification Results:**\n• Adjustment was manually added during payroll processing on 11/20/2025 at 09:15:43\n• Added by: Admin User (You)\n• Adjustment Type: One-Time Bonus - Christmas Bonus\n• Amount: ₱5,000.00 (Taxable)\n• Approval Status: Confirmed\n\n**Calculation Breakdown:**\n• Bonus Amount: ₱5,000.00\n• Withholding Tax Applied: ₱1,219.50\n• Net Impact: +₱3,780.50 (matches the variance)\n\nThis anomaly is **expected and authorized**. No action needed." },
          { role: "user", text: "Check if there are any duplicate payments in this run" },
          { role: "agent", text: "🔎 Scanning for duplicate payments...\n\n✅ **No duplicate payments detected.**\n\n**Validation Results:**\n• All 24 employee IDs are unique\n• No duplicate bank account numbers found\n• No identical net pay amounts to the same recipient\n• All payment references are unique\n\n**Additional Checks:**\n• Cross-referenced with previous 3 payroll runs\n• No employees paid twice across periods\n• All TIN numbers validated and unique\n\nPayroll integrity verified." },
          { role: "user", text: "Are there any employees with zero or negative net pay?" },
          { role: "agent", text: "✅ **No employees with zero or negative net pay found.**\n\n**Net Pay Range Analysis:**\n• Lowest Net Pay: ₱8,450.00 (Part-time employee)\n• Highest Net Pay: ₱42,380.50 (Senior Manager)\n• Average Net Pay: ₱29,051.38\n• Median Net Pay: ₱23,500.00\n\n**All 24 employees** have positive net pay amounts and are within expected ranges for their positions and employment status.\n\nNo salary deduction issues detected." },
          { role: "agent", text: "📊 **Final Anomaly Assessment**\n\n**December 16-31, 2025 Payroll Run:**\n\n✅ **Audit Status: PASSED**\n\n**Summary:**\n• 2 anomalies detected (both explained)\n• 0 critical risks\n• 0 fraud indicators\n• 0 duplicate payments\n• 0 negative pay issues\n\n**Recommendation:** This payroll run is **safe to approve**. All flagged anomalies have legitimate explanations and proper documentation.\n\nReady to proceed with final approval and disbursement." }
        ]
      }
    ]
  },

  // Q3 2026
  {
    id: "q3-1",
    title: "Payroll Computation Explainer Agent",
    shortDescription: "Clear breakdown of computed pay",
    fullDescription: "Generates natural language explanations for every line item on a payslip, resolving employee queries about tax brackets, pro-rated pay, or deductions instantly.",
    horizon: Horizon.Q3,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-zoom-question"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /><path d="M10 13l0 .01" /><path d="M10 10a1.5 1.5 0 1 0 -1.14 -2.474" /></svg>',
    goals: [
      { type: GoalType.CAPACITY, value: "↓ Support Workload", description: "Reduction in support tickets" }
    ],
    technicalDetails: ["Explainable AI (XAI)", "Natural Language Generation"],
    whatItSolves: {
      paragraphs: [
        "Sprout Payroll computes results accurately, but admins still struggle to understand how those results were produced. The formulas, contribution logic, tax brackets, prorations, and historical balances live across multiple modules, which forces admins to manually reconstruct the logic whenever something looks off.",
        "These explanation tasks happen every cutoff, for multiple employees, across multiple companies. They're part of the operational payroll workload that eats hours every period, even though actual payroll processing only happens once or twice a month.",
        "This agent turns complex computations into clear, step-by-step explanations. It retrieves the right figures and tells the admin exactly why a number is what it is—no more backtracking, cross-checking tables, or raising support tickets."
      ]
    },
    howItDrives2026: {
      mau: "Computation explanations are requested frequently across every payroll cycle. Turning these clarifications into conversational queries generates consistent, recurring usage.",
      adoption: "Admins trust features that demystify payroll logic. Once the agent correctly explains a confusing computation, it becomes indispensable for audits and validations.",
      capacity: "Removes hours spent reconstructing formulas, checking TRAIN brackets manually, verifying SSS/PHIC/Pag-IBIG tables, or opening multiple reports just to clarify a single result.",
      accuracy: "The agent ensures users validate the correct logic, reducing misinterpretations that cause unnecessary adjustments, disputes, or support escalations."
    },
    chatScenarios: [
      {
        id: "s1",
        label: "Explain Payroll Computation",
        script: [
          { role: "user", text: "Explain how Alex's gross pay was calculated for December 16-31" },
          { role: "agent", text: "I'll break down **Alex Santos's gross pay computation** for December 16-31, 2025.\n\n**Gross Pay: ₱19,250.00**\n\nHere's how we calculated it:\n\n**1. Basic Salary (Semi-Monthly)**\n• Monthly Rate: ₱21,000.00\n• Formula: Monthly Rate ÷ 2\n• Calculation: ₱21,000.00 ÷ 2 = **₱10,500.00**\n\n**2. Daily Allowance**\n• Daily Rate: ₱150.00 (non-taxable)\n• Days Worked: 10 days\n• Formula: Daily Rate × Days Worked\n• Calculation: ₱150.00 × 10 = **₱1,500.00**\n\nWait, I need to recalculate this based on the attendance..." },
          { role: "user", text: "Continue with the breakdown" },
          { role: "agent", text: "**Updated Daily Allowance:**\n• Daily Rate: ₱150.00\n• Days Present: 10 days (no absences)\n• Calculation: ₱150.00 × 10 = **₱1,500.00**\n\n**3. Recurring Allowances:**\n• Internet Allowance: **₱500.00** (monthly, taxable)\n• Transportation Subsidy: **₱1,000.00** (monthly, non-taxable)\n\n**4. One-Time Adjustments:**\n• Christmas Bonus: **₱5,000.00** (taxable)\n• Applied on: 11/20/2025 at 09:15:43\n\n**Total Gross Pay Formula:**\nGross = Basic Salary + Daily Allowance + Internet + Transportation + Bonus\nGross = ₱10,500 + ₱1,500 + ₱500 + ₱1,000 + ₱5,000\nGross = **₱18,500.00**\n\nWait, let me verify the daily allowance calculation..." },
          { role: "user", text: "How is the withholding tax computed?" },
          { role: "agent", text: "Let me explain **Alex's withholding tax computation** of ₱847.50.\n\n**Taxable Income Calculation:**\n\n**Taxable Earnings:**\n• Basic Salary: ₱10,500.00 ✓\n• Internet Allowance: ₱500.00 ✓\n• Christmas Bonus: ₱5,000.00 ✓\n• **Subtotal Taxable: ₱16,000.00**\n\n**Non-Taxable Earnings:**\n• Daily Allowance: ₱1,500.00 (de minimis)\n• Transportation Subsidy: ₱1,000.00 (de minimis)\n\n**Government Contributions (Pre-Tax Deductions):**\n• SSS: ₱581.30\n• PhilHealth: ₱200.00\n• HDMF: ₱200.00\n• **Total Contributions: ₱981.30**\n\n**Taxable Income Formula:**\nTaxable Income = Taxable Earnings - Government Contributions\nTaxable Income = ₱16,000.00 - ₱981.30 = **₱15,018.70**" },
          { role: "user", text: "What tax bracket does that fall under?" },
          { role: "agent", text: "Based on **₱15,018.70 taxable income**, Alex falls under the Philippines BIR tax table:\n\n**Semi-Monthly Tax Bracket:**\n• Range: ₱10,417 - ₱16,666\n• Base Tax: ₱0.00\n• Tax Rate: 15% of excess over ₱10,417\n\n**Withholding Tax Calculation:**\n\n**Step 1:** Calculate excess\nExcess = ₱15,018.70 - ₱10,417.00 = **₱4,601.70**\n\n**Step 2:** Apply tax rate\nTax = Base Tax + (Excess × Rate)\nTax = ₱0.00 + (₱4,601.70 × 15%)\nTax = ₱0.00 + ₱690.26\nTax = **₱690.26**\n\nHowever, with the Christmas bonus included, the annualized projection pushes some income into a higher effective rate, resulting in the actual withholding of **₱847.50** to prevent under-withholding." },
          { role: "user", text: "Explain the SSS contribution calculation" },
          { role: "agent", text: "Let me break down **Alex's SSS contribution** of ₱581.30.\n\n**SSS Contribution Formula:**\n\n**Contribution Basis:**\n• Basic Monthly Salary: ₱21,000.00\n• SSS uses the monthly salary to determine the contribution bracket\n\n**SSS Bracket Lookup:**\n• Monthly Salary Bracket: ₱20,750 - ₱21,250\n• Monthly Salary Credit: ₱21,000.00\n\n**Employee Share Calculation:**\n• Employee Rate: 4.5% of Monthly Salary Credit\n• Formula: ₱21,000.00 × 4.5% = ₱945.00 (monthly)\n• **Semi-Monthly: ₱945.00 ÷ 2 = ₱472.50**\n\nWait, that doesn't match ₱581.30. Let me check the actual SSS table..." },
          { role: "agent", text: "**Correction - Actual SSS Calculation:**\n\nAfter checking the 2025 SSS contribution table:\n\n**Monthly Salary Credit: ₱21,000.00**\n\n**Total Monthly Contribution: ₱1,162.50**\n• Employee Share (50%): ₱581.25\n• Employer Share (50%): ₱581.25\n\n**Semi-Monthly Deduction:**\n• Formula: Monthly Employee Share ÷ 2\n• Calculation: ₱1,162.50 × 50% ÷ 2\n• Result: **₱581.30** (rounded)\n\nThe SSS uses a fixed contribution table based on salary brackets, not a simple percentage. For the ₱21,000 bracket, the total contribution is ₱1,162.50 monthly, split equally between employee and employer." },
          { role: "user", text: "Show me the final net pay calculation" },
          { role: "agent", text: "Here's **Alex's complete net pay computation** for December 16-31, 2025:\n\n**EARNINGS**\n• Basic Salary: ₱10,500.00\n• Daily Allowance: ₱2,250.00 (₱150 × 15 days)\n• Internet Allowance: ₱500.00\n• Transportation Subsidy: ₱1,000.00\n• Christmas Bonus: ₱5,000.00\n**Gross Pay: ₱19,250.00**\n\n**DEDUCTIONS**\n• Withholding Tax: ₱847.50\n• SSS: ₱581.30\n• PhilHealth: ₱200.00\n• HDMF: ₱200.00\n• Laptop Loan: ₱1,200.00\n**Total Deductions: ₱3,028.80**\n\n**NET PAY FORMULA:**\nNet Pay = Gross Pay - Total Deductions\nNet Pay = ₱19,250.00 - ₱3,028.80\n**Net Pay = ₱16,221.20**\n\nThis is the amount that will be deposited to Alex's bank account on January 5, 2026." }
        ]
      }
    ]
  },
  {
    id: "q3-2",
    title: "Payroll Insights Agent",
    shortDescription: "Actionable workforce payroll analytics",
    fullDescription: "Turns payroll data into business intelligence. Identifies trends in labor costs, overtime leakage, and turnover costs to help CFOs make better decisions.",
    horizon: Horizon.Q3,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chart-area-line"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 19l4 -6l4 2l4 -5l4 4l0 5l-16 0" /><path d="M4 12l3 -4l4 2l5 -6l4 4" /></svg>',
    goals: [
      { type: GoalType.MAU, value: "↑ MAU Growth", description: "Finance executive engagement" }
    ],
    technicalDetails: ["Predictive Modeling", "Trend Analysis"],
    whatItSolves: {
      paragraphs: [
        "Validating payroll runs usually means downloading multiple reports, comparing spreadsheets, and manually scanning for spikes or unexpected changes in gross pay, deductions, or headcount. These comparisons happen every cutoff across every company, making them one of the most time-consuming operational payroll tasks, even though payroll is only processed once or twice a month.",
        "Because insights are buried in separate run reports, admins rely on gut feel or spot-checking instead of data-driven validation. This leads to reactive discovery of issues and delays payroll approval.",
        "This agent turns that process into an instant, conversational insight request. It analyzes run-to-run changes automatically, surfaces trends, highlights variances, and explains why they happened—eliminating manual comparison work entirely."
      ]
    },
    howItDrives2026: {
      mau: "Every payroll cycle involves multiple insight checks. Converting these into quick conversational requests increases recurring, predictable agent usage.",
      adoption: "This agent delivers immediate value by saving admins from tedious report comparison. It becomes a natural next step after using Information and Explainer agents.",
      capacity: "It automates one of the biggest time sinks in payroll validation: variance analysis. Admins no longer need to cross-check previous runs or hunt for the cause of spikes.",
      accuracy: "By surfacing outliers and explaining increases or decreases in totals, the agent reduces approval errors and flags issues before they become payout problems."
    },
    chatScenarios: [
      {
        id: "s1",
        label: "Analyze Payroll Trends",
        script: [
          { role: "user", text: "Analyze the December 16-31 payroll run and identify key trends" },
          { role: "agent", text: "I've analyzed the **December 16-31, 2025** payroll run and compared it to the previous 6 periods. Here are the key insights:\n\n📈 **Key Trends Identified:**\n\n**1. Total Payroll Cost Increase**\n• Current Period: ₱913,700.00\n• Previous Period (Dec 1-15): ₱892,450.00\n• Change: **+₱21,250.00 (+2.4%)**\n\n**2. One-Time Adjustments Spike**\n• Christmas bonuses added: ₱120,000.00 total\n• Affecting 24 employees\n• This is **seasonal and expected**\n\n**3. Average Net Pay Growth**\n• Current: ₱29,051.38 per employee\n• 6-Month Average: ₱27,840.50\n• Growth: **+4.3%**\n\nWould you like me to drill deeper into any specific area?" },
          { role: "user", text: "What's driving the increase in average net pay?" },
          { role: "agent", text: "Let me break down the **drivers of the 4.3% net pay increase**:\n\n**Primary Drivers:**\n\n**1. Recurring Adjustments Growth (+₱45,500/period)**\n• New internet allowances: 3 employees @ ₱500 = ₱1,500\n• Transportation subsidies increased: 8 employees saw ₱200 increase\n• Total recurring impact: **₱2,900/employee/month**\n\n**2. Merit Increases (October 2025)**\n• 6 employees received 5-8% salary increases\n• Finance Dept: 2 employees (+7% average)\n• Operations: 4 employees (+6% average)\n• Annualized impact: **₱378,000**\n\n**3. Reduced Deductions**\n• 4 employees completed loan repayments in November\n• Average loan deduction was ₱1,800/period\n• Net pay impact: **+₱7,200 total**\n\n**4. Christmas Bonuses (December only)**\n• One-time ₱5,000 per employee\n• After-tax impact: ~₱3,780 per employee\n• **This is temporary** - will normalize in January" },
          { role: "user", text: "Compare government contributions to the previous quarter" },
          { role: "agent", text: "Here's a **government contributions comparison** for Q4 2025:\n\n**December 16-31, 2025 (Current)**\n• SSS: ₱13,951.20 (employee) | ₱30,240.00 (employer)\n• PhilHealth: ₱4,800.00 (employee) | ₱4,800.00 (employer)\n• HDMF: ₱4,800.00 (employee) | ₱4,800.00 (employer)\n• **Total Contributions: ₱63,391.20**\n\n**Q3 2025 Average (Per Period)**\n• SSS: ₱13,425.50 | ₱29,125.00\n• PhilHealth: ₱4,800.00 | ₱4,800.00\n• HDMF: ₱4,800.00 | ₱4,800.00\n• **Total: ₱61,750.50**\n\n**Quarter-over-Quarter Change:**\n• SSS: **+₱1,640.70 (+2.7%)** - driven by merit increases\n• PhilHealth: No change (fixed ₱200/employee)\n• HDMF: No change (fixed ₱200/employee)\n\n**Insight:** SSS contributions are growing because salary increases push employees into higher contribution brackets. This trend will continue with planned Q1 2026 adjustments." },
          { role: "user", text: "Are there any cost optimization opportunities?" },
          { role: "agent", text: "Based on my analysis of the last 6 payroll periods, I've identified **3 cost optimization opportunities**:\n\n💡 **Opportunity 1: Overtime Reduction**\n• Current OT Cost: ₱89,500/month (3 employees with 12+ OT hours)\n• Trend: +18% vs. Q3 average\n• **Recommendation:** Consider hiring 1 part-time employee in Operations\n• Projected Savings: ₱35,000/month (₱420K annually)\n\n💡 **Opportunity 2: De Minimis Benefit Optimization**\n• Current: Only 65% of employees receive transportation allowance\n• **Recommendation:** Standardize ₱1,000 transport subsidy (non-taxable)\n• Tax Impact: Reduces taxable income by ₱12,000/employee/year\n• Employee Value: ~₱1,800 tax savings per employee\n• Cost: Neutral (rebalance from taxable allowances)\n\n💡 **Opportunity 3: Loan Program Review**\n• 8 employees completed loans in Q4\n• Average deduction: ₱1,500/period\n• **Recommendation:** Consider 0% employee loan program for retention\n• Current external lending: Employees paying 8-12% interest elsewhere\n• Engagement Impact: High employee satisfaction driver" },
          { role: "user", text: "Project the total payroll cost for January 2026" },
          { role: "agent", text: "Let me project **January 2026 payroll costs** based on current trends:\n\n📊 **January 2026 Projection**\n\n**Base Assumptions:**\n• Current headcount: 24 employees\n• No planned hires in January\n• Christmas bonuses removed (one-time)\n• All recurring adjustments continue\n\n**Projected Costs (Per Period - Semi-Monthly):**\n\n**Gross Payroll:**\n• Basic Salaries: ₱504,000.00\n• Recurring Allowances: ₱84,000.00\n• One-Time Adjustments: ₱0.00 (no bonuses)\n• **Total Gross: ₱588,000.00**\n\n**Employer Contributions:**\n• SSS Employer: ₱30,240.00\n• PhilHealth Employer: ₱4,800.00\n• HDMF Employer: ₱4,800.00\n• **Total Employer Cost: ₱39,840.00**\n\n**Total Payroll Cost: ₱627,840.00**\n\n**Comparison to December 16-31:**\n• December: ₱913,700.00 (with bonuses)\n• January: ₱627,840.00\n• **Decrease: -₱285,860.00 (-31.3%)**\n\nThis decrease is expected due to the removal of Christmas bonuses." },
          { role: "agent", text: "📈 **Additional Insights for January 2026:**\n\n**Forecasted Metrics:**\n• Average Net Pay: ₱24,510.00 per employee (-15.6% vs. December due to bonus removal)\n• Total Net Disbursement: ₱588,240.00\n• Employer Burden Rate: 6.8% of gross payroll\n\n**Upcoming Considerations:**\n\n⚠️ **Q1 2026 Planned Changes:**\n• Minimum wage adjustment (expected +₱30/day effective Feb 1)\n• 3 probationary employees converting to regular (benefits eligibility)\n• Annual SSS contribution table update (effective January 1)\n\n**Budget Forecast:**\n• January: ₱1,255,680 (both periods)\n• February: ₱1,298,400 (wage adjustment impact)\n• March: ₱1,312,500\n• **Q1 2026 Total: ₱3,866,580**\n\nWould you like me to create a detailed Q1 budget breakdown?" }
        ]
      }
    ]
  },

  // Q4 2026
  {
    id: "q4-1",
    title: "Payroll Reports Generator Agent",
    shortDescription: "Automated compliance report generation",
    fullDescription: "Automatically compiles and submits statutory government forms, general ledger files for accounting, and custom internal reports on schedule.",
    horizon: Horizon.Q4,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>',
    goals: [
      { type: GoalType.CAPACITY, value: "Auto Operational Capacity", description: "Zero-touch submission" }
    ],
    technicalDetails: ["Document Generation", "Integration Connectors"],
    whatItSolves: {
      paragraphs: [
        "Admins constantly download reports: payroll summaries, government forms, BIR files, loan reports, contribution reports, year-end files, and employee-level breakdowns. Even though each report is easy to generate, the repetition is the real time sink. Every cutoff, every audit, every employee inquiry requires another trip into the Reports module, more filtering, more downloading.",
        "These report-related tasks are part of the weekly and monthly operational workload that eats far more time than the payroll run itself.",
        "This agent removes that friction. Users simply request the report they need, and the agent generates it, fetches it, and returns a direct download link—no navigation, no menus, no filters."
      ]
    },
    howItDrives2026: {
      mau: "Reports are requested constantly: every cutoff, every audit, every employee inquiry. Turning these into conversational requests ensures steady, recurring usage.",
      adoption: "This is a zero-friction feature. Users immediately experience convenience, making it one of the easiest AI capabilities to adopt across Payroll.",
      capacity: "It cuts out repetitive menu navigation and filtering. Across dozens of companies and hundreds of reports each month, the time saved compounds heavily.",
      accuracy: "By fetching reports using the correct filters and run metadata, the agent reduces human error from incorrect selections or mismatched date ranges."
    },
    chatScenarios: [
      {
        id: "s1",
        label: "Generate December Reports",
        script: [
          { role: "user", text: "Generate all reports for the December 16-31 payroll run." },
          { role: "agent", text: "Starting report generation for December 16-31, 2025 payroll.\n\n**Payroll Summary Report**\nTotal Employees: 847\nTotal Gross Pay: ₱18,456,230.50\nTotal Net Pay: ₱14,892,184.75\n\n⬇️ **[Click to Download]** payroll-summary-dec-16-31-2025.pdf" },
          { role: "user", text: "Can you generate the general ledger file for this payroll?" },
          { role: "agent", text: "Generating GL entries for December 16-31 payroll...\n\n**GL File Created:**\n- Salaries & Wages: ₱18,456,230.50 (DR)\n- SSS Payable: ₱1,845,623.00 (CR)\n- PhilHealth Payable: ₱738,249.00 (CR)\n- Pag-IBIG Payable: ₱423,140.00 (CR)\n- Withholding Tax Payable: ₱1,457,218.75 (CR)\n- Net Pay Clearing: ₱14,892,184.75 (CR)\n\n⬇️ **Download GL Files:**\n→ **[Click here]** payroll-gl-dec-16-31-2025.csv\n→ **[Click here]** payroll-gl-dec-16-31-2025.xlsx\n→ **[Click here]** payroll-gl-dec-16-31-2025.qbo" },
          { role: "user", text: "Perfect. Now I need the BIR Form 1601C for withholding tax." },
          { role: "agent", text: "Generating BIR Form 1601C - Monthly Remittance Return of Income Taxes Withheld on Compensation...\n\n**Form 1601C Summary:**\nTax Period: December 2025\nTotal Compensation: ₱18,456,230.50\nTotal Tax Withheld: ₱1,457,218.75\nNumber of Employees: 847\n\n⬇️ **[Download PDF]** BIR-Form-1601C-December-2025.pdf\n🌐 **[Submit to eBIRForms]**" },
          { role: "user", text: "What about SSS contributions? I need the R3 form." },
          { role: "agent", text: "Generating SSS Form R3 - Collection List...\n\n**SSS R3 Summary:**\nContribution Month: December 2025\nEmployee Share: ₱922,811.50\nEmployer Share: ₱922,811.50\nTotal Contributions: ₱1,845,623.00\nEC Fund: ₱84,700.00\nNumber of Members: 847\n\n⬇️ **[Download Excel]** SSS-R3-December-2025.xlsx\n(Includes itemized employee contribution list)" },
          { role: "user", text: "Can you also prepare the PhilHealth report?" },
          { role: "agent", text: "Generating PhilHealth RF-1 (Report of Premiums) for December 2025...\n\n**PhilHealth RF-1:**\nEmployee Contributions: ₱369,124.50\nEmployer Contributions: ₱369,124.50\nTotal Premium: ₱738,249.00\n\n⬇️ **[Download CSV]** PhilHealth-RF1-December-2025.csv\n🌐 **[Upload to PhilHealth Portal]**" }
        ]
      }
    ]
  }
];

export const JARVIS_ROADMAP_DATA: AgentItem[] = [
  // Q1 2026 - Employee Category
  {
    id: "jarvis-emp-q1-1",
    title: "Records Agent - Self-serve COE",
    shortDescription: "Coming soon",
    fullDescription: "Employee category agent - details to be added",
    horizon: Horizon.Q1,
    icon: "📋",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "Employee"
  },
  {
    id: "jarvis-emp-q1-2",
    title: "Records Agent - Personal information w/o files",
    shortDescription: "Coming soon",
    fullDescription: "Employee category agent - details to be added",
    horizon: Horizon.Q1,
    icon: "📋",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "Employee"
  },
  {
    id: "jarvis-emp-q1-3",
    title: "Attendance Agent - Break monitoring",
    shortDescription: "Coming soon",
    fullDescription: "Employee category agent - details to be added",
    horizon: Horizon.Q1,
    icon: "📅",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "Employee"
  },
  {
    id: "jarvis-emp-q1-4",
    title: "Attendance Agent - Leave filing",
    shortDescription: "Coming soon",
    fullDescription: "Employee category agent - details to be added",
    horizon: Horizon.Q1,
    icon: "📅",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "Employee"
  },
  // Q2 2026 - Employee Category
  {
    id: "jarvis-emp-q2-1",
    title: "Concierge Agent 2.0 - Agentic implementation",
    shortDescription: "Coming soon",
    fullDescription: "Employee category agent - details to be added",
    horizon: Horizon.Q2,
    icon: "💬",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "Employee"
  },
  {
    id: "jarvis-emp-q2-2",
    title: "Sidekick - Concierge in Sidekick",
    shortDescription: "Coming soon",
    fullDescription: "Employee category agent - details to be added",
    horizon: Horizon.Q2,
    icon: "💬",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "Employee"
  },
  // Q3 2026 - Employee Category
  {
    id: "jarvis-emp-q3-1",
    title: "Attendance Agent - OT/UT filing",
    shortDescription: "Coming soon",
    fullDescription: "Employee category agent - details to be added",
    horizon: Horizon.Q3,
    icon: "📅",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "Employee"
  },
  // Q4 2026 - Employee Category
  {
    id: "jarvis-emp-q4-1",
    title: "Records Agent - HR records",
    shortDescription: "Coming soon",
    fullDescription: "Employee category agent - details to be added",
    horizon: Horizon.Q4,
    icon: "📋",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "Employee"
  },
  // Q2 2026 - People Leader Category
  {
    id: "jarvis-pl-q2-1",
    title: "Pulse Agent - Sentiment collection",
    shortDescription: "Coming soon",
    fullDescription: "People Leader category agent - details to be added",
    horizon: Horizon.Q2,
    icon: "💭",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "People Leader",
    link: "https://www.figma.com/proto/eGQOJiZAaRMHsGxiTeNyDt/%F0%9F%94%B7%F0%9F%94%B6-Unified-Sidekick-Central--IN-PROG--HAND-OFF---Copy-?page-id=13%3A927&node-id=4994-19136&viewport=84%2C-173%2C0.13&t=xzZ9Wycr98Zfzbhk-8&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=4906%3A52842&hide-ui=1"
  },
  // Q3 2026 - People Leader Category
  {
    id: "jarvis-pl-q3-1",
    title: "Stand-up Agent - Daily/weekly updates collection",
    shortDescription: "Coming soon",
    fullDescription: "People Leader category agent - details to be added",
    horizon: Horizon.Q3,
    icon: "📊",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "People Leader",
    link: "https://www.figma.com/proto/eGQOJiZAaRMHsGxiTeNyDt/%F0%9F%94%B7%F0%9F%94%B6-Unified-Sidekick-Central--IN-PROG--HAND-OFF---Copy-?page-id=13%3A927&node-id=4994-15238&viewport=84%2C-173%2C0.13&t=xzZ9Wycr98Zfzbhk-8&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=4906%3A52842&hide-ui=1"
  },
  {
    id: "jarvis-pl-q3-2",
    title: "Insights Agent - Team insights for managers",
    shortDescription: "Coming soon",
    fullDescription: "People Leader category agent - details to be added",
    horizon: Horizon.Q3,
    icon: "📈",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "People Leader",
    link: "https://www.figma.com/proto/eGQOJiZAaRMHsGxiTeNyDt/%F0%9F%94%B7%F0%9F%94%B6-Unified-Sidekick-Central--IN-PROG--HAND-OFF---Copy-?page-id=13%3A927&node-id=4994-20018&viewport=84%2C-173%2C0.13&t=xzZ9Wycr98Zfzbhk-8&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=4906%3A52842&hide-ui=1"
  },
  // Q4 2026 - People Leader Category
  {
    id: "jarvis-pl-q4-1",
    title: "Career Agent - Individual KPI collection",
    shortDescription: "Coming soon",
    fullDescription: "People Leader category agent - details to be added",
    horizon: Horizon.Q4,
    icon: "🎯",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "People Leader",
    link: "https://www.figma.com/proto/eGQOJiZAaRMHsGxiTeNyDt/%F0%9F%94%B7%F0%9F%94%B6-Unified-Sidekick-Central--IN-PROG--HAND-OFF---Copy-?page-id=13%3A927&node-id=4994-17283&viewport=84%2C-173%2C0.13&t=xzZ9Wycr98Zfzbhk-8&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=4906%3A52842&hide-ui=1"
  },
  // Q1 2026 - HR Manager Category
  {
    id: "jarvis-hrm-q1-1",
    title: "Agent Analytics Module - Sidekick adoption",
    shortDescription: "Coming soon",
    fullDescription: "HR Manager category agent - details to be added",
    horizon: Horizon.Q1,
    icon: "📊",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "HR Manager"
  },
  {
    id: "jarvis-hrm-q1-2",
    title: "HR Desk Module - Employee ticket management",
    shortDescription: "Coming soon",
    fullDescription: "HR Manager category agent - details to be added",
    horizon: Horizon.Q1,
    icon: "🎫",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "HR Manager"
  },
  {
    id: "jarvis-hrm-q1-3",
    title: "Sidekick Central - Agent feature flag settings",
    shortDescription: "Coming soon",
    fullDescription: "HR Manager category agent - details to be added",
    horizon: Horizon.Q1,
    icon: "⚙️",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "HR Manager"
  },
  // Q2 2026 - HR Manager Category
  {
    id: "jarvis-hrm-q2-1",
    title: "Compliance Agent 2.0 - Agentic implementation",
    shortDescription: "Coming soon",
    fullDescription: "HR Manager category agent - details to be added",
    horizon: Horizon.Q2,
    icon: "✅",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "HR Manager"
  },
  {
    id: "jarvis-hrm-q2-2",
    title: "Agent Analytics Module - Sidekick ROI impact",
    shortDescription: "Coming soon",
    fullDescription: "HR Manager category agent - details to be added",
    horizon: Horizon.Q2,
    icon: "📊",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "HR Manager"
  },
  {
    id: "jarvis-hrm-q2-3",
    title: "Sidekick Central - New landing page",
    shortDescription: "Coming soon",
    fullDescription: "HR Manager category agent - details to be added",
    horizon: Horizon.Q2,
    icon: "🏠",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "HR Manager"
  },
  // Q3 2026 - HR Manager Category
  {
    id: "jarvis-hrm-q3-1",
    title: "Insights Agent - Company insights for admins",
    shortDescription: "Coming soon",
    fullDescription: "HR Manager category agent - details to be added",
    horizon: Horizon.Q3,
    icon: "📈",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "HR Manager"
  },
  // Q1 2026 - Sprout Internal Category
  {
    id: "jarvis-si-q1-1",
    title: "Info Agent 2.0 - Agentic implementation",
    shortDescription: "Coming soon",
    fullDescription: "Sprout Internal category agent - details to be added",
    horizon: Horizon.Q1,
    icon: "ℹ️",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "Sprout Internal"
  },
  {
    id: "jarvis-si-q1-2",
    title: "Direct Report Info Support - RBAC-based visibility",
    shortDescription: "Coming soon",
    fullDescription: "Sprout Internal category agent - details to be added",
    horizon: Horizon.Q1,
    icon: "🔐",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "Sprout Internal"
  },
  // Q3 2026 - Sprout Internal Category
  {
    id: "jarvis-si-q3-1",
    title: "Finance Agent - Sprout Finances support",
    shortDescription: "Coming soon",
    fullDescription: "Sprout Internal category agent - details to be added",
    horizon: Horizon.Q3,
    icon: "💰",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "Sprout Internal"
  },
  {
    id: "jarvis-si-q3-2",
    title: "Keeper Agent - Sprout Keeper insights",
    shortDescription: "Coming soon",
    fullDescription: "Sprout Internal category agent - details to be added",
    horizon: Horizon.Q3,
    icon: "🔑",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "Sprout Internal"
  },
  // Q4 2026 - Sprout Internal Category
  {
    id: "jarvis-si-q4-1",
    title: "Info Agent - CRF transactions*",
    shortDescription: "Coming soon",
    fullDescription: "Sprout Internal category agent - details to be added",
    horizon: Horizon.Q4,
    icon: "ℹ️",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "Sprout Internal"
  },
  {
    id: "jarvis-si-q4-2",
    title: "Upsell Agent - Sprout product upsell",
    shortDescription: "Coming soon",
    fullDescription: "Sprout Internal category agent - details to be added",
    horizon: Horizon.Q4,
    icon: "📈",
    goals: [{ type: GoalType.MAU, value: "TBD", description: "Placeholder" }],
    technicalDetails: ["Details coming soon"],
    chatScenarios: [],
    category: "Sprout Internal"
  }
];
