'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { WorkspaceHeader } from './workspace/header';
import { WelcomeSummary } from './workspace/welcome-summary';
import { SuggestedQuestions } from './workspace/suggested-questions';
import { ConversationThread } from './workspace/conversation-thread';
import { AgentActivityTimeline } from './workspace/agent-activity-timeline';
import { QuickInsightCards } from './workspace/quick-insight-cards';
import { ScenarioChips } from './workspace/scenario-chips';
import { FollowUpSuggestions } from './workspace/follow-up-suggestions';
import { useAssistant } from '@/lib/hooks';
import type { ChatMessage } from '@/lib/types';

interface AIWorkspaceProps {
  onLogout: () => void;
}

interface MessageWithMetadata extends ChatMessage {
  followUpSuggestions?: string[];
  showScenarioChips?: boolean;
}

export function AIWorkspace({ onLogout }: AIWorkspaceProps) {
  const [messages, setMessages] = useState<MessageWithMetadata[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showActivityTimeline, setShowActivityTimeline] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: assistantResponse } = useAssistant(inputValue);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isProcessing) return;

    // Add user message
    const userMessage: MessageWithMetadata = {
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

    // Determine response based on message type
    let responseContent = assistantResponse || `Based on your question, I've analyzed your financial profile...`;
    let showScenarios = false;
    let followUpSuggestions: string[] = [];

    // Check if this is a scenario request
    if (message.toLowerCase().includes('simulate') || message.toLowerCase().includes('scenario')) {
      responseContent = 'I can simulate different financial situations. Choose one below.';
      showScenarios = true;
    }
    // Check if this is a recommendation request
    else if (message.toLowerCase().includes('recommend') || message.toLowerCase().includes('improve')) {
      responseContent = `I'd recommend the following steps to improve your finances:

1. **Reduce high-interest debt** - Focus on paying down credit cards and personal loans first
2. **Build emergency fund** - Aim to save 3-6 months of expenses
3. **Diversify investments** - Consider increasing your stock market exposure
4. **Optimize monthly spending** - Review subscriptions and recurring expenses

Your current monthly savings rate is 22%, which is great!`;
      followUpSuggestions = [
        'Create a debt payoff plan',
        'Review my budget',
        'Discuss investment strategy',
        'Check savings goals',
      ];
    }
    // Check if this is a snapshot request
    else if (message.toLowerCase().includes('snapshot') || message.toLowerCase().includes('overview')) {
      responseContent = `Here's your complete financial snapshot:

**Income & Expenses**
• Monthly Income: $6,500
• Monthly Expenses: $5,070
• Monthly Savings: $1,430 (22%)

**Assets & Liabilities**
• Total Assets: $385,000
• Total Liabilities: $142,000
• Net Worth: $243,000

**Health Metrics**
• Financial Health Score: 78/100
• Debt-to-Income Ratio: 2.15
• Savings Rate: Strong ✓`;
      followUpSuggestions = [
        'Analyze my risks',
        'Get recommendations',
        'See investment options',
        'Review recent documents',
      ];
    }
    // Check if this is a risk analysis request
    else if (message.toLowerCase().includes('risk')) {
      responseContent = `Here's your financial risk analysis:

**Overall Risk Level: Moderate (45/100)**

**Key Risk Factors:**
• Market Risk: High - 65% stocks, interest rates rising
• Concentration Risk: Medium - 40% in tech stocks
• Liquidity Risk: Low - Strong emergency fund
• Inflation Risk: Moderate - Fixed-rate mortgage
• Debt Risk: Low - Good debt service coverage

**Recommendations:**
Rebalance toward bonds and diversify across sectors to reduce volatility.`;
      followUpSuggestions = [
        'Rebalance my portfolio',
        'Reduce market exposure',
        'Increase diversification',
        'Discuss hedging strategies',
      ];
    }
    // Default conversational response
    else {
      followUpSuggestions = [
        'Show my financial snapshot',
        'Analyze my risks',
        'Get improvement recommendations',
        'Explore scenarios',
      ];
    }

    // Add assistant message
    const assistantMessage: MessageWithMetadata = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: responseContent,
      timestamp: new Date(),
      followUpSuggestions,
      showScenarioChips: showScenarios,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsProcessing(false);
    setShowActivityTimeline(false);
  };

  const handleScenarioSelect = (scenario: string) => {
    const prompt = `I want to know if ${scenario.toLowerCase()} is financially safe. Analyze the impact on my monthly cash flow and provide a recommendation.`;
    handleSendMessage(prompt);
  };

  const handleFollowUpClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleQuickInsightClick = (prompt: string) => {
    handleSendMessage(prompt);
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

          {/* Suggested Questions - Always visible below summary */}
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6"
              >
                <SuggestedQuestions onSendMessage={handleSendMessage} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Conversation */}
          <div className="flex-1 overflow-y-auto mt-8 mb-6">
            {messages.length > 0 && (
              <div className="space-y-4">
                <ConversationThread messages={messages} />

                {/* Render scenario chips for assistant messages */}
                {messages.map((msg) =>
                  msg.role === 'assistant' && msg.showScenarioChips ? (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex justify-start ml-11"
                    >
                      <ScenarioChips onScenarioSelect={handleScenarioSelect} />
                    </motion.div>
                  ) : null
                )}

                {/* Render follow-up suggestions for assistant messages */}
                {messages.map((msg) =>
                  msg.role === 'assistant' && msg.followUpSuggestions?.length ? (
                    <motion.div
                      key={`followup-${msg.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex justify-start ml-11"
                    >
                      <FollowUpSuggestions
                        suggestions={msg.followUpSuggestions}
                        onSuggestionClick={handleFollowUpClick}
                      />
                    </motion.div>
                  ) : null
                )}

                {/* Agent Activity Timeline */}
                {showActivityTimeline && isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 ml-11"
                  >
                    <AgentActivityTimeline />
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Quick Insight Cards - Show after first message */}
          {messages.length > 0 && !isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <QuickInsightCards onCardClick={handleQuickInsightClick} />
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
    </div>
  );
}
