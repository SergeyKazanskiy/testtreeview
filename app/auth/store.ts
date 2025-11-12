import Toast from 'react-native-toast-message';
import { create } from 'zustand';


interface AuthState {
  token: string | null;
  userId: number | null;
  isAuthenticated: boolean;

  setAuth: (token: string, userId: number) => void;
  clearAuth: () => void;
  refreshToken: (token: string) => Promise<void>;
}

export const useAuthState = create<AuthState>((set: any) => ({
  token: null,
  userId: null,
  isAuthenticated: false,

  setAuth: (token: string, userId: number) => set({ token, userId, isAuthenticated: true }),
  clearAuth: () => set({ token: null, userId: null, isAuthenticated: false }),
  refreshToken: async (newToken: string) => set({ token: newToken }),
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


// // app/auth/store.ts
// import { create } from "zustand";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// interface AuthState {
//   token: string | null;
//   user_id: string | null;
//   isAuthenticated: boolean;
//   setAuth: (token: string, user_id: string) => Promise<void>;
//   clearAuth: () => Promise<void>;
//   loadAuth: () => Promise<void>;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   token: null,
//   user_id: null,
//   isAuthenticated: false,

//   setAuth: async (token, user_id) => {
//     await AsyncStorage.setItem("token", token);
//     await AsyncStorage.setItem("user_id", user_id);
//     set({ token, user_id, isAuthenticated: true });
//   },

//   clearAuth: async () => {
//     await AsyncStorage.removeItem("token");
//     await AsyncStorage.removeItem("user_id");
//     set({ token: null, user_id: null, isAuthenticated: false });
//   },

//   loadAuth: async () => {
//     const token = await AsyncStorage.getItem("token");
//     const user_id = await AsyncStorage.getItem("user_id");
//     if (token && user_id) {
//       set({ token, user_id, isAuthenticated: true });
//     }
//   },
// }));
