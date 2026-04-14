'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a romantic royalty-free music URL
    // Using a placeholder - in production, you'd use your own hosted audio file
    audioRef.current = new Audio('/song-website.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Hide hint after 5 seconds
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        setShowHint(false);
      }
    } catch (error) {
      console.log('Audio playback failed:', error);
    }
  };

  return (
    <>
      {/* Music button */}
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="music-btn glassmorphism border border-pink-500/30 hover:border-pink-500/50 transition-colors"
      >
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
        >
          {isPlaying ? (
            <Volume2 className="w-6 h-6 text-pink-400" />
          ) : (
            <VolumeX className="w-6 h-6 text-pink-400/60" />
          )}
        </motion.div>

        {/* Sound waves animation when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute -right-1 -top-1 flex gap-0.5"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-pink-400 rounded-full"
                  animate={{
                    height: [4, 12, 4]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Hint tooltip */}
      <AnimatePresence>
        {showHint && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-[5.5rem] right-[5.5rem] z-50 glassmorphism rounded-xl px-4 py-2 border border-pink-500/20"
          >
            <div className="flex items-center gap-2 text-sm text-pink-200/80">
              <Music className="w-4 h-4" />
              <span>Play romantic music</span>
            </div>
            {/* Arrow */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 glassmorphism border-r border-t border-pink-500/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
