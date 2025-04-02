"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const EnhancedBackgroundAnimation = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  interface Particle {
    id: number;
    left: number;
    top: number;
    size: number;
    duration: number;
    delay: number;
    opacityMax: number;
    yMovementRange: number;
  }

  const [particles, setParticles] = useState<Particle[]>([]);

  // Creación de partículas con distribución aleatoria
  const generateParticles = () => {
    const particles = [];
    const particleCount = 60;

    // Dividir la pantalla en áreas para mejor distribución
    const gridSize = 5; // 5x5 grid = 25 áreas
    const particlesPerArea = Math.ceil(particleCount / (gridSize * gridSize));

    const tempParticles = [];

    // Generamos partículas en cada área
    for (let areaX = 0; areaX < gridSize; areaX++) {
      for (let areaY = 0; areaY < gridSize; areaY++) {
        // Para cada área, se crean partículas aleatorias
        for (let i = 0; i < particlesPerArea; i++) {
          // Dimensiones de cada área
          const areaWidth = 100 / gridSize;
          const areaHeight = 100 / gridSize;

          // Posición base de esta área
          const baseLeft = areaX * areaWidth;
          const baseTop = areaY * areaHeight;

          // Posición aleatoria dentro del área
          const left = baseLeft + Math.random() * areaWidth;
          const top = baseTop + Math.random() * areaHeight;

          // Propiedades aleatorias para cada partícula
          const size = Math.random() * 3 + 1;
          const duration = Math.random() * 8 + 12;
          const opacityMax = Math.random() * 0.5 + 0.3;
          const yMovementRange = Math.random() * 40 + 20;

          tempParticles.push({
            left,
            top,
            size,
            duration,
            opacityMax,
            yMovementRange,
            area: `${areaX}-${areaY}`, // Solo para referencia
          });
        }
      }
    }

    // Desordena aleatoriamente el array para eliminar patrones visibles
    const shuffle = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const shuffledParticles = shuffle(tempParticles);

    // Usa solo las primeras 'particleCount' partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        left: shuffledParticles[i].left,
        top: shuffledParticles[i].top,
        size: shuffledParticles[i].size,
        duration: shuffledParticles[i].duration,
        delay: shuffledParticles[i].delay,
        opacityMax: shuffledParticles[i].opacityMax,
        yMovementRange: shuffledParticles[i].yMovementRange,
      });
    }

    return particles;
  };

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  return (
    <>
      {/* Fondo de base para prevenir el flash de fondo blanco */}
      <div className="animate-fadeIn absolute inset-0 z-0 bg-gradient-to-br from-black via-slate-900 to-black" />

      {/* Efecto de partículas flotantes mejorado con aparición INMEDIATA */}
      <div className="absolute inset-0 z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              // Hacemos que las primeras partículas tengan una opacidad inicial para evitar el flash
              opacity: particle.id < 15 ? particle.opacityMax * 0.8 : 0,
            }}
            // Las primeras partículas comienzan ya visibles para efecto inmediato
            initial={
              particle.id < 15
                ? {
                    opacity: particle.opacityMax * 0.9,
                    y: -particle.yMovementRange * 0.5,
                    scale: 1,
                  }
                : {
                    opacity: 0,
                    y: -10,
                    scale: 0.6,
                  }
            }
            animate={{
              y: [-10, -particle.yMovementRange, -10],
              opacity: [
                // Valores personalizados según el índice de la partícula
                particle.id < 15 ? particle.opacityMax * 0.9 : 0.3,
                particle.opacityMax,
                0.3,
              ],
              scale: [
                // Las primeras partículas comienzan más grandes
                particle.id < 15 ? 0.9 : 0.6,
                1,
                0.6,
              ],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: particle.duration * 0.8,
              delay: particle.delay * 0.5,
              times: [0, 0.5, 1], // Controla los puntos de transición
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Efecto de vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-black/50"
        style={{
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%)",
        }}
      />
    </>
  );
};

export default EnhancedBackgroundAnimation;
