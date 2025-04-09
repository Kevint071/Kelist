"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import BackGroundAnimation from "@/components/BackGroundAnimation";
import {
  TitleForm,
  TermsAndPrivacyNotice,
  NameField,
  EmailField,
  PasswordField,
  AccountExists,
} from "@/components/Auth";
import ButtonHighLight from "@/components/ui/ButtonHighLight";

interface FormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function Registrarse() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
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
      <div className="relative z-10 mt-5 mb-20 w-full max-w-md">
        <TitleForm
          title="Crea tu cuenta"
          description="Únete a Kelist y organiza tu día con facilidad"
        />
        <form onSubmit={onSubmit} className="space-y-7">
          {/* Campos de nombres y apellidos */}
          <div className="flex space-x-4">
            <NameField
              register={register("name", {
                required: "El nombre es obligatorio",
              })}
              error={errors.name?.message}
              label="Nombres"
              placeholder="Jhon Carlos"
            />
            <NameField
              register={register("lastName", {
                required: "El apellido es obligatorio",
              })}
              error={errors.lastName?.message}
              label="Apellidos"
              placeholder="Perez Arévalo"
            />
          </div>

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

          {/* Confirmar contraseña */}
          <PasswordField
            register={register("passwordConfirmation", {
              required: "La confirmación de la contraseña es obligatoria",
            })}
            error={errors.passwordConfirmation?.message}
            label="Confirmar contraseña"
            toggleState={showConfirmPassword}
            setToggleState={setShowConfirmPassword}
            focusColor="blue-500"
          />

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
