// User & Auth
export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role?: string;
}

// File Upload
export interface UploadedFile {
  id: string;
  name: string;
  type: 'financial_statement' | 'bank_data' | 'tax_return';
  uploadedAt: Date;
  size: number;
  status: 'processing' | 'completed' | 'failed';
}

// Financial Data
export interface FinancialSnapshot {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  liquidAssets: number;
  investedAssets: number;
}

export interface RiskProfile {
  overallRisk: number; // 0-100
  marketRisk: number;
  concentrationRisk: number;
  liquidityRisk: number;
  inflationRisk: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
}

export interface AssetAllocation {
  category: string;
  percentage: number;
  value: number;
  color: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  estimatedSavings?: number;
  priority: 1 | 2 | 3;
}

export interface PortfolioMetric {
  date: string;
  value: number;
  return: number;
}

export interface ScenarioSimulation {
  id: string;
  name: string;
  assumptions: {
    annualReturn: number;
    inflation: number;
    savingsIncrease: number;
  };
  projections: Array<{
    year: number;
    netWorth: number;
    investedAssets: number;
    liquidAssets: number;
  }>;
  result: {
    finalNetWorth: number;
    totalReturn: number;
    yearsToGoal: number;
  };
}

export interface DashboardData {
  user: User;
  financialSnapshot: FinancialSnapshot;
  riskProfile: RiskProfile;
  assetAllocation: AssetAllocation[];
  recommendations: Recommendation[];
  portfolioMetrics: PortfolioMetric[];
  scenarios: ScenarioSimulation[];
}

// UI State
export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}
