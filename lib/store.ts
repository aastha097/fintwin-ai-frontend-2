import { create } from 'zustand';
import type { User, UploadedFile } from './types';

export interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface AppStore {
  uploadedFiles: UploadedFile[];
  processingProgress: number;
  isProcessing: boolean;
  addFile: (file: UploadedFile) => void;
  removeFile: (fileId: string) => void;
  setProcessingProgress: (progress: number) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  clearFiles: () => void;
}

// Mock auth store
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    set({
      user: {
        id: 'user-123',
        email,
        name: email.split('@')[0],
        company: 'Your Company',
      },
      isLoggedIn: true,
      isLoading: false,
    });
  },
  logout: () => {
    set({ user: null, isLoggedIn: false });
  },
}));

// App state store
export const useAppStore = create<AppStore>((set) => ({
  uploadedFiles: [],
  processingProgress: 0,
  isProcessing: false,
  addFile: (file) =>
    set((state) => ({
      uploadedFiles: [...state.uploadedFiles, file],
    })),
  removeFile: (fileId) =>
    set((state) => ({
      uploadedFiles: state.uploadedFiles.filter((f) => f.id !== fileId),
    })),
  setProcessingProgress: (progress) => set({ processingProgress: progress }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  clearFiles: () =>
    set({
      uploadedFiles: [],
      processingProgress: 0,
      isProcessing: false,
    }),
}));
