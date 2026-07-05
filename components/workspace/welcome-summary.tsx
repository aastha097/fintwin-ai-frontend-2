'use client';

import { motion } from 'framer-motion';
import { generateWelcomeMessage } from '@/lib/mock-data';

export function WelcomeSummary() {
  const message = generateWelcomeMessage('Omkar');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-secondary/50 border border-border/40 rounded-2xl p-6 backdrop-blur-sm"
    >
      <div className="flex gap-4">
        {/* AI Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0"
        >
          <div className="text-lg font-semibold text-primary-foreground">✨</div>
        </motion.div>

        {/* Message Content */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-invert max-w-none text-foreground"
          >
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.split('\n').map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
