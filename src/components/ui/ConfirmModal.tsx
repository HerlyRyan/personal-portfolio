import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '../../context/SystemContext';

export const ConfirmExternalModal: React.FC = () => {
  const { confirmUrl, clearExternalUrl, theme } = useSystem();
  const isLight = theme === 'light';

  if (!confirmUrl) return null;

  const handleConfirm = () => {
    window.open(confirmUrl, '_blank', 'noopener,noreferrer');
    clearExternalUrl();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-4 ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-dark-card border-dark-border text-white'
          }`}
        >
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-accent-blue uppercase tracking-wider font-bold">
              // Security Check
            </span>
            <h3 className="text-lg font-bold">Buka Link Eksternal?</h3>
            <p className={`text-xs font-mono break-all ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Anda akan mengarah ke luar sistem menuju: <br />
              <span className="text-accent-blue">{confirmUrl}</span>
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={clearExternalUrl}
              className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                isLight 
                  ? 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200' 
                  : 'bg-dark-border/40 border-dark-border text-slate-300 hover:text-white'
              }`}
            >
              Tidak
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 rounded-xl text-xs font-mono bg-accent-blue text-white hover:bg-accent-blue/90 transition-all cursor-pointer shadow-md"
            >
              Ya, Lanjutkan ↗
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};