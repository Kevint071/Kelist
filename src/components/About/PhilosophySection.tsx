import { useVisibility } from "@/hooks/About/useVisibility";
import { Coffee } from "lucide-react";

function PhilosophySection() {
  const isVisible = useVisibility();
  return (
    <div
      className={`relative mb-16 ${isVisible ? "fade-in-up delay-500" : "opacity-0"}`}
    >
      <div className="relative rounded-2xl border border-purple-800/20 bg-gradient-to-br from-purple-900/20 to-blue-900/10 p-8 md:p-10">
        <div className="mb-6 flex items-center">
          <Coffee className="mr-3 h-6 w-6 text-amber-400" />
          <h2 className="text-2xl font-semibold text-cyan-300">
            Filosofía de Diseño
          </h2>
        </div>

        <div className="space-y-8 text-gray-300">
          <div className="relative pl-8 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-cyan-400 before:to-cyan-400/0 before:content-['']">
            <h3 className="mb-2 text-lg font-medium text-cyan-200">
              Minimalismo Funcional
            </h3>
            <p>
              Cada elemento tiene un propósito. Eliminamos lo innecesario para
              que puedas concentrarte en lo esencial, sin distracciones visuales
              o funcionales.
            </p>
          </div>

          <div className="relative pl-8 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-purple-400 before:to-purple-400/0 before:content-['']">
            <h3 className="mb-2 text-lg font-medium text-purple-200">
              Experiencia Fluida
            </h3>
            <p>
              Navegación intuitiva y transiciones suaves crean un recorrido
              digital sin fricciones. Cada interacción está cuidadosamente
              diseñada.
            </p>
          </div>

          <div className="relative pl-8 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-blue-400 before:to-blue-400/0 before:content-['']">
            <h3 className="mb-2 text-lg font-medium text-blue-200">
              Seguridad Transparente
            </h3>
            <p>
              La protección de datos y la privacidad son fundamentales.
              Implementamos medidas de seguridad robustas que funcionan
              discretamente en segundo plano.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhilosophySection;
