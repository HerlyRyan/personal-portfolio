import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProfileSidebar } from '../sections/ProfileSidebar';
import { SystemOverview } from '../sections/SystemOverview';
import { ControlDock } from './ControlDock';
import { ProjectsModal } from '../sections/ProjectsModal';
import { ExperienceModal } from '../sections/ExperienceModal';
import { SkillsModal } from '../sections/SkillsModal';
import { AboutModal } from '../sections/AboutModal';
import { useSystem } from '../../context/SystemContext';

export const SystemCardLayout: React.FC = () => {
  const { lang, toggleLang, theme, toggleTheme, activeModal, loadingPath, toastMessage } = useSystem();
  const isLight = theme === 'light';

  const isExitAction = loadingPath === '~/sys/home';

  return (
    // PERUBAHAN DI SINI: Hapus my-auto, gunakan w-full flex flex-col items-center justify-center
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto px-4 w-full flex flex-col items-center justify-center relative"
    >
      {/* Terminal Loading Overlay */}
      {loadingPath && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn font-mono">
          <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 overflow-hidden ${
            isLight ? 'bg-white border border-slate-200 text-slate-800' : 'bg-dark-card/95 border border-white/10 text-white'
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full animate-ping ${isExitAction ? 'bg-red-500' : 'bg-accent-blue'}`} />
            
            <span className="text-xs">
              $ cd <span className={`font-bold ${isExitAction ? 'text-red-500' : 'text-accent-blue'}`}>
                {loadingPath}
              </span> 
              {isExitAction ? ' && exit_process...' : ' && ./execute.sh...'}
            </span>
          </div>
        </div>
      )}

      {/* Toast Notification Component */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-8 left-1/2 z-[150] px-4 py-2 rounded-full bg-accent-blue/20 border border-accent-blue/50 text-accent-blue text-xs font-mono backdrop-blur-md shadow-lg"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOGGLE CONTROLS (Bahasa & Tema) */}
      <div className="w-full flex justify-end gap-2 mb-3 max-w-6xl">
        <button 
          onClick={toggleLang}
          className="px-3 py-1.5 rounded-xl bg-dark-card border border-dark-border text-xs font-mono text-slate-300 hover:text-accent-blue hover:border-accent-blue/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <span className="text-[10px] text-accent-blue font-bold">LANG:</span>
          {lang}
        </button>

        <button 
          onClick={toggleTheme}
          className="px-3 py-1.5 rounded-xl bg-dark-card border border-dark-border text-xs font-mono text-slate-300 hover:text-accent-blue hover:border-accent-blue/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <span className="text-[10px] text-accent-blue font-bold">MODE:</span>
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      {/* Kartu Utama */}
      <motion.div 
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-dark-card border border-dark-border rounded-3xl p-5 md:p-10 shadow-2xl flex flex-col justify-between w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <ProfileSidebar />
          <SystemOverview />
        </div>

        <ControlDock />
      </motion.div>

      {/* Modals Controller */}
      {activeModal === 'projects' && <ProjectsModal isOpen={true} />}
      <ExperienceModal isOpen={activeModal === "experience"} />
      <SkillsModal isOpen={activeModal === "skills"} />
      <AboutModal isOpen={activeModal === "about"} />
    </motion.div>
  );
};