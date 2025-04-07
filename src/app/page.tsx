import FeaturesSection from "@/components/Home/FeaturesSection/FeaturesSection";
import MainSection from "@/components/Home/MainSection";
import CTASection from "@/components/Home/CTASection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelist",
  description: "Tus tareas en orden, tus metas en acción",
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden text-gray-100">
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-12">
        <MainSection />
        <FeaturesSection />
        <CTASection />
      </div>
    </div>
  );
}
