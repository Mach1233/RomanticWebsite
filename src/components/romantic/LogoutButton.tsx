'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, Heart } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <motion.button
      onClick={handleLogout}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-4 right-4 z-50 glassmorphism rounded-full px-4 py-2 border border-pink-500/20 hover:border-pink-500/40 transition-colors flex items-center gap-2 text-pink-200/60 hover:text-pink-200 text-sm"
    >
      <motion.div
        animate={isHovering ? { x: [0, -2, 0] } : {}}
        transition={{ duration: 0.3, repeat: isHovering ? Infinity : 0 }}
      >
        <LogOut className="w-4 h-4" />
      </motion.div>
      <span>Leave</span>
      <Heart className="w-3 h-3 text-pink-400/60" />
    </motion.button>
  );
}
