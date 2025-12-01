import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { auth } from './firebaseConfig';
import { setToken } from './utils';


interface AuthStore {
  token: string | null;
  userId: number;
  isLogin: boolean;

  loginUser: (token: string, userId: number) => void;
  logoutUser: () => void;

  refreshToken: (token: string) => Promise<void>;
  restoreAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set: any) => ({
  token: null,
  userId: 0,
  isLogin: false,


  loginUser: (token: string = '', userId: number) => {
    set({ token, userId, isLogin: true });
    setToken(token);

    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("user_id", userId.toString());
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
  },
}));

