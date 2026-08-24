import React from "react";
import { motion } from "framer-motion";
import { ABOUT_DATA } from "../../data/aboutData";
import { useModalEffect } from "../../hooks/useModalEfffect";
import { useSystem } from "../../context/SystemContext";
import { ModalHeader } from "../commons/ModalHeader";
import { ModalContainer } from "../commons/ModalContainer";

interface AboutModalProps {
  isOpen: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen }) => {
  const { theme, closeModal } = useSystem();
  useModalEffect(isOpen, () => closeModal("~/sys/home"));
  const isLight = theme === "light";

  if (!isOpen) return null;

  return (
    <ModalContainer>
      {/* Modal Header */}
      <ModalHeader title="About" onClose={() => closeModal("~/sys/home")} />

      {/* Modal Body */}
      <div
        className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: isLight
            ? "#cbd5e1 transparent"
            : "#4b5563 transparent",
        }}
      >
        {/* HERO SECTION */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className={`border rounded-3xl relative overflow-hidden transition-all ${
            isLight
              ? "bg-slate-50 border-slate-200 shadow-sm"
              : "bg-gradient-to-br from-[#1c2230] to-[#121824] border-dark-border"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between p-6 sm:p-8 gap-6">
            {/* BAGIAN KIRI: Teks & Tipografi */}
            <div className="flex-1 space-y-3.5 text-center lg:text-left z-10 w-full">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono shadow-xs bg-black/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span
                  className={
                    isLight
                      ? "text-slate-800 font-bold tracking-wide"
                      : "text-emerald-400 font-bold tracking-wide"
                  }
                >
                  {ABOUT_DATA.availability}
                </span>
              </div>

              <div className="space-y-1.5">
                <h2
                  className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}
                >
                  <span>{ABOUT_DATA.name}</span>
                </h2>
                <div className="w-8 h-1 bg-accent-blue my-2.5 mx-auto lg:mx-0 rounded-full" />
                <p className="text-xs font-mono text-accent-blue uppercase tracking-wider font-semibold">
                  {ABOUT_DATA.role} — {ABOUT_DATA.location}
                </p>
              </div>

              <p
                className={`text-xs sm:text-sm leading-relaxed max-w-lg mx-auto lg:mx-0 ${
                  isLight ? "text-slate-600" : "text-slate-300"
                }`}
              >
                {ABOUT_DATA.introduction}
              </p>
            </div>

            {/* BAGIAN KANAN: Foto Profil (Diubah menjadi bentuk portrait tegak) */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className={`w-[220px] sm:w-[240px] h-[300px] sm:h-[320px] rounded-2xl border shrink-0 overflow-hidden flex items-center justify-center relative shadow-xl mx-auto lg:mx-0 ${
                isLight
                  ? "bg-slate-200 border-slate-300"
                  : "bg-[#252c3c] border-slate-700/50"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none" />

              {ABOUT_DATA.avatarUrl ? (
                <img
                  src={ABOUT_DATA.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover z-0"
                  style={{ objectPosition: "center top" }} // Mengatur fokus ke bagian atas (wajah)
                />
              ) : (
                <div className="text-center p-6 space-y-2 z-0">
                  <span className="text-5xl block opacity-80">👨‍💻</span>
                  <p
                    className={`text-[11px] font-mono tracking-widest ${isLight ? "text-slate-500" : "text-slate-400"}`}
                  >
                    [PHOTO SLOT]
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* BAGIAN BAWAH: Grid 2 Kolom (Bio & Prinsip) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* BIOGRAPHY SECTION */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={`border rounded-3xl p-6 transition-all flex flex-col justify-center ${
              isLight
                ? "bg-slate-50 border-slate-200 shadow-sm"
                : "bg-navy-base/40 border-dark-border"
            }`}
          >
            <h4 className="text-[11px] font-mono text-accent-blue tracking-widest uppercase mb-3 flex items-center gap-2.5">
              <span className="w-5 h-[1px] bg-accent-blue" />
              Background Story
            </h4>
            <div
              className={`space-y-2.5 text-xs sm:text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}
            >
              {ABOUT_DATA.biography.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* PRINCIPLES SECTION */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3.5"
          >
            {ABOUT_DATA.principles.map((principle, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                className={`border p-4 sm:p-5 rounded-2xl flex flex-col justify-center transition-all flex-1 ${
                  isLight
                    ? "bg-slate-50 hover:bg-white border-slate-200 shadow-sm"
                    : "bg-navy-base/50 hover:bg-accent-blue/10 border-dark-border hover:border-accent-blue/40"
                }`}
              >
                <h5
                  className={`text-xs sm:text-sm font-bold mb-1 ${isLight ? "text-slate-900" : "text-white"}`}
                >
                  {principle.title}
                </h5>
                <p
                  className={`text-xs leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}
                >
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </ModalContainer>
  );
};
