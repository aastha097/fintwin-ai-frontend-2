'use client';

import { motion } from 'framer-motion';
import { generateQuickInsights, generateFinancialSummary, generateRiskMetrics } from '@/lib/mock-data';
import { 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  FileText, 
  Zap 
} from 'lucide-react';

interface QuickInsightCardsProps {
  onScenarioClick: () => void;
}

export function QuickInsightCards({ onScenarioClick }: QuickInsightCardsProps) {
  const insights = generateQuickInsights();
  const financial = generateFinancialSummary();
  const risk = generateRiskMetrics();

  const iconMap: Record<string, React.ReactNode> = {
    snapshot: <TrendingUp className="w-5 h-5" />,
    risk: <AlertTriangle className="w-5 h-5" />,
    recommendation: <Lightbulb className="w-5 h-5" />,
    document: <FileText className="w-5 h-5" />,
    scenario: <Zap className="w-5 h-5" />,
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">Quick insights</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {insights.map((insight, idx) => (
          <motion.button
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={insight.type === 'scenario' ? onScenarioClick : undefined}
            className="text-left p-4 rounded-xl bg-secondary/40 border border-border/40 hover:bg-secondary/60 hover:border-border/60 transition-all"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
              className="text-primary mb-2"
            >
              {iconMap[insight.type]}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
            >
              <h4 className="text-sm font-medium text-foreground mb-1">
                {insight.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {insight.description}
              </p>
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
