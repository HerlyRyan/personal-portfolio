import React from "react";
import { SKILLS_DATA } from "../../data/skillsData";
import { useModalEffect } from "../../hooks/useModalEfffect";
import { useSystem } from "../../context/SystemContext"; // <-- Import context

interface SkillsModalProps {
  isOpen: boolean;
}

export const SkillsModal: React.FC<SkillsModalProps> = ({ isOpen }) => {
  const { theme, closeModal } = useSystem(); // <-- Ambil status tema
  useModalEffect(isOpen, () => closeModal('~/sys/home'));
  const isLight = theme === "light";

  if (!isOpen) return null;

  return (
    <div
      onClick={() => closeModal('~/sys/home')}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`border w-full max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-colors duration-300 ${
          isLight
            ? "bg-white border-slate-200"
            : "bg-dark-card border-dark-border"
        }`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b transition-colors ${
            isLight ? "border-slate-200" : "border-dark-border"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-accent-blue" />
            <h3
              className={`text-sm font-mono tracking-wider uppercase transition-colors ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              Skills Stack
            </h3>
          </div>
          <button
            onClick={() => closeModal('~/sys/home')}
            className={`font-mono text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer border ${
              isLight
                ? "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                : "bg-dark-border/50 border-dark-border text-slate-400 hover:text-white"
            }`}
          >
            [Esc] Close
          </button>
        </div>

        {/* Modal Body (Scrollable List) */}
        <div className="p-6 overflow-y-auto space-y-6">
          {SKILLS_DATA.map((group, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl p-6 transition-all ${
                isLight
                  ? "bg-slate-50 border-slate-200 hover:border-accent-blue/40 shadow-sm"
                  : "bg-navy-base/50 border-dark-border hover:border-accent-blue/40"
              }`}
            >
              <h4 className="text-sm font-mono text-accent-blue tracking-wider uppercase mb-4">
                // {group.categoryName}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className={`text-xs font-mono px-3 py-1.5 rounded-xl transition-colors border ${
                      isLight
                        ? "bg-white border-slate-200 text-slate-700 shadow-sm hover:border-accent-blue/50"
                        : "bg-dark-border/60 border-dark-border text-slate-200 hover:border-accent-blue/50"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
