'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Image as ImageIcon } from 'lucide-react';

interface Memory {
  id: number;
  title: string;
  caption: string;
  gradient: string;
}

const memories: Memory[] = [
  {
    id: 1,
    title: "Our First Meeting",
    caption: "The day my world changed forever. When our eyes met, I knew my heart had found its home.",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    id: 2,
    title: "First Date Magic",
    caption: "Time stood still as we shared our first adventure together. Every moment was perfect.",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    id: 3,
    title: "Our Adventures",
    caption: "Every journey with you is a treasure. Together, we create memories that last a lifetime.",
    gradient: "from-rose-500 to-purple-600"
  },
  {
    id: 4,
    title: "Quiet Moments",
    caption: "In your arms, I find peace. The sweetest moments are the ones we share in silence.",
    gradient: "from-pink-600 to-purple-500"
  },
  {
    id: 5,
    title: "Celebrations",
    caption: "Every celebration is brighter with you by my side. You make ordinary moments extraordinary.",
    gradient: "from-purple-600 to-rose-500"
  },
  {
    id: 6,
    title: "Forever Us",
    caption: "Every day with you is a gift. Looking forward to a lifetime of memories together.",
    gradient: "from-rose-600 to-pink-500"
  }
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
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-pink-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Heart className="w-12 h-12 text-pink-400" fill="currentColor" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-400 to-purple-400 mb-4">
            Our Memories
          </h2>
          <p className="text-pink-200/60 text-lg max-w-2xl mx-auto">
            A collection of precious moments that tell our beautiful love story
          </p>
        </motion.div>

        {/* Gallery slider */}
        <div className="relative">
          {/* Main slider container */}
          <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden glassmorphism">
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
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0"
              >
                {/* Image placeholder with gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${currentMemory.gradient} opacity-20`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-32 h-32 mx-auto mb-6 rounded-full glassmorphism flex items-center justify-center"
                    >
                      <ImageIcon className="w-16 h-16 text-pink-400/50" />
                    </motion.div>
                    <p className="text-pink-200/40 text-sm">Add your special photo here</p>
                  </div>
                </div>

                {/* Memory content overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                  >
                    {currentMemory.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-pink-100/80 text-lg md:text-xl max-w-2xl"
                  >
                    {currentMemory.caption}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glassmorphism flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glassmorphism flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {memories.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-pink-500 w-8' 
                    : 'bg-pink-500/30 hover:bg-pink-500/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Memory counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <span className="text-pink-300/60">
            Memory {currentIndex + 1} of {memories.length}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
