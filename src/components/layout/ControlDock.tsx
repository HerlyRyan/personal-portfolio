import React from 'react';
import { ArrowUpRightIcon } from '../ui/Icons';
import { useSystem } from '../../context/SystemContext';

export type ModalType = "projects" | "experience" | "skills" | "about" | null;

const NAV_ITEMS: { id: ModalType; label: string; code: string; path: string }[] = [
  { id: "projects", label: "Projects", code: "01", path: "~/sys/projects" },
  { id: "experience", label: "Experience", code: "02", path: "~/sys/experience" },
  { id: "skills", label: "Skills Stack", code: "03", path: "~/sys/skills" },
  { id: "about", label: "About & Philosophy", code: "04", path: "~/sys/about" },
];

export const ControlDock: React.FC = () => {
  const { theme, openModal } = useSystem();
  const isLight = theme === 'light';

  const handleModuleClick = (item: typeof NAV_ITEMS[0]) => {
    if (!item.id) return;
    openModal(item.id, item.path);
  };

  return (
    <>
      <div className={`mt-6 pt-5 border-t grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 transition-colors ${
        isLight ? 'border-slate-200' : 'border-dark-border'
      }`}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleModuleClick(item)}
            className={`group border px-5 py-3 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between ${
              isLight 
                ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-900' 
                : 'bg-navy-base/50 hover:bg-accent-blue/10 border-dark-border hover:border-accent-blue/40 text-white'
            }`}
          >
            <div>
              <span className="block text-[10px] font-mono text-accent-blue uppercase mb-0.5">
                {item.code} // Modul
              </span>
              <span className={`text-xs md:text-sm font-bold transition-colors ${
                isLight ? 'text-slate-900 group-hover:text-accent-blue' : 'text-white group-hover:text-accent-blue'
              }`}>
                {item.label}
              </span>
            </div>
            <ArrowUpRightIcon className="w-4 h-4 text-slate-400 group-hover:text-accent-blue transition-colors" />
          </button>
        ))}
      </div>
    </>
  );
};