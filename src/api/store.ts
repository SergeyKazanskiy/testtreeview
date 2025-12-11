import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { setToken } from './api';
import { auth } from './firebaseConfig';


interface AuthStore {
  token: string | null;
  userId: number;
  isLogin: boolean;
  isLoadingAuth: boolean;

  testUrl: string
  setTestUrl: (testUrl: string) => void;

  loginUser: (token: string, userId: number) => void;
  logoutUser: () => void;

  refreshToken: (token: string) => Promise<void>;
  restoreAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set: any, get: any) => ({
  token: null,
  userId: 0,
  isLogin: false,
  isLoadingAuth: true,

  testUrl: '',
  setTestUrl: (testUrl: string) => set({ testUrl }),


  loginUser: (token: string = '', userId: number) => {
    setToken(token);
    set({ token, isLogin: true, userId });
    
    AsyncStorage.setItem("user_id", userId.toString());
    AsyncStorage.setItem("token", token);
  },

  logoutUser: () => {
    set({ token: null, userId: null, isLogin: false })
    
    AsyncStorage.multiRemove(['token', 'user_id']);
  },

  refreshToken: async (newToken: string) => {
    const token = newToken ?? (await auth.currentUser?.getIdToken(true));

    if (token) {
      await AsyncStorage.setItem("token", newToken);
      set({ token: newToken })
      setToken(token);
    }
  },

  restoreAuth: async () => {
    const [token, user_id ] = await Promise.all([
      AsyncStorage.getItem('token'),
      AsyncStorage.getItem('user_id'),
    ]);

    const userId = Number(user_id);
    if (token && userId > 0) {
      set({ token, userId: Number(user_id), isLogin: true });
    }
    set({ isLoadingAuth: false });
  },
}));

