import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '../../context/SystemContext'; // <-- Import context untuk membaca state tema

interface ClickSparkle {
  id: number;
  x: number;
  y: number;
}

export const ClickRippleEffect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sparkles, setSparkles] = useState<ClickSparkle[]>([]);
  const { theme } = useSystem(); // <-- Ambil state tema aktif
  const isLight = theme === 'light';

  const handleCaptureClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newSparkle = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };

    setSparkles((prev) => [...prev, newSparkle]);
  };

  const handleAnimationComplete = (id: number) => {
    setSparkles((prev) => prev.filter((sparkle) => sparkle.id !== id));
  };

  return (
    <div 
      className="relative w-full h-full min-h-screen" 
      onClickCapture={handleCaptureClick}
    >
      {/* Container global dengan z-index ekstrem agar selalu di atas modal */}
      <div className="fixed inset-0 pointer-events-none z-99999 overflow-hidden">
        <AnimatePresence>
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              initial={{ scale: 0.6, opacity: 1, y: 0 }}
              animate={{ scale: 1.2, opacity: 0, y: -12 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onAnimationComplete={() => handleAnimationComplete(sparkle.id)}
              style={{
                top: sparkle.y,
                left: sparkle.x,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-6 pointer-events-none"
            >
              {/* 3 Blok Kecil Presisi dengan Warna Dinamis Berdasarkan State `isLight` */}
              <div className="relative w-full h-full flex items-center justify-center gap-1">
                {/* Blok Kiri */}
                <span className={`w-1.5 h-3 rounded-sm -rotate-12 transition-colors duration-300 ${
                  isLight 
                    ? 'bg-slate-700 shadow-[0_0_6px_rgba(59,130,246,0.5)]' 
                    : 'bg-slate-300/80 shadow-[0_0_4px_rgba(59,130,246,0.3)]'
                }`} />
                
                {/* Blok Tengah (Aksen Biru Utama) */}
                <span className="w-1.5 h-4 bg-accent-blue rounded-sm shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                
                {/* Blok Kanan */}
                <span className={`w-1.5 h-3 rounded-sm rotate-12 transition-colors duration-300 ${
                  isLight 
                    ? 'bg-slate-700 shadow-[0_0_6px_rgba(59,130,246,0.5)]' 
                    : 'bg-slate-300/80 shadow-[0_0_4px_rgba(59,130,246,0.3)]'
                }`} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {children}
    </div>
  );
};