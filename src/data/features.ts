import React from "react";
import { CheckCircle, Clock, Users, Zap } from "lucide-react";

const features = [
  {
    icon: React.createElement(Zap, {color: "#4A90E2"}),
    title: "Gestión Rápida",
    description:
      "Organiza tus tareas en segundos con nuestra interfaz intuitiva y rápida. Aumenta tu productividad sin complicaciones.",
  },
  {
    icon: React.createElement(Clock, {color: "#A259FF"}),
    title: "Recordatorios Inteligentes",
    description:
      "Nunca olvides una tarea importante. Nuestro sistema de recordatorios se adapta a tu rutina para mantener todo bajo control.",
  },
  {
    icon: React.createElement(Users, {color: "#FF6B6B"}),
    title: "Colaboración Eficiente",
    description:
      "Trabaja en equipo sin esfuerzo. Comparte proyectos, asigna tareas y mantén a todos sincronizados en tiempo real.",
  },
  {
    icon: React.createElement(CheckCircle, {color: "#4CD97B"}),
    title: "Seguimiento de Progreso",
    description:
      "Visualiza tu avance con gráficos interactivos. Celebra tus logros y mantén la motivación para alcanzar tus metas.",
  },
];

export default features;
