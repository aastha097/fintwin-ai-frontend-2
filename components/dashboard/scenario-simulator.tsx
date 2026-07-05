'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useScenarioSimulation } from '@/lib/hooks';

interface ScenarioSimulatorProps {
  onClose: () => void;
}

export function ScenarioSimulator({ onClose }: ScenarioSimulatorProps) {
  const {
    scenarios,
    selectedScenarioId,
    setSelectedScenarioId,
    getSelectedScenario,
    isLoading,
    loadScenarios,
  } = useScenarioSimulation();

  useEffect(() => {
    loadScenarios();
  }, [loadScenarios]);

  const selectedScenario = getSelectedScenario();

  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      transition={{ duration: 0.3 }}
      className="fixed right-0 top-0 bottom-0 w-full md:w-[500px] bg-card/95 backdrop-blur-md border-l border-border/40 shadow-2xl z-50 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-border/40 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <h2 className="font-semibold">Scenario Simulator</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-input transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 rounded-full border-2 border-border border-t-primary"
          />
        </div>
      ) : (
        <>
          {/* Scenario Tabs */}
          <div className="border-b border-border/40 p-4 flex gap-2 flex-shrink-0 overflow-x-auto">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenarioId(scenario.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  selectedScenarioId === scenario.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-input text-foreground hover:bg-input/80'
                }`}
              >
                {scenario.name}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {selectedScenario && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedScenario.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Chart */}
                  <div className="bg-input/50 rounded-xl p-4">
                    <h3 className="text-sm font-semibold mb-4">30-Year Projection</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={selectedScenario.projections}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 20%)" />
                        <XAxis
                          dataKey="year"
                          stroke="hsl(0, 0%, 65%)"
                          style={{ fontSize: '12px' }}
                        />
                        <YAxis
                          stroke="hsl(0, 0%, 65%)"
                          style={{ fontSize: '12px' }}
                          tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(0, 0%, 12%)',
                            border: '1px solid hsl(0, 0%, 20%)',
                            borderRadius: '8px',
                          }}
                          labelStyle={{ color: 'hsl(0, 0%, 96%)' }}
                          formatter={(value) => [
                            `$${((value as number) / 1000000).toFixed(1)}M`,
                            'Net Worth',
                          ]}
                        />
                        <Line
                          type="monotone"
                          dataKey="netWorth"
                          stroke="hsl(264.5, 100%, 50%)"
                          strokeWidth={2}
                          dot={false}
                          isAnimationActive={true}
                          animationDuration={800}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Assumptions */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Assumptions</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-input/50">
                        <p className="text-xs text-muted-foreground mb-1">
                          Annual Return
                        </p>
                        <p className="font-semibold text-sm">
                          {(selectedScenario.assumptions.annualReturn * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-input/50">
                        <p className="text-xs text-muted-foreground mb-1">
                          Inflation
                        </p>
                        <p className="font-semibold text-sm">
                          {(selectedScenario.assumptions.inflation * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-input/50">
                        <p className="text-xs text-muted-foreground mb-1">
                          Savings Growth
                        </p>
                        <p className="font-semibold text-sm">
                          {(selectedScenario.assumptions.savingsIncrease * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Projected Results</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg bg-input/50"
                      >
                        <p className="text-xs text-muted-foreground mb-2">
                          Final Net Worth
                        </p>
                        <p className="font-semibold text-lg">
                          $
                          {(selectedScenario.result.finalNetWorth / 1000000).toFixed(1)}
                          M
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-4 rounded-lg bg-input/50"
                      >
                        <p className="text-xs text-muted-foreground mb-2">
                          Total Return
                        </p>
                        <p className="font-semibold text-lg text-green-500">
                          +{selectedScenario.result.totalReturn}%
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-4 rounded-lg bg-input/50"
                      >
                        <p className="text-xs text-muted-foreground mb-2">
                          Years to Goal
                        </p>
                        <p className="font-semibold text-lg">
                          {selectedScenario.result.yearsToGoal}
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-4 rounded-lg bg-input/50"
                      >
                        <p className="text-xs text-muted-foreground mb-2">
                          Strategy
                        </p>
                        <p className="font-semibold text-sm">
                          {selectedScenario.name}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}
