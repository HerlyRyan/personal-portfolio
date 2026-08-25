import React, { useState } from "react";
import { useModalEffect } from "../../hooks/useModalEfffect";
import { useSystem } from "../../context/SystemContext";
import { ModalHeader } from "../commons/ModalHeader";
import { ModalContainer } from "../commons/ModalContainer";

interface ExperienceModalProps {
  isOpen: boolean;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen }) => {
  const { theme, closeModal, systemLang } = useSystem();
  useModalEffect(isOpen, () => closeModal("~/sys/home"));
  const isLight = theme === "light";

  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Ambil data berdasarkan bahasa sistem yang aktif
  const t = systemLang.experienceModal;

  const allTechs = Array.from(
    new Set(t.experienceItems.flatMap((item) => item.techStack)),
  );

  const filteredExperience = selectedTech
    ? t.experienceItems.filter((item) => item.techStack.includes(selectedTech))
    : t.experienceItems;

  if (!isOpen) return null;

  return (
    <ModalContainer>
      {/* Modal Header */}
      <ModalHeader
        title={t.title}
        onClose={() => closeModal("~/sys/home")}
      />

      {/* Modal Body */}
      <div
        className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: isLight
            ? "#cbd5e1 transparent"
            : "#4b5563 transparent",
        }}
      >
        {/* Fitur HR Helper: Quick Filter Berdasarkan Tech Stack */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              {t.filterTag}
            </span>
            {selectedTech && (
              <button
                onClick={() => setSelectedTech(null)}
                className="text-[10px] font-mono text-accent-blue hover:underline cursor-pointer"
              >
                {t.resetFilter}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allTechs.map((tech, idx) => {
              const isSelected = selectedTech === tech;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedTech(isSelected ? null : tech)}
                  className={`text-[11px] font-mono px-3 py-1 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-accent-blue text-white border-accent-blue shadow-sm"
                      : isLight
                        ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
                        : "bg-dark-border/40 hover:bg-dark-border border-dark-border text-slate-300"
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </div>

        {/* Garis Pembatas Tipis */}
        <div
          className={`h-px w-full ${isLight ? "bg-slate-200" : "bg-dark-border"}`}
        />

        {/* Timeline / Experience List */}
        <div className="space-y-5 relative border-l-2 border-accent-blue/30 ml-3 pl-5 sm:pl-6">
          {filteredExperience.map((item, index) => (
            <div key={item.id || index} className="relative group">
              {/* Titik Timeline */}
              <div className="absolute -left-7.25 sm:-left-8.25 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-accent-blue bg-navy-base transition-all duration-300 group-hover:bg-accent-blue group-hover:scale-125 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.6)]" />

              <div
                className={`border rounded-2xl p-5 sm:p-6 transition-all ${
                  isLight
                    ? "bg-slate-50 border-slate-200 hover:border-accent-blue/40 shadow-sm"
                    : "bg-navy-base/50 border-dark-border hover:border-accent-blue/40"
                }`}
              >
                {/* Header: Role di Kiri, Tahun di Kanan */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                  <h4
                    className={`text-base sm:text-lg font-bold transition-colors leading-snug ${isLight ? "text-slate-900" : "text-white"}`}
                  >
                    {item.role}
                  </h4>
                  <span
                    className={`text-[10px] font-mono px-3 py-1 rounded-full w-fit border shrink-0 ${
                      isLight
                        ? "bg-white border-slate-200 text-slate-600 font-semibold"
                        : "bg-dark-border border-dark-border/60 text-slate-300 font-semibold"
                    }`}
                  >
                    ⏳ {item.period}
                  </span>
                </div>

                {/* Sub-Header: @ Perusahaan & Lokasi */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs sm:text-sm font-semibold text-accent-blue font-mono">
                    @ {item.company}
                  </span>
                  <span className="text-slate-400 text-xs">•</span>
                  <span
                    className={`text-xs font-mono flex items-center gap-1 ${isLight ? "text-slate-500" : "text-slate-400"}`}
                  >
                    <span>📍</span> {item.location}
                  </span>
                </div>

                <p
                  className={`text-xs sm:text-sm mb-4 leading-relaxed transition-colors ${isLight ? "text-slate-600" : "text-slate-300"}`}
                >
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    // Key Contributions & Impact
                  </span>
                  <ul className="space-y-2">
                    {item.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className={`text-xs sm:text-sm flex items-start gap-2 ${isLight ? "text-slate-700" : "text-slate-300"}`}
                      >
                        <span className="text-accent-blue font-bold mt-0.5">
                          ›
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div
                  className={`flex flex-wrap gap-1.5 pt-3 border-t ${isLight ? "border-slate-200" : "border-dark-border/50"}`}
                >
                  {item.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                        isLight
                          ? "bg-white border-slate-200 text-slate-600 shadow-2xs"
                          : "bg-dark-border/50 border-dark-border/50 text-slate-400"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalContainer>
  );
};