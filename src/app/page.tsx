'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamic imports for 3D scene to avoid SSR issues
const ThreeScene = dynamic(() => import('@/components/romantic/ThreeScene'), {
  ssr: false,
  loading: () => null
});

const LoadingScreen = dynamic(() => import('@/components/romantic/LoadingScreen'), {
  ssr: false,
  loading: () => null
});

import HeroSection from '@/components/romantic/HeroSection';
import LoveMessage from '@/components/romantic/LoveMessage';
import MemoryGallery from '@/components/romantic/MemoryGallery';
import SecretMessage from '@/components/romantic/SecretMessage';
import ForgivenessSection from '@/components/romantic/ForgivenessSection';
import MusicButton from '@/components/romantic/MusicButton';
import Footer from '@/components/romantic/Footer';
import FloatingHearts from '@/components/romantic/FloatingHearts';
import LogoutButton from '@/components/romantic/LogoutButton';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [loveMessageVisible, setLoveMessageVisible] = useState(false);

  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showContent) return;
    
    // Trigger love message typewriter when it comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoveMessageVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const loveMessageSection = document.getElementById('love-message');
    if (loveMessageSection) {
      observer.observe(loveMessageSection);
    }

    return () => observer.disconnect();
  }, [showContent]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      {/* 3D Background Scene */}
      {showContent && <ThreeScene />}

      {/* Floating Hearts Background */}
      {showContent && <FloatingHearts />}

      {/* Main Content */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          {/* Logout Button */}
          <LogoutButton />
          

          {/* Hero Section */}
          <HeroSection />

          <RestaurantInvitation/>
          {/* Love Message Section */}
         {/* <div id="love-message">
            <LoveMessage isVisible={loveMessageVisible} />
          </div>*/}

          {/* Memory Gallery */}
          <MemoryGallery />

         {/* Secret Message */}
{/* <SecretMessage /> */}

{/* Forgiveness & Friendship Section */}
{/* <ForgivenessSection /> */}

          {/* Footer */}
          <Footer />
        </motion.div>
      )}

      {/* Music Control Button */}
      {showContent && <MusicButton />}
    </main>
  );
}
