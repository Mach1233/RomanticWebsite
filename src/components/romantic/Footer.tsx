'use client';

import { motion } from 'framer-motion';
import { Heart, HandHeart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12 mt-auto">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-500/50" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HandHeart className="w-6 h-6 text-pink-400" />
          </motion.div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-500/50" />
        </div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-pink-200/60 text-lg mb-4"
        >
          Made with care and genuine intentions
        </motion.p>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-400 to-purple-400"
        >
          Wishing You Peace & Happiness
        </motion.div>

        {/* Extra note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-pink-200/40 text-sm mt-4 max-w-md mx-auto"
        >
          Whatever you decide, know that your happiness matters. 
          Take all the time you need. 💕
        </motion.p>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-pink-200/30 text-sm mt-6"
        >
          © {new Date().getFullYear()} • Sent With Sincerity
        </motion.p>
      </div>
    </footer>
  );
}
