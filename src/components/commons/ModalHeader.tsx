import React from 'react';
import { useSystem } from '../../context/SystemContext';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  showDot?: boolean;
  extraContent?: React.ReactNode; // Untuk fleksibilitas tambahan (misal indikator kustom)
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  showDot = true,
  extraContent,
}) => {
  const { theme } = useSystem();
  const isLight = theme === 'light';

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-6 py-3.5 border-b shrink-0 gap-2 ${
        isLight ? 'border-slate-200 bg-slate-50/80' : 'border-dark-border bg-navy-base/60'
      }`}
    >
      <div className='flex items-center gap-2 min-w-0'>
        {showDot && <span className='w-2.5 h-2.5 rounded-full bg-accent-blue shrink-0' />}
        <h3
          className={`text-xs font-mono tracking-wider uppercase truncate ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          {title}
        </h3>
        {extraContent}
      </div>

      <button
        onClick={onClose}
        className={`font-mono text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer border shrink-0 ${
          isLight
            ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
            : 'bg-dark-border/50 border-dark-border text-slate-400 hover:text-white'
        }`}
      >
        [Esc] Close
      </button>
    </div>
  );
};