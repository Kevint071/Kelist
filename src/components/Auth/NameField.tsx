import { User } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface NameFieldProps {
  register: UseFormRegisterReturn;
  error?: string;
  label: string;
  placeholder: string;
}

export default function NameField({ register, error, label, placeholder }: NameFieldProps) {
  return (
    <div className="flex-1">
      <label
        htmlFor={register.name}
        className="mb-1 block text-sm text-gray-300"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          {...register}
          className="w-full rounded-lg border border-gray-500/50 bg-[#131b2e]/70 px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none"
          placeholder={placeholder}
        />
        <User
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
