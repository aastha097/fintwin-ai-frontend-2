'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import type { DashboardData } from '@/lib/types';

interface FinancialSnapshotProps {
  data: DashboardData;
}

export function FinancialSnapshot({ data }: FinancialSnapshotProps) {
  const { financialSnapshot } = data;

  const metrics = [
    {
      label: 'Net Worth',
      value: financialSnapshot.netWorth,
      icon: Wallet,
      change: 2.5,
      format: 'currency',
    },
    {
      label: 'Monthly Income',
      value: financialSnapshot.monthlyIncome,
      icon: TrendingUp,
      change: 1.2,
      format: 'currency',
    },
    {
      label: 'Savings Rate',
      value: financialSnapshot.savingsRate * 100,
      icon: TrendingUp,
      change: 0.3,
      format: 'percent',
    },
  ];

  const formatValue = (value: number, format: string) => {
    if (format === 'currency') {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    if (format === 'percent') {
      return `${value.toFixed(1)}%`;
    }
    return value.toString();
  };

  return (
    <div className="p-6 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm">
      <h2 className="text-lg font-semibold mb-6">Financial Snapshot</h2>

      <div className="space-y-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start justify-between"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold mt-1">
                    {formatValue(metric.value, metric.format)}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/10 text-green-500 text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  {metric.change}%
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Asset Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mt-8 pt-6 border-t border-border/40 space-y-3"
      >
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Liquid Assets</span>
          <span className="font-medium">
            ${(financialSnapshot.liquidAssets / 1000).toFixed(0)}K
          </span>
        </div>
        <div className="w-full h-1.5 bg-input rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: '0%' }}
            animate={{
              width: `${(
                (financialSnapshot.liquidAssets / financialSnapshot.totalAssets) *
                100
              ).toFixed(0)}%`,
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </div>

        <div className="flex justify-between text-sm mt-4">
          <span className="text-muted-foreground">Invested Assets</span>
          <span className="font-medium">
            ${(financialSnapshot.investedAssets / 1000).toFixed(0)}K
          </span>
        </div>
        <div className="w-full h-1.5 bg-input rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-primary"
            initial={{ width: '0%' }}
            animate={{
              width: `${(
                (financialSnapshot.investedAssets / financialSnapshot.totalAssets) *
                100
              ).toFixed(0)}%`,
            }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
