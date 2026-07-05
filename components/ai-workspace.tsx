'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { WorkspaceHeader } from './workspace/header';
import { WelcomeSummary } from './workspace/welcome-summary';
import { SuggestedQuestions } from './workspace/suggested-questions';
import { ConversationThread } from './workspace/conversation-thread';
import { AgentActivityTimeline } from './workspace/agent-activity-timeline';
import { AIToolsRail } from './workspace/ai-tools-rail';
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
  const [welcomeSuggestionsUsed, setWelcomeSuggestionsUsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: assistantResponse } = useAssistant(inputValue);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing, showActivityTimeline]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isProcessing) return;

    // Mark welcome suggestions as used
    if (messages.length === 0) {
      setWelcomeSuggestionsUsed(true);
    }

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
    inputRef.current?.focus();

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

    // Add assistant message with ONLY ONE follow-up suggestion block
    const assistantMessage: MessageWithMetadata = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: responseContent,
      timestamp: new Date(),
      followUpSuggestions: followUpSuggestions.length > 0 ? followUpSuggestions : undefined,
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

      {/* Main Content Area with Left Rail */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left AI Tools Rail - Fixed, always visible */}
        <AIToolsRail onToolClick={handleSendMessage} isProcessing={isProcessing} />

        {/* Conversation Workspace */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Conversation Area */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="mx-auto">
              {/* Welcome Summary - Only show if no messages */}
              <AnimatePresence>
                {messages.length === 0 && !welcomeSuggestionsUsed && (
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

              {/* Suggested Questions - Show only at welcome, once */}
              <AnimatePresence>
                {messages.length === 0 && !welcomeSuggestionsUsed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-6"
                  >
                    <SuggestedQuestions 
                      onSendMessage={(msg) => {
                        setWelcomeSuggestionsUsed(true);
                        handleSendMessage(msg);
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Conversation Thread */}
              {messages.length > 0 && (
                <div className="space-y-4 max-w-3xl">
                  <ConversationThread messages={messages} />

                  {/* Only render the LAST assistant message's scenario chips OR follow-up suggestions */}
                  {messages.length > 0 && messages[messages.length - 1]?.role === 'assistant' && (
                    <>
                      {messages[messages.length - 1]?.showScenarioChips ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="flex justify-start ml-11"
                        >
                          <ScenarioChips onScenarioSelect={handleScenarioSelect} />
                        </motion.div>
                      ) : messages[messages.length - 1]?.followUpSuggestions?.length ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="flex justify-start ml-11"
                        >
                          <FollowUpSuggestions
                            suggestions={messages[messages.length - 1]!.followUpSuggestions!}
                            onSuggestionClick={handleFollowUpClick}
                          />
                        </motion.div>
                      ) : null}
                    </>
                  )}

                  {/* Agent Activity Timeline - Show while processing */}
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
          </div>

          {/* Chat Input - Sticky at bottom */}
          <div className="border-t border-border/40 bg-background/80 backdrop-blur-md">
            <div className="px-6 py-4">
              <div className="flex gap-3">
                <input
                  ref={inputRef}
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
      </div>
    </div>
  );
}
