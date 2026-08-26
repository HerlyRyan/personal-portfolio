import React from 'react';
import { useSystem } from '../../context/SystemContext';
import { ClickRippleEffect } from '../ui/ClickRiplleEffect'; 

interface SystemBackgroundProps {
  children: React.ReactNode;
}

export const SystemBackground: React.FC<SystemBackgroundProps> = ({ children }) => {
  const { theme } = useSystem();
  const isLight = theme === 'light';

  return (
    <div className={`min-h-dvh h-full w-full relative flex flex-col justify-between overflow-x-hidden md:overflow-hidden transition-colors duration-200 ${
        isLight ? 'bg-slate-100 text-slate-800' : 'bg-[#07090e] text-slate-100'
        }`}>
      
      <ClickRippleEffect>
        {/* 1. CSS Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[32px_32px]" />

        {/* 2. Orbiting Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="absolute w-150 h-150 bg-accent-blue/15 blur-[150px] rounded-full animate-orbitBlue" />
          <div className="absolute w-137.5 h-137.5 bg-red-600/10 blur-[160px] rounded-full animate-orbitRed" />
        </div>

        {/* Konten Utama */}
        <div className="relative z-10 h-full w-full flex flex-col justify-between">
          {children}
        </div>
      </ClickRippleEffect>

    </div>
  );
};