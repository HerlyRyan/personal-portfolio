import React, { useEffect, useState } from 'react';
import { useSystem } from '../../context/SystemContext'; // <-- Import context

interface SystemLoaderProps {
  onLoadComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING KERNEL...",
  "LOADING ENVIRONMENT VARIABLES [LARAVEL_ENV]...",
  "CONNECTING TO DATABASE [MYSQL_HOST:3306]...",
  "VERIFYING SECURITY TOKENS & SSL...",
  "MOUNTING SYSTEM MODULES [PROJECTS, EXPERIENCE, SKILLS]...",
  "SYSTEM READY. ESTABLISHING SECURE CONNECTION..."
];

export const SystemLoader: React.FC<SystemLoaderProps> = ({ onLoadComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const { theme } = useSystem(); // <-- Ambil status tema
  const isLight = theme === 'light';

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadComplete(), 400);
          return 100;
        }
        return prev + 20;
      });
    }, 500);

    const logTimer = setInterval(() => {
      setCurrentStep((prev) => (prev < BOOT_LOGS.length - 1 ? prev + 1 : prev));
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, [onLoadComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 font-mono select-none transition-colors duration-300 ${
      isLight ? 'bg-slate-100' : 'bg-dark'
    }`}>
      <div className={`max-w-md w-full border rounded-2xl p-6 shadow-2xl backdrop-blur-md transition-colors duration-300 ${
        isLight ? 'bg-white border-slate-200' : 'bg-dark-card border-dark-border'
      }`}>
        
        {/* Header Loader */}
        <div className={`flex items-center justify-between mb-6 border-b pb-4 transition-colors ${
          isLight ? 'border-slate-200' : 'border-dark-border'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-accent-blue animate-ping" />
            <span className="text-xs text-accent-blue tracking-wider uppercase">SYS_BOOT // v2.6</span>
          </div>
          <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{progress}%</span>
        </div>

        {/* Terminal Logs Display */}
        <div className="h-24 flex flex-col justify-end mb-6 text-left">
          <p className={`text-xs mb-1 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>{">"} executing startup sequence...</p>
          <p className="text-xs text-emerald-500 font-semibold tracking-wide">
            {">"} {BOOT_LOGS[currentStep]}
          </p>
        </div>

        {/* Custom Progress Bar */}
        <div className={`w-full h-2 rounded-full overflow-hidden p-0.5 border ${
          isLight ? 'bg-slate-100 border-slate-200' : 'bg-dark-border/40 border-dark-border'
        }`}>
          <div 
            className="bg-accent-blue h-full rounded-full transition-all duration-200 ease-out shadow-[0_0_12px_rgba(59,130,246,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className={`flex justify-between items-center mt-4 text-[10px] uppercase ${
          isLight ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <span>Backend Environment</span>
          <span>Status: Stable</span>
        </div>

      </div>
    </div>
  );
};