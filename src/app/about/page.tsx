"use client";

import { useVisibility } from "@/hooks/About/useVisibility";
import {
  IntroSection,
  AboutSection,
  TechSection,
  PhilosophySection,
  ContactSection,
} from "@/components/About";

export default function About() {
  const isVisible = useVisibility();

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden p-4">
      <main
        className={`relative z-10 mx-auto w-full max-w-4xl px-4 py-16 md:px-0 ${isVisible ? "fade-in" : "opacity-0"}`}
      >
        <IntroSection />
        <AboutSection />
        <TechSection />
        <PhilosophySection />
        <ContactSection />
      </main>
    </div>
  );
}
