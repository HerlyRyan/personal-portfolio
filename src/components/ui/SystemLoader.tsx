import React, { useEffect, useState, useRef } from 'react';
import { useSystem } from '../../context/SystemContext';

interface SystemLoaderProps {
  onLoadComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING KERNEL [v6.8.0-ARCH]...",
  "LOADING ENVIRONMENT VARIABLES [LARAVEL_ENV=production]...",
  "CONNECTING TO DATABASE [MYSQL_HOST:3306] -> SUCCESS",
  "VERIFYING SECURITY TOKENS & SSL CERTIFICATES...",
  "ALLOCATING VIRTUAL HEAP MEMORY [16384 MB]...",
  "MOUNTING SYSTEM MODULES [PROJECTS, EXPERIENCE, SKILLS]...",
  "ESTABLISHING SECURE SOCKET CONNECTION...",
  "SYSTEM READY. DISPATCHING DESKTOP ENVIRONMENT..."
];

export const SystemLoader: React.FC<SystemLoaderProps> = ({ onLoadComplete }) => {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const { theme } = useSystem();
  const isLight = theme === 'light';
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentLogIndex]);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => onLoadComplete(), 400);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    const logTimer = setInterval(() => {
      setCurrentLogIndex((prev) => 
        prev < BOOT_LOGS.length - 1 ? prev + 1 : prev
      );
    }, 350);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProgress(100);
        onLoadComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(progressTimer);
      clearInterval(logTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onLoadComplete]);

  return (
    <div className={`fixed inset-0 z-100 flex flex-col items-center justify-center p-4 font-mono select-none transition-colors duration-300 ${
      isLight ? 'bg-slate-100/95 backdrop-blur-md' : 'bg-dark/95 backdrop-blur-md'
    }`}>
      <div className={`max-w-lg w-full border rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-white border-slate-200' : 'bg-dark-card border-dark-border'
      }`}>
        
        {/* Efek Garis Scanline Tipis */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent-blue/5 to-transparent pointer-events-none animate-pulse" />

        {/* Header Loader */}
        <div className={`flex items-center justify-between mb-5 border-b pb-3 transition-colors ${
          isLight ? 'border-slate-200' : 'border-dark-border'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs text-accent-blue font-bold tracking-widest uppercase">
              // SYS_KERNEL_BOOT
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 hidden sm:inline">[ESC to skip]</span>
            <span className={`text-xs font-bold ${isLight ? 'text-slate-700' : 'text-white'}`}>
              {progress}%
            </span>
          </div>
        </div>

        {/* Terminal Logs Display (Scroll bar disembunyikan total dengan CSS inline & class) */}
        <div className={`h-32 overflow-y-auto mb-5 p-3 rounded-xl border flex flex-col space-y-1 text-left ${
          isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-navy-base/60 border-dark-border text-slate-300'
        }`}
        style={{
          scrollbarWidth: 'none', // Untuk Firefox
          msOverflowStyle: 'none', // Untuk Internet Explorer/Edge lama
        }}
        >
          {/* Style tambahan untuk menyembunyikan scrollbar di Chrome/Safari/Opera */}
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <p className={`text-[11px] opacity-60`}>$ initializing portfolio core system...</p>
          {BOOT_LOGS.slice(0, currentLogIndex + 1).map((log, idx) => (
            <p key={idx} className="text-[11px] font-mono flex items-center gap-2">
              <span className="text-accent-blue">❯</span>
              <span className={idx === currentLogIndex ? "text-emerald-500 font-semibold animate-pulse" : "opacity-80"}>
                {log}
              </span>
            </p>
          ))}
          <div ref={logsEndRef} />
        </div>

        {/* Custom Progress Bar dengan Glow Effect */}
        <div className={`w-full h-2 rounded-full overflow-hidden p-0.5 border relative ${
          isLight ? 'bg-slate-100 border-slate-200' : 'bg-dark-border/40 border-dark-border'
        }`}>
          <div 
            className="bg-accent-blue h-full rounded-full transition-all duration-75 ease-out shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Footer Info */}
        <div className={`flex justify-between items-center mt-4 text-[10px] uppercase tracking-wider ${
          isLight ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <span>Env: Laravel & Flutter Stack</span>
          <span className="text-emerald-500 font-semibold">● SECURE_CHANNEL</span>
        </div>

      </div>
    </div>
  );
};