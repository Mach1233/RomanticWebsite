'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, HandHeart, Sparkles, Coffee, MessageCircle } from 'lucide-react';

export default function ForgivenessSection() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const handleSelect = (option: number) => {
    setSelectedOption(option);
    setTimeout(() => setShowResponse(true), 500);
  };

  const resetSelection = () => {
    setSelectedOption(null);
    setShowResponse(false);
  };

  const options = [
    {
      id: 1,
      icon: HandHeart,
      title: "I Forgive You",
      subtitle: "Let's find peace together",
      color: "from-pink-500 to-rose-600",
      response: {
        title: "Thank you, Houda 💕",
        message: `Your forgiveness means the world to me.

I never wanted to hurt you. The last thing I wanted was to cause you pain. If I could take back the moments that made you cry, I would in a heartbeat.

Thank you for having a heart big enough to forgive. That's one of the many things I've always admired about you.

I'm grateful for your grace, and I promise to be better.`
      }
    },
    {
      id: 2,
      icon: Coffee,
      title: "Let's Be Friends",
      subtitle: "A fresh start, no pressure",
      color: "from-purple-500 to-pink-600",
      response: {
        title: "I'd Love That 🤝",
        message: `Being your friend would be an honor, Houda.

You're an incredible person, and even if romance isn't in our cards right now, I still believe you're someone worth having in my life.

No expectations, no pressure - just two people who care about each other's wellbeing. Maybe we can grab coffee sometime, as friends, and just... talk.

Whatever makes you comfortable. Your peace matters most to me.`
      }
    },
    {
      id: 3,
      icon: MessageCircle,
      title: "I Need Time",
      subtitle: "Take all the space you need",
      color: "from-rose-500 to-purple-600",
      response: {
        title: "I Understand 🌙",
        message: `Take all the time you need, Houda.

There's no rush. Healing isn't linear, and I respect whatever process you need to go through.

I'll be here when you're ready - whether that's tomorrow, next month, or never. Your wellbeing is what matters most.

Please take care of yourself. You deserve peace and happiness, always.`
      }
    }
  ];

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!showResponse ? (
            // Question Section
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 mb-6"
                >
                  <HandHeart className="w-10 h-10 text-pink-400" />
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-400 to-purple-400 mb-4">
                  I Want to Be Honest With You
                </h2>
                
                <div className="max-w-2xl mx-auto space-y-4 text-pink-200/70 text-lg leading-relaxed">
                  <p>
                    Houda, I know things have been difficult between us. The breakup was hard, 
                    and I never wanted to be the source of your pain.
                  </p>
                  <p>
                    This isn't about asking you to take me back as a lover. I respect you too much 
                    to pressure you into anything. What I truly want...
                  </p>
                  <p className="text-pink-200/90 font-medium">
                    is your peace, your comfort, and maybe - if you're open to it - 
                    a chance to be friends.
                  </p>
                  <p className="text-pink-300/60 text-base italic">
                    Because you're someone worth having in my life, in whatever capacity feels right for you.
                  </p>
                </div>
              </motion.div>

              {/* Question */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glassmorphism rounded-3xl p-8 md:p-10 mb-8"
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-300 mb-8">
                  How would you like to move forward?
                </h3>

                {/* Options */}
                <div className="grid md:grid-cols-3 gap-4">
                  {options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleSelect(option.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative group p-6 rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 ${
                        selectedOption === option.id 
                          ? 'bg-pink-500/10 border-pink-500/50' 
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                      
                      <div className="relative z-10">
                        <div className={`w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center`}>
                          <option.icon className="w-7 h-7 text-white" />
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-2">
                          {option.title}
                        </h4>
                        <p className="text-pink-200/60 text-sm">
                          {option.subtitle}
                        </p>
                      </div>

                      {/* Selection indicator */}
                      {selectedOption === option.id && (
                        <motion.div
                          layoutId="selected"
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center"
                        >
                          <Sparkles className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            // Response Section
            <motion.div
              key="response"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glassmorphism rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0">
                <div className="absolute inset-[-2px] rounded-3xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="text-center mb-6"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 glow-pink">
                    {options.find(o => o.id === selectedOption)?.icon && (
                      (() => {
                        const Icon = options.find(o => o.id === selectedOption)!.icon;
                        return <Icon className="w-10 h-10 text-white" />;
                      })()
                    )}
                  </div>
                </motion.div>

                {/* Response content */}
                {(() => {
                  const selected = options.find(o => o.id === selectedOption);
                  if (!selected) return null;
                  
                  return (
                    <>
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400 mb-6"
                      >
                        {selected.response.title}
                      </motion.h3>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-pink-100/90 text-lg leading-relaxed whitespace-pre-line text-center max-w-2xl mx-auto"
                      >
                        {selected.response.message}
                      </motion.div>
                    </>
                  );
                })()}

                {/* Hearts decoration */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-center gap-2 mt-8"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        y: [0, -5, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: i * 0.15
                      }}
                    >
                      <Heart 
                        className="w-5 h-5 text-pink-400" 
                        fill="currentColor"
                        style={{ opacity: 0.8 - i * 0.12 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Choose again button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center mt-8"
                >
                  <button
                    onClick={resetSelection}
                    className="text-pink-300/60 hover:text-pink-300 transition-colors text-sm underline underline-offset-4"
                  >
                    Choose a different option
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Closing note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-pink-200/40 text-sm max-w-md mx-auto">
            Whatever you choose, know that I genuinely wish you happiness and peace. 
            You deserve the best, Houda. Always.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
