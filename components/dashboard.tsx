'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LogOut,
  Menu,
  X,
  MessageCircle,
  Settings,
  TrendingUp,
} from 'lucide-react';
import { useAuthStore, useAppStore } from '@/lib/store';
import { useDashboard } from '@/lib/hooks';
import type { DashboardData } from '@/lib/types';
import { FinancialSnapshot } from './dashboard/financial-snapshot';
import { RiskAnalysis } from './dashboard/risk-analysis';
import { Recommendations } from './dashboard/recommendations';
import { PortfolioChart } from './dashboard/portfolio-chart';
import { AssetAllocation } from './dashboard/asset-allocation';
import { AIAssistant } from './dashboard/ai-assistant';
import { ScenarioSimulator } from './dashboard/scenario-simulator';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const { user, logout } = useAuthStore();
  const { uploadedFiles } = useAppStore();
  const { data: dashboardData, isLoading } = useDashboard(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [simulatorOpen, setSimulatorOpen] = useState(false);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  if (isLoading || !dashboardData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-2 border-border border-t-primary"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold">FinTwin</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            <div className="text-sm">
              <p className="text-muted-foreground">Welcome back</p>
              <p className="font-semibold">{user?.name}</p>
            </div>

            <button
              onClick={() => setAssistantOpen(true)}
              className="p-2 rounded-lg hover:bg-input transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </button>

            <button
              onClick={() => setSimulatorOpen(true)}
              className="px-4 py-2 rounded-lg hover:bg-input transition-colors text-sm font-medium"
            >
              Scenarios
            </button>

            <button className="p-2 rounded-lg hover:bg-input transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg hover:bg-input transition-colors text-sm font-medium flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-input transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Financial Dashboard</h1>
          <p className="text-muted-foreground">
            {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''} analyzed • Last updated today
          </p>
        </motion.div>

        {/* Top Section - Financial Snapshot & Risk */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FinancialSnapshot data={dashboardData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <RiskAnalysis data={dashboardData} />
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-2"
          >
            <PortfolioChart data={dashboardData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AssetAllocation data={dashboardData} />
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Recommendations data={dashboardData} />
        </motion.div>
      </div>

      {/* AI Assistant Drawer */}
      {assistantOpen && (
        <AIAssistant onClose={() => setAssistantOpen(false)} />
      )}

      {/* Scenario Simulator Drawer */}
      {simulatorOpen && (
        <ScenarioSimulator onClose={() => setSimulatorOpen(false)} />
      )}

      {/* Mobile Menu */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden fixed inset-0 top-16 z-30 bg-background border-b border-border/40 flex flex-col p-4 gap-2"
        >
          <button
            onClick={() => setAssistantOpen(true)}
            className="p-3 rounded-lg hover:bg-input transition-colors text-left flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            AI Assistant
          </button>
          <button
            onClick={() => setSimulatorOpen(true)}
            className="p-3 rounded-lg hover:bg-input transition-colors text-left"
          >
            Scenario Simulator
          </button>
          <button className="p-3 rounded-lg hover:bg-input transition-colors text-left flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="p-3 rounded-lg hover:bg-input transition-colors text-left flex items-center gap-2 text-destructive"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </motion.div>
      )}
    </div>
  );
}
