'use client';

import { useState } from 'react';
import { Landing } from '@/components/landing';
import { Login } from '@/components/login';
import { Upload } from '@/components/upload';
import { Processing } from '@/components/processing';
import { Dashboard } from '@/components/dashboard';
import { useAuthStore } from '@/lib/store';

type AppState = 'landing' | 'login' | 'upload' | 'processing' | 'dashboard';

export default function Home() {
  const { isLoggedIn } = useAuthStore();
  const [appState, setAppState] = useState<AppState>(() => {
    return isLoggedIn ? 'dashboard' : 'landing';
  });

  const handleNavigate = (state: AppState) => {
    setAppState(state);
  };

  const handleLogout = () => {
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
          onComplete={() => handleNavigate('dashboard')}
        />
      )}

      {appState === 'dashboard' && (
        <Dashboard
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
