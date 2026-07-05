'use client';

import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp } from 'lucide-react';
import type { DashboardData } from '@/lib/types';

interface RiskAnalysisProps {
  data: DashboardData;
}

export function RiskAnalysis({ data }: RiskAnalysisProps) {
  const { riskProfile } = data;

  const riskMetrics = [
    { label: 'Market Risk', value: riskProfile.marketRisk },
    { label: 'Concentration', value: riskProfile.concentrationRisk },
    { label: 'Liquidity', value: riskProfile.liquidityRisk },
    { label: 'Inflation', value: riskProfile.inflationRisk },
  ];

  const getRiskColor = (value: number) => {
    if (value >= 70) return 'text-destructive';
    if (value >= 50) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getRiskBgColor = (value: number) => {
    if (value >= 70) return 'bg-destructive/10';
    if (value >= 50) return 'bg-yellow-500/10';
    return 'bg-green-500/10';
  };

  return (
    <div className="p-6 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Risk Profile</h2>
        <div
          className={`text-3xl font-bold ${getRiskColor(
            riskProfile.overallRisk
          )}`}
        >
          {riskProfile.overallRisk}%
        </div>
      </div>

      {/* Overall Risk Gauge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="w-full h-2 bg-input rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-destructive"
            initial={{ width: '0%' }}
            animate={{ width: `${riskProfile.overallRisk}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Conservative</span>
          <span>Moderate</span>
          <span>Aggressive</span>
        </div>
      </motion.div>

      {/* Risk Tolerance Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-6 ${getRiskBgColor(
          riskProfile.overallRisk
        )} ${getRiskColor(riskProfile.overallRisk)}`}
      >
        {riskProfile.riskTolerance.charAt(0).toUpperCase() +
          riskProfile.riskTolerance.slice(1)}{' '}
        Risk Tolerance
      </motion.div>

      {/* Individual Risk Metrics */}
      <div className="space-y-4">
        {riskMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-muted-foreground">{metric.label}</span>
            <div className="flex items-center gap-3">
              <div className="w-24 h-1.5 bg-input rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${
                    metric.value >= 70
                      ? 'bg-destructive'
                      : metric.value >= 50
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                  }`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 0.8, delay: 0.25 + index * 0.1 }}
                />
              </div>
              <span
                className={`text-sm font-semibold w-8 text-right ${getRiskColor(
                  metric.value
                )}`}
              >
                {metric.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Risk Alert */}
      {riskProfile.overallRisk >= 60 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex gap-3"
        >
          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-500 mb-1">
              Higher Risk Detected
            </p>
            <p className="text-xs text-yellow-500/80">
              Consider diversifying your portfolio to reduce concentration risk.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
