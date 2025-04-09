import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Cache para la clave de firma
let cachedSigningKey: string | null = null;
let lastFetched = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora

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

async function verifyToken(token: string, secret: Uint8Array) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ] as string;
  } catch (error) {
    console.error("Error al verificar token:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;
  const publicRoutes = ["/auth/acceder", "/auth/registrarse"];

  const signingKey = await fetchSigningKeyFromVault();
  if (!signingKey) throw new Error("Signing key is null");
  const secret = new TextEncoder().encode(signingKey);

  // Caso 1: Usuario autenticado intenta acceder a la página de login
  if (accessToken && pathname === "/auth/acceder") {
    const userId = await verifyToken(accessToken, secret);
    if (userId) {
      return NextResponse.redirect(
        new URL(`/dashboard/${userId}`, request.url),
      );
    }
  }

  // Caso 2: Ruta no pública y sin token
  if (!accessToken && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/acceder", request.url));
  }

  // Caso 3: Rutas de dashboard
  if (accessToken && pathname.startsWith("/dashboard/")) {
    const userId = await verifyToken(accessToken, secret);
    if (!userId) {
      return NextResponse.redirect(new URL("/auth/acceder", request.url));
    }
    const urlUserId = pathname.split("/dashboard/")[1]?.split("/")[0];
    if (urlUserId && userId !== urlUserId) {
      return new NextResponse("Acceso denegado", { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/acceder", "/dashboard/:path*"],
};
