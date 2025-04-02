"use client";
import React from "react";
import { useState } from "react";
import NavigationControls from "@/components/Home/FeaturesSection/FeaturesMobileSection/NavigationControls";
import CarouselFeatures from "@/components/Home/FeaturesSection/FeaturesMobileSection/CarouselFeatures";
import H2Title from "@/components/Home/FeaturesSection/H2Title";

export default function MobileSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  return (
    <section className="relative my-6 w-full overflow-hidden py-10">
      <div className="mx-auto max-w-7xl px-4">
        <H2Title />
        {/* Contenedor del carrusel */}
        <div className="flex flex-col gap-y-6 w-full">
          {/* Carrusel */}
          <CarouselFeatures currentIndex={currentIndex} direction={direction} />
          <NavigationControls
            setDirection={setDirection}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
          />
        </div>
      </div>
    </section>
  );
}
