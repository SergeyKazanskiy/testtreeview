import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { create } from 'zustand';


interface AuthState {
  token: string | null;
  userId: number | null;
  isAuthenticated: boolean;

  setAuth: (token: string, userId: number) => void;
  clearAuth: () => void;
  refreshToken: (token: string) => Promise<void>;
  loadAuth: () => Promise<void>;
}

export const useAuthState = create<AuthState>((set: any) => ({
  token: null,
  userId: null,
  isAuthenticated: false,

  setAuth: async (token: string, userId: number) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user_id", userId.toString());
    set({ token, userId, isAuthenticated: true });
  },

  clearAuth: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user_id");
    set({ token: null, userId: null, isAuthenticated: false })
  },

  refreshToken: async (newToken: string) => {
    await AsyncStorage.setItem("token", newToken);
    set({ token: newToken })
  },

  loadAuth: async () => {
    const token = await AsyncStorage.getItem("token");
    const userIdStr = await AsyncStorage.getItem("user_id");
    const userId = userIdStr ? parseInt(userIdStr, 10) : null;

    if (token && userId) {
      set({ token, userId, isAuthenticated: true });
    }
  },
}));


interface HttpState {
  loading: boolean;
  error: string | null;
  
  setLoading: (state: boolean) => void;
  setError: (msg: string) => void;
}

export const useHttpClient = create<HttpState>((set: any) => ({
  loading: false,
  error: null,

  setLoading: (state: any) => {
    set({ loading: state });
    if (state) {
      Toast.show({ type: 'info', text1: 'Loading...', position: 'bottom', visibilityTime: 1200, autoHide: true});
    }
  },

  setError: (msg: string) => {
    if (msg) {
      Toast.show({ type: 'error', text1: 'Error', text2: msg, position: 'bottom'});
    }
    set({ error: msg });
  },
}));

