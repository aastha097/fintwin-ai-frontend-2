'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { DashboardData } from '@/lib/types';

interface AssetAllocationProps {
  data: DashboardData;
}

export function AssetAllocation({ data }: AssetAllocationProps) {
  const { assetAllocation } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm"
    >
      <h2 className="text-lg font-semibold mb-6">Asset Allocation</h2>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={assetAllocation}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="percentage"
            animationDuration={800}
          >
            {assetAllocation.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(0, 0%, 12%)',
              border: '1px solid hsl(0, 0%, 20%)',
              borderRadius: '8px',
            }}
            formatter={(value) => `${value}%`}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mt-6 pt-6 border-t border-border/40 space-y-2"
      >
        {assetAllocation.map((asset, index) => (
          <motion.div
            key={asset.category}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: asset.color }}
              />
              <span className="text-muted-foreground">{asset.category}</span>
            </div>
            <span className="font-medium">{asset.percentage}%</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
