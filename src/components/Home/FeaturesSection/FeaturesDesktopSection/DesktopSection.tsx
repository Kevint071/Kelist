"use client";
import { motion } from "framer-motion";
import features from "@/data/features";
import RectLine from "@/components/ui/RectLine";
import H2Title from "@/components/Home/FeaturesSection/H2Title";
import FeatureCard from "@/components/Home/FeaturesSection/FeaturesDesktopSection/FeatureCard";

// Versión original para pantallas grandes (desktop)
export default function DesktopSection() {
  return (
    <section className="relative my-10 w-full py-10 pb-14">
      <div className="mx-auto mt-8 max-w-7xl px-4">
        <H2Title />
        <div className="relative space-y-32">
          <RectLine />
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative z-10 flex items-center flex-row gap-24"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? "order-1" : "order-2"
                }`}
              >
                <FeatureCard feature={feature} />
              </div>
              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? "order-2" : "order-1"
                } flex items-center justify-center`}
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-[#4A90E2] to-[#A259FF]">
                  <span className="text-4xl font-bold text-white">
                    {index + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
