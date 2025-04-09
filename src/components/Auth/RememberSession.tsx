import Checkbox from "@/components/ui/Checkbox";

export default function RememberSession() {
    return (
      <div className="flex items-center">
        <Checkbox />
        <label htmlFor="recordar" className="ml-2 text-sm text-gray-300">
          Recordar mi sesión
        </label>
      </div>
    );
  }