"use client";

import MobileSection from "@/components/Home/FeaturesSection/FeaturesMobileSection/MobileSection";
import DesktopSection from "@/components/Home/FeaturesSection/FeaturesDesktopSection/DesktopSection";
import { useState, useEffect } from "react";

function FeaturesSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Ejecutar una vez al montar el componente para establecer el estado inicial
    handleResize();

    // Escucha el redimensionamiento de la ventana
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileSection /> : <DesktopSection />;
}

export default FeaturesSection;
