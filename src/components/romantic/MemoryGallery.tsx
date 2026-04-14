'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Memory {
  id: number;
  title: string;
  caption: string;
  gradient: string;
  imageUrl: string;
}

const memories: Memory[] = [
  {
    id: 1,
    title: "Best Place",
    caption: "Time stood still as we shared our first adventure together. Every moment was perfect.",
    gradient: "from-pink-500 to-rose-600",
    imageUrl: "/images/photo1.jpg"
  },
  {
    id: 2,
    title: "Date Magic",
    caption: "Best isolation",
    gradient: "from-purple-500 to-pink-600",
    imageUrl: "/images/image2.jpg"
  },
  {
    id: 3,
    title: "Best Time Ever",
    caption: "Every journey with you is a treasure. Together, we create memories that last a lifetime.",
    gradient: "from-rose-500 to-purple-600",
    imageUrl: "/images/photo3.jpg"
  },
  {
    id: 4,
    title: "Quiet Moments",
    caption: "In your arms, I find peace. The sweetest moments are the ones we share in silence.",
    gradient: "from-pink-600 to-purple-500",
    imageUrl: "/images/photo4.jpg"
  },
  {
    id: 5,
    title: "First Time",
    caption: "Every celebration is brighter with you by my side. You make ordinary moments extraordinary.",
    gradient: "from-purple-600 to-rose-500",
    imageUrl: "/images/image5.jpg"
  },
];

export default function MemoryGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setImageLoaded(false);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = memories.length - 1;
      if (nextIndex >= memories.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentMemory = memories[currentIndex];

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-pink-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" fill="currentColor" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-400 to-purple-400 mb-4">
            Our Memories
          </h2>
          <p className="text-pink-200/60 text-lg max-w-2xl mx-auto">
            A collection of precious moments that tell our beautiful story
          </p>
        </motion.div>

        {/* Gallery Card - Flexible frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main container */}
          <div className="relative rounded-3xl overflow-hidden glassmorphism p-2 md:p-3">
            {/* Inner frame */}
            <div className="relative rounded-2xl overflow-hidden bg-black/30 border border-pink-500/20">
              
              {/* Loading skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 animate-pulse flex items-center justify-center z-10">
                  <div className="w-12 h-12 border-4 border-pink-400/30 border-t-pink-400 rounded-full animate-spin" />
                </div>
              )}

              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }}
                  className="relative flex items-center justify-center"
                >
                  {/* Image - ALWAYS CONTAIN (full image visible) */}
                  <img
                    src={currentMemory.imageUrl}
                    alt={currentMemory.title}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-auto max-h-[70vh] object-contain transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-pink-400/40 rounded-tl-lg pointer-events-none" />
              <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-pink-400/40 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-pink-400/40 rounded-bl-lg pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-pink-400/40 rounded-br-lg pointer-events-none" />

              {/* Navigation buttons */}
              <button
                onClick={() => paginate(-1)}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full glassmorphism flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-pink-500/30"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              
              <button
                onClick={() => paginate(1)}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full glassmorphism flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-pink-500/30"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* Text section below image */}
          <motion.div
            key={`text-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-6 px-4"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400 mb-2">
              {currentMemory.title}
            </h3>
            <p className="text-pink-200/70 text-base md:text-lg max-w-xl mx-auto">
              {currentMemory.caption}
            </p>
          </motion.div>
        </motion.div>

        {/* Dots indicator */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {memories.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setImageLoaded(false);
                setCurrentIndex(index);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? "w-8 h-3 bg-gradient-to-r from-pink-500 to-purple-500" 
                  : "w-3 h-3 bg-pink-500/30 hover:bg-pink-500/50"
              }`}
              aria-label={`Go to memory ${index + 1}`}
            />
          ))}
        </div>

        {/* Memory counter */}
        <div className="text-center mt-4">
          <span className="text-pink-300/50 text-sm">
            {currentIndex + 1} / {memories.length}
          </span>
        </div>
      </div>
    </section>
  );
}
