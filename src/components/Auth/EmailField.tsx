import { UseFormRegisterReturn } from "react-hook-form";
import { Mail } from "lucide-react";

interface EmailFieldProps {
  register: UseFormRegisterReturn;
  error?: string;
}

export default function EmailField({ register, error }: EmailFieldProps) {
  return (
    <div>
      <label htmlFor="email" className="mb-1 block text-sm text-gray-300">
        Correo electrónico
      </label>
      <div className="relative">
        <input
          type="email"
          {...register}
          className="w-full rounded-lg border border-gray-500/50 bg-[#131b2e]/70 px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none"
          placeholder="userexample@email.com"
        />
        <Mail
          className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
          size={18}
        />
      </div>
      {error && (
        <p className="absolute my-0.5 text-xs font-bold text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}