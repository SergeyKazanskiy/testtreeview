import { create } from 'zustand';


interface AuthState {
  isLoading: boolean;
  isError: boolean;

  errorMessage: string;
  successMessage: string;

  showLoading: () => void;
  hideLoading: () => void;

  setSuccess: (message: string) => void;
  setError: (message: string) => void;
  clearMessages: () => void;
}

export const useAuthState = create<AuthState>((set) => ({
  isLoading: false,
  isError: false,

  errorMessage: '',
  successMessage: '',
  

  showLoading: () => set({ isLoading: true }),
  hideLoading: () => set({ isLoading: false }),

  setSuccess: (message: string) => set({ successMessage: message }),
  setError: (message: string) => set({ isError: true, errorMessage: message }),
  
  clearMessages: () => set({ successMessage: '', isError: false, errorMessage: '' }),
}));

