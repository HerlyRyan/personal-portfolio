import React from 'react';
import { useSystem } from '../../context/SystemContext';

interface ModalContainerProps {
  children: React.ReactNode;
}

export const ModalContainer: React.FC<ModalContainerProps> = ({ children }) => {
  const { theme, closeModal } = useSystem();
  const isLight = theme === 'light';

  return (
    <div
      onClick={() => closeModal("~/sys/home")}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 lg:backdrop-blur-sm animate-fadeIn"
    >
      {/* Wrapper Utama Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`border w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col transition-colors duration-300 overflow-hidden relative ${
          isLight
            ? "bg-white border-slate-200 shadow-slate-300/50"
            : "bg-dark-card border-dark-border shadow-black/60"
        }`}
      >
        { children }
      </div>
    </div>
  );
};