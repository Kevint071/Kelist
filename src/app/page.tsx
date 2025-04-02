import FeaturesSection from "@/components/Home/FeaturesSection/FeaturesSection";
import BackgroundAnimation from "@/components/BackGroundAnimation";
import MainSection from "@/components/Home/MainSection";
import CTASection from "@/components/Home/CTASection";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950 text-gray-100">
      <BackgroundAnimation />
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-12">
        <MainSection />
        <FeaturesSection />
        <CTASection />
      </div>
    </div>
  );
}
