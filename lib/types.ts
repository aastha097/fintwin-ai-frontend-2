// User & Auth
export interface User {
  id: string;
  email: string;
  name: string;
}

// Chat & Conversation
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    agentSteps?: AgentStep[];
  };
}

export interface AgentStep {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  timestamp?: Date;
}

// Financial Data
export interface FinancialSummary {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySavings: number;
  healthScore: number;
  totalDebt: number;
  monthlyDebtPayment: number;
}

export interface RiskMetrics {
  overallRisk: number; // 0-100
  riskScore: string;
  recommendations: string[];
}

export interface QuickInsight {
  id: string;
  type: 'snapshot' | 'risk' | 'recommendation' | 'document' | 'scenario';
  title: string;
  description: string;
  data?: any;
}

// Scenario Simulation
export interface ScenarioOption {
  id: string;
  name: string;
  description: string;
}

export interface SimulationResult {
  scenario: string;
  projectedImpact: {
    monthlyPayment?: number;
    newNetWorth?: number;
    savingsGain?: number;
  };
  risks: string[];
  recommendation: string;
}

// Workspace State
export interface WorkspaceSession {
  id: string;
  userId: string;
  documentsProcessed: string[];
  conversationHistory: ChatMessage[];
  currentSummary: FinancialSummary;
  createdAt: Date;
}
