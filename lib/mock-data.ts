import type {
  User,
  ChatMessage,
  FinancialSummary,
  RiskMetrics,
  QuickInsight,
  ScenarioOption,
  SimulationResult,
} from './types';

export const generateUser = (): User => ({
  id: 'user-123',
  email: 'demo@example.com',
  name: 'Omkar',
});

export const generateFinancialSummary = (): FinancialSummary => ({
  monthlyIncome: 8500,
  monthlyExpenses: 3200,
  monthlySavings: 5300,
  healthScore: 78,
  totalDebt: 45000,
  monthlyDebtPayment: 1200,
});

export const generateRiskMetrics = (): RiskMetrics => ({
  overallRisk: 62,
  riskScore: 'Moderate',
  recommendations: [
    'Consider diversifying your investments across more sectors',
    'Build an emergency fund covering 6 months of expenses',
    'Review your insurance coverage for gaps',
  ],
});

export const generateQuickInsights = (): QuickInsight[] => [
  {
    id: 'insight-1',
    type: 'snapshot',
    title: 'Financial Snapshot',
    description: 'View your financial overview at a glance',
  },
  {
    id: 'insight-2',
    type: 'risk',
    title: 'Risk Analysis',
    description: 'Understanding your financial risks',
  },
  {
    id: 'insight-3',
    type: 'recommendation',
    title: 'AI Recommendations',
    description: 'Personalized actions to improve your finances',
  },
  {
    id: 'insight-4',
    type: 'document',
    title: 'Recent Documents',
    description: 'Bank Statement, Salary Slip, Loan Statement',
  },
  {
    id: 'insight-5',
    type: 'scenario',
    title: 'Run Scenario',
    description: 'Simulate financial scenarios',
  },
];

export const generateScenarioOptions = (): ScenarioOption[] => [
  {
    id: 'scenario-1',
    name: 'Buy Vehicle',
    description: 'Simulate purchasing a car',
  },
  {
    id: 'scenario-2',
    name: 'New Loan',
    description: 'Take out a personal loan',
  },
  {
    id: 'scenario-3',
    name: 'Salary Increase',
    description: 'Get a 10% salary increase',
  },
  {
    id: 'scenario-4',
    name: 'Increase Savings',
    description: 'Boost monthly savings',
  },
  {
    id: 'scenario-5',
    name: 'Increase Investments',
    description: 'Allocate more to investments',
  },
];

export const generateSimulationResult = (scenario: string): SimulationResult => {
  const scenarioData: Record<string, SimulationResult> = {
    'Buy Vehicle': {
      scenario: 'Buy Vehicle',
      projectedImpact: {
        monthlyPayment: 450,
        newNetWorth: -45000,
      },
      risks: [
        'Reduced emergency fund cushion',
        'Increased monthly debt obligations',
      ],
      recommendation:
        'Consider waiting 6 months to build savings first, then purchase with a shorter loan term.',
    },
    'Salary Increase': {
      scenario: 'Salary Increase (10%)',
      projectedImpact: {
        savingsGain: 8500,
      },
      risks: ['Lifestyle inflation risk'],
      recommendation:
        'Allocate 50% of increase to investments and 50% to increased savings rate.',
    },
  };

  return (
    scenarioData[scenario] || {
      scenario,
      projectedImpact: {},
      risks: [],
      recommendation: 'Consult with a financial advisor for personalized guidance.',
    }
  );
};

export const generateWelcomeMessage = (userName: string): string => {
  return `Hi ${userName}.

I've completed the analysis of your uploaded financial documents.

Here's what I found:

**Income** - $8,500/month
**Expenses** - $3,200/month  
**Savings** - $5,300/month
**Health Score** - 78/100
**Debt** - $45,000 total
**Cash Flow** - Strong positive cash flow

I also discovered several opportunities to improve your finances. What would you like to explore?`;
};

export const suggestedQuestions = (): string[] => [
  'Explain My Risk Score',
  'Can I Buy a Car?',
  'Reduce My Debt',
  'Increase My Savings',
  'Show Spending Analysis',
  'Retirement Planning',
];

export const generateAgentWorkflowSteps = () => [
  { id: 'step-1', title: 'Reading Financial Profile' },
  { id: 'step-2', title: 'Retrieving Financial Memory' },
  { id: 'step-3', title: 'Running Financial Analysis' },
  { id: 'step-4', title: 'Validating Recommendation' },
  { id: 'step-5', title: 'Preparing Response' },
];

export const generateMockResponse = (question: string): string => {
  const responses: Record<string, string> = {
    'Explain My Risk Score': `Your risk score of 62/100 indicates a **moderate risk profile**. This means:

- You have reasonable diversification across different asset types
- Your debt levels are manageable relative to your income
- You have some exposure to market volatility

**Key Areas:**
- Market exposure is solid but could be more diversified internationally
- Your emergency fund is adequate but could be larger
- Insurance coverage has some gaps

**Recommendation:** Consider rebalancing to reduce concentration risk and building 3-6 months of emergency savings.`,

    'Can I Buy a Car?': `Yes, you can afford to buy a car, but with some considerations:

**Your Financial Capacity:**
- Monthly savings: $5,300
- Total debt: $45,000
- Monthly debt payment: $1,200

**Car Purchase Scenarios:**
- **Budget Option** ($25,000): $450/month payment - minimal impact
- **Premium Option** ($45,000): $825/month payment - reduces savings to $4,475

**My Recommendation:** You have the capacity, but I'd suggest:
1. Wait 3-6 months to build additional emergency savings
2. Keep total monthly debt payments under 35% of income (you're at 14% - good position)
3. Look for a 5-7 year loan to minimize interest costs`,

    'Reduce My Debt': `Based on your financial profile, here's a debt reduction strategy:

**Current Situation:**
- Total Debt: $45,000
- Monthly Payment: $1,200
- Debt-to-Income Ratio: 14% (healthy)

**Aggressive Payoff Strategy (3-4 years):**
- Increase payments to $1,800/month (use $600 from your $5,300 monthly savings)
- Total interest saved: ~$8,500
- New payoff date: 30 months

**Conservative Strategy (5-6 years):**
- Keep current $1,200/month payments
- Use surplus savings for investments
- Build wealth while managing debt

**My Recommendation:** Given your strong cash flow, I'd suggest the aggressive approach. You'd be debt-free in under 3 years while maintaining a healthy emergency fund.`,

    default: `That's a great question. Based on your current financial situation, here's what I found:

Your monthly savings of $5,300 is excellent. This gives you significant flexibility for financial planning. The key is to align your goals with your risk tolerance and time horizon.

Would you like me to dive deeper into any specific area, such as investment strategy, debt management, or retirement planning?`,
  };

  return responses[question] || responses['default'];
};
