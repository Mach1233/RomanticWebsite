'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Quote, Sparkles } from 'lucide-react';

interface LoveMessageProps {
  isVisible: boolean;
}

export default function LoveMessage({ isVisible }: LoveMessageProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const messageLines = [
    "Houda,",
    "",
    "Ena nektibe wa naamil fi hal haja hethi kan ala haja wa7eda.",
    "Enou wayeeekk omournaa moknaa haja aadyaa 3ishnaa maa baaethnaa bershaa hajite semahhaaaaa w yasser semhaaa",
    "Bershaa Hajite behya eli ana tw metfkirhaa w manjimtesh nanshaa wala hata haja fiha khater.",
    "Enti toflaa w ensana semhaa w tayebaa alff min yetmanikk chofte mink bershaa hajite behyaaa oumrri manjim nansahaa kolyoum netfkirhaa w kol hajite semhaa maak ",
    "ENti testahilll kolchy semahh fi denya yaatik rabi ala 9ide 9albik khater galbik kbir kol mano93ede netfakir nahre eli thay3te fih talifouni w 9aa3edna nfetchou fi kol blassa w e7na dourou fi blayess oumri ",
    "oumri wala bil omar tkhayelte eli nemchilhoum houwa ana konte nkhaff la nejbide flouss fi soussa eni walite a un point dour fi zne9i w eli ana aanmoute bel7a9 haja wa7ida eli msabretnii enikk konti maaya w ghdawa taadi algébre",
    "wenti mkish m7thra hata chwy barka ana mn7ibesh nesmah rouhhy kifesh hazitek fi khtar ama netfaker kifesh kontii khirr min ay rajel aareftouu houwa aymen maguelish hata bil kethibe nji maak  ",
    "ana no93ede nefakir fi hajite hethi kol ana 9a3ede akther min 50 youm fi soussa periode s3iba ama eli khafef fi hak labled aymet semhaaa eli 3ishnahaa ",
    "",
    "",
    "I respect you too much to pressure you",
    "into anything you're not ready for.",
    "",
    "What I truly want...",
    "is for us to find closure,",
    "to find peace,",
    "and maybe — if you're open to it —",
    "to be friends.",
    "",
    "Because you're someone worth knowing,",
    "worth caring about,",
    "worth having in my life",
    "in whatever way feels right for you.",
    "",
    "No expectations.",
    "No pressure.",
    "Just genuine care and respect.",
    "",
    "Take your time.",
    "I'll be here when you're ready.",
    "",
    "With sincerity,",
    "Someone who truly cares 💕"
  ];

  useEffect(() => {
    if (!isVisible) return;

    const fullText = messageLines.join('\n');
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 40);

    return () => clearInterval(typeInterval);
  }, [isVisible]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-pink-500/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        className="relative max-w-3xl mx-auto"
      >
        {/* Decorative quote mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="absolute -top-8 -left-4 text-pink-500/20"
        >
          <Quote className="w-20 h-20" />
        </motion.div>

        {/* Main card */}
        <div className="relative glassmorphism rounded-3xl p-8 md:p-12">
          {/* Heart decoration */}
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="relative">
              <div className="absolute inset-0 blur-md bg-pink-500/50 rounded-full" />
              <Sparkles className="relative w-10 h-10 text-pink-400" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-8 mt-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400">
              A Letter From My Heart
            </span>
          </motion.h2>

          {/* Typewriter text */}
          <div className="min-h-[500px] relative">
            <pre className="text-lg md:text-xl text-pink-100/90 font-sans whitespace-pre-wrap leading-relaxed">
              {displayedText}
              <span 
                className={`inline-block w-0.5 h-6 bg-pink-400 ml-1 align-middle ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </pre>
          </div>

          {/* Bottom decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-8 gap-2"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              >
                <Heart 
                  className="w-4 h-4 text-pink-400/60" 
                  fill="currentColor"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Decorative quote mark (closing) */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="absolute -bottom-8 -right-4 text-pink-500/20 rotate-180"
        >
          <Quote className="w-20 h-20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
