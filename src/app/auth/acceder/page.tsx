"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import BackGroundAnimation from "@/components/BackGroundAnimation";
import {
  TitleForm,
  TermsAndPrivacyNotice,
  EmailField,
  PasswordField,
  AccountExists,
  RememberSession,
} from "@/components/Auth";
import ButtonHighLight from "@/components/ui/ButtonHighLight";

interface FormData {
  email: string;
  password: string;
}

export default function Acceder() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { login } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const result = await login(data.email, data.password);
    if (result.success && result.userId) {
      router.push(`/dashboard/${result.userId}`);
      console.log(result);
    } else {
      setError(
        "Error al iniciar sesión o no se encontró el correo del usuario",
      );
    }
  });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#050a14] via-[#0a1020] to-[#0c1425] p-4">
      <BackGroundAnimation />
      <div className="relative z-10 mt-5 mb-20 w-full max-w-md">
        <TitleForm
          title="¡Accede a tu cuenta!"
          description="Conéctate a Kelist y toma el control de tu día."
        />
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        <form onSubmit={onSubmit} className="space-y-7">
          <EmailField
            register={register("email", {
              required: "El correo electrónico es obligatorio",
            })}
            error={errors.email?.message}
          />

          <PasswordField
            register={register("password", {
              required: "La contraseña es obligatoria",
            })}
            error={errors.password?.message}
          />

          <RememberSession />

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
