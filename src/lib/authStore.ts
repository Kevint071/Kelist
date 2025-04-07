import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/lib/authService";
import { authUtils } from "@/lib/authUtils";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; userId?: string }>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

let refreshTimeout: NodeJS.Timeout | null = null;

const createAuthStore: StateCreator<AuthState> = (set, get) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
  userId: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const { accessToken, refreshToken } = await authService.login(
        email,
        password,
      );
      const userId = authUtils.getUserIdFromToken(accessToken);
      authUtils.setAccessTokenCookie(accessToken);
      set({
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
        userId,
      });

      startTokenRefresh(set, get); // Inicia el refresco
      return { success: true, userId };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Credenciales inválidas",
      };
    }
  },

  logout: () => {
    if (refreshTimeout) clearTimeout(refreshTimeout);
    authUtils.removeAccessTokenCookie();
    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      userId: null,
    });
  },

  refreshAccessToken: async () => {
    const { refreshToken, userId } = get();

    if (!refreshToken || !userId) {
      set({ isAuthenticated: false, isLoading: false, userId: null });
      authUtils.removeAccessTokenCookie();
      return;
    }

    const result = await authService.refreshToken(userId, refreshToken);

    if (!result.success || !result.data) {
      authUtils.removeAccessTokenCookie();
      set({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        userId: null,
      });
      return;
    }

    const { accessToken: newAccessToken } = result.data;
    const newUserId = authUtils.getUserIdFromToken(newAccessToken);
    authUtils.setAccessTokenCookie(newAccessToken);
    set({
      accessToken: newAccessToken,
      refreshToken: refreshToken,
      isAuthenticated: true,
      isLoading: false,
      userId: newUserId,
    });

    startTokenRefresh(set, get); // Reinicia el refresco tras éxito
  },
});

const startTokenRefresh = (
  set: (partial: Partial<AuthState>) => void,
  get: () => AuthState,
) => {
  if (refreshTimeout) clearTimeout(refreshTimeout);
  const { accessToken, isAuthenticated } = get();

  if (accessToken && isAuthenticated) {
    try {
      const decoded = authUtils.decodeToken(accessToken);
      const exp = decoded.exp * 1000;
      const timeToRefresh = exp - Date.now() - 10000; // 10 segundos antes
      if (timeToRefresh > 0) {
        refreshTimeout = setTimeout(() => {
          get().refreshAccessToken();
        }, timeToRefresh);
      } else {
        console.log("Token ya expirado, refrescando inmediatamente");
        get().refreshAccessToken();
      }
    } catch (error) {
      console.error("Error decoding token for proactive refresh:", error);
      get().refreshAccessToken(); // Intenta refrescar si hay error
    }
  }
};

export const useAuthStore = create<AuthState>()(
  persist(createAuthStore, {
    name: "auth-storage",
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
      if (state?.accessToken && state?.refreshToken && state?.userId) {
        try {
          const decoded = authUtils.decodeToken(state.accessToken);
          if (decoded.exp * 1000 > Date.now()) {
            state.userId = authUtils.getUserIdFromToken(state.accessToken);
            state.isAuthenticated = true;
            startTokenRefresh(
              (partial) => Object.assign(state, partial), // Pass a mock set function
              () => state,
            ); // Inicia el refresco al rehidratar
          } else {
            state.refreshAccessToken(); // Refresca si está expirado
          }
        } catch {
          state.refreshAccessToken(); // Intenta refrescar si hay error
        }
      }
      if (state) {
        state.isLoading = false;
      }
    },
  }),
);
