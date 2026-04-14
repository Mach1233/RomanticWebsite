'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Memory {
  id: number;
  title: string;
  caption: string;
  gradient: string;
  imageUrl: string; // ✅ added image field
}

const memories: Memory[] = [
  {
    id: 1,
    title: "Best Place",
    caption: "Time stood still as we shared our first adventure together. Every moment was perfect.",
    gradient: "from-pink-500 to-rose-600",
    imageUrl: "/images/photo1.jpg" // 👈 replace with your image
  },
  {
    id: 2,
    title: " Date Magic",
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
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
      {/* background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-pink-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* title */}
        <div className="text-center mb-12">
          <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-400 to-purple-400 mb-4">
            Our Memories
          </h2>
          <p className="text-pink-200/60 text-lg max-w-2xl mx-auto">
            A collection of precious moments that tell our beautiful love story
          </p>
        </div>

        {/* slider */}
        <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden">

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0"
            >

              {/* ✅ REAL IMAGE */}
              <img
                src={currentMemory.imageUrl}
                alt={currentMemory.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentMemory.gradient} opacity-20`} />

              {/* dark overlay for text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* text */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {currentMemory.title}
                </h3>
                <p className="text-pink-100/80 text-lg md:text-xl max-w-2xl">
                  {currentMemory.caption}
                </p>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* nav */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 text-white"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 text-white"
          >
            <ChevronRight />
          </button>
        </div>

        {/* dots */}
        <div className="flex justify-center gap-2 mt-6">
          {memories.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-pink-500 w-8" : "bg-pink-500/30"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
