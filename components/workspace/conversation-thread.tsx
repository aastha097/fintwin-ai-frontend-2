'use client';

import { motion } from 'framer-motion';
import { ChatMessage } from '@/lib/types';

interface ConversationThreadProps {
  messages: ChatMessage[];
}

export function ConversationThread({ messages }: ConversationThreadProps) {
  return (
    <div className="space-y-4">
      {messages.map((message, idx) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`flex gap-3 max-w-2xl ${
              message.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary border border-border/40'
              }`}
            >
              {message.role === 'user' ? (
                <span className="text-sm font-semibold">Y</span>
              ) : (
                <span className="text-sm">✨</span>
              )}
            </div>

            {/* Message Content */}
            <div
              className={`rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/50 border border-border/40 text-foreground'
              }`}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-sm leading-relaxed whitespace-pre-wrap"
              >
                {message.content}
              </motion.div>

              {/* Timestamp */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs text-muted-foreground mt-2 opacity-70"
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
