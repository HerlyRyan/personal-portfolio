import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS_DATA } from '../../data/skillsData';
import { useModalEffect } from '../../hooks/useModalEfffect';
import { useSystem } from '../../context/SystemContext';
import { ModalHeader } from '../commons/ModalHeader';
import { ModalContainer } from '../commons/ModalContainer';

interface SkillsModalProps {
  isOpen: boolean;
}

export const SkillsModal: React.FC<SkillsModalProps> = ({ isOpen }) => {
  const { theme, closeModal } = useSystem();
  useModalEffect(isOpen, () => closeModal('~/sys/home'), "skills");
  const isLight = theme === 'light';

  // State untuk melacak kategori mana yang sedang terbuka (default kategori pertama terbuka)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!isOpen) return null;

  return (
    <ModalContainer>
      {/* Modal Header */}
      <ModalHeader
        title='Skills Stack'
        onClose={() => closeModal('~/sys/home')}
      />

      {/* Modal Body */}
      <div
        className='p-6 overflow-y-auto space-y-4 flex-1 custom-scrollbar'
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: isLight
            ? '#cbd5e1 transparent'
            : '#4b5563 transparent',
        }}
      >
        {/* Deskripsi Singkat untuk Recruiter */}
        <div className="px-1 mb-2">
          <p className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            // Click category below to expand core technical proficiencies, frameworks, and tools.
          </p>
        </div>

        {/* Stack Vertikal Accordion */}
        <div className='space-y-3'>
          {SKILLS_DATA.map((group, idx) => {
            const isOpenAccordion = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 shadow-sm'
                    : 'bg-navy-base/50 border-dark-border'
                }`}
              >
                {/* Header Accordion (Bisa diklik) */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className={`w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer ${
                    isLight 
                      ? 'hover:bg-slate-100/80' 
                      : 'hover:bg-accent-blue/5'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <span className={`w-2 h-2 rounded-full transition-all ${isOpenAccordion ? 'bg-accent-blue animate-pulse scale-125' : 'bg-slate-400'}`} />
                    <h4 className={`text-xs sm:text-sm font-mono tracking-wider uppercase font-bold ${isOpenAccordion ? 'text-accent-blue' : isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      // {group.categoryName}
                    </h4>
                  </div>
                  
                  {/* Indikator Jumlah Skill & Ikon Minimalis (+ / -) */}
                  <div className='flex items-center gap-3'>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${isLight ? 'bg-slate-200 text-slate-600' : 'bg-dark-border text-slate-400'}`}>
                      {group.skills.length} items
                    </span>
                    <motion.span 
                      animate={{ rotate: isOpenAccordion ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`w-5 h-5 flex items-center justify-center rounded-lg text-xs font-mono ${isLight ? 'bg-slate-200/70 text-slate-700' : 'bg-dark-border text-slate-300'}`}
                    >
                      {isOpenAccordion ? '−' : '+'}
                    </motion.span>
                  </div>
                </button>

                {/* Konten Isi Accordion dengan Animasi Halus Framer Motion */}
                <AnimatePresence>
                  {isOpenAccordion && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className={`px-5 pb-5 pt-1 border-t ${isLight ? 'border-slate-200 bg-white/50' : 'border-dark-border/50 bg-navy-base/30'}`}>
                        <div className='flex flex-wrap gap-2 pt-3'>
                          {group.skills.map((skillObj, skillIdx) => (
                            <div
                              key={skillIdx}
                              className={`text-xs font-mono px-3 py-1.5 rounded-xl transition-all duration-200 border flex items-center gap-2 cursor-default ${
                                isLight
                                  ? 'bg-white border-slate-200 text-slate-700 shadow-2xs hover:border-accent-blue/50'
                                  : 'bg-dark-border/60 border-dark-border text-slate-200 hover:border-accent-blue/50'
                              }`}
                            >
                              <span className="font-semibold">{skillObj.name}</span>
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded-md font-mono ${
                                  skillObj.level === "Advanced"
                                    ? isLight
                                      ? "bg-blue-50 text-accent-blue border border-accent-blue/30"
                                      : "bg-accent-blue/20 text-accent-blue border border-accent-blue/30"
                                    : isLight
                                    ? "bg-slate-100 text-slate-500"
                                    : "bg-dark-border text-slate-400"
                                }`}
                              >
                                {skillObj.level}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </ModalContainer>
  );
};