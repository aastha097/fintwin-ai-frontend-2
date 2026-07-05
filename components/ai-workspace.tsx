'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, LogOut, Activity } from 'lucide-react';
import { WorkspaceHeader } from './workspace/header';
import { WelcomeSummary } from './workspace/welcome-summary';
import { SuggestedQuestions } from './workspace/suggested-questions';
import { ConversationThread } from './workspace/conversation-thread';
import { AgentActivityTimeline } from './workspace/agent-activity-timeline';
import { QuickInsightCards } from './workspace/quick-insight-cards';
import { ScenarioDrawer } from './workspace/scenario-drawer';
import { useAssistant } from '@/lib/hooks';
import type { ChatMessage } from '@/lib/types';

interface AIWorkspaceProps {
  onLogout: () => void;
}

export function AIWorkspace({ onLogout }: AIWorkspaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showScenarioDrawer, setShowScenarioDrawer] = useState(false);
  const [showActivityTimeline, setShowActivityTimeline] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: assistantResponse, isLoading } = useAssistant(inputValue);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isProcessing) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    setShowActivityTimeline(true);

    // Simulate agent workflow
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Add assistant message
    const assistantMessage: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: assistantResponse || `I'd be happy to help with that. Based on your financial profile, here are some insights...`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsProcessing(false);
    setShowActivityTimeline(false);
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <WorkspaceHeader onLogout={onLogout} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col px-6 py-8">
          {/* Welcome Summary - Only show if no messages */}
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <WelcomeSummary />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Suggested Questions - Only show if no messages */}
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6"
              >
                <SuggestedQuestions onQuestionClick={handleQuestionClick} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Conversation */}
          <div className="flex-1 overflow-y-auto mt-8 mb-6">
            {messages.length > 0 && (
              <ConversationThread messages={messages} />
            )}

            {/* Agent Activity Timeline */}
            {showActivityTimeline && isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <AgentActivityTimeline />
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Insight Cards - Show after first message */}
          {messages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <QuickInsightCards
                onScenarioClick={() => setShowScenarioDrawer(true)}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Chat Input - Sticky at bottom */}
      <div className="border-t border-border/40 bg-background/80 backdrop-blur-md sticky bottom-0">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }
              }}
              placeholder="Ask anything about your financial life..."
              className="flex-1 px-4 py-3 rounded-lg bg-secondary text-foreground placeholder-muted-foreground border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              disabled={isProcessing}
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isProcessing}
              className="px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Scenario Drawer */}
      <ScenarioDrawer
        isOpen={showScenarioDrawer}
        onClose={() => setShowScenarioDrawer(false)}
      />
    </div>
  );
}
