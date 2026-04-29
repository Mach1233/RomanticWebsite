'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const ThreeScene = dynamic(() => import('@/components/romantic/ThreeScene'), { ssr: false });
const LoadingScreen = dynamic(() => import('@/components/romantic/LoadingScreen'), { ssr: false });

import HeroSection from '@/components/romantic/HeroSection';
import MemoryGallery from '@/components/romantic/MemoryGallery';
import Footer from '@/components/romantic/Footer';
import FloatingHearts from '@/components/romantic/FloatingHearts';
import LogoutButton from '@/components/romantic/LogoutButton';
import MusicButton from '@/components/romantic/MusicButton';
import RestaurantInvitation from '@/components/romantic/RestaurantInvitation';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <LoadingScreen isLoading={isLoading} />

      {showContent && <ThreeScene />}
      {showContent && <FloatingHearts />}

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <LogoutButton />
          <HeroSection />
          <RestaurantInvitation />
          <MemoryGallery />
          <Footer />
        </motion.div>
      )}

      {showContent && <MusicButton />}
    </main>
  );
}
