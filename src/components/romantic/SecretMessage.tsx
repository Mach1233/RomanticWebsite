'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart, Sparkles, Unlock } from 'lucide-react';

export default function SecretMessage() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const secretMessage = {
    title: "My Deepest Secret...",
    content: `My dearest Houda,

There are words that get trapped in my heart, afraid to escape because they carry the weight of my entire soul.

You are not just my love—you are my sanctuary, my peace, my everything. In a world that often feels chaotic and uncertain, you are my constant, my north star.

Every beat of my heart whispers your name. Every dream I have features your smile. Every moment of my life is better because you exist in it.

I promise to love you in all your forms—in joy and in sorrow, in strength and in vulnerability, in every lifetime we share.

This is my promise, my vow, my eternal truth:

You are the love of my life, today and always.

Forever yours,
With all my heart ❤️`
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Magical background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isRevealed 
              ? 'radial-gradient(ellipse at center, rgba(255, 107, 157, 0.1) 0%, transparent 70%)'
              : 'transparent'
          }}
        />
        
        {/* Floating sparkles */}
        {isRevealed && [...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 2,
              repeat: Infinity
            }}
          >
            <Sparkles className="w-4 h-4 text-pink-400/60" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl w-full">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            // Locked state
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Section title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <motion.div
                  animate={{ 
                    rotate: isHovering ? [0, -10, 10, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-4"
                >
                  <Lock className="w-16 h-16 text-pink-400/60" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400">
                  A Secret Message
                </h2>
                <p className="text-pink-200/60 mt-4 max-w-md mx-auto">
                  I&apos;ve hidden something special just for you... Are you ready to discover what&apos;s in my heart?
                </p>
              </motion.div>

              {/* Unlock button */}
              <motion.button
                onClick={() => setIsRevealed(true)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative glassmorphism rounded-2xl px-12 py-6 border border-pink-500/30 hover:border-pink-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Unlock className="w-6 h-6 text-pink-400" />
                    </motion.div>
                    <span className="text-xl font-semibold text-white">
                      Reveal My Heart
                    </span>
                    <Heart className="w-6 h-6 text-pink-400" fill="currentColor" />
                  </div>
                </div>
              </motion.button>

              {/* Hint text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-pink-200/40 text-sm"
              >
                Click to unlock a special message...
              </motion.p>
            </motion.div>
          ) : (
            // Revealed state
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="glassmorphism rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl">
                <div className="absolute inset-[-2px] rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-50 animate-gradient-x" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Heart icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="text-center mb-6"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 glow-pink">
                    <Heart className="w-8 h-8 text-white" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400 mb-8"
                >
                  {secretMessage.title}
                </motion.h3>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-pink-100/90 text-lg leading-relaxed whitespace-pre-line"
                >
                  {secretMessage.content}
                </motion.div>

                {/* Decorative hearts */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-center gap-2 mt-8"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        y: [0, -5, 0]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                    >
                      <Heart 
                        className="w-5 h-5 text-pink-400" 
                        fill="currentColor"
                        style={{ opacity: 1 - i * 0.15 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Glowing effect */}
              <div className="absolute -inset-10 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
