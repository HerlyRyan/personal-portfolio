import React, { useState } from 'react';
import { PROJECTS_DATA } from '../../data/projectsData';
import type { Project } from '../../data/projectsData';
import { useModalEffect } from '../../hooks/useModalEfffect.ts';
import { useSystem } from '../../context/SystemContext';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsModalProps {
  isOpen: boolean;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({
  isOpen,
}) => {
  const { theme, closeModal, requestExternalUrl } = useSystem();
  
  // Memanggil closeModal dari context dengan path tujuan saat modal ditutup
  useModalEffect(isOpen, () => closeModal('~/sys/home'));
  
  const isLight = theme === 'light';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (!isOpen) return null;

  return (
    <div
      onClick={() => closeModal('~/sys/home')}
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 lg:backdrop-blur-sm animate-fadeIn'
    >
      {/* Wrapper Utama */}
      <div className='relative flex items-center justify-center'>
        {/* Modal Container Utama */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`border w-full max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-colors duration-300 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-dark-card border-dark-border'
          }`}
        >
          {/* Modal Header */}
          <div
            className={`flex items-center justify-between px-6 py-4 border-b transition-colors ${
              isLight ? 'border-slate-200' : 'border-dark-border'
            }`}
          >
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 rounded-full bg-accent-blue' />
              <h3
                className={`text-sm font-mono tracking-wider uppercase transition-colors ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Projects Repository
              </h3>
            </div>
            <button
              onClick={() => closeModal('~/sys/home')}
              className={`font-mono text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer border ${
                isLight
                  ? 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  : 'bg-dark-border/50 border-dark-border text-slate-400 hover:text-white'
              }`}
            >
              [Esc] Close
            </button>
          </div>

          {/* Modal Body */}
          <div 
            className='p-6 overflow-y-auto space-y-6'
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: isLight ? '#cbd5e1 transparent' : '#4b5563 transparent',
            }}
          >
            {PROJECTS_DATA.map((project) => {
              const isSelected = selectedProject?.id === project.id;
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedProject(null);
                    } else {
                      setSelectedProject(project);
                    }
                  }}
                  className={`border rounded-2xl p-6 transition-all space-y-4 cursor-pointer group ${
                    isSelected
                      ? isLight
                        ? 'border-accent-blue bg-accent-blue/5 shadow-md'
                        : 'border-accent-blue bg-accent-blue/10'
                      : isLight
                        ? 'bg-slate-50 border-slate-200 hover:border-accent-blue/40 shadow-sm'
                        : 'bg-navy-base/50 border-dark-border hover:border-accent-blue/40'
                  }`}
                >
                  <div className='flex flex-col md:flex-row md:items-center justify-between gap-2'>
                    <h4
                      className={`text-lg font-bold transition-colors ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {project.title}
                    </h4>
                    <span className='text-[10px] font-mono text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-2.5 py-1 rounded-full w-fit'>
                      {project.category}
                    </span>
                  </div>

                  <p
                    className={`text-sm leading-relaxed transition-colors ${
                      isLight ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {project.longDescription}
                  </p>

                  {/* Kondisional Cover Image / Fallback Preview */}
                  <div
                    className={`w-full h-40 rounded-xl overflow-hidden border flex items-center justify-center p-2 ${
                      isLight
                        ? 'bg-white border-slate-200'
                        : 'bg-dark-border/30 border-dark-border'
                    }`}
                  >
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className='w-full h-full object-cover rounded-lg'
                      />
                    ) : (
                      <div className='text-center space-y-1'>
                        <span className='text-xs font-mono text-accent-blue'>
                          [Assets Pending]
                        </span>
                        <p
                          className={`text-[11px] font-mono ${isLight ? 'text-slate-400' : 'text-slate-500'}`}
                        >
                          Visual preview belum diinisialisasi untuk modul ini.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                          isLight
                            ? 'bg-white border-slate-200 text-slate-600 shadow-sm'
                            : 'bg-dark-border/50 border-dark-border/50 text-slate-400'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Indikator Aksi & Repository Link */}
                  <div className='flex items-center justify-between pt-2'>
                    <span className='inline-flex items-center gap-2 text-xs font-mono text-accent-blue group-hover:translate-x-1 transition-transform'>
                      <span>
                        {isSelected ? '[Active Panel] →' : '[Inspect Code] →'}
                      </span>
                    </span>

                    {project.githubUrl && (
                      <button
                        onClick={(e) => {
                          requestExternalUrl(project.githubUrl!);
                          e.stopPropagation();
                        }}
                        className={`text-xs font-mono hover:underline ${isLight ? 'text-slate-500' : 'text-slate-400'}`}
                      >
                        Repository ↗
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel Detail di Samping */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          isLight={isLight}
          requestExternalUrl={requestExternalUrl}
        />
      </div>
    </div>
  );
};