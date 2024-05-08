import { create } from 'zustand';
import {AuthState, AuthUser} from "@/types";

export const useAuthStore = create<AuthState>((set, get) => ({
  loading: false,
  user: null,
  error: null,

  loginStart: () => set({ loading: true, error: null }),

  loginSuccess: (user: AuthUser | null) => set({ user, loading: false, error: null }),

  loginFailure: (error: string) => set({ error, loading: false, user: null }),
}));

export default useAuthStore;
