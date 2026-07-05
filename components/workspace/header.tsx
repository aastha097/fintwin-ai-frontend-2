'use client';

import { motion } from 'framer-motion';
import { LogOut, Signal } from 'lucide-react';
import { TrendingUp } from 'lucide-react';

interface WorkspaceHeaderProps {
  onLogout: () => void;
}

export function WorkspaceHeader({ onLogout }: WorkspaceHeaderProps) {
  return (
    <div className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">FinTwin AI</span>
        </motion.div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Connection Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Connected</span>
            </div>
          </motion.div>

          {/* Session Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-3 py-1 rounded-full bg-secondary text-sm text-foreground/80 border border-border/40"
          >
            Financial Analysis
          </motion.div>

          {/* Logout Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={onLogout}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
