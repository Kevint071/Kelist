interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    console.log("EMAIL", email, "PASSWORD", password);
    const res = await fetch("http://localhost:5206/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.title || "Login failed");
    }
    return data;
  },

  refreshToken: async (
    userId: string,
    refreshToken: string,
  ): Promise<{
    success: boolean;
    data?: RefreshTokenResponse;
    error?: string;
  }> => {
    try {
      const res = await fetch("http://localhost:5206/api/auth/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, refreshToken }),
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          error: data.title || "Failed to refresh token",
        };
      }

      return { success: true, data };
    } catch (error) {
      console.error("Error en refreshToken:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  },
};
