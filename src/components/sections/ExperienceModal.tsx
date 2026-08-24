import React from "react";
import { EXPERIENCE_DATA } from "../../data/experienceData";
import { useModalEffect } from "../../hooks/useModalEfffect";
import { useSystem } from "../../context/SystemContext"; // <-- Import context
import { ModalHeader } from "../commons/ModalHeader";
import { ModalContainer } from "../commons/ModalContainer";

interface ExperienceModalProps {
  isOpen: boolean;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen }) => {
  const { theme, closeModal } = useSystem(); // <-- Ambil status tema
  useModalEffect(isOpen, closeModal);
  const isLight = theme === "light";

  if (!isOpen) return null;

  return (
    <ModalContainer>
      {/* Modal Header */}
      <ModalHeader
        title="Experience"
        onClose={() => closeModal("~/sys/home")}
      />

      {/* Modal Body (Scrollable List) */}
      <div className="p-6 overflow-y-auto space-y-6">
        {EXPERIENCE_DATA.map((item) => (
          <div
            key={item.id}
            className={`border rounded-2xl p-6 transition-all ${
              isLight
                ? "bg-slate-50 border-slate-200 hover:border-accent-blue/40 shadow-sm"
                : "bg-navy-base/50 border-dark-border hover:border-accent-blue/40"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <h4
                className={`text-lg font-bold transition-colors ${isLight ? "text-slate-900" : "text-white"}`}
              >
                {item.role}{" "}
                <span className="text-accent-blue font-normal">
                  @ {item.company}
                </span>
              </h4>
              <span
                className={`text-[10px] font-mono px-2.5 py-1 rounded-full w-fit border ${
                  isLight
                    ? "bg-white border-slate-200 text-slate-600"
                    : "bg-dark-border border-dark-border/60 text-slate-300"
                }`}
              >
                {item.period}
              </span>
            </div>
            <p
              className={`text-xs font-mono mb-4 ${isLight ? "text-slate-500" : "text-slate-400"}`}
            >
              {item.location}
            </p>
            <p
              className={`text-sm mb-4 leading-relaxed transition-colors ${isLight ? "text-slate-600" : "text-slate-300"}`}
            >
              {item.description}
            </p>

            {/* Highlights */}
            <ul
              className={`list-disc list-inside space-y-1.5 text-xs mb-4 ${isLight ? "text-slate-600" : "text-slate-300"}`}
            >
              {item.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>

            {/* Tech Stack */}
            <div
              className={`flex flex-wrap gap-2 pt-2 border-t ${isLight ? "border-slate-200" : "border-dark-border/50"}`}
            >
              {item.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                    isLight
                      ? "bg-white border-slate-200 text-slate-600 shadow-sm"
                      : "bg-dark-border/50 border-dark-border/50 text-slate-400"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ModalContainer>
  );
};
