"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import BackGroundAnimation from "@/components/BackGroundAnimation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import { TitleForm, TermsAndPrivacyNotice } from "@/components/Auth";
import Checkbox from "@/components/ui/Checkbox";
import ButtonHighLight from "@/components/ui/ButtonHighLight";
import AccountExists from "@/components/Auth/AccountExists";

export default function Acceder() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const result = await login(data.email, data.password);
    if (result.success && result.userId) {
      router.push(`/dashboard/${result.userId}`);
    } else {
      setError(
        "Error al iniciar sesión o no se encontró el correo del usuario",
      );
    }
  });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#050a14] via-[#0a1020] to-[#0c1425] p-4">
      <BackGroundAnimation />
      {/* Contenedor principal */}
      <div className="relative z-10 mt-5 mb-20 w-full max-w-md">
        <TitleForm
          title="¡Accede a tu cuenta!"
          description="Conéctate a Kelist y toma el control de tu día."
        />
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
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
            <Checkbox />
            <label htmlFor="recordar" className="ml-2 text-sm text-gray-300">
              Recordar mi sesión
            </label>
          </div>

          <ButtonHighLight type="submit" children="Iniciar Sesión" />
          <AccountExists
            question="¿No tienes una cuenta?"
            action="Regístrate"
            href="/auth/registrarse"
          />
          <TermsAndPrivacyNotice message="Al iniciar sesión, aceptas nuestros" />
        </form>
      </div>
    </div>
  );
}
