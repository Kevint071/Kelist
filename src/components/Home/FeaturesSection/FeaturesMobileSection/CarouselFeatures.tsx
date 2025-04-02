import { motion, AnimatePresence } from "framer-motion";
import features from "@/data/features";
import React from "react";

interface CarouselFeaturesProps {
  currentIndex: number;
  direction: number;
}

const CarouselFeatures: React.FC<CarouselFeaturesProps> = ({
  currentIndex,
  direction,
}) => {
  // Variantes para las animaciones
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="wrap relative mb-4 w-full">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: {
              type: "spring",
              stiffness: 300,
              damping: 30,
            },
            opacity: { duration: 0.2 },
          }}
          className="h-full w-full"
        >
          <div className="relative h-full w-full">
		  <div className="absolute inset-5 rounded-3xl bg-gradient-to-r from-[#4A90E2] to-[#A259FF] opacity-25 blur-xl scale-105"></div>

            <div className="relative min-h-full w-full rounded-3xl border border-gray-800 bg-[#0A0B14] p-6 shadow-2xl">
              <div className="relative flex flex-row items-center gap-4">
                {features[currentIndex].icon.type &&
                  React.createElement(features[currentIndex].icon.type, {
                    ...features[currentIndex].icon.props,
                    className:
                      "sm:w-12 sm:h-12 w-8 h-8 mb-2 shrink-0",
                    strokeWidth: 1.5,
                  })}
                <h3 className="mb-2 text-2xl font-semibold break-words text-white">
                  {features[currentIndex].title}
                </h3>
              </div>

              <p className="text-md relative mt-4 leading-relaxed break-words text-gray-400 md:text-lg">
                {features[currentIndex].description}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CarouselFeatures;
