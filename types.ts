export enum Horizon {
  Q1 = "Q1 2026",
  Q2 = "Q2 2026",
  Q3 = "Q3 2026",
  Q4 = "Q4 2026"
}

export enum GoalType {
  MAU = "MAU Growth",
  ADOPTION = "Feature Adoption",
  CAPACITY = "Operational Capacity",
  ACCURACY = "Payroll Accuracy"
}

export interface GoalMetric {
  type: GoalType;
  value: string; // e.g. "+15%"
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'agent';
  text: string;
}

export interface ChatScenario {
  id: string;
  label: string;
  script: ChatMessage[];
}

export interface AgentItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  horizon: Horizon;
  icon: string; // lucide icon name or emoji
  goals: GoalMetric[];
  technicalDetails: string[];
  chatScenarios: ChatScenario[];
  category?: string; // For Jarvis agents: 'Employee', 'People Leader', 'HR Manager', 'Sprout Internal'
  link?: string; // Optional external link for Jarvis feature cards
  // Profile content
  whatItSolves?: {
    paragraphs: string[];
  };
  howItDrives2026?: {
    mau: string;
    adoption: string;
    capacity: string;
    accuracy: string;
  };
}

export interface PressReleaseData {
  headline: string;
  body: string;
  quote: string;
}
