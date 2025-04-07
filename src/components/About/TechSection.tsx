import { useVisibility, useTechCarousel } from "@/hooks/About";
import { Layers2 } from "lucide-react";
import technologies from "@/data/technologies";

function TechSection() {
  const isVisible = useVisibility();
  const currentTech = useTechCarousel();
  return (
    <div
      className={`relative mb-16 flex items-center justify-center overflow-hidden ${isVisible ? "fade-in-up delay-500" : "opacity-0"}`}
    >
      <div className="relative flex-col items-center">
        <div className="mb-6 flex items-center justify-center">
          <div className="relative inline-flex items-center">
            <Layers2 className="absolute -left-9 h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl font-semibold text-cyan-300">
              Stack Tecnológico
            </h2>
          </div>
        </div>

        {/* Carrusel de tecnologías */}
        <div className="relative flex h-32 w-full justify-center">
          <div className="relative flex w-32 items-center justify-center">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className={`absolute flex transform items-center justify-center transition-all duration-500 ${
                  currentTech === index
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-0"
                }`}
              >
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-full md:h-26 md:w-26 ${tech.bg}`}
                >
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="h-16 w-16 object-contain md:h-18 md:w-18"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Descripción centrada */}
        <div className="relative max-w-md rounded-xl border border-zinc-800/50 bg-transparent p-6 text-center backdrop-blur-sm">
          <h3
            className={`mb-2 text-xl font-medium ${technologies[currentTech].color}`}
          >
            {technologies[currentTech].name}
          </h3>
          <p className="text-gray-300/90">
            {technologies[currentTech].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TechSection;
