import { useEffect, useState } from 'react';
import { generateDashboardData, generateScenarios } from './mock-data';
import type { DashboardData, ScenarioSimulation } from './types';

/**
 * Hook for fetching dashboard data with realistic delay
 */
export function useDashboard(enabled: boolean = true) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    setIsLoading(true);
    const timer = setTimeout(() => {
      try {
        const dashboardData = generateDashboardData();
        setData(dashboardData);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [enabled]);

  return { data, isLoading, error };
}

/**
 * Hook for file upload simulation
 */
export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file: File): Promise<boolean> => {
    setIsUploading(true);
    setProgress(0);

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.random() * 30;
          if (next >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            resolve(true);
            return 100;
          }
          return next;
        });
      }, 300);
    });
  };

  const reset = () => {
    setIsUploading(false);
    setProgress(0);
  };

  return { uploadFile, isUploading, progress, reset };
}

/**
 * Hook for AI assistant responses with streaming simulation
 */
export function useAssistant() {
  const [response, setResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const generateResponse = async (message: string): Promise<void> => {
    setIsStreaming(true);
    setResponse('');

    const responses: Record<string, string> = {
      'Hello': 'Hello! I&apos;m your FinTwin AI assistant. I&apos;m here to help you optimize your financial strategy.',
      'advice': 'Based on your financial profile, I recommend focusing on portfolio rebalancing and tax optimization. Your current allocation has drifted from your target risk level.',
      'risk': 'Your overall risk score is 58/100, indicating a moderate risk tolerance. Your portfolio is well-diversified, though you might consider increasing your bond allocation slightly.',
      'default': 'I&apos;m here to help with your financial planning, portfolio analysis, and personalized recommendations. What would you like to explore today?',
    };

    const key = Object.keys(responses).find((k) =>
      message.toLowerCase().includes(k.toLowerCase())
    );
    const fullResponse = responses[key || 'default'];

    // Simulate streaming
    for (let i = 0; i < fullResponse.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 15));
      setResponse(fullResponse.slice(0, i + 1));
    }

    setIsStreaming(false);
  };

  const reset = () => {
    setResponse('');
    setIsStreaming(false);
  };

  return { generateResponse, response, isStreaming, reset };
}

/**
 * Hook for scenario simulation
 */
export function useScenarioSimulation() {
  const [scenarios, setScenarios] = useState<ScenarioSimulation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(
    null
  );

  const loadScenarios = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const generatedScenarios = generateScenarios();
    setScenarios(generatedScenarios);
    setSelectedScenarioId(generatedScenarios[0]?.id || null);
    setIsLoading(false);
  };

  const getSelectedScenario = () =>
    scenarios.find((s) => s.id === selectedScenarioId);

  return {
    scenarios,
    selectedScenarioId,
    setSelectedScenarioId,
    getSelectedScenario,
    isLoading,
    loadScenarios,
  };
}

/**
 * Hook for simulating file processing with progress
 */
export function useFileProcessing() {
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startProcessing = async () => {
    setIsProcessing(true);
    setProgress(0);
    setIsComplete(false);

    for (let i = 0; i <= 100; i += 5) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
    }

    setIsComplete(true);
    setIsProcessing(false);
  };

  const reset = () => {
    setProgress(0);
    setIsProcessing(false);
    setIsComplete(false);
  };

  return { progress, isProcessing, isComplete, startProcessing, reset };
}
