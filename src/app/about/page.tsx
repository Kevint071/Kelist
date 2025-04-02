"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import BackGroundAnimation from "@/components/BackGroundAnimation";
import { Github, Layers2, Coffee, Heart, ExternalLink } from "lucide-react";
import technologies from "@/data/technologies";

export default function About() {
  // Estado para controlar la aparición de elementos
  const [isVisible, setIsVisible] = useState(false);
  const [currentTech, setCurrentTech] = useState(0);

  // Efecto para controlar la aparición y el cambio de tecnologías
  useEffect(() => {
    setIsVisible(true);

    const techInterval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % technologies.length);
    }, 3500);

    return () => clearInterval(techInterval);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-gradient-to-br from-[#050a14] via-[#0a1020] to-[#0c1425] p-4">
      <BackGroundAnimation />

      {/* Contenido principal */}
      <main
        className={`relative z-10 mx-auto w-full max-w-4xl px-4 py-16 md:px-0 ${isVisible ? "fade-in" : "opacity-0"}`}
      >
        {/* Encabezado personalizado */}
        <div className="mb-12 flex flex-col items-center">
          <div
            className={`text-center ${isVisible ? "fade-in-up delay-200" : "opacity-0"}`}
          >
            <h1 className="mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-5xl font-bold text-transparent">
              Sobre Kelist
            </h1>
            <p className="mx-auto max-w-2xl text-xl font-light text-cyan-200/80">
              Un proyecto personal de{" "}
              <a
                href="https://github.com/Kevint071"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 transition-colors hover:text-cyan-300"
              >
                Kevint071 <Github className="inline h-4 w-4" />
              </a>
            </p>
          </div>
        </div>

        {/* Sección sobre el proyecto */}
        <div
          className={`relative mb-16 ${isVisible ? "fade-in-up delay-300" : "opacity-0"}`}
        >
          <div className="relative rounded-[2.5rem] p-8 md:p-10">
            <div className="mb-6 flex items-center">
              <Heart className="mr-3 h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-semibold text-cyan-300">
                La Visión
              </h2>
            </div>

            <div className=" flex flex-col gap-y-10 md:gap-y-8 text-gray-300">
              <p className="leading-relaxed">
                Kelist nació como una solución personal para simplificar la vida
                digital. Desarrollada con pasión y atención al detalle, esta
                plataforma combina elegancia visual con funcionalidad intuitiva.
              </p>

              <blockquote className="border-l-2 border-cyan-500/50 pl-4 text-cyan-200/80 italic">
                "La simplicidad es la máxima sofisticación. Kelist busca
                desmitificar la complejidad tecnológica ofreciendo una
                experiencia fluida y accesible."
              </blockquote>

              <p className="leading-relaxed">
                Mi objetivo es ofrecer una experiencia digital que respete tu
                tiempo y atención, combinando autenticación moderna, diseño
                cuidado y tecnología eficiente para que puedas enfocarte en lo
                que realmente importa.
              </p>
            </div>
          </div>
        </div>

        {/* Sección de tecnologías - diseño centrado */}
        <div
          className={`relative mb-16 flex items-center justify-center overflow-hidden ${isVisible ? "fade-in-up delay-500" : "opacity-0"}`}
        >
          <div className="relative flex-col items-center">
            {/* Título centrado */}
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
                      className={`flex h-24 w-24 md:h-26 md:w-26 items-center justify-center rounded-full ${tech.bg}`}
                    >
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className="h-16 w-16 md:h-18 md:w-18 object-contain"
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

        {/* Sección de filosofía de diseño - diseño con borde */}
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
                  Cada elemento tiene un propósito. Eliminamos lo innecesario
                  para que puedas concentrarte en lo esencial, sin distracciones
                  visuales o funcionales.
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

        {/* Contacto - diseño con forma orgánica */}
        <div
          className={`relative ${isVisible ? "fade-in-up delay-600" : "opacity-0"}`}
        >
          <div className="relative p-8 text-center">
            <h2 className="mb-6 text-2xl font-semibold text-cyan-300">
              ¿Colaboramos?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-300/90">
              Este proyecto evolucionará con el tiempo. Si tienes ideas,
              sugerencias o quieres contribuir, estoy abierto a colaboraciones
              que mejoren la experiencia Kelist.
            </p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <Link
                href="/contactanos"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 font-medium text-white"
              >
                <span className="relative z-10">Contáctanos</span>
                <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-transform duration-300 group-hover:translate-y-0"></span>
              </Link>
              <a
                href="https://github.com/Kevint071"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center space-x-2 rounded-full border border-cyan-500/50 px-8 py-3 font-medium text-cyan-400 transition-all duration-300 hover:bg-cyan-500/10"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
                <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Estilos de animación */}
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>
    </div>
  );
}
