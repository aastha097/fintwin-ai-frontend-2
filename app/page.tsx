'use client';

import { useState, useEffect } from 'react';
import { Landing } from '@/components/landing';
import { Login } from '@/components/login';
import { Upload } from '@/components/upload';
import { Processing } from '@/components/processing';
import { AIWorkspace } from '@/components/ai-workspace';
import { useAuthStore } from '@/lib/store';

type AppState = 'landing' | 'login' | 'upload' | 'processing' | 'workspace';

export default function Home() {
  const { isLoggedIn, logout } = useAuthStore();
  const [appState, setAppState] = useState<AppState>('landing');
  const [mounted, setMounted] = useState(false);

  // Initialize state based on auth status
  useEffect(() => {
    setAppState(isLoggedIn ? 'workspace' : 'landing');
    setMounted(true);
  }, [isLoggedIn]);

  // Prevent rendering until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const handleNavigate = (state: AppState) => {
    setAppState(state);
  };

  const handleLogout = () => {
    logout();
    setAppState('landing');
  };

  return (
    <>
      {appState === 'landing' && (
        <Landing onNavigate={() => handleNavigate('login')} />
      )}

      {appState === 'login' && (
        <Login
          onSuccess={() => handleNavigate('upload')}
        />
      )}

      {appState === 'upload' && (
        <Upload
          onComplete={() => handleNavigate('processing')}
        />
      )}

      {appState === 'processing' && (
        <Processing
          onComplete={() => handleNavigate('workspace')}
        />
      )}

      {appState === 'workspace' && (
        <AIWorkspace
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
