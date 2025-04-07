"use client";

import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer";
import EnhancedBackgroundAnimation from "@/components/BackGroundAnimation";
import { usePathname } from "next/navigation";

const nunito = Nunito_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // No mostrar el footer en ciertas rutas
  const pathname = usePathname();
  const noFooterRoutes = ["/dashboard"];
  const hideFooter = noFooterRoutes.some((route) => pathname.startsWith(route));

  return (
    <html lang="es" className="dark">
      <body
        className={`${nunito.className} grid min-h-dvh grid-rows-[auto_1fr_auto] bg-[#000000] text-slate-300`}
      >
        <Navbar />
        <EnhancedBackgroundAnimation />
        {children}
        {!hideFooter && <Footer />}
      </body>
    </html>
  );
}
