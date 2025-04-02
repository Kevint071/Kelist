import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer";

const nunito = Nunito_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kelist",
  description: "Tus tareas en orden, tus metas en acción",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${nunito.className} grid min-h-dvh grid-rows-[auto_1fr_auto] bg-[#000000] text-slate-300`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
