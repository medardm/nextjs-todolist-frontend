import { create } from 'zustand';
import {AuthState, AuthUser} from "@/types";
import {config} from "@/config";

export const useAuthStore = create<AuthState>((set, get) => ({
  loading: false,
  user: null,
  error: null,
  usernameInput: config.TEST_USER,
  passwordInput: config.TEST_USER_PASSWORD,
  confirmPasswordInput: '',

  loginStart: () => set({ loading: true, error: null }),

  loginSuccess: (user: AuthUser | null) => set({ user, loading: false, error: null }),

  loginFailure: (error: string) => set({ error, loading: false, user: null }),

  setUsername: (usernameInput: string) => set({ usernameInput }),

  setPassword: (passwordInput: string) => set({ passwordInput }),

  setConfirmPassword: (confirmPasswordInput: string) => set({ confirmPasswordInput }),
}));

export default useAuthStore;
