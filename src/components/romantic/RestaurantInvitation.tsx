'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, UtensilsCrossed, MapPin, Calendar, Sparkles, Flame, Check } from 'lucide-react';

export default function RestaurantInvitation() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [response, setResponse] = useState<'yes' | null>(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [hasRunAway, setHasRunAway] = useState(false);
  const [escapeCount, setEscapeCount] = useState(0);

  const handleRunaway = useCallback(() => {
    setHasRunAway(true);
    setEscapeCount(prev => prev + 1);
    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 80;
    setBtnPos({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance * 0.6,
    });
  }, []);

  const runAwayLabel = escapeCount === 0
    ? "Maybe Another Time"
    : escapeCount === 1
    ? "Nope! 😏"
    : escapeCount === 2
    ? "Too Slow!"
    : escapeCount === 3
    ? "Try Again~"
    : "Never! 💕";

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Rose petals floating */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${5 + i * 8}%`,
              top: '-20px',
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.sin(i) * 60, Math.cos(i) * 40],
              rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
              opacity: [0, 0.6, 0.4, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              delay: i * 2.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: `${6 + i * 1.5}px`,
                height: `${6 + i * 1.5}px`,
                background: i % 3 === 0
                  ? 'radial-gradient(circle, #ff6b9d 0%, #c44569 100%)'
                  : i % 3 === 1
                  ? 'radial-gradient(circle, #ff9ff3 0%, #f368e0 100%)'
                  : 'radial-gradient(circle, #e84393 0%, #fd79a8 100%)',
                opacity: 0.5,
                filter: 'blur(0.5px)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-rose-400/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-xl w-full">
        <AnimatePresence mode="wait">

          {/* ========== SEALED ENVELOPE ========== */}
          {!isEnvelopeOpen && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80, scale: 0.8 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              {/* Wax seal */}
              <motion.div
                className="mx-auto mb-10 relative w-36 h-36"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Seal glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-400/30 to-pink-600/30 blur-2xl scale-125" />
                {/* Seal ring */}
                <div className="absolute inset-2 rounded-full border-2 border-rose-400/20" />
                <div className="absolute inset-4 rounded-full border border-rose-300/15" />
                {/* Main seal */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-rose-500/30 via-pink-600/30 to-rose-700/30 border border-rose-400/40 flex items-center justify-center backdrop-blur-sm">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Heart className="w-14 h-14 text-rose-300" fill="currentColor" />
                  </motion.div>
                </div>
                {/* Sparkles around seal */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: `${15 + (i % 2) * 55}%`,
                      left: i < 2 ? '-10%' : '95%',
                    }}
                    animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  >
                    <Sparkles className="w-4 h-4 text-rose-300/60" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-purple-300">
                  Dinner?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-rose-200/50 text-lg max-w-sm mx-auto mb-12 leading-relaxed"
              >
                There&apos;s something I&apos;d love to show you... 
                <br />
                <span className="text-rose-300/40">if you&apos;ll let me.</span>
              </motion.p>

              {/* Open button */}
              <motion.button
                onClick={() => setIsEnvelopeOpen(true)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-semibold text-lg shadow-2xl shadow-rose-500/20">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5 text-rose-200" />
                  </motion.div>
                  <span>Open</span>
                  <Heart className="w-5 h-5 text-rose-200" fill="currentColor" />
                </div>
              </motion.button>
            </motion.div>
          )}

          {/* ========== INVITATION CARD ========== */}
          {isEnvelopeOpen && !response && (
            <motion.div
              key="invitation"
              initial={{ opacity: 0, y: 80, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -40 }}
              transition={{ duration: 1, type: 'spring', stiffness: 80 }}
              className="relative perspective-1000"
            >
              {/* Card outer frame - luxury border */}
              <div className="relative rounded-[2rem] p-[2px] bg-gradient-to-br from-rose-400/50 via-pink-500/30 to-purple-500/50">
                {/* Inner card */}
                <div className="relative rounded-[2rem] bg-gradient-to-b from-[#0f0818] via-[#0c0a14] to-[#08060f] overflow-hidden">

                  {/* ===== TOP ORNAMENT ===== */}
                  <div className="relative pt-10 pb-6">
                    {/* Decorative arch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 border-b border-rose-400/20 rounded-b-full" />
                    {/* Candle centerpiece */}
                    <motion.div
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex flex-col items-center relative"
                    >
                      <div className="absolute -top-2 w-8 h-8 bg-amber-400/20 rounded-full blur-xl" />
                      <Flame className="w-5 h-5 text-amber-300/90 candle-flicker relative z-10" />
                      <div className="w-1.5 h-5 bg-gradient-to-b from-amber-600/80 to-amber-900/60 rounded-full" />
                      <div className="w-5 h-2 bg-gradient-to-r from-amber-900/40 via-amber-700/60 to-amber-900/40 rounded-full" />
                    </motion.div>
                  </div>

                  {/* ===== ORNAMENTAL DIVIDER ===== */}
                  <div className="flex items-center justify-center gap-3 px-8 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-400/30 to-rose-400/30" />
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-rose-400/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400/70" />
                      <div className="w-1 h-1 rounded-full bg-rose-400/50" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-rose-400/30 to-rose-400/30" />
                  </div>

                  {/* ===== MAIN CONTENT ===== */}
                  <div className="px-8 md:px-12 text-center">
                    {/* Icon */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-rose-500/15 to-purple-500/15 border border-rose-400/20 mb-6"
                    >
                      <UtensilsCrossed className="w-9 h-9 text-rose-300/80" />
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-4xl md:text-5xl font-bold mb-2 tracking-tight"
                    >
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-purple-300">
                        You&apos;re Invited
                      </span>
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-rose-300/40 text-sm uppercase tracking-[0.3em] mb-8"
                    >
                      For a Special Evening
                    </motion.p>

                    {/* ===== DETAILS BOX ===== */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="relative rounded-2xl p-6 mb-8 border border-rose-400/10"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,107,157,0.05) 0%, rgba(142,68,173,0.05) 100%)',
                      }}
                    >
                      {/* Inner glow */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-rose-400/5 to-transparent pointer-events-none" />

                      <div className="relative space-y-4">
                        {/* Location */}
                        <div className="flex items-center justify-center gap-2.5">
                          <MapPin className="w-4 h-4 text-rose-400/60 flex-shrink-0" />
                          <span className="text-rose-100/80 text-lg tracking-wide">Marsa, Tunisia</span>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-px w-8 bg-rose-400/15" />
                          <Heart className="w-3 h-3 text-rose-400/30" fill="currentColor" />
                          <div className="h-px w-8 bg-rose-400/15" />
                        </div>

                        {/* Date */}
                        <div className="flex items-center justify-center gap-2.5">
                          <Calendar className="w-4 h-4 text-rose-400/60 flex-shrink-0" />
                          <span className="text-rose-100/80 text-lg italic">Whenever you&apos;re ready</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* ===== PERSONAL MESSAGE ===== */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="mb-10"
                    >
                      <p className="text-rose-100/70 text-lg leading-relaxed italic">
                        &ldquo;Houda, I know a quiet place with candlelight and soft music. 
                        No pressure, no expectations — just a warm dinner and good company. 
                        If you&apos;d like that, I&apos;d be honored to sit across from you.&rdquo;
                      </p>
                    </motion.div>

                    {/* ===== CANDLE ROW ===== */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="flex justify-center gap-8 mb-10"
                    >
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <motion.div
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              scale: [0.9, 1.1, 0.9],
                            }}
                            transition={{
                              duration: 1.2 + i * 0.2,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          >
                            <Flame className="w-2.5 h-2.5 text-amber-300/70" />
                          </motion.div>
                          <div className="w-0.5 h-3 bg-amber-700/30 rounded-full" />
                        </div>
                      ))}
                    </motion.div>

                    {/* ===== BUTTONS ===== */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center items-center relative pb-10"
                      style={{ minHeight: '70px' }}
                    >
                      {/* YES BUTTON */}
                      <motion.button
                        onClick={() => setResponse('yes')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 blur-xl opacity-25 group-hover:opacity-45 transition-opacity duration-500" />
                        <div className="relative flex items-center gap-2.5 px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-semibold text-lg">
                          <Check className="w-5 h-5" />
                          <span>I&apos;d Love To</span>
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Heart className="w-5 h-5 text-rose-100" fill="currentColor" />
                          </motion.div>
                        </div>
                      </motion.button>

                      {/* RUNAWAY BUTTON */}
                      <motion.button
                        onPointerEnter={handleRunaway}
                        onClick={handleRunaway}
                        animate={{ x: btnPos.x, y: btnPos.y }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-rose-400/15 text-rose-200/50 font-medium text-sm cursor-pointer select-none backdrop-blur-sm hover:border-rose-400/25 transition-colors"
                        style={{ background: 'rgba(255,107,157,0.04)' }}
                      >
                        <span>{runAwayLabel}</span>
                      </motion.button>
                    </motion.div>

                    {/* Hint text */}
                    <AnimatePresence>
                      {hasRunAway && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute bottom-2 left-0 right-0 text-center"
                        >
                          <p className="text-rose-300/30 text-xs italic">
                            That button seems to have a mind of its own...
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========== YES RESPONSE ========== */}
          {response === 'yes' && (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: 'spring', stiffness: 100 }}
              className="text-center"
            >
              {/* Heart burst */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(25)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '40%',
                    }}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0.5],
                      x: (Math.random() - 0.5) * 400,
                      y: (Math.random() - 0.5) * 400,
                      rotate: Math.random() * 360,
                    }}
                    transition={{
                      duration: 2.5,
                      delay: Math.random() * 0.8,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <Heart
                      className="text-rose-400"
                      fill="currentColor"
                      style={{
                        width: `${8 + Math.random() * 10}px`,
                        height: `${8 + Math.random() * 10}px`,
                        opacity: 0.7,
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Card */}
              <div className="relative rounded-[2rem] p-[2px] bg-gradient-to-br from-rose-400/50 via-pink-500/30 to-purple-500/50">
                <div className="relative rounded-[2rem] bg-gradient-to-b from-[#0f0818] via-[#0c0a14] to-[#08060f] overflow-hidden px-8 md:px-12 py-12">

                  {/* Heart icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="mx-auto mb-8 w-28 h-28 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center relative"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 blur-2xl opacity-50" />
                    <Heart className="w-14 h-14 text-white relative z-10" fill="currentColor" />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-purple-300">
                      You Made My
                    </span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-300">
                      Heart Smile
                    </span>
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-rose-100/70 text-lg leading-relaxed max-w-md mx-auto mb-8"
                  >
                    I can&apos;t wait to sit across from you, share stories, and enjoy a beautiful evening together. No rush, no pressure — just us and a lovely dinner.
                  </motion.p>

                  {/* Details recap */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="rounded-2xl p-5 border border-rose-400/15 max-w-xs mx-auto mb-6"
                    style={{ background: 'linear-gradient(135deg, rgba(255,107,157,0.05) 0%, rgba(142,68,173,0.05) 100%)' }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2.5 text-rose-200/70">
                        <MapPin className="w-4 h-4 text-rose-400/60" />
                        <span>Marsa, Tunisia</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-px w-6 bg-rose-400/15" />
                        <Heart className="w-2.5 h-2.5 text-rose-400/30" fill="currentColor" />
                        <div className="h-px w-6 bg-rose-400/15" />
                      </div>
                      <div className="flex items-center justify-center gap-2.5 text-rose-200/70">
                        <Calendar className="w-4 h-4 text-rose-400/60" />
                        <span className="italic">Whenever you&apos;re ready</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-rose-300/40 text-sm italic"
                  >
                    I&apos;ll be there, waiting with a smile.
                  </motion.p>

                  {/* Hearts row */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="flex justify-center gap-1.5 mt-8"
                  >
                    {[...Array(7)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -6, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                      >
                        <Heart
                          className="text-rose-400"
                          fill="currentColor"
                          style={{
                            opacity: 1 - i * 0.1,
                            width: `${16 - i}px`,
                            height: `${16 - i}px`,
                          }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
