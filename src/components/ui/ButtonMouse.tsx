import { Sparkles } from 'lucide-react';

const ButtonMouse = () => {

  return (
    <div className="flex items-center justify-center p-8">
      <a
        href="/auth/registrarse"
        className="relative group"
      >
        {/* Borde sutil */}
        <div className="absolute inset-0 rounded-lg border border-indigo-500/30 transform transition-all duration-300 group-hover:border-indigo-400/50 group-hover:scale-105" />
        
        {/* Sombra interior sutil */}
        <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_20px_rgba(79,70,229,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Contenido */}
        <div className="relative px-6 py-3 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400 transition-all duration-300 group-hover:text-indigo-300" />
          <span className="font-medium text-gray-300 text-base transition-colors duration-300 group-hover:text-white">Crea tu cuenta ahora</span>
        </div>
        
        {/* Línea de highlight inferior */}
        <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500/80 to-blue-500/80 transform -translate-x-1/2 transition-all duration-300 group-hover:w-full" />
      </a>
    </div>
  );
};

export default ButtonMouse;