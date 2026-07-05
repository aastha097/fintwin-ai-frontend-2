'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Badge } from 'lucide-react';
import type { DashboardData, Recommendation } from '@/lib/types';

interface RecommendationsProps {
  data: DashboardData;
}

export function Recommendations({ data }: RecommendationsProps) {
  const { recommendations } = data;

  const getImpactColor = (
    impact: Recommendation['impact']
  ): string => {
    switch (impact) {
      case 'high':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
    }
  };

  const getPriorityColor = (priority: number): string => {
    switch (priority) {
      case 1:
        return 'border-l-red-500';
      case 2:
        return 'border-l-yellow-500';
      case 3:
        return 'border-l-green-500';
    }
    return 'border-l-primary';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="p-6 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm"
    >
      <h2 className="text-lg font-semibold mb-6">Personalized Recommendations</h2>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.35 + index * 0.1 }}
            className={`p-4 rounded-xl border border-border/40 bg-card/30 hover:bg-card/50 transition-all cursor-pointer group border-l-4 ${getPriorityColor(
              rec.priority
            )}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {rec.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {rec.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 flex-shrink-0 ml-2" />
            </div>

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Badge
                className={`text-xs px-2 py-1 rounded-full font-medium border ${getImpactColor(
                  rec.impact
                )}`}
              >
                {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)} Impact
              </Badge>
              <Badge className="text-xs px-2 py-1 rounded-full font-medium bg-primary/10 text-primary border-primary/20">
                {rec.category}
              </Badge>
              {rec.estimatedSavings && rec.estimatedSavings > 0 && (
                <Badge className="text-xs px-2 py-1 rounded-full font-medium bg-green-500/10 text-green-500 border-green-500/20">
                  Save ${rec.estimatedSavings.toLocaleString()}/yr
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="mt-6 pt-6 border-t border-border/40 grid grid-cols-3 gap-4"
      >
        <div>
          <p className="text-xs text-muted-foreground mb-1">Total Savings</p>
          <p className="font-semibold">
            $
            {recommendations
              .reduce((sum, rec) => sum + (rec.estimatedSavings || 0), 0)
              .toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Action Items</p>
          <p className="font-semibold">{recommendations.length}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Avg. Complexity</p>
          <p className="font-semibold">Medium</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
