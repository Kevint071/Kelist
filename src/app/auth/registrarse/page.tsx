"use client";

import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { TitleForm, TermsAndPrivacyNotice } from "@/components/Auth";
import { useRouter } from "next/navigation";
import BackGroundAnimation from "@/components/BackGroundAnimation";
import ButtonHighLight from "@/components/ui/ButtonHighLight";
import AccountExists from "@/components/Auth/AccountExists";

export default function Registrarse() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.passwordConfirmation) {
      return alert("Las contraseñas no coinciden");
    }

    try {
      const res = await fetch("http://localhost:5206/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resJSON = await res.json();
      console.log(resJSON);

      if (res.ok) {
        router.push("/auth/acceder");
      } else {
        alert(resJSON.title || "Error al registrarse");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Ocurrió un error al intentar registrarse");
    }
  });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#050a14] via-[#0a1020] to-[#0c1425] p-4">
      <BackGroundAnimation />
      {/* Contenedor principal */}
      <div className="relative z-10 mt-5 mb-20 w-full max-w-md">
        <TitleForm
          title="Crea tu cuenta"
          description="Únete a Kelist y organiza tu día con facilidad"
        />
        <form onSubmit={onSubmit} className="space-y-7">
          {/* Campos de nombres y apellidos */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="name"
                className="mb-1 block text-sm text-gray-300"
              >
                Nombres
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "El nombre es obligatorio",
                    },
                  })}
                  className="w-full rounded-lg border border-gray-500/50 bg-[#131b2e]/70 px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none"
                  placeholder="Jhon Carlos"
                />
                <User
                  className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                  size={18}
                />
              </div>
              {errors.Name?.message && (
                <p className="absolute my-0.5 text-xs font-bold text-red-500">
                  {String(errors.Name.message)}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="mb-1 block text-sm text-gray-300"
              >
                Apellidos
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "El apellido es obligatorio",
                    },
                  })}
                  className="w-full rounded-lg border border-gray-500/50 bg-[#131b2e]/70 px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none"
                  placeholder="Perez Arévalo"
                />
                <User
                  className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                  size={18}
                />
              </div>
              {errors.lastName?.message && (
                <p className="absolute my-0.5 text-xs font-bold text-red-500">
                  {String(errors.lastName.message)}
                </p>
              )}
            </div>
          </div>

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

          {/* Confirmar contraseña */}
          <div>
            <label
              htmlFor="passwordConfirmation"
              className="mb-1 block text-sm text-gray-300"
            >
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("passwordConfirmation", {
                  required: {
                    value: true,
                    message: "La confirmación de la contraseña es obligatoria",
                  },
                })}
                className="w-full rounded-lg border border-gray-500/50 bg-[#131b2e]/70 px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none"
                placeholder="********"
              />
              <Lock
                className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                size={18}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-blue-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.passwordConfirmation?.message && (
              <p className="absolute my-0.5 text-xs font-bold text-red-500">
                {String(errors.passwordConfirmation.message)}
              </p>
            )}
          </div>

          <ButtonHighLight type="submit" children="Registrarse" />
          <AccountExists
            question="¿Ya tienes una cuenta?"
            action="Inicia sesión"
            href="/auth/acceder"
          />
          <TermsAndPrivacyNotice message="Al registrarte, aceptas nuestros" />
        </form>
      </div>
    </div>
  );
}
