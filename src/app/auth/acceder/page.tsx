"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import BackGroundAnimation from "@/components/BackGroundAnimation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import TitleForm from '@/components/Auth/TitleForm'

export default function Acceder() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch("http://localhost:5206/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resJSON = await res.json();
      console.log(resJSON);

      if (res.ok) {
        setTokens(resJSON.accessToken, resJSON.refreshToken);
        router.push("/dashboard");
        router.refresh();
      } else {
        alert(resJSON.title || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      alert("Ocurrió un error al intentar iniciar sesión");
    }
  });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#050a14] via-[#0a1020] to-[#0c1425] p-4">
      <BackGroundAnimation />
      {/* Contenedor principal */}
      <div className="relative z-10 mt-5 mb-20 w-full max-w-md">
        <TitleForm title="¡Accede a tu cuenta!" description="Conéctate a Kelist y toma el control de tu día."/>
        <form onSubmit={onSubmit} className="space-y-7">
          {/* Correo electrónico */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-gray-300">
              Correo electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El correo electrónico es obligatorio",
                  },
                })}
                className="w-full rounded-lg border border-gray-500/50 bg-[#131b2e]/70 px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none"
                placeholder="userexample@email.com"
              />
              <Mail
                className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                size={18}
              />
            </div>
            {errors.email?.message && (
              <p className="absolute my-0.5 text-xs font-bold text-red-500">
                {String(errors.email.message)}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm text-gray-300"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es obligatoria",
                  },
                })}
                className="w-full rounded-lg border border-gray-500/50 bg-[#131b2e]/70 px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none"
                placeholder="********"
              />
              <Lock
                className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                size={18}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-cyan-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password?.message && (
              <p className="absolute my-0.5 text-xs font-bold text-red-500">
                {String(errors.password.message)}
              </p>
            )}
          </div>

          {/* Checkbox para recordar sesión */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="recordar"
              className="h-4 w-4 rounded border-gray-700 text-cyan-500 focus:ring-cyan-500"
            />
            <label htmlFor="recordar" className="ml-2 text-sm text-gray-300">
              Recordar mi sesión
            </label>
          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 px-4 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg"
          >
            Iniciar Sesión
          </button>

          {/* Separador */}
          {/*
          <div className="relative flex items-center py-3">
            <div className="flex-grow border-t border-gray-500/50"></div>
            <span className="mx-3 flex-shrink text-sm text-gray-400">o continúa con</span>
            <div className="flex-grow border-t border-gray-500/50"></div>
          </div> */}

          {/* Enlace a login */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300">
                Regístrate
              </Link>
            </p>
          </div>

          {/* Terminos y Política de Privacidad*/}
          <div className="mt-4 text-center font-semibold">
            <p className="text-xs text-gray-400">
              Al registrarte, aceptas nuestros{" "}
              <Link href="/terms" className="text-cyan-400 hover:text-cyan-400">
                Términos
              </Link>{" "}
              y{" "}
              <Link
                href="/privacy"
                className="text-cyan-400 hover:text-cyan-400"
              >
                Política de Privacidad
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
