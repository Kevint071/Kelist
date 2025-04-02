"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MobileMenu from "@/components/NavBar/MobileMenu";
import { useAuthStore } from "@/lib/authStore";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, isLoading, logout } = useAuthStore();

  // Marcar como montado solo en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Función para cerrar el menú cuando se hace clic en un enlace
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Función para manejar clics fuera del menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Si no está montado o está cargando, renderiza un estado intermedio
  if (!isMounted || isLoading) {
    return (
      <nav className="sticky top-0 z-50 shadow-md bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto flex h-16 items-center justify-between">
            <Link href="/" className="group flex-shrink-0 font-bold">
              <span className="text-2xl font-bold text-cyan-400 transition-colors duration-300 group-hover:text-purple-400">
                K
              </span>
              <span className="text-xl text-gray-300 transition-colors duration-300 group-hover:text-cyan-400">
                elist
              </span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link
            href="/"
            className="group flex-shrink-0 font-bold"
            onClick={handleLinkClick}
          >
            <span className="text-2xl font-bold text-cyan-400 transition-colors duration-300 group-hover:text-purple-400">
              K
            </span>
            <span className="text-xl text-gray-300 transition-colors duration-300 group-hover:text-cyan-400">
              elist
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/about"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={handleLinkClick}
              >
                Acerca De
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <button
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={logout}
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/acceder"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Acceder
                  </Link>
                  <Link
                    href="/auth/registrarse"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <MobileMenu setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>

        {/* Mobile menu dropdown */}
        <div
          ref={menuRef}
          className={`md:hidden ${isOpen ? "block" : "hidden"}`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <Link
              href="/dashboard"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={handleLinkClick}
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={handleLinkClick}
            >
              Acerca De
            </Link>
            {isAuthenticated ? (
              <button
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => {
                  handleLinkClick();
                  logout();
                }}
              >
                Cerrar sesión
              </button>
            ) : (
              <>
                <Link
                  href="/auth/acceder"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={handleLinkClick}
                >
                  Acceder
                </Link>
                <Link
                  href="/auth/registrarse"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={handleLinkClick}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
