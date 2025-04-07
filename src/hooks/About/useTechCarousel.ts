"use client";

import { useState, useEffect } from "react";
import technologies from "@/data/technologies";

export function useTechCarousel() {
  const [currentTech, setCurrentTech] = useState(0);

  useEffect(() => {
    const techInterval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % technologies.length);
    }, 3500);

    return () => clearInterval(techInterval);
  }, []);

  return currentTech;
}