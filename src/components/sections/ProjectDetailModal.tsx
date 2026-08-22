import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../../data/projectsData';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  isLight: boolean;
  requestExternalUrl: (url: string) => void;
}

const useImageCarousel = (screenshots?: string[]) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasScreenshots = Boolean(screenshots && screenshots.length > 0);

  const handleNext = () => {
    if (screenshots) {
      setActiveIndex((prev) => (prev + 1) % screenshots.length);
    }
  };

  const handlePrev = () => {
    if (screenshots) {
      setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    }
  };

  return { activeIndex, setActiveIndex, hasScreenshots, handleNext, handlePrev };
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  isLight,
  requestExternalUrl,
}) => {
  const [prevProjectId, setPrevProjectId] = useState<string | null>(null);
  const { activeIndex, setActiveIndex, hasScreenshots, handleNext, handlePrev } = useImageCarousel(project?.screenshots);

  if (project && project.id !== prevProjectId) {
    setPrevProjectId(project.id);
    setActiveIndex(0);
  }

  if (!project) return null;

  return (
    <AnimatePresence>
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Backdrop transparan khusus mobile / layar kecil */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden"
        />

        {/* Panel Samping (Side Drawer untuk Desktop, Modal Terpusat untuk Mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
          className={`
            fixed inset-4 m-auto z-50 w-auto max-w-lg max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border backdrop-blur-xl
            lg:absolute lg:inset-auto lg:top-0 lg:left-[calc(100%+16px)] lg:w-[440px] lg:m-0 lg:max-h-[85vh]
            ${
              isLight
                ? 'bg-white/95 border-slate-200/80 shadow-slate-300/50'
                : 'bg-dark-card/95 border-dark-border/80 shadow-black/60'
            }
          `}
        >
          {/* Header Panel */}
          <div
            className={`flex items-center justify-between px-6 py-4 border-b shrink-0 ${
              isLight ? 'border-slate-100 bg-slate-50/80' : 'border-dark-border/50 bg-navy-base/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-blue animate-pulse" />
              <span className="text-xs font-mono text-accent-blue uppercase tracking-wider font-semibold">
                // MODULE_ID: {project.id}
              </span>
            </div>
            <button
              onClick={onClose}
              className={`font-mono text-xs px-3 py-1.5 rounded-xl transition-all border cursor-pointer active:scale-95 ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
                  : 'bg-dark-border/40 border-dark-border text-slate-400 hover:text-white hover:border-accent-blue/40'
              }`}
            >
              [Esc] Close
            </button>
          </div>

          {/* Body Panel */}
          <div 
            className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: isLight ? '#cbd5e1 transparent' : '#4b5563 transparent',
            }}
          >
            <div>
              {/* Title & Category Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3
                  id="modal-title"
                  className={`text-xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}
                >
                  {project.title}
                </h3>
                <span className="text-[10px] font-mono text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 rounded-full font-medium">
                  {project.category}
                </span>
              </div>

              {/* Recruiter Value: Role & Metrics Highlights */}
              {(project.role || project.metrics) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.role && (
                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border ${
                      isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-dark-border/30 text-slate-300 border-dark-border'
                    }`}>
                      👤 Role: {project.role}
                    </span>
                  )}
                  {project.metrics && (
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                      ⚡ Impact: {project.metrics}
                    </span>
                  )}
                </div>
              )}

              {/* --- APP PREVIEW CAROUSEL / FALLBACK (DIPINDAHKAN KE ATAS) --- */}
              <div className="space-y-2.5 mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-medium">
                    // Interface Preview
                  </span>
                  {hasScreenshots && (
                    <span className="text-[10px] font-mono text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-md">
                      Slide {activeIndex + 1} of {project.screenshots?.length}
                    </span>
                  )}
                </div>

                <div
                  className={`w-full h-52 rounded-2xl overflow-hidden border relative flex items-center justify-center group transition-all ${
                    isLight
                      ? 'bg-slate-100/80 border-slate-200 shadow-inner'
                      : 'bg-dark-border/20 border-dark-border shadow-inner'
                  }`}
                >
                  {hasScreenshots ? (
                    <>
                      <motion.img
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        src={project.screenshots![activeIndex]}
                        alt={`${project.title} preview ${activeIndex + 1}`}
                        className="w-full h-full object-cover"
                      />

                      {project.screenshots!.length > 1 && (
                        <>
                          <button
                            onClick={handlePrev}
                            className={`absolute left-2.5 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all text-xs font-mono cursor-pointer shadow-md opacity-80 group-hover:opacity-100 ${
                              isLight
                                ? 'bg-white/90 text-slate-800 border border-slate-200 hover:bg-accent-blue hover:text-white'
                                : 'bg-black/60 text-white border border-white/10 hover:bg-accent-blue'
                            }`}
                            aria-label="Previous slide"
                          >
                            ❮
                          </button>
                          <button
                            onClick={handleNext}
                            className={`absolute right-2.5 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all text-xs font-mono cursor-pointer shadow-md opacity-80 group-hover:opacity-100 ${
                              isLight
                                ? 'bg-white/90 text-slate-800 border border-slate-200 hover:bg-accent-blue hover:text-white'
                                : 'bg-black/60 text-white border border-white/10 hover:bg-accent-blue'
                            }`}
                            aria-label="Next slide"
                          >
                            ❯
                          </button>

                          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
                            {project.screenshots!.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                  idx === activeIndex
                                    ? 'w-6 bg-accent-blue shadow-xs'
                                    : isLight
                                      ? 'w-1.5 bg-slate-400/60 hover:bg-slate-800'
                                      : 'w-1.5 bg-white/50 hover:bg-white/80'
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="text-center space-y-2 p-6">
                      <div className="w-10 h-10 mx-auto rounded-2xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue font-mono text-sm">
                        📷
                      </div>
                      <div>
                        <span className="text-xs font-mono text-accent-blue font-semibold tracking-wide">
                          [Carousel Preview Pending]
                        </span>
                        <p
                          className={`text-[11px] font-mono mt-1 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}
                        >
                          Mockup tangkapan layar antarmuka belum diinisialisasi.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* ----------------------------------------------------------- */}

              <p
                className={`text-sm mb-5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}
              >
                {project.longDescription}
              </p>

              {/* Recruiter Value: Key Features Bullet Points for Quick Scanning */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="space-y-2 mb-5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-medium">
                    // Key Features
                  </span>
                  <ul className={`text-xs space-y-1.5 font-mono pl-4 list-disc ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {project.keyFeatures.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div className="space-y-2.5 mb-5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-medium">
                  // Tech Stack Utilized
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`text-xs font-mono px-3 py-1.5 rounded-xl border transition-colors ${
                        isLight
                          ? 'bg-slate-50 border-slate-200/80 text-slate-700 shadow-2xs'
                          : 'bg-dark-border/40 border-dark-border text-slate-300 hover:border-accent-blue/30'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links (Live Demo & Repository) */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-dark-border/40 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <button
                    onClick={() => requestExternalUrl(`${project.liveUrl}`)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-white bg-accent-blue hover:bg-accent-blue/90 px-4.5 py-2.5 rounded-2xl transition-all shadow-md group"
                  >
                    <span>Live Demo</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
                  </button>
                )}
                {project.githubUrl && (
                  <button
                    onClick={() => requestExternalUrl(`${project.githubUrl}`)}
                    className={`inline-flex items-center gap-2 text-xs font-mono px-4.5 py-2.5 rounded-2xl border transition-all group ${
                      isLight 
                        ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200' 
                        : 'bg-dark-border/40 border-dark-border text-accent-blue hover:bg-accent-blue/10'
                    }`}
                  >
                    <span>Repository Code</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};