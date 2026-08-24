import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS_DATA } from "../../data/projectsData";
import { useModalEffect } from "../../hooks/useModalEfffect.ts";
import { useSystem } from "../../context/SystemContext";
import { ModalHeader } from "../commons/ModalHeader.tsx";
import { ModalContainer } from "../commons/ModalContainer.tsx";

interface ProjectsModalProps {
  isOpen: boolean;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen }) => {
  const { theme, closeModal, requestExternalUrl } = useSystem();

  useModalEffect(isOpen, () => closeModal("~/sys/home"));

  const isLight = theme === "light";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);

  if (!isOpen) return null;

  const currentProject = PROJECTS_DATA[currentIndex];
  const totalProjects = PROJECTS_DATA.length;

  const isFirstProject = currentIndex === 0;
  const isLastProject = currentIndex === totalProjects - 1;

  const handleNextProject = () => {
    if (!isLastProject) {
      setCurrentIndex((prev) => prev + 1);
      setMediaIndex(0);
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

  const mediaList = [
    ...(currentProject.coverImage ? [currentProject.coverImage] : []),
    ...(currentProject.screenshots || []),
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
    <ModalContainer>
      {/* Modal Header: Super Minimalis tanpa teks [1 of 2] */}
      <ModalHeader title="Projects" onClose={() => closeModal("~/sys/home")} />

      {/* Modal Body */}
      <div
        className="p-6 overflow-y-auto space-y-6 flex-1"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: isLight
            ? "#cbd5e1 transparent"
            : "#4b5563 transparent",
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
                <span className="text-[10px] font-mono text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 rounded-full font-medium">
                  {currentProject.category}
                </span>
              </div>
              <h4
                className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                {currentProject.title}
              </h4>
            </div>

            {/* Role & Metrics */}
            {(currentProject.role || currentProject.metrics) && (
              <div className="flex flex-wrap gap-2">
                {currentProject.role && (
                  <span
                    className={`text-[11px] font-mono px-3 py-1.5 rounded-xl border ${
                      isLight
                        ? "bg-slate-100 text-slate-700 border-slate-200"
                        : "bg-dark-border/40 text-slate-300 border-dark-border"
                    }`}
                  >
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

            {/* Cover & Screenshots Unified Carousel dengan Minimalist Bottom Bar */}
            <div className="space-y-2.5">
              <div
                className={`w-full h-56 rounded-2xl overflow-hidden border relative flex items-center justify-center group ${
                  isLight
                    ? "bg-slate-100 border-slate-200 shadow-inner"
                    : "bg-dark-border/20 border-dark-border shadow-inner"
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
                              ? "bg-white/90 text-slate-800 border border-slate-200 hover:bg-accent-blue hover:text-white"
                              : "bg-black/60 text-white border border-white/10 hover:bg-accent-blue"
                          }`}
                        >
                          ❮
                        </button>
                        <button
                          onClick={handleNextMedia}
                          className={`absolute right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all text-xs font-mono cursor-pointer shadow-md ${
                            isLight
                              ? "bg-white/90 text-slate-800 border border-slate-200 hover:bg-accent-blue hover:text-white"
                              : "bg-black/60 text-white border border-white/10 hover:bg-accent-blue"
                          }`}
                        >
                          ❯
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="text-center space-y-1 p-4">
                    <span className="text-[11px] font-mono text-accent-blue">
                      [Cover & Screenshots Pending]
                    </span>
                  </div>
                )}
              </div>

              {/* Media Indicator Dots */}
              {hasMedia && (
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {mediaIndex === 0 && currentProject.coverImage
                      ? "// Cover Image"
                      : `// Screenshot ${currentProject.coverImage ? mediaIndex : mediaIndex + 1}`}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {mediaList.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMediaIndex(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          mediaIndex === idx
                            ? "w-5 bg-accent-blue"
                            : isLight
                              ? "w-1.5 bg-slate-300"
                              : "w-1.5 bg-dark-border"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Deskripsi */}
            <p
              className={`text-sm leading-relaxed ${
                isLight ? "text-slate-600" : "text-slate-300"
              }`}
            >
              {currentProject.longDescription}
            </p>

            {/* Key Features */}
            {currentProject.keyFeatures &&
              currentProject.keyFeatures.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-medium">
                    // Key Features
                  </span>
                  <ul
                    className={`text-xs space-y-1 font-mono pl-4 list-disc ${isLight ? "text-slate-600" : "text-slate-300"}`}
                  >
                    {currentProject.keyFeatures.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Tech Stack */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-medium">
                // Tech Stack Utilized
              </span>
              <div className="flex flex-wrap gap-2">
                {currentProject.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`text-xs font-mono px-3 py-1.5 rounded-xl border transition-colors ${
                      isLight
                        ? "bg-slate-50 border-slate-200 text-slate-700 shadow-2xs"
                        : "bg-dark-border/40 border-dark-border text-slate-300"
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

      {/* Modal Footer: Dilengkapi Indikator Dot Minimalis untuk Project List */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t gap-3 shrink-0 ${
          isLight
            ? "border-slate-200 bg-slate-50/80"
            : "border-dark-border bg-navy-base/60"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-1">
          {/* Navigasi Tombol Prev / Next */}
          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto flex-1">
            <button
              onClick={handlePrevProject}
              disabled={isFirstProject}
              className={`flex items-center gap-2 text-xs font-mono px-3 py-2.5 rounded-xl border transition-all text-left ${
                isFirstProject
                  ? "opacity-40 cursor-not-allowed bg-transparent border-slate-300/30 text-slate-500"
                  : isLight
                    ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                    : "bg-dark-border/40 border-dark-border text-slate-300 hover:text-white cursor-pointer"
              }`}
            >
              <span className="text-accent-blue font-bold">←</span>
              <span className="truncate">
                <strong className="block text-[9px] text-slate-400 uppercase">
                  Prev
                </strong>
                {prevProject ? prevProject.title : "Start"}
              </span>
            </button>

            <button
              onClick={handleNextProject}
              disabled={isLastProject}
              className={`flex items-center justify-end gap-2 text-xs font-mono px-3 py-2.5 rounded-xl border transition-all text-right ${
                isLastProject
                  ? "opacity-40 cursor-not-allowed bg-transparent border-slate-300/30 text-slate-500"
                  : isLight
                    ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                    : "bg-dark-border/40 border-dark-border text-slate-300 hover:text-white cursor-pointer"
              }`}
            >
              <span className="truncate">
                <strong className="block text-[9px] text-slate-400 uppercase">
                  Next
                </strong>
                {nextProject ? nextProject.title : "End"}
              </span>
              <span className="text-accent-blue font-bold">→</span>
            </button>
          </div>

          {/* Indikator Titik (Dots) untuk Total Project di Footer */}
          <div className="hidden md:flex items-center gap-1.5 px-2">
            {PROJECTS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setMediaIndex(0);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? "w-6 bg-accent-blue"
                    : isLight
                      ? "w-2 bg-slate-300"
                      : "w-2 bg-dark-border"
                }`}
                aria-label={`Jump to project ${idx + 1}`}
              />
            ))}
          </div>
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
    </ModalContainer>
  );
};
