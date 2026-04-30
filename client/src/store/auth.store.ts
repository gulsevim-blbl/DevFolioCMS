import { create } from "zustand";
import type { AuthUser } from "../types/auth";

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: Boolean(localStorage.getItem("token")),

  login: (token, user) => {
    localStorage.setItem("token", token);
    set({
      token,
      user,
      isAuthenticated: true
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      user: null,
      isAuthenticated: false
    });
  }
}));