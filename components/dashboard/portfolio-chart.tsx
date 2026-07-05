'use client';

import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { DashboardData } from '@/lib/types';

interface PortfolioChartProps {
  data: DashboardData;
}

export function PortfolioChart({ data }: PortfolioChartProps) {
  const { portfolioMetrics } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm"
    >
      <h2 className="text-lg font-semibold mb-6">Portfolio Performance</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={portfolioMetrics}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(264.5, 100%, 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(264.5, 100%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 20%)" />
          <XAxis
            dataKey="date"
            stroke="hsl(0, 0%, 65%)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="hsl(0, 0%, 65%)"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(0, 0%, 12%)',
              border: '1px solid hsl(0, 0%, 20%)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(0, 0%, 96%)' }}
            formatter={(value) => [
              `$${(value as number / 1000).toFixed(1)}K`,
              'Portfolio Value',
            ]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(264.5, 100%, 50%)"
            strokeWidth={2}
            dot={false}
            fillOpacity={1}
            fill="url(#colorValue)"
            isAnimationActive={true}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/40"
      >
        <div>
          <p className="text-xs text-muted-foreground mb-1">Current Value</p>
          <p className="font-semibold">
            ${(portfolioMetrics[portfolioMetrics.length - 1]?.value / 1000).toFixed(0)}K
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">YTD Return</p>
          <p className="font-semibold text-green-500">
            +{(portfolioMetrics[portfolioMetrics.length - 1]?.return * 100).toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Volatility</p>
          <p className="font-semibold">12.4%</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
