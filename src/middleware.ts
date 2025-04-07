import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { useAuthStore } from "@/lib/authStore";

// Cache para la clave de firma
let cachedSigningKey: string | null;
let lastFetched = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora

// Obtener la clave desde Vault
async function fetchSigningKeyFromVault() {
  if (cachedSigningKey && Date.now() - lastFetched < CACHE_DURATION) {
    return cachedSigningKey;
  }

  const response = await fetch(
    `${process.env.VAULT_ADDR}/v1/secret/data/jwt-signing-key`,
    {
      headers: { "X-Vault-Token": process.env.VAULT_TOKEN || "" },
    },
  );

  if (!response.ok) throw new Error("Error al obtener la clave de Vault");
  const data = await response.json();
  cachedSigningKey = data.data.data["key"];
  lastFetched = Date.now();
  return cachedSigningKey;
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;
  const publicRoutes = ["/auth/acceder", "/auth/registrarse"];

  const signingKey = await fetchSigningKeyFromVault();
  if (!signingKey) {
    throw new Error("Signing key is null");
  }
  const secret = new TextEncoder().encode(signingKey);

  if (accessToken && pathname === "/auth/acceder") {
    try {
      const { payload } = await jwtVerify(accessToken, secret);
      const userIdFromToken =
        payload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      return NextResponse.redirect(
        new URL(`/dashboard/${userIdFromToken}`, request.url),
      );
    } catch (error) {
      console.error("Token inválido o expirado en /auth/acceder:", error);
      return NextResponse.next();
    }
  }

  if (!accessToken && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/acceder", request.url));
  }

  if (accessToken && pathname.startsWith("/dashboard/")) {
    try {
      const { payload } = await jwtVerify(accessToken, secret);
      const userIdFromToken =
        payload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      const urlUserId = pathname.split("/dashboard/")[1]?.split("/")[0];

      if (urlUserId && userIdFromToken !== urlUserId) {
        return new NextResponse("Acceso denegado", { status: 403 });
      }
    } catch (error) {
      console.error("Token inválido o expirado en /dashboard:", error);
      const { refreshAccessToken, accessToken: newToken } =
        useAuthStore.getState();

      await refreshAccessToken();
      const updatedToken = useAuthStore.getState().accessToken;
      if (!updatedToken) {
        return NextResponse.redirect(new URL("/auth/acceder", request.url));
      }
      try {
        const { payload } = await jwtVerify(updatedToken, secret);
        const userIdFromToken =
          payload[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];
        const urlUserId = pathname.split("/dashboard/")[1]?.split("/")[0];
        if (urlUserId && userIdFromToken !== urlUserId) {
          return new NextResponse("Acceso denegado", { status: 403 });
        }
      } catch (refreshError) {
        return NextResponse.redirect(new URL("/auth/acceder", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/acceder", "/dashboard/:path*"],
};
