// lib/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,

      // Set tokens and update authentication state
      setTokens: (accessToken: string, refreshToken: string) =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        }),

      // Logout and clear tokens
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      // Refresh access token using the refresh token
      refreshAccessToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          set({ isAuthenticated: false, isLoading: false });
          return;
        }

        try {
          const res = await fetch("http://localhost:5206/api/auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
          });

          if (!res.ok) throw new Error("Failed to refresh token");
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await res.json();

          set({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error("Error refreshing token:", error);
          set({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage", // Name for localStorage key
      storage: {
        getItem: (key) => {
          if (typeof window !== "undefined") {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
          }
          return null;
        },
        setItem: (key, value) => {
          if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(value));
          }
        },
        removeItem: (key) => {
          if (typeof window !== "undefined") {
            localStorage.removeItem(key);
          }
        },
      },
      onRehydrateStorage: () => (state) => {
        // Cuando el estado se rehidrata desde localStorage, actualizamos isLoading a false
        if (state) {
          state.isLoading = false;
        }
      },
    },
  ),
);
