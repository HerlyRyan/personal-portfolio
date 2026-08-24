import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '../../data/projectsData';
import { useModalEffect } from '../../hooks/useModalEfffect.ts';
import { useSystem } from '../../context/SystemContext';

interface ProjectsModalProps {
  isOpen: boolean;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen }) => {
  const { theme, closeModal, requestExternalUrl } = useSystem();
  
  useModalEffect(isOpen, () => closeModal('~/sys/home'));
  
  const isLight = theme === 'light';
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);

  if (!isOpen) return null;

  const currentProject = PROJECTS_DATA[currentIndex];
  const totalProjects = PROJECTS_DATA.length;

  // Cek batas awal dan akhir untuk tombol disabled
  const isFirstProject = currentIndex === 0;
  const isLastProject = currentIndex === totalProjects - 1;

  const handleNextProject = () => {
    if (!isLastProject) {
      setCurrentIndex((prev) => prev + 1);
      setMediaIndex(0); // Reset index media saat pindah project
    }
  };

  const handlePrevProject = () => {
    if (!isFirstProject) {
      setCurrentIndex((prev) => prev - 1);
      setMediaIndex(0);
    }
  };

  const prevProject = !isFirstProject ? PROJECTS_DATA[currentIndex - 1] : null;
  const nextProject = !isLastProject ? PROJECTS_DATA[currentIndex + 1] : null;

  // Gabungkan coverImage (sebagai urutan pertama) dan screenshots menjadi satu kesatuan media carousel
  const mediaList = [
    ...(currentProject.coverImage ? [currentProject.coverImage] : []),
    ...(currentProject.screenshots || [])
  ];
  const hasMedia = mediaList.length > 0;

  const handleNextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMedia) {
      setMediaIndex((prev) => (prev + 1) % mediaList.length);
    }
  };

  const handlePrevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMedia) {
      setMediaIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
    }
  };

  return (
    <div
      onClick={() => closeModal('~/sys/home')}
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 lg:backdrop-blur-sm animate-fadeIn'
    >
      {/* Wrapper Utama Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`border w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col transition-colors duration-300 overflow-hidden relative ${
          isLight
            ? 'bg-white border-slate-200 shadow-slate-300/50'
            : 'bg-dark-card border-dark-border shadow-black/60'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b shrink-0 ${
            isLight ? 'border-slate-200 bg-slate-50/80' : 'border-dark-border bg-navy-base/60'
          }`}
        >
          <div className='flex items-center gap-2'>
            <span className='w-3 h-3 rounded-full bg-accent-blue animate-pulse' />
            <h3
              className={`text-xs font-mono tracking-wider uppercase transition-colors ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Projects Repository [{currentIndex + 1} of {totalProjects}]
            </h3>
          </div>
          <button
            onClick={() => closeModal('~/sys/home')}
            className={`font-mono text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer border ${
              isLight
                ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
                : 'bg-dark-border/50 border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            [Esc] Close
          </button>
        </div>

        {/* Modal Body */}
        <div 
          className='p-6 overflow-y-auto space-y-6 flex-1'
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: isLight ? '#cbd5e1 transparent' : '#4b5563 transparent',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.15 }}
              className="space-y-5"
            >
              {/* Header Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-accent-blue font-semibold">
                    // {currentProject.id}
                  </span>
                  <span className='text-[10px] font-mono text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 rounded-full font-medium'>
                    {currentProject.category}
                  </span>
                </div>
                <h4
                  className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {currentProject.title}
                </h4>
              </div>

              {/* Role & Metrics */}
              {(currentProject.role || currentProject.metrics) && (
                <div className="flex flex-wrap gap-2">
                  {currentProject.role && (
                    <span className={`text-[11px] font-mono px-3 py-1.5 rounded-xl border ${
                      isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-dark-border/40 text-slate-300 border-dark-border'
                    }`}>
                      👤 Role: {currentProject.role}
                    </span>
                  )}
                  {currentProject.metrics && (
                    <span className="text-[11px] font-mono px-3 py-1.5 rounded-xl border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                      ⚡ Impact: {currentProject.metrics}
                    </span>
                  )}
                </div>
              )}

              {/* Cover & Screenshots Unified Carousel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-medium">
                    // {mediaIndex === 0 && currentProject.coverImage ? 'Cover Image' : `Screenshot Slide ${currentProject.coverImage ? mediaIndex : mediaIndex + 1}`}
                  </span>
                  {hasMedia && (
                    <span className="text-[10px] font-mono text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-md">
                      Slide {mediaIndex + 1} of {mediaList.length} {mediaIndex === 0 && currentProject.coverImage ? '(Cover)' : ''}
                    </span>
                  )}
                </div>

                <div
                  className={`w-full h-56 rounded-2xl overflow-hidden border relative flex items-center justify-center group ${
                    isLight
                      ? 'bg-slate-100 border-slate-200 shadow-inner'
                      : 'bg-dark-border/20 border-dark-border shadow-inner'
                  }`}
                >
                  {hasMedia ? (
                    <>
                      <motion.img
                        key={mediaIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15 }}
                        src={mediaList[mediaIndex]}
                        alt={`${currentProject.title} media ${mediaIndex + 1}`}
                        className="w-full h-full object-cover"
                      />

                      {mediaList.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevMedia}
                            className={`absolute left-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all text-xs font-mono cursor-pointer shadow-md ${
                              isLight
                                ? 'bg-white/90 text-slate-800 border border-slate-200 hover:bg-accent-blue hover:text-white'
                                : 'bg-black/60 text-white border border-white/10 hover:bg-accent-blue'
                            }`}
                          >
                            ❮
                          </button>
                          <button
                            onClick={handleNextMedia}
                            className={`absolute right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all text-xs font-mono cursor-pointer shadow-md ${
                              isLight
                                ? 'bg-white/90 text-slate-800 border border-slate-200 hover:bg-accent-blue hover:text-white'
                                : 'bg-black/60 text-white border border-white/10 hover:bg-accent-blue'
                            }`}
                          >
                            ❯
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className='text-center space-y-1 p-4'>
                      <span className='text-[11px] font-mono text-accent-blue'>
                        [Cover & Screenshots Pending]
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Deskripsi */}
              <p
                className={`text-sm leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {currentProject.longDescription}
              </p>

              {/* Key Features */}
              {currentProject.keyFeatures && currentProject.keyFeatures.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-medium">
                    // Key Features
                  </span>
                  <ul className={`text-xs space-y-1 font-mono pl-4 list-disc ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {currentProject.keyFeatures.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div className='space-y-2'>
                <span className='text-[10px] font-mono text-slate-400 uppercase tracking-wider font-medium'>
                  // Tech Stack Utilized
                </span>
                <div className='flex flex-wrap gap-2'>
                  {currentProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`text-xs font-mono px-3 py-1.5 rounded-xl border transition-colors ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-700 shadow-2xs'
                          : 'bg-dark-border/40 border-dark-border text-slate-300'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Modal Footer */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t gap-3 shrink-0 ${
            isLight ? 'border-slate-200 bg-slate-50/80' : 'border-dark-border bg-navy-base/60'
          }`}
        >
          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto flex-1">
            {/* Tombol Previous */}
            <button
              onClick={handlePrevProject}
              disabled={isFirstProject}
              className={`flex items-center gap-2 text-xs font-mono px-3 py-2.5 rounded-xl border transition-all text-left ${
                isFirstProject
                  ? 'opacity-40 cursor-not-allowed bg-transparent border-slate-300/30 text-slate-500'
                  : isLight
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer'
                    : 'bg-dark-border/40 border-dark-border text-slate-300 hover:text-white cursor-pointer'
              }`}
            >
              <span className="text-accent-blue font-bold">←</span>
              <span className="truncate">
                <strong className="block text-[9px] text-slate-400 uppercase">Prev Project</strong>
                {prevProject ? prevProject.title : 'First Project'}
              </span>
            </button>

            {/* Tombol Next */}
            <button
              onClick={handleNextProject}
              disabled={isLastProject}
              className={`flex items-center justify-end gap-2 text-xs font-mono px-3 py-2.5 rounded-xl border transition-all text-right ${
                isLastProject
                  ? 'opacity-40 cursor-not-allowed bg-transparent border-slate-300/30 text-slate-500'
                  : isLight
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer'
                    : 'bg-dark-border/40 border-dark-border text-slate-300 hover:text-white cursor-pointer'
              }`}
            >
              <span className="truncate">
                <strong className="block text-[9px] text-slate-400 uppercase">Next Project</strong>
                {nextProject ? nextProject.title : 'End of List'}
              </span>
              <span className="text-accent-blue font-bold">→</span>
            </button>
          </div>

          {/* Repository Link */}
          {currentProject.githubUrl && (
            <button
              onClick={() => requestExternalUrl(currentProject.githubUrl!)}
              className="w-full sm:w-auto text-xs font-mono text-accent-blue bg-accent-blue/10 border border-accent-blue/20 hover:bg-accent-blue/20 px-4 py-3 rounded-xl transition-all cursor-pointer text-center shrink-0"
            >
              Repository Code ↗
            </button>
          )}
        </div>
      </div>
    </div>
  );
};