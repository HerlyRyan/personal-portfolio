import React from 'react';
import { SKILLS_DATA } from '../../data/skillsData';
import { useModalEffect } from '../../hooks/useModalEfffect';
import { useSystem } from '../../context/SystemContext'; // <-- Import context
import { ModalHeader } from '../commons/ModalHeader';
import { ModalContainer } from '../commons/ModalContainer';

interface SkillsModalProps {
  isOpen: boolean;
}

export const SkillsModal: React.FC<SkillsModalProps> = ({ isOpen }) => {
  const { theme, closeModal } = useSystem(); // <-- Ambil status tema
  useModalEffect(isOpen, () => closeModal('~/sys/home'));
  const isLight = theme === 'light';

  if (!isOpen) return null;

  return (
    <ModalContainer>
      {/* Modal Header */}
      <ModalHeader
        title='Skills Stack'
        onClose={() => closeModal('~/sys/home')}
      />

      {/* Modal Body (Scrollable List) */}
      <div className='p-6 overflow-y-auto space-y-6'>
        {SKILLS_DATA.map((group, idx) => (
          <div
            key={idx}
            className={`border rounded-2xl p-6 transition-all ${
              isLight
                ? 'bg-slate-50 border-slate-200 hover:border-accent-blue/40 shadow-sm'
                : 'bg-navy-base/50 border-dark-border hover:border-accent-blue/40'
            }`}
          >
            <h4 className='text-sm font-mono text-accent-blue tracking-wider uppercase mb-4'>
              // {group.categoryName}
            </h4>
            <div className='flex flex-wrap gap-2'>
              {group.skills.map((skill, skillIdx) => (
                <span
                  key={skillIdx}
                  className={`text-xs font-mono px-3 py-1.5 rounded-xl transition-colors border ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-700 shadow-sm hover:border-accent-blue/50'
                      : 'bg-dark-border/60 border-dark-border text-slate-200 hover:border-accent-blue/50'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ModalContainer>
  );
};
