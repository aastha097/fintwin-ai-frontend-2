import { useEffect, useState } from 'react';
import { generateMockResponse } from './mock-data';

/**
 * Hook for assistant AI responses with realistic delay
 */
export function useAssistant(message: string) {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!message.trim()) {
      setData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      try {
        const response = generateMockResponse(message);
        setData(response);
        setError(null);
      } catch (err) {
        setError('Failed to generate response');
      } finally {
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [message]);

  return { data, isLoading, error };
}

/**
 * Hook for file upload simulation
 */
export function useUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<boolean> => {
    setIsUploading(true);
    setProgress(0);
    setError(null);

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

      setTimeout(() => {
        if (isUploading) {
          clearInterval(interval);
          setIsUploading(false);
          setError('Upload failed');
          resolve(false);
        }
      }, 10000);
    });
  };

  return { isUploading, progress, error, uploadFile };
}

/**
 * Hook for document status tracking
 */
export function useDocumentStatus(documentId: string) {
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('completed');
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [documentId]);

  return { status, isLoading };
}

/**
 * Hook for simulation runs
 */
export function useSimulation(scenarioId: string | null) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!scenarioId) {
      setData(null);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      try {
        const result = {
          scenario: scenarioId,
          projectedImpact: { savingsGain: 5000 },
          risks: ['Possible lifestyle inflation'],
          recommendation: 'Proceed with caution',
        };
        setData(result);
        setError(null);
      } catch (err) {
        setError('Simulation failed');
      } finally {
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [scenarioId]);

  return { data, isLoading, error };
}
