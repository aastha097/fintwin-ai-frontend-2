import type {
  User,
  FinancialSnapshot,
  RiskProfile,
  AssetAllocation,
  Recommendation,
  PortfolioMetric,
  ScenarioSimulation,
  DashboardData,
} from './types';

export const generateUser = (): User => ({
  id: 'user-123',
  email: 'alex@example.com',
  name: 'Alex Johnson',
  company: 'Tech Innovations Inc.',
  role: 'Chief Technology Officer',
});

export const generateFinancialSnapshot = (): FinancialSnapshot => ({
  totalAssets: 1250000,
  totalLiabilities: 285000,
  netWorth: 965000,
  monthlyIncome: 18500,
  monthlyExpenses: 8200,
  savingsRate: 0.556,
  liquidAssets: 185000,
  investedAssets: 780000,
});

export const generateRiskProfile = (): RiskProfile => ({
  overallRisk: 58,
  marketRisk: 65,
  concentrationRisk: 42,
  liquidityRisk: 35,
  inflationRisk: 52,
  riskTolerance: 'moderate',
});

export const generateAssetAllocation = (): AssetAllocation[] => [
  {
    category: 'Stocks (US)',
    percentage: 38,
    value: 298200,
    color: '#8b5cf6',
  },
  {
    category: 'International Stocks',
    percentage: 18,
    value: 140700,
    color: '#3b82f6',
  },
  {
    category: 'Bonds',
    percentage: 22,
    value: 172700,
    color: '#06b6d4',
  },
  {
    category: 'Real Estate',
    percentage: 15,
    value: 117450,
    color: '#10b981',
  },
  {
    category: 'Cash & Equivalents',
    percentage: 7,
    value: 54950,
    color: '#6b7280',
  },
];

export const generateRecommendations = (): Recommendation[] => [
  {
    id: 'rec-1',
    title: 'Rebalance Portfolio',
    description:
      'Your stock allocation has drifted above target. Consider rebalancing to maintain your risk profile.',
    impact: 'high',
    category: 'Portfolio Management',
    estimatedSavings: 2400,
    priority: 1,
  },
  {
    id: 'rec-2',
    title: 'Optimize Tax Strategy',
    description:
      'Tax-loss harvesting opportunities available in your taxable accounts to reduce tax burden.',
    impact: 'high',
    category: 'Tax Planning',
    estimatedSavings: 3800,
    priority: 2,
  },
  {
    id: 'rec-3',
    title: 'Increase Emergency Fund',
    description:
      'Current emergency fund covers 2.8 months. Consider building to 6 months of expenses.',
    impact: 'medium',
    category: 'Financial Planning',
    estimatedSavings: 0,
    priority: 2,
  },
  {
    id: 'rec-4',
    title: 'Review Insurance Coverage',
    description:
      'Based on your assets, consider increasing life and disability insurance coverage.',
    impact: 'medium',
    category: 'Risk Management',
    estimatedSavings: 1200,
    priority: 3,
  },
  {
    id: 'rec-5',
    title: 'Automate Investing',
    description:
      'Set up automatic monthly investments to dollar-cost average and reduce market timing risk.',
    impact: 'low',
    category: 'Investing',
    estimatedSavings: 0,
    priority: 3,
  },
];

export const generatePortfolioMetrics = (): PortfolioMetric[] => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const baseValue = 900000;

  return months.map((month, index) => ({
    date: `${month} 2024`,
    value: Math.round(baseValue * (1 + (index * 0.015 + (Math.random() - 0.5) * 0.02))),
    return: index === 0 ? 0 : parseFloat((((index * 1.5 + (Math.random() - 0.5) * 2.5) / 100).toFixed(4))),
  }));
};

export const generateScenarios = (): ScenarioSimulation[] => {
  const baseWorth = 965000;
  const years = 30;

  const generateProjection = (
    annualReturn: number,
    inflation: number,
    savingsIncrease: number
  ) => {
    const projections = [];
    let currentWorth = baseWorth;
    let currentSavings = 10300;

    for (let year = 0; year <= years; year++) {
      projections.push({
        year,
        netWorth: Math.round(currentWorth),
        investedAssets: Math.round(currentWorth * 0.81),
        liquidAssets: Math.round(currentWorth * 0.19),
      });

      currentWorth =
        currentWorth * (1 + annualReturn) +
        currentSavings * ((1 + savingsIncrease) ** year - 1);
    }

    return projections;
  };

  return [
    {
      id: 'scenario-conservative',
      name: 'Conservative',
      assumptions: {
        annualReturn: 0.055,
        inflation: 0.025,
        savingsIncrease: 0.02,
      },
      projections: generateProjection(0.055, 0.025, 0.02),
      result: {
        finalNetWorth: Math.round(baseWorth * 3.2),
        totalReturn: 220,
        yearsToGoal: 18,
      },
    },
    {
      id: 'scenario-moderate',
      name: 'Moderate',
      assumptions: {
        annualReturn: 0.075,
        inflation: 0.025,
        savingsIncrease: 0.03,
      },
      projections: generateProjection(0.075, 0.025, 0.03),
      result: {
        finalNetWorth: Math.round(baseWorth * 5.1),
        totalReturn: 410,
        yearsToGoal: 14,
      },
    },
    {
      id: 'scenario-aggressive',
      name: 'Aggressive',
      assumptions: {
        annualReturn: 0.095,
        inflation: 0.025,
        savingsIncrease: 0.04,
      },
      projections: generateProjection(0.095, 0.025, 0.04),
      result: {
        finalNetWorth: Math.round(baseWorth * 8.2),
        totalReturn: 720,
        yearsToGoal: 11,
      },
    },
  ];
};

export const generateDashboardData = (): DashboardData => ({
  user: generateUser(),
  financialSnapshot: generateFinancialSnapshot(),
  riskProfile: generateRiskProfile(),
  assetAllocation: generateAssetAllocation(),
  recommendations: generateRecommendations(),
  portfolioMetrics: generatePortfolioMetrics(),
  scenarios: generateScenarios(),
});
