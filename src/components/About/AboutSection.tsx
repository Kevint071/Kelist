import { useVisibility } from "@/hooks/About/useVisibility";
import { Heart } from "lucide-react";

function AboutSection() {
  const isVisible = useVisibility();
  return (
    <div
      className={`relative mb-16 ${isVisible ? "fade-in-up delay-300" : "opacity-0"}`}
    >
      <div className="relative rounded-[2.5rem] p-8 md:p-10">
        <div className="mb-6 flex items-center">
          <Heart className="mr-3 h-6 w-6 text-red-400" />
          <h2 className="text-2xl font-semibold text-cyan-300">La Visión</h2>
        </div>

        <div className="flex flex-col gap-y-10 text-gray-300 md:gap-y-8">
          <p className="leading-relaxed">
            Kelist nació como una solución personal para simplificar la vida
            digital. Desarrollada con pasión y atención al detalle, esta
            plataforma combina elegancia visual con funcionalidad intuitiva.
          </p>

          <blockquote className="border-l-2 border-cyan-500/50 pl-4 text-cyan-200/80 italic">
            "La simplicidad es la máxima sofisticación. Kelist busca
            desmitificar la complejidad tecnológica ofreciendo una experiencia
            fluida y accesible."
          </blockquote>

          <p className="leading-relaxed">
            Mi objetivo es ofrecer una experiencia digital que respete tu tiempo
            y atención, combinando autenticación moderna, diseño cuidado y
            tecnología eficiente para que puedas enfocarte en lo que realmente
            importa.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
