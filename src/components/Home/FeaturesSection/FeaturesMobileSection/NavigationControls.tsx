import { ChevronLeft, ChevronRight } from "lucide-react";
import features from "@/data/features";
import React, { useEffect, useRef } from "react";

interface NavigationControlsProps {
  setDirection: (direction: number) => void;
  setCurrentIndex: (index: number | ((prevIndex: number) => number)) => void;
  currentIndex: number;
}

function NavigationControls({
  setDirection,
  setCurrentIndex,
  currentIndex,
}: NavigationControlsProps) {
  const autoPlayRef = useRef<(() => void) | null>(null);

  // Función para manejar el cambio al siguiente slide
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  // Función para manejar el cambio al slide anterior
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + features.length) % features.length,
    );
  };

  // Configurar autoplay
  useEffect(() => {
    autoPlayRef.current = nextSlide;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoPlayRef.current) {
        autoPlayRef.current();
      }
    }, 150000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div
        onClick={prevSlide}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-800 bg-[#0A0B14] text-white shadow-lg transition duration-300 hover:bg-gray-900"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </div>

      {/* Indicadores del carrusel (en medio) */}
      <div className="flex justify-center space-x-2">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-gradient-to-r from-[#4A90E2] to-[#A259FF]"
                : "w-2 bg-gray-700"
            }`}
          />
        ))}
      </div>

      <div
        onClick={nextSlide}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-800 bg-[#0A0B14] text-white shadow-lg transition duration-300 hover:bg-gray-900"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} />
      </div>
    </div>
  );
}

export default NavigationControls;
