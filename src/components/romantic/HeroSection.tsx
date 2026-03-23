'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, HandHeart, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(26, 10, 46, 0.8) 0%, rgba(10, 10, 15, 1) 70%)'
        }}
        animate={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      />

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 157, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 30, 
          damping: 20,
          scale: { duration: 4, repeat: Infinity }
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(142, 68, 173, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
        animate={{
          x: -mousePosition.x * 1.5,
          y: -mousePosition.y * 1.5,
          scale: [1, 1.15, 1]
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 30, 
          damping: 20,
          scale: { duration: 5, repeat: Infinity, delay: 1 }
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Decorative icon */}
        <motion.div
          className="absolute -top-20 left-1/2 -translate-x-1/2"
          animate={{
            y: [-5, 5, -5],
            rotate: [-5, 5, -5]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HandHeart className="w-10 h-10 text-pink-400/50" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-400 to-purple-400 text-glow">
            Dear Houda
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl text-pink-200/70 mb-6 max-w-2xl mx-auto"
        >
          I made this space just for you. Not to pressure you, not to ask for anything...
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-lg md:text-xl text-pink-300/60 mb-8 max-w-2xl mx-auto"
        >
          Just to say what&apos;s in my heart, and offer you peace, comfort, and maybe — friendship.
        </motion.p>

        {/* Animated button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-shadow duration-300"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-6 h-6" fill="currentColor" />
          </motion.div>
          Read My Message
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-pink-300/50 cursor-pointer"
            onClick={scrollToContent}
          >
            <span className="text-sm mb-2">Scroll to continue</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            <div 
              className="w-1 h-1 rounded-full bg-pink-400"
              style={{
                boxShadow: '0 0 10px rgba(255, 107, 157, 0.5)'
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
