// components/Auth/PasswordField.tsx
import { UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

interface PasswordFieldProps {
  register: UseFormRegisterReturn;
  error?: string;
  label?: string; // Opcional, por defecto "Contraseña"
  toggleState?: boolean; // Estado externo para mostrar/ocultar contraseña
  setToggleState?: (value: boolean) => void; // Función para cambiar el estado externo
  focusColor?: string; // Color de enfoque personalizado
}

export default function PasswordField({
  register,
  error,
  label = "Contraseña",
  toggleState,
  setToggleState,
  focusColor = "cyan-500",
}: PasswordFieldProps) {
  const [internalShowPassword, setInternalShowPassword] = useState(false);
  const showPassword =
    toggleState !== undefined ? toggleState : internalShowPassword;
  const togglePassword = setToggleState || setInternalShowPassword;

  return (
    <div>
      <label
        htmlFor={register.name}
        className="mb-1 block text-sm text-gray-300"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          {...register}
          className={`w-full rounded-lg border border-gray-500/50 bg-[#131b2e]/70 px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-${focusColor}/50 focus:outline-none`}
          placeholder="********"
        />
        <Lock
          className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
          size={18}
        />
        <button
          type="button"
          onClick={() => togglePassword(!showPassword)}
          className={`absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-${focusColor.replace("500", "400")}`}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <p className="absolute my-0.5 text-xs font-bold text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
